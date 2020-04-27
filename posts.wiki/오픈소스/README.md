- [프레임워크n라이브러리](프레임워크n라이브러리.md)
- [개발환경](개발환경.md)
- [관리도구](관리도구.md)
- [DevOps](DevOps.md)

---

- [오픈소스 선택 이유](오픈소스-선택-이유.md)
- [UI 라이브러리 선택 기준](UI-라이브러리-선택-기준.md)
- [아키텍처 구성요소 체크리스트](아키텍처-구성요소-체크리스트.md)

---

## 유틸리티
### runTypes
- 런타임 타임체크
- https://github.com/pelotom/runtypes

### amCharts
- v4 워터마크 제거: `am4core.options.commercialLicense = true`

### 대용량 CSV 파일을 위한 CSV 파일 머지 도구
- https://www.npmjs.com/package/csv-merger

### 에디터: TinyMCE
- [에디터 TinyMCE 퀵스타트](에디터-TinyMCE-퀵스타트.md)
- [에디터 Quill 퀵스타트](에디터-Quill-퀵스타트.md)
  - [에디터 Quill Advance](에디터-Quill-Advance.md)
  - [에디터 Quill 이미지업로드](에디터-Quill-이미지업로드.md)
- https://editorjs.io

### IDE 세팅
- [.editorconfig](https://editorconfig.org/)
  - IDE의 코드 세팅을 동일하게 가져간다.
  - charset, indent_style, indent_size, end_of_line 등의 옵션이 있다.

### PDF 리더
- https://github.com/mozilla/pdf.js 기반
- https://github.com/ChoDragon9/one-piece/tree/master/pdfjs-sample
- 최적화: 약 40KB 감소
```ts
// AS IS
import pdfjs, {
  PDFDocumentProxy,
  PDFPageProxy,
  PDFPromise,
  ViewportParameters
} from 'pdfjs-dist'

// TO BE
import { getDocument } from 'pdfjs-dist/lib/pdf'
import { PDFDocumentProxy, PDFPromise, PDFPageProxy } from 'pdfjs-dist'
```
- 폰트 미노출 현상
  - 경로 로그: `Warning: Error during font loading: The CMap "baseUrl" parameter must be specified, ensure that the "cMapUrl" and "cMapPacked" API parameters are provided.`
  - 해결 방법: getDocument 옵션에 `cMapUrl`, `cMapPacked` 추가
    - https://github.com/mozilla/pdf.js/blob/master/examples/components/simpleviewer.js
```ts
getDocument({
  url: path,
  cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.2.228/cmaps/',
  cMapPacked: true
}).promise
```     
