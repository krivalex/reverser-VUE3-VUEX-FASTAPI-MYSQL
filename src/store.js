import { createStore } from 'vuex'
import * as api from '@/api/methods'

const store = createStore({
  state: {
    place_page_images: null,
    place_page_info: null,
    review_item_images: null,
    review_item_info: null,
    added_reviews: null,
    added_review_images: null,
    user_info_reviews: [],
    user_info: null,
    avatar: null,
    all_tags: null,
    all_places: null,
    user_id: Number(localStorage.getItem('user_id')) ? Number(localStorage.getItem('user_id')) : null,
    manager_id: null,
    review_likes: null,
    review_dislikes: null,
  },
  mutations: {
    setPlaceImages(state, path) {
      api.getImageByID(path).then((response) => {
        state.place_page_images = response
      })
    },
    setPlaceInfo(state, path) {
      api.getPlaceByID(path).then((response) => {
        state.place_page_info = response.data
      })
    },
    setReviewItemInfo(state, path) {
      api.getReviewsByID(path).then((response) => {
        state.review_item_info = response.data
      })
    },
    addReview(state, review_data) {
      api.postReview(review_data).then((response) => {
        state.added_reviews = response.data
      })
    },
    addReviewImage(state, review_pack) {
      api.uploadReviewImageByID(review_pack).then((response) => {
        state.added_review_images = response.data
      })
    },
    setAvatar(state, user_id) {
      api.getAvatarByID(user_id).then((response) => {
        state.avatar = response
      })
    },
    addAvatar(state, avatar_pack) {
      api.uploadAvatarByID(avatar_pack).then((response) => {
        state.avatar = response.data
      })
    },
    setUserInfo(state, user_id) {
      api.getUserByID(user_id).then((response) => {
        state.user_info = response.data
      })
    },
    setAllTags(state) {
      api.allTags().then((response) => {
        state.all_tags = response.data
      })
    },
    setAllPlaces(state) {
      api.getPlaces().then((response) => {
        state.all_places = response.data
      })
    },
    setUserReviews(state, user_id) {
      api.getReviewsByUserID(user_id).then((response) => {
        state.user_info_reviews = response
      })
    },
    setReviewLikes(state, data) {
      api.postReviewLike(data.review_id, data.user_id).then((response) => {
        state.review_likes = response.data
      })
    },
    setReviewDislikes(state, data) {
      api.postReviewDislike(data.review_id, data.user_id).then((response) => {
        state.review_dislikes = response.data
      })
    },
  },
  actions: {
    fetchPlaceImages({ commit }, images) {
      commit('setPlaceImages', images)
    },
    fetchPlaceInfo({ commit }, info) {
      commit('setPlaceInfo', info)
    },
    fetchReviewItemInfo({ commit }, info) {
      commit('setReviewItemInfo', info)
    },
    addReview({ commit }, review) {
      commit('addReview', review)
    },
    addReviewImage({ commit }, review_pack) {
      commit('addReviewImage', review_pack)
    },
    fetchAvatar({ commit }, user_id) {
      commit('setAvatar', user_id)
    },
    addAvatar({ commit }, avatar_pack) {
      commit('addAvatar', avatar_pack)
    },
    fetchUserInfo({ commit }, user_id) {
      commit('setUserInfo', user_id)
    },
    fetchAllTags({ commit }) {
      commit('setAllTags')
    },
    fetchAllPlaces({ commit }) {
      commit('setAllPlaces')
    },
    fetchUserReviews({ commit }, user_id) {
      commit('setUserReviews', user_id)
    },
    fetchUserId({ commit }, user_id) {
      commit('setUserId', user_id)
    },
    fetchLikes({ commit }, data) {
      commit('setReviewLikes', data)
    },
    fetchDislikes({ commit }, data) {
      commit('setReviewDislikes', data)
    },
    setUserId(state) {
      state.user_id = Number(localStorage.getItem('user_id'))
    },
  },
  getters: {
    getUserInfoReviews: (state) => {
      return state.user_info_reviews
    },
    getUserId: (state) => {
      return state.user_id
    },
    getReviewItemInfo: (state) => {
      return state.review_item_info
    },
    getUserInfo: (state) => {
      return state.user_info
    },
  },
})

export default store
