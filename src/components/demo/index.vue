<template>
  <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 sm4>
        </v-flex>
        <v-flex xs12 sm5>
          <h4>Web Demo for Chatbot Application</h4>
        </v-flex>
        <v-flex xs12 sm3 style="text-align: left">
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm4>
        </v-flex>
        <v-flex xs12 sm5>
          <v-text-field  v-model="message" solo label="Type Message"></v-text-field>
        </v-flex>
        <v-flex xs12 sm3 style="text-align: left">
          <v-btn color="primary" @click="getIntent()" :disabled="isLoading">Submit</v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm4>
        </v-flex>
        <v-flex xs12 sm5 v-if="isLoading">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-if="isSecondCase">
        <v-flex xs12 sm4>
        </v-flex>
        <v-flex xs12 sm5>
          <v-text-field  v-model="responseMessage" solo-inverted readonly></v-text-field>
        </v-flex>
        <v-flex xs12 sm3 style="text-align: left">
          <v-btn color="primary" @click="clearMessage()">Reset</v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-if="isThirdCase">
        <v-flex xs12 sm4>
        </v-flex>
        <v-flex xs12 sm5>
          <v-card>
          <v-card-title primary-title>
            <div>
              <div class="headline"><h4>Is one of followings contains your "Intent"?</h4></div>
            </div>
          </v-card-title>
          <v-radio-group v-model="selectedIntent" column style="padding: 10px;">
            <template v-for="intent in intents">
              <v-radio
                :key="intent.id"
                :label="intent.description"
                :value="intent.id"
                color="primary"
                ></v-radio>
            </template>
          </v-radio-group>
          </v-card>
        </v-flex>
        <v-flex xs12 sm3 style="text-align: left">
          <v-btn color="primary" @click="callEntity()">Choose</v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-if="moreEntities">
        <v-flex xs12 sm4>
        </v-flex>
        <v-flex xs12 sm5>
          <v-card>
          <v-card-title primary-title>
            <div>
              <div class="headline"><h4>Is one of followings contains your "Entity"?</h4></div>
            </div>
          </v-card-title>
          <v-radio-group v-model="selectedEntity" column style="padding: 10px;">
            <template v-for="entity in entities">
              <v-radio
                :key="entity.id"
                :label="entity.description"
                :value="entity.id"
                color="primary"
                ></v-radio>
            </template>
          </v-radio-group>
          </v-card>
        </v-flex>
        <v-flex xs12 sm3 style="text-align: left">
          <v-btn color="primary" @click="callResponse()">Choose</v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-if="isFirstCase">
        <v-flex xs12 sm4>
        </v-flex>
        <v-flex xs12 sm5>
          <span><b>Response Message</b></span>
        </v-flex>
      </v-layout>
      <v-layout row wrap v-if="isFirstCase">
        <v-flex xs12 sm4>
        </v-flex>
        <v-flex xs12 sm5>
          <v-text-field  v-model="responseMessage" solo-inverted readonly label="Your product or service"></v-text-field>
        </v-flex>
        <v-flex xs12 sm3 style="text-align: left">
          <v-btn color="primary" @click="clearMessage()">Reset</v-btn>
        </v-flex>
      </v-layout>
  </v-container>
</template>
<script>
import api from '../../services/api'
export default {
  name: 'Demo',
  data () {
    return {
      message: '',
      selectedIntent: '',
      selectedEntity: '',
      moreEntities: false,
      responseMessage: '',
      isLoading: false,
      intentId: null,
      entityId: null,
      intents: [],
      entities: [],
      isFirstCase: false,
      isSecondCase: false,
      isThirdCase: false
    }
  },
  methods: {
    clearMessage () {
      this.isLoading = false
      this.responseMessage = ''
      this.message = ''
      this.isFirstCase = false
      this.isSecondCase = false
      this.isThirdCase = false
      this.moreEntities = false
      this.intents = []
      this.entities = []
    },
    callEntity () {
      this.isLoading = true
      api.getEntity(this.message).then(response => {
        this.entityId = response.id
        if (response.hasOwnProperty('id') && response.hasOwnProperty('message') && response.hasOwnProperty('id_array')) {
          this.isThirdCase = true
          this.isLoading = false
          this.moreEntities = true
          this.entities = response.id_array
        } else {
          this.entityId = response.id
          this.intentId = this.selectedIntent
          api.getResponse(this.intentId, this.entityId).then(response => {
            this.responseMessage = response
            this.isLoading = false
            this.isFirstCase = true
          }, error => {
            this.responseMessage = error
          })
    }
      })
    },
    callResponse () {
      this.isLoading = true
      this.intentId = this.selectedIntent
      this.entityId = this.selectedEntity
      api.getResponse(this.intentId, this.entityId).then(response => {
        this.responseMessage = response
        this.isLoading = false
        this.isFirstCase = true
      }, error => {
        this.responseMessage = error
      })
    },
    getIntent () {
      this.isLoading = true
      api.getIntent(this.message).then(response => {
        if (Object.keys(response).length === 2 && response.hasOwnProperty('id') && response.hasOwnProperty('message')) {
          this.intentId = response.id
          api.getEntity(this.message).then(response => {
            this.entityId = response.id
            if (response.hasOwnProperty('id') && response.hasOwnProperty('message') && response.hasOwnProperty('id_array')) {
              this.isThirdCase = true
              this.isLoading = false
              this.moreEntities = true
              this.entities = response.id_array
            } else {
              api.getResponse(this.intentId, this.entityId).then(response => {
                this.responseMessage = response
                this.isLoading = false
                this.isFirstCase = true
              }, error => {
                this.responseMessage = error
              })
            }
          })
        }
        if (Object.keys(response).length === 1 && response.hasOwnProperty('message')) {
          this.responseMessage = response.message
          this.isSecondCase = true
          this.isLoading = false
        }

        if (response.hasOwnProperty('id') && response.hasOwnProperty('message') && response.hasOwnProperty('id_array')) {
          this.isThirdCase = true
          this.isLoading = false
          this.intents = response.id_array
        }
      })
    }
  }
}
</script>
