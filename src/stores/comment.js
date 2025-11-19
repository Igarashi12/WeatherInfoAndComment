import { defineStore } from 'pinia'
import axios from 'axios'
import { useWeatherInfo } from './weather'
import { useLoginInfo } from './login'

export const useCommentInfo = defineStore('test', {
  state: () => ({
    //パラメーター
    param: {
      comment: {
        userId: '',
        comment: '',
        areaCode: '',
      },
    },

    dataList: [],
    url: {
      comment: {
        select:
          'https://m3h-igarashi-comment.nicebeach-1eaeb396.japaneast.azurecontainerapps.io/api/COMMENTAREA',
        insert:
          'https://m3h-igarashi-comment.nicebeach-1eaeb396.japaneast.azurecontainerapps.io/api/CREATECOMMENTAREA',
      },
    },
  }),

  getters: {},
  actions: {
    // APIから情報を取得する処理
    //コメント表示処理
    async commentSetect() {
      try {
        this.param.comment.areaCode = useWeatherInfo().weatherInfo.searchId

        const url = `${this.url.comment.select}?areaCode=${this.param.comment.areaCode}`
        const response = await axios.get(url)
        this.dataList = response.data.List
      } catch (err) {
        console.error('SELECT失敗:', err)
      }
    },
    //コメント登録処理
    async commentInsert() {
      if (useLoginInfo().userStatus.loginFlag === true) {
        this.param.comment.userId = useLoginInfo().userStatus.userId
      }
      try {
        this.param.comment.areaCode = useWeatherInfo().weatherInfo.searchId
        const response = await axios.post(this.url.comment.insert, this.param.comment)
        this.commentSetect()
      } catch (err) {
        console.error('INSERT失敗:', err)
      }
    },
    //画面の表示を削除する処理
    clearDataList() {
      this.dataList = ''
    },
  },
})
