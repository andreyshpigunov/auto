//
//	_appear.js | Vanilla JS
//	Появление элемента во viewport
//
//	Copyright © 2019 Andrey Shpigunov. All right reserved.
//


// Устанавливает класс appeared для элементов, которые появились хоть раз во viewport.
// И класс visible для элементов, которые находятся во viewport.


const appear = function () {
  
  var
	  _classIsAppeared = 'is-appeared',
    _classAppeared = 'appeared',
    _classVisible = 'visible',
    items = document.querySelectorAll('.' + _classIsAppeared);
    
  if (items.length) {
    var itemsHash = {};
    
    items.forEach(function(e, index) {
      try {
        var item = {};
        
        item.Element = e;
        item.ClassAppeared = _classAppeared;
        item.ClassVisible = _classVisible;
        itemsHash[index] = item;
        
        if (item.Element.classList.contains(_classIsAppeared)) {
          item.Element.classList.remove(_classIsAppeared)
        }
      } catch (err) {
        console.log(err)
      }
    });
    
    if (Object.keys(itemsHash).length) {
      _scroll(itemsHash);
      document.addEventListener('scroll', function() {
        _scroll(itemsHash);
      })
    }
  }
  
  function _scroll(itemsHash) {
    Object.keys(itemsHash).forEach(function(i) {
      var item = itemsHash[i];
      var elementOffset = item.Element.getBoundingClientRect();
        
      if (elementOffset.top < window.innerHeight && elementOffset.bottom > 0) {
        if (item.ClassAppeared != null) {
          item.Element.classList.add(item.ClassAppeared);
        }
        
        if (item.ClassVisible != null) {
          item.Element.classList.add(item.ClassVisible);
        }
      } else {
        if (item.ClassVisible != null && item.Element.classList.contains(item.ClassVisible)) {
          item.Element.classList.remove(item.ClassVisible)
        }
      }
    })
  }
  
  return null;

}();


export default appear;

