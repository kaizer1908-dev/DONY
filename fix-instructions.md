# 리뷰 게시판 정렬 기능 수정 가이드

## 수정 1: 일반 리뷰 <li> 태그 수정 (약 472번째 줄)

### 찾을 코드:
```html
<ul class="review-list grid5" module="board_list_4">
    <!--
        $product_name_cut = 30
        $login_page_url = /member/login.html
        $deny_access_url = /index.html
    -->
<li>
```

### 이렇게 변경:
```html
<ul class="review-list grid5" module="board_list_4">
    <!--
        $product_name_cut = 30
        $login_page_url = /member/login.html
        $deny_access_url = /index.html
    -->
<li data-date="{$write_date}" data-hit="{$hit_count}" data-vote="{$vote_count}">
```

---

## 수정 2: 베스트 리뷰 중복 제거 (약 305번째 줄)

### 찾을 코드:
```html
                </div>
<div class="right-meta">
    <span class="{$hit_display|display}"><span class="RTMI">조회</span> {$hit_count}</span>
    <span class="{$vote_display|display}"><span class="RTMI">추천</span> {$vote_count|default:0}</span>
</div>
```

### 이 부분 **전체 삭제** (중복된 코드입니다)

---

## 수정 3: JavaScript 전체 교체

### 찾을 코드 (맨 마지막 <script> 태그):
```javascript
<script>
    const conElements = document.querySelectorAll('.board-wrapper .content-desc');
    ...
    document.getElementById("search_date").value = "all";
```

이 script 태그부터 끝까지 **모두 삭제**하고 아래 코드로 교체:

```html
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

                // 정렬 순서 토글
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

                    // 숫자 비교
                    if (currentOrder === 'desc') {
                        return bValue - aValue;
                    } else {
                        return aValue - bValue;
                    }
                });

                // DOM 재정렬
                reviewItems.forEach(item => reviewList.appendChild(item));
                console.log('정렬 완료');
            });
        });
    })();
</script>
```

---

## 요약

1. **472번째 줄**: `<li>`에 `data-date="{$write_date}" data-hit="{$hit_count}" data-vote="{$vote_count}"` 추가
2. **305번째 줄**: 중복된 `.right-meta` div 삭제
3. **마지막 script 태그**: 전체 교체

이렇게 3군데만 수정하면 정렬이 제대로 작동합니다!
