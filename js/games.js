/* EthioSync offline educational games: complete local loops, no network. */
(function(){
'use strict';
var $=function(id){return document.getElementById(id);},audioContext=null;
function am(){return document.documentElement.lang==='am';}
function t(en,amText){return am()?amText:en;}
function setText(id,en,amText){$(id).textContent=t(en,amText);}
function shuffle(items){var a=items.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),v=a[i];a[i]=a[j];a[j]=v;}return a;}
function getBest(key){try{var raw=localStorage.getItem('ethiosync-game-'+key);if(raw===null||raw==='')return null;var n=Number(raw);return Number.isInteger(n)&&n>=0?n:null;}catch(e){return null;}}
function setBest(key,value){try{localStorage.setItem('ethiosync-game-'+key,String(value));}catch(e){}}
var soundOn=true;try{soundOn=localStorage.getItem('ethiosync-game-sound')!=='off';}catch(e){}
function tone(kind){if(!soundOn)return;try{audioContext=audioContext||new (window.AudioContext||window.webkitAudioContext)();var ctx=audioContext,notes=kind==='win'?[523,659,784]:kind==='bad'?[180]:[440,660];notes.forEach(function(freq,i){var osc=ctx.createOscillator(),gain=ctx.createGain(),at=ctx.currentTime+i*.09;osc.type='sine';osc.frequency.value=freq;gain.gain.setValueAtTime(.0001,at);gain.gain.exponentialRampToValueAtTime(.075,at+.012);gain.gain.exponentialRampToValueAtTime(.0001,at+.13);osc.connect(gain);gain.connect(ctx.destination);osc.start(at);osc.stop(at+.14);});}catch(e){}}
function renderSound(){var b=$('game-sound');b.setAttribute('aria-pressed',String(soundOn));b.innerHTML='<i class="fa-solid '+(soundOn?'fa-volume-high':'fa-volume-xmark')+'"></i> '+t('Sound on','ድምፅ በርቷል');if(!soundOn)b.innerHTML='<i class="fa-solid fa-volume-xmark"></i> '+t('Sound off','ድምፅ ጠፍቷል');}
$('game-sound').addEventListener('click',function(){soundOn=!soundOn;try{localStorage.setItem('ethiosync-game-sound',soundOn?'on':'off');}catch(e){}renderSound();if(soundOn)tone('ok');});

var pairs=[['ሀ','ha'],['ለ','le'],['ሐ','ha'],['መ','me'],['ሰ','se'],['ረ','re']];
var memory={status:'title',cards:[],open:[],matched:0,moves:0,lock:false};
function renderMemoryStats(){$('memory-moves').textContent=memory.moves;$('memory-pairs').textContent=memory.matched+'/6';var best=getBest('memory');$('memory-best').textContent=best==null?'—':best;$('memory-pause').disabled=memory.status==='title'||memory.status==='win';$('memory-pause').textContent=memory.status==='paused'?t('Resume','ቀጥል'):t('Pause','አቁም');}
function memoryBoard(){
 var grid=$('memory-grid');grid.innerHTML='';memory.cards.forEach(function(card,i){var b=document.createElement('button');b.type='button';b.className='memory-card';b.dataset.index=i;b.setAttribute('aria-label',t('Hidden card ','የተዘጋ ካርድ ')+(i+1));b.textContent='?';b.addEventListener('click',function(){flipMemory(i,b);});grid.appendChild(b);});
}
function startMemory(){var resume=memory.status==='paused';memory.status='playing';if(!resume){memory.cards=shuffle(pairs.reduce(function(a,p,i){a.push({pair:i,text:p[0]},{pair:i,text:p[1]});return a;},[]));memory.open=[];memory.matched=0;memory.moves=0;memory.lock=false;memoryBoard();setText('memory-message','Find the matching letter and sound.','ፊደሉን እና ድምፁን ያመሳስሉ።');}$('memory-start').hidden=true;$('memory-grid').hidden=false;renderMemoryStats();}
function flipMemory(i,b){if(memory.status!=='playing'||memory.lock||memory.open.indexOf(i)>=0||b.classList.contains('matched'))return;b.textContent=memory.cards[i].text;b.classList.add('open');b.setAttribute('aria-label',memory.cards[i].text);memory.open.push(i);tone('ok');if(memory.open.length===2){memory.moves++;var a=memory.open[0],c=memory.open[1],buttons=$('memory-grid').children;if(memory.cards[a].pair===memory.cards[c].pair){buttons[a].classList.add('matched');buttons[c].classList.add('matched');buttons[a].disabled=true;buttons[c].disabled=true;memory.matched++;memory.open=[];setText('memory-message','Pair matched.','ጥንዱ ተመሳስሏል።');if(memory.matched===6){memory.status='win';var best=getBest('memory');if(best===null||memory.moves<best)setBest('memory',memory.moves);setText('memory-message','You matched all six pairs in '+memory.moves+' moves. Start again to improve.','ስድስቱንም ጥንዶች በ'+memory.moves+' እንቅስቃሴ አመሳስለዋል። እንደገና ይጀምሩ።');tone('win');setTimeout(function(){memory.status='title';$('memory-start').hidden=false;$('memory-grid').hidden=true;$('memory-begin').textContent=t('Play again','እንደገና ይጫወቱ');renderMemoryStats();},900);}}else{memory.lock=true;setText('memory-message','Not a pair — remember their positions.','አይመሳሰሉም — ቦታቸውን ያስታውሱ።');setTimeout(function(){buttons[a].textContent='?';buttons[c].textContent='?';buttons[a].classList.remove('open');buttons[c].classList.remove('open');memory.open=[];memory.lock=false;},650);}renderMemoryStats();}}
function pauseMemory(){if(memory.status==='playing'){memory.status='paused';$('memory-grid').hidden=true;$('memory-start').hidden=false;$('memory-begin').textContent=t('Resume game','ጨዋታ ቀጥል');setText('memory-message','Game paused.','ጨዋታ ቆሟል።');}else if(memory.status==='paused')startMemory();renderMemoryStats();}
$('memory-begin').addEventListener('click',startMemory);$('memory-pause').addEventListener('click',pauseMemory);

var questions=[
 {q:['How many months does the Ethiopian calendar have?','የኢትዮጵያ ቀን መቁጠሪያ ስንት ወራት አሉት?'],o:[['12','12'],['13','13'],['14','14'],['11','11']],a:1,why:['Twelve months have 30 days, followed by Pagume.','አሥራ ሁለቱ ወራት 30 ቀን አላቸው፤ ከዚያ ጳጉሜ ይመጣል።']},
 {q:['Which month begins the Ethiopian year?','የኢትዮጵያ ዓመት የሚጀምረው በየትኛው ወር ነው?'],o:[['Nehase','ነሐሴ'],['Tahsas','ታኅሣሥ'],['Meskerem','መስከረም'],['Pagume','ጳጉሜ']],a:2,why:['Meskerem 1 is Enkutatash, Ethiopian New Year.','መስከረም 1 እንቁጣጣሽ፣ የኢትዮጵያ አዲስ ዓመት ነው።']},
 {q:['How many days does Pagume usually have?','ጳጉሜ በመደበኛነት ስንት ቀን አለው?'],o:[['Five','አምስት'],['Six','ስድስት'],['Four','አራት'],['Thirty','ሠላሳ']],a:0,why:['Pagume has five days, or six in the leap cycle.','ጳጉሜ አምስት ቀን አለው፤ በሌፕ ዑደት ስድስት ይሆናል።']},
 {q:['Which Ethiopian year is a leap year under the modulo-four rule?','በአራት ሞዱሎ ሕግ የትኛው ዓመት ሌፕ ነው?'],o:[['2019 EC','2019 ዓ.ም.'],['2018 EC','2018 ዓ.ም.'],['2020 EC','2020 ዓ.ም.'],['2021 EC','2021 ዓ.ም.']],a:0,why:['2019 divided by 4 leaves remainder 3.','2019 በ4 ሲካፈል 3 ቀሪ ይሰጣል።']},
 {q:['Which holiday is Ethiopian Christmas?','የኢትዮጵያ የልደት በዓል የትኛው ነው?'],o:[['Timket','ጥምቀት'],['Meskel','መስቀል'],['Genna','ገና'],['Fasika','ፋሲካ']],a:2,why:['Genna is celebrated on Tahsas 29.','ገና በታኅሣሥ 29 ይከበራል።']},
 {q:['What is Timket?','ጥምቀት ምንድን ነው?'],o:[['Ethiopian Easter','የኢትዮጵያ ፋሲካ'],['Ethiopian Epiphany','የኢትዮጵያ የጥምቀት በዓል'],['New Year','አዲስ ዓመት'],['Victory Day','የድል ቀን']],a:1,why:['Timket is the Ethiopian Orthodox Epiphany celebration.','ጥምቀት የኢትዮጵያ ኦርቶዶክስ የጥምቀት በዓል ነው።']},
 {q:['Which fast anchors the movable Orthodox calendar cycle?','ሚንቀሳቀሰውን የኦርቶዶክስ ዑደት የሚመሰርተው የትኛው ጾም ነው?'],o:[['Filseta','ፍልሰታ'],['Advent','ጾመ ነቢያት'],['Nineveh','ጾመ ነነዌ'],['Apostles','ጾመ ሐዋርያት']],a:2,why:['Bahire Hasab calculations locate Nineveh as the anchor.','የባሕረ ሃሳብ ስሌት ነነዌን እንደ መሠረት ያገኛል።']},
 {q:['How many days after Nineveh does Great Lent begin?','ዐቢይ ጾም ከነነዌ ስንት ቀን በኋላ ይጀምራል?'],o:[['3','3'],['14','14'],['40','40'],['55','55']],a:1,why:['Great Lent begins fourteen days after Nineveh starts.','ዐቢይ ጾም ነነዌ ከጀመረ አሥራ አራት ቀን በኋላ ይጀምራል።']}
];
var quiz={status:'title',index:0,score:0,answered:false,choice:null};
function renderQuizStats(){$('quiz-score').textContent=quiz.score;$('quiz-count').textContent=Math.min(quiz.index+1,8)+'/8';var best=getBest('quiz');$('quiz-best').textContent=best==null?'—':best+'/8';$('quiz-pause').disabled=quiz.status==='title'||quiz.status==='win';$('quiz-pause').textContent=quiz.status==='paused'?t('Resume','ቀጥል'):t('Pause','አቁም');}
function renderQuestion(){var item=questions[quiz.index],wrap=$('quiz-wrap'),progress=((quiz.index)/8)*100;wrap.innerHTML='<div class="quiz-progress"><i style="width:'+progress+'%"></i></div><div class="quiz-question">'+item.q[am()?1:0]+'</div><div class="quiz-options">'+item.o.map(function(o,i){return '<button class="quiz-option" data-answer="'+i+'">'+o[am()?1:0]+'</button>';}).join('')+'</div><p class="game-message" id="quiz-feedback"></p>';wrap.querySelectorAll('[data-answer]').forEach(function(b){b.addEventListener('click',function(){answerQuiz(Number(b.dataset.answer));});});quiz.answered=false;}
function startQuiz(){var resume=quiz.status==='paused';quiz.status='playing';if(!resume){quiz.index=0;quiz.score=0;setText('quiz-message','Choose the best answer.','ተስማሚውን መልስ ይምረጡ።');renderQuestion();}$('quiz-start').hidden=true;$('quiz-wrap').hidden=false;renderQuizStats();}
function answerQuiz(answer){if(quiz.status!=='playing'||quiz.answered)return;quiz.answered=true;quiz.choice=answer;var item=questions[quiz.index],buttons=$('quiz-wrap').querySelectorAll('[data-answer]');buttons.forEach(function(b){var i=Number(b.dataset.answer);b.disabled=true;if(i===item.a)b.classList.add('correct');});buttons[answer].classList.add(answer===item.a?'correct':'wrong');if(answer===item.a){quiz.score++;tone('ok');}else tone('bad');$('quiz-feedback').textContent=item.why[am()?1:0];var next=document.createElement('button');next.className='btn btn-primary btn-sm';next.textContent=quiz.index===7?t('See result','ውጤት ተመልከት'):t('Next question','ቀጣይ ጥያቄ');next.addEventListener('click',function(){if(quiz.index===7){quiz.status='win';var best=getBest('quiz');if(best===null||quiz.score>best)setBest('quiz',quiz.score);setText('quiz-message','Finished with '+quiz.score+' out of 8.','ከ8 '+quiz.score+' አግኝተዋል።');tone('win');$('quiz-start').hidden=false;$('quiz-wrap').hidden=true;$('quiz-begin').textContent=t('Play again','እንደገና ይጫወቱ');renderQuizStats();}else{quiz.index++;renderQuestion();renderQuizStats();}});$('quiz-feedback').after(next);renderQuizStats();}
function pauseQuiz(){if(quiz.status==='playing'){quiz.status='paused';$('quiz-wrap').hidden=true;$('quiz-start').hidden=false;$('quiz-begin').textContent=t('Resume quiz','ጥያቄ ቀጥል');setText('quiz-message','Quiz paused.','ጥያቄው ቆሟል።');}else if(quiz.status==='paused')startQuiz();renderQuizStats();}
$('quiz-begin').addEventListener('click',startQuiz);$('quiz-pause').addEventListener('click',pauseQuiz);

var months=[['Meskerem','መስከረም'],['Tikimt','ጥቅምት'],['Hidar','ኅዳር'],['Tahsas','ታኅሣሥ'],['Tir','ጥር'],['Yekatit','የካቲት'],['Megabit','መጋቢት'],['Miyazya','ሚያዝያ'],['Ginbot','ግንቦት'],['Sene','ሰኔ'],['Hamle','ሐምሌ'],['Nehase','ነሐሴ'],['Pagume','ጳጉሜ']];
var monthGame={status:'title',next:0,mistakes:0,pool:[]};
function renderMonthStats(){$('months-placed').textContent=monthGame.next+'/13';$('months-mistakes').textContent=monthGame.mistakes;var best=getBest('months');$('months-best').textContent=best==null?'—':best;$('months-pause').disabled=monthGame.status==='title'||monthGame.status==='win';$('months-pause').textContent=monthGame.status==='paused'?t('Resume','ቀጥል'):t('Pause','አቁም');}
function renderMonths(){setText('months-next','Next: '+months[monthGame.next][0]+' / '+months[monthGame.next][1],'ቀጣይ፦ '+months[monthGame.next][1]);$('month-pool').innerHTML='';monthGame.pool.forEach(function(i){if(i<monthGame.next)return;var b=document.createElement('button');b.className='month-chip';b.textContent=months[i][am()?1:0];b.addEventListener('click',function(){chooseMonth(i);});$('month-pool').appendChild(b);});$('month-sequence').innerHTML='';for(var i=0;i<monthGame.next;i++){var s=document.createElement('span');s.className='month-chip';s.textContent=(i+1)+'. '+months[i][am()?1:0];$('month-sequence').appendChild(s);}renderMonthStats();}
function startMonths(){var resume=monthGame.status==='paused';monthGame.status='playing';if(!resume){monthGame.next=0;monthGame.mistakes=0;monthGame.pool=shuffle(months.map(function(_,i){return i;}));setText('months-message','Select the next month.','ቀጣዩን ወር ይምረጡ።');renderMonths();}$('months-start').hidden=true;$('months-wrap').hidden=false;renderMonthStats();}
function chooseMonth(i){if(monthGame.status!=='playing')return;if(i===monthGame.next){monthGame.next++;tone('ok');if(monthGame.next===13){monthGame.status='win';var best=getBest('months');if(best===null||monthGame.mistakes<best)setBest('months',monthGame.mistakes);setText('months-message','The year is complete with '+monthGame.mistakes+' mistakes.','ዓመቱን በ'+monthGame.mistakes+' ስህተቶች አጠናቀዋል።');tone('win');$('months-start').hidden=false;$('months-wrap').hidden=true;$('months-begin').textContent=t('Play again','እንደገና ይጫወቱ');}else{setText('months-message','Correct. Keep going.','ትክክል። ይቀጥሉ።');renderMonths();}}else{monthGame.mistakes++;tone('bad');setText('months-message','Not yet — find '+months[monthGame.next][am()?1:0]+'.','አይደለም — '+months[monthGame.next][am()?1:0]+' ይፈልጉ።');}renderMonthStats();}
function pauseMonths(){if(monthGame.status==='playing'){monthGame.status='paused';$('months-wrap').hidden=true;$('months-start').hidden=false;$('months-begin').textContent=t('Resume game','ጨዋታ ቀጥል');setText('months-message','Game paused.','ጨዋታ ቆሟል።');}else if(monthGame.status==='paused')startMonths();renderMonthStats();}
$('months-begin').addEventListener('click',startMonths);$('months-pause').addEventListener('click',pauseMonths);

function switchGame(name){document.querySelectorAll('.game-tab').forEach(function(b){b.setAttribute('aria-selected',String(b.dataset.game===name));});['memory','quiz','months'].forEach(function(n){$('game-'+n).hidden=n!==name;});}
document.querySelectorAll('.game-tab').forEach(function(b){b.addEventListener('click',function(){switchGame(b.dataset.game);});});
document.addEventListener('ethiosync:languagechange',function(){
 renderSound();renderMemoryStats();renderQuizStats();renderMonthStats();
 if(memory.status==='playing')setText('memory-message','Find the matching letter and sound.','ፊደሉን እና ድምፁን ያመሳስሉ።');
 if(memory.status==='paused'){$('memory-begin').textContent=t('Resume game','ጨዋታ ቀጥል');setText('memory-message','Game paused.','ጨዋታ ቆሟል።');}
 if(memory.status==='title'){
  $('memory-begin').textContent=memory.matched===6?t('Play again','እንደገና ይጫወቱ'):t('Start matching','ማመሳሰል ጀምር');
  if(memory.matched===6)setText('memory-message','You matched all six pairs in '+memory.moves+' moves. Start again to improve.','ስድስቱንም ጥንዶች በ'+memory.moves+' እንቅስቃሴ አመሳስለዋል። እንደገና ይጀምሩ።');
 }
 if(quiz.status==='playing'){
  if(quiz.answered&&quiz.choice===questions[quiz.index].a)quiz.score--;
  renderQuestion();renderQuizStats();setText('quiz-message','Choose the best answer.','ተስማሚውን መልስ ይምረጡ።');
 }
 if(quiz.status==='paused'){$('quiz-begin').textContent=t('Resume quiz','ጥያቄ ቀጥል');setText('quiz-message','Quiz paused.','ጥያቄው ቆሟል።');}
 if(quiz.status==='title'||quiz.status==='win'){
  $('quiz-begin').textContent=quiz.index===7?t('Play again','እንደገና ይጫወቱ'):t('Start quiz','ጥያቄ ጀምር');
  if(quiz.index===7)setText('quiz-message','Finished with '+quiz.score+' out of 8.','ከ8 '+quiz.score+' አግኝተዋል።');
 }
 if(monthGame.status==='playing'){renderMonths();setText('months-message','Select the next month.','ቀጣዩን ወር ይምረጡ።');}
 if(monthGame.status==='paused'){$('months-begin').textContent=t('Resume game','ጨዋታ ቀጥል');setText('months-message','Game paused.','ጨዋታ ቆሟል።');}
 if(monthGame.status==='title'||monthGame.status==='win'){
  $('months-begin').textContent=monthGame.next===13?t('Play again','እንደገና ይጫወቱ'):t('Start ordering','ማደራደር ጀምር');
  if(monthGame.next===13)setText('months-message','The year is complete with '+monthGame.mistakes+' mistakes.','ዓመቱን በ'+monthGame.mistakes+' ስህተቶች አጠናቀዋል።');
 }
});
renderSound();renderMemoryStats();renderQuizStats();renderMonthStats();
})();
