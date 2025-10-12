 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/script.js b/script.js
new file mode 100644
index 0000000000000000000000000000000000000000..ce21bd73f6422bb6dbc79fec901a240b4223af74
--- /dev/null
+++ b/script.js
@@ -0,0 +1,1006 @@
+(() => {
+  const FALLBACK_STYLE_ID = "fallback-styles-inline";
+  const FALLBACK_CSS = `:root {
+  --bg: #0f172a;
+  --bg-alt: #0b1120;
+  --accent: #facc15;
+  --accent-dark: #d4af0b;
+  --text: #0f172a;
+  --muted: #5b6783;
+  --surface: #ffffff;
+  --border: #e2e8f0;
+  --shadow: 0 20px 45px rgba(15, 23, 42, 0.12);
+  --radius-lg: 32px;
+  --radius-md: 16px;
+  --radius-sm: 12px;
+  font-family: "Manrope", sans-serif;
+}
+
+* {
+  box-sizing: border-box;
+  margin: 0;
+  padding: 0;
+}
+
+body {
+  font-family: "Manrope", system-ui, -apple-system, BlinkMacSystemFont,
+    "Segoe UI", sans-serif;
+  color: var(--text);
+  background-color: #f8fafc;
+  line-height: 1.6;
+}
+
+img {
+  max-width: 100%;
+  display: block;
+}
+
+a {
+  color: inherit;
+  text-decoration: none;
+}
+
+a:hover {
+  text-decoration: underline;
+}
+
+.container {
+  width: min(1100px, 92vw);
+  margin: 0 auto;
+}
+
+.topbar {
+  background: rgba(15, 23, 42, 0.92);
+  color: #e2e8f0;
+  position: sticky;
+  top: 0;
+  z-index: 10;
+  backdrop-filter: blur(14px);
+}
+
+.topbar .container {
+  display: flex;
+  align-items: center;
+  justify-content: space-between;
+  padding: 18px 0;
+}
+
+.topbar nav {
+  display: flex;
+  gap: 1.5rem;
+  font-weight: 600;
+}
+
+.topbar nav a {
+  color: rgba(226, 232, 240, 0.9);
+  transition: color 0.2s ease;
+}
+
+.topbar nav a:hover {
+  color: #ffffff;
+}
+
+.topbar .cta {
+  padding: 0.55rem 1.25rem;
+  background: var(--accent);
+  color: #1f2937;
+  border-radius: 999px;
+  transition: transform 0.2s ease, box-shadow 0.2s ease;
+}
+
+.topbar .cta:hover {
+  box-shadow: 0 8px 20px rgba(250, 204, 21, 0.35);
+  transform: translateY(-2px);
+}
+
+.brand {
+  display: inline-flex;
+  align-items: center;
+  font-weight: 700;
+  gap: 0.4rem;
+  font-size: 1.1rem;
+}
+
+.brand-icon {
+  font-size: 1.4rem;
+}
+
+.hero {
+  background: linear-gradient(135deg, var(--bg) 0%, var(--bg-alt) 100%);
+  color: #f8fafc;
+  padding: 120px 0 100px;
+}
+
+.hero-content {
+  display: grid;
+  gap: 3rem;
+  align-items: center;
+  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
+}
+
+.hero-text h1 {
+  font-size: clamp(2.5rem, 3vw + 1.5rem, 3.6rem);
+  line-height: 1.1;
+  margin-bottom: 1rem;
+}
+
+.hero-text p {
+  font-size: 1.1rem;
+  color: rgba(226, 232, 240, 0.8);
+}
+
+.hero-actions {
+  display: flex;
+  flex-wrap: wrap;
+  gap: 1rem;
+  margin-top: 2.2rem;
+}
+
+.btn {
+  display: inline-flex;
+  align-items: center;
+  justify-content: center;
+  font-weight: 600;
+  border-radius: 999px;
+  padding: 0.8rem 1.8rem;
+  border: none;
+  cursor: pointer;
+  transition: transform 0.2s ease, box-shadow 0.2s ease;
+}
+
+.btn.primary {
+  background: var(--accent);
+  color: var(--text);
+}
+
+.btn.secondary {
+  background: #1d4ed8;
+  color: #ffffff;
+}
+
+.btn.ghost {
+  background: transparent;
+  border: 1px solid rgba(248, 250, 252, 0.4);
+  color: #f8fafc;
+}
+
+.btn.ghost:hover {
+  background: rgba(15, 23, 42, 0.2);
+  transform: translateY(-2px);
+}
+
+.btn.primary:hover,
+.btn.secondary:hover {
+  transform: translateY(-2px);
+  box-shadow: 0 16px 30px rgba(15, 23, 42, 0.16);
+}
+
+.stats {
+  display: grid;
+  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
+  gap: 1.2rem;
+  margin-top: 3rem;
+}
+
+.stats div {
+  background: rgba(15, 23, 42, 0.3);
+  padding: 1rem 1.4rem;
+  border-radius: var(--radius-md);
+  backdrop-filter: blur(6px);
+  border: 1px solid rgba(248, 250, 252, 0.12);
+}
+
+.stat-value {
+  font-size: 1.8rem;
+  font-weight: 700;
+  display: block;
+}
+
+.stat-label {
+  font-size: 0.95rem;
+  color: rgba(226, 232, 240, 0.75);
+}
+
+.hero-card {
+  background: rgba(15, 23, 42, 0.8);
+  padding: 2.4rem;
+  border-radius: var(--radius-lg);
+  box-shadow: 0 25px 60px rgba(15, 23, 42, 0.45);
+  border: 1px solid rgba(248, 250, 252, 0.12);
+}
+
+.hero-card h2 {
+  font-size: 1.7rem;
+  margin-bottom: 1.5rem;
+}
+
+.hero-card ul {
+  list-style: none;
+  display: grid;
+  gap: 0.8rem;
+  color: rgba(226, 232, 240, 0.85);
+  margin-bottom: 2rem;
+}
+
+.hero-card li::before {
+  content: "";
+  width: 10px;
+  height: 10px;
+  border-radius: 50%;
+  background: var(--accent);
+  display: inline-block;
+  margin-right: 0.6rem;
+  vertical-align: middle;
+}
+
+.card-footer {
+  display: flex;
+  justify-content: space-between;
+  align-items: center;
+  gap: 1rem;
+  font-weight: 600;
+  flex-wrap: wrap;
+}
+
+.status {
+  color: rgba(248, 250, 252, 0.75);
+}
+
+.callout {
+  background: #f1f5f9;
+  color: var(--bg);
+  padding: 0.4rem 0.9rem;
+  border-radius: 999px;
+}
+
+.section {
+  padding: 90px 0;
+}
+
+.section-header {
+  text-align: center;
+  margin-bottom: 3.5rem;
+}
+
+.section-header h2 {
+  font-size: clamp(2rem, 1.2vw + 1.8rem, 2.6rem);
+  margin-bottom: 1rem;
+  color: var(--bg);
+}
+
+.section-header p {
+  color: var(--muted);
+  font-size: 1.05rem;
+}
+
+.service-grid {
+  display: grid;
+  gap: 1.6rem;
+  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
+}
+
+.service-card {
+  background: var(--surface);
+  padding: 2.2rem;
+  border-radius: var(--radius-md);
+  box-shadow: var(--shadow);
+  border: 1px solid rgba(226, 232, 240, 0.6);
+  transition: transform 0.2s ease, box-shadow 0.2s ease;
+}
+
+.service-card:hover {
+  transform: translateY(-6px);
+  box-shadow: 0 30px 65px rgba(15, 23, 42, 0.18);
+}
+
+.service-card .icon {
+  width: 48px;
+  height: 48px;
+  border-radius: 14px;
+  display: grid;
+  place-items: center;
+  font-size: 1.8rem;
+  background: rgba(250, 204, 21, 0.15);
+  color: #a16207;
+  margin-bottom: 1.4rem;
+}
+
+.service-card h3 {
+  font-size: 1.35rem;
+  margin-bottom: 0.8rem;
+  color: var(--bg);
+}
+
+.service-card p {
+  color: var(--muted);
+}
+
+.section.accent {
+  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
+}
+
+.features {
+  display: grid;
+  gap: 2.4rem;
+  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
+}
+
+.features article {
+  background: rgba(255, 255, 255, 0.85);
+  padding: 2.2rem;
+  border-radius: var(--radius-md);
+  border: 1px solid rgba(148, 163, 184, 0.35);
+  box-shadow: 0 18px 40px rgba(148, 163, 184, 0.26);
+}
+
+.features h3 {
+  font-size: 1.3rem;
+  margin-bottom: 1rem;
+  color: var(--bg);
+}
+
+.features p {
+  color: #475569;
+}
+
+.quick-stats {
+  display: grid;
+  gap: 1.5rem;
+  margin-top: 3rem;
+  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
+}
+
+.quick-stats article {
+  background: var(--surface);
+  border-radius: var(--radius-md);
+  padding: 1.8rem;
+  border: 1px solid rgba(226, 232, 240, 0.6);
+  box-shadow: var(--shadow);
+}
+
+.quick-stats h4 {
+  font-size: 2rem;
+  margin-bottom: 0.5rem;
+  color: var(--bg);
+}
+
+.quick-stats p {
+  color: var(--muted);
+}
+
+.projects {
+  display: grid;
+  gap: 1.8rem;
+  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
+}
+
+.project-card {
+  background: var(--surface);
+  border-radius: var(--radius-md);
+  overflow: hidden;
+  box-shadow: var(--shadow);
+  border: 1px solid rgba(226, 232, 240, 0.6);
+}
+
+.project-card img {
+  height: 200px;
+  width: 100%;
+  object-fit: cover;
+}
+
+.project-card .content {
+  padding: 1.6rem;
+}
+
+.project-card h3 {
+  font-size: 1.25rem;
+  margin-bottom: 0.6rem;
+  color: var(--bg);
+}
+
+.project-card p {
+  color: var(--muted);
+}
+
+.booking {
+  display: grid;
+  gap: 2.5rem;
+  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
+}
+
+.panel {
+  background: var(--surface);
+  border-radius: var(--radius-lg);
+  padding: 2.4rem;
+  box-shadow: var(--shadow);
+  border: 1px solid rgba(226, 232, 240, 0.65);
+}
+
+.panel h3 {
+  font-size: 1.5rem;
+  margin-bottom: 1.5rem;
+  color: var(--bg);
+}
+
+.panel p {
+  color: var(--muted);
+}
+
+form {
+  display: grid;
+  gap: 1.3rem;
+}
+
+label {
+  font-weight: 600;
+  color: var(--bg);
+  display: block;
+  margin-bottom: 0.45rem;
+}
+
+input,
+select,
+textarea {
+  width: 100%;
+  padding: 0.85rem 1rem;
+  border-radius: var(--radius-sm);
+  border: 1px solid rgba(148, 163, 184, 0.45);
+  font: inherit;
+  transition: border-color 0.2s ease, box-shadow 0.2s ease;
+}
+
+input:focus,
+select:focus,
+textarea:focus {
+  border-color: var(--accent);
+  outline: none;
+  box-shadow: 0 0 0 4px rgba(250, 204, 21, 0.2);
+}
+
+.form-row {
+  display: grid;
+  gap: 1.2rem;
+  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
+}
+
+.helper {
+  color: var(--muted);
+  font-size: 0.95rem;
+  margin-top: 0.3rem;
+}
+
+.error {
+  color: #dc2626;
+  font-size: 0.92rem;
+  margin-top: 0.3rem;
+  min-height: 1em;
+}
+
+.invalid {
+  border-color: #dc2626;
+}
+
+.invalid:focus {
+  box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.18);
+}
+
+.summary-card {
+  display: grid;
+  gap: 1.8rem;
+}
+
+.summary-list {
+  list-style: none;
+  display: grid;
+  gap: 1rem;
+}
+
+.summary-list li {
+  display: flex;
+  justify-content: space-between;
+  align-items: center;
+  border-bottom: 1px dashed rgba(148, 163, 184, 0.45);
+  padding-bottom: 0.6rem;
+  color: var(--muted);
+}
+
+.summary-list span:last-child {
+  color: var(--bg);
+  font-weight: 600;
+}
+
+#confirmation {
+  background: rgba(15, 23, 42, 0.04);
+  padding: 1rem 1.2rem;
+  border-radius: var(--radius-sm);
+  border: 1px solid rgba(148, 163, 184, 0.35);
+  color: var(--bg);
+}
+
+#confirmation ul {
+  margin-top: 0.7rem;
+  padding-left: 1.4rem;
+  display: grid;
+  gap: 0.4rem;
+}
+
+#confirmation li {
+  color: var(--muted);
+}
+
+.alert {
+  background: rgba(250, 204, 21, 0.15);
+  border: 1px solid rgba(250, 204, 21, 0.5);
+  color: #92400e;
+  padding: 1rem 1.2rem;
+  border-radius: var(--radius-sm);
+  margin-bottom: 1.2rem;
+}
+
+.alert strong {
+  display: block;
+  margin-bottom: 0.3rem;
+}
+
+.payment-steps {
+  list-style: none;
+  display: grid;
+  gap: 0.9rem;
+}
+
+.payment-steps li {
+  display: flex;
+  align-items: flex-start;
+  gap: 0.75rem;
+  color: var(--muted);
+}
+
+.payment-steps strong {
+  display: inline-flex;
+  align-items: center;
+  justify-content: center;
+  width: 32px;
+  height: 32px;
+  border-radius: 50%;
+  background: var(--bg);
+  color: #f8fafc;
+  font-weight: 700;
+}
+
+.testimonial {
+  background: var(--surface);
+  border-radius: var(--radius-md);
+  padding: 2.2rem;
+  border: 1px solid rgba(226, 232, 240, 0.6);
+  box-shadow: var(--shadow);
+  display: grid;
+  gap: 1.5rem;
+}
+
+.testimonial blockquote {
+  font-size: 1.1rem;
+  color: var(--bg);
+  line-height: 1.8;
+}
+
+.testimonial cite {
+  color: var(--muted);
+  font-style: normal;
+}
+
+.cta-banner {
+  background: linear-gradient(135deg, var(--bg) 0%, var(--bg-alt) 100%);
+  color: #f8fafc;
+  border-radius: var(--radius-lg);
+  padding: 3.2rem;
+  box-shadow: 0 30px 80px rgba(15, 23, 42, 0.45);
+  display: grid;
+  gap: 2rem;
+  align-items: center;
+  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
+}
+
+.cta-banner h2 {
+  font-size: clamp(2rem, 1.3vw + 1.8rem, 2.8rem);
+  line-height: 1.2;
+}
+
+.cta-banner p {
+  color: rgba(226, 232, 240, 0.75);
+}
+
+.cta-banner .actions {
+  display: flex;
+  flex-wrap: wrap;
+  gap: 1rem;
+}
+
+.cta-banner .actions .btn {
+  min-width: 180px;
+}
+
+.cta-banner .actions .btn.ghost {
+  border-color: rgba(248, 250, 252, 0.6);
+}
+
+.contact {
+  display: grid;
+  gap: 2rem;
+  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
+}
+
+.contact-card {
+  background: var(--surface);
+  border-radius: var(--radius-md);
+  padding: 1.8rem;
+  border: 1px solid rgba(226, 232, 240, 0.6);
+  box-shadow: var(--shadow);
+}
+
+.contact-card h3 {
+  font-size: 1.2rem;
+  margin-bottom: 0.6rem;
+  color: var(--bg);
+}
+
+.contact-card p,
+.contact-card a {
+  color: var(--muted);
+  display: block;
+  margin-bottom: 0.4rem;
+}
+
+.hours {
+  list-style: none;
+  display: grid;
+  gap: 0.4rem;
+}
+
+.hours li {
+  color: var(--muted);
+}
+
+.footer {
+  background: var(--bg);
+  color: rgba(248, 250, 252, 0.8);
+  padding: 2.4rem 0;
+}
+
+.footer .container {
+  display: grid;
+  gap: 1.4rem;
+  justify-items: center;
+}
+
+.footer nav {
+  display: flex;
+  gap: 1.8rem;
+  flex-wrap: wrap;
+  justify-content: center;
+}
+
+.footer nav a {
+  color: rgba(248, 250, 252, 0.65);
+}
+
+.footer nav a:hover {
+  color: #facc15;
+}
+
+.footer small {
+  color: rgba(248, 250, 252, 0.55);
+}
+
+.toast {
+  position: fixed;
+  bottom: 24px;
+  right: 24px;
+  background: var(--bg);
+  color: #f8fafc;
+  padding: 1rem 1.2rem;
+  border-radius: var(--radius-sm);
+  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.35);
+  display: flex;
+  align-items: center;
+  gap: 0.8rem;
+  transform: translateY(120%);
+  opacity: 0;
+  transition: transform 0.3s ease, opacity 0.3s ease;
+}
+
+.toast.visible {
+  transform: translateY(0);
+  opacity: 1;
+}
+
+.toast button {
+  background: transparent;
+  border: none;
+  color: inherit;
+  cursor: pointer;
+  font-size: 1rem;
+}
+
+.toast button:hover {
+  color: var(--accent);
+}
+
+@media (max-width: 768px) {
+  .topbar nav {
+    display: none;
+  }
+
+  .hero {
+    padding: 100px 0 80px;
+  }
+
+  .hero-card {
+    padding: 2rem;
+  }
+
+  .cta-banner {
+    text-align: center;
+  }
+
+  .cta-banner .actions {
+    justify-content: center;
+  }
+}
+
+@media (max-width: 600px) {
+  .hero-text h1 {
+    font-size: 2.25rem;
+  }
+
+  .hero-card {
+    padding: 1.8rem;
+  }
+
+  .card-footer {
+    flex-direction: column;
+    align-items: flex-start;
+  }
+
+  .section {
+    padding: 70px 0;
+  }
+
+  .toast {
+    left: 50%;
+    right: auto;
+    transform: translate(-50%, 120%);
+  }
+
+  .toast.visible {
+    transform: translate(-50%, 0);
+  }
+}
+
+@media (prefers-reduced-motion: reduce) {
+  *,
+  *::before,
+  *::after {
+    animation-duration: 0.01ms !important;
+    animation-iteration-count: 1 !important;
+    transition-duration: 0.01ms !important;
+    scroll-behavior: auto !important;
+  }
+}
+`;
+
+  function injectFallbackStyles() {
+    if (document.getElementById(FALLBACK_STYLE_ID)) {
+      return;
+    }
+    const style = document.createElement("style");
+    style.id = FALLBACK_STYLE_ID;
+    style.textContent = FALLBACK_CSS;
+    document.head.appendChild(style);
+  }
+
+  function stylesheetHasRules(sheet) {
+    try {
+      return sheet.cssRules && sheet.cssRules.length > 0;
+    } catch (error) {
+      console.warn(
+        "Unable to inspect stylesheet rules directly; assuming the CSS loaded.",
+        error
+      );
+      return true;
+    }
+  }
+
+  function evaluateStylesheet() {
+    const sheets = Array.from(document.styleSheets).filter((sheet) => {
+      if (!sheet.href) {
+        return false;
+      }
+      return sheet.href.includes("styles.css");
+    });
+
+    if (sheets.length === 0) {
+      injectFallbackStyles();
+      return;
+    }
+
+    const hasRules = sheets.some((sheet) => stylesheetHasRules(sheet));
+    if (!hasRules) {
+      injectFallbackStyles();
+    }
+  }
+
+  if (document.readyState === "complete" || document.readyState === "interactive") {
+    setTimeout(evaluateStylesheet, 0);
+  } else {
+    document.addEventListener("DOMContentLoaded", evaluateStylesheet);
+  }
+
+  const stylesheetLink = document.querySelector('link[rel="stylesheet"][href*="styles.css"]');
+  if (stylesheetLink) {
+    stylesheetLink.addEventListener("error", injectFallbackStyles);
+    stylesheetLink.addEventListener("load", () => {
+      setTimeout(evaluateStylesheet, 0);
+    });
+  } else {
+    injectFallbackStyles();
+  }
+})();
+
+const bookingForm = document.getElementById("booking-form");
+const summaryService = document.getElementById("summary-service");
+const summaryDateTime = document.getElementById("summary-datetime");
+const summaryDeposit = document.getElementById("summary-deposit");
+const confirmation = document.getElementById("confirmation");
+const payButton = document.getElementById("pay-button");
+const toast = document.getElementById("toast");
+const toastMessage = document.getElementById("toast-message");
+const toastClose = document.getElementById("toast-close");
+const yearSpan = document.getElementById("year");
+
+const SERVICE_LABELS = {
+  residential: "Residential Construction",
+  commercial: "Commercial Build-Out",
+  remodel: "Remodel or Upgrade",
+  maintenance: "Maintenance / Inspection",
+  emergency: "Emergency Call-Out",
+};
+
+const DEPOSIT_MAP = {
+  residential: 250,
+  commercial: 350,
+  remodel: 225,
+  maintenance: 150,
+  emergency: 185,
+};
+
+const PAYMENT_LINK = "https://example.com/payment"; // Replace with your live payment URL
+
+function formatCurrency(value) {
+  return new Intl.NumberFormat("en-US", {
+    style: "currency",
+    currency: "USD",
+    minimumFractionDigits: 0,
+  }).format(value);
+}
+
+function validateField(field) {
+  const error = bookingForm.querySelector(`.error[data-for="${field.id}"]`);
+  if (!field.checkValidity()) {
+    let message = "This field is required.";
+    if (field.validity.typeMismatch) {
+      message = "Please enter a valid value.";
+    }
+    if (field.validity.patternMismatch) {
+      message = "Please enter a valid phone number.";
+    }
+    error.textContent = message;
+    field.classList.add("invalid");
+    return false;
+  }
+  error.textContent = "";
+  field.classList.remove("invalid");
+  return true;
+}
+
+function updateSummary() {
+  const formData = new FormData(bookingForm);
+  const service = formData.get("service");
+  const date = formData.get("date");
+  const time = formData.get("time");
+
+  summaryService.textContent = service ? SERVICE_LABELS[service] : "—";
+
+  if (date && time) {
+    const formatted = new Date(`${date}T${time}`);
+    const formattedString = formatted.toLocaleString("en-US", {
+      weekday: "short",
+      month: "short",
+      day: "numeric",
+      hour: "numeric",
+      minute: "2-digit",
+    });
+    summaryDateTime.textContent = formattedString;
+  } else {
+    summaryDateTime.textContent = "—";
+  }
+
+  if (service) {
+    const deposit = DEPOSIT_MAP[service];
+    summaryDeposit.textContent = formatCurrency(deposit);
+    payButton.disabled = false;
+    payButton.dataset.deposit = deposit;
+  } else {
+    summaryDeposit.textContent = "$0";
+    payButton.disabled = true;
+    delete payButton.dataset.deposit;
+  }
+}
+
+function showToast(message) {
+  toastMessage.textContent = message;
+  toast.hidden = false;
+  toast.classList.add("visible");
+  setTimeout(() => {
+    toast.classList.remove("visible");
+    toast.hidden = true;
+  }, 4000);
+}
+
+bookingForm.addEventListener("submit", (event) => {
+  event.preventDefault();
+
+  const fields = Array.from(bookingForm.elements).filter(
+    (el) => el.tagName !== "BUTTON"
+  );
+
+  const isValid = fields.every((field) => {
+    if (field.hasAttribute("required")) {
+      return validateField(field);
+    }
+    return true;
+  });
+
+  if (!isValid) {
+    showToast("Please correct the highlighted fields to continue.");
+    return;
+  }
+
+  updateSummary();
+  confirmation.hidden = false;
+  showToast("Reservation received! Use the payment button to finalize.");
+});
+
+bookingForm.addEventListener("input", (event) => {
+  if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement || event.target instanceof HTMLTextAreaElement) {
+    validateField(event.target);
+    updateSummary();
+  }
+});
+
+payButton.addEventListener("click", () => {
+  if (payButton.disabled) {
+    return;
+  }
+
+  const deposit = payButton.dataset.deposit;
+  if (deposit) {
+    window.open(PAYMENT_LINK, "_blank", "noopener");
+    showToast("Payment window opened in a new tab.");
+  }
+});
+
+toastClose.addEventListener("click", () => {
+  toast.classList.remove("visible");
+  toast.hidden = true;
+});
+
+document.addEventListener("click", (event) => {
+  if (event.target instanceof HTMLElement && toast.contains(event.target) === false && !toast.hidden) {
+    toast.classList.remove("visible");
+    toast.hidden = true;
+  }
+});
+
+yearSpan.textContent = new Date().getFullYear();
+
+updateSummary();
 
EOF
)
