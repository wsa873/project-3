(()=>{var e={603:e=>{const t=e=>{document.getElementById("errorMessage").textContent=e,document.getElementById("domoMessage").classList.remove("hidden")};e.exports={handleError:t,sendPost:async(e,o,a)=>{const r=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}),m=await r.json();document.getElementById("domoMessage").classList.add("hidden"),m.error&&t(m.error),m.redirect&&(window.location=m.redirect),a&&a(m)},hideError:()=>{document.getElementById("domoMessage").classList.add("hidden")}}}},t={};function o(a){var r=t[a];if(void 0!==r)return r.exports;var m=t[a]={exports:{}};return e[a](m,m.exports,o),m.exports}(()=>{const e=o(603),t=t=>{t.preventDefault(),e.hideError();const o=t.target.querySelector("#domoName").value,a=t.target.querySelector("#domoAge").value,r=t.target.querySelector("#domoColor").value,c=t.target.querySelector("#_csrf").value;return o&&a&&r?(e.sendPost(t.target.action,{name:o,age:a,color:r,_csrf:c},m),!1):(e.handleError("All fields are required!"),!1)},a=e=>React.createElement("form",{id:"domoForm",name:"domoForm",onSubmit:t,action:"/maker",method:"POST",className:"domoForm"},React.createElement("label",{htmlFor:"name"},"Name: "),React.createElement("input",{id:"domoName",type:"text",name:"name",placeholder:"Domo Name"}),React.createElement("label",{htmlFor:"age"},"Age: "),React.createElement("input",{id:"domoAge",type:"number",min:"0",name:"age"}),React.createElement("input",{id:"_csrf",type:"hidden",name:"_csrf",value:e.csrf}),React.createElement("input",{className:"makeDomoSubmit",type:"submit",value:"Make Domo"}),React.createElement("label",{htmlFor:"color"},"Body Color: "),React.createElement("input",{id:"domoColor",type:"text",name:"color",placeholder:"Domo Color"})),r=e=>{if(0===e.domos.length)return React.createElement("div",{className:"domoList"},React.createElement("h3",{className:"emptyDomo"},"No Domos Yet!"));const t=e.domos.map((e=>React.createElement("div",{key:e._id,className:"domo"},React.createElement("img",{src:"/assets/img/domoface.jpeg",alt:"domo face",className:"domoFace"}),React.createElement("h3",{className:"domoName"},"Name: ",e.name," "),React.createElement("h3",{className:"domoAge"},"Age: ",e.age),React.createElement("h3",{className:"domoColor"},"Color: ",e.color))));return React.createElement("div",{className:"domoList"},t)},m=async()=>{const e=await fetch("/getDomos"),t=await e.json();ReactDOM.render(React.createElement(r,{domos:t.domos}),document.getElementById("domos"))};window.onload=async()=>{const e=await fetch("/getToken"),t=await e.json();ReactDOM.render(React.createElement(a,{csrf:t.csrfToken}),document.getElementById("makeDomo")),ReactDOM.render(React.createElement(r,{domos:[]}),document.getElementById("domos")),m()}})()})();