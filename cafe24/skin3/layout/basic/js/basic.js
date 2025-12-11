/**
 * hasClass
 */
function hasClass(element, className){
    return (' ' + element.className + ' ').indexOf(' ' + className+ ' ') > -1;
};

/**
 *  toggle
 */
function toggleClassAll(element, handler, className){
    var _handler = document.querySelector(handler);
    document.querySelectorAll(handler).forEach(function(item){
        item.addEventListener('click', function(){
            var _element = item.parentNode;
            if ( hasClass( _element, className ) ) {
                _element.classList.remove( className );
            } else {
                _element.classList.add( className );
            }
        })
    })
};

/**
 *  findElements
 */
function findElements(element, findElement){
    var resultElements = [];
    document.querySelectorAll(element).forEach(function(item){
        var findElementList = item.querySelectorAll(findElement);
        findElementList = Array.prototype.slice.call(findElementList);
        resultElements = resultElements.concat(findElementList);
    })
    return resultElements;
};

/**
 *  setAttributeAl
 */
function setAttributeAll(elements, name, value){
    elements.forEach(function(item){
        item.setAttribute(name, value);
    })
};

/**
 *  상품 섬네일 로드되지 않을 경우, 기본값 설정
 */
function setDefaultImage(element) {
    document.querySelectorAll(element).forEach(function(item){
        var $img = new Image();
        $img.onerror = function () {
            item.src="//img.echosting.cafe24.com/thumb/img_product_big.gif";
        }
        $img.src = item.src;
    });
};

/**
 *  tooltip
 */
function setTooltipEvent(){
    var input = findElements('.eTooltip', 'input');
    input.forEach(function(item){
        item.addEventListener('focusin', function(event){
            var targetName = returnTargetName(event.target);
            targetName.nextElementSibling.style.display = 'block'
        });
        item.addEventListener('focusout', function(event){
            var targetName = returnTargetName(event.target);
            targetName.nextElementSibling.style.display = 'none'
        });
    });
}

/**
 *  tooltip input focus
 */
function returnTargetName(_this){
    var ePlacename = _this.parentElement.getAttribute("class");
    var targetName;
    if(ePlacename == "ePlaceholder"){ //ePlaceholder supported
        targetName = _this.parentElement;
    }else{
        targetName = _this;
    }
    return targetName;
}

/**
 * window load
 */
window.addEventListener('load', function(){
    if (document.querySelector('.thumbnail')){
        setDefaultImage('.thumbnail img');
    }
    if (document.querySelector('.eTooltip')){
        setAttributeAll(findElements('.eTooltip', '.btnClose'),'tabIndex','-1');
        setTooltipEvent();
    }
    if (document.querySelector('div.eToggle')){
        toggleClassAll(false, 'div.eToggle .title', 'selected');
    }
}); 


$('.prd-list .soldout,.prdList__item .soldout').each(function(){                 
    if($(this).children('img').length) {
         $(this).html("<span>SOLD OUT</span>");
     }else{
        $(this).remove();
     }    
 });


 const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        // 추가된 노드 중 .soldout을 찾음
        mutation.addedNodes.forEach((node) => {
            if ($(node).hasClass('soldout')) {
                if ($(node).children('img').length) {
                    $(node).html("<span>SOLD OUT</span>");
                } else {
                    $(node).remove();
                }
            }

            // 만약 추가된 노드에 자식이 있을 경우를 처리
            $(node).find('.soldout').each(function () {
                if ($(this).children('img').length) {
                    $(this).html("<span>SOLD OUT</span>");
                } else {
                    $(this).remove();
                }
            });
        });
    });
});

// 관찰할 대상 설정
const targetNode = document.querySelector('.ec-base-product');
if (targetNode) {
    observer.observe(targetNode, {
        childList: true, // 자식 노드의 추가/삭제 관찰
        subtree: true, // 하위 트리도 관찰
    });
}



 $('.board-wrapper.faq .link').click(function(e){
    e.preventDefault();

    $(this).siblings('.content').toggleClass('on')


 })