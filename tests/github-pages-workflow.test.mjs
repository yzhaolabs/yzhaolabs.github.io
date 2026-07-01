import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("GitHub Pages is configured for Actions before the exported site is uploaded", async () => {
  const workflow = await readFile(
    new URL("../.github/workflows/deploy.yml", import.meta.url),
    "utf8",
  );

  const configurePages = workflow.indexOf("actions/configure-pages@");
  const uploadArtifact = workflow.indexOf("actions/upload-pages-artifact@");

  assert.notEqual(
    configurePages,
    -1,
    "deploy workflow must configure GitHub Pages to use the Actions deployment",
  );
  assert.ok(
    configurePages < uploadArtifact,
    "GitHub Pages must be configured before the out artifact is uploaded",
  );
});
