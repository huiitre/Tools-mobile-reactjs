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

  /* Object.values(object).map((value) => {
    if (
      value === null
      || value === 0
      || value === ''
      || value === false
      || value === undefined
    ) {
      c += 1
    }

    //* si c === 0 c'est qu'on a pas d'erreurs dans le if, donc on retourne 1 pour true, sinon on retourne 0 pour false
    if (c === 0) {
      console.log('%c clearObjectValue.js #19 || return 1', 'background:red;color:#fff;font-weight:bold;', c);
      return 'true'
    }
    console.log('%c clearObjectValue.js #21 || return 0', 'background:red;color:#fff;font-weight:bold;', c);
    return 'false'
  }) */
}
