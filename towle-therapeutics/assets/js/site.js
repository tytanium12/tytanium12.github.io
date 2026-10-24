(function(){"use strict";
const toggle=document.querySelector('.menu-toggle');const nav=document.getElementById('primary-nav');
if(toggle&&nav){toggle.addEventListener('click',function(){let expanded=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!expanded));nav.classList.toggle('is-open',!expanded);});nav.addEventListener('click',function(e){if(e.target.closest('a')){nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');}});}
const form=document.getElementById('research-inquiry');if(!form)return;
const copy=document.getElementById('copy-inquiry'),status=document.getElementById('inquiry-status');let draft='';
function val(name){const item=form.elements.namedItem(name);return item&&typeof item.value==='string'?item.value.trim():'';}
form.addEventListener('submit',function(e){e.preventDefault();if(!form.checkValidity()){form.reportValidity();return;}
const services=Array.from(form.querySelectorAll('input[name="service"]:checked')).map(x=>x.value).join(', ')||'Not specified';
const lines=['TOWLE THERAPEUTICS — INITIAL NONCONFIDENTIAL RESEARCH INQUIRY','',
'Name: '+val('name'),'Email: '+val('email'),'Institution: '+val('organization'),'Role: '+val('role'),'Research area: '+val('area'),'',
'Research objective: '+val('question'),'','Interested services: '+services,'Available materials: '+val('materials'),'Desired deliverables: '+val('deliverables'),
'Timeline: '+val('timeline'),'Estimated budget: '+val('budget'),'Restrictions (nonconfidential): '+val('restrictions'),'',
'I acknowledge this initial inquiry contains no confidential research materials.'];draft=lines.join('\n');copy.disabled=false;
const subject='Computational chemistry research inquiry — '+val('name');
const uri='mailto:contact@towlevision.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(draft);
status.textContent='Your email application should open with the inquiry. Review and send the message yourself. If it does not open, select Copy Inquiry Text and email contact@towlevision.com.';
window.location.href=uri;
});
copy.addEventListener('click',async function(){if(!draft)return;try{await navigator.clipboard.writeText(draft);status.textContent='Inquiry text copied. Paste it into an email to contact@towlevision.com.';}catch(e){status.textContent='Clipboard unavailable. Please open your email application or use the alternate TowleVision inquiry form.';}});
})();