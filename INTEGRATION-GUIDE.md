# 카페24 Footer 적용 가이드

## 📋 목차
1. [파일 업로드](#1-파일-업로드)
2. [CSS 적용하기](#2-css-적용하기)
3. [HTML 적용하기](#3-html-적용하기)
4. [소셜 링크 수정하기](#4-소셜-링크-수정하기)
5. [최종 확인](#5-최종-확인)

---

## 1. 파일 업로드

### 로고 이미지 업로드
1. 카페24 관리자 로그인
2. **디자인관리 > 파일관리** 이동
3. `/web/upload/` 폴더로 이동
4. `logo.png` 파일 업로드

### CSS 파일 업로드 (선택사항)
1. **디자인관리 > 파일관리**
2. `/web/upload/` 폴더에 `footer.css` 업로드

---

## 2. CSS 적용하기

### 방법 A: CSS 파일로 링크 (권장)

1. **디자인관리 > 스킨관리 > 현재 스킨 편집**
2. `layout.html` 또는 `layout/basic.html` 파일 열기
3. `</head>` 태그 **직전**에 다음 코드 추가:

```html
<link rel="stylesheet" href="/web/upload/footer.css">
```

### 방법 B: 기존 CSS 파일에 병합

1. `footer.css` 파일의 전체 내용 복사
2. **디자인관리 > 스킨관리 > 현재 스킨 편집**
3. 기존 `style.css` 또는 메인 CSS 파일 열기
4. 파일 **맨 끝**에 붙여넣기
5. 저장

---

## 3. HTML 적용하기

### 3-1. 기존 Footer 찾기

1. **디자인관리 > 스킨관리 > 현재 스킨 편집**
2. `layout/footer.html` 파일 열기 (또는 `layout.html`에서 footer 영역 찾기)
3. 기존 `<footer>` 태그 전체를 찾습니다

### 3-2. Footer HTML 교체

**`footer.html` 파일의 전체 내용**을 복사하여 기존 footer를 **완전히 교체**합니다.

#### 삽입할 코드 전체:

```html
<!-- Footer Section -->
<footer class="custom-footer">
    <div class="custom-footer-inner">
        <div class="custom-footer-content">
            <!-- 좌측: 로고 + 소셜 -->
            <div class="custom-footer-left">
                <div class="custom-footer-logo">
                    <img src="/web/upload/logo.png" alt="AFTER DAWN Logo">
                </div>

                <div class="custom-footer-social">
                    <a href="#" target="_blank" class="custom-social-link custom-social-left">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%23E4405F'%3E%3Cpath d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'/%3E%3C/svg%3E" alt="Instagram">
                        <span class="custom-social-text">
                            <span class="custom-social-label">Instagram</span>
                            <span class="custom-social-brand">@AFTER DAWN</span>
                        </span>
                    </a>
                    <a href="#" target="_blank" class="custom-social-link custom-social-left">
                        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%23FEE500'%3E%3Cpath d='M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3zm5.907 8.06l1.47-1.424a.472.472 0 0 0-.656-.68l-1.913 1.849V9.402a.472.472 0 0 0-.944 0v2.24c0 .261.211.472.472.472h.002l2.314.021a.472.472 0 0 0 .006-.944l-1.789-.016-.962-.954zm-2.616.702a.472.472 0 0 0 .944 0V9.402a.472.472 0 0 0-.944 0v2.36zm-1.981-2.835h-.248v3.309a.472.472 0 0 0 .944 0v-1.163h.248c.676 0 1.225-.549 1.225-1.225v-.922c0-.676-.549-1.225-1.225-1.225h-.944zm.696 1.749a.28.28 0 0 1-.28.28h-.168v-1.308h.168a.28.28 0 0 1 .28.28v.748zm-3.329-1.749h-.944a1.225 1.225 0 0 0-1.225 1.225v.922c0 .676.549 1.225 1.225 1.225h.944c.676 0 1.225-.549 1.225-1.225v-.922c0-.676-.549-1.225-1.225-1.225zm.28 2.147a.28.28 0 0 1-.28.28h-.944a.28.28 0 0 1-.28-.28v-.922a.28.28 0 0 1 .28-.28h.944a.28.28 0 0 1 .28.28v.922z' fill='%23000'/%3E%3C/svg%3E" alt="KakaoTalk">
                        <span class="custom-social-text">
                            <span class="custom-social-label">카카오톡</span>
                            <span class="custom-social-brand">@AFTER DAWN</span>
                        </span>
                    </a>
                </div>
            </div>

            <!-- COMPANY 섹션 (중앙) -->
            <div class="custom-footer-company">
                <h4 class="custom-company-toggle" id="customCompanyToggle">COMPANY</h4>
                <div class="custom-company-panel" id="customCompanyPanel">
                    <div class="custom-company-content">
                        <span>상호: {$company_name}</span>
                        <span>대표자명: {$president_name}</span>
                        <span>{$mall_zipcode} {$mall_addr1} {$mall_addr2}</span>
                        <span><a href="https://www.ftc.go.kr/www/selectBizCommView.do?pageUnit=10&pageIndex=1&searchCnd=BZMNNM&searchKrwd=%EC%A3%BC%EC%8B%9D%ED%9A%8C%EC%82%AC%20%EA%B8%B0%EC%8A%A4&key=253&token=CCAD9860-9D8A-33F0-79AD-3AC853240ACE82CFE95BEDE5F120B522715C8B7B944E&opnSn=2025303010330201181" target="_blank">사업자등록번호 {$company_regno}</a></span>
                        <span>통신판매 {$network_regno}</span>
                    </div>
                </div>
            </div>

            <!-- 우측: 정보 섹션 3칸 -->
            <div class="custom-footer-info">
                <div class="custom-footer-col">
                    <h4>TERMS</h4>
                    <a href="#">Terms of Service</a>
                    <a href="#">Privacy</a>
                    <a href="#">Shop Guide</a>
                </div>

                <div class="custom-footer-col">
                    <h4>CUSTOMER CENTER</h4>
                    <a href="tel:070-8065-3433">070-8065-3433</a>
                    <p>평일 10:00 - 14:00</p>
                    <p>토, 일요일 및 공휴일 휴무</p>
                </div>

                <div class="custom-footer-col">
                    <h4>CONTACT</h4>
                    <a href="mailto:operation@gith.kr">operation@gith.kr</a>
                </div>
            </div>
        </div>
    </div>
</footer>

<script>
// COMPANY 아코디언 토글 기능
(function() {
    const companyToggle = document.getElementById('customCompanyToggle');
    const companyPanel = document.getElementById('customCompanyPanel');

    if (companyToggle && companyPanel) {
        companyToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            companyPanel.classList.toggle('open');
        });
    }
})();
</script>
```

### 3-3. 저장 및 적용

1. 코드 붙여넣기 완료 후 **저장** 클릭
2. 스킨 적용 확인

---

## 4. 소셜 링크 수정하기

### Instagram 링크 변경

12-18번 라인에서 `href="#"` 부분을 실제 Instagram URL로 변경:

```html
<a href="https://instagram.com/your_account" target="_blank" class="custom-social-link custom-social-left">
```

### 카카오톡 채널 링크 변경

19-25번 라인에서 `href="#"` 부분을 실제 카카오톡 채널 URL로 변경:

```html
<a href="https://pf.kakao.com/_your_channel_id" target="_blank" class="custom-social-link custom-social-left">
```

### TERMS 섹션 링크 수정

46-49번 라인에서 각 링크의 `href="#"` 부분을 실제 페이지 URL로 변경:

```html
<a href="/service/agreement.html">Terms of Service</a>
<a href="/service/privacy.html">Privacy</a>
<a href="/service/guide.html">Shop Guide</a>
```

---

## 5. 최종 확인

### 체크리스트

- [ ] 로고 이미지가 정상적으로 표시되는가?
- [ ] COMPANY 아코디언이 클릭 시 열리고 닫히는가?
- [ ] Instagram 링크가 제대로 연결되는가?
- [ ] 카카오톡 링크가 제대로 연결되는가?
- [ ] 전화번호 클릭 시 전화 걸기가 실행되는가?
- [ ] 이메일 클릭 시 메일 앱이 열리는가?
- [ ] 모바일에서 레이아웃이 깨지지 않는가?
- [ ] 태블릿에서 정상 표시되는가?
- [ ] 데스크톱에서 정상 표시되는가?

### 반응형 테스트

브라우저에서 F12 (개발자 도구) → 모바일 화면 모드로 전환하여 다양한 화면 크기에서 테스트하세요.

---

## 🔧 문제 해결

### 로고가 안 보여요
- `/web/upload/logo.png` 경로에 파일이 있는지 확인
- 파일명이 정확한지 확인 (대소문자 구분)
- 브라우저 캐시 삭제 후 새로고침 (Ctrl + Shift + R)

### 스타일이 적용 안 돼요
- CSS 파일이 제대로 업로드되었는지 확인
- `<link>` 태그가 `</head>` 앞에 있는지 확인
- 브라우저 캐시 삭제

### 아코디언이 작동하지 않아요
- JavaScript 코드가 `</footer>` 뒤에 있는지 확인
- 브라우저 콘솔(F12)에서 에러 확인
- 다른 JavaScript와 충돌이 있는지 확인

### 다른 요소와 겹쳐요
- 기존 footer 코드를 완전히 제거했는지 확인
- CSS 우선순위 문제일 경우 `.custom-footer`에 `!important` 추가 고려

---

## 📞 추가 지원

문제가 지속되면:
1. 브라우저 개발자 도구(F12)에서 콘솔 에러 확인
2. 적용된 CSS가 올바르게 로드되었는지 확인
3. HTML 구조가 정확히 복사되었는지 확인
