<template>
    <div class="article-list">
      <router-link :to="{name: 'content', params: {id: item._id}}" class="item" v-for="item in currentArticles" :key="item._id">
        <div class="item-top">
          <div class="img-wrap">
            <img :src="item.authorMsg[0].avatar">
          </div>
          <div class="item-msg">
            <div class="row-one">
            <span class="author-name">
            {{item.author}}
          </span>
              <h2>
                {{item.title}}
              </h2>
            </div>
            <div class="row-two">
            <span class="row-item">
              浏览: {{item.looknums}}
            </span>
              <span class="row-item">
              回复: {{item.commontnums}}
            </span>
              <span class="row-item">
              分类: {{item.tags.map(tag => tag.name).join(' ')}}
            </span>
            </div>
          </div>
        </div>

        <div class="item-content" v-text="item.contentText">

        </div>
      </router-link>



    </div>
</template>

<script>
    export default {
        props: {
          articles: Array
        },
        data () {
          return {
            currentArticles: []
          }
        },
        watch: {
          articles (val) {
            let basePath = process.env.NODE_ENV == 'development' ? '/api': ''

            this.currentArticles = val.map(item => {
              console.log(item);
              item.authorMsg[0].avatar = basePath + item.authorMsg[0].avatar
              return item
            })

          }
        }
    }
</script>

<style scoped lang="scss">
  .article-list {
    box-sizing: border-box;
    margin-top: 30px;
    border-radius:  4px;
    padding: 2px 20px;
    background: #fff;

  }

  .item {
    text-decoration: none;
    color: #333;
    display: block;
    padding-bottom: 20px;
    margin-top: 20px;
  }

  .item-top {
    display: flex;

    .img-wrap {
      margin-right: 15px;
      width: 80px;
      height: 80px;
      img {
        display: block;
        width: 100%;
      }
    }
  }

  .row-one {
    display: flex;

    .author-name {
      color: #409eff;
      font-weight: 700;
      padding-right: 8px;
      border-right: 1px solid #000;
    }

    h2 {
      font-size: 18px;
      font-weight: 700;
      margin-left: 15px;
    }
  }

  .item-msg {
    width: 100%;
  }

  .row-two {
    box-sizing: border-box;
    padding: 4px 8px;
    margin-top: 15px;
    border-radius: 4px;
    width: 100%;
    background: #bbb;

    .row-item {
      font-size: 14px;
      color: #333;
      font-weight: 700;
      margin-right: 30px;
    }
  }
</style>
