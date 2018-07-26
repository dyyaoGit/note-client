<template>
  <div id="app">
    <Layout></Layout>
  </div>
</template>

<script>
  import Layout from '@/components/Layout'

  export default {
    name: 'App',
    components: {
      Layout
    }
  }
</script>

<style>
  * {
    padding: 0;
    margin: 0;
  }

  li {
    list-style: none;
  }

  .w980 {
    width: 980px;
    margin: 0 auto;
  }

  body {
    background: #f1f1f1;
  }
</style>
