# 14-Angular 4.0从入门到实战 打造股票管理网站  全

# 第八章

*初始化server文件夹生成一个package.json文件*

**npm init -y
Wrote to D:\workspace\AG2\server\package.json: **

```json
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

*引入node 的typescript文件*

**npm i @types/node --save**

*新加一个typescript.json文件*

```
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "sourceMap": true ,

    "emitDecoratorMetadate": true,
    "experimentalDecorators": true,
    "outDir": "build",
    "lib": ["es6"]
  },
  "exclude": [
    "node_modules"
  ]
}
```

 