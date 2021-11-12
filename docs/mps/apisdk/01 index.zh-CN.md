---
title: API 概览
order: 1
nav:
  title: 文档中心
  order: 1
group:
  path: /apisdk
  title: API参考
  order: 10
---




## API 概览

本文为您提供了媒体处理服务所有API的列表。

##### 视频存储相关接口

| <div style="width:140px"> 接口名称 </div> | <div style="width:300px"> 接口功能描述 </div>          |
| ----------------------------------------- | ------------------------------------------------------ |
| add_storage                               | 调用add_storage创建转码后视频输出的存储桶。            |
| del_storage                               | 调用del_storage删除存储桶。                            |
| list_storage                              | 调用list_storage查询存储桶信息。                       |
| list_storage_types                        | 调用list_storage_types查询云转码平台支持的存储桶类型。 |



##### 转码模板相关接口

| <div style="width:140px"> 接口名称     </div> | <div style="width:300px"> 接口功能描述</div> |
| --------------------------------------------- | -------------------------------------------- |
| add_template                                  | 调用add_template创建转码模板。               |
| del_template                                  | 调用del_template删除转码模板。               |
| query_template                                | 调用query_template查询转码模板信息           |
| update_template                               | 调用update_template更新转码模板信息          |
| list_template                                 | 调用list_template查询转码模板列表。          |



##### 转码任务相关接口

| <div style="width:140px"> 接口名称 </div> | <div style="width:300px"> 接口功能描述 </div> |
| ----------------------------------------- | --------------------------------------------- |
| create_task                               | 调用create_task创建转码任务。                 |
| del_task                                  | 调用del_task删除转码任务。                    |
| query_task                                | 调用query_task查询转码任务。                  |
| list_task                                 | 调用list_task查询转码任务列表。               |



##### 统计查询相关接口

| <div style="width:140px"> 接口名称</div> | <div style="width:300px"> 接口功能描述 </div> |
| ---------------------------------------- | --------------------------------------------- |
| list_summary                             | 调用list_summary查询转码时长统计信息。        |


