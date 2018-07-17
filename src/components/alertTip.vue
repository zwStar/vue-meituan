<template>
  <transition name="bounce" @after-enter='afterEnter'>
    <div id="alert-tip" v-show="showTip">
      <span class="tip-text">{{text}}</span>
    </div>
  </transition>
</template>

<script>
  export default {
    props: ['text', 'showTip'],
    methods: {
      afterEnter() {
        this.$emit('update:showTip', false)
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #alert-tip {
    width: 5.5rem;
    height: 1.5rem;
    position: absolute;
    text-align: center;
    top: 50%;
    left: 50%;
    margin-top: -0.7rem;
    margin-left: -2.3rem;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    .tip-text {
      color: #fff;
      font-size: 0.35rem;
      line-height: 1.5rem;
    }
  }

  .bounce-enter-active {
    animation: bounce-in .5s;
  }

  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
