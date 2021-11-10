---
title: create_task
order: 15
---

## create_task

调用**create_task**接口创建转码任务。

**说明**：多模版转码时，需要多次调用接口，一个转码任务只能使用一个模板。<!--确认这个说法-->



### URI  

/api/create_task  



### HTTP请求方式  

POST  



### 请求参数

| 名称          | 是否必填 | 类型   | 描述                                                         |
| ------------- | -------- | ------ | ------------------------------------------------------------ |
| template_name | 是       | string | 转码模板名称。                                               |
| input         | 是       | string | 目标视频所在的地址。                                         |
| output        | 是       | string | 目标视频转码后输出媒体文件的文件名。<!--这个不是名称吧？地址？--> |
| storage_id    | 是       | string | 用于存储输出媒体文件的存储桶ID。                             |



### 请求示例

```
{
    input: "https://hztst.********/cactus-720p-original.mp4"
    output: "account/output/test"
    storage_id: "visionular_space"
    template_name: "MP4_265_480p"
}
```



### 返回参数

| 名称    | 类型   | 描述 |
| ------- | ------ | ----------- |
| code | int | API错误码。 |
| task_id | string | 转码任务ID。 |
| msg | string | API错误码描述。 |



### 返回示例

```
{    
    "code": 0,    
    "data": {        
        "task_id": "202002101111143039beb709bfcad"    
     },    
    "msg": "success"
}
```