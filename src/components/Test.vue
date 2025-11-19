<script setup>
import { computed } from 'vue'
import { useWeatherInfo } from '../stores/weather'
import { useTestInfo } from '../stores/test'

// stateとgetterを参照
const testStore = useTestInfo()
const dataList = computed(() => testStore.dataList)

const testSelect = () => {
  testStore.testSelect()
}

const testInsert = () => {
  testStore.testInsert()
}

const clearDataList = () => {
  testStore.clearDataList()
}

const rules = {
  required: (value) => !!value || 'Required.',
  counter: (value) => value.length <= 20 || 'Max 20 characters',
}
</script>

<template>
  <div id="app">
    <v-container>
      <v-row class="text-h3 mb-3 mt-3" justify="center"> 接続テスト </v-row>
      <v-btn rounded variant="tonal" class="btn" @click="testSelect"> 表示 </v-btn>
      <v-btn rounded variant="tonal" class="btn" @click="testInsert"> 新規登録 </v-btn>
      <v-btn rounded variant="tonal" class="btn" @click="clearDataList"> クリア </v-btn>
      <v-col cols="6">
        <v-text-field
          clearable
          v-model="testStore.param.userInfo.ID"
          :rules="[rules.required, rules.counter]"
          label="ユーザIDを入力"
          placeholder="ユーザIDを入力…"
          variant="underlined"
        ></v-text-field>
        <v-text-field
          clearable
          v-model="testStore.param.userInfo.Name"
          :rules="[rules.required, rules.counter]"
          label="Nameを入力"
          placeholder="Nameを入力…"
          variant="underlined"
        ></v-text-field>
        <v-row v-for="(data, index) in dataList" :key="index" class="mb-2" justify="center">
          <v-row>
            <v-col>ユーザ: {{ data.ID }}</v-col>
            <v-col> {{ data.Name }}</v-col>
          </v-row>
        </v-row>
      </v-col>
      <v-row class="mb-3 mt-3" justify="center"> </v-row>
    </v-container>
  </div>
</template>
