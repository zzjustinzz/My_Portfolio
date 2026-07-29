import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const expectedCvHash = "38c2da503836d8f0c11d6bd49f184f7ac60a2e2654572cc6aed4fabab713efac";
const downloadName = "Thanh_Tran_Senior_Product_Owner_Product_Manager_CV.pdf";

test("public Resume.pdf is the supplied two-page CV", async () => {
  const pdf = await readFile(path.join(root, "public", "Resume.pdf"));
  assert.equal(pdf.subarray(0, 5).toString("ascii"), "%PDF-");
  assert.equal(createHash("sha256").update(pdf).digest("hex"), expectedCvHash);
});
