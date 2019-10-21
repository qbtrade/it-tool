
export default {
  initPageSettings({ state, commit, dispatch }) {
    dispatch('getExchangeRateList')
    commit('updateProp', { key: 'tradeAccount' })
  }
}
