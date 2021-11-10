---
title: update_template
order: 12
---


## update_template

调用**update_template**接口编辑转码参数模板。



### URI  

/api/update_template  



### HTTP请求方式

PUT  



### 请求参数<!--之前的文档里还有其他参数-->

| 名称        | 是否必填 | 类型   | 描述                       |
| ----------- | -------- | ------ | --------------------------------- |
| name        | True     | string | 模板名称，在同一账号下需确保唯一。 |
| description | Flase    | string | 模板说明。                         |
| format      | Flase    | string | 封装格式，取值：<br /><ul><li>mp4（默认值）</li><li>hls</li><li>flv</li></ul> |
| quality     | False    | int    | <!--这个是输出视频的质量等级么-->视频质量等级，取值：1-10，默认值5。<!--这个等级是越高越好么--> |
| framerate   | False    | int    | <!--输出-->帧率，取值：0~120，默认值0（保持源帧率）。<!--0是保持，那其他数字代表啥--> |
| resolution  | False    | string | 分辨率，默认值0（保持源分辨率）。<!--取值范围是多少--> |
| vcodec      | False    | string | 视频编码格式，取值：<br /><ul><li>h264（默认值）</li><li>h265</li></ul> |
| acodec      | False    | string | 音频编码格式，取值：aac。<!--有没有其他的取值--> |
| logo_path   | False    | string | 水印地址。<!--？-->                 |
| logo_size   | False    | string | 水印宽高。                         |
| logo_offset | False    | string | 水印位置。                         |
| audio_bitrate | False | int | 音频码率，取值：<br /><ul><li>32</li><li>48</li><li>64</li><li>96</li><li>128</li></ul> |



### 请求示例

```
PUT /api/update_template HTTP/1.1 
User-Agent: curl/7.29.0 
Host: 192.*.*.*:8080 Accept: */* 
Content-Type: application/json 
Content-Length: 419 
{
  "acodec":"aac",
  "audio_bitrate":0,
  "description":"\u63a5\u53e3\u6d4b\u8bd5",
  "format":"mp4",
  "framerate":60,
  "logo_offset":"x=100:y=100",
  "logo_path":"https://www.baidu.com",
  "logo_size":"50x50",
  "name":"Template1636027655",
  "quality":5,
  "resolution":"480p",
  "vcodec":"h264"
}
```



### 返回参数

| 名称       | 类型   | 描述                       |
| ----------- | ------ | --------------------------------- |
| code | int | API错误码。 |
| template_id | string | 模板ID。 |
| template_type | string | 模板类型，取值：<br /><ul><li>built-in：预置模板</li><li>custom：自定义模板</li></ul> |
| name    | string | 模板名称。                        |
| description | string | 模板说明。                         |
| format      | string | 封装格式，取值：<br /><ul><li>mp4（默认值）</li><li>hls</li><li>flv</li></ul> |
| quality     | int<!--有出入float--> | <!--这个是输出视频的质量等级么-->视频质量等级，取值：1-10，默认值5。<!--这个等级是越高越好么--> |
| framerate   | int    | <!--输出-->帧率，取值：0~120，默认值0（保持源帧率）。<!--0是保持，那其他数字代表啥--> |
| resolution  | string | 分辨率，默认值0（保持源分辨率）。<!--取值范围是多少--> |
| vcodec      | string | 视频编码格式，取值：<br /><ul><li>h264（默认值）</li><li>h265</li></ul> |
| acodec      | string | 音频编码格式，aac<!--有没有其他的取值--> |
| logo_path   | string | 水印地址。                         |
| logo_size   | string | 水印宽高。                         |
| logo_offset | string | 水印位置。                         |
| hls_seg_time<!--？--> |  |  |
| audio_bitrate | int | 音频码率，取值：<br /><ul><li>32</li><li>48</li><li>64</li><li>96</li><li>128</li></ul> |
| msg | string | API错误码描述。 |



### 返回示例 

```
{
    "code":0,
    "data":{
        "acodec":"aac",
        "audio_bitrate":0,
        "description":"\u63a5\u53e3\u6d4b\u8bd5",
        "format":"mp4",
        "framerate":60,
        "hls_seg_time":0,
        "logo_offset":"x=100:y=100",
        "logo_path":"https://www.baidu.com",
        "logo_size":"50x50",
        "name":"Template1636027655",
        "quality":5,
        "resolution":"480p",
        "template_id":"633e******01cd",
        "template_type":"custom",
        "vcodec":"h264"
    },
    "msg":"success"
}
```