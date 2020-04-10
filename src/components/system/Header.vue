<template>
  <header class="header">
    <Logo />
    <nav class="header__nav-list">
      <slot />
    </nav>
  </header>
</template>

<script>
import Logo from './Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style lang="scss">
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
    border-bottom: 1px solid #CACEC2;

    &__nav-item {
      margin-left: 15px;
    }
  }
</style>