<template>
  <div class="admin-side-bar">
    <sidebar-menu
      :menu="menu"
      :theme="'white-theme'"
      :widthCollapsed="'80px'"
      collapsed
      @toggle-collapse="onToggleCollapse"
      @item-click="onItemClick"
    />
    <Profile :has-side-bar="collapsed"/>
  </div>
</template>

<script>
import {SidebarMenu} from 'vue-sidebar-menu'
import Profile from "@/components/admin/Profile";


export default {
  name: "Sidebar",
  components: {
    Profile,
    SidebarMenu
  },

  data() {
    return {
      collapsed: true,
      menu: [

        {
          href: '#',
          title: 'Dashboard',
          icon: {
            element: 'img',
            attributes: {
              src: require('~/assets/images/admin/tachometer.svg')
            }
            // text: ''
          }
        },
        {
          href: '#',
          title: 'Users',
          icon: {
            element: 'img',
            attributes: {
              src: require('~/assets/images/admin/users.svg')
            }
            // text: ''
          }

        },
        {
          href: '#',
          title: 'Trees',
          icon: {
            element: 'img',
            attributes: {
              src: require('~/assets/images/admin/tree.svg')
            }
            // text: ''
          }

        },
        {
          href: '#',
          title: 'Help',
          icon: {
            element: 'img',
            attributes: {
              src: require('~/assets/images/admin/shield.svg')
            }
          }
        },


      ]
    }
  },
  methods: {
    onToggleCollapse(collapsed) {
      this.collapsed = collapsed
      this.$store.commit('SET_ADMIN_SIDE_BAR',collapsed)
    },
    onItemClick(event, item, node) {
      console.log(event, item, node, 'event, item, node')
    }

  }
}
</script>

<style lang="scss">

.admin-side-bar {


  .v-sidebar-menu {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    z-index: 999;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    text-align: left;
    -webkit-transition: 0.3s max-width ease;
    transition: 0.3s max-width ease
  }

  .v-sidebar-menu * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box
  }

  .v-sidebar-menu .vsm--scroll-wrapper {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden
  }

  .v-sidebar-menu .vsm--dropdown > .vsm--list {
    padding: 5px;
  }

  .v-sidebar-menu .vsm--item {
    position: relative;
    display: block;
    width: 100%;
    padding: 35px 14px;
    white-space: nowrap
  }

  .v-sidebar-menu .vsm--link {
    cursor: pointer;
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    font-size: 16px;
    font-weight: 400;
    padding: 10px;
    line-height: 30px;
    text-decoration: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    z-index: 20;
    -webkit-transition: 0.3s all ease;
    transition: 0.3s all ease;
    .vsm--title{
      color: #424242;
    }


  }

  .v-sidebar-menu .vsm--link_exact-active, .v-sidebar-menu .vsm--link_active {
    font-weight: 600
  }

  .v-sidebar-menu .vsm--link_disabled {
    opacity: 0.4;
    pointer-events: none
  }

  .v-sidebar-menu .vsm--link_level-1 .vsm--icon {
    height: 30px;
    line-height: 30px;
    width: 30px;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    text-align: center;
    border-radius: 3px
  }

  .v-sidebar-menu .vsm--link_mobile-item {
    background-color: transparent !important
  }

  .v-sidebar-menu .vsm--icon {
    display: inline-block;
    margin-right: 10px
  }

  .v-sidebar-menu .vsm--title {
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1
  }

  .v-sidebar-menu .vsm--arrow {
    width: 30px;
    text-align: center;
    font-style: normal;
    font-weight: 900;
    -webkit-transition: 0.3s -webkit-transform ease;
    transition: 0.3s -webkit-transform ease;
    transition: 0.3s transform ease;
    transition: 0.3s transform ease, 0.3s -webkit-transform ease
  }

  .v-sidebar-menu .vsm--arrow:after {
    content: '\f105';
    background-image: url("../../assets/images/for-business/Ellipse-3.png");
  }

  .v-sidebar-menu .vsm--arrow_open {
    -webkit-transform: rotate(90deg);
    transform: rotate(90deg)
  }

  .v-sidebar-menu .vsm--arrow_slot:after {
    display: none
  }

  .v-sidebar-menu .vsm--header {
    font-size: 14px;
    font-weight: 600;
    padding: 10px;
    white-space: nowrap;
    text-transform: uppercase
  }

  .v-sidebar-menu .vsm--badge_default {
    padding: 0px 6px;
    font-size: 12px;
    border-radius: 3px;
    height: 20px;
    line-height: 20px;
    font-weight: 600;
    text-transform: uppercase
  }

  .v-sidebar-menu .vsm--toggle-btn {
    display: block;
    text-align: center;
    font-style: normal;
    font-weight: 900;
    height: 50px;
    cursor: pointer;
    border: none;
    width: 100%
  }

  .v-sidebar-menu .vsm--toggle-btn:after {
    content: '\f337';
  }

  .v-sidebar-menu .vsm--toggle-btn_slot:after {
    display: none
  }

  .v-sidebar-menu.vsm_collapsed .vsm--link_level-1.vsm--link_hover, .v-sidebar-menu.vsm_collapsed .vsm--link_level-1:hover {
    background-color: transparent !important
  }

  .v-sidebar-menu.vsm_rtl {
    right: 0;
    left: inherit;
    text-align: right;
    direction: rtl
  }

  .v-sidebar-menu.vsm_rtl .vsm--icon {
    margin-left: 10px;
    margin-right: 0px
  }

  .v-sidebar-menu.vsm_relative {
    position: relative;
    height: 100%
  }

  .v-sidebar-menu .expand-enter-active, .v-sidebar-menu .expand-leave-active {
    -webkit-transition: height 0.3s ease;
    transition: height 0.3s ease;
    overflow: hidden
  }

  .v-sidebar-menu .expand-enter, .v-sidebar-menu .expand-leave-to {
    height: 0 !important
  }

  .v-sidebar-menu .slide-animation-enter-active {
    -webkit-transition: width 0.3s ease;
    transition: width 0.3s ease
  }

  .v-sidebar-menu .slide-animation-leave-active {
    -webkit-transition: width 0.3s ease;
    transition: width 0.3s ease
  }

  .v-sidebar-menu .slide-animation-enter, .v-sidebar-menu .slide-animation-leave-to {
    width: 0 !important
  }

  .v-sidebar-menu .fade-animation-enter-active {
    -webkit-transition: opacity 0.3s ease, visibility 0.3s ease;
    transition: opacity 0.3s ease, visibility 0.3s ease
  }

  .v-sidebar-menu .fade-animation-leave-active {
    -webkit-transition: opacity 0.3s ease, visibility 0.3s ease;
    transition: opacity 0.3s ease, visibility 0.3s ease
  }

  .v-sidebar-menu .fade-animation-enter, .v-sidebar-menu .fade-animation-leave-to {
    opacity: 0 !important;
    visibility: hidden !important
  }

  .v-sidebar-menu .vsm--mobile-item > .vsm--item {
    padding: 0 !important;
    margin: 0 !important
  }

  .v-sidebar-menu .vsm--mobile-item > .vsm--item > .vsm--link {
    margin: 0 !important
  }

  .v-sidebar-menu {
    background-color: #2a2a2e
  }

  .v-sidebar-menu .vsm--link {
    color: #fff
  }

  .v-sidebar-menu .vsm--link_level-1.vsm--link_exact-active, .v-sidebar-menu .vsm--link_level-1.vsm--link_active {
    -webkit-box-shadow: 3px 0px 0px 0px #67B68C inset;
    box-shadow: 3px 0px 0px 0px #67B68C inset
  }

  .v-sidebar-menu .vsm--link_level-1 .vsm--icon {
    background-color: transparent;
  }

  .v-sidebar-menu .vsm--link_hover, .v-sidebar-menu .vsm--link:hover {
    background-color: transparent;
  }

  .v-sidebar-menu .vsm--link_mobile-item {
    color: #fff
  }

  .v-sidebar-menu .vsm--link_mobile-item.vsm--link_hover, .v-sidebar-menu .vsm--link_mobile-item:hover {
    color: #fff
  }

  .v-sidebar-menu.vsm_collapsed .vsm--link_level-1.vsm--link_hover .vsm--icon, .v-sidebar-menu.vsm_collapsed .vsm--link_level-1:hover .vsm--icon {
    color: #fff;
    background-color: transparent;
  }

  .v-sidebar-menu .vsm--dropdown .vsm--list {
    background-color: transparent
  }

  .v-sidebar-menu .vsm--mobile-bg {
    background-color: #9E9E9E
  }

  .v-sidebar-menu.vsm_expanded .vsm--item_open .vsm--link_level-1 {
    color: #fff;
    background-color: #9E9E9E
  }

  .v-sidebar-menu.vsm_expanded .vsm--item_open .vsm--link_level-1 .vsm--icon {
    background-color: transparent!important;
  }

  .v-sidebar-menu.vsm_rtl .vsm--link_level-1.vsm--link_active, .v-sidebar-menu.vsm_rtl .vsm--link_level-1.vsm--link_exact-active {
    -webkit-box-shadow: -3px 0px 0px 0px #67B68C inset;
    box-shadow: -3px 0px 0px 0px #67B68C inset
  }

  .v-sidebar-menu .vsm--header {
    color: rgba(255, 255, 255, 0.7)
  }

  .v-sidebar-menu .vsm--badge_default {
    color: #fff;
    background-color: #1e1e21
  }

  .v-sidebar-menu .vsm--toggle-btn {
    color: #fff;
    background-color: #1e1e21
  }

  .v-sidebar-menu.vsm_white-theme {
    background-color: #fff
  }

  .v-sidebar-menu.vsm_white-theme .vsm--link {
    color:transparent;
  }

  .v-sidebar-menu.vsm_white-theme .vsm--link_level-1.vsm--link_exact-active, .v-sidebar-menu.vsm_white-theme .vsm--link_level-1.vsm--link_active {
    -webkit-box-shadow: 3px 0px 0px 0px #67B68C inset;
    box-shadow: 3px 0px 0px 0px #67B68C inset;
    color:white;
  }

  .v-sidebar-menu.vsm_white-theme .vsm--link_level-1.vsm--link_exact-active .vsm--icon, .v-sidebar-menu.vsm_white-theme .vsm--link_level-1.vsm--link_active .vsm--icon {
    color: #fff;
    background-color: transparent!important;
  }

  .v-sidebar-menu.vsm_white-theme .vsm--link_level-1 .vsm--icon {
    background-color: transparent!important;
  }

  .v-sidebar-menu.vsm_white-theme .vsm--link_hover, .v-sidebar-menu.vsm_white-theme .vsm--link:hover {
    background-color: rgba(242, 242, 242, 0.5)
  }

  .v-sidebar-menu.vsm_white-theme .vsm--link_mobile-item {
    color: #fff
  }

  .v-sidebar-menu.vsm_white-theme .vsm--link_mobile-item.vsm--link_hover, .v-sidebar-menu.vsm_white-theme .vsm--link_mobile-item:hover {
    color: #fff
  }

  .v-sidebar-menu.vsm_white-theme.vsm_collapsed .vsm--link_level-1.vsm--link_hover .vsm--icon, .v-sidebar-menu.vsm_white-theme.vsm_collapsed .vsm--link_level-1:hover .vsm--icon {
    color: #fff;
    background-color: #67B68C
  }

  .v-sidebar-menu.vsm_white-theme .vsm--dropdown .vsm--list {
    background-color: #e3e3e3
  }

  .v-sidebar-menu.vsm_white-theme .vsm--mobile-bg {
    background-color: #9E9E9E
  }

  .v-sidebar-menu.vsm_white-theme.vsm_expanded .vsm--item_open .vsm--link_level-1 {
    color: #fff;
    background-color: #9E9E9E
  }

  .v-sidebar-menu.vsm_white-theme.vsm_expanded .vsm--item_open .vsm--link_level-1 .vsm--icon {
    background-color:transparent;
  }

  .v-sidebar-menu.vsm_white-theme.vsm_rtl .vsm--link_level-1.vsm--link_active, .v-sidebar-menu.vsm_white-theme.vsm_rtl .vsm--link_level-1.vsm--link_exact-active {
    -webkit-box-shadow: -3px 0px 0px 0px #67B68C inset;
    box-shadow: -3px 0px 0px 0px #67B68C inset
  }

  .v-sidebar-menu.vsm_white-theme .vsm--header {
    color: rgba(38, 38, 38, 0.7)
  }

  .v-sidebar-menu.vsm_white-theme .vsm--badge_default {
    color: #262626;
    background-color: #f2f2f2
  }

  .v-sidebar-menu.vsm_white-theme .vsm--toggle-btn {
    color: #262626;
    background-color: #f2f2f2
  }


  /*# sourceMappingURL=vue-sidebar-menu.css.map*/
  .v-sidebar-menu {
    background: #FFFFFF;
    box-shadow: 4px 4px 44px rgba(0, 0, 0, 0.1);

  }
  .v-sidebar-menu.vsm_expanded {
    padding-top: 145px;
  }

  .v-sidebar-menu.vsm_collapsed {
    padding-top: 118px;

  }
  .admin-side-bar .v-sidebar-menu.vsm_white-theme.vsm_collapsed .vsm--link_level-1.vsm--link_hover .vsm--icon, .admin-side-bar .v-sidebar-menu.vsm_white-theme.vsm_collapsed .vsm--link_level-1:hover .vsm--icon {
    color: #fff;
    background-color: #67B68C;
  }
}

</style>
