---
title: 签名机制
order: 3
---



## 签名机制

本文介绍如何对HTTP或者HTTPS协议的请求进行加密验证。



### 简介

对于每一次HTTP或者HTTPS协议请求，我们会根据访问中的签名信息验证访问请求者身份。具体采用AK（AccessKeyId）/SK（SecretAccessKey）/SIGN（Signature）的形式做访问限制。媒体处理服务通过使用AccessKeyId和SecretAccessKey进行对称加密的方法来验证请求的发送者身份。

* 您可以在公有云服务控制台申请AK/SK密钥对。

  **说明**：您可以同时申请多组AK/SK密钥对，也可以设置某个AK/SK密钥对失效。

* 在您获取AK/SK密钥对后，可根据特定的签名算法或签名SDK生成带签名的请求。

  

### 签名方法

为了通过API请求的安全验证，您需要在客户端对其API请求进行签名（即生成正确的数字签名），并且使用HTTP头Authorization在网络上传输该请求的数字签名。Authorization头的具体格式如下：
```
Authorization:Visionular AccessKeyId={AK}, Signature={SIGN} 
```

如上格式所示，Authorization头的值包含访问密钥对中的AccessKeyId，且与之对应的SecretAccessKey将用于Signature值的构造。下面将详细解释如何构造Signature值。

##### **1. 准备访问密钥对**  

为API请求生成签名，需使用一对AK/SK访问密钥对。

您可以在媒体处理服务控制台新建访问密钥对，也可以使用已经存在的访问密钥对。但是需要保证使用的密钥对处于启用状态。

##### **2. 生成请求的签名字符串**  

API的签名字符串由HTTP请求中的Method、Header和Body信息生成，具体方式如下：  

```
StringToSign = VERB + "\n"
             + Content-Md5 + "\n"
             + Content-Type + "\n"
             + Date + "\n"
             + CanonicalizedHeaders + "\n"
             + CanonicalizedResource
```

**说明**：上述公式中的\n表示换行转义字符，+（加号）表示字符串连接操作，其他各个参数的定义如下表所示。     

| 参数名称              | <span style="white-space:nowrap;">是否必选</span> | <span style="white-space:nowrap;">参数说明&emsp;&emsp;&emsp;</span> | 示例                                 |
| --------------------- | ------------------------------------------------- | ------------------------------------------------------------ | ------------------------------------ |
| VERB                  | 是                                                | HTTP请求的方法名称，全部由大写字母组成，主要有PUT、GET、POST、HEAD、DELETE等。 | GET                                  |
| Content-Md5           | 否                                                | HTTP请求中Body部分的MD5值（必须为大写字符串），若Body为空则设置为空字符串。 | 0DAC79A8541E0CD9E3AAD913E1119821     |
| Content-Type          | 否                                                | HTTP请求中Body部分的类型，非GET请求且有Body参数时请设置为`application/json`，否则设置为空字符串。 | application/json                     |
| Date                  | 是                                                | HTTP请求中的标准时间戳，遵循RFC 1123格式，使用GMT标准时间。  | Thu, 14 May 2020 16:17:40 GMT        |
| CanonicalizedHeaders  | 否                                                | 由HTTP请求中以 `X-Wz-` 为前缀的自定义构造的字符串。目前仅支持`X-Wz-Nonce`（签名随机字符串）。<br />关于CanonicalizedHeaders的具体构建方法请参见<a href="#CanonicalizedHeaders">CanonicalizedHeaders的构造方式</a>。 | 60d0bd7e-95bb-11ea-b1d2-005056400001 |
| CanonicalizedResource | 是                                                | 由HTTP请求资源构造的字符串。<br />关于CanonicalizedResource的具体构建方法请参见<a href="#CanonicalizedResource">CanonicalizedResource的构造方式</a>。 | /api/create_task                     |

对于部分无Body的HTTP请求，其Content-Md5和Content-Type两个域为空字符串，这时整个签名字符串的生成方式如下：

```
StringToSign = VERB + "\n"
             + "\n"
             + "\n"
             + Date + "\n"
             + CanonicalizedHeaders + "\n"
             + CanonicalizedResource
```

- <span id = "CanonicalizedHeaders">CanonicalizedHeaders的构造方式</span>  
  
  所有以x-wz-为前缀的HTTP Header被称为CanonicalizedHeaders，构建方法如下：
  
  1. 将所有以`x-oss-`为前缀的HTTP请求头的名称转换为小写的形式。  
  
     例如：将`X-Wz-Nonce: WEIZHEN`转换成`x-wz-nonce: WEIZHEN`。
  
  2. 将上一步得到的所有自定义请求头按照字典顺序进行升序排序。  
  
  3. 删除请求头和内容之间分隔符两端出现的任何空格，并用`:`连接。  
  
     例如：将`X-Wz-Nonce: WEIZHEN`转换成`x-wz-nonce:WEIZHEN`。
  
  4. 将所有的头和内容用\n分隔符组合成最后的CanonicalizedHeader。  
  
  **说明**：若CanonicalizedHeaders规定的HTTP请求头不存在，则整个CanonicalizedHeader设置为空字符串  
  
- <span id = "CanonicalizedResource">CanonicalizedResource 的构造方式</span>
  
  请求中想访问的目标资源被称为CanonicalizedResource，构建方法如下：
  
  1. 将CanonicalizedResource设置为空字符串`""`。
  
  2. 放入要访问的API 资源，如 `/api/create_task` 。

  3. 如果请求包含查询字符串`QUERY_STRING`，则在CanonicalizedResource字符串尾部添加 `?` 和查询字符串。
     **说明**：`QUERY_STRING` 是 URL 中请求参数按字典顺序排序后的字符串，其中参数名和值之间用`=`相隔组成字符串，并对参数名-值对按照字典顺序升序排序，然后以`&`符号连接构成字符串。其公式化描述如下： 
  
     `QUERY_STRING = "KEY1=VALUE1" + "&" + "KEY2=VALUE2"`
     
     此时， CanonicalizedResource为`/api/create_task?KEY1=VALUE1&KEY2=VALUE2`。

##### **3. 生成请求的数字签名**

目前， API只支持一种数字签名算法，即默认签名算法hmac-sha1。其完整签名公式如下： 

`Signature = Base64( HMAC-SHA1( SecretAccessKey, UTF-8-Encoding-Of(StringToSign) ) )` 

**说明**：签名的方法用RFC 2104中定义的HMAC-SHA1方法。如上公式用的SecretAccessKey必须和最终的Authorization头中使用的 AccessKeyId相对应。否则，请求将无法通过服务端验证。  



### 签名示例

假设AccessKey ID为` CWIs********8i3x`，AccessKeySecret为`EnEaa08vXgO********ovvD8aID9Phn1`。

1. 想要发送的HTTP请求为:

     ```text
     POST /api/test?task_id=aaa HTTP/1.1
     Host: 127.*.*.*:8888
     Content-Type: application/json
     Content-Length: 40
     
     {"name":"zhuama2asd2","description":"2"}
     ```


2. 生成MD5值：

	```text
	Content-Md5 = "25839DAF******263EE3752D2AC"
	```
	
3. 生成随机字符串:

      ```text
      nonce = "bqzcRl8Jah00lbbB"
      ```

4. 组装待签名字符串:

      ```text
      StringToSign = "POST" + "\n"
                + "25839DAF******263EE3752D2AC" + "\n"
                + "application/json" + "\n"
                + "Wed, 03 Nov 2021 03:00:50 GMT" + "\n"
                + "x-wz-nonce:bqzcRl8Jah00lbbB" + "\n"
                + "/api/test?task_id=aaa" + "\n"
      ```

5. 根据签名公式`Signature = Base64( HMAC-SHA1( SecretAccessKey, UTF-8-Encoding-Of(StringToSign) ) )`生成请求的数字签名:

      ```text
      Signature = "jg0QORUT********JEJ6irT/prA="
      ```

6. 得到签名后的HTTP请求为:

      ```text
      POST /api/test?task_id=aaa HTTP/1.1
      Host: 127.*.*.*:8888
      Date: Wed, 03 Nov 2021 03:00:50 GMT
      Content-Md5: 25839DAF******263EE3752D2AC
      X-WZ-Nonce: bqzcRl8Jah00lbbB
      Authorization: Visionular AccessKeyId=CWIs********8i3x, Signature=jg0QORUT********JEJ6irT/prA=
      Content-Type: application/json
      Content-Length: 40
      
      {"name":"zhuama2asd2","description":"2"}
      ```
