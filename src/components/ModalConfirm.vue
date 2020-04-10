<template>
  <ModalWrapper
    v-show="show == 'confirm'"
    @close="$emit('close')">
    <div slot=body>
      <div class="text" v-if="msg">
        {{msg}}
      </div>
      <div class="controls">
        <button class="btn btn-outline-info" @click="$emit('close')">Закрыть</button>
        <button class="btn btn-danger" @click="$emit('action')">{{msgBtnAction}}</button>
      </div>
    </div>
  </ModalWrapper>
</template>

<script>
import ModalWrapper from '@/components/ModalWrapper.vue';

export default {
  props: {
    msg: String,
    msgBtnAction: String,
    show: String
  },
  components: {
    ModalWrapper
  }
}
</script>