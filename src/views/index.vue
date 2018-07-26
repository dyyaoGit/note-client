<template>
    <div>
      <div class="top-box w980">
        <div class="left-box">
          <Banner></Banner>
        </div>
        <UserBox></UserBox>
      </div>
    </div>
</template>

<script>
    import Banner from '~/components/Banner.vue'
    import UserBox from '~/components/UserBox.vue'

    export default {
        components: {
          Banner,
          UserBox
        },
        data() {
            return {}
        }
    }
</script>


<style scoped>
  .top-box {
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
  }

</style>
