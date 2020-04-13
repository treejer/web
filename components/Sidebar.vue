<template>
  <section class="sidebar pt-4 col-md-2 d-none d-md-block" v-if="hasSideBar ">
    <ul class="nav flex-column ">
      <li
              class="nav-item"
              v-for="(item, index) in menus"
              :key="index"
              :name="item.name"
      >
        <nuxt-link :to="item.href" @click.native="activeMenu(item, index)"
                   :class="{ 'active': activeIndex === index }"
                   class="nav-link"
          >
            <Fas :i="item.icon"/>
            <p>{{ item.name }}</p>
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
  import Fas from "@/components/font-awsome/Fas.vue";

  export default {
    name: "Sidebar",
    computed: {
      routeName(item) {
        item = this.$route.path
        switch (item) {
          case '/':
            this.hasSideBar = false
            break
          case '/about':
            this.hasSideBar = false
            break
          default:
            this.hasSideBar =true
        }
      },
    },


    components: {Fas},
    data() {
      return {
        activeIndex: 0,
        user: false,
        hasSideBar: true,
        menus: [
          {name: "My Forest", icon: "tree", href: "/myForest"},
          {name: "Updates", icon: "bell", href: "/updates"},
          {name: "Leaderboard", icon: "trophy", href: "/leaderboard"},
          {name: "Help", icon: "life-ring", href: "/Help"}
        ]
      };
    },

    methods: {
      activeMenu(item, index) {
        this.activeIndex = index;
      },
      store(status){
        return this.$store.dispatch('hasDashboard',{
          status
        })
      },
    },
  };
</script>

<style lang="scss" scoped>
section.sidebar {
  a {
    text-decoration: none;
    color: #757575;
  }

  ul li a.active {
    text-align: center;
    border-radius: 10px;
    box-shadow: 0 4px 22px 0 rgba(0, 0, 0, 0.16);
    background-color: #67b68c;

    svg {
      color: white;
    }


    p {
      color: white;
    }
  }
    ul li a {
      text-align: center;
      position: relative;
      align-items: center;
      align-self: center;
      vertical-align: middle;
      width: 80px;
      padding: 15px 0;

    svg {
      font-size: 30px;
      margin-top: 8px;
    }

    p {
      font-size: 10px;
    }
  }
}
</style>
