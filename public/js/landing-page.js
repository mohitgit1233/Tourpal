// window.onload = function() {
//     is_logged_in = sessionStorage.getItem('is_logged_in');
    
//   if (is_logged_in === "true") {
//     //redirect
//     console.log("user already logged in")
//     window.location.href = `/public/index.html`
//   }
// }

function hello(user_type) {
    sessionStorage.setItem('user_type', user_type);
}