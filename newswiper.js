// const marquee = document.querySelectorAll(".cb-marquee");

// marquee.forEach((e) => {
//   // Create swiper carousel
//   const carousel = e.querySelectorAll(".cb-carousel");

//   carousel.forEach((e) => {
//     const items = e.querySelector(".cb-marquee-itemss");
//     const item = e.querySelectorAll(".dp-gallery-item");

//     e.classList.add("swiper-container");
//     items.classList.add("swiper-wrapper");
//     item.forEach((e) => e.classList.add("swiper-slide"));

//     const slider = new Swiper(e, {
//       slidesPerView: "auto",
//       direction: "horizontal",
//       freeMode: true,
//       draggable: true,
//       simulateTouch: true,
//       freeModeMomentumBounce: false,
//       freeModeMomentumVelocityRatio: 0.1,
//       mousehweel: {
//         releaseOnEdges: true,
//         forceToAxis: true
//       },
//       dragCursor: true
//     });
//   });

//   // Scroll triggered movement
//   const tl = new gsap.timeline();

//   tl.set(carousel, { willChange: "transform" });

//   tl.fromTo(
//     carousel,
//     {
//       x: -300
//     },
//     {
//       x: 0,
//       ease: "none"
//     },
//     0
//   );

//   tl.set(carousel, { willChange: "auto" });

//   ScrollTrigger.create({
//     trigger: e,
//     animation: tl,
//     start: "top bottom",
//     end: "bottom top",
//     scrub: 0.3,
//     refreshPriority: -14
//   });
// });
