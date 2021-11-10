---
title: query_task
order: 16
---

## query_task

调用**query_task**接口查询转码任务详情。



### URI

/api/query_task  



### HTTP请求方式 

GET  



### 请求参数 

| 名称    | 是否必填 | 类型   | 描述 |
| ------- | -------- | ------ | ----------- |
| task_id | 是     | string | 转码任务ID。 |



### 请求示例

```
{ 
   "task_id": "202111********78769ad64d9" 
}
```



### 返回参数  

| 名称                              | 类型   | 描述                                                         |
| --------------------------------- | ------ | ------------------------------------------------------------ |
| code                              | int    | API错误码。                                                  |
| src_bitrate                       | int    | 输入视频码率。                                               |
| dst_bitrate                       | int    | 输出视频码率。                                               |
| create_time                       | int    | 转码任务创建时间。<!--这里要确认一下是不是单个转码任务的创建和结束时间--> |
| finish_time                       | int    | 转码任务结束时间。                                           |
| input                             | string | 目标视频所在地址，该参数值来自`create_task`接口。            |
| input_url                         | string | 输入视频的可下载地址。                                       |
| output<!--这个参数是抓包看到的--> | string | <!--这个也是来自createtask接口么？-->                        |
| output_url                        | string | 输出视频的可下载地址。                                       |
| region                            | string | 存储桶所在的地域。                                           |
| status                            | string | 目标转码任务状态，取值：<br /><ul><li>pending：表示等待</li><li>running：表示正在转码</li><li>downloading：正在下载目标视频</li><li>uploading：正在上传目标视频</li><li>success：转码成功</li><li>fail：转码失败</li></ul> |
| region_type                       | string | 存储桶所属云厂商类型，如s3、oss、obs。                       |
| bucket                            | string | 存储桶名称。                                                 |
| objkey                            | string | 存储的文件对象名称<!--这个是create task接口的output参数么？--> |
| template_id                       | string | 转码参数模板ID。                                             |
| task_id                           | string | 转码任务ID。                                                 |
| template_name                     | string | 转码参数模板名称。                                           |
| err_code                          | int    | 转码结果错误码，取值：<br /><ul><li>0：转码成功</li><li>非0：转码失败</li></ul> |
| err_message                       | string | 转码结果错误码描述。                                         |
| msg                               | string | API错误码描述                                                |



### 返回示例

```
{    
    "code": 0,    
    "data": {      
        "bucket": "visionular-service"      
        "create_time": 1593120830     
        "dst_bitrate": 211.062      
        "err_code": 0      
        "err_message": "success"      
        "finish_time": 1593120845     
        "input": "s3://web-test-********860a6d00jf01jw2h5d7m4s-wm-720p.mp4"      
        "input_url": "https://web-test-********860a6d00jf01jw2h5d7m4s-wm-720p.mp4?AWSAccessKeyId=AKIA******OE4DW&Signature=Yr6wOw%2B9********&Expires=1593198759"      
        "objkey": "yushan1/output/testttttt.mp4"      
        "output_url": "https://visionular-********/output/testttttt.mp4?AWSAccessKeyId=AKIA******OE4DW&Signature=%2BXlvbRe********&Expires=1593198759"      
        "region": "ap-southeast-1"      
        "region_type": "s3"      
        "src_bitrate": 440.371     
        "status": "success"      
        "task_id": "202111********78769ad64d9"      
        "template_id": "builtin-MP4-264-360p"      
        "template_name": "MP4_264_360p"   
        },    
	"msg": "success"
}
```

