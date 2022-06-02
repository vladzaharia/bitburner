# Module: helpers/weaken

## Table of contents

### Functions

- [main](../wiki/helpers.weaken#main)
- [weaken](../wiki/helpers.weaken#weaken)

## Functions

### main

▸ **main**(`ns`): `Promise`<`void`\>

Weaken host(s) from Terminal.

**`example`** Weaken single passed in host.
```shell
run /helpers/weaken.js [host0]
```

**`example`** Weaken multiple passed in hosts.
```shell
run /helpers/weaken.js [host0] ... [hostn]
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |

#### Returns

`Promise`<`void`\>

#### Defined in

[helpers/weaken.ts:18](https://github.com/vladzaharia/bitburner/blob/main/src/helpers/weaken.ts#L18)

___

### weaken

▸ **weaken**(`ns`, `hostname`): `Promise`<`number`\>

Weaken host at `hostname`.

**`async`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |
| `hostname` | `string` | Host to weaken. |

#### Returns

`Promise`<`number`\>

The amount by which the server's security level was decreased.

#### Defined in

[helpers/weaken.ts:40](https://github.com/vladzaharia/bitburner/blob/main/src/helpers/weaken.ts#L40)
