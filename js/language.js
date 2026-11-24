/* EthioSync bilingual interface — deterministic, offline English and Amharic. */
(function () {
  'use strict';

  var STORAGE_KEY = 'ethiosync-language';
  var current = 'en';
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
    'Open tool':'መሣሪያውን ክፈት','Search':'ፈልግ','All rights reserved.':'መብቱ በሕግ የተጠበቀ ነው።','EthioSync. All rights reserved.':'EthioSync። መብቱ በሕግ የተጠበቀ ነው።',
    'Ethiopia':'ኢትዮጵያ','100% client-side processing':'100% በድረ-ገጹ ውስጥ ሂደት',
    'Every Ethiopian date, tool':'እያንዳንዱ የኢትዮጵያ ቀን፣ መሣሪያ','& resource.':'እና ግብዓት።',
    'EthioSync brings the Ethiopian calendar, Amharic utilities, local calculators and cultural references together in one fast, clutter-free toolbox — no installs, no sign-up, no data leaving your device.':'EthioSync የኢትዮጵያ ቀን መቁጠሪያን፣ የአማርኛ መሣሪያዎችን፣ አካውንተሮችን እና የባሕል መመሪያዎችን በአንድ ፈጣን ጣቢያ ያዋህዳል — ማስገቢያ፣ ምዝገባ ወይም መረጃ ከመሣሪያዎ መላክ አያስፈልግም።',
    'Browse the toolbox':'መሣሪያዎችን ያስሱ','Pick a category or search above — every tool opens in one click, works instantly, and never uploads your data to a server.':'ምድብ ይምረጡ ወይም ከላይ ይፈልጉ — እያንዳንዱ መሣሪያ በአንድ ጠቅታ ይከፈታል፣ መረጃዎም ወደ ሰርቨር አይላክም።',
    'Why EthioSync':'ለምን EthioSync','Built for everyday Ethiopian calculations':'ለዕለት ተግባራዊ የኢትዮጵያ ስሌቶች የተዘጋጀ',
    'Every tool runs entirely in your browser — your dates, names and numbers never leave your device.':'እያንዳንዱ መሣሪያ ሙሉ በሙሉ በድረ-ገጹ ውስጥ ይሠራል — ቀኖችዎ፣ ስሞችዎ እና ቁጥሮችዎ ከመሣሪያዎ አይወጡም።',
    'Calendar-first tools':'በቀን መቁጠሪያ ላይ ያተኮሩ መሣሪያዎች','Date conversion, age calculation and holiday tracking built around the 13-month Ethiopian calendar.':'በ13 ወራት የኢትዮጵያ ቀን መቁጠሪያ ላይ የተመሠረተ የቀን መለወጫ፣ የዕድሜ ስሌት እና የበዓል ክትትል።',
    'Amharic utilities':'የአማርኛ መሣሪያዎች','Type, convert and clean Amharic text and numbers from any device — no font installs needed.':'ከማንኛውም መሣሪያ አማርኛ ጽሑፍ እና ቁጥሮችን ይጻፉ፣ ይለውጡ እና ያፅዱ — ፊደል መጫን አያስፈልግም።',
    'Work & finance':'ሥራ እና ፋይናንስ','Income tax, overtime and annual leave calculators aligned with Ethiopian employment guidance.':'ከኢትዮጵያ የሥራ መመሪያ ጋር የተጣጣሙ የገቢ ታክስ፣ ተጨማሪ ሰዓት እና ዓመታዊ ሕግ ፍቃድ አካውንተሮች።',
    'Private by design':'ግላዊነትዎ የተጠበቀ ነው','100% client-side processing. No accounts, no tracking of your inputs, no server uploads.':'100% ሂደት በድረ-ገጹ ውስጥ ይከናወናል። መለያ አያስፈልግም፣ የሚያስገቡት መረጃ አይከታተልም፣ ወደ ሰርቨርም አይላክም።',
    'Bookmark EthioSync for your daily workflow':'EthioSyncን ለዕለት ተግባራዊ ሥራዎ ይምዘግቡ','13+ tools across calendar, Amharic, finance and reference categories — all in one fast, ad-light hub.':'13+ የቀን መቁጠሪያ፣ አማርኛ፣ ፋይናንስ እና ማጣቀሻ መሣሪያዎች — ሁሉም በአንድ ፈጣን ጣቢያ።',
    'Explore All Tools':'ሁሉንም መሣሪያዎች ያስሱ','No tools found':'ምንም መሣሪያ አልተገኘም','Try a different keyword or category.':'ሌላ ቃል ወይም ምድብ ይሞክሩ።',
    'Sign-ups Required':'ምዝገባ የሚያስፈልግ','Client-Side & Private':'በድረ-ገጹ እና የግል','Ads Interrupting':'እንቅፋት የሚያደርጉ ማስታወቂያዎች',
    'Convert to Gregorian':'ወደ ግሪጎሪያን ይለውጡ','Convert to Ethiopian':'ወደ ኢትዮጵያ ይለውጡ','Year (EC)':'ዓመት (ዓ.ኢ.)','Month':'ወር','Day':'ቀን','Gregorian date':'የግሪጎሪያን ቀን',
    'Ethiopian to Gregorian':'ከኢትዮጵያ ወደ ግሪጎሪያን','Gregorian to Ethiopian':'ከግሪጎሪያን ወደ ኢትዮጵያ','Convert dates between the Ethiopian and Gregorian calendars.':'ቀኖችን በኢትዮጵያ እና በግሪጎሪያን ቀን መቁጠሪያዎች መካከል ይለውጡ','Conversion notes':'ስለ መለወጫ ማስታወሻዎች','Calculate':'አስላ','Clear':'አፅዳ','Copy':'ቅዳ','Download':'አውርድ','Result':'ውጤት',
    'Search tools':'መሣሪያዎችን ፈልግ',
    'Practical Ethiopian calendar tools, Amharic resources, calculators and clear cultural guides for everyday use.':'ለዕለት ተግባራዊ አገልግሎት ተግባራዊ የኢትዮጵያ ቀን መቁጠሪያ መሣሪያዎች፣ የአማርኛ ግብዓቶች፣ አካውንተሮች እና ግልጽ የባሕል መመሪያዎች።'
  };

  Object.assign(ui, {
  "Amharic": "አማርኛ",
  "Holidays & Fasting Calendar": "የበዓላት እና ጾሞች ቀን መቁጠሪያ",
  "Amharic Numbers Converter": "የአማርኛ ቁጥሮች መለወጫ",
  "Amharic Text Tools": "የአማርኛ ጽሑፍ መሣሪያዎች",
  "Overtime Pay Calculator": "የተጨማሪ ሰዓት ክፍያ አካውንተር",
  "Annual Leave Calculator": "የዓመታዊ ሕግ ፍቃድ አካውንተር",
  "Ethiopian Baby Names": "የኢትዮጵያ የሕፃናት ስሞች",
  "Ethiopian & Biblical Baby Names": "የኢትዮጵያ እና የመጽሐፍ ቅዱስ የሕፃናት ስሞች",
  "View the current Ethiopian month, date and year, with the 13-month system explained.": "የአሁኑን የኢትዮጵያ ወር፣ ቀን እና ዓመት ከ13 ወራት ሥርዓቱ ማብራሪያ ጋር ይመልከቱ።",
  "Convert dates between the Ethiopian and Gregorian calendar systems instantly.": "ቀኖችን በኢትዮጵያ እና በግሪጎሪያን ቀን መቁጠሪያዎች መካከል ወዲያውኑ ይለውጡ።",
  "Calculate an exact age from an Ethiopian birth date, or convert it to Gregorian.": "ከኢትዮጵያ የትውልድ ቀን ትክክለኛ ዕድሜ ይቁጠሩ ወይም ወደ ግሪጎሪያን ይለውጡ።",
  "Keep track of public holidays, religious observances and major fasting periods.": "ሕዝባዊ በዓላትን፣ ሃይማኖታዊ በዓላትን እና ዋና ጾሞችን ይከታተሉ።",
  "Type Amharic text from any desktop or mobile device with a simple online keyboard.": "በቀላል የመስመር ላይ ኪቦርድ ከኮምፒውተር ወይም ከስልክ አማርኛ ይጻፉ።",
  "Convert ordinary numbers into Amharic words or Ethiopic numerals.": "መደበኛ ቁጥሮችን ወደ አማርኛ ቃላት ወይም ግዕዝ ቁጥሮች ይለውጡ።",
  "Text sorting, cleaning, phonetic and language-reference utilities for Amharic.": "ለአማርኛ የጽሑፍ ማደራጃ፣ ማጽጃ እና የቋንቋ ማጣቀሻ መሣሪያዎች።",
  "Estimate Ethiopian employment income tax and understand common payroll deductions.": "የኢትዮጵያ የሥራ ገቢ ታክስ ይገምቱ እና የደመወዝ ቅነሳዎችን ይረዱ።",
  "Calculate overtime compensation using hourly rate and overtime hours worked.": "በሰዓተኛ ተመን እና በተሠሩ ተጨማሪ ሰዓቶች ክፍያ ይቁጠሩ።",
  "Convert between 200+ world currencies using live exchange rates from the free Frankfurter API.": "ከ200 በላይ የዓለም ምንዛሬዎችን በወቅታዊ ተመኖች ይለውጡ።",
  "Estimate annual leave entitlement based on Ethiopian employment guidance.": "የኢትዮጵያ የሥራ መመሪያ መሠረት የዓመታዊ ሕግ ፍቃድዎን ይገምቱ።",
  "Check East Africa Time and learn how Ethiopia’s traditional time system works.": "የምሥራቅ አፍሪካ ሰዓት ይመልከቱ እና ባሕላዊውን የኢትዮጵያ ሰዓት ሥርዓት ይረዱ።",
  "Explore meaningful Ethiopian and Amharic names with origins and descriptions.": "ትርጉም፣ ምንጭ እና ማብራሪያ ካላቸው የኢትዮጵያ እና የአማርኛ ስሞች ጋር ይተዋወቁ።",
  "View any Ethiopian month with Gregorian dates alongside.": "ማንኛውንም የኢትዮጵያ ወር ከግሪጎሪያን ቀኖች ጋር ይመልከቱ።",
  "Ethiopian year": "የኢትዮጵያ ዓመት",
  "Show": "አሳይ",
  "Prev month": "ቀዳሚ ወር",
  "Today": "ዛሬ",
  "Next month": "ቀጣይ ወር",
  "Select a day for its full Ethiopian and Gregorian dates.": "ሙሉ የኢትዮጵያ እና የግሪጎሪያን ቀኖችን ለማየት ቀን ይምረጡ።",
  "About the Ethiopian calendar": "ስለ ኢትዮጵያ ቀን መቁጠሪያ",
  "How does the 13-month system work?": "የ13 ወራት ሥርዓቱ እንዴት ይሠራል?",
  "The Ethiopian calendar has 12 months of 30 days each, plus a 13th month (Pagume) of 5 days — 6 in a leap year. Leap years occur when the year number modulo 4 equals 3.": "የኢትዮጵያ ቀን መቁጠሪያ 12 የ30 ቀን ወራት እና 5 ቀኖች ያሉት 13ኛው ወር ጳጉሜ አለው፤ በሌፕ ዓመት 6 ቀኖች ይሆናሉ። የዓመቱ ቁጥር በ4 ሲካፈል 3 ቀሪ ሲሆን ሌፕ ዓመት ይሆናል።",
  "Why is the Ethiopian year different?": "የኢትዮጵያ ዓመት ለምን የተለየ ነው?",
  "The Ethiopian year count follows a different era (roughly 7–8 years behind the Gregorian calendar), and the new year (Enkutatash) falls on September 11 — or September 12 after a Gregorian leap day.": "የኢትዮጵያ ዓመት አካል ከግሪጎሪያን በ7–8 ዓመታት ይለያል፤ እንቁጣጣሽም ሴፕቴምበር 11 ወይም ከግሪጎሪያን ሌፕ ቀን በኋላ ሴፕቴምበር 12 ይዋላል።",
  "Mon": "ሰኞ",
  "Tue": "ማክሰ",
  "Wed": "ረቡዕ",
  "Thu": "ሐሙስ",
  "Fri": "ዓርብ",
  "Sat": "ቅዳሜ",
  "Sun": "እሑድ",
  "Is the conversion exact?": "መለወጫው ትክክል ነው?",
  "Yes — conversion runs through Julian Day Numbers, so every valid Ethiopian date maps to exactly one Gregorian date and vice versa, including Pagume leap days.": "አዎ — መለወጫው በጁሊያን የቀን ቁጥሮች ስለሚከናወን እያንዳንዱ ትክክለኛ የኢትዮጵያ ቀን ከአንድ የግሪጎሪያን ቀን ጋር ይመሳሰላል፤ የጳጉሜ ሌፕ ቀኖችንም ይጨምራል።",
  "Invalid Ethiopian date. Pagume has only five or six days.": "ትክክለኛ ያልሆነ የኢትዮጵያ ቀን። ጳጉሜ አምስት ወይም ስድስት ቀኖች ብቻ አሉት።",
  "Choose a Gregorian date.": "የግሪጎሪያን ቀን ይምረጡ።",
  "Enter an Ethiopian year from 1 to 9999.": "ከ1 እስከ 9999 ያለ የኢትዮጵያ ዓመት ያስገቡ።",
  "Calculate an exact age from an Ethiopian birth date.": "ከኢትዮጵያ የትውልድ ቀን ትክክለኛ ዕድሜዎን ይቁጠሩ።",
  "Birth year (EC)": "የትውልድ ዓመት (ዓ.ኢ.)",
  "Birth month": "የትውልድ ወር",
  "Birth day": "የትውልድ ቀን",
  "Calculate Age": "ዕድሜ አስላ",
  "How age is calculated": "ዕድሜ እንዴት እንደሚሰላ",
  "Which calendar is used?": "የትኛው ቀን መቁጠሪያ ይጠቀማል?",
  "Enter your birth date in the Ethiopian calendar. The tool converts both dates to Julian Day Numbers and computes the exact difference in years, months and days.": "የትውልድ ቀንዎን በኢትዮጵያ ቀን መቁጠሪያ ያስገቡ። መሣሪያው ሁለቱንም ቀኖች ወደ ጁሊያን የቀን ቁጥሮች በመለወጥ ትክክለኛውን የዓመት፣ ወር እና ቀን ልዩነት ያሰላል።",
  "Public holidays, observances and fasting periods by Ethiopian year.": "ሕዝባዊ በዓላት፣ ሃይማኖታዊ በዓላት እና የጾም ወቅቶች በኢትዮጵያ ዓመት።",
  "List holidays": "በዓላትን አሳይ",
  "Holiday notes": "ስለ በዓላት ማስታወሻዎች",
  "Which holidays are fixed?": "የትኞቹ በዓላት ቋሚ ናቸው?",
  "Enkutatash, Meskel, Genna and Timket follow the Ethiopian calendar. Other national holidays follow the Gregorian calendar, and religious fasting dates move each year — always confirm with an official calendar.": "እንቁጣጣሽ፣ መስቀል፣ ገና እና ጥምቀት የኢትዮጵያ ቀን መቁጠሪያን ይከተላሉ። ሌሎች ብሔራዊ በዓላት ግሪጎሪያንን ይከተላሉ፤ የጾም ቀኖችም በየዓመቱ ይለዋወጣሉ — ሁሌም ኦፊሻላዊ ቀን መቁጠሪያ ያረጋግጡ።",
  "Type Amharic fidel from any device — copy and paste anywhere.": "ከማንኛውም መሣሪያ በአማርኛ ፊደል ይጻፉ — ይቅዱ እና በማንኛውም ቦታ ይለጥፉ።",
  "Your Amharic text": "የእርስዎ አማርኛ ጽሑፍ",
  "Fidel family": "የፊደል ቤተሰብ",
  "Space": "ክፍተት",
  "Backspace": "ኋላ ሰረዝ",
  "Typing Amharic": "አማርኛ መጻፍ",
  "Do I need to install a font?": "ፊደል መጫን አለብኝ?",
  "No. Amharic uses the Ethiopic Unicode block, which modern phones and computers render natively. Type or tap keys here, then copy the text anywhere.": "አያስፈልግም። አማርኛ የግዕዝ ዩኒኮድ ስለሚጠቀም ዘመናዊ ስልኮች እና ኮምፒውተሮች በቀጥታ ያነባሉ። እዚህ ይጻፉ ወይም ቁልፎችን ይንኩ፣ ከዚያ ጽሑፉን ይቅዱ።",
  "Convert numbers into Amharic words or Ethiopic numerals.": "ቁጥሮችን ወደ አማርኛ ቃላት ወይም ግዕዝ ቁጥሮች ይለውጡ።",
  "Number (0 – 999,999,999)": "ቁጥር (0 – 999,999,999)",
  "Convert": "ለውጥ",
  "About Ethiopic numerals": "ስለ ግዕዝ ቁጥሮች",
  "How do Ethiopic numerals work?": "የግዕዝ ቁጥሮች እንዴት ይሠራሉ?",
  "Ethiopic numerals combine units (፩–፱), tens (፲–፺) and hundreds with ፻ (100) and ፼ (10,000) separators — a system related to ancient Greek and Hebrew numbering.": "የግዕዝ ቁጥሮች አሀዞችን (፩–፱)፣ አሥሮችን (፲–፺) እና መቶዎችን በ፻ (100) እና ፼ (10,000) ምልክቶች ያዋህዳሉ።",
  "Clean, sort, de-duplicate and count Amharic or any Unicode text.": "የአማርኛ ወይም ሌላ ዩኒኮድ ጽሑፍ ያፅዱ፣ ያደራድሩ፣ ተደጋጋሚዎችን ያስወግዱ እና ይቁጠሩ።",
  "Text": "ጽሑፍ",
  "Clean spacing": "ክፍተቶችን አፅዳ",
  "Trim lines": "የመስመር ጫፎችን አጥራ",
  "Unique lines": "ተደጋጋሚ መስመሮችን አስወግድ",
  "Sort A–Z": "ከሀ እስከ ሐ አደራድር",
  "Reverse order": "ቅደም ተከተል ገልብጥ",
  "Estimate annual leave entitlement from years of service.": "ከአገልግሎት ዓመታትዎ የዓመታዊ ሕግ ፍቃድዎን ይገምቱ።",
  "Completed years of service": "የተጠናቀቁ የአገልግሎት ዓመታት",
  "Additional months (0–11)": "ተጨማሪ ወራት (0–11)",
  "Calculate leave": "ሕግ ፍቃድ አስላ",
  "Annual leave rules": "የዓመታዊ ሕግ ፍቃድ ደንቦች",
  "How is entitlement calculated?": "መብት እንዴት እንደሚሰላል?",
  "Ethiopian employment guidance sets a minimum of 16 working days for the first year of service, increasing by one day for every additional two years of service. Under one year, leave is typically pro-rated by completed months.": "የኢትዮጵያ የሥራ መመሪያ በመጀመሪያው ዓመት ቢያንስ 16 የሥራ ቀኖችን፣ ከዚያም በእያንዳንዱ ተጨማሪ ሁለት ዓመት አንድ ቀን መጨመሩን ይደነግጋል። ከአንድ ዓመት በታች በተጠናቀቁ ወራት መጠን ይሰላል።",
  "Estimate employment income tax with progressive monthly bands.": "የሥራ ገቢ ታክስን በሚሄዱ የወራት ደረጃዎች ይገምቱ።",
  "Monthly taxable income (ETB)": "ወራዊ ታክስ የሚከፈልበት ገቢ (ብር)",
  "Calculate tax": "ታክስ አስላ",
  "About the tax bands": "ስለ ታክስ ደረጃዎች",
  "Which bands are used?": "የትኞቹ ደረጃዎች ይጠቀማሉ?",
  "The calculator applies Ethiopia’s progressive monthly employment income tax bands: 0% up to 2,000 ETB, then 15%, 20%, 25%, 30% and 35% for the highest slice. Pension and other deductions are not included.": "አካውንተሩ የኢትዮጵያን ሚሄዱ የወራዊ ሥራ ገቢ ታክስ ደረጃዎች ይጠቀማል፤ እስከ 2,000 ብር 0%፣ ከዚያ 15%፣ 20%፣ 25%፣ 30% እና 35%። ፔንሽን እና ሌሎች ቅነሳዎች አልተካተቱም።",
  "Calculate overtime pay at daytime, night, rest-day and holiday rates.": "የቀን፣ የሌሊት፣ የዕረፍት ቀን እና የበዓል ተጨማሪ ሥራ ክፍያ ይቁጠሩ።",
  "Hourly rate (ETB)": "ሰዓተኛ ተመን (ብር)",
  "Daytime overtime (hours)": "የቀን ተጨማሪ ሥራ (ሰዓቶች)",
  "Night overtime (hours)": "የሌሊት ተጨማሪ ሥራ (ሰዓቶች)",
  "Weekly rest day (hours)": "ሳምንታዊ ዕረፍት (ሰዓቶች)",
  "Public holiday (hours)": "ሕዝባዊ በዓል (ሰዓቶች)",
  "Calculate overtime": "ተጨማሪ ክፍያ አስላ",
  "Overtime multipliers": "የተጨማሪ ሥራባዜዎች",
  "What are the standard multipliers?": "መደበኛውባዜዎች ምንድን ናቸው?",
  "Under Ethiopian labour guidance, overtime is typically paid at 1.5× the hourly rate for daytime, 1.75× for night work, 2× on weekly rest days and 2.5× on public holidays. Confirm with your employer or the labour proclamation.": "በኢትዮጵያ የሥራ መመሪያ ተጨማሪ ሥራ በቀን 1.5×፣ በሌሊት 1.75×፣ በሳምንታዊ ዕረፍት 2× እና በሕዝባዊ በዓል 2.5× ይከፈላል። ከአሠሪዎ ወይም ከሥራ አዋጁ ያረጋግጡ።",
  "Live East Africa Time with the traditional 12-hour reading.": "ቀጥታ የምሥራቅ አፍሪካ ሰዓት ከባሕላዊ 12 ሰዓት ንባብ ጋር።",
  "Refresh": "አድስ",
  "Ethiopian time system": "የኢትዮጵያ ሰዓት ሥርዓት",
  "What is the traditional clock?": "ባሕላዊው ሰዓት ምንድን ነው?",
  "Ethiopia commonly uses a 12-hour clock counted from dawn (1 o’clock = 7 AM) and dusk (1 o’clock = 7 PM). The modern East Africa Time zone is UTC+3 year-round with no daylight saving.": "ኢትዮጵያ ከጠዋት እከከምሽቱ የሚቆጠር 12 ሰዓት ሥርዓት ትጠቀማለች (1 ሰዓት = 7 AM/PM)። ዘመናዊው የምሥራቅ አፍሪካ ሰዓት UTC+3 ነው፤ የቀን ሰዓት ማዘዋወሪያ የለም።",
  "Amount": "መጠን",
  "From": "ከ",
  "To": "ወደ",
  "Quick rates": "ፈጣን ተመኖች",
  "About this tool": "ስለዚህ መሣሪያ",
  "Popular pairs": "ተወዳጅ ጥንዶች",
  "Search names": "ስሞችን ፈልግ",
  "Gender": "ጾታ",
  "Origin": "ምንጭ",
  "Load more names": "ተጨማሪ ስሞች ጫን",
  "About these names": "ስለ እነዚህ ስሞች",
  "Privacy Policy": "የግላዊነት ፖሊሲ",
  "No accounts, no tracking, no data collection.": "ምንም መለያ፣ ክትትል ወይም መረጃ ሰብሳቢ የለም።",
  "Privacy at a glance": "የግላዊነት በአጭሩ",
  "What we store": "የምንያዘው",
  "What we do not do": "የማናደርጋቸው",
  "Contact": "አግኙን",
  "Terms of Use": "የአጠቃቀም ውሎች",
  "Free tools, provided as-is without warranty.": "ነጻ መሣሪያዎች፣ ያለ ዋስትና እንዳሉ ይሰጣሉ።",
  "Acceptance of terms": "ውሎችን መቀበል",
  "Service description": "የአገልግሎት መግለጫ",
  "Accuracy & liability": "ትክክለኛነት እና ኃላፊነት",
  "Acceptable use": "ተቀባይነት ያለው አጠቃቀም",
  "Changes": "ለውጦች",
  "What is EthioSync?": "EthioSync ምንድን ነው?",
  "Free Ethiopian tools, private by design.": "ነጻ የኢትዮጵያ መሣሪያዎች፣ ግላዊነትዎ የተጠበቀ ነው።",
  "Accuracy & sources": "ትክክለኛነት እና ምንጮች",
  "Terms of use": "የአጠቃቀም ውሎች",
  "EthioSync Blog": "EthioSync ብሎግ",
  "Articles, updates and deep dives on Ethiopian calendar tools, language and culture.": "ስለ ኢትዮጵያ ቀን መቁጠሪያ፣ ቋንቋ እና ባሕል ጽሑፎች እና ዝመናዎች።",
  "Welcome to the blog": "ወደ ብሎጉ እንኳን ደህና መጡ",
  "Calendar Explainers": "የቀን መቁጠሪያ ማብራሪያዎች",
  "Amharic Tips": "የአማርኛ ምክሮች",
  "Tool Updates": "የመሣሪያ ዝመናዎች",
  "Holidays & Culture": "በዓላት እና ባሕል",
  "Coming soon": "በቅርቡ ይመጣል",
  "Educational games and quizzes about Ethiopian culture, language and history.": "ስለ ኢትዮጵያ ባሕል፣ ቋንቋ እና ታሪክ ትምህርታዊ ጨዋታዎች እና ጥያቄዎች።",
  "Calendar Quiz": "የቀን መቁጠሪያ ጥያቄዎች",
  "Amharic Alphabet Match": "የአማርኛ ፊደላት ማመሳሰያ",
  "Name Meanings": "የስም ትርጉሞች",
  "Ethiopia Trivia": "የኢትዮጵያ እውቀት ጥያቄዎች",
  "Curated guides, references and reading lists on Ethiopian culture, language and history.": "ስለ ኢትዮጵያ ባሕል፣ ቋንቋ እና ታሪክ የተመረጡ መመሪያዎች እና ማጣቀሻዎች።",
  "Calendar & Time": "ቀን መቁጠሪያ እና ሰዓት",
  "Language Learning": "የቋንቋ ትምህርት",
  "History & Culture": "ታሪክ እና ባሕል",
  "Names & Genealogy": "ስሞች እና ዘር ሐረግ",
  "Sources, effective date & review": "ምንጮች፣ የትግበራ ቀን እና ግምገማ",
  "Current bands reflect Ethiopia’s Income Tax (Amendment) Proclamation No. 1395/2025.": "የአሁኑ ደረጃዎች የኢትዮጵያን የገቢ ታክስ (ማሻሻያ) አዋጅ ቁጥር 1395/2025 ይከተላሉ።",
  "Proclamation overview": "የአዋጁ አጠቃላይ መግለጫ",
  "PwC Ethiopia tax summary": "የPwC የኢትዮጵያ ታክስ ማጠቃለያ",
  "Last reviewed 24 November 2026. Confirm current payroll treatment with a qualified Ethiopian tax professional.": "መጨረሻ የተገመገመው ህዳር 15 ቀን 2019 ዓ.ም. ነው። የአሁኑን የደመወዝ አያያዝ ከባለሙያ የኢትዮጵያ ታክስ አማካሪ ያረጋግጡ።",
  "Multipliers follow Article 68 of Ethiopia’s Labour Proclamation No. 1156/2019.": "ሥራባዜዎቹ የኢትዮጵያን የሥራ አዋጅ ቁጥር 1156/2019 አንቀጽ 68 ይከተላሉ።",
  "Entitlement follows Article 77 of Ethiopia’s Labour Proclamation No. 1156/2019.": "መብቱ የኢትዮጵያን የሥራ አዋጅ ቁጥር 1156/2019 አንቀጽ 77 ይከተላል።",
  "Read the Labour Proclamation": "የሥራ አዋጁን ያንብቡ",
  "Last reviewed 24 November 2026. Employment contracts, collective agreements and later amendments may affect entitlement.": "መጨረሻ የተገመገመው ህዳር 15 ቀን 2019 ዓ.ም. ነው። የሥራ ውሎች፣ የጋራ ስምምነቶች እና የኋላ ማሻሻያዎች መብት ላይ ተጽዕኖ ሊያሳድሩ ይችላሉ።"
});
  var reverse = {};
  Object.keys(ui).forEach(function (key) { reverse[ui[key]] = key; });

  var meta = {
    'index.html': ['EthioSync — የኢትዮጵያ ቀን መቁጠሪያ፣ የአማርኛ መሣሪያዎች እና ነጻ አካውንተሮች','የኢትዮጵያ ቀን መቁጠሪያ፣ የቀን መለወጫ፣ የአማርኛ ኪቦርድ፣ የገቢ ታክስ እና ሌሎች ነጻ መሣሪያዎች።'],
    'ethiopian-calendar.html': ['የኢትዮጵያ ቀን መቁጠሪያ | EthioSync','የዛሬውን የኢትዮጵያ ቀን፣ ወር እና አመት በ13 ወራት የቀን መቁጠሪያ ሥርዓት ይመልከቱ።'],
    'ethiopian-date-converter.html': ['የኢትዮጵያ ቀን መለወጫ | EthioSync','ቀኖችን በኢትዮጵያ እና በግሪጎሪያን ቀን መቁጠሪያዎች መካከል በፍጥነት ይለውጡ።'],
    'ethiopian-age-calculator.html': ['የኢትዮጵያ ዕድሜ አካውንተር | EthioSync','ከየኢትዮጵያ የትውልድ ቀን ትክክለኛ ዕድሜዎን ይቁጠሩ።'],
    'ethiopian-holidays.html': ['የኢትዮጵያ በዓላት እና ጾሞች | EthioSync','የኢትዮጵያ ሕዝባዊ በዓላት፣ የጾም ወቅቶች፣ ቀጥታ ቆጠራ፣ ማጣሪያ እና የቀን ማውረጃዎች።'],
    'amharic-keyboard.html': ['የአማርኛ ኪቦርድ | EthioSync','በኮምፒውተር ወይም በስልክ ላይ በቀላሉ አማርኛ ይጻፉ።'],
    'amharic-numbers.html': ['የአማርኛ ቁጥሮች መለወጫ | EthioSync','ቁጥሮችን ወደ አማርኛ ቃላት ወይም ግዕዝ ቁጥሮች ይለውጡ።'],
    'amharic-text-tools.html': ['የአማርኛ ጽሑፍ መሣሪያዎች | EthioSync','የአማርኛ ጽሑፍ ማደራጃ፣ ማጽጃ እና የቋንቋ መሣሪያዎች።'],
    'ethiopia-income-tax-calculator.html': ['የኢትዮጵያ የገቢ ታክስ አካውንተር | EthioSync','የሥራ ገቢ ታክስ እና የደመወዝ ቅነሳዎችን ይገምቱ።'],
    'ethiopia-overtime-calculator.html': ['የተጨማሪ ሰዓት ክፍያ አካውንተር | EthioSync','በሰዓተኛ ተመን እና በተሠራ ተጨማሪ ሰዓት ክፍያዎን ይቁጠሩ።'],
    'ethiopia-annual-leave-calculator.html': ['የዓመታዊ ሕግ ፍቃድ አካውንተር | EthioSync','የኢትዮጵያ የሥራ መመሪያ መሠረት የዓመታዊ ሕግ ፍቃድዎን ይገምቱ።'],
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

  Object.assign(ui, {
    'East Africa Time · Addis Ababa':'የምሥራቅ አፍሪካ ሰዓት · አዲስ አበባ','Next observance':'ቀጣይ በዓል','Countdown':'የቀረበበት ጊዜ','Days':'ቀናት','Hours':'ሰዓቶች','Minutes':'ደቂቃዎች','Seconds':'ሰከንዶች',
    'Year planner':'ዓመታዊ እቅድ','Holidays, feasts and fasting periods':'በዓላት፣ በዓላተ ሃይማኖት እና የጾም ወቅቶች','Add to calendar':'ወደ ቀን መቁጠሪያ ጨምር','Previous':'ቀዳሚ','Current year':'የአሁኑ ዓመት','Next':'ቀጣይ',
    'Search holidays and fasting periods':'በዓላት እና የጾም ወቅቶችን ፈልግ','Category':'ምድብ','All observances':'ሁሉም በዓላት','Public holidays / closures':'ሕዝባዊ በዓላት / የዕረፍት ቀኖች','Fasting periods':'የጾም ወቅቶች','Orthodox feasts':'የኦርቶዶክስ በዓላት','Islamic observances':'የእስላም በዓላት','National observances':'ብሔራዊ መታሰቢያዎች','Upcoming only':'የሚመጡት ብቻ',
    'Public holiday':'ሕዝባዊ በዓል','Fasting':'ጾም','Other observance':'ሌላ በዓል','Observance':'በዓል','Ethiopian date':'የኢትዮጵያ ቀን','Gregorian date':'የግሪጎሪያን ቀን','Status':'ሁኔታ',
    'Ethiopian holidays and fasting periods for the selected Ethiopian year':'የተመረጠው የኢትዮጵያ ዓመት በዓላት እና የጾም ወቅቶች','No matching observances. Try another search or category.':'የሚዛመድ በዓል አልተገኘም። ፍለጋውን ወይም ምድቡን ይቀይሩ።',
    'Red rows indicate national public-holiday closures. “Estimated” and “Tentative” Islamic dates require official confirmation.':'ቀይ መስመሮች ብሔራዊ የዕረፍት ቀኖችን ያሳያሉ። “ግምት” እና “ግምታዊ” የተላቸው የእስላም ቀኖች ኦፊሴላዊ ማረጋገጫ ይፈልጋሉ።',
    'How dates are determined':'ቀኖች እንዴት ይወሰናሉ','Fixed and movable dates':'ቋሚ እና ሚንቀሳቀሱ ቀኖች','Fasting ranges and weekly fasts':'የጾም ክልሎች እና ሳምንታዊ ጾሞች','Islamic date confidence':'የእስላም ቀኖች ትክክለኛነት','Sources and review':'ምንጮች እና ግምገማ','Open the marked calendar':'ምልክት ያለው ቀን መቁጠሪያ ክፈት',
    'Enkutatash, Meskel, Genna and Timket use fixed Ethiopian dates. Adwa, Labour Day and Patriots’ Victory Day use fixed Gregorian dates. Siklet, Fasika and related Orthodox observances move with the Bahire Hasab Paschal cycle.':'እንቁጣጣሽ፣ መስቀል፣ ገና እና ጥምቀት ቋሚ የኢትዮጵያ ቀኖችን ይጠቀማሉ። ዓድዋ፣ የሠራተኞች ቀን እና የአርበኞች ድል ቀን ቋሚ የግሪጎሪያን ቀኖች ናቸው። ስቅለት፣ ፋሲካ እና ተዛማጅ በዓላት በባሕረ ሃሳብ ይንቀሳቀሳሉ።',
    'Fasting ranges include both the start and end dates shown. Wednesday and Friday fasts are recurring weekly observances, except during the fifty days of joy from Fasika through Pentecost and on other church-appointed exceptions. Follow your parish for personal observance.':'የጾም ክልሎች የመጀመሪያ እና የመጨረሻ ቀኖችን ያካትታሉ። የረቡዕ እና ዓርብ ጾሞች ሳምንታዊ ናቸው፤ ከፋሲካ እስከ ጰራቅሊጦስ በሃምሳ የደስታ ቀናት እና በሌሎች የቤተ ክርስቲያን ልዩ ሁኔታዎች ይቀራሉ። ለግል ጾም አብያተ ክርስቲያናትዎን ይከተሉ።',
    'Islamic dates use reviewed overrides where available and otherwise a tabular Hijri estimate. Moon sighting and official announcements can shift a date by one day. Ramadan is always labelled as an estimate until officially confirmed.':'የእስላም ቀኖች የተገመገሙ ቀኖችን ይጠቀማሉ፤ ካልተገኘ ደግሞ የሂጅራ ስሌት ግምት ይጠቀማሉ። የጨረቃ ምልከታ እና ኦፊሴላዊ መግለጫዎች ቀኑን በአንድ ቀን ሊለውጡ ይችላሉ። ረመዳን እስኪረጋገጥ ድረስ ግምት ተብሎ ይመዘገባል።',
    'Cross-checked against Timeanddate’s Ethiopia public-holiday calendar, Ethiopian Orthodox calendar guidance, Bahire Hasab calculation references, and published 2026/2027 feast schedules.':'ከTimeanddate የኢትዮጵያ ሕዝባዊ በዓላት፣ ከኢትዮጵያ ኦርቶዶክስ ቀን መቁጠሪያ፣ ከባሕረ ሃሳብ እና ከ2026/2027 የበዓላት መርሐ ግብሮች ጋር ተገምግሟል።',
    'Last reviewed 24 November 2026. This planner supports planning and education; official government and religious announcements take precedence.':'የመጨረሻ ግምገማ 24 ህዳር 2026። ይህ መሣሪያ ለእቅድ እና ትምህርት ነው፤ ኦፊሴላዊ የመንግሥት እና ሃይማኖት መግለጫዎች ቅድሚያ ይሰጣሉ።',
    'Show fasting periods and other observances':'የጾም ወቅቶችን እና ሌሎች በዓላት አሳይ','Observance':'በዓል','Select a day for its full Ethiopian and Gregorian dates.':'ሙሉ የኢትዮጵያ እና የግሪጎሪያን ቀኖችንና በዓላትን ለማየት ቀን ይምረጡ።'
  });

  function pageName() { return location.pathname.split('/').pop() || 'index.html'; }
  function preferredLanguage() {
    var query = new URLSearchParams(location.search).get('lang');
    if (query === 'am' || query === 'en') return query;
    try { var saved = localStorage.getItem(STORAGE_KEY); if (saved === 'am' || saved === 'en') return saved; } catch (e) {}
    return 'en';
  }
  function textTranslation(value, lang) {
    var clean = value.trim();
    if (lang === 'am' && ui[clean]) return value.replace(clean, ui[clean]);
    if (lang === 'en' && reverse[clean]) return value.replace(clean, reverse[clean]);
    return null;
  }
  function translateLocalUI(lang) {
    document.querySelectorAll('[data-en][data-am]').forEach(function(el){el.textContent=el.dataset[lang];});
    document.querySelectorAll('[data-en-placeholder][data-am-placeholder]').forEach(function(el){el.placeholder=el.dataset[lang+'Placeholder'];});
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var parent = node.parentElement;
        if (!parent || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (parent.closest('script,style,textarea,input,.notranslate,[data-en][data-am]')) return NodeFilter.FILTER_REJECT;
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
    var holidaySearch=document.getElementById('hol-search');
    if(holidaySearch){if(!holidaySearch.dataset.placeholderEn)holidaySearch.dataset.placeholderEn=holidaySearch.placeholder;holidaySearch.placeholder=lang==='am'?'ፋሲካ፣ ረመዳን፣ መስቀል… ይሞክሩ':holidaySearch.dataset.placeholderEn;}
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
    document.querySelectorAll('.language-toggle').forEach(function (button) {
      var target = lang === 'am' ? 'en' : 'am';
      button.textContent = target === 'am' ? 'አማ' : 'EN';
      button.dataset.targetLanguage = target;
      button.setAttribute('aria-label', target === 'am' ? 'Switch to Amharic' : 'ወደ እንግሊዝኛ ይቀይሩ');
      button.setAttribute('title', target === 'am' ? 'Switch to Amharic' : 'ወደ እንግሊዝኛ ይቀይሩ');
      button.setAttribute('aria-pressed', lang === 'am' ? 'true' : 'false');
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
  function setLanguage(lang) {
    current = lang === 'am' ? 'am' : 'en';
    try { localStorage.setItem(STORAGE_KEY, current); } catch (e) {}
    syncControls(current);
    updateMetadata(current);
    translateLocalUI(current);
    updateLinks(current);
    var status=document.getElementById('language-status');
    if(status)status.textContent=current==='am'?'የገጹ ቋንቋ አማርኛ ሆኗል። ትርጉሙ ሙሉ በሙሉ በመሣሪያዎ ውስጥ ይሠራል።':'Language changed to English. Translation runs entirely on your device.';
    document.dispatchEvent(new CustomEvent('ethiosync:languagechange', { detail:{ language:current } }));
  }
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.language-toggle').forEach(function (button) {
      button.addEventListener('click', function () {
        setLanguage(button.dataset.targetLanguage || (current === 'am' ? 'en' : 'am'), false);
      });
    });
    var brand = document.querySelector('.brand');
    if (brand) brand.classList.add('notranslate');
    setLanguage(preferredLanguage());
  });
})();
