<template>
  <div>
    <AppHeader>
      <router-link to="/" class="header__nav-item btn btn-info">
        Назад
      </router-link>
    </AppHeader>

    <div class="content">
      <AppMainTitle>Редактирование заметки</AppMainTitle>
      <!-- Заметка -->

      <div v-if="currNotice" class="edit-notice notice">
        <!-- Шапка заметки -->
        <div class="edit-notice__header notice__header">
          <div class="notice__nav">
            <button 
              @click="getPrevState" 
              class="notice__nav-item btn btn-outline-info"
              :class="{'btn-disabled' : isPrevDisabled}"
              title="Отменить действие">
              <i class="fa fa-arrow-left"></i>
            </button>
            <button 
              @click="getNextState" 
              class="notice__nav-item btn btn-outline-info" 
              :class="{'btn-disabled' : isNextDisabled}"
              title="Повторить действие">
              <i class="fa fa-arrow-right"></i>
            </button>
            <div class="ml-auto"></div>
            <button @click="modalNewToDo" class="notice__nav-item btn btn-outline-info" title="Добавить задачу">
              <i class="fa fa-plus"></i>
            </button>
            <button @click="confirmDeleteModal" class="notice__nav-item btn btn-outline-danger" title="Удалить заметку">
              <i class="fa fa-trash-o"></i>
            </button>
          </div>
        </div>

        <!-- Тело заметки -->
        <div class="notice__content">
          <form @submit.prevent>
            <div class="todo-list__item">
              <div class="todo-list__content edit-notice__title">
                <h2>{{currNotice.title}}</h2>
              </div>
              <div class="todo-list__control">
                <button @click="ModalTitleEdit" class="btn btn-outline-warning" title="редактировать">
                  <i class="fa fa-pencil"></i>
                </button>
              </div>
            </div>
            <div v-if="currNotice.todos" class="edit-notice__todo-list todo-list todo-list--item-border">
              <div v-for="todo in currNotice.todos" :key="todo.id" class="todo-list__item">
                <div class="todo-list__content edit-notice__todo-item" :class="{'todo-list__content--done' : todo.isDone}">
                  {{todo.title}}
                </div>
                <div class="todo-list__control">
                  <button @click="toDoEditModal(todo)" class="btn btn-outline-warning" title="Редактировать">
                    <i class="fa fa-pencil"></i>
                  </button>
                  <button @click="toDoDone(todo.id)" class="btn btn-outline-success" title="Выполнено">
                    <i class="fa fa-check" type="button"></i>
                  </button>
                  <button @click="deleteTodo(todo.id)" class="btn btn-outline-danger" title="Удалить">
                    <i class="fa fa-trash" type="button"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="notice__controls">
              <button @click="confirmCancelEditModal" class="notice__controls-item btn btn-outline-danger" type="button">Отменить</button>
              <button @click="saveNotice" class="notice__controls-item btn btn-success" type="button">Сохранить</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <AppModalConfirm 
      :show="modal.type"
      :msg="modal.msg"
      :msgBtnAction="modal.msgBtnAction"
      @close="modalClose"
      @action="modal.action"
    />

    <AppModalEdit
      :show="modal.type"
      :msg="modal.msg"
      :msgBtnAction="modal.msgBtnAction"
      v-model="modal.text"
      @close="modalClose"
      @action="modal.action"
    />

  </div>
</template>

<script>
const modalDefault = {
  type: null,
  action: "",
  msg: "",
  text: "",
  msgBtnAction: "",
  id: null
}

export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      notice: null,
      navNotice: [
        {
          ico: "fa-arrow-left",
          title: "Отменить действие"
        }
      ],
      modal: {...modalDefault},
    }
  },
  computed: {
    currNotice() {
      if(this.notice) return this.getActiveNotice()
    },
    isPrevDisabled() {
      let flag = true
      if(this.notice[this.getActiveNoticeId() - 1]) flag = false
      return flag
    },
    isNextDisabled() {
      let flag = true
      if(this.notice[this.getActiveNoticeId() + 1]) flag = false
      return flag
    },
  },
  methods: {
    modalClose() {
      this.modal = {...modalDefault}
    },

    //Редактируем Заголовок
    ModalTitleEdit() {
      this.modal.type = "edit"
      this.modal.msgBtnAction = "Редактировать"
      this.modal.text = this.currNotice.title;
      this.modal.action = this.saveTitle;
    },

    saveTitle() {
      let newCurrNotice = this.getTemplateCurrNotice()
      newCurrNotice.title = this.modal.text
      this.notice.push(newCurrNotice)
      this.modalClose()
    },

    //Редактируем пункт списка
    toDoEditModal({ id, title }) {
      this.modal.type = "edit"
      this.modal.msgBtnAction = "Редактировать"
      this.modal.id = id;
      this.modal.text = title;
      this.modal.action = this.saveToDo;
    },

    saveToDo() {
      let newCurrNotice = this.getTemplateCurrNotice()
      for(let i = 0; i < newCurrNotice.todos.length; i++) {
        if(newCurrNotice.todos[i].id == this.modal.id) {
          newCurrNotice.todos[i].title = this.modal.text
          break
        }
      }
      this.notice.push(newCurrNotice)
      this.modalClose()
    },

    //Добавляем новый пункт меню
    modalNewToDo() {
      this.modal.msgBtnAction = "Добавить"
      this.modal.msg = "Добавить новую задачу"
      this.modal.type = "edit"
      this.modal.action = this.addTodo
    },

    addTodo() {
      let newCurrNotice = this.getTemplateCurrNotice()
      if(!newCurrNotice.todos) newCurrNotice.todos = []
      newCurrNotice.todos.push({
        title: this.modal.text,
        id: newCurrNotice.todos.length ? newCurrNotice.todos[newCurrNotice.todos.length - 1].id + 1 : 1,
        isDone: false
      })
      this.modal.text = ""
      
      this.notice.push(newCurrNotice)
      this.modalClose()
    },

    //Удалить пункт списка
    deleteTodo(id) {
      let newCurrNotice = this.getTemplateCurrNotice()
      for(let i = 0; i < newCurrNotice.todos.length; i++) {
        if(newCurrNotice.todos[i].id == id) {
          newCurrNotice.todos.splice(i, 1)
          break
        }
      }
      if(!newCurrNotice.todos.length) newCurrNotice.todos = null
      this.notice.push(newCurrNotice)
    },

    //Пометить пункт списка
    toDoDone(id) {
      let newCurrNotice = this.getTemplateCurrNotice()
      for(let i = 0; i < newCurrNotice.todos.length; i++) {
        if(newCurrNotice.todos[i].id == id) {
          newCurrNotice.todos[i].isDone = !newCurrNotice.todos[i].isDone
          break
        }
      }
      this.notice.push(newCurrNotice)
    },

    //Возврат на главную
    confirmCancelEditModal() {
      this.modal.msg = "Отменить редактирование?"
      this.modal.msgBtnAction = "На главную"
      this.modal.type = "confirm"
      this.modal.action = this.cancelEdit
    },

    cancelEdit() {
      this.$router.push('/')
    },
    
    //Удаление заметки
    deleteNotice() {
      this.$store.dispatch("removeNotice", this.modal.id)
      this.modalClose()
      this.$router.push('/')
    },

    confirmDeleteModal() {
      this.modal.msg = "Удалить заметку?"
      this.modal.msgBtnAction = "Удалить"
      this.modal.action = this.deleteNotice
      this.modal.type = "confirm"
      this.modal.id = this.currNotice.id;
    },

    // Функции для работы с историей. 
    //История работает в рамках текущего посещения страницы
    getTemplateCurrNotice() {
      let newCurrNotice = {}
      let currInd = this.getActiveNoticeId()
      newCurrNotice = {...JSON.parse(JSON.stringify(this.notice[currInd]))}
      this.notice[currInd].isActive = false
      return newCurrNotice
    },

    getActiveNotice() {
      return this.notice.find(item => item.isActive == true)
    },

    getActiveNoticeId() {
      let currInd
      this.notice.find((item, index) => {
        if(item.isActive) currInd = index
      })
      return currInd
    },

    getPrevState() {
      let currInd = this.getActiveNoticeId()
      let currNotice = this.getActiveNotice()
      if(this.notice[currInd - 1]) {
        this.notice[currInd].isActive = false
        this.notice[currInd - 1].isActive = true
      }
    },

    getNextState() {
      let currInd = this.getActiveNoticeId()
      let currNotice = this.getActiveNotice()
      if(this.notice[currInd + 1]) {
        this.notice[currInd].isActive = false
        this.notice[currInd + 1].isActive = true
      }
    },

    // Сохранение заметки
    saveNotice() {
      this.$store.dispatch("editNotice", this.getActiveNotice())
      this.$router.push('/')
    },
  },
  mounted() {
    let data = JSON.parse(JSON.stringify(this.$store.getters.getNotice(this.$route.params.id)))
    this.notice = [{
      isActive: true,
      ...data
    }]
  }
}
</script>
