$(window).on("load", onLoad).on("resize", onResize).on("scroll", onScroll);

var windowWidth = $(window).outerWidth();
var windowHeight = $(window).outerHeight();
var pageURL = document.URL;
function onLoad() {
  windowWidth = $(window).outerWidth();
  windowHeight = $(window).outerHeight();
  if (viewportWidth() > 768) {
    pageMode = "pc";
  } else {
    pageMode = "mobile";
  }

  pageURL = document.URL;
  subMenuSet();
}

var pageMode = "pc";
var modeChange = false;
function onResize() {
  windowWidth = $(window).outerWidth();
  windowHeight = $(window).outerHeight();

  modeChange = false;
  if (viewportWidth() > 768 && pageMode == "mobile") {
    pageMode = "pc";
    modeChange = true;
  } else if (viewportWidth() < 769 && pageMode == "pc") {
    pageMode = "mobile";
    modeChange = true;
  }

  if (modeChange) {
    if (pageMode == "pc") {
    } else if (pageMode == "mobile") {
    }
  }
}

var scrollTop = 0;
function onScroll() {
  scrollTop = $(window).scrollTop();
  if ($(".menu-bar").length > 0) {
    //var chkTop = $(".sub-kv").offset().top + $(".sub-kv").outerHeight();
    var headerTop = $("header").offset().top + $("header").outerHeight();
    if (scrollTop > headerTop) {
      $(".menu-bar").css({ position: "fixed", top: "0", left: "0", width: "100%" });
      $("section").eq(0).css({ "margin-top": "50px" });
    } else {
      $(".menu-bar").css({ position: "" });
      $("section").css({ "margin-top": "" });
    }
  }
}

$(function () {
  $("header .menu-btn").click(function () {
    if ($("header .open-menu").hasClass("open")) {
      $("body").css({ position: "" });
      $(".dimmed").animate({ opacity: 0 }, 500, function () {
        $(this).css({ display: "none" });
      });
      $("header .open-menu")
        .removeClass("open")
        .animate({ opacity: 0 }, 500, function () {
          $(this).css({ display: "none" });
        });
    } else {
      $("body").css({ position: "fixed" });
      $("header .open-menu").addClass("open").css({ display: "block", opacity: 0 }).animate({ opacity: 1 }, 500);
      $(".dimmed").css({ display: "block", opacity: 0 }).animate({ opacity: 1 }, 500);
    }

    return false;
  });

  $("header .close-btn button").click(function () {
    $("body").css({ position: "" });
    $(".dimmed").animate({ opacity: 0 }, 500, function () {
      $(this).css({ display: "none" });
    });
    $("header .open-menu")
      .removeClass("open")
      .animate({ opacity: 0 }, 500, function () {
        $(this).css({ display: "none" });
      });
    return false;
  });

  $(".menu-bar .depth .btn").click(function () {
    if ($(this).parent().hasClass("active")) {
      $(this).parent().removeClass("active");
      $(this)
        .parent()
        .find("> ul")
        .animate({ opacity: 0 }, 300, function () {
          $(this).css({ display: "none" });
        });
    } else {
      $(".menu-bar .depth").removeClass("active");
      $(".menu-bar .depth > ul").animate({ opacity: 0 }, 300, function () {
        $(this).css({ display: "none" });
      });
      $(this).parent().addClass("active");
      $(this).parent().find("> ul").css({ display: "block", opacity: 0 }).stop().animate({ opacity: 1 }, 300);
    }
  });

  var clickPath = null;
  function clickMenuEvent() {
    if (
      $(clickPath[0]).hasClass("depth") ||
      !clickPath.some(function (path) {
        return $(path).hasClass("depth");
      })
    ) {
      $(".menu-bar .depth").removeClass("active");
      $(".menu-bar .depth > ul").animate({ opacity: 0 }, 300, function () {
        $(this).css({ display: "none" });
      });
      $(".menu-bar").addClass("active");
      $(".menu-bar").find("> ul").css({ display: "block", opacity: 0 }).stop().animate({ opacity: 1 }, 300);
    }
  }
  function touchStartEvent(event) {
    if (event.path === void 0) {
      event.path = event.composedPath();
    }
    clickPath = event.path;
  }
  window.addEventListener("click", clickMenuEvent);
  window.addEventListener(window.ontouchstart === null ? "touchstart" : "mousedown", touchStartEvent);

  $("header .open-menu .open-menu-inner ul li a.open-title").click(function () {
    if (viewportWidth() < 769) {
      if (!$(this).parent().hasClass("out-link")) {
        if ($(this).parent().hasClass("active")) {
          $(this).parent().removeClass("active");
        } else {
          $("header .open-menu .open-menu-inner ul li").removeClass("active");
          $(this).parent().addClass("active");
        }

        gnbReload();
        return false;
      }
    }
  });

  $(".link-tab ul li a").click(function () {
    if ($(".link-tab").hasClass("active")) {
      $(".link-tab").removeClass("active");
    } else {
      $(".link-tab").addClass("active");
    }
  });

  $(".tab-menu ul li a").click(function () {
    if ($(".tab-menu").hasClass("active")) {
      $(".tab-menu").removeClass("active");
    } else {
      $(".tab-menu").addClass("active");
    }

    if (!$(this).parent().hasClass("active")) {
      var clickIndex = $(this).parent().index();
      $(".tab-menu ul li").removeClass("active");
      $(this).parent().addClass("active");
      $(".tab-cont").removeClass("active");
      $(".tab-cont").eq(clickIndex).addClass("active");
    }
    return false;
  });

  var clickPath = null;
  function clickEvent() {
    if (
      !clickPath.some(function (path) {
        return $(path).hasClass("link-tab");
      })
    ) {
      $(".link-tab.active").removeClass("active");
    }
  }
  function touchStartEvent(event) {
    if (event.path === void 0) {
      event.path = event.composedPath();
    }
    clickPath = event.path;
  }
  window.addEventListener("click", clickEvent);
  window.addEventListener(window.ontouchstart === null ? "touchstart" : "mousedown", touchStartEvent);
});

function subMenuSet() {
  if ($(".menu-bar").length > 0) {
    /*$(".menu-bar .depth1 ul li").each(function(){
			if (document.URL.indexOf($(this).find("a").attr("href")) > -1)
			{
				$(this).parents(".depth").find("> a").text($(this).find("a").text());
			}
		});*/

    $(".menu-bar .depth2 ul li").each(function () {
      var groupURL = $(this).find("a").attr("href").split("/");
      var reURL = "";
      //var maxLength = groupURL.length > 3 ? 3 : groupURL.length;
      var maxLength = Math.min(3, groupURL.length);
      if (groupURL[1].match(/chn|eng/)) {
        maxLength++;
      }
      for (var i = 1; i < maxLength; i++) {
        reURL += "/" + groupURL[i];
      }

      if (document.URL.indexOf(reURL) > -1) {
        $(this).parents(".depth").find("> a").text($(this).find("a").text());
      }
    });
  }
}

// GNB Inner Scroll
$(function () {
  var header = $("header");

  header.menu = header.find(".open-menu");

  function resetScrollbar() {
    if (header.menu.is(".mCustomScrollbar")) {
      header.menu.css({ height: "", "max-height": "" });
      header.menu.mCustomScrollbar("destroy");
    }
  }

  function generateScrollbar() {
    header.menu.mCustomScrollbar({
      axis: "y",
      theme: "dark-2",
      mouseWheelPixels: 300,
      scrollInertia: 200,
    });
  }

  function loadGnb() {
    if (page.mode === "m") {
      gnbReload();
    }
  }

  function resizeGnb() {
    if (page.modeChanged || page.modeChanged === void 0) {
      if (page.mode === "pc") {
        resetScrollbar();
      }
    }

    if (page.mode === "m") {
      gnbReload();
    }
  }

  function gnbReload() {
    resetScrollbar();

    header.menu.css({ height: header.menu.height() + 1, "max-height": page.height - header.height() });

    generateScrollbar();
  }

  window.addEventListener("load", loadGnb);
  window.addEventListener("resize", resizeGnb);

  window.gnbReload = gnbReload;
});

function viewportWidth() {
  if (typeof document.documentElement.clientWidth != "undefined" && typeof window.innerWidth != "undefined") {
    if (document.documentElement.clientWidth > window.innerWidth) return document.documentElement.clientWidth;
    else return window.innerWidth;
  } else if (
    typeof document.documentElement != "undefined" &&
    typeof document.documentElement.clientWidth != "undefined" &&
    document.documentElement.clientWidth != 0
  ) {
    return document.documentElement.clientWidth;
  } else {
    return (viewportwidth = document.getElementsByTagName("body")[0].clientWidth);
  }
}
