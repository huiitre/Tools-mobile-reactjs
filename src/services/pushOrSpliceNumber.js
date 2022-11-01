const pushOrSpliceNumber = (array, value) => {
  const val = Number(value)
  if (array.includes(val))
    array.splice(array.indexOf(val), 1)
  else
    array.push(val)

  return array
}

export default pushOrSpliceNumber;
