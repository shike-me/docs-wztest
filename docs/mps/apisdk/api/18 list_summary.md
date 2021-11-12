---
title: list_summary
order: 18
---

## list_summary

调用**list_summary**接口查询指定之间段内小时级的转码任务列表。<!--这个需要确认一下是不是这个意思-->

**说明**: 目前只支持小时级别的统计粒度。<!--这个不用说明吧？-->

### URI

/api/list_summary



### HTTP请求方式

GET



### 请求参数

| 名称             | 是否必填 | 类型 | 描述                                                    |
| ---------------- | -------- | ---- | ------------------------------------------------------- |
| start_time       | 否       | int  | 指定小时数，由服务端计算时间戳，默认48小时前。<!--？--> |
| end_time         | 否       | int  | 指定小时数，由服务端计算时间戳，默认24小时前。          |
| time_granularity |          |      |                                                         |



### 请求示例

```
{
    "start_time" = 24
    "end_time" = 0
    "time_granularity" = "hourly"
}
```



### 返回参数<!--待完善-->

| 名称                                | 类型      | 描述                 |
| ----------------------------------- | --------- | -------------------- |
| code                                | int       | API错误码。          |
| list                                | jsonarray | 小时级转码任务列表。 |
| "count_cn-hangzhou-internal_h264_hd |           |                      |
| count_cn-hangzhou-internal_h264_sd  |           |                      |



### 返回示例<!--（新言提供的示例）-->

```
{"code":0,"data":{"list":[{
"count_cn-hangzhou-internal_h264_hd":0,
"count_cn-hangzhou-internal_h264_sd":0,
"count_cn-hangzhou-internal_h265_hd":0,
"count_cn-hangzhou-internal_h265_sd":0,
"count_cn-hangzhou_h264_hd":0,
"count_cn-hangzhou_h264_sd":0,
"count_cn-hangzhou_h265_hd":0,
"count_cn-hangzhou_h265_sd":0,
"count_hd":0,
"count_sd":0,
"count_total":0,
"duration_cn-hangzhou-internal_h264_hd":0,
"duration_cn-hangzhou-internal_h264_sd":0,
"duration_cn-hangzhou-internal_h265_hd":0,
"duration_cn-hangzhou-internal_h265_sd":0,
"duration_cn-hangzhou_h264_hd":0,
"duration_cn-hangzhou_h264_sd":0,
"duration_cn-hangzhou_h265_hd":0,
"duration_cn-hangzhou_h265_sd":0,
"duration_hd":0,
"duration_sd":0,
"duration_total":0,
"time_stamp":1633917600
},
],
"num":1,
"regions":[
"cn-hangzhou",
"cn-hangzhou-internal"
],
"resolution_types":["sd","hd","4k"]
},
"msg":"success"
}
```



### 返回示例 

```
{    
"code": 0,    
"data": {       
"list": [           
{                
"time_stamp": 1581041708,               
"count_total": 100,                
"count_sd": 50,                
"count_hd": 50,                
"duration_total": 1000,                
"duration_sd": 500,               
"duration_hd": 500,               
"count_region1_h264_sd": 25,               
"count_region1_h264_hd": 25,               
"count_region1_h265_sd": 25,               
"count_region1_h265_hd": 25,               
"duration_region1_h264_sd": 250,                
"duration_region1_h264_hd": 250,                
"duration_region1_h265_sd": 250,               
"duration_region1_h265_hd": 250           
},            
{               
"time_stamp": 1581041708,                "count_total": 100,                "count_sd": 50,                "count_hd": 50,                "duration_total": 1000,                "duration_sd": 500,                "duration_hd": 500,                "count_region1_h264_sd": 25,                "count_region1_h264_hd": 25,                "count_region1_h265_sd": 25,                "count_region1_h265_hd": 25,                "duration_region1_h264_sd": 250,                "duration_region1_h264_hd": 250,                "duration_region1_h265_sd": 250,                "duration_region1_h265_hd": 250            }        ],        "resolution_types":["sd","hd"],        "regions":["region1"],        "num": 2    },    "msg": "success"}
```