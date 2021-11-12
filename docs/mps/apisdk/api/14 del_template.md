---
title: del_template
order: 14
---


## del_template

调用**del_template**接口删除转码参数模板。



### URL

/api/del_template  



### HTTP请求方法 

DELETE  



### 请求参数 

| 名称 | 是否必填 | 类型   | 描述 |
| ---- | -------- | ------ | ----------- |
| name | 是     | string | 模板名称。 |



### 请求示例

```
{ 
   "name": "template"
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
