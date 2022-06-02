# Module: helpers/backdoor

## Table of contents

### Functions

- [backdoor](../wiki/helpers.backdoor#backdoor)
- [main](../wiki/helpers.backdoor#main)

## Functions

### backdoor

▸ **backdoor**(`ns`, `route`): `Promise`<`void`\>

Connect to a host chain using `route` and backdoor the last server.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |
| `route` | ``false`` \| `string`[] | Route to use to backdoor, including target. |

#### Returns

`Promise`<`void`\>

#### Defined in

[helpers/backdoor.ts:41](https://github.com/vladzaharia/bitburner/blob/main/src/helpers/backdoor.ts#L41)

___

### main

▸ **main**(`ns`): `Promise`<`void`\>

Backdoor a host using the Terminal.

**`example`** Backdoor single passed in host.
```shell
run /helpers/backdoor.js [host0]
```

**`example`** Backdoor multiple passed in hosts.
```shell
run /helpers/backdor.js [host0] ... [hostn]
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |

#### Returns

`Promise`<`void`\>

#### Defined in

[helpers/backdoor.ts:19](https://github.com/vladzaharia/bitburner/blob/main/src/helpers/backdoor.ts#L19)
