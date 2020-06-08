<template>
  <div>

    <r-checkbox-group v-model="hobby">
      <r-checkbox label="篮球">篮球</r-checkbox>
      <r-checkbox label="足球">足球</r-checkbox>
      <r-checkbox label="乒乓球">乒乓球</r-checkbox>
    </r-checkbox-group>

    <p>您选择的爱好是:{{hobby}}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hobby: ["足球"],
      checked: true
    };
  }
};
</script>