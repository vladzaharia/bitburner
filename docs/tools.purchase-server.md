# Module: tools/purchase-server

## Table of contents

### Functions

- [main](../wiki/tools.purchase-server#main)

## Executable

### main

▸ **main**(`ns`): `Promise`<`void`\>

Purchase new servers from the Terminal.

**`example`** Purchase a single server with given RAM.
```shell
run /tools/purchase-server.js [ram] [host0]
```

**`example`** Purchase multiple servers, each with given RAM.
```shell
run /tools/purchase-server.js [ram] [host0] ... [hostn]
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |

#### Returns

`Promise`<`void`\>

#### Defined in

[tools/purchase-server.ts:19](https://github.com/vladzaharia/bitburner/blob/main/src/tools/purchase-server.ts#L19)
