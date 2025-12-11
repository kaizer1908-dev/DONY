$(function () {



    $(window).scroll(function () {
        curr = $(this).scrollTop();

        if (curr > 0) {
            $('#header').addClass('dark');
        } else {
            $('#header').removeClass('dark');
        }

    })
    $(window).trigger('scroll');

    // $('.gnb .hov').click(function (e) {
    //     if ($(this).siblings('.sub-pop').length) {
    //         e.preventDefault();
    //         $(this).parent().siblings().find('.sub-pop').removeClass('show');
    //         $(this).siblings('.sub-pop').toggleClass('show');
    //     }
    // })

    $('.sub-pop .pop_close').click(function () {
        $('.sub-pop').removeClass('show');
    })

    $('.btn-notice-close').click(function(){
        $('.fix-notice').remove();
    })

    //헤덥부분 검색 토글
    $('#header .btn-search').click(function () {
        $('.search_inner').toggleClass('on');
    })
    $('.search_inner .btn-close').click(function () {
        $('.search_inner').removeClass('on');
    })


    $('.side-nav .btn-close,.dimmed_nav').click(function () {
        $('html').removeClass('scroll-hidden');
        $('#header').removeClass('menu');
        $('#header .side-nav').removeClass('on');
        $('.dimmed_nav').removeClass('on');
    })

    menuMotion = gsap.from('.side-nav .nav-item', {
        opacity: 0,
        y:20,
        stagger: 0.05,
        paused: true,
    })


    $('#header .header-inner .btn-menu,.fix-tabbar a.menu').click(function (e) {
        e.preventDefault();
        $('html').addClass('scroll-hidden');
        $('#header').addClass('menu');
        $('#header .side-nav').addClass('on');
        $('.dimmed_nav').addClass('on');
        menuMotion.restart();
    })



    // footer
    $('.btn-addr').click(function (e) {
        e.preventDefault();
        $(this).find('i').toggleClass('minus');
        $('.footer .addr').toggleClass('show');

    })


    // $('.side-nav .arrow').click(function(e){
    //    $(this).toggleClass('on')
    //    $(this).closest('.item').siblings('.sub-category').toggleClass('on');
    // })


    // $(document).on('click','#header .side-nav .more',function(e){
    //     e.preventDefault();
    //     $(this).siblings('.depth2-category').toggleClass('on')
    // })

 

    $(document).on('click', '.side-nav .arrow', function (e) {
        $(this).toggleClass('on')
        $(this).closest('.item').siblings('.sub-category').toggleClass('on');
  
    })





    $('.sort-wrapper .btn-view').click(function () {
        $('.prdList').toggleClass('grid5')
        $(this).toggleClass('on');

    })


    $('.fix-btns .btn-top').click(function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    })


    $('.agree .more').click(function () {
        if ($(this).hasClass('active')) {

            $(this).removeClass('active')
            $(this).parents('.agree').find('.wrap').removeClass('show');
        } else {
            $(this).addClass('active')
            $(this).parents('.agree').find('.wrap').addClass('show');
        }
    })


    $("#allChk").change(function () {


        $(".agree input[type='checkbox']").prop("checked", $(this).prop("checked"));
    });

    $(".agree .box input[type='checkbox']").change(function () {
        var parentAgree = $(this).closest(".agree");
        var allCheckboxes = parentAgree.find(".box input[type='checkbox']");
        var allChecked = true;
        allCheckboxes.each(function () {
            if (!$(this).prop("checked")) {
                allChecked = false;
                return false;
            }
        });
        parentAgree.find(".blind input[type='checkbox']").prop("checked", allChecked);
        if ($(".agree .box input[type='checkbox']:checked").length === $(".agree .box input[type='checkbox']").length) {
            $("#allChk").prop("checked", true);
        } else {
            $("#allChk").prop("checked", false);
        }
    });


    $(".agree .blind input[type='checkbox']").each(function () {
        if ($(this).prop("checked")) {
            $(this).parent('.blind').siblings('.box').find("input[type='checkbox']").prop("checked", true)
        }
    })







    $('#member_id').attr('placeholder', 'ID')
    $('#order_name').attr('placeholder', '주문자명')
    $('#order_password').attr('placeholder', '비회원주문 비밀번호')


    writerArr = [
        '.xans-board-commentwrite .comment-box input[type=text]',
        '.xans-board-commentreply .comment-box input[type=text]'
    ]
    writerArr.forEach(element => {
        $(element).attr('placeholder', '작성자')
    });

    $('.xans-board-commentwrite input[type=password],.xans-board-commentform input[type=password],.xans-board-commentreply input[type=password]').attr('placeholder', '비밀번호')

    $('.xans-board-commentwrite textarea,.xans-board-commentform textarea,.xans-board-commentreply textarea').attr('placeholder', '댓글을 입력해주세요')

    $('.xans-layout-searchheader .inputTypeText,#ec-product-searchdata-keyword').attr('placeholder', '검색어를 입력해주세요')

    /**
     * product-list
     */
    $('#Product_ListMenu .btn-sort').click(function () {
        $('#Product_ListMenu .sort-pop').toggle();
    })

    $(document).on('click', function (e) {
        if ($('#Product_ListMenu').has(e.target).length === 0) {
            $('#Product_ListMenu .sort-pop').hide();
        }
    })



    // 마이페이지
    if (!$('.myshopArea #coupon').find('#xans_myshop_bankbook_coupon_cnt').length) {
        $('.myshopArea #coupon').text("0개")
    }


    setTimeout(() => {
        $('.xans-myshop-orderstate .tab-style1 .count').each(function () {
            if ($(this).find('span').text() !== "0") {
                $(this).addClass('active')
            }
        })
    }, 300);



    if ($('.swiper').length) {
        // 추천/뉴상품 
        const prdSoreSlide1 = new Swiper(".prd-more-slide", {
            spaceBetween: 5,
            slidesPerView: 2.2,
            freeMode: true,
            breakpoints: {
                768: {
                    spaceBetween: 5,
                    slidesPerView: 3,
                },
                1025: {
                    spaceBetween: 5,
                    slidesPerView: 5,
                }
            }
        })


        const marqueeslide = new Swiper(".marquee .swiper", {
            autoplay: {
                delay: 3000,
            },
            loop: true,
        })
        const menupopslide = new Swiper(".sub-pop .swiper", {
            pagination: {
                el: ".swiper-pagination"
            }
        })



        // var swiper = new Swiper(".sc-visual .swiper", {
        //     speed: 500,
        //     spaceBetween: 20,
        //     navigation: {
        //         nextEl: '.next',
        //         prevEl: '.prev',
        //     }

        // });


        var swiper = new Swiper(".prd-type1 .swiper", {
            slidesPerView: 'auto',
            spaceBetween: 16,
            pagination: {
                el: '.pagination'
            }
        });

        var swiper = new Swiper(".type3 .swiper", {
            slidesPerView: 4,
            spaceBetween: 16,
            navigation: {
                nextEl: '.next',
                prevEl: '.prev',
            }
        });

        var swiper = new Swiper(".sc-category .swiper", {
            slidesPerView: 4,
            spaceBetween: 16,
            pagination: {
                el: '.collection-pagination'
            }
        });
    }

})