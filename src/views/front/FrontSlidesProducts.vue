<template>
  <div
    id="frontSlideProducts"
    class="carousel slide full"
    data-ride="carousel"
    data-interval="4000"
  >
    <ol class="carousel-indicators">
      <li data-target="#frontSlideProducts" data-slide-to="0" class="active"></li>
      <li data-target="#frontSlideProducts" data-slide-to="1"></li>
      <li data-target="#frontSlideProducts" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <div class="rwdimg slide1"></div>
      </div>
      <div class="carousel-item">
        <div class="rwdimg slide2"></div>
      </div>
      <div class="carousel-item">
        <div class="rwdimg slide3"></div>
      </div>
    </div>
    <a class="carousel-control-prev" href="#frontSlideProducts" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#frontSlideProducts" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>
export default {
  data () {
    return {};
  }
};
</script>
