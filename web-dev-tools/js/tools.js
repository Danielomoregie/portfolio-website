/**
 * Web Development Tools & Utilities JavaScript
 * A collection of utility functions and components for modern web development
 */

// Utility Functions
const Utils = {
  /**
   * Debounce function to limit the rate of function execution
   * @param {Function} func - Function to debounce
   * @param {number} wait - Delay in milliseconds
   * @param {boolean} immediate - Execute immediately on first call
   * @returns {Function} Debounced function
   */
  debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  },

  /**
   * Throttle function to limit the rate of function execution
   * @param {Function} func - Function to throttle
   * @param {number} limit - Time limit in milliseconds
   * @returns {Function} Throttled function
   */
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  /**
   * Generate a unique ID
   * @param {string} prefix - Optional prefix for the ID
   * @returns {string} Unique ID
   */
  generateId(prefix = 'id') {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  },

  /**
   * Check if element is in viewport
   * @param {Element} element - Element to check
   * @returns {boolean} True if element is in viewport
   */
  isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  /**
   * Smooth scroll to element
   * @param {Element|string} target - Element or selector to scroll to
   * @param {number} offset - Offset from top in pixels
   */
  smoothScrollTo(target, offset = 0) {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  },

  /**
   * Format number with commas
   * @param {number} num - Number to format
   * @returns {string} Formatted number
   */
  formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },

  /**
   * Copy text to clipboard
   * @param {string} text - Text to copy
   * @returns {Promise<boolean>} Success status
   */
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return true;
      } catch (err) {
        document.body.removeChild(textArea);
        return false;
      }
    }
  }
};

// Modal Component
class Modal {
  constructor(options = {}) {
    this.options = {
      backdrop: true,
      keyboard: true,
      focus: true,
      ...options
    };
    this.isOpen = false;
    this.element = null;
  }

  /**
   * Create modal element
   * @param {string} title - Modal title
   * @param {string} content - Modal content
   * @param {string} footer - Modal footer content
   * @returns {Element} Modal element
   */
  create(title, content, footer = '') {
    const modalId = Utils.generateId('modal');
    const modalHtml = `
      <div class="modal" id="${modalId}">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">${title}</h3>
            <button class="modal-close" aria-label="Close modal">&times;</button>
          </div>
          <div class="modal-body">
            ${content}
          </div>
          ${footer ? `<div class="modal-footer">${footer}</div>` : ''}
        </div>
      </div>
    `;

    const modalElement = document.createElement('div');
    modalElement.innerHTML = modalHtml;
    this.element = modalElement.firstElementChild;
    
    document.body.appendChild(this.element);
    this.bindEvents();
    
    return this.element;
  }

  /**
   * Show modal
   */
  show() {
    if (this.element) {
      this.element.classList.add('show');
      this.isOpen = true;
      
      if (this.options.focus) {
        const focusableElement = this.element.querySelector('button, input, textarea, select, a[href]');
        if (focusableElement) {
          focusableElement.focus();
        }
      }
      
      document.body.style.overflow = 'hidden';
    }
  }

  /**
   * Hide modal
   */
  hide() {
    if (this.element) {
      this.element.classList.remove('show');
      this.isOpen = false;
      document.body.style.overflow = '';
      
      setTimeout(() => {
        if (this.element && this.element.parentNode) {
          this.element.parentNode.removeChild(this.element);
        }
      }, 300);
    }
  }

  /**
   * Bind modal events
   */
  bindEvents() {
    if (!this.element) return;

    // Close button
    const closeBtn = this.element.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.hide());
    }

    // Backdrop click
    if (this.options.backdrop) {
      this.element.addEventListener('click', (e) => {
        if (e.target === this.element) {
          this.hide();
        }
      });
    }

    // Keyboard events
    if (this.options.keyboard) {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.hide();
        }
      });
    }
  }
}

// Form Validation
class FormValidator {
  constructor(form, options = {}) {
    this.form = form;
    this.options = {
      errorClass: 'form-error',
      successClass: 'form-success',
      ...options
    };
    this.rules = new Map();
    this.bindEvents();
  }

  /**
   * Add validation rule
   * @param {string} field - Field name
   * @param {Function} validator - Validation function
   * @param {string} message - Error message
   */
  addRule(field, validator, message) {
    this.rules.set(field, { validator, message });
  }

  /**
   * Validate field
   * @param {Element} field - Field element
   * @returns {boolean} Validation result
   */
  validateField(field) {
    const fieldName = field.name;
    const rule = this.rules.get(fieldName);
    
    if (!rule) return true;

    const isValid = rule.validator(field.value);
    this.showFieldError(field, isValid ? '' : rule.message);
    
    return isValid;
  }

  /**
   * Validate entire form
   * @returns {boolean} Validation result
   */
  validate() {
    const fields = this.form.querySelectorAll('input, textarea, select');
    let isValid = true;

    fields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  /**
   * Show field error
   * @param {Element} field - Field element
   * @param {string} message - Error message
   */
  showFieldError(field, message) {
    const existingError = field.parentNode.querySelector(`.${this.options.errorClass}`);
    if (existingError) {
      existingError.remove();
    }

    if (message) {
      const errorElement = document.createElement('div');
      errorElement.className = this.options.errorClass;
      errorElement.textContent = message;
      field.parentNode.appendChild(errorElement);
      field.classList.add('invalid');
    } else {
      field.classList.remove('invalid');
    }
  }

  /**
   * Bind form events
   */
  bindEvents() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.validate()) {
        this.form.submit();
      }
    });

    // Real-time validation
    const fields = this.form.querySelectorAll('input, textarea, select');
    fields.forEach(field => {
      field.addEventListener('blur', () => this.validateField(field));
      field.addEventListener('input', Utils.debounce(() => this.validateField(field), 300));
    });
  }
}

// Animation Utilities
class Animations {
  /**
   * Fade in element
   * @param {Element} element - Element to animate
   * @param {number} duration - Animation duration in milliseconds
   */
  static fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    let start = performance.now();
    
    function animate(currentTime) {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      
      element.style.opacity = progress;
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    
    requestAnimationFrame(animate);
  }

  /**
   * Fade out element
   * @param {Element} element - Element to animate
   * @param {number} duration - Animation duration in milliseconds
   */
  static fadeOut(element, duration = 300) {
    let start = performance.now();
    const initialOpacity = parseFloat(getComputedStyle(element).opacity);
    
    function animate(currentTime) {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      
      element.style.opacity = initialOpacity * (1 - progress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.style.display = 'none';
      }
    }
    
    requestAnimationFrame(animate);
  }

  /**
   * Slide down element
   * @param {Element} element - Element to animate
   * @param {number} duration - Animation duration in milliseconds
   */
  static slideDown(element, duration = 300) {
    element.style.height = '0';
    element.style.overflow = 'hidden';
    element.style.display = 'block';
    
    const targetHeight = element.scrollHeight;
    let start = performance.now();
    
    function animate(currentTime) {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      
      element.style.height = (targetHeight * progress) + 'px';
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.style.height = 'auto';
        element.style.overflow = '';
      }
    }
    
    requestAnimationFrame(animate);
  }

  /**
   * Slide up element
   * @param {Element} element - Element to animate
   * @param {number} duration - Animation duration in milliseconds
   */
  static slideUp(element, duration = 300) {
    const initialHeight = element.offsetHeight;
    element.style.height = initialHeight + 'px';
    element.style.overflow = 'hidden';
    
    let start = performance.now();
    
    function animate(currentTime) {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      
      element.style.height = (initialHeight * (1 - progress)) + 'px';
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.style.display = 'none';
        element.style.height = '';
        element.style.overflow = '';
      }
    }
    
    requestAnimationFrame(animate);
  }
}

// Intersection Observer for animations
class ScrollAnimations {
  constructor(options = {}) {
    this.options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      animationClass: 'animate-in',
      ...options
    };
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      this.options
    );
    this.init();
  }

  /**
   * Initialize scroll animations
   */
  init() {
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      this.observer.observe(element);
    });
  }

  /**
   * Handle intersection
   * @param {IntersectionObserverEntry[]} entries - Intersection entries
   */
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        this.observer.unobserve(entry.target);
      }
    });
  }
}

// Notification System
class Notification {
  constructor(options = {}) {
    this.options = {
      duration: 5000,
      position: 'top-right',
      ...options
    };
  }

  /**
   * Show notification
   * @param {string} message - Notification message
   * @param {string} type - Notification type (success, error, info, warning)
   */
  show(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas ${this.getIcon(type)}"></i>
        <span>${message}</span>
        <button class="notification-close">&times;</button>
      </div>
    `;

    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${this.getColor(type)};
      color: white;
      padding: 15px 20px;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 300px;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove
    setTimeout(() => {
      this.remove(notification);
    }, this.options.duration);

    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => this.remove(notification));
  }

  /**
   * Remove notification
   * @param {Element} notification - Notification element
   */
  remove(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }

  /**
   * Get icon for notification type
   * @param {string} type - Notification type
   * @returns {string} Icon class
   */
  getIcon(type) {
    const icons = {
      success: 'fa-check-circle',
      error: 'fa-exclamation-circle',
      warning: 'fa-exclamation-triangle',
      info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
  }

  /**
   * Get color for notification type
   * @param {string} type - Notification type
   * @returns {string} Color value
   */
  getColor(type) {
    const colors = {
      success: '#34C759',
      error: '#FF3B30',
      warning: '#FF9500',
      info: '#007AFF'
    };
    return colors[type] || colors.info;
  }
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize scroll animations
  new ScrollAnimations();
  
  // Initialize form validation
  const forms = document.querySelectorAll('form[data-validate]');
  forms.forEach(form => {
    new FormValidator(form);
  });
  
  // Initialize modals
  const modalTriggers = document.querySelectorAll('[data-modal]');
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = new Modal();
      const title = trigger.dataset.modalTitle || 'Modal';
      const content = trigger.dataset.modalContent || 'Modal content';
      modal.create(title, content);
      modal.show();
    });
  });
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Utils,
    Modal,
    FormValidator,
    Animations,
    ScrollAnimations,
    Notification
  };
}
