## MenuTree 使用说明

### 引入组件
    1. 使用次组件引进menuTree.js,menuTree.css 即可
    2. 本组件基于jquery,在引入本组件之前必须引入jquery插件,注意引进顺序
   
### 使用
    
   $('#id').MenuTree(opts)<br/>
   id:必须,  放菜单的div的id
   opts:参数(名字可自定义), 非必传, 包含nodeId,data <br/>
   结构如下:
   ```
     var opts = {
           data: mJson,
           nodeId: 'menuTreeBox'
       }       
   ```
   nodeId:放菜单的div的id (字段名不可自定义)<br/>
   data:json格式的数据 , 字段名不可自定义更改, 数据结构如下:
   ```
    var mJson = [
           {
               name: "收件箱",
               parent: true,
               url: "https://www.baidu.com",
               children: [
                   {
                       name: "收件箱1",
                       parent: false,
                       url: "https://www.baidu.com",
                       children: [
                           {
                               name: "收件箱11",
                               parent: false,
                               url: "https://www.baidu.com",
                               children: [
                                   {
                                       name: "收件箱111",
                                       parent: false,
                                       url: "https://www.baidu.com"
                                   },
                               ]
                           },
                       ]
                   }
               ]
           },
           {
               name: "草稿箱",
               parent: false,
               url: "https://www.baidu.com"
           }
       ]
   ```
  ### 事件
  本组件暂时只支持点击事件openMenuTreeNodes,接收一个节点node参数,返回节点数据
  ```   
  function openMenuTreeNodes(node) {
          console.log('node:',node)
  
      }
  ```
  
 本人第一次写组件,如有不足,或疑问欢迎留言,感激不尽!


   
