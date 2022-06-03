# Bitburner scripts

Scripts used in my Bitburner deployment.

## Documentation

Extensive per-script documentation is found in the [Wiki](https://github.com/vladzaharia/bitburner/wiki) and the [Website](https://vladzaharia.github.io/bitburner/).

Documentation is generated from TSDoc via [typedoc](https://typedoc.org) and [typedoc-plugin-markdown](https://github.com/tgreyuk/typedoc-plugin-markdown/tree/master/packages/typedoc-plugin-markdown) / [typedoc-github-wiki-theme](https://github.com/tgreyuk/typedoc-plugin-markdown/tree/master/packages/typedoc-github-wiki-theme).

## Getting Started

### Prerequisites

-   [Doppler](https://www.doppler.com) token as `env.DOPPLER_TOKEN` to pull Bitburner auth token
-   nodejs / npm
-   gulp _(optional)_

### Setting up

1. Clone [this repository](https://github.com/vladzaharia/bitburner)
2. Run `npm install` to install required packages, update NS definitions, and populate Bitburner auth token

## Building

Run `npm run build` to compile TS, generate a file manifest and docs, and run prettier.

## Updating Netscript defintiions

The [Netscript definitions](src/lib/Netscript.d.ts) is automatically created as a `npm install` postrun task.

This file can be updated by running `npm run postinstall:defs`.

## Syncing with Bitburner

### VS Code Extension

Auto-sync via [Bitburner VSCode Integration](https://marketplace.visualstudio.com/items?itemName=bitburner.bitburner-vscode-integration) is automatically set up as a `npm install` postrun.

### bitburner-sync

You can also manually sync via [bitburner-sync](https://github.com/Nezrahm/bitburner-sync) using `npm run sync`, the token is also set up as a `npm install` postrun.

This token can be manually synced by running `npm run postinstall:config`.

### sync.js

You can run [`sync.js`](./src/sync.ts) which pulls files from a hosted or local endpoint.

#### Hosted scripts

To set up Bitburner for the first time, run:

```shell
wget https://bb.vlad.gg/api/sync.js
run sync.js
```

Afterwards, you can use `run sync.js` to pull the latest files.

#### Local development

To download the scripts from a local instance, run `npm run serve` to build and serve the local versions of the files.

Within Bitburner, use `run sync.js http://<IP_ADDR>:8080/api` to pull from the local development server.

#### Pull requests

Netlify will also create a deployment for each PR.

Within Bitburner, use `run sync.js <PR_URL>/api` to pull from the PR deployment.
