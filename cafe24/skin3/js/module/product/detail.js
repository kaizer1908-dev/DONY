

$(function() {


    if($('.infoArea').has('#span_product_price_sale').length){
        $('.infoArea').addClass('sale')
    }





    const thumbSlide = new Swiper('.thumb-slide .swiper',{
        slidesPerView:6,
        spaceBetween:5,
        watchSlidesProgress: true,
        breakpoints:{
            768:{
                spaceBetween:10,
            },
            1024:{
            }
        }
    })
    const frontSlide = new Swiper('.front-slide .swiper',{
        // thumbs: {
        //     swiper: thumbSlide,
        // },
        navigation:{
            nextEl:".swiper-button-next",
            prevEl:".swiper-button-prev"
        },
        // pagination:{
        //     el:".fraction",
        //     type:"fraction",
        //     // renderCustom: function (swiper, current, total) {
        //     // return `
        //     //         <span class="curr">${current}</span>
        //     //         <i class="line"></i>
        //     //         <span class="total">${total}</span>`;
        //     // }
        // }
    })


    $(".infotab-area .top .tab").click(function (e) {
        e.preventDefault();

        // 클릭한 탭 활성화
        $(".infotab-area .top .tab").removeClass("on");
        $(this).addClass("on");

        // 연결된 컨텐츠 활성화
        let target = $(this).data("tab");
        $(".infotab-area .bottom .cont").removeClass("on");
        $(target).addClass("on");
    });
    



    $('#actionCartClone, #actionWishClone, #actionBuyClone, #actionWishSoldoutClone').off().on('click', function() {
        try {
            var id = $(this).attr('id').replace(/Clone/g, '');
            if (typeof(id) !== 'undefined') $('#' + id).trigger('click');
            else return false;
        } catch(e) {
            return false;
        }
    });

    function productDetailOrigin(){
        var imgChk = $('#prdDetailContent').find('img').length;
        if(imgChk <= 0){
            $('#prdDetailBtn').remove();
        }
    }
    productDetailOrigin();

    // Add Image
    var oTarget = $('.xans-product-mobileimage ul li');
    var oAppend = oTarget.first().children('p').clone();

    oTarget.slice(1).each(function() {
        var listHtml = $(this).html();
        $(this).children().wrap(function() {
            return '<p class="thumbnail">' + oAppend.html() + listHtml + '</p>';
        });

        $(this).children('p').children('img').first().remove();
    });



    $('.goOrder').click(function(){
        $('.xans-product-detail').addClass('order-new');
    })

    $('.order-dimmed').click(function(){
        $('.xans-product-detail').removeClass('order-new');
    })
    // create
    $(window).on("scroll", function() {
        var target = $(".xans-product-detail .infoArea_content"); // 확인할 요소 선택
        var targetBottom = target.offset().top + target.height();
        var windowTop = $(window).scrollTop();

        // 요소가 화면 위로 스크롤되어 완전히 사라질 때 실행
        if (windowTop > $('.infotab-area').offset().top) {
            $('.fix-bottom').addClass('show');
        }else{
            $('.fix-bottom').removeClass('show')
            $('.xans-product-detail').removeClass('order-new');
        }
    });
    $(window).trigger('scroll');

    document.querySelectorAll('.discount').forEach(element => {
        element.innerHTML = element.innerHTML.replace(/(\d+)\.0%/g, '$1%');
    });

});

