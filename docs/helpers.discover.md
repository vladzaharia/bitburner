# Module: helpers/discover

## Table of contents

### Functions

- [getControlServers](../wiki/helpers.discover#getcontrolservers)
- [getCrackableHosts](../wiki/helpers.discover#getcrackablehosts)
- [getHackableHosts](../wiki/helpers.discover#gethackablehosts)
- [getHosts](../wiki/helpers.discover#gethosts)
- [getPersonalServers](../wiki/helpers.discover#getpersonalservers)
- [getRootedHosts](../wiki/helpers.discover#getrootedhosts)
- [getRoute](../wiki/helpers.discover#getroute)
- [getWorkerServers](../wiki/helpers.discover#getworkerservers)
- [main](../wiki/helpers.discover#main)

## Executable

### main

▸ **main**(`ns`): `Promise`<`string`[]\>

Get all available and crackable hosts via Terminal, to a default depth of 5.

**`example`** Discover hosts to depth of 5.
```shell
run /helpers/discover.js
```

**`example`** Discover hosts to passed in depth.
```shell
run /helpers/discover.js [depth]
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |

#### Returns

`Promise`<`string`[]\>

#### Defined in

[helpers/discover.ts:22](https://github.com/vladzaharia/bitburner/blob/main/src/helpers/discover.ts#L22)

## Importable

### getControlServers

▸ **getControlServers**(`ns`): `string`[]

Get list of all personal Control servers.

**`async`**

**`deprecated`** Control servers have been superceded by scripts running on "home"

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |

#### Returns

`string`[]

All Control servers available from "home".

#### Defined in

[helpers/discover.ts:86](https://github.com/vladzaharia/bitburner/blob/main/src/helpers/discover.ts#L86)

___

### getCrackableHosts

▸ **getCrackableHosts**(`ns`, `hostnames?`, `depth?`): `string`[]

Get list of crackable hosts from "home".

**`async`**

**`see`** "crackable" - Can crack using current hacking level and port openers.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |
| `hostnames?` | `string`[] | Optional list of hostnames to check crackability, uses all available servers to `depth`. |
| `depth?` | `number` | Optional depth to search to, defaults to 10. |

#### Returns

`string`[]

All crackable hosts available from "home".

#### Defined in

[helpers/discover.ts:123](https://github.com/vladzaharia/bitburner/blob/main/src/helpers/discover.ts#L123)

___

### getHackableHosts

▸ **getHackableHosts**(`ns`, `hostnames?`, `depth?`): `string`[]

Get list of hackable hosts from "home".

**`async`**

**`see`** "hackable" - Is rooted and has max money > 0.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |
| `hostnames?` | `string`[] | Optional list of hostnames to check crackability, uses all available servers to `depth`. |
| `depth?` | `number` | Optional depth to search to, defaults to 10. |

#### Returns

`string`[]

All hackable hosts available from "home".

#### Defined in

[helpers/discover.ts:201](https://github.com/vladzaharia/bitburner/blob/main/src/helpers/discover.ts#L201)

___

### getHosts

▸ **getHosts**(`ns`, `depth`): `string`[]

Get available hosts to a specified `depth`.

**`async`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |
| `depth` | `number` | The depth to search to. |

#### Returns

`string`[]

All hosts available from "home" to `depth`.

#### Defined in

[helpers/discover.ts:43](https://github.com/vladzaharia/bitburner/blob/main/src/helpers/discover.ts#L43)

___

### getPersonalServers

▸ **getPersonalServers**(`ns`): `string`[]

Get a list of all personal servers.

**`async`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |

#### Returns

`string`[]

All personal servers available from "home".

#### Defined in

[helpers/discover.ts:64](https://github.com/vladzaharia/bitburner/blob/main/src/helpers/discover.ts#L64)

___

### getRootedHosts

▸ **getRootedHosts**(`ns`, `hostnames?`, `depth?`): `string`[]

Get list of rooted hosts from "home".

**`async`**

**`see`** "rooted" - Was successfully cracked via `/helpers/crack.js`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |
| `hostnames?` | `string`[] | Optional list of hostnames to check crackability, uses all available servers to `depth`. |
| `depth?` | `number` | Optional depth to search to, defaults to 10. |

#### Returns

`string`[]

All rooted hosts available from "home".

#### Defined in

[helpers/discover.ts:163](https://github.com/vladzaharia/bitburner/blob/main/src/helpers/discover.ts#L163)

___

### getRoute

▸ **getRoute**(`ns`, `hostname`): `string`[] \| ``false``

Get route from "home" to `hostname`.

**`async`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |
| `hostname` | `string` | The hostname to try and get a path to. |

#### Returns

`string`[] \| ``false``

Either the path to the host from home, or false if no path is found.

#### Defined in

[helpers/discover.ts:238](https://github.com/vladzaharia/bitburner/blob/main/src/helpers/discover.ts#L238)

___

### getWorkerServers

▸ **getWorkerServers**(`ns`): `string`[]

Get list of all personal Worker servers.

**`async`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ns` | `NS` | The Netscript object. |

#### Returns

`string`[]

All Worker servers available from "home".

#### Defined in

[helpers/discover.ts:103](https://github.com/vladzaharia/bitburner/blob/main/src/helpers/discover.ts#L103)
