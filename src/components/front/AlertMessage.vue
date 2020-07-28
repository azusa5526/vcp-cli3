<template>
  <div class="message-alert">
    <div
      :class="'alert-' + item.status"
      :key="i"
      class="alert alert-dismissible"
      style="border: #181818 1px solid;"
      v-for="(item, i) in messages"
    >
      {{item.message}}
      <button
        @click="removeMessage(i)"
        aria-label="Close"
        class="close"
        type="button"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      messages: []
    };
  },
  methods: {
    updateMessage (message, status) {
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        message,
        status,
        timestamp
      });
      this.removeMessageWithTiming(timestamp);
    },
    removeMessage (num) {
      this.messages.splice(num, 1);
    },
    removeMessageWithTiming (timestamp) {
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1);
          }
        });
      }, 3500);
    }
  },
  created () {
    const vm = this;
    vm.$bus.$on('message:push', (message, status) => {
      vm.updateMessage(message, status);
    });
  }
};
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  bottom: 20px;
  right: 30px;
  z-index: 1100;
}

.alert {
  border-radius: 0;
}
</style>
