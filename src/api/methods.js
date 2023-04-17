import axios from 'axios'

const base_url = 'http://localhost:8000'

const getPlaces = (response) => {
  try {
    return axios.get(`${base_url}/places`, response)
  } catch (error) {
    console.log(error)
  }
}

const getPlaceByID = (id) => {
  try {
    return axios.get(`${base_url}/places/${id}`)
  } catch (error) {
    console.log(error)
  }
}

const postPlace = (place) => {
  try {
    return axios.post(`${base_url}/places`, place)
  } catch (error) {
    console.log(error)
  }
}

const getUsers = () => {
  try {
    return axios.get(`${base_url}/users`)
  } catch (error) {
    console.log(error)
  }
}

const getUserByID = (id) => {
  try {
    return axios.get(`${base_url}/users/${id}`)
  } catch (error) {
    console.log(error)
  }
}

const postUser = (user) => {
  try {
    return axios.post(`${base_url}/users`, user)
  } catch (error) {
    console.log(error)
  }
}

const putUser = (user) => {
  try {
    return axios.put(`${base_url}/users/${user.id}`, user)
  } catch (error) {
    console.log(error)
  }
}

const getReviewsByID = (id) => {
  try {
    return axios.get(`${base_url}/reviews/${id}`)
  } catch (error) {
    console.log(error)
  }
}

const putReview = (review) => {
  try {
    return axios.put(`${base_url}/reviews/${review.id}`, review)
  } catch (error) {
    console.log(error)
  }
}

const deleteReview = (id) => {
  try {
    return axios.delete(`${base_url}/reviews/${id}`)
  } catch (error) {
    console.log(error)
  }
}

const postReview = (review) => {
  try {
    return axios.post(`${base_url}/reviews`, review)
  } catch (error) {
    console.log(error)
  }
}

const allTags = (response) => {
  try {
    return axios.get(`${base_url}/tags`, response)
  } catch (error) {
    console.log(error)
  }
}

export { getPlaces, getPlaceByID, postPlace, getUsers, getUserByID, postUser, putUser, getReviewsByID, putReview, deleteReview, postReview, allTags }
