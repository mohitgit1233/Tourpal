window.onload = function() {
      sessionStorage.removeItem('is_logged_in');
      sessionStorage.removeItem('logged_in_email');
      sessionStorage.removeItem('logged_in_password');
      sessionStorage.removeItem('user_type');

      
      console.log("all removed")
    window.location.href = `/public/templates/landing-page.html`

    
  }