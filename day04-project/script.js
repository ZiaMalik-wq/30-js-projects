const crsr = document.querySelector("#cursor");
const crsrBlur = document.querySelector("#cursor-blur");
const navLinks = document.querySelectorAll("#nav a");

const blurOffsetX = crsrBlur.offsetWidth / 2;
const blurOffsetY = crsrBlur.offsetHeight / 2;

// Main cursor movement logic
document.addEventListener("mousemove", (e) => {
    // Small cursor movement
    gsap.to(crsr, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: "power2.out"
    });

    // Blurred cursor movement
    gsap.to(crsrBlur, {
        x: e.clientX - blurOffsetX,
        y: e.clientY - blurOffsetY,
        duration: 0.6,
        ease: "power2.out"
    });
});

// Nav hover effects
navLinks.forEach(link => {
    link.addEventListener("mouseenter", () => {
        gsap.to(crsr, {
            scale: 3,
            border: "1px solid #fff",
            backgroundColor: "transparent"
        });
        gsap.to(link, {
            color: "#95c11e",
            duration: 0.2
        });
    });

    link.addEventListener("mouseleave", () => {
        gsap.to(crsr, {
            scale: 1,
            border: "0px solid #fff",
            backgroundColor: "#95c11e"
        });
        gsap.to(link, {
            color: "#fff",
            duration: 0.2
        });
    });
});

// Navbar background animation on scroll
gsap.to("#nav", {
    backgroundColor: "rgba(0,0,0,1)",
    height: "100px",
    scrollTrigger: {
        trigger: "#main",
        scroller: "body",
        start: "top top",
        end: "top -100px",
        // CHANGE: Using a number for a smoother scrub effect
        scrub: 1
    }
});

// "About Us" section fade-in animation on scroll
gsap.from("#about-us .about-image, #about-us #about-us-in", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.4,
    scrollTrigger: {
        trigger: "#about-us",
        scroller: "body",
        start: "top 75%",
        end: "top 70%",
        scrub: 2
    }
});

// ===================================================================
// CHANGE: Consolidated all card event listeners into one efficient loop
// ===================================================================

const cardCursor = document.querySelector("#card-cursor");

document.querySelectorAll(".card").forEach(card => {
    
    // --- MOUSE ENTER ---
    card.addEventListener("mouseenter", () => {
        // Show the custom card cursor
        gsap.to(cardCursor, { opacity: 1, scale: 1, duration: 0.3 });
        // Hide the main cursor and its blur effect
        gsap.to(crsr, { opacity: 0 });
        gsap.to(crsrBlur, { opacity: 0 });
    });
    
    // --- MOUSE LEAVE ---
    card.addEventListener("mouseleave", () => {
        // Hide the custom card cursor
        gsap.to(cardCursor, { opacity: 0, duration: 0.3 });
        // Restore the main cursor and its blur effect
        gsap.to(crsr, { opacity: 1 });
        gsap.to(crsrBlur, { opacity: 1 });
        
        // NEW: Animate the card back to its default state
        gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            ease: "power3.out",
            duration: 0.5
        });
    });

    // --- MOUSE MOVE ---
    card.addEventListener("mousemove", e => {
        // Move the custom card cursor
        gsap.to(cardCursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power1.out"
        });
        
        // NEW: TILT EFFECT LOGIC
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const maxRotate = 18; // Max tilt in degrees
        const rotationY = maxRotate * ((x / rect.width) - 0.5);
        const rotationX = -maxRotate * ((y / rect.height) - 0.5);

        // Apply the tilt using GSAP for smooth interpolation
        gsap.to(card, {
            rotationX: rotationX,
            rotationY: rotationY,
            ease: "power1.out",
            duration: 0.2
        });
    });
});