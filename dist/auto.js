!function(){var e=new class{init(){let e=document.querySelectorAll(".syncHover");e.length&&e.forEach(((e,t)=>{this._listener("mouseover",e),this._listener("mouseout",e)}))}_listener(e,t){t.addEventListener(e,(s=>{let o='[href="'+t.getAttribute("href")+'"]',i=document.querySelectorAll(o);i.length&&i.forEach(((t,s)=>{"mouseover"===e?t.classList.add("hover"):t.classList.remove("hover")}))}))}constructor(){}};var t=new class{init(){if("IntersectionObserver"in window){const e=document.querySelectorAll(".lazyload:not(.loaded)");if(e){const t=new IntersectionObserver(((e,t)=>{e&&e.forEach((e=>{e.intersectionRatio>0&&(this._loadImage(e.target),t.unobserve(e.target))}))}),this.options);e.forEach((e=>{t.observe(e)}))}}else this._fallback()}_fallback(){const e=document.querySelectorAll(".lazyload:not(.loaded)");e&&e.forEach((e=>{const t=e.dataset.srcset,s=e.dataset.src;t&&(e.srcset=t),s&&(e.src=s),e.classList.add("loaded")}))}_fetchImage(e,t){return new Promise(((s,o)=>{const i=new Image;t&&(i.srcset=t),e&&(i.src=e),i.onload=s,i.onerror=o}))}_loadImage(e){const t=e.dataset.srcset,s=e.dataset.src;this._fetchImage(s,t).then((()=>{t&&(e.srcset=t,e.removeAttribute("data-srcset")),s&&(e.src=s,e.removeAttribute("data-src")),(t||s)&&e.classList.add("loaded")})).catch((()=>!1))}constructor(){this.options={root:null,rootMargin:"0px",threshold:.5}}};var s=new class{init(){let e=document.querySelectorAll("[data-animate]");if(e.length){let t={};e.forEach(((e,s)=>{try{let o=JSON.parse(e.dataset.animate);if(o.hasOwnProperty("start")){let i={};o.hasOwnProperty("triggerId")&&document.getElementById(o.triggerId)?i.trigger=document.getElementById(o.triggerId):i.trigger=e,i.element=e,i.start=o.start,i.end=o.end,i.class=o.class,i.classRemove=o.classRemove,i.functionName=o.functionName,t[s]=i}else Object.keys(o).forEach((i=>{let a={};o[i].hasOwnProperty("triggerId")&&document.getElementById(o[i].triggerId)?a.trigger=document.getElementById(o[i].triggerId):a.trigger=e,a.element=e,a.start=o[i].start,a.end=o[i].end,a.class=o[i].class,a.classRemove=o[i].classRemove,a.functionName=o[i].functionName,t[s+i]=a}));e.removeAttribute("data-animate")}catch(e){console.log(e)}})),Object.keys(t).length&&(this._scroll(t),document.addEventListener("scroll",(()=>{this._scroll(t)}),{passive:!0}),document.querySelector(".animate-scrollarea")&&document.querySelector(".animate-scrollarea").addEventListener("scroll",(()=>{this._scroll(t)}),{passive:!0}))}}_scroll(e){Object.keys(e).forEach((t=>{let s,o,i=e[t],a=i.trigger.getBoundingClientRect();i.start.match(/px/)&&(s=i.start.replace("px","")),i.start.match(/vh/)&&(s=this._vh2px(i.start.replace("vh",""))),i.start.match(/%/)&&(s=this._vh2px(i.start.replace("%",""))),i.end.match(/px/)&&(o=i.end.replace("px","")),i.end.match(/vh/)&&(o=this._vh2px(i.end.replace("vh",""))),i.end.match(/%/)&&(o=this._vh2px(i.end.replace("%",""))),i.duration=s-o,a.top<=s&&a.top>=o?(null!=i.class&&i.element.classList.add(i.class),"function"==typeof window[i.functionName]&&(i.progress=(s-a.top)/i.duration,i.progress=i.progress.toFixed(4),window[i.functionName](i))):(null!=i.class&&1==i.classRemove&&i.element.classList.contains(i.class)&&i.element.classList.remove(i.class),"function"==typeof window[i.functionName]&&(a.top>s&&i.progress>0&&(i.progress=0,window[i.functionName](i)),a.top<o&&i.progress<1&&(i.progress=1,window[i.functionName](i))))}))}_vh2px(e){let t=window,s=document,o=s.documentElement,i=s.getElementsByTagName("body")[0];return(t.innerHeight||o.clientHeight||i.clientHeight)*e/100}constructor(){}};var o=new class{init(){if(this.items=document.querySelectorAll("."+this.classIsAppeared),this.items.length){this.items.forEach(((e,t)=>{e.classList.remove(this.classIsAppeared)}));let e=(e,t)=>{e.forEach((e=>{e.isIntersecting?(null==this.classAppeared||e.target.classList.contains(this.classAppeared)||e.target.classList.add(this.classAppeared),null!=this.classVisible&&(e.target.classList.add(this.classVisible),e.target.dispatchEvent(this.eventVisible))):null!=this.classVisible&&e.target.classList.contains(this.classVisible)&&(e.target.classList.remove(this.classVisible),e.target.dispatchEvent(this.eventInvisible))}))};this.observer=new IntersectionObserver(e),this.items.forEach((e=>this.observer.observe(e)))}}update(){this.items.forEach((e=>this.observer.observe(e)))}constructor(){this.items=null,this.classIsAppeared="isAppeared",this.classAppeared="appeared",this.classVisible="visible",this.observer=null,this.eventVisible=new CustomEvent("visible"),this.eventInvisible=new CustomEvent("invisible")}};var i=new class{init(){const e=document.querySelectorAll("[data-loadmore]");let t;e.length&&(e.forEach(((e,s)=>{try{if(this._isValidJSON(e.dataset.loadmore)){let s=JSON.parse(e.dataset.loadmore);s.hasOwnProperty("functionName")?(t={},t.block=e,t.offset=s.offset||this.offset,t.functionName=s.functionName):console.log("functionName required in JSON "+s)}else console.log("Invalid JSON in data-loadmore");if(t){let o=e.hasAttribute("id")?e.getAttribute("id"):s;this.blocksHash[o]=t,e.removeAttribute("data-loadmore")}}catch(e){console.error(e)}})),Object.keys(this.blocksHash).length&&(this._scrollObserve(this.blocksHash),document.addEventListener("scroll",(()=>{this._scrollObserve(this.blocksHash)}),{passive:!0})))}_scrollObserve(e){Object.keys(e).forEach((t=>{let s=e[t];s.functionName;parseInt(window.scrollY+document.documentElement.clientHeight)>=parseInt(s.block.offsetTop+s.block.clientHeight-s.offset)?this.watch&&("function"==typeof window[s.functionName]&&(window[s.functionName](this.page),this.page++),this.watch=!1):this.watch=!0}))}_isValidJSON(e){try{return JSON.parse(e),!0}catch(e){return!1}}unwatch(e){delete this.blocksHash[e]}constructor(){this.page=1,this.offset=0,this.watch=!0,this.blocksHash={}}};var a=function(){let e,t=document.documentElement,s=window.navigator.userAgent.toLowerCase(),o=window.navigator.platform.toLowerCase(),i=[],a=t.className;if(""!==a&&(i=a.split(/\s+/)),!/msie/.test(s)&&!/trident/.test(s)||/opera/.test(s))/mozilla/.test(s)&&!/(compatible|webkit)/.test(s)?i.push("firefox"):/safari/.test(s)&&!/chrome/.test(s)?(i.push("safari","webkit"),e=s.match(/version\/([0-9.]+)/),e&&i.push("safari"+parseInt(e[1],10))):/chrome/.test(s)?i.push("chrome","webkit"):/opera/.test(s)&&i.push("opera");else if(i.push("ie"),e=s.match(/msie ([0-9.]+)/),e){let t=parseInt(e[1],10);i.push("ie"+t),7!==t&&8!==t||i.push("ie7-8")}/win/.test(o)?i.push("windows"):/mac/.test(o)?i.push("macos"):/linux/.test(o)?i.push("linux"):/iphone|ipad|ipod/.test(s)&&i.push("ios"),/mobile/.test(s)?i.push("mobile"):i.push("desktop"),/ipad/.test(s)?i.push("ipad"):/ipod/.test(s)?i.push("ipod"):/iphone/.test(s)?i.push("iphone"):/android/.test(s)&&i.push("android"),i.push("js");for(let e=0,t=i.length;e<t;e++)if("no-js"===i[e]){i.splice(e,1);break}t.className=i.join(" ");let n={};for(let e=0,t=i.length;e<t;e++)n[i[e]]=!0;return n.width=window.innerWidth,n.height=window.innerHeight,n}();var n=new class{init(){let e=document.querySelectorAll(".modal-content");e.length&&e.forEach(((e,t)=>{let s=document.querySelector(".modal-here"),o=document.querySelector("body"),i=e.getAttribute("id"),a=e.getAttribute("class").replace("modal-content",""),n=e.dataset.windowClass||"",r=e.innerHTML;s&&(o=s),o.insertAdjacentHTML("beforeend",`\n                    <div id="${i}" class="modal ${a}">\n                        <div class="modal-overlay"></div>\n                        <div class="modal-outer">\n                            <div class="modal-inner">\n                                <div class="modal-window ${n}">\n                                    ${r}\n                                    <div class="modal-rail">\n                                        <a role="button" class="modal-close"></a>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                `),e.remove()}));let t=document.querySelectorAll("[data-modal]");t.length&&t.forEach(((e,t)=>{if(e.addEventListener("click",(t=>{t.preventDefault(),this.show(e.dataset.modal)})),window.location.hash=="#"+e.dataset.modal){document.getElementById(e.dataset.modal).classList.contains("hash")&&this.show(e.dataset.modal)}})),document.addEventListener("click",(e=>{document.querySelector(".modal.active")&&e.target.matches(".modal.active, .modal.active *")&&(e.target.classList.contains("modal-close")||!e.target.matches(".modal-window, .modal-window *"))&&(e.preventDefault(),this.hide(e.target.closest(".modal").getAttribute("id")))})),document.addEventListener("keydown",(e=>{let t=document.querySelectorAll(".modal.active"),s=t[t.length-1];s&&27==e.keyCode&&(e.preventDefault(),this.hide(s.getAttribute("id")))}))}show(e){if(this.isActive(e))return this.hide(e),!1;let t=document.getElementById(e);if(!this.lock&&t){t.classList.contains("uniq")&&this.hideAll(),this.lock=!0;let s=document.documentElement;s.classList.add("modal-active"),s.classList.add(e+"-active"),t.classList.contains("hash")&&(window.location.hash=e),setTimeout((()=>{t.dispatchEvent(this.eventReady),this.modalLevel++,t.classList.add("top","active","level"+this.modalLevel),setTimeout((()=>{t.dispatchEvent(this.eventOpen),this.lock=!1}),400)}),0)}}hide(e){let t=document.getElementById(e);if(!this.lock&&t){this.lock=!0;let s=document.documentElement;window.removeEventListener("resize",this.cp),t.classList.remove("active"),s.classList.remove(e+"-active"),this.modalLevel--,0==this.modalLevel&&s.classList.remove("modal-active"),t.classList.contains("hash")&&window.location.hash=="#"+e&&history.replaceState({},document.title,window.location.href.split("#")[0]),setTimeout((()=>{t.classList.remove("top","level"+this.modalLevel),t.querySelector(".modal-outer").scrollTo(0,0),t.dispatchEvent(this.eventClose),this.lock=!1}),400)}}hideAll(){let e=document.querySelectorAll(".modal.active");e&&e.forEach((e=>{this.hide(e.getAttribute("id"))}))}isActive(e){return document.querySelector("#"+e+".active")}constructor(){this.modalLevel=0,this.scrollPosition=0,this.cp={},this.eventReady=new CustomEvent("modal:ready"),this.eventOpen=new CustomEvent("modal:open"),this.eventClose=new CustomEvent("modal:close"),this.lock=!1}};var r=new class{init(){let e=document.querySelectorAll(".sheets");e&&e.forEach((e=>{try{let t=document.querySelectorAll(".sheets-tab",e);t&&t.forEach((e=>{e.addEventListener("click",(t=>{t.preventDefault(),this.show(e.dataset.sheet)}))}));let s=document.querySelector(".sheets-tab.active",e);if(s)this.show(s.dataset.sheet);else{let t=document.querySelectorAll(".sheets-body",e);if(t){let e=1;t.forEach((t=>{1==e&&(this.show(t.getAttribute("id")),e++)}))}}}catch(e){console.error(e)}}))}show(e){let t=document.querySelector("[data-sheet="+e+"]"),s=document.getElementById(e),o=s.closest(".sheets"),i=o.querySelectorAll(".sheets-tab");i&&i.forEach((e=>{e.classList.remove("active")}));let a=o.querySelectorAll(".sheets-body");a&&a.forEach((e=>{e.classList.remove("active")})),t.classList.add("active"),s.classList.add("active")}constructor(){}};var l=new class{init(){let e=document.querySelectorAll("[data-scrollto]");if(e.length){let t={};if(e.forEach(((e,s)=>{try{let o={};if(this._isValidJSON(e.dataset.scrollto)){let t=JSON.parse(e.dataset.scrollto);t.hasOwnProperty("target")&&this._getElement(t.target)?(o.link=e,o.parent=t.parent||this.parent,o.target=this._getElement(t.target),o.duration=t.duration||this.duration,o.offset=t.offset||this.offset,o.classActive=t.classActive||this.classActive,o.hash=t.hash||this.hash):console.error("Target required in JSON "+t+" or element not exist")}else this._getElement(e.dataset.scrollto)?(o.link=e,o.parent=this.parent,o.target=this._getElement(e.dataset.scrollto),o.duration=this.duration,o.offset=this.offset,o.classActive=this.classActive,o.hash=this.hash):console.error('Target "'+e.dataset.scrollto+'" not found.');o&&(t[s]=o,e.removeAttribute("data-scrollto"),e.addEventListener("click",(e=>{e.preventDefault(),this.scrollTo({parent:o.parent,target:o.target,duration:o.duration,offset:o.offset,classActive:o.classActive,hash:o.hash})})))}catch(e){console.error(e)}})),Object.keys(t).length){this._scrollObserve(t);let e=[];for(let s in t)Object.hasOwn(t[s],"parent")&&!e.includes(t[s].parent)&&e.push(t[s].parent);for(let s in e){this._getElement(e[s]).addEventListener("scroll",(()=>{this._scrollObserve(t)}),{passive:!0})}}}}scrollTo(e){return new Promise(((t,s)=>{let o,i,a,n,r,l=this._getElement(e.parent)||this.parent,c=e.duration||this.duration,d=e.offset||this.offset,h=e.hash||this.hash;if(o="object"==typeof e?this._getElement(e.target):this._getElement(e),!o)return void console.error("Target "+o+" not found");l==window?(a=l.pageYOffset,i=l.pageYOffset+o.getBoundingClientRect().top,r=i-a-d):(a=l.scrollTop,n=l.getBoundingClientRect().top,i=l.scrollTop+o.getBoundingClientRect().top-n,r=i-a-d);let m;r&&window.requestAnimationFrame((function e(s){m||(m=s);let i=s-m,n=c>0?Math.min(i/c,1):1;var d;n=(d=n)<.5?2*d*d:(4-2*d)*d-1,l.scrollTo(0,a+r*n),i<c?window.requestAnimationFrame(e):(h&&o.id?window.location.hash=o.id:h&&history.replaceState({},document.title,window.location.href.split("#")[0]),t())}))}))}_scrollObserve(e){Object.keys(e).forEach((t=>{let s=e[t],o=s.target.getBoundingClientRect();s.duration,s.offset;o.top<=document.documentElement.clientHeight/2&&o.bottom>document.documentElement.clientHeight/2?null!=s.classActive&&(s.link.classList.add(s.classActive),s.target.classList.add(s.classActive)):null!=s.classActive&&s.link.classList.contains(s.classActive)&&(s.link.classList.remove(s.classActive),s.target.classList.remove(s.classActive))}))}_isValidJSON(e){try{return JSON.parse(e),!0}catch(e){return!1}}_getElement(e){return e instanceof Window||e&&e.nodeType===Node.ELEMENT_NODE?e:document.getElementById(e)?document.getElementById(e):document.querySelector(e)?document.querySelector(e):void console.error("Element "+e+" not found")}constructor(){this.parent=window,this.duration=400,this.offset=0,this.classActive="active",this.hash=!1,this.to=this.scrollTo}};const c={appear:o,loadmore:i,device:a,modal:n,scroll:l,sheets:r,lib:{qs:(e,t=document)=>t.querySelector(e),qsa:(e,t=document)=>t.querySelectorAll(e),hide(e){let t="string"==typeof e?document.querySelector(e):e;t&&t.classList.add("hidden")},show(e){let t="string"==typeof e?document.querySelector(e):e;t&&t.classList.remove("hidden")},reload(){location.reload()},reloadWithHash(e){window.location.hash=e,this.reload()},redirectTo:e=>(window.location=e,!1),updateURL(e,t){void 0!==history.pushState?history.pushState(null,t,e):location.href=e},random:(e,t)=>Math.floor(Math.random()*(t-e+1))+e,price:e=>parseFloat(e).toFixed(2).replace(/\d(?=(\d{3})+\.)/g,"$& ").replace(".00",""),number(e){return this.numberFormat(e)},numberFormat(e){let t=(e=parseFloat(e)+"").split("."),s=t[0],o=t.length>1?"."+t[1]:"";for(let e=/(\d+)(\d{3})/;e.test(s);)s=s.replace(e,"$1 $2");return s+o},numberDecline(e,t,s,o){let i="";if(e>10&&1==parseInt(e%100/10))i=o;else switch(e%10){case 1:i=t;break;case 2:case 3:case 4:i=s;break;case 5:case 6:case 7:case 8:case 9:case 0:i=o}return i},addClass(e,t="ready",s="active",o=50){let i="string"==typeof e?document.querySelector(e):e;!i||i.classList.contains(t)||i.classList.contains(s)||(i.classList.add(t),setTimeout((()=>{i.classList.add(s)}),o))},removeClass(e,t="ready",s="active",o=200){let i="string"==typeof e?document.querySelector(e):e;i&&i.classList.contains(t)&&i.classList.contains(s)&&(i.classList.remove(s),setTimeout((()=>{i.classList.remove(t)}),o))},toggleClass(e,t,s,o,i){let a="string"==typeof e?document.querySelector(e):e;a&&(a.classList.contains(s)?this.removeClass(e,t,s,i):this.addClass(e,t,s,o))},makePassword(e,t){e=e||8;let s="",o="ABCDEFGHIJKLMNOPQRSTUVWXYZ",i="abcdefghijklmnopqrstuvwxyz",a="!@#^$%^&*()-+:,.;_",n="0123456789";for(var r=0;r<e/4;++r)s+=o.charAt(Math.floor(Math.random()*o.length)),s+=i.charAt(Math.floor(Math.random()*i.length)),s+=a.charAt(Math.floor(Math.random()*a.length)),s+=n.charAt(Math.floor(Math.random()*n.length));if(s=s.substring(0,e),s=s.split("").sort((()=>.5-Math.random())).join(""),!t)return s;qs(t).value=s},loadScript(e,t,s="async"){if(-1==this.loadedScripts.indexOf(e)){let o=document.createElement("script");o.onload=()=>{"function"==typeof t&&t()},o.src=e,s&&o.setAttribute(s,""),document.body.appendChild(o),this.loadedScripts.push(e)}else"function"==typeof t&&t()},loadedScripts:[],deffered(e,t=1e4){let s=!1;function o(){!1===s&&(s=!0,window.removeEventListener("scroll",o,!1),window.removeEventListener("resize",o,!1),window.removeEventListener("click",o,!1),window.removeEventListener("keydown",o,!1),window.removeEventListener("mousemove",o,!1),window.removeEventListener("touchmove",o,!1),"complete"==document.readyState?e():window.addEventListener("load",e,!1))}setTimeout(o,t),window.addEventListener("scroll",o,{capture:!1,passive:!0}),window.addEventListener("resize",o,{capture:!1,passive:!0}),window.addEventListener("click",o,{capture:!1,passive:!0}),window.addEventListener("keydown",o,{capture:!1,passive:!0}),window.addEventListener("mousemove",o,{capture:!1,passive:!0}),window.addEventListener("touchmove",o,{capture:!1,passive:!0})},runOnAppear(e,t,s){let o=s||{rootMargin:"200px 0px",threshold:0},i=qs(e);new IntersectionObserver(((e,s)=>{e.forEach((e=>{e.isIntersecting&&(t(),s.unobserve(i))}))}),o).observe(i)},isEmail:e=>/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(e),alertErrors(e){if(e)if("string"==typeof e||e instanceof String)alert(e);else{let t=[];for(let s in e)t.push(e[s]);alert(t.join("\n"))}},printErrors(e){if(e){if("string"==typeof e||e instanceof String)return e;{let t=[];for(let s in e)t.push(e[s]);return t.join("<br/>")}}}},init(){n.init(),s.init(),o.init(),t.init(),i.init(),r.init(),l.init(),e.init()}};window.qs=c.lib.qs,window.qsa=c.lib.qsa,window.auto=c}();