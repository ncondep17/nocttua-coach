# Nocttua Coach

Web app (Vite + React) para asesoras de sueño. Separada del monorepo `nocttua` original.

## Setup

```bash
git submodule update --init
npm install
npm run dev
```

`@nocttua/theme` se resuelve desde `shared/theme` (submodule de [nocttua-shared](https://github.com/ncondep17/nocttua-shared)). Si `shared/` cambió río arriba:

```bash
git submodule update --remote shared
```
