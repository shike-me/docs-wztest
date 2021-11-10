---
title: list_task
order: 17
---

## list_task

调用**list_task**接口列出转码任务。



### URI 

/api/list_task  



### HTTP请求方式 

GET  



### 请求参数  

| 名称       | 是否必填 | 类型                           | 描述                                                         |
| ---------- | -------- | ------------------------------ | ------------------------------------------------------------ |
| start_time | 是       | int<!--这个类型需要去人一下--> | 按时间查询时，指定查询转码记录的起始时间，unix时间戳，10位。 |
| end_time   | 是       | int                            | 按时间查询时，指定查询转码记录的终止时间，unix时间戳，10位。 |
| status     | 否       | string                         | 指定目标转码任务的状态，取值：<br /><ul><li>pending：表示等待</li><ul><li>running：表示正在转码<!--这个需要确认一下--></li><li>downloading：正在下载目标视频</li><li>uploading：正在上传目标视频</li><li>success：转码成功</li><li>fail：转码失败</li></ul><br />默认值为空，表示查询所有转码状态的任务。 |
| start_num  | 否       | int                            | 默认0<!--？-->                                               |
| count      | 否       | int                            | 默认50<!--这个是分页用的？-->                                |



### 请求示例

```
{ 
   "start_time": "1633708800"
    "end_time": "1636387199"
    "status": 
    "start_num": "0"
    "count": "50"	 
}
```

<!--如果是int应该不用双引号吧-->



### 返回参数 

| 名称        | 类型       | 描述                                                         |
| ----------- | ---------- | ------------------------------------------------------------ |
| code        | int        | API错误码。                                                  |
| list        | json array | 转码任务列表。                                               |
| bucket      | string     | 存储桶名称。                                                 |
| create_time | int | 转码任务创建时间。<!--这里要确认一下是不是单个转码任务的创建和结束时间--> |
| dst_bitrate   | int    | 输出视频码率。|
| err_code      | int    | 转码结果错误码，取值：<br /><ul><li>0：转码成功</li><li>非0：转码失败</li></ul> |
| err_message | string | 转码结果错误码描述。                                         |
| finish_time | int | 转码任务结束时间。 |
| input         | string | 目标视频所在地址，该参数值来自`create_task`接口。            |
| input_url     | string | 输入视频的可下载地址。                                       |
| output        | string | 目标视频 <!--问题同query_task-->                              |
| output_url    | string | 输出视频的可下载地址。                                       |
| objkey        | string | 存储的文件对象名称<!--问题同query_task-->                       |
| region        | string | 存储桶所在的地域。 |
| region_type   | string | 存储桶所属云厂商类型，如s3、oss、obs。                       |
| src_bitrate   | int    | 输入视频码率。|
| status      | string     | 目标转码任务状态，取值：<br /><ul><li>pending：表示等待</li><li>running：表示正在转码</li><li>downloading：正在下载目标视频</li><li>uploading：正在上传目标视频</li><li>success：转码成功</li><li>fail：转码失败</li></ul>       |
| template_id   | string | 转码参数模板ID。                                             |
| task_id       | string | 转码任务ID。                                                 |
| template_name | string | 转码参数模板名称。|
| total       | int        | 指定查询时间段且在指定转码状态内下的查询记录总数。<!--total和num有啥区别--> |
| num         | int        | 本次查询返回的实际转码任务记录数。                           |
| msg | string | API错误码描述。 |



### 返回示例  

```
{
    "code":0,
    "data":{
    "list:[
    {
        "bucket":"cloudhub",
        "create_time":1634020557,
        "dst_bitrate":437.01,
        "err_code":0,
        "err_message":"Succeeded",
        "finish_time":1634020568,
        "input":"https://hztst.********-720p-original.mp4",
        "input_url":"https://hztst.********us-720p-original.mp4",
        "objkey":"wangxinyan_test/output/20211012143532.mp4",
        "output":"oss://cloudhub/******/20211012141612.mp4",
        "output_url":"https://cloudhub.********211012143532.mp4",
        "region":"cn-zhangjiakou",
        "region_type":"oss",
        "src_bitrate":3898.93,
        "status":"success",
        "task_id":"2021101********c0039679f3",
        "template_id":"727******8989",
        "template_name":"wz_MP4_h264_360p"
    },
    {
        "bucket":"cloudhub",
        "create_time":1634019335,
        "dst_bitrate":282.47,
        "err_code":0,
        "err_message":"Succeeded",
        "finish_time":1634019345,
        "input":"https://hztst.********/cactus-720p-original.mp4",
        "input_url":"https://hztst.********/cactus-720p-original.mp4",
        "objkey":"wangxinyan_test/output/20211012141612.mp4",
        "output":"oss://cloudhub/******/20211012141612.mp4",
        "output_url":"https://cloudhub.********/20211012141612.mp4",
        "region":"cn-zhangjiakou",
        "region_type":"oss",
        "src_bitrate":3898.93,
        "status":"success",
        "task_id":"2021101********20c7cb938",
        "template_id":"461******a59cc",
        "template_name":"MP4_264_Test"
    }
    ],
    "num":2,
    "total":2
    },
    "msg":"success"
}
```

