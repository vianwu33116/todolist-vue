<template>
  <div class="container d-flex flex-column align-items-center">
    <h1 class="title m-4">TODO&nbsp;&nbsp;&nbsp;LIST</h1>
    <div class="wrap">
      <div class="d-flex mb-5">
        <input type="text" class="form-control me-2" id="add-list" placeholder="Add New Task" />
        <button type="button" class="btn">+</button>
      </div>
      <div class="todo-wrap rounded">
        <TodoList />
      </div>
    </div>
  </div>
</template>

<script setup>
import TodoList from '../components/TodoList.vue'
</script>
