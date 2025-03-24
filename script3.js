document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality with responsive handling
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    const messageBtn = document.querySelector('.call-btn');

    // Function to handle menu toggle
    const toggleMobileMenu = function() {
        navMenu.classList.toggle('mobile-menu');
        
        if (navMenu.classList.contains('mobile-menu')) {
            // Open menu with animation
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.alignItems = 'center';
            navMenu.style.opacity = '0';
            navMenu.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                navMenu.style.opacity = '1';
                navMenu.style.transform = 'translateY(0)';
            }, 100);
            
            // Add message button to mobile menu if it exists in DOM
            if (messageBtn && !navMenu.contains(messageBtn)) {
                const clonedMessageBtn = messageBtn.cloneNode(true);
                clonedMessageBtn.style.margin = '15px 0';
                navMenu.appendChild(clonedMessageBtn);
            }
        } else {
            // Close menu with animation
            navMenu.style.opacity = '0';
            navMenu.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                navMenu.style.display = 'none';
                // Remove cloned message button if exists
                const mobileMessageBtn = navMenu.querySelector('.call-btn');
                if (mobileMessageBtn && mobileMessageBtn !== messageBtn) {
                    mobileMessageBtn.remove();
                }
            }, 300);
        }
    };

    // Function to handle responsive layout changes
    const handleResponsiveLayout = function() {
        const windowWidth = window.innerWidth;
        
        if (windowWidth > 991) {
            // Desktop view - reset all mobile styles
            navMenu.classList.remove('mobile-menu');
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'row';
            navMenu.style.opacity = '1';
            navMenu.style.transform = 'none';
            
            // Ensure regular message button is visible
            if (messageBtn) {
                messageBtn.style.display = 'inline-block';
                messageBtn.style.marginLeft = '25px';
            }
        } else if (windowWidth > 767) {
            // Tablet view - show message button, hide nav menu
            navMenu.classList.remove('mobile-menu');
            navMenu.style.display = 'none';
            if (messageBtn) {
                messageBtn.style.display = 'inline-block';
                messageBtn.style.marginLeft = 'auto';
                messageBtn.style.marginRight = '15px';
            }
        } else {
            // Mobile view - hide message button (it will show in mobile menu)
            if (messageBtn) {
                messageBtn.style.display = 'none';
            }
        }
    };

    // Initialize event listeners
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', toggleMobileMenu);
        window.addEventListener('resize', handleResponsiveLayout);
        
        // Set initial state
        handleResponsiveLayout();
    }
  
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('mobile-menu')) {
                    navMenu.style.opacity = '0';
                    navMenu.style.transform = 'translateY(-20px)';
                    setTimeout(() => {
                        navMenu.style.display = 'none';
                        navMenu.classList.remove('mobile-menu');
                    }, 300);
                }
            }
        });
    });
    
    // Active menu highlighting based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 200)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    // Generic Slider Initialization Function
    function initializeSlider(sliderSelector) {
        const slider = document.querySelector(sliderSelector);
        if (!slider) return;
        
        const slides = slider.querySelectorAll('.slide');
        const indicators = slider.querySelectorAll('.indicator');
        let currentSlide = 0;
        const slideCount = slides.length;
        let slideInterval;
        
        function goToSlide(index) {
            // Remove active class from all slides and indicators
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));
            
            // Add active class to current slide and indicator
            slides[index].classList.add('active');
            indicators[index].classList.add('active');
            
            currentSlide = index;
        }
        
        function nextSlide() {
            let nextIndex = (currentSlide + 1) % slideCount;
            goToSlide(nextIndex);
        }
        
        function startSlideshow() {
            // Clear any existing interval
            if (slideInterval) {
                clearInterval(slideInterval);
            }
            
            // Set a new interval with consistent timing
            slideInterval = setInterval(nextSlide, 5000);
        }
        
        // Pause slideshow on hover
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        // Resume slideshow when mouse leaves
        slider.addEventListener('mouseleave', () => {
            startSlideshow();
        });
        
        // Add click event to indicators for manual sliding
        indicators.forEach(indicator => {
            indicator.addEventListener('click', () => {
                const slideIndex = parseInt(indicator.getAttribute('data-index'));
                goToSlide(slideIndex);
                
                // Reset the slideshow interval after manual slide
                startSlideshow();
            });
        });
        
        // Initialize the slider
        if (slides.length > 0) {
            goToSlide(0);
            startSlideshow();
        }
    }

    // Initialize all sliders on the page
    initializeSlider('.image-slider'); // Hero slider
    initializeSlider('.action-slider'); // Technicians in action slider

    // WhatsApp Chat Button
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/1234567890'; // Replace with actual number
    whatsappBtn.target = '_blank';
    whatsappBtn.classList.add('whatsapp-button');
    whatsappBtn.innerHTML = '💬 Message Us';
    document.body.appendChild(whatsappBtn);
  
    // Style WhatsApp button
    const whatsappStyle = document.createElement('style');
    whatsappStyle.innerHTML = `
        .whatsapp-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #25D366;
            color: white;
            padding: 12px 20px;
            border-radius: 25px;
            font-size: 16px;
            font-weight: bold;
            text-decoration: none;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            transition: background-color 0.3s, transform 0.2s;
            z-index: 1000;
        }
        .whatsapp-button:hover {
            background-color: #1EBE5D;
            transform: scale(1.05);
        }
    `;
    document.head.appendChild(whatsappStyle);
  
    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
    
            try {
                const formData = new FormData(contactForm);
                
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
    
                if (response.ok) {
                    const successMsg = document.createElement('div');
                    successMsg.className = 'form-success';
                    successMsg.textContent = 'Thank you! Your message has been sent.';
                    contactForm.parentNode.insertBefore(successMsg, contactForm.nextSibling);
                    setTimeout(() => successMsg.remove(), 5000);
                    contactForm.reset();
                } else {
                    const errorData = await response.json();
                    if (errorData.errors) {
                        alert('Error: ' + errorData.errors.map(error => error.message).join(', '));
                    } else {
                        alert('There was a problem submitting your form. Please try again.');
                    }
                }
            } catch (error) {
                console.error('Form submission error:', error);
                alert('There was a network error. Please check your connection and try again.');
            } finally {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});
