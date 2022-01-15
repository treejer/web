<template>
  <div class="col-12">
      <p class="param-xl tr-gray-one font-weight-bolder mt-5">
        Spread the word
      </p>
      <p class="mt-3 param tr-gray-one font-weight-bold">
       Let’s plant some trees together. Each NFT represents a real tree planted by rural communities worldwide. 🛖🌳🛖
       <br>
#PlantersWithoutBorders
<br>
Plant your forest here:
<br>
<a :href="`https://treejer.com/genesis?referrer=${$cookies.get('account')}`" target="_blank"> {{ `https://treejer.com/genesis?referrer=${$cookies.get('account')}` }} </a>

        
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
                  `${text}`
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
import { urlencoded } from 'body-parser';

export default {
  name: "Socials",
  data() {
    return {
      text: "",
      baseUrl: process.env.baseUrl,
      invitelink: process.env.baseUrl
    };
  },
  components: {
    Fab,
  },
  mounted() {
    this.treeId = this.$route.params.id;


    this.invitelink = `${this.baseUrl}/genesis?referrer=${this.$cookies.get('account')}`


    this.text = `
Let’s plant some trees together. Each NFT represents a real tree planted by rural communities worldwide. 🛖🌳🛖
#PlantersWithoutBorders
Plant your forest here:
${this.invitelink}
    `;


  },
  methods: {
    tweet() {
      let encodedText = encodeURIComponent(this.text);
      window.open(`https://twitter.com/intent/tweet?text=${encodedText}&related=TreejerTalks`, '_blank');
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