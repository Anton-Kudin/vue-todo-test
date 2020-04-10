<template>
  <div>
    <AppHeader>
      <router-link to="new-notice" class="header__nav-item btn btn-info">
        Новая заметка
      </router-link>
    </AppHeader>

    <div class="content">
      <AppMainTitle>Все заметки</AppMainTitle>
      <div v-if="notices" class="notice-list">
        <!-- Заметка -->
        <div v-for="notice in notices" :key="notice.id" class="notice">
          <!-- Шапка заметки -->
          <div class="notice__header">
            <div class="notice__title">
              <h3>{{notice.title}}</h3>
            </div>
            <div class="notice__nav">
              <div class="ml-auto"></div>
              <router-link :to="{ name: 'EditNotice', params: { id: notice.id }}" class="notice__nav-item btn btn-outline-warning" title="Редактировать">
                <i class="fa fa-pencil"></i>
              </router-link>
              <button @click="confirmDeleteModal(notice.id)" class="notice__nav-item btn btn-outline-danger" title="Удалить"><i class="fa fa-trash-o"></i></button>
            </div>
          </div>

          <!-- Тело заметки -->
          <div v-if="notice.todos" class="notice__content">
            <ul class="todo-list">
              <li v-for="(todo, index) in notice.todos.slice(0, 3)" :key="todo.id" class="todo-list__item">
                <div class="todo-list__content" :class="{'todo-list__content--done' : todo.isDone }">
                  {{index + 1}}. {{todo.title}}
                </div>
              </li>
              <li v-if="notice.todos.length > 3" class="todo-list__item">
                <div class="todo-list__content">
                  ...
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-else class="nothing">
        Создайте свою первую заметку
      </div>
    </div>
    <AppModalConfirm
      :show="modalDelete.type"
      :msg="modalDelete.msg"
      :msgBtnAction="modalDelete.msgBtnAction"
      @close="modalDeleteClose"
      @action="deleteNotice"
    />
  </div>
  
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      modalDelete: {
        type: null,
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
      this.modalDelete.type = null
    },
    deleteNotice() {
      this.$store.dispatch("removeNotice", this.modalDelete.removeId)
      this.modalDeleteClose()
    },
    confirmDeleteModal(id) {
      this.modalDelete.msg = "Удалить заметку?"
      this.modalDelete.type = "confirm"
      this.modalDelete.removeId = id;
      this.modalDelete.msgBtnAction = "Удалить"
    },
  }
}
</script>