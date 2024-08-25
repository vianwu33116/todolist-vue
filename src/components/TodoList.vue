<template>
  <ul class="nav py-3 d-flex justify-content-around rounded">
    <li class="nav-item" v-for="(tag, index) in tags" :key="tag">
      <a
        href="#"
        :class="current === index ? 'underline' : ''"
        v-on:click.prevent="handleTagClick(tag)"
        >{{ tag }}</a
      >
    </li>
  </ul>
  <ul class="list-group">
    <li class="list-group-item d-flex justify-content-between" v-for="item in list" :key="item.id">
      <div>
        <input
          type="checkbox"
          name=""
          id=""
          class="me-2"
          :checked="item.status"
          @click="toggleCheck(item)"
        />
        {{ item.content }}
      </div>
      <div class="delete-btn rounded px-2" @click="delelteItem(item)">x</div>
    </li>
  </ul>
  <div v-if="list.length === 0 && current !== 2" class="no-item text-center rounded py-4 mx-4">
    No items to do.<br />Start adding a new task!
  </div>
  <div v-if="list.length === 0 && current === 2" class="no-item text-center rounded py-4 mx-4">
    No finished item.
  </div>
  <div class="alert mx-4 mt-3 text-end" v-if="current !== 0">Total items: {{ list.length }}</div>
  <div class="alert mx-4 mt-3 text-end" v-if="current === 0">
    Unfinished items: {{ unfinishedCount }}
  </div>
</template>

<script setup>
import { ref, onMounted, defineExpose } from 'vue'
import todoService from '@/services/todoService'

let allList = []
const list = ref([])
const tags = ref(['All', 'ToDo', 'Done'])
const current = ref(0)
const unfinishedCount = ref(0)

onMounted(() => {
  handleStatusChange()
})

async function getTodoList() {
  try {
    const res = await todoService.getToDoList()
    return res.data.data
  } catch (err) {
    console.log(err.response)
  }
}

async function toggleCheck(item) {
  try {
    await todoService.toggleToDo(item.id)
    handleStatusChange()
  } catch (err) {
    console.log(err.response)
    alert(`Failed, ${err.response}`)
  }
}

async function delelteItem(item) {
  try {
    await todoService.deleteToDo(item.id)
    alert('Delete success')
    handleStatusChange()
  } catch (err) {
    console.log(err.response)
    alert(`刪除失敗，${err.response.data.message}`)
  }
}

function handleTagClick(tag) {
  current.value = tags.value.indexOf(tag)
  handleStatusChange()
}

async function handleStatusChange() {
  allList = await getTodoList()
  if (current.value === 1) {
    list.value = allList.filter((item) => item.status === false)
  } else if (current.value === 2) {
    list.value = allList.filter((item) => item.status === true)
  } else {
    list.value = allList
  }
  unfinishedCount.value = allList.filter((item) => item.status === false).length
}

defineExpose({
  handleStatusChange
})
</script>
