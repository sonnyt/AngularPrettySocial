(function (app) {
    "use strict";

    /**
     * List of Social Sites
     * @type {Object}
     */
    var sites = {
        pinterest: {
            url: 'http://pinterest.com/pin/create/button/?url={{url}}&media={{media}}&description={{description}}',
            popup: {
                width: 685,
                height: 500
            }
        },
        facebook: {
            url: 'https://www.facebook.com/sharer/sharer.php?s=100&p[title]={{title}}&p[summary]={{description}}&p[url]={{url}}&p[images][0]={{media}}',
            popup: {
                width: 626,
                height: 436
            }
        },
        twitter: {
            url: 'https://twitter.com/share?url={{url}}&via={{via}}&text={{description}}',
            popup: {
                width: 685,
                height: 500
            }
        },
        googleplus: {
            url: 'https://plus.google.com/share?url={{url}}',
            popup: {
                width: 600,
                height: 600
            }
        },
        linkedin: {
            url: 'https://www.linkedin.com/shareArticle?mini=true&url={{url}}&title={{title}}&summary={{description}}+&source={{via}}',
            popup: {
                width: 600,
                height: 600
            }
        }
    };

    /**
     * Prepare social link
     * @param  {Object} site
     * @param  {Object} link
     * @return {String}
     */
    function linkFix(site, link) {
        var url = site.url.replace(/{{url}}/g, encodeURIComponent(link.url))
                          .replace(/{{title}}/g, encodeURIComponent(link.title))
                          .replace(/{{description}}/g, encodeURIComponent(link.description))
                          .replace(/{{media}}/g, encodeURIComponent(link.media))
                          .replace(/{{via}}/g, encodeURIComponent(link.via));

        return url;
    }

    /**
     * Popup Window
     * @param  {Object} site
     * @param  {String} url
     * @return {Object}
     */
    function popupWindow(site, url) {
        // center window
        var left = (window.innerWidth/2) - (site.popup.width/2);
        var top = (window.innerHeight/2) - (site.popup.height/2);

        // open a window
        return window.open(url, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + site.popup.width + ', height=' + site.popup.height + ', top=' + top + ', left=' + left);
    }

    /**
     * Pretty Social Directive
     * @param {Object} $window
     */
    function prettySocialDirective($window) {
        return {
            restrict: 'A',
            link: function() {
                element.click(function(e) {
                    e.preventDefault();

                    // link type
                    var type = attrs.type;

                    // get site
                    var site = sites[type] || null;

                    // get link info
                    var link = {
                            url: attrs.url || '',
                            title: attrs.title || '',
                            description: attrs.description || '',
                            media: attrs.media || '',
                            via: attrs.via || ''
                        };

                    // fix url
                    var url = linkFix(site, link);

                    // open popup window
                    popupWindow(site, url);
                });
            }
        };
    }

    // Initilize prettySocial Module
    var prettySocial = app.module('prettySocial', []);

    // Pretty Social directive
    prettySocial.directive('socialLink', [
        '$window',
        prettySocialDirective
    ]);
}(angular));