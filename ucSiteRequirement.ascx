<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ucSiteRequirement.ascx.cs" Inherits="Unitas.Web.WebControls.Common.ucSiteRequirement" %>


<script src="<%= ResolveUrl("~") %>/UserControls/Share/Script/application.js" type="text/javascript"></script>
<script src="<%= ResolveUrl("~") %>/UserControls/Share/Script/browser.js" type="text/javascript"></script>

<style>
    .failed-condition
    {
	    color : red;	
    }

    .hide
    {   
	    /* Permet de cacher meme si javascript est désactivé */
	    display : none;
    }
</style>
<div id="SiteRequirementCheck" class="clearfix">
	<!--Based On : <A HREF="http://detectmybrowser.com/">detectmybrowser.com</A> -->
     
      <div id="javascript-enable-check" class="check-statement check-statement-failed javascript-enable-check">
       <ul id="bullet-javascript-enable-detect" class="bullet-failed-condition"><li>Javascript is <span id="data-javascript-enable-detect" class="data-javascript-enable-detect failed-condition">Disables</span>.</li></ul>
     </div>
<!--
     <div id="popup-blocker-check" class="check-statement check-statement-failed popup-blocker-check hide">
       <ul id="bullet-popup-blocker-detect" class="bullet-failed-condition"><li>Popup are <span id="data-popup-blocker-detect" class="failed-condition">Blocked</span>.</li></ul>
     </div>
-->
     <div id="browser-detect-enable-check" class="check-statement check-statement-failed browser-detect hide">
       <ul id="bullet-browser-detect-enable-check" class="bullet-failed-condition"><li id="data-browser">You're using <span data-browser-detect="browser" class="data-browser-detect">browser</span> version <span data-browser-detect="version" class="data-browser-detect">1</span>
       on <span data-browser-detect="OS" class="data-browser-detect">Operating System</span></li></ul>
     </div>

      <div id="ie-compatibilityMode-enable-check" class="check-statement check-statement-failed ie-compatibilityMode-enable-check hide">
       <ul id="bullet-ie-compatibilityMode-enable-detect" class="bullet-failed-condition"><li>IE Compatibility Mode is <span id="data-ie-compatibilityMode-enable-detect" class="data-ie-compatibilityMode-enable-detect failed-condition">Enabled</span>.</li></ul>
     </div>
</div>