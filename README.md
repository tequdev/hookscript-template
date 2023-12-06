# hookscript template

[hookscript repo](https://github.com/XRPL-Labs/hookscript/tree/main)
[hookscript Document](https://github.com/XRPL-Labs/hookscript/blob/main/DOC.md)

## script

### install xrpld-cli

```bash
npm i -g xrpld-cli
```

### build hook

```bash
yarn build
```

### run hook (deploy, test)

```bash
yarn test
```

### log

```bash
docker logs xrpld-standalone 2>&1 | grep HookTrace
```
