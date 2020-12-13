//
//	_url.js | Vanilla JS
//	Работа с URL
//
//	Copyright © 2019 Andrey Shpigunov. All right reserved.
//

	
// Обновление страницы
export function reload() {
  location.reload()
}

// Обновление страницы с новым хешем
export function reloadWithHash(hash) {
  redirectTo(location.href.replace(location.hash, '#' + hash));
  reload()
}

// Переход по указанной ссылке
export function redirectTo(url) {
  window.location = url;
  return false
}

// Изменение title и url страницы без перезагрузки
// Можно добавить и просто хеш в конце: Base.url.updateURL('#ok')
export function updateURL(url, title) {
  if (typeof (history.pushState) != 'undefined') {
    history.pushState(null, title, url)
  } else {
    location.href = url
  }
}

export function changeURL(title, url) {
  updateURL(url, title)
}

