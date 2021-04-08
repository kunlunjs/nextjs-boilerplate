# api代理配置


## 代理相关文件
```
pages/api/[...slug].ts  代理实现文件
.env                    代理配置环境变量
```

## 修改api代理配置
模板中提供的默认代理路径为`/api`，在`.env`文件中修改对应的配置项：
```bash
# API服务地址
API_SERVER=http://test.t20.ainanjing.org.cn
# 代理超时时间，默认为30分钟，1000 * 60 * 30 = 30m
API_MAX_PROXY_TIMEOUT=1800000
# API超时时间，默认为30分钟，1000 * 60 * 30 = 30m
API_MAX_TIMEOUT=1800000
```
代理接口访问路径为：`http://localhost:3000/api/{api_path}`

## 调整api代理路径
将`[...slug].ts`移动到pages中对应的目录下。
