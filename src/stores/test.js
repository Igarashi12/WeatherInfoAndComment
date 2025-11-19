import { defineStore } from 'pinia'
import axios from 'axios'

export const useTestInfo = defineStore('test', {
  state: () => ({
    param: {
      //test用
      userInfo: {
        ID: '',
        Name: '',
      },
    },

    dataList: [],
    //test用
    sampleDB: {
      select:
        'https://m3h-igarashi-containerapp.nicebeach-1eaeb396.japaneast.azurecontainerapps.io/api/SELECT',
      insert:
        'https://m3h-igarashi-containerapp.nicebeach-1eaeb396.japaneast.azurecontainerapps.io/api/INSERT',
    },
  }),

  getters: {},
  actions: {
    // APIから情報を取得する処理
    //test用
    async testSelect() {
      try {
        // 実際のAPI URLに置き換えてください
        const response = await axios.get(this.sampleDB.select)
        this.dataList = response.data.List
      } catch (err) {
        console.error('SELECT失敗:', err)
      }
    },
    clearSerchInfo() {
      this.dataList = ''
    },
    //test用
    async testInsert() {
      try {
        const response = await axios.post(this.sampleDB.insert, this.param.userInfo)
      } catch (err) {
        console.error('INSERT失敗:', err)
      }
    },
    clearDataList() {
      this.dataList = ''
    },
  },
})
