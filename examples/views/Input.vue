<template>

  <div class="input-wrapper">
    <r-input
      placeholder="请输入姓名"
      clearable
      center
      :value="msg"
      @input="(data) => msg=data"
    >
      <template slot="prepend">https://</template>
    </r-input>

    <r-input
      placeholder="请输入姓名"
      clearable
      center
      :value="msg"
      @input="(data) => msg=data"
    >
      <template slot="append">.com</template>
    </r-input>

    <r-input
      placeholder="请输入姓名"
      clearable
      center
      :value="msg"
      @input="(data) => msg=data"
    >
      <template slot="prepend">https://</template>
      <template slot="append">.com</template>
    </r-input>

    <h1>{{msg}}</h1>
  </div>

</template>

<script>
export default {
  data() {
    return {
      msg: "Hello world"
    };
  }
};
</script>

<style scoped lang="scss">
.input-wrapper {
  width: 480px;
  margin: 100px auto;
}
</style>