//
//	_appear.js
//	Appearing of elements on page.
//
//	Created by Andrey Shpigunov on 15.12.2020.
//

// Sets the appeared class for elements that have appeared at least once in the viewport.
// And the visible class for elements that are in the viewport.

const appear = (function () {
	var _classIsAppeared = "is-appeared",
		_classAppeared = "appeared",
		_classVisible = "visible",
		items = document.querySelectorAll("." + _classIsAppeared);

	if (items.length) {
		var itemsHash = {};

		items.forEach((e, index) => {
			try {
				var item = {};

				item.element = e;
				item.classAppeared = _classAppeared;
				item.classVisible = _classVisible;
				itemsHash[index] = item;

				if (item.element.classList.contains(_classIsAppeared)) {
					item.element.classList.remove(_classIsAppeared);
				}
			} catch (err) {
				console.log(err);
			}
		});

		if (Object.keys(itemsHash).length) {
			_scroll(itemsHash);
			document.addEventListener("scroll", () => {
				_scroll(itemsHash);
			}, { passive: true });
		}
	}

	function _scroll(itemsHash) {
		Object.keys(itemsHash).forEach(i => {
			var item = itemsHash[i];
			var elementOffset = item.element.getBoundingClientRect();

			if (
				elementOffset.top < window.innerHeight &&
				elementOffset.bottom > 0
			) {
				if (item.classAppeared != null) {
					item.element.classList.add(item.classAppeared);
				}

				if (item.classVisible != null) {
					item.element.classList.add(item.classVisible);
				}
			} else {
				if (
					item.classVisible != null &&
					item.element.classList.contains(item.classVisible)
				) {
					item.element.classList.remove(item.classVisible);
				}
			}
		});
	}

	return null;
})();

export default appear;
