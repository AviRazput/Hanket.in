(function () {
  "use strict";

  var menuBtn = document.querySelector(".mobile-menu-toggle");
  var drawer = document.getElementById("hk-mobile-drawer");
  var backdrop = document.querySelector(".hk-mobile-drawer__backdrop");

  function setMobileMenuOpen(open) {
    if (!menuBtn || !drawer) return;
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    menuBtn.classList.toggle("is-open", open);
    drawer.classList.toggle("is-open", open);
    drawer.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("hk-mobile-menu-open", open);
  }

  if (menuBtn && drawer) {
    menuBtn.addEventListener("click", function () {
      var open = menuBtn.getAttribute("aria-expanded") === "true";
      setMobileMenuOpen(!open);
    });
  }

  if (backdrop) {
    backdrop.addEventListener("click", function () {
      setMobileMenuOpen(false);
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && drawer && drawer.classList.contains("is-open")) {
      setMobileMenuOpen(false);
    }
  });

  if (drawer) {
    drawer.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function () {
        if (drawer.classList.contains("is-open")) {
          setMobileMenuOpen(false);
        }
      });
    });

    drawer.querySelectorAll(".hk-mobile-tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        var name = tab.getAttribute("data-hk-tab");
        drawer.querySelectorAll(".hk-mobile-tab").forEach(function (t) {
          t.classList.remove("is-active");
          t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("is-active");
        tab.setAttribute("aria-selected", "true");
        drawer.querySelectorAll(".hk-mobile-panel").forEach(function (panel) {
          var match = panel.getAttribute("data-hk-panel") === name;
          panel.classList.toggle("is-active", match);
          if (match) {
            panel.removeAttribute("hidden");
          } else {
            panel.setAttribute("hidden", "");
          }
        });
      });
    });
  }

  var slides = document.querySelectorAll(".hero-slider .slide");
  var dots = document.querySelectorAll(".slider-pagination .pagin-dot");
  var track = document.querySelector(".slider-track");
  if (slides.length && dots.length && track) {
    var current = 0;
    var timer;
    var pauseMs = 7000;

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (s, i) {
        s.classList.toggle("is-active", i === current);
      });
      dots.forEach(function (d, i) {
        d.classList.toggle("is-active", i === current);
        d.setAttribute("aria-selected", i === current ? "true" : "false");
      });
    }

    function next() {
      goTo(current + 1);
    }

    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(next, pauseMs);
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        goTo(i);
        resetTimer();
      });
    });

    var sliderEl = document.querySelector(".hero-slider");
    if (sliderEl) {
      sliderEl.addEventListener("mouseenter", function () {
        clearInterval(timer);
      });
      sliderEl.addEventListener("mouseleave", resetTimer);
    }

    resetTimer();
  }

  var toastEl = document.getElementById("toast");
  var cartCountEls = document.querySelectorAll(".cart-count");
  var cartTotalEl = document.querySelector(".cart-total");
  var cartQty = 0;

  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("is-visible");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      toastEl.classList.remove("is-visible");
    }, 2800);
  }

  var mobileSearchForm = document.querySelector(".hk-mobile-search-form");
  if (mobileSearchForm) {
    mobileSearchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      showToast("Search: connect your catalogue API here.");
    });
  }

  document.querySelectorAll(".btn-add-cart").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var name = btn.getAttribute("data-product") || "Product";
      cartQty += 1;
      cartCountEls.forEach(function (el) {
        el.textContent = String(cartQty);
      });
      if (cartTotalEl) cartTotalEl.textContent = "₹" + (cartQty * 2500).toLocaleString("en-IN");
      showToast('"' + name + '" added (demo).');
    });
  });

  var searchBtn = document.querySelector(".search-btn");
  if (searchBtn) {
    searchBtn.addEventListener("click", function () {
      showToast("Search: connect your catalogue API here.");
    });
  }

  var newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      showToast("Thanks — HANKET updates (demo).");
      newsletterForm.reset();
    });
  }

})();
