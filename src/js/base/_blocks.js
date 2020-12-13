//
//	_blocks.js | Vanilla JS
// Функции блоков
//
//	Copyright © 2019 Andrey Shpigunov. All right reserved.
//


// Блоки с автоматической шириной
// Нужно добавить к группе с блоками класс 'blocks-flex' (или 'inline-blocks-flex' для инлайновых блоков)


const blocks = function () {
  
  var blocks = document.querySelectorAll('.blocks.blocks-flex, .inline-blocks.inline-blocks-flex');
  
  if (blocks.length) {
    blocks.forEach(function(e, index) {
      if (e.children.length) {
        var item = {};
        
        item.blocks = e;
        item.width = item.blocks.firstElementChild.offsetWidth || 200;
        item.rows = e.getAttribute('data-rows') || 9999;
        
        _resize(item);
        window.addEventListener('resize', function(event) {
          _resize(item);
        });
        
        e.removeAttribute('data-rows');
      }
    })
  }
  
  function _resize(item) {
    var count = Math.floor(item.blocks.clientWidth / item.width);
    var max = count * item.rows;
    var children = item.blocks.children;
    
    if (count == 0) count = 1;
    if (max < item.rows) max = item.rows;
    
    if (children.length) {
      Object.keys(children).forEach(function(i) {
        if (i < max) {
          children[i].style.width = (100 / count) + '%';
          children[i].classList.remove('hidden');
        } else {
          children[i].classList.add('hidden');
        }
      })
    }
  }
  
  return null;

}();


export default blocks;

