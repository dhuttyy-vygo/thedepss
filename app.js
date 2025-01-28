(() => {
  // declaring globals //
  var Sc = ScrollTrigger;
  var Qe = gsap;

  Qe.config({
    nullTargetWarn: !1,
  });

  Qe.registerPlugin(ScrollTrigger);

  let lenis;
  if (Webflow.env("editor") === undefined) {
    lenis = new Lenis({
      lerp: 1,
      // wheelMultiplier: 0.8,
      gestureOrientation: "vertical",
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  $("[data-lenis-start]").on("click", function () {
    lenis.start();
  });
  $("[data-lenis-stop]").on("click", function () {
    lenis.stop();
  });
  $("[data-lenis-toggle]").on("click", function () {
    $(this).toggleClass("stop-scroll");
    if ($(this).hasClass("stop-scroll")) {
      lenis.stop();
    } else {
      lenis.start();
    }
  });

  const cursor = new MouseFollower({
    speed: 0.8,
    skewing: 1,
    skewingText: 1,
  });

  setTimeout(() => {
    $("[dp-fade-in]").each(function (index) {
      let textEl = $(this).find("[text-split]");
      let textContent = textEl.text();
      let tl;
      Qe.set(textEl, { autoAlpha: 1 });

      function splitText() {
        new SplitType(textEl, { types: "lines", tagName: "span" });
        textEl.find(".line").each(function (index) {
          let lineContent = $(this).html();
          $(this).html("");
          $(this).append(
            `<span class="line-inner" style="display: block;">${lineContent}</span>`,
          );
        });
        tl = Qe.timeline({
          scrollTrigger: {
            trigger: textEl,
            start: "top bottom",
            end: "bottom bottom",
            toggleActions: "none play none none",
          },
        });
        tl.fromTo(
          textEl.find(".line-inner"),
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.7,
            stagger: { amount: 0.3, ease: "power4.out" },
          },
        );
      }
      splitText();

      let windowWidth = window.innerWidth;
      window.addEventListener("resize", function () {
        if (windowWidth !== window.innerWidth) {
          windowWidth = window.innerWidth;
          tl.kill();
          textEl.text(textContent);
          splitText();
        }
      });
    });
  }, 700);

  var navinit = function () {
    const toggleBtn = document.querySelector(".dp-menu-toggle"),
      backdrop = document.querySelector(".dp-menu-backdrop"),
      menuFill = document.querySelector(".dp-menu-textdrop"),
      menuContent = document.querySelector(".dp-menu-content"),
      menuBox = document.querySelector(".dp-menu-box"),
      menu = document.querySelector(".dp-menu");

    var opened = false;

    // Timeline for showing the menu

    var tlShow = Qe.timeline({ paused: true });
    tlShow.set(menuBox, { display: "block" }, 0);
    tlShow.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0);
    tlShow.fromTo(
      menuFill,
      { scaleX: 0 },
      { scaleX: 1, ease: "expo.out", duration: 1 },
      0,
    );
    tlShow.fromTo(
      menuContent,
      { xPercent: 50 },
      { xPercent: 0, ease: "expo.out", duration: 1 },
      0,
    );
    tlShow
      .fromTo(menuContent, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.2)
      .reverse();

    var bindToggle = function () {
      toggleBtn.addEventListener("click", function () {
        toggle();
      });

      backdrop.addEventListener("click", function () {
        hide();
      });
    };

    var toggle = function () {
      opened ? hide() : show();
    };

    var show = function () {
      menu.classList.add("-open");
      tlShow.timeScale(1).play();
      lenis.stop();
      opened = true;
    };

    var hide = function () {
      menu.classList.remove("-open");
      tlShow.timeScale(1.5).reverse();
      lenis.start();
      opened = false;
    };

    bindToggle();
  };

  var reserveInit = function () {
    // Fetch data => needs multiple states & dynamic link to input fields onSuccess

    // ** State Control ** //
    // needs toggle control on each popup. => so onComplete => check if date isn't set. Then if not open that after venue. //
    // try to keep animations within CSS instead of GSAP, as we can toggle css & domElements based on inputs, can't read that as easily with GSAP.Qe//

    // ** Mobile & Tablet Responsives //
    // need to consider mobile states as well // overflowY within one contrainer could work - or just seperate domElements //
    const toggleBtn = document.getElementById("dp-reserve-toggle"),
      backdrop = document.querySelector(".dp-reserve-focused-backdrop"),
      menuClose = document.querySelector(".dp-close-res"),
      reservec = document.querySelector(".dp-reserve-close"),
      menuContainer = document.querySelector(".dp-nav"),
      menuContent = document.querySelector(".dp-nav-top"),
      menuInner = menuContent.querySelector(".dp-more-links"),
      submit = document.querySelector(".dp-submit-button"),
      fieldItems = document.querySelectorAll(
        ".dp-input-t, .dp-form-title, .dp-form-subtitle, .dp-logo-reserve",
      ),
      menu = document.querySelector(".dp-nav");

    var opened = false;
    var focused = !1;

    var tlShow = Qe.timeline({ reversed: true, paused: true });
    tlShow.set(submit, { display: "flex" }, 0);
    Qe.set(menuContent, { autoAlpha: 0, scaleY: 0 });
    // tlShow.set(botNavItems, { display: "none" }, 0);
    tlShow.fromTo(
      menuClose,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.2 },
      0,
    );
    tlShow.fromTo(
      reservec,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.3 },
      0.2,
    );
    tlShow.fromTo(submit, { height: 0 }, { height: "70px", duration: 0.3 }, 0);
    tlShow.fromTo(
      menuContent,
      { scaleY: 0, autoAlpha: 0 },
      {
        scaleY: 1,
        autoAlpha: 1,
        ease: "out.expo",
        duration: 0.3,
      },
      0,
    );

    tlShow.fromTo(
      menuInner,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 0.3,
      },
      0,
    );

    tlShow.fromTo(
      fieldItems,
      { opacity: 0, yPercent: 50 },
      {
        opacity: 1,
        yPercent: 0,
        duration: 0.3,
        stagger: { amount: 0.3 },
        ease: "power4.out",
      },
      0.15,
    );

    var bindToggle = function () {
      toggleBtn.addEventListener("click", function () {
        toggle(); // Removed the "return." before toggle()
      });

      backdrop.addEventListener("click", function () {
        hide();
        // Removed the "return." before hide()
      });
    };

    var toggle = function () {
      opened ? hide() : show();
    };

    var bindFocus = function () {
      menuContainer.addEventListener("click", function () {
        showFocus();
      });
      backdrop.addEventListener("click", function () {
        hideFocus();
      });
    };

    var toggleFocus = function () {
      focused ? hideFocus() : showFocus();
    };

    var showFocus = function () {
      menuContainer.classList.add("-focused");
      backdrop.classList.add("-visible");
      focused = !0;
    };

    var hideFocus = function () {
      menuContainer.classList.remove("-focused");
      backdrop.classList.remove("-visible");
      focused = !1;
    };

    // Show function
    var show = function () {
      menu.classList.add("-open");
      backdrop.classList.add("-visible");
      tlShow.reversed() ? tlShow.play() : tlShow.reverse();
      lenis.stop();
      focused ? showFocus() : hideFocus(); // Play tlShow when the button is clicked
      opened = true;
    };

    // Hide function
    var hide = function () {
      menu.classList.remove("-open");
      backdrop.classList.remove("-open");
      tlShow.reverse();
      lenis.start();
      focused ? showFocus() : hideFocus(); // Play tlHide when the button is clicked
      opened = false;
    };

    // Call the toggle function to bind the click event
    bindToggle(), bindFocus();
  };

  function Va() {
    document.querySelectorAll(".faq-menu").forEach((e) => {
      let t = {
        scrollTrigger: {
          trigger: e,
          start: "top bottom",
        },
        y: 16,
        opacity: 0,
        duration: 0.4,
        delay: 0.1,
        ease: "power4.out",
      };
      Qe.from(e, t);
    }),
      document.querySelectorAll(".dp-line").forEach((e) => {
        let t = {
          scrollTrigger: {
            trigger: e,
            start: "top bottom",
          },
          width: "0%",
          duration: 2,
          delay: 0.1,
          ease: "power.inOut",
        };
        Qe.from(e, t);
      }),
      (out = () => {
        let r = document.querySelector(".dp-outro"),
          u = r.querySelector(".dp-outro-contain"),
          t = Qe.timeline();

        t.fromTo(
          u,
          {
            yPercent: -50,
          },
          {
            yPercent: 0,
            duration: 1,
            ease: "none",
          },
        ),
          Sc.create({
            trigger: r,
            start: "top bottom",
            end: "top top",
            scrub: !0,
            animation: t,
          });
      });

    out();
  }
  function socialMarquee() {
    const tR = document.querySelector(".dp-social-marquee");

    if (!tR) {
      // tR element not found, return early or handle the case accordingly
      return;
    }

    const trUp = document.querySelectorAll("[data-social='i']");
    const trDown = document.querySelector("[data-social='d']");

    const e = Qe.timeline();

    Sc.create({
      trigger: tR,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      animation: e,
    });

    e.fromTo(trUp, { yPercent: 0 }, { yPercent: -50, ease: "none" }, 0);
    e.fromTo(trDown, { yPercent: 0 }, { yPercent: 50, ease: "none" }, 0);

    return e;
  }

  var setupImageGallery = () => {
    const projects = document.querySelectorAll(".dp-gallery-item");

    if (projects.length === 0) {
      // projects is either undefined or null, return early or handle the case accordingly
      return;
    }

    const imgViewContainer = document.querySelector(".img-modal .img-view"),
      closeImgBtn = document.querySelector("[modal-close='image']"),
      closevideoBtn = document.querySelector("[modal-close='video']"),
      modalName = document.querySelector(".modal-name"),
      modalSubheader = document.querySelector(".modal-subheader"),
      previewName = document.querySelector(".preview-name"),
      previewSubheader = document.querySelector(".preview-subheader"),
      initPreview = previewName.textContent,
      initPreviewSub = previewSubheader.textContent,
      videoViewContainer = document.querySelector(".video-modal .video-view"),
      tlvModal = Qe.timeline({ paused: true }),
      tlImgModal = Qe.timeline({ paused: true });

    function pauseVideo() {
      const videoElement = videoViewContainer.querySelector("video");
      if (videoElement && !videoElement.paused) {
        videoElement.pause();
      }
    }

    projects.forEach((project) => {
      const dataType = project.getAttribute("data-type");

      project.addEventListener("mouseover", () => {
        const name = project.querySelector(".name").textContent;
        const subheader = project.querySelector(".subheader").textContent;
        previewSubheader.textContent = name;
        previewName.textContent = subheader;
      });

      project.addEventListener("mouseleave", () => {
        previewName.textContent = initPreview;
        previewSubheader.textContent = initPreviewSub;
      });

      if (dataType === "image") {
        project.addEventListener("click", () => {
          const dataImg = project.getAttribute("data-img");
          imgViewContainer.innerHTML = `<img src="https://assets-global.website-files.com/6297c0caac98bd42cd4d5305/${dataImg}.jpeg" alt="" />`;
          const name = project.querySelector(".name").textContent;
          const subheader = project.querySelector(".subheader").textContent;
          modalName.textContent = name;
          modalSubheader.textContent = subheader;
          tlImgModal.reversed(!tlImgModal.reversed()), lenis.stop();
        });
      } else if (dataType === "player") {
        project.addEventListener("click", () => {
          const dataPlayer = project.getAttribute("data-player");
          videoViewContainer.innerHTML = `
                  <video 
                    src="https://d2jg36g42afwo9.cloudfront.net/player/${dataPlayer}.mp4" 
                    alt=""
                    autoplay
                    playsinline
                    controls
                  ></video>`;
          const name = project.querySelector(".name").textContent;
          const subheader = project.querySelector(".subheader").textContent;
          modalName.textContent = name;
          modalSubheader.textContent = subheader;
          tlvModal.reversed(!tlvModal.reversed()), lenis.stop();
        });
      }
    });

    closeImgBtn.onclick = function (e) {
      tlImgModal.reversed(!tlImgModal.reversed()), lenis.start();
    };

    closevideoBtn.onclick = function (e) {
      tlvModal.reversed(!tlvModal.reversed()), lenis.start();
      pauseVideo();
    };

    function iModal() {
      tlImgModal.to(
        ".dp-gallery-item .name",
        1,
        {
          top: "30px",
          ease: "power4.inOut",
        },
        0,
      );

      tlImgModal.to(
        ".img-preview-container",
        1,
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
          ease: "power4.inOut",
        },
        0,
      );

      tlImgModal.to(
        ".img-modal",
        0.5,
        {
          opacity: 1,
          ease: "none",
          pointerEvents: "auto",
        },
        0.5,
      );

      tlImgModal.to(
        ".img-view",
        1,
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          ease: "power4.inOut",
        },
        0,
      );

      tlImgModal
        .to(
          ".modal-name",
          1,
          {
            top: "0",
            ease: "power4.inOut",
          },
          "<",
        )
        .reverse();
    }

    iModal();

    function vModal() {
      tlvModal.to(
        ".dp-gallery-item .name",
        1,
        {
          top: "30px",
          ease: "power4.inOut",
        },
        0,
      );

      tlvModal.to(
        ".img-preview-container",
        1,
        {
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
          ease: "power4.inOut",
        },
        0,
      );

      tlvModal.to(
        ".video-modal",
        0.5,
        {
          opacity: 1,
          ease: "none",
          pointerEvents: "auto",
        },
        0.4,
      );

      tlvModal.to(
        ".video-view",
        1,
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          ease: "power4.inOut",
        },
        0,
      );

      tlvModal.to(
        ".close-btn .m-btn",
        1,
        {
          top: "0",
          ease: "power4.inOut",
        },
        "<",
      );

      tlvModal
        .to(
          ".modal-name",
          1,
          {
            top: "0",
            ease: "power4.inOut",
          },
          "<",
        )
        .reverse();
    }

    console.log("image gallery loaded");
    vModal();
    4;
  };

  var gui = function () {
      if (document.querySelector("[scroll-speed='100']")) {
        var projectX = Qe.utils.toArray("[scroll-speed='100']"),
          projectY = Qe.utils.toArray("[scroll-speed='0']");

        if (projectX.length === 0 && projectY.length === 0) {
          console.log("parallax, aka gui is 0");
          return;
        }

        projectX.forEach((project) => {
          var tR = project;
          var tl = Qe.timeline();

          tl.fromTo(
            project,
            {
              y: 100,
            },
            {
              y: 0,
              duration: 1,
            },
          );

          Sc.create({
            trigger: tR,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.4,
            animation: tl,
          });
        });

        projectY.forEach((project) => {
          var tR = project,
            tl = Qe.timeline();

          tl.fromTo(
            project,
            {
              y: -100,
            },
            {
              y: 0,
              duration: 1,
            },
          );

          Sc.create({
            trigger: tR,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.4,
            animation: tl,
          });
        });
        console.log("Gui loaded");
      }
    },
    marq = function () {
      const marquee = document.querySelectorAll(".dp-marq");

      if (marquee.length === 0) {
        console.log("no marq var items");
        return;
      }

      marquee.forEach((e) => {
        // Create swiper carousel
        const carousel = e.querySelectorAll(".dp-marq-carousel");

        carousel.forEach((e) => {
          const items = e.querySelector(".dp-marq-items");
          const item = e.querySelectorAll(".dp-marq-item");

          e.classList.add("swiper-container");
          items.classList.add("swiper-wrapper");
          item.forEach((e) => e.classList.add("swiper-slide"));
          e.insertAdjacentHTML(
            "beforeend",
            '<div class="swiper-pagination-black"></div>',
          );
          e.insertAdjacentHTML(
            "beforeend",
            '<div class="swiper-arrow button-prev"></div>',
          );
          e.insertAdjacentHTML(
            "beforeend",
            '<div class="swiper-arrow button-next"></div>',
          );

          const slider = new Swiper(e, {
            direction: "horizontal",
            loop: true,
            slidesPerView: "auto",
            spaceBetween: 30,
            loop: false,
            mousewheel: {
              forceToAxis: true,
            },
            speed: 300,
            // Responsive breakpoints
            breakpoints: {
              // when window width is >= 480px
              480: {
                slidesPerView: 1,
              },
              // when window width is >= 768px
              768: {
                slidesPerView: 1,
              },
              // when window width is >= 992px
              992: {
                slidesPerView: "auto",
              },
            },

            // If we need pagination
            pagination: {
              el: ".swiper-pagination-black",
              clickable: true,
            },

            // Navigation arrows
            navigation: {
              nextEl: ".button-next",
              prevEl: ".button-prev",
              hiddenClass: "swiper-button-hidden",
            },
          });
        });
      });
    },
    marqHero = function () {
      const marquee = document.querySelectorAll(".cb-marquee");

      if (marquee.length === 0) {
        console.log("marqHero has no items");
        return;
      }

      marquee.forEach((e) => {
        // Create swiper carousel
        const carousel = e.querySelectorAll(".cb-carousel");

        carousel.forEach((e) => {
          const items = e.querySelector(".cb-marquee-itemss");
          const item = e.querySelectorAll(".dp-gallery-item");

          e.classList.add("swiper-container");
          items.classList.add("swiper-wrapper");
          item.forEach((e) => e.classList.add("swiper-slide"));

          const slider = new Swiper(e, {
            slidesPerView: "auto",
            direction: "horizontal",
            freeMode: true,
            draggable: true,
            simulateTouch: true,
            freeModeMomentumBounce: false,
            freeModeMomentumVelocityRatio: 0.1,
            mousehweel: {
              releaseOnEdges: true,
              forceToAxis: true,
            },
            dragCursor: true,
          });
        });

        // Scroll triggered movement
        const tl = new gsap.timeline();

        tl.set(carousel, { willChange: "transform" });

        tl.fromTo(
          carousel,
          {
            x: -300,
          },
          {
            x: 0,
            ease: "none",
          },
          0,
        );

        tl.set(carousel, { willChange: "auto" });

        ScrollTrigger.create({
          trigger: e,
          animation: tl,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.3,
          refreshPriority: -14,
        });
      });
    },
    reviewsM = function () {
      const marquee = document.querySelectorAll(".dp-marq-reviews");

      if (marquee.length === 0) {
        console.log("no Reviews");
        return;
      }
      marquee.forEach((e) => {
        // Create swiper carousel
        const carousel = e.querySelectorAll(".dp-marq-carousel-wrapper");

        carousel.forEach((e) => {
          const items = e.querySelector(".dp-marq-review-items");
          const item = e.querySelectorAll(".dp-marq-review-item");

          e.classList.add("swiper-container");
          items.classList.add("swiper-wrapper");
          item.forEach((e) => e.classList.add("swiper-slide"));
          e.insertAdjacentHTML(
            "beforeend",
            '<div class="swiper-pagination"></div>',
          );
          e.insertAdjacentHTML(
            "beforeend",
            '<div class="swiper-arrow button-prev"></div>',
          );
          e.insertAdjacentHTML(
            "beforeend",
            '<div class="swiper-arrow button-next"></div>',
          );

          const slider = new Swiper(e, {
            direction: "horizontal",
            loop: !1,
            slidesPerView: 1,
            spaceBetween: 105,
            loop: false,
            mousewheel: {
              forceToAxis: true,
            },
            speed: 700,
            // Responsive breakpoints
            breakpoints: {
              // when window width is >= 480px
              480: {
                slidesPerView: 1,
              },
              // when window width is >= 768px
              768: {
                slidesPerView: 1,
              },
              // when window width is >= 992px
              992: {
                slidesPerView: 1,
              },
            },

            // If we need pagination
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },

            // Navigation arrows
            navigation: {
              nextEl: ".button-next",
              prevEl: ".button-prev",
              hiddenClass: "swiper-button-hidden",
            },
          });
        });
      });
    };

  (function () {
    if (document.querySelector(".faq-menu")) {
      let groups = Qe.utils.toArray(".faq-menu");
      let menus = Qe.utils.toArray(".dp-faq-item");
      let menuToggles = [];

      let activeMenu = null; // Keep track of the active menu

      if (groups.length > 0 && menus.length > 0) {
        menus.forEach((menu) => {
          let animation = createAnimation(menu);
          menuToggles.push(animation);

          menu.addEventListener("click", () => toggleMenu(animation));
        });
      }

      function toggleMenu(animation) {
        if (activeMenu !== animation) {
          if (activeMenu) {
            activeMenu.reverse(); // Close the previously open menu
          }
          animation.play(); // Open the clicked menu
          activeMenu = animation;
        } else {
          animation.reverse(); // Close the clicked menu
          activeMenu = null;
        }
      }

      function createAnimation(menu) {
        let element = menu.parentElement;
        let box = element.querySelector(".answer");
        let plusSign = element.querySelector(".plus");
        let cardBack = element.querySelector(".faq-item");
        let questionText = element.querySelector(".questionn");

        Qe.set(box, { height: "auto" });
        Qe.set(questionText, { marginLeft: "2vw" });

        let timeline = Qe.timeline({ paused: true })
          .from(box, {
            height: 0,
            duration: 0.5,
            ease: "power1.inOut",
          })
          .from(
            questionText,
            {
              marginLeft: 0,
              duration: 0.5,
              ease: "power4.inOut",
            },
            "<",
          )
          .to(
            plusSign,
            {
              rotate: "45deg",
              duration: 0.1,
              ease: "power1.inOut",
            },
            "<",
          )
          .reverse();

        return timeline;
      }
      console.log("FAQ loaded");
    }
  })();

  document.addEventListener("DOMContentLoaded", () => {
    navinit(),
      reserveInit(),
      setupImageGallery(),
      Va(),
      socialMarquee(),
      gui(),
      homeIn(),
      loadIn(),
      ilx(),
      marq(),
      marqHero(),
      reviewsM(),
      heroIn();
  });

  var homeIn = () => {
      let e = document.querySelectorAll(
          ".dp-gallery-item img, .dp-gallery-item video",
        ),
        te = document.querySelectorAll(".name, .subheader");

      if (!e || e.length === 0) {
        console.log("No elements found for Gallery loadin");
        return;
      }
      let t = Qe.timeline();

      Qe.set(e, { autoAlpha: 0 });
      t.to(
        e,
        {
          clipPath: "polygon(0px 0, 100% 0%, 100% 100%, 0px 100%)",
          autoAlpha: 1,
          stagger: { amount: 1 },
          duration: 0.6,
        },
        0,
      ),
        t.fromTo(
          te,
          {
            y: 10,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: { amount: 1 },
          },
          ">-.1",
        );
      console.log("homeIn loaded");
    },
    loadIn = () => {
      var e = document.querySelector(".dp-loader"),
        r = document.querySelector(".dp-reserve-menu"),
        t = Qe.timeline();
      console.log("loadIn loaded");
      return (
        t.set(
          e,
          {
            opacity: 1,
            display: "block",
          },
          0,
        ),
        t
          .to(e, {
            opacity: 0,
            duration: 2,
            ease: "power4.out",
            pointerEvents: "none",
            display: "none",
          })
          .add(() => {
            // Add a class to the element after a delay
            r.classList.add("visible");
          })
      );
    },
    ilx = () => {
      const elImage = document.querySelectorAll("[data-type='image']");
      const viModal = document.querySelectorAll(".modal-nav");
      const elVideo = document.querySelectorAll(
        "[data-type='player'], .dp-project-video",
      );

      if (!elImage || elImage.length === 0) {
        console.log("No elements found for elImage");
        return;
      }

      if (!viModal || viModal.length === 0) {
        console.log("No elements found for viModal");
        return;
      }

      if (!elVideo || elVideo.length === 0) {
        console.log("No elements found for elVideo");
        return;
      }

      viModal.forEach(function (e) {
        e.addEventListener("mouseenter", () => {
          cursor.setText("CLOSE");
        });
        e.addEventListener("mouseleave", () => {
          cursor.removeText();
        });
      });

      elImage.forEach(function (element) {
        element.addEventListener("mouseenter", () => {
          cursor.setText("VIEW");
        });

        element.addEventListener("mouseleave", () => {
          cursor.removeText();
        });
      });

      elVideo.forEach(function (element) {
        element.addEventListener("mouseenter", () => {
          cursor.setText("PLAY");
        });

        element.addEventListener("mouseleave", () => {
          cursor.removeText();
        });
      });
    },
    heroIn = () => {
      var tr = document.querySelector("[dp-header-in]");

      if (!tr) {
        console.log("heroIn not found");
        return;
      }

      const e = tr.querySelectorAll("[dp-h-in]"),
        t = Qe.timeline();

      Qe.set(e, { yPercent: 100, autoAlpha: 0 });
      // return (
      t.fromTo(
        e,
        {
          yPercent: 100,
          autoAlpha: 0,
        },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 1,
          stagger: { amount: 0.2 },
          ease: "power1.out",
        },
      );
      console.log("heroIn");
    };
  window.addEventListener("pagehide", function () {
    return window.scrollTo(0, 0);
  });
})();

$(document).ready(function () {
  $('[data-toggle="datepicker"]').datepicker({
    autoHide: true,
    pick: function (e) {
      e.preventDefault(); //prvent any default action..
      var pickedDate = e.date; //get date
      var date = e.date.getDate();
      var day = $(this).datepicker("getDayName", true);
      var month = $(this).datepicker("getMonthName", true, true);
      var year = e.date.getFullYear();
      var new_date = day + " " + date + " " + month + " " + year;
      //set date
      // $(this).val(`${date} ${month} ${year}`)
      $(this).val(new_date);
    },
  });
});
