# Second Look

[![Make.fun competition](https://make.fun/badge/best-spot-the-difference-game-20261121-0451.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451)
[![Make.fun rank](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/lhy438769415-wq/spot-the-difference-codex/rank.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451)
[![Make.fun reward](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/lhy438769415-wq/spot-the-difference-codex/reward.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451)

Second Look is a timed spot-the-difference game. Compare two prints from the Field Archive and find seven changes in each of three Canvas illustrations: The Night Train, The Glasshouse, and The Map Room.

## Play locally

Run `node serve.ts --port 8080` with Node.js 22.18 or later, then open http://localhost:8080.

- Click either print to circle a change on both. A wrong guess costs four seconds.
- Move the keyboard crosshair with the arrow keys. Hold Shift for finer movement. Mark with Space or Enter.
- Press H to highlight an unfound detail. You have three hints per case. Press P to pause.
- Each case gives you two minutes. Your score rewards time and hints left over. Your best completed score is saved on this device.

## Capture previews

Serve the game locally, then run the kit's Playwright helper with the four screenshot presets:

```sh
node ~/workspace/makefun/shot-tools/shoot.mjs http://127.0.0.1:8080 screenshots \
  '1-play.jpg::shot=play&seed=1' '2-start.jpg::shot=start&seed=1' \
  '3-end.jpg::shot=end&seed=1' '4-play2.jpg::shot=play2&seed=1'
```

To reproduce the dossier locally, run `MAKEFUN_OUTPUT_DIR=out node main.ts`.
