<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li :class="{'disabled' : !pagination.has_pre}" class="page-item">
          <a
            @click="changePage(pagination.current_page - 1)"
            aria-label="Previous"
            class="page-link"
            href="#"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          :class="{'active' : pagination.current_page == page}"
          :key="page"
          class="page-item"
          v-for="page in pagination.total_pages"
        >
          <a @click="changePage(page)" class="page-link" href="#">{{page}}</a>
        </li>
        <li :class="{'disabled' : !pagination.has_next}" class="page-item">
          <a
            @click="changePage(pagination.current_page + 1)"
            aria-label="Next"
            class="page-link"
            href="#"
          >
            <span aria-hidden="true">&raquo;</span>
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
    }
  }
};
</script>
