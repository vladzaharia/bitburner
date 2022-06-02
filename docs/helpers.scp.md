# Module: helpers/scp

## Table of contents

### Functions

- [main](../wiki/helpers.scp#main)
- [scp](../wiki/helpers.scp#scp)

## Functions

### main

▸ **main**(`ns`): `Promise`<`void`\>

Copy `filename`, along with helper files, to `hostname`.

**`example`** Copy `filename` to `host`.
run /helpers/scp.js [host] [filename]

**`example`** Copy multiple files to `host`.
run /helpers/hack.js [host] [file0] ... [filen]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |

#### Returns

`Promise`<`void`\>

#### Defined in

[helpers/scp.ts:14](https://github.com/vladzaharia/bitburner/blob/9963ca2/src/helpers/scp.ts#L14)

___

### scp

▸ **scp**(`ns`, `hostname`, `filenames`): `Promise`<`boolean`\>

Copy `filenames`, along with helper scripts in `/helpers` to `hostname`.

**`async`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |
| `hostname` | `string` | The host to copy files to. |
| `filenames` | `string`[] | The files to copy, in addition to all files in `/helpers`. |

#### Returns

`Promise`<`boolean`\>

Whether the files were copied over successfully.

#### Defined in

[helpers/scp.ts:31](https://github.com/vladzaharia/bitburner/blob/9963ca2/src/helpers/scp.ts#L31)
