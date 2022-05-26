# Bitburner scripts

Scripts used in my Bitburner deployment.

## `/helpers/`

Various helper scripts to execute common commands, can be run or imported.

- `crack.js`: Cracks given server(s)
- `discover.js`: Discover personal, crackable, hackable, rooted servers
- `exec.js`: Executes a script on a hostname
- `grow.js`: Grow 1+ servers
- `hack-weaken-grow.js`: Execute basic HWG on 1+ servers *(not recommended)*
- `hack.js`: Hack 1+ servers
- `scp.js`: SCP helpers and a script to a server
- `weaken.js`: Weaken 1+ servers

## `/node/`

Scripts for automating Bitburner operations.

Purchasers:

- `ps-control-hacknet.js`: Automatically upgrade Hacknet nodes
- `ps-control-purchaser.js`: Automatically buy new servers

Hackers:

- `ps-control-cracker.js`: Discover and crack servers that can be cracked
- `ps-control-scheduler.js`: Schedule new nodes to run thread-split HWG
- `ps-control-watcher.js`: List rooted and personal servers

## `/tools/`

Scripts for manual operations.

- `legacy/`: Older scripts
- `scp-exec.js`: SCP and execute script with given threads and args (or automatic 100% usage)

Purchasers:

- `purchase-server.js`: Buy 1+ new servers with given RAM and hostnames
- `sell-server.js`: Sell 1+ servers with given hostnames

## `init.js`

Execute all `/node` scripts on `home` server, starting automation.
