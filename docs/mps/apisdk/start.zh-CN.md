---
title: 调用方式
order: 2
---






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

