






document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(Draggable);

    // Draggable 객체를 저장할 변수
    let ecProductDraggable;

    // Draggable을 초기화하는 함수
    function initializeDraggable() {
        // 기존 Draggable 객체가 있다면 파괴
        if (ecProductDraggable) {
            ecProductDraggable.kill(); // 이전 인스턴스를 완전히 제거
        }

        // 새로운 Draggable 객체 생성
        ecProductDraggable = Draggable.create(".sec1 .ec-base-product", {
            type: "x,y", // 가로 + 세로 드래그
            bounds: ".sec1", // 드래그 가능한 영역을 부모 요소로 제한
            inertia: false, // 관성 효과 제거
            edgeResistance: 1, // 가장자리 저항을 최대값으로 설정하여 튕김 방지
            cursor: "grab", // 마우스 커서 변경
            onDrag: function() {
                // 드래그 중에 x, y 값을 추적하고 적용
            }
        });
    }

    // 처음 초기화
    initializeDraggable();

    // 리사이징 시 Draggable 초기화
    window.addEventListener("resize", function() {
        // 리사이징 후 다시 초기화
        initializeDraggable();
    });

    // 추가적으로 리사이징 시 위치를 리셋
    window.addEventListener("resize", function() {
        gsap.set('.sec1 .ec-base-product', { x: 0, y: 0 });
    });



    $('.progress button').click(function(){
        size = $(this).data('size');
        $('.sec1 .prd-list').removeClass('size_s size_m size_l')
        $('.sec1 .prd-list').addClass(size);
        $(this).addClass('on').siblings().removeClass('on')

        ecProductDraggable[0].kill();
        ecProductDraggable = Draggable.create(".sec1 .ec-base-product", {
            type: "x,y", // 가로 + 세로 드래그
            bounds: ".sec1", // 드래그 가능한 영역을 부모 요소로 제한
            inertia: false, // 관성 효과 제거
            edgeResistance: 1, // 가장자리 저항을 최대값으로 설정하여 튕김 방지
            cursor: "grab", // 마우스 커서 변경
            onDrag: function() {
                // 드래그 중에 x, y 값을 추적하고 적용
            }
        });
        initializeDraggable();
    })
});






// const visualSlidePc = new Swiper('.sc-visual .pc.swiper', {
//     speed:1000,
//     slidesPerView: 1,
//     effect:"fade",
//     loop: true,
//     pagination:{
//         el:".swiper-pagination",
//     },
//     navigation: {
//         prevEl: ".swiper-button-prev",
//         nextEl: ".swiper-button-next"
//     }
// });

// const visualSlideM = new Swiper('.sc-visual .m.swiper', {
//     speed:1000,
//     slidesPerView: 1,
//     effect:"fade",
//     loop: true,
//     pagination:{
//         el:".swiper-pagination",
//     },
// });



// const cate = new Swiper('.sc-cate .swiper', {
//     slidesPerView: 'auto',
//     spaceBetween: 8,
//     watchOverflow: true,
//     breakpoints:{
//         768:{
//             slidesPerView: 6,
//         }
//     }
// });


//     const collection = new Swiper('.sc-collection .swiper', {
//         slidesPerView: 1,
//         spaceBetween: 8,
//         // loop: true,
//         pagination: {
//             el: ".sc-collection .swiper-pagination",
//             clickable: true,
//         },
//         navigation: {
//             prevEl: ".sc-collection .swiper-button-prev",
//             nextEl: ".sc-collection .swiper-button-next"
//         },
//         breakpoints:{
//             768:{
//                 slidesPerView: 3,
//             }
//         }
//     });


// // const visualSlideM = new Swiper('.sc-visual .m.swiper', {
// //     speed:1000,
// //     slidesPerView: 1,
// //     spaceBetween: 0,
// //     loop: true,
// //     watchOverflow: true,
// //     slideVisibleClass: 'swiper-slide-visible',
// //     pagination:{
// //         el:".swiper-pagination"
// //     },
// //     // breakpoints:{
// //     //     768:{
// //     //         slidesPerView: 2,
// //     //     }
// //     // }
// // });



// const reivewSlide = new Swiper('.sc-review .swiper', {
//     speed:1000,
//     slidesPerView: 1,
//     spaceBetween: 20,
//     loop: true,
//     centeredSlides:true,
//     pagination:{
//         el:".sc-review .fraction",
//         type:"fraction"
//     },
//     navigation:{
//         prevEl:".sc-review .prev",
//         nextEl:".sc-review .next"
//     },
//     breakpoints:{
//         768:{
//             slidesPerView: 3,
//         }
//     }
// });



// // const linksSlideM = new Swiper('.sc-links.m .swiper', {
// //     slidesPerView: 1.5,
// //     spaceBetween: 10,
// //     pagination:{
// //         el:".swiper-pagination"
// //     }
// // });

// // const mainSlidePc = new Swiper('.slide-prd .swiper',{
// //     slidesPerView:2.1,
// //     spaceBetween:10,
// //     loop:false,
// //     navigation:{
// //         prevEl:".prev",
// //         nextEl:".next"
// //     },
// //     pagination:{
// //         el:".swiper-pagination"
// //     },
// //     breakpoints:{
// //         768:{
// //             slidesPerView:4,
// //             spaceBetween:10,
// //         }
// //     }
   
// // })
// // const marqueeSlide = new Swiper('.sc-marquee .swiper',{
// //     speed:5000,
// //     loop:true,
// //     slidesPerView:'auto',
// //     autoplay:{
// //         delay:0,
// //     },
// //     spaceBetween:10,
// //     navigation:{
// //         prevEl:".prev",
// //         nextEl:".next"
// //     },
// // })


// // // ScrollTrigger.create({
// // //     trigger:".sc-links",
// // //     start:"0% 100%",
// // //     end:"0% 40%",
// // //     // markers:true,
// // //     onLeave:function(){
// // //         $('.sc-links').addClass('fade');
// // //     },
// // //     onLeaveBack:function(){
// // //         $('.sc-links').removeClass('fade');
// // //     }
// // // })


// // $('.sc-product .tab-list a').click(function(e){
// //     e.preventDefault();

// //     tabName = $(this).data('tab');

// //     $(this).parent().addClass('on').siblings().removeClass('on');

// //     console.log($(tabName))
// //     $(tabName).addClass('on').siblings('.tab').removeClass('on')

// // })


// // const eventSlideM = new Swiper('.sc-event .swiper.m', {
// //     slidesPerView: 1.5,
// //     spaceBetween: 10,
// //     pagination:{
// //         el:".swiper-pagination"
// //     }
// // });


// // const lookbookSlide = new Swiper('.sc-lookbook .swiper', {
// //     slidesPerView: "auto",
// //     spaceBetween: 10,
// //     pagination:{
// //         el:".swiper-pagination"
// //     }
// // });




// // document.addEventListener("DOMContentLoaded", () => {
// //     const relationItems = document.querySelectorAll("#relationItem .recomm_load");

// // relationItems.forEach((prdElement) => {
// //     const parentAnchor = prdElement.closest("li").querySelector("a");
// //     const url = parentAnchor.getAttribute("href");

// //     fetch(url)
// //         .then((response) => {
// //             if (!response.ok) {
// //                 throw new Error(`HTTP error! status: ${response.status}`);
// //             }
// //             return response.text();
// //         })
// //         .then((html) => {
// //             // DOMParser를 이용해 응답 HTML을 파싱
// //             const parser = new DOMParser();
// //             const doc = parser.parseFromString(html, "text/html");

// //             // .xans-product-relationlist 영역 추출
// //             const relationList = doc.querySelector(".xans-product-relationlist");

// //             if (relationList) {
// //                 prdElement.innerHTML = relationList.innerHTML;

// //                 // 동적으로 로드된 콘텐츠에서 .prdList .soldout 처리
// //                 const soldOutItems = prdElement.querySelectorAll('.prdList .soldout');
// //                 soldOutItems.forEach((soldOutItem) => {
// //                     if (soldOutItem.querySelector('img')) {
// //                         soldOutItem.innerHTML = "<span>SOLD OUT</span>";
// //                     } else {
// //                         soldOutItem.remove();
// //                     }
// //                 });
// //             } else {
// //                 console.warn("Relation list not found in fetched page.");
// //             }
// //         })
// //         .catch((error) => {
// //             console.error("Error fetching relation data:", error);
// //         });
// // });

// // });




// //   const conElements = document.querySelectorAll('.board-wrapper .content-desc');
// //     conElements.forEach(conElement => {
// //         const spanElements = conElement.querySelectorAll('span');
// //         spanElements.forEach(span => {
// //             span.replaceWith(...span.childNodes);
// //         });
// //     });

// //     bestReviewSlide = new Swiper('.best-review .swiper',{
// //         slidesPerView: 2,
// //         spaceBetween: 5,
// //         navigation:{
// //             nextEl:".swiper-button-next",
// //             prevEl:".swiper-button-prev",
// //         },
// //         pagination:{
// //             el:".swiper-pagination"
// //         },
// //         breakpoints: {
// //             768: {
// //                 slidesPerView: 3,
// //                 spaceBetween: 10,
// //             },
// //             1024: {
// //                 slidesPerView: 4,
// //                 spaceBetween: 10,
// //             },
// //         }
// //     })




// // gsap.from(".sc-product .item ",{
// //     scrollTrigger:{
// //         trigger:".sc-product",
// //         start:"0% 80%",
// //         end:"100% 50%",
// //         markers:true,
// //     },
// //     stagger:0.1,
// //     opacity:0,
// //     yPercent:10
// // })


// // const mainSlideM = new Swiper('.sc-visual .swiper.m',{
// //     slidesPerView:1,
// //     centeredSlides:true,
// //     loop:true,
// //     effect:"fade",
// //     pagination:{
// //         el:".sc-visual .pagination.m"
// //     },
// // })

// // const introSlide = new Swiper('.sc-intro .swiper', {
// //     effect: "fade",
// //     loop: true,
// //     pagination: {
// //         el: ".swiper-pagination",
// //         clickable: true,
// //         renderBullet: function (index, className) {
// //             const title = this.slides[index].getAttribute('data-title');
// //             return '<span class="' + className + '">' + title + '</span>';
// //         },
// //     },
// // });
// // const themeSlide = new Swiper('.sc-theme .swiper', {
// //     slidesPerView:2,
// //     // loop:true,
// //     spaceBetween:10,
// //     navigation:{
// //         nextEl:".swiper-button-next",
// //         prevEl:".swiper-button-prev",
// //     },
// //     breakpoints: {
// //         768: {
// //             slidesPerView:3,
// //             spaceBetween: 20,
// //         },
// //     }
// // });


// // window.addEventListener('load', function(){
// //     swiperVisual();
// //     swiperLazyInit();
// // 	saleItemTab();
// //     videoLoad();
// // });

// // function swiperVisual() {
// //     var swipeKeyVisual = new Swiper('.mainVisual .swiper-container', {
// //         spaceBetween: 30,
// //         centeredSlides: true,
// //         loop: true,
// //         autoplay: {
// //             delay: 2500,
// //             disableOnInteraction: false,
// //         },
// //         effect: 'fade',
// //         pagination: {
// //             el: '.mainVisual .swiper-pagination',
// //             clickable : true,
// //         },
// //         navigation: {
// //             nextEl: '.mainVisual .swiper-button-next',
// //             prevEl: '.mainVisual .swiper-button-prev',
// //         }
// //     });
// // 	var btnSwiperPause = document.querySelector('.swiper-button-pause');
// //     if(!btnSwiperPause) return;
// //     btnSwiperPause.addEventListener('click', function(){
// //         swipeKeyVisual.autoplay.stop();            
// //         this.parentNode.classList.add('on');
// //     });
// //     var btnSwiperPlay = document.querySelector('.swiper-button-play');
// //     if(!btnSwiperPlay) return;
// //     btnSwiperPlay.addEventListener('click', function(){
// //         swipeKeyVisual.autoplay.start();            
// //         this.parentNode.classList.remove('on');
// //     });
// // }

// // function swiperLazyInit() {
// //     var swiperList = document.querySelectorAll('.swiper-container.swiper-lazy-init');
// //     if (swiperList && swiperList.length > 0) {
        
// //         var swiperObserver = new IntersectionObserver(function(entries) {
// //             entries.forEach(function(entry) {
// //                 if (entry.intersectionRatio > 0) {
// //                     init(entry.target);
// //                 }
// //             });
// //         }, { rootMargin: '50px' });
        
// //         swiperList.forEach(function (swiper) {
// //             swiperObserver.observe(swiper);
// //         });
// //     }
    
// //     function init(container) {
// //         if (container.classList.contains('swiper-container-initialized') === false) {
// //             new Swiper(container, {
// //                 navigation: {
// //                     nextEl: '.item-wrapper .swiper-button-next',
// //                     prevEl: '.item-wrapper .swiper-button-prev',
// //                     },
// //                 scrollbar: {
// //                     el: '.item-wrapper .swiper-scrollbar',
// //                 },
// //                 slidesPerView: 2,
// //                 breakpoints: {
// //                     768: {
// //                         slidesPerView: 2,
// //                         spaceBetween: 10,
// //                     },
// //                     1024: {
// //                         slidesPerView: 3,
// //                         spaceBetween: 16,
// //                     },
// //                 }
// //             })
// //         }
// //     }
// // }

// // function saleItemTab() {
// //     var saleItem = document.querySelector('.saleItem');
// //     if(!saleItem) return;
// //     var tabButtonList = saleItem.querySelectorAll('.menu > li > .button');

// //     tabButtonList.forEach(function(button) {
// //         button.addEventListener('click', handleClickButton);
// //         setTitle(button);
// //     });

// //     function handleClickButton(e) {
// //         var currentButton = e.target;
// //         tabButtonList.forEach(function(button) {
// //             button.classList.remove('active');
// //         });
// //         currentButton.classList.add('active');

// //         var contentId = currentButton.getAttribute('data-id');
// //         var currentContent = saleItem.querySelector('#' + contentId);
// //         var tabContentList = saleItem.querySelectorAll('.tabContent');
// //         tabContentList.forEach(function(content) {
// //             content.classList.remove('active');
// //         });
// //         currentContent.classList.add('active');
// //     }

// //     function setTitle(button) {
// //         var contentId = button.getAttribute('data-id');
// //         var targetContent = saleItem.querySelector('#' + contentId);
// //         var mainTitle = targetContent.querySelector('.mainTitle');
// //         var title = '';
// //         if (mainTitle) {
// //             title = mainTitle.textContent;
// //         }
// //         button.innerText = title;
// //     }
// // }

// // function videoLoad() {
// //     var videoLink = document.querySelector('.linkVideo');
// //     if(!videoLink) return;
// //     videoLink.addEventListener('click', function(){
// //         var video = document.querySelector('#video');
// //         var source = video.querySelector('source');
// //         if(source.getAttribute('src') === null) {
// //             source.setAttribute('src', source.getAttribute('data-src'));
// //             video.load();
// //         }
// //         video.play();
// //     });
// // }
