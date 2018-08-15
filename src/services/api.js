import Vue from 'vue'
const url = process.env.CHATBOT_URL
export default {
  getIntent (message) {
    return Vue.http.post(url + '/getIntent', {
      message: message
    })
      .then(response => {
        return response.data
      }, response => {
        return response.data.error
      })
  },
  getEntity (message) {
    return Vue.http.post(url + '/getEntity', {
      message: message
    })
      .then(response => {
        return response.data
      }, response => {
        return response.data.error
      })
  },
  getResponse (intent, entity) {
    return Vue.http.post(url + '/getResponse', {
      intent_id: intent,
      entity_id: entity
    })
      .then(response => {
        return response.data
      }, response => {
        return response.status
      })
  }
}
