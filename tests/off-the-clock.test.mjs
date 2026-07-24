import test from "node:test";
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("hobby data declares three complete, local, illustrative image sets", async () => {
  const source = await readFile(path.join(root, "lib/data.ts"), "utf8");
  assert.match(source, /export interface HobbyImage/);
  assert.match(source, /export interface Hobby/);
  assert.match(source, /export const hobbiesData: Hobby\[\]/);
  for (const key of ["basketball", "sneakers", "edm"]) {
    assert.match(source, new RegExp(`key: "${key}"`));
  }
  const imagePaths = [...source.matchAll(/src: "(\/hobbies\/[^"]+)"/g)].map((match) => match[1]);
  assert.equal(imagePaths.length, 9);
  assert.equal(new Set(imagePaths).size, 9);
  for (const imagePath of imagePaths) {
    await access(path.join(root, "public", imagePath));
  }
  assert.equal((source.match(/Illustrative photograph/g) ?? []).length, 9);
});

test("off-the-clock section provides accessible tabs, lightbox controls, and page integration", async () => {
  const component = await readFile(path.join(root, "components/off-the-clock.tsx"), "utf8");
  const page = await readFile(path.join(root, "app/page.tsx"), "utf8");

  assert.match(component, /role="tablist"/);
  assert.match(component, /role="tab"/);
  assert.match(component, /aria-selected=/);
  assert.match(component, /aria-controls=/);
  assert.match(component, /ArrowRight/);
  assert.match(component, /ArrowLeft/);
  assert.match(component, /showModal\(\)/);
  assert.match(component, /<dialog/);
  assert.match(component, /aria-modal="true"/);
  assert.match(component, /Escape/);
  assert.match(component, /If I&apos;m not at my desk, you&apos;ll find me…/);
  assert.match(page, /import OffTheClock from "@\/components\/off-the-clock"/);
  assert.match(page, /<Experience \/>[\s\S]*<OffTheClock \/>[\s\S]*<Contact \/>/);
});
