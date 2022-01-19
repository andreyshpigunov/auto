//
//  loadmore.js
//  auto
//
//  Created by andreyshpigunov on 25.05.2021.
//
//  Appeared element callback
//  Load callback when element appeared in viewport from bottom.
//
//  <div data-loadmore='{"functionName": "loadMore", "offset": "100"}'>...</div>
//  Callback function has paramenter "page":
//  function loadMore(page) { ... }
//
//  Stop watching:
//  loadmore.unwatch()
//


class Loadmore {
    constructor() {
        this.page = 1;
        this.offset = 0;
        this.watch = true;
        this.blocksHash = {};
    }

    init() {
        const blocks = document.querySelectorAll("[data-loadmore]");
        let item;
        
        if (blocks.length) {
            blocks.forEach((e, index) => {
                try {
                    if (this._isValidJSON(e.dataset.loadmore)) {
                        let json = JSON.parse(e.dataset.loadmore);
                        
                        if (json.hasOwnProperty("functionName")) {
                            item = {};
                            item.block = e;
                            item.offset = json.offset || this.offset;
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
                        this.blocksHash[name] = item;
                        e.removeAttribute("data-loadmore");
                    }
                } catch (err) {
                    console.error(err);
                }
            });
            
            if (Object.keys(this.blocksHash).length) {
                this._scrollObserve(this.blocksHash);
                document.addEventListener("scroll", () => {
                    this._scrollObserve(this.blocksHash);
                }, { passive: true });
            }
        }
    }
    
    _scrollObserve(blocksHash) {
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
                if (this.watch) {
                    if (typeof window[item.functionName] === "function") {
                        window[item.functionName](this.page);
                        this.page++;
                    }
                    this.watch = false;
                }
            } else {
                this.watch = true;
            }
        });
    }
    
    _isValidJSON(str) {
        try {
            JSON.parse(str);
            return true;
        } catch (err) {
            return false;
        }
    }
    
    unwatch(id) {
        delete this.blocksHash[id];
    }
}

const loadmore = new Loadmore();

export default loadmore;
