<template>
  <div>
    <FrontSlideshow @gotoSingleProduct="getProduct" class="mb-3"></FrontSlideshow>

    <div class="mid-banner mb-3">
      <div class="mid-banner-img">
        <div @click="copyCouponCode()" class="mid-banner-content" id="couponBtn">
          <h4>BUILD PC DISCOUNT</h4>
          <p class="m-0">Click to get 10% off Coupon Code</p>
        </div>
      </div>
    </div>

    <div class="mb-3" id="heroProducts">
      <div class="row">
        <div class="col-lg-3 col-md-6 hero-hover">
          <a
            @click="getProduct('-MA13AwgWT1qNex6b85M')"
            class="link-block"
            href="#/front_single_product/-MA13AwgWT1qNex6b85M"
          >
            <div class="card">
              <div class="card-header">
                <h4>RADEON VII 16G</h4>
                <p>First 7nm GPU</p>
              </div>
              <div
                class="card-img"
                style="backgroundImage: url(https://storage.googleapis.com/vue-course-api.appspot.com/andrew%2F1592393648391.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=n7SmEJ2h6TtwsEW7XTbWb4lzBvfsrFqpz37ePzRuzT%2BcrpMn1SMsrsA0tkMk0rnY3oVjX0B0Ed7et38rCBffO9iPiCiOJqjyF1XWDPDdIDfL0B0dYvreMHj28f%2BJ03BCYX%2Ba73jOSoI%2F%2FNVG5QVQdLPnqeU84XLfwkZN9apxrBqhbMm0vBGUAER3LHIFGNFRb6rVZZOfko10ejwCzt0jzwOe%2FLgPVqZJFMsB3%2B58boeGNdNftauAaNJFY1pmdWmqlnD%2FGUE2rqlts1vITBT2yHftbUS5GpPqchJJSpXKzQ6r1YPMZbY45BvPwaMiJd1eX5lTwY%2B%2BBZjTDyNfltM1uw%3D%3D)"
              ></div>
            </div>
          </a>
        </div>

        <div class="col-lg-3 col-md-6 hero-hover">
          <a
            @click="getProduct('-M9y6Rpb6D6ntBcwB5XZ')"
            class="link-block"
            href="#/front_single_product/-M9y6Rpb6D6ntBcwB5XZ"
          >
            <div class="card">
              <div class="card-header">
                <h4>X570 AQUA</h4>
                <p>Full Water Cooling System</p>
              </div>
              <div
                class="card-img"
                style="backgroundImage: url(https://storage.googleapis.com/vue-course-api.appspot.com/andrew%2F1595182588879.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=oyMqf%2BE5lNkdUijecRoB5O6FqVgbqCFCq%2Be8uQ18TmayqochVFF6CAstKdHQ1k9FTnVrK1802TBuVyNxWGQPIokolNIOfX%2FBe54o3ZTYX94%2FEmzQjrWnNXWsOaPSvfxRhi%2F85eGIW%2BcQ6OUok3haCBgfJ6I6%2BiRfbLLb3TKzbE5XaoCMBYtESdViwlmmt1UAfvcBpXrhgoBLc1QgSyLRv2cqwKZbZ%2FhO1bju9J1F8UPbi742ZBp%2BFfSagn0qaLpfZx5WsHx4fy44T4cDdQH1q1JdtWikKpJRW1eH7Ce1ranVk3N5aRgObmoJKZQtqy7SlkXynKrjIraa7thQZfPB8Q%3D%3D)"
              ></div>
            </div>
          </a>
        </div>

        <div class="col-lg-3 col-md-6 hero-hover">
          <a
            @click="getProduct('-MBE7OLMRCOp_Z1Mkj48')"
            class="link-block"
            href="#/front_single_product/-MBE7OLMRCOp_Z1Mkj48"
          >
            <div class="card">
              <div class="card-header">
                <h4>MPG SEKILA 500X</h4>
                <p>Ignite your Battlefield</p>
              </div>
              <div
                class="card-img"
                style="backgroundImage: url(https://storage.googleapis.com/vue-course-api.appspot.com/andrew%2F1593686150068.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=gU6%2FA%2FLD%2FaU6G3uOLthAh%2FpqcqwvUKM%2BhzCQLamFu%2BG7fN47NY38dSqcUHeFxSKuV4aWrU4i8TIYeh%2Bxh3JrV5Cr0PTspQ%2B4CAoUSsEET5FDFO9APerOv7QPOymTP7996Waw%2FqafVgNxUV0LCcrJ3xDVyyggK3cFHo32cHgj5%2FC8DDInxbv7dwhbVjMeS2zyzt4SJXjAP%2FedlZLcfJ0ktKfkD5H2o5KVXqLWzY32clyb%2FciGRPANe9CiMsO3RnagRcY4TUrTlVydlADWVECRmu84HSFf7wFK0hRFEjOuDwIYlbyAQqlKj6mun92k4r0v00FVG7APG4IcRf83aP9gow%3D%3D)"
              ></div>
            </div>
          </a>
        </div>

        <div class="col-lg-3 col-md-6 hero-hover">
          <a
            @click="getProduct('-MBE32QzaHahHEuGg3xQ')"
            class="link-block"
            href="#/front_single_product/-MBE32QzaHahHEuGg3xQ"
          >
            <div class="card">
              <div class="card-header">
                <h4>ROG THOR 1200P</h4>
                <p>Highest class of PSU in the world</p>
              </div>
              <div
                class="card-img"
                style="backgroundImage: url(https://storage.googleapis.com/vue-course-api.appspot.com/andrew%2F1595182678769.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=mW9OTUCdtx%2BujL0tPWm5ecH%2Baea0chMB0IjJ0s9%2FWRJBKTZrzb1Xfv3f44cs7MgBqLsIHFx8uCr5TJLXANylzWIEVzYuRBxQ1Om5Pjr5XYjtTBBc2fnLsPOVg%2FEkbEGx%2B8VhS6FBkocFO6qFHzZRBJfxjI6ST0%2BYdHYfV1pkEKO17MD7RwW83PMcFBDAnBnSsu40eYZv%2BI3ouoxmUWVvbNWXbdgeBJHuMvA7xRFHB7BHEzE9OJUDGVJBoXib3CYB%2BpxH45JxFxTXcvf0Ff%2FJAKqkQls1zBLg2X5H2nG4JlsGeHILXXb4cdGCh7fq2E%2FxN0FX1IZIpK1NxGcr3tl99A%3D%3D)"
              ></div>
            </div>
          </a>
        </div>
      </div>
    </div>

    <div class="home-article mb-3">
      <div class="row py-3">
        <div class="col-12 col-lg-6 article-wrap">
          <div class="card bg-dark text-white">
            <div
              :style="{backgroundImage: 'url(' + require('@/assets/img/pc.jpg') + ')'}"
              class="article-img"
            ></div>
            <div class="card-img-overlay">
              <div class="article-content-wrap">
                <h4 class="card-title">10 Reasons Why You Should Build A PC</h4>
                <p
                  class="card-text"
                >Building a PC is not as difficult as you might think. In fact, if you can follow instructions and operate a screwdriver, you are likely qualified enough to build your own computer.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-6 article-wrap">
          <div class="card bg-dark text-white">
            <div
              :style="{backgroundImage: 'url(' + require('@/assets/img/radeon.jpg') + ')'}"
              class="article-img"
            ></div>
            <div class="card-img-overlay">
              <div class="article-content-wrap">
                <h4 class="card-title">Explore New Powerful "RDNA" Architecture</h4>
                <p
                  class="card-text"
                >The new RDNA architecture is designed for the next generation of efficient high-performance gaming. It’s the DNA that powers your games, the DNA that brings your games to life, the DNA that keeps evolving.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FrontSlideshow from './FrontSlideshow.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    FrontSlideshow
  },

  data() {
    return {};
  },

  methods: {
    getProduct(id) {
      const vm = this;
      const api = `${process.env.VUE_APP_API_PATH}/api/${process.env.VUE_APP_CUSTOM_PATH}/product/${id}`;
      const heroProducts = vm.categoryFilterList();

      localStorage.setItem('cateFilteredList', JSON.stringify(heroProducts));

      vm.$http.get(api).then((response) => {
        if (response.data.success) {
          vm.$router.push(`../front_single_product/${response.data.product.id}`);
        }
      });
    },

    activatedProductFilterList() {
      const vm = this;
      return vm.products.filter(function (item) {
        return item.is_enabled;
      });
    },

    categoryFilterList() {
      const vm = this;
      const tempProducts = vm.activatedProductFilterList();
      tempProducts.reverse();

      return tempProducts.filter(function (item) {
        return item.category.indexOf('hero') !== -1;
      });
    },

    copyCouponCode() {
      const vm = this;
      const couponBtn = document.querySelector('#couponBtn');
      couponBtn.addEventListener('click', () => {
        const input = document.createElement('input');
        document.body.appendChild(input);
        input.setAttribute('value', 'VCP10OFF');
        input.select();
        if (document.execCommand('copy')) {
          document.execCommand('copy');
        }
        document.body.removeChild(input);
      });
      vm.$bus.$emit('message:push', 'Coupon Code Copied', 'secondary');
    }
  },

  computed: {
    ...mapGetters(['allProducts'])
  },

  created() {
    this.$store.dispatch('getAllProducts');
  }
};
</script>
