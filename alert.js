/*  University of Washington - Alert 1.0 Beta
 *  (c) 2008 Chris Heiland, Tim Chang-Miller
 *
 *  Script should be included like such:
 *  
 *  <html>
 *  <head>
 *  <title>Page Title</title>
 *  <script type="text/javascript" src="http://depts.washington.edu/uweb/scripts/alert.js"></script>
 *  </head>
 *  <body>
 *  
 *  <script type="text/javascript">
 *  	getMessage();
 *  </script>
 *  </body>
 *  </html>
 *
 *--------------------------------------------------------------------------*/

/*
 * Include our javascript object script, the wonderful Prototype... and friends
 *---------------------------*/
 
// getCookie - Stolen from the tubes, grab cookie by name
function getCookie(cookieName)
{
    var arrResults = document.cookie.match ( '(^|;) ?' + cookieName + '=([^;]*)(;|$)' );

    if ( arrResults )
        return ( unescape ( arrResults[2] ) );
    else
        return null;
}

function AJ()
{
	var obj;
	if (window.XMLHttpRequest)
        obj = new XMLHttpRequest();
	else if (window.ActiveXObject)
    {
		try
        {
			obj = new ActiveXObject('MSXML2.XMLHTTP.3.0');
		}
		catch(er)
        {
			try
            {
				obj = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch(er)
            {
				obj = false;
			}
		}
	}
	return obj;
}

function isThere(strURL)
{
	var req = new AJ(); // XMLHttpRequest object
	try
    {
		req.open("HEAD", strURL, false);
		req.send(null);
		return req.status == 200 ? true : false;
	}
	catch (er)
    {
		return false;
	}
}

// Dynamically set the next either from category or another method
var strAlert = getCookie('uwalertcolor') == 'red' ? 'red' : 'orange';

// Don't output the stylesheet if the alert box was closed
// || FileNoExists(RSS Feed)  // Maybe do a OR statement here as we don't always want to set a cookie
if ( !getCookie('uwalerthide') && isThere('http://staff.washington.edu/cheiland/alert/emergency'))
{
    // If the file does not exist - then don't show
    
    // Might have to do some additional work here
    // Probably less effecient but much easier to read
    // -------
    // What do we do for the 98% of the time when the cookie is not set and there is no RSS items?
    document.write('<scr' + 'ipt type="text\/javascript" src="prototype.js"><\/script>' +
    '<scr' + 'ipt type="text\/javascript" src="scriptaculous.js?load=effects"><\/script>' +
    '<scr' + 'ipt type="text\/javascript" src="emergency.js"><\/script>');

    var strStyle = strAlert == 'red' ? 'uwalert_red.css' : 'uwalert_orange.css';
    document.write('<link href="'+ strStyle +'" rel="stylesheet" type="text\/css" \/>' +
    '<sty' + 'le type="text\/css"><!-- body { margin: 0; padding: 0; } --><\/style>');
}
else
{
    function displayAlert()
    {
        // Does nothing - for error prevention
    }   
}