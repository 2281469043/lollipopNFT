class Slideshow {
  /**
   *
   * @param {Array<HTMLElement>} items: Carousel elements
   * @param {boolean} autoPlay: Whether to play automatically Default No
   * @param {number} speed: Carousel speed ms, default 2500 ms
   */
  constructor(items, autoPlay = false, speed = 2500) {
    /**
     * @type {number} The index of the current carousel
     */
    this.current = 0;
    this.items = items;
    this.items.forEach((item) => {
      item.addEventListener("mouseover", this.stop.bind(this));
    });

    this.items.forEach((item) => {
      item.addEventListener("mouseleave", this.play.bind(this));
    });
    /**
     * @type {number} The number of current carousels
     */
    this.length = items.length;
    /**
     * @type {HTMLElement} The element currently being rotated
     */
    this.currentEl = this.items[this.current];

    /**
     * @type {HTMLElement} Previous element
     */
    this.prevEl = this.items[this.length - 1];

    /**
     * @type {HTMLElement} Next element
     */
    this.nextEl = this.items[this.current + 1];
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.speed = speed;
    this.autoPlay = autoPlay;
    this.styleElement();
    autoPlay && this.play();
  }

  // Play the carousel
  play() {
    this.loopTimer = setInterval(this.next, this.speed);
  }
  // Stop the carousel
  stop() {
    clearInterval(this.loopTimer);
  }
  // Style the carousel
  styleElement() {
    this.currentEl.classList.add("current");
    this.prevEl.classList.add("prev");
    this.nextEl.classList.add("next");
    this.addListener();
  }
  // Add event listener
  addListener() {
    this.prevEl.addEventListener("click", this.prev, true);
    this.nextEl.addEventListener("click", this.next, true);
  }
  // Remove event listener
  removeListener() {
    this.prevEl.removeEventListener("click", this.prev, true);
    this.nextEl.removeEventListener("click", this.next, true);
  }
  // Next carousel, remove the current carousel, add the next carousel
  next() {
    this.removeListener();
    this.currentEl.classList.replace("current", "prev");
    this.nextEl.classList.replace("next", "current");
    this.prevEl.classList.remove("prev");

    this.prevEl = this.currentEl;
    this.currentEl = this.nextEl;
    if (this.current === this.length - 1) {
      this.current = 0;
      this.nextEl = this.items[1];
    } else if (this.current === this.length - 2) {
      this.current++;
      this.nextEl = this.items[0];
    } else {
      this.current++;
      this.nextEl = this.items[this.current + 1];
    }
    this.nextEl.classList.add("next");

    this.addListener();
  }
  // Previous carousel, remove the current carousel, add the previous carousel
  prev() {
    this.removeListener();
    this.nextEl.classList.remove("next");
    this.currentEl.classList.replace("current", "next");
    this.prevEl.classList.replace("prev", "current");

    this.nextEl = this.currentEl;
    this.currentEl = this.prevEl;

    if (this.current === 0) {
      this.current = this.length - 1;
      this.prevEl = this.items[this.length - 2];
    } else if (this.current === 1) {
      this.current = 0;
      this.prevEl = this.items[this.length - 1];
    } else {
      this.current--;
      this.prevEl = this.items[this.current - 1];
    }

    this.prevEl.classList.add("prev");

    this.addListener();
  }
}

export { Slideshow };
