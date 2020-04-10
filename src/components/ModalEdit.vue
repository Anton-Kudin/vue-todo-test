<template>
  <ModalWrapper
    v-show="show == 'edit'"
    @close="$emit('close')">
    <div slot=body style="width: 100%">
      <div class="text" v-if="msg">{{msg}}</div>
      <form @submit.prevent class="modal__form">
        <div class="form-group">
          <textarea
            v-bind:value="value"
            v-on:input="$emit('input', $event.target.value)"
            rows="1"
          ></textarea>
        </div>
        <div class="controls">
          <button class="btn btn-outline-info" @click="$emit('close')" type="button">Закрыть</button>
          <button class="btn btn-danger" @click="$emit('action')" type="button">{{msgBtnAction}}</button>
        </div>
      </form>

    </div>
  </ModalWrapper>
</template>

<script>
import ModalWrapper from '@/components/ModalWrapper.vue';

export default {
  props: {
    value: String,
    msg: String,
    msgBtnAction: String,
    show: String
  },
  components: {
    ModalWrapper
  }
}
</script>