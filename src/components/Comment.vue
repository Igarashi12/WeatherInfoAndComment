<script setup>
import { computed } from 'vue'
import { useWeatherInfo } from '../stores/weather'
import { useCommentInfo } from '@/stores/comment'

// stateとgetterを参照
const store = useWeatherInfo()
const commentStore = useCommentInfo()
const dataList = computed(() => commentStore.dataList)

const commentSetect = () => {
  commentStore.commentSetect()
}

const commentInsert = () => {
  commentStore.commentInsert()
}

const clearDataList = () => {
  commentStore.clearDataList()
}

const rules = {
  required: (value) => !!value || 'Required.',
  counter: (value) => value.length <= 20 || 'Max 20 characters',
}
</script>

<template>
  <v-row class="mb-3 mt-3" align="center" justify="center">
    <v-col cols="6">
      <v-textarea
        clearable
        v-model="commentStore.param.comment.comment"
        label="コメントを入力"
        placeholder="コメントを入力…"
        variant="underlined"
      ></v-textarea>
    </v-col>
  </v-row>
  <v-row justify="center">
    <v-btn rounded variant="tonal" class="btn" @click="commentSetect"> コメント表示 </v-btn>
    <v-btn rounded variant="tonal" class="btn" @click="commentInsert"> コメント投稿 </v-btn>
    <v-btn rounded variant="outlined" class="btn" @click="clearDataList"> 表示クリア </v-btn>
  </v-row>
  <v-row v-for="(data, index) in dataList" :key="index" class="mb-2" justify="center">
    <v-row>
      <v-col>ユーザ: {{ data.userName }}</v-col>

      <v-col> {{ data.comment }}</v-col>
    </v-row>
  </v-row>

  <v-row class="mb-3 mt-3" justify="center"> </v-row>
</template>
