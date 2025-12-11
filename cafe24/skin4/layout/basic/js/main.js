const lenis = new Lenis();

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

gsap.ticker.lagSmoothing(0);


const visualpc = new Swiper('.section1 .swiper.pc', {
    lopp:true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    }
});
const visualm = new Swiper('.section1 .swiper.m', {
    lopp:true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    }
});


const visualSlidePc = new Swiper('.section3 .swiper', {
    slidesPerView: 2.2,
    spaceBetween:10,
    scrollbar: {
        el: ".swiper-scrollbar",
        hide: false,
        draggable: true, // 스크롤바 드래그 활성화
    },
    navigation:{
        nextEl:".swiper-button-next",
        prevEl:".swiper-button-prev"
    },
    breakpoints:{
        1024:{
            slidesPerView: 4,
            spaceBetween:20,
        }
    }
    });
    

    var thumbSwiper = new Swiper(".section4 .swiper", {
        slidesPerView: 1.1,
        spaceBetween:10,
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: false,
            draggable: true, // 스크롤바 드래그 활성화
        },
        navigation:{
            nextEl:".swiper-button-next",
            prevEl:".swiper-button-prev"
        },
        breakpoints:{
            1024:{
                slidesPerView: 4,
                spaceBetween:20,
            }
        }
    });
    var thumbSwiper = new Swiper(".sc-insta .swiper", {
        slidesPerView: 2.2,
        spaceBetween:10,
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: false,
            draggable: true, // 스크롤바 드래그 활성화
        },
        navigation:{
            nextEl:".swiper-button-next",
            prevEl:".swiper-button-prev"
        },
        breakpoints:{
            1024:{
                slidesPerView: 4,
                spaceBetween:20,
            }
        }
    });