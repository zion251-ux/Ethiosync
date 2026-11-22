/* =========================================================
   EthioSync — shared Ethiopian calendar core (Gregorian <-> Ethiopian)
   ========================================================= */
const ET_MONTHS=[['Meskerem','መስከረም'],['Tikimt','ጥቅምት'],['Hidar','ኅዳር'],['Tahsas','ታኅሣሥ'],['Tir','ጥር'],['Yekatit','የካቲት'],['Megabit','መጋቢት'],['Miyazya','ሚያዝያ'],['Ginbot','ግንቦት'],['Sene','ሰኔ'],['Hamle','ሐምሌ'],['Nehase','ነሐሴ'],['Pagume','ጳጉሜ']];
function etGregToJdn(y,m,d){const a=Math.floor((14-m)/12),y2=y+4800-a,m2=m+12*a-3;return d+Math.floor((153*m2+2)/5)+365*y2+Math.floor(y2/4)-Math.floor(y2/100)+Math.floor(y2/400)-32045;}
function etJdnToGreg(j){const a=j+32044,b=Math.floor((4*a+3)/146097),c=a-Math.floor((146097*b)/4),d=Math.floor((4*c+3)/1461),e=c-Math.floor((1461*d)/4),m=Math.floor((5*e+2)/153);return {year:100*b+d-4800+Math.floor(m/10),month:m+3-12*Math.floor(m/10),day:e-Math.floor((153*m+2)/5)+1};}
function etEthToJdn(y,m,d){return 1724220+365*(y-1)+Math.floor(y/4)+30*(m-1)+d;}
function etJdnToEth(j){let y=Math.floor((4*(j-1724221)+1461)/1461);while(etEthToJdn(y,1,1)>j)y--;while(etEthToJdn(y+1,1,1)<=j)y++;const m=Math.floor((j-etEthToJdn(y,1,1))/30)+1;return {year:y,month:m,day:j-etEthToJdn(y,m,1)+1};}
function etIsEthLeap(y){return y%4===3;}
function etEthMonthDays(y,m){return m===13?(etIsEthLeap(y)?6:5):30;}
function etValidEth(y,m,d){return Number.isInteger(y)&&y>=1&&Number.isInteger(m)&&m>=1&&m<=13&&Number.isInteger(d)&&d>=1&&d<=etEthMonthDays(y,m);}
function etEatToday(){const p=new Intl.DateTimeFormat('en-US',{timeZone:'Africa/Addis_Ababa',year:'numeric',month:'numeric',day:'numeric'}).formatToParts(new Date()),v={};p.forEach(x=>{if(x.type!=='literal')v[x.type]=Number(x.value)});return {year:v.year,month:v.month,day:v.day};}
function etFmtGreg(g){return new Date(Date.UTC(g.year,g.month-1,g.day)).toLocaleDateString('en-GB',{weekday:'long',year:'numeric',month:'long',day:'numeric',timeZone:'UTC'});}
function etFmtEth(e){return ET_MONTHS[e.month-1][0]+' '+e.day+', '+e.year+' EC · '+e.day+' '+ET_MONTHS[e.month-1][1]+' '+e.year;}
