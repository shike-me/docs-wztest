---
title: query_template
order: 11
---

## query_template

调用**query_template**接口查询转码参数模板信息。



### URI 

/api/query_template  



### HTTP请求方式 

GET  



### 请求参数 

| 名称        | 是否必填 | 类型   | 描述     |
| ----------- | -------- | ------ | -------- |
| template_id | 是       | string | 模板ID。 |



### 请求示例

```
{ 
   "template_id": "bui******iginal"
}
```



### 返回参数 

| 名称                                     | 类型                  | 描述                                                         |
| ---------------------------------------- | --------------------- | ------------------------------------------------------------ |
| code                                     | int                   | API错误码。                                                  |
| name                                     | string                | 模板名称。                                                   |
| description                              | string                | 模板说明。                                                   |
| format                                   | string                | 封装格式，取值：<br /><ul><li>mp4（默认值）</li><li>hls</li><li>flv</li></ul> |
| quality                                  | int<!--有出入float--> | <!--这个是输出视频的质量等级么-->视频质量等级，取值：1-10，默认值5。<!--这个等级是越高越好么--> |
| framerate                                | int                   | <!--输出-->帧率，取值：0~120，默认值0（保持源帧率）。<!--0是保持，那其他数字代表啥--> |
| resolution                               | string                | 分辨率，默认值0（保持源分辨率）。<!--取值范围是多少-->       |
| vcodec                                   | string                | 视频编码格式，取值：<br /><ul><li>h264（默认值）</li><li>h265</li></ul> |
| acodec                                   | string                | 音频编码格式，aac<!--有没有其他的取值-->                     |
| logo_path                                | string                | 水印地址。                                                   |
| logo_size                                | string                | 水印宽高。                                                   |
| logo_offset                              | string                | 水印位置。                                                   |
| template_id                              | string                | 模板ID。                                                     |
| template_type                            | string                | 模板类型，取值：<br /><ul><li>built-in：预置模板</li><li>custom：自定义模板</li></ul> |
| hls_seg_time                             | <!--?-->              | <!--?-->                                                     |
| audio_bitrate<!--这个参数需要确认一下--> | int                   | 音频码率，取值：<br /><ul><li>32</li><li>48</li><li>64</li><li>96</li><li>128</li></ul> |
| msg                                      | string                | API错误码描述。                                              |



### 返回示例  

```
{    
  "code": 0,    
  "data": {       
      acodec: "aac"
      audio_bitrate: 0
      description: "mp4,Original"
      format: "mp4"
      framerate: 0
      hls_seg_time: 0
      logo_offset: ""
      logo_path: ""
      logo_size: ""
      name: "MP4_265_Original"
      quality: 5
      resolution: ""
      template_id: "builtin-MP4-265-Original"
      template_type: "built-in"
      vcodec: "h265"    
    },    
  "msg": "success"
}
```