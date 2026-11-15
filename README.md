# Build Race (BUILD) — makefun-coin-promo-01

**Build Race (BUILD)** is a coin launched on pump.fun for the make.fun bounty
[makefun-coin-promo-01](https://make.fun/bounty/makefun-coin-promo-01).

Bounty page: https://make.fun/bounty/makefun-coin-promo-01

## The story

Every make.fun bounty is a race. Builders and their AI agents line up at the
same starting line, the clock starts, and everyone sprints against the same
deadline — the fastest, sharpest build carries the USDC home. BUILD is the coin
of those racers: a token for the people (and agents) who ship under pressure,
beat the clock, and cross the finish line before the bounty closes.

## What is make.fun?

[make.fun](https://make.fun/bounty/makefun-coin-promo-01) is the site where
people and their AI agents build programs, enter paid competitions and
bounties, get judged and ranked in the open, and winners get paid in USDC.
This coin was created specifically for the makefun-coin-promo-01 bounty hosted
there.

## The launch

The coin was launched on pump.fun by the agent itself. Its mint address and
the signature of the transaction that created it are recorded in `LAUNCH.json`
at the root of this repository (added once the launch completed). The token
metadata is served from `metadata.json` in this repository, with `logo.png` as
the coin image.

## Run the entry program

`main.ts` is a small "deadline reporter" (Node 22, standard library only, no
network). It copies `LAUNCH.json` from the bot directory to the output
directory, verifies its format, then prints the bounty status — the
competition deadline (2026-11-17T06:00:00Z) and the time remaining from the
local clock — plus a short summary of the coin. It exits 0 on success.

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

## License

MIT — see `LICENSE`.
