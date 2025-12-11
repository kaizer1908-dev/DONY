

var slideCount = $('.pop_swp .swiper-slide').length;

if (slideCount > 0) {
    $('.pop_swp').show();
}

var pop_now = new Date().getTime();

var hidePopupUntil = sessionStorage.getItem('hidePopupUntil');

if (hidePopupUntil && pop_now < hidePopupUntil) {
    $('.pop_swp').hide();
} else {
    $('.pop_swp').show();
}

// 오늘 그만 보기 클릭 시
$('#closeToday').on('click', function() {
    var tomorrow = pop_now + 24 * 60 * 60 * 1000;
    sessionStorage.setItem('hidePopupUntil', tomorrow);
    $('.pop_swp').hide();
});

// 닫기 버튼 클릭 시
$('#closePop, .dimmed2').on('click', function() {
    $('.pop_swp').hide();
});


var pop_swp = new Swiper(".pop_swiper", {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".pop_swiper .swiper-pagination",
        type: "fraction",
    },
});

