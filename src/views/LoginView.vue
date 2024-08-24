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

const loginData = ref({
  email: '',
  password: ''
})
const isFormFilled = ref(true)

function handleClick() {
  if (loginData.value.email !== '' && loginData.value.password !== '') {
    console.log(loginData.value.email, loginData.value.password)
  } else {
    isFormFilled.value = false
  }
}
</script>
