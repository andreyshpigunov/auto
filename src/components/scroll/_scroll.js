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


const scroll = (function () {
	
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
						json.hasOwnProperty("Target") &&
						document.getElementById(json.Target)
					) {
						var item = {};

						item.Link = e;
						item.Target = document.getElementById(json.Target);
						item.Speed = json.Speed || _speed;
						item.Offset = json.Offset || _offset;
						item.ClassActive = json.ClassActive || _classActive;
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

						item.Link = e;
						item.Target = document.getElementById(
							e.dataset.scrollto
						);
						item.Speed = _speed;
						item.Offset = _offset;
						item.ClassActive = _classActive;
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
						scrollTo(item.Target, item.Offset, item.Speed);
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
			});
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
			var item = linksHash[i],
				targetOffset = item.Target.getBoundingClientRect(),
				speed = item.Speed,
				offset = item.Offset;

			if (
				targetOffset.top <= offset + 5 &&
				targetOffset.bottom > offset + 5
			) {
				if (item.ClassActive != null) {
					item.Link.classList.add(item.ClassActive);
				}
			} else {
				if (
					item.ClassActive != null &&
					item.Link.classList.contains(item.ClassActive)
				) {
					item.Link.classList.remove(item.ClassActive);
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
