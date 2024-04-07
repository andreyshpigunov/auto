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
        this.items = null;
        this.classIsAppeared = "isAppeared";
        this.classAppeared = "appeared";
        this.classVisible = "visible";
        this.observer = null;
    }
    
    init() {
        this.items = document.querySelectorAll("." + this.classIsAppeared);
        if (this.items.length) {
            
            // Remove initial class 'classIsAppeared' on elements
            this.items.forEach((item, index) => {
                item.classList.remove(this.classIsAppeared);
            });
            
            // Observe items
            let observerCallback = (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (
                            this.classAppeared != null &&
                            !entry.target.classList.contains(this.classAppeared)
                        ) {
                            entry.target.classList.add(this.classAppeared);
                        }
                        if (this.classVisible != null) {
                            entry.target.classList.add(this.classVisible);
                        }
                    } else {
                        if (
                            this.classVisible != null &&
                            entry.target.classList.contains(this.classVisible)
                        ) {
                            entry.target.classList.remove(this.classVisible);
                        }
                    }
                });
            }
            this.observer = new IntersectionObserver(observerCallback);
            this.items.forEach((item) => this.observer.observe(item));
        }
    }
    
    update() {
        this.items.forEach((item) => this.observer.observe(item));
    }
}

const appear = new Appear();

export default appear;
