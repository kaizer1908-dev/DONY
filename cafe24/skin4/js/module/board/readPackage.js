$(function(){
    $('[id^="replyArea_"]').each(function(e) {
        $(this).hide();
    });
});

$('.agree .more').click(function(){
    $('.write-from .agree .wrap').toggleClass('show');
})
$('.file-area .del').click(function(){
    if ($(this).hasClass('on')) {
        $(this).siblings('.text').find('input').prop("checked",false)
        
    }else{
        $(this).siblings('.text').find('input').prop("checked",true)
    }
    $(this).toggleClass('on');
})

$('.write-from .file-area .name').each(function(i,el){
    if(!$(this).has('input').length){
        $(this).find('.del').remove();
    }
})

$('.file-area .file input').change(function() {
    readURL(this);
});

function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        $(input).siblings('.preview').attr('src', e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    } else {
      $(input).siblings('.preview').attr('src', "");
    }
}
    
$('.star_rating > .star').click(function () {
    starText=$('.star-wrap .desc');
    var val =Number($(this).attr('value'))-1;
    console.log(val);
    var index = $(this).index();

    $(this).parent().children('span').removeClass('on');
    $(this).addClass('on').prevAll('span').addClass('on');

    $('.grade input').eq(val).prop('checked',true)

    switch (index + 1) {
        case 1:
            starText.text('나쁨');
            
            break;
        case 2:
            starText.text('별로');
           
            break;
        case 3:
            starText.text('보통');
            break;
        case 4:
            starText.text('좋음');
            break;
        case 5:
            starText.text('최고');
            break;
    }
    })
    $('.star_rating > .star').eq(4).trigger('click')
  
//     document.querySelectorAll('.file-area .del').forEach(function(item) {
//     item.addEventListener('click', function() {
//         if (this.classList.contains('on')) {
//             this.nextElementSibling.querySelector('.text input').checked = false;
//         } else {
//             this.nextElementSibling.querySelector('.text input').checked = true;
//         }
//         this.classList.toggle('on');
//     });
// });

// $('.btn-reply').click(function(){
//     $('.comment-area').removeClass('hide');
// })
$('.xans-board-commentlist .formGroup .more').click(function(){
    $(this).siblings('.button').toggleClass('show');
})