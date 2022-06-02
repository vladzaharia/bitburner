# Module: helpers/crack

## Table of contents

### Functions

- [crack](../wiki/helpers.crack#crack)
- [getPortOpeners](../wiki/helpers.crack#getportopeners)
- [main](../wiki/helpers.crack#main)

## Functions

### crack

▸ **crack**(`ns`, `hostname`): `void`

Crack given host using available port openers and nuke.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |
| `hostname` | `string` | Hostname to crack |

#### Returns

`void`

#### Defined in

[helpers/crack.ts:48](https://github.com/vladzaharia/bitburner/blob/main/src/helpers/crack.ts#L48)

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

[helpers/crack.ts:68](https://github.com/vladzaharia/bitburner/blob/main/src/helpers/crack.ts#L68)

___

### main

▸ **main**(`ns`): `Promise`<`void`\>

Crack host(s) from Terminal.

**`example`** Crack single passed in host.
```shell
run /helpers/crack.js [host0]
```

**`example`** Crack multiple passed in hosts.
```shell
run /helpers/crack.js [host0] ... [hostn]
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |

#### Returns

`Promise`<`void`\>

#### Defined in

[helpers/crack.ts:26](https://github.com/vladzaharia/bitburner/blob/main/src/helpers/crack.ts#L26)
