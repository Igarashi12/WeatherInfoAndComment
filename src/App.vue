<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SearchView from './components/Search.vue'
import AppBar from './components/AppBar.vue'
</script>

<template>
  <v-app>
    <AppBar />

    <v-main class="weatherType">
      <v-container>
        <!-- <SearchView /> -->
        <RouterLink to="/"><v-btn class="btn">today</v-btn></RouterLink>
        <RouterLink to="/week"><v-btn class="btn">week</v-btn></RouterLink>
        <!-- <RouterLink to="/test"><v-btn class="btn">test</v-btn></RouterLink> -->
        <RouterLink to="/comment"><v-btn class="btn">comment</v-btn></RouterLink>
        <RouterLink to="/login"><v-btn class="btn">log in</v-btn></RouterLink>

        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>
