//
//	_url.js
//	Work with URL
//
//	Created by Andrey Shpigunov on 18.12.2020.
//
	
// Reload page
export function reload() {
  location.reload()
}

// Reload page with new hash
export function reloadWithHash(hash) {
  redirectTo(location.href.replace(location.hash, '#' + hash));
  reload()
}

// Redirect to link
export function redirectTo(url) {
  window.location = url;
  return false
}

// Update title and page url without reload
// Or you can add only hash: auto.url.updateURL('#ok')
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

