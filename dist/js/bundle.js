!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var o={host:""};const i=o.host+"/header",a=o.host+"/login",s=o.checkToken;async function r(){try{return await fetch(i,{method:"post",mod:"cors",headers:{"Content-Type":"application/json"}}).then(e=>e.json()).then(e=>e)}catch(e){return console.log(e),null}}function c(){return sessionStorage.getItem("token")||localStorage.getItem("token")||null}const l=document.querySelector(".container");function d(){sessionStorage.clear(),localStorage.clear(),window.location.hash="",l.innerHTML='\n        <div id="login_form">\n            <div id="makesend_logo">\n                <img src="https://static.wixstatic.com/media/9b8311_7e3822433af34553bc9afd08e9c5f56e~mv2.png/v1/fill/w_220,h_80,al_c,q_85,usm_0.66_1.00_0.01/logo_edited.webp" alt="eridu_logo">\n            </div>\n            <form action="" autocomplete="off">\n                <div class="mb-3">\n                    <label for="email" class="form-label">Email</label>\n                    <input type="text" class="form-control" id="email" aria-describedby="emailHelp"\n                        autocomplete="off">\n                    <div class="invalid-feedback">Your email is not correct</div>\n                </div>\n                <div class="mb-3">\n                    <label for="password" class="form-label">Password</label>\n                    <input type="password" class="form-control" id="password">\n                    <div class="invalid-feedback">Your password is not correct</div>\n                </div>\n                <div class="mb-3 form-check">\n                    <input type="checkbox" class="form-check-input" id="remember_me" checked>\n                    <label class="form-check-label" for="remember_me">Remember me</label>\n                </div>\n                <button type="submit" class="btn btn-primary">Login</button>\n                <div>\n                    <a href="#forgetpassword">Forget Password?</a>\n                </div>\n            </form>\n        </div>\n    ';const e=document.querySelector("#login_form"),t=document.querySelector("#email"),n=document.querySelector("#password"),o=document.querySelector("#remember_me");function i(){n.classList.remove("is-invalid"),t.classList.remove("is-invalid")}t.addEventListener("input",i),n.addEventListener("input",i),e.addEventListener("submit",(async function(e){e.preventDefault();const i=t.value,s=n.value;if(i&&s){if(i&&s){if(await async function(e="",t="",n=!1){let o=await r();const i=await fetch(a,{method:"post",headers:{"Content-type":"application/json","Client-Token":o["Client-Token"],"Time-Stamp":o["Time-Stamp"],"Time-Signature":o["Time-Signature"]},body:JSON.stringify({email:e,password:t,keepAlive:n?1:0})}).then(e=>e.json()).then(e=>e).catch(e=>e);return 200===i.resCode&&(n?localStorage.setItem("token",i.token):sessionStorage.setItem("token",i.token),window.location.hash="dashboard",!0)}(i,s,o.checked))return}t.classList.add("is-invalid"),n.classList.add("is-invalid")}else t.classList.add("is-invalid"),n.classList.add("is-invalid")}))}function u(e,t=window.location.href){e=e.replace(/[\[\]]/g,"\\$&");const n=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(t);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null}function p(e="dashboard"){const t=document.querySelector(".container"),n=document.querySelector("footer");t.innerHTML="",n.innerHTML='\n        <div class="navigator">\n            <div>\n                <a href="#scanner" class="" id="navi_scanner">\n                    <i class="fas fa-qrcode"></i>\n                    <span>Scan</span>\n                </a>\n            </div>\n            <div>\n                <a href="#search" class="" id="navi_search">\n                    <i class="fas fa-search"></i>\n                    <span>Search</span>\n                </a>\n            </div>\n            <div>\n                <a href="#tasks" class="" id="navi_tasks">\n                    <i class="fas fa-tasks"></i>\n                    <span>Tasks</span>\n                </a>\n            </div>\n            <div>\n                <a href="#setting" class="" id="navi_setting">\n                    <i class="fas fa-cog"></i>\n                    <span>Setting</span>\n                </a>\n            </div>\n        </div>\n    ',function(e){const t=document.querySelector("#navi_scanner"),n=document.querySelector("#navi_search"),o=document.querySelector("#navi_tasks"),i=document.querySelector("#navi_setting");switch([o,n,t,i].forEach(e=>{e.classList.remove("selected")}),e){case"dashboard":n.classList.add("selected");break;case"scanner":t.classList.add("selected");break;case"tasks":o.classList.add("selected");break;case"setting":i.classList.add("selected");break;default:n.classList.add("selected")}}(e)}const m={otp:"",ref:"",pending:60,userPhone:null,timeStamp:0,countdownTimer:null};function f(){document.querySelector(".container").innerHTML='\n    <div id="login_form">\n        <div id="makesend_logo">\n            <img src="https://static.wixstatic.com/media/9b8311_7e3822433af34553bc9afd08e9c5f56e~mv2.png/v1/fill/w_220,h_80,al_c,q_85,usm_0.66_1.00_0.01/logo_edited.webp" alt="eridu_logo">\n        </div>\n        <h1>Reset Password</h1>\n        <hr>\n        <div id="phone_otp_input">\n        </div>\n        <hr>\n        <div id="backToLogin">\n            <a class="btn btn-primary" href="#">Back to Login</a>\n        </div>\n    </div>\n    ';const e=document.querySelector("#phone_otp_input");if(e){const t='\n        <form action="" method="post" id="submit_phone">\n            <label for="driver_phone" class="form-label">Please enter your phone</label>\n            <div>\n                <input class="form-control" id="driver_phone" type="tel" name="receiver_phone" value=""\n                    inputmode="numeric" placeholder="#0632166699" autocomplete="off" pattern="[0-9]{10}">\n                <button type="submit"><i class="fa fa-search"></i></button>\n                <div id="error_hint" class="invalid-feedback">Phone number starts with 0 and has 10 digits!</div>\n            </div>\n        </form>\n        ';e.innerHTML=t;const n=e.querySelector("#submit_phone");if(e&&n){n.onsubmit=async function n(o){o.stopPropagation(),o.preventDefault();const i=o.target.querySelector("input");i.oninput=function(){this.classList.remove("is-invalid")};const a=i.value;if(/^0\d{9}/g.test(a)){e.innerHTML=g();const o={resCode:200,message:"success"};if(200===o.resCode)console.log(o),m.ref=o.otpRef,m.userPhone=a,m.timeStamp=(new Date).getTime(),e.innerHTML=v(m.userPhone),h(),function e(){const t=document.querySelector("#phone_otp_input"),n=document.querySelector(".digit-group").querySelectorAll("input");n.length&&(n[0].focus(),n.forEach(n=>{n.onchange=async function(n){const o=this.parentNode,i=n.target.value;if(document.querySelector("#invalid_otp").innerText="",i){const e=o.querySelector("input#"+this.dataset.next);e&&e.focus()}else if(i){if(m.otp="",formTag.querySelectorAll("input").forEach(e=>{m.otp+=e.value}),4===m.otp.length&&"0000"===m.otp){m.otp;t.innerHTML=g();const n={resCode:200,message:"success"};if(200===n.resCode)console.log(n),b();else{t.innerHTML=v(m.userPhone,m.pending);document.querySelector("#invalid_otp").innerText="Invalid OTP Code!",e(),h()}}}else{const e=o.querySelector("input#"+this.dataset.previous);e&&e.focus()}},n.onkeyup=async function(n){const o=this.parentNode,i=o.parentNode;if(document.querySelector("#invalid_otp").innerText="",8===n.keyCode||37===n.keyCode){const e=o.querySelector("input#"+this.dataset.previous);e&&e.focus()}else if(n.keyCode>=48&&n.keyCode<=57||n.keyCode>=65&&n.keyCode<=90||n.keyCode>=96&&n.keyCode<=105||39===n.keyCode){const n=o.querySelector("input#"+this.dataset.next);if(n)n.focus();else if(m.otp="",i.querySelectorAll("input").forEach(e=>{m.otp+=e.value}),4===m.otp.length){m.otp;t.innerHTML=g();const n={resCode:200,message:"success"};if(200===n.resCode)console.log(n),b();else{t.innerHTML=v(m.userPhone,m.pending);document.querySelector("#invalid_otp").innerText="Invalid OTP Code!",e(),h()}}}}}))}();else{e.innerHTML=t;e.querySelector("#submit_phone").onsubmit=n,console.log(o.message),alert(o.message)}}else i.classList.add("is-invalid")}}}}function h(e=60){m.countdownTimer&&clearTimeout(m.countdownTimer);const t=document.querySelector("#countdown");if(t){const e=(new Date).getTime();let n=m.pending,o=Math.floor((e-m.timeStamp)/1e3);if(o>=60?n=0:o<60&&60!==n&&(n=60-o),n>0)m.pending=n-1,t.innerText=m.pending,m.countdownTimer=setTimeout((function(){h(m.pending)}),1e3);else{const e=document.querySelector("#insert_otp button");e.removeAttribute("disabled"),t.parentNode.innerHTML="",e.onclick=function(t){t.preventDefault(),m.pending=60,e.setAttribute("disabled",!0),document.querySelector("#insert_otp button span").innerHTML=`(<span id="countdown">${m.pending}</span> sec)`,h(m.pending)}}}}function g(){return'\n        <div id="otp_loader">\n            <div class="spinner-border text-warning" style="width:3rem; height:3rem;" role="status">\n                <span class="visually-hidden">Loading...</span>\n            </div>\n            <h4>Loading...</h4>\n        </div>\n    '}function v(e=null,t=60){return`\n    <form class="digit-group" data-group-name="digits" autocomplete="off" id="insert_otp">\n        <div>\n            <h3>Enter OTP Code</h3>\n            <h3>Phone: ${e}</h3>\n        </div>\n        <div>\n            <input autocomplete="off" type="text" inputmode="numeric" id="digit-1" name="digit-1" data-next="digit-2" maxlength="1" />\n            <input autocomplete="off" type="text" inputmode="numeric" id="digit-2" name="digit-2" data-next="digit-3" data-previous="digit-1"\n                maxlength="1" />\n            <input autocomplete="off" type="text" inputmode="numeric" id="digit-3" name="digit-3" data-next="digit-4" data-previous="digit-2"\n                maxlength="1" />\n            <input autocomplete="off" type="text" inputmode="numeric" id="digit-4" name="digit-4" data-previous="digit-3" maxlength="1" />\n        </div>\n        <div id="invalid_otp"></div>\n        <div>\n            <button class="btn btn-primary" type="submit" disabled>Request OTP <span>(<span id="countdown">${t}</span> sec)</span></button>\n        </div>\n    </form>\n    `}function b(){document.querySelector("#phone_otp_input").innerHTML='\n        <form action="" autocomplete="off" id="reset_password_form">\n            <div class="mb-3">\n                <label for="password" class="form-label">New Password</label>\n                <input type="password" class="form-control" id="password" required>\n                <div class="invalid-feedback">Your password do not match</div>\n            </div>\n            <div class="mb-3">\n                <label for="password_repeat" class="form-label">Confirm password</label>\n                <input type="password" class="form-control" id="password_repeat" required>\n                <div class="invalid-feedback">Your password do not match</div>\n            </div>\n            <div>\n                <button type="submit" class="btn btn-primary">Reset Password</button>\n            </div>\n        </form>\n    ';const e=document.querySelector("#reset_password_form"),t=e.querySelector("button"),n=[...e.querySelectorAll("input")];n.forEach(e=>{e.oninput=function(){n.forEach(e=>{e.classList.remove("is-invalid")})}}),t.onclick=async function(e){e.preventDefault();const t=n.map(e=>e.value?e.value:null);if(t[0]===t[1]&&t[0]){const e={resCode:200,message:"success"};200===e.resCode?(alert(e.message),window.location.hash=""):(console.log(e.message),alert(e.message))}else n.forEach(e=>{e.classList.add("is-invalid")})}}const y=o.uploadEndpoint;function _(e){const t=document.querySelector("footer");t.remove();const n=document.querySelector(".container"),o=document.createElement("div");o.className="modal-dialog modal-dialog-scrollable update-pod",o.innerHTML=`\n    <div class="modal-content">\n        <div class="modal-header">\n            <h5 class="modal-title" id="exampleModalScrollableTitle">Tracking ID: ${e}</h5>\n            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>\n        </div>\n        <div class="modal-body">\n            <div id="signature_upload" class="signature-pad">\n                <div class="signature-pad--body">\n                    <canvas id="signature_canvas">This browser doesn't support canvas</canvas>\n                </div>\n                <div class="signature-pad--footer">\n                    <div class="description">Sign above</div>\n                    <div class="signature-pad--actions">\n                        <div>\n                            <button type="button" class="button clear" data-action="clear">Clear</button>\n                            <button type="button" class="button" data-action="undo">Undo</button>\n                        </div>\n                        <div>\n                            <button type="button" class="button save" data-action="save-png">Save\n                                as\n                                PNG</button>\n                            <button type="button" class="button save" data-action="save-jpg">Save\n                                as\n                                JPG</button>                            \n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class="modal-footer">\n            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>\n            <button type="button" class="btn btn-primary" data-action="upload-signature">Upload</button>\n        </div>\n    </div>\n    `;n.appendChild(o);const i=o.querySelector("[data-action=clear]"),a=o.querySelector("[data-action=undo]"),s=o.querySelector("[data-action=save-png]"),l=o.querySelector("[data-action=save-jpg]"),u=o.querySelector("#signature_canvas"),p=new SignaturePad(u,{backgroundColor:"rgb(255, 255, 255)"});function m(){u.width=u.offsetWidth,u.height=u.offsetHeight,u.getContext("2d"),p.clear()}function f(e,t){const n=function(e){const t=e.split(";base64,"),n=t[0].split(":")[1],o=window.atob(t[1]),i=o.length,a=new Uint8Array(i);for(let e=0;e<i;++e)a[e]=o.charCodeAt(e);return new Blob([a],{type:n})}(e),o=window.URL.createObjectURL(n),i=document.createElement("a");i.style="display: none",i.href=o,i.download=t,document.body.appendChild(i),i.click(),window.URL.revokeObjectURL(o)}window.addEventListener("resize",m),m(),i.addEventListener("click",(function(e){p.clear()})),a.addEventListener("click",(function(e){const t=p.toData();t&&(t.pop(),p.fromData(t))})),s.addEventListener("click",(function(e){if(p.isEmpty())alert("Please provide a signature first.");else{f(p.toDataURL(),"signature.png")}})),l.addEventListener("click",(function(e){if(p.isEmpty())alert("Please provide a signature first.");else{f(p.toDataURL("image/jpeg"),"signature.jpg")}}));n.querySelector("[data-action=upload-signature]").onclick=async function(t){const n=p.toDataURL("image/jpeg"),o=c();if(o){const t=await r(),i=await fetch(y,{method:"post",headers:{"Content-Type":"application/json","User-Token":""+o,"Client-Token":t["Client-Token"],"Time-Stamp":t["Time-Stamp"],"Time-Signature":t["Time-Signature"]},body:JSON.stringify({trackingID:e,type:"signature",PODImage:[n],fileName:"signatuer_"+e})}).then(e=>e.json()).then(e=>e).catch(e=>alert(e));if(200===i.resCode&&i.result.length){const t=`upload signature for ${e} success!`;console.log(t),alert(t),h()}else{const t=`Error! Upload signature for ${e} failed!`;console.log(t),alert(t)}}else alert("token is invalid!"),d()};n.querySelector(".modal-header button").onclick=h;function h(){o.remove(),n.insertAdjacentElement("afterend",t)}n.querySelector(".modal-footer button").onclick=h}const S=o.uploadEndpoint,w={files:[],compressedFiles:[]};function k(e){const t=document.querySelector("footer");t.remove();const n=document.querySelector(".container"),o=document.createElement("div");o.className="modal-dialog modal-dialog-scrollable update-pod",o.innerHTML=`\n    <div class="modal-content">\n        <div class="modal-header">\n            <h5 class="modal-title" id="exampleModalScrollableTitle">Tracking ID: ${e}</h5>\n            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>\n        </div>\n        <div class="modal-body">\n            <div id="photo_upload">\n                <div class="custom-file-container" data-upload-id="imageUploader">\n                    <div class="image-upload-btns">\n                        <label class="custom-file-container__custom-file card shadow bg-white roundedcard shadow bg-white rounded">\n                            <div id="photo_btn">\n                                <img src="https://img.icons8.com/plasticine/camera.png" alt="photo_button">\n                                <p>Take a photo</p>\n                            </div>\n                            <input type="file" class="custom-file-container__custom-file__custom-file-input"\n                                accept="image/jpeg, image/png, image/gif" multiple aria-label="Choose File" style="display:none" />\n                            <input type="hidden" name="MAX_FILE_SIZE" value="10485760" style="display:none" />\n                            <span class="custom-file-container__custom-file__custom-file-control" style="display:none"></span>\n                        </label>\n                        \n                    </div>\n                    <div class="custom-file-container__image-preview"></div>\n                    <label><span>Remove All Photos</span>\n                            <a href="javascript:void(0)" class="custom-file-container__image-clear"\n                                title="Clear Image">&times;</a>\n                        </label>\n                </div>\n            </div>\n        </div>\n        <div class="modal-footer">\n            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>\n            <button type="button" class="btn btn-primary" data-action="upload-image">Upload</button>\n        </div>\n    </div>\n    `,n.appendChild(o);let i=new FileUploadWithPreview("imageUploader");n.querySelector("[data-action=upload-image]").onclick=async function(t){const n=i.cachedFileArray;n.length&&n.forEach(t=>{const o=new FileReader;o.readAsDataURL(t),o.onload=function(t){const o=document.createElement("img");o.src=t.target.result,o.onload=function(t){const o=document.createElement("canvas"),s=400/t.target.width;o.width=400,o.height=t.target.height*s;const l=o.getContext("2d");l.drawImage(t.target,0,0,o.width,o.height);const d=l.canvas.toDataURL(t.target,"image/jpeg",.92);w.compressedFiles.push(d),w.compressedFiles.length===n.length&&async function(t=[],n){const o=c(),i=await r();o?await fetch(S,{method:"post",headers:{"Content-Type":"application/json","User-Token":""+o,"Client-Token":i["Client-Token"],"Time-Stamp":i["Time-Stamp"],"Time-Signature":i["Time-Signature"]},body:JSON.stringify({trackingID:e,type:"image",PODImage:t,fileName:`pod_${e}_${(new Date).toISOString()}`})}).then(e=>e.json()).then(t=>{if(200===t.resCode&&t.result.length){const o=t.result.length>1?"images":"image",i=`upload ${t.result.length} ${o} for ${e} success!`;console.log(i),alert(i),n.clearPreviewPanel(),a()}else{const t=`upload image for ${e} failed`;console.log(t),alert(t)}}).catch(e=>{alert(e)}):(alert("token is invalid!"),userLogin())}(w.compressedFiles,i)}}})};n.querySelector(".modal-header button").onclick=a;function a(){o.remove(),n.insertAdjacentElement("afterend",t)}n.querySelector(".modal-footer button").onclick=a}const T=""+o.searchParcelByPhone,q=""+o.searchParcelById,L={input:"",timeoutId:null,parcels:[]};function C(){document.querySelector("form").onsubmit=function(e){e.preventDefault(),x()}}function P(){document.querySelector("input").oninput=function(e){L.input=e.target.value,document.querySelector("#result_list ul").innerHTML="",L.timeoutId&&clearTimeout(L.timeoutId);const t=setTimeout((function(){x()}),300);L.timeoutId=t}}function x(){const e=document.querySelector("input");"receiver_phone"===e.id?async function(e){if(e.match(/^0\d{9}/g))try{const t=await r(),n=await fetch(T,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json","User-Token":""+(localStorage.getItem("token")||sessionStorage.getItem("token")),"Client-Token":t["Client-Token"],"Time-Stamp":t["Time-Stamp"],"Time-Signature":t["Time-Signature"]},body:JSON.stringify({receiver_phone:e})}).then(e=>e.json()).then(e=>e);L.parcels=n.map(e=>{const t=new Date(Date.parse(e.service_date)).toLocaleDateString().split("/");return e.service_date=`${t[2]}-${t[0]}-${t[1]}`,e}),L.parcels.length?D():$()}catch(e){j(e)}else{E("Phone number starts with 0 and is in 10 digits!")}}(L.input):"tracking_id"===e.id&&I(L.input)}async function I(e){const t=/^[eE][xX]\d{13}/g.exec(e);if(t)try{const e=await r(),n=await fetch(q,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json","User-Token":""+(localStorage.getItem("token")||sessionStorage.getItem("token")),"Client-Token":e["Client-Token"],"Time-Stamp":e["Time-Stamp"],"Time-Signature":e["Time-Signature"]},body:JSON.stringify({trackingId:t[0]})}).then(e=>e.json()).then(e=>e);if(L.parcels=n.map(e=>{const t=new Date(Date.parse(e.service_date)).toLocaleDateString().split("/");return e.service_date=`${t[2]}-${t[0]}-${t[1]}`,e}),L.parcels.length)return D(),n;$()}catch(e){j(e)}else{E("Your tracking ID is invalid!")}}function E(e){document.querySelector("#result_list ul").innerHTML='\n    <li id="input_error" class="list-group-item" style="color: red; font-weight: bold;"></li>\n    ',document.querySelector("#input_error").innerText=e}function $(){document.querySelector("#result_list ul").innerHTML='\n    <li id="input_error" class="list-group-item" style="color: red; font-weight: bold;"></li>\n    ',document.querySelector("#input_error").innerText=`No result from "${L.input}"`}function D(){console.log(L.parcels);const e=L.parcels.map(e=>{let t="",n="";switch(e.status.toLowerCase().trim()){case"pending":case"in hub":case"delivering":case"delivering (delay)":case"returning":case"re-deilvering":t="primary";break;case"delivered":case"delivered (delay)":case"returned":t="primary",n="disabled";break;case"canceled":case"failed delivery":case"not found":t="danger",n="disabled";break;default:t="primary"}return`\n        <li class="list-group-item">\n            <div class="card" data-shipment-id="${e.shipmentID}">\n                <div class="card-body">\n                    <h5 class="card-title">Parcel ID: ${e.shipmentID}</h5>\n                    <h6 class="card-subtitle mb-2 text-muted">Service Date: ${e.service_date}</h6>\n                    <h6 class="card-subtitle mb-2 text-muted">Delivery Status: ${e.status}</h6>\n                    <p class="card-text">${e.receiver_name} ${e.receiver_no}</p>\n                    <p class="card-text">${e.dropoff_address}, ${e.dropoff_district}, ${e.dropoff_province} ${e.dropoff_postcode}</p>\n                    <p class="card-text">${e.note}</p>\n                    <div class="card-link btn btn-${t} ${n}" data-type="photo">Photo</div>\n                    <div class="card-link btn btn-${t} ${n}" data-type="signature">Singature</div>\n                </div>\n            </div>\n        </li>\n        `}).join("");document.querySelector("#result_list ul").innerHTML=e;[...document.querySelector(".list-group.list-group-flush").children].forEach(e=>{const t=e.querySelector(".card");e.querySelector("div[data-type=signature]").addEventListener("click",(function(e){e.preventDefault(),e.stopPropagation(),_(t.dataset.shipmentId)}));e.querySelector("div[data-type=photo]").addEventListener("click",(function(e){e.preventDefault(),e.stopPropagation(),k(t.dataset.shipmentId)}))})}function j(e){const t=document.querySelector("header");t.innerHTML=`\n    <div id="warning" class="alert alert-danger" role="alert">\n        Something went wrong: ${e}\n    </div>\n    `,setTimeout((function(){t.innerHTML=""}),30)}const M={id:null,parcelId:null};function H(){const e=document.querySelector("header");e.style.display="block",e.innerHTML='\n        <div id="header">Search parcel</div>\n    ';const t='\n    <form action="">\n        <input class="form-control" id="receiver_phone" type="tel" name="receiver_phone" value=""\n            inputmode="numeric" placeholder="#0632166699" autocomplete="off" pattern="[0-9]{10}">\n        <button type="submit"><i class="fa fa-search"></i></button>\n    </form>\n    ';let n=t;const o=window.location.hash.split("?")[0];M.id=u("id"),M.parcelId=u("parcelId");let i="warning",a="dark";o.includes("trackingid")?(n='\n    <form action="" class="form-group">\n        <input class="form-control" id="tracking_id" type="text" name="tracking_id" value=""\n            placeholder="#EX1234567890123" autocomplete="off">\n        <button type="submit"><i class="fa fa-search"></i></button>        \n    </form>\n    ',i="dark",a="warning"):n=t;const s=document.querySelector(".container");if(s.style.justifyContent="space-between",s.innerHTML=`\n    <div id="search_parcel">\n        <div id="search_functions">\n            <div id="search_by_phone_btn" class="btn btn-${i}">Receiver Phone</div>\n            <div id="search_by_tracking_id_btn" class="btn btn-${a}">Tracking ID</div>\n        </div>\n        <div id="search_list">\n            <div id="search_bar">\n                ${n}\n            </div>            \n        </div>\n        <div id="search_filters">\n        </div>\n        <div id="result_list">\n            <ul class="list-group list-group-flush">\n                <li class="list-group-item">Please search parcel by <br> <b>Receiver Phone</b> or <br> <b>Tracking ID</b></li>\n            </ul>\n        </div>\n    </div>\n    `,C(),P(),M.id){document.querySelector("#search_bar").querySelector("input").value=M.id,I(M.id)}const r=document.querySelector("#search_by_phone_btn"),c=document.querySelector("#search_by_tracking_id_btn");function l(e){e.stopPropagation();[...this.parentNode.children].forEach(e=>{e===this?(e.classList.add("btn-warning"),e.classList.remove("btn-dark")):(e.classList.add("btn-dark"),e.classList.remove("btn-warning"))}),"search_by_tracking_id_btn"===this.id?(document.querySelector("#search_by_tracking_id_btn").classList.add("btn-warning"),document.querySelector("#search_by_phone_btn").classList.add("btn-dark"),window.location.hash="search/trackingid"):"search_by_phone_btn"===this.id&&(window.location.hash="search/phone"),document.querySelector("#result_list ul").innerHTML='<li class="list-group-item">Please search parcel by <br> <b>Receiver Phone</b> or <br> <b>Tracking ID</b></li>',C(),P()}r.addEventListener("click",l),c.addEventListener("click",l)}window.onload=async function(){const e=localStorage.getItem("token")||sessionStorage.getItem("token");if(e){await async function(){let e=!1;const t=c(),n=await r();if(t){200===(await fetch(s,{method:"post",mod:"cors",responseType:"json",headers:{"Content-Type":"application/json","User-Token":""+t,"Client-Token":n["Client-Token"],"Time-Stamp":n["Time-Stamp"],"Time-Signature":n["Time-Signature"]}}).then(e=>e.json()).then(e=>e).catch(e=>console.log(e))).resCode&&(e=!0)}return e}()?(window.location.hash="search/phone",document.querySelector("header").style.display="block",p("search"),H()):d()}else d();window.onhashchange=async function(){const e=window.location.hash.toLowerCase();console.log("path changes! "+e);switch(window.location.hash){case"#forgetpassword":f();break;default:d()}}}}]);