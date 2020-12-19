//
//	_init.js
//	Init functions
//
//	Created by Andrey Shpigunov on 15.12.2020.
//

const init = (function () {
	var html = document.documentElement;

	// Page loading status in <html> tag
	var checkLoading = setInterval(function () {
		if (document.readyState === "complete") {
			clearInterval(checkLoading);
			html.classList.remove("loading");
			html.classList.add("loaded");
		} else {
			html.classList.add("loading");
		}
	}, 100);

	// Removing the underline of links with pictures
	var links = document.querySelectorAll(
		"a:not(.border) > img, a:not(.no-border) > img"
	);
	if (links.length) {
		links.forEach(function (e, index) {
			e.parentElement.classList.add("no-border");
		});
	}

	// Duplicate hover for identical links
	var doublehovers = document.querySelectorAll(".sync-hover, .double-hover");
	if (doublehovers.length) {
		doublehovers.forEach(function (e, index) {
			try {
				e.addEventListener("mouseover", function (event) {
					let items = document.querySelectorAll(
						'[href="' + e.getAttribute("href") + '"]'
					);
					if (items.length) {
						items.forEach(function (i, index) {
							i.classList.add("hover");
						});
					}
				});
				e.addEventListener("mouseout", function (event) {
					let items = document.querySelectorAll(
						'[href="' + e.getAttribute("href") + '"]'
					);
					if (items.length) {
						items.forEach(function (i, index) {
							i.classList.remove("hover");
						});
					}
				});
			} catch (err) {
				console.error(err);
			}
		});
	}

	return null;
})();
export default init;
