//
//  modal.js
//  auto
//
//  Created by andreyshpigunov on 25.05.2021.
//
//  Usage:
//  <a data-modal="my-modal">Open modal</a>
//
//  <div id="my-modal" class="modal-content [custom-classes]">
//      <p>Hello modal!</p>
//      <p><a class="button modal-close">Close</a></p>
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
                    content = e.innerHTML;
                
                if (here) placeholder = here;
                
                placeholder.insertAdjacentHTML("beforeend", `
                    <div id="${id}" class="modal ${classes}">
                        <div class="modal-overlay"></div>
                        <div class="modal-outer">
                            <div class="modal-inner">
                                <div class="modal-window">
                                    ${content}
                                    <div class="modal-rail">
                                        <a class="modal-close"></a>
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
                    event.target.classList.contains("modal-customClose") ||
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
        
        if (modal) {
            if (modal.classList.contains("uniq")) {
                this.hideAll();
            }
            
            let html = document.documentElement;
            let timeout = 0;
            
            setTimeout(() => {
                html.classList.add("modal-active");
                html.classList.add(id + "-active");
                modal.dispatchEvent(this.eventReady);
                this.modalLevel++;
                modal.classList.add("top", "active", "level" + this.modalLevel);
                setTimeout(() => { modal.dispatchEvent(this.eventOpen) }, 400);
                
                if (device.iphone || device.ipad || device.android) {
                    this.scrollPosition = window.pageYOffset;
                    document.body.style.position = "fixed";
                    document.body.style.top = "-" + this.scrollPosition + "px";
                    document.body.style.width = window.innerWidth + "px";
                }
            }, timeout);
        }
    }
    
    // Hide window
    hide(id) {
        let modal = document.getElementById(id);
        window.removeEventListener("resize", this.cp);
        modal.classList.remove("active");
        
        setTimeout(() => {
            document.documentElement.classList.remove(id + "-active");
            modal.classList.remove("top", "level" + this.modalLevel);
            this.modalLevel--;
            if (this.modalLevel == 0) {
                document.documentElement.classList.remove("modal-active");
            }
            modal.dispatchEvent(this.eventClose);
        }, 400);
        
        if (device.iphone || device.ipad || device.android) {
            document.body.style.position = null;
            document.body.style.top = null;
            document.body.style.width = null;
            window.scrollTo(0, this.scrollPosition);
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
