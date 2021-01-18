//
//	_auto.js
//	A-a-a-a-uto-o-o-o
//
//	Created by Andrey Shpigunov on 14.12.2020.
//

import init from "./init/_init";
import adaptive from "./adaptive/_adaptive";
import device from "./device/_device";
import animate from "./animate/_animate";
import appear from "./appear/_appear";
import modal from "./modal/_modal";
import lazyload from "./lazyload/_lazyload";
import loadmore from "./loadmore/_loadmore";
import scroll from "./scroll/_scroll";
import * as url from "./url/_url";
import * as utils from "./utils/_utils";
import ajax from "./ajax/_ajax";
import polyfills from "./polyfills/_polyfills";

const auto = (function () {
	return {
		version: "1.0.0",
		adaptive: adaptive,
		device: device,
		modal: modal,
		scroll: scroll,
		scrollTo: scroll.scrollTo,
		url: url,
		utils: utils,
		ajax: ajax,
		loadmore: loadmore
	};
})();

window.auto = auto;

export default auto;
