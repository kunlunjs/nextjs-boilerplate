import { NextApiRequest, NextApiResponse } from 'next'
import httpProxy from 'http-proxy'

const MAX_TIMEOUT = 1000 * 60 * 30 // 30m
const MAX_PROXY_TIMEOUT = 1000 * 60 * 30 // 30m

const proxy = httpProxy.createProxy()

// 不处理body，交由http-proxy代理下去
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true
  }
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise((resolve, reject) => {
    proxy
      .once('proxyRes', resolve)
      .once('error', reject)
      .web(req, res, {
        target: process.env.API_SERVER,
        changeOrigin: true,
        proxyTimeout: process.env.API_MAX_PROXY_TIMEOUT ?? MAX_PROXY_TIMEOUT,
        timeout: process.env.API_MAX_TIMEOUT ?? MAX_TIMEOUT
      })
  })
}
