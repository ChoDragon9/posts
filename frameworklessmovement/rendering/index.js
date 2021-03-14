const state = {
  panel: null,
  start: null,
  frames: 0,
};

const createFrameBox = () => {
  const div = document.createElement('div');
  Object.assign(div.style, {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '50px',
    height: '50px',
    backgroundColor: 'black',
    color: 'white'
  });
  return div
};

const tick = () => {
  const now = window.performance.now();
  state.frames++;

  if(now >= state.start + 1000) {
    state.panel.innerText = state.frames;
    state.frames = 0;
    state.start = now
  }
  window.requestAnimationFrame(tick)
};

const init = () => {
  state.panel = createFrameBox();
  document.body.appendChild(state.panel);
  tick()
};

init();
