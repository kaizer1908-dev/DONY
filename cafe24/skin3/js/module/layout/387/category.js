$(document).ready(function(){
    var methods = {
        aCategory    : [],
        aSubCategory : {},
        get: function()
        {
             $.ajax({
                url : '/exec/front/Product/SubCategory',
                dataType: 'json',
                success: function(aData) {
                    if (aData == null || aData == 'undefined') return;
                    for (var i=0; i<aData.length; i++)
                    {
                        var sParentCateNo = aData[i].parent_cate_no;
                        if (!methods.aSubCategory[sParentCateNo]) {
                            methods.aSubCategory[sParentCateNo] = [];
                        }
                        methods.aSubCategory[sParentCateNo].push( aData[i] );
                    }
                    // Show all sub-categories
                    $('.xans-layout-category li').each(function() {
                        var $this = $(this),
                            iCateNo = Number(methods.getParam($this.find('a').attr('href'), 'cate_no'));
                        if (!iCateNo) {
                            return;
                        }
                        methods.show($this, iCateNo, 1); // Pass depth as argument
                    });
                }
            });
        },
        getParam: function(sUrl, sKey) {
            var aUrl         = sUrl.split('?');
            var sQueryString = aUrl[1];
            var aParam       = {};
            if (sQueryString) {
                var aFields = sQueryString.split("&");
                var aField  = [];
                for (var i=0; i<aFields.length; i++) {
                    aField = aFields[i].split('=');
                    aParam[aField[0]] = aField[1];
                }
            }
            return sKey ? aParam[sKey] : aParam;
        },
        show: function(overNode, iCateNo, depth) { // Add depth parameter
            if (!methods.aSubCategory[iCateNo] || methods.aSubCategory[iCateNo].length == 0) {
                return;
            }
            var $ul = $('<ul class="sub-category depth'+depth+'-category">'); // Add depth to class name
            $(methods.aSubCategory[iCateNo]).each(function() {
                var $li = $('<li><div class="item"><a href="'+this.link_product_list+'">'+this.name+'</a><button class="arrow"></button></div></li>'); // Create a new li element
                $ul.append($li); // Append li element to ul
                // Check if there are sub-sub-categories
                if (methods.aSubCategory[this.cate_no]) {
                    // Call show() recursively to display sub-sub-categories
                    methods.show($li, this.cate_no, depth + 1); // Increase depth by 1
                }
            });
            $(overNode).append($ul); // Append ul to overNode
            
            // Check if direct child <a> has a sibling with class depth2-category
            if ($(overNode).children('a').siblings('.depth2-category').length > 0) {
                $(overNode).children('a').addClass('more'); // Add 'more' class to direct child <a>
            }
        }
    };
    methods.get();
});
