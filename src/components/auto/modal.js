//
//  modal.js
//  auto
//
//  Created by andreyshpigunov on 25.05.2021.
//
//  Usage:
//  <a data-modal="my-modal">Open modal</a>
//
//  <div id="my-modal" class="modal-content [custom-classes]" data-window-class="[window-classes]">
//      <p>Hello modal!</p>
//      <p><a class="button modal-close">Close</a></p> — optional
//  </div>
//
//  <script>
//    let modal = document.getElementById('modal-test');
//    modal.addEventListener('modal:ready', function (event) { ... });
//    modal.addEventListener('modal:open', function (event) { ... });
//    modal.addEventListener('modal:close', function (event) { ... });
//  </script>
//


import device from "./device";

class Modal {
    
    constructor() {
        this.modalLevel = 0;
        this.scrollPosition = 0;
        this.cp = {};
        
        this.eventReady = new CustomEvent("modal:ready");
        this.eventOpen  = new CustomEvent("modal:open");
        this.eventClose = new CustomEvent("modal:close");
        
        this.lock = false;
    }
    
    // Init windows
    init() {
        let modalContents = document.querySelectorAll(".modal-content");
        
        if (modalContents.length) {
            modalContents.forEach((e, index) => {
                let html,
                    here = document.querySelector(".modal-here"),
                    placeholder = document.querySelector("body"),
                
                    id = e.getAttribute("id"),
                    classes = e.getAttribute("class").replace("modal-content", ""),
                    windowClasses = e.dataset.windowClass,
                    content = e.innerHTML;
                
                if (here) placeholder = here;
                
                placeholder.insertAdjacentHTML("beforeend", `
                    <div id="${id}" class="modal ${classes}">
                        <div class="modal-overlay"></div>
                        <div class="modal-outer">
                            <div class="modal-inner">
                                <div class="modal-window ${windowClasses}">
                                    ${content}
                                    <div class="modal-rail">
                                        <a role="button" class="modal-close"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `);
                e.remove();
            });
        }
        
        let modalLinks = document.querySelectorAll("[data-modal]");
        if (modalLinks.length) {
            modalLinks.forEach((e, index) => {
                e.addEventListener("click", (event) => {
                    event.preventDefault();
                    this.show(e.dataset.modal);
                });
            });
        }
        
        document.addEventListener("click", (event) => {
            let modalActive = document.querySelector(".modal.active");
            if (
                modalActive &&
                event.target.matches(".modal.active, .modal.active *") &&
                (
                    event.target.classList.contains("modal-close") ||
                    !event.target.matches(".modal-window, .modal-window *")
                )
            ) {
                event.preventDefault();
                this.hide(event.target.closest(".modal").getAttribute("id"));
            }
        });
        
        // Listen ESC button press, when modal active
        document.addEventListener("keydown", (event) => {
            let modalsActive = document.querySelectorAll(".modal.active");
            let modalActive = modalsActive[modalsActive.length - 1];
            if (modalActive && event.keyCode == 27) {
                event.preventDefault();
                this.hide(modalActive.getAttribute("id"));
            }
        });
    }
    
    // Show window
    show(id) {
        if (this.isActive(id)) {
            this.hide(id);
            return false
        }
        
        let modal = document.getElementById(id);
        if (!this.lock && modal) {
            
            if (modal.classList.contains("uniq")) {
                this.hideAll();
            }
            
            this.lock = true;
            
            let html = document.documentElement;
            
            html.classList.add("modal-active");
            html.classList.add(id + "-active");
            
            setTimeout(() => {
                modal.dispatchEvent(this.eventReady);
                this.modalLevel++;
                modal.classList.add("top", "active", "level" + this.modalLevel);
                setTimeout(() => {
                    modal.dispatchEvent(this.eventOpen);
                    this.lock = false
                }, 400);
                
            }, 0);
            
            if (device.iphone || device.ipad || device.android) {
                this.scrollPosition = window.pageYOffset;
                document.body.style.position = "fixed";
                document.body.style.top = "-" + this.scrollPosition + "px";
                document.body.style.width = window.innerWidth + "px";
            }
        }
    }
    
    // Hide window
    hide(id) {
        let modal = document.getElementById(id);
        if (!this.lock && modal) {
            this.lock = true;
            
            let html = document.documentElement;
            
            window.removeEventListener("resize", this.cp);
            modal.classList.remove("active");
            
            html.classList.remove(id + "-active");
            this.modalLevel--;
            if (this.modalLevel == 0) {
                html.classList.remove("modal-active");
            }
            
            setTimeout(() => {
                modal.classList.remove("top", "level" + this.modalLevel);
                modal.dispatchEvent(this.eventClose);
                this.lock = false
            }, 400);
            
            if (device.iphone || device.ipad || device.android) {
                document.body.style.position = null;
                document.body.style.top = null;
                document.body.style.width = null;
                window.scrollTo(0, this.scrollPosition);
            }
        }
    }
    
    // Hide all active modals
    hideAll() {
        let activeModals = document.querySelectorAll(".modal.active");
        if (activeModals) {
            activeModals.forEach(item => {
                this.hide(item.getAttribute("id"))
            })
        }
    }
    
    // Check modal activity
    isActive(id) {
        return document.querySelector("#" + id + ".active")
    }
}

const modal = new Modal();

export default modal;
