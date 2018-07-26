<template>
    <div class="banner-wrap">
      <img src="/static/img/banner.jpg">
      <div class="desc">
        十三亿人都会用的云笔记
      </div>
    </div>
</template>

<script>
    export default {
        name: "Banner"
    }
</script>

<style scoped lang="scss">
  .banner-wrap {
    position: relative;
    width: 750px;
    border-radius: 4px;
    overflow: hidden;

    img {
      display: block;
      width: 100%;
    }

    .desc {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      font-size: 20px;
      font-weight: 400;
      line-height: 50px;
      padding-left: 30px;
      color: rgba(255,255,255,.8);
      background: rgba(0,0,0,.5);
    }
  }
</style>
