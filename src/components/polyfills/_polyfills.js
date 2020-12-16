//
//	_polyfills.js
//	Polyfills for IE
//
//	Created by Andrey Shpigunov on 16.12.2020.
//

// CustomEvent для IE 9-11

const polyfills = (function () {
	try {
		new CustomEvent("IE has CustomEvent, but doesn't support constructor");
	} catch (e) {
		window.CustomEvent = function (event, params) {
			var evt,
				params = params || {
					bubbles: false,
					cancelable: false,
					detail: undefined,
				};

			evt = document.createEvent("CustomEvent");
			evt.initCustomEvent(
				event,
				params.bubbles,
				params.cancelable,
				params.detail
			);
			return evt;
		};
		CustomEvent.prototype = Object.create(window.Event.prototype);
	}
})();

export default polyfills;
