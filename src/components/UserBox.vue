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
      <div class="user-box-item user-icon">
        <img :src="usermsg.avatar">
      </div>
      <div class="name-item">
        萌新:  {{usermsg.username}}
      </div>
      <div class="email-item">
        email:  {{usermsg.email}}
      </div>
      <div>
        <el-button type="warning" style="width: 100%;margin-top: 10px;" @click="handleLoout">
          退出登陆
        </el-button>
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
        email: "646617513@qq.com",
        password: "yjr1923521",
        usermsg: {
          username: '',
          email: '',
          avatar: ''
        }
      }
    },
    methods: {
      handelLogin () {
        let params = {
          email: this.email,
          password: this.password
        }

        console.log(process.env.NODE_ENV);
        let basePath = process.env.NODE_ENV == 'development' ? '/api' : ''

        this.$axios.post('/login', params).then(res => {
          if(res.data.code == 200){
            this.usermsg = res.data.data
            this.usermsg.avatar = process.env.NODE_ENV == 'development' ? '/api' + res.data.data.avatar : res.data.data.avatar
            cookies.set('username', this.usermsg.username, { expires: 14 })
            cookies.set('email', this.usermsg.email, { expires: 14 })
            cookies.set('avatar', this.usermsg.avatar, { expires: 14 })
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
        let avatar = cookies.get('avatar')

        if(username && email){
          this.usermsg.username = username;
          this.usermsg.email = email;
          this.usermsg.avatar = avatar;
        }
      },
      handleLoout () {
        this.usermsg.email = '';
        this.usermsg.username = '';
        cookies.remove('username');
        cookies.remove('email');

        this.$axios.delete('/logOut').then(res => {
          if(res.data.code == 200){
            alert('退出登陆成功')
          }
          else {
            alert(res.data.msg);
          }
        })
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

  /*用户登陆框*/
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
  /*用户登陆框结束*/

  /*用户信息框*/
  .user-box {
    padding-top: 30px;
    .user-icon {
      text-align: center;
      img {
        width: 100px;
        height: 100px;
      }
    }

    .name-item,.email-item {
      text-align: center;
      margin-top: 20px;
      font-size: 16px;
      color: #333;
      font-weight: 400;
      line-height: 36px;
    }
  }

  /*用户登陆框结束*/


</style>
