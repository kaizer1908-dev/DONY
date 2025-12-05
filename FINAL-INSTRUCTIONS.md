# 최종 해결 방법

review.html 파일에 문제가 많아서 정렬이 작동하지 않습니다.

## 문제점:
1. ✅ `data-*` 속성은 추가됨
2. ❌ 베스트 리뷰/일반 리뷰에 중복/불필요한 `<li>` 블록 존재
3. ❌ 추천수 데이터가 Cafe24에서 비어있음

## 해결 방법:

### 1단계: Cafe24 관리자 설정 확인
**가장 중요!** Cafe24 관리자 패널에서:
1. 쇼핑몰 관리 > 게시판 관리 > 해당 리뷰 게시판 선택
2. **"추천/비추천 사용"** 옵션을 **"사용함"**으로 설정
3. 저장

이 설정이 없으면 `{$vote_count}`는 항상 빈 값입니다!

### 2단계: HTML 구조 확인

**베스트 리뷰 섹션 (module="board_fixed_4")**
- `<li>` 블록이 **1개만** 있어야 함
- 현재 여러 개 있다면 첫 번째만 남기고 삭제

**일반 리뷰 섹션 (module="board_list_4")**
- `<li>` 블록이 **1개만** 있어야 함
- `data-date="{$write_date}" data-hit="{$hit_count}" data-vote="{$vote_count}"` 속성 확인

### 3단계: 올바른 구조 확인

일반 리뷰 섹션이 이렇게 되어있어야 합니다:

```html
<div class="normal-review">
    <div class="review-headline">
        <h3>REVIEW</h3>
        <div class="review-sort-tabs">
            <button class="sort-tab active" data-sort="recent">등록일순</button>
            <button class="sort-tab" data-sort="views">조회수순</button>
            <button class="sort-tab" data-sort="recommend">추천수순</button>
        </div>
    </div>

    <ul class="review-list grid5" module="board_list_4">
        <!--
            $product_name_cut = 30
            $login_page_url = /member/login.html
            $deny_access_url = /index.html
        -->
        <li data-date="{$write_date}" data-hit="{$hit_count}" data-vote="{$vote_count}">
            <a href="/board/review/read.html{$param_read}" class="link">
                <span class="chk">{$checkbox}</span>

                <div class="thumb">
                    <img src="/file_data/gith6409/{$real_filename}"
                         onerror="this.onerror=null; this.src='{$product_img_src}';"
                         alt="{$product_name}"
                         class="file_item">
                </div>

                <div class="wrap">
                    <div class="box">
                        <p class="product">{$product_name}</p>
                        <strong class="title">{$subject}</strong>
                        <div class="content-desc">{$content}</div>
                    </div>
                    <div class="etc1">
                        <span class="{$point_display|display} star">
                            <img src="//img.echosting.cafe24.com/skin/skin/board/icon-star-rating{$point_count}.svg" alt="{$point_count}점" />
                        </span>

                        <div class="etc-wrap">
                            <div class="left">
                                <span class="{$date_display|display}">{$member_icon}{$writer}</span>
                                <span class="{$date_display|display}">{$write_date|date:Y-m-d}</span>
                            </div>

                            <div class="right-meta">
                                <span class="{$hit_display|display}"><span class="RTMI">조회</span> {$hit_count|default:0}</span>
                                <span class="{$vote_display|display}"><span class="RTMI">추천</span> {$vote_count|default:0}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        </li>
        <!-- 여기 아래에 두 번째 <li> 블록이 있다면 전부 삭제하세요! -->
    </ul>
</div>
```

**중요:** `</ul>` 태그 위에 두 번째, 세 번째 `<li>` 블록이 있다면 **모두 삭제**하세요!

### 4단계: JavaScript 확인

파일 끝부분의 `<script>` 태그가 이렇게 되어있는지 확인:

```javascript
<script>
    const conElements = document.querySelectorAll('.board-wrapper .content-desc');
    conElements.forEach(conElement => {
        const spanElements = conElement.querySelectorAll('span');
        spanElements.forEach(span => {
            span.replaceWith(...span.childNodes);
        });
    });

    const bestReviewSlide = new Swiper('.best-review .swiper', {
        slidesPerView: 2,
        spaceBetween: 5,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination"
        },
        breakpoints: {
            768: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 10,
            },
        }
    });

    if (document.getElementById("search_date")) {
        document.getElementById("search_date").value = "all";
    }

    // 정렬 기능
    (function() {
        const sortTabs = document.querySelectorAll('.sort-tab');
        const reviewList = document.querySelector('.normal-review .review-list');

        if (!reviewList || sortTabs.length === 0) {
            console.log('정렬 요소를 찾을 수 없습니다.');
            return;
        }

        const sortOrders = {
            recent: 'desc',
            views: 'desc',
            recommend: 'desc'
        };

        sortTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const sortType = this.getAttribute('data-sort');

                if (this.classList.contains('active')) {
                    sortOrders[sortType] = sortOrders[sortType] === 'desc' ? 'asc' : 'desc';
                } else {
                    sortTabs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    sortOrders[sortType] = 'desc';
                }

                const currentOrder = sortOrders[sortType];
                const reviewItems = Array.from(reviewList.querySelectorAll('li'));

                console.log('정렬:', sortType, currentOrder, '아이템 수:', reviewItems.length);

                reviewItems.sort((a, b) => {
                    let aValue, bValue;

                    switch(sortType) {
                        case 'recent':
                            aValue = a.getAttribute('data-date') || '';
                            bValue = b.getAttribute('data-date') || '';

                            if (currentOrder === 'desc') {
                                return bValue.localeCompare(aValue);
                            } else {
                                return aValue.localeCompare(bValue);
                            }

                        case 'views':
                            aValue = parseInt(a.getAttribute('data-hit') || '0', 10);
                            bValue = parseInt(b.getAttribute('data-hit') || '0', 10);
                            console.log('조회수:', aValue, 'vs', bValue);
                            break;

                        case 'recommend':
                            aValue = parseInt(a.getAttribute('data-vote') || '0', 10);
                            bValue = parseInt(b.getAttribute('data-vote') || '0', 10);
                            console.log('추천수:', aValue, 'vs', bValue);
                            break;
                    }

                    if (currentOrder === 'desc') {
                        return bValue - aValue;
                    } else {
                        return aValue - bValue;
                    }
                });

                reviewItems.forEach(item => reviewList.appendChild(item));
                console.log('정렬 완료');
            });
        });
    })();
</script>
```

### 5단계: 테스트

1. 페이지를 새로고침 (Ctrl+F5)
2. F12 개발자 도구 > Console 탭 열기
3. 정렬 버튼 클릭
4. 콘솔에 "정렬: views desc 아이템 수: X" 같은 로그가 보이면 성공!

## 여전히 안 되는 경우:

콘솔에 나오는 정확한 에러 메시지를 알려주세요. 특히:
- "정렬 요소를 찾을 수 없습니다" → HTML 구조 문제
- "아이템 수: 0" → Cafe24 모듈 설정 문제
- SyntaxError → JavaScript 구문 오류
- 아무 로그도 안 나옴 → JavaScript가 실행 안 됨

## 추천수가 0으로 표시되는 경우:

이건 **정상입니다!** Cafe24에서 추천 기능을 활성화하고, 실제로 사용자가 추천을 눌러야 숫자가 증가합니다.

추천수가 "추천 0"으로 보이면 정렬은 작동하는 것입니다!
