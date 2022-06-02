# Module: helpers/hack-weaken-grow

## Table of contents

### Functions

- [hackWeakenGrow](../wiki/helpers.hack-weaken-grow#hackweakengrow)
- [main](../wiki/helpers.hack-weaken-grow#main)

## Executable

### main

▸ **main**(`ns`): `Promise`<`void`\>

run /helpers/a serial hack/weaken/grow script via the Terminal.

**`deprecated`** Serial HWG has been replaced with `/node/ps-control-scheduler.js` as the recommended way to run HWG.

**`example`** Run HWG on a single passed in host.
```shell
run /helpers/hack-weaken-grow.js [host0]
```

**`example`** Run HWG on multiple passed in hosts.
```shell
run /helpers/hack-weaken-grow.js [host0] ... [hostn]
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |

#### Returns

`Promise`<`void`\>

#### Defined in

[helpers/hack-weaken-grow.ts:27](https://github.com/vladzaharia/bitburner/blob/main/src/helpers/hack-weaken-grow.ts#L27)

## Importable

### hackWeakenGrow

▸ **hackWeakenGrow**(`ns`, `hostname`): `Promise`<`number`\>

Run serial HWG on given `hostname`.

**`async`**

**`deprecated`** Serial HWG is not recommended. Please use a parallelized HWG with thread count percentages instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |
| `hostname` | `string` | The hostname to run HWG on. |

#### Returns

`Promise`<`number`\>

The amount of money hacked, minus any growth action taken.

#### Defined in

[helpers/hack-weaken-grow.ts:54](https://github.com/vladzaharia/bitburner/blob/main/src/helpers/hack-weaken-grow.ts#L54)
