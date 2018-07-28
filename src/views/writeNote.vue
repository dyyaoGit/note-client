<template>
    <div class="w1170 write-container">
      <div class="title-wrap">
        <div class="title-label">
          标题
        </div>
        <input type="text" v-model="title" placeholder="请输入笔记标题">
      </div>
      <div class="clearfix">
        <div class="title-label">
          内容
        </div>
        <div class="editor">
          <quill-editor
            @change="handleChange"
            v-model="content"
            ref="myQuillEditor"
            :options="options"
          >
          </quill-editor>
        </div>
        <div class="labels clearfix">
          <span class="labels-title fll">标签：</span>
          <el-checkbox-group v-model="selectLabel" class="fll" size="small">
            <el-checkbox-button v-for="label in labels" :label="label" :key="label._id">{{label.name}}</el-checkbox-button>
          </el-checkbox-group>
        </div>
        <el-button type="primary" style="margin-top: 20px;" @click="handleSubmit">
          发布笔记
        </el-button>
      </div>
    </div>
</template>

<script>
  import 'quill/dist/quill.snow.css'
  import {quillEditor, Quill} from 'vue-quill-editor'
  import { ImageExtend, QuillWatch} from 'quill-image-extend-module'

  let action = process.env.NODE_ENV == 'development'? '/api/upload': '/upload'
  let basePicPath = process.env.NODE_ENV == 'development'? '/api' : ''

  Quill.register('modules/ImageExtend', ImageExtend)

    export default {
      components: {
        quillEditor
      },
      data () {
        return {
          title: '测试标题',
          content: '测试内容',
          contentText: '',
          selectLabel: [],
          labels: [],
          options: {
            modules: {
              ImageExtend: {
                size: 2,
                loading: true,
                name: 'pic',
                action,
                response: (res) => {
                  if(res.code == 401){
                    alert('上传的图片格式不符合要求')
                    return
                  }
                  return basePicPath + res.data.path
                },
                sizeError (err) {
                  alert('图片大小超出限制')
                }
              },
              toolbar: {
                container: [
                  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  ['image'],
                  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                  [{ 'font': [] }],
                  [{ 'align': [] }],
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
                  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
                  [{ 'direction': 'rtl' }],
                ],
                handlers: {
                  'image': function () {
                    QuillWatch.emit(this.quill.id)
                  }
                }
              }
            }
          }
        }
      },
      methods: {
        getLabels () {
          this.$axios.get('/categories').then(res => {
            this.labels = res.data.data;
          })
        },
        handleSubmit () {
          let params = {
            title: this.title,
            content: this.content,
            tags: this.selectLabel,
            contentText: this.contentText.substring(0, 200) + '...'
          }
          this.$axios.post('/article',params).then(res => {
            if(res.data.code == 200) {
              this.$message.success('笔记发布成功!');
              setTimeout(() => {
                this.$router.push('/')
              }, 500)
            }
          })
        },
        handleChange ({ quill, html, text }) {
          this.contentText = text;
        }
      },
      mounted () {
        this.getLabels();
      }
    }
</script>

<style>
  .ql-container {
    min-height: 300px;
  }
  .write-container .el-checkbox-button__inner,
  .write-container .el-checkbox-button:first-child .el-checkbox-button__inner,
  .write-container .el-checkbox-button:last-child .el-checkbox-button__inner
  {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    margin-right: 20px;
  }
</style>
<style scoped lang="scss">
  .write-container {
    box-sizing: border-box;
    margin-top: 30px;
    padding: 8px 24px;
    background: #fff;
    border-radius: 4px;

    .title-label {
      margin-top: 6px;
      color: #333;
      font-size: 20px;
      font-weight: 700;
      line-height: 1.5;
    }

    .title-wrap {
      &>input {
        margin-top: 10px;
        border: 1px solid #eee;
        border-radius: 4px;
        box-sizing: border-box;
        width: 100%;
        line-height: 40px;
        padding: 0 6px;
        font-size: 16px;
        color: #555;
      }
    }

    .editor {
      margin-top: 10px;
    }
    .labels {
      margin-top: 10px;

      .labels-title {
        font-size: 14px;
        font-weight: 700;
        color: #409eff;
      }
    }


  }
</style>
