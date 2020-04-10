<template>
  <transition name="modal">
    <div class="modal">
      <div class="modal">
        <div
          class="modal__overlay"
          @click="$emit('close')"
        ></div>
        <div class="modal__dialog">
          <div class="modal__content">
            <slot name="body">default body</slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

  export default {
    data () {
      return {}
    },
    mounted () {
      document.body.addEventListener('keyup', e => {
        if (e.keyCode === 27) {
          this.$emit('close')
        }
      })
    },
    computed: {},
    methods: {}
  }
</script>

<style lang="scss">
  // Animation
  .modal-enter {
    opacity: 0
  }
  .modal-leave-active {
    opacity: 0
  }
  .modal-enter .modal-content,
  .modal-leave-active .modal-content {
    transform: scale(1.2)
  }

  .modal{
    display: block;
    position: fixed;
    z-index: 300;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: opacity .2s ease;
  }
  .modal__overlay{
    position: fixed;
    z-index: 200;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    background: rgba(0,0,0,.7);
    transition: display 0.5s;
  }

  .modal.show{
    display: block;
  }
  .modal__dialog{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 200px;
    width: 100%;
    border-radius: 5px;
    z-index: 300;
    background: #ECEDE9;
    opacity: 1;
    overflow: auto;

    @media(min-width: 500px) {
      width: auto;
      width: 400px;
    }
  }
  .modal__content{
    padding: 15px;
    position: relative;
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    .text {
      margin-bottom: 30px;
    }
    .controls {
      button {
        margin: 0 10px;
      }
    }
  }
  .modal__form {
    .form-group {
      margin-bottom: 10px;

      label {
        display: block;
        margin-bottom: 5px;
      }
      input, textarea {
        width: 100%;
        padding: 10px 5px;
        border-radius: 5px;
        border: 1px solid #CACEC2;
        background: #fff;
      }
      textarea {
        resize: vertical;
      }
    }
  }


</style>
