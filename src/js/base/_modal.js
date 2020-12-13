//
//	_modal.js | Vanilla JS
//	Модальное окно
//
//	Copyright © 2019 Andrey Shpigunov. All right reserved.
//


// Использование:
// <a data-modal="my-modal">Модальное окно</a>
//
//	<div id="my-modal" class="modal-content [custom-classes]">
//		<div class="text">
//			<p>Hello modal!</p>
//			<p><a class="button modal-close">Close</a></p>
//		</div>
//	</div>
//
//	<script>
//		var modal = document.getElementById('modal-test');
//		modal.addEventListener('modal:ready', function (event) { ... });
//		modal.addEventListener('modal:open', function (event) { ... });
//		modal.addEventListener('modal:close', function (event) { ... });
//	</script>


import * as adaptive from './_adaptive';
import device from './_device';


const modal = function () {
	
	// Инициализируем окна
	let modalContents = document.querySelectorAll('.modal-content');
  let modalLevel = 0;
  let scrollPosition = 0;
  let cp;
  
  if (modalContents.length) {
    modalContents.forEach(function(e, index) {
      let html;
      let here = document.querySelector('.modal-here');
      let placeholder = document.querySelector('body');
      
      if (here) placeholder = here;
      html =
      '<div id="' + e.getAttribute('id') + '" class="modal ' + e.getAttribute('class').replace('modal-content', '') + '">' +
        '<div class="modal-overlay"></div>' +
        '<div class="modal-outer">' +
          '<div class="modal-inner">' +
            '<div class="modal-window">' +
              '<a class="modal-close"></a>' +
              e.innerHTML +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
      
      placeholder.insertAdjacentHTML('beforeend', html);
      e.remove();
    })
  }
  
  let modalLinks = document.querySelectorAll('[data-modal]');
  if (modalLinks.length) {
    modalLinks.forEach(function(e, index) {
      e.addEventListener('click', function(event) {
        event.preventDefault();
        show(e.dataset.modal);
      })
    })
  }
  
  document.addEventListener('click', function(event) {
    let modalActive = document.querySelector('.modal.active');
    if (modalActive && event.target.matches('.modal.active, .modal.active *') && (event.target.classList.contains('modal-close') || event.target.classList.contains('modal-custom-close') || !event.target.matches('.modal-window, .modal-window *'))) {
      event.preventDefault();
      hide(event.target.closest('.modal').getAttribute('id'));
    }
  });
  
  document.addEventListener('keydown', function(event) {
    let modalsActive = document.querySelectorAll('.modal.active');
    let modalActive = modalsActive[modalsActive.length - 1];
    if (modalActive && event.keyCode == 27) { /* Esc */
      event.preventDefault();
      hide(modalActive.getAttribute('id'));
    }
  });
  
  let eventReady = new CustomEvent('modal:ready');
  let eventOpen = new CustomEvent('modal:open');
  let eventClose = new CustomEvent('modal:close');
  
  
	// Показываем нужное окно
  function show(id) {
    let html = document.documentElement;
    let modal = document.getElementById(id);
    
    if (
//		!html.classList.contains('modal-active') && 
		  modal
		) {
      let activeModals = document.querySelectorAll('.modal.active');
      let timeout = 0;
						
//		if (activeModals.length) {
//			activeModals.forEach(function (e, index) {
//				hide(e.getAttribute('id'));
//			});
//			timeout = 400;
//		}
			
			setTimeout(function() {
        _closerPosition(id);
        window.addEventListener('resize', cp = function (event) { _closerPosition(id) });
        html.classList.add('modal-active');
        html.classList.add(id + '-active');
        modal.dispatchEvent(eventReady);
        modalLevel++;
        modal.classList.add('top', 'active', 'level-' + modalLevel);
        setTimeout(function() { modal.dispatchEvent(eventOpen) }, 400);
        
        if (device.iphone || device.ipad || device.android) {
          scrollPosition = window.scrollY;
          document.body.style.position = 'fixed';
          document.body.style.top = '-' + scrollPosition + 'px';
        }
      }, timeout)
    }
  }
  
	// Скрываем нужное окно
  function hide(id) {
    let modal = document.getElementById(id);
    window.removeEventListener('resize', cp);
    modal.classList.remove('active');
    
    setTimeout(function() {
      document.documentElement.classList.remove(id + '-active');
      modal.classList.remove('top', 'level-' + modalLevel);
      modalLevel--;
      if (modalLevel == 0) document.documentElement.classList.remove('modal-active');
      modal.dispatchEvent(eventClose);
    }, 400);
    
    if (device.iphone || device.ipad || device.android) {
      document.body.style.position = null;
      document.body.style.top = null;
      window.scrollTo(0, scrollPosition);
    }
  }
  
	// Перемещаем крестик в зависимости от размера окна, чтобы фиксировать его на маленьком экране
	// Простое применение fixed в блок с transform не срабатывает (особенность transform)
  function _closerPosition(id) {
    let modal = document.getElementById(id);
    let closer;
    
    if (
      adaptive.small() &&
      modal.querySelector('.modal-window').scrollHeight >= window.innerHeight
    ) {
      closer = document.querySelector('#' + id + ' .modal-window .modal-close');
      if (closer) modal.appendChild(closer);
    } else {
      closer = document.querySelector('#' + id + ' > .modal-close');
      if (closer) document.querySelector('#' + id + ' .modal-window').appendChild(closer);
    }
  }
  
  return {
    show: show,
    hide: hide
  }

}();


export default modal;

