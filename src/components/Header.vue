<template>
    <header class="layout-header">
      <div class="w980 wrap">
        <h1>云笔记</h1>
        <el-button class="write-btn">
          写笔记
        </el-button>
      </div>
    </header>
</template>

<script>
    export default {
        name: '',
        data() {
            return {}
        }
    }
</script>


<style scoped lang="scss">
  .layout-header {
    height: 50px;
    background: #409eff;


  }

  .wrap {
    display: flex;
    justify-content: space-between;

    h1 {
      margin-top: 5px;
      color: #fff;
      font-weight: 400;
      font-size: 30px;
    }

    .write-btn {
      margin-top: 5px;
    }
  }
</style>
