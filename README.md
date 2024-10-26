TypeScript React AntD Table shouldCellUpdate Demo
==============================================

shouldCellUpdate 主要是为了优化性能，当判断某个cell中的数据未发生变化时，不会重新render它。

只有在column中使用render定义时，shouldCellUpdate才会生效。
如果使用提dataIndex + onCell等方式，未使用render，则shouldCellUpdate不会生效。

如果shouldCellUpdate返回true，则会调用相应render，否则不会调用。

```
npm install
npm start
```

It will open page on browser automatically.
