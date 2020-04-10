<template>
  <div class="">
    <AppHeader>
      <router-link to="/" class="header__nav-item btn btn-info">
        Назад
      </router-link>
    </AppHeader>

    <div class="content">
      <AppMainTitle>Новая заметка</AppMainTitle>
      <!-- Заметка -->
      <div class="new-notice notice">
        <!-- Шапка заметки -->
        <div class="notice__header">
          <div class="notice__nav">
            <div class="ml-auto"></div>
            <button @click="addTodo" class="notice__nav-item btn btn-outline-info" title="Добавить задачу">
              <i class="fa fa-plus"></i>
            </button>
          </div>
        </div>
        <!-- Тело заметки -->
        <div class="notice__content">
          <form @submit.prevent>
            <!-- Заголовок заметки -->
            <div class="input__group " :class="{ 'input__group--error': $v.title.$error }">
              <label for="">Заголовок заметки</label>
              <input type="text" v-model.trim="$v.title.$model">
              <p class="error-text" v-if="!$v.title.required">Поле не должно быть пустым</p>
            </div>
            <!-- Задачи -->
            <div v-if="todos.length" class="new-notice__todo-list todo-list">
              <div v-for="todo in $v.todos.$each.$iter" :key="todo.id" class="new-notice__input-group">
                <div class="input__group" :class="{ 'input__group--error': todo.$error }">
                  <label for="">Текст пункта</label>
                  <textarea rows="1" type="text" v-model.trim="todo.title.$model"></textarea>
                  <div class="error-text" v-if="!todo.title.required">Поле не должно быть пустым</div>
                </div>
                <div class="ico">
                  <button @click="deleteTodo(todo.id)" title="удалить задачу" type="button"><i class="fa fa-times"></i></button>
                </div>
              </div>
            </div>
            <div class="notice__controls">
              <router-link to="/" class="notice__controls-item btn btn-outline-danger">
                Назад
              </router-link>
              <button @click="submit" class="notice__controls-item btn btn-success" type="button" >Сохранить</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required  } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      title: "",
      todos: [],
    }
  },
  validations: {
    title: {
      required,
    },
    todos: {
      $each: {
        title: {
          required,
        }
      }
    }
  },
  methods: {
    setTodoId() {
      let id = 1
      if(this.todos[this.todos.length - 1]) {
        id = this.todos[this.todos.length - 1].id + 1
      }
      return id
    },
    addTodo() {
      this.todos.push({
        title: "",
        id: this.setTodoId(),
        isDone: false
      })
    },
    deleteTodo(ind) {
      this.todos.splice(ind, 1)
    },
    submit() {
      this.$v.$touch()
      if(!this.$v.$invalid) {
        let data = {
          title: this.title,
          todos: this.todos
        }
        this.$store.dispatch("newNotice", data)
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="scss">
  .new-notice{
    max-width: 600px;
    margin: 0 auto;

    &__input-group {
      position: relative;
      .input__group {
        flex-grow: 1;
      }
      .ico {
        position: absolute;
        top: 0;
        right: 0;
        margin-left: 10px;
        button {
          color: #dc3545;
        }
      }
    }
    &-controls {
      display: flex;
      justify-content: flex-end;
    }
  }
</style>