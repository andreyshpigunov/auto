//
//  scroll.js
//  auto
//
//  Created by andreyshpigunov on 25.05.2021.
//
//  Scroll page to element ID
//  Automatically works on element with data-scroll:
//  <div id="top">...</div>
//  <a data-scrollto="top">Up</a>
//  or
//  <a data-scrollto='
//    {
//      "target": "top",
//      "speed": "1000",
//      "offset": "100",
//      "classActive": "active"
//    }
//  '>Up</a>
//
//  API call:
//  this.to()        new method
//  this.scrollTo()  old method


class Scroll {
    
    constructor() {
        this.speed = 500;
        this.offset = 0;
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
                            json.hasOwnProperty("target") &&
                            document.getElementById(json.target)
                        ) {
                            item.link = e;
                            item.target = document.getElementById(json.target);
                            item.speed = json.speed || this.speed;
                            item.offset = json.offset || this.offset;
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
                            item.speed = this.speed;
                            item.offset = this.offset;
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
                            this.scrollTo(item.target, item.offset, item.speed);
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
    
    scrollTo(target, offset, speed) {
        if (typeof target === "string") {
            target = document.querySelector(target);
        }
        speed = speed || this.speed;
        offset = offset || this.offset;
        
        let startingY = window.pageYOffset,
            elementY = window.pageYOffset + target.getBoundingClientRect().top,
            targetY =
                document.body.scrollHeight - elementY < window.innerHeight ?
                document.body.scrollHeight - window.innerHeight :
                elementY,
            diff = targetY - startingY;
            
        let easeInOutCubic = (t) => {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        };
        
        let start;
        if (!diff) return;
        
        window.requestAnimationFrame(function step(timestamp) {
            if (!start) start = timestamp;
            let time = timestamp - start;
            // Scroll progress percent (0..1)
            let percent = speed > 0 ? Math.min(time / speed, 1) : 1;
            percent = easeInOutCubic(percent);
            window.scrollTo(0, startingY + (diff - offset) * percent);
            if (time < speed) {
                window.requestAnimationFrame(step);
            }
        });
    }
    
    _scrollObserve(linksHash) {
        Object.keys(linksHash).forEach((i) => {
            let item = linksHash[i],
                targetOffset = item.target.getBoundingClientRect(),
                speed = item.speed,
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