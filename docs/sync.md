# Module: sync

## Table of contents

### Functions

- [main](../wiki/sync#main)

## Functions

### main

▸ **main**(`ns`): `Promise`<`void`\>

Synchronizes files with hosted version. Base URL can be passed in as `args[0]`.

**`example`** Synchronize with default server
run /sync.js

**`example`** Synchronize with custom server
run /sync.js http://1.2.3.4:8123

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |

#### Returns

`Promise`<`void`\>

#### Defined in

[sync.ts:18](https://github.com/vladzaharia/bitburner/blob/598557b/src/sync.ts#L18)
