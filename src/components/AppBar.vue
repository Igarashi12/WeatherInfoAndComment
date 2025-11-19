<script setup>
import { computed } from 'vue'
import { useWeatherInfo } from '../stores/weather'
import { useLoginInfo } from '@/stores/login'
import { storeToRefs } from 'pinia'

// stateとgetterを参照
const weatherStore = useWeatherInfo()
const loginStore = useLoginInfo()

const weatherInfo = computed(() => weatherStore.weatherInfo)
const getIcon = computed(() => weatherStore.getIcon)

//検索処理
const searchArea = () => {
  weatherStore.searchArea()
}
</script>
<template>
  <v-app-bar extended>
    <img :src="getIcon" />
    <v-app-bar-title><h2 class="pa-2">気象情報</h2></v-app-bar-title>

    <v-text-field
      class="mr-5"
      clearable
      v-model="weatherInfo.searchName"
      label="都道府県名を入力"
      variant="underlined"
      append-inner-icon="mdi-magnify"
      @click:append-inner="searchArea"
    ></v-text-field>

    <template v-slot:extension>
      <v-spacer></v-spacer>
      <h2>検索結果：{{ weatherInfo.searchInfo.targetArea }}</h2>
      <v-spacer></v-spacer>
    </template>
  </v-app-bar>
</template>
