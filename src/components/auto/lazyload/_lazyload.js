//
//	_lazyload.js
//	Loading images when they appear in viewport.
//	Fully works only in modern browsers.
//	If intersectionobserver is not supported, a fallback is triggered.
//
//	Created by Andrey Shpigunov on 15.12.2020.
//

class Lazyload {
	constructor() {
		this.options = {
			root: null,
			rootMargin: "25% 0px",
			threshold: 0.1,
		};
	}

	fallback() {
		const images = document.querySelectorAll(".lazyload:not(.loaded)");
		if (images) {
			images.forEach(img => {
				const srcset = img.dataset.srcset;
				const src = img.dataset.src;
				if (srcset) img.srcset = srcset;
				if (src) img.src = src;
				img.classList.add("loaded");
			});
		}
	}

	fetchImage(src, srcset) {
		return new Promise((resolve, reject) => {
			const image = new Image();
			if (srcset) image.srcset = srcset;
			if (src) image.src = src;
			image.onload = resolve;
			image.onerror = reject;
		});
	}

	loadImage(img) {
		const srcset = img.dataset.srcset;
		const src = img.dataset.src;
		this.fetchImage(src, srcset)
			.then(() => {
				if (srcset) {
					img.srcset = srcset;
					img.removeAttribute("data-srcset");
				}
				if (src) {
					img.src = src;
					img.removeAttribute("data-src");
				}
				if (srcset || src) {
					img.classList.add("loaded");
				}
			})
			.catch(() => {
				return false;
			});
	}

	observe() {
		if ("IntersectionObserver" in window) {
			const images = document.querySelectorAll(".lazyload:not(.loaded)");
			if (images) {
				const observer = new IntersectionObserver(
					(entries, observer) => {
						if (entries) {
							entries.forEach(entry => {
								if (entry.intersectionRatio > 0) {
									this.loadImage(entry.target);
									observer.unobserve(entry.target);
								}
							});
						}
					},
					this.options
				);
				images.forEach(img => {
					observer.observe(img);
				});
			}
		} else {
			this.fallback();
		}
	}
}

const lazyload = new Lazyload();
lazyload.observe();

export default lazyload;
