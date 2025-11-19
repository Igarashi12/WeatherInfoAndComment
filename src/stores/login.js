import { defineStore } from 'pinia'
import axios from 'axios'

export const useLoginInfo = defineStore('login', {
  state: () => ({
    //パラメーター
    param: {
      loginInfo: {
        userId: '',
        password: '',
      },
      createUser: {
        userId: '',
        userName: '',
        password: '',
      },
    },
    //ログイン中のユーザ情報
    userStatus: {
      userId: '',
      userName: '',
      loginFlag: false,
    },

    dataList: [],
    url: {
      login: {
        selectAll:
          'https://m3h-igarashi-comment.nicebeach-1eaeb396.japaneast.azurecontainerapps.io/api/SELECTALL',
        select:
          'https://m3h-igarashi-comment.nicebeach-1eaeb396.japaneast.azurecontainerapps.io/api/LOGIN',
        insert:
          'https://m3h-igarashi-comment.nicebeach-1eaeb396.japaneast.azurecontainerapps.io/api/CREATEUSER',
      },
    },
    //メッセージ管理
    message: {
      login: {
        text: '',
        flag: true,
      },
      createUser: {
        text: '',
        flag: true,
      },
    },
  }),

  getters: {},
  actions: {
    // APIから情報を取得する処理
    //ログイン
    async login() {
      try {
        const url = `${this.url.login.select}?userId=${this.param.loginInfo.userId}&password=${this.param.loginInfo.password}`
        const response = await axios.get(url)
        this.dataList = response.data.List
        this.userStatus.loginFlag = true
        this.userStatus.userId = this.dataList[0].userId
        this.userStatus.userName = this.dataList[0].userName
        this.message.login.flag = true

        console.log(this.userStatus.userName)
      } catch (err) {
        console.error('SELECT失敗:', err)
        this.userStatus.loginFlag = false
        this.loginMessage = 'ユーザ存在しません'
        this.message.login.text = 'ユーザID、またはPWが間違っています'
        this.message.login.flag = false
      }
    },

    //新規登録
    async createUser() {
      try {
        const response = await axios.post(this.url.login.insert, this.param.createUser)
      } catch (err) {
        console.error('INSERT失敗:', err)
        this.message.createUser.text =
          'ユーザの作成に失敗しました。指定したユーザIDは既に使用されています。'
        this.message.createUser.flag = false
      }
    },
  },
})
