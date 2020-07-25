import axios from './requester'

const api = (address) => 'https://cost.otsu.fun/api/' + address

// 你的接口 / Your interface
export default {
  getPlayerList (params = {}) {
    return axios.get(api('player_list'), { params })
      .then(response => response.data)
  },
  getCountrys () {
    return axios.get(api('country_list'))
      .then(response => response.data)
  },
  getPlayer (userKey, params = {}) {
    return axios.get(api(`player/${userKey}`), { params })
      .then(response => response.data)
  },
  getBp (userid) {
    return axios.get(api(`get_bp/${userid}`))
      .then(response => response.data)
  }
}
