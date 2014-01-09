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
// TODO - Definir si la librairie devrait elle même poussé les messages et la structure HTML
// plutot que de dépendre d'un fichier "html/aspx" container.

if (top != self) { top.location = location; }

(function() {
    var MyBrowser;

    var labelDisabled = (typeof lblDisable != 'undefined')? lblDisable : 'Disabled';
    var labelEnabled = (typeof lblEnable != 'undefined')? lblEnable : 'Enabled';

    //Verif selon les variables systèmes
    var doValidateBrowserVersion = true;
    var doValidateSupportedBrowser = true;
    var doValidateIECompatibilityMode = true;
    var doValidateJavascript =  (typeof window.javaScriptEnabled != 'undefined' && window.javaScriptEnabled)? true : false;
    var doValidatePopupAllowed = (typeof popUpBlockerDisabled != 'undefined' && popUpBlockerDisabled)? true : false;
    var doValidateCookiesAllowed = (typeof cookieEnabled != 'undefined' && cookieEnabled)? true : false;
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
            var isBrowserValid = (!doValidateJavascript)? true : false;// si on ne valide pas le JS on ne valide donc rien.  donc tout est ok
            //=======================================================================
            //Verification si Javascript est activé
            if (doValidateJavascript && this.isJavascriptEnable())
            {
                ToggleDisplayFailedPassed('javascript-enable', labelEnabled); //On affiche les résultats des tests

                var isCookiesAllowed = this.isCookiesAllowed();

                //=======================================================================
                //Verification des cookies
                if (doValidateCookiesAllowed && isCookiesAllowed) {
                    ToggleDisplayFailedPassed('cookies-enable', labelEnabled); //On affiche les résultats des tests
                }

                //=======================================================================
                //Verification des popups
                if(doValidatePopupAllowed && this.isPopupAllowed(isCookiesAllowed))
                {
                    ToggleDisplayFailedPassed('popup-blocker-enable', labelEnabled); //On affiche les résultats des tests
                }

                //=======================================================================
                //==== Verification des fureteurs
                this.initBrowserDetection(); // Determine le fureteur utilise
                var browserName = BrowserDetect.browser.toUpperCase();
                var browserVersion = BrowserDetect.version;
                if (doValidateSupportedBrowser && (browserName == "EXPLORER" || browserName == "FIREFOX" || browserName == "CHROME")) {
                    //Fureteur supporté selement
                    ToggleDisplayFailedPassed('browser-supported', ''); //On affiche les résultats des tests
                } else {
                  doValidateBrowserVersion = false; // on ne valide pas la fersion si le fureteur n'est pas bon
                }

                //=======================================================================
                //Verification de la version du fureteur
                if (doValidateBrowserVersion) {
                    if ((browserName == "EXPLORER" && browserVersion >= minIEVersion) || (browserName == "FIREFOX" && browserVersion >= minFirefoxVersion) || (browserName == "CHROME" && browserVersion >= minChromeVersion)) {
                        //Les autre fureteur Pas IE on passe
                        ToggleDisplayFailedPassed('browser-detect-enable', ''); //On affiche les résultats des tests
                    }
                }

                //=======================================================================
                //Si c'est IE on verifie si le mode compatible est ON (init dans isIE)
                if (this.ieUserAgent.isIE()) {
                    if (doValidateIECompatibilityMode && !this.ieUserAgent.isCompatibilityModeEnable) {
                        ToggleDisplayFailedPassed('ie-compatibilityMode-enable', labelEnabled); //On affiche les résultats des tests
                    }
                }
                else {
                  doValidateIECompatibilityMode = false;
                }

                //=======================================================================
                //Remove MSG by removing the Check CSS Class
                if (!doValidateSupportedBrowser) {
                    RemoveValidation("browser-supported");
                }
                if (!doValidateBrowserVersion) {
                    RemoveValidation("browser-detect-enable");
                }
                if (!doValidateIECompatibilityMode) {
                    RemoveValidation("ie-compatibilityMode-enable");
                }
                if (!doValidatePopupAllowed) {
                    RemoveValidation("popup-blocker-enable");
                }
                if (!doValidateCookiesAllowed) {
                    RemoveValidation("cookies-enable");
                }

                //=======================================================================
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
      
                //=======================================================================
                //On affiche les erreur
                isBrowserValid = true;
                $(".check-statement-failed").each(function (index) {
                    isBrowserValid = false; // si une erreur est présente le fureteur est invalidé
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

    //=======================================================================
    // Browser Detection
    //=======================================================================
    MyBrowser.prototype.initBrowserDetection = function() {
      $('.data-browser-detect').each(function(index) {
        $(this).text(BrowserDetect[$(this).attr('data-browser-detect')]);
      });
    };

    //=======================================================================
    // Popup Detection
    //=======================================================================
    MyBrowser.prototype.isPopupAllowed = function(isCookiesAllowed) 
    {
        var isPopupAllowed = getCookie("isPopupAllowed");
        //Si retourne vide c'est soit que les cookies sont Disabled on pas créés
        isPopupAllowed = (isPopupAllowed == '') ? 'false' : isPopupAllowed;
        //On refait le check tant que les popups ne sont pas accepté
        if (isPopupAllowed == 'false') { //Attention comme provient d'un cookie c'est une string
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
                createCookie("isPopupAllowed", isPopupAllowed, 0);
            }
        }

        return isPopupAllowed;
    };


    //=======================================================================
    // Javascript Detection
    //=======================================================================
    MyBrowser.prototype.isJavascriptEnable = function() {
      return true;
    };


    //=======================================================================
    // IE Version and Compatibility mode detection
    //=======================================================================
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

    //=======================================================================
    // Cookies Detection
    //=======================================================================
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

}).call();

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

//=======================================================================
// Remove CSS validation class
//=======================================================================
function RemoveValidation(pstrElementName) {
    //On affiche seulement les tests en erreur
    $('#' + pstrElementName + '-check').removeClass("check-statement-failed check-statement-passed");
    $('#data-' + pstrElementName + '-detect').removeClass("failed-condition passed-condition");
    $('#bullet-' + pstrElementName + '-detect').removeClass("bullet-failed-condition bullet-passed-condition");
}

//=======================================================================
// Affiche les errors en mode Failed ou Passed
//=======================================================================
function ToggleDisplayFailedPassed(pstrElementName, pstrDataTxt) {
    //On affiche seulement les tests en erreur
    $('#' + pstrElementName + '-check').toggleClass("check-statement-failed check-statement-passed");
    $('#data-' + pstrElementName + '-detect').text(pstrDataTxt).toggleClass("failed-condition passed-condition");
    $('#bullet-' + pstrElementName + '-detect').toggleClass("bullet-failed-condition bullet-passed-condition");
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


