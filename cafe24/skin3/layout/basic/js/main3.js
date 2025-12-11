const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);



intro = gsap.timeline({})
intro.to('.intro img',{
    delay:0.5,
    opacity:1,
})
intro.to('.intro img',{
    delay:0.6,
    opacity:0,
})
intro.to('.intro',{
    opacity:0,
})