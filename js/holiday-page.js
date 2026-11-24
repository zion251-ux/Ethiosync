/* Interactive holiday explorer for EthioSync. */
(function(){
'use strict';
var $=function(id){return document.getElementById(id);},today=etJdnToEth(etGregToJdn(etEatToday().year,etEatToday().month,etEatToday().day));
var currentYear=today.year,filtered=[],nextTarget=null;
var labels={
 en:{next:'Next observance',current:'Observed now: ',none:'No current fasting period or observance.',days:'Days',hours:'Hours',minutes:'Minutes',seconds:'Seconds',today:'Today',past:'Past',now:'Now · day ',of:' of ',day:' day',dayPlural:' days',left:' left',results:' observances',showing:'Showing ',forYear:' for Ethiopian year ',no:'No matching observances. Try another search or category.',public:'Public holiday',fasting:'Fasting',orthodox:'Orthodox feast',islamic:'Islamic observance',observance:'National observance',fixed:'Fixed',calculated:'Calculated',confirmed:'Reviewed',tentative:'Tentative',estimated:'Estimated',until:'Until '},
 am:{next:'ቀጣይ በዓል',current:'አሁን የሚከበር፦ ',none:'አሁን የጾም ወቅት ወይም በዓል የለም።',days:'ቀናት',hours:'ሰዓቶች',minutes:'ደቂቃዎች',seconds:'ሰከንዶች',today:'ዛሬ',past:'ያለፈ',now:'አሁን · ቀን ',of:' ከ ',day:' ቀን',dayPlural:' ቀናት',left:' ቀርቶት',results:' በዓላት እና ጾሞች',showing:'የሚታዩ ',forYear:' ለ2019 ዓ.ም.',no:'የሚዛመድ በዓል አልተገኘም። ፍለጋውን ወይም ምድቡን ይቀይሩ።',public:'የሕዝብ ዕረፍት',fasting:'ጾም',orthodox:'የኦርቶዶክስ በዓል',islamic:'የእስላም በዓል',observance:'ብሔራዊ መታሰቢያ',fixed:'ቋሚ',calculated:'የተሰላ',confirmed:'የተገመገመ',tentative:'ግምታዊ',estimated:'ግምት',until:'እስከ '}
};
function L(){return document.documentElement.lang==='am'?labels.am:labels.en;}
function am(){return document.documentElement.lang==='am';}
function name(e){return am()?e.am:e.en;}
function shortEth(j){var e=etJdnToEth(j);return e.day+' '+ET_MONTHS[e.month-1][am()?1:0]+' '+e.year+(am()?' ዓ.ም.':' EC');}
function shortGreg(j){var g=etJdnToGreg(j);return new Date(Date.UTC(g.year,g.month-1,g.day)).toLocaleDateString(am()?'am-ET':'en-GB',{weekday:'short',day:'numeric',month:'short',year:'numeric',timeZone:'UTC'});}
function rangeText(e,calendar){var fn=calendar==='eth'?shortEth:shortGreg;return e.start===e.end?fn(e.start):fn(e.start)+' – '+fn(e.end);}
function status(e){var t=L(),j=etGregToJdn(etEatToday().year,etEatToday().month,etEatToday().day),duration=e.end-e.start+1;if(j<e.start){var d=e.start-j;return {text:d+(d===1?t.day:t.dayPlural)+t.left,cls:'upcoming'};}if(j<=e.end)return {text:e.start===j&&e.end===j?t.today:t.now+(j-e.start+1)+t.of+duration,cls:'current'};return {text:t.past,cls:'past'};}
function certainty(e){var t=L();return '<span class="certainty certainty-'+e.certainty+'">'+t[e.certainty]+'</span>';}
function filteredEvents(){
 var query=$('hol-search').value.trim().toLocaleLowerCase(),type=$('hol-type').value,upcoming=$('hol-upcoming').checked,j=etGregToJdn(etEatToday().year,etEatToday().month,etEatToday().day);
 return EthioHolidays.getEvents(currentYear).filter(function(e){return (!query||(e.en+' '+e.am).toLocaleLowerCase().includes(query))&&(type==='all'||e.type===type)&&(!upcoming||e.end>=j);});
}
function render(){
 var t=L();filtered=filteredEvents();$('hol-summary').textContent=t.showing+filtered.length+t.results+(am()?' ለ'+currentYear+' ዓ.ም.':' for Ethiopian year '+currentYear);
 $('hol-output').innerHTML=filtered.map(function(e){var s=status(e);return '<tr class="holiday-row-'+e.type+(e.closed?' is-closed':'')+'"><td data-label="'+(am()?'በዓል':'Observance')+'"><div class="holiday-name"><i class="dot dot-'+(e.type==='public'?'public':e.type==='fasting'?'fasting':'observance')+'"></i><div><strong>'+name(e)+'</strong><p>'+(am()?e.amNote:e.enNote)+'</p>'+certainty(e)+'</div></div></td><td data-label="'+(am()?'ምድብ':'Category')+'"><span class="type-label type-'+e.type+'">'+t[e.type]+'</span></td><td data-label="'+(am()?'የኢትዮጵያ ቀን':'Ethiopian date')+'">'+rangeText(e,'eth')+'</td><td data-label="'+(am()?'የግሪጎሪያን ቀን':'Gregorian date')+'">'+rangeText(e,'greg')+'</td><td data-label="'+(am()?'ሁኔታ':'Status')+'"><span class="date-status '+s.cls+'">'+s.text+'</span></td></tr>';}).join('');
 $('hol-empty').hidden=filtered.length>0;$('hol-empty').textContent=t.no;
 document.querySelector('.holiday-table-wrap').hidden=filtered.length===0;
}
function renderNext(){
 var t=L(),j=etGregToJdn(etEatToday().year,etEatToday().month,etEatToday().day),data=EthioHolidays.nextEvent(j,today.year),next=data.upcoming;
 nextTarget=next?next.start:null;
 if(next){$('hol-next-name').textContent=name(next);$('hol-next-date').textContent=rangeText(next,'greg')+' · '+rangeText(next,'eth');}else{$('hol-next-name').textContent='—';$('hol-next-date').textContent='';}
 var current=EthioHolidays.getEvents(today.year).filter(function(e){return e.start<=j&&e.end>=j;});$('hol-current').textContent=current.length?t.current+current.map(name).join(' · '):t.none;
 $('next-holiday-title').textContent=t.next;updateCountdown();
}
function updateCountdown(){
 var t=L(),ids=['days','hours','minutes','seconds'];if(!nextTarget){$('cd-days').textContent='—';return;}var c=EthioHolidays.countdown(nextTarget);
 [c.days,c.hours,c.minutes,c.seconds].forEach(function(v,i){$('cd-'+ids[i]).textContent=String(v).padStart(2,'0');$('cd-'+ids[i]).nextElementSibling.textContent=t[ids[i]];});
}
function download(filename,content,type){var blob=new Blob([content],{type:type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(url);},500);}
$('hol-year').addEventListener('change',function(){var y=Number(this.value);if(Number.isInteger(y)&&y>=1900&&y<=2100){currentYear=y;render();}else this.value=currentYear;});
$('hol-prev').onclick=function(){currentYear=Math.max(1900,currentYear-1);$('hol-year').value=currentYear;render();};
$('hol-next').onclick=function(){currentYear=Math.min(2100,currentYear+1);$('hol-year').value=currentYear;render();};
$('hol-today').onclick=function(){currentYear=today.year;$('hol-year').value=currentYear;render();};
['hol-search','hol-type','hol-upcoming'].forEach(function(id){$(id).addEventListener(id==='hol-search'?'input':'change',render);});
$('hol-ics').onclick=function(){download('ethiosync-holidays-'+currentYear+'.ics',EthioHolidays.toIcs(filtered),'text/calendar;charset=utf-8');};
$('hol-csv').onclick=function(){var rows=[['Name','Amharic name','Category','Start Gregorian','End Gregorian','Ethiopian date','Confidence']].concat(filtered.map(function(e){return [e.en,e.am,e.type,EthioHolidays.icsDate(e.start),EthioHolidays.icsDate(e.end),rangeText(e,'eth'),e.certainty];}));var csv='\ufeff'+rows.map(function(r){return r.map(function(v){return '"'+String(v).replace(/"/g,'""')+'"';}).join(',');}).join('\r\n');download('ethiosync-holidays-'+currentYear+'.csv',csv,'text/csv;charset=utf-8');};
document.addEventListener('ethiosync:languagechange',function(){renderNext();render();});
$('hol-year').value=currentYear;renderNext();render();setInterval(updateCountdown,1000);setInterval(renderNext,60000);
})();
