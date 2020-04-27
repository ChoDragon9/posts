### OnPush 사용
Angular는 무언가가 바뀌면 모든 컴포넌트에 변경감지로직을 실행시킨다. 여기서 무언가는 사용자 이벤트, 타이머, XHR, Promise 들이 해당한다. 
Angular는 빠르지만 더 빠른 기능을 제공할 수 있다. 컴포넌트 정의할 때 `ChangeDetectionStrategy.OnPush`를 사용하면 `Input`의 참조가 바뀔 때만 변경감지를 한다. 
```ts
@Component({
  selector: 'my-select',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

### 참고사이트
- https://github.com/mgechev/angular-performance-checklist
- https://netbasal.com/optimizing-the-performance-of-your-angular-application-f222f1c16354
- https://medium.com/@spp020/44-quick-tips-to-fine-tune-angular-performance-9f5768f5d945