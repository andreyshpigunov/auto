//
//	_lazyload.js | Vanilla JS
//	Загрузка изображений при их появлении в viewport
//  Полноценно работает только в современных браузерах.
//  Если IntersectionObserver не поддерживается, срабатывает фоллбэк.
//	
//	Copyright © 2019 Andrey Shpigunov. All right reserved.
//


const lazyload = function () {
  
  if (!('IntersectionObserver' in window)) {
    
    const images = document.querySelectorAll('.lazyload');
    images.forEach(function(img) {
      const srcset = img.dataset.srcset;
      const src = img.dataset.src;
      if (srcset) { img.srcset = srcset }
      if (src) { img.src = src }
      if (srcset || src) { img.className += ' loaded' }
      img.className += ' loaded';
    })
    
  } else {
    
    const images = document.querySelectorAll('.lazyload');
    const options = {
      root: null,
      rootMargin: '25% 0px',
      threshold: 0.1
    };
    
    const fetchImage = function (src, srcset) {
      return new Promise(function(resolve, reject) {
        const image = new Image();
        if (srcset) { image.srcset = srcset }
        if (src) { image.src = src }
        image.onload = resolve;
        image.onerror = reject;
      });
    }
    
    const loadImage = function (img) {
      const srcset = img.dataset.srcset;
      const src = img.dataset.src;
      fetchImage(src, srcset).then(function() {
        if (srcset) {
          img.srcset = srcset;
          img.removeAttribute('data-srcset');
        }
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
        }
        if (srcset || src) {
          img.className += ' loaded';
        }
      })
		.catch(function() {
			return false
		})
    }
    
    const handleIntersection = function (entries, observer) {
      entries.forEach(function(entry) {
        if (entry.intersectionRatio > 0) {
          loadImage(entry.target);
          observer.unobserve(entry.target);
        }
      })
    }
    
    const observer = new IntersectionObserver(handleIntersection, options);
    images.forEach(function(img) {
      observer.observe(img);
    })
  }
  
  return null;

}();


export default lazyload;

