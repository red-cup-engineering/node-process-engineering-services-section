import assert from "node:assert/strict";
import test from "node:test";
import { existsSync, mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { processDataRootConfig } from "@red-cup-engineering/node-process-services-section/config";

test("NODE-PROCESS-QUICKSTART", t => {
  const root = mkdtempSync(join(tmpdir(), "node-process-example-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const section = join(root, "widget-services-section");
  mkdirSync(section);
  const result = processDataRootConfig({
    args: [], cwd: root, env: { WIDGET_DATA_ROOT: section },
    envName: "WIDGET_DATA_ROOT", configFileName: "widget.config.json", defaultRoot: root,
  });
  assert.deepEqual(result, { dataRoot: section, source: "env" });
  assert.equal(existsSync(join(section, "data")), false);
});
