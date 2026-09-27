 // Header Javascript

 const hamburger = document.getElementById("hamburger");
 const mobileMenu = document.getElementById("mobileMenu");

 hamburger.addEventListener("click", () => {
     hamburger.classList.toggle("active");
     mobileMenu.classList.toggle("open");

     const expanded = hamburger.classList.contains("active");
     hamburger.setAttribute("aria-expanded", expanded);
 });


 // Smooth Scrolling javascript

 function smoothScroll(target, duration = 550) {
     const element = document.querySelector(target);
     if (!element) return;

     const start = window.pageYOffset;
     const targetPos = element.getBoundingClientRect().top;
     const startTime = performance.now();

     // Fast + smooth easing (sharp start -> soft landing)
     function easeOutExpo(t) {
         return t === 1 ? 1 : 1 - Math.pow(2, -15 * t);
     }

     function loop(now) {
         const elapsed = (now - startTime) / duration;
         const progress = Math.min(elapsed, 1);

         window.scrollTo({
             top: start + targetPos * easeOutExpo(progress),
             behavior: "auto"
         });

         if (progress < 1) requestAnimationFrame(loop);
     }

     requestAnimationFrame(loop);
 }

 document.querySelectorAll('a[href^="#"]').forEach(link => {
     link.addEventListener("click", function(e) {
         e.preventDefault();
         smoothScroll(this.getAttribute("href"));
     });
 });


 // Mouse pointer JS

 const dot = document.querySelector(".cursor-dot");
 const ring = document.querySelector(".cursor-ring");
 let mouseX = 0,
     mouseY = 0;
 let ringX = 0,
     ringY = 0;

 // Dot follows instantly
 document.addEventListener("mousemove", (e) => {
     mouseX = e.clientX;
     mouseY = e.clientY;
     dot.style.left = mouseX + "px";
     dot.style.top = mouseY + "px";
 });

 // Ring follows smoothly
 function animateRing() {
     ringX += (mouseX - ringX) * 0.1;
     ringY += (mouseY - ringY) * 0.1;

     ring.style.left = ringX + "px";
     ring.style.top = ringY + "px";

     requestAnimationFrame(animateRing);
 }
 animateRing();


 // Home section perticle JS

 const canvas = document.getElementById("particleCanvas");
 const ctx = canvas.getContext("2d");

 let particles = [];
 let mouse = { x: null, y: null, radius: 120 };

 // Track mouse position
 window.addEventListener("mousemove", (e) => {
     mouse.x = e.clientX;
     mouse.y = e.clientY;
 });

 // Create particles
 function initParticles() {
     particles = [];
     const count = 90;

     for (let i = 0; i < count; i++) {
         particles.push({
             x: Math.random() * canvas.width,
             y: Math.random() * canvas.height,
             size: Math.random() * 3 + 1,
             speedX: (Math.random() - 0.5) * 1,
             speedY: (Math.random() - 0.5) * 1,
         });
     }
 }

 // Draw & move particles
 function drawParticles() {
     ctx.clearRect(0, 0, canvas.width, canvas.height);

     particles.forEach(p => {
         ctx.beginPath();
         ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
         ctx.fillStyle = "#06b6d4";
         ctx.fill();

         p.x += p.speedX;
         p.y += p.speedY;

         if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
         if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

         const dx = mouse.x - p.x;
         const dy = mouse.y - p.y;
         const dist = Math.sqrt(dx * dx + dy * dy);

         if (dist < mouse.radius) {
             p.x -= dx / 18;
             p.y -= dy / 18;
         }
     });

     connectParticles();
     requestAnimationFrame(drawParticles);
 }

 // Connect nearby particles with lines
 function connectParticles() {
     for (let i = 0; i < particles.length; i++) {
         for (let j = i; j < particles.length; j++) {
             let dx = particles[i].x - particles[j].x;
             let dy = particles[i].y - particles[j].y;
             let distance = dx * dx + dy * dy;

             if (distance < 11000) {
                 ctx.strokeStyle = "rgba(255,255,255,0.18)";
                 ctx.lineWidth = 1;
                 ctx.beginPath();
                 ctx.moveTo(particles[i].x, particles[i].y);
                 ctx.lineTo(particles[j].x, particles[j].y);
                 ctx.stroke();
             }
         }
     }
 }

 // Resize handler
 function resizeCanvas() {
     canvas.width = document.getElementById("home").offsetWidth;
     canvas.height = document.getElementById("home").offsetHeight;
     initParticles();
 }

 window.addEventListener("resize", resizeCanvas);

 // Start animation
 resizeCanvas();
 drawParticles();


 // Contact Form JavaScript

 document.getElementById("contactForm").addEventListener("submit", function(e) {
     e.preventDefault();

     let name = document.getElementById("name").value.trim();
     let email = document.getElementById("email").value.trim();
     let message = document.getElementById("message").value.trim();
     let formMsg = document.getElementById("formMessage");

     // Basic Validation
     if (name === "" || email === "" || message === "") {
         formMsg.style.color = "red";
         formMsg.textContent = "Please fill out all fields!";
         return;
     }

     // Simple email check
     let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
     if (!email.match(emailPattern)) {
         formMsg.style.color = "red";
         formMsg.textContent = "Please enter a valid email!";
         return;
     }

     formMsg.style.color = "#2b3e6b";
     formMsg.textContent = "Sending...";

     // Simulate sending message (AJAX placeholder)
     setTimeout(() => {
         formMsg.style.color = "green";
         formMsg.textContent = "Your message has been sent successfully!";

         // Reset form
         document.getElementById("contactForm").reset();
     }, 1000);
 });