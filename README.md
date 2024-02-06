# Validate

NicTool Object Validation

# Description

Validation class for objects in NicTool. Analgous to Nictool/../\*/Sanity in v2.

# Test

```
> npm test


  group
    name
      ✔ accepts valid
      ✔ rejects missing name
      ✔ rejects too short
      ✔ rejects too long
      ✔ rejects invalid character: ~
      ✔ rejects invalid character: `
      ✔ rejects invalid character: !
      ✔ rejects invalid character: $
      ✔ rejects invalid character: %
      ✔ rejects invalid character: ^
      ✔ rejects invalid character: &
      ✔ rejects invalid character: *
      ✔ rejects invalid character: (
      ✔ rejects invalid character: )
      ✔ rejects invalid character: +
      ✔ rejects invalid character: =
      ✔ rejects invalid character: [
      ✔ rejects invalid character: ]
      ✔ rejects invalid character: \
      ✔ rejects invalid character: /
      ✔ rejects invalid character: |
      ✔ rejects invalid character: ?
      ✔ rejects invalid character: >
      ✔ rejects invalid character: <
      ✔ rejects invalid character: "
      ✔ rejects invalid character: :
      ✔ rejects invalid character: ;
      ✔ rejects invalid character: ,
      ✔ rejects invalid character: #
      ✔ rejects invalid character: {
      ✔ rejects invalid character: }
      ✔ rejects invalid character: 

      ✔ rejects if first character is not alphanumeric: -test
      ✔ rejects if first character is not alphanumeric: _test
      ✔ rejects if first character is not alphanumeric: 'test
      ✔ rejects if first character is not alphanumeric: .test
      ✔ rejects if first character is not alphanumeric: @test

  user
    username
      ✔ accepts valid
      ✔ rejects missing
      ✔ rejects too short
      ✔ rejects too long
      ✔ rejects invalid character: ~
      ✔ rejects invalid character: `
      ✔ rejects invalid character: !
      ✔ rejects invalid character: @
      ✔ rejects invalid character: $
      ✔ rejects invalid character: %
      ✔ rejects invalid character: ^
      ✔ rejects invalid character: &
      ✔ rejects invalid character: *
      ✔ rejects invalid character: (
      ✔ rejects invalid character: )
      ✔ rejects invalid character: +
      ✔ rejects invalid character: =
      ✔ rejects invalid character: [
      ✔ rejects invalid character: ]
      ✔ rejects invalid character: \
      ✔ rejects invalid character: /
      ✔ rejects invalid character: |
      ✔ rejects invalid character: ?
      ✔ rejects invalid character: >
      ✔ rejects invalid character: <
      ✔ rejects invalid character: "
      ✔ rejects invalid character: '
      ✔ rejects invalid character: :
      ✔ rejects invalid character: ;
      ✔ rejects invalid character: ,
      ✔ rejects invalid character: #
      ✔ rejects invalid character: {
      ✔ rejects invalid character: }
      ✔ rejects invalid character: 

    email
      ✔ accepts valid
      ✔ rejects missing
      ✔ rejects invalid format
    password
      ✔ accepts a strong password
      ✔ rejects missing
      ✔ rejects too short password
      - rejects password contains username


  77 passing (17ms)
  1 pending

```
