const createID = () => {
  var date = new Date()
  var components = [date.getDate(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()]

  var id = components.join('')
  return id
}

export { createID }
