<template>
 <div class="card-tree-profile position-relative mb-5">
                  <div
                    v-if="tree.owner === $cookies.get('account')"
                    class="position-absolute edit-name-position-absolute"
                  >
                    <button
                      class="btn-green edit-name"
                      @click="editName(tree.id)"
                    >
                      Edit Name
                    </button>
                  </div>
                  <div class="detail-card">
                    <div class="location part">
                      <p class="param mb-0 tr-gray-three">Planted Date</p>
                      <p class="param-18 mb-0 tr-gray-two">
                        {{ tree.birthDate }}
                      </p>
                    </div>
                    <div class="gps part">
                      <p class="param mb-0 tr-gray-three">GPS Coordinates</p>
                      <p class="param-18 mb-0 tr-gray-two">
                        <span class="pr-2">{{
                          parseFloat(tree.latitude).toFixed(4)
                        }}</span
                        >,<span class="pl-2">{{
                          parseFloat(tree.longitude).toFixed(4)
                        }}</span>
                      </p>
                    </div>
                    <div class="species part" v-if="tree.type">
                      <p class="param mb-0 tr-gray-three">Species</p>
                      <p class="param-18 mb-0 tr-gray-two">
                        {{ tree.type.name }}
                      </p>
                    </div>
                    <div class="planter part">
                      <p class="param mb-0 tr-gray-three">Planter</p>
                      <p class="param-18 mb-0 tr-gray-two" v-coin>
                        {{ tree.planter }}
                      </p>
                    </div>
                    <div class="block part">
                      <p class="param mb-0 tr-gray-three">Green Block</p>
                      <p
                        class="param-18 mb-0 tr-gray-two"
                        v-if="tree.greenblock"
                      >
                        {{ tree.greenblock.title }}
                      </p>
                    </div>
                    <div class="climate part">
                      <p class="param mb-0 tr-gray-three">
                        Climate Credits (Seed)
                      </p>
                      <p class="param-18 mb-0 tr-gray-two">{{ 0 }}</p>
                    </div>
                  </div>
                  <div class="map-tree-profile mb-5">
                    <GMap
                      ref="gMap"
                      :cluster="{ options: { styles: clusterStyle } }"
                      :center="{
                        lat: parseInt(tree.latitude),
                        lng: parseInt(tree.longitude),
                      }"
                      :options="{
                        fullscreenControl: true,
                        streetViewControl: false,
                        mapTypeControl: false,
                        zoomControl: true,
                        gestureHandling: 'cooperative',
                        styles: mapStyle,
                      }"
                      :zoom="7"
                      style="
                        width: 100%;
                        height: 400px;
                        margin-top: 35px;
                        overflow: hidden;
                        border-radius: 0px;
                      "
                    >
                      <GMapMarker
                        :position="{
                          lat: parseInt(tree.latitude),
                          lng: parseInt(tree.longitude),
                        }"
                        :options="{ icon: pins.selected }"
                      ></GMapMarker>
                    </GMap>
                  </div>
                </div></template>
<script>
</script>
<style lang="sass" scoped>
</style>