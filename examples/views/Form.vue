<template>
  <div class="r-form-container">

    <r-form
      ref="form"
      :model="formdata"
      :rules="rules"
      label-width="80px"
    >
      <r-form-item
        label="活动名称"
        prop="name"
      >
        <r-input
          placeholder="请输入活动名称"
          v-model="formdata.name"
          clearable
        ></r-input>
      </r-form-item>

      <r-form-item
        label="活动人数"
        prop="count"
      >
        <r-inputnumber
          v-model="formdata.count"
          :min="1"
          :max="100"
        ></r-inputnumber>
      </r-form-item>
      <r-form-item
        label="活动性质"
        prop="type"
      >
        <r-checkbox-group v-model="formdata.type">
          <r-checkbox label="美食餐厅线上活动"></r-checkbox>
          <r-checkbox label="地推活动"></r-checkbox>
          <r-checkbox label="线下主题活动"></r-checkbox>
        </r-checkbox-group>
      </r-form-item>
      <r-form-item
        label="特殊资源"
        prop="resource"
      >
        <r-radio-group v-model="formdata.resource">
          <r-radio
            value="线上品牌商赞助"
            label="线上品牌商赞助"
          ></r-radio>
          <r-radio
            value="线上品牌商赞助"
            label="线下场地免费"
          ></r-radio>
        </r-radio-group>
      </r-form-item>
      <r-form-item
        label="活动照片"
        prop="pics"
      >
        <r-uploader
          accept="image/png, image/jpeg"
          :size="500 * 1024"
          :limit="3"
          multiple
          dragable
          :show-file-list="true"
          :on-success="uploadSuccess"
          :on-error="uploadError"
        >
          <div
            class="uploader-area"
            slot="uploader-area"
          >
            <r-icon name="jia"></r-icon>
            <div class="r-uploader--text">将文件拖到此处，或<em>点击上传</em></div>
          </div>

          <div
            class="r-uploader--tip"
            slot="tip"
          >只能上传jpg/png文件，且不超过500kb</div>
        </r-uploader>
      </r-form-item>
      <r-form-item
        label="活动形式"
        prop="desc"
      >
        <r-input
          type="textarea"
          v-model="formdata.desc"
          placeholder="请输入活动形式"
        ></r-input>
      </r-form-item>

      <r-form-item>
        <r-button
          type="primary"
          @click="submit"
        >立即创建</r-button>
        <r-button>取消</r-button>
      </r-form-item>

    </r-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: {
        name: "",
        type: ["线下主题活动"],
        resource: "",
        desc: "",
        count: 1,
        pics: []
      },
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          {
            required: true,
            message: "请至少选择一个活动资源",
            trigger: "change"
          }
        ],
        pics: [
          {
            type: "array",
            required: true,
            message: "请至少选择一张活动照片",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    uploadSuccess(data) {
      console.log("上传成功后传给用户的图片");
      console.log(data);
      this.formdata.pics = data;
    },
    uploadError(err) {
      this.$message({
        message: err,
        type: "error"
      });
    },
    submit() {
      // 表单校验

      this.$refs.form.validate(valid => {
        if (valid) {
          alert("校验成功");
        } else {
          alert("校验失败");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.r-form-container {
  width: 480px;
  margin: 20px;
}
</style>
