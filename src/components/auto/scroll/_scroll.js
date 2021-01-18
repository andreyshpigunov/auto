//
//	_scroll.js
//	Page scroll
//
//	Created by Andrey Shpigunov on 16.12.2020.
//

// scroll.scrollTo()
// Scroll page to element ID.
// Automatically works on element with data-scroll.
// <div id="top">...</div>
// <a data-scrollto="top">Up</a>
// or
// <a data-scrollto='{"target": "top", "speed": "1000", "offset": "100", "classActive": "active"}'>Up</a>


const scroll = (() => {
	
	// Scroll direction

	let html = document.documentElement;
	let lastScrollPosition = 0,
		newScrollPosition,
		maxScrollPosition;

	window.onscroll = () => {
		newScrollPosition = window.scrollY;
		maxScrollPosition =
			document.body.scrollHeight - document.documentElement.clientHeight;

		if (newScrollPosition < lastScrollPosition) {
			if (newScrollPosition < maxScrollPosition) {
				html.classList.remove("scroll-down");
				html.classList.add("scroll-up");
			}
		} else {
			if (newScrollPosition > 0) {
				html.classList.remove("scroll-up");
				html.classList.add("scroll-down");
			}
		}
		lastScrollPosition = newScrollPosition;
	};

	// Page scroll

	var links = document.querySelectorAll("[data-scrollto]"),
		_speed = 500,
		_offset = 0,
		_classActive = "active";

	if (links.length) {
		var linksHash = {};

		links.forEach((e, index) => {
			try {
				if (_isValidJSON(e.dataset.scrollto)) {
					var json = JSON.parse(e.dataset.scrollto);
					if (
						json.hasOwnProperty("target") &&
						document.getElementById(json.target)
					) {
						var item = {};

						item.link = e;
						item.target = document.getElementById(json.target);
						item.speed = json.speed || _speed;
						item.offset = json.offset || _offset;
						item.classActive = json.classActive || _classActive;
					} else {
						console.log(
							"Target required in JSON " +
								json +
								" or element not exist."
						);
					}
				} else {
					if (document.getElementById(e.dataset.scrollto)) {
						var item = {};

						item.link = e;
						item.target = document.getElementById(
							e.dataset.scrollto
						);
						item.speed = _speed;
						item.offset = _offset;
						item.classActive = _classActive;
					} else {
						console.log(
							"Target '" + e.dataset.scrollto + "' not exist."
						);
					}
				}

				if (item) {
					linksHash[index] = item;
					e.removeAttribute("data-scrollto");
					e.addEventListener("click", event => {
						event.preventDefault();
						scrollTo(item.target, item.offset, item.speed);
					});
				}
			} catch (err) {
				console.error(err);
			}
		});

		if (Object.keys(linksHash).length) {
			_scrollObserve(linksHash);
			document.addEventListener("scroll", () => {
				_scrollObserve(linksHash);
			}, { passive: true });
		}
	}

	function scrollTo(target, offset, speed) {
		var speed = speed || _speed,
			offset = offset || _offset,
			startingY = window.pageYOffset,
			elementY = window.pageYOffset + target.getBoundingClientRect().top,
			targetY =
				document.body.scrollHeight - elementY < window.innerHeight
					? document.body.scrollHeight - window.innerHeight
					: elementY,
			diff = targetY - startingY;

		var easeInOutCubic = t => {
			return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
		};

		var start;
		if (!diff) return;

		window.requestAnimationFrame(function step(timestamp) {
			if (!start) start = timestamp;
			var time = timestamp - start;
			// Scroll progress percent (0..1)
			var percent = speed > 0 ? Math.min(time / speed, 1) : 1;
			percent = easeInOutCubic(percent);
			window.scrollTo(0, startingY + (diff - offset) * percent);
			if (time < speed) {
				window.requestAnimationFrame(step);
			}
		});
	}

	function _scrollObserve(linksHash) {
		Object.keys(linksHash).forEach(i => {
			let item = linksHash[i],
				targetOffset = item.target.getBoundingClientRect(),
				speed = item.speed,
				offset = item.offset;
			
			if (
				targetOffset.top <= offset + 5 &&
				targetOffset.bottom > offset + 5
			) {
				if (item.classActive != null) {
					item.link.classList.add(item.classActive);
				}
			} else {
				if (
					item.classActive != null &&
					item.link.classList.contains(item.classActive)
				) {
					item.link.classList.remove(item.classActive);
				}
			}
		});
	}

	function _isValidJSON(str) {
		try {
			JSON.parse(str);
			return true;
		} catch (err) {
			return false;
		}
	}

	return {
		scrollTo: scrollTo,
	};
})();

export default scroll;
