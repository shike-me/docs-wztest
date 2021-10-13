---
title: API 概览
order: 1
nav:
  title: 文档中心
  order: 1
group:
  path: /apisdk
  title: API分组样式
  order: 10
---




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


