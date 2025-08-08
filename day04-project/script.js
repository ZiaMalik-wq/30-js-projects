const crsr = document.querySelector("#cursor");
const crsrBlur = document.querySelector("#cursor-blur");
const navLinks = document.querySelectorAll("#nav a");

const blurOffsetX = crsrBlur.offsetWidth / 2;
const blurOffsetY = crsrBlur.offsetHeight / 2;

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
            color: "#000",
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

// Scroll animation for nav
gsap.to("#nav", {
    backgroundColor: "rgba(0,0,0,1)",
    backdropFilter: "blur(0px)",
    height: "100px",
    scrollTrigger: {
        trigger: "#main",
        scroller: "body",
        start: "top top",
        end: "top -100px",
        scrub: true
    }
});
