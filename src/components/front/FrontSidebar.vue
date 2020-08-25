<template>
  <nav class="nav-wrap">
    <div class="side-title">
      <h6>Filter</h6>
    </div>

    <div class="side-clear">
      <button @click="clearAll" class="btn">Clear Filter</button>
    </div>

    <div class="side-categoryFilter" v-if="categoryFilter === 'all'">
      <button class="btn" @click="updateCategoryFilter('cpu')">CPU</button>
      <button class="btn" @click="updateCategoryFilter('motherboard')">Motherboard</button>
      <button class="btn" @click="updateCategoryFilter('ram')">RAM</button>
      <button class="btn" @click="updateCategoryFilter('graphic_card')">Graphic Card</button>
      <button class="btn" @click="updateCategoryFilter('psu')">PSU</button>
      <button class="btn" @click="updateCategoryFilter('case')">Case</button>
    </div>

    <div id="accordion">
      <div class="card" v-if="categoryFilter === 'cpu'">
        <h5 class="mb-0">
          <button
            aria-controls="collapseCpuBrand"
            aria-expanded="false"
            class="btn btn-link"
            data-target="#collapseCpuBrand"
            data-toggle="collapse"
          >
            <div class="card-header" id="headingOne">CPU Brand</div>
          </button>
        </h5>

        <div
          aria-labelledby="headingOne"
          class="collapse"
          data-parent="#accordion"
          id="collapseCpuBrand"
        >
          <div class="card-body">
            <div>
              <input id="intel" type="checkbox" v-model="productsFilter" value="intel" />
              <label for="intel">Intel</label>
            </div>
            <div>
              <input id="amd" type="checkbox" v-model="productsFilter" value="amd" />
              <label for="amd">AMD</label>
            </div>
          </div>
        </div>
      </div>

      <div class="card" v-if="categoryFilter === 'cpu'">
        <div class="card-header" id="headingTwo">
          <h5 class="mb-0">
            <button
              aria-controls="collapseTwo"
              aria-expanded="false"
              class="btn btn-link collapsed"
              data-target="#collapseTwo"
              data-toggle="collapse"
            >Socket type</button>
          </h5>
        </div>
        <div
          aria-labelledby="headingTwo"
          class="collapse"
          data-parent="#accordion"
          id="collapseTwo"
        >
          <div class="card-body">
            <div>
              <input id="socket-1151" type="checkbox" v-model="productsFilter" value="socket-1151" />
              <label for="socket-1151">Socket-1151</label>
            </div>
            <div>
              <input id="socket-AM4" type="checkbox" v-model="productsFilter" value="socket-AM4" />
              <label for="socket-AM4">Socket-AM4</label>
            </div>
          </div>
        </div>
      </div>

      <div class="card" v-if="categoryFilter === 'motherboard'">
        <h5 class="mb-0">
          <button
            aria-controls="collapseMohterboardBrand"
            aria-expanded="false"
            class="btn btn-link"
            data-target="#collapseMohterboardBrand"
            data-toggle="collapse"
          >
            <div class="card-header">Motherboard Brand</div>
          </button>
        </h5>

        <div class="collapse" data-parent="#accordion" id="collapseMohterboardBrand">
          <div class="card-body">
            <div>
              <input id="asus" type="checkbox" v-model="productsFilter" value="asus" />
              <label for="asus">ASUS</label>
            </div>
            <div>
              <input id="msi" type="checkbox" v-model="productsFilter" value="msi" />
              <label for="msi">MSI</label>
            </div>
            <div>
              <input id="asrock" type="checkbox" v-model="productsFilter" value="asrock" />
              <label for="asrock">AsRock</label>
            </div>
          </div>
        </div>
      </div>

      <div class="card" v-if="categoryFilter === 'motherboard'">
        <h5 class="mb-0">
          <button
            aria-controls="collapseMotherboardSocket"
            aria-expanded="false"
            class="btn btn-link collapsed"
            data-target="#collapseMotherboardSocket"
            data-toggle="collapse"
          >
            <div class="card-header">Motherboard Socket</div>
          </button>
        </h5>

        <div class="collapse" data-parent="#accordion" id="collapseMotherboardSocket">
          <div class="card-body">
            <div>
              <input
                id="motherboardSocket-1151"
                type="checkbox"
                v-model="productsFilter"
                value="mb-1151"
              />
              <label for="motherboardSocket-1151">Socket-1151</label>
            </div>
            <div>
              <input
                id="motherboardSocket-AM4"
                type="checkbox"
                v-model="productsFilter"
                value="mb-am4"
              />
              <label for="motherboardSocket-AM4">Socket-AM4</label>
            </div>
          </div>
        </div>
      </div>

      <div class="card" v-if="categoryFilter === 'ram'">
        <h5 class="mb-0">
          <button
            aria-controls="collapseRamBrand"
            aria-expanded="false"
            class="btn btn-link collapsed"
            data-target="#collapseRamBrand"
            data-toggle="collapse"
          >
            <div class="card-header">RAM Brand</div>
          </button>
        </h5>

        <div class="collapse" data-parent="#accordion" id="collapseRamBrand">
          <div class="card-body">
            <div>
              <input id="crucial-ram" type="checkbox" v-model="productsFilter" value="crucial" />
              <label for="crucial-ram">Crucial</label>
            </div>
            <div>
              <input id="kingston-ram" type="checkbox" v-model="productsFilter" value="kingston" />
              <label for="kingston-ram">Kingston</label>
            </div>
          </div>
        </div>
      </div>

      <div class="card" v-if="categoryFilter === 'ram'">
        <h5 class="mb-0">
          <button
            aria-controls="collapseRamCapacity"
            aria-expanded="false"
            class="btn btn-link collapsed"
            data-target="#collapseRamCapacity"
            data-toggle="collapse"
          >
            <div class="card-header">RAM Capacity</div>
          </button>
        </h5>

        <div class="collapse" data-parent="#accordion" id="collapseRamCapacity">
          <div class="card-body">
            <div>
              <input id="8GB-ram" type="checkbox" v-model="productsFilter" value="8GB" />
              <label for="8GB-ram">8 GB</label>
            </div>
            <div>
              <input id="16GB-ram" type="checkbox" v-model="productsFilter" value="16GB" />
              <label for="16GB-ram">16 GB</label>
            </div>
            <div>
              <input id="32GB-ram" type="checkbox" v-model="productsFilter" value="32GB" />
              <label for="32GB-ram">32 GB</label>
            </div>
          </div>
        </div>
      </div>

      <div class="card" v-if="categoryFilter === 'ram'">
        <h5 class="mb-0">
          <button
            aria-controls="collapseRamFrequency"
            aria-expanded="false"
            class="btn btn-link collapsed"
            data-target="#collapseRamFrequency"
            data-toggle="collapse"
          >
            <div class="card-header">RAM Frequency</div>
          </button>
        </h5>

        <div class="collapse" data-parent="#accordion" id="collapseRamFrequency">
          <div class="card-body">
            <div>
              <input id="1600Hz-ram" type="checkbox" v-model="productsFilter" value="1600Hz" />
              <label for="8GB-ram">1600 Hz</label>
            </div>
            <div>
              <input id="2400Hz-ram" type="checkbox" v-model="productsFilter" value="2400Hz" />
              <label for="16GB-ram">2400 Hz</label>
            </div>
            <div>
              <input id="3600Hz-ram" type="checkbox" v-model="productsFilter" value="3600Hz" />
              <label for="3600Hz-ram">3600 Hz</label>
            </div>
            <div>
              <input id="4000Hz-ram" type="checkbox" v-model="productsFilter" value="4000Hz" />
              <label for="4000Hz-ram">4000 Hz</label>
            </div>
          </div>
        </div>
      </div>

      <div class="card" v-if="categoryFilter === 'graphic_card'">
        <h5 class="mb-0">
          <button
            aria-controls="collapseChipProducer"
            aria-expanded="false"
            class="btn btn-link collapsed"
            data-target="#collapseChipProducer"
            data-toggle="collapse"
          >
            <div class="card-header">Chip Producer</div>
          </button>
        </h5>

        <div class="collapse" data-parent="#accordion" id="collapseChipProducer">
          <div class="card-body">
            <div>
              <input id="amd" type="checkbox" v-model="productsFilter" value="amd" />
              <label for="amd">AMD</label>
            </div>
            <div>
              <input id="nvidia" type="checkbox" v-model="productsFilter" value="nvidia" />
              <label for="nvidia">NVIDIA</label>
            </div>
          </div>
        </div>
      </div>

      <div class="card" v-if="categoryFilter === 'graphic_card'">
        <h5 class="mb-0">
          <button
            aria-controls="collapseGpuBrand"
            aria-expanded="false"
            class="btn btn-link collapsed"
            data-target="#collapseGpuBrand"
            data-toggle="collapse"
          >
            <div class="card-header">GPU Brand</div>
          </button>
        </h5>

        <div class="collapse" data-parent="#accordion" id="collapseGpuBrand">
          <div class="card-body">
            <div>
              <input id="asus" type="checkbox" v-model="productsFilter" value="asus" />
              <label for="asus">ASUS</label>
            </div>
            <div>
              <input id="msi" type="checkbox" v-model="productsFilter" value="msi" />
              <label for="msi">MSI</label>
            </div>
          </div>
        </div>
      </div>

      <div class="card" v-if="categoryFilter === 'graphic_card'">
        <h5 class="mb-0">
          <button
            aria-controls="collapseGpuSeries"
            aria-expanded="false"
            class="btn btn-link collapsed"
            data-target="#collapseGpuSeries"
            data-toggle="collapse"
          >
            <div class="card-header">GPU Series</div>
          </button>
        </h5>

        <div class="collapse" data-parent="#accordion" id="collapseGpuSeries">
          <div class="card-body">
            <div>
              <input id="radeon-VII" type="checkbox" v-model="productsFilter" value="radeon-VII" />
              <label for="radeon-VII">Radeon VII</label>
            </div>
            <div>
              <input
                id="radeon-5000-series"
                type="checkbox"
                v-model="productsFilter"
                value="radeon-5000-series"
              />
              <label for="radeon-5000-series">Radeon 5000</label>
            </div>
          </div>
        </div>
      </div>

      <div class="card" v-if="categoryFilter === 'psu'">
        <h5 class="mb-0">
          <button
            aria-controls="collapse80plus"
            aria-expanded="false"
            class="btn btn-link collapsed"
            data-target="#collapse80plus"
            data-toggle="collapse"
          >
            <div class="card-header">80 Plus Level</div>
          </button>
        </h5>

        <div class="collapse" data-parent="#accordion" id="collapse80plus">
          <div class="card-body">
            <div>
              <input id="bronze" type="checkbox" v-model="productsFilter" value="bronze" />
              <label for="bronze">Bronze</label>
            </div>
            <div>
              <input id="silver" type="checkbox" v-model="productsFilter" value="silver" />
              <label for="silver">Silver</label>
            </div>
            <div>
              <input id="gold" type="checkbox" v-model="productsFilter" value="gold" />
              <label for="gold">Gold</label>
            </div>
            <div>
              <input id="platinum" type="checkbox" v-model="productsFilter" value="platinum" />
              <label for="platinum">Platinum</label>
            </div>
          </div>
        </div>
      </div>

      <div class="card" v-if="categoryFilter === 'psu'">
        <h5 class="mb-0">
          <button
            aria-controls="collapsePsuWatt"
            aria-expanded="false"
            class="btn btn-link collapsed"
            data-target="#collapsePsuWatt"
            data-toggle="collapse"
          >
            <div class="card-header">Output Watt</div>
          </button>
        </h5>

        <div class="collapse" data-parent="#accordion" id="collapsePsuWatt">
          <div class="card-body">
            <div>
              <input id="400-700" type="checkbox" v-model="productsFilter" value="400-700" />
              <label for="400-700">400W - 700W</label>
            </div>
            <div>
              <input id="700-1000" type="checkbox" v-model="productsFilter" value="700-1000" />
              <label for="700-1000">700W - 1000W</label>
            </div>
            <div>
              <input id="1000+" type="checkbox" v-model="productsFilter" value="1000+" />
              <label for="1000+">1000W +</label>
            </div>
          </div>
        </div>
      </div>

      <div class="card" v-if="categoryFilter === 'psu'">
        <h5 class="mb-0">
          <button
            aria-controls="collapseCableConnection"
            aria-expanded="false"
            class="btn btn-link collapsed"
            data-target="#collapseCableConnection"
            data-toggle="collapse"
          >
            <div class="card-header">Cable Connection</div>
          </button>
        </h5>

        <div class="collapse" data-parent="#accordion" id="collapseCableConnection">
          <div class="card-body">
            <div>
              <input id="fixed-cable" type="checkbox" v-model="productsFilter" value="fixed-cable" />
              <label for="fixed-cable">Fixed Cable</label>
            </div>
            <div>
              <input
                id="modular-cable"
                type="checkbox"
                v-model="productsFilter"
                value="modular-cable"
              />
              <label for="modular-cable">Modular Cable</label>
            </div>
          </div>
        </div>
      </div>

      <div class="card" v-if="categoryFilter === 'case'">
        <h5 class="mb-0">
          <button
            aria-controls="collapseCaseSize"
            aria-expanded="false"
            class="btn btn-link collapsed"
            data-target="#collapseCaseSize"
            data-toggle="collapse"
          >
            <div class="card-header">Case Size</div>
          </button>
        </h5>

        <div class="collapse" data-parent="#accordion" id="collapseCaseSize">
          <div class="card-body">
            <div>
              <input id="Atx" type="checkbox" v-model="productsFilter" value="Atx" />
              <label for="Atx">ATX</label>
            </div>
            <div>
              <input id="matx" type="checkbox" v-model="productsFilter" value="matx" />
              <label for="matx">m-ATX</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {};
  },

  watch: {
    categoryFilter: {
      immediate: true,
      handler() {
        this.clearCheckbox();
        this.clearProductsFilter();
      }
    }
  },

  methods: {
    clearCheckbox() {
      const checkbox = document.getElementsByTagName('input');
      for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].checked = false;
      }
    },

    clearProductsFilter() {
      this.$store.dispatch('updateProductsFilter', []);
    },

    clearCategoryFilter() {
      this.$store.dispatch('updateCategoryFilter', 'all');
    },

    clearAll() {
      this.clearCheckbox();
      this.clearProductsFilter();
      this.clearCategoryFilter();
    },

    updateCategoryFilter(filter) {
      this.$store.dispatch('updateCategoryFilter', filter);
    },

    updateProductsFilter(filter) {
      this.$store.dispatch('updateProductsFilter', filter);
    }
  },

  computed: {
    ...mapGetters(['categoryFilter']),
    productsFilter: {
      get() {
        return this.$store.state.productsFilter;
      },
      set(filter) {
        this.$store.commit('PRODUCTSFILTER', filter);
      }
    }
  },

  created() {
    this.$store.dispatch('updateCategoryFilter', 'all');
  }
};
</script>
