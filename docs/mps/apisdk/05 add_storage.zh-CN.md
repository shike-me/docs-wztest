---
title: add_storage
order: 5
---


## add_storage
调用**add_storage**接口创建用于存储输出媒体文件的存储桶。



### URL

/api/add_storage  



### HTTP方法 
POST  



### 请求参数

| 名称       | 是否必填 | 类型   | 描述                              |
| ---------- | -------- | ------ | ---------------------------------------- |
| region   | True     | string | 存储桶所在的地域，如cn-zhangjiakou 、cn-hangzhou。 |
| type       | True     | string | 存储桶所属云厂商类型，如s3、oss、obs。    |
| bucket     | True     | string | 存储桶名称。存储桶名称不能含有大写字母且长度不小于3个字符。<!--我自己试的时候不能用大写字母，还是需要确认一下--> |
| prefix | False    | string | 输出文件目录或前缀。                      |
| storage_ak | False    | string | 可访问存储桶的AccessKey，若存储桶为私有访问则必须设置。 |
| storage_sk | False    | string | 可访问存储桶的AccessSecretKey，若存储桶为私有访问则必须设置。 |
| notify<!--需要确认是否有这个字段，网上抓包是没有的，但是云市场的文档里有--> | False | string | 转码任务完成后通知回调的URL。 |

<!--界面上还有配置outputpath的参数项-->

### 请求示例

```
{ 
   "bucket": "bucketname", 
   "prefix": "AA",
   "type": "obs", 
   "region": "cn-beijing-4", 
   "storage_aK": "accesskey", 
   "storage_sK": "secretkey",
   "type": "oss"   
}
```



### 返回参数

| 名称       | 类型   | 描述             |
| ---------- | ------ | ---------------- |
| code       | int    | API错误码。      |
| storage_id | string | 新建存储桶的ID。 |
| msg        | string | API错误码描述。  |



### 返回示例  

```
{
    "code": 0,
    "data": {
        "storage_id": "4303******bfcad"
    },
    "msg": "success"
}
```