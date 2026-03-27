<script setup lang="ts">
import { ref } from 'vue'

// 1. v-if 条件
const score = ref(90)

// 2. v-show
const isShow = ref(true)

// 3. v-for 列表
const userList = ref([
  { id: 1, name: '张三', age: 18 },
  { id: 2, name: '李四', age: 20 },
  { id: 3, name: '王五', age: 22 },
])

const addUser = () => {
  const id = Date.now()
  userList.value.push({ id, name: '新人', age: 20 })
}

const delUser = () => {
  userList.value.pop()
}

// 4. v-model 表单
const message = ref('双向绑定')
const checked = ref(false)
const gender = ref('男')
const selectValue = ref('')

// 5. 事件修饰符
const handleClick = (msg: string) => {
  alert(msg)
}

const handleEnter = () => {
  alert('按下了回车！')
}
</script>

<template>
<!-- 模板语法 &  常用指令 .once执行一次 .stop组织冒泡 .prevent组织默认  keyup.enter 回车-->
  <div style="max-width: 600px; margin: 20px auto; padding: 0 16px">
    <h2>✅ Vue3 模板语法 & 常用指令全家桶</h2>

    <!-- 1. v-if -->
    <div>
      <h4>【1. v-if 条件渲染】</h4>
      分数：<input v-model.number="score" type="number" />
      <div>
        <span v-if="score >= 90">优秀</span>
        <span v-else-if="score >= 60">及格</span>
        <span v-else>不及格</span>
      </div>
    </div>
    <hr />

    <!-- 2. v-show -->
    <div>
      <h4>【2. v-show 显示隐藏】</h4>
      <button @click="isShow = !isShow">切换显示/隐藏</button>
      <div v-show="isShow" style="margin-top: 10px; background: #eee; padding: 10px">
        我是 v-show 控制的盒子，切换时 DOM 不会被销毁！
      </div>
    </div>
    <hr />

    <!-- 3. v-for -->
    <div>
      <h4>【3. v-for 列表渲染】</h4>
      <button @click="addUser">添加一条</button>
      <button @click="delUser">删除最后一条</button>
      <ul>
        <li v-for="item in userList" :key="item.id">
          {{ item.id }} - {{ item.name }} - {{ item.age }} 岁
        </li>
      </ul>
    </div>
    <hr />

    <!-- 4. v-model -->
    <div>
      <h4>【4. v-model 双向绑定】</h4>
      输入：<input type="text" v-model="message">→{{ message }} <br />
      复选：<input type="checkbox" v-model="checked">→{{ checked }} <br />
      性别：<input type="radio" v-model="gender" value="男" />男
      <input type="radio" v-model="gender" value="女" />女
      →{{ gender }}
      <br />
      下拉：<select name="" id="" v-model="selectValue">
        <option value="选项A">选项A</option>
        <option value="选项A">选项B</option>
      </select> →{{ selectValue}}

    </div>
    <hr />

    <!-- 5. 事件修饰符 事件传参！必须用箭头函数(Vue2) ，写 函数名 是传 “函数本身”，所以加上（传参）就会立即执行函数.  但是vue3已经自动规避这个问题-->
    <div>
      <h4>【5. 事件修饰符】</h4>
      <div >
        <!-- !! 特例！在有修饰符的时候.stop等，会自动把函数包装成箭头函数 所以下面不写成箭头函数依然正常执行 -->
        <button @click.stop="handleClick('阻止冒泡')">.stop 阻止冒泡</button>
        <!-- 取消修饰符,这么些会导致初始化时函数立即执行,给click返回的就是undefined无法二次点击执行  但是Vue3 会自动处理成箭头函数 !!! 所以也能正常执行-->
        <button @click="handleClick('正常点击')">正常点击</button>
      </div>
      <br />
      <form @submit.prevent="()=>handleClick('阻止表单默认刷新')">
        <button >提交表单 组织表单默认刷新</button>
      </form>
      <br />
      <button @click.once="()=>handleClick('只执行一次')">.once 只执行一次</button>
      <br /><br />
      <input   @keyup.enter="handleEnter"/>按下回车触发事件
    </div>
  </div>
</template>

<style scoped>
button {
  margin: 4px;
  padding: 4px 10px;
  cursor: pointer;
}

li {
  margin: 4px 0;
}
</style>
