<template>
  <div class="position-relative find-tree-button justify-content-center d-flex" :style="`margin-top:${marginTop} `">
    <span><input  class="tr-gray-four param" type="text" v-model="treeID"  placeholder="Enter Tree ID" @keyup.enter="goToTreePage()" /></span>
    <span><img class="pointer-event" @click.prevent="goToTreePage()" :src="searchIcon" alt="search-icon"> </span>
  </div>
</template>

<script>
import treesSearchById from "~/apollo/queries/treesSearchById";

export default {
  name: "FindTreeButton",
  props: {
    marginTop:{
      type:String,
      default: '32px'
    }
  },
  data() {
    return {
      searchIcon:require('~/assets/images/search.svg'),
      treeID:null
    }
  },
  methods:{
   async goToTreePage(){
      this.loading = true;
      let self = this;
      if (self.treeID) {
        
        try {
          let result = await this.$apollo.query({
            query: treesSearchById,
            variables: {
              id: this.$dec2hex(self.treeID),
            },
          });

          if (result) {
            if (result.data.trees.length > 0) {
              self.$router.push(`/tree/${self.treeID}`);
            } else {
              self.$bvToast.toast("Tree Not found!", {
                toaster: "b-toaster-bottom-left",
                solid: true,
                headerClass: "hide",
                variant: "danger",
              });
            }
            this.loading = false;
          }
        } catch (error) {
          this.loading = false;
          this.$bvToast.toast("Server Error!", {
            toaster: "b-toaster-bottom-left",
            solid: true,
            headerClass: "hide",
            variant: "danger",
          });
        }


      } else {
        self.loading = false;
        self.$bvToast.toast("TreeId is empty!", {
          toaster: "b-toaster-bottom-left",
          solid: true,
          headerClass: "hide",
          variant: "danger",
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.find-tree-button {
  input{
    background: #E5E7DB;
    border-radius: 12px;
    width: 176px;
    border: none;
    height: 36px;
    text-align: center;
  }
  img{
    position: absolute;
    left: 35px;
    top: 10px;

  }
}
@media(max-width: 768px){
  .find-tree-button{
    img{
      left: 120px;
    }
  }
}
</style>
