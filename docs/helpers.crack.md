# Module: helpers/crack

## Table of contents

### Functions

- [crackHost](../wiki/helpers.crack#crackhost)
- [getPortOpeners](../wiki/helpers.crack#getportopeners)
- [main](../wiki/helpers.crack#main)

## Functions

### crackHost

▸ **crackHost**(`ns`, `hostname`): `void`

Crack given host using available port openers and nuke.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |
| `hostname` | `string` | Hostname to crack |

#### Returns

`void`

#### Defined in

[helpers/crack.ts:38](https://github.com/vladzaharia/bitburner/blob/468eb83/src/helpers/crack.ts#L38)

___

### getPortOpeners

▸ **getPortOpeners**(`ns`): `string`[]

Get available port openers.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |

#### Returns

`string`[]

Port openers available.

#### Defined in

[helpers/crack.ts:58](https://github.com/vladzaharia/bitburner/blob/468eb83/src/helpers/crack.ts#L58)

___

### main

▸ **main**(`ns`): `Promise`<`void`\>

Crack host(s) from Terminal.

**`example`** Crack single passed in host.
run /helpers/crack.js [host0]

**`example`** Crack multiple passed in hosts.
run /helpers/crack.js [host0] ... [hostn]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |

#### Returns

`Promise`<`void`\>

#### Defined in

[helpers/crack.ts:16](https://github.com/vladzaharia/bitburner/blob/468eb83/src/helpers/crack.ts#L16)
