ETHIOSYNC WEBSITE

Static English/Amharic website for Ethiopian calendar, language, finance, reference, creator resources, articles, educational games, and the standalone Android app download page.

Android app:
- app.html provides Play Store search, GitHub, and direct APK options.
- downloads/EthioSync.apk is the signed EthioSync 1.0.1 package developed by Nxhom.
- Keep downloads/EthioSync.apk and images/ethiosync-android.png together when deploying.

Translation:
- Uses only the local dictionary and declarative data-en/data-am attributes in js/language.js and the HTML pages.
- No Google Translate, remote translation script, or automatic retranslation observer.

Deployment:
- GitHub Pages serves the repository root as plain static files.
- CNAME must contain exactly: ethiosync.cyou
- Keep .nojekyll so GitHub Pages serves all static assets without Jekyll processing.
- Preserve robots.txt, sitemap.xml, css/, js/, images/, and downloads/ when deploying.

Local preview:
python3 -m http.server 8765

Safety checks before pushing:
test -f CNAME && test "$(cat CNAME)" = "ethiosync.cyou"
git ls-files --error-unmatch CNAME .nojekyll
