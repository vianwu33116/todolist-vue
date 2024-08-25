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
          v-model="loginData.email"
        />
        <div class="alert" v-if="loginData.email == '' && isFormFilled == false">請填入信箱</div>
      </div>
      <div class="mb-4">
        <label for="password" class="form-label">密碼</label>
        <input
          type="text"
          class="form-control"
          id="password"
          placeholder="至少六個字元"
          v-model="loginData.password"
        />
        <div class="alert" v-if="loginData.password == '' && isFormFilled == false">請填入密碼</div>
        <div class="alert" v-if="loginData.password.length < 6 && loginData.password !== ''">
          密碼至少要六個字元
        </div>
      </div>
      <button type="button" class="btn btn-outline-warning mb-4" @click="handleClick">Login</button>
      <div class="go-signup text-end remark">
        <span>尚未註冊?&nbsp;</span><RouterLink to="/signup">Sign&nbsp;Up</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import userService from '@/services/userService'
import cookieService from '@/services/cookieService'

const loginData = ref({
  email: '',
  password: ''
})
const isFormFilled = ref(true)
const router = useRouter()

async function handleClick() {
  if (loginData.value.email !== '' && loginData.value.password !== '') {
    if (loginData.value.password.length >= 6) {
      try {
        const res = await userService.login(loginData.value)
        cookieService.setCookie('todoToken', res.data.token)
        router.push('/todo')
      } catch (err) {
        console.log(err.response)
        alert(`送出失敗，${err.response.data.message}`)
      }
    } else alert('Send Failed, password requires at least 6 words')
  } else {
    isFormFilled.value = false
    alert('Login Failed, form is unfinished!')
  }
}
</script>
