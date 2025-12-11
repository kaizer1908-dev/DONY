document.addEventListener('DOMContentLoaded', function () {
    const baseImgList = document.getElementById('baseImgList'); // 이미지 리스트가 있는 div
    const swiperWrapper = document.querySelector('.swiper .swiper-wrapper'); // swiper-wrapper

    if (baseImgList && baseImgList.innerHTML.trim() !== '') {
        // baseImgList의 내용을 가져와 <br> 태그 기준으로 이미지를 나누어 처리
        const images = baseImgList.innerHTML.split('<br>'); // <br> 기준으로 분리

        images.forEach(function(imageContent) {
            // 각 이미지의 HTML을 처리
            const imgTagMatch = imageContent.match(/<img[^>]+>/); // 이미지 태그 찾기

            if (imgTagMatch) {
                // 새로운 슬라이드 생성
                const swiperSlide = document.createElement('div');
                swiperSlide.classList.add('swiper-slide');

                // 이미지 태그를 swiper-slide에 넣기
                swiperSlide.innerHTML = imgTagMatch[0];

                // swiper-wrapper에 새로운 슬라이드를 추가
                swiperWrapper.appendChild(swiperSlide);
            }
        });
    } else {
        // baseImgList가 없거나 내용이 비어 있는 경우
        const thumbnailImage = document.querySelector('.thumbnail img'); // .thumbnail 안에 있는 이미지 선택

        if (thumbnailImage) {
            // 새로운 슬라이드 생성
            const swiperSlide = document.createElement('div');
            swiperSlide.classList.add('swiper-slide');

            // 이미지 태그 복사 후 swiper-slide에 넣기
            const clonedImage = thumbnailImage.cloneNode(true);
            swiperSlide.appendChild(clonedImage);

            // swiper-wrapper에 새로운 슬라이드를 추가
            swiperWrapper.appendChild(swiperSlide);
        }
    }

    // Swiper 초기화
    new Swiper('.slide-area .swiper', {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });


    const conElements = document.querySelectorAll('.detail');

    // 각 .con 요소에 대해 처리
    conElements.forEach(conElement => {
      // .con 요소 내의 모든 span 태그를 찾아서 그 안의 텍스트를 부모로 이동 후 span 태그 삭제
      const spanElements = conElement.querySelectorAll('span');
    
      spanElements.forEach(span => {
        // span 태그 안의 텍스트를 부모 요소로 옮깁니다.
        span.replaceWith(...span.childNodes);
      });
    });


});


