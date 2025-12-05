// 아래 코드를 review.html 파일의 마지막 <script> 태그 전체를 삭제하고
// 1736번 줄의 <script>부터 1889번 줄의 </script>까지 모두 삭제 후
// 아래 코드로 교체하세요

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

    // 정렬 기능 - data 속성 기반
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
