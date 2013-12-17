//2013-12-12 SV Based ON
//http://detectmybrowser.com/
//J'ai converti l'utilisation de la librairie "Prototype.js" pour "jQuery"

//======================================================================================
//
// Pour faire la vérification la fonction ValidateIsSiteRequirement() doit etre appelée.
//
//======================================================================================
//TODO Ajouté des propriétés pour définir QUEL Validation on 
//veut effectué (voir doValidatePopupAllowed)


if (top != self) { top.location = location; }

(function() {

    var MyBrowser;
    var doValidatePopupAllowed = false;
    var doDisplayPassedTests = false;

    //======================================================================================
    //   * Définition de l'objet 
    //           MyBrowser 
    //======================================================================================
    MyBrowser = (function() {

        function MyBrowser(params) {

        };

        // stuff todo when dom loaded
        MyBrowser.prototype.initDomLoaded = function() {

            if (this.isJavascriptEnable())
            {
                ToggleDisplayError('javascript', 'Enable'); //On affiche les résultats des tests

                this.initBrowserDetection(); // Determine le fureteur utilise

                if(doValidatePopupAllowed && this.isPopupAllowed())
                {
                    ToggleDisplayError('popup-blocker', 'Enable'); //On affiche les résultats des tests
                }

                if(this.ieUserAgent.isIE()) //Est-ce un fureteur IE
                {
                    //Si IE on vérifie la version
                    if(this.ieUserAgent.version >= 8)
                    {
                        ToggleDisplayError('browser-detect', ''); //On affiche les résultats des tests
                    }
                }
                else
                {
                    //Les autre fureteur Pas IE on passe
                    ToggleDisplayError('browser-detect', ''); //On affiche les résultats des tests
                }

                //Si c'est IE on verifie si le mode compatible est ON
                if (!this.ieUserAgent.isCompatibilityModeEnable)
                {
                    ToggleDisplayError('ie-compatibilityMode', 'Enable'); //On affiche les résultats des tests
                }

                //this.initFeatureDetection();

                //Doit-on afficher les résultats des tests "Reussi"
                if (!doDisplayPassedTests) {
                    $(".check-statement-passed").each(function(index) {
                        $(this).hide();
                    });
                }
      
                //On affiche les problemes
                $(".check-statement-failed").each(function (index) {
                    $(this).show();
                });
            }
        };

    // stuff todo when window is loaded (after images)
     MyBrowser.prototype.initWindowLoaded = function() {
    //   this.initMyBrowserData();
    //  this.initPageTracker();
    //  this.initPluginVersions();
     };

    // MyBrowser.prototype.initMyBrowserData = function() {

    //   $$('[data-my-browser]').each(function(ele) {
    //     ele.update(eval("this." + ele.readAttribute('data-my-browser') + '()'));
    //   }.bind(this));

      
    //   Event.observe(window, "resize", function() {
    //     $$('[data-my-browser=viewPort]')[0].update(this.viewPort());
    //   }.bind(this));

    // };

    // MyBrowser.prototype.screenResolution = function() {
    //   return screen.width + 'x' + screen.height + ' pixels';
    // };


    // MyBrowser.prototype.viewPort = function() {
    //   return document.viewport.getWidth() + 'x' + document.viewport.getHeight() + ' pixels';
    // };

    // MyBrowser.prototype.colorDepth = function() {
    //   return screen.colorDepth + ' bit';
    // };

    // Browser Detection
    MyBrowser.prototype.initBrowserDetection = function() {
      $('.data-browser-detect').each(function(index) {
        $(this).text(BrowserDetect[$(this).attr('data-browser-detect')]);
      });
    };

    MyBrowser.prototype.isPopupAllowed = function() 
    {
      var isPopupAllowed = false;
      try 
      {
        var myTest = window.open("about:blank","","height=100,width=100");
        myTest.document.write("Popup are allowed");
        if (myTest) 
        {
          setTimeout(function() { myTest.close();}, 1000);
          isPopupAllowed = true;
        }
      }
      catch(err) 
      {
        isPopupAllowed = false;      
      }

      return isPopupAllowed;
    };


        MyBrowser.prototype.isJavascriptEnable = function() {
        return true;
      };

        //$$('[data-javascipt-enable-detect]').each(function(ele) {
        //  ele.update("Javascript is enable");
        //})
        //return true;
        //};


  MyBrowser.prototype.ieUserAgent = {
   isIE: function () {
    // Create new ieUserAgent object
    // Get the user agent string
    var ua = navigator.userAgent;
    this.isCompatibilityModeEnable = false;
    // Detect whether or not the browser is IE
    var ieRegex = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (ieRegex.exec(ua) == null)
    {
      this.exception = "The user agent detected does not contain Internet Explorer.";
      return false;
    }

    // Get the current "emulated" version of IE
    this.renderVersion = parseFloat(RegExp.$1);
    this.version = this.renderVersion;
     
    // Check the browser version with the rest of the agent string to detect compatibility mode
    if (ua.indexOf("Trident/6.0") > -1) {
      if (ua.indexOf("MSIE 7.0") > -1) {
        this.isCompatibilityModeEnable = true;
        this.version = 10; // IE 10
      }
    }
    else if (ua.indexOf("Trident/5.0") > -1) {
      if (ua.indexOf("MSIE 7.0") > -1) {
        this.isCompatibilityModeEnable = true;
        this.version = 9; // IE 9
      }
    }
    else if (ua.indexOf("Trident/4.0") > -1) {
      if (ua.indexOf("MSIE 7.0") > -1) {
        this.isCompatibilityModeEnable = true;
        this.version = 8; // IE 8
      }
    }
    else if (ua.indexOf("MSIE 7.0") > -1)
      this.version = 7; // IE 7
    else
      this.version = 6; // IE 6

    return true;
  }
  // ,detectIECompatibilityMode: function ()
  // {
  //   if (this.compatibilityMode == true)
  //   {
  //     $('#data-ie-compatibilityMode-enable-detect').text("Enable");
  //   }
  //   return this.compatibilityMode
  // }
};


//    // Plugin detection
    // MyBrowser.prototype.getPluginVersion = function(plugin) {
    //   if ( plugin == 'Java') {
    //     return PluginDetect.getVersion("Java", 'getJavaInfo.jar'); 
    //   } else {
    //     return PluginDetect.getVersion(plugin);
    //   }
    // };

    // MyBrowser.prototype.setPluginVersion = function(domid, plugin) {
    //   var version = this.getPluginVersion(plugin);
    //   if ( version && version != '' ) {
    //     $(domid).update(version);  
    //   } else {
    //     $(domid).update(this.booleanImage(false));
    //   }
    // };

    // MyBrowser.prototype.initPluginVersions = function() {
    //   PluginDetect.getVersion(".");   // set delimiter 
    //   $$('[data-plugin-detect]').each(function(ele) {
    //     this.setPluginVersion(ele, ele.readAttribute('data-plugin-detect'));
    //   }.bind(this))
    // };


    // // Feature detection
    // MyBrowser.prototype.getFeature = function(feature) {
    //   var feature_function = "Modernizr." + feature;
    //   return eval(feature_function);
    // };

    // MyBrowser.prototype.initFeatureDetection = function() {
    //   $$('[data-feature-detect]').each(function(ele) {
    //     var feature    = ele.readAttribute('data-feature-detect');
    //     var hasFeature = this.getFeature(feature);
    //     if ( hasFeature ) {
    //       ele.update(this.booleanImage(true));
    //     } else {
    //       ele.update(this.booleanImage(false));
    //     }
    //   }.bind(this))
    // };


    // // page tracker for Google Analytics;
    // //
    // MyBrowser.prototype.setPageTracker = function(what) {
    //   if ( typeof(pageTracker) != "undefined" ) {
    //     pageTracker._trackPageview('/outgoing/' + what);
    //   }
    // };

    // MyBrowser.prototype.initPageTracker = function(what) {
    //   $$('a[href]').each(function(ele) {

    //     // get the link
    //     var href         = ele.getAttribute('href');

    //     // don't do anything with internal links
    //     if ( ! href.match(/^\#/) ) {
    //       var tracker_text = href.split('/')[2];

    //       // open in new window
    //       ele.setAttribute('target', '_new');

    //       ele.observe('click', function(evt) {
    //         this.setPageTracker(tracker_text);
    //       }.bind(this))
    //     }
    //   }.bind(this))
    // };


    // // images
    // MyBrowser.prototype.booleanImage = function(bool_value) {
    //   return new Element('img', { 
    //     'src':   'images/' + bool_value.toString() + '.png',
    //     'alt':   bool_value.toString(),
    //     'title': bool_value ? "Yes" : "No" 
    //   })
    // };

    // MyBrowser.prototype.loadingImage = function() {
    //   return new Element('img', { 
    //     'src':   'images/loading.gif',
    //     'alt':   'Loading...',
    //     'title': 'Loading...'
    //   })
    // };

    return MyBrowser;

  })();

  window.createMyBrowser = function(params) {
    return new MyBrowser(params);
  };

}).call(this);

var my_browser = createMyBrowser();

//======================================================================================
//
// Pour faire la vérification la fonction ValidateIsSiteRequirement() doit etre appelée.
//
//======================================================================================
function ValidateIsSiteRequirement() 
{
    $("#browser-detect").hide();
    $("#popup-blocker-check").hide();
    $("#ie-compatibilityMode-enable-check").hide();
    my_browser.initDomLoaded();
    my_browser.initWindowLoaded();

    //Si des conditions du fureteur ne sont pas présente on retourn false
    var isBrowserValid = true;
    $(".check-statement-failed").each(function (index) {
        isBrowserValid = false;
    });

    return isBrowserValid;
}


//Affiche les errors en mode Failed ou Passed
function ToggleDisplayError(pstrErrorName, pstrDataTxt) {
    //On affiche seulement les tests en erreur
    $('#' + pstrErrorName + '-enable-check').toggleClass("check-statement-failed check-statement-passed");
    $('#data-' + pstrErrorName + '-enable-detect').text(pstrDataTxt).toggleClass("failed-condition passed-condition");
    $('#bullet-' + pstrErrorName + '-enable-detect').toggleClass("bullet-failed-condition bullet-passed-condition");
}


//Converti de Prototype.js à jQuery.js
// //prototype.js // Listens for the given event over the entire document http://api.prototypejs.org/dom/document/observe/
// document.observe('dom:loaded', function() {
//   my_browser.initDomLoaded();
// });

// //prototype.js // Listens for the given event over the entire document http://api.prototypejs.org/dom/Event/observe/
// Event.observe(window,"load",function() {
//   my_browser.initWindowLoaded();
// });


