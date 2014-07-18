// SimpleHelp.js - Dead simple help overlays
// Deps - jQuery, (Bootstrap, tooltip)

// Put at least the first attribute on the elements you want shown
// data-sh : this element will be included in overlay (optional value tooltip content)
// data-sh-placement : where the tooltip is to be positioned relative to the element (top, right, bottom, left) default: right
// data-sh-title : optional tooltip title

// TODO: If you want to use a custom tooltip template, provide the element to the init call
(function(glob) {
  'use strict';
  var version = '0.0.1';

  // TODO, template to use in case no bootstrap
  // var template = $('<div class="sh-tooltip"></div>')
  //   .append('');

  var $overlay = $('<div class="sh-overlay"></div>');
  var $windowBox = $('<div class="sh-windowbox"></div>');

  // Private methods/properties
  var createPriv = function(options) {
    var defaults = {
      padding: 5,             // padding for windowbox elements
      popoverZIndex: 902,     // z-index for popover elements
      resizeFix: true,        // hide or trigger overlayHandler on resize
      hashchangeFix: true,    // hide or trigger overlayHandler on hashchange
      overlayHandler: null    // override the default overlay click and resize handler (hide)
    };
    $.extend(defaults, options);

    return {
      options: defaults,
      visible: false,
      //regions: [], // TODO custom defined regions

      getElements: function() {
        return $('[data-sh]');
      },

      showElement: function(el) {
        el = $(el);
        var options;
        if (!el.data('popover')) {
          options = {
            content: el.attr('data-sh'),
            placement: el.attr('data-sh-placement'),
            title: el.attr('data-sh-title'),
            trigger: 'manual'
          }
          el.popover(options);
        }
        el.popover('show');
        // create windowbox
        if (!el.data('wb')) {
          var $wb = $windowBox.clone();
          var props = {
            top: el.offset().top - this.options.padding - 2,
            left: el.offset().left - this.options.padding - 2,
            width: el.outerWidth() + this.options.padding*2,
            height: el.outerHeight() + this.options.padding*2,
          }

          $wb.appendTo($('body')).css(props);
          el.data('wb', $wb);
        }
        el.addClass('sh-el');
      },

      hideElement: function(el) {
        el = $(el);
        el.popover('hide');
        el.removeClass('sh-el');
        var $wb = el.data('wb');
        if ($wb) {
          $wb.remove();
          el.removeData('wb');
        }
      }
    }
  }

  // API Factory
  var SimpleHelp = function(options) {
    var priv = createPriv(options);

    // define the api
    var api =  {
      show: function() {
        if (priv.visible) {
          return;
        }
        var elements = priv.getElements();
        var self = this;
        $overlay.appendTo($('body')).animate({'opacity': '0.5'}).click(priv.options.overlayHandler || function(e) {
          self.hide();
        });
        elements.each(function(i, el) {
          priv.showElement(el)
        });
        $('.popover').css({'z-index': priv.options.popoverZIndex})
        priv.visible = true;
      },

      hide: function() {
        if (!priv.visible) {
          return;
        }
        var elements = priv.getElements();
        $overlay.animate({'opacity': '0.0'}, function() {
          $(this).remove();
        });
        elements.each(function(i, el) {
          priv.hideElement(el)
        });

        // just in case
        $('.sh-windowbox').remove();
        priv.visible = false;
      },

      getElements: function() {
        return priv.getElements();
      },

      addElement: function(el, options) {
        options = options || {}
        el = $(el);
        el.attr('data-sh', options.content || '');
        el.attr('data-sh-placement', options.placement);
        el.attr('data-sh-title', options.title);
      },

      removeElement: function(el) {
        el = $(el);
        el.removeAttr('data-sh')
        el.removeAttr('data-sh-placement')
        el.removeAttr('data-sh-title')
        el.popover('destroy');
      }
    }

    if (priv.options.resizeFix) {
      $(glob).resize(priv.options.overlayHandler || function() {
        api.hide();
      });
    }

    if (priv.options.hashchangeFix) {
      $(glob).on('hashchange', priv.options.overlayHandler || function() {
        api.hide();
      });
    }

    return api;
  }

  // Attach to global object
  glob.SimpleHelp = SimpleHelp;

})(this);

