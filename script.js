<!-- ============================ script.js ============================ -->
<script id="file-script.js">
// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('nav-menu');
if (navToggle && navMenu) {
navToggle.addEventListener('click', () => {
const open = navMenu.classList.toggle('open');
navToggle.setAttribute('aria-expanded', String(open));
});
}


// Footer year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();
</script>

