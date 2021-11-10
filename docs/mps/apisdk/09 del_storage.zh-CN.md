---
title: del_storage
order: 9
---


## del_storage

调用**del_storage**接口删除存储桶。



### URL

/api/del_storage



### HTTP请求方法  

DELETE  



### 请求参数

| 名称       | 是否必填 | 类型   | 描述 |
| ---------- | -------- | ------ | ----------- |
| storage_id | True     | string | 存储桶ID。 |



### 请求示例

```
{
    "storage_id": b505******a128
}
```




### 返回参数

| 名称 | 类型   | 描述            |
| ---- | ------ | --------------- |
| code | int    | API错误码。     |
| msg  | string | API错误码描述。 |



### 返回示例 

```
{
    "code": 0,
    "data": null,
    "msg": "success"
}
```

