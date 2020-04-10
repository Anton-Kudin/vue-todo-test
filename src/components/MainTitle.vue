<template>
    <div class="main-title">
      <h1 class="main-title__inner">
        <slot />
      </h1>
    </div>
</template>

<style lang="scss">
  .main-title {
    margin-bottom: 20px;
    text-align: center;

    &__inner {
      font-size: 1.3rem;
    }
  }
</style>