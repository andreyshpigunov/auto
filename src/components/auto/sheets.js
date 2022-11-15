//
//  sheets.js
//  auto
//
//  Created by andreyshpigunov on 14.04.2022.
//
//  Tab sheets
//  <div class="sheets">
//    <a class="sheets-tab active" data-sheet="sheetA">Sheet</a> — active tab
//    <a class="sheets-tab" data-sheet="sheetB">Sheet</a>
//    <div id="sheetA" class="sheets-body active">Sheet content</div> — active sheet
//    <div id="sheetB" class="sheets-body">Sheet content</div>
//  </div>
//  No limits for wrapping tabs and sheets in another tags.
//
//  API call:
//  this.show(sheetId) — show sheet
//  sheetId — sheet id


class Sheets {
    
    constructor() {}
    
    init() {
        let sheets = document.querySelectorAll(".sheets");
        if (sheets) {
            sheets.forEach(e => {
                try {
                    let tabs = document.querySelectorAll(".sheets-tab", e);
                    if (tabs) {
                        tabs.forEach(tab => {
                            tab.addEventListener("click", (event) => {
                                event.preventDefault();
                                this.show(tab.dataset.sheet)
                            })
                        })
                    }
                    let activeTab = document.querySelector(".sheets-tab.active", e);
                    if (activeTab) {
                        this.show(activeTab.dataset.sheet)
                    } else {
                        let bodies = document.querySelectorAll(".sheets-body", e);
                        if (bodies) {
                            let i = 1;
                            bodies.forEach(body => {
                                if (i == 1) {
                                    this.show(body.getAttribute("id"));
                                    i++
                                }
                            })
                        }
                    }
                } catch (err) {
                    console.error(err);
                }
            })
        }
    }
    
    show(sheetId) {
        let tab = document.querySelector("[data-sheet=" + sheetId + "]");
        let body = document.getElementById(sheetId);
        let sheets = body.closest(".sheets");
        
        // Remove class "active" from tabs and bodies
        let tabs = sheets.querySelectorAll(".sheets-tab");
        if (tabs) { tabs.forEach(tab => { tab.classList.remove("active") }) }
        let bodies = sheets.querySelectorAll(".sheets-body");
        if (bodies) { bodies.forEach(body => { body.classList.remove("active") }) }
        
        // Add class "active" to selected tab and body
        tab.classList.add("active");
        body.classList.add("active");
    }
}

const sheets = new Sheets();

export default sheets;
