//
//	_loadmore.js
//	Load callback when element appeared in viewport from bottom
//
//	Created by Andrey Shpigunov on 16.12.2020.
//

// <div data-loadmore='{"functionName": "loadMore", "offset": "100"}'>...</div>
// Callback has paramenter 'page'
// loadMore(page) {...}

const loadmore = (function () {
	let blocks = document.querySelectorAll("[data-loadmore]");
	let _offset = 0;
	let page = 1;
	let watch = true;
	let blocksHash = {};
	let item;

	if (blocks.length) {
		blocks.forEach((e, index) => {
			try {
				if (_isValidJSON(e.dataset.loadmore)) {
					let json = JSON.parse(e.dataset.loadmore);

					if (json.hasOwnProperty("functionName")) {
						item = {};
						item.block = e;
						item.offset = json.offset || _offset;
						item.functionName = json.functionName;
					} else {
						console.log("functionName required in JSON " + json);
					}
				} else {
					console.log("Invalid JSON in data-loadmore");
				}

				if (item) {
					let name = e.hasAttribute("id")
						? e.getAttribute("id")
						: index;
					blocksHash[name] = item;
					e.removeAttribute("data-loadmore");
				}
			} catch (err) {
				console.error(err);
			}
		});

		if (Object.keys(blocksHash).length) {
			_scrollObserve(blocksHash);
			document.addEventListener("scroll", () => {
				_scrollObserve(blocksHash);
			});
		}
	}

	function _scrollObserve(blocksHash) {
		Object.keys(blocksHash).forEach(i => {
			let item = blocksHash[i];
			let functionName = item.functionName;
			let scrollPosition = parseInt(
				window.scrollY + document.documentElement.clientHeight
			);
			let scrollTarget = parseInt(
				item.block.offsetTop + item.Block.clientHeight - item.offset
			);

			if (scrollPosition >= scrollTarget) {
				if (watch) {
					if (typeof window[item.functionName] === "function") {
						window[item.functionName](page);
						page++;
					}
					watch = false;
				}
			} else {
				watch = true;
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

	function unwatch(id) {
		delete blocksHash[id];
	}

	return {
		unwatch: unwatch,
	};
})();

export default loadmore;
