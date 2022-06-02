# Module: helpers/backdoor

## Table of contents

### Functions

- [backdoorHost](../wiki/helpers.backdoor#backdoorhost)
- [main](../wiki/helpers.backdoor#main)

## Functions

### backdoorHost

▸ **backdoorHost**(`ns`, `route`): `Promise`<`void`\>

Connect to a host chain using `route` and backdoor the last server.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |
| `route` | ``false`` \| `string`[] | Route to use to backdoor, including target. |

#### Returns

`Promise`<`void`\>

#### Defined in

[helpers/backdoor.ts:37](https://github.com/vladzaharia/bitburner/blob/468eb83/src/helpers/backdoor.ts#L37)

___

### main

▸ **main**(`ns`): `Promise`<`void`\>

Backdoor a host using the Terminal.

**`example`** Backdoor single passed in host.
run /helpers/backdoor.js [host0]

**`example`** Backdoor multiple passed in hosts.
run /helpers/backdor.js [host0] ... [hostn]

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |

#### Returns

`Promise`<`void`\>

#### Defined in

[helpers/backdoor.ts:15](https://github.com/vladzaharia/bitburner/blob/468eb83/src/helpers/backdoor.ts#L15)
