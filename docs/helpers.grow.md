# Module: helpers/grow

## Table of contents

### Functions

- [grow](../wiki/helpers.grow#grow)
- [main](../wiki/helpers.grow#main)

## Executable

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

[helpers/grow.ts:19](https://github.com/vladzaharia/bitburner/blob/main/src/helpers/grow.ts#L19)

## Importable

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

[helpers/grow.ts:42](https://github.com/vladzaharia/bitburner/blob/main/src/helpers/grow.ts#L42)
