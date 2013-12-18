//2013-12-12 SV Based ON
//http://detectmybrowser.com/
//J'ai converti l'utilisation de la librairie "Prototype.js" pour "jQuery"

//======================================================================================
//
// Pour faire la vérification la fonction ValidateIsSiteRequirement() doit etre appelée.
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// A NOTÉ TOUS LES TESTS SONT FAILED par défaut.  DONC ON TOGGLE SEULEMENT SI LE STATUT CHANGE POUR "PASSED"
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//======================================================================================
//TODO Ajouté des propriétés pour définir QUEL Validation on 
//veut effectué (voir doValidatePopupAllowed)


if (top != self) { top.location = location; }

(function() {
    var MyBrowser;

    //Verif selon les variables systèmes
    var doValidateJavascript =  (typeof javaScriptEnabled != 'undefined' && javaScriptEnabled)? true : false;
    var doValidatePopupAllowed = (typeof popUpBlockerDisabled != 'undefined' && popUpBlockerDisabled)? true : false;
    var doValidateCookiesAllowed = (typeof cookieEnabled != 'undefined' && cookieEnabled)? true : false;

    var doValidateCookiesAllowed = true;
    var doDisplayPassedTests = false;
    var minIEVersion = (typeof BROWSERExplorer_minVersion != 'undefined')? BROWSERExplorer_minVersion : 0; 
    var minChromeVersion = (typeof BROWSERChrome_minVersion != 'undefined')? BROWSERChrome_minVersion : 0; 
    var minFirefoxVersion = (typeof BROWSERFirefox_minVersion != 'undefined')? BROWSERFirefox_minVersion : 0; 

    //======================================================================================
    //   * Définition de l'objet 
    //           MyBrowser 
    //======================================================================================
    MyBrowser = (function() {

        function MyBrowser(params) {

        };

        // stuff todo when dom loaded
        MyBrowser.prototype.IsBrowserValidOnInitDomLoaded = function() {
            //Si des  conditions du fureteur ne sont pas présente on retourn false
            var isBrowserValid = (!doValidateJavascript)? true : false;// si onne valide pas le JS on ne valide donc rien.  donc tout est ok
            if (doValidateJavascript && this.isJavascriptEnable())
            {
                ToggleDisplayFailedPassed('javascript', lblEnable); //On affiche les résultats des tests

                this.initBrowserDetection(); // Determine le fureteur utilise

                var isCookiesAllowed = this.isCookiesAllowed();

                if (doValidateCookiesAllowed && isCookiesAllowed) {
                    ToggleDisplayFailedPassed('cookies', lblEnable); //On affiche les résultats des tests
                }

                if(doValidatePopupAllowed && this.isPopupAllowed(isCookiesAllowed))
                {
                    ToggleDisplayFailedPassed('popup-blocker', lblEnable); //On affiche les résultats des tests
                }

                if(this.ieUserAgent.isIE()) //Est-ce un fureteur IE
                {
                    //Si IE on vérifie la version
                    if(this.ieUserAgent.version >= minIEVersion)
                    {
                        ToggleDisplayFailedPassed('browser-detect', ''); //On affiche les résultats des tests
                    }
                }
                else
                {
                    var browserName = BrowserDetect.browser;
                    var browserVersion = BrowserDetect.version;
                    if ((browserName == "Firefox" && browserVersion >= minFirefoxVersion) || browserName == "Chrome" && browserVersion >= minChromeVersion) {
                        //Les autre fureteur Pas IE on passe
                        ToggleDisplayFailedPassed('browser-detect', ''); //On affiche les résultats des tests
                    }
                }

                //Si c'est IE on verifie si le mode compatible est ON
                if (!this.ieUserAgent.isCompatibilityModeEnable)
                {
                    ToggleDisplayFailedPassed('ie-compatibilityMode', lblEnable); //On affiche les résultats des tests
                }

                //Disabled popup-blocker test by removing the Check CSS Class
                if (!doValidatePopupAllowed) {
                    RemoveValidation("popup-blocker");
                }
                if (!doValidateCookiesAllowed) {
                    RemoveValidation("cookies");
                }

                //Si nous ne devons pas afficher les résultats des tests "Reussi"
                if (doDisplayPassedTests) {
                    $(".check-statement-passed").each(function(index) {
                        $(this).show();
                    });
                }
                 else {
                    $(".check-statement-passed").each(function(index) {
                        $(this).hide();
                    });
                }
      
                //On affiche les problemes
                isBrowserValid = true;
                $(".check-statement-failed").each(function (index) {
                    isBrowserValid = false;
                    $(this).show();
                });
            }

            return isBrowserValid;
        };

    // stuff todo when window is loaded (after images)
     MyBrowser.prototype.IsBrowserValidOnInitWindowLoaded = function() {
    //   this.initMyBrowserData();
    //  this.initPageTracker();
    //  this.initPluginVersions();
        return true;
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

    MyBrowser.prototype.isPopupAllowed = function(isCookiesAllowed) 
    {
        var isPopupAllowed = getCookie("isPopupAllowed");
        //Si retourne vide c'est soit que les cookies sont Disabled on pas créés
        isPopupAllowed = (isPopupAllowed == '') ? false : isPopupAllowed;

        //On refait le check tant que les popups ne sont pas accepté
        if (!isPopupAllowed) {
            try {
                var myTest = window.open("about:blank", "", "height=100,width=100");
                myTest.document.write("Popup are allowed");
                if (myTest) {
                    setTimeout(function() { myTest.close(); }, 1000);
                    isPopupAllowed = true;
                }
            } catch(err) {
                isPopupAllowed = false;
            }

            //pour ne pas refaire le check de popup on sauvegarde la valeur
            if (isCookiesAllowed) {
                createCookie("isPopupAllowed", isPopupAllowed, 1);
            }
        }


        return isPopupAllowed;
    };


    MyBrowser.prototype.isJavascriptEnable = function() {
      return true;
    };


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

    MyBrowser.prototype.isCookiesAllowed = function() 
    {
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;
        if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled)
        { 
            document.cookie="testcookie";
            cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
        }
        return (cookieEnabled);
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
function IsSiteRequirementValid() 
{
//    $("#browser-detect").hide();
//    $("#popup-blocker-check").hide();
//    $("#ie-compatibilityMode-enable-check").hide();
    $(".check-statement").each(function (index) {
        $(this).hide();
    });


    var isBrowserValid = my_browser.IsBrowserValidOnInitDomLoaded();
    
    if (isBrowserValid)
        isBrowserValid = my_browser.IsBrowserValidOnInitWindowLoaded();
 
    return isBrowserValid;
}


function RemoveValidation(pstrElementName) {
    //On affiche seulement les tests en erreur
    $('#' + pstrElementName + '-enable-check').removeClass("check-statement-failed check-statement-passed");
    $('#data-' + pstrElementName + '-enable-detect').removeClass("failed-condition passed-condition");
    $('#bullet-' + pstrElementName + '-enable-detect').removeClass("bullet-failed-condition bullet-passed-condition");
}


//Affiche les errors en mode Failed ou Passed
function ToggleDisplayFailedPassed(pstrElementName, pstrDataTxt) {
    //On affiche seulement les tests en erreur
    $('#' + pstrElementName + '-enable-check').toggleClass("check-statement-failed check-statement-passed");
    $('#data-' + pstrElementName + '-enable-detect').text(pstrDataTxt).toggleClass("failed-condition passed-condition");
    $('#bullet-' + pstrElementName + '-enable-detect').toggleClass("bullet-failed-condition bullet-passed-condition");
}


//===================================================
// Cookie functions
//===================================================
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}
//===================================================

//Converti de Prototype.js à jQuery.js
// //prototype.js // Listens for the given event over the entire document http://api.prototypejs.org/dom/document/observe/
// document.observe('dom:loaded', function() {
//   my_browser.initDomLoaded();
// });

// //prototype.js // Listens for the given event over the entire document http://api.prototypejs.org/dom/Event/observe/
// Event.observe(window,"load",function() {
//   my_browser.initWindowLoaded();
// });


