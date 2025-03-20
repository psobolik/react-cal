```terminal
$ pnpm create vite
√ Project name: ... react-cal
√ Select a framework: » React
√ Select a variant: » TypeScript

Scaffolding project in C:\Users\psobo\Development\TypeScript\react-cal...

Done. Now run:

  cd react-cal
  pnpm install
  pnpm run dev
```

# Preview
```terminal
$ pnpm preview --open
```
# Install
```shell
$ pnpm install
```
# Build & deploy
## pop-os
```shell
$ pnpm build
$ sudo rsync --recursive --mkpath --delete ./dist/calendar/ /var/www/html/calendar/
```
## tilde.team
```shell
$ pnpm build --base=/~padeso/calendar --outDir=dist/tilde.team
$ rsync --recursive --mkpath --delete ./dist/tilde.team/ tilde.team:~/public_html/calendar/
```
