const LS_TEST_KEY = 'LS_TEST_KEY'

const isLSAvailable = () => {
  try {
    localStorage.setItem(LS_TEST_KEY, 'A random value 42 51 pastis 69 la trick')
    localStorage.removeItem(LS_TEST_KEY)

    return true
  } catch (error) {
    return false
  }
}

const LS = {
  get: (key) => {
    if (!isLSAvailable()) return false

    const rawValue = localStorage.getItem(key)

    return JSON.parse(rawValue)
  },

  set: (key, value) => {
    if (!isLSAvailable()) return false

    localStorage.setItem(key, JSON.stringify(value))

    return true
  },

  delete: (key) => {
    if (!isLSAvailable()) return false

    localStorage.removeItem(key)

    return true
  },

  clear: () => {
    if (!isLSAvailable()) return false

    return localStorage.clear()
  }
}

export default LS
