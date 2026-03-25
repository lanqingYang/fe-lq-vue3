## 1.传值板块训练。

1. 父 → 子 props
2. 子 → 父 emit
3. 爷 → 孙 provide /inject
4. 全局事件总线 mitt
5. 全局状态 Pinia
6. v-model 组件双向绑定

## 文件结构

```
src/
├── views/
│   └── valueTransfer/
│       ├── FatherCmp.vue
│       ├── SonCmp.vue
│       ├── GrandSonCmp.vue
│       ├── index.vue
│       └── README.md
├── store/
│   └── valueTransferStore.ts
└── utils/
│   └── bus.ts
└── constants/
    └── busKey.ts
    └── provideKey.ts
    └── storeKey.ts

```
