<template>
  <section :page="$route.name" class="home col-12">
    <Banner/>
    <Partner/>
    <Portocol/>
    <ForestType/>
    <Developer/>
    <Posts/>
  </section>
</template>
<script>
import Partner from '~/components/home/Partner'
import Portocol from "@/components/home/Portocol";
import ForestType from "@/components/home/ForestType";
import Developer from "@/components/home/Developer";
import Posts from "@/components/home/Posts";
import Banner from "@/components/home/Banner";

export default {
  name: "index",
  components: {
    Banner,
    Posts,
    Developer,
    ForestType,
    Portocol,
    Partner
  },
}
</script>

<style lang="scss" scoped >
</style>
