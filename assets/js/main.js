/**
* Template Name: Bikin - v2.2.1
* Template URL: https://bootstrapmade.com/bikin-free-simple-landing-page-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function($) {
  "use strict";

  const backendURL = "https://suspicious-url-detection.onrender.com/predict"; // Backend API URL

  $(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });

  $(document).on('submit', '#urlForm', function(e) {
    e.preventDefault();  // Prevent default form submission

    let urlInput = $('#urlInput').val().trim();

    if (!/^https?:\/\/.+/.test(urlInput)) {
      $('#result').html("<span style='color:red;'>❌ Enter a valid URL (must start with http:// or https://)</span>");
      return;
    }

    $('#result').html("🔍 Checking...");

    // Send request to Flask backend
    fetch(backendURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: urlInput })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      let resultText = data.prediction === 1
        ? `<span style="color:green;">✅ This is a Genuine URL</span>`
        : `<span style="color:red;">⚠️ This is a Phishing URL</span>`;
      $('#result').html(resultText);
    })
    .catch(error => {
      console.error("Fetch Error:", error);
      $('#result').html("<span style='color:red;'>🚨 Failed to connect to the server. Try again later.</span>");
    });
  });

  // Other existing JavaScript functionalities remain unchanged...

})(jQuery);
