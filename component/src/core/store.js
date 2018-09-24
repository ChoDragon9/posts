export const createStore = () => {
  const store = new Map()
  const subscriber = new Map()

  return {
    set: mutation({store, subscriber}),
    get: getter({store}),
    subscribe: watch({subscriber})
  }
}

const mutation = ({store, subscriber}) => (key, value) => {
  store.set(key, value)
  nodify({subscriber, store, key})
}

const nodify = ({subscriber, key, store}) => {
  if (subscriber.has(key)) {
    for (const listener of subscriber.get(key)) {
      listener(store.get(key))
    }
  }
}

const getter = ({store}) => key => store.get(key)

const watch = ({subscriber}) => (key, listener) => {
  let listeners
  if (subscriber.has(key)) {
    listeners = subscriber.get(key)
  } else {
    listeners = []
  }
  listeners.push(listener)
  subscriber.set(key, listeners)
}
