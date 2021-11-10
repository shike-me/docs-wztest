---
title: list_storage
order: 7
---


##  list_storage<!--华为云市场的那份文档有个query_storage_list-->

调用**list_storage**接口查询存储桶列表。



### URL

/api/list_storage



### HTTP请求方式  
GET  



### 请求参数

None



### 返回参数

| 名称       | 类型       | 描述 |
| ---------- | ---------- | ----------- |
| code | int | API错误码。 |
| list       | json array | 存储桶列表。 |
| bucket     | string     | 存储桶名称。 |
| create_time<!--这个是抓包抓到的--> | int<!--报文里这个参数没有加引号--> | 存储桶创建的时间。 |
| extra<!--这个是抓包抓到的--> | string |  |
| name_rule<!--这个是抓包抓到的--> | string |  |
| notify_info<!--这个是抓包抓到的--> | string |  |
| prefix     | string     | 输出文件目录或前缀。 |
| region     | string     | 存储桶所在的地域，如cn-zhangjiakou 、cn-hangzhou。 |
| storage_id | string     | 存储桶ID。 |
| type       | string     | 存储桶所属云厂商类型，如s3、oss、obs。 |
| update_time<!--这个是抓包抓到的--> | int<!--报文里这个参数没有加引号--> |  |
| num        | int        | 列表中存储桶数量。 |
| msg | string | API错误码描述。 |



### 返回示例

```
{
    "code": 0,
    "data": {
        "list": [
            {    
                "bucket":"cloudhub",
                "create_time":1636439797,
                "extra":"",
                "name_rule":"",
                "notify_info":"",
                "prefix":"AA",
                "region":"cn-zhangjiakou",
                "storage_id":"108f******69cc",
                "type":"oss",
                "update_time":1636439797"
            }
        ],
        "num": 1
    },
    "msg": "success"
}

```