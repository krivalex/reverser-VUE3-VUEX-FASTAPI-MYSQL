const createID = () => {
  var date = new Date()
  var components = [date.getDate(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()]

  var id = components.join('')
  return id
}

const BinaryToImage = (url, callback) => {
  const xhr = new XMLHttpRequest()
  xhr.responseType = 'arraybuffer'

  xhr.onload = function () {
    const imageData = new Uint8Array(xhr.response)
    const blob = new Blob([imageData], { type: 'image/jpeg' })
    const imageUrl = URL.createObjectURL(blob)
    const image = new Image()

    image.onload = function () {
      // Call the provided callback with the created <img> tag
      callback(image)
    }

    image.src = imageUrl
  }

  xhr.onerror = function () {
    console.error('Ошибка загрузки изображения.')
  }

  xhr.open('GET', url, true)
  xhr.send()
}

export { createID, BinaryToImage }
