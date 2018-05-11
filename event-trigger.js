const triggerEvent = (el, type) => {
  const event = document.createEvent('Event')
  event.initEvent(type, true, true)
  el.dispatchEvent(event)
}
triggerEvent(document.getElementById('target'), 'touchstart')
