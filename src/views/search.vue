<template>
    <div>
      <div class="input-wrap">
        <input type="text" v-model="title" class="search-input" @keyup.enter="handleSearch">
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </div>

      <ArticleList :articles="articleList"></ArticleList>
    </div>
</template>

<script>
    import ArticleList from '~/components/ArticleList.vue'

    export default {
        components: {
          ArticleList
        },
        data () {
          return {
            articleList: [],
            title: ""
          }
        },
        methods : {
          getData () {
            this.$axios.get('/article').then(res => {
              this.articleList = res.data.data;
            })
          },
          handleSearch () {
            this.$axios.get('/article', {
              params: {
                title: this.title
              }
            }).then(res => {
              this.articleList = res.data.data;
            })
          }
        },
        created () {
          this.getData();
        }
    }
</script>

<style scoped lang="scss">
  .input-wrap {
    margin-top: 30px;
    display: flex;

    input {
      flex: 9;
      line-height: 50px;
      padding: 0 10px;
      border-radius: 4px 0 0 4px;
      border: 1px solid #e1e1e1;
      border-right: 0;
      outline: none;
      font-size: 18px;
      color: #555;
    }
    button {
      flex: 1;
      border-radius: 0 4px 4px 0;
    }
  }
</style>
