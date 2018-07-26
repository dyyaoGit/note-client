<template>
  <div class="layout">
    <Header></Header>
    <div class="w1170 content">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue'

  export default {
    components: {
      Header
    },
    data() {
      return {}
    }
  }
</script>

<style scoped>
  .content {

  }
</style>
