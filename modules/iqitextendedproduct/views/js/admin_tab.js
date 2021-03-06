/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	
	__webpack_require__(3);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _libJsVideoUrlParserMin = __webpack_require__(2);
	
	var _libJsVideoUrlParserMin2 = _interopRequireDefault(_libJsVideoUrlParserMin);
	
	/**
	 * IqitVideos management
	 */
	var iqitVideosForm = (function () {
	    var videoListContainer = $('#iqitvideos-list');
	
	    return {
	        'init': function init() {
	            iqitVideosForm.setInputVal();
	            $('#iqitthreesixty-addvideo').on('click', function () {
	                var field = $('#iqitthreesixty-videourl');
	                var video = _libJsVideoUrlParserMin2['default'].parse(field.val());
	                var template = $('#iqitvideo-previewsample').children().clone();
	
	                if (video != null) {
	                    var videoUrl = _libJsVideoUrlParserMin2['default'].create({
	                        videoInfo: video,
	                        format: 'embed'
	                    });
	                    template.data('video-url', video.id);
	                    template.data('video-provider', video.provider);
	                    template.find('.js-video-iframe').prop('src', videoUrl);
	                    videoListContainer.append(template);
	                    field.val('');
	                } else {
	                    return $.growl.error({
	                        title: "",
	                        size: "large",
	                        message: "Something wrong with video link!"
	                    });
	                }
	                iqitVideosForm.setInputVal();
	            });
	
	            videoListContainer.on('click', '.js-delete-video', function () {
	                $(this).parents('.iqitvideo-preview').first().remove();
	                iqitVideosForm.setInputVal();
	            });
	
	            videoListContainer.sortable({
	                items: "div.iqitvideo-preview",
	                opacity: 0.9,
	                containment: 'parent',
	                distance: 32,
	                tolerance: 'pointer',
	                cursorAt: {
	                    left: 64,
	                    top: 64
	                },
	                cancel: '.disabled',
	                start: function start(event, ui) {
	                    //init zindex
	                    videoListContainer.find('.iqitvideo-preview').css('zIndex', 1);
	                    ui.item.css('zIndex', 10);
	                },
	                stop: function stop(event, ui) {
	                    iqitVideosForm.setInputVal();
	                }
	            });
	        },
	        'setInputVal': function setInputVal() {
	
	            var videosIqit = [];
	
	            $('#iqitvideos-list').find('.js-iqitvideo-preview').each(function () {
	                videosIqit.push({ p: $(this).data('video-provider'), id: $(this).data('video-url') });
	            });
	
	            if ($.isEmptyObject(videosIqit)) {
	                $('#iqitextendedproduct_videos').val('');
	            } else {
	                $('#iqitextendedproduct_videos').val(JSON.stringify(videosIqit));
	            }
	        }
	    };
	})();
	
	/**
	 * IqitThreeSixty images management
	 */
	var uploaderIqitThreeSixty = (function () {
	    var myDropzone;
	    var dropZoneElem = $('#iqitthreesixty-images-dropzone');
	
	    return {
	        'init': function init() {
	            uploaderIqitThreeSixty.setInputVal();
	            Dropzone.autoDiscover = false;
	            var errorElem = $('#iqitthreesixty-images-dropzone-error');
	
	            $("#iqitthreesixty-removeall").on("click", function () {
	                myDropzone.removeAllFiles(true);
	                $(dropZoneElem).find('.dz-image-preview').each(function () {
	                    var name = $(this).data('name');
	                    $(this).remove();
	                    $.ajax({
	                        url: dropZoneElem.attr('url-delete'),
	                        data: { 'file': name }
	                    });
	                });
	                uploaderIqitThreeSixty.setInputVal();
	            });
	
	            $(dropZoneElem).on("click", '.dz-remove-custom', function () {
	                var $el = $(this).parents('.dz-preview').first();
	                $el.remove();
	                $.ajax({
	                    url: dropZoneElem.attr('url-delete'),
	                    data: { 'file': $el.data('name') }
	                });
	                uploaderIqitThreeSixty.setInputVal();
	            });
	
	            var dropzoneOptions = {
	                url: dropZoneElem.attr('url-upload'),
	                paramName: 'threesixty-file-upload',
	                maxFilesize: dropZoneElem.attr('data-max-size'),
	                addRemoveLinks: true,
	                thumbnailWidth: 250,
	                clickable: '.threesixty-openfilemanager',
	                thumbnailHeight: null,
	                uploadMultiple: false,
	                acceptedFiles: 'image/*',
	                dictRemoveFile: 'Delete',
	                dictFileTooBig: 'ToLargeFile',
	                dictCancelUpload: 'Delete',
	                sending: function sending(file, response) {
	                    errorElem.html('');
	                },
	                queuecomplete: function queuecomplete() {
	                    dropZoneElem.sortable('enable');
	                },
	                processing: function processing() {
	                    dropZoneElem.sortable('disable');
	                },
	                success: function success(file, response) {
	                    //manage error on uploaded file
	                    if (response.error !== 0) {
	                        errorElem.append('<p>' + file.name + ': ' + response.error + '</p>');
	                        this.removeFile(file);
	                        return;
	                    }
	                    $(file.previewElement).data('name', response.name);
	                    $(file.previewElement).addClass('ui-sortable-handle');
	                    uploaderIqitThreeSixty.setInputVal();
	                },
	                removedfile: function removedfile(file) {
	                    var name = $(file.previewElement).data('name');
	                    var _ref;
	                    if (file.previewElement) {
	                        if ((_ref = file.previewElement) != null) {
	                            _ref.parentNode.removeChild(file.previewElement);
	                        }
	                    }
	                    $.ajax({
	                        url: dropZoneElem.attr('url-delete'),
	                        data: { 'file': name }
	                    });
	                    uploaderIqitThreeSixty.setInputVal();
	                },
	                error: function error(file, response) {
	                    var message = '';
	                    if ($.type(response) === 'undefined') {
	                        return;
	                    } else if ($.type(response) === 'string') {
	                        message = response;
	                    } else if (response.message) {
	                        message = response.message;
	                    }
	
	                    if (message === '') {
	                        return;
	                    }
	
	                    //append new error
	                    errorElem.append('<p>' + file.name + ': ' + message + '</p>');
	
	                    //remove uploaded item
	                    this.removeFile(file);
	                },
	                init: function init() {
	                    //if already images uploaded, mask drop file message
	                    if (dropZoneElem.find('.dz-preview:not(.threesixty-openfilemanager)').length) {
	                        dropZoneElem.addClass('dz-started');
	                    } else {
	                        dropZoneElem.find('.dz-preview.threesixty-openfilemanager').hide();
	                    }
	
	                    //init sortable
	                    dropZoneElem.sortable({
	                        items: "div.dz-preview:not(.disabled)",
	                        opacity: 0.9,
	                        containment: 'parent',
	                        distance: 32,
	                        tolerance: 'pointer',
	                        cursorAt: {
	                            left: 64,
	                            top: 64
	                        },
	                        cancel: '.disabled',
	                        start: function start(event, ui) {
	                            //init zindex
	                            dropZoneElem.find('.dz-preview').css('zIndex', 1);
	                            ui.item.css('zIndex', 10);
	                        },
	                        stop: function stop(event, ui) {
	                            uploaderIqitThreeSixty.setInputVal();
	                        }
	                    });
	
	                    dropZoneElem.disableSelection();
	                }
	            };
	            myDropzone = new Dropzone("div#iqitthreesixty-images-dropzone", jQuery.extend(dropzoneOptions));
	        },
	        'setInputVal': function setInputVal() {
	
	            var imagesIqitThreeSixty = [];
	
	            dropZoneElem.find('.dz-image-preview').each(function () {
	                imagesIqitThreeSixty.push({ n: $(this).data('name') });
	            });
	
	            if ($.isEmptyObject(imagesIqitThreeSixty)) {
	                $('#iqitextendedproduct_threesixty').val('');
	            } else {
	                $('#iqitextendedproduct_threesixty').val(JSON.stringify(imagesIqitThreeSixty));
	            }
	        }
	    };
	})();
	$(document).ready(function () {
	    uploaderIqitThreeSixty.init();
	    iqitVideosForm.init();
	});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";
	
	!(function () {
	  "use strict";function a(b) {
	    if (null === b || "object" != typeof b) return b;var c = b.constructor();for (var d in b) b.hasOwnProperty(d) && (c[d] = a(b[d]));return c;
	  }function b(a) {
	    if ("string" != typeof a) return {};a = a.split("+").join(" ");var b,
	        c = {},
	        d = a.match(/(?:[\?](?:[^=]+)=(?:[^&#]*)(?:[&](?:[^=]+)=(?:[^&#]*))*(?:[#].*)?)|(?:[#].*)/);if (null === d) return {};b = d[0].substr(1).split(/[&#=]/);for (var e = 0; e < b.length; e += 2) c[decodeURIComponent(b[e])] = decodeURIComponent(b[e + 1] || "");return c;
	  }function c(a) {
	    if ("object" != typeof a) return "";a.params = a.params || {};var b = "",
	        c = 0,
	        d = Object.keys(a.params);if (0 === d.length) return "";for (d.sort(), a.hasParams || (b += "?" + d[0] + "=" + a.params[d[0]], c += 1); c < d.length; c += 1) b += "&" + d[c] + "=" + a.params[d[c]];return b;
	  }function d(a) {
	    var b,
	        c = 0,
	        d = { s: 1, m: 60, h: 3600, d: 86400, w: 604800 };if (!a.match(/^(\d+[smhdw]?)+$/)) return 0;a = a.replace(/([smhdw])/g, " $1 ").trim(), b = a.split(" ");for (var e = 0; e < b.length; e += 2) c += parseInt(b[e], 10) * d[b[e + 1] || "s"];return c;
	  }function e() {
	    this.plugins = {};
	  }function f() {
	    this.provider = "canalplus", this.defaultFormat = "embed", this.formats = { embed: this.createEmbedUrl }, this.mediaTypes = { VIDEO: "video" };
	  }function g() {
	    this.provider = "coub", this.defaultFormat = "long", this.formats = { long: this.createLongUrl, embed: this.createEmbedUrl }, this.mediaTypes = { VIDEO: "video" };
	  }function h() {
	    this.provider = "dailymotion", this.alternatives = ["dai"], this.defaultFormat = "long", this.formats = { short: this.createShortUrl, long: this.createLongUrl, embed: this.createEmbedUrl }, this.mediaTypes = { VIDEO: "video" };
	  }function i() {
	    this.provider = "twitch", this.defaultFormat = "long", this.formats = { long: this.createLongUrl, embed: this.createEmbedUrl }, this.mediaTypes = { VIDEO: "video", STREAM: "stream", EMBEDVIDEO: "embed-video", CLIP: "clip" };
	  }function j() {
	    this.provider = "vimeo", this.alternatives = ["vimeopro"], this.defaultFormat = "long", this.formats = { long: this.createLongUrl, embed: this.createEmbedUrl }, this.mediaTypes = { VIDEO: "video" };
	  }function k() {
	    this.provider = "youtube", this.alternatives = ["youtu", "ytimg"], this.defaultFormat = "long", this.formats = { short: this.createShortUrl, long: this.createLongUrl, embed: this.createEmbedUrl, shortImage: this.createShortImageUrl, longImage: this.createLongImageUrl }, this.imageQualities = { 0: "0", 1: "1", 2: "2", 3: "3", DEFAULT: "default", HQDEFAULT: "hqdefault", SDDEFAULT: "sddefault", MQDEFAULT: "mqdefault", MAXRESDEFAULT: "maxresdefault" }, this.defaultImageQuality = this.imageQualities.HQDEFAULT, this.mediaTypes = { VIDEO: "video", PLAYLIST: "playlist", SHARE: "share" };
	  }function l() {
	    this.provider = "youku", this.defaultFormat = "long", this.formats = { embed: this.createEmbedUrl, long: this.createLongUrl, flash: this.createFlashUrl, "static": this.createStaticUrl }, this.mediaTypes = { VIDEO: "video" };
	  }e.prototype.parseProvider = function (a) {
	    var b = a.match(/(?:(?:https?:)?\/\/)?(?:[^\.]+\.)?(\w+)\./i);return b ? b[1] : void 0;
	  }, e.prototype.removeEmptyParameters = function (a) {
	    return a.params && 0 === Object.keys(a.params).length && delete a.params, a;
	  }, e.prototype.parse = function (a) {
	    var c,
	        d = this,
	        e = d.parseProvider(a),
	        f = d.plugins[e];if (e && f && f.parse) return c = f.parse.apply(f, [a, b(a)]), c && (c = d.removeEmptyParameters(c), c.provider = f.provider), c;
	  }, e.prototype.bind = function (a) {
	    if ((this.plugins[a.provider] = a, a.alternatives)) for (var b = 0; b < a.alternatives.length; b += 1) this.plugins[a.alternatives[b]] = a;
	  }, e.prototype.create = function (b) {
	    var c = b.videoInfo,
	        d = b.params,
	        e = this.plugins[c.provider];if ((d = "internal" === d ? c.params : d || {}, e && (b.format = b.format || e.defaultFormat, e.formats.hasOwnProperty(b.format)))) return e.formats[b.format].apply(e, [c, a(d)]);
	  };var m = new e();f.prototype.parseParameters = function (a) {
	    return delete a.vid, a;
	  }, f.prototype.parse = function (a, b) {
	    var c = this,
	        d = { mediaType: this.mediaTypes.VIDEO, id: b.vid };if ((d.params = c.parseParameters(b), d.id)) return d;
	  }, f.prototype.createEmbedUrl = function (a, b) {
	    var d = "http://player.canalplus.fr/embed/";return b.vid = a.id, d += c({ params: b });
	  }, m.bind(new f()), g.prototype.parseUrl = function (a) {
	    var b = a.match(/(?:embed|view)\/([a-zA-Z\d]+)/i);return b ? b[1] : void 0;
	  }, g.prototype.parse = function (a, b) {
	    var c = { mediaType: this.mediaTypes.VIDEO, params: b, id: this.parseUrl(a) };if (c.id) return c;
	  }, g.prototype.createUrl = function (a, b, d) {
	    var e = a + b.id;return e += c({ params: d });
	  }, g.prototype.createLongUrl = function (a, b) {
	    return this.createUrl("https://coub.com/view/", a, b);
	  }, g.prototype.createEmbedUrl = function (a, b) {
	    return this.createUrl("//coub.com/embed/", a, b);
	  }, m.bind(new g()), h.prototype.parseParameters = function (a) {
	    return this.parseTime(a);
	  }, h.prototype.parseTime = function (a) {
	    return a.start && (a.start = d(a.start)), a;
	  }, h.prototype.parseUrl = function (a) {
	    var b = a.match(/(?:\/video|ly)\/([A-Za-z0-9]+)/i);return b ? b[1] : void 0;
	  }, h.prototype.parse = function (a, b) {
	    var c = this,
	        d = { mediaType: this.mediaTypes.VIDEO, params: c.parseParameters(b), id: c.parseUrl(a) };return d.id ? d : void 0;
	  }, h.prototype.createUrl = function (a, b, d) {
	    return a + b.id + c({ params: d });
	  }, h.prototype.createShortUrl = function (a) {
	    return this.createUrl("https://dai.ly/", a, {});
	  }, h.prototype.createLongUrl = function (a, b) {
	    return this.createUrl("https://dailymotion.com/video/", a, b);
	  }, h.prototype.createEmbedUrl = function (a, b) {
	    return this.createUrl("//www.dailymotion.com/embed/video/", a, b);
	  }, m.bind(new h()), i.prototype.seperateId = function (a) {
	    return { pre: a[0], id: a.substr(1) };
	  }, i.prototype.parseChannel = function (a, b) {
	    var c = b.channel || b.utm_content || a.channel;return delete b.utm_content, delete b.channel, c;
	  }, i.prototype.parseUrl = function (a, b, c) {
	    var d;if ((d = a.match(/(clips\.)?twitch\.tv\/(\w+)(?:\/(?:(.)\/(\d+)|(\w+)))?/i), b.channel = d ? d[2] : void 0, d && d[3] && d[4])) b.id = d[3] + d[4];else if (c.video) b.id = c.video, delete c.video;else if (d && d[1] && d[5]) b.id = d[5], b.isClip = !0;else if (c.clip) {
	      var e = c.clip.split("/");b.channel = e[0], b.id = e[1], b.isClip = !0, delete c.clip;
	    }return b;
	  }, i.prototype.parseMediaType = function (a) {
	    var b;return a.channel ? a.id && a.isClip ? (b = this.mediaTypes.CLIP, delete a.isClip) : b = a.id && !a.isClip ? this.mediaTypes.VIDEO : this.mediaTypes.STREAM : a.id && (b = this.mediaTypes.EMBEDVIDEO, delete a.channel), b;
	  }, i.prototype.parseParameters = function (a) {
	    return a.t && (a.start = d(a.t), delete a.t), a;
	  }, i.prototype.parse = function (a, b) {
	    var c = this,
	        d = {};return d = c.parseUrl(a, d, b), d.channel = c.parseChannel(d, b), d.mediaType = c.parseMediaType(d), d.params = c.parseParameters(b), d.channel || d.id ? d : void 0;
	  }, i.prototype.createLongUrl = function (a, b) {
	    var d = "";if (a.mediaType === this.mediaTypes.STREAM) d = "https://twitch.tv/" + a.channel;else if (a.mediaType === this.mediaTypes.VIDEO) {
	      var e = this.seperateId(a.id);d = "https://twitch.tv/" + a.channel + "/" + e.pre + "/" + e.id, b.start && (b.t = b.start + "s", delete b.start);
	    } else a.mediaType === this.mediaTypes.CLIP && (d = "https://clips.twitch.tv/" + a.channel + "/" + a.id);return d += c({ params: b });
	  }, i.prototype.createEmbedUrl = function (a, b) {
	    var d = "https://player.twitch.tv/";return a.mediaType === this.mediaTypes.STREAM ? b.channel = a.channel : a.mediaType === this.mediaTypes.VIDEO || a.mediaType === this.mediaTypes.EMBEDVIDEO ? (b.video = a.id, b.start && (b.t = b.start + "s", delete b.start)) : a.mediaType === this.mediaTypes.CLIP && (d = "https://clips.twitch.tv/embed", b.clip = a.channel + "/" + a.id), d += c({ params: b });
	  }, m.bind(new i()), j.prototype.parseUrl = function (a) {
	    var b = a.match(/(?:\/(?:channels\/[\w]+|(?:(?:album\/\d+|groups\/[\w]+)\/)?videos?))?\/(\d+)/i);return b ? b[1] : void 0;
	  }, j.prototype.parseParameters = function (a) {
	    return this.parseTime(a);
	  }, j.prototype.parseTime = function (a) {
	    return a.t && (a.start = d(a.t), delete a.t), a;
	  }, j.prototype.parse = function (a, b) {
	    var c = { mediaType: this.mediaTypes.VIDEO, params: this.parseParameters(b), id: this.parseUrl(a) };return c.id ? c : void 0;
	  }, j.prototype.createUrl = function (a, b, d) {
	    var e = a + b.id,
	        f = d.start;return delete d.start, e += c({ params: d }), f && (e += "#t=" + f), e;
	  }, j.prototype.createLongUrl = function (a, b) {
	    return this.createUrl("https://vimeo.com/", a, b);
	  }, j.prototype.createEmbedUrl = function (a, b) {
	    return this.createUrl("//player.vimeo.com/video/", a, b);
	  }, m.bind(new j()), k.prototype.parseUrl = function (a) {
	    var b = a.match(/(?:(?:v|vi|be|videos|embed)\/(?!videoseries)|(?:v|ci)=)([\w\-]{11})/i);return b ? b[1] : void 0;
	  }, k.prototype.parseParameters = function (a, b) {
	    return (a.start || a.t) && (a.start = d(a.start || a.t), delete a.t), a.v === b.id && delete a.v, a.list === b.id && delete a.list, a;
	  }, k.prototype.parseMediaType = function (a) {
	    if ((a.params.list && (a.list = a.params.list, delete a.params.list), a.id && !a.params.ci)) a.mediaType = this.mediaTypes.VIDEO;else if (a.list) delete a.id, a.mediaType = this.mediaTypes.PLAYLIST;else {
	      if (!a.params.ci) return;delete a.params.ci, a.mediaType = this.mediaTypes.SHARE;
	    }return a;
	  }, k.prototype.parse = function (a, b) {
	    var c = this,
	        d = { params: b, id: c.parseUrl(a) };return d.params = c.parseParameters(b, d), d = c.parseMediaType(d);
	  }, k.prototype.createShortUrl = function (a, b) {
	    var c = "https://youtu.be/" + a.id;return b.start && (c += "#t=" + b.start), c;
	  }, k.prototype.createLongUrl = function (a, b) {
	    var d = "",
	        e = b.start;return delete b.start, a.mediaType === this.mediaTypes.PLAYLIST ? (b.feature = "share", d += "https://youtube.com/playlist") : a.mediaType === this.mediaTypes.VIDEO ? (b.v = a.id, d += "https://youtube.com/watch") : a.mediaType === this.mediaTypes.SHARE && (b.ci = a.id, d += "https://www.youtube.com/shared"), a.list && (b.list = a.list), d += c({ params: b }), a.mediaType !== this.mediaTypes.PLAYLIST && e && (d += "#t=" + e), d;
	  }, k.prototype.createEmbedUrl = function (a, b) {
	    var d = "//youtube.com/embed";return a.mediaType === this.mediaTypes.PLAYLIST ? b.listType = "playlist" : (d += "/" + a.id, "1" === b.loop && (b.playlist = a.id)), a.list && (b.list = a.list), d += c({ params: b });
	  }, k.prototype.createImageUrl = function (a, b, c) {
	    var d = a + b.id + "/",
	        e = c.imageQuality || this.defaultImageQuality;return d + e + ".jpg";
	  }, k.prototype.createShortImageUrl = function (a, b) {
	    return this.createImageUrl("https://i.ytimg.com/vi/", a, b);
	  }, k.prototype.createLongImageUrl = function (a, b) {
	    return this.createImageUrl("https://img.youtube.com/vi/", a, b);
	  }, m.bind(new k()), l.prototype.parseUrl = function (a) {
	    var b = a.match(/(?:(?:embed|sid)\/|v_show\/id_|VideoIDS=)([a-zA-Z0-9]+)/);return b ? b[1] : void 0;
	  }, l.prototype.parseParameters = function (a) {
	    return a.VideoIDS && delete a.VideoIDS, a;
	  }, l.prototype.parse = function (a, b) {
	    var c = this,
	        d = { mediaType: this.mediaTypes.VIDEO, id: c.parseUrl(a), params: c.parseParameters(b) };if (d.id) return d;
	  }, l.prototype.createUrl = function (a, b, d) {
	    var e = a + b.id;return e += c({ params: d });
	  }, l.prototype.createEmbedUrl = function (a, b) {
	    return this.createUrl("http://player.youku.com/embed/", a, b);
	  }, l.prototype.createLongUrl = function (a, b) {
	    return this.createUrl("http://v.youku.com/v_show/id_", a, b);
	  }, l.prototype.createStaticUrl = function (a, b) {
	    return this.createUrl("http://static.youku.com/v1.0.0638/v/swf/loader.swf?VideoIDS=", a, b);
	  }, l.prototype.createFlashUrl = function (a, b) {
	    var d = "http://player.youku.com/player.php/sid/" + a.id + "/v.swf";return d += c({ params: b });
	  }, m.bind(new l()), "undefined" != typeof window && (window.urlParser = m), "undefined" != typeof module && "undefined" != typeof module.exports && (module.exports = m);
	})();

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=admin_tab.js.map