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

test("Navi exposes the same CV as a persistent responsive resource", async () => {
  const chatbot = await readFile(path.join(root, "components", "chatbot.tsx"), "utf8");
  const styles = await readFile(path.join(root, "app", "globals.css"), "utf8");

  const resource = chatbot.match(/<a\s+className="chat-resource"[\s\S]*?<\/a>/)?.[0];
  assert.ok(resource, "chatbot CV resource should be present");
  assert.match(resource, /href="\/Resume\.pdf"/);
  assert.match(resource, new RegExp(`download="${downloadName.replaceAll(".", "\\.")}"`));
  assert.match(resource, /RiDownloadLine/);
  assert.match(resource, /Download Thanh&apos;s CV/);
  assert.match(resource, /PDF · 2 pages/);
  assert.ok(
    chatbot.indexOf('className="chat-resource"') < chatbot.indexOf('className="chat-messages"'),
    "resource row should appear before messages",
  );

  assert.match(styles, /\.chat-resource\s*\{[^}]*display:\s*flex/);
  assert.match(styles, /\.chat-resource\s*\{[^}]*white-space:\s*nowrap/);
  assert.match(styles, /\.chat-resource-label\s*\{[^}]*min-width:\s*0/);
  assert.match(styles, /\.chat-resource-meta\s*\{[^}]*flex:\s*0\s+0\s+auto/);
  assert.match(styles, /\.chat-resource:active\s*\{[^}]*transform:\s*translateY\(1px\)/);
  assert.match(styles, /@media \(hover: hover\)[\s\S]*\.chat-resource:hover/);
  assert.match(styles, /@media \(max-width: 39\.99rem\)[\s\S]*\.chat-resource/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.chat-resource:active\s*\{[^}]*transform:\s*none/);
});
