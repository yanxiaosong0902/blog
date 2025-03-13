
export type MenuItem = {
  key: string
  label: string
  children?: MenuItem[]
}

export const MenuItems: MenuItem[] = [{
  key: 'doc-js',
  label: 'javascript',
  children: [{
    key: 'promise',
    label: 'promise'
  }, {
    key: 'gc',
    label: '垃圾回收'
  }]
}, {
  key: 'doc-ts',
  label: 'typescript',
  children: [{
    key: 'ts-types',
    label: '常用类型工具'
  }]
}, {
  key: 'doc-react',
  label: 'react',
  children: [{
    key: 'hooks',
    label: 'hooks'
  }, {
    key: 'fiber',
    label: 'fiber'
  }, {
    key: 'source-code',
    label: '源码解析'
  }, {
    key: 'context',
    label: 'context'
  }, {
    key: 'other',
    label: '其他'
  }]
}, {
  key: 'doc-vue',
  label: 'vue'
}, {
  key: 'doc-node',
  label: 'node',
  children: [{
    key: 'express',
    label: 'express'
  }, {
    key: 'koa',
    label: 'koa'
  }, {
    key: 'egg',
    label: 'egg'
  }]
}, {
  key: 'doc-css',
  label: 'css',
  children: [{
    key: 'optimize',
    label: '优化'
  }]
}, {
  key: 'doc-optimize',
  label: '性能优化',
}, {
  key: 'doc-arch',
  label: '架构服务',
  children: [{
    key: 'requestor',
    label: '请求库'
  }, {
    key: 'upload-file-chunk',
    label: '大文件上传'
  }]
}, {
  key: 'doc-dp',
  label: '设计模式',
  children: [{
    key: 'pub-sub',
    label: '发布订阅模式'
  }, {
    key: 'observer',
    label: '观察者模式'
  }]
}, {
  key: 'doc-bundler',
  label: '构建工具'
}]
