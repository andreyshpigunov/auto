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
    
    // Hide element (add class .hidden)
    hide(element) {
        let item = typeof element == 'string' ?
            document.querySelector(element) :
            element;
        if (item) item.classList.add('hidden')
    },
    
    // Show element (remove class .hidden)
    show(element) {
        let item = typeof element == 'string' ?
                   document.querySelector(element) :
                   element;
        if (item) item.classList.remove('hidden')
    },
    
    // Reload page
    reload() {
        location.reload()
    },
    
    // Reload page with new hash
    reloadWithHash(hash) {
        window.location.hash = hash;
        this.reload()
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
    
    // Price format 9 999 999.99
    price(price) {
        let p = parseFloat(price);
        return p
            .toFixed(2)
            .replace(/\d(?=(\d{3})+\.)/g, '$& ')
            .replace('.00', '')
    },
    
    // Number format
    number(a) {
        return this.numberFormat(a);
    },
    
    numberFormat(a) {
        a = parseFloat(a) + '';
        let x = a.split('.'),
            x1 = x[0],
            x2 = x.length > 1 ? '.' + x[1] : '';
        for (let b = /(\d+)(\d{3})/; b.test(x1);) x1 = x1.replace(b, '$1 $2');
        return x1 + x2;
    },
    
    // Number decline
    numberDecline(a, b, c, d) {
        let e = '';
        if (a > 10 && 1 == parseInt((a % 100) / 10)) {
            e = d;
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
        readyClass = 'ready',
        activeClass = 'active',
        delay = 50
    ) {
        // If element value is html element or query selector
        let item = typeof element == 'string' ?
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
        readyClass = 'ready',
        activeClass = 'active',
        delay = 200
    ) {
        // If element value is html element or query selector
        let item = typeof element == 'string' ?
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
        let item = typeof element == 'string' ?
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
    
    // Make password with length (default — 8)
    // selector — input or textarea field query selector
    makePassword(length, selector) {
        length = length || 8;
        let password = '',
            upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lower = 'abcdefghijklmnopqrstuvwxyz',
            chars = '!@#^$%^&*()-+:,.;_',
            digits = '0123456789';
            
        for (var i = 0; i < length / 4; ++i) {
            password += upper.charAt(Math.floor(Math.random() * upper.length));
            password += lower.charAt(Math.floor(Math.random() * lower.length));
            password += chars.charAt(Math.floor(Math.random() * chars.length));
            password += digits.charAt(Math.floor(Math.random() * digits.length))
        }
        password = password.substring(0, length);
        password = password.split('').sort(() => {return 0.5-Math.random()}).join('');
        if (selector) {
            qs(selector).value = password
        } else {
            return password
        }
    },
    
    // Load script and add it to the end of the body
    // Callback function run after the script loaded.
    // auto.lib.loadScript(
    //   '/path/to/file.js',
    //   () => { Callback function... },
    //   async|defer
    // )
    loadScript(path, callback, type = 'async') {
        if (this.loadedScripts.indexOf(path) == -1) {
            let script = document.createElement('script');
            script.onload = () => {
                if (typeof callback === 'function') {
                    callback();
                }
            };
            script.src = path;
            if (type) script.setAttribute(type, '');
            document.body.appendChild(script);
            this.loadedScripts.push(path);
        } else {
            if (typeof callback === 'function') {
                callback();
            }
        }
    },
    loadedScripts: [],
    
    // Deffered callback execution
    // auto.lib.deffered(
    //   () => { Code... },
    //   delay in ms
    // )
    deffered(callback, delay = 10000) {
        let fired = false;
        
        function run() {
            if (fired === false) {
                fired = true;
                
                window.removeEventListener('scroll', run, false);
                window.removeEventListener('resize', run, false);
                window.removeEventListener('click', run, false);
                window.removeEventListener('keydown', run, false);
                window.removeEventListener('mousemove', run, false);
                window.removeEventListener('touchmove', run, false);
                
                // Load or set load event
                if (document.readyState == 'complete') {
                    callback();
                } else {
                    window.addEventListener('load', callback, false);
                }
            }
        }
        
        setTimeout(run, delay);
        
        window.addEventListener('scroll', run, { capture: false, passive: true });
        window.addEventListener('resize', run, { capture: false, passive: true });
        window.addEventListener('click', run, { capture: false, passive: true });
        window.addEventListener('keydown', run, { capture: false, passive: true });
        window.addEventListener('mousemove', run, { capture: false, passive: true });
        window.addEventListener('touchmove', run, { capture: false, passive: true });
    },
    
    // Run on appear
    // The callback is triggered when the object is approaching the viewport
    // selector — trigger element
    // options — IntersectionObserver options
    // Example:
    // auto.lib.appear(
    //   '#map',
    //   () => { Code... },
    //   {
    //       root: window,
    //       rootMargin: '0px 0px 0px 0px',
    //       threshold: 0.5
    //   }
    // )
    runOnAppear(selector, callback, options) {
        let params = options || {
            rootMargin: '200px 0px',
            threshold: 0
        }
        let element = qs(selector);
        let observerCallback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    callback();
                    observer.unobserve(element);
                }
            });
        }
        let observer = new IntersectionObserver(observerCallback, params);
        observer.observe(element);
    },
    
    // Check email format
    isEmail(email) {
        let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    },
    
    // Show alert window with errors
    // data — object (with key:value), array or string (object and array splitted by '\n')
    // return false
    alertErrors(data) {
        if (data) {
            if (
                typeof data === 'string' ||
                data instanceof String
            ) {
                alert(data)
            } else {
                let err = []
                for (let e in data) { err.push(data[e]) }
                alert(err.join('\n'))
            }
        }
    },
    
    // Print text with errors
    // data — object (with key:value), array or string (object and array splitted by '<br/>')
    // return string
    printErrors(data) {
        if (data) {
            if (
                typeof data === 'string' ||
                data instanceof String
            ) {
                return data
            } else {
                let err = []
                for (let e in data) { err.push(data[e]) }
                return err.join('<br/>')
            }
        }
    }
}

export default lib;

