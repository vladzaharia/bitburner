# Module: node/ps-control-hacknet

## Table of contents

### Functions

- [main](../wiki/node.ps-control-hacknet#main)

## Functions

### main

▸ **main**(`ns`): `Promise`<`void`\>

Automatically maintain Hacknet nodes.

Each cycle will:
 - Upgrade any nodes to "baseline" (first node).
 - Compare cost/benefit of each upgrade.
 - Purchase best available upgrade across all nodes or purchase a new node.

**`example`**
```shell
run /node/ps-control-hacknet.js
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |

#### Returns

`Promise`<`void`\>

#### Defined in

[node/ps-control-hacknet.ts:25](https://github.com/vladzaharia/bitburner/blob/main/src/node/ps-control-hacknet.ts#L25)
