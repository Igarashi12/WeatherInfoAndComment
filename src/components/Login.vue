<script setup>
import { computed, ref } from 'vue'
import { useWeatherInfo } from '../stores/weather'
import { useLoginInfo } from '@/stores/login'
import { storeToRefs } from 'pinia'

// stateとgetterを参照
const weatherStore = useWeatherInfo()
const loginStore = useLoginInfo()
const { userStatus } = storeToRefs(loginStore)
const { message } = storeToRefs(loginStore)

const login = async () => {
  await loginStore.login()
}

const createUser = () => {
  loginStore.createUser()
}

const rules = {
  required: (value) => !!value || 'Required.',
  counter: (value) => value.length <= 20 || 'Max 20 characters',
}

const show1 = ref(false)
const show2 = ref(false)
</script>

<template>
  <div id="app">
    <v-container>
      <!-- ログイン -->
      <v-col cols="6">
        <v-text-field
          clearable
          v-model="loginStore.param.loginInfo.userId"
          placeholder="ユーザIDを入力…"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="loginStore.param.loginInfo.password"
          :append-inner-icon="show1 ? 'mdi-eye-off' : 'mdi-eye'"
          :type="show1 ? 'text' : 'password'"
          placeholder="パスワードを入力…"
          variant="underlined"
          counter
          @click:append-inner="show1 = !show1"
        ></v-text-field>
      </v-col>
      <v-btn rounded variant="tonal" class="btn" @click="login"> ログイン </v-btn>

      <div>
        <p v-if="userStatus.loginFlag">ようこそ、{{ userStatus.userName }}さん！</p>
        <p v-else>ログインしてください。</p>
      </div>
      <div>
        <p v-if="message.login.flag"></p>
        <p v-else>{{ message.login.text }}</p>
      </div>

      <v-row class="mb-3 mt-3" justify="center"> </v-row>
    </v-container>

    <!-- 新規登録 -->
    <v-container>
      <v-col cols="6">
        <v-text-field
          clearable
          v-model="loginStore.param.createUser.userId"
          placeholder="ユーザIDを入力…"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          clearable
          v-model="loginStore.param.createUser.userName"
          placeholder="ユーザ名を入力…"
          variant="underlined"
        ></v-text-field>

        <v-text-field
          v-model="loginStore.param.createUser.password"
          :append-inner-icon="show2 ? 'mdi-eye-off' : 'mdi-eye'"
          :type="show2 ? 'text' : 'password'"
          placeholder="パスワードを入力…"
          variant="underlined"
          counter
          @click:append-inner="show2 = !show2"
        ></v-text-field>
      </v-col>
      <v-btn rounded variant="tonal" class="mb-3 mt-3" @click="createUser">
        新規登録はこちら
      </v-btn>
      <div>
        <p v-if="message.createUser.flag"></p>
        <p v-else>{{ message.createUser.text }}</p>
      </div>
      <v-row class="mb-3 mt-3" justify="center"> </v-row>
    </v-container>
  </div>
</template>
