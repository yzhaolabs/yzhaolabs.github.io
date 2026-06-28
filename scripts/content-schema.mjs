import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const projectRoot = new URL("../", import.meta.url);
const readJson = async (relativePath) =>
  JSON.parse(await readFile(new URL(relativePath, projectRoot), "utf8"));

const sorted = (values) => [...values].sort();
const hasText = (value) => typeof value === "string" && value.trim().length > 0;
const words = (value) => value.trim().split(/\s+/u).filter(Boolean).length;
const chineseChars = (value) =>
  [...value].filter((char) => /\p{Script=Han}/u.test(char)).length;
const projectEntries = (content, locale, errors) => {
  if (content?.projects === null ||
      typeof content?.projects !== "object" ||
      Array.isArray(content.projects)) {
    errors.push(`${locale} projects must be an object`);
    return [];
  }
  return Object.entries(content.projects);
};

export function validateLocaleParity(shared, en, zh) {
  const errors = [];
  const sharedIds = sorted(shared.projects.map((project) => project.id));
  for (const [locale, content] of [["en", en], ["zh", zh]]) {
    const localeIds = sorted(Object.keys(content.projects));
    if (JSON.stringify(localeIds) !== JSON.stringify(sharedIds)) {
      errors.push(`${locale} project IDs differ from shared project IDs`);
    }
    for (const id of shared.featuredIds) {
      if (!hasText(content.projects[id]?.question) ||
          !hasText(content.projects[id]?.approach) ||
          !hasText(content.projects[id]?.finding)) {
        errors.push(`${locale}.${id} is missing featured-project copy`);
      }
    }
  }
  return errors;
}

export function collectPrivacyViolations(value) {
  const text = JSON.stringify(value);
  const rules = [
    [/(?:^|[\s"'(])[a-z]:[\\/]/iu, "local Windows path"],
    [/yz929/iu, "student identifier"],
    [/gitlab\.developers\.cam\.ac\.uk/iu, "internal GitLab URL"],
    [/meeting minutes/iu, "group meeting minutes"],
    [/\.pdf(?:[?#][^"']*)?(?=["'])/iu, "public PDF link"],
  ];
  return rules
    .filter(([pattern]) => pattern.test(text))
    .map(([, label]) => label);
}

export function validateCopyLimits(en, zh) {
  const errors = [];
  const englishHero = en?.hero?.supporting;
  if (typeof englishHero !== "string") {
    errors.push("English hero supporting copy must be a string");
  } else if (words(englishHero) > 35) {
    errors.push("English hero supporting copy exceeds 35 words");
  }
  const chineseHero = zh?.hero?.supporting;
  if (typeof chineseHero !== "string") {
    errors.push("Chinese hero supporting copy must be a string");
  } else if (chineseChars(chineseHero) > 55) {
    errors.push("Chinese hero supporting copy exceeds 55 Han characters");
  }
  for (const [id, project] of projectEntries(en, "English", errors)) {
    const archiveSummary = project?.archiveSummary;
    if (typeof archiveSummary !== "string") {
      errors.push(`English archive summary ${id} must be a string`);
    } else if (words(archiveSummary) > 24) {
      errors.push(`English archive summary ${id} exceeds 24 words`);
    }
  }
  for (const [id, project] of projectEntries(zh, "Chinese", errors)) {
    const archiveSummary = project?.archiveSummary;
    if (typeof archiveSummary !== "string") {
      errors.push(`Chinese archive summary ${id} must be a string`);
    } else if (chineseChars(archiveSummary) > 42) {
      errors.push(`Chinese archive summary ${id} exceeds 42 Han characters`);
    }
  }
  return errors;
}

export function validateContent(shared, en, zh) {
  return [
    ...validateLocaleParity(shared, en, zh),
    ...collectPrivacyViolations({ shared, en, zh }),
    ...validateCopyLimits(en, zh),
  ];
}

async function main() {
  const [shared, en, zh] = await Promise.all([
    readJson("src/content/shared.json"),
    readJson("src/content/en.json"),
    readJson("src/content/zh.json"),
  ]);
  const errors = validateContent(shared, en, zh);
  if (errors.length > 0) {
    console.error(errors.join("\n"));
    process.exitCode = 1;
  } else {
    console.log("Content validation passed");
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main();
}
