<template>
  <div id="app" @click="hideSearchHistory">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    hideSearchHistory(event) {
      let e = document.getElementById("searchHistory");
      if (e) {
        if (!e.contains(event.target)) {
          this.$store.commit("isShowSearchPop", false);
        }
      }
    },
  },
};
</script>

