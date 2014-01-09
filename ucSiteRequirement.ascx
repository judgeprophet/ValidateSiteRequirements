<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ucSiteRequirement.ascx.cs" Inherits="Unitas.Web.WebControls.Common.ucSiteRequirement" %>
<style>
/* TODO attention car un UserControl peut etre placer plus d'une fois dans une page*/    
/* TODO ce qui aurait pour effet de répéter ce CSS plusieurs fois */
    .failed-condition
    {
	    color : red;	
    }

    .passed-condition
    {
	    color : green;	
    }

    .hide
    {   
	    /* Permet de cacher meme si javascript est désactivé */
	    display : none;
    }
</style>
<script type="text/javascript">
   var lblDisable = '[[ucSiteRequirement.ascx:Disabled]]';
   var lblEnable = '[[ucSiteRequirement.ascx:Enabled]]';
</script>
<div id="SiteRequirementCheck" class="clearfix">
	<!--Based On : <A HREF="http://detectmybrowser.com/">detectmybrowser.com</A> -->
     
      <div id="javascript-enable-check" class="check-statement check-statement-failed javascript-enable-check">
       <ul id="bullet-javascript-enable-detect" class="bullet-failed-condition"><li>[[ucSiteRequirement.ascx:lblJavascriptIs]] <span id="data-javascript-enable-detect" class="data-javascript-enable-detect failed-condition">[[ucSiteRequirement.ascx:Disabled]]</span>.</li></ul>
     </div>

     <div id="cookies-enable-check" class="check-statement check-statement-failed cookies-enable-check hide">
       <ul id="bullet-cookies-enable-detect" class="bullet-failed-condition"><li>[[ucSiteRequirement.ascx:lblCookiesAre]] <span id="data-cookies-enable-detect" class="failed-condition">[[ucSiteRequirement.ascx:Disabled]]</span>.</li></ul>
     </div>

     <div id="popup-blocker-enable-check" class="check-statement check-statement-failed popup-blocker-enable-check hide">
       <ul id="bullet-popup-blocker-enable-detect" class="bullet-failed-condition"><li>[[ucSiteRequirement.ascx:lblPopupsAre]]  <span id="data-popup-blocker-enable-detect" class="failed-condition">[[ucSiteRequirement.ascx:Disabled]]</span>.</li></ul>
     </div>

     <div id="browser-supported-check" class="check-statement check-statement-failed browser-supported-check hide">
       <ul id="bullet-browser-supported-detect" class="bullet-failed-condition"><li>[[ucSiteRequirement.ascx:lblBrowserNotSupported]]</li></ul>
     </div>

     <div id="browser-detect-enable-check" class="check-statement check-statement-failed browser-detect-enable-check hide">
       <ul id="bullet-browser-detect-enable-detect" class="bullet-failed-condition"><li id="data-browser">[[ucSiteRequirement.ascx:lblBrowserIs]]</li></ul>
     </div>

      <div id="ie-compatibilityMode-enable-check" class="check-statement check-statement-failed ie-compatibilityMode-enable-check hide">
       <ul id="bullet-ie-compatibilityMode-enable-detect" class="bullet-failed-condition"><li>[[ucSiteRequirement.ascx:lblCompatibilityModeIs]] <span id="data-ie-compatibilityMode-enable-detect" class="data-ie-compatibilityMode-enable-detect failed-condition">[[ucSiteRequirement.ascx:Enabled]]</span>.</li></ul>
     </div>
</div>