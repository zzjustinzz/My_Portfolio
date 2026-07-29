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

test("hero promotes the CV download and keeps contact paths compact", async () => {
  const hero = await readFile(path.join(root, "components", "hero.tsx"), "utf8");

  const downloadLink = hero.match(/<a\s+id="cta-download-cv"[\s\S]*?<\/a>/)?.[0];
  assert.ok(downloadLink, "hero CV link should be present");
  assert.match(downloadLink, /className="btn btn--primary"/);
  assert.match(downloadLink, /href="\/Resume\.pdf"/);
  assert.match(downloadLink, new RegExp(`download="${downloadName.replaceAll(".", "\\.")}"`));
  assert.match(downloadLink, /RiDownloadLine/);
  assert.match(downloadLink, /Download CV/);

  const projectsLink = hero.match(/<a id="cta-view-projects"[\s\S]*?<\/a>/)?.[0];
  assert.ok(projectsLink, "project CTA should remain present");
  assert.match(projectsLink, /className="btn btn--secondary"/);
  assert.match(projectsLink, /onClick=\{scrollToProjects\}/);

  const heroNote = hero.match(/<div className="hero-note">[\s\S]*?<\/div>/)?.[0];
  assert.ok(heroNote, "hero note should remain present");
  assert.match(heroNote, /mailto:thanhtdfu@gmail\.com/);
  assert.match(heroNote, /LinkedIn profile/);
  assert.doesNotMatch(hero, /id="cta-contact"/);
});
