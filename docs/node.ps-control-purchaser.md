# Module: node/ps-control-purchaser

## Table of contents

### Functions

- [main](../wiki/node.ps-control-purchaser#main)

## Functions

### main

▸ **main**(`ns`): `Promise`<`void`\>

Automatically maintain personal servers.

Each cycle will:
 - Check for RAM upgrade based on available money.
 - If RAM needs upgrading, sell all purchased servers.
 - Fill available servers up to capacity in pools.

**`example`**
run /node/ps-control-purchaser.js

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |

#### Returns

`Promise`<`void`\>

#### Defined in

[node/ps-control-purchaser.ts:24](https://github.com/vladzaharia/bitburner/blob/9963ca2/src/node/ps-control-purchaser.ts#L24)