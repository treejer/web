<template>
  <div class="row gallery justify-content-start">
    <div class="col-12">
      <div class="d-md-flex justify-content-start  tabs"><span
        v-for="(item,index) in tabs "
        :class="activeIndex === index ?  'btn-grays tr-gray-four':''"
        class="pointer-event param tr-gray-three font-weight-bolder "
        @click="activeIndex = index"> {{ item.name }}</span></div>
    </div>
    <div v-if="activeIndex === 0" class="col-12">
      <div class="row">
        <IncCard
          v-for="(item,index) in galleryCard"
          :datafld="item"
          class="col-md-4 col-lg-2 col-6 p-1 pm-2"
        />
      </div>
    </div>
  </div>
</template>

<script>
import IncCard from "./IncCard";

export default {
  name: "Gallery",
  components: {IncCard},
  data() {
    return {
      activeIndex: 0,
      tabs: [
        {name: 'Recent'},
        {name: 'Live Auctions'},
        {name: 'Honarary Trees'},
      ],
      galleryCard: []
    }
  },
  created() {
    if (this.galleryCard.length <= 0) {
      for (let i = 0; i <= 50; i++) {
        this.galleryCard.push({i})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.gallery {
  .tabs {
    margin-top: 100px;


    span {
      padding: 6px 56px;
    }

    .btn-grays {
      background: #E5E7DB;
      border-radius: 19px;

    }
  }
}

@media (max-width: 768px) {
  .gallery {
    .tabs {
      margin-top: 35px;

      span {
        padding: 5px 10px;
      }
    }
  }
}

</style>
