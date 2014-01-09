using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Unitas.Web.Base;

namespace Unitas.Web.WebControls.Common
{
    public partial class ucSiteRequirement : BaseUserControl
    {

        protected override void OnLoad(EventArgs e)
        {
            base.OnLoad(e);
            StringBuilder str = new StringBuilder();

            //On crée les variables JAVASCRIPT qui vont servir a faire les tests d'accessibilité
            // au fureteur
            foreach (var opt in GetListOption("CompatibilityComponentsDynForm"))
            {
                string[] ele = opt.Code.Split('~');
                if (ele[0].ToUpper().IndexOf("BROWSER") != -1 && ele.Count() > 1)
                {
                    //Si c'est un fureteur on créé un variable pour la version aussi
                    str.AppendLine("var " + ele[0].Replace("-", "") + "=true;");
                    str.AppendLine("var " + ele[0].Replace("-", "") + "_minVersion=" + ele[1] + ";");
                }
                else
                {
                    str.AppendLine("var " + ele[0].Replace("-", "") + "=true;");
                }
            }
            Page.ClientScript.RegisterClientScriptBlock(this.GetType(), "browserCheck", str.ToString(), true);
            // on insere / "Include" les scripts ici pour s'assurer qu'il sont inséré une seul fois meme si le control est présent plusieurs fois 
            Page.ClientScript.RegisterClientScriptInclude(typeof(Page), "application.js", ResolveUrl("~") + "UserControls/Share/Script/application.js");
            Page.ClientScript.RegisterClientScriptInclude(typeof(Page), "browser.js", ResolveUrl("~") + "UserControls/Share/Script/browser.js");
        }

    }
}