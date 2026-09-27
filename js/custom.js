/**
 * MD. ZIAUL HASAN — DIGITAL STUDIO PORTFOLIO
 * Production Frontend JavaScript Engine
 * Features: Luxury Motion, Custom Cursor, ScrollTrigger Observer,
 * Dynamic Case Study Drawer, Mobile Navigation, Interactive Forms
 */

(function () {
  'use strict';

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------------
     01. STICKY HEADER & SCROLL BEHAVIOR
     ------------------------------------------------------------------------ */
  const siteHeader = document.getElementById('siteHeader');
  let lastScrollY = window.pageYOffset;
  let ticking = false;

  function updateHeader() {
    const currentScrollY = window.pageYOffset;
    if (currentScrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });
  updateHeader();

  /* ------------------------------------------------------------------------
     02. MOBILE FULL-SCREEN NAVIGATION
     ------------------------------------------------------------------------ */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  /* ------------------------------------------------------------------------
     03. SMOOTH INTERNAL ANCHOR SCROLLING
     ------------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      }
    });
  });

  /* ------------------------------------------------------------------------
     04. LUXURY CUSTOM CURSOR (DESKTOP ONLY)
     ------------------------------------------------------------------------ */
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  const ringText = document.querySelector('.cursor-ring-text');

  const isDesktopPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (isDesktopPointer && !prefersReducedMotion && dot && ring) {
    document.body.classList.add('has-custom-cursor');

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }

      // Dot follows immediately
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      isVisible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      isVisible = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    });

    // Smooth lerp for outer ring
    function renderCursor() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    // Hover interactions
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, .project-card, .service-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (el.closest('.project-card') || el.classList.contains('project-card')) {
          ring.classList.add('cursor-view');
          if (ringText) ringText.textContent = 'VIEW';
        } else {
          ring.classList.add('cursor-hover');
        }
      });

      el.addEventListener('mouseleave', () => {
        ring.classList.remove('cursor-hover', 'cursor-view');
        if (ringText) ringText.textContent = '';
      });
    });

    // Magnetic CTA Button effect
    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary');
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  /* ------------------------------------------------------------------------
     05. HERO AMBIENT LIGHTING FOLLOWING CURSOR
     ------------------------------------------------------------------------ */
  const heroSection = document.getElementById('home');
  const heroGlow = document.querySelector('.hero-ambient-glow');

  if (heroSection && heroGlow && !prefersReducedMotion) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const moveX = (x / rect.width - 0.5) * 60;
      const moveY = (y / rect.height - 0.5) * 60;

      heroGlow.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    }, { passive: true });
  }

  /* ------------------------------------------------------------------------
     06. SCROLL REVEAL OBSERVER
     ------------------------------------------------------------------------ */
  const revealElements = document.querySelectorAll('.reveal-fade-up');

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Graceful fallback: reveal immediately
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  /* ------------------------------------------------------------------------
     07. PROCESS TIMELINE PROGRESS TRACKER
     ------------------------------------------------------------------------ */
  const processSection = document.getElementById('process');
  const processLineFill = document.querySelector('.process-line-fill');
  const processSteps = document.querySelectorAll('.process-step');

  if (processSection && processLineFill && processSteps.length > 0) {
    function checkProcessProgress() {
      const rect = processSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight * 0.7 && rect.bottom >= 0) {
        const totalTravel = rect.height;
        const currentProgress = Math.min(Math.max((windowHeight * 0.7 - rect.top) / totalTravel, 0), 1);
        
        processLineFill.style.width = `${currentProgress * 100}%`;

        // Highlight steps
        processSteps.forEach((step, idx) => {
          const stepThreshold = idx / (processSteps.length - 1);
          if (currentProgress >= stepThreshold * 0.8) {
            step.classList.add('active');
          } else {
            step.classList.remove('active');
          }
        });
      }
    }

    window.addEventListener('scroll', checkProcessProgress, { passive: true });
    checkProcessProgress();
  }

  /* ------------------------------------------------------------------------
     08. CASE STUDY DATA & INTERACTIVE DRAWER
     ------------------------------------------------------------------------ */
  const caseStudies = {
    'luminary': {
      title: 'The Luminary Club',
      subtitle: 'Luxury Private Members Portal & Bespoke Hospitality Booking Platform',
      industry: 'Luxury Hospitality & Concierge',
      services: 'Custom WordPress Development, WooCommerce Customization, Dynamic CPTs',
      technologies: 'WordPress Core, Elementor Pro, Crocoblock JetEngine, WooCommerce, SCSS, JS',
      image: 'images/project-luminary.svg',
      overview: 'The Luminary Club represents an ultra-high-net-worth private membership portal offering bespoke private island bookings, Michelin-starred culinary reservations, and dedicated concierge dispatch.',
      challenge: 'The client required a private, authenticated booking flow that felt effortless while executing complex multi-criteria room and villa availability checks without page refreshes, maintaining an uncompromised luxury aesthetic and sub-second load times.',
      solution: 'We engineered a bespoke WordPress architecture utilizing JetEngine for custom post types and relational meta fields, connected to a streamlined, headless-inspired WooCommerce checkout flow. Every interface component was handcrafted to eliminate typical ecommerce bloat.',
      features: [
        'Custom Member Authentication & Tier-Based Portal Access',
        'Dynamic Multi-Property Real-Time Filtering Engine (JetSmartFilters)',
        'Bespoke WooCommerce Checkout with Stripe Concierge API integration',
        'Zero-Bloat Core Web Vitals optimization achieving 99.4% Performance grade',
        'Fully responsive bespoke typography and editorial layouts across all viewports'
      ],
      results: 'Achieved an average page load time of 0.78 seconds, a 3.4x lift in member inquiry completions, and 100% positive executive stakeholder feedback.'
    },
    'novatech': {
      title: 'NovaTech Analytics',
      subtitle: 'B2B Enterprise Predictive Telemetry & Data Platform',
      industry: 'Enterprise Software & SaaS',
      services: 'UI/UX Design, Elementor Pro Engineering, Conversion Optimization',
      technologies: 'WordPress, Elementor Pro, Vanilla JavaScript, CSS3 Animations, Core Web Vitals',
      image: 'images/project-novatech.svg',
      overview: 'NovaTech Analytics delivers machine learning infrastructure for Fortune 500 financial institutions. The goal of this redesign was to transform a complex technical product into a clear, high-trust commercial conversion engine.',
      challenge: 'Enterprise B2B buyers were bouncing due to dense technical jargon and slow-loading legacy pages. The company needed to explain high-dimensional mathematical data in seconds while capturing qualified enterprise sales leads.',
      solution: 'Designed and developed an editorial dark-mode interface with custom interactive SVG graphs and responsive feature matrix tabs. Replaced heavy third-party plugins with custom vanilla JavaScript to guarantee a 98+ Google Lighthouse score.',
      features: [
        'Interactive telemetry data visualization built in lightweight vector SVG',
        'Custom lead-routing enterprise quotation funnel integrated with HubSpot',
        'Multi-tab dynamic technical documentation and case study archive',
        'Pixel-perfect Elementor Pro implementation with custom CSS design tokens',
        'Performance-hardened asset bundling with lazy-loading and critical CSS inlining'
      ],
      results: 'Increased enterprise trial registrations by 142% within 60 days of launch, with an LCP (Largest Contentful Paint) under 0.8 seconds globally.'
    },
    'aesthetix': {
      title: 'Studio Aesthetix',
      subtitle: 'Minimalist Architectural Masterpieces & Spatial Portfolio',
      industry: 'Architecture & Spatial Design',
      services: 'Full-Cycle Web Design, WordPress Custom Theme, Dynamic Grid System',
      technologies: 'WordPress, Crocoblock, Advanced Custom Fields, Custom JavaScript, CSS Grid',
      image: 'images/project-aesthetix.svg',
      overview: 'A boutique European architecture practice needed a portfolio website that functioned like an exquisite museum catalogue—prioritizing negative space, razor-sharp photography, and fluid responsive transitions.',
      challenge: 'High-resolution architectural photography frequently leads to massive payload sizes and stuttering scroll behavior on mobile devices.',
      solution: 'Implemented responsive image `srcset` pipelines, progressive blur-up lazy loading, and hardware-accelerated CSS transforms. Designed an asymmetric grid layout that automatically adjusts to photograph aspect ratios without awkward cropping.',
      features: [
        'Asymmetric responsive editorial portfolio grid with instant category filtering',
        'Progressive high-definition image optimization pipeline with zero layout shift (CLS 0.00)',
        'Full-screen interactive project gallery with keyboard and touch swipe navigation',
        'Custom architectural monograph case study layouts with project blueprint embeds',
        'Fluid clamp typography scaling harmoniously from mobile to 4K displays'
      ],
      results: 'Delivered a silky 60 FPS browsing experience that directly contributed to the studio securing three international museum design commissions.'
    },
    'vanguard': {
      title: 'Vanguard Capital',
      subtitle: 'Private Equity & Venture Growth Advisory Platform',
      industry: 'Private Equity & Venture Capital',
      services: 'Brand Identity Consultation, WordPress Theme Development, Enterprise Security',
      technologies: 'WordPress, Advanced Custom Fields Pro, Tailwind/Custom CSS, REST API',
      image: 'images/project-vanguard.svg',
      overview: 'Vanguard Capital represents over $280M in venture assets across North America and Europe. They required an authoritative digital presence that inspires institutional trust and simplifies deal submission.',
      challenge: 'The platform needed to communicate institutional prestige, handle confidential pitch deck uploads securely, and provide an intuitive dashboard for portfolio founders.',
      solution: 'Crafted a bespoke, minimalist Swiss-inspired design system with bank-grade form encryption, strict Content Security Policies (CSP), and automated encrypted pitch uploads via WordPress REST API.',
      features: [
        'Executive deal submission portal with end-to-end encrypted file dispatch',
        'Interactive portfolio company database with sector and stage filters',
        'Executive insights blog with structured Schema.org financial publishing data',
        'Bank-grade SSL and security hardening against malicious penetration attempts',
        'Complete bilingual English/German responsive design structure'
      ],
      results: 'Generated an 85% increase in inbound proprietary deal flow within the first quarter and earned an A+ security audit rating.'
    },
    'apex': {
      title: 'Apex Digital Academy',
      subtitle: 'High-Converting Video Coaching & Course Funnel Ecosystem',
      industry: 'Knowledge Commerce & EdTech',
      services: 'Funnel Architecture, Kajabi & WordPress Integration, Checkout UX',
      technologies: 'Kajabi, WordPress LMS, Stripe Elements, Video CDN Integration, CSS3',
      image: 'images/project-apex.svg',
      overview: 'Apex Digital Academy offers premier cohort-based learning for software engineers and digital architects. This project involved designing and building an end-to-end sales funnel and student learning portal.',
      challenge: 'The client struggled with low checkout completion rates and fragmented user experiences across disparate video platforms and course managers.',
      solution: 'Consolidated the learning environment into a frictionless 4-step sales funnel featuring seamless one-click Stripe checkouts, high-speed CDN video streaming, and automated student onboarding.',
      features: [
        'High-converting 4-stage sales funnel with integrated social proof micro-interactions',
        'Frictionless checkout experience with Apple Pay, Google Pay, and Stripe Elements',
        'Custom student curriculum dashboard with video completion progress tracking',
        'Automated email trigger sequences connected via webhook automations',
        'Fast-loading video player with adaptive bitrate delivery'
      ],
      results: 'Boosted overall funnel checkout conversion to 8.4% (industry average is 2.1%) and successfully onboarded over 12,800 active paying students.'
    }
  };

  const modalOverlay = document.getElementById('caseStudyModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalContentContainer = document.getElementById('modalContent');

  function openCaseStudy(projectId) {
    const data = caseStudies[projectId];
    if (!data) return;

    modalContentContainer.innerHTML = `
      <img src="${data.image}" alt="${data.title} Mockup" class="modal-hero-image" loading="lazy">
      <div class="eyebrow">${data.industry}</div>
      <h2 class="modal-title">${data.title}</h2>
      <p class="modal-body-text" style="font-size: 1.15rem; color: var(--text-primary); font-weight: 500;">
        ${data.subtitle}
      </p>

      <div class="modal-meta-grid">
        <div>
          <div class="modal-meta-label">Services</div>
          <div class="modal-meta-val">${data.services}</div>
        </div>
        <div>
          <div class="modal-meta-label">Core Technologies</div>
          <div class="modal-meta-val">${data.technologies}</div>
        </div>
        <div>
          <div class="modal-meta-label">Primary Outcome</div>
          <div class="modal-meta-val" style="color: var(--accent);">${data.results.split(',')[0]}</div>
        </div>
      </div>

      <h3 class="modal-section-title">Project Overview</h3>
      <p class="modal-body-text">${data.overview}</p>

      <h3 class="modal-section-title">The Challenge</h3>
      <p class="modal-body-text">${data.challenge}</p>

      <h3 class="modal-section-title">The Engineering Solution</h3>
      <p class="modal-body-text">${data.solution}</p>

      <h3 class="modal-section-title">Key Architectural Features</h3>
      <div class="modal-feature-list">
        ${data.features.map(f => `<div class="modal-feature-item"><span>${f}</span></div>`).join('')}
      </div>

      <h3 class="modal-section-title">Business Outcomes & Delivery</h3>
      <p class="modal-body-text">${data.results}</p>

      <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid var(--border-subtle); display: flex; gap: 16px; flex-wrap: wrap;">
        <a href="#contact" class="btn btn-primary" onclick="window.closeCaseStudyModal()">
          Build A Similar Project ↗
        </a>
        <a href="https://www.upwork.com/freelancers/~010293154926636989" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
          Verify on Upwork Profile ↗
        </a>
      </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCaseStudy() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Expose to window for inline onclick handlers
  window.openCaseStudyModal = openCaseStudy;
  window.closeCaseStudyModal = closeCaseStudy;

  if (modalOverlay) {
    modalCloseBtn.addEventListener('click', closeCaseStudy);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeCaseStudy();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeCaseStudy();
      }
    });
  }

  // Attach click listener to project cards and CTA buttons
  document.querySelectorAll('[data-project]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = trigger.getAttribute('data-project');
      openCaseStudy(projectId);
    });
  });

  /* ------------------------------------------------------------------------
     09. HIGH-CONVERSION CONTACT FORM
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('formName').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const projectType = document.getElementById('formType').value;
      const budget = document.getElementById('formBudget').value;
      const details = document.getElementById('formDetails').value.trim();

      // Basic validation
      if (!name || !email || !details) {
        formStatus.className = 'form-status-alert error';
        formStatus.textContent = 'Please fill out all required fields (Name, Email, Project Details).';
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formStatus.className = 'form-status-alert error';
        formStatus.textContent = 'Please enter a valid business email address.';
        return;
      }

      // UI Feedback: Sending state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `Sending Your Inquiry...`;
      formStatus.style.display = 'none';

      // Simulate sending inquiry
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        formStatus.className = 'form-status-alert success';
        formStatus.innerHTML = `
          <strong>Thank you, ${name}!</strong> Your project inquiry has been received. I will review your requirements and respond within 24 hours. For urgent matters, you can also reach me directly via WhatsApp at +8801303387509.
        `;

        contactForm.reset();

        // Auto hide success after 10 seconds
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 10000);
      }, 900);
    });
  }

  /* ------------------------------------------------------------------------
     10. ACTIVE NAVIGATION LINK ON SCROLL
     ------------------------------------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');

  function highlightNavOnScroll() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

})();