# CHANGES

### Unreleased

### [0.8.0] - 2024-03-06

- feat(nameserver): added GET_req, GET_res, POST, DELETE
- feat(group,permission,session,user): separate GET_req, GET_res
- feat(group,user): added DELETE
- feat(shared): added int8, uint8, int16, uint16, int32

### [0.7.4] - 2024-03-04

- feat(permission): added POST, GET, DELETE
- feat(group.GET): allows deleted property
- feat(session): exports id
- change(user): remove permission object

### [0.7.3] - 2024-02-28

- feat: permission updates
- feat: add shared.int32 and shared.uint32
- feat: improvements to zone and zone_record formats

### [0.7.2] - 2024-02-27

- group: GET returns parent_gid

### [0.7.1] - 2024-02-24

- group: parent_id can be zero

### [0.7.0] - 2024-02-24

- session: split to separate file
- user: sessionPost -> session.POST
- test: switch file names to \*.test.js
- group: added GET & POST
- shared: added meta

### [0.6.3] - 2024-02-23

- replace mocha with node's test runner
- user: permit @ character in username
- feat(user): export login, username, & password
- feat(zone_record): add zone_record validation
- feat(zone): added zone validation
- refactor: lib/common -> lib/shared
- feat(nameserver): added NS validation
- feat: import user & group tests from v2
- add group & permission

[0.6.3]: https://github.com/NicTool/validate/releases/tag/0.6.3
[0.7.0]: https://github.com/NicTool/validate/releases/tag/0.7.0
[0.7.1]: https://github.com/NicTool/validate/releases/tag/0.7.1
[0.7.2]: https://github.com/NicTool/validate/releases/tag/0.7.2
[0.7.3]: https://github.com/NicTool/validate/releases/tag/0.7.3
[0.7.4]: https://github.com/NicTool/validate/releases/tag/0.7.4
[0.8.0]: https://github.com/NicTool/validate/releases/tag/0.8.0
