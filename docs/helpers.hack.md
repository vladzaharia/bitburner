# Module: helpers/hack

## Table of contents

### Functions

- [hack](../wiki/helpers.hack#hack)
- [main](../wiki/helpers.hack#main)

## Executable

### main

▸ **main**(`ns`): `Promise`<`void`\>

Hack host(s) from Terminal.

**`example`** Hack single passed in host.
```shell
run /helpers/hack.js [host0]
```

**`example`** Hack multiple passed in hosts.
```shell
run /helpers/hack.js [host0] ... [hostn]
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |

#### Returns

`Promise`<`void`\>

#### Defined in

[helpers/hack.ts:20](https://github.com/vladzaharia/bitburner/blob/main/src/helpers/hack.ts#L20)

## Importable

### hack

▸ **hack**(`ns`, `hostname`): `Promise`<`number`\>

Hack host at `hostname`.

**`async`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |
| `hostname` | `string` | Host to hack. |

#### Returns

`Promise`<`number`\>

The amount of money that was hacked.

#### Defined in

[helpers/hack.ts:43](https://github.com/vladzaharia/bitburner/blob/main/src/helpers/hack.ts#L43)
