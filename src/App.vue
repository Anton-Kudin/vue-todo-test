<template>
  <div id="app" class="wrapper">
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("loadNotices")
  }
}

</script>