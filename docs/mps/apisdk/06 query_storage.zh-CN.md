---
title: query_storage
order: 6
---








##  query_storage<!--这个需要确认是不是有，之前云市场的文档里是有的-->

调用**query_storage**接口查询存储空间信息。



### URL

/api/storage



### HTTP请求方式  
GET  



### 请求参数

| 名称       | 是否必填   | Type       | 描述 |
| ---------- | ---------- | ----------- | ----------- |
| StorageId       | 是      | string |  存储空间ID，ID必须由数字、字母、下划线、横杠组成。           |



### 请求示例

```
GET /api/storage?StorageId=aaaaaaaaaaaaaaaa HTTP/1.1
```



### 返回参数

| 名称       | Type       | 描述 |
| ---------- | ---------- | ----------- |
| Type | string | 存储空间的类型，取值：<br /><ul><li>s3</li><li>oss</li><li>obs</li><li>qn</li></ul> |
| Region | string     | 存储空间所在的区域 |
| Bucket | string     | 存储空间的Bucket名称 |
| StorageId | string     | 存储空间ID |
| Notify | string     | 转码任务完成后通知回调的URL |
| Code   | int  | API返回码    |
| Message | string  | API返回码描述 |



### 返回示例

```
HTTP/1.1 200 OK 
Content-Type: application/json 
{
   "Code": 0, 
   "Message": "success", 
   "Data": { 
      "StorageId": "aaaaaaaaaaaaaaaa", 
      "Type": "obs", 
      "Region": "cn-beijing-4", 
      "Bucket": "bucketname", 
      "Notify": "" 
      } 
}
```

