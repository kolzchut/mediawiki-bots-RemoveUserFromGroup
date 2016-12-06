# RemoveUserFromGroup (node.js script for MediaWiki)

This script was return because MediaWiki doesn't have a builtin
maintenance script to remove groups from users. It uses the [MediaWiki API].

[MediaWiki API]: https://www.mediawiki.org/wiki/API:User_group_membership#Adding_users_to_and_removing_them_from_groups

## Setup
1. `$ npm install`
2. Copy `config_example.json` as `config.json` and enter the following as appropriate for your wiki:
    - server (e.g. example.com)
    - path (the default for MediaWiki is "/w/")
    - username
    -  password


## Run
There are only two simple parameters:

- groups: a list of groups to remove the user from, separated by `|` (pipe/vertical bar)
- users: a list of users to remove from said groups, separated by `|` (pipe/vertical bar)

Example:
`node removeUserFromGroup.js --groups "editor|tester" --users "James Dean|Popeye|Snow White"`
