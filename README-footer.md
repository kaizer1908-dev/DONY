# Footer 카페24 적용 가이드

## 📁 파일 구성
- `footer.html` - Footer HTML 마크업
- `footer.css` - Footer 스타일시트
- `logo.png` - 회사 로고 이미지

## 🚀 카페24 적용 방법

### 1. 로고 이미지 업로드
1. 카페24 관리자 > 디자인관리 > 파일관리
2. `/web/upload/` 폴더에 `logo.png` 업로드

### 2. CSS 파일 적용
1. 카페24 관리자 > 디자인관리 > 스킨관리
2. 현재 사용 중인 스킨 편집
3. `layout.html` 또는 `layout/basic.html` 파일 열기
4. `</head>` 태그 직전에 추가:
```html
<link rel="stylesheet" href="/web/upload/footer.css">
```

또는 `footer.css` 내용을 기존 스킨의 CSS 파일(`style.css` 등)에 복사

### 3. HTML 파일 적용
1. 스킨 편집 화면에서 `layout/footer.html` 파일 열기
2. 기존 footer 내용을 `footer.html` 내용으로 교체

또는

1. `layout.html`에서 footer 영역 찾기
2. 해당 부분을 `footer.html` 내용으로 교체

### 4. 회사 정보 수정
`footer.html` 파일에서 다음 정보를 실제 정보로 수정:
- 회사명: `주식회사 샘플컴퍼니` → 실제 회사명
- 대표자명: `홍길동` → 실제 대표자명
- 사업자등록번호: `123-45-67890` → 실제 번호
- 주소: `서울특별시 강남구 테헤란로 123` → 실제 주소
- 전화번호: `02-1234-5678` → 실제 번호
- 이메일: `info@example.com` → 실제 이메일

### 5. 소셜 링크 수정
`footer.html` 파일에서 SNS 링크 수정:
```html
<a href="https://instagram.com/your_account" target="_blank" class="custom-social-link">
    ...
    <span>Instagram</span>
</a>
<a href="https://pf.kakao.com/your_channel" target="_blank" class="custom-social-link">
    ...
    <span>카카오톡</span>
</a>
```

## ⚙️ 커스터마이징

### 로고 크기 조정
`footer.css` 파일에서:
```css
.custom-footer-logo img {
    height: 60px; /* 원하는 크기로 변경 */
    width: auto;
    max-width: 100%;
}
```

### 색상 변경
- 텍스트 색상: `color: #222;` → 원하는 색상
- 링크 색상: `color: #666;` → 원하는 색상
- 테두리 색상: `border: 1px solid #e0e0e0;` → 원하는 색상

### 레이아웃 간격 조정
```css
.custom-footer-content {
    gap: 80px; /* 섹션 간 간격 */
}
```

## 🔧 주의사항

1. **클래스명 충돌 방지**: 모든 클래스명이 `custom-` 접두사로 시작하여 기존 카페24 스타일과 충돌하지 않습니다.

2. **JavaScript 충돌 방지**: 아코디언 스크립트가 즉시 실행 함수로 래핑되어 있어 다른 스크립트와 충돌하지 않습니다.

3. **반응형**: 모바일, 태블릿, 데스크톱 모두 대응됩니다.

4. **폰트**: Pretendard 폰트가 CDN으로 로드됩니다. 기존 폰트를 사용하려면 CSS 첫 줄의 `@import` 제거.

## 📱 테스트 체크리스트
- [ ] 데스크톱에서 정상 표시
- [ ] 태블릿에서 정상 표시
- [ ] 모바일에서 정상 표시
- [ ] 로고 이미지 정상 로드
- [ ] COMPANY 아코디언 동작
- [ ] 소셜 링크 클릭 가능
- [ ] 전화번호/이메일 링크 동작
- [ ] 호버 효과 정상 작동

## 🆘 문제 해결

### 로고가 안 보여요
- `/web/upload/logo.png` 경로에 이미지가 업로드되었는지 확인
- 이미지 파일명이 정확한지 확인 (대소문자 구분)

### 스타일이 적용 안 돼요
- CSS 파일 경로가 맞는지 확인
- 브라우저 캐시 삭제 후 새로고침 (Ctrl + F5)

### 다른 요소와 겹쳐요
- 기존 footer 코드를 완전히 제거했는지 확인
- CSS 우선순위 문제일 수 있으니 `!important` 추가 고려
