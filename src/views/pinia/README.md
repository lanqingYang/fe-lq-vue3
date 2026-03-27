# pinia 使用

## 文件解构

```
src/
├── store/                  # Pinia 状态管理目录
│   └── useUserStore.ts     # 用户模块（核心文件）
├── main.ts                 # 入口文件（Pinia 及插件注册）
└── App.vue                 # 页面演示（状态使用）

```

示例为一个简单的登录,用户token和userInfo存到pinia,由pinia persist进行数据持久化.登出时销毁数据存储.
其中涉及到使用 persist持久化存储数据.其本质是把pinia中state数据存到本地,初始化时再把本地数据复制.以实现刷新数据不丢失.
