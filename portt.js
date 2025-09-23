/* ========================================
   Cherliya Wattanaissararat Portfolio JS
   Interactive Features & Animations
======================================== */

// DOM Elements
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTopBtn = document.querySelector('.back-to-top');
const contactForm = document.querySelector('.contact-form');
const progressBars = document.querySelectorAll('.progress-bar');
const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');

// Initialize when DOM is loaded
// Save scroll position before page unload
window.addEventListener('beforeunload', function() {
    sessionStorage.setItem('scrollPosition', window.scrollY);
});

// Restore scroll position after page load
window.addEventListener('load', function() {
    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition));
        sessionStorage.removeItem('scrollPosition');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeFormHandling();
    initializeSkillBars();
    initializeTypingEffect();
    initializeParallax();
});

/* ========================================
   Navigation Functions
======================================== */

function initializeNavigation() {
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            toggleMobileMenu();
        }
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', handleSmoothScroll);
    });

    // CTA button smooth scroll
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', handleSmoothScroll);
    }

    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
    
    // ScrollSpy
    window.addEventListener('scroll', handleScrollSpy);
}

function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

function handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    
    if (targetId && targetId.startsWith('#')) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

function handleNavbarScroll() {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 14, 19, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else {
        navbar.style.background = 'rgba(15, 14, 19, 0.9)';
        navbar.style.backdropFilter = 'blur(20px)';
    }
}

function handleScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            // Add active class to current link
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}

/* ========================================
   Scroll Effects
======================================== */

function initializeScrollEffects() {
    // Back to top button
    if (backToTopBtn) {
        window.addEventListener('scroll', handleBackToTop);
        backToTopBtn.addEventListener('click', scrollToTop);
    }
}

function handleBackToTop() {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/* ========================================
   Scroll Animations
======================================== */

function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}

/* ========================================
   Skill Progress Bars
======================================== */

function initializeSkillBars() {
    const skillsSection = document.querySelector('#skills');
    if (!skillsSection) return;

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillObserver.observe(skillsSection);
}

function animateSkillBars() {
    progressBars.forEach(bar => {
        const skillLevel = bar.getAttribute('data-progress') || 70;
        
        setTimeout(() => {
            bar.style.width = skillLevel + '%';
        }, 200);
    });
}

/* ========================================
   Typing Effect
======================================== */

function initializeTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;

    const texts = [
        'CHERLIYA WATTANAISSARARAT',
        'เฌอร์ลิญา วัฒนาอิสรารัชต์'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 3000; // Pause before deleting (increased for better readability)
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 800; // Pause before typing next text
        }

        setTimeout(typeText, typingSpeed);
    }

    // Start typing effect after a delay
    setTimeout(typeText, 1000);
}

/* ========================================
   Parallax Effects
======================================== */

function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.profile-image, .particles');
    
    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        parallaxElements.forEach(element => {
            if (element.classList.contains('profile-image')) {
                element.style.transform = `translateY(${rate * 0.2}px)`;
            } else if (element.classList.contains('particles')) {
                element.style.transform = `translateY(${rate * 0.1}px)`;
            }
        });
    });
}

/* ========================================
   Form Handling
======================================== */

function initializeFormHandling() {
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    const formData = new FormData(contactForm);
    
    // Show loading state
    submitBtn.innerHTML = '<span class="loading"></span> กำลังส่ง...';
    submitBtn.disabled = true;
    
    // Get form data
    const name = formData.get('name') || '';
    const email = formData.get('email') || '';
    const message = formData.get('message') || '';
    
    // Validate form data
    if (!name || !email || !message) {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        showToast('กรุณากรอกข้อมูลให้ครบถ้วน', 'error');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        showToast('กรุณากรอกอีเมลให้ถูกต้อง', 'error');
        return;
    }
    
    // Try multiple methods to send email
    try {
        // Method 1: Create mailto link with better formatting
        const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
        const body = encodeURIComponent(
            `สวัสดีครับ/ค่ะ\n\n` +
            `ชื่อ: ${name}\n` +
            `อีเมล: ${email}\n\n` +
            `ข้อความ:\n${message}\n\n` +
            `ส่งจากเว็บไซต์ Portfolio\n` +
            `วันที่: ${new Date().toLocaleDateString('th-TH')} เวลา: ${new Date().toLocaleTimeString('th-TH')}`
        );
        const mailtoLink = `mailto:cherliya.watt@gmail.com?subject=${subject}&body=${body}`;
        
        // Method 2: Try to open email client
        let emailOpened = false;
        
        // For mobile devices, try direct mailto
        if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            window.location.href = mailtoLink;
            emailOpened = true;
        } else {
            // For desktop, create a temporary link and click it
            const tempLink = document.createElement('a');
            tempLink.href = mailtoLink;
            tempLink.style.display = 'none';
            document.body.appendChild(tempLink);
            
            // Add event listener to detect if email client opened
            tempLink.addEventListener('click', () => {
                emailOpened = true;
            });
            
            tempLink.click();
            document.body.removeChild(tempLink);
            
            // Backup method: try window.open
            setTimeout(() => {
                if (!emailOpened) {
                    try {
                        window.open(mailtoLink, '_blank');
                        emailOpened = true;
                    } catch (e) {
                        console.log('Window.open failed:', e);
                    }
                }
            }, 500);
        }
        
        // Method 3: Copy email info to clipboard as fallback
        const emailContent = `ถึง: cherliya.watt@gmail.com\nหัวข้อ: Portfolio Contact from ${name}\n\nสวัสดีครับ/ค่ะ\n\nชื่อ: ${name}\nอีเมล: ${email}\n\nข้อความ:\n${message}\n\nส่งจากเว็บไซต์ Portfolio\nวันที่: ${new Date().toLocaleDateString('th-TH')} เวลา: ${new Date().toLocaleTimeString('th-TH')}`;
        
        // Try to copy to clipboard
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(emailContent).then(() => {
                console.log('Email content copied to clipboard');
            }).catch(err => {
                console.log('Failed to copy to clipboard:', err);
            });
        }
        
    } catch (error) {
        console.error('Email sending failed:', error);
        // Show fallback message with email address
        showToast(`เกิดข้อผิดพลาด กรุณาส่งอีเมลโดยตรงไปที่: cherliya.watt@gmail.com`, 'error');
    }
    
    // Reset form after short delay
    setTimeout(() => {
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        showToast('เปิดโปรแกรมอีเมลแล้ว! หากไม่สามารถส่งได้ กรุณาส่งอีเมลโดยตรงไปที่ cherliya.watt@gmail.com', 'success');
    }, 1500);
}

/* ========================================
   Toast Notifications
======================================== */

function showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

/* ========================================
   Card Hover Effects
======================================== */

// 3D Tilt Effect for Project Cards
function initializeCardEffects() {
    // Card tilt effect removed - keeping only CSS hover effects
}

// Initialize card effects when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCardEffects);

/* ========================================
   Magnetic Button Effect
======================================== */

function initializeMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.cta-button, .submit-btn, .social-link');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', handleMagneticMove);
        button.addEventListener('mouseleave', handleMagneticLeave);
    });
}

function handleMagneticMove(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
}

function handleMagneticLeave(e) {
    const button = e.currentTarget;
    button.style.transform = 'translate(0px, 0px)';
}

// Initialize magnetic buttons
document.addEventListener('DOMContentLoaded', initializeMagneticButtons);

/* ========================================
   Lazy Loading Images
======================================== */

function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initializeLazyLoading);

/* ========================================
   Keyboard Navigation
======================================== */

function initializeKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // ESC key to close mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
        
        // Enter key for buttons
        if (e.key === 'Enter' && e.target.classList.contains('nav-toggle')) {
            toggleMobileMenu();
        }
    });
}

// Initialize keyboard navigation
document.addEventListener('DOMContentLoaded', initializeKeyboardNavigation);

/* ========================================
   Performance Optimizations
======================================== */

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(handleNavbarScroll, 10));
window.addEventListener('scroll', throttle(handleScrollSpy, 10));
window.addEventListener('scroll', throttle(handleBackToTop, 10));

/* ========================================
   Accessibility Enhancements
======================================== */

// Focus management for mobile menu
function manageFocus() {
    const focusableElements = navMenu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    navMenu.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }
    });
}

// Initialize focus management
document.addEventListener('DOMContentLoaded', manageFocus);

/* ========================================
   Error Handling
======================================== */

// Global error handler
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
    // You can add error reporting here
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    e.preventDefault();
});

/* ========================================
   Activity Images Slideshow
======================================== */

// Activity images slideshow
function initActivitySlideshow() {
    const activityCards = document.querySelectorAll('.activity-card');
    
    activityCards.forEach(card => {
        const images = card.querySelectorAll('.activity-image');
        if (images.length <= 1) return;
        
        let currentIndex = 0;
        
        function showNextImage() {
            // Hide current image
            images[currentIndex].classList.remove('active');
            images[currentIndex].classList.add('fade-out');
            
            // Move to next image
            currentIndex = (currentIndex + 1) % images.length;
            
            // Show next image after a short delay
            setTimeout(() => {
                images.forEach(img => img.classList.remove('fade-out'));
                images[currentIndex].classList.add('active');
            }, 500);
        }
        
        // Start slideshow with random interval between 3-6 seconds
        const interval = 3000 + Math.random() * 3000;
        setInterval(showNextImage, interval);
    });
}

// Project images slideshow
function initProjectSlideshow() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const images = card.querySelectorAll('.project-img');
        if (images.length <= 1) return;
        
        let currentIndex = 0;
        
        function showNextImage() {
            // Hide current image
            images[currentIndex].classList.remove('active');
            images[currentIndex].classList.add('fade-out');
            
            // Move to next image
            currentIndex = (currentIndex + 1) % images.length;
            
            // Show next image after a short delay
            setTimeout(() => {
                images.forEach(img => img.classList.remove('fade-out'));
                images[currentIndex].classList.add('active');
            }, 500);
        }
        
        // Start slideshow with random interval between 3-6 seconds
        const interval = 3000 + Math.random() * 3000;
        setInterval(showNextImage, interval);
    });
}

// Initialize slideshow when page loads
document.addEventListener('DOMContentLoaded', initActivitySlideshow);
document.addEventListener('DOMContentLoaded', initProjectSlideshow);

/* ========================================
   Skills Toggle Function
======================================== */

function toggleSkillCategory(element) {
    const skillCategory = element.parentElement;
    const skillItems = element.nextElementSibling;
    const arrow = element.querySelector('.skill-arrow');
    const allCategories = document.querySelectorAll('.skill-category');
    
    // Check if we're on mobile (screen width <= 768px)
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Mobile behavior: toggle only the clicked category
        const isExpanded = skillItems && skillItems.classList.contains('expanded');
        
        if (isExpanded) {
            // Collapse this category
            skillItems.classList.remove('expanded');
            skillItems.classList.add('collapsed');
            if (arrow) arrow.classList.remove('rotated');
        } else {
            // Expand this category
            skillItems.classList.remove('collapsed');
            skillItems.classList.add('expanded');
            if (arrow) arrow.classList.add('rotated');
        }
    } else {
        // Desktop behavior: original row-based logic
        const categoryIndex = Array.from(allCategories).indexOf(skillCategory);
        
        // Define row groups (first row: 0,1,2; second row: 3,4,5; third row: 6)
        let rowCategories = [];
        if (categoryIndex >= 0 && categoryIndex <= 2) {
            // First row: Programming, Data Analyst, Data Science
            rowCategories = [allCategories[0], allCategories[1], allCategories[2]];
        } else if (categoryIndex >= 3 && categoryIndex <= 5) {
            // Second row: UX/UI, Business Analyst, Soft Skills
            rowCategories = [allCategories[3], allCategories[4], allCategories[5]];
        } else if (categoryIndex === 6) {
            // Third row: Tools & Platforms (spans full width)
            rowCategories = [allCategories[6]];
        }
        
        // Check if any item in the row is currently expanded
        const isAnyExpanded = rowCategories.some(cat => {
            const items = cat.querySelector('.skill-items');
            return items && items.classList.contains('expanded');
        });
        
        if (isAnyExpanded) {
            // Collapse all items in the row
            rowCategories.forEach(cat => {
                const items = cat.querySelector('.skill-items');
                const catArrow = cat.querySelector('.skill-arrow');
                if (items && catArrow) {
                    items.classList.remove('expanded');
                    items.classList.add('collapsed');
                    catArrow.classList.remove('rotated');
                }
            });
        } else {
            // Expand all items in the row
            rowCategories.forEach(cat => {
                const items = cat.querySelector('.skill-items');
                const catArrow = cat.querySelector('.skill-arrow');
                if (items && catArrow) {
                    items.classList.remove('collapsed');
                    items.classList.add('expanded');
                    catArrow.classList.add('rotated');
                }
            });
        }
    }
}

/* ========================================
   Image Modal Functions
======================================== */

function openModal(imageSrc) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.image-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="zoom-controls">
                <button class="zoom-btn zoom-in" title="Zoom In">+</button>
                <button class="zoom-btn zoom-out" title="Zoom Out">-</button>
                <button class="zoom-btn zoom-reset" title="Reset Zoom">⌂</button>
            </div>
            <div class="image-container">
                <img src="${imageSrc}" alt="Certificate" class="modal-image">
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Initialize zoom functionality
    initializeZoom(modal);
    
    // Close modal events
    const closeBtn = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');
    
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    
    // Close on ESC key
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

function openActivityGallery(images, title) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.gallery-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    let currentIndex = 0;
    
    // Create gallery modal
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="gallery-content">
            <button class="modal-close">&times;</button>
            <h3 class="gallery-title">${title}</h3>
            <div class="zoom-controls">
                <button class="zoom-btn zoom-in" title="Zoom In">+</button>
                <button class="zoom-btn zoom-out" title="Zoom Out">-</button>
                <button class="zoom-btn zoom-reset" title="Reset Zoom">⌂</button>
            </div>
            <div class="gallery-navigation">
                <button class="nav-btn prev-btn" ${images.length <= 1 ? 'style="display:none"' : ''}>‹</button>
                <div class="gallery-image-container">
                    <img src="${images[0]}" alt="${title}" class="gallery-image">
                </div>
                <button class="nav-btn next-btn" ${images.length <= 1 ? 'style="display:none"' : ''}>›</button>
            </div>
            <div class="gallery-counter" ${images.length <= 1 ? 'style="display:none"' : ''}>
                <span class="current-image">1</span> / <span class="total-images">${images.length}</span>
            </div>
            <div class="gallery-thumbnails" ${images.length <= 1 ? 'style="display:none"' : ''}>
                ${images.map((img, index) => `
                    <img src="${img}" alt="Thumbnail ${index + 1}" class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
                `).join('')}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // Initialize zoom functionality for gallery
    initializeGalleryZoom(modal);
    
    // Gallery functionality
    const galleryImage = modal.querySelector('.gallery-image');
    const currentImageSpan = modal.querySelector('.current-image');
    const prevBtn = modal.querySelector('.prev-btn');
    const nextBtn = modal.querySelector('.next-btn');
    const thumbnails = modal.querySelectorAll('.thumbnail');
    
    function updateImage(index) {
        currentIndex = index;
        galleryImage.src = images[index];
        if (currentImageSpan) currentImageSpan.textContent = index + 1;
        
        // Update thumbnails
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }
    
    // Navigation events
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
            updateImage(currentIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
            updateImage(currentIndex);
        });
    }
    
    // Thumbnail clicks
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            updateImage(index);
        });
    });
    
    // Keyboard navigation
    function keyHandler(e) {
        if (e.key === 'ArrowLeft' && images.length > 1) {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
            updateImage(currentIndex);
        } else if (e.key === 'ArrowRight' && images.length > 1) {
            currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
            updateImage(currentIndex);
        } else if (e.key === 'Escape') {
            closeGallery();
        }
    }
    
    document.addEventListener('keydown', keyHandler);
    
    // Close modal events
    const closeBtn = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');
    
    function closeGallery() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        document.removeEventListener('keydown', keyHandler);
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeGallery);
    backdrop.addEventListener('click', closeGallery);
}

function initializeZoom(modal) {
    const image = modal.querySelector('.modal-image');
    const imageContainer = modal.querySelector('.image-container');
    const zoomInBtn = modal.querySelector('.zoom-in');
    const zoomOutBtn = modal.querySelector('.zoom-out');
    const zoomResetBtn = modal.querySelector('.zoom-reset');
    
    let scale = 1;
    let isDragging = false;
    let startX, startY, translateX = 0, translateY = 0;
    
    function updateTransform() {
        image.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
    }
    
    // Zoom controls
    zoomInBtn.addEventListener('click', () => {
        scale = Math.min(scale * 1.2, 5);
        updateTransform();
    });
    
    zoomOutBtn.addEventListener('click', () => {
        scale = Math.max(scale / 1.2, 0.5);
        updateTransform();
    });
    
    zoomResetBtn.addEventListener('click', () => {
        scale = 1;
        translateX = 0;
        translateY = 0;
        updateTransform();
    });
    
    // Mouse wheel zoom
    imageContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        scale = Math.min(Math.max(scale * delta, 0.5), 5);
        updateTransform();
    });
    
    // Drag to pan when zoomed
    image.addEventListener('mousedown', (e) => {
        if (scale > 1) {
            isDragging = true;
            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
            image.style.cursor = 'grabbing';
        }
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            translateX = e.clientX - startX;
            translateY = e.clientY - startY;
            updateTransform();
        }
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
        image.style.cursor = scale > 1 ? 'grab' : 'default';
    });
    
    // Touch support for mobile
    let initialDistance = 0;
    let initialScale = 1;
    
    imageContainer.addEventListener('touchstart', (e) => {
        if (e.touches.length === 2) {
            initialDistance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            initialScale = scale;
        }
    });
    
    imageContainer.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (e.touches.length === 2) {
            const currentDistance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            scale = Math.min(Math.max(initialScale * (currentDistance / initialDistance), 0.5), 5);
            updateTransform();
        }
    });
}

function initializeGalleryZoom(modal) {
    const image = modal.querySelector('.gallery-image');
    const imageContainer = modal.querySelector('.gallery-image-container');
    const zoomInBtn = modal.querySelector('.zoom-in');
    const zoomOutBtn = modal.querySelector('.zoom-out');
    const zoomResetBtn = modal.querySelector('.zoom-reset');
    
    let scale = 1;
    let isDragging = false;
    let startX, startY, translateX = 0, translateY = 0;
    
    function updateTransform() {
        image.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
    }
    
    function resetZoom() {
        scale = 1;
        translateX = 0;
        translateY = 0;
        updateTransform();
    }
    
    // Reset zoom when image changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
                resetZoom();
            }
        });
    });
    observer.observe(image, { attributes: true });
    
    // Zoom controls
    zoomInBtn.addEventListener('click', () => {
        scale = Math.min(scale * 1.2, 5);
        updateTransform();
    });
    
    zoomOutBtn.addEventListener('click', () => {
        scale = Math.max(scale / 1.2, 0.5);
        updateTransform();
    });
    
    zoomResetBtn.addEventListener('click', resetZoom);
    
    // Mouse wheel zoom
    imageContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        scale = Math.min(Math.max(scale * delta, 0.5), 5);
        updateTransform();
    });
    
    // Drag to pan when zoomed
    image.addEventListener('mousedown', (e) => {
        if (scale > 1) {
            isDragging = true;
            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
            image.style.cursor = 'grabbing';
        }
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            translateX = e.clientX - startX;
            translateY = e.clientY - startY;
            updateTransform();
        }
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
        image.style.cursor = scale > 1 ? 'grab' : 'default';
    });
    
    // Touch support for mobile
    let initialDistance = 0;
    let initialScale = 1;
    
    imageContainer.addEventListener('touchstart', (e) => {
        if (e.touches.length === 2) {
            initialDistance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            initialScale = scale;
        }
    });
    
    imageContainer.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (e.touches.length === 2) {
            const currentDistance = Math.hypot(
                e.touches[0].clientX - e.touches[1].clientX,
                e.touches[0].clientY - e.touches[1].clientY
            );
            scale = Math.min(Math.max(initialScale * (currentDistance / initialDistance), 0.5), 5);
            updateTransform();
        }
    });
}

function initializeImageModal() {
    // Add click event listeners to small images for modal
    document.querySelectorAll('.small-image img').forEach(img => {
        img.addEventListener('click', function() {
            openModal(this.src);
        });
    });
    
    // Add click event listener to main about image for modal
    const mainAboutImage = document.querySelector('.about-image > img');
    if (mainAboutImage) {
        mainAboutImage.addEventListener('click', function() {
            openModal(this.src);
        });
    }
}

// Initialize image modal when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeImageModal);

/* ========================================
   Console Welcome Message
======================================== */

console.log('%c🌟 Cherliya Wattanaissararat Portfolio', 'color: #9b5cff; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ using HTML5, CSS3, and Vanilla JavaScript', 'color: #ff4fd8; font-size: 14px;');
console.log('%cInterested in the code? Check out the source!', 'color: #b9b6c9; font-size: 12px;');
