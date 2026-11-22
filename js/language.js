/* EthioSync bilingual interface — instant local UI + full-page Amharic translation. */
(function () {
  'use strict';

  var STORAGE_KEY = 'ethiosync-language';
  var current = 'en';
  var translating = false;
  var ui = {
    'Home':'ዋና ገጽ','All Tools':'ሁሉም መሣሪያዎች','Calendar Tools':'የቀን መቁጠሪያ መሣሪያዎች',
    'Amharic & Language':'አማርኛ እና ቋንቋ','Finance & Work':'ፋይናንስ እና ሥራ','Reference':'ማጣቀሻ',
    'Resources':'ግብዓቶች','Blog':'ብሎግ','Games':'ጨዋታዎች','About':'ስለ እኛ','About EthioSync':'ስለ EthioSync',
    'Quick Links':'ፈጣን አገናኞች','Top Tools':'ዋና መሣሪያዎች','Learn more':'ተጨማሪ ይመልከቱ',
    'Privacy':'የግላዊነት ፖሊሲ','Terms':'የአጠቃቀም ውሎች','Calendar':'ቀን መቁጠሪያ','Language':'ቋንቋ',
    'Finance':'ፋይናንስ','Free Tools':'ነጻ መሣሪያዎች','Categories':'ምድቦች','Private':'የግል መረጃዎ ይጠበቃል',
    'Date Converter':'የቀን መለወጫ','Age Calculator':'የዕድሜ አካውንተር','Income Tax Calculator':'የገቢ ታክስ አካውንተር',
    'Amharic Keyboard':'የአማርኛ ኪቦርድ','Ethiopian Calendar':'የኢትዮጵያ ቀን መቁጠሪያ',
    'Ethiopian Date Converter':'የኢትዮጵያ ቀን መለወጫ','Ethiopian Age Calculator':'የኢትዮጵያ ዕድሜ አካውንተር',
    'Holidays & Fasting':'በዓላት እና ጾሞች','Overtime Calculator':'የተጨማሪ ሰዓት ክፍያ አካውንተር',
    'Currency Converter':'የምንዛሬ መለወጫ','Time in Ethiopia':'በኢትዮጵያ ያለ ሰዓት','Related tools':'ተዛማጅ መሣሪያዎች',
    'Open tool':'መሣሪያውን ክፈት','Search':'ፈልግ','All rights reserved.':'መብቱ በሕግ የተጠበቀ ነው።',
    'Ethiopia':'ኢትዮጵያ','100% client-side processing':'100% በድረ-ገጹ ውስጥ ሂደት',
    'Every Ethiopian date, tool':'እያንዳንዱ የኢትዮጵያ ቀን፣ መሣሪያ','& resource.':'እና ግብዓት።',
    'EthioSync brings the Ethiopian calendar, Amharic utilities, local calculators and cultural references together in one fast, clutter-free toolbox — no installs, no sign-up, no data leaving your device.':'EthioSync የኢትዮጵያ ቀን መቁጠሪያን፣ የአማርኛ መሣሪያዎችን፣ አካውንተሮችን እና የባሕል መመሪያዎችን በአንድ ፈጣን ጣቢያ ያዋህዳል — ማስገቢያ፣ ምዝገባ ወይም መረጃ ከመሣሪያዎ መላክ አያስፈልግም።',
    'Browse the toolbox':'መሣሪያዎችን ያስሱ','Pick a category or search above — every tool opens in one click, works instantly, and never uploads your data to a server.':'ምድብ ይምረጡ ወይም ከላይ ይፈልጉ — እያንዳንዱ መሣሪያ በአንድ ጠቅታ ይከፈታል፣ መረጃዎም ወደ ሰርቨር አይላክም።',
    'Why EthioSync':'ለምን EthioSync','Built for everyday Ethiopian calculations':'ለዕለት ተዕለት የኢትዮጵያ ስሌቶች የተዘጋጀ',
    'Every tool runs entirely in your browser — your dates, names and numbers never leave your device.':'እያንዳንዱ መሣሪያ ሙሉ በሙሉ በድረ-ገጹ ውስጥ ይሠራል — ቀኖችዎ፣ ስሞችዎ እና ቁጥሮችዎ ከመሣሪያዎ አይወጡም።',
    'Calendar-first tools':'በቀን መቁጠሪያ ላይ ያተኮሩ መሣሪያዎች','Date conversion, age calculation and holiday tracking built around the 13-month Ethiopian calendar.':'በ13 ወራት የኢትዮጵያ ቀን መቁጠሪያ ላይ የተመሠረተ የቀን መለወጫ፣ የዕድሜ ስሌት እና የበዓል ክትትል።',
    'Amharic utilities':'የአማርኛ መሣሪያዎች','Type, convert and clean Amharic text and numbers from any device — no font installs needed.':'ከማንኛውም መሣሪያ አማርኛ ጽሑፍ እና ቁጥሮችን ይጻፉ፣ ይለውጡ እና ያፅዱ — ፊደል መጫን አያስፈልግም።',
    'Work & finance':'ሥራ እና ፋይናንስ','Income tax, overtime and annual leave calculators aligned with Ethiopian employment guidance.':'ከኢትዮጵያ የሥራ መመሪያ ጋር የተጣጣሙ የገቢ ታክስ፣ ተጨማሪ ሰዓት እና ዓመታዊ ሕግ ፍቃድ አካውንተሮች።',
    'Private by design':'ግላዊነትዎ የተጠበቀ ነው','100% client-side processing. No accounts, no tracking of your inputs, no server uploads.':'100% ሂደት በድረ-ገጹ ውስጥ ይከናወናል። መለያ አያስፈልግም፣ የሚያስገቡት መረጃ አይከታተልም፣ ወደ ሰርቨርም አይላክም።',
    'Bookmark EthioSync for your daily workflow':'EthioSyncን ለዕለት ተዕለት ሥራዎ ይምዘግቡ','13+ tools across calendar, Amharic, finance and reference categories — all in one fast, ad-light hub.':'13+ የቀን መቁጠሪያ፣ አማርኛ፣ ፋይናንስ እና ማጣቀሻ መሣሪያዎች — ሁሉም በአንድ ፈጣን ጣቢያ።',
    'Explore All Tools':'ሁሉንም መሣሪያዎች ያስሱ','No tools found':'ምንም መሣሪያ አልተገኘም','Try a different keyword or category.':'ሌላ ቃል ወይም ምድብ ይሞክሩ።',
    'Sign-ups Required':'ምዝገባ የሚያስፈልግ','Client-Side & Private':'በድረ-ገጹ እና የግል','Ads Interrupting':'እንቅፋት የሚያደርጉ ማስታወቂያዎች',
    'Convert to Gregorian':'ወደ ግሪጎሪያን ይለውጡ','Convert to Ethiopian':'ወደ ኢትዮጵያ ይለውጡ','Year (EC)':'ዓመት (ዓ.ኢ.)','Month':'ወር','Day':'ቀን','Gregorian date':'የግሪጎሪያን ቀን',
    'Ethiopian to Gregorian':'ከኢትዮጵያ ወደ ግሪጎሪያን','Gregorian to Ethiopian':'ከግሪጎሪያን ወደ ኢትዮጵያ','Convert dates between the Ethiopian and Gregorian calendars.':'ቀኖችን በኢትዮጵያ እና በግሪጎሪያን ቀን መቁጠሪያዎች መካከል ይለውጡ','Conversion notes':'ስለ መለወጫ ማስታወሻዎች','Calculate':'አስላ','Clear':'አፅዳ','Copy':'ቅዳ','Download':'አውርድ','Result':'ውጤት',
    'Search tools':'መሣሪያዎችን ፈልግ',
    'Practical Ethiopian calendar tools, Amharic resources, calculators and clear cultural guides for everyday use.':'ለዕለት ተዕለት አገልግሎት ተግባራዊ የኢትዮጵያ ቀን መቁጠሪያ መሣሪያዎች፣ የአማርኛ ግብዓቶች፣ አካውንተሮች እና ግልጽ የባሕል መመሪያዎች።'
  };
  var reverse = {};
  Object.keys(ui).forEach(function (key) { reverse[ui[key]] = key; });

  var meta = {
    'index.html': ['EthioSync — የኢትዮጵያ ቀን መቁጠሪያ፣ የአማርኛ መሣሪያዎች እና ነጻ አካውንተሮች','የኢትዮጵያ ቀን መቁጠሪያ፣ የቀን መለወጫ፣ የአማርኛ ኪቦርድ፣ የገቢ ታክስ እና ሌሎች ነጻ መሣሪያዎች።'],
    'ethiopian-calendar.html': ['የኢትዮጵያ ቀን መቁጠሪያ | EthioSync','የዛሬውን የኢትዮጵያ ቀን፣ ወር እና አመት በ13 ወራት የቀን መቁጠሪያ ሥርዓት ይመልከቱ።'],
    'ethiopian-date-converter.html': ['የኢትዮጵያ ቀን መለወጫ | EthioSync','ቀኖችን በኢትዮጵያ እና በግሪጎሪያን ቀን መቁጠሪያ መካከል በፍጥነት ይለውጡ።'],
    'ethiopian-age-calculator.html': ['የኢትዮጵያ ዕድሜ አካውንተር | EthioSync','ከየኢትዮጵያ የትውልድ ቀን ትክክለኛ ዕድሜዎን ይቁጠሩ።'],
    'ethiopian-holidays.html': ['የኢትዮጵያ በዓላት እና ጾሞች | EthioSync','የኢትዮጵያ ሕዝባዊ በዓላት፣ ሃይማኖታዊ በዓላት እና ዋና ጾሞች።'],
    'amharic-keyboard.html': ['የአማርኛ ኪቦርድ | EthioSync','በኮምፒውተር ወይም በስልክ ላይ በቀላሉ አማርኛ ይጻፉ።'],
    'amharic-numbers.html': ['የአማርኛ ቁጥሮች መለወጫ | EthioSync','ቁጥሮችን ወደ አማርኛ ቃላት ወይም ግዕዝ ቁጥሮች ይለውጡ።'],
    'amharic-text-tools.html': ['የአማርኛ ጽሑፍ መሣሪያዎች | EthioSync','የአማርኛ ጽሑፍ ማደራጃ፣ ማጽጃ እና የቋንቋ መሣሪያዎች።'],
    'ethiopia-income-tax-calculator.html': ['የኢትዮጵያ የገቢ ታክስ አካውንተር | EthioSync','የሥራ ገቢ ታክስ እና የደመወዝ ቅነሳዎችን ይገምቱ።'],
    'ethiopia-overtime-calculator.html': ['የተጨማሪ ሰዓት ክፍያ አካውንተር | EthioSync','በሰዓተኛ ተመን እና በተሠራ ተጨማሪ ሰዓት ክፍያዎን ይቁጠሩ።'],
    'ethiopia-annual-leave-calculator.html': ['የዓመታዊ ሕግ ፍቃድ አካውንተር | EthioSync','በኢትዮጵያ የሥራ መመሪያ መሠረት የዓመታዊ ሕግ ፍቃድዎን ይገምቱ።'],
    'currency-converter.html': ['የምንዛሬ መለወጫ | EthioSync','በዓለም ላይ በሚገኙ ምንዛሬዎች መካከል በወቅታዊ ተመኖች ይለውጡ።'],
    'time-in-ethiopia.html': ['በኢትዮጵያ ያለ ሰዓት | EthioSync','የምሥራቅ አፍሪካ ሰዓት እና ባሕላዊውን የኢትዮጵያ ሰዓት ሥርዓት ይመልከቱ።'],
    'ethiopian-baby-names.html': ['የኢትዮጵያ የሕፃናት ስሞች | EthioSync','ትርጉም ያላቸውን የኢትዮጵያ እና የአማርኛ ስሞች ያስሱ።'],
    'resources.html': ['ግብዓቶች | EthioSync','ጠቃሚ የኢትዮጵያ የቀን መቁጠሪያ፣ ቋንቋ እና ባሕል ግብዓቶች።'],
    'blog.html': ['ብሎግ | EthioSync','ስለ ኢትዮጵያ ቀን መቁጠሪያ፣ አማርኛ እና ተግባራዊ መሣሪያዎች መመሪያዎች።'],
    'games.html': ['ጨዋታዎች | EthioSync','ቀላል እና አዝናኝ የድረ-ገጽ ጨዋታዎች።'],
    'about.html': ['ስለ EthioSync | EthioSync','ስለ EthioSync ነጻ የኢትዮጵያ መሣሪያዎች እና የግላዊነት አቀራረብ ይወቁ።'],
    'privacy.html': ['የግላዊነት ፖሊሲ | EthioSync','EthioSync መረጃዎን እንዴት እንደሚጠብቅ ይመልከቱ።'],
    'terms.html': ['የአጠቃቀም ውሎች | EthioSync','የEthioSync ድረ-ገጽ እና መሣሪያዎች የአጠቃቀም ውሎች።']
  };

  function pageName() { return location.pathname.split('/').pop() || 'index.html'; }
  function setCookie(value) {
    document.cookie = 'googtrans=' + value + ';path=/;max-age=31536000;SameSite=Lax';
    document.cookie = 'googtrans=' + value + ';path=/;max-age=31536000;domain=' + location.hostname + ';SameSite=Lax';
  }
  function clearCookie() {
    var end = ';path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;SameSite=Lax';
    document.cookie = 'googtrans=' + end;
    document.cookie = 'googtrans=' + end + ';domain=' + location.hostname;
  }
  function preferredLanguage() {
    var query = new URLSearchParams(location.search).get('lang');
    if (query === 'am' || query === 'en') return query;
    try { var saved = localStorage.getItem(STORAGE_KEY); if (saved === 'am' || saved === 'en') return saved; } catch (e) {}
    var cookie = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
    return cookie && /\/am$/.test(decodeURIComponent(cookie[1])) ? 'am' : 'en';
  }
  function textTranslation(value, lang) {
    var clean = value.trim();
    if (lang === 'am' && ui[clean]) return value.replace(clean, ui[clean]);
    if (lang === 'en' && reverse[clean]) return value.replace(clean, reverse[clean]);
    return null;
  }
  function translateLocalUI(lang) {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var parent = node.parentElement;
        if (!parent || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (parent.closest('script,style,textarea,input,select,.notranslate,#google_translate_element')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [], node;
    while ((node = walker.nextNode())) nodes.push(node);
    nodes.forEach(function (textNode) {
      var translated = textTranslation(textNode.nodeValue, lang);
      if (translated !== null) textNode.nodeValue = translated;
    });
    var labels = lang === 'am' ? {
      'Website language':'የድረ-ገጹ ቋንቋ','Select language':'ቋንቋ ይምረጡ','Primary':'ዋና አሰሳ',
      'Toggle dark mode':'ጨለማ ገጽታ ይቀይሩ','Open menu':'ማውጫ ክፈት','Search tools':'መሣሪያዎችን ፈልግ'
    } : {
      'Website language':'Website language','Select language':'Select language','Primary':'Primary',
      'Toggle dark mode':'Toggle dark mode','Open menu':'Open menu','Search tools':'Search tools'
    };
    document.querySelectorAll('[data-tool-search]').forEach(function(input){
      if (!input.dataset.placeholderEn) input.dataset.placeholderEn = input.placeholder;
      input.placeholder = lang === 'am' ? 'መሣሪያ ይፈልጉ — ለምሳሌ “ቀን”፣ “አማርኛ”፣ “ታክስ”…' : input.dataset.placeholderEn;
    });
    Object.keys(labels).forEach(function (key) {
      document.querySelectorAll('[aria-label="' + key + '"], [aria-label="' + labels[key] + '"]').forEach(function (el) {
        el.setAttribute('aria-label', labels[key]);
      });
    });
  }
  function updateMetadata(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = 'ltr';
    var data = meta[pageName()];
    if (lang === 'am' && data) {
      document.title = data[0];
      setMeta('name', 'description', data[1]);
      setMeta('property', 'og:title', data[0]);
      setMeta('property', 'og:description', data[1]);
      setMeta('name', 'twitter:title', data[0]);
      setMeta('name', 'twitter:description', data[1]);
      setMeta('property', 'og:locale', 'am_ET');
    } else {
      var originalTitle = document.querySelector('meta[name="ethiosync-title-en"]');
      var originalDesc = document.querySelector('meta[name="ethiosync-description-en"]');
      if (originalTitle) {
        document.title = originalTitle.content;
        setMeta('property', 'og:title', originalTitle.content);
        setMeta('name', 'twitter:title', originalTitle.content);
      }
      if (originalDesc) {
        setMeta('name', 'description', originalDesc.content);
        setMeta('property', 'og:description', originalDesc.content);
        setMeta('name', 'twitter:description', originalDesc.content);
      }
      setMeta('property', 'og:locale', 'en_US');
    }
  }
  function setMeta(attr, key, value) {
    var el = document.head.querySelector('meta[' + attr + '="' + key + '"]');
    if (el) el.content = value;
  }
  function syncControls(lang) {
    document.querySelectorAll('.language-select').forEach(function (select) {
      select.value = lang;
      select.setAttribute('title', lang === 'am' ? 'ወደ እንግሊዝኛ ይቀይሩ' : 'Switch to Amharic');
    });
  }
  function updateLinks(lang) {
    document.querySelectorAll('a[href]').forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href || /^(https?:|mailto:|tel:|javascript:)/i.test(href)) return;
      try {
        var url = new URL(a.href);
        if (url.origin !== location.origin) return;
        if (lang === 'am') url.searchParams.set('lang', 'am'); else url.searchParams.delete('lang');
        a.href = url.pathname.split('/').pop() + url.search + url.hash;
      } catch (e) {}
    });
    var url = new URL(location.href);
    if (lang === 'am') url.searchParams.set('lang', 'am'); else url.searchParams.delete('lang');
    history.replaceState(null, '', url.pathname + url.search + url.hash);
  }
  function googleCombo() { return document.querySelector('select.goog-te-combo'); }
  function driveGoogle(lang) {
    var combo = googleCombo();
    if (!combo) return false;
    var value = lang === 'am' ? 'am' : '';
    if (combo.value !== value) {
      combo.value = value;
      combo.dispatchEvent(new Event('change', { bubbles: true }));
    }
    return true;
  }
  window.googleTranslateElementInit = function () {
    if (!window.google || !google.translate || !google.translate.TranslateElement) return;
    new google.translate.TranslateElement({ pageLanguage:'en', includedLanguages:'en,am', autoDisplay:false }, 'google_translate_element');
    if (current === 'am') {
      var attempts = 0;
      var timer = setInterval(function () {
        if (driveGoogle('am') || ++attempts > 40) { clearInterval(timer); translating = false; }
      }, 250);
    }
  };
  function loadTranslator() {
    if (document.querySelector('script[data-ethiosync-translator]')) return;
    var helper = document.getElementById('google_translate_element');
    if (!helper) {
      helper = document.createElement('div');
      helper.id = 'google_translate_element';
      helper.className = 'notranslate';
      helper.setAttribute('aria-hidden', 'true');
      document.body.appendChild(helper);
    }
    var script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.dataset.ethiosyncTranslator = 'true';
    script.onerror = function () {
      translating = false;
      var status = document.getElementById('language-status');
      if (status) status.textContent = current === 'am' ? 'የዋና አሰሳው አማርኛ ተንታክቷል። ተጨማሪ ትርጉም በዚህ ጊዜ አይገኝም።' : 'The main navigation is in Amharic; full translation is temporarily unavailable.';
    };
    document.head.appendChild(script);
  }
  function setLanguage(lang, initial) {
    current = lang === 'am' ? 'am' : 'en';
    try { localStorage.setItem(STORAGE_KEY, current); } catch (e) {}
    syncControls(current);
    updateMetadata(current);
    translateLocalUI(current);
    updateLinks(current);
    if (current === 'am') {
      setCookie('/en/am');
      loadTranslator();
      if (!initial && driveGoogle('am')) translating = false;
    } else {
      driveGoogle('en');
      clearCookie();
    }
    document.dispatchEvent(new CustomEvent('ethiosync:languagechange', { detail:{ language:current } }));
  }
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.language-select').forEach(function (select) {
      select.addEventListener('change', function () { setLanguage(select.value, false); });
    });
    var brand = document.querySelector('.brand');
    if (brand) brand.classList.add('notranslate');
    setLanguage(preferredLanguage(), true);
  });
})();
