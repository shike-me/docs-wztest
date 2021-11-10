---
title: list_storage_type
order: 8
---

## list_storage_type

调用**list_storage_type**接口查询存储桶类型。<!--这个需要确认是查询用户用的还是我们支持的-->
**说明**: 该接口不需要鉴权。<!--其他的接口也没说需要鉴权，应该就是addstorage需要吧？-->



### URL

/api/list_storage_type  



### HTTP请求方法  

GET  



### 返回参数

| 名称 | 类型       | 描述 |
| ---- | ---------- | ---- |
| list | json array |      |
| num  | int        |      |



### 返回示例

```
{
    "code": 0,
    "data": {
        "list": [
            "s3"
        ],
        "num": 1
    },
    "msg": "success"
}
```

