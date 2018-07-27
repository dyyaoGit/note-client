<template>
  <div class="right-box">
    <div class="login-box" v-if="!usermsg.username">
      <div class="item">
        <input type="text" placeholder="邮箱" v-model="email">
      </div>
      <div class="item">
        <input type="password" placeholder="密码" v-model="password" @keyup.enter="handelLogin">
      </div>
      <div class="item">
        <el-button type="primary" class="_el-btn" @click="handelLogin" >
          登录
        </el-button>
      </div>
      <div class="item">
        <el-button class="_el-btn" @click="$router.push('/region')">
          注册
        </el-button>
      </div>
    </div>
    <div class="user-box" v-else>
      <div>
        {{usermsg.username}}
      </div>
      <div>
        {{usermsg.email}}
      </div>
    </div>
  </div>
</template>


<script>
  import cookies from 'js-cookie'

  export default {
    name: "UserBox",
    data () {
      return {
        email: "",
        password: "",
        usermsg: {
          username: '',
          email: ""
        }
      }
    },
    methods: {
      handelLogin () {
        let params = {
          email: this.email,
          password: this.password
        }

        this.$axios.post('/login', params).then(res => {
          if(res.data.code == 200){
            this.usermsg = res.data.data
            cookies.set('username', this.usermsg.username, { expires: 14 })
            cookies.set('email', this.usermsg.email, { expires: 14 })
            alert('登陆成功，欢迎回来' + res.data.data.username)
          }
          else {
            alert(res.data.msg)
          }
        })
      },
      getUserMsg () {
        let username = cookies.get('username')
        let email = cookies.get('email')

        if(username && email){
          this.usermsg.username = username;
          this.usermsg.email = email;
        }
      }
    },
    mounted () {
      this.getUserMsg();
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
