<template>
  <div>
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li :class="{'disabled' : !pagination.has_pre}">
          <a
            @click="changePage(pagination.current_page - 1)"
            aria-label="Previous"
            class="page-link"
          >
            <i class="fas fa-angle-left" />
          </a>
        </li>
        <li
          :class="{'active' : pagination.current_page === page}"
          :key="page"
          class="page-item"
          v-for="page in pagination.total_pages"
        >
          <a @click="changePage(page)" class="page-link">{{page}}</a>
        </li>
        <li :class="{'disabled' : !pagination.has_next}">
          <a @click="changePage(pagination.current_page + 1)" aria-label="Next" class="page-link">
            <i class="fas fa-angle-right" />
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['pagination'],
  data() {
    return {};
  },

  methods: {
    changePage(targetPage) {
      this.$emit('changePage', targetPage);
      this.topFunction();
    },

    topFunction() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }
};
</script>
