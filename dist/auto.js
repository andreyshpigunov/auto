!function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var t=new(function(){function t(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t)}var n,o,a;return n=t,(o=[{key:"init",value:function(){var e=this,t=document.querySelectorAll(".sync-hover");t.length&&t.forEach((function(t,n){e._listener("mouseover",t),e._listener("mouseout",t)}))}},{key:"_listener",value:function(e,t){t.addEventListener(e,(function(n){var o='[href="'+t.getAttribute("href")+'"]',a=document.querySelectorAll(o);a.length&&a.forEach((function(t,n){"mouseover"===e?t.classList.add("hover"):t.classList.remove("hover")}))}))}}])&&e(n.prototype,o),a&&e(n,a),t}());function n(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var o=new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.options={root:null,rootMargin:"0px",threshold:.5}}var t,o,a;return t=e,(o=[{key:"init",value:function(){var e=this;if("IntersectionObserver"in window){var t=document.querySelectorAll(".lazyload:not(.loaded)");if(t){var n=new IntersectionObserver((function(t,n){t&&t.forEach((function(t){t.intersectionRatio>0&&(e._loadImage(t.target),n.unobserve(t.target))}))}),this.options);t.forEach((function(e){n.observe(e)}))}}else this._fallback()}},{key:"_fallback",value:function(){var e=document.querySelectorAll(".lazyload:not(.loaded)");e&&e.forEach((function(e){var t=e.dataset.srcset,n=e.dataset.src;t&&(e.srcset=t),n&&(e.src=n),e.classList.add("loaded")}))}},{key:"_fetchImage",value:function(e,t){return new Promise((function(n,o){var a=new Image;t&&(a.srcset=t),e&&(a.src=e),a.onload=n,a.onerror=o}))}},{key:"_loadImage",value:function(e){var t=e.dataset.srcset,n=e.dataset.src;this._fetchImage(n,t).then((function(){t&&(e.srcset=t,e.removeAttribute("data-srcset")),n&&(e.src=n,e.removeAttribute("data-src")),(t||n)&&e.classList.add("loaded")})).catch((function(){return!1}))}}])&&n(t.prototype,o),a&&n(t,a),e}());function a(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var s=new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n,o;return t=e,(n=[{key:"init",value:function(){var e=this,t=document.querySelectorAll("[data-animate]");if(t.length){var n={};t.forEach((function(e,t){try{var o=JSON.parse(e.dataset.animate);if(o.hasOwnProperty("start")){var a={};o.hasOwnProperty("triggerID")&&document.getElementById(o.triggerID)?a.trigger=document.getElementById(o.triggerID):a.trigger=e,a.element=e,a.start=o.start,a.end=o.end,a.class=o.class,a.classRemove=o.classRemove,a.functionName=o.functionName,n[t]=a}else Object.keys(o).forEach((function(a){var s={};o[a].hasOwnProperty("triggerID")&&document.getElementById(o[a].triggerID)?s.trigger=document.getElementById(o[a].triggerID):s.trigger=e,s.element=e,s.start=o[a].start,s.end=o[a].end,s.class=o[a].class,s.classRemove=o[a].classRemove,s.functionName=o[a].functionName,n[t+a]=s}));e.removeAttribute("data-animate")}catch(e){console.log(e)}})),Object.keys(n).length&&(this._scroll(n),document.addEventListener("scroll",(function(){e._scroll(n)}),{passive:!0}),document.querySelector(".animate-scrollarea")&&document.querySelector(".animate-scrollarea").addEventListener("scroll",(function(){e._scroll(n)}),{passive:!0}))}}},{key:"_scroll",value:function(e){var t=this;Object.keys(e).forEach((function(n){var o,a,s=e[n],r=s.trigger.getBoundingClientRect();s.start.match(/px/)&&(o=s.start.replace("px","")),s.start.match(/vh/)&&(o=t._vh2px(s.start.replace("vh",""))),s.start.match(/%/)&&(o=t._vh2px(s.start.replace("%",""))),s.end.match(/px/)&&(a=s.end.replace("px","")),s.end.match(/vh/)&&(a=t._vh2px(s.end.replace("vh",""))),s.end.match(/%/)&&(a=t._vh2px(s.end.replace("%",""))),s.duration=o-a,r.top<=o&&r.top>=a?(null!=s.class&&s.element.classList.add(s.class),"function"==typeof window[s.functionName]&&(s.progress=(o-r.top)/s.duration,s.progress=s.progress.toFixed(4),window[s.functionName](s))):(null!=s.class&&1==s.classRemove&&s.element.classList.contains(s.class)&&s.element.classList.remove(s.class),"function"==typeof window[s.functionName]&&(r.top>o&&s.progress>0&&(s.progress=0,window[s.functionName](s)),r.top<a&&s.progress<1&&(s.progress=1,window[s.functionName](s))))}))}},{key:"_vh2px",value:function(e){var t=window,n=document,o=n.documentElement,a=n.getElementsByTagName("body")[0];return t.innerWidth||o.clientWidth||a.clientWidth,(t.innerHeight||o.clientHeight||a.clientHeight)*e/100}}])&&a(t.prototype,n),o&&a(t,o),e}());function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var i=new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.classIsAppeared="is-appeared",this.classAppeared="appeared",this.classVisible="visible"}var t,n,o;return t=e,(n=[{key:"init",value:function(){var e=this,t=document.querySelectorAll("."+this.classIsAppeared);if(t.length){var n={};t.forEach((function(t,o){try{var a={};a.element=t,a.classAppeared=e.classAppeared,a.classVisible=e.classVisible,n[o]=a,a.element.classList.contains(_classIsAppeared)&&a.element.classList.remove(_classIsAppeared)}catch(e){console.log(e)}})),Object.keys(n).length&&(this._scroll(n),document.addEventListener("scroll",(function(){e._scroll(n)}),{passive:!0}))}}},{key:"_scroll",value:function(e){Object.keys(e).forEach((function(t){var n=e[t],o=n.element.getBoundingClientRect();o.top<window.innerHeight&&o.bottom>0?(null!=n.classAppeared&&n.element.classList.add(n.classAppeared),null!=n.classVisible&&n.element.classList.add(n.classVisible)):null!=n.classVisible&&n.element.classList.contains(n.classVisible)&&n.element.classList.remove(n.classVisible)}))}}])&&r(t.prototype,n),o&&r(t,o),e}());function c(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var l=new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.page=1,this.offset=0,this.watch=!0,this.blocksHash={}}var t,n,o;return t=e,(n=[{key:"init",value:function(){var e,t=this,n=document.querySelectorAll("[data-loadmore]");n.length&&(n.forEach((function(n,o){try{if(t._isValidJSON(n.dataset.loadmore)){var a=JSON.parse(n.dataset.loadmore);a.hasOwnProperty("functionName")?((e={}).block=n,e.offset=a.offset||t.offset,e.functionName=a.functionName):console.log("functionName required in JSON "+a)}else console.log("Invalid JSON in data-loadmore");if(e){var s=n.hasAttribute("id")?n.getAttribute("id"):o;t.blocksHash[s]=e,n.removeAttribute("data-loadmore")}}catch(e){console.error(e)}})),Object.keys(this.blocksHash).length&&(this._scrollObserve(this.blocksHash),document.addEventListener("scroll",(function(){t._scrollObserve(t.blocksHash)}),{passive:!0})))}},{key:"_scrollObserve",value:function(e){var t=this;Object.keys(e).forEach((function(n){var o=e[n];o.functionName,parseInt(window.scrollY+document.documentElement.clientHeight)>=parseInt(o.block.offsetTop+o.Block.clientHeight-o.offset)?t.watch&&("function"==typeof window[o.functionName]&&(window[o.functionName](t.page),t.page++),t.watch=!1):t.watch=!0}))}},{key:"_isValidJSON",value:function(e){try{return JSON.parse(e),!0}catch(e){return!1}}},{key:"unwatch",value:function(e){delete this.blocksHash[e]}}])&&c(t.prototype,n),o&&c(t,o),e}()),u=function(){var e,t=document.documentElement,n=window.navigator.userAgent.toLowerCase(),o=window.navigator.platform.toLowerCase(),a=[],s=t.className;if(""!==s&&(a=s.split(/\s+/)),!/msie/.test(n)&&!/trident/.test(n)||/opera/.test(n))/mozilla/.test(n)&&!/(compatible|webkit)/.test(n)?a.push("firefox"):/safari/.test(n)&&!/chrome/.test(n)?(a.push("safari","webkit"),(e=n.match(/version\/([0-9.]+)/))&&a.push("safari"+parseInt(e[1],10))):/chrome/.test(n)?a.push("chrome","webkit"):/opera/.test(n)&&a.push("opera");else if(a.push("ie"),e=n.match(/msie ([0-9.]+)/)){var r=parseInt(e[1],10);a.push("ie"+r),7!==r&&8!==r||a.push("ie7-8")}/win/.test(o)?a.push("windows"):/mac/.test(o)?a.push("macos"):/linux/.test(o)?a.push("linux"):/iphone|ipad|ipod/.test(n)&&a.push("ios"),/mobile/.test(n)?a.push("mobile"):a.push("desktop"),/ipad/.test(n)?a.push("ipad"):/ipod/.test(n)?a.push("ipod"):/iphone/.test(n)?a.push("iphone"):/android/.test(n)&&a.push("android"),a.push("js");for(var i=0,c=a.length;i<c;i++)if("no-js"===a[i]){a.splice(i,1);break}t.className=a.join(" ");for(var l={},u=0,d=a.length;u<d;u++)l[a[u]]=!0;return l.width=window.innerWidth,l.height=window.innerHeight,l}();function d(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var f=new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.speed=500,this.offset=0,this.classActive="active",this.to=this.scrollTo}var t,n,o;return t=e,(n=[{key:"init",value:function(){var e=this,t=document.querySelectorAll("[data-scrollto]");if(t.length){var n={};t.forEach((function(t,o){try{var a={};if(e._isValidJSON(t.dataset.scrollto)){var s=JSON.parse(t.dataset.scrollto);s.hasOwnProperty("target")&&document.getElementById(s.target)?(a.link=t,a.target=document.getElementById(s.target),a.speed=s.speed||e.speed,a.offset=s.offset||e.offset,a.parent=s.parent||null,a.classActive=s.classActive||e.classActive):console.log("Target required in JSON "+s+" or element not exist.")}else document.getElementById(t.dataset.scrollto)?(a.link=t,a.target=document.getElementById(t.dataset.scrollto),a.speed=e.speed,a.offset=e.offset,a.parent=null,a.classActive=e.classActive):console.log("Target '"+t.dataset.scrollto+"' not exist.");a&&(n[o]=a,t.removeAttribute("data-scrollto"),t.addEventListener("click",(function(t){t.preventDefault(),e.scrollTo(a.target,a.offset,a.speed,a.parent)})))}catch(e){console.error(e)}})),Object.keys(n).length&&(this._scrollObserve(n),document.addEventListener("scroll",(function(){e._scrollObserve(n)}),{passive:!0}))}}},{key:"scrollTo",value:function(e,t,n,o){var a,s,r,i;"string"==typeof e&&(e=document.querySelector(e)),n=n||this.speed,t=t||this.offset,(o=document.querySelector(o)||window)==window?(s=o.pageYOffset,a=o.pageYOffset+e.getBoundingClientRect().top,r=a-s-t):(s=o.scrollTop,parentY=o.getBoundingClientRect().top,a=o.scrollTop+e.getBoundingClientRect().top-parentY,r=a-s-t),r&&window.requestAnimationFrame((function e(t){i||(i=t);var a,c=t-i,l=n>0?Math.min(c/n,1):1;l=(a=l)<.5?2*a*a:(4-2*a)*a-1,o.scrollTo(0,s+r*l),c<n&&window.requestAnimationFrame(e)}))}},{key:"_scrollObserve",value:function(e){Object.keys(e).forEach((function(t){var n=e[t],o=n.target.getBoundingClientRect(),a=(n.speed,n.offset);o.top<=a+5&&o.bottom>a+5?null!=n.classActive&&n.link.classList.add(n.classActive):null!=n.classActive&&n.link.classList.contains(n.classActive)&&n.link.classList.remove(n.classActive)}))}},{key:"_isValidJSON",value:function(e){try{return JSON.parse(e),!0}catch(e){return!1}}}])&&d(t.prototype,n),o&&d(t,o),e}());function m(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var v=new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.modalLevel=0,this.scrollPosition=0,this.cp={},this.eventReady=new CustomEvent("modal:ready"),this.eventOpen=new CustomEvent("modal:open"),this.eventClose=new CustomEvent("modal:close")}var t,n,o;return t=e,(n=[{key:"init",value:function(){var e=this,t=document.querySelectorAll(".modal-content");t.length&&t.forEach((function(e,t){var n=document.querySelector(".modal-here"),o=document.querySelector("body"),a=e.getAttribute("id"),s=e.getAttribute("class").replace("modal-content",""),r=e.innerHTML;n&&(o=n),o.insertAdjacentHTML("beforeend",'\n                    <div id="'.concat(a,'" class="modal ').concat(s,'">\n                        <div class="modal-overlay"></div>\n                        <div class="modal-outer">\n                            <div class="modal-inner">\n                                <div class="modal-window">\n                                    ').concat(r,'\n                                    <a class="modal-close"></a>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                ')),e.remove()}));var n=document.querySelectorAll("[data-modal]");n.length&&n.forEach((function(t,n){t.addEventListener("click",(function(n){n.preventDefault(),e.show(t.dataset.modal)}))})),document.addEventListener("click",(function(t){document.querySelector(".modal.active")&&t.target.matches(".modal.active, .modal.active *")&&(t.target.classList.contains("modal-close")||t.target.classList.contains("modal-custom-close")||!t.target.matches(".modal-window, .modal-window *"))&&(t.preventDefault(),e.hide(t.target.closest(".modal").getAttribute("id")))})),document.addEventListener("keydown",(function(t){var n=document.querySelectorAll(".modal.active"),o=n[n.length-1];o&&27==t.keyCode&&(t.preventDefault(),e.hide(o.getAttribute("id")))}))}},{key:"show",value:function(e){var t=this,n=document.documentElement,o=document.getElementById(e);o&&(document.querySelectorAll(".modal.active"),setTimeout((function(){t._closerPosition(e),window.addEventListener("resize",t.cp=function(n){t._closerPosition(e)}),n.classList.add("modal-active"),n.classList.add(e+"-active"),o.dispatchEvent(t.eventReady),t.modalLevel++,o.classList.add("top","active","level-"+t.modalLevel),setTimeout((function(){o.dispatchEvent(t.eventOpen)}),400),(u.iphone||u.ipad||u.android)&&(t.scrollPosition=window.pageYOffset,document.body.style.position="fixed",document.body.style.top="-"+t.scrollPosition+"px",document.body.style.width=window.innerWidth+"px")}),0))}},{key:"hide",value:function(e){var t=this,n=document.getElementById(e);window.removeEventListener("resize",this.cp),n.classList.remove("active"),setTimeout((function(){document.documentElement.classList.remove(e+"-active"),n.classList.remove("top","level-"+t.modalLevel),t.modalLevel--,0==t.modalLevel&&document.documentElement.classList.remove("modal-active"),n.dispatchEvent(t.eventClose)}),400),(u.iphone||u.ipad||u.android)&&(document.body.style.position=null,document.body.style.top=null,document.body.style.width=null,window.scrollTo(0,this.scrollPosition))}},{key:"_closerPosition",value:function(e){var t,n=document.getElementById(e);window.innerWidth<640&&n.querySelector(".modal-window").scrollHeight>=window.innerHeight?(t=document.querySelector("#"+e+" .modal-window .modal-close"))&&n.appendChild(t):(t=document.querySelector("#"+e+" > .modal-close"))&&document.querySelector("#"+e+" .modal-window").appendChild(t)}}])&&m(t.prototype,n),o&&m(t,o),e}());function p(e){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function h(e){return e||null}function y(e,t,n,o){var a=["then","catch","always"].reduce((function(e,t){return e[t]=function(n){return e[t]=n,e},e}),{}),s=new XMLHttpRequest,r=function(e,t,n){if("get"!==n.toLowerCase()||!t)return e;var o=function(e){return w(e)?b(e):e}(t),a=e.indexOf("?")>-1?"&":"?";return e+a+o}(t,n,e);return s.open(e,r,!0),s.withCredentials=o.hasOwnProperty("withCredentials"),function(e,t,n){(function(e){return Object.keys(e).some((function(e){return"content-type"===e.toLowerCase()}))})(t=t||{})||(t["Content-Type"]=w(n)?"application/json":"application/x-www-form-urlencoded");Object.keys(t).forEach((function(n){t[n]&&e.setRequestHeader(n,t[n])}))}(s,o.headers,n),s.addEventListener("readystatechange",function(e,t){return function n(){t.readyState===t.DONE&&(t.removeEventListener("readystatechange",n,!1),e.always.apply(e,g(t)),t.status>=200&&t.status<300?e.then.apply(e,g(t)):e.catch.apply(e,g(t)))}}(a,s),!1),s.send(w(n)?JSON.stringify(n):n),a.abort=function(){return s.abort()},a}function g(e){var t;try{t=JSON.parse(e.responseText)}catch(n){t=e.responseText}return[t,e]}function w(e){return"[object Object]"===Object.prototype.toString.call(e)}function b(e,t){return Object.keys(e).map((function(n){if(e.hasOwnProperty(n)&&void 0!==e[n]){var o=e[n];return n=t?t+"["+n+"]":n,null!==o&&"object"===p(o)?b(o,n):k(n)+"="+k(o)}})).filter(Boolean).join("&")}function k(e){return encodeURIComponent(e)}var E={loadmore:l,device:u,scroll:f,modal:v,ajax:function(e){return(e=e||{}).baseUrl=e.baseUrl||"",e.method&&e.url?y(e.method,e.baseUrl+e.url,h(e.data),e):["get","post","put","delete"].reduce((function(t,n){return t[n]=function(t,o){return y(n,e.baseUrl+t,h(o),e)},t}),{})},lib:{reload:function(){location.reload()},reloadWithHash:function(e){redirectTo(location.href.replace(location.hash,"#"+e)),reload()},redirectTo:function(e){return window.location=e,!1},updateURL:function(e,t){void 0!==history.pushState?history.pushState(null,t,e):location.href=e},random:function(e,t){return Math.floor(Math.random()*(t-e+1))+e},price:function(e){return parseFloat(e).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$& ").replace(".",",")},numberFormat:function(e){for(var t=(e+="").split("."),n=t[0],o=t.length>1?"."+t[1]:"",a=/(\d+)(\d{3})/;a.test(n);)n=n.replace(a,"$1 $2");return n+o},numberDecline:function(e,t,n,o){var a="";if(e>10&&1==parseInt(e%100/10))a=t;else switch(e%10){case 1:a=t;break;case 2:case 3:case 4:a=n;break;case 5:case 6:case 7:case 8:case 9:case 0:a=o}return a},addClass:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"ready",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"active",o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:50,a="string"==typeof e?document.querySelector(e):e;!a||a.classList.contains(t)||a.classList.contains(n)||(a.classList.add(t),setTimeout((function(){a.classList.add(n)}),o))},removeClass:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"ready",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"active",o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:200,a="string"==typeof e?document.querySelector(e):e;a&&a.classList.contains(t)&&a.classList.contains(n)&&(a.classList.remove(n),setTimeout((function(){a.classList.remove(t)}),o))},toggleClass:function(e,t,n,o,a){var s="string"==typeof e?document.querySelector(e):e;s&&(s.classList.contains(n)?removeClass(e,t,n,a):addClass(e,t,n,o))},loadScript:function(e,t,n){if(-1==this.loadedScripts.indexOf(e)){var o=document.createElement("script");o.onload=function(){"function"==typeof t&&t()},o.src=e,n&&o.setAttribute(n,""),document.body.appendChild(o),this.loadedScripts.push(e)}else"function"==typeof t&&t()},loadedScripts:[],isEmail:function(e){return/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(e)}},init:function(){s.init(),i.init(),o.init(),l.init(),f.init(),v.init(),t.init()}};window.auto=E}();