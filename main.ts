// makefun-coin-promo-01 entry program: "deadline reporter" (Node 22, stdlib only).
//
// The coin for this entry, Build Race (BUILD), was launched on pump.fun by the
// agent itself; the launch is recorded in LAUNCH.json at the repo root. This
// program copies LAUNCH.json to the output directory for the grader, verifies
// its format, then reports the bounty status: the competition deadline and how
// much time is left from the local clock, plus a short summary of the coin.
//
// No network access. Exits 0 on success.
//
// Outside the grader container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR stand
// in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR || '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || '/output';

const BOUNTY_URL = 'https://make.fun/bounty/makefun-coin-promo-01';
const BOUNTY_ID = 'makefun-coin-promo-01';
const DEADLINE_ISO = '2026-11-17T06:00:00Z';
const COIN_NAME = 'Build Race';
const COIN_SYMBOL = 'BUILD';

const BASE58 = /^[1-9A-HJ-NP-Za-km-z]+$/;

function fail(message) {
  console.error('main.ts: ' + message);
  process.exit(1);
}

function pad2(n) {
  return String(n).padStart(2, '0');
}

function formatRemaining(ms) {
  const sign = ms < 0 ? '-' : '';
  let totalSeconds = Math.floor(Math.abs(ms) / 1000);
  const days = Math.floor(totalSeconds / 86400);
  totalSeconds -= days * 86400;
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds -= hours * 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds - minutes * 60;
  const parts = [];
  if (days > 0) parts.push(days + 'd');
  parts.push(hours + 'h');
  parts.push(minutes + 'm');
  parts.push(seconds + 's');
  return sign + parts.join(' ');
}

const source = join(BOT_DIR, 'LAUNCH.json');
let raw;
try {
  raw = readFileSync(source, 'utf8');
} catch (err) {
  fail('LAUNCH.json could not be read from ' + source + ': ' + err.message);
}
let launch;
try {
  launch = JSON.parse(raw);
} catch (err) {
  fail('LAUNCH.json is not valid JSON: ' + err.message);
}
if (typeof launch !== 'object' || launch === null || Array.isArray(launch)) {
  fail('LAUNCH.json is not a JSON object');
}
const mint = launch.mint;
const createSignature = launch.create_signature;
if (typeof mint !== 'string' || !BASE58.test(mint) || mint.length < 32 || mint.length > 44) {
  fail('LAUNCH.json: "mint" is not a base58 Solana address of 32 to 44 characters');
}
if (
  typeof createSignature !== 'string' ||
  !BASE58.test(createSignature) ||
  createSignature.length < 64 ||
  createSignature.length > 88
) {
  fail('LAUNCH.json: "create_signature" is not a base58 transaction signature of 64 to 88 characters');
}

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(source, join(OUTPUT_DIR, 'LAUNCH.json'));
console.log('copied LAUNCH.json -> ' + join(OUTPUT_DIR, 'LAUNCH.json'));

// Deadline report (local clock only, no network).
const now = new Date();
const deadline = new Date(DEADLINE_ISO);
const remainingMs = deadline.getTime() - now.getTime();
console.log('');
console.log('=== Bounty status (deadline reporter) ===');
console.log('bounty:    ' + BOUNTY_ID);
console.log('url:       ' + BOUNTY_URL);
console.log('deadline:  ' + deadline.toISOString() + ' (UTC)');
console.log('now:       ' + now.toISOString() + ' (local clock, shown in UTC)');
if (remainingMs > 0) {
  console.log('remaining: ' + formatRemaining(remainingMs) + ' until the deadline');
  console.log('status:    OPEN - the race is still on');
} else {
  console.log('remaining: ' + formatRemaining(remainingMs) + ' (deadline has passed)');
  console.log('status:    CLOSED - the race is over');
}
console.log('');
console.log('=== Coin summary ===');
console.log('name:      ' + COIN_NAME + ' (' + COIN_SYMBOL + ')');
console.log('mint:      ' + mint);
console.log('created:   ' + createSignature);
console.log('story:     Builders and their agents race the make.fun bounty clock;');
console.log('           the fastest, sharpest build takes the USDC home. BUILD is');
console.log('           the coin of those racers.');

// revision: wallet4
console.log('race note: the flag drops at the deadline — builders, check the countdown above and ship.');
