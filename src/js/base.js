//
//	base.js
//	Библиотека Base
//
//	Copyright © 2020 Andrey Shpigunov. All right reserved.
//


import init from "./base/_init";
import * as adaptive from "./base/_adaptive";
import device from "./base/_device";
import blocks from "./base/_blocks";
import animate from "./base/_animate";
import appear from "./base/_appear";
import modal from "./base/_modal";
import lazyload from "./base/_lazyload";
import loadmore from "./base/_loadmore";
import scroll from "./base/_scroll";
import * as url from "./base/_url";
import * as utils from "./base/_utils";
import ajax from "./base/_ajax";
import polyfills from "./base/_polyfills";
import Cookies from "js-cookie";

const Base = (function () {
	return {
		version: "1.0.0",
		adaptive: adaptive,
		device: device,
		modal: modal,
		scrollTo: scroll.scrollTo,
		url: url,
		utils: utils,
		ajax: ajax,
		loadmore: loadmore,
		cookies: Cookies,
	};
})();

export default Base;
