<template>
  <div class="container d-flex flex-column align-items-center">
    <h1 class="title m-4">TODO&nbsp;&nbsp;&nbsp;LIST</h1>
    <div class="card p-4">
      <div class="mb-3">
        <label for="email" class="form-label">信箱</label>
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="name@example.com"
          v-model="signupData.email"
        />
        <div class="alert" v-if="signupData.email == '' && isFormFilled == false">請填入信箱</div>
      </div>
      <div class="mb-3">
        <label for="nickname" class="form-label">暱稱</label>
        <input
          type="text"
          class="form-control"
          id="nickname"
          placeholder="Jack"
          v-model="signupData.nickname"
        />
        <div class="alert" v-if="signupData.nickname == '' && isFormFilled == false">
          請輸入暱稱
        </div>
      </div>
      <div class="mb-4">
        <label for="password" class="form-label">密碼</label>
        <input
          type="text"
          class="form-control"
          id="password"
          placeholder="至少六個字元"
          v-model="signupData.password"
        />
        <div class="alert" v-if="signupData.password == '' && isFormFilled == false">
          請填入密碼
        </div>
        <div class="alert" v-if="signupData.password.length < 6 && signupData.password !== ''">
          密碼至少要六個字元
        </div>
      </div>
      <button type="button" class="btn btn-outline-warning mb-4" @click="handleClick">
        Sign Up
      </button>
    </div>
  </div>
</template>

<script setup>
import userService from '@/services/userService'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const signupData = ref({
  email: '',
  password: '',
  nickname: 'User'
})
const isFormFilled = ref(true)
const router = useRouter()

async function handleClick() {
  if (signupData.value.email !== '' && signupData.value.password !== '') {
    if (signupData.value.password.length >= 6) {
      try {
        await userService.signup(signupData.value)
        alert('Sign up success! Please Login to use the todo list.')
        router.push('/')
      } catch (err) {
        console.log(err.response)
        alert(`送出失敗，${err.response.data.message}`)
      }
    } else alert('Send Failed, password requires at least 6 words')
  } else {
    isFormFilled.value = false
    alert('Send Failed, form is unfinished!')
  }
}
</script>
