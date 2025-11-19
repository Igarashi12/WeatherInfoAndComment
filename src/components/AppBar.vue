<script setup>
import { computed } from 'vue'
import { useWeatherInfo } from '../stores/weather'
import { useLoginInfo } from '@/stores/login'
import { storeToRefs } from 'pinia'

// stateとgetterを参照
const weatherStore = useWeatherInfo()
const loginStore = useLoginInfo()
const { loginFlag } = storeToRefs(loginStore)

const weatherInfo = computed(() => weatherStore.weatherInfo)
const getIcon = computed(() => weatherStore.getIcon)

//検索処理
const searchArea = () => {
  weatherStore.searchArea()
}

// 画面情報削除処理
const clearSerchInfo = () => {
  weatherStore.clearSerchInfo()
}

const rules = {
  required: (value) => !!value || 'Required.',
  counter: (value) => value.length <= 20 || 'Max 20 characters',
}
</script>
<template>
  <v-app-bar class="mb-10" extended>
    <img :src="getIcon" />
    <v-app-bar-title><h2>気象情報</h2></v-app-bar-title>

    <v-text-field
      clearable
      v-model="weatherInfo.searchName"
      :rules="[rules.required, rules.counter]"
      label="都道府県名を入力"
      placeholder="都道府県名を入力…"
      variant="underlined"
      append-inner-icon="mdi-magnify"
      @click:append-inner="searchArea"
    ></v-text-field>

    <template v-slot:extension>
      <v-spacer></v-spacer>
      <h2>検索結果：{{ weatherInfo.searchInfo.targetArea }}</h2>
      <v-spacer></v-spacer>
      <!-- <div>
        <p v-if="loginFlag">ようこそ、ユーザーさん！</p>
        <p v-else>ログインしてください。</p>
      </div> -->
    </template>
  </v-app-bar>
</template>
