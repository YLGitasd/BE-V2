<style scoped>
.edit-div {
    box-sizing: border-box;
    min-height: 800px;
    margin-left: auto;
    margin-right: auto;
    padding: 3px;
    border: 1px solid #dcdfe6;
    font-size: 12px;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-user-modify: read-write-plaintext-only; /*// 只是编辑text文本，只能解决webkit内核里面问题，手机端适用*/
}
.edit-div:hover{
    border-color: #C0C4CC;
}
.edit-div[contenteditable=true] {
    -webkit-user-modify: read-write-plaintext-only;
    -moz-user-modify: read-write-plaintext-only;
}

.edit-div[contenteditable=true]:empty:before {
    content: attr(placeholder);
    display: block;
    color: #ccc;
}
</style>

<template>
    <div class="edit-div"
        placeholder="请输入内容" 
        :contenteditable="contenteditable" 
        v-text="content" 
        @blur="changeText($event.target.innerText)">
    </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      content: {
        type: String,
        default: ''
      },
      contenteditable: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      changeText(content) {
        this.$emit('change',content)
      }
    }
  }

</script>
