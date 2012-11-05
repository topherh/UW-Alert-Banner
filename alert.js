/*  University of Washington - Alert 2.0 Beta
 *  (c) 2011 Chris Heiland
 *
 *  Script should be included like such:
 * 
 *  <html>
 *  <head>
 *  <title>Page Title</title>
 *  </head>
 *  <body>
 * 
 *  <script type="text/javascript" src="//washington.edu/static/alert.js"></script>
 *  </body>
 *  </html>
 *
 *  Full docs at:
 *  uw.edu/externalaffairs/uwmarketing/toolkits/uw-alert-banner/
 *
 *--------------------------------------------------------------------------*/

var strProto = (window.location.protocol == 'https:') ? 'https://' : 'http://';

// Thanks Dane!
var test_status = window.location.hash.indexOf('alert') === -1 ? 'false' : 'true';
// Allow for local testing
var strDomain = (window.location.hostname == 'localhost') ? 'localhost' : 'www.washington.edu/static';
var strDataFeed = '/UW-Alert-Banner/alert/?c=displayAlert&test='+test_status

var strScript = document.createElement('script');
strScript.setAttribute('src', strProto + strDomain + strDataFeed);
document.getElementsByTagName('head')[0].appendChild(strScript); 

// displayAlert - grab content to display message 
function displayAlert(objAlertData)
{
    // Just in case w.com delivers us something bad
    // or We don't care if there's nothing
    if ((!objAlertData) || (objAlertData.found == 0))
        return false;

    // Alert colors
    arrAlertTypes = {
        'red-alert-urgent' : 'uwalert-red',
        'orange-alert'     : 'uwalert-orange',
        'steel-alert-fyis' : 'uwalert-steel'
    };

    for (strCategory in objAlertData.posts[0].categories ) 
    {
        if ( window.location.hash.indexOf('uwalert') != -1 )
            var strTestAlertColor = window.location.hash.replace('#','');

        var objCategory = objAlertData.posts[0].categories[strCategory];
        // Quick way to determine color
        if ((arrAlertTypes[objCategory.slug]) || strTestAlertColor)
        {
            var strAlertTitle  = objAlertData.posts[0].title;
            var strAlertLink   = 'http://emergency.washington.edu/';
            var strAlertMessage = objAlertData.posts[0].excerpt;
            var strAlertColor = arrAlertTypes[objCategory.slug] ? arrAlertTypes[objCategory.slug] : strTestAlertColor;
        }

    }
    // Banners must have an actual color
    if (strAlertColor)
    {
        addElement(strAlertTitle,strAlertLink,strAlertColor,strAlertMessage);
    }
}

// addElement - display HTML on page right below the body page
// don't want the alert to show up randomly
function addElement(strAlertTitle,strAlertLink,strAlertColor,strAlertMessage)
{
    // Grab the tag to start the party
    var bodyTag = document.getElementsByTagName('body')[0];

    bodyTag.style.margin = '0px';
    bodyTag.style.padding = '0px';
    bodyTag.className += ' uw-alert';

    var wrapperDiv = document.createElement('div');
    wrapperDiv.setAttribute('id','uwalert-alert-message');
    wrapperDiv.setAttribute('class', strAlertColor);

    var alertBoxTextDiv = document.createElement('div');

    var header1 = document.createElement('h1');
    var header1Text = document.createTextNode(strAlertTitle);
    header1.appendChild(header1Text);

    var alertTextP = document.createElement('p');

    var div = document.createElement("div");
    div.innerHTML = strAlertMessage;
    // Strip out html that wordpress.com gives us
    var alertTextMessage = div.textContent || div.innerText || "";
    // Build alert text node and cut of max characters
    var alertText = document.createTextNode(
    alertTextMessage.substring(0,360) + 
        (alertTextMessage.length >= 360 ? '... ' : ' ')
    );
    alertTextP.appendChild(alertText);

    var alertLink = document.createElement('a');
    alertLink.setAttribute('href', strAlertLink);
    alertLink.setAttribute('title', strAlertTitle);
    var alertLinkText = document.createTextNode('More Info');
    alertLink.appendChild(alertLinkText);

    // Start Building the Actual Div
    alertTextP.appendChild(alertLink);

    alertBoxTextDiv.appendChild(header1);
    alertBoxTextDiv.appendChild(alertTextP);

    wrapperDiv.appendChild(alertBoxTextDiv);

    bodyTag.insertBefore(wrapperDiv, bodyTag.firstChild);
} 

// Code contributed by Dustin Brewer
var strCSS = document.createElement('link');
strCSS.setAttribute('href', strProto + strDomain + '/UW-Alert-Banner/uwalert.css');
strCSS.setAttribute('rel','stylesheet');
strCSS.setAttribute('type','text/css');
document.getElementsByTagName('head')[0].appendChild(strCSS);

