import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f as g,i as l}from"./assets/vendor-4e7582a4.js";const d={invalid:{message:"Please select a date and time first.",position:"topRight",timeout:2e3,progressBar:!1,transitionIn:"bounceInDown",transitionOut:"fadeOutUp"},valid:{message:"Time is up!",position:"topRight",timeout:5e3,progressBar:!1,transitionIn:"bounceInDown",transitionOut:"fadeOutUp"},caution:{message:"Please choose a date in the future",position:"topRight",timeout:2e3,progressBar:!1,transitionIn:"bounceInDown",transitionOut:"fadeOutUp"}};let i=null;const n={input:document.querySelector("#datetime-picker"),startBtn:document.querySelector("[data-start]"),timerDisplay:document.querySelectorAll(".value")};g(n.input,{enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){const e=Date.now();if(i=t[0].getTime(),e>=i){l.info(d.caution),n.startBtn.disabled=!0;return}n.startBtn.disabled=!1}});const y=(t,e)=>{const o=Date.now(),s=i-o;if(s<0){clearInterval(t),n.input.disabled=!1,l.success(d.valid);return}const{days:m,hours:a,minutes:u,seconds:c}=D(s);[r(m),r(a),r(u),r(c)].forEach((p,h)=>{n.timerDisplay[h].textContent=p})};n.startBtn.addEventListener("click",t=>{if(!i){l.info(d.invalid);return}const e=t.currentTarget;e.disabled=!0,n.input.disabled=!0;const o=setInterval(()=>{y(o)},1e3)});function D(t){const a=Math.floor(t/864e5),u=Math.floor(t%864e5/36e5),c=Math.floor(t%864e5%36e5/6e4),f=Math.floor(t%864e5%36e5%6e4/1e3);return{days:a,hours:u,minutes:c,seconds:f}}function r(t){try{return String(t).padStart(2,"0")}catch{console.error("The incoming parameter is not of type string")}}
//# sourceMappingURL=commonHelpers2.js.map
