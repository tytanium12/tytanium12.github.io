(function(){"use strict";
const toggle=document.querySelector('.menu-toggle');const nav=document.getElementById('primary-nav');
if(toggle&&nav){toggle.addEventListener('click',function(){const expanded=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!expanded));nav.classList.toggle('is-open',!expanded);});nav.addEventListener('click',function(e){if(e.target.closest('a')){nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');}});}
const form=document.getElementById('research-inquiry');if(!form)return;
const status=document.getElementById('inquiry-status');const button=form.querySelector('button[type="submit"]');
let busy=false;
function report(message,kind){status.textContent=message;status.dataset.state=kind;}
form.addEventListener('submit',async function(e){
 e.preventDefault();if(busy)return;
 if(!form.checkValidity()){form.reportValidity();return;}
 const data=new FormData(form);
 const services=Array.from(form.querySelectorAll('input[name="service"]:checked')).map(el=>el.value);
 data.delete('service');data.set('services_of_interest',services.join(', ')||'Not specified');
 data.delete('safe');data.set('nonconfidential_acknowledgment','Confirmed');
 data.set('subject','Towle Therapeutics research inquiry — '+String(data.get('name')||'Unknown'));
 const payload=Object.fromEntries(data.entries());
 if(payload.botcheck){report('Please try again.','error');return;}
 busy=true;button.disabled=true;button.textContent='Submitting…';report('Submitting your inquiry securely…','pending');
 try{
   const response=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload)});
   const outcome=await response.json();
   if(!response.ok||outcome.success!==true)throw new Error('Submission not accepted');
   form.reset();report('Your research inquiry was submitted successfully. We will review it and contact you by email.','success');
 }catch(error){report('We could not confirm your submission. Your answers are still here; please retry or email contact@towlevision.com.','error');}
 finally{busy=false;button.disabled=false;button.textContent='Submit Research Inquiry →';}
});
})();
