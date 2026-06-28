import test from "node:test";
import assert from "node:assert/strict";
import { buildLanguageHref } from "../src/lib/locale-links.mjs";

test("English work section maps to Chinese work section", () => {
  assert.equal(buildLanguageHref("zh", "#work"), "/zh/#work");
});

test("Chinese path section maps to English path section", () => {
  assert.equal(buildLanguageHref("en", "#path"), "/#path");
});

test("missing hashes do not create a trailing hash", () => {
  assert.equal(buildLanguageHref("zh", ""), "/zh/");
});
