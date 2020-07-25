<template>
  <div id="frontSlideHome" class="carousel slide full" data-ride="carousel" data-interval="4000">
    <ol class="carousel-indicators">
      <li data-target="#frontSlideHome" data-slide-to="0" class="active"></li>
      <li data-target="#frontSlideHome" data-slide-to="1"></li>
      <li data-target="#frontSlideHome" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <a
          class="link-block"
          @click="gotoSingleProduct('-MCF_VwymBeytGPiQ9Ml')"
          href="#/front_single_product/-MCF_VwymBeytGPiQ9Ml"
        >
          <div class="rwdimg slide1"></div>
        </a>
      </div>
      <div class="carousel-item">
        <a
          class="link-block"
          @click="gotoSingleProduct('-M9y6Rpb6D6ntBcwB5XZ')"
          href="#/front_single_product/-M9y6Rpb6D6ntBcwB5XZ"
        >
          <div class="rwdimg slide2"></div>
        </a>
      </div>
      <div class="carousel-item">
        <a
          class="link-block"
          @click="gotoSingleProduct('-MBE7OLMRCOp_Z1Mkj48')"
          href="#/front_single_product/-MBE7OLMRCOp_Z1Mkj48"
        >
          <div class="rwdimg slide3"></div>
        </a>
      </div>
    </div>
    <a class="carousel-control-prev" href="#frontSlideHome" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#frontSlideHome" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>
export default {
  data () {
    return {};
  },

  methods: {
    gotoSingleProduct (id) {
      this.$emit('gotoSingleProduct', id);
    }
  }
};
</script>
