/**
 * MD. ZIAUL HASAN — DIGITAL STUDIO PORTFOLIO (V2 POLISHED ENGINE)
 * Production Frontend JavaScript Engine
 * Features:
 * 1. Staggered Hero Sequence (<1s total execution, Awwwards-grade easing)
 * 2. Desktop Tactile Custom Cursor with dynamic "VIEW" state
 * 3. Tactile 5-8px Image Movement on Project Card hover
 * 4. Magnetic CTA Button micro-interaction (5-8px bounds)
 * 5. Progressive Process Timeline scroll-drawing engine
 * 6. Clip-Path Image Reveal on About section
 * 7. Fast Minimal Page Transitions (450ms)
 * 8. Dynamic Case Study Drawer & Standalone Navigation
 * 9. High-Conversion Validated Inquiry Form
 * 10. Prefers-Reduced-Motion & Touch Graceful Degradation
 */

(function () {
  'use strict';

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDesktopPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ------------------------------------------------------------------------
     01. PAGE TRANSITIONS (Subtle, 450ms, zero long loader)
     ------------------------------------------------------------------------ */
  const pageTransitionVeil = document.querySelector('.page-transition-veil');

  if (pageTransitionVeil && !prefersReducedMotion) {
    // Fade out veil on page load
    window.addEventListener('pageshow', () => {
      pageTransitionVeil.classList.remove('active');
    });

    // Intercept clicks on internal page links
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      // Only internal full-page navigation (.html files)
      if (href && href.endsWith('.html') && !href.startsWith('http') && !href.startsWith('#')) {
        link.addEventListener('click', function (e) {
          // Allow opening in new tab
          if (e.metaKey || e.ctrlKey || link.target === '_blank') return;

          e.preventDefault();
          pageTransitionVeil.classList.add('active');

          setTimeout(() => {
            window.location.href = href;
          }, 420);
        });
      }
    });
  }

  /* ------------------------------------------------------------------------
     02. HERO STAGGERED ENTRANCE (< 1s execution)
     ------------------------------------------------------------------------ */
  const siteHeader = document.getElementById('siteHeader');
  const heroSection = document.getElementById('home');

  function initHeroSequence() {
    // Step 1: Nav slides down smoothly
    if (siteHeader) {
      siteHeader.classList.add('header-loaded');
    }

    // Step 2-5: Hero headline line-by-line, paragraph, CTAs & status pill
    if (heroSection) {
      heroSection.classList.add('hero-loaded');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroSequence);
  } else {
    initHeroSequence();
  }

  /* ------------------------------------------------------------------------
     03. STICKY HEADER & SCROLL STATE
     ------------------------------------------------------------------------ */
  let ticking = false;

  function updateHeader() {
    const currentScrollY = window.pageYOffset;
    if (currentScrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
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
     04. MOBILE FULL-SCREEN NAVIGATION
     ------------------------------------------------------------------------ */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    if (hamburger) {
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
    }
    if (mobileMenu) {
      mobileMenu.classList.add('open');
      mobileMenu.setAttribute('aria-hidden', 'false');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (hamburger) {
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
    if (mobileMenu) {
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
    }
    document.body.style.overflow = '';
  }

  if (mobileMenu) {
    if (hamburger) {
      hamburger.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.contains('open');
        if (isOpen) {
          closeMobileMenu();
        } else {
          openMobileMenu();
        }
      });
    }

    if (mobileNavClose) {
      mobileNavClose.addEventListener('click', (e) => {
        e.preventDefault();
        closeMobileMenu();
      });
    }

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024 && mobileMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  /* ------------------------------------------------------------------------
     05. SMOOTH INTERNAL ANCHOR SCROLLING
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
     06. DESKTOP CUSTOM CURSOR WITH "VIEW" MORPH
     ------------------------------------------------------------------------ */
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  const ringText = document.querySelector('.cursor-ring-text');

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

    // Lerp smooth trailing outer ring
    function renderCursor() {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(renderCursor);
    }
    renderCursor();

    // Hover interactions
    const interactiveLinks = document.querySelectorAll('a, button, input, select, textarea');
    interactiveLinks.forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('cursor-hover'));
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        ring.classList.add('cursor-view');
        document.body.classList.add('has-cursor-view');
        if (ringText) ringText.innerHTML = 'VIEW<br>PROJECT ↗';
      });
      card.addEventListener('mouseleave', () => {
        ring.classList.remove('cursor-view');
        document.body.classList.remove('has-cursor-view');
        if (ringText) ringText.innerHTML = '';
      });
    });

    /* ----------------------------------------------------------------------
       07. MAGNETIC BUTTON INTERACTION (5-8px subtle pull)
       ---------------------------------------------------------------------- */
    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-secondary');
    magneticBtns.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        // Bounded to strictly 6-7px
        const moveX = Math.max(-7, Math.min(7, x * 0.18));
        const moveY = Math.max(-7, Math.min(7, y * 0.18));
        btn.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate3d(0px, 0px, 0)';
      });
    });

    /* ----------------------------------------------------------------------
       08. TACTILE PROJECT IMAGE CURSOR PARALLAX (5-8px subtle movement)
       ---------------------------------------------------------------------- */
    projectCards.forEach(card => {
      const media = card.querySelector('.project-media');
      const inner = card.querySelector('.project-media-inner');
      if (!media || !inner) return;

      media.addEventListener('mousemove', (e) => {
        const rect = media.getBoundingClientRect();
        const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
        const yRatio = (e.clientY - rect.top) / rect.height - 0.5;

        // Subtle 6px translation
        const moveX = xRatio * 12;
        const moveY = yRatio * 12;

        inner.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(1.02)`;
      });

      media.addEventListener('mouseleave', () => {
        inner.style.transform = 'translate3d(0, 0, 0) scale(1)';
      });
    });
  }

  /* ------------------------------------------------------------------------
     08b. FULL-SURFACE PROJECT CARD CLICK NAVIGATION (Desktop & Mobile)
     Clicking anywhere on the project card (image, background, info)
     smoothly navigates to the project's dedicated case study page,
     while allowing the "Quick Specs" modal trigger to open normally.
     On mobile, swipe gestures are distinguished from taps so dragging
     between slides does not trigger navigation.
     ------------------------------------------------------------------------ */
  let touchStartX = 0;
  let touchStartY = 0;
  let isSwipingCard = false;

  document.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches.length > 0) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      isSwipingCard = false;
    }
  }, { passive: true });

  document.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches.length > 0) {
      const diffX = Math.abs(e.touches[0].clientX - touchStartX);
      const diffY = Math.abs(e.touches[0].clientY - touchStartY);
      if (diffX > 10 || diffY > 10) {
        isSwipingCard = true;
      }
    }
  }, { passive: true });

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', function (e) {
      // If user was swiping/dragging horizontally, do not trigger navigation
      if (isSwipingCard) {
        return;
      }

      // If user clicked the Quick Specs button or any button inside, do nothing here
      if (e.target.closest('button[data-project]') || e.target.closest('button')) {
        return;
      }

      // If user is selecting text, do not trigger navigation
      const selection = window.getSelection();
      if (selection && selection.toString().length > 0) {
        return;
      }

      // If user clicked directly on an interactive element (e.g. anchor link or Quick Specs button)
      if (e.target.closest('a') || e.target.closest('button')) {
        return;
      }

      const targetUrl = card.getAttribute('data-url') || (card.querySelector('.project-title a') ? card.querySelector('.project-title a').getAttribute('href') : null);
      if (targetUrl) {
        // If meta/ctrl key or external URL (starts with http/https), open in new tab
        if (e.metaKey || e.ctrlKey || targetUrl.startsWith('http://') || targetUrl.startsWith('https://')) {
          window.open(targetUrl, '_blank', 'noopener,noreferrer');
          return;
        }

        const pageTransitionVeil = document.querySelector('.page-transition-veil');
        if (pageTransitionVeil && !prefersReducedMotion) {
          pageTransitionVeil.classList.add('active');
          setTimeout(() => {
            window.location.href = targetUrl;
          }, 380);
        } else {
          window.location.href = targetUrl;
        }
      }
    });
  });

  /* ------------------------------------------------------------------------
     09. HERO AMBIENT LIGHTING FOLLOWING CURSOR (Silky Lerp RAF)
     ------------------------------------------------------------------------ */
  const heroGlowPrimary = document.querySelector('.hero-ambient-glow');
  const heroGlowSecondary = document.querySelector('.hero-ambient-glow-secondary');

  if (heroSection && isDesktopPointer && !prefersReducedMotion && (heroGlowPrimary || heroGlowSecondary)) {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isMoving = false;

    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 36;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 36;

      if (!isMoving) {
        isMoving = true;
        animateHeroGlow();
      }
    }, { passive: true });

    heroSection.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
    });

    function animateHeroGlow() {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (heroGlowPrimary) {
        heroGlowPrimary.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      if (heroGlowSecondary) {
        // Subtle inverted depth parallax
        heroGlowSecondary.style.transform = `translate3d(${-currentX * 0.5}px, ${-currentY * 0.5}px, 0)`;
      }

      if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetY - currentY) > 0.1) {
        requestAnimationFrame(animateHeroGlow);
      } else {
        isMoving = false;
      }
    }
  }

  /* ------------------------------------------------------------------------
     10. STATS COUNTER ANIMATION (Trust Section Smooth Number Roll)
     ------------------------------------------------------------------------ */
  const statNumbers = document.querySelectorAll('.stat-number');
  const trustSection = document.getElementById('trust');

  if (statNumbers.length > 0 && trustSection && !prefersReducedMotion) {
    let statsAnimated = false;

    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          observer.unobserve(entry.target);

          statNumbers.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-target'));
            const isDecimal = stat.getAttribute('data-decimals') === '1';
            const duration = 1600;
            const startTime = performance.now();

            function updateCounter(now) {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease-out expo
              const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
              const val = target * ease;

              stat.textContent = isDecimal ? val.toFixed(1) : Math.round(val);

              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                stat.textContent = isDecimal ? target.toFixed(1) : target;
              }
            }
            requestAnimationFrame(updateCounter);
          });
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.15
    });

    statsObserver.observe(trustSection);
  }

  /* ------------------------------------------------------------------------
     11. SCROLL REVEAL & CLIP-PATH OBSERVER
     ------------------------------------------------------------------------ */
  const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-card');

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '100px 0px 50px 0px',
      threshold: 0.02
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Instant safety check: eagerly reveal any elements already in or near viewport
    const eagerCheck = () => {
      revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight + 200 && rect.bottom > -200) {
          el.classList.add('is-revealed');
        }
      });
    };
    eagerCheck();
    setTimeout(eagerCheck, 120);
    window.addEventListener('scroll', eagerCheck, { passive: true, once: true });
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  /* ------------------------------------------------------------------------
     12. PROCESS TIMELINE PROGRESS TRACKER (Interactive Scroll Drawing)
     ------------------------------------------------------------------------ */
  const processSection = document.getElementById('process');
  const processLineFill = document.querySelector('.process-line-fill');
  const processSteps = document.querySelectorAll('.process-step');

  if (processSection && processLineFill && processSteps.length > 0) {
    function checkProcessProgress() {
      const rect = processSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top <= windowHeight * 0.75 && rect.bottom >= 0) {
        const totalTravel = rect.height;
        const currentProgress = Math.min(Math.max((windowHeight * 0.75 - rect.top) / totalTravel, 0), 1);

        processLineFill.style.width = `${currentProgress * 100}%`;

        // Highlight steps progressively with illuminated indicator, title, and description
        processSteps.forEach((step, idx) => {
          const stepThreshold = idx / (processSteps.length - 1);
          if (currentProgress >= stepThreshold * 0.82) {
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
     12. DYNAMIC CASE STUDY DRAWER MODAL
     ------------------------------------------------------------------------ */
  const caseStudies = {
    "growth-gurus": {
      "title": "Growth Gurus",
      "subtitle": "High-Impact Digital Marketing & Business Strategy Portal",
      "industry": "Digital Growth Agency",
      "services": "WordPress Development, Elementor Pro Engineering, Conversion Optimization",
      "technologies": "WordPress, Elementor Pro, Lead Capture UX, Speed Optimization, Responsive UI",
      "image": "images/project-growth-gurus.webp",
      "pageUrl": "https://growthgurus.com/",
      "overview": "A high-impact digital marketing and business strategy portal built to capture enterprise leads and showcase bespoke growth frameworks with sleek modern aesthetics.",
      "challenge": "Enterprise B2B clients required immediate clarity on complex growth consulting frameworks with minimal page weight, rapid lead form execution, and high mobile responsiveness.",
      "solution": "Engineered a modern WordPress and Elementor Pro portal featuring structured content hierarchy, optimized conversion touchpoints, high-efficiency asset loading, and zero layout shift.",
      "features": [
        "Interactive service breakdown with bespoke visual hierarchy",
        "High-converting lead capture funnels optimized for mobile & desktop",
        "Lightning-fast page load times with asset minification & caching",
        "Fluid responsive typography and scalable vector asset presentation",
        "Clean enterprise aesthetic communicating strategic authority"
      ],
      "results": "Streamlined lead acquisition pipelines, elevated brand prestige, and achieved sub-second interaction readiness across global visitor traffic."
    },
    "select-the-best": {
      "title": "Select The Best",
      "subtitle": "Robust Equine Nutrition E-Commerce Architecture",
      "industry": "E-Commerce & Health",
      "services": "WooCommerce Architecture, UI/UX Design, Payment Gateway Integration",
      "technologies": "WordPress, WooCommerce, Elementor Pro, Payment Gateways, Cart Optimization",
      "image": "images/project-select-the-best.webp",
      "pageUrl": "https://selectthebest.com/",
      "overview": "Robust e-commerce storefront engineered for an equine nutrition leader. Features structured catalog browsing, seamless cart flow, and conversion-first UI.",
      "challenge": "Large multi-variant product catalog with dense nutritional specifications required a frictionless buying journey and accelerated mobile checkout.",
      "solution": "Designed and implemented an intuitive WooCommerce shopping flow with streamlined variant selection, optimized payment gateways, and friction-free mobile cart navigation.",
      "features": [
        "Comprehensive product catalog with rapid category navigation",
        "Streamlined multi-variant selector with instantaneous price and weight recalculation",
        "Frictionless checkout experience supporting major card processors",
        "High-DPI packaging photography with lazy-loading performance",
        "Mobile-first cart optimization to eliminate checkout abandonment"
      ],
      "results": "Delivered an intuitive, responsive storefront that simplifies multi-product ordering and strengthens online direct-to-consumer sales."
    },
    "massiri-heights": {
      "title": "Massiri Heights",
      "subtitle": "Architectural Luxury Real Estate & Property Showcase",
      "industry": "Luxury Real Estate",
      "services": "Custom Layout Architecture, Elementor Pro Development, VIP Inquiry Funnels",
      "technologies": "WordPress, Elementor Pro, Custom Post Types, Visual Grid, High-DPI Layouts",
      "image": "images/project-massiri-heights.webp",
      "pageUrl": "https://massiriheights.com/",
      "overview": "An architectural real estate experience showcasing premier developments, high-resolution layout galleries, and VIP property inquiry workflows.",
      "challenge": "High-net-worth real estate buyers expect ultra-refined visual aesthetics, immersive property walkthroughs, and discrete private inquiry options without slow image rendering.",
      "solution": "Built a bespoke visual grid utilizing Elementor Pro and dynamic custom post types, combining crisp photography optimization with private booking forms.",
      "features": [
        "Architectural visual grid showcasing property blueprints and panoramic photography",
        "Dynamic property listings with custom amenities and floorplan metadata",
        "VIP private viewing inquiry workflows routed directly to concierge sales agents",
        "Hardware-accelerated layout transitions and zero cumulative layout shift",
        "Fluid dark luxury aesthetic matching premier architectural developments"
      ],
      "results": "Created a stunning, high-trust digital portfolio that attracts accredited investors and accelerates private viewing bookings."
    },
    "avalon-limousines": {
      "title": "Avalon Limousines",
      "subtitle": "Luxury Concierge Chauffeur Booking & Fleet Portal",
      "industry": "Luxury Transportation",
      "services": "Custom WordPress Development, Fleet Catalog UI, Booking Flow Integration",
      "technologies": "WordPress Core, Elementor Pro, Booking System, Custom Styling, Performance Audits",
      "image": "images/project-avalon-limousines.webp",
      "pageUrl": "https://avalonlimousines.com/",
      "overview": "High-end concierge transportation portal featuring responsive fleet catalogs, route booking flows, and friction-free inquiry processing.",
      "challenge": "Chauffeur reservations require real-time vehicle selection, transparent pricing criteria, and rapid reservation request submissions for corporate executive travel.",
      "solution": "Engineered a modern fleet display with vehicle specifications and automated booking estimation inquiry forms styled with a premium executive dark theme.",
      "features": [
        "Interactive executive fleet showcase detailing passenger capacity and luggage specs",
        "Automated trip reservation inquiry form with route and scheduling inputs",
        "Custom styling and refined hover states built with lightweight CSS",
        "Fully responsive mobile interface for on-the-go business executive booking",
        "Rigorous performance auditing achieving smooth cross-browser rendering"
      ],
      "results": "Enhanced reservation completion speed, elevated brand credibility, and streamlined corporate account inquiries."
    },
    "keep-moving-forward": {
      "title": "Keep Moving Forward",
      "subtitle": "Modern Streetwear Brand Storytelling & DTC Storefront",
      "industry": "Apparel & Lifestyle",
      "services": "Shopify Store Architecture, Liquid Theme Customization, Mobile UX Engineering",
      "technologies": "Shopify, Liquid Customization, Mobile-First UX, Speed Optimization, Conversion Rate UX",
      "image": "images/project-keep-moving-forward.webp",
      "pageUrl": "https://www.keepmforward.com/",
      "overview": "Modern streetwear clothing storefront focused on brand storytelling, high-speed mobile navigation, and optimized product conversion pipelines.",
      "challenge": "Fast-moving apparel drops demand instant mobile rendering, rapid size/color selection, and frictionless single-tap checkouts.",
      "solution": "Customized a high-performance Shopify storefront with bespoke Liquid templates, mobile-first product galleries, and accelerated checkout integrations.",
      "features": [
        "Bespoke Liquid template modifications tailored for apparel lookbooks",
        "Mobile-first swipeable product galleries with high-DPI fabric zoom",
        "Instant slide-out cart drawer with dynamic free-shipping progress indicators",
        "Optimized script loading and asset minification for peak flash-sale traffic",
        "Seamless Apple Pay, Shop Pay, and Google Pay 1-click purchasing"
      ],
      "results": "Maximized mobile conversion rates during limited product drops and delivered an elevated streetwear lifestyle experience."
    },
    "magic-gel-usa": {
      "title": "Magic Gel USA",
      "subtitle": "High-Velocity Health & Wellness DTC E-Commerce Platform",
      "industry": "Beauty & Wellness",
      "services": "WooCommerce Optimization, Core Web Vitals Tuning, Conversion Engineering",
      "technologies": "WordPress, WooCommerce, Core Web Vitals, Asset Minification, Checkout UX",
      "image": "images/project-magic-gel-usa.webp",
      "pageUrl": "https://magicgelusa.com/",
      "overview": "High-velocity DTC e-commerce architecture built with frictionless single-page checkouts, responsive catalogs, and lightning-fast asset minification.",
      "challenge": "High paid ad traffic required sub-second landing page speeds and distraction-free checkout flows to reduce bounce rate and maximize ROAS.",
      "solution": "Overhauled the WooCommerce storefront with aggressive asset minification, optimized Core Web Vitals, and an express single-page checkout flow.",
      "features": [
        "Sub-second landing page load times meeting Google Core Web Vitals standards",
        "Frictionless checkout layout minimizing cart abandonment",
        "Clean product benefits and customer review trust badges",
        "Automated image compression and CSS/JS code minification pipeline",
        "Cross-device responsive design engineered for mobile shoppers"
      ],
      "results": "Accelerated mobile page load times by over 60%, driving immediate improvements in paid traffic conversion rates."
    },
    "glenelly-estate": {
      "title": "Glenelly Estate",
      "subtitle": "Editorial Winery Showcase & Global Brand Monograph",
      "industry": "Hospitality & Winery",
      "services": "Editorial Web Design, WooCommerce Integration, Visual Media Optimization",
      "technologies": "WordPress, WooCommerce, High-DPI Images, Editorial Grid, Performance Tuning",
      "image": "images/project-glenelly-estate.webp",
      "pageUrl": "https://glenellyestate.com/",
      "overview": "An editorial web showcase for an internationally acclaimed South African winery, integrating immersive vineyard visuals, cellar tours, and catalog browsing.",
      "challenge": "Expressing the rich heritage and French winemaking tradition of Glenelly Estate while providing an intuitive wine catalog and cellar tour booking experience.",
      "solution": "Crafted a bespoke editorial layout balancing rich imagery with clean typography, integrated with WooCommerce for bottle selection and visitor tour inquiries.",
      "features": [
        "Immersive editorial visual grid showcasing estate history and terroir",
        "Structured wine collection catalog with vintage notes and tasting guides",
        "Cellar door and bistro reservation inquiry modules",
        "High-DPI responsive image optimization with zero stutter on scroll",
        "Bilingual-ready architectural structure for international visitors"
      ],
      "results": "Successfully captured the prestigious international reputation of the estate and established a seamless wine tasting booking flow."
    },
    "elmwood-property": {
      "title": "Elmwood Property",
      "subtitle": "Institutional Property Development & Acquisition Portal",
      "industry": "Real Estate Development",
      "services": "WordPress Theme Engineering, ACF Pro Dynamic Architecture, Investor Funnels",
      "technologies": "WordPress, ACF Pro, Dynamic Listings, Responsive Layouts, Lead Capture",
      "image": "images/project-elmwood-property.webp",
      "pageUrl": "https://elmwood-property.com/",
      "overview": "Architectural property acquisition and development portal featuring clean structural layouts, interactive floorplan displays, and institutional investor inquiry funnels.",
      "challenge": "Institutional partners and investors needed clear project metrics, development timelines, and secure direct inquiry mechanisms.",
      "solution": "Engineered a structured development portfolio powered by Advanced Custom Fields (ACF Pro) with dynamic development stage markers and investor lead capture.",
      "features": [
        "ACF Pro dynamic schema for property specifications and development milestones",
        "Clean architectural grid presenting residential and commercial portfolios",
        "Interactive project status indicators (Acquisition, Planning, Construction, Complete)",
        "Dedicated institutional investor and landlord inquiry forms",
        "Crisp typographic hierarchy built with modern semantic CSS"
      ],
      "results": "Solidified developer credibility among commercial partners and organized portfolio assets into an easily navigable digital catalog."
    },
    "tarteele-quran": {
      "title": "TarteeleQuran",
      "subtitle": "Global Online Academy & Student Onboarding Platform",
      "industry": "Education & LMS",
      "services": "WordPress LMS Architecture, Trial Class Booking Flow, Student UX Design",
      "technologies": "WordPress LMS, Elementor Pro, Schedule Booking, Responsive UI, Trust Architecture",
      "image": "images/project-tarteele-quran.webp",
      "pageUrl": "https://www.tarteelequran.com/",
      "overview": "Global online educational platform featuring structured curriculum showcases, trial class scheduling, and streamlined cross-device student onboarding.",
      "challenge": "A multinational student base across the US, UK, and Australia needed simple schedule booking, tutor credentials, and multi-currency pricing clarity.",
      "solution": "Designed and deployed a responsive educational hub with an automated free trial scheduling form, faculty showcase, and reassuring trust architecture.",
      "features": [
        "Friction-free free trial scheduling workflow tailored for families and adults",
        "Structured course curriculum breakdown with downloadable syllabus materials",
        "Tutor credentialing profiles and interactive student testimonials",
        "Multi-device responsive layout optimized for mobile parents booking on phones",
        "Fast-loading server configuration with robust caching and CDN integration"
      ],
      "results": "Drove a significant increase in free trial registrations and established a professional, global educational brand."
    },
    "music-city-maid": {
      "title": "Music City Maid Service",
      "subtitle": "Local Home Services Instant Booking & SEO Engine",
      "industry": "Residential Services",
      "services": "Local SEO Strategy, Booking Calculator UX, Elementor Pro Customization",
      "technologies": "WordPress, Booking Logic, Local Conversion UX, Responsive Design, Speed Audits",
      "image": "images/project-music-city-maid.webp",
      "pageUrl": "https://musiccitymaidservice.com/",
      "overview": "Conversion-focused local service platform engineered with instantaneous booking estimators, customer reviews, and clear mobile quote flows.",
      "challenge": "Local homeowners wanted rapid price estimates and seamless booking without having to call or wait for manual quotes.",
      "solution": "Built an interactive quote estimator and appointment request system paired with hyper-local SEO landing pages and prominent trust ratings.",
      "features": [
        "Instantaneous home cleaning price estimator based on bedrooms and bathrooms",
        "Frictionless 3-step online booking and scheduling confirmation flow",
        "Google Review badge integrations and verified customer testimonials",
        "Local schema markup and on-page optimization for Nashville geo-keywords",
        "Instant click-to-call and SMS inquiry triggers for mobile users"
      ],
      "results": "Substantially increased daily automated booking requests and established top-tier local search visibility."
    },
    "ch-safety": {
      "title": "CH Safety",
      "subtitle": "Workplace Safety & Equipment B2B Compliance Portal",
      "industry": "Corporate Compliance",
      "services": "B2B Catalog Architecture, WooCommerce Customization, Accessibility UX",
      "technologies": "WordPress, WooCommerce, Elementor Pro, B2B Inquiries, Accessibility UX",
      "image": "images/project-ch-safety.webp",
      "pageUrl": "https://chsafety.com.au/",
      "overview": "Corporate compliance platform and equipment catalog built with clear trust elements, accessible navigation, and high-converting B2B inquiry funnels.",
      "challenge": "Safety officers and enterprise procurement teams needed fast access to Australian safety standards, equipment specifications, and bulk RFQ quotes.",
      "solution": "Engineered an accessible, high-contrast B2B portal with comprehensive catalog filtering, downloadable safety data sheets, and bulk quote request forms.",
      "features": [
        "Structured B2B safety equipment catalog with technical compliance criteria",
        "Request for Quote (RFQ) workflow for bulk corporate orders",
        "WCAG-compliant contrast ratios and accessible keyboard navigation",
        "Instant search and filter by Australian standard ratings and industries",
        "Mobile-optimized technical datasheets and quote confirmation notices"
      ],
      "results": "Streamlined enterprise procurement inquiries and strengthened corporate trust among industrial safety clients."
    },
    "excel-living": {
      "title": "Excel Community Living",
      "subtitle": "Compassionate Assisted Living & Care Resource Hub",
      "industry": "Healthcare & Senior Care",
      "services": "Accessible Web Design, Elementor Pro Development, Family Inquiry Funnels",
      "technologies": "WordPress, Elementor Pro, Accessible UI, Interactive Forms, Responsive Design",
      "image": "images/project-excel-living.webp",
      "pageUrl": "https://excelcommunityliving.website/",
      "overview": "Compassionate, accessible healthcare and senior living platform featuring detailed care module breakdowns, amenity showcases, and direct family inquiry funnels.",
      "challenge": "Families navigating senior care decisions require warmth, absolute clarity, easy-to-read typography, and gentle inquiry options during stressful transitions.",
      "solution": "Crafted a compassionate, highly readable web portal featuring clear care tiers, virtual facility photo tours, and respectful consultation forms.",
      "features": [
        "High-legibility typography and accessible color contrast for senior visitors and families",
        "Comprehensive care program breakdowns (Independent Living, Assisted Living, Memory Care)",
        "Direct confidential consultation and tour scheduling request forms",
        "Interactive facility amenities gallery with responsive lightbox viewing",
        "Mobile-friendly navigation with prominent emergency and direct phone contact links"
      ],
      "results": "Provided prospective residents and their families with a welcoming, informative portal that increased private tour bookings."
    },
    "kore-academy": {
      "title": "The KORE Academy",
      "subtitle": "Athletic Club Digital Storefront & Member Community",
      "industry": "Fitness & Membership",
      "services": "Shopify Storefront Design, Liquid Customization, Membership Funnels",
      "technologies": "Shopify, Liquid Engine, Membership Funnels, Modern Grid, Conversion UX",
      "image": "images/project-kore-academy.webp",
      "pageUrl": "https://thekore.club/",
      "overview": "High-energy athletic community and club storefront engineered with custom branding, membership perks showcase, and modern mobile commerce checkout.",
      "challenge": "The club needed an electrifying, modern visual brand that represents elite performance and drives both membership sign-ups and apparel sales.",
      "solution": "Developed a bold, modern Shopify digital storefront with fluid typography, responsive video integrations, and streamlined membership sign-up pipelines.",
      "features": [
        "High-impact modern design language reflecting athletic intensity and community pride",
        "Dual funnel architecture supporting both club memberships and apparel retail",
        "Mobile-optimized cart with frictionless checkout via Shop Pay and Apple Pay",
        "Dynamic class schedule previews and coach biography spotlights",
        "Fast-loading visual assets engineered for active members on mobile devices"
      ],
      "results": "Elevated club prestige, amplified digital retail merchandise sales, and simplified member onboarding."
    }
  };

  const modalOverlay = document.getElementById('caseStudyModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalContentContainer = document.getElementById('modalContent');

  function openCaseStudy(projectId) {
    const data = caseStudies[projectId];
    if (!data || !modalContentContainer) return;

    modalContentContainer.innerHTML = `
      <img src="${data.image}" alt="${data.title} - Detailed Website Case Study Architecture Preview" title="${data.title} - Detailed Website Case Study Architecture Preview" role="img" class="modal-hero-image" loading="lazy" width="1280" height="800">
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

      <div class="modal-footer-actions" style="margin-top: 40px; padding-top: 24px; border-top: 1px solid var(--border-subtle); display: flex; gap: 16px; flex-wrap: wrap;">
        <a href="${data.pageUrl}" class="btn btn-primary" ${data.pageUrl.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>
          ${data.pageUrl.startsWith('http') ? 'Visit Live Website ↗' : 'Open Dedicated Case Study Page →'}
        </a>
        <a href="#contact" class="btn btn-secondary" onclick="window.closeCaseStudyModal()">
          Build A Similar Project ↗
        </a>
      </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCaseStudy() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  window.openCaseStudyModal = openCaseStudy;
  window.closeCaseStudyModal = closeCaseStudy;

  if (modalOverlay && modalCloseBtn) {
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

  document.querySelectorAll('button[data-project]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const projectId = trigger.getAttribute('data-project');
      openCaseStudy(projectId);
    });
  });

  /* ------------------------------------------------------------------------
     13. HIGH-CONVERSION CONTACT FORM
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name = document.getElementById('formName').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const details = document.getElementById('formDetails').value.trim();

      if (!name || !email || !details) {
        formStatus.className = 'form-status-alert error';
        formStatus.textContent = 'Please fill out all required fields (Name, Business Email, Project Details).';
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formStatus.className = 'form-status-alert error';
        formStatus.textContent = 'Please enter a valid business email address.';
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `Sending Your Inquiry...`;
      formStatus.style.display = 'none';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        formStatus.className = 'form-status-alert success';
        formStatus.innerHTML = `
          <strong>Thank you, ${name}!</strong> Your project inquiry has been received. I will review your requirements and respond within 24 hours. For urgent matters, you can also reach me directly via WhatsApp at +8801303387509.
        `;

        contactForm.reset();

        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 12000);
      }, 850);
    });
  }

  /* ------------------------------------------------------------------------
     14. ACTIVE NAVIGATION LINK ON SCROLL
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

  /* ------------------------------------------------------------------------
     15. CALENDLY HIGH-PERFORMANCE LAZY LOADER (ZERO CWV IMPACT)
     ------------------------------------------------------------------------ */
  function initCalendlyLazyLoader() {
    const target = document.getElementById('calendly-wrapper');
    const skeleton = document.getElementById('calendly-skeleton');

    if (!target) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Load Calendly script on demand
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://assets.calendly.com/assets/external/widget.js';
            script.async = true;

            script.onload = () => {
              setTimeout(() => {
                if (skeleton) skeleton.classList.add('loaded');
              }, 800);
            };

            script.onerror = () => {
              if (skeleton) {
                skeleton.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 20px;">Unable to load booking calendar. Please refresh or <a href="mailto:zhsaikot@gmail.com" style="color: var(--accent); text-decoration: underline;">contact directly via email</a>.</p>';
              }
            };

            document.body.appendChild(script);
            obs.unobserve(target); // Run only once
          }
        });
      }, { rootMargin: '300px 0px' });

      observer.observe(target);
    } else {
      // Graceful fallback for legacy environments
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => {
        setTimeout(() => {
          if (skeleton) skeleton.classList.add('loaded');
        }, 800);
      };
      document.body.appendChild(script);
    }
  }

  /* ------------------------------------------------------------------------
     16. WORK SECTION: DESKTOP STACKING CARDS & MOBILE SLIDER CONTROLLER
     ------------------------------------------------------------------------ */
  function initWorkSectionExperience() {
    const workSection = document.getElementById('work');
    const slider = document.querySelector('.work-cards-list');
    if (!workSection || !slider) return;

    const cards = Array.from(slider.querySelectorAll('.project-card'));
    if (!cards.length) return;

    // Apply data-index to all cards
    cards.forEach((card, i) => {
      card.dataset.cardIndex = i;
    });

    const prevBtn = document.getElementById('workSliderPrev');
    const nextBtn = document.getElementById('workSliderNext');
    const pagination = document.getElementById('workSliderPagination');
    const currentEl = document.getElementById('workSlideCurrent');
    const totalEl = document.getElementById('workSlideTotal');

    /* ----------------------------------------------------------------------
       A. MOBILE SLIDER WITH PAGINATION (<= 992px)
       ---------------------------------------------------------------------- */
    let currentSlide = 0;

    function buildPagination() {
      if (!pagination) return;
      pagination.innerHTML = '';
      if (totalEl) {
        totalEl.textContent = String(cards.length).padStart(2, '0');
      }

      cards.forEach((card, index) => {
        const dot = document.createElement('button');
        dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('type', 'button');
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', `Project ${index + 1} of ${cards.length}`);
        dot.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
        dot.addEventListener('click', () => {
          goToSlide(index);
        });
        pagination.appendChild(dot);
      });
    }

    function goToSlide(index) {
      const clamped = Math.max(0, Math.min(cards.length - 1, index));
      const targetCard = cards[clamped];
      if (targetCard && slider) {
        slider.scrollTo({
          left: targetCard.offsetLeft - slider.offsetLeft,
          behavior: 'smooth'
        });
      }
    }

    function getCurrentSlideIndex() {
      if (!slider || !cards[0]) return 0;
      const scrollLeft = slider.scrollLeft;
      const cardWidth = cards[0].offsetWidth;
      const gap = 16;
      return Math.round(scrollLeft / (cardWidth + gap));
    }

    function updateActiveSlideUI() {
      if (window.innerWidth > 992) return;
      const activeIdx = Math.max(0, Math.min(cards.length - 1, getCurrentSlideIndex()));
      currentSlide = activeIdx;

      if (currentEl) {
        currentEl.textContent = String(activeIdx + 1).padStart(2, '0');
      }

      if (pagination) {
        const dots = pagination.querySelectorAll('.slider-dot');
        dots.forEach((dot, idx) => {
          const isActive = idx === activeIdx;
          dot.classList.toggle('active', isActive);
          dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        const activeDot = dots[activeIdx];
        if (activeDot && pagination.scrollWidth > pagination.clientWidth) {
          pagination.scrollTo({
            left: activeDot.offsetLeft - (pagination.clientWidth / 2) + (activeDot.offsetWidth / 2),
            behavior: 'smooth'
          });
        }
      }

      if (prevBtn) {
        prevBtn.disabled = activeIdx === 0;
        prevBtn.classList.toggle('is-disabled', activeIdx === 0);
      }
      if (nextBtn) {
        nextBtn.disabled = activeIdx === cards.length - 1;
        nextBtn.classList.toggle('is-disabled', activeIdx === cards.length - 1);
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
      });
    }

    let sliderTicking = false;
    slider.addEventListener('scroll', () => {
      if (window.innerWidth <= 992 && !sliderTicking) {
        window.requestAnimationFrame(() => {
          updateActiveSlideUI();
          sliderTicking = false;
        });
        sliderTicking = true;
      }
    }, { passive: true });

    buildPagination();
    updateActiveSlideUI();

    /* ----------------------------------------------------------------------
       B. DESKTOP STACKING CARDS SCROLL ENGINE (> 992px)
       ---------------------------------------------------------------------- */
    let stackingTicking = false;
    const siteHeader = document.getElementById('siteHeader');

    function updateDesktopStacking() {
      if (window.innerWidth <= 992 || prefersReducedMotion) {
        cards.forEach(card => {
          if (card.style.transform || card.style.filter) {
            card.style.transform = '';
            card.style.filter = '';
          }
        });
        return;
      }

      const headerHeight = siteHeader ? siteHeader.offsetHeight : 74;
      const stickyTop = headerHeight + 24;

      for (let i = 0; i < cards.length - 1; i++) {
        const currentCard = cards[i];
        const nextCard = cards[i + 1];

        const nextRect = nextCard.getBoundingClientRect();
        const cardHeight = currentCard.offsetHeight || 420;

        // When next card approaches sticky top
        const distance = nextRect.top - stickyTop;

        if (distance <= cardHeight && distance >= 0) {
          // Card i+1 is overlapping Card i
          const progress = 1 - (distance / cardHeight); // 0 to 1
          const scale = 1 - (progress * 0.05); // 1.0 -> 0.95
          const brightness = 1 - (progress * 0.18); // 1.0 -> 0.82
          const translateY = progress * -6;
          currentCard.style.transform = `scale(${scale}) translateY(${translateY}px)`;
          currentCard.style.filter = `brightness(${brightness})`;
        } else if (distance < 0) {
          // Card i+1 has passed sticky top and covers Card i
          currentCard.style.transform = 'scale(0.95) translateY(-6px)';
          currentCard.style.filter = 'brightness(0.82)';
        } else {
          // Card i+1 hasn't reached Card i yet
          currentCard.style.transform = '';
          currentCard.style.filter = '';
        }
      }

      // Ensure the last card is always scale 1.0
      const lastCard = cards[cards.length - 1];
      if (lastCard && (lastCard.style.transform || lastCard.style.filter)) {
        lastCard.style.transform = '';
        lastCard.style.filter = '';
      }
    }

    window.addEventListener('scroll', () => {
      if (window.innerWidth > 992 && !stackingTicking) {
        window.requestAnimationFrame(() => {
          updateDesktopStacking();
          stackingTicking = false;
        });
        stackingTicking = true;
      }
    }, { passive: true });

    updateDesktopStacking();

    /* ----------------------------------------------------------------------
       C. RESPONSIVE RESIZE LISTENER
       ---------------------------------------------------------------------- */
    window.addEventListener('resize', () => {
      if (window.innerWidth > 992) {
        updateDesktopStacking();
      } else {
        updateActiveSlideUI();
      }
    }, { passive: true });
  }

  /* ------------------------------------------------------------------------
     17. TESTIMONIALS CAROUSEL SLIDER ENGINE
     ------------------------------------------------------------------------ */
  function initTestimonialsCarousel() {
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    const pagination = document.getElementById('testimonialPagination');
    const currentEl = document.getElementById('testimonialSlideCurrent');
    const totalEl = document.getElementById('testimonialSlideTotal');
    if (!track) return;

    const slides = Array.from(track.querySelectorAll('.testimonial-slide'));
    if (!slides.length) return;

    if (totalEl) {
      totalEl.textContent = String(slides.length).padStart(2, '0');
    }

    // Build interactive dots matching Work slider
    if (pagination) {
      pagination.innerHTML = '';
      slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
        dot.setAttribute('type', 'button');
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', `Review ${idx + 1} of ${slides.length}`);
        dot.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
        dot.addEventListener('click', () => {
          goToSlide(idx);
        });
        pagination.appendChild(dot);
      });
    }

    function getStep() {
      const slide = slides[0];
      return slide ? slide.offsetWidth + 24 : 360;
    }

    function goToSlide(idx) {
      const clamped = Math.max(0, Math.min(slides.length - 1, idx));
      const target = slides[clamped];
      if (target) {
        track.scrollTo({
          left: target.offsetLeft - track.offsetLeft,
          behavior: 'smooth'
        });
      }
    }

    function updateActiveUI() {
      const scrollLeft = track.scrollLeft;
      const step = getStep();
      const maxScroll = track.scrollWidth - track.clientWidth;
      
      let activeIdx = Math.round(scrollLeft / step);
      if (scrollLeft >= maxScroll - 10) {
        activeIdx = slides.length - 1;
      }
      activeIdx = Math.max(0, Math.min(slides.length - 1, activeIdx));

      if (currentEl) {
        currentEl.textContent = String(activeIdx + 1).padStart(2, '0');
      }

      if (pagination) {
        const dots = pagination.querySelectorAll('.slider-dot');
        dots.forEach((dot, i) => {
          const isActive = i === activeIdx;
          dot.classList.toggle('active', isActive);
          dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
      }

      if (prevBtn) {
        const atStart = scrollLeft <= 5;
        prevBtn.disabled = atStart;
        prevBtn.classList.toggle('is-disabled', atStart);
      }
      if (nextBtn) {
        const atEnd = scrollLeft >= maxScroll - 5;
        nextBtn.disabled = atEnd;
        nextBtn.classList.toggle('is-disabled', atEnd);
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -getStep(), behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: getStep(), behavior: 'smooth' });
      });
    }

    let isScrolling = false;
    track.addEventListener('scroll', () => {
      if (!isScrolling) {
        isScrolling = true;
        requestAnimationFrame(() => {
          updateActiveUI();
          isScrolling = false;
        });
      }
    }, { passive: true });

    window.addEventListener('resize', updateActiveUI, { passive: true });
    updateActiveUI();
  }

  /* ------------------------------------------------------------------------
     16. DYNAMIC "BACK TO TOP" FLOATING BUTTON (50% SCROLL THRESHOLD)
     ------------------------------------------------------------------------ */
  function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    let ticking = false;

    function evaluateScrollPosition() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight || 0;
      const clientHeight = document.documentElement.clientHeight || window.innerHeight || 0;
      const scrollableDistance = scrollHeight - clientHeight;

      // Dynamically activates only after user scrolls past 50% of the page height
      if (scrollableDistance > 100 && scrollTop >= scrollableDistance * 0.5) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(evaluateScrollPosition);
        ticking = true;
      }
    }, { passive: true });

    window.addEventListener('resize', () => {
      if (!ticking) {
        window.requestAnimationFrame(evaluateScrollPosition);
        ticking = true;
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Initial check
    evaluateScrollPosition();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initCalendlyLazyLoader();
      initWorkSectionExperience();
      initTestimonialsCarousel();
      initBackToTop();
    });
  } else {
    initCalendlyLazyLoader();
    initWorkSectionExperience();
    initTestimonialsCarousel();
    initBackToTop();
  }

})();