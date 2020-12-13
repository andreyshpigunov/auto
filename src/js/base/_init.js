//
//	_init.js | Vanilla JS
//	Функции, которые запускаются первыми при загрузке
//
//	Copyright © 2019 Andrey Shpigunov. All right reserved.
//


const init = function () {
	var html = document.documentElement;
	
	// Статус загрузки страницы в теге html
	// ====================================
	var checkLoading = setInterval(function() {
		if (document.readyState === 'complete') {
			clearInterval(checkLoading);
			html.classList.remove('loading');
			html.classList.add('loaded');
		} else {
			html.classList.add('loading');
		}
	}, 100);
	
	
	// Убираем подчеркивание ссылок с картинками
	// =========================================
	var links = document.querySelectorAll('a:not(.border) > img, a:not(.no-border) > img');
	if (links.length) {
		links.forEach(function(e, index) {
			e.parentElement.classList.add('no-border');
		})
	}
	
	
	// Дублирование hover для одинаковых ссылок
	// ========================================
	var doublehovers = document.querySelectorAll('.sync-hover, .double-hover');
	if (doublehovers.length) {
		doublehovers.forEach(function(e, index) {
			try {
				e.addEventListener('mouseover', function(event) {
					let items = document.querySelectorAll('[href="' + e.getAttribute('href') + '"]');
					if (items.length) {
						items.forEach(function(i, index) {
							i.classList.add('hover')
						})
					}
				});
				e.addEventListener('mouseout', function(event) {
					let items = document.querySelectorAll('[href="' + e.getAttribute('href') + '"]');
					if (items.length) {
						items.forEach(function(i, index) {
							i.classList.remove('hover')
						})
					}
				});
			} catch (err) {
				console.error(err)
			}
		});
	}
	
	return null;
}

();
export default init;
	
	
