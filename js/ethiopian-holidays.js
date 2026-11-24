/* EthioSync holiday engine — fixed dates, Bahire Hasab and tabular Hijri planning dates. */
(function(global){
'use strict';
var DAY_MS=86400000;
var ISLAMIC_OVERRIDES={
 'eid-fitr:2026':{year:2026,month:3,day:20,certainty:'confirmed'},
 'eid-adha:2026':{year:2026,month:5,day:27,certainty:'confirmed'},
 'mawlid:2026':{year:2026,month:8,day:25,certainty:'confirmed'},
 'eid-fitr:2027':{year:2027,month:3,day:10,certainty:'tentative'},
 'eid-adha:2027':{year:2027,month:5,day:17,certainty:'tentative'},
 'mawlid:2027':{year:2027,month:8,day:15,certainty:'tentative'}
};
function mod(n,m){return ((n%m)+m)%m;}
function islamicToJdn(y,m,d){return d+Math.ceil(29.5*(m-1))+(y-1)*354+Math.floor((3+11*y)/30)+1948440-1;}
function getNineveh(year){
 var ameteAlem=5500+year,medeb=ameteAlem%19,wenber=medeb===0?18:medeb-1;
 var abektie=(wenber*11)%30,metqi=(wenber*19)%30||30;
 var bealeMetqi=etEthToJdn(year,metqi>14?1:2,metqi);
 var weekday=etJdnToGreg(bealeMetqi),jsDay=new Date(Date.UTC(weekday.year,weekday.month-1,weekday.day)).getUTCDay();
 var tewsak={0:7,1:6,2:5,3:4,4:3,5:2,6:8}[jsDay];
 var mebajaHamer=(metqi+tewsak)%30||30;
 return {jdn:etEthToJdn(year,metqi>14?5:6,mebajaHamer),ameteAlem:ameteAlem,medeb:medeb,wenber:wenber,abektie:abektie,metqi:metqi,mebajaHamer:mebajaHamer};
}
function event(id,en,am,type,start,end,closed,certainty,enNote,amNote){
 return {id:id,en:en,am:am,type:type,start:start,end:end==null?start:end,closed:!!closed,certainty:certainty||'fixed',enNote:enNote||'',amNote:amNote||''};
}
function addEth(list,year,id,en,am,type,month,day,endMonth,endDay,closed,certainty,enNote,amNote){
 list.push(event(id,en,am,type,etEthToJdn(year,month,day),etEthToJdn(year,endMonth||month,endDay==null?day:endDay),closed,certainty,enNote,amNote));
}
function addGreg(list,year,id,en,am,type,month,day,closed,certainty,enNote,amNote){
 var j=etGregToJdn(year,month,day);list.push(event(id,en,am,type,j,j,closed,certainty,enNote,amNote));
}
function addIslamic(list,id,en,am,type,hijriYear,month,day,closed,enNote,amNote){
 var start=islamicToJdn(hijriYear,month,day),g=etJdnToGreg(start),override=ISLAMIC_OVERRIDES[id+':'+g.year],certainty='estimated';
 if(override){start=etGregToJdn(override.year,override.month,override.day);certainty=override.certainty;}
 list.push(event(id,en,am,type,start,start,closed,certainty,enNote,amNote));
}
function getEvents(year){
 var list=[],n=getNineveh(year).jdn,gregYear=year+8;
 addEth(list,year,'enkutatash','Enkutatash · Ethiopian New Year','እንቁጣጣሽ · የኢትዮጵያ አዲስ ዓመት','public',1,1,null,null,true,'fixed','Ethiopian New Year; a national public holiday.','የኢትዮጵያ አዲስ ዓመት፤ ብሔራዊ የዕረፍት ቀን።');
 addEth(list,year,'meskel','Meskel · Finding of the True Cross','መስቀል','public',1,17,null,null,true,'fixed','Finding of the True Cross; a national public holiday.','የመስቀሉ በዓል፤ ብሔራዊ የዕረፍት ቀን።');
 addEth(list,year,'genna','Genna · Ethiopian Christmas','ገና · የኢትዮጵያ የልደት በዓል','public',4,29,null,null,true,'fixed','Ethiopian Orthodox Christmas; a national public holiday.','የኢትዮጵያ ኦርቶዶክስ የልደት በዓል፤ ብሔራዊ የዕረፍት ቀን።');
 addEth(list,year,'timket','Timket · Ethiopian Epiphany','ጥምቀት','public',5,11,null,null,true,'fixed','Ethiopian Epiphany; a national public holiday.','የጥምቀት በዓል፤ ብሔራዊ የዕረፍት ቀን።');
 addGreg(list,gregYear,'adwa','Adwa Victory Day','የዓድዋ ድል በዓል','public',3,2,true,'fixed','Commemorates the victory at Adwa.','የዓድዋን ድል ያከብራል።');
 addGreg(list,gregYear,'labour','International Labour Day','ዓለም አቀፍ የሠራተኞች ቀን','public',5,1,true,'fixed','International workers’ day.','ዓለም አቀፍ የሠራተኞች ቀን።');
 addGreg(list,gregYear,'patriots','Patriots’ Victory Day','የአርበኞች ድል ቀን','public',5,5,true,'fixed','Honours Ethiopian patriots.','የኢትዮጵያ አርበኞችን ያከብራል።');
 addGreg(list,gregYear,'derg','Downfall of the Derg','የደርግ ውድቀት ቀን','observance',5,28,false,'fixed','National observance; not presented as a current nationwide closure.','ብሔራዊ የመታሰቢያ ቀን፤ እንደ ብሔራዊ ዕረፍት አይቀርብም።');
 addEth(list,year,'advent','Fast of the Prophets · Advent','ጾመ ነቢያት','fasting',3,16,4,28,false,'fixed','Forty fasting days before Genna; the calendar span is 43 days.','ከገና በፊት አርባ የጾም ቀናት፤ የቀን ክልሉ 43 ቀናት ነው።');
 addEth(list,year,'gahad-genna','Gahad · Christmas Eve fast','ጾመ ገሃድ · የገና ዋዜማ','fasting',4,28,null,null,false,'fixed','Vigil fast before Genna.','ከገና በፊት የዋዜማ ጾም።');
 addEth(list,year,'gahad-timket','Gahad · Epiphany Eve fast','ጾመ ገሃድ · የጥምቀት ዋዜማ','fasting',5,10,null,null,false,'fixed','Vigil fast before Timket.','ከጥምቀት በፊት የዋዜማ ጾም።');
 addEth(list,year,'filseta','Filseta · Fast of the Assumption','ጾመ ፍልሰታ','fasting',12,1,12,15,false,'fixed','Fasting period leading to the Feast of the Assumption.','ወደ ፍልሰታ በዓል የሚወስድ የጾም ወቅት።');
 addEth(list,year,'assumption','Feast of the Assumption','ፍልሰታ · የእመ ብርሃን ወረቀት','orthodox',12,16,null,null,false,'fixed','Feast of the Assumption of Saint Mary.','የቅድስት ድንግል ማርያም ፍልሰታ በዓል።');
 list.push(event('nineveh','Fast of Nineveh','ጾመ ነነዌ','fasting',n,n+2,false,'calculated','Three-day fast beginning on Monday; calculated through Bahire Hasab.','ሰኞ የሚጀምር ሦስት ቀን ጾም፤ በባሕረ ሃሳብ ይሰላል።'));
 list.push(event('great-lent','Great Lent · Abiy Tsom','ዐቢይ ጾም · ሁዳዴ','fasting',n+14,n+68,false,'calculated','Fifty-five-day Great Fast ending on the Saturday before Fasika.','እስከ ፋሲካ ቅዳሜ ድረስ 55 ቀናት የሚቆይ ዐቢይ ጾም።'));
 list.push(event('hosanna','Hosanna · Palm Sunday','ሆሳዕና','orthodox',n+62,n+62,false,'calculated','Palm Sunday; moves with the Orthodox Paschal cycle.','የሆሳዕና በዓል፤ ከፋሲካ ዑደት ጋር ይንቀሳቀሳል።'));
 list.push(event('siklet','Siklet · Ethiopian Good Friday','ስቅለት','public',n+67,n+67,true,'calculated','Ethiopian Good Friday; a national public holiday.','የኢትዮጵያ ስቅለት፤ ብሔራዊ የዕረፍት ቀን።'));
 list.push(event('fasika','Fasika · Ethiopian Easter','ፋሲካ · የትንሣኤ በዓል','public',n+69,n+69,true,'calculated','Ethiopian Orthodox Easter; a national public holiday.','የኢትዮጵያ ኦርቶዶክስ የትንሣኤ በዓል፤ ብሔራዊ የዕረፍት ቀን።'));
 list.push(event('rikbe-kahnat','Rikbe Kahnat','ርክበ ካህናት','orthodox',n+93,n+93,false,'calculated','Movable Orthodox observance.','ሚንቀሳቀስ የኦርቶዶክስ በዓል።'));
 list.push(event('ascension','Ascension','የጌታ ዕርገት','orthodox',n+108,n+108,false,'calculated','Forty days after Fasika.','ከፋሲካ አርባ ቀናት በኋላ።'));
 list.push(event('pentecost','Pentecost · Paraclete','ጰራቅሊጦስ','orthodox',n+118,n+118,false,'calculated','Fifty days after Fasika.','ከፋሲካ ሃምሳ ቀናት በኋላ።'));
 var apostlesEnd=etEthToJdn(year,11,5);
 list.push(event('apostles-fast','Apostles’ Fast · Tsome Hawariat','ጾመ ሐዋርያት','fasting',n+119,apostlesEnd,false,'calculated','Begins after Pentecost and ends on Hamle 5; length varies by year.','ከጰራቅሊጦስ በኋላ ይጀምራል እና ሐምሌ 5 ያበቃል፤ ቆይታው በዓመት ይለያያል።'));
 var approximateGregorianStart=etJdnToGreg(etEthToJdn(year,1,1)).year;
 for(var hy=approximateGregorianStart-580;hy<=approximateGregorianStart-577;hy++){
  var ramadanStart=islamicToJdn(hy,9,1),eidStart=islamicToJdn(hy,10,1),ramadanG=etJdnToGreg(ramadanStart);
  list.push(event('ramadan-'+hy,'Ramadan · estimated fasting month','ረመዳን · ግምታዊ የጾም ወር','islamic',ramadanStart,eidStart-1,false,'estimated','Tabular Hijri estimate; official start depends on moon sighting.','የሂጅራ ስሌት ግምት፤ ኦፊሴላዊ መጀመሪያው በጨረቃ ምልከታ ይረጋገጣል።'));
  addIslamic(list,'eid-fitr','Eid al-Fitr','ኢድ አልፈጥር','public',hy,10,1,true,'End of Ramadan; confirm by official moon-sighting announcement.','የረመዳን መጨረሻ፤ በኦፊሴላዊ የጨረቃ ምልከታ ያረጋግጡ።');
  addIslamic(list,'arafah','Day of Arafah','የዓረፋ ቀን','islamic',hy,12,9,false,'Day before Eid al-Adha; subject to moon sighting.','ከኢድ አልአድሃ አንድ ቀን በፊት፤ በጨረቃ ምልከታ ይረጋገጣል።');
  addIslamic(list,'eid-adha','Eid al-Adha · Arefa','ኢድ አልአድሃ · ዓረፋ','public',hy,12,10,true,'Festival of Sacrifice; confirm by official moon-sighting announcement.','የዓረፋ በዓል፤ በኦፊሴላዊ የጨረቃ ምልከታ ያረጋግጡ።');
  addIslamic(list,'mawlid','Mawlid · Prophet’s Birthday','መውሊድ','public',hy,3,12,true,'Prophet Muhammad’s birthday; confirm by official moon-sighting announcement.','የነቢዩ ሙሐመድ ልደት፤ በኦፊሴላዊ የጨረቃ ምልከታ ያረጋግጡ።');
  addIslamic(list,'ashura','Ashura','ዓሹራ','islamic',hy,1,10,false,'Islamic observance; subject to moon sighting.','የእስላም በዓል፤ በጨረቃ ምልከታ ይረጋገጣል።');
 }
 var yearStart=etEthToJdn(year,1,1),yearEnd=etEthToJdn(year+1,1,1)-1;
 var seen={};
 return list.filter(function(e){
  var key=e.id+'-'+e.start;if(seen[key])return false;seen[key]=true;
  return e.end>=yearStart&&e.start<=yearEnd;
 }).sort(function(a,b){return a.start-b.start||a.en.localeCompare(b.en);});
}
function eventsOn(jdn,year){return getEvents(year).filter(function(e){return e.start<=jdn&&e.end>=jdn;});}
function nextEvent(dateJdn,year){
 var events=getEvents(year).concat(getEvents(year+1));
 var current=events.filter(function(e){return e.start<=dateJdn&&e.end>=dateJdn;}).sort(function(a,b){return a.closed===b.closed?0:a.closed?-1:1;})[0];
 var upcoming=events.filter(function(e){return e.start>dateJdn;}).sort(function(a,b){return a.start-b.start||Number(b.closed)-Number(a.closed);})[0];
 return {current:current||null,upcoming:upcoming||null};
}
function eatNowParts(){
 var parts=new Intl.DateTimeFormat('en-US',{timeZone:'Africa/Addis_Ababa',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric',second:'numeric',hourCycle:'h23'}).formatToParts(new Date()),v={};
 parts.forEach(function(p){if(p.type!=='literal')v[p.type]=Number(p.value);});return v;
}
function countdown(targetJdn){
 var now=eatNowParts(),nowJ=etGregToJdn(now.year,now.month,now.day),days=targetJdn-nowJ;
 var nowSeconds=now.hour*3600+now.minute*60+now.second,total=Math.max(0,days*86400-nowSeconds);
 return {days:Math.floor(total/86400),hours:Math.floor(total%86400/3600),minutes:Math.floor(total%3600/60),seconds:total%60,past:days<0};
}
function escapeIcs(s){return s.replace(/\\/g,'\\\\').replace(/;/g,'\\;').replace(/,/g,'\\,').replace(/\n/g,'\\n');}
function icsDate(jdn){var g=etJdnToGreg(jdn);return String(g.year)+String(g.month).padStart(2,'0')+String(g.day).padStart(2,'0');}
function toIcs(events){
 var lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//EthioSync//Ethiopian Holidays//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH'];
 events.forEach(function(e){lines.push('BEGIN:VEVENT','UID:'+e.id+'-'+icsDate(e.start)+'@ethiosync.cyou','DTSTART;VALUE=DATE:'+icsDate(e.start),'DTEND;VALUE=DATE:'+icsDate(e.end+1),'SUMMARY:'+escapeIcs(e.en+(e.certainty==='estimated'||e.certainty==='tentative'?' (Tentative)':'')),'DESCRIPTION:'+escapeIcs(e.enNote),'TRANSP:TRANSPARENT','END:VEVENT');});
 lines.push('END:VCALENDAR');return lines.join('\r\n');
}
global.EthioHolidays={getEvents:getEvents,eventsOn:eventsOn,nextEvent:nextEvent,getNineveh:getNineveh,countdown:countdown,toIcs:toIcs,icsDate:icsDate};
})(window);
