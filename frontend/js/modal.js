class Modal {
  /**
   * @param {Array<HTMLElement> | HTMLElement} toggles: toggle elements
   * @param {HTMLElement} modal: modal element
   * @param {HTMLElement | null} close: close button
   */
  constructor(toggles, modal, close) {
    /**
     * modal element
     * @type {HTMLElement}
     */
    this.el = modal;
    /**
     * present state of the modal, true for open, false for close
     * @type {boolean}
     */
    this.status = false;
    if (Array.isArray(toggles)) {
      toggles.forEach((toggle) => {
        console.log(toggle);
        toggle.addEventListener("click", this.toggleModal.bind(this));
      });
    } else {
      toggles.addEventListener("click", this.toggleModal.bind(this));
    }

    if (close) {
      close.addEventListener("click", this.closeModal.bind(this));
    }
  }

  toggleModal() {
    if (this.status) return this.closeModal();
    this.openModal();
  }

  // open modal
  openModal() {
    this.status = true;
    this.el.hidden = false;
    document.documentElement.style.overflow = "hidden";
    this.el.addEventListener("click", this.closeModal.bind(this));
  }

  // close modal
  closeModal() {
    this.status = false;
    this.el.removeEventListener("click", this.closeModal.bind(this));
    this.el.hidden = true;
    document.documentElement.style.overflow = "auto";
  }
}

export { Modal };
