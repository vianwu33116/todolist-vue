<template>
  <div class="container d-flex flex-column align-items-center">
    <div class="user-set d-flex justify-content-end my-2">
      <img src="../assets/user-icon.svg" alt="user icon" class="icon me-1" />
      <span class="nickname me-4">User</span>
      <div class="logout-btn" @click="logout">Logout</div>
    </div>
    <h1 class="title m-4">TODO&nbsp;&nbsp;&nbsp;LIST</h1>
    <div class="wrap">
      <div class="d-flex mb-5">
        <input
          type="text"
          class="form-control me-2"
          id="add-list"
          placeholder="Add A New Task"
          v-model="content"
        />
        <button type="button" class="btn" @click="addItem">+</button>
      </div>
      <div class="todo-wrap rounded">
        <TodoList ref="todoListComponent" />
      </div>
    </div>
  </div>
</template>

<script setup>
import TodoList from '../components/TodoList.vue'
import todoService from '@/services/todoService'
import userService from '@/services/userService'
import cookieService from '@/services/cookieService'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const content = ref('')
const todoListComponent = ref(null)

async function addItem() {
  try {
    await todoService.addToDo(content.value)
    todoListComponent.value.handleStatusChange()
    content.value = ''
  } catch (err) {
    console.log(err.response)
    alert(`Fail, ${err.response.data.message}`)
  }
}

async function logout() {
  try {
    await userService.logout()
    cookieService.cleanCookie('todoToken')
    router.push('/')
  } catch (err) {
    console.log(err.response)
    alert(`送出失敗，${err.response.data.message}`)
  }
}
</script>
