<template>
  <div>
    <input
      :type="type"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :autocomplete="autocomplete"
      :value="value"
      @input="$emit('getInputValue', $event.target.value)"
      :class="showError?'error':''"
    />
  </div>
</template>

<script>
export default {
  props: [
    "type",
    "placeholder",
    "maxlength",
    "autocomplete",
    "value",
    "showError",
  ],
  model: {
    prop: "value",
    event: "getInputValue",
  },
};
</script>

<style lang="less" scoped>
input {
  box-sizing: border-box;
  border: 1px solid #ddd;
  width: 100%;
  font-size: 14px;
  padding: 10px;
  height: 40px;
  border-radius: 4px;
}
.error {
  border-color: #f66495;
}
</style>