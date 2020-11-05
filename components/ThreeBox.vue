<template></template>
<script>
import Box from "3box";
import web3 from "~/plugins/web3"

import {
  profileGraphQL,
  getProfile,
  getProfiles,
  getVerifiedAccounts,
} from "3box";

export default {
  name: "ThreeBox",
  data() {
    return {
      profile: null,
      currentProvider: null,
      config: null
    };
  },
  mounted() {
    this.giveProvider()
    this.give3Box();

    this.getConfig()
    console.log(this.$cookies.get('account'), "this.$cookies.get('account')")
    console.log(web3.currentProvider, "mount web.currentProvider")
    console.log(this.currentProvider, "mount this.currentProvider")
    // this.getProfile()

  },
  methods: {
    async giveProvider() {
      if (process.client) {
        this.currentProvider = await window.web3.currentProvider
        console.log(this.currentProvider, "this.currentProvider")
      }


    },
    async give3Box() {
      this.profile = await Box.openBox(
        this.$cookies.get("account"),
        web3.currentProvider
      );
      await console.log(this.profile, 'hereee');
    },
    async getProfile() {
      const profile = await Box.getProfile(this.$cookies.get('account'))
      console.log(profile)
    },
    async getConfig() {
      this.config = await Box.getConfig(this.$cookies.get('account'))
      console.log(" this.config ", this.config, " this.config ")
    },


  },
};
</script>
<style lang="scss" scoped>
</style>
