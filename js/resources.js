/* Offline creator-resource actions. */
(function(){
'use strict';
function lang(){return document.documentElement.lang==='am'?'am':'en';}
function status(en,am){document.getElementById('resource-status').textContent=lang()==='am'?am:en;}
function copyText(text){
 if(navigator.clipboard&&window.isSecureContext){return navigator.clipboard.writeText(text);}
 return new Promise(function(resolve,reject){var area=document.createElement('textarea');area.value=text;area.style.position='fixed';area.style.opacity='0';document.body.appendChild(area);area.select();try{if(!document.execCommand('copy'))throw new Error('Copy unavailable');resolve();}catch(e){reject(e);}area.remove();});
}
document.querySelectorAll('.copy-caption').forEach(function(button){button.addEventListener('click',function(){var card=button.closest('.caption-card').querySelector('blockquote');copyText(card.dataset[lang()].replace(/\\n/g,'\n')).then(function(){status('Caption copied. Paste it into your editor.','መግለጫው ተቀድቷል። ወደ ኤዲተርዎ ይለጥፉ።');}).catch(function(){status('Copy was blocked. Select the caption text manually.','ቅጂ አልተፈቀደም። መግለጫውን በእጅ ይምረጡ።');});});});
document.getElementById('download-srt').addEventListener('click',function(){
 var srt='1\n00:00:00,000 --> 00:00:03,500\nThe Ethiopian calendar has 13 months.\nየኢትዮጵያ ቀን መቁጠሪያ 13 ወራት አሉት።\n\n2\n00:00:03,500 --> 00:00:07,000\nHere is the part most people miss…\nብዙ ሰዎች የሚያመልጣቸው ነጥብ ይህ ነው…\n\n3\n00:00:07,000 --> 00:00:11,000\nSave this for your next video.\nለቀጣይ ቪዲዮዎ ይህን ያስቀምጡ።\n';
 var blob=new Blob(['\ufeff'+srt],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='ethiosync-amharic-caption-example.srt';document.body.appendChild(a);a.click();a.remove();setTimeout(function(){URL.revokeObjectURL(url);},500);status('SRT example downloaded. Adjust timings to match your speech.','የSRT ምሳሌው ወርዷል። ሰዓቶቹን ከንግግርዎ ጋር ያስተካክሉ።');
});
})();
