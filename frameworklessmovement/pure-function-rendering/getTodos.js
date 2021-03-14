export default () => {
  return Array
    .from({length: 10})
    .map((value, index) => ({
      text: index,
      completed: index > 5
    }))
}
