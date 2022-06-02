# Module: tools/sell-server

## Table of contents

### Functions

- [main](../wiki/tools.sell-server#main)

## Executable

### main

▸ **main**(`ns`): `Promise`<`void`\>

Sell servers from the Terminal.

**`example`** Sell a single server with given hostname.
```shell
run /tools/sell-server.js [host]
```

**`example`** Sell multiple servers with given hostnames.
```shell
run /tools/sell-server.js [host0] ... [hostn]
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |

#### Returns

`Promise`<`void`\>

#### Defined in

[tools/sell-server.ts:19](https://github.com/vladzaharia/bitburner/blob/main/src/tools/sell-server.ts#L19)
