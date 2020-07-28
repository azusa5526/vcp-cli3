<template>
  <div
    class="carousel slide full"
    data-interval="4000"
    data-ride="carousel"
    id="frontSlideProducts"
  >
    <ol class="carousel-indicators">
      <li class="active" data-slide-to="0" data-target="#frontSlideProducts"></li>
      <li data-slide-to="1" data-target="#frontSlideProducts"></li>
      <li data-slide-to="2" data-target="#frontSlideProducts"></li>
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
    <a class="carousel-control-prev" data-slide="prev" href="#frontSlideProducts" role="button">
      <span aria-hidden="true" class="carousel-control-prev-icon"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" data-slide="next" href="#frontSlideProducts" role="button">
      <span aria-hidden="true" class="carousel-control-next-icon"></span>
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
