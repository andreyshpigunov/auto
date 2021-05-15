//
//	_animate.js
//	Animations depending on the position of the element.
//
//	Created by Andrey Shpigunov on 15.12.2020.
//

const animate = (function () {
	var animations = document.querySelectorAll("[data-animate]");
    
	if (animations.length) {
		var animationsHash = {};
        
		animations.forEach((e, index) => {
			try {
				var json = JSON.parse(e.dataset.animate);
				if (json.hasOwnProperty("start")) {
					var item = {};
                    
					if (
						json.hasOwnProperty("triggerID") &&
						document.getElementById(json.triggerID)
					) {
						item.trigger = document.getElementById(json.triggerID);
					} else {
						item.trigger = e;
					}
                    
					item.element = e;
					item.start = json.start;
					item.end = json.end;
					item.class = json.class;
					item.classRemove = json.classRemove;
					item.functionName = json.functionName;
                    
					animationsHash[index] = item;
				} else {
					Object.keys(json).forEach(i => {
						var item = {};
                        
						if (
							json[i].hasOwnProperty("triggerID") &&
							document.getElementById(json[i].triggerID)
						) {
							item.trigger = document.getElementById(
								json[i].triggerID
							);
						} else {
							item.trigger = e;
						}
                        
						item.element = e;
						item.start = json[i].start;
						item.end = json[i].end;
						item.class = json[i].class;
						item.classRemove = json[i].classRemove;
						item.functionName = json[i].functionName;
                        
						animationsHash[index + i] = item;
					});
				}
                
				e.removeAttribute("data-animate");
			} catch (err) {
				console.log(err);
			}
		});
        
		if (Object.keys(animationsHash).length) {
			_scroll(animationsHash);
			document.addEventListener("scroll", () => {
				_scroll(animationsHash);
			}, { passive: true });
			if (document.querySelector(".animate-scrollarea")) {
				document
					.querySelector(".animate-scrollarea")
					.addEventListener("scroll", () => {
						_scroll(animationsHash);
					}, { passive: true });
			}
		}
	}

	function _scroll(animationsHash) {
		Object.keys(animationsHash).forEach(i => {
			var item = animationsHash[i];
			var offset = item.trigger.getBoundingClientRect(),
				start,
				end;
                
			if (item.start.match(/px/)) start = item.start.replace("px", "");
			if (item.start.match(/vh/))
				start = _vh2px(item.start.replace("vh", ""));
			if (item.start.match(/%/))
				start = _vh2px(item.start.replace("%", ""));
			if (item.end.match(/px/)) end = item.end.replace("px", "");
			if (item.end.match(/vh/)) end = _vh2px(item.end.replace("vh", ""));
			if (item.end.match(/%/)) end = _vh2px(item.end.replace("%", ""));
            
			item.duration = start - end;
            
			if (offset.top <= start && offset.top >= end) {
				if (item.class != null) {
					item.element.classList.add(item.class);
				}
                
				if (typeof window[item.functionName] === "function") {
					item.progress = (start - offset.top) / item.duration;
					item.progress = item.progress.toFixed(4);
					window[item.functionName](item);
				}
			} else {
				if (
					item.class != null &&
					item.classRemove == true &&
					item.element.classList.contains(item.class)
				) {
					item.element.classList.remove(item.class);
				}
                
				if (typeof window[item.functionName] === "function") {
					if (offset.top > start && item.progress > 0) {
						item.progress = 0;
						window[item.functionName](item);
					}
                    
					if (offset.top < end && item.progress < 1) {
						item.progress = 1;
						window[item.functionName](item);
					}
				}
			}
		});
	}

	function _vh2px(value) {
		var w = window,
			d = document,
			e = d.documentElement,
			g = d.getElementsByTagName("body")[0],
			x = w.innerWidth || e.clientWidth || g.clientWidth,
			y = w.innerHeight || e.clientHeight || g.clientHeight;
		var result = (y * value) / 100;
		return result;
	}

	return null;
})();

export default animate;
