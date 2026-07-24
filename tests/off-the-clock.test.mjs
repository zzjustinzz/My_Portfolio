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
  const styles = await readFile(path.join(root, "app/off-the-clock.css"), "utf8");
  const page = await readFile(path.join(root, "app/page.tsx"), "utf8");

  assert.match(component, /role="tablist"/);
  assert.match(component, /role="tab"/);
  assert.match(component, /aria-selected=/);
  assert.match(component, /aria-controls=/);
  assert.match(component, /hobbiesData\.map\(\(hobby, index\) => \{[\s\S]*id=\{`off-clock-panel-\$\{hobby\.key\}`\}/);
  assert.match(component, /hidden=\{!isActive && !isOutgoing\}/);
  assert.match(component, /ArrowRight/);
  assert.match(component, /ArrowLeft/);
  assert.match(component, /showModal\(\)/);
  assert.match(component, /<dialog/);
  assert.match(component, /aria-modal="true"/);
  assert.match(component, /Escape/);
  assert.match(component, /If I&apos;m not at my desk, you&apos;ll find me…/);
  assert.match(page, /import OffTheClock from "@\/components\/off-the-clock"/);
  assert.match(page, /<Experience \/>[\s\S]*<OffTheClock \/>[\s\S]*<Contact \/>/);

  const tabKeyHandler = component.match(/const handleTabKeyDown[\s\S]*?\n  };/)?.[0];
  assert.ok(tabKeyHandler, "the manual tab keyboard handler should be present");
  assert.match(tabKeyHandler, /ArrowRight/);
  assert.match(tabKeyHandler, /ArrowLeft/);
  assert.match(tabKeyHandler, /focus\(\{ preventScroll: true \}\)/);
  assert.doesNotMatch(tabKeyHandler, /setActiveIndex/);
  const activationHandler = component.match(/const activateHobby[\s\S]*?\n  };/)?.[0];
  assert.ok(activationHandler, "the hobby activation handler should be present");
  assert.match(activationHandler, /if \(outgoingIndex !== null\) return/);

  assert.match(component, /const \[outgoingIndex, setOutgoingIndex\] = useState<number \| null>\(null\)/);
  assert.match(component, /aria-hidden=\{ariaHidden \? "true" : undefined\}/);
  assert.match(component, /disabled=\{inert\}/);
  assert.match(component, /isOutgoing &&[\s\S]*className="off-clock-stage off-clock-stage--outgoing"[\s\S]*ariaHidden[\s\S]*inert[\s\S]*onAnimationEnd=\{handleOutgoingAnimationEnd\}/);
  assert.match(component, /className="off-clock-stage off-clock-stage--incoming"/);
  const outgoingAnimationHandler = component.match(/const handleOutgoingAnimationEnd[\s\S]*?\n  };/)?.[0];
  assert.match(outgoingAnimationHandler, /setOutgoingIndex\(null\)/);
  assert.match(styles, /\.off-clock-stage-stack\s*\{[^}]*display:\s*grid/);
  assert.match(styles, /\.off-clock-stage\s*\{[^}]*grid-area:\s*1\s*\/\s*1/);
  assert.match(styles, /\.off-clock-stage--outgoing\s*\{[^}]*animation:\s*off-clock-content-out/);
  assert.match(styles, /\.off-clock-stage--incoming\s*\{[^}]*animation:\s*off-clock-content-in/);
  assert.match(styles, /@keyframes off-clock-content-out\s*\{\s*from\s*\{\s*opacity:\s*1/);
  const crossfadeKeyframes = styles.match(/@keyframes off-clock-content-in[\s\S]*?\n}\n\n@keyframes off-clock-content-out[\s\S]*?\n}/)?.[0];
  assert.ok(crossfadeKeyframes, "both opacity keyframes should be present together");
  assert.doesNotMatch(crossfadeKeyframes, /transform:/);
  assert.match(styles, /\.off-clock-tab:disabled,[\s\S]*\.off-clock-dialog-button:disabled\s*\{[^}]*cursor:\s*not-allowed/);
  const reducedMotion = styles.match(/@media \(prefers-reduced-motion: reduce\)\s*\{[\s\S]*\n\}/)?.[0];
  assert.ok(reducedMotion, "a reduced-motion override should be present");
  assert.match(reducedMotion, /\.off-clock-dialog-button/);
  assert.match(reducedMotion, /transform:\s*none/);
});
