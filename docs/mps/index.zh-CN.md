---
title: 产品介绍
order: 1
nav:
  title: 文档中心
  order: 1
---

## 什么是媒体处理？

微帧媒体处理服务（Visionular Media Processing Service，VMPS）是一种基于微帧智能编码技术和人工智能内容自适应视频处理技术的云端音视频处理服务。微帧媒体处理服务为处理批量媒体文件提供可伸缩、可靠、易使用和免维护的云服务。

您可以按需要指定编码器（H.264或H.265) 、转码码率、输出视频文件的分辨率和格式。相比传统的转码服务，在视频画质不变的情况下，视频文件大小可降低40%~50%。



## 产品特性

#### 智能高清
主流格式全覆盖，支持H.264、H.265编码，拥有业内领先的的智能高清转码技术，在同等视频质量下比普通转码文件体积缩小40%以上。


#### 倍速转码
适用于10分钟以上的长视频，通过对视频分片并行转码，大幅提升转码速度，转码速度是普通转码的5倍。

#### 工作流
控制台图形化操作，一分钟快速搭建常见音视频处理流程，音视频文件上传完成后自动触发转码。


#### 多码率自适应
多码率自适应可将指定的音视频文件流统一打包生成一个自适应码流文件，让播放器可根据终端网络带宽环境自适应调整码率。


#### 视频水印
支持在输出视频上覆盖水印，自定义水印位置及大小，增强产品识别度。


#### 转码模板
高可定制的音视频转码模板，支持自定义转码参数，满足不同场景中多样化的视频处理需求。





## 产品优势

#### 多云部署

全球多云部署，支持AWS、GCP、Azure、阿里云、腾讯云、华为云等云平台，按需动态扩容，轻松应对高并发，高效转码。

#### 智能转码

微帧智能编码技术，可以实现输出的视频文件在同等质量下，文件的大小比传统普通转码文件小40%～50%，大幅降低存储和带宽成本。

#### 高可定制

高可定制的音视频转码模板，支持自定义转码参数，并针对不同场景提供定制化智能转码模板参数调优方案。

#### 可视化操作

通过Web控制台管理任务和监控任务状态，具有丰富的数据可视化。



## 名词解释

#### 视频转码

视频转码（Video Transcoding）是指将已经压缩编码的视频码流转换成另一个视频码流，以适应不同的网络带宽、不同的终端处理能力和不同的用户需求。转码本质上是一个先解码，再编码的过程，因此转换前后的码流可能遵循相同的视频编码标准，也可能不遵循相同的视频编码标准。

#### AWS S3

AWS S3（Amazon Simple Storage Service）是AWS的对象存储服务，微帧支持对用户存储于AWS S3的媒体文件进行转码，转码输出的文件也保存在AWS S3中。

#### 地域

视频转码服务节点。选择与您的应用服务器和媒体存储服务相同或接近的地域可以减少访问延迟和网络成本。

#### 输入文件

指您存储于云存储服务中的的媒体文件，本地文件上传至云存储服务后即可作为一个输入文件。

#### 预置模板

指指媒体转码服务内置的智能转码模板，提供常用的音视频转码参数设置。预置模板可以在一定的宽带条件下为您提供最优的转码服务。

#### 自定义预置模板

您可以创建新的预置模板并自定义预置模板中的转码参数以便在转码作业中使用。每个自定义模板有一个唯一ID。

#### 水印

一种可由转码服务自动添加到输出视频中的图像覆盖层。您可以指定水印源图像、位置和大小。水印的设置作为自定义设置的一部分。