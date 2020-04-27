```js
const { fromEvent } = rxjs;
const { map, switchMap, debounceTime, filter, distinctUntilChanged,
  tap, retry, partition, finalize, share } = rxjs.operators;
const { ajax } = rxjs.ajax;
const getElemById = id => document.getElementById(id)

const $layer = getElemById('suggestLayer');
const $loading = getElemById('loading');
const keyup$ = fromEvent(getElemById('search'), 'keyup')
  .pipe(
    debounceTime(300), // 300ms 뒤에 데이터를 전달한다.
    map(event => event.target.value),
    distinctUntilChanged(),  // 특수키가 입력된 경우에는 나오지 않기 위해 중복 데이터 처리
    tap(v => console.log('from keyup$', v)),
    share() // Hot Observable 생성
  );
let [user$, reset$] = keyup$.pipe(
  partition(query => query.trim().length > 0)
)

const showLoading = () => {
  $loading.style.display = 'block';
}
const hideLoading = () => {
  $loading.style.display = 'none';
}

user$ = user$
  .pipe(
    tap(showLoading),
    switchMap(query => ajax.getJSON(`https://api.github.com/search/users?q=${query}`)),
    tap(hideLoading),
    retry(2),
    finalize(hideLoading),
    tap(v => console.log('from user$', v))
  );

user$.subscribe({
  next: v => drawLayer(v.items),
  error: e => {
    console.error(e);
    alert(e.message);
  }
});

const drawLayer = (items) => {
  $layer.innerHTML = items.reduce((acc, user) => {
    const html = `<li class="user">
      <img src="${user.avatar_url}" width="50px" height="50px"/>
      <p><a href="${user.html_url}" target="_blank">${user.login}</a></p>
    </li>`
    return `${acc}${html}`
  }, '');
}

reset$
  .pipe(
    tap(() => $layer.innerHTML = ''),
    tap(v => console.log("from reset$", v))
  )
  .subscribe();

```