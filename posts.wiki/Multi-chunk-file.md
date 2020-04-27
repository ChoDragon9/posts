앞에서 필더링한 chunk인 `vendor`를 기준으로 `vendor-a-k`,`vendor-l`,`vendor-m-z`로 분리한 예제

```javascript
new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  minChunks: createFilterChunkFn(/node_modules/)
}),
new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor-a-k',
  chunks: ['vendor'],
  minChunks: createFilterChunkFn(/node_modules\/[a-k]{1}/)
}),
new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor-l',
  chunks: ['vendor'],
  minChunks: createFilterChunkFn(/node_modules\/[l]{1}/)
}),
new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor-m-z',
  chunks: ['vendor'],
  minChunks: createFilterChunkFn(/node_modules\/[m-z]{1}/)
}),
```