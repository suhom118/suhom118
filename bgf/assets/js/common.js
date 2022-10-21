// UserAgent
!(function () {
  "use strict";
  if (void 0 === document.documentElement.classList) {
    var s = document.documentElement,
      t = function () {
        s.className = s.classList.join(" ");
      },
      i = function (t) {
        return s.classList.indexOf(t) > -1;
      };
    (s.classList = s.className.split(" ").filter(function (s) {
      return "" !== s;
    })),
      (s.classList.add = function (n) {
        "" === n || i(n) || (s.classList.push(n), t());
      }),
      (s.classList.remove = function (n) {
        "" !== n && i(n) && (s.classList.splice(s.classList.indexOf(n), 1), t());
      });
  }
  window.userAgent = new (function () {
    var s = navigator.userAgent.toLowerCase(),
      t = [],
      i = [],
      n = [];
    for (var e in (s.match(/chrome|safari/) && t.push(s.match(/chrome/) ? "Chrome" : "Safari"),
    s.match(/msie|rv:11/) && (t.push("IE"), s.match(/msie (\d+)/) && t.push("IE" + s.match(/msie (\d+)/)[1]), s.match(/rv:11/) && t.push("IE11")),
    s.match(/edg|edge|edgA/) && t.push("Edge"),
    s.match(/firefox/) && t.push("Firefox"),
    t.length || t.push("Unknown-Browser"),
    s.match(/windows nt/) && i.push("Windows"),
    s.match(/mac os/) &&
      (s.match(/like mac os/) ? (s.match(/iphone/) && i.push("iPhone"), s.match(/ipad/) && i.push("iPad"), i.push("iOS")) : i.push("MacOS")),
    s.match(/cros/) && i.push("ChromeOS"),
    s.match(/android/) && i.push("Android"),
    s.match(/mobile/) && i.push("Device"),
    i.length || i.push("Unknown-Device"),
    t))
      t[e] !== t.constructor.prototype[e] && n.push(t[e].toLowerCase());
    for (var e in i) i[e] !== i.constructor.prototype[e] && n.push(i[e].toLowerCase());
    return (
      n.forEach(function (s) {
        document.documentElement.classList.add(s);
      }),
      (this.is = function (s) {
        return n.indexOf(s.toLowerCase()) > -1;
      }),
      (this.or = function (s) {
        var t = !1;
        return "string" == typeof s
          ? this.is(s)
          : (s.some(
              function (s) {
                return this.is(s) && (t = !0), t;
              }.bind(this)
            ),
            t);
      }),
      (this.and = function (s) {
        var t = !0;
        return "string" == typeof s
          ? this.is(s)
          : (s.some(
              function (s) {
                return !(t = t && this.is(s));
              }.bind(this)
            ),
            t);
      }),
      this
    );
  })();
})();

!(function () {
  if (userAgent.is("ie")) {
    window.location = "microsoft-edge:" + window.location;
    setTimeout(function () {
      window.location = "https://support.microsoft.com/office/160fa918-d581-4932-9e4e-1075c4713595";
    }, 1);
  }

  if (userAgent.and(["ios", "safari"])) {
    document.documentElement.addEventListener("click", new Function());
  }
})();

/*!
 * @fileOverview TouchSwipe - jQuery Plugin
 * @version 1.6.18
 *
 * @author Matt Bryson http://www.github.com/mattbryson
 * @see https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
 * @see http://labs.rampinteractive.co.uk/touchSwipe/
 * @see http://plugins.jquery.com/project/touchSwipe
 * @license
 * Copyright (c) 2010-2015 Matt Bryson
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 */

!(function (factory) {
  "function" == typeof define && define.amd && define.amd.jQuery
    ? define(["jquery"], factory)
    : factory("undefined" != typeof module && module.exports ? require("jquery") : jQuery);
})(function ($) {
  "use strict";
  function init(options) {
    return (
      !options ||
        void 0 !== options.allowPageScroll ||
        (void 0 === options.swipe && void 0 === options.swipeStatus) ||
        (options.allowPageScroll = NONE),
      void 0 !== options.click && void 0 === options.tap && (options.tap = options.click),
      options || (options = {}),
      (options = $.extend({}, $.fn.swipe.defaults, options)),
      this.each(function () {
        var $this = $(this),
          plugin = $this.data(PLUGIN_NS);
        plugin || ((plugin = new TouchSwipe(this, options)), $this.data(PLUGIN_NS, plugin));
      })
    );
  }
  function TouchSwipe(element, options) {
    function touchStart(jqEvent) {
      if (!(getTouchInProgress() || $(jqEvent.target).closest(options.excludedElements, $element).length > 0)) {
        var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;
        if (!event.pointerType || "mouse" != event.pointerType || 0 != options.fallbackToMouseEvents) {
          var ret,
            touches = event.touches,
            evt = touches ? touches[0] : event;
          return (
            (phase = PHASE_START),
            touches ? (fingerCount = touches.length) : options.preventDefaultEvents !== !1 && jqEvent.preventDefault(),
            (distance = 0),
            (direction = null),
            (currentDirection = null),
            (pinchDirection = null),
            (duration = 0),
            (startTouchesDistance = 0),
            (endTouchesDistance = 0),
            (pinchZoom = 1),
            (pinchDistance = 0),
            (maximumsMap = createMaximumsData()),
            cancelMultiFingerRelease(),
            createFingerData(0, evt),
            !touches || fingerCount === options.fingers || options.fingers === ALL_FINGERS || hasPinches()
              ? ((startTime = getTimeStamp()),
                2 == fingerCount &&
                  (createFingerData(1, touches[1]),
                  (startTouchesDistance = endTouchesDistance = calculateTouchesDistance(fingerData[0].start, fingerData[1].start))),
                (options.swipeStatus || options.pinchStatus) && (ret = triggerHandler(event, phase)))
              : (ret = !1),
            ret === !1
              ? ((phase = PHASE_CANCEL), triggerHandler(event, phase), ret)
              : (options.hold &&
                  (holdTimeout = setTimeout(
                    $.proxy(function () {
                      $element.trigger("hold", [event.target]), options.hold && (ret = options.hold.call($element, event, event.target));
                    }, this),
                    options.longTapThreshold
                  )),
                setTouchInProgress(!0),
                null)
          );
        }
      }
    }
    function touchMove(jqEvent) {
      var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;
      if (phase !== PHASE_END && phase !== PHASE_CANCEL && !inMultiFingerRelease()) {
        var ret,
          touches = event.touches,
          evt = touches ? touches[0] : event,
          currentFinger = updateFingerData(evt);
        if (
          ((endTime = getTimeStamp()),
          touches && (fingerCount = touches.length),
          options.hold && clearTimeout(holdTimeout),
          (phase = PHASE_MOVE),
          2 == fingerCount &&
            (0 == startTouchesDistance
              ? (createFingerData(1, touches[1]),
                (startTouchesDistance = endTouchesDistance = calculateTouchesDistance(fingerData[0].start, fingerData[1].start)))
              : (updateFingerData(touches[1]),
                (endTouchesDistance = calculateTouchesDistance(fingerData[0].end, fingerData[1].end)),
                (pinchDirection = calculatePinchDirection(fingerData[0].end, fingerData[1].end))),
            (pinchZoom = calculatePinchZoom(startTouchesDistance, endTouchesDistance)),
            (pinchDistance = Math.abs(startTouchesDistance - endTouchesDistance))),
          fingerCount === options.fingers || options.fingers === ALL_FINGERS || !touches || hasPinches())
        ) {
          if (
            ((direction = calculateDirection(currentFinger.start, currentFinger.end)),
            (currentDirection = calculateDirection(currentFinger.last, currentFinger.end)),
            validateDefaultEvent(jqEvent, currentDirection),
            (distance = calculateDistance(currentFinger.start, currentFinger.end)),
            (duration = calculateDuration()),
            setMaxDistance(direction, distance),
            (ret = triggerHandler(event, phase)),
            !options.triggerOnTouchEnd || options.triggerOnTouchLeave)
          ) {
            var inBounds = !0;
            if (options.triggerOnTouchLeave) {
              var bounds = getbounds(this);
              inBounds = isInBounds(currentFinger.end, bounds);
            }
            !options.triggerOnTouchEnd && inBounds
              ? (phase = getNextPhase(PHASE_MOVE))
              : options.triggerOnTouchLeave && !inBounds && (phase = getNextPhase(PHASE_END)),
              (phase != PHASE_CANCEL && phase != PHASE_END) || triggerHandler(event, phase);
          }
        } else (phase = PHASE_CANCEL), triggerHandler(event, phase);
        ret === !1 && ((phase = PHASE_CANCEL), triggerHandler(event, phase));
      }
    }
    function touchEnd(jqEvent) {
      var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent,
        touches = event.touches;
      if (touches) {
        if (touches.length && !inMultiFingerRelease()) return startMultiFingerRelease(event), !0;
        if (touches.length && inMultiFingerRelease()) return !0;
      }
      return (
        inMultiFingerRelease() && (fingerCount = fingerCountAtRelease),
        (endTime = getTimeStamp()),
        (duration = calculateDuration()),
        didSwipeBackToCancel() || !validateSwipeDistance()
          ? ((phase = PHASE_CANCEL), triggerHandler(event, phase))
          : options.triggerOnTouchEnd || (options.triggerOnTouchEnd === !1 && phase === PHASE_MOVE)
          ? (options.preventDefaultEvents !== !1 && jqEvent.preventDefault(), (phase = PHASE_END), triggerHandler(event, phase))
          : !options.triggerOnTouchEnd && hasTap()
          ? ((phase = PHASE_END), triggerHandlerForGesture(event, phase, TAP))
          : phase === PHASE_MOVE && ((phase = PHASE_CANCEL), triggerHandler(event, phase)),
        setTouchInProgress(!1),
        null
      );
    }
    function touchCancel() {
      (fingerCount = 0),
        (endTime = 0),
        (startTime = 0),
        (startTouchesDistance = 0),
        (endTouchesDistance = 0),
        (pinchZoom = 1),
        cancelMultiFingerRelease(),
        setTouchInProgress(!1);
    }
    function touchLeave(jqEvent) {
      var event = jqEvent.originalEvent ? jqEvent.originalEvent : jqEvent;
      options.triggerOnTouchLeave && ((phase = getNextPhase(PHASE_END)), triggerHandler(event, phase));
    }
    function removeListeners() {
      $element.unbind(START_EV, touchStart),
        $element.unbind(CANCEL_EV, touchCancel),
        $element.unbind(MOVE_EV, touchMove),
        $element.unbind(END_EV, touchEnd),
        LEAVE_EV && $element.unbind(LEAVE_EV, touchLeave),
        setTouchInProgress(!1);
    }
    function getNextPhase(currentPhase) {
      var nextPhase = currentPhase,
        validTime = validateSwipeTime(),
        validDistance = validateSwipeDistance(),
        didCancel = didSwipeBackToCancel();
      return (
        !validTime || didCancel
          ? (nextPhase = PHASE_CANCEL)
          : !validDistance || currentPhase != PHASE_MOVE || (options.triggerOnTouchEnd && !options.triggerOnTouchLeave)
          ? !validDistance && currentPhase == PHASE_END && options.triggerOnTouchLeave && (nextPhase = PHASE_CANCEL)
          : (nextPhase = PHASE_END),
        nextPhase
      );
    }
    function triggerHandler(event, phase) {
      var ret,
        touches = event.touches;
      return (
        (didSwipe() || hasSwipes()) && (ret = triggerHandlerForGesture(event, phase, SWIPE)),
        (didPinch() || hasPinches()) && ret !== !1 && (ret = triggerHandlerForGesture(event, phase, PINCH)),
        didDoubleTap() && ret !== !1
          ? (ret = triggerHandlerForGesture(event, phase, DOUBLE_TAP))
          : didLongTap() && ret !== !1
          ? (ret = triggerHandlerForGesture(event, phase, LONG_TAP))
          : didTap() && ret !== !1 && (ret = triggerHandlerForGesture(event, phase, TAP)),
        phase === PHASE_CANCEL && touchCancel(event),
        phase === PHASE_END && (touches ? touches.length || touchCancel(event) : touchCancel(event)),
        ret
      );
    }
    function triggerHandlerForGesture(event, phase, gesture) {
      var ret;
      if (gesture == SWIPE) {
        if (
          ($element.trigger("swipeStatus", [phase, direction || null, distance || 0, duration || 0, fingerCount, fingerData, currentDirection]),
          options.swipeStatus &&
            ((ret = options.swipeStatus.call(
              $element,
              event,
              phase,
              direction || null,
              distance || 0,
              duration || 0,
              fingerCount,
              fingerData,
              currentDirection
            )),
            ret === !1))
        )
          return !1;
        if (phase == PHASE_END && validateSwipe()) {
          if (
            (clearTimeout(singleTapTimeout),
            clearTimeout(holdTimeout),
            $element.trigger("swipe", [direction, distance, duration, fingerCount, fingerData, currentDirection]),
            options.swipe &&
              ((ret = options.swipe.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection)), ret === !1))
          )
            return !1;
          switch (direction) {
            case LEFT:
              $element.trigger("swipeLeft", [direction, distance, duration, fingerCount, fingerData, currentDirection]),
                options.swipeLeft &&
                  (ret = options.swipeLeft.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection));
              break;
            case RIGHT:
              $element.trigger("swipeRight", [direction, distance, duration, fingerCount, fingerData, currentDirection]),
                options.swipeRight &&
                  (ret = options.swipeRight.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection));
              break;
            case UP:
              $element.trigger("swipeUp", [direction, distance, duration, fingerCount, fingerData, currentDirection]),
                options.swipeUp &&
                  (ret = options.swipeUp.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection));
              break;
            case DOWN:
              $element.trigger("swipeDown", [direction, distance, duration, fingerCount, fingerData, currentDirection]),
                options.swipeDown &&
                  (ret = options.swipeDown.call($element, event, direction, distance, duration, fingerCount, fingerData, currentDirection));
          }
        }
      }
      if (gesture == PINCH) {
        if (
          ($element.trigger("pinchStatus", [phase, pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData]),
          options.pinchStatus &&
            ((ret = options.pinchStatus.call(
              $element,
              event,
              phase,
              pinchDirection || null,
              pinchDistance || 0,
              duration || 0,
              fingerCount,
              pinchZoom,
              fingerData
            )),
            ret === !1))
        )
          return !1;
        if (phase == PHASE_END && validatePinch())
          switch (pinchDirection) {
            case IN:
              $element.trigger("pinchIn", [pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData]),
                options.pinchIn &&
                  (ret = options.pinchIn.call(
                    $element,
                    event,
                    pinchDirection || null,
                    pinchDistance || 0,
                    duration || 0,
                    fingerCount,
                    pinchZoom,
                    fingerData
                  ));
              break;
            case OUT:
              $element.trigger("pinchOut", [pinchDirection || null, pinchDistance || 0, duration || 0, fingerCount, pinchZoom, fingerData]),
                options.pinchOut &&
                  (ret = options.pinchOut.call(
                    $element,
                    event,
                    pinchDirection || null,
                    pinchDistance || 0,
                    duration || 0,
                    fingerCount,
                    pinchZoom,
                    fingerData
                  ));
          }
      }
      return (
        gesture == TAP
          ? (phase !== PHASE_CANCEL && phase !== PHASE_END) ||
            (clearTimeout(singleTapTimeout),
            clearTimeout(holdTimeout),
            hasDoubleTap() && !inDoubleTap()
              ? ((doubleTapStartTime = getTimeStamp()),
                (singleTapTimeout = setTimeout(
                  $.proxy(function () {
                    (doubleTapStartTime = null),
                      $element.trigger("tap", [event.target]),
                      options.tap && (ret = options.tap.call($element, event, event.target));
                  }, this),
                  options.doubleTapThreshold
                )))
              : ((doubleTapStartTime = null),
                $element.trigger("tap", [event.target]),
                options.tap && (ret = options.tap.call($element, event, event.target))))
          : gesture == DOUBLE_TAP
          ? (phase !== PHASE_CANCEL && phase !== PHASE_END) ||
            (clearTimeout(singleTapTimeout),
            clearTimeout(holdTimeout),
            (doubleTapStartTime = null),
            $element.trigger("doubletap", [event.target]),
            options.doubleTap && (ret = options.doubleTap.call($element, event, event.target)))
          : gesture == LONG_TAP &&
            ((phase !== PHASE_CANCEL && phase !== PHASE_END) ||
              (clearTimeout(singleTapTimeout),
              (doubleTapStartTime = null),
              $element.trigger("longtap", [event.target]),
              options.longTap && (ret = options.longTap.call($element, event, event.target)))),
        ret
      );
    }
    function validateSwipeDistance() {
      var valid = !0;
      return null !== options.threshold && (valid = distance >= options.threshold), valid;
    }
    function didSwipeBackToCancel() {
      var cancelled = !1;
      return (
        null !== options.cancelThreshold && null !== direction && (cancelled = getMaxDistance(direction) - distance >= options.cancelThreshold),
        cancelled
      );
    }
    function validatePinchDistance() {
      return null === options.pinchThreshold || pinchDistance >= options.pinchThreshold;
    }
    function validateSwipeTime() {
      var result;
      return (result = !options.maxTimeThreshold || !(duration >= options.maxTimeThreshold));
    }
    function validateDefaultEvent(jqEvent, direction) {
      if (options.preventDefaultEvents !== !1)
        if (options.allowPageScroll === NONE) jqEvent.preventDefault();
        else {
          var auto = options.allowPageScroll === AUTO;
          switch (direction) {
            case LEFT:
              ((options.swipeLeft && auto) || (!auto && options.allowPageScroll != HORIZONTAL)) && jqEvent.preventDefault();
              break;
            case RIGHT:
              ((options.swipeRight && auto) || (!auto && options.allowPageScroll != HORIZONTAL)) && jqEvent.preventDefault();
              break;
            case UP:
              ((options.swipeUp && auto) || (!auto && options.allowPageScroll != VERTICAL)) && jqEvent.preventDefault();
              break;
            case DOWN:
              ((options.swipeDown && auto) || (!auto && options.allowPageScroll != VERTICAL)) && jqEvent.preventDefault();
              break;
            case NONE:
          }
        }
    }
    function validatePinch() {
      var hasCorrectFingerCount = validateFingers(),
        hasEndPoint = validateEndPoint(),
        hasCorrectDistance = validatePinchDistance();
      return hasCorrectFingerCount && hasEndPoint && hasCorrectDistance;
    }
    function hasPinches() {
      return !!(options.pinchStatus || options.pinchIn || options.pinchOut);
    }
    function didPinch() {
      return !(!validatePinch() || !hasPinches());
    }
    function validateSwipe() {
      var hasValidTime = validateSwipeTime(),
        hasValidDistance = validateSwipeDistance(),
        hasCorrectFingerCount = validateFingers(),
        hasEndPoint = validateEndPoint(),
        didCancel = didSwipeBackToCancel(),
        valid = !didCancel && hasEndPoint && hasCorrectFingerCount && hasValidDistance && hasValidTime;
      return valid;
    }
    function hasSwipes() {
      return !!(options.swipe || options.swipeStatus || options.swipeLeft || options.swipeRight || options.swipeUp || options.swipeDown);
    }
    function didSwipe() {
      return !(!validateSwipe() || !hasSwipes());
    }
    function validateFingers() {
      return fingerCount === options.fingers || options.fingers === ALL_FINGERS || !SUPPORTS_TOUCH;
    }
    function validateEndPoint() {
      return 0 !== fingerData[0].end.x;
    }
    function hasTap() {
      return !!options.tap;
    }
    function hasDoubleTap() {
      return !!options.doubleTap;
    }
    function hasLongTap() {
      return !!options.longTap;
    }
    function validateDoubleTap() {
      if (null == doubleTapStartTime) return !1;
      var now = getTimeStamp();
      return hasDoubleTap() && now - doubleTapStartTime <= options.doubleTapThreshold;
    }
    function inDoubleTap() {
      return validateDoubleTap();
    }
    function validateTap() {
      return (1 === fingerCount || !SUPPORTS_TOUCH) && (isNaN(distance) || distance < options.threshold);
    }
    function validateLongTap() {
      return duration > options.longTapThreshold && distance < DOUBLE_TAP_THRESHOLD;
    }
    function didTap() {
      return !(!validateTap() || !hasTap());
    }
    function didDoubleTap() {
      return !(!validateDoubleTap() || !hasDoubleTap());
    }
    function didLongTap() {
      return !(!validateLongTap() || !hasLongTap());
    }
    function startMultiFingerRelease(event) {
      (previousTouchEndTime = getTimeStamp()), (fingerCountAtRelease = event.touches.length + 1);
    }
    function cancelMultiFingerRelease() {
      (previousTouchEndTime = 0), (fingerCountAtRelease = 0);
    }
    function inMultiFingerRelease() {
      var withinThreshold = !1;
      if (previousTouchEndTime) {
        var diff = getTimeStamp() - previousTouchEndTime;
        diff <= options.fingerReleaseThreshold && (withinThreshold = !0);
      }
      return withinThreshold;
    }
    function getTouchInProgress() {
      return !($element.data(PLUGIN_NS + "_intouch") !== !0);
    }
    function setTouchInProgress(val) {
      $element &&
        (val === !0
          ? ($element.bind(MOVE_EV, touchMove), $element.bind(END_EV, touchEnd), LEAVE_EV && $element.bind(LEAVE_EV, touchLeave))
          : ($element.unbind(MOVE_EV, touchMove, !1), $element.unbind(END_EV, touchEnd, !1), LEAVE_EV && $element.unbind(LEAVE_EV, touchLeave, !1)),
        $element.data(PLUGIN_NS + "_intouch", val === !0));
    }
    function createFingerData(id, evt) {
      var f = { start: { x: 0, y: 0 }, last: { x: 0, y: 0 }, end: { x: 0, y: 0 } };
      return (
        (f.start.x = f.last.x = f.end.x = evt.pageX || evt.clientX),
        (f.start.y = f.last.y = f.end.y = evt.pageY || evt.clientY),
        (fingerData[id] = f),
        f
      );
    }
    function updateFingerData(evt) {
      var id = void 0 !== evt.identifier ? evt.identifier : 0,
        f = getFingerData(id);
      return (
        null === f && (f = createFingerData(id, evt)),
        (f.last.x = f.end.x),
        (f.last.y = f.end.y),
        (f.end.x = evt.pageX || evt.clientX),
        (f.end.y = evt.pageY || evt.clientY),
        f
      );
    }
    function getFingerData(id) {
      return fingerData[id] || null;
    }
    function setMaxDistance(direction, distance) {
      direction != NONE && ((distance = Math.max(distance, getMaxDistance(direction))), (maximumsMap[direction].distance = distance));
    }
    function getMaxDistance(direction) {
      if (maximumsMap[direction]) return maximumsMap[direction].distance;
    }
    function createMaximumsData() {
      var maxData = {};
      return (
        (maxData[LEFT] = createMaximumVO(LEFT)),
        (maxData[RIGHT] = createMaximumVO(RIGHT)),
        (maxData[UP] = createMaximumVO(UP)),
        (maxData[DOWN] = createMaximumVO(DOWN)),
        maxData
      );
    }
    function createMaximumVO(dir) {
      return { direction: dir, distance: 0 };
    }
    function calculateDuration() {
      return endTime - startTime;
    }
    function calculateTouchesDistance(startPoint, endPoint) {
      var diffX = Math.abs(startPoint.x - endPoint.x),
        diffY = Math.abs(startPoint.y - endPoint.y);
      return Math.round(Math.sqrt(diffX * diffX + diffY * diffY));
    }
    function calculatePinchZoom(startDistance, endDistance) {
      var percent = (endDistance / startDistance) * 1;
      return percent.toFixed(2);
    }
    function calculatePinchDirection() {
      return pinchZoom < 1 ? OUT : IN;
    }
    function calculateDistance(startPoint, endPoint) {
      return Math.round(Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2)));
    }
    function calculateAngle(startPoint, endPoint) {
      var x = startPoint.x - endPoint.x,
        y = endPoint.y - startPoint.y,
        r = Math.atan2(y, x),
        angle = Math.round((180 * r) / Math.PI);
      return angle < 0 && (angle = 360 - Math.abs(angle)), angle;
    }
    function calculateDirection(startPoint, endPoint) {
      if (comparePoints(startPoint, endPoint)) return NONE;
      var angle = calculateAngle(startPoint, endPoint);
      return angle <= 45 && angle >= 0
        ? LEFT
        : angle <= 360 && angle >= 315
        ? LEFT
        : angle >= 135 && angle <= 225
        ? RIGHT
        : angle > 45 && angle < 135
        ? DOWN
        : UP;
    }
    function getTimeStamp() {
      var now = new Date();
      return now.getTime();
    }
    function getbounds(el) {
      el = $(el);
      var offset = el.offset(),
        bounds = { left: offset.left, right: offset.left + el.outerWidth(), top: offset.top, bottom: offset.top + el.outerHeight() };
      return bounds;
    }
    function isInBounds(point, bounds) {
      return point.x > bounds.left && point.x < bounds.right && point.y > bounds.top && point.y < bounds.bottom;
    }
    function comparePoints(pointA, pointB) {
      return pointA.x == pointB.x && pointA.y == pointB.y;
    }
    var options = $.extend({}, options),
      useTouchEvents = SUPPORTS_TOUCH || SUPPORTS_POINTER || !options.fallbackToMouseEvents,
      START_EV = useTouchEvents ? (SUPPORTS_POINTER ? (SUPPORTS_POINTER_IE10 ? "MSPointerDown" : "pointerdown") : "touchstart") : "mousedown",
      MOVE_EV = useTouchEvents ? (SUPPORTS_POINTER ? (SUPPORTS_POINTER_IE10 ? "MSPointerMove" : "pointermove") : "touchmove") : "mousemove",
      END_EV = useTouchEvents ? (SUPPORTS_POINTER ? (SUPPORTS_POINTER_IE10 ? "MSPointerUp" : "pointerup") : "touchend") : "mouseup",
      LEAVE_EV = useTouchEvents ? (SUPPORTS_POINTER ? "mouseleave" : null) : "mouseleave",
      CANCEL_EV = SUPPORTS_POINTER ? (SUPPORTS_POINTER_IE10 ? "MSPointerCancel" : "pointercancel") : "touchcancel",
      distance = 0,
      direction = null,
      currentDirection = null,
      duration = 0,
      startTouchesDistance = 0,
      endTouchesDistance = 0,
      pinchZoom = 1,
      pinchDistance = 0,
      pinchDirection = 0,
      maximumsMap = null,
      $element = $(element),
      phase = "start",
      fingerCount = 0,
      fingerData = {},
      startTime = 0,
      endTime = 0,
      previousTouchEndTime = 0,
      fingerCountAtRelease = 0,
      doubleTapStartTime = 0,
      singleTapTimeout = null,
      holdTimeout = null;
    try {
      $element.bind(START_EV, touchStart), $element.bind(CANCEL_EV, touchCancel);
    } catch (e) {
      $.error("events not supported " + START_EV + "," + CANCEL_EV + " on jQuery.swipe");
    }
    (this.enable = function () {
      return this.disable(), $element.bind(START_EV, touchStart), $element.bind(CANCEL_EV, touchCancel), $element;
    }),
      (this.disable = function () {
        return removeListeners(), $element;
      }),
      (this.destroy = function () {
        removeListeners(), $element.data(PLUGIN_NS, null), ($element = null);
      }),
      (this.option = function (property, value) {
        if ("object" == typeof property) options = $.extend(options, property);
        else if (void 0 !== options[property]) {
          if (void 0 === value) return options[property];
          options[property] = value;
        } else {
          if (!property) return options;
          $.error("Option " + property + " does not exist on jQuery.swipe.options");
        }
        return null;
      });
  }
  var VERSION = "1.6.18",
    LEFT = "left",
    RIGHT = "right",
    UP = "up",
    DOWN = "down",
    IN = "in",
    OUT = "out",
    NONE = "none",
    AUTO = "auto",
    SWIPE = "swipe",
    PINCH = "pinch",
    TAP = "tap",
    DOUBLE_TAP = "doubletap",
    LONG_TAP = "longtap",
    HORIZONTAL = "horizontal",
    VERTICAL = "vertical",
    ALL_FINGERS = "all",
    DOUBLE_TAP_THRESHOLD = 10,
    PHASE_START = "start",
    PHASE_MOVE = "move",
    PHASE_END = "end",
    PHASE_CANCEL = "cancel",
    SUPPORTS_TOUCH = "ontouchstart" in window,
    SUPPORTS_POINTER_IE10 = window.navigator.msPointerEnabled && !window.PointerEvent && !SUPPORTS_TOUCH,
    SUPPORTS_POINTER = (window.PointerEvent || window.navigator.msPointerEnabled) && !SUPPORTS_TOUCH,
    PLUGIN_NS = "TouchSwipe",
    defaults = {
      fingers: 1,
      threshold: 75,
      cancelThreshold: null,
      pinchThreshold: 20,
      maxTimeThreshold: null,
      fingerReleaseThreshold: 250,
      longTapThreshold: 500,
      doubleTapThreshold: 200,
      swipe: null,
      swipeLeft: null,
      swipeRight: null,
      swipeUp: null,
      swipeDown: null,
      swipeStatus: null,
      pinchIn: null,
      pinchOut: null,
      pinchStatus: null,
      click: null,
      tap: null,
      doubleTap: null,
      longTap: null,
      hold: null,
      triggerOnTouchEnd: !0,
      triggerOnTouchLeave: !1,
      allowPageScroll: "auto",
      fallbackToMouseEvents: !0,
      excludedElements: ".noSwipe",
      preventDefaultEvents: !0,
    };
  ($.fn.swipe = function (method) {
    var $this = $(this),
      plugin = $this.data(PLUGIN_NS);
    if (plugin && "string" == typeof method) {
      if (plugin[method]) return plugin[method].apply(plugin, Array.prototype.slice.call(arguments, 1));
      $.error("Method " + method + " does not exist on jQuery.swipe");
    } else if (plugin && "object" == typeof method) plugin.option.apply(plugin, arguments);
    else if (!(plugin || ("object" != typeof method && method))) return init.apply(this, arguments);
    return $this;
  }),
    ($.fn.swipe.version = VERSION),
    ($.fn.swipe.defaults = defaults),
    ($.fn.swipe.phases = { PHASE_START: PHASE_START, PHASE_MOVE: PHASE_MOVE, PHASE_END: PHASE_END, PHASE_CANCEL: PHASE_CANCEL }),
    ($.fn.swipe.directions = { LEFT: LEFT, RIGHT: RIGHT, UP: UP, DOWN: DOWN, IN: IN, OUT: OUT }),
    ($.fn.swipe.pageScroll = { NONE: NONE, HORIZONTAL: HORIZONTAL, VERTICAL: VERTICAL, AUTO: AUTO }),
    ($.fn.swipe.fingers = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5, ALL: ALL_FINGERS });
});

// Prototype.js
!(function () {
  Array.prototype.argumentsToArray =
    Array.prototype.argumentsToArray ||
    function (arguments) {
      var args = [];
      for (var i = 0; i < arguments.length; i++) {
        var arg = arguments[i];
        if (Array.isArray(arg)) {
          for (var j = 0; j < arg.length; j++) {
            args.push(arg[j]);
          }
        } else {
          args.push(arg);
        }
      }
      return args;
    };
  Array.prototype.unique =
    Array.prototype.unique ||
    function () {
      return this.filter(function (value, index, array) {
        return array.indexOf(value) === index;
      });
    };
  Array.prototype.includes =
    Array.prototype.includes ||
    function (value) {
      return this.indexOf(value) > -1;
    };
  Array.prototype.equals =
    Array.prototype.equals ||
    function () {
      var args = this.argumentsToArray(arguments);

      return this.filter(function (value) {
        return args.includes(value);
      });
    };
  Array.prototype.not =
    Array.prototype.not ||
    function () {
      var args = this.argumentsToArray(arguments);

      return this.filter(function (value) {
        return !args.includes(value);
      });
    };
  Array.prototype.removeEmpty =
    Array.prototype.removeEmpty ||
    function () {
      return this.filter(function (value) {
        return value !== "";
      });
    };

  Node.prototype.composedPath =
    Node.prototype.composedPath ||
    function () {
      var node = this;
      var paths = [];

      while (node) {
        paths.push(node);
        node = node.parentNode;
      }

      return paths.concat([window]);
    };

  NodeList.prototype.toArray =
    NodeList.prototype.toArray ||
    function () {
      return Array.prototype.slice.call(this);
    };

  Element.prototype.getClass =
    Element.prototype.getClass ||
    function () {
      return this.className.split(" ").removeEmpty();
    };
  Element.prototype.setClass =
    Element.prototype.setClass ||
    function (className) {
      if (Array.isArray(className)) {
        this.className = className.join(" ");
      } else {
        this.className = className;
      }
    };
  Element.prototype.hasClass =
    Element.prototype.hasClass ||
    function (className) {
      className = (className || "").split(" ").removeEmpty();

      return this.getClass().equals(className).length === className.length;
    };
  Element.prototype.addClass =
    Element.prototype.addClass ||
    function (className) {
      className = (className || "").split(" ").removeEmpty();
      className = this.getClass().concat(className).unique();

      this.setClass(className);
    };
  Element.prototype.removeClass =
    Element.prototype.removeClass ||
    function (className) {
      className = (className || "").split(" ").removeEmpty();
      className = this.getClass().not(className).unique();

      this.setClass(className);
    };

  window.performance.now = window.performance.now || window.Date.now;
  window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.setTimeout;
  window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;

  if (window.$.fn && window.$.fn.jquery) {
    Element.prototype.$ =
      Element.prototype.$ ||
      function () {
        this.jQueryObject = this.jQueryObject || $(this);
        return this.jQueryObject;
      };
  }

  Number.prototype.digit = function (digit) {
    var value = this + "";

    if (digit > value.length) {
      value = "0".repeat(digit - value.length) + value;
    }

    return value;
  };

  NodeList.prototype.filter = function (callback) {
    return [].filter.call(this, callback);
  };
})();

!(function () {
  "use strict";

  var page = {};

  var scrollEvents = [];
  var resizeEvents = [];

  function mode() {
    return window.innerWidth < 769 ? "m" : "pc";
  }

  function getLanguage() {
    return document.documentElement.lang;
  }

  function init() {
    load();

    window.addEventListener("scroll", scroll);
    window.addEventListener("resize", resize);
  }

  function load() {
    page.width = window.innerWidth;
    page.height = window.innerHeight;
    page.scrollWidth = document.documentElement.scrollWidth;
    page.scrollHeight = document.documentElement.scrollHeight;
    page.scrollLeft = window.scrollX || window.pageXOffset;
    page.scrollTop = window.scrollY || window.pageYOffset;

    page.mode = mode();
    page.language = getLanguage();
  }

  function scroll() {
    var currentTop = window.scrollY || window.pageYOffset;

    page.scrollLeft = window.scrollX || window.pageXOffset;
    page.scrollDirection = currentTop > page.scrollTop ? 1 : currentTop < page.scrollTop ? -1 : 0;
    page.scrollTop = currentTop;

    scrollEvents.forEach(function (callback) {
      typeof callback === "function" && callback();
    });
  }

  function resize() {
    var currentTop = window.scrollY || window.pageYOffset;
    var currentMode = mode();

    page.width = window.innerWidth;
    page.height = window.innerHeight;
    page.scrollWidth = document.documentElement.scrollWidth;
    page.scrollHeight = document.documentElement.scrollHeight;
    page.scrollLeft = window.scrollX || window.pageXOffset;
    page.scrollDirection = currentTop > page.scrollTop ? 1 : currentTop < page.scrollTop ? -1 : 0;
    page.scrollTop = currentTop;

    page.modeChanged = currentMode !== page.mode;
    page.mode = currentMode;

    resizeEvents.forEach(function (callback) {
      typeof callback === "function" && callback();
    });
  }

  init();
  window.page = page;
  window.scrollEvents = scrollEvents;
  window.resizeEvents = resizeEvents;
})();

!(function () {
  var frameId = null;
  var animationFrames = [];

  function AnimationTick(time) {
    animationFrames.forEach(function (frames) {
      frames.progress = (time - frames.time) / frames.duration;
      typeof frames.tick === "function" && frames.tick(frames.progress, time);

      if (frames.progress >= 1) {
        frames.done = true;
      }

      if (frames.done) {
        typeof frames.callback === "function" && frames.callback();
      }
    });

    animationFrames = animationFrames.filter(function (frames) {
      return !(frames.done || frames.cancel);
    });

    if (animationFrames.length) {
      frameId = requestAnimationFrame(AnimationTick);
    } else {
      frameId = null;
    }
  }

  function AnimationFrame(tick, duration, callback) {
    if (typeof duration !== "number") {
      return;
    }

    this.stop = function () {
      var index = animationFrames.indexOf(_options);
      if (index > -1) {
        _options.cancel = true;
      }
    };

    var _options = {
      tick: tick,
      time: performance.now(),
      duration: duration,
      callback: callback,
      done: false,
      cancel: false,
    };

    animationFrames.push(_options);

    if (frameId === null) {
      frameId = requestAnimationFrame(AnimationTick);
    }
  }

  window.AnimationFrame = AnimationFrame;
})();

!(function () {
  if (typeof $.datepicker !== "undefined") {
    $.datepicker.setDefaults({
      dateFormat: "yy/mm/dd",
    });
  }
})();

function dateValidate(value, format) {
  if (format !== undefined) {
    var regex = null;
    if (format === "yyyy/mm/dd") {
      regex = new RegExp(/\d{4}\/\d{2}\/\d{2}/);
    }

    if (!regex) {
      console.error("Format '" + format + "' Unsupported");
      return false;
    }

    if (!regex.test(value)) {
      return false;
    }
  }

  return !isNaN(Date.parse(value));
}

function dateToString(value, format) {
  format = format || "yyyy/mm/dd";

  if (!dateValidate(value)) {
    return null;
  }

  var date = new Date(Date.parse(value));
  var result = "";
  if (format === "yyyy/mm/dd") {
    result = date.getFullYear().digit(4) + "/" + (date.getMonth() + 1).digit(2) + "/" + date.getDate().digit(2);
  }

  if (result === "") {
    console.error("Format '" + format + "' Unsupported");
  }

  return result;
}

function booleanValidate(value) {
  if (typeof value === "string") {
    value = value.toLowerCase();
  }

  if (value === "y" || value === "true" || value === "1" || value === 1 || value === true) {
    return "1";
  }

  return "0";
}

!(function () {
  // Select Box
  var selectBoxes = document.querySelectorAll(".select_box_wrap");
  selectBoxes.forEach(function (selectBox) {
    selectBox.button = selectBox.querySelector(".select_box");
    selectBox.list = selectBox.querySelector(".select_list");
    selectBox.list.items = selectBox.list.querySelectorAll("li").filter(function (item) {
      return item.parentNode === selectBox.list;
    });

    selectBox.clickEvent = function (event) {
      selectBoxes.path = event.path;

      if (selectBox.button.getAttribute("disabled")) {
        return;
      }

      if (selectBox.classList.contains("open")) {
        selectBox.closeList();
      } else {
        selectBox.openList();
      }
    };
    selectBox.openList = function () {
      selectBox.classList.add("open");
    };
    selectBox.closeList = function () {
      selectBox.classList.remove("open");
    };
    selectBox.button.addEventListener("click", selectBox.clickEvent);
  });
  selectBoxes.clickEvent = function () {
    selectBoxes
      .filter(function (selectBox) {
        return selectBox.classList.contains("open") && selectBoxes.path.indexOf(selectBox) < 0;
      })
      .forEach(function (selectBox) {
        selectBox.closeList();
      });
  };
  selectBoxes.touchStartEvent = function (event) {
    if (event.path === void 0) {
      event.path = event.composedPath();
    }
    selectBoxes.path = event.path;
  };
  window.addEventListener("click", selectBoxes.clickEvent);
  window.addEventListener(window.ontouchstart === null ? "touchstart" : "mousedown", selectBoxes.touchStartEvent);
})();

!(function () {
  // Select Box :: Select
  var selectBoxes = document.querySelectorAll(".select_box_wrap");

  selectBoxes.forEach(function (selectBox) {
    selectBox.option = selectBox.querySelector('input[type="hidden"]');
    selectBox.list.items.forEach(function (item, index) {
      item.index = index;
      item.button = item.querySelector("button");
      item.button.dataValue = item.button.getAttribute("data-value");

      item.button.removeAttribute("data-value");

      item.button.clickEvent = function () {
        if (item.button.getAttribute("disabled")) {
          return;
        }

        selectBox.list.items.forEach(function (item) {
          if (item.button.classList.contains("active")) {
            item.button.classList.remove("active");
          }
        });

        selectBox.button.textContent = item.button.textContent;
        selectBox.option.value = item.button.dataValue;

        item.button.classList.add("active");

        selectBox.closeList();

        if (typeof selectBox.changeHandler === "function") {
          selectBox.changeHandler(item.button.dataValue, item.index);
        }
      };

      item.button.addEventListener("click", item.button.clickEvent);
    });
  });
})();

// footer
$(function () {
  var footer = document.querySelector(".footer");
  if (footer === null) {
    return;
  }

  footer.siteList = footer.querySelector(".site_list.family_site");
  if (footer.siteList !== null) {
    footer.siteList.button = footer.siteList.querySelector(".site_list_btn button");
    footer.siteList.list = footer.siteList.querySelector("ul");

    footer.siteList.clickEvent = function (event) {
      footer.path = event.path;

      if (page.mode === "pc") {
        return;
      }

      if (footer.siteList.classList.contains("open")) {
        footer.siteList.closeList();
      } else {
        footer.siteList.openList();
      }
    };
    footer.siteList.openList = function () {
      footer.siteList.classList.add("open");
      typeof window.goTopForceVisibility === "function" && goTopForceVisibility(true);
    };
    footer.siteList.closeList = function () {
      footer.siteList.classList.remove("open");
      typeof window.goTopForceVisibility === "function" && goTopForceVisibility(false);
    };
    footer.siteList.button.addEventListener("click", footer.siteList.clickEvent);

    footer.resizeEvent = function () {
      if (page.modeChanged) {
        if (footer.siteList.classList.contains("open")) {
          footer.siteList.closeList();
        }
      }
    };
    footer.clickEvent = function () {
      if (footer.siteList.classList.contains("open") && footer.path.indexOf(footer.siteList) < 0) {
        footer.siteList.closeList();
      }
    };
    footer.touchStartEvent = function (event) {
      if (event.path === void 0) {
        event.path = event.composedPath();
      }
      footer.path = event.path;
    };
    window.addEventListener("click", footer.clickEvent);
    window.addEventListener(window.ontouchstart === null ? "touchstart" : "mousedown", footer.touchStartEvent);
    resizeEvents.push(footer.resizeEvent);
  }
});

// Cookie Control
!(function () {
  "use strict";

  function getCookie(key) {
    var cookies = document.cookie.split("; ").map(function (data) {
      data = data.split("=");

      var key = data[0];
      var value = void 0;
      if (data.length > 1) {
        data.splice(0, 1);
        value = data.join("=");
      }

      return { key: key, value: value };
    });

    var result = null;
    cookies.some(function (data) {
      if (data.key === key) {
        result = data.value;
        return true;
      }
    });

    return result;
  }

  function setCookie(key, value, expires) {
    // expires is minute
    if (key === void 0) {
      return;
    }

    var date = new Date();

    value = value || "";
    expires = expires !== void 0 ? expires : 1 * 60 * 24; // default 1 day
    date.setTime(date.getTime() + expires * 60 * 1000);

    document.cookie = key + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
  }

  function setCookieToday(key, value) {
    if (key === void 0) {
      return;
    }

    value = value || "";

    var date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 1); // tomorrow expires

    document.cookie = key + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
  }

  function deleteCookie(key) {
    if (key === void 0) {
      return;
    }

    var value = getCookie(key);
    if (value === null) {
      return;
    }

    document.cookie = key + "=" + value + "; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/";
  }

  var cookiePolicy = getCookie("__s2w_cp");
  if (cookiePolicy === null || cookiePolicy === void 0) {
    var storage = window.localStorage || window.sessionStorage;
    if (typeof storage !== "undefined") {
      var storageCookiePolicy = storage.getItem("__s2w_cp");
      if (storageCookiePolicy == true) {
        cookiePolicy = 1;
      } else if (storageCookiePolicy !== null) {
        cookiePolicy = 0;
      } else {
        cookiePolicy = null;
      }
    } else {
      cookiePolicy = null;
    }
  }

  window.cookie = {
    set: setCookie,
    setToday: setCookieToday,
    get: getCookie,
    delete: deleteCookie,
  };
})();

// Go Top
!(function () {
  var goTop = document.querySelector(".goTop_btn");
  var goTopButton = document.querySelector("#gotop");
  if (goTop === null || goTopButton === null) {
    return;
  }

  $goTop = $(goTop);
  goTop.$button = $(goTopButton);

  function pageGoTop() {
    var currentTop = window.scrollY || window.pageYOffset;

    $("html")
      .stop()
      .animate({ scrollTop: 0 }, currentTop / 2.5, function () {
        setTimeout(() => {
          if (window.scrollY) {
            $("html").stop().animate({ scrollTop: 0 }, 100);
          }
        }, 100);
      });
  }

  goTop.$button.on("click", pageGoTop);

  var footer = document.querySelector("section.footer");
  if (footer !== null) {
    $footer = $(footer);

    function goTopDetect() {
      var buttonHeight = parseInt(getComputedStyle(goTop).height);
      var buttonBottom = parseInt(getComputedStyle(goTop).bottom);
      var footerOffset = $footer.offset().top;

      var buttonPosition = buttonHeight + buttonBottom;

      if (page.scrollTop + page.height >= footerOffset) {
        var buttonUpdatePosition = footerOffset - buttonPosition;
        $goTop.css({ position: "absolute", top: buttonUpdatePosition });
      } else {
        $goTop.css({ position: "", top: "" });
      }

      if (goTop.hide) {
        if (page.height / 2 <= page.scrollTop) {
          goTop.hide = false;
          $goTop.stop().css({ display: "block", opacity: 0 }).animate({ opacity: 1 }, 400);
        }
      } else {
        if (page.height / 2 > page.scrollTop) {
          goTop.hide = true;
          $goTop
            .stop()
            .css({ display: "block", opacity: 1 })
            .animate({ opacity: 0 }, 400, function () {
              $goTop.css({ display: "none" });
            });
        }
      }
    }
    function goTopForceVisibility(hide) {
      if (hide) {
        $goTop.css({ display: "none" });
      } else {
        $goTop.css({ display: "block" });
      }
    }
    function goTopLoad() {
      goTop.hide = true;
      goTopDetect();
    }
    function goTopScroll() {
      goTopDetect();
    }
    function goTopResize() {
      goTopDetect();
    }

    scrollEvents.push(goTopScroll);
    resizeEvents.push(goTopResize);
    goTopLoad();

    window.goTopDetect = goTopDetect;
    window.goTopForceVisibility = goTopForceVisibility;
  }
})();
