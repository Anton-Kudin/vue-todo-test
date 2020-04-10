<template>
  <div>
    <AppHeader>
      <router-link to="/" class="header__nav-item btn btn-info">
        На главную
      </router-link>
    </AppHeader>
    <div class="content">
      <AppMainTitle>Такой страницы не существует</AppMainTitle>
    </div>
  </div>
  
</template>

<script>
import Header from '@/components/system/Header.vue'

export default {
  name: 'Home',
  components: {
    Header,
  },
  data() {
    return {
      modalDelete: {
        show: false,
        msg: "",
        msgBtnAction: "",
        removeId: null
      }
    }
  },
  computed: {
    notices() {
      return this.$store.getters.getNotices
    }
  },
  methods: {
    modalDeleteClose() {
      this.modalDelete.show = !this.modalDelete.show
    },
    deleteNotice() {
      this.$store.dispatch("removeNotice", this.modalDelete.removeId)
      this.modalDeleteClose()
    },
    confirmDeleteModal(id) {
      this.modalDelete.msg = "Удалить заметку?"
      this.modalDelete.show = !this.modalDelete.show
      this.modalDelete.removeId = id;
      this.modalDelete.msgBtnAction = "Удалить"
    },
  }
}
</script>

<style lang="scss">




</style>
