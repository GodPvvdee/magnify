
! function(t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define(["jquery"], function(t) {
        e(t)
    }) : "object" == typeof module && module.exports ? module.exports = t.EasyZoom = e(require("jquery")) : t.EasyZoom = e(t.jQuery)
}(this, function(o) {
    "use strict";
    var c, l, d, p, u, f, i = {
        loadingNotice: "Loading image",
        errorNotice: "The image could not be loaded",
        errorDuration: 2500,
        linkAttribute: "href",
        preventClicks: !0,
        beforeShow: o.noop,
        beforeHide: o.noop,
        onShow: o.noop,
        onHide: o.noop,
        onMove: o.noop
    };

    function s(t, e) {
        this.$target = o(t), this.opts = o.extend({}, i, e, this.$target.data()), void 0 === this.isOpen && this._init()
    }
    return s.prototype._init = function() {
        this.$link = this.$target.find("a"), this.$image = this.$target.find("img"), this.$flyout = o('<div class="easyzoom-flyout" />'), this.$notice = o('<div class="easyzoom-notice" />'), this.$target.on({
            "mousemove.easyzoom touchmove.easyzoom": o.proxy(this._onMove, this),
            "mouseleave.easyzoom touchend.easyzoom": o.proxy(this._onLeave, this),
            "mouseenter.easyzoom touchstart.easyzoom": o.proxy(this._onEnter, this)
        }), this.opts.preventClicks && this.$target.on("click.easyzoom", function(t) {
            t.preventDefault()
        })
    }, s.prototype.show = function(t, e) {
        var i = this;
        if (!1 !== this.opts.beforeShow.call(this)) {
            if (!this.isReady) return this._loadImage(this.$link.attr(this.opts.linkAttribute), function() {
                !i.isMouseOver && e || i.show(t)
            });
            this.$target.append(this.$flyout);
            var o = this.$target.outerWidth(),
                s = this.$target.outerHeight(),
                h = this.$flyout.width(),
                n = this.$flyout.height(),
                a = this.$zoom.width(),
                r = this.$zoom.height();
            c = Math.ceil(a - h), l = Math.ceil(r - n), c < 0 && (c = 0), l < 0 && (l = 0), d = c / o, p = l / s, this.isOpen = !0, this.opts.onShow.call(this), t && this._move(t)
        }
    }, s.prototype._onEnter = function(t) {
        var e = t.originalEvent.touches;
        this.isMouseOver = !0, e && 1 != e.length || (t.preventDefault(), this.show(t, !0))
    }, s.prototype._onMove = function(t) {
        this.isOpen && (t.preventDefault(), this._move(t))
    }, s.prototype._onLeave = function() {
        this.isMouseOver = !1, this.isOpen && this.hide()
    }, s.prototype._onLoad = function(t) {
        t.currentTarget.width && (this.isReady = !0, this.$notice.detach(), this.$flyout.html(this.$zoom), this.$target.removeClass("is-loading").addClass("is-ready"), t.data.call && t.data())
    }, s.prototype._onError = function() {
        var t = this;
        this.$notice.text(this.opts.errorNotice), this.$target.removeClass("is-loading").addClass("is-error"), this.detachNotice = setTimeout(function() {
            t.$notice.detach(), t.detachNotice = null
        }, this.opts.errorDuration)
    }, s.prototype._loadImage = function(t, e) {
        var i = new Image;
        this.$target.addClass("is-loading").append(this.$notice.text(this.opts.loadingNotice)), this.$zoom = o(i).on("error", o.proxy(this._onError, this)).on("load", e, o.proxy(this._onLoad, this)), i.style.position = "absolute", i.src = t
    }, s.prototype._move = function(t) {
        if (0 === t.type.indexOf("touch")) {
            var e = t.touches || t.originalEvent.touches;
            u = e[0].pageX, f = e[0].pageY
        } else u = t.pageX || u, f = t.pageY || f;
        var i = this.$target.offset(),
            o = u - i.left,
            s = f - i.top,
            h = Math.ceil(o * d),
            n = Math.ceil(s * p);
        if (h < 0 || n < 0 || c < h || l < n) this.hide();
        else {
            var a = -1 * n,
                r = -1 * h;
            this.$zoom.css({
                top: a,
                left: r
            }), this.opts.onMove.call(this, a, r)
        }
    }, s.prototype.hide = function() {
        this.isOpen && !1 !== this.opts.beforeHide.call(this) && (this.$flyout.detach(), this.isOpen = !1, this.opts.onHide.call(this))
    }, s.prototype.swap = function(t, e, i) {
        this.hide(), this.isReady = !1, this.detachNotice && clearTimeout(this.detachNotice), this.$notice.parent().length && this.$notice.detach(), this.$target.removeClass("is-loading is-ready is-error"), this.$image.attr({
            src: t,
            srcset: o.isArray(i) ? i.join() : i
        }), this.$link.attr(this.opts.linkAttribute, e)
    }, s.prototype.teardown = function() {
        this.hide(), this.$target.off(".easyzoom").removeClass("is-loading is-ready is-error"), this.detachNotice && clearTimeout(this.detachNotice), delete this.$link, delete this.$zoom, delete this.$image, delete this.$notice, delete this.$flyout, delete this.isOpen, delete this.isReady
    }, o.fn.easyZoom = function(e) {
        return this.each(function() {
            var t = o.data(this, "easyZoom");
            t ? void 0 === t.isOpen && t._init() : o.data(this, "easyZoom", new s(this, e))
        })
    }, s
});