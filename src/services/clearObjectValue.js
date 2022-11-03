export const clearObjectValue = (object) => {
  let c = 0

  const values = Object.values(object)

  for (const val of values) {
    if (
      val === null
      || val === 0
      || val === ''
      || val === false
      || val === undefined
    ) {
      c += 1
    }
  }

  if (c > 0)
    return 0
  return 1
}
