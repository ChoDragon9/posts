export default () => {
  return Array
    .from({length: Math.max(Math.random() * 10, 5)})
    .map((value, index) => ({
      text: index * Math.random(),
      completed: index * Math.random() > 5
    }))
}
