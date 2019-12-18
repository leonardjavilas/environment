//load Google Fonts asynchronously 
$(document).ready(function () {
  WebFontConfig = {
    google: {
      families: ['Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i', 'Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i']
    }
  };
  (function () {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();

});