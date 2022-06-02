# Module: tools/legacy/ps-control-scheduler-eg

## Table of contents

### Functions

- [main](../wiki/tools.legacy.ps-control-scheduler-eg#main)

## Functions

### main

▸ **main**(`ns`): `Promise`<`void`\>

Automatically execute a parallelized HWG cycle on all availbe hosts.

On each pool, will:
 - Split hackable hosts by workers in pool
 - Check if any host is low on money
 - Execute 80W/20G (if money needed) or 25H/25W/50G scripts on hosts in pool

Pools:
 - Personal worker pools, ps-worker[0..n]
 - Rooted server pools, with `HOSTS_PER_POOL`
 - ["home"]

**`example`**
run /node/ps-control-scheduler.js

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |

#### Returns

`Promise`<`void`\>

#### Defined in

[tools/legacy/ps-control-scheduler-eg.ts:40](https://github.com/vladzaharia/bitburner/blob/89080f7/src/tools/legacy/ps-control-scheduler-eg.ts#L40)
