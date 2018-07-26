<template>
  <div class="layout">
    <Header></Header>
    <div class="w980 content">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import Header from '@/components/Header'

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
