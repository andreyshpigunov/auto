//
//  _auto.js
//  auto
//
//  Created by andreyshpigunov on 25.05.2021.
//
//  CSS & JS small library for using at the heart of the website
//


import hover from "../components/auto/hover";
import lazyload from "../components/auto/lazyload";
import animate from "../components/auto/animate";
import appear from "../components/auto/appear";
import loadmore from "../components/auto/loadmore";
import device from "../components/auto/device";
import scroll from "../components/auto/scroll";
import sheets from "../components/auto/sheets";
import modal from "../components/auto/modal";
import lib from "../components/auto/lib";

const auto = {
    loadmore: loadmore,
    device: device,
    scroll: scroll,
    sheets: sheets,
    modal: modal,
    lib: lib,
    
    init() {
        animate.init();
        appear.init();
        lazyload.init();
        loadmore.init();
        scroll.init();
        sheets.init();
        modal.init();
        hover.init();
    }
};

// Shorthands
window.qs = auto.lib.qs;
window.qsa = auto.lib.qsa;

// Export auto
window.auto = auto;
export default auto;
