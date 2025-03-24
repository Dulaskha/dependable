document.addEventListener('DOMContentLoaded', function() {
    // Create icons for services
    function createHeatingIcon() {
      const svgNS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("viewBox", "0 0 100 100");
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      
      const flame = document.createElementNS(svgNS, "path");
      flame.setAttribute("d", "M30 70 C40 30, 60 30, 70 70 C60 90, 40 90, 30 70 Z");
      flame.setAttribute("fill", "#EE7325");
      
      svg.appendChild(flame);
      return svg;
    }
    
    function createCoolingIcon() {
      const svgNS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("viewBox", "0 0 100 100");
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      
      const snowflake = document.createElementNS(svgNS, "path");
      snowflake.setAttribute("d", "M50 20 L50 80 M30 30 L70 70 M30 70 L70 30 M20 50 L80 50");
      snowflake.setAttribute("stroke", "#0677BA");
      snowflake.setAttribute("stroke-width", "4");
      snowflake.setAttribute("stroke-linecap", "round");
      snowflake.setAttribute("fill", "none");
      
      svg.appendChild(snowflake);
      return svg;
    }
    
    function createMaintenanceIcon() {
      const svgNS = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("viewBox", "0 0 100 100");
      svg.setAttribute("width", "100%");
      svg.setAttribute("height", "100%");
      
      const wrench = document.createElementNS(svgNS, "path");
      wrench.setAttribute("d", "M35 25 L65 55 L75 45 C85 55, 85 70, 75 80 C65 90, 50 90, 40 80 L50 70 L20 40 Z");
      wrench.setAttribute("fill", "#7BADD7");
      
      svg.appendChild(wrench);
      return svg;
    }
    
    // Replace service icons
    const heatingIcon = document.getElementById('heating-icon');
    if (heatingIcon) {
      heatingIcon.replaceWith(createHeatingIcon());
    }
    
    const coolingIcon = document.getElementById('cooling-icon');
    if (coolingIcon) {
      coolingIcon.replaceWith(createCoolingIcon());
    }
    
    const maintenanceIcon = document.getElementById('maintenance-icon');
    if (maintenanceIcon) {
      maintenanceIcon.replaceWith(createMaintenanceIcon());
    }
    
    // Mobile menu functionality with responsive handling
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');
const messageBtn = document.querySelector('.message-btn');

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
            const mobileMessageBtn = navMenu.querySelector('.message-btn');
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
  
    // Image slider functionality
    function initializeSlider() {
      const slides = document.querySelectorAll('.slide');
      const indicators = document.querySelectorAll('.indicator');
      let currentSlide = 0;
      const slideCount = slides.length;
      let slideInterval;
      
      function goToSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        
        currentSlide = index;
      }
      
      function nextSlide() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= slideCount) {
          nextIndex = 0;
        }
        goToSlide(nextIndex);
      }
      
      function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
      }
      
      const sliderContainer = document.querySelector('.image-slider');
      if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => {
          clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
          startSlideshow();
        });
      }
      
      indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
          const slideIndex = parseInt(indicator.getAttribute('data-index'));
          goToSlide(slideIndex);
          clearInterval(slideInterval);
          startSlideshow();
        });
      });
      
      if (slides.length > 0) {
        goToSlide(0);
        startSlideshow();
      }
    }
    
    if (document.querySelector('.image-slider')) {
      initializeSlider();
    }
  
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
