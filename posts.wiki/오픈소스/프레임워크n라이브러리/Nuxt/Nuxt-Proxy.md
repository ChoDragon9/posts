> nuxt.config.ts 설정 값

`@nuxtjs/proxy` 모듈을 사용하면 로컬 개발 환경에 Proxy를 설정할 수 있다.
원리는 이렇다. http://localhost:3000에 클라이언트 서버가 띄어져 있다면 API 요청 시 http://localhost:3000에 요청한다. 요청하면 Proxy 서버가 API 서버에 HTTP 요청을 해준다.

#### http Proxy 설정
```ts
proxy: process.env.PROXY
  ? ['http://service-api-sandbox.domain.com/api']
  : []
```

#### https Proxy 설정
> 인증서 발급: https://blog.lael.be/post/7147

```ts
{
  modules: ['@nuxtjs/proxy'],
  proxy: process.env.PROXY
    ? {
        '/api': {
          target: {
            host: 'service-api-sandbox.domain.com',
            protocol: 'https:',
            port: 443
          },
          secure: false,
          changeOrigin: true,
          logLevel: 'info'
        }
      }
    : [],
  server: process.env.PROXY
    ? {
        https: {
          key: fs.readFileSync(path.resolve(__dirname, 'localhost.key')),
          cert: fs.readFileSync(path.resolve(__dirname, 'localhost.crt'))
        }
      }
    : {}
}
```