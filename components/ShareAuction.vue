<template>
  <div class="col-12">
      <p class="param-xl tr-gray-one font-weight-bolder mt-5">
        Spread the word
      </p>
      <p class="mt-3 param tr-gray-one font-weight-bold">
       {{ text }}
        <a :href="`${baseUrl}/tree/${treeId}`" target="_blank"> {{ `${baseUrl}/tree/${treeId}` }} </a>
      </p>

      <button
        class="btn-greens text-white font-weight-bold param mt-4"
        @click="tweet()"
      >
        Tweet
      </button>

      <button
        class="invite-gray text-white font-weight-bold param mt-4"
        v-clipboard:copy="
          `${text} ${baseUrl}/tree/${treeId}`
        "
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
      >
        Copy
      </button>
    </div>
</template>

<script>
import Fab from "@/components/font-awsome/Fab.vue";

export default {
  name: "Socials",
  data() {
    return {
      treeId: 1,
      baseUrl: process.env.baseUrl,
      text: "I just planted a NFT tree via @TreejerTalk! Rural communities will take care of my tree. 🛖🌳🛖 Check it out here:"
    };
  },
  components: {
    Fab,
  },
  mounted() {
    this.treeId = this.$route.params.id;
  },
  methods: {
    tweet() {
      window.open(`https://twitter.com/intent/tweet?url=${this.baseUrl}/tree/${this.treeId}&text=${this.text}&related=TreejerTalks`, '_blank');
    },
    onCopy: function (e) {
      this.$bvToast.toast(`Text and invite link has been on your clipboard `, {
        variant: "success",
        title: "Copy to clipboard!",
        toaster: "b-toaster-bottom-left",
      });
    },
    onError: function (e) {
      this.$bvToast.toast(`Failed to copy! `, {
        variant: "danger",
        title: "Failed to copy",
        toaster: "b-toaster-bottom-left",
      });
    },
  },
};
</script>
<style lang="scss">
.invite-gray {
  background: #757575;
  color: #ffffff;
  padding: 15px 25px;
  border-radius: 7px;
  box-shadow: 0 4px 22px rgba(0, 0, 0, 0.161);
  border: none;
}

.btn-greens {
  background: #67b68c;
  color: #ffffff;
  padding: 15px 32px;
  border-radius: 7px;
  box-shadow: 0 4px 22px rgba(0, 0, 0, 0.161);
  border: none;
}
</style>