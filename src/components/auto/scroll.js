//
//  scroll.js
//  auto
//
//  Created by andreyshpigunov on 25.05.2021.
//
//  Scroll page to element id.
//  Automatically works on element with data-scroll:
//  <div id="top">...</div>
//  <a data-scrollto="top">Up</a>
//  or
//  <a data-scrollto='
//    {
//      "parent": "#id or .class selector" — default "window"
//      "targetId": "top",
//      "duration": "400",
//      "offset": "0",
//      "classActive": "active"
//    }
//  '>Up</a>
//
//  API call:
//  this.scrollTo() — old method
//  this.to(target, offset = 0, duration = 400, parent) — new method
//  target — element id or element
//  offset — top offset
//  duration — scroll duration
//  parent — parent selector (not element!)


class Scroll {
    
    constructor() {
        this.offset = 0;
        this.duration = 400;
        this.classActive = "active";
        this.to = this.scrollTo;
    }
    
    init() {
        let links = document.querySelectorAll("[data-scrollto]");
        
        if (links.length) {
            let linksHash = {};
            
            links.forEach((e, index) => {
                try {
                    let item = {};
                    
                    if (this._isValidJSON(e.dataset.scrollto)) {
                        let json = JSON.parse(e.dataset.scrollto);
                        if (
                            json.hasOwnProperty("targetId") &&
                            document.getElementById(json.targetId)
                        ) {
                            item.link = e;
                            item.target = document.getElementById(json.targetId);
                            item.duration = json.duration || this.duration;
                            item.offset = json.offset || this.offset;
                            item.parent = json.parent || null;
                            item.classActive = json.classActive || this.classActive;
                        } else {
                            console.log(
                                "Target required in JSON " + json +
                                " or element not exist."
                            );
                        }
                    } else {
                        if (document.getElementById(e.dataset.scrollto)) {
                            item.link = e;
                            item.target = document.getElementById(e.dataset.scrollto);
                            item.duration = this.duration;
                            item.offset = this.offset;
                            item.parent = null;
                            item.classActive = this.classActive;
                        } else {
                            console.log(
                                "Target '" + e.dataset.scrollto + "' not exist."
                            );
                        }
                    }
                    
                    if (item) {
                        linksHash[index] = item;
                        e.removeAttribute("data-scrollto");
                        e.addEventListener("click", (event) => {
                            event.preventDefault();
                            this.scrollTo(item.target, item.offset, item.duration, item.parent);
                        });
                    }
                } catch (err) {
                    console.error(err);
                }
            });
            
            if (Object.keys(linksHash).length) {
                this._scrollObserve(linksHash);
                document.addEventListener("scroll", () => {
                    this._scrollObserve(linksHash);
                }, { passive: true });
            }
        }
    }
    
    scrollTo(target, offset, duration, parent) {
        return new Promise((resolve, reject) => {
            if (typeof target === "string") {
                target = document.getElementById(target);
            }
            offset = offset || this.offset;
            duration = duration || this.duration;
            parent = document.querySelector(parent) || window;
            
            let elementY, startingY, targetY, parentY, diff;
            
            if (parent == window) {
                // Page scroll offset value
                startingY = parent.pageYOffset;
                // Distance to target element, from page top
                elementY = parent.pageYOffset + target.getBoundingClientRect().top;
                diff = elementY - startingY - offset;
            } else {
                // Code for not window object (scrollable div and others)
                startingY = parent.scrollTop;
                parentY = parent.getBoundingClientRect().top;
                elementY = parent.scrollTop + target.getBoundingClientRect().top - parentY;
                diff = elementY - startingY - offset;
            }
            
            let easeInOutCubic = (t) => {
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            };
            
            let start;
            if (!diff) return;
            
            window.requestAnimationFrame(function step(timestamp) {
                if (!start) start = timestamp;
                let time = timestamp - start;
                // Scroll progress (0..1)
                let progress = duration > 0 ? Math.min(time / duration, 1) : 1;
                progress = easeInOutCubic(progress);
                parent.scrollTo(0, startingY + diff * progress);
                if (time < duration) {
                    window.requestAnimationFrame(step);
                } else {
                    resolve();
                }
            })
        })
    }
    
    _scrollObserve(linksHash) {
        Object.keys(linksHash).forEach((i) => {
            let item = linksHash[i],
                targetOffset = item.target.getBoundingClientRect(),
                duration = item.duration,
                offset = item.offset;
                
            if (
                targetOffset.top <= offset + 5 &&
                targetOffset.bottom > offset + 5
            ) {
                if (item.classActive != null) {
                    item.link.classList.add(item.classActive);
                }
            } else {
                if (
                    item.classActive != null &&
                    item.link.classList.contains(item.classActive)
                ) {
                    item.link.classList.remove(item.classActive);
                }
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
}

const scroll = new Scroll();

export default scroll;
