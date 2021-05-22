//
//	_utils.js
//	Utils
//
//	Created by Andrey Shpigunov on 18.12.2020.
//

// Random number
export function random(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
}

// Price in format 9 999 999,99
export function price(price) {
    var p = parseFloat(price);
    return p
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$& ")
        .replace(".", ",");
}

// Number formatter
export function numberFormat(a) {
    a += "";
    let x = a.split(".");
    let x1 = x[0];
    let x2 = x.length > 1 ? "." + x[1] : "";
    for (var b = /(\d+)(\d{3})/; b.test(x1);) x1 = x1.replace(b, "$1 $2");
    return x1 + x2;
}

// Number decline
export function numberDecline(a, b, c, d) {
    var e = "";
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
}

// Add activation class after ready class in two steps, with delay
export function addClass(
    element,
    readyClass = "ready",
    activeClass = "active",
    delay = 50
) {
    // If element value is html element or query selector
    let item = typeof element == "string" ? document.querySelector(element) : element;
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
}

// Remove activation class before removing ready class in two steps, with delay
export function removeClass(
    element,
    readyClass = "ready",
    activeClass = "active",
    delay = 200
) {
    // If element value is html element or query selector
    let item = typeof element == "string" ? document.querySelector(element) : element;
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
}

// Toggle activation class using ready class in two steps, with delay
export function toggleClass(element, readyClass, activeClass, delayAdd, delayRemove) {
    // If element value is html element or query selector
    let item = typeof element == "string" ? document.querySelector(element) : element;
    if (item) {
        if (!item.classList.contains(activeClass)) {
            addClass(element, readyClass, activeClass, delayAdd);
        } else {
            removeClass(element, readyClass, activeClass, delayRemove);
        }
    }
}

var loaded = [];
// Load script and add it to the end of the body
// Passing the callback that runs after the script is loaded.
// auto.utils.loadScript('/path/to/file.js', function () { Callback function... }, async|defer)
export function loadScript(path, callback, type) {
    if (loaded.indexOf(path) == -1) {
        var script = document.createElement("script");
        script.onload = () => {
            if (typeof callback === "function") {
                callback();
            }
        };
        
        script.src = path;
        if (type) script.setAttribute(type, "");
        document.body.appendChild(script);
        loaded.push(path);
    } else {
        if (typeof callback === "function") {
            callback();
        }
    }
}

// Check email format
export function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
