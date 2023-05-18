import { createStore } from 'vuex'
import {
  getPlaces,
  getReviewsByUserID,
  getReviewsCountByUserID,
  uploadReviewImageByID,
  getAvatarByID,
  uploadAvatarByID,
  addToFavorite,
  getImageReviewByID,
  getImageByID,
  getPlaceByID,
  postPlace,
  getUsers,
  getUserByID,
  postUser,
  putUserByID,
  getReviewsByID,
  putReview,
  deleteReview,
  postReview,
  allTags,
  uploadImage,
  checkUser,
} from '@/api/methods'
import { useRoute } from 'vue-router'

const store = createStore({
  state: {
    place_page_images: null,
    place_page_info: null,
    review_item_images: null,
    review_item_info: null,
    added_reviews: null,
    added_review_images: null,
    user_info_reviews: [],
    avatar: null,
    all_tags: null,
    all_places: null,
  },
  mutations: {
    setPlaceImages(state, path) {
      getImageByID(path).then((response) => {
        state.place_page_images = response
      })
    },
    setPlaceInfo(state, path) {
      getPlaceByID(path).then((response) => {
        state.place_page_info = response.data
      })
    },
    setReviewItemImages(state, path) {
      getImageReviewByID(path).then((response) => {
        state.review_item_images = response
      })
    },
    setReviewItemInfo(state, path) {
      getReviewsByID(path).then((response) => {
        state.review_item_info = response.data
      })
    },
    addReview(state, review_data) {
      postReview(review_data).then((response) => {
        state.added_reviews = response.data
      })
    },
    addReviewImage(state, review_pack) {
      uploadReviewImageByID(review_pack).then((response) => {
        state.added_review_images = response.data
      })
    },
    setAvatar(state, user_id) {
      getAvatarByID(user_id).then((response) => {
        state.avatar = response.data
      })
    },
    setUserInfo(state, user_id) {
      state.user_info_reviews = []
      getUserByID(user_id).then((response) => {
        state.user_info_reviews.push(response.data)
      })
    },
    setAllTags(state) {
      allTags().then((response) => {
        state.all_tags = response.data
      })
    },
    setAllPlaces(state) {
      getPlaces().then((response) => {
        state.all_places = response.data
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
    fetchReviewItemImages({ commit }, images) {
      commit('setReviewItemImages', images)
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
    fetchUserInfo({ commit }, user_id) {
      commit('setUserInfo', user_id)
    },
    fetchAllTags({ commit }) {
      commit('setAllTags')
    },
    fetchAllPlaces({ commit }) {
      commit('setAllPlaces')
    },
  },
  getters: {
    getUserInfoReviews: (state) => {
      return state.user_info_reviews
    },
  },
})

export default store
