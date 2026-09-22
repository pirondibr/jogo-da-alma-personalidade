/* Google Analytics + Microsoft Clarity — Jogo da Alma */
(function () {
  var GA_ID = "G-032VPYGRHH";
  var CLARITY_ID = "ymfbbtqecc";

  // Google Analytics (gtag.js)
  var ga = document.createElement("script");
  ga.async = true;
  ga.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
  document.head.appendChild(ga);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_ID);

  // Microsoft Clarity
  (function (c, l, a, r, i, t, y) {
    c[a] =
      c[a] ||
      function () {
        (c[a].q = c[a].q || []).push(arguments);
      };
    t = l.createElement(r);
    t.async = 1;
    t.src = "https://www.clarity.ms/tag/" + i;
    y = l.getElementsByTagName(r)[0];
    y.parentNode.insertBefore(t, y);
  })(window, document, "clarity", "script", CLARITY_ID);
})();
