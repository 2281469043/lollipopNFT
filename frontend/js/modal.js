class Modal {
  /**
   * @param {Array<HTMLElement> | HTMLElement} toggles 开关元素
   * @param {HTMLElement} modal modal元素
   * @param {HTMLElement | null} close 关闭按钮
   */
  constructor(toggles, modal, close) {
    /**
     * modal 元素
     * @type {HTMLElement}
     */
    this.el = modal;
    /**
     * 当前开关状态， true为开， false为关
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

  // 打开modal
  openModal() {
    this.status = true;
    this.el.hidden = false;
    document.documentElement.style.overflow = "hidden";
    this.el.addEventListener("click", this.closeModal.bind(this));
  }

  // 关闭modal
  closeModal() {
    this.status = false;
    this.el.removeEventListener("click", this.closeModal.bind(this));
    this.el.hidden = true;
    document.documentElement.style.overflow = "auto";
  }
}

export { Modal };
