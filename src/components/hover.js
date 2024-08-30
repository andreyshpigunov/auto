//
//  hover.js
//  auto
//
//  Created by andreyshpigunov on 25.05.2021.
//
//  Sync hover for identical links
//


class Hover {
    
    constructor() {
        
    }
    
    init() {
        let hovers = document.querySelectorAll(".syncHover");
        if (hovers.length) {
            hovers.forEach((elem, index) => {
                // Add listeners for all synced elements
                this._listener("mouseover", elem);
                this._listener("mouseout", elem);
            });
        }
    }
    
    // Add event listener on element
    _listener(event, elem) {
        elem.addEventListener(event, (e) => {
            let _selector = '[href="' + elem.getAttribute("href") + '"]',
                items = document.querySelectorAll(_selector);
            if (items.length) {
                items.forEach((i, index) => {
                    // Add .hover class on mouser over
                    // Remove .hover class on mouse out
                    if (event === "mouseover") {
                        i.classList.add("hover");
                    } else {
                        i.classList.remove("hover");
                    }
                });
            }
        });
    }
    
}

const hover = new Hover();

export default hover;
