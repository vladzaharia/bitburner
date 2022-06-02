# Module: helpers/exec

## Table of contents

### Functions

- [exec](../wiki/helpers.exec#exec)
- [main](../wiki/helpers.exec#main)

## Functions

### exec

▸ **exec**(`ns`, `hostname`, `filename`, `threads?`, `args?`): `boolean`

Execute `filename` on `hostname` with given `threads` and `args`

**Note:** Script must exist on host. Use `/tools/scp-exec.js` to scp and execute.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `ns` | `NS` | `undefined` | The Netscript object. |
| `hostname` | `string` | `undefined` | The hostname to execute script on. |
| `filename` | `string` | `undefined` | The absolute path to the script. |
| `threads` | `number` | `1` | Optional number of threads to execute script with, defaults to 1. |
| `args` | `string`[] | `[]` | Optional args to pass to the script. |

#### Returns

`boolean`

Whether the script was successfully run.

#### Defined in

[helpers/exec.ts:51](https://github.com/vladzaharia/bitburner/blob/main/src/helpers/exec.ts#L51)

___

### main

▸ **main**(`ns`): `Promise`<`void`\>

Execute a given file on a given host.

**Note:** Script must exist on host. Use `/tools/scp-exec.js` to scp and execute.

**`example`** Execute a script on a host.
```shell
run /helpers/exec.js [host] [path-to-script]
```

**`example`** Execute a script on a host with given threads.
```shell
run /helpers/exec.js [host] [path-to-script] [threads]
```

**`example`** Execute a script on a host with given threads and args.
```shell
run /helpers/exec.js [host] [path-to-script] [threads] [arg0] ... [argn]
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |

#### Returns

`Promise`<`void`\>

#### Defined in

[helpers/exec.ts:25](https://github.com/vladzaharia/bitburner/blob/main/src/helpers/exec.ts#L25)
