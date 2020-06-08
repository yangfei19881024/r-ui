<template>
  <div class="r-uploader-wrapper">
    <div class="r-uploader-imagelist">
      <ul class="preview-images-list">
        <li
          v-for="(file, index) in previewImages"
          :key="index"
        >
          <span class="preview-delete-icon">
            <r-icon
              name="mimakejian"
              @click="previewImage(index)"
            ></r-icon>
            <r-icon
              name="delete"
              @click="deleteImage(index)"
            ></r-icon>
          </span>
          <img
            :src="file.url"
            alt=""
          />
        </li>
      </ul>

      <div
        class="r-uploader-container"
        @dragover="prevent"
        @dragenter="prevent"
        @drop="(event) => handleFileUploader(event, 'drop')"
        @click="(event) => handleFileUploader(event, 'click')"
      >
        <slot name="uploader-area"></slot>
        <input
          type="file"
          :multiple="multiple"
          class="r-file__invisible"
          ref="file"
          @change="(event) => handleFileUploader(event, 'change')"
        />
      </div>
    </div>

    <div>
      <slot name="tip"></slot>
    </div>
  </div>
</template>

<script>
import Preview from "./preview.vue";
import upload from "./upload";

export default {
  name: "r-uploader",
  props: {
    accept: {
      type: String
    },
    size: {
      type: Number
    },
    limit: {
      type: Number
    },
    multiple: {
      type: Boolean,
      default: false
    },
    qiniu_domain: {
      type: String
    },
    onSuccess: Function,
    onError: Function
  },
  data() {
    return {
      sourceFiles: [],
      tempImages: [],
      previewImages: []
    };
  },
  methods: {
    upload2Qiniu(files) {
      let uploadPromise = files.map(file => upload(file));

      Promise.all(uploadPromise).then(data => {
        data = data.map((item, index) => ({
          url: `${this.qiniu_domain}/${item}`,
          file: files[index]
        }));
        this.tempImages = data;
      });
    },
    prevent(event) {
      event.preventDefault();
    },
    previewImage(index) {
      this.$modal({
        template: Preview,
        params: {
          url: this.previewImages[index].url
        }
      });
    },
    deleteImage(index) {
      this.previewImages.splice(index, 1);
    },
    handleFileUploader(event, type) {
      let handler = {
        click: () => {
          this.$refs.file.value = "";
          this.$refs.file.click();
        },
        change: event => {
          console.log(event.target.files);
          this.sourceFiles = event.target.files;
        },
        drop: event => {
          event.preventDefault();
          this.sourceFiles = event.dataTransfer.files;
        }
      };

      handler[type](event);
    },
    handleImages(files) {
      if (window.URL && window.URL.createObjectURL) {
        this.createObjectURL(files);
      } else {
        this.createBase64Image(files);
      }
    },
    createObjectURL(files) {
      let filesArray = files.map(file => ({
        file,
        url: URL.createObjectURL(file)
      }));
      this.tempImages = filesArray;
    },
    createBase64Image(files) {
      const handleFile = function(file) {
        return new Promise((resolve, reject) => {
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = e => {
            resolve(e.target.result);
          };

          reader.onerror = error => {
            reject("文件读取失败");
          };
        });
      };

      let files_promises = files.map(handleFile);

      Promise.all(files_promises).then(results => {
        this.tempImages = results.map((res, index) => {
          return {
            url: res,
            file: files[index]
          };
        });
      });
    }
  },
  watch: {
    sourceFiles(value) {
      let files = Array.from(value);

      if (files.length <= 0) return;
      console.log(files);
      let { size, accept } = this;
      // 校验
      if (files.some(file => file.size > size)) {
        return this.onError(`文件最大上传${size}k`);
      }

      if (files.some(file => !~accept.indexOf(file.type))) {
        return this.onError(`只接受${accept}类型的文件`);
      }
      if (this.qiniu_domain) {
        this.upload2Qiniu(files);
      } else {
        this.handleImages(files);
      }
    },

    tempImages(value) {
      console.log("处理过后images");
      console.log(value);

      this.previewImages = [...this.previewImages, ...value];

      if (this.previewImages.length >= this.limit) {
        this.previewImages = this.previewImages.slice(0, this.limit);
        return this.onError(`最多上传${this.limit}个图片`);
      }

      this.onSuccess(this.previewImages);
    }
  }
};
</script>

<style scoped lang="scss">
@import "./style.scss";
</style>
