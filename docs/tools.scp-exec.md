# Module: tools/scp-exec

## Table of contents

### Functions

- [main](../wiki/tools.scp-exec#main)

## Functions

### main

▸ **main**(`ns`): `Promise`<`void`\>

Copy and execute a given file on a given host.

**`example`** Copy and execute /helpers/hack-weaken-grow.js on all personal and rooted servers.
```shell
run /tools/scp-exec.js
```

**`example`** Copy and execute script on given host.
```shell
run /tools/scp-exec.js [host] [path-to-script]
```

**`example`** Copy and execute script on worker servers.
```shell
run /tools/scp-exec.js worker [path-to-script]
```

**`example`** Copy and execute script on host with given threads and args.
```shell
run /tools/scp-exec.js [host] [path-to-script] [threads] [arg0] ... [argn]
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |

#### Returns

`Promise`<`void`\>

#### Defined in

[tools/scp-exec.ts:37](https://github.com/vladzaharia/bitburner/blob/main/src/tools/scp-exec.ts#L37)
