!(function () {
  var contents = document.querySelector(".contents");
  if (contents === null) {
    return;
  }

  contents.video = contents.querySelector(".small_video video");
  contents.videoImage = contents.querySelector(".small_video img");
  contents.loadEvent = function () {
    if (loading !== null) {
      loading.style.display = "none";
      loading.classList.remove("start");
    }

    if (contents.video !== null) {
      contents.video.play();
    }

    if (window.cookie !== void 0) {
      var skip = cookie.get("BGF_LIVE_INTRO_SKIP");
      if (skip === null) {
        cookie.setToday("BGF_LIVE_INTRO_SKIP", 1);
      }
    }
  };

  // Loading
  var loading = document.querySelector(".logo_video");
  if (loading === null) {
    contents.loadEvent();
    return;
  }

  if (window.cookie !== void 0) {
    var skip = cookie.get("BGF_LIVE_INTRO_SKIP");
    if (skip !== null) {
      contents.loadEvent();
      history.pushState(null, null, location.pathname);
      return;
    }
  }

  loading.cover = loading.querySelector(".big_video.green_cover");
  loading.video = loading.querySelector(".big_video video");
  loading.video.image = loading.querySelector(".big_video:nth-child(2) img");
  loading.video.addEventListener("ended", function () {
    loading.classList.add("start");
    loading.timeoutId = setTimeout(function () {
      document.documentElement.style.position = "";
      document.documentElement.style.top = "";
      document.documentElement.style.width = "";

      loading.timeoutId = setTimeout(function () {
        contents.loadEvent();
        delete loading.timeoutId;
      }, 1000);
    }, 500);
  });

  loading.skip = function () {
    if (loading.skipped !== void 0) {
      return;
    }

    loading.skipped = true;

    if (loading.cover.timeoutId !== void 0) {
      clearTimeout(loading.cover.timeoutId);
      delete loading.cover.timeoutId;
    }

    loading.cover.style.transition = "opacity 500ms";
    loading.cover.style.opacity = "0";

    loading.video.style.transition = "opacity 500ms";
    loading.video.style.opacity = "0";

    if (loading.timeoutId !== void 0) {
      clearTimeout(loading.timeoutId);
      delete loading.timeoutId;
    }

    loading.timeoutId = setTimeout(function () {
      loading.style.transition = "opacity 500ms";
      loading.style.opacity = "0";

      loading.timeoutId = setTimeout(function () {
        document.documentElement.style.position = "";
        document.documentElement.style.top = "";
        document.documentElement.style.width = "";

        loading.style.transition = "";
        loading.style.opacity = "";

        contents.loadEvent();
        delete loading.timeoutId;
      }, 500);
    }, 500);
  };
  loading.addEventListener("click", loading.skip);

  document.documentElement.style.position = "fixed";
  document.documentElement.style.top = "0";
  document.documentElement.style.width = "100%";

  loading.cover.style.transition = "opacity 500ms";
  loading.cover.style.opacity = 0;
  loading.cover.timeoutId = setTimeout(function () {
    loading.cover.style.display = "none";
    loading.cover.style.transition = "";
    loading.cover.style.opacity = "";

    delete loading.cover.timeoutId;

    loading.video.play();
  }, 500);
})();
