---
title: API参考
order: 5
toc: menu
---

# API参考
api介绍相关说明


## API 概览

创建转码任务前，请先创建转码模版和转码后视频存储桶，目前存储桶仅支持AWS的s3和阿里云的oss。

**视频存储相关接口**

| <div style="width:140px"> 接口名称 </div> | <div style="width:300px"> 接口功能描述 </div> |
| ----------------------------------------- | --------------------------------------------- |
| add_storage                               | 添加转码后视频输出的存储桶                    |
| del_storage                               | 删除存储桶                                    |
| list_storage                              | 查询存储桶信息                                |
| list_storage_types                        | 查询云转码平台支持的存储桶类型                |

**转码模板相关接口**

| <div style="width:140px"> 接口名称     </div> | <div style="width:300px"> 接口功能描述</div> |
| --------------------------------------------- | -------------------------------------------- |
| add_template                                  | 添加转码模板                                 |
| del_template                                  | 删除转码模板                                 |
| query_template                                | 查询转码模板信息                             |
| update_template                               | 更新转码模板信息                             |
| list_template                                 | 获取转码模板列表                             |

**转码任务相关接口**

| <div style="width:140px"> 接口名称 </div> | <div style="width:300px"> 接口功能描述 </div> |
| ----------------------------------------- | --------------------------------------------- |
| create_task                               | 创建转码任务                                  |
| del_task                                  | 删除转码任务                                  |
| query_task                                | 查询转码任务                                  |
| list_task                                 | 获取转码任务列表                              |

**统计查询相关接口**

| <div style="width:140px"> 接口名称</div> | <div style="width:300px"> 接口功能描述 </div> |
| ---------------------------------------- | --------------------------------------------- |
| list_summary                             | 获取转码时长统计信息                          |



## 调用方式

### 请求结构

**1.服务地址**

| 接入地域 | 域名                |
| -------- | ------------------- |
| 中国大陆 | cloud.visionular.cn |

**2.通信协议**

微帧云转码 API 的所有接口均通过 HTTP 进行通信。

**3.请求方法**

| method | Description                                   |
| ------ | --------------------------------------------- |
| GET    | 适用于查询一条或多条记录的接口，参数从url获取 |
| POST   | 适用于增加一条记录的接口，参数从json body获取 |
| PUT    | 适用于修改一条记录的接口，参数从json body获取 |
| DELETE | 适用于删除一条记录的接口，参数从json body获取 |

**HTTP Headers**

| header       | Description                                                  |
| ------------ | ------------------------------------------------------------ |
| Content-Type | 需要从json body中传入参数的api必须设置Content-Type:application/json |

**4.字符编码**

均使用`UTF-8`编码。

### 签名方法

#### 描述

当客户使用我方提供的公有云服务时，采用AK/SK/SIGN(AK:秘钥ID AccessKeyId，SK:秘钥SecretAccessKey，SIGN:签名Signature)的形式做访问限制

*  公有云注册用户可通过登录控制台申请AK/SK秘钥对（可申请多组，也可以设置秘钥对失效）
*  用户获取AK/SK秘钥对后可根据特定的签名算法或签名sdk生成带签名的请求访问开放API来发起云服务

#### 签名方法

为了通过 API 请求的安全验证，用户需要在客户端对其 API 请求进行签名（即生成正确的数字签名），并且使用 HTTP 头 Authorization 在网络上传输该请求的数字签名。Authorization 头的具体格式如下：  
Authorization:Visionular AccessKeyId={AK}, Signature={SIGN}  
如上格式所示，Authorization 头的值包含用户访问密钥对中的 AccessKeyId，且与之对应的 AccessKeySecret 将用于 Signature 值的构造。下面将详细解释如何构造该 Signature 值。

**1. 准备访问密钥对**  

为 API 请求生成签名，需使用一对访问密钥（AccessKeyId/AccessKeySecret）。您可以使用已经存在的访问密钥对，也可以创建新的访问密钥对，但需要保证使用的密钥对为启用状态。

**2. 生成请求的签名字符串**  

API 的签名字符串由 HTTP 请求中的 Method、Header 和 Body 信息一同生成，具体方式如下：  

```
StringToSign = VERB + "\n"
             + Content-Md5 + "\n"
             + Content-Type + "\n"
             + Date + "\n"
             + CanonicalizedHeaders + "\n"
             + CanonicalizedResource
```

上面公式中的 \n 表示换行转义字符，+（加号）表示字符串连接操作，其他各个部分定义如下表所示。  
签名字符串定义表    

| Name                  | Description                                                  | example                              |
| --------------------- | ------------------------------------------------------------ | ------------------------------------ |
| VERB                  | HTTP 请求的方法名称，全部由大写字母组成                      | GET、POST、PUT、DELETE               |
| Content-Md5           | HTTP 请求中 Body 部分的 MD5 值（必须为大写字符串），若Body为空则设置为空字符串 | 0DAC79A8541E0CD9E3AAD913E1119821     |
| Content-Type          | HTTP 请求中 Body 部分的类型，非GET请求且有body参数时请设置为application/json，否则设置为空字符串 | application/json                     |
| Date                  | HTTP 请求中的标准时间戳头（遵循 RFC 1123 格式，使用 GMT 标准时间） | Thu, 14 May 2020 16:17:40 GMT        |
| CanonicalizedHeaders  | 由 HTTP 请求中以 X-Wz- 为前缀的自定义头构造的字符串。目前目前可选：X-Wz-Nonce（签名随机字符串） | 60d0bd7e-95bb-11ea-b1d2-005056400001 |
| CanonicalizedResource | 由 HTTP 请求资源构造的字符串（具体构造方法见下面详述）       | /api/create_task                     |

对于部分无 Body 的 HTTP 请求，其 Content-Md5 和 Content-Type 两个域为空字符串，这时整个签名字符串的生成方式如下：

```
StringToSign = VERB + "\n"
             + "\n"
             + "\n"
             + Date + "\n"
             + CanonicalizedHeaders + "\n"
             + CanonicalizedResource
```

CanonicalizedHeaders 的构造方式：  

* 将签名字符串定义表中CanonicalizedHeaders规定的 HTTP 请求头的名字转换成小写字母。  
* 将上一步得到的所有自定义请求头按照字典顺序进行升序排序。  
* 删除请求头和内容之间分隔符两端出现的任何空格，并用冒号 : 连接。  
* 将所有的头和内容用 \n 分隔符组合成最后的 CanonicalizedHeader。  
* 若CanonicalizedHeaders规定的 HTTP 请求头均不存在则整个CanonicalizedHeader设置为空字符串  

CanonicalizedResource 的构造方式：  

* 将 CanonicalizedResource 设置为空字符串""。
* 放入要访问的 API 资源，如 /api/create_task 。
* 如果请求包含查询字符串QUERY_STRING，则在 CanonicalizedResource 字符串尾部添加 ? 和查询字符串。
  QUERY_STRING 是 URL 中请求参数按字典顺序排序后的字符串，其中参数名和值之间用 = 相隔组成字符串，并对参数名-值对按照字典顺序升序排序，然后以 & 符号连接构成字符串。其公式化描述如下： 

```
QUERY_STRING = "KEY1=VALUE1" + "&" + "KEY2=VALUE2"
```

签名的方法用 RFC 2104 中定义的 HMAC-SHA1 方法。如上公式用的 AccessKeySecret 必须和最终的 Authorization 头中使用的 AccessKeyId 相对应。否则，请求将无法通过服务端验证。

**3. 生成请求的数字签名**

目前， API 只支持一种数字签名算法，即默认签名算法 hmac-sha1。其完整签名公式如下：  

```
Signature = Base64( HMAC-SHA1( SecretAccessKey, UTF-8-Encoding-Of(StringToSign) ) )
```

AK：控制台生成的访问密钥对中的AccessKeyID，16位字符串  
SK：控制台生成的访问密钥对中的AccessKeySecret，32位字符串    
SIGN=HMAC-SHA1(SK, UTF-8-Encoding-Of(StringToSign))  
StringToSign=HTTPMethod+'&'+APIPath+'&'+KeyValuePairs  
HTTPMethod：GET/PUT/DELETE/POST   
APIPath： 接口路径（不带参数），如/api/create_task   
KeyValuePairs：按照参数名称的字典顺序对请求中所有的请求参数(包括公共请求参数和指定请求接口的自定义参数，公共参数signature除外)进行排序并，每个参数名和参数值用等号连接，每组参数用'&'连接  

签名的方法用 RFC 2104 中定义的 HMAC-SHA1 方法。如上公式用的 AccessKeySecret 必须和最终的 Authorization 头中使用的 AccessKeyId 相对应。否则，请求将无法通过服务端验证。

### 返回结果

**Status Code**   

正常情况下均返回200，内部出错或异常时返回非200    

**Json Body**   

| key  | type        | Description                           |
| ---- | ----------- | ------------------------------------- |
| code | int         | 返回码，0表示成功，非0表示失败        |
| msg  | string      | 返回码描述，成功为success，失败为其他 |
| data | json object | 返回参数内容，没有返回数据则为null    |

**API Code**  

| code | msg               | Description |
| ---- | ----------------- | ----------- |
| 0    | success           |             |
| 1000 | internal error    |             |
| 1001 | lack param        |             |
| 1002 | bad param         |             |
| 1003 | auth fail         |             |
| 1004 | empty result      |             |
| 1005 | operation fail    |             |
| 1006 | duplicated entity |             |



## 视频存储相关接口

### add_storage

**URI**  
/api/add_storage  
**HTTP Methods**  
POST  
**Request Params**

| Name       | Required | Type   | Description                              |
| ---------- | -------- | ------ | ---------------------------------------- |
| region     | True     | string | 物理区域，如cn-zhangjiakou 、cn-hangzhou |
| type       | True     | string | 云厂商类型 如: s3 oss                    |
| bucket     | True     | string | 转码后视频输出的存储桶                   |
| prefix     | False    | string | 输出文件目录或前缀                       |
| storage_ak | False    | string | 若输出bucket为私有访问则必须设置         |
| storage_sk | False    | string | 若输出bucket为私有访问则必须设置         |

**Response Params**

| Name       | Required | Type   | Description |
| ---------- | -------- | ------ | ----------- |
| storage_id | True     | string |             |

**Examples**  

```
{
    "code": 0,
    "data": {
        "storage_id": "43039beb709bfcad"
    },
    "msg": "success"
}
```

### del_storage

**URI**  
/api/del_storage  
**HTTP Methods**  
DELETE  
**Request Params**

| Name       | Required | Type   | Description |
| ---------- | -------- | ------ | ----------- |
| storage_id | True     | string |             |

**Response Params**

| Name | Required | Type | Description |
| ---- | -------- | ---- | ----------- |

**Examples**  

```
{
    "code": 0,
    "data": null,
    "msg": "success"
}
```

### list_storage

**URI**  
/api/list_storage  
**HTTP Methods**  
GET  
**Request Params**

| Name | Required | Type | Description |
| ---- | -------- | ---- | ----------- |

**Response Params**

| Name       | Required | Type       | Description |
| ---------- | -------- | ---------- | ----------- |
| list       | True     | json array |             |
| bucket     | True     | string     |             |
| prefix     | True     | string     |             |
| region     | True     | string     |             |
| storage_id | True     | string     |             |
| type       | True     | string     | s3          |
| num        | True     | int        |             |

**Examples**  

```
{
    "code": 0,
    "data": {
        "list": [
            {
                "bucket": "bbbbb",
                "prefix": "",
                "region": "cn-hz",
                "storage_id": "c6f725d7e71253c8",
                "type": "s3"
            }
        ],
        "num": 1
    },
    "msg": "success"
}
```

### list_storage_type

注: 该接口不需要鉴权

**URI**  
/api/list_storage_type  
**HTTP Methods**  
GET  
**Request Params**

| Name | Required | Type | Description |
| ---- | -------- | ---- | ----------- |

**Response Params**

| Name | Required | Type       | Description |
| ---- | -------- | ---------- | ----------- |
| list | True     | json array |             |
| num  | True     | int        |             |

**Examples**  

```
{
    "code": 0,
    "data": {
        "list": [
            "s3"
        ],
        "num": 1
    },
    "msg": "success"
}
```



## 转码模板相关接口

### add_template

**URI**  
/api/add_template  
**HTTP Methods**  
POST  
**Request Params**

| Name        | Required | Type   | Description                       |
| ----------- | -------- | ------ | --------------------------------- |
| name        | True     | string | 模板名                            |
| description | Flase    | string | 模板说明                          |
| format      | Flase    | string | 封装格式，mp4/hls/flv，默认mp4    |
| quality     | False    | int    | 视频质量等级，1-10，默認5         |
| framerate   | False    | int    | 帧率，0~120，默认0保持源帧率      |
| resolution  | False    | string | 分辨率，默认0保持源               |
| vcodec      | False    | string | 视频编码格式，h264/h265，默认h264 |
| acodec      | False    | string | 音频编码格式，aac                 |
| logo_path   | False    | string | 水印地址                          |
| logo_size   | False    | string | 水印宽高                          |
| logo_offset | False    | string | 水印位置                          |

**Response Params**  

| Name        | Required | Type   | Description                       |
| ----------- | -------- | ------ | --------------------------------- |
| name        | True     | string | 模板名                            |
| description | Flase    | string | 模板说明                          |
| format      | Flase    | string | 封装格式，mp4/hls/flv，默认mp4    |
| quality     | Flase    | int    | 视频质量等级，1-10，默认5         |
| framerate   | False    | int    | 帧率，0~120，默认0保持源帧率      |
| resolution  | False    | string | 分辨率，默认0保持源               |
| vcodec      | False    | string | 视频编码格式，h264/h265，默认h264 |
| acodec      | False    | string | 音频编码格式，aac                 |
| logo_path   | False    | string | 水印地址                          |
| logo_size   | False    | string | 水印宽高                          |
| logo_offset | False    | string | 水印位置                          |


**Examples**  

```
{    "code": 0,    "data": null,    "msg": "success"}
```

### del_template

**URI**  
/api/del_template  
**HTTP Methods**  
DELETE  
**Request Params**

| Name | Required | Type   | Description |
| ---- | -------- | ------ | ----------- |
| name | True     | string | 模板名      |

**Response Params**  

| Name | Required | Type | Description |
| ---- | -------- | ---- | ----------- |

**Examples**  

```
{    "code": 0,    "data": null,    "msg": "success"}
```

### query_template

**URI**  
/api/query_template  
**HTTP Methods**  
GET  
**Request Params**  

| Name | Required | Type   | Description |
| ---- | -------- | ------ | ----------- |
| name | True     | string | 模板名称    |

**Response Params**  

| Name        | Required | Type   | Description                       |
| ----------- | -------- | ------ | --------------------------------- |
| name        | True     | string | 模板名                            |
| description | Flase    | string | 模板说明                          |
| format      | Flase    | string | 封装格式，mp4/hls/flv，默认mp4    |
| quality     | Flase    | int    | 视频质量等级，1-10，默认5         |
| framerate   | False    | int    | 帧率，0~120，默认0保持源帧率      |
| resolution  | False    | string | 分辨率，默认0保持源               |
| vcodec      | False    | string | 视频编码格式，h264/h265，默认h264 |
| acodec      | False    | string | 音频编码格式，aac                 |
| logo_path   | False    | string | 水印地址                          |
| logo_size   | False    | string | 水印宽高                          |
| logo_offset | False    | string | 水印位置                          |

**Examples**  

```
{    "code": 0,    "data": {        "acodec": "acc",        "audio_bitrate": 64000,        "description": "mp4,480p",        "format": "mp4",        "framerate": 25,        "logo_offset": "",        "logo_path": "",        "logo_size": "",        "name": "480p",        "quality": 5,        "resolution": "480p",        "vcodec": "h264"    },    "msg": "success"}
```

### update_template

**URI**  
/api/update_template  
**HTTP Methods**  
PUT  
**Request Params**

| Name        | Required | Type   | Description                       |
| ----------- | -------- | ------ | --------------------------------- |
| name        | True     | string | 模板名                            |
| description | Flase    | string | 模板说明                          |
| format      | Flase    | string | 封装格式，mp4/hls/flv，默认mp4    |
| quality     | Flase    | int    | 视频质量等级，1-10                |
| framerate   | False    | int    | 帧率，0~120，默认0保持源帧率      |
| resolution  | False    | string | 分辨率，默认0保持源               |
| vcodec      | False    | string | 视频编码格式，h264/h265，默认h264 |
| acodec      | False    | string | 音频编码格式，aac                 |
| logo_path   | False    | string | 水印地址                          |
| logo_size   | False    | string | 水印宽高                          |
| logo_offset | False    | string | 水印位置                          |

**Response Params**  

| Name        | Required | Type   | Description                       |
| ----------- | -------- | ------ | --------------------------------- |
| name        | True     | string | 模板名                            |
| description | Flase    | string | 模板说明                          |
| format      | Flase    | string | 封装格式，mp4/hls/flv，默认mp4    |
| quality     | Flase    | int    | 视频质量等级，1-10，默认5         |
| framerate   | False    | int    | 帧率，0~120，默认0保持源帧率      |
| resolution  | False    | string | 分辨率，默认0保持源               |
| vcodec      | False    | string | 视频编码格式，h264/h265，默认h264 |
| acodec      | False    | string | 音频编码格式，aac                 |
| logo_path   | False    | string | 水印地址                          |
| logo_size   | False    | string | 水印宽高                          |
| logo_offset | False    | string | 水印位置                          |


**Examples**  

```
{    "code": 0,    "data": null,    "msg": "success"}
```

### list_template

**URI**

/api/list_template

**HTTP Methods**

GET
**Request Params**

| Name | Required | Type | Description |
| ---- | -------- | ---- | ----------- |

**Response Params**  

| Name        | Required | Type   | Description                       |
| ----------- | -------- | ------ | --------------------------------- |
| name        | True     | string | 模板名                            |
| description | Flase    | string | 模板说明                          |
| format      | True     | string | 封装格式，mp4/hls/flv，默认mp4    |
| quality     | True     | int    | 视频质量等级，1-10                |
| framerate   | False    | int    | 帧率，0~120，默认0保持源帧率      |
| resolution  | False    | string | 分辨率，默认0保持源               |
| vcodec      | False    | string | 视频编码格式，h264/h265，默认h264 |
| acodec      | False    | string | 音频编码格式，aac                 |
| logo_path   | False    | string | 水印地址                          |
| logo_size   | False    | string | 水印宽高                          |
| logo_offset | False    | string | 水印位置                          |

```
{    "code": 0,    "data": {        "list": [            {                "audio_bitrate": 64000,                "description": "mp4,480p",                "format": "mp4",                "framerate": 25,                "logo_offset": "",                "logo_path": "",                "logo_size": "",                "name": "480p",                "quality": 5,                "resolution": "480p",                "template_id": "builtin-480p",                "template_type": "built-in",                "vcodec": "h264"            },            {                "audio_bitrate": 64000,                "description": "mp4,720p",                "format": "mp4",                "framerate": 25,                "logo_offset": "",                "logo_path": "",                "logo_size": "",                "name": "720p",                "quality": 5,                "resolution": "720p",                "template_id": "builtin-720p",                "template_type": "built-in",                "vcodec": "h264"            },            {                "audio_bitrate": 64000,                "description": "mp4,1080p",                "format": "mp4",                "framerate": 30,                "logo_offset": "",                "logo_path": "",                "logo_size": "",                "name": "1080p",                "quality": 5,                "resolution": "1080p",                "template_id": "builtin-1080p",                "template_type": "built-in",                "vcodec": "h264"            },            {                "audio_bitrate": 64000,                "create_time": "Sat, 08 Feb 2020 16:32:42 GMT",                "description": "mp4,origin",                "format": "mp4",                "framerate": 0,                "logo_offset": "",                "logo_path": "",                "logo_size": "",                "name": "origin",                "quality": 5,                "resolution": "",                "template_id": "builtin-origin",                "template_type": "built-in",                "vcodec": "h264"            },            {                "abitrate": 0,                "create_time": "Wed, 12 Feb 2020 16:48:39 GMT",                "description": "my test2",                "format": "mp4",                "framerate": 0,                "logo_offset": "",                "logo_path": "",                "logo_size": "",                "name": "test2",                "quality": 6,                "resolution": "",                "template_id": "e4beaff1c089fd7c",                "template_type": "custom",                "vcodec": "h264"            },            {                "abitrate": 0,                "description": "my test 123",                "format": "mp4",                "framerate": 0,                "logo_offset": "",                "logo_path": "",                "logo_size": "",                "name": "test",                "quality": 5,                "resolution": "",                "template_id": "7568cff9d270ff9c",                "template_type": "custom",                "vcodec": "h264"            }        ],        "num": 6    },    "msg": "success"}
```

## 转码任务相关接口

### create_task

注: 多模版转码时 需要调用多次接口 一次接口生成一个模板的视频

**URI**  
/api/create_task  
**HTTP Methods**  
POST  
**Request Params**

| Name          | Required | Type   | Description                                      |
| ------------- | -------- | ------ | ------------------------------------------------ |
| template_name | True     | string | 转码模板名称                                     |
| input         | True     | string | 输入地址 需要输入完整url 以https/http/oss/s3开头 |
| output        | True     | string | 输出文件名 即objkey                              |
| storage_id    | True     | string | 存储配置ID                                       |

**Response Params** 

| Name    | Required | Type   | Description |
| ------- | -------- | ------ | ----------- |
| task_id | True     | string |             |

**Examples**  

```
{    "code": 0,    "data": {        "task_id": "202002101111143039beb709bfcad"    },    "msg": "success"}
```

### del_task

**URI**  
/api/del_task  
**HTTP Methods**  
DELETE  
**Request Params**

| Name    | Required | Type   | Description |
| ------- | -------- | ------ | ----------- |
| task_id | True     | string |             |

**Response Params**  

| Name | Required | Type | Description |
| ---- | -------- | ---- | ----------- |
|      |          |      |             |

**Examples**  

```
{    "code": 0,    "data": null,    "msg": "success"}
```

### query_task

**URI**  
/api/query_task  
**HTTP Methods**  
GET  
**Request Params**  

| Name    | Required | Type   | Description |
| ------- | -------- | ------ | ----------- |
| task_id | True     | string |             |

**Response Params**  

| Name          | Required | Type   | Description                                        |
| ------------- | -------- | ------ | -------------------------------------------------- |
| src_bitrate   | True     | int    | 输入视频码率                                       |
| dst_bitrate   | True     | int    | 输出视频码率                                       |
| create_time   | True     | int    | 任务创建时间                                       |
| finish_time   | True     | int    | 任务完成时间                                       |
| input         | True     | string | 来自`create_task`接口 用户提供的url                |
| input_url     | True     | string | 输入视频的可下载地址                               |
| output_url    | True     | string | 输出视频的可下载地址                               |
| region        | True     | string | 云存储的节点                                       |
| status        | True     | string | pending/downloading/running/uploading/success/fail |
| region_type   | True     | string | 云存储类型 oss/s3/...                              |
| bucket        | True     | string | bucket名称                                         |
| objkey        | True     | string | 存储的文件对象名称                                 |
| template_id   | True     | string | 模板id                                             |
| task_id       | True     | string | 任务id                                             |
| template_name | True     | string | 模板名称                                           |
| err_code      | True     | int    | 0 表示成功 其他失败                                |
| err_msg       | True     | string |                                                    |

**Examples**  

```
{    "code": 0,    "data": {      "bucket": "visionular-service"      "create_time": 1593120830      "dst_bitrate": 211.062      "err_code": 0      "err_message": "success"      "finish_time": 1593120845      "input": "s3://web-test-upload/yushan1/input/ck8860a6d00jf01jw2h5d7m4s-wm-720p.mp4"      "input_url": "https://web-test-upload.s3.amazonaws.com/yushan1/input/ck8860a6d00jf01jw2h5d7m4s-wm-720p.mp4?AWSAccessKeyId=AKIA6GGCBTCEP75OE4DW&Signature=Yr6wOw%2B9TU2U2RD9KHiEXULwlfE%3D&Expires=1593198759"      "objkey": "yushan1/output/testttttt.mp4"      "output_url": "https://visionular-service.s3.amazonaws.com/yushan1/output/testttttt.mp4?AWSAccessKeyId=AKIA6GGCBTCEP75OE4DW&Signature=%2BXlvbRepGD68ZCZgxxo6IeCeDeE%3D&Expires=1593198759"      "region": "ap-southeast-1"      "region_type": "s3"      "src_bitrate": 440.371      "status": "success"      "task_id": "20200625143350132744cc66d4bb4532"      "template_id": "builtin-MP4-264-360p"      "template_name": "MP4_264_360p"    },    "msg": "success"}
```

### list_task

**URI**  
/api/list_task  
**HTTP Methods**  
GET  
**Request Params**  

| Name       | Required | Type   | Description                                                  |
| ---------- | -------- | ------ | ------------------------------------------------------------ |
| start_time | True     | int    | 开始时间，unix时间戳，10位                                   |
| end_time   | True     | int    | 结束时间，unix时间戳，10位                                   |
| status     | False    | string | pending/downloading/running/uploading/success/fail，默认为空：查询所有状态 |
| start_num  | False    | int    | 默认0                                                        |
| count      | False    | int    | 默认50                                                       |

**Response Params**  

| Name        | Required | Type   | Description                                        |
| ----------- | -------- | ------ | -------------------------------------------------- |
| list        | True     | int    |                                                    |
| total       | True     | int    | 当前查询时间段和状态内的总记录数                   |
| num         | True     | int    | 本次返回的实际记录数                               |
| create_time | True     | int    |                                                    |
| finish_time | True     | int    |                                                    |
| input       | True     | string | 输入视频地址                                       |
| status      | True     | string | pending/downloading/running/uploading/success/fail |
| message     | True     | string | 状态描述                                           |
| task_id     | True     | string |                                                    |

**Examples**  

```
{    "code": 0,    "data": {        "list": [            {                "create_time": "2020-02-07 07:06:06",                "finish_time": "2020-02-07 07:06:31",                "input": "/z/ta_video_set/opera/opera_new_src/SaSF-D31OG.mp4",                "message": "Success",                "status": "success",                "task_id": "20200207150605868438479527f40547"            },            {                "create_time": "2020-02-07 07:06:05",                "finish_time": "2000-01-01 00:00:00",                "input": "/z/ta_video_set/opera/opera_new_src/SaSF-D31OG.mp4",                "message": "task running",                "status": "success",                "task_id": "20200207150604832737229932df1a80"            },            {                "create_time": "2020-02-07 07:06:04",                "finish_time": "2020-02-07 07:06:30",                "input": "/z/ta_video_set/opera/opera_new_src/SaSF-D31OG.mp4",                "message": "Success",                "status": "success",                "task_id": "20200207150603796330854164f6dc05"            }       ],        "num": 3,        "total": 3    },    "msg": "success"}
```



## 统计查询相关接口

### list_summary

注: 目前只支持小时级别的统计粒度

**URI**

/api/list_summary

**HTTP Methods**

GET
**Request Params**

| Name       | Required | Type | Description                                  |
| ---------- | -------- | ---- | -------------------------------------------- |
| start_time | False    | int  | 指定小时数，由服务端计算时间戳，默认48小时前 |
| end_time   | False    | int  | 指定小时数，由服务端计算时间戳，默认24小时前 |

**Response Params**  

```
{    "code": 0,    "data": {        "list": [            {                "time_stamp": 1581041708,                "count_total": 100,                "count_sd": 50,                "count_hd": 50,                "duration_total": 1000,                "duration_sd": 500,                "duration_hd": 500,                "count_region1_h264_sd": 25,                "count_region1_h264_hd": 25,                "count_region1_h265_sd": 25,                "count_region1_h265_hd": 25,                "duration_region1_h264_sd": 250,                "duration_region1_h264_hd": 250,                "duration_region1_h265_sd": 250,                "duration_region1_h265_hd": 250            },            {                "time_stamp": 1581041708,                "count_total": 100,                "count_sd": 50,                "count_hd": 50,                "duration_total": 1000,                "duration_sd": 500,                "duration_hd": 500,                "count_region1_h264_sd": 25,                "count_region1_h264_hd": 25,                "count_region1_h265_sd": 25,                "count_region1_h265_hd": 25,                "duration_region1_h264_sd": 250,                "duration_region1_h264_hd": 250,                "duration_region1_h265_sd": 250,                "duration_region1_h265_hd": 250            }        ],        "resolution_types":["sd","hd"],        "regions":["region1"],        "num": 2    },    "msg": "success"}
```

