//
//  lib.js
//  auto
//
//  Created by andreyshpigunov on 25.05.2021.
//
//  Functions library
//


const lib = {
    
    // Shorthands
    qs: (s, o = document) => o.querySelector(s),
    qsa: (s, o = document) => o.querySelectorAll(s),
    
    // Reload page
    reload() {
        location.reload()
    },
    
    // Reload page with new hash
    reloadWithHash(hash) {
        redirectTo(location.href.replace(location.hash, '#' + hash));
        reload()
    },
    
    // Redirect to url
    redirectTo(url) {
        window.location = url;
        return false
    },
    
    // Update title and page url without reload
    // You can add only hash: lib.updateURL('#ok').
    updateURL(url, title) {
        if (typeof(history.pushState) != 'undefined') {
            history.pushState(null, title, url)
        } else {
            location.href = url
        }
    },
    
    // Random number
    random(a, b) {
        return Math.floor(Math.random() * (b - a + 1)) + a;
    },
    
    // Price format 9 999 999,99
    price(price) {
        let p = parseFloat(price);
        return p
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, "$& ")
            .replace(".", ",");
    },
    
    // Number format
    numberFormat(a) {
        a += "";
        let x = a.split("."),
            x1 = x[0],
            x2 = x.length > 1 ? "." + x[1] : "";
        for (let b = /(\d+)(\d{3})/; b.test(x1);) x1 = x1.replace(b, "$1 $2");
        return x1 + x2;
    },
    
    // Number decline
    numberDecline(a, b, c, d) {
        let e = "";
        if (a > 10 && 1 == parseInt((a % 100) / 10)) {
            e = b;
        } else {
            switch (a % 10) {
                case 1:
                    e = b;
                    break;
                case 2:
                case 3:
                case 4:
                    e = c;
                    break;
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 0:
                    e = d;
            }
        }
        return e;
    },
    
    // Add activeClass after readyClass in two steps, with delay
    addClass(
        element,
        readyClass = "ready",
        activeClass = "active",
        delay = 50
    ) {
        // If element value is html element or query selector
        let item = typeof element == "string" ?
                   document.querySelector(element) :
                   element;
        if (
            item &&
            !item.classList.contains(readyClass) &&
            !item.classList.contains(activeClass)
        ) {
            item.classList.add(readyClass);
            setTimeout(() => {
                item.classList.add(activeClass);
            }, delay);
        }
    },
    
    // Remove activeClass before removing readyClass in two steps, with delay
    removeClass(
        element,
        readyClass = "ready",
        activeClass = "active",
        delay = 200
    ) {
        // If element value is html element or query selector
        let item = typeof element == "string" ?
                   document.querySelector(element) :
                   element;
        if (
            item &&
            item.classList.contains(readyClass) &&
            item.classList.contains(activeClass)
        ) {
            item.classList.remove(activeClass);
            setTimeout(() => {
                item.classList.remove(readyClass);
            }, delay);
        }
    },
    
    // Toggle activeClass using readyClass in two steps, with delay
    toggleClass(element, readyClass, activeClass, delayAdd, delayRemove) {
        // If element value is html element or query selector
        let item = typeof element == "string" ?
                   document.querySelector(element) :
                   element;
        if (item) {
            if (!item.classList.contains(activeClass)) {
                this.addClass(element, readyClass, activeClass, delayAdd);
            } else {
                this.removeClass(element, readyClass, activeClass, delayRemove);
            }
        }
    },
    
    // Load script and add it to the end of the body
    // Callback function run after the script loaded.
    // auto.utils.loadScript(
    //   '/path/to/file.js',
    //   function () { Callback function... },
    //   async|defer
    // )
    loadScript(path, callback, type) {
        if (this.loadedScripts.indexOf(path) == -1) {
            let script = document.createElement("script");
            script.onload = () => {
                if (typeof callback === "function") {
                    callback();
                }
            };
            script.src = path;
            if (type) script.setAttribute(type, "");
            document.body.appendChild(script);
            this.loadedScripts.push(path);
        } else {
            if (typeof callback === "function") {
                callback();
            }
        }
    },
    loadedScripts: [],
    
    // Check email format
    isEmail(email) {
        let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }
}

export default lib;

