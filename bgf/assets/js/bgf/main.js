$(window).on("load", mainLoad).on("resize", mainResize).on("scroll", mainScroll);

var mainWidth = $(window).outerWidth();
var mainHeight = $(window).outerHeight();
var htmlHeight = $("html").outerHeight();
function mainLoad() {
  mainWidth = $(window).outerWidth();
  mainHeight = $(window).outerHeight();
  htmlHeight = $("html").outerHeight();
  if (viewportWidth() > 768) {
    pageMode = "pc";
  } else {
    pageMode = "mobile";
  }
  introPlay();

  if (check_device() != "") {
    mainSwipe();
    $("main section").css({ height: $(window).outerHeight() + "px" });
    $("body").addClass("device");
    footerPosition();
  }

  //alert(htmlHeight + "//" + mainHeight);
  featureHeight();
}

var pageMode = "pc";
var modeChange = false;
function mainResize() {
  mainWidth = $(window).outerWidth();
  mainHeight = $(window).outerHeight();
  htmlHeight = $("html").outerHeight();

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

  featureHeight();
  setTimeout(featureHeight, 500);
  setTimeout(featureHeight, 1000);
}

function featureHeight() {
  if (parseInt($("main .main-kv").css("margin-top")) != 0) {
    $("main .main-kv").css({ "margin-top": -windowHeight + "px" });
  }
  videoPosition();

  if (check_device() != "") {
    if (matchMedia("(orientation: portrait)").matches) {
      // �몃줈 紐⑤뱶�먯꽌留� �숈옉
      $("main section").css({ height: htmlHeight + "px" });
      //$("main .slide-wrap .slide-cont .slide-item figure img").css({"height":htmlHeight + "px"});
    } else {
      $("main section").css({ height: "" });
      //$("main .slide-wrap .slide-cont .slide-item figure img").css({"height":""});
    }
    //		$("main .video-wrap video").css({"height":htmlHeight + "px"});
    $("main .video-wrap").css({ top: "0" });
    //$("main .slide-wrap .slide-cont .slide-item").css({"height":htmlHeight+"px", "width":"auto"});

    videoH = htmlHeight;
    $("main .white-bg > div").eq(0).css({ transform: "translateY(-29.4%) scale(1.5, 1) rotate(17.8deg)" });
    $("main .white-bg > div").eq(1).css({ transform: "translateY(22.3%) scale(1.5, 1) rotate(17.6deg)" });
    var headerHeight = $("header").outerHeight();
    //		$("main .white-bg").css({"width":videoH + "px", "height":videoH + "px", "top":-headerHeight + "px", "transform":"translate(-50%, 0%)"});

    footerPosition();
    $("html, body").css({ overflow: "hidden", height: "100%" });
  } else {
    var videoH = viewportWidth() > 1920 ? viewportWidth() : 1920;
    $("main .white-bg > div").eq(0).css({ transform: "translateY(-20.5%) scale(1.2, 1.2) rotate(12deg)" });
    $("main .white-bg > div").eq(1).css({ transform: "translateY(25%) scale(1.2, 1.2) rotate(12deg)" });
    if (viewportWidth() < 769) {
      videoH = htmlHeight;
      $("main .white-bg > div").eq(0).css({ transform: "translateY(-29.4%) scale(1.5, 1) rotate(17.8deg)" });
      $("main .white-bg > div").eq(1).css({ transform: "translateY(22.3%) scale(1.5, 1) rotate(17.6deg)" });
    }

    if (viewportWidth() < 769) {
      var headerHeight = $("header").outerHeight();
      $("main .white-bg").css({ width: videoH + "px", height: videoH + "px", top: -headerHeight + "px", transform: "translate(-50%, 0%)" });
    } else {
      $("main .white-bg").css({ width: videoH + "px", height: videoH + "px", top: "", transform: "" });
    }

    $("main .slide-wrap .slide-cont .slide-item figure img").css({
      width: videoH + "px",
      height: videoH + "px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      position: "absolute",
    });
    /*if (viewportWidth() > 768)
		{
			$("main .slide-wrap .slide-cont .slide-item").css({"height":"100vh"});
		}else{
			var coverH = $("main .slide-wrap .slide-cont").outerHeight();
			$("main .slide-wrap .slide-cont .slide-item").css({"height":coverH + "px"});

		}*/
  }
}

var footerHeight = 0;
function footerPosition() {
  var footerHeight = $(".footer").outerHeight();
  $(".footer").css({ position: "absolute", bottom: -footerHeight + "px", "margin-top": "0" });
}

var scrollTop = 0;
function mainScroll() {
  scrollTop = $(window).scrollTop();
}

var logoPlay = false;
$(function () {
  $("main .video-wrap video").on("ended", function () {
    introMotion();
  });

  $("main .bgf-live .small-video video").on("ended", function () {
    $(this).css({ transition: "all 0.5s ease-out", transform: "scale(1) translate(0,0)" });

    if (!logoPlay) {
      logoPlay = true;

      setTimeout(endBGF, 400);
    }
  });

  $(document).on("touchend, click", "main .bgf-live .go-bgf-live", function () {
    console.log("BBB");
    document.location.href = "/bgflive/";
    return false;
  });

  $(document).on("touchend", "main .bgf-live .small-video video", function () {
    document.location.href = "/bgflive/";
  });

  $(document).on("click", "main .bgf-live .go-bgf-live", function () {
    document.location.href = "/bgflive/";
    return false;
  });

  $(document).on("click", "main .bgf-live .small-video video", function () {
    document.location.href = "/bgflive/";
  });
});

function videoPosition() {
  if (!$("main .bgf-live .go-bgf-live").length) {
    return;
  }

  if (viewportWidth() < 769) {
    var videoH = $("main .bgf-live .small-video video").outerHeight();
    //var videoTop = windowHeight - $("main .bgf-live .go-bgf-live").offset().top;
    var videoTop = parseFloat($("main .bgf-live").css("margin-top"));
    var center = (mainHeight - videoH) / 2 - videoTop;
    console.log(" center : " + center);
    if (!logoPlay) {
      $("main .bgf-live .small-video").css({ transform: "translate(0,0)" });
      $("main .bgf-live .small-video video").css({ transform: "translate(0," + center + "px)" });
      $("main .bgf-live .go-bgf-live .go-btn").css({ opacity: 0 });
    } else {
      $("main .bgf-live .small-video").css({ transform: "translate(0,0)" });
      $("main .bgf-live .small-video video").css({ transform: "translate(0,0)" });
      $("main .bgf-live .go-bgf-live .go-btn").css({ opacity: 1 });
    }
  } else {
    if (!logoPlay) {
      $("main .bgf-live .small-video video").css({ transform: "" });
      $("main .bgf-live .go-bgf-live .go-btn").css({ opacity: 0 });
    } else {
      $("main .bgf-live .small-video video").css({ transform: "scale(1.0)" });
      $("main .bgf-live .go-bgf-live .go-btn").css({ opacity: 1 });
    }
  }
}

function introPlay() {
  if (pageMode == "pc") {
    $("main .video-wrap video.pc_only").each(function () {
      if (this.paused) {
        this.play();
      }
    });
  } else {
    $("main .video-wrap video.m_only").each(function () {
      if (this.paused) {
        this.play();
      }
    });
  }
}

var kvTimer = 3000;
function introMotion() {
  console.log("introMotion()");
  $("main .video-wrap").css({ display: "none" });
  //$('main .video-wrap').css({"opacity":"0.5"});

  $("main .white-bg > div").eq(0).css({ transition: "all 3s", transform: "translateY(-100%)" });
  $("main .white-bg > div").eq(0).find("div").css({ transition: "all 2s", transform: "scale(1.2, 1) rotate(0deg)" });
  $("main .white-bg > div").eq(1).css({ transition: "all 3s", transform: "translateY(100%)" });
  $("main .white-bg > div").eq(1).find("div").css({ transition: "all 2s", transform: "scale(1.2, 1) rotate(0deg)" });

  setTimeout(function () {
    kvIndex = $("main .slide-wrap .slide-cont .slide-item").length;
    kvInterval = setInterval(kvRolling, kvTimer);
  }, 300);

  setTimeout(function () {
    $(".main-header").css({ display: "block", opacity: 0 }).animate({ opacity: 1 }, 500);
    $("main .group-list").css({ display: "block", opacity: 0 }).animate({ opacity: 1 }, 500);
  }, 700);

  setTimeout(function () {
    $("main .white-bg").css({ display: "none" });
    scrollReset();
  }, 3000);
}

var kvInterval;
var kvIndex = 0;
var showTimer;
function kvRolling() {
  kvIndex--;
  if (kvIndex == 0) {
    kvIndex = $("main .slide-wrap .slide-cont .slide-item").length - 1;
    if (check_device() != "") {
      $("main .slide-wrap .slide-cont .slide-item img").css({ transition: "none", opacity: 1, transform: "scale(1.0)" });
    } else {
      $("main .slide-wrap .slide-cont .slide-item img").css({ transition: "none", opacity: 1, transform: "translate(-50%, -50%) scale(1.0)" });
    }
    $("main .slide-wrap .slide-cont .slide-item .txt").css({ transition: "none", opacity: 1 });
  }

  setTimeout(function () {
    var carIdx = $("main .slide-wrap .slide-cont .slide-item").length - kvIndex;
    if (carIdx == $("main .slide-wrap .slide-cont .slide-item").length - 1) {
      carIdx = 0;
    }
    $("main .slide-wrap .slide-obj .carousel-wrap span").removeClass("active");
    $("main .slide-wrap .slide-obj .carousel-wrap span").eq(carIdx).addClass("active");
  }, 2000);

  showTimer = setTimeout(function () {
    if (check_device() != "") {
      $("main .slide-wrap .slide-cont .slide-item")
        .eq(kvIndex)
        .find("img")
        .css({ transition: "transform 2.0s 0.5s, opacity 1.5s 1s", transform: "scale(1.05)", opacity: 0 });
    } else {
      $("main .slide-wrap .slide-cont .slide-item")
        .eq(kvIndex)
        .find("img")
        .css({ transition: "transform 2.0s 0.5s, opacity 1.5s 1s", transform: "translate(-50%, -50%) scale(1.05)", opacity: 0 });
    }

    $("main .slide-wrap .slide-cont .slide-item").eq(kvIndex).find(".txt").css({ transition: "opacity 1.5s 1s", opacity: 0 });
  }, 10);
}

$(function () {
  $("main .bive-btn").click(function () {
    var movePage = 1;

    pageInteraction_Able = false;
    oldPageIndex = movePage;
    showPage(movePage);
  });

  $("main .bgf-live-bubble-wrap .bubble-list > .circle-cover").click(function () {
    document.location.href = $("main .bgf-live-bubble-wrap .bubble-list > div.active a").attr("href");
    return false;
  });
});

var colorArray = ["#00db4d", "#ffd334", "#7d86eb", "#46c0f1", "#ff803d"];
var sqArray;
function sqImage(idx) {
  $(".bgf-live-bubble-wrap .shape-list > div")
    .eq(idx)
    .animate({ opacity: "0" }, 1000, function () {
      var randImg = Math.floor(Math.random() * 5) + 1;
      $(".bgf-live-bubble-wrap .shape-list > div")
        .eq(idx)
        .find("img")
        .attr("src", "/assets/image/bgf/shape0" + randImg + ".svg");

      var moveX = Math.floor(Math.random() * 50) - 50;
      var moveY = Math.floor(Math.random() * 50) - 50;
      var scale = (Math.floor(Math.random() * 50) + 50) / 100;
      $(".bgf-live-bubble-wrap .shape-list > div")
        .eq(idx)
        .css({ transform: "translate(" + moveX + "px, " + moveY + "px) scale(" + scale + ")" });

      var holdTime = (Math.floor(Math.random() * 30) + 10) * 100;

      $(".bgf-live-bubble-wrap .shape-list > div").eq(idx).animate({ opacity: "1" }, 1000);
      //console.log("sqImage : "+ idx + ", holdTime : " + holdTime);
      setTimeout(function () {
        sqImage(idx);
      }, holdTime);
    });
}

var insightsIndex = 0;
var insightsInterval;
function insightsLoop() {
  var rndColor = Math.floor(Math.random() * 5);
  //$("main .bgf-live-bubble-wrap .bubble-list > .circle-cover").css({"transition":"opacity 300ms", "background-color":colorArray[rndColor],"opacity":1});
  //$("main .bgf-live-bubble-wrap .bubble-list").addClass("center-circle");

  setTimeout(function () {
    $("main .bgf-live-bubble-wrap .bubble-list > div").removeClass("hover");
    insightsIndex++;
    if (insightsIndex > 2) {
      insightsIndex = 0;
    }

    $("main .bgf-live-bubble-wrap .bubble-list > div").each(function () {
      if ($(this).hasClass("active")) {
        $(this).removeClass("active");
      }

      if ($(this).hasClass("medium")) {
        $(this).removeClass("medium");
      }

      if ($(this).hasClass("small")) {
        $(this).removeClass("small");
      }
    });

    switch (insightsIndex) {
      case 0: {
        $("main .bgf-live-bubble-wrap .bubble-list > div").eq(0).addClass("active");
        $("main .bgf-live-bubble-wrap .bubble-list > div").eq(1).addClass("medium");
        $("main .bgf-live-bubble-wrap .bubble-list > div").eq(2).addClass("small");
        break;
      }
      case 1: {
        $("main .bgf-live-bubble-wrap .bubble-list > div").eq(1).addClass("active");
        $("main .bgf-live-bubble-wrap .bubble-list > div").eq(2).addClass("medium");
        $("main .bgf-live-bubble-wrap .bubble-list > div").eq(0).addClass("small");
        break;
      }
      case 2: {
        $("main .bgf-live-bubble-wrap .bubble-list > div").eq(2).addClass("active");
        $("main .bgf-live-bubble-wrap .bubble-list > div").eq(0).addClass("medium");
        $("main .bgf-live-bubble-wrap .bubble-list > div").eq(1).addClass("small");
        break;
      }
    }
    //$("main .bgf-live-bubble-wrap .bubble-list").removeClass("center-circle");
    //$("main .bgf-live-bubble-wrap .bubble-list > .circle-cover").css({"transition":"opacity 400ms 300ms","opacity":0});
  }, 400);
}

$(function () {
  $("main .bgf-live-bubble-wrap .bubble-list > .circle-cover").hover(
    function () {
      $("main .bgf-live-bubble-wrap .bubble-list > div.active").addClass("hover");
    },
    function () {
      $("main .bgf-live-bubble-wrap .bubble-list > div.active").removeClass("hover");
    }
  );
});

if (check_device() == "") {
  if (window.addEventListener) window.addEventListener("DOMMouseScroll", wheel);
  window.onmousewheel = document.onmousewheel = wheel;
}

var oldPageIndex = 0;
var pageIndex = 0;
var fullDelta = 0;
var pageInteraction_Able = false;
var scrollIng = true;
var oldShowPage = 0;
var baseDelta = 1;
function wheel(event) {
  if (scrollIng) {
    return false;
  }
  var delta = 0;
  if (!event) event = window.event;
  if (event.wheelDelta) {
    delta = event.wheelDelta / 120;

    if (window.opera) delta = -delta;
  } else if (event.detail) delta = -event.detail / baseDelta;

  if (delta) {
    handle(delta);
  }
}

var skipMenu = false;
var skipIng = false;
function handle(delta) {
  if (pageInteraction_Able) {
    if (delta > 0) {
      delta = 1;
    } else {
      delta = -1;
    }

    fullDelta -= delta;
    if (fullDelta < 0) fullDelta = 0;

    if (fullDelta > baseDelta * 26) fullDelta = baseDelta * 26;

    fullDelta = Math.max(SHOW_PAGE_MIN, Math.min(SHOW_PAGE_MAX, fullDelta));
    pageIndex = parseInt(fullDelta / baseDelta);
    oldShowPage = fullDelta + delta;

    if (pageIndex != oldPageIndex) {
      pageInteraction_Able = false;
      oldPageIndex = pageIndex;
      showPage(pageIndex);
    }
  }
}

var SHOW_PAGE_MIN = 0;
var SHOW_PAGE_MAX = 2;

var delayTimeout;
var pageDelay = 1000;
function showPage(idx) {
  if ($("header .open-menu").is(".open")) {
    scrollReset();
    return;
  }

  console.log("showPage : " + idx);
  nowShowPage = idx;
  pageShowIndex = idx;

  var motionAble = false;
  switch (idx) {
    case 0: {
      pageDelay = 1500;
      $("main .main-kv").css({ transition: "margin-top " + pageDelay + "ms", "margin-top": "0px" });
      setTimeout(function () {
        $(".main-header").removeClass("white");
        bgfLive_Reset();
      }, pageDelay);
      break;
    }
    case 1: {
      if (oldShowPage == 0) {
        playBGF();
        motionAble = true;
      } else {
        pageDelay = 700;
        //$(".footer").css({"transition":"margin-top "+pageDelay+"ms", "margin-top":windowHeight + "px"});
        $(".footer").css({ transition: "transform " + pageDelay + "ms", transform: "translate(0,0)" });

        $("main").css({ transition: "top " + pageDelay + "ms", top: "" });
      }
      break;
    }
    case 2: {
      pageDelay = 700;
      var moveFooter = htmlHeight - $(".footer").outerHeight();
      //$(".footer").css({"transition":"margin-top "+pageDelay+"ms", "margin-top":moveFooter + "px"});
      var fHeight = $(".footer").outerHeight();
      $(".footer").css({ transition: "transform " + pageDelay + "ms", transform: "translate(0," + -fHeight + "px)" });

      $("main").css({ transition: "top " + pageDelay + "ms", top: -fHeight });
      break;
    }
  }

  if (!motionAble) {
    delayTimeout = setTimeout(function () {
      scrollIng = false;
      pageInteraction_Able = true;
    }, pageDelay + 300);
  }
  oldShowPage = idx;
}

function playBGF() {
  if (!page.language.match(/ko/)) {
    scrollReset();
    return;
  }

  //PLAY_BGF_SKIP
  var skip = null;
  if (window.cookie !== void 0) {
    skip = cookie.get("PLAY_BGF_SKIP");
  }

  pageInteraction_Able = false;

  if (skip) {
    $(".bgf-live").css({ opacity: 1 });
    $(".main-kv").css({ transition: "margin-top 1500ms", "margin-top": -windowHeight });
    $(".main-header").animate({ opacity: 0 }, 400);
    $("main .bgf-live .small-video video").css({ transform: "scale(1) translate(0, 0)" });

    logoPlay = true;

    endBGF();
  } else {
    $("main .green_cover").css({ display: "block", opacity: 1 });
    $(".main-header").animate({ opacity: 0 }, 400);
    setTimeout(function () {
      $("main .green_cover").css({ "z-index": 999 });
      if (check_device() != "") {
        $("main .green_cover").css({ transition: "transform 700ms, opacity 500ms 900ms", transform: "scale(100)", opacity: 0 });
      } else {
        $("main .green_cover").css({ transition: "transform 700ms, opacity 500ms 900ms", transform: "scale(70)", opacity: 0 });
      }
    }, 100);

    setTimeout(function () {
      $(".bgf-live").css({ opacity: 1 });
      $(".main-kv").css({ "margin-top": -windowHeight + "px" });
      $("main .bgf-live .small-video video").each(function () {
        this.currentTime = 0;
        this.loop = false;
        if (this.paused) {
          this.play();

          var holdTime = new Array();

          holdTime[0] = Math.floor(Math.random() * 100) * 10;
          holdTime[1] = Math.floor(Math.random() * 100) * 10;
          holdTime[2] = Math.floor(Math.random() * 100) * 10;
          holdTime[3] = Math.floor(Math.random() * 100) * 10;
          holdTime[4] = Math.floor(Math.random() * 100) * 10;

          setTimeout(function () {
            sqImage(0);
          }, holdTime[0]);
          setTimeout(function () {
            sqImage(1);
          }, holdTime[1]);
          setTimeout(function () {
            sqImage(2);
          }, holdTime[2]);
          setTimeout(function () {
            sqImage(3);
          }, holdTime[3]);
          setTimeout(function () {
            sqImage(4);
          }, holdTime[4]);
          oldShowPage = 1;
        }
      });

      setTimeout(function () {
        $("main .green_cover").css({ display: "none", opacity: 0 });
      }, 700);
    }, 800);

    if (window.cookie !== void 0) {
      cookie.setToday("PLAY_BGF_SKIP", 1);
    }
  }
}

function endBGF() {
  $("header").addClass("white");
  $(".main-header").animate({ opacity: 1 }, 400);

  $("main .bgf-live .go-bgf-live .go-btn").animate({ opacity: 1 }, 500);
  $("main .bgf-live-bubble-wrap").css({ display: "block", opacity: 0 }).animate({ opacity: 1 }, 500);

  if (insightsInterval !== null) {
    clearInterval(insightsInterval);
  }
  insightsInterval = setInterval(insightsLoop, 5000);
  $("main .bgf-live .small-video video").each(function () {
    this.loop = true;
    this.play();
  });

  setTimeout(scrollReset, 100);
}

function scrollReset() {
  scrollIng = false;
  pageInteraction_Able = true;
}

function mainSwipe() {
  $("main").swipe({
    swipeStatus: function (event, phase, direction, distance, duration, fingerCount, fingerData) {
      if (!pageInteraction_Able) {
        return false;
      }
    },
    swipe: function (event, phase, direction, distance, duration, fingerCount, fingerData) {
      if ((phase == "down" || phase == "up") && distance > 10) {
        var slideIndex = oldShowPage;
        if (phase == "up") {
          slideIndex++;
        } else if (phase == "down") {
          slideIndex--;
        }

        if (slideIndex > 2) {
          slideIndex = 2;
        }

        if (slideIndex < 0) {
          slideIndex = 0;
        }

        if (slideIndex != oldShowPage) {
          pageInteraction_Able = false;
          var motionAble = false;
          switch (slideIndex) {
            case 0: {
              pageDelay = 1500;
              $("main .main-kv").css({ transition: "margin-top " + pageDelay + "ms", "margin-top": "0px" });
              setTimeout(function () {
                $(".main-header").removeClass("white");
                bgfLive_Reset();
              }, pageDelay);
              break;
            }
            case 1: {
              if (oldShowPage == 0) {
                playBGF();
                motionAble = true;
              } else {
                pageDelay = 700;
                //$(".footer").css({"transition":"margin-top "+pageDelay+"ms", "margin-top":windowHeight + "px"});
                $(".footer").css({ transition: "transform " + pageDelay + "ms", transform: "translate(0,0)" });
              }
              break;
            }
            case 2: {
              pageDelay = 700;
              var moveFooter = htmlHeight - $(".footer").outerHeight();

              //$(".footer").css({"transition":"margin-top "+pageDelay+"ms", "margin-top":moveFooter + "px"});
              var fHeight = $(".footer").outerHeight();
              $(".footer").css({ transition: "transform " + pageDelay + "ms", transform: "translate(0," + -fHeight + "px)" });
              break;
            }
          }

          if (!motionAble) {
            delayTimeout = setTimeout(function () {
              scrollIng = false;
              pageInteraction_Able = true;
            }, pageDelay + 300);
          }
          oldShowPage = slideIndex;
        }
      }
    },
  });
}

function bgfLive_Reset() {
  $("main .green_cover").css({ display: "", opacity: "", transition: "none", transform: "" });
  $("main .bgf-live .small-video video").css({ transition: "none", transform: "" });
  $("main .bgf-live .small-video video").each(function () {
    this.currentTime = 0;
    this.loop = false;
    this.pause();
  });
  logoPlay = false;
  videoPosition();
  $("main .bgf-live .go-bgf-live .go-btn").css({ opacity: 0 });
  $("main .bgf-live-bubble-wrap").css({ display: "none", opacity: 0 });
  $("main .main-kv").css({ transition: "" });
}

function check_device() {
  var mobileKeyWords = new Array(
    "iPhone",
    "iPad",
    "Macintosh",
    "iPod",
    "BlackBerry",
    "Android",
    "Windows CE",
    "LG",
    "MOT",
    "SAMSUNG",
    "SonyEricsson"
  ); //160625 device 紐⑸줉�� ipad 異붽�
  var device_name = "";
  for (var word in mobileKeyWords) {
    if (typeof mobileKeyWords[word] === "string") {
      if (navigator.userAgent.match(mobileKeyWords[word]) != null) {
        if (mobileKeyWords[word] === "Macintosh") {
          if (navigator.maxTouchPoints === 0) {
            break;
          }
        }
        device_name = mobileKeyWords[word];
        break;
      }
    }
  }

  return device_name;

  //	if(window.orientation == 0){ // portrait
  //		orientationChk = 'portrait';
  //		if(viewportWidth() < 560)
  //			return device_name;
  //		else
  //			return '';
  //	}else { // landscape
  //		orientationChk = 'landscape';
  //
  //		if(viewportWidth() < 966)
  //			return device_name;
  //		else
  //			return '';
  //	}
}
