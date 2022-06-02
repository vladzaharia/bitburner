# Bitburner scripts

Scripts used in my Bitburner deployment.

## Documentation

Extensive per-script documentation is found in the [Wiki](https://github.com/vladzaharia/bitburner/wiki), generated from TSDoc via [typedoc](https://typedoc.org) and [typedoc-plugin-markdown](https://github.com/tgreyuk/typedoc-plugin-markdown/tree/master/packages/typedoc-plugin-markdown) / [typedoc-github-wiki-theme](https://github.com/tgreyuk/typedoc-plugin-markdown/tree/master/packages/typedoc-github-wiki-theme).

## Getting Started

### Prerequisites

- [Doppler](https://www.doppler.com) token as `env.DOPPLER_TOKEN` to pull Bitburner auth token
- nodejs / npm
- gulp _(optional)_

### Setting up

1. Clone [this repository](https://github.com/vladzaharia/bitburner)
2. Run `npm install` to install required packages, update NS definitions, and populate Bitburner auth token

## Building

Run `npm run build` to compile TS, generate a file manifest and docs, and run prettier.

## Syncing with Bitburner

Auto-sync via [Bitburner VSCode Integration](https://marketplace.visualstudio.com/items?itemName=bitburner.bitburner-vscode-integration) is automatically set up as a `npm install` postrun.

You can also manually sync via [bitburner-sync](https://github.com/Nezrahm/bitburner-sync) using `npm run sync`, the token is also set up as a `npm install` postrun.

This token can be manually synced by running `npm run postinstall:config`.

## Updating Netscript defintiions

The [Netscript definitions](src/lib/Netscript.d.ts) is automatically created as a `npm install` postrun task.

This file can be updated by running `npm run postinstall:defs`.
