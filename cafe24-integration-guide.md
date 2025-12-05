# Cafe24 리뷰 게시판 정렬 기능 적용 가이드

## 1단계: CSS 추가

Cafe24 관리자 > 디자인 관리 > HTML/CSS 편집에서 CSS 파일 하단에 추가:

```css
/* 정렬 탭 스타일 */
.sort-tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    padding: 10px 0;
    border-bottom: 1px solid #e0e0e0;
}

.sort-tab {
    padding: 8px 16px;
    background: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.3s;
    position: relative;
}

.sort-tab:hover {
    background: #e8e8e8;
}

.sort-tab.active {
    background: #333;
    color: #fff;
    border-color: #333;
}

.sort-tab::after {
    content: '↓';
    margin-left: 5px;
    opacity: 0.5;
}

.sort-tab.active.asc::after {
    content: '↑';
    opacity: 1;
}

.sort-tab.active.desc::after {
    content: '↓';
    opacity: 1;
}

/* 리뷰 아이템 스타일 */
.review-item {
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.review-item img {
    width: 100%;
    height: 300px;
    object-fit: cover;
}

.review-content {
    padding: 20px;
}

.product-name {
    color: #666;
    font-size: 14px;
    margin-bottom: 8px;
}

.review-title {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.etc-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    color: #999;
}

.etc-wrap .left {
    display: flex;
    gap: 10px;
}

.etc-wrap .right {
    display: flex;
    gap: 15px;
}

/* 리뷰 그리드 */
.review-list.grid5 {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    list-style: none;
    padding: 0;
}

@media (max-width: 1200px) {
    .review-list.grid5 {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (max-width: 992px) {
    .review-list.grid5 {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (max-width: 768px) {
    .review-list.grid5 {
        grid-template-columns: repeat(2, 1fr);
    }
    .sort-tabs {
        flex-wrap: wrap;
    }
}

@media (max-width: 480px) {
    .review-list.grid5 {
        grid-template-columns: 1fr;
    }
}
```

## 2단계: HTML 수정

Cafe24 게시판 목록 템플릿 파일에서 일반 리뷰 목록 부분을 찾아서 수정:

**기존 코드를 이렇게 변경:**

```html
<section class="normal-review">
    <h2>일반 리뷰</h2>

    <!-- 정렬 탭 추가 -->
    <div class="sort-tabs">
        <button class="sort-tab active desc" data-sort="recent">등록일순</button>
        <button class="sort-tab" data-sort="views">조회수순</button>
        <button class="sort-tab" data-sort="recommend">추천수순</button>
    </div>

    <ul class="review-list grid5" module="board_list_4">
        <li class="review-item"
            data-date="{$write_date}"
            data-hit="{$hit_count}"
            data-vote="{$vote_count}">
            <a href="{$link_product_detail}">
                <img src="{$thumbnail}" alt="{$product_name}">
            </a>
            <div class="review-content">
                <p class="product-name">{$product_name}</p>
                <h3 class="review-title">
                    <a href="{$link_product_detail}">{$subject}</a>
                </h3>
                <div class="etc-wrap">
                    <div class="left">
                        <span>{$member_icon}{$writer}</span>
                        <span>{$write_date|date:Y-m-d}</span>
                    </div>
                    <div class="right">
                        <span data-type="hit">조회 {$hit_count}</span>
                        <span data-type="vote">추천 {$vote_count}</span>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</section>
```

**중요:** `<li>` 블록은 하나만 있어야 합니다! Cafe24가 자동으로 반복합니다.

## 3단계: JavaScript 추가

같은 HTML 파일의 `</body>` 태그 직전에 추가:

```html
<script>
(function() {
    // 정렬 기능
    const sortTabs = document.querySelectorAll('.sort-tab');
    const reviewList = document.querySelector('.normal-review .review-list');

    if (!sortTabs.length || !reviewList) {
        console.error('정렬 요소를 찾을 수 없습니다.');
        return;
    }

    // 정렬 상태 저장
    const sortState = {
        recent: 'desc',
        views: 'desc',
        recommend: 'desc'
    };

    sortTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const sortType = this.getAttribute('data-sort');

            console.log('정렬 버튼 클릭:', sortType);

            // 같은 버튼 클릭시 오름차순/내림차순 토글
            if (this.classList.contains('active')) {
                sortState[sortType] = sortState[sortType] === 'desc' ? 'asc' : 'desc';
            } else {
                sortState[sortType] = 'desc';
            }

            // 모든 탭 비활성화
            sortTabs.forEach(t => {
                t.classList.remove('active', 'asc', 'desc');
            });

            // 현재 탭 활성화
            this.classList.add('active', sortState[sortType]);

            // 정렬 실행
            sortReviews(sortType, sortState[sortType]);
        });
    });

    function sortReviews(sortType, order) {
        // 모든 리뷰 아이템 가져오기
        const items = Array.from(reviewList.querySelectorAll('.review-item'));

        console.log('정렬 전 아이템 수:', items.length);

        if (items.length === 0) {
            console.error('정렬할 리뷰 아이템이 없습니다.');
            return;
        }

        // 정렬 수행
        items.sort((a, b) => {
            let aValue, bValue;

            switch(sortType) {
                case 'recent':
                    // data-date 속성 사용
                    aValue = a.getAttribute('data-date') || '';
                    bValue = b.getAttribute('data-date') || '';
                    console.log('날짜 비교:', aValue, 'vs', bValue);
                    break;

                case 'views':
                    // data-hit 속성 사용
                    aValue = parseInt(a.getAttribute('data-hit') || '0', 10);
                    bValue = parseInt(b.getAttribute('data-hit') || '0', 10);
                    console.log('조회수 비교:', aValue, 'vs', bValue);
                    break;

                case 'recommend':
                    // data-vote 속성 사용
                    aValue = parseInt(a.getAttribute('data-vote') || '0', 10);
                    bValue = parseInt(b.getAttribute('data-vote') || '0', 10);
                    console.log('추천수 비교:', aValue, 'vs', bValue);
                    break;
            }

            // 비교 로직
            if (sortType === 'recent') {
                // 문자열 날짜 비교
                if (order === 'desc') {
                    return bValue.localeCompare(aValue);
                } else {
                    return aValue.localeCompare(bValue);
                }
            } else {
                // 숫자 비교
                if (order === 'desc') {
                    return bValue - aValue;
                } else {
                    return aValue - bValue;
                }
            }
        });

        // DOM에서 모든 아이템 제거 후 정렬된 순서로 다시 추가
        items.forEach(item => reviewList.appendChild(item));

        console.log('정렬 완료:', sortType, order, '- 아이템 수:', items.length);
    }
})();
</script>
```

## 4단계: 확인 사항

1. **Cafe24 관리자에서 게시판 목록 개수 설정 확인**
   - 쇼핑몰 관리 > 게시판 관리 > 해당 게시판 선택
   - "목록 개수" 설정이 원하는 개수로 되어 있는지 확인

2. **추천 기능 활성화**
   - 같은 게시판 설정에서 "추천/비추천 사용" 옵션 활성화

3. **F12 개발자 도구 콘솔 확인**
   - 정렬 버튼 클릭 시 로그가 제대로 나오는지 확인
   - 에러 메시지가 있다면 알려주세요

## 트러블슈팅

- **4개만 보이는 경우**: `module="board_list_4"`의 숫자를 제거하거나 게시판 설정에서 목록 개수 확인
- **정렬이 안 되는 경우**: 콘솔에서 "정렬 전 아이템 수: X" 메시지 확인
- **추천수가 안 보이는 경우**: Cafe24 게시판 설정에서 추천 기능 활성화 필요
