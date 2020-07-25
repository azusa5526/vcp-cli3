<template>
  <div>
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li :class="{'disabled' : !pagination.has_pre}">
          <a
            class="page-link"
            aria-label="Previous"
            @click="changePage(pagination.current_page - 1)"
          >
            <i class="fas fa-angle-left" />
          </a>
        </li>
        <li
          class="page-item"
          v-for="page in pagination.total_pages"
          :key="page"
          :class="{'active' : pagination.current_page === page}"
        >
          <a class="page-link" @click="changePage(page)">{{page}}</a>
        </li>
        <li :class="{'disabled' : !pagination.has_next}">
          <a class="page-link" aria-label="Next" @click="changePage(pagination.current_page + 1)">
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
  data () {
    return {};
  },

  methods: {
    changePage (targetPage) {
      this.$emit('changePage', targetPage);
      this.topFunction();
    },

    topFunction () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }
};
</script>
