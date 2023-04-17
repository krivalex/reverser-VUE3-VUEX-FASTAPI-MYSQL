const addToLocalStorage = (key, value) => {
  localStorage.setItem(key, value)
}

const getFromLocalStorage = (key) => {
  localStorage.getItem(key)
}

const deleteFromLocalStorage = (key) => {
  localStorage.removeItem(key)
}

export { addToLocalStorage, getFromLocalStorage, deleteFromLocalStorage }
