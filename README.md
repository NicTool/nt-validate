# Validate

NicTool Object Validation

# Description

Validation class for objects in NicTool. Analgous to Nictool/../\*/Sanity in v2.



# Test

````
> npm test

  user
    username
      ✔ accepts valid
      ✔ rejects missing
      ✔ rejects too short
      ✔ rejects too long
    email
      ✔ accepts valid
      ✔ rejects missing
      ✔ rejects invalid format
    password
      ✔ rejects missing
      ✔ accepts a strong password
      ✔ rejects a short password
      - rejects password contains username


  10 passing (6ms)
  1 pending


````
