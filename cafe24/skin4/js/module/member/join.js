$('.agree .more').click(function(){
    $(this).parents('.agree').find('.wrap').toggleClass('show');
})


$("#allChk").change(function() {
    $(".agree input[type='checkbox']").prop("checked", $(this).prop("checked"));
});

$(".agree .box input[type='checkbox']").change(function() {
    var parentAgree = $(this).closest(".agree");
    var allCheckboxes = parentAgree.find(".box input[type='checkbox']");
    var allChecked = true;
    allCheckboxes.each(function() {
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
