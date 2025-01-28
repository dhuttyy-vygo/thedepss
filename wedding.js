var Sc = ScrollTrigger;
var Qe = gsap;

const weddingImages = [
  { top: "-5%", left: "5%", width: "15%", parallaxSpeed: 0.065 },
  { top: "40%", left: "-5%", width: "12%", parallaxSpeed: 0.05 },
  { top: "25%", left: "20%", width: "15%", parallaxSpeed: 0.08 },
  { top: "60%", left: "40%", width: "4%", parallaxSpeed: 0.1 },
  { top: "-10%", left: "65%", width: "8%", parallaxSpeed: 0.07 },
  { top: "10%", left: "85%", width: "5%", parallaxSpeed: 0.085 },
  { top: "40%", left: "60%", width: "14%", parallaxSpeed: 0.06 },
  { top: "80%", left: "70%", width: "12%", parallaxSpeed: 0.04 },
];

const imgs = document.querySelectorAll(".dp-lp-grid"),
  imgsParallax = document.querySelectorAll(".dp-grid-img"),
  tr = document.querySelector(".dp-lp-hero-grid");

gsap.set(imgs, {
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%) scale(0)",
});

gsap.from(".lpo", {
  y: 40,
  ease: "power4.inOut",
  duration: 1,
  stagger: {
    amount: 0.15,
  },
  delay: 0.5,
});

gsap.to(imgs, {
  scale: 1,
  stagger: 0.15,
  duration: 0.4,
  ease: "power2.out",
  delay: 1,
  onComplete: scatterAndShrink,
});

gsap.to(".lpo", {
  top: "40px",
  ease: "power4.inOut",
  duration: 1,
  stagger: {
    amount: 0.15,
  },
  delay: 3,
  onComplete: () => {
    document.querySelector(".header").remove();
  },
});

gsap.from("a", {
  y: 20,
  opacity: 0,
  ease: "power2.out",
  duration: 1,
  stagger: {
    amount: 0.15,
  },
  delay: 4,
});

function scatterAndShrink() {
  gsap.to(imgs, {
    top: (i) => weddingImages[i].top,
    left: (i) => weddingImages[i].left,
    transform: "none",
    width: (i) => weddingImages[i].width,
    stagger: 0.075,
    duration: 0.75,
    ease: "power2.out",
  });
}

document.addEventListener("mousemove", (e) => {
  imgsParallax.forEach((item, index) => {
    const animationFactor = weddingImages[index].parallaxSpeed;

    const deltaX = (e.clientX - window.innerWidth / 2) * animationFactor;
    const deltaY = (e.clientY - window.innerHeight / 2) * animationFactor;

    gsap.to(item, { x: deltaX, y: deltaY, duration: 0.75 });
  });
});

var charsSplit = () => {
  let elements = document.querySelectorAll("[c-split]");

  elements.forEach((element) => {
    new SplitType(element, { type: "chars" });
  });
};

let textHeros = document.querySelectorAll(".dp-lp-text-content");

// Call the function to initialize SplitText on elements with [c-split]
charsSplit();

// Select .chars elements after SplitText operation
let charsIn = textHeros[1].querySelectorAll(".char"),
  heroWrap = document.querySelector(".dp-lp-hero-grid"),
  charsI = textHeros[0].querySelectorAll(".char");

// Convert NodeList to an array

let textAnimation = new Qe.timeline({ paused: true })
  .fromTo(
    charsI,
    {
      opacity: 1,
      y: 0,
    },
    {
      opacity: 0,
      y: "-12rem",
      stagger: { amount: 0.5 },
      duration: 1,
    },
  )
  .fromTo(
    charsIn,
    {
      opacity: 0,
      y: "10rem",
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: { amount: 0.5 },
    },
  )
  .to(textHeros, {
    opacity: 0,
    autoAlpha: 0,
    duration: 0.2,
  });

// Uncomment this section if you want to use ScrollTrigger
ScrollTrigger.create({
  trigger: tr, // Replace with your actual trigger element
  start: "top 95%",
  end: "bottom bottom",
  scrub: true,
  ease: "linear",
  animation: textAnimation,
});

let parallaxHero = new gsap.timeline({ paused: true })
  .fromTo(
    ".dp-lp-content-grid",
    {
      y: "20vh",
    },
    {
      y: "-20vh",
      ease: "linear",
      duration: 0.8, // 80% of the timeline duration
    },
  )
  .fromTo(
    ".dp-lp-content-grid",
    {
      y: "-20vh",
    },
    {
      y: "-120vh",
      ease: "power4.out",
      duration: 0.2, // 20% of the timeline duration
    },
  );

ScrollTrigger.create({
  trigger: tr,
  start: "top 95%",
  end: "bottom bottom",
  scrub: true,
  ease: "linear",
  animation: parallaxHero,
});

// ScrollTrigger.create({
//   trigger: tr,
//   start: "bottom 97%",
//   end: "bottom top",
//   scrub: !0,
//   // markers: !0,
//   ease: "linear",
//   animation: heroOut,
// });
