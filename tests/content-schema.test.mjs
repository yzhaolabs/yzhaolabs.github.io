import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  collectPrivacyViolations,
  validateContent,
  validateLocaleParity,
  validateCopyLimits,
} from "../scripts/content-schema.mjs";

const readJson = async (path) =>
  JSON.parse(await readFile(new URL(path, import.meta.url), "utf8"));

const createShared = () => ({
  projects: [{ id: "alpha" }],
  featuredIds: ["alpha"],
});

const createLocale = () => ({
  hero: { supporting: "Brief supporting copy" },
  projects: {
    alpha: {
      question: "Question",
      approach: "Approach",
      finding: "Finding",
      archiveSummary: "Brief archive summary",
    },
  },
});

const englishWords = (count) =>
  Array.from({ length: count }, (_, index) => `word${index}`).join(" ");
const chineseText = (count) => "研".repeat(count);

test("in-memory: project ID mismatches report the affected locale", () => {
  const shared = createShared();
  const en = createLocale();
  const zh = createLocale();
  zh.projects.extra = {
    question: "Question",
    approach: "Approach",
    finding: "Finding",
    archiveSummary: "Summary",
  };

  assert.deepEqual(validateLocaleParity(shared, en, zh), [
    "zh project IDs differ from shared project IDs",
  ]);
});

for (const [field, blankValue] of [
  ["question", "   "],
  ["approach", "\t\t"],
  ["finding", "\n"],
]) {
  test(`in-memory: blank featured ${field} is rejected`, () => {
    const shared = createShared();
    const en = createLocale();
    const zh = createLocale();
    en.projects.alpha[field] = blankValue;

    assert.deepEqual(validateLocaleParity(shared, en, zh), [
      "en.alpha is missing featured-project copy",
    ]);
  });
}

for (const [description, value, violation] of [
  ["uppercase backslash Windows paths", "C:\\Users\\private\\notes.txt", "local Windows path"],
  ["lowercase backslash Windows paths", "c:\\Users\\private\\notes.txt", "local Windows path"],
  ["uppercase forward-slash Windows paths", "D:/private/notes.txt", "local Windows path"],
  ["lowercase forward-slash Windows paths", "d:/private/notes.txt", "local Windows path"],
  ["student identifiers", "YZ929", "student identifier"],
  ["internal GitLab URLs", "https://gitlab.developers.cam.ac.uk/group/project", "internal GitLab URL"],
  ["meeting minutes", "Group Meeting Minutes", "group meeting minutes"],
  ["plain PDF paths", "reports/internal.pdf", "public PDF link"],
  ["PDF URLs with queries", "https://example.com/internal.PDF?download=1", "public PDF link"],
  ["PDF paths with fragments", "/reports/internal.pdf#page=2", "public PDF link"],
]) {
  test(`in-memory: privacy validation rejects ${description}`, () => {
    assert.deepEqual(collectPrivacyViolations({ value }), [violation]);
  });
}

for (const [description, value] of [
  ["drive-like prose", "Plan C: is preferred"],
  ["longer non-PDF extensions", "report.pdfx"],
  ["ordinary meeting notes", "Weekly meeting notes"],
]) {
  test(`in-memory: privacy validation allows ${description}`, () => {
    assert.deepEqual(collectPrivacyViolations({ value }), []);
  });
}

test("in-memory: aggregate validation scans shared metadata", () => {
  const shared = createShared();
  shared.privateSource = "C:/private/report.txt";

  assert.deepEqual(validateContent(shared, createLocale(), createLocale()), [
    "local Windows path",
  ]);
});

test("in-memory: English hero copy allows 35 words and rejects 36", () => {
  const en = createLocale();
  const zh = createLocale();
  en.hero.supporting = englishWords(35);
  assert.deepEqual(validateCopyLimits(en, zh), []);

  en.hero.supporting = englishWords(36);
  assert.deepEqual(validateCopyLimits(en, zh), [
    "English hero supporting copy exceeds 35 words",
  ]);
});

test("in-memory: English archive copy allows 24 words and rejects 25", () => {
  const en = createLocale();
  const zh = createLocale();
  en.projects.alpha.archiveSummary = englishWords(24);
  assert.deepEqual(validateCopyLimits(en, zh), []);

  en.projects.alpha.archiveSummary = englishWords(25);
  assert.deepEqual(validateCopyLimits(en, zh), [
    "English archive summary alpha exceeds 24 words",
  ]);
});

test("in-memory: Chinese hero copy allows 55 Han characters and rejects 56", () => {
  const en = createLocale();
  const zh = createLocale();
  zh.hero.supporting = chineseText(55);
  assert.deepEqual(validateCopyLimits(en, zh), []);

  zh.hero.supporting = chineseText(56);
  assert.deepEqual(validateCopyLimits(en, zh), [
    "Chinese hero supporting copy exceeds 55 Han characters",
  ]);
});

test("in-memory: Chinese archive copy allows 42 Han characters and rejects 43", () => {
  const en = createLocale();
  const zh = createLocale();
  zh.projects.alpha.archiveSummary = chineseText(42);
  assert.deepEqual(validateCopyLimits(en, zh), []);

  zh.projects.alpha.archiveSummary = chineseText(43);
  assert.deepEqual(validateCopyLimits(en, zh), [
    "Chinese archive summary alpha exceeds 42 Han characters",
  ]);
});

test("in-memory: malformed copy fields aggregate actionable errors", () => {
  const en = createLocale();
  const zh = createLocale();
  delete en.hero;
  zh.hero.supporting = 42;
  delete en.projects.alpha.archiveSummary;
  zh.projects.alpha.archiveSummary = { text: "Summary" };

  assert.deepEqual(validateContent(createShared(), en, zh), [
    "English hero supporting copy must be a string",
    "Chinese hero supporting copy must be a string",
    "English archive summary alpha must be a string",
    "Chinese archive summary alpha must be a string",
  ]);
});

test("in-memory: malformed project collections report actionable errors", () => {
  const en = createLocale();
  const zh = createLocale();
  en.projects = null;
  zh.projects = [];

  assert.deepEqual(validateCopyLimits(en, zh), [
    "English projects must be an object",
    "Chinese projects must be an object",
  ]);
});

test("English and Chinese content cover the same project IDs", async () => {
  const shared = await readJson("../src/content/shared.json");
  const en = await readJson("../src/content/en.json");
  const zh = await readJson("../src/content/zh.json");
  assert.deepEqual(validateLocaleParity(shared, en, zh), []);
});

test("public content contains no private report references", async () => {
  const en = await readJson("../src/content/en.json");
  const zh = await readJson("../src/content/zh.json");
  assert.deepEqual(collectPrivacyViolations({ en, zh }), []);
});

test("hero and archive copy stay within the approved limits", async () => {
  const en = await readJson("../src/content/en.json");
  const zh = await readJson("../src/content/zh.json");
  assert.deepEqual(validateCopyLimits(en, zh), []);
});

test("archive projects are ordered newest first", async () => {
  const shared = await readJson("../src/content/shared.json");
  const years = shared.projects.map(({ year }) => Number(year));

  assert.deepEqual(years, [...years].sort((left, right) => right - left));
});

test("path entries are ordered newest first in each locale", async () => {
  for (const locale of ["en", "zh"]) {
    const content = await readJson(`../src/content/${locale}.json`);
    const years = content.path.map(({ period }) => Number.parseInt(period, 10));

    assert.deepEqual(
      years,
      [...years].sort((left, right) => right - left),
      `${locale} path is not newest first`,
    );
  }
});
