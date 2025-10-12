 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/script.js b/script.js
new file mode 100644
index 0000000000000000000000000000000000000000..385ed9a459a7158cd4437ab9c66150b817f5e3b2
--- /dev/null
+++ b/script.js
@@ -0,0 +1,158 @@
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
