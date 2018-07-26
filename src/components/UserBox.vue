<template>
  <div class="right-box">
    <div class="item">
      <input type="text" placeholder="邮箱" v-model="email">
    </div>
    <div class="item">
      <input type="password" placeholder="密码" v-model="password" @keyup.enter="handleLogin">
    </div>
    <div class="item">
      <el-button type="primary" class="_el-btn" @click="handleLogin">
        登录
      </el-button>
    </div>
    <div class="item">
      <el-button class="_el-btn" @click="$router.push('/region')">
        注册
      </el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "UserBox",
    data () {
      return {
        email: "",
        password: ""
      }
    },
    methods: {
      handleLogin () {
        let params = {
          email: this.email,
          password: this.password
        }

        this.$axios.post('/login', params).then(res => {
          if(res.data.code == 200) {
            alert('登录成功')
            this.email = '';
            this.password = '';
          }
          else {
            alert(res.data.msg)
          }
        })

      }
    }
  }
</script>

<style scoped lang="scss">
  .right-box {
    box-sizing: border-box;
    width: 360px;
    background: #fff;
    border-radius: 4px;
    padding: 21px 30px;
  }

  .item {
    margin-top: 30px;

    ._el-btn {
      width: 100%;
    }

    & > input {
      box-sizing: border-box;
      width: 100%;
      border: 1px solid #f1f1f1;
      border-radius: 4px;
      padding: 14px;
      outline: none;
    }
  }
</style>
