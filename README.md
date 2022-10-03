# Monorepo

Alternative way to setup (for cyclic) using turborepo & npm workspaces (that you can use just one repo containing both client and server on just cyclic)

* client - react
* server - express

## Suggested directory structure

├── apps
│   ├── client
│   └── server
└── packages

## Client

Standard vite project

## Server

Important create `dev`

```js title="package.json"
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.1"
  },
  "devDependencies": {
    "nodemon": "^2.0.20"
  }
}
```

```js title="server.js"
const express = require("express");
const app = express();
const port = process.env.PORT ?? 3000;

//* ?? to fill in later
app.use(express.static("??"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

## Turborepo

Go to the root folder, create root package.json

```js title="turbo.json"
{
  "$schema": "https://turborepo.org/schema.json",
  "pipeline": {
    "dev": {},
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": [],
      "inputs": ["src/**/*.jsx", "src/**/*.js", "test/**/*.js", "test/**/*.jsx"]
    },
    "lint": {
      "outputs": []
    },
    "deploy": {
      "dependsOn": ["build", "test", "lint"],
      "outputs": []
    }
  }
}
```

## Workspaces

npm, yarn, pnpm

```js title="package.json"
  "workspaces": [
    "packages/*",
    "apps/*"
  ]
```

## Cyclic
(1) Will first `git clone` your folder, 
(2) Then `npm install` your stuff, (will `npm install` both client & server b/c of they're all part of the workspace)
(3) Then `npm run build`, 
(4) Then they will `npm run prune` - means they will drop all the Dev Dependencies, e.g. nodemon. But also mean they drop your Turbo, b/c it's also a dev dependency. 
(5) Will then `npm run start`, which will not run b/c turbo stopped. 
-> So we need to go into root folder's `package.json` & add in `"start": "cd apps/server && npm run start"` or you can `"start": "cd apps/server && node server.js"` too. 

## installing npm modules in future

 npm install morgan --workspace server
 npm install lodash --workspace client

 Don't have to be inside that folder to `npm install <package>`
 But MUST include location you want to install in, i.e. `--workspace client` or `--workspace server` 