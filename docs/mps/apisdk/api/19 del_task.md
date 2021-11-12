---
title: del_task
order: 19
---

## del_task

调用**del_task**接口删除转码任务。



### URI  

/api/del_task  



### HTTP请求方式

DELETE  



### 请求参数

| 名称    | 是否必填 | 类型   | 描述 |
| ------- | -------- | ------ | ----------- |
| task_id | 是     | string | 转码任务ID。 |



### 请求示例

```
{ 
   "task_id": "20211105164744212159b78769ad64d9"
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