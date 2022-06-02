# Module: helpers/grow

## Table of contents

### Functions

- [grow](../wiki/helpers.grow#grow)
- [main](../wiki/helpers.grow#main)

## Functions

### grow

▸ **grow**(`ns`, `hostname`): `Promise`<`number`\>

Grow host on `hostname`.

**`async`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |
| `hostname` | `string` | The host to grow. |

#### Returns

`Promise`<`number`\>

- The amount by which the server's money grew.

#### Defined in

[helpers/grow.ts:40](https://github.com/vladzaharia/bitburner/blob/main/src/helpers/grow.ts#L40)

___

### main

▸ **main**(`ns`): `Promise`<`void`\>

Grow host(s) from Terminal.

**`example`** Grow single passed in host.
```shell
run /helpers/grow.js [host0]
```

**`example`** Grow multiple passed in hosts.
```shell
run /helpers/grow.js [host0] ... [hostn]
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |

#### Returns

`Promise`<`void`\>

#### Defined in

[helpers/grow.ts:18](https://github.com/vladzaharia/bitburner/blob/main/src/helpers/grow.ts#L18)
