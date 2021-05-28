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
import modal from "../components/auto/modal";
import ajax from "../components/auto/ajax";
import lib from "../components/auto/lib";

const auto = {
    loadmore: loadmore,
    device: device,
    scroll: scroll,
    modal: modal,
    ajax: ajax,
    lib: lib,
    
    init() {
        animate.init();
        appear.init();
        lazyload.init();
        loadmore.init();
        scroll.init();
        modal.init();
        hover.init();
    }
};

window.auto = auto;
export default auto;
