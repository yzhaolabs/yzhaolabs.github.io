import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  collectPrivacyViolations,
  validateLocaleParity,
  validateCopyLimits,
} from "../scripts/content-schema.mjs";

const readJson = async (path) =>
  JSON.parse(await readFile(new URL(path, import.meta.url), "utf8"));

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
