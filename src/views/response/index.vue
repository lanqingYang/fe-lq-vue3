<script setup lang="ts">
import { ref, reactive, computed, toRef, toRefs, watch, watchEffect } from 'vue'

const name = ref('')
const age = ref(0)

// ==================== computed 完整版：get + set ====================
// 计算年龄 * 2
const doubleAge = computed(() => age.value * 2)

// 带称谓名称
const fullName = computed({
  get: () => `杨${name.value}`,
  set: (newValue) => {
    name.value = newValue
  }
})

// ==================== reactive 深层响应 ====================

// reactive对象. 注意：reactive不能直接解构，否则会失去响应式。但是通过代理对象指向数据 reactive.address.city 访问是可以的。
const userInfo = reactive({
  gender: '女',
  job: '前端',
  address: {
    city: '重庆',
    // 坐标
    coord: {
      x: 100,
      y: 200
    }
  }
})

// ==================== toRef / toRefs 正确演示 ====================

// 解构 reactive 变为 ref， toRef和toRefs的区别
const deconstructionJob = toRef(userInfo, 'job')
const { city, coord } = toRefs(userInfo.address)


// ==================== watch 精确监听（补充 immediate + deep） ====================

// watch 监听 name变化的次数
const watchNameChangeCount = ref(0)
const watchAgeChangeCount = ref(0)

// 设置第二参数：{immediate: true, // 立即执行一次}， 让watch在监听到变化时，立即执行一次回调函数。这样在组件初始化时，就会统计一次name和age的变化次数，初始值为1。
watch([name, age], () => {
  watchNameChangeCount.value++
  watchAgeChangeCount.value++
}
)

// ==================== watchEffect 正确用法 ====================

// watchEffect监听 age ,name变化的次数

const watchEffectNameChangeCount = ref(0)
watchEffect(() => {
  // 让watchEffect监听 name 和 age 的变化
  // 初始化时，也会触发一次，所以初始值为1
  console.log(name.value);
  watchEffectNameChangeCount.value++
})

</script>

<template>
  <div>
    <div class="marginBTM16 border">Vue3 响应式核心：
      <li>1.ref</li>
      <li>2.reactvie</li>
      <li>3.computed</li>
      <li>4.toRef,toRefs</li>
      <li>5.watch,watchEffect</li>
    </div>
    <!-- 1.ref -->
    <div class="marginBTM16 border">
      <p>【1. ref 】</p>
      <div>
        <div>姓名：{{ name }}</div>
        <div>年龄：{{ age }}</div>
        <div>
          <button @click="() => { name = '张三' + Math.random() }">修改名称</button>
          <button @click="() => { age++ }">年龄+1</button>
        </div>
      </div>
    </div>
    <!-- 2.computed -->
    <div class="marginBTM16 border">
      <p>【2. computed 】</p>
      <div>
        <div>双倍年龄：{{ doubleAge }}</div>
        <div>全名：{{ fullName }}</div>
        <!-- (注意：fullName是一个计算属性，不能直接修改name的值，而是通过fullName的set函数来修改name的值，先set后get函数) -->
        <button @click="fullName = '李四'">
          点我触发 computed 的 set 函数，修改全名为李四</button>
      </div>
    </div>
    <!-- 3.reactive 数据对象 -->
    <div class="marginBTM16 border">
      <p>【3. reactive 】</p>
      <div>
        <div>性别：{{ userInfo.gender }}</div>
        <div>职业：{{ userInfo.job }}</div>
        <div>城市：{{ city }}</div>
        <div>坐标：{{ coord.x }}, {{ coord.y }}</div>
        <button @click="() => { userInfo.address.city = '北京' + Math.random() }">改城市</button>
        <button @click="() => { userInfo.job = '前端' + Math.random() }">改职业</button>
        <button @click="() => { coord.x++ }">改坐标x+1(深层解构中，对象依然是响应式)</button>
      </div>
    </div>
    <!-- 4.解构 toRef，toRefs -->
    <div class="marginBTM16 border">
      <p>【4. 解构 toRef，toRefs 】</p>
      <div>
        <div>toRef 职业：{{ deconstructionJob }}</div>
        <div>toRefs 城市：{{ city }}</div>
      </div>
    </div>
    <!-- 5.watch 监听变化 -->
    <div class="marginBTM16 border">
      <p>【5. watch 】</p>
      <div>
        <div>名称变化次数：{{ watchNameChangeCount }}</div>
        <div>年龄变化次数：{{ watchAgeChangeCount }}</div>
      </div>
    </div>
    <!-- 6.watchEffect 监听变化 -->
    <div class="marginBTM16 border">
      <p>【6. watchEffect 】自动依赖收集 ;watchEffect会在初始化时立即执行一次</p>
      <div>
        <div>名称变化次数：{{ watchEffectNameChangeCount }}</div>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
button {
  margin: 4px;
  padding: 4px 8px;
}

.marginBTM16 {
  margin-bottom: 16px;
}

.border {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
}
</style>
