//
//	auto.js
//	A-a-a-a-uto-o-o-o
//
//	Created by Andrey Shpigunov on 14.12.2020.
//



import init from "../components/init/_init";
import adaptive from "../components/adaptive/_adaptive";
import device from "../components/device/_device";
import animate from "../components/animate/_animate";
import appear from "../components/appear/_appear";
import modal from "../components/modal/_modal";
import lazyload from "../components/lazyload/_lazyload";
import loadmore from "../components/loadmore/_loadmore";
import scroll from "../components/scroll/_scroll";
import * as url from "../components/url/_url";
import * as utils from "../components/utils/_utils";
import ajax from "../components/ajax/_ajax";
import polyfills from "../components/polyfills/_polyfills";
import Cookies from "js-cookie";

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
		loadmore: loadmore,
		cookies: Cookies,
	};
})();

export default auto;
