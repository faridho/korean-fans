import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from "firebase/app"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null
    },
    profile: {}
  },
  getters: {
    user(state) {
      return state.user
    },

    profile(state) {
      return state
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value
    },

    SET_USER(state, data) {
      state.user.data = data
    },

    SET_PROFILE(state, data) {
      state.profile = data
    }
  },
  actions: {
    fetchUser({ commit }, user) {
      if (user) {
        const db = firebase.firestore()
        const profile = new Promise(resolve => {
          db.collection("koreanUsers")
            .where("uid", "==", user.uid)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(function (doc) {
                resolve(doc.id);
              });
            });
        });

        profile.then(id => {
          commit("SET_USER", {
            userId: id,
            uid: user.uid,
            displayName: user.displayName,
            photoUrl: user.photoURL
          })
          commit("SET_LOGGED_IN", user !== null)
        });

      } else {
        commit('SET_USER', null)
        commit("SET_LOGGED_IN", user !== null)
      }
    }
  },
  modules: {
  }
})
