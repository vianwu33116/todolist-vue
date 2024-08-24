<template>
  <ul class="nav py-3 d-flex justify-content-around rounded">
    <li class="nav-item">All</li>
    <li class="nav-item">ToDo</li>
    <li class="nav-item">Done</li>
  </ul>
  <ul class="list-group">
    <li class="list-group-item">
      <input type="checkbox" name="" id="" class="me-2" checked />
      An item
    </li>
    <li class="list-group-item">
      <input type="checkbox" name="" id="" class="me-2" />
      A second item
    </li>
  </ul>
</template>

<script setup>
const data = {
  status: true,
  data: [
    {
      id: '123456789',
      createTime: 1620281234,
      content: '買晚餐',
      status: false
    }
  ]
}
</script>
