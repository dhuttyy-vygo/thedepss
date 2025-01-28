// var marq = function () {
//     const marquee = document.querySelectorAll(".dp-marq");

//     if (marquee.length === 0) {
//       console.log("no marq var items");
//       return;
//     }

//     marquee.forEach((e) => {
//       // Create swiper carousel
//       const carousel = e.querySelectorAll(".dp-marq-carousel");

//       carousel.forEach((e) => {
//         const items = e.querySelector(".dp-marq-items");
//         const item = e.querySelectorAll(".dp-marq-item");

//         e.classList.add("swiper-container");
//         items.classList.add("swiper-wrapper");
//         item.forEach((e) => e.classList.add("swiper-slide"));
//         e.insertAdjacentHTML(
//           "beforeend",
//           '<div class="swiper-pagination-black"></div>',
//         );
//         e.insertAdjacentHTML(
//           "beforeend",
//           '<div class="swiper-arrow button-prev"></div>',
//         );
//         e.insertAdjacentHTML(
//           "beforeend",
//           '<div class="swiper-arrow button-next"></div>',
//         );

//         const slider = new Swiper(e, {
//           direction: "horizontal",
//           loop: true,
//           slidesPerView: "auto",
//           spaceBetween: 30,
//           loop: false,
//           mousewheel: {
//             forceToAxis: true,
//           },
//           speed: 300,
//           // Responsive breakpoints
//           breakpoints: {
//             // when window width is >= 480px
//             480: {
//               slidesPerView: 1,
//             },
//             // when window width is >= 768px
//             768: {
//               slidesPerView: 1,
//             },
//             // when window width is >= 992px
//             992: {
//               slidesPerView: "auto",
//             },
//           },

//           // If we need pagination
//           pagination: {
//             el: ".swiper-pagination-black",
//             clickable: true,
//           },

//           // Navigation arrows
//           navigation: {
//             nextEl: ".button-next",
//             prevEl: ".button-prev",
//             hiddenClass: "swiper-button-hidden",
//           },
//         });
//       });
//     });
//   },
//   marqHero = function () {
//     const marquee = document.querySelectorAll(".cb-marquee");

//     if (marquee.length === 0) {
//       console.log("marqHero has no items");
//       return;
//     }

//     marquee.forEach((e) => {
//       // Create swiper carousel
//       const carousel = e.querySelectorAll(".cb-carousel");

//       carousel.forEach((e) => {
//         const items = e.querySelector(".cb-marquee-itemss");
//         const item = e.querySelectorAll(".dp-gallery-item");

//         e.classList.add("swiper-container");
//         items.classList.add("swiper-wrapper");
//         item.forEach((e) => e.classList.add("swiper-slide"));

//         const slider = new Swiper(e, {
//           slidesPerView: "auto",
//           direction: "horizontal",
//           freeMode: true,
//           draggable: true,
//           simulateTouch: true,
//           freeModeMomentumBounce: false,
//           freeModeMomentumVelocityRatio: 0.1,
//           mousehweel: {
//             releaseOnEdges: true,
//             forceToAxis: true,
//           },
//           dragCursor: true,
//         });
//       });

//       // Scroll triggered movement
//       const tl = new gsap.timeline();

//       tl.set(carousel, { willChange: "transform" });

//       tl.fromTo(
//         carousel,
//         {
//           x: -300,
//         },
//         {
//           x: 0,
//           ease: "none",
//         },
//         0,
//       );

//       tl.set(carousel, { willChange: "auto" });

//       ScrollTrigger.create({
//         trigger: e,
//         animation: tl,
//         start: "top bottom",
//         end: "bottom top",
//         scrub: 0.3,
//         refreshPriority: -14,
//       });
//     });
//   },
//   reviewsM = function () {
//     const marquee = document.querySelectorAll(".dp-marq-reviews");

//     if (marquee.length === 0) {
//       console.log("no Reviews");
//       return;
//     }
//     marquee.forEach((e) => {
//       // Create swiper carousel
//       const carousel = e.querySelectorAll(".dp-marq-carousel-wrapper");

//       carousel.forEach((e) => {
//         const items = e.querySelector(".dp-marq-review-items");
//         const item = e.querySelectorAll(".dp-marq-review-item");

//         e.classList.add("swiper-container");
//         items.classList.add("swiper-wrapper");
//         item.forEach((e) => e.classList.add("swiper-slide"));
//         e.insertAdjacentHTML(
//           "beforeend",
//           '<div class="swiper-pagination"></div>',
//         );
//         e.insertAdjacentHTML(
//           "beforeend",
//           '<div class="swiper-arrow button-prev"></div>',
//         );
//         e.insertAdjacentHTML(
//           "beforeend",
//           '<div class="swiper-arrow button-next"></div>',
//         );

//         const slider = new Swiper(e, {
//           direction: "horizontal",
//           loop: !1,
//           slidesPerView: 1,
//           spaceBetween: 105,
//           loop: false,
//           mousewheel: {
//             forceToAxis: true,
//           },
//           speed: 700,
//           // Responsive breakpoints
//           breakpoints: {
//             // when window width is >= 480px
//             480: {
//               slidesPerView: 1,
//             },
//             // when window width is >= 768px
//             768: {
//               slidesPerView: 1,
//             },
//             // when window width is >= 992px
//             992: {
//               slidesPerView: 1,
//             },
//           },

//           // If we need pagination
//           pagination: {
//             el: ".swiper-pagination",
//             clickable: true,
//           },

//           // Navigation arrows
//           navigation: {
//             nextEl: ".button-next",
//             prevEl: ".button-prev",
//             hiddenClass: "swiper-button-hidden",
//           },
//         });
//       });
//     });
//   };

// marq(), marqHero(), reviewsM();
