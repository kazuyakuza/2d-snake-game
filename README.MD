### Project Description

Simple implementation of the classic 2D Snake game for website technology.

### Scripts

- Use `build-dev` script to build dist targeting development environment
- Use `build-prd` script to build dist targeting production environment
- Use `serve` script to host project locally
- Use `serve-online` script to host project locally and share it online (check **How-to serve-online script** below)

### How-to serve-online script

1. Run `npm install` or `yarn install`
2. Go-to https://ngrok.com/ & sing-up
3. Follow ngrok's setup steps 1&2
https://dashboard.ngrok.com/get-started/setup
4. Create new file named `ngrok.yml` like `ngrok.yml.example` and add your token and region
5. Run `npm run serve-online` or `yarn serve-online`
