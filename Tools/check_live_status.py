 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/tools/check_live_status.py b/tools/check_live_status.py
new file mode 100755
index 0000000000000000000000000000000000000000..c8c13057ef679e5ed1782a1aeff75d32e9923445
--- /dev/null
+++ b/tools/check_live_status.py
@@ -0,0 +1,82 @@
+#!/usr/bin/env python3
+"""Check the production domain availability and report common issues."""
+
+from __future__ import annotations
+
+import argparse
+import ssl
+import sys
+from typing import Tuple
+from urllib.error import HTTPError, URLError
+from urllib.request import Request, urlopen
+
+DEFAULT_URL = "https://alltradeelectric.org"
+USER_AGENT = "Mozilla/5.0 (compatible; SiteStatusBot/1.0)"
+
+
+def fetch_status(url: str) -> Tuple[int | None, str]:
+    """Return the HTTP status code and a short body preview."""
+
+    request = Request(url, headers={"User-Agent": USER_AGENT})
+    try:
+        with urlopen(request, timeout=15, context=ssl.create_default_context()) as response:
+            snippet = response.read(400).decode("utf-8", errors="replace")
+            return response.status, snippet
+    except HTTPError as error:
+        snippet = error.read(400).decode("utf-8", errors="replace") if error.fp else ""
+        return error.code, snippet
+    except URLError as error:  # type: ignore[match]
+        message = getattr(error, "reason", error)
+        raise RuntimeError(f"Unable to reach {url}: {message}") from error
+
+
+def main() -> None:
+    parser = argparse.ArgumentParser(description=__doc__)
+    parser.add_argument("url", nargs="?", default=DEFAULT_URL, help="Domain or URL to check")
+    args = parser.parse_args()
+
+    try:
+        status, snippet = fetch_status(args.url)
+    except RuntimeError as error:
+        text = str(error)
+        print(text)
+        lowered = text.lower()
+        if "403" in lowered or "forbidden" in lowered:
+            print()
+            print("The request was blocked before it reached the site.")
+            print("Troubleshooting checklist:")
+            print("  • Confirm the hosting platform allows HTTPS traffic for this domain.")
+            print("  • Review CDN, proxy, or firewall rules for IP allow lists or maintenance mode.")
+            print("  • If you are behind a corporate network, try from another connection or disable the proxy.")
+        sys.exit(1)
+
+    if status is None:
+        print(f"No HTTP status code returned for {args.url}.")
+        sys.exit(1)
+
+    print(f"Checked {args.url}")
+    print(f"Status: {status}")
+    if snippet:
+        preview = snippet.strip().splitlines()
+        if preview:
+            print("Preview:")
+            for line in preview[:5]:
+                print(f"  {line}")
+
+    if status == 403:
+        print()
+        print("The server is refusing the request (HTTP 403).")
+        print("Troubleshooting checklist:")
+        print("  • Confirm the hosting provider is serving content for this domain.")
+        print("  • If using S3/CloudFront, ensure the bucket policy allows public read access.")
+        print("  • If using Netlify/Vercel, make sure the project is deployed and the domain is linked.")
+        print("  • Verify DNS A/CNAME records point to the correct host and any CDN firewall allows the IP.")
+        print("  • Check access control lists, WAF rules, or maintenance mode settings on the host.")
+        sys.exit(2)
+
+    if status >= 400:
+        sys.exit(2)
+
+
+if __name__ == "__main__":
+    main() 
EOF
)
