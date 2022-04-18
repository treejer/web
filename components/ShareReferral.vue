<template>
  <div class="col-12">
    <p class="param-xl tr-gray-one font-weight-bolder mt-5">
      {{ $t("invite.spreadtheword") }}
    </p>
    <p class="mt-3 param tr-gray-one font-weight-bold">
      {{ $t("invite.together") }}
      <br />
     {{ $t("invite.plantersWithoutBorders") }}
      <br />
       {{ $t("invite.plantyourforesthere") }}
     
      <br />
      <a
        :href="`https://treejer.com/genesis?referrer=${$cookies.get(
          'account'
        )}`"
        target="_blank"
      >
        {{ `https://treejer.com/genesis?referrer=${$cookies.get("account")}` }}
      </a>
    </p>

    <button
      class="btn-greens text-white font-weight-bold param mt-4"
      @click="tweet()"
    >
    {{ $t("invite.tweet") }}
      
    </button>

    <button
      class="invite-gray text-white font-weight-bold param mt-4"
      v-clipboard:copy="`${text}`"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError"
    >
      {{ $t("invite.copy") }}
    </button>
  </div>
</template>

<script>
import Fab from "@/components/font-awsome/Fab.vue";

export default {
  name: "Socials",
  data() {
    return {
      text: "",
      baseUrl: process.env.baseUrl,
      invitelink: process.env.baseUrl,
    };
  },
  components: {
    Fab,
  },
  mounted() {
    this.treeId = this.$route.params.id;

    this.invitelink = `${this.baseUrl}/genesis?referrer=${this.$cookies.get(
      "account"
    )}`;

    this.text = `${this.$t('invite.together')}${this.invitelink}
    `;
  },
  methods: {
    tweet() {
      let encodedText = encodeURIComponent(this.text);
      window.open(
        `https://twitter.com/intent/tweet?text=${encodedText}&related=TreejerTalks`,
        "_blank"
      );
    },
    onCopy: function (e) {
      this.$bvToast.toast(`${this.$t('invite.textandinvite')} `, {
        variant: "success",
        title: this.$t('invite.copytoclipboard'),
        toaster: "b-toaster-bottom-left",
      });
    },
    onError: function (e) {
      this.$bvToast.toast(`${this.$t('invite.failedtocopy')}`, {
        variant: "danger",
        title: this.$t('invite.failedtocopy'),
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