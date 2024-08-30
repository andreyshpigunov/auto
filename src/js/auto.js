//
//  _auto.js
//  auto
//
//  Created by andreyshpigunov on 25.05.2021.
//
//  CSS & JS small library for using at the heart of the website
//


import hover from "../components/hover";
import lazyload from "../components/lazyload";
import animate from "../components/animate";
import appear from "../components/appear";
import loadmore from "../components/loadmore";
import device from "../components/device";
import modal from "../components/modal";
import sheets from "../components/sheets";
import scroll from "../components/scroll";
import lib from "../components/lib";
import form from "../components/form";


class Auto {
    
    constructor() {
        this.modal = modal;
        this.animate = animate;
        this.appear = appear;
        this.lazyload = lazyload;
        this.loadmore = loadmore;
        this.sheets = sheets;
        this.scroll = scroll;
        this.hover = hover;
        this.device = device;
        this.lib = lib;
        this.form = form;
        
        this.initialized = false;
    }
    
    init() {
        if (!this.initialized) {
            this.modal.init();
            this.animate.init();
            this.appear.init();
            this.lazyload.init();
            this.loadmore.init();
            this.sheets.init();
            this.scroll.init();
            this.hover.init();
            this.initialized = true;
        }
    }
    
};

const auto = new Auto();

// Shorthands
window.qs = auto.lib.qs;
window.qsa = auto.lib.qsa;

// Globally share auto
window.auto = auto;
