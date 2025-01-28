(function () {
  const toggleBtn = document.querySelector(".dp-menu-toggle"),
    backdrop = document.querySelector(".dp-menu-backdrop"),
    menuFill = document.querySelector(".dp-menu-textdrop"),
    menuContent = document.querySelector(".dp-menu-content"),
    menuBox = document.querySelector(".dp-menu-box"),
    menu = document.querySelector(".dp-menu");

  var opened = !1;

  // Toggle function
  var bindToggle = function () {
    toggleBtn.addEventListener("click", function () {
      toggle(); // Removed the "return." before toggle()
    });

    backdrop.addEventListener("click", function () {
      hide(); // Removed the "return." before hide()
      tlHide.eventCallback("onComplete", function () {
        opened = !1;
      });
    });
  };

  var toggle = function () {
    opened ? hide() : show();
  };

  // Show function
  var show = function () {
    (opened = !0),
      menu.classList.add("-open"),
      tlHide().pause,
      tlShow().play(0); // Play tlShow when the button is clicked
    opened = true;
  };

  // Hide function
  var hide = function (t) {
    void 0 === t && (t = !1),
      (opened = !1),
      menu.classList.remove("-open"),
      t ? (tlShow().pause(0), tlHide().pause(0)) : tlShow().pause,
      tlHide().play(0);
  };

  // Timeline for showing the menu
  var tlShow = function () {
    var t = gsap.timeline({ paused: true });
    t.set(menuBox, { display: "block" }, 0),
      t.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0),
      t.fromTo(
        menuFill,
        { scaleX: 0 },
        { scaleX: 1, ease: "expo.out", duration: 1 },
        0
      ),
      t.fromTo(
        menuContent,
        { xPercent: 50 },
        { xPercent: 0, ease: "expo.out", duration: 1 },
        0
      ),
      t.fromTo(menuContent, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.2);
    return t;
  };

  // Timeline for hiding the menu
  var tlHide = function () {
    var t = gsap.timeline({ paused: true });
    t.fromTo(backdrop, { opacity: 1 }, { opacity: 0, duration: 0.4 }, 0),
      t.fromTo(menuFill, { scaleX: 1 }, { scaleX: 0, duration: 0.4 }, 0),
      t.fromTo(
        menuContent,
        { xPercent: 0 },
        { xPercent: 20, duration: 0.4 },
        0
      ),
      t.fromTo(menuContent, { opacity: 1 }, { opacity: 0, duration: 0.1 }, 0),
      t.set(menuBox, { display: "none" });
    return t;
  };
  // Call the toggle function to bind the click event
  bindToggle();
})();
