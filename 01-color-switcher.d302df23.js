const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop"),d=document.body;let r=null;function n(t){t.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}t.addEventListener("click",(function(l){if(r)return;r=setInterval(n,1e3,d),t.setAttribute("disabled","disabled"),e.removeAttribute("disabled")})),e.addEventListener("click",(function(d){clearInterval(r),t.removeAttribute("disabled"),e.setAttribute("disabled","disabled"),r=null}));
//# sourceMappingURL=01-color-switcher.d302df23.js.map