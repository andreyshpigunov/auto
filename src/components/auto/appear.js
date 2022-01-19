//
//  appear.js
//  auto
//
//  Created by andreyshpigunov on 25.05.2021.
//
//  Add class on appeared elements
//  Sets the "appeared" class for elements that have appeared at least once
//  in the viewport. And the "visible" class for elements in the viewport.
//


class Appear {
    
    constructor() {
        this.classIsAppeared = "is-appeared";
        this.classAppeared = "appeared";
        this.classVisible = "visible";
    }
    
    init() {
        let items = document.querySelectorAll("." + this.classIsAppeared);
        if (items.length) {
            let itemsHash = {};
            
            items.forEach((e, index) => {
                try {
                    let item = {};
                    
                    item.element = e;
                    item.classAppeared = this.classAppeared;
                    item.classVisible = this.classVisible;
                    itemsHash[index] = item;
                    
                    if (item.element.classList.contains(_classIsAppeared)) {
                        item.element.classList.remove(_classIsAppeared);
                    }
                } catch (err) {
                    console.log(err);
                }
            });
            
            if (Object.keys(itemsHash).length) {
                this._scroll(itemsHash);
                document.addEventListener("scroll", () => {
                    this._scroll(itemsHash);
                }, { passive: true });
            }
        }
    }
    
    _scroll(itemsHash) {
        Object.keys(itemsHash).forEach(i => {
            let item = itemsHash[i],
                elementOffset = item.element.getBoundingClientRect();
            
            if (
                elementOffset.top < window.innerHeight &&
                elementOffset.bottom > 0
            ) {
                if (item.classAppeared != null) {
                    item.element.classList.add(item.classAppeared);
                }
                
                if (item.classVisible != null) {
                    item.element.classList.add(item.classVisible);
                }
            } else {
                if (
                    item.classVisible != null &&
                    item.element.classList.contains(item.classVisible)
                ) {
                    item.element.classList.remove(item.classVisible);
                }
            }
        });
    }
}

const appear = new Appear();

export default appear;
