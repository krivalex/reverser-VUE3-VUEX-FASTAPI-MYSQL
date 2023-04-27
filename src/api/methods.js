import axios from 'axios'

const base_url = 'http://localhost:8000'

const getPlaces = async (response) => {
  try {
    return await axios.get(`${base_url}/places`, response)
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

const checkUser = (login_pack) => {
  try {
    return axios.post(`${base_url}/users/check`, login_pack)
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

const putUserByID = (user) => {
  try {
    return axios.put(`${base_url}/users/${user.id}`, user)
  } catch (error) {
    console.log(error)
  }
}

const getReviewsByID = (id) => {
  try {
    const response = axios.get(`${base_url}/review/${id}`)
    return response
  } catch (error) {
    console.log(error)
  }
}

const putReview = (review) => {
  try {
    return axios.put(`${base_url}/review/${review.id}`, review)
  } catch (error) {
    console.log(error)
  }
}

const deleteReview = (id) => {
  try {
    return axios.delete(`${base_url}/review/${id}`)
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

const uploadImage = async (image_pack) => {
  try {
    const response = await axios.post(`${base_url}/uploadfile/${image_pack.place_id}`, image_pack, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

const getImageByID = async (place_id) => {
  try {
    const response = await axios.get(`${base_url}/getimage/${place_id}`)
    const data = response.data
    return data
  } catch (error) {
    console.log(error)
  }
}

const uploadReviewImageByID = async (review_pack) => {
  try {
    const response = await axios.post(`${base_url}/review/imageupload/${review_pack.review_id}`, review_pack, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

const getImageReviewByID = async (review_id) => {
  try {
    const response = await axios.get(`${base_url}/review/getitem/${review_id}`)
    const data = response.data
    return data
  } catch (error) {
    console.log(error)
  }
}

export {
  getPlaces,
  uploadReviewImageByID,
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
}
