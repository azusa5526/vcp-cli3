<template>
  <div class="carousel slide full" data-interval="4000" data-ride="carousel" id="frontSlideHome">
    <ol class="carousel-indicators">
      <li class="active" data-slide-to="0" data-target="#frontSlideHome"></li>
      <li data-slide-to="1" data-target="#frontSlideHome"></li>
      <li data-slide-to="2" data-target="#frontSlideHome"></li>
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <a
          @click="gotoSingleProduct('-MCF_VwymBeytGPiQ9Ml')"
          class="link-block"
          href="#/front_single_product/-MCF_VwymBeytGPiQ9Ml"
        >
          <div class="rwdimg slide1"></div>
        </a>
      </div>
      <div class="carousel-item">
        <a
          @click="gotoSingleProduct('-M9y6Rpb6D6ntBcwB5XZ')"
          class="link-block"
          href="#/front_single_product/-M9y6Rpb6D6ntBcwB5XZ"
        >
          <div class="rwdimg slide2"></div>
        </a>
      </div>
      <div class="carousel-item">
        <a
          @click="gotoSingleProduct('-MBE7OLMRCOp_Z1Mkj48')"
          class="link-block"
          href="#/front_single_product/-MBE7OLMRCOp_Z1Mkj48"
        >
          <div class="rwdimg slide3"></div>
        </a>
      </div>
    </div>
    <a class="carousel-control-prev" data-slide="prev" href="#frontSlideHome" role="button">
      <span aria-hidden="true" class="carousel-control-prev-icon"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" data-slide="next" href="#frontSlideHome" role="button">
      <span aria-hidden="true" class="carousel-control-next-icon"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    gotoSingleProduct(id) {
      this.$emit('gotoSingleProduct', id);
    }
  }
};
</script>
