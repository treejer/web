<template>
  <div class="row gallery justify-content-start">
    <div class="col-12">
      <div class="d-md-flex justify-content-start tabs">
        <span
          v-for="(item, index) in tabs"
          :key="index"
          :class="activeIndex === index ? 'btn-grays tr-gray-four' : ''"
          class="pointer-event param tr-gray-three font-weight-bolder"
          @click="activeIndex = index"
        >
          {{ item.name }}
        </span>
      </div>
    </div>
    <div class="col-12">
      <div class="row" v-if="trees.length>0">
        <TreeCard
          v-for="tree in trees"
          :key="tree.id"
          :tree="tree"
          class="col-md-4 col-lg-2 col-6 p-1 pm-2"
        />
      </div>
      
    </div>
  </div>
</template>

<script>
import TreeCard from "./TreeCard";
import treesBySoldTypeQuery from "~/apollo/queries/treesBySoldType";

export default {
  name: "Gallery",
  components: { TreeCard },
  data() {
    return {
      activeIndex: 0,
      tabs: [
        { name: "Recent" },
        { name: "Auctions" },
        { name: "Honarary" },
      ],
      trees: [],
    };
  },
  created() {
    this.treesBySoldType(2);
  },
  methods: {
    async treesBySoldType(soldType = 2) {
      let self = this;
      let result = await this.$apollo.query({
        query: treesBySoldTypeQuery,
        variables: {
          first: 36,
          skip: 0,
          soldType: soldType,
          orderBy: "updatedAt",
          orderDirection: "desc",
        },
      });

      if (result) {
        console.log(result.data.trees);
        if (result.data.trees.length > 0) {
          self.trees = result.data.trees;
        } else {
          self.trees = [];
        }
      }
    },
  },
  watch: {
    async activeIndex(newIndex, oldIndex) {
      if(newIndex == 0) {
        this.treesBySoldType(2);
      }

      if(newIndex == 1) {
        this.treesBySoldType(1);
      }

      if(newIndex == 2) {
        this.treesBySoldType(5);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.gallery {
  .tabs {
    margin-top: 100px;

    span {
      padding: 6px 56px;
    }

    .btn-grays {
      background: #e5e7db;
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
