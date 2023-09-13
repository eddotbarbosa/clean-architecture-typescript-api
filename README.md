# Clean Architecture Typescript API
Project designed to explore clean architecture by applying its concepts using typescript.

## Features
* customers crud

## Technologies
* npm
* editorconfig
* dotenv
* typescript
* tsx
* tsup
* vitest
* express
* prisma
* postgres


## Getting Started
### installation:
```
git init
git clone https://github.com/eddotbarbosa/clean-architecutre-typescript-api.git
npm install
```
### configs:
.env
```
PORT="server running port"
DATABASE_URL="your postgresql database URI"
```
### running:
run prisma migrations
```
npx prisma migrate dev
```
start mode
```
npm run start
```
dev mode
```
npm run dev
```
build
```
npm run build
```
test
```
npm run test
```
