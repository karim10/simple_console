(this.webpackJsonpsimpleconsole_client=this.webpackJsonpsimpleconsole_client||[]).push([[0],{16:function(module,__webpack_exports__,__webpack_require__){"use strict";function evaluate(script){var consoleOutput="",newScript=script+"console.log(' ')";try{var console={log:function(e){return consoleOutput=consoleOutput+e+"\n"}};return eval(newScript)}catch(e){return e.toString()}}__webpack_require__.d(__webpack_exports__,"a",(function(){return evaluate}))},22:function(e,n,t){e.exports=t(40)},27:function(e,n,t){},38:function(e,n,t){},4:function(module,__webpack_exports__,__webpack_require__){"use strict";function getDelimitedRangesOf(e,n,t,r){for(var o,i=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],c=[],u=0;(o=n.indexOf(e,u))>-1;)0!==o&&/[a-zA-Z0-9_]/.test(n[o-1])||/[a-zA-Z0-9_]/.test(n[o+e.length])||(i&&t.formatText(o,e.length,{color:r}),c.push({start:o,length:e.length})),u=o+e.length;return c}function getIndicesOf(e,n,t,r){for(var o,i=[],c=0;(o=n.indexOf(e,c))>-1;)t.formatText(o,e.length,{color:r}),i.push({start:o,length:e.length}),c=o+e.length;return i}function getIndicesOfAfterKeyword(e,n,t,r){var o=getDelimitedRangesOf(e,n,t,r,!1),i=[];return o.forEach((function(o){for(var c=o.start+e.length+1,u=c;/[a-zA-Z0-9_]/.test(n[u])&&u<n.length;)u++;u!==c&&(t.formatText(c,u-c,{color:r}),i.push(t.getText(c,u-c)))})),i}function getIndicesByTypeInGlobal(type,str,quill,color){for(var re=/\w+/g,byTypeRanges=[],match;null!=(match=re.exec(str));)try{typeof eval(match.toString())===type&&(quill.formatText(match.index,match.toString().length,{color:color}),byTypeRanges.push({start:match.index,length:match.toString().length}))}catch(_e){}return byTypeRanges}__webpack_require__.d(__webpack_exports__,"a",(function(){return getDelimitedRangesOf})),__webpack_require__.d(__webpack_exports__,"c",(function(){return getIndicesOf})),__webpack_require__.d(__webpack_exports__,"d",(function(){return getIndicesOfAfterKeyword})),__webpack_require__.d(__webpack_exports__,"b",(function(){return getIndicesByTypeInGlobal}))},40:function(e,n,t){"use strict";t.r(n);var r=t(0),o=t.n(r),i=t(9),c=t.n(i),u=(t(27),t(2)),a=t(8),l=t(5),f=t(3),d=t(10),s={files:[{filename:"index.js",editorContent:""}],activeFile:"index.js",consoleOutput:""};var h=t(16);var b=Object(d.b)((function(){var e,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"ADD_FILE":return Object(f.a)(Object(f.a)({},n),{},{files:n.files.concat({filename:t.filename,editorContent:""})});case"SET_ACTIVE_FILE":return Object(f.a)(Object(f.a)({},n),{},{activeFile:t.filename});case"SET_SCRIPT":return Object(f.a)(Object(f.a)({},n),{},{files:n.files.map((function(e){return e.filename===t.filename?Object(f.a)(Object(f.a)({},e),{},{editorContent:t.script}):e}))});case"RUN_SCRIPT_IN_FILE":return Object(f.a)(Object(f.a)({},n),{},{consoleOutput:Object(h.a)(null===(e=n.files.find((function(e){return e.filename===n.activeFile})))||void 0===e?void 0:e.editorContent)});default:return n}})),p=t(1);function m(){var e=Object(u.a)(["\n    background: ",";\n    height: 90%;\n    width: 90%;\n    border: solid 2px ",";\n    border-radius: 10px;\n    box-sizing: border-box;\n    padding: 20px;\n    color: ",";\n    white-space: pre-line;\n"]);return m=function(){return e},e}function v(){var e=Object(u.a)(["\n    position: absolute;\n    right: 80px;\n    top: 25px;\n    width: 70px;\n    height: 30px;\n    background-color: ",";\n    font-family: ",";\n    color: ",";\n    border: none;\n    outline: none;\n    border-radius: 10px;\n"]);return v=function(){return e},e}function g(){var e=Object(u.a)(["\n    background: ",";\n    height: 40%;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    border-top: solid 2px ",";\n    position: relative;\n    font-size: large;\n    font-family: ",";\n"]);return g=function(){return e},e}function x(){var e=Object(l.c)((function(e){return e.consoleOutput})),n=Object(l.b)();return o.a.useEffect((function(){document.addEventListener("keydown",(function(e){"S"===e.key.toUpperCase()&&e.ctrlKey&&(e.preventDefault(),n({type:"RUN_SCRIPT_IN_FILE"}))}))}),[n]),o.a.createElement(_,null,o.a.createElement(y,{title:"Ctlr+S",onClick:function(){return n({type:"RUN_SCRIPT_IN_FILE"})}},"Run"),o.a.createElement(E,null,e))}var _=p.b.div(g(),(function(e){return e.theme.primary}),(function(e){return e.theme.secondary}),(function(e){return e.theme.fontMono})),y=p.b.button(v(),(function(e){return e.theme.tertiary}),(function(e){return e.theme.fontMono}),(function(e){return e.theme.text})),E=p.b.div(m(),(function(e){return e.theme.primary}),(function(e){return e.theme.secondary}),(function(e){return e.theme.text})),O=t(20),w=t.n(O),j=(t(38),t(4)),k=["await","break","case","catch","continue","default","do","else","finally","goto","if","import","package","return","switch","throw","try","while","with","yield"],C=["arguments","const","class","debugger","delete","export","false","function","in","instanceof","interface","let","new","null","private","super","this","true","var","void","typeof"],F=["abstract","boolean","byte","char","double","enum","eval","extends","false","final","finally","float","for","implements","int","long","native","package","private","protected","public","short","static","synchronized","throws","transient","volatile"],S=["(",")","{","}","[","]","'",'"',"`"],T=[{1:"(",2:")"},{1:"{",2:"}"},{1:"[",2:"]"},{1:"'",2:"'"},{1:'"',2:'"'},{1:"`",2:"`"}],I=function(e,n,t){var r,o;if("user"===e){var i=n.current;if(i){var c=i.getText();if(c){null===(r=n.current)||void 0===r||r.removeFormat(0,(null===(o=n.current)||void 0===o?void 0:o.getLength())-1),Object(j.b)("object",c,i,t.blue),Object(j.b)("function",c,i,t.blue),Object(j.d)("function",c,i,t.yellow).forEach((function(e){return Object(j.c)(e,c,i,t.yellow)}));var u=Object(j.d)("const",c,i,t.lightBlue),a=Object(j.d)("var",c,i,t.lightBlue),l=Object(j.d)("let",c,i,t.lightBlue);u.concat(a).concat(l).forEach((function(e){return Object(j.c)(e,c,i,t.lightBlue)})),k.forEach((function(e){Object(j.a)(e,c,i,t.purple)})),C.forEach((function(e){Object(j.a)(e,c,i,t.blue)})),F.forEach((function(e){Object(j.a)(e,c,i,t.green)})),S.forEach((function(e){Object(j.c)(e,c,i,t.orange)}))}}}};function D(){var e=Object(u.a)(["\n    height: 90%;\n    width: 90%;\n    background: ",";\n    border: solid 2px "," !important;\n    border-radius: 10px;\n    caret-color: ",";\n    color: ",";\n"]);return D=function(){return e},e}function A(){var e=Object(u.a)(["\n    background: ",";\n    height: 60%;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n"]);return A=function(){return e},e}function R(){var e=Object(l.c)((function(e){return e.activeFile}));return o.a.createElement(B,{activeFile:e})}var B=Object(p.c)((function(e){var n=o.a.useRef(),t=Object(l.b)(),r=Object(l.c)((function(n){var t,r;return null!==(t=null===(r=n.files.find((function(n){return n.filename===e.activeFile})))||void 0===r?void 0:r.editorContent)&&void 0!==t?t:""}));return o.a.useEffect((function(){n.current=new w.a("#editor",{theme:"snow",modules:{toolbar:!1}}),n.current.root.setAttribute("spellcheck","false"),n.current.focus()}),[]),o.a.useEffect((function(){var r,o=function(){var r,o,i,c;return t((i=e.activeFile,c=null!==(r=null===(o=n.current)||void 0===o?void 0:o.getText())&&void 0!==r?r:"",{type:"SET_SCRIPT",filename:i,script:c}))};return null===(r=n.current)||void 0===r||r.on("text-change",o),function(){var e;null===(e=n.current)||void 0===e||e.off("text-change",o)}}),[t,e.activeFile]),o.a.useEffect((function(){var t;null===(t=n.current)||void 0===t||t.on("text-change",(function(t,r,o){"user"===o&&(!function(e,n){var t,r,o,i;if(n.current){var c=e.ops.find((function(e){return e.insert}));if(null===c||void 0===c?void 0:c.insert){var u=c.insert,a=T.find((function(e){return e[1]===u}));a&&(null===(t=n.current)||void 0===t||t.insertText((null===(r=n.current.getSelection())||void 0===r?void 0:r.index)||0,a[2]),null===(o=n.current)||void 0===o||o.setSelection(((null===(i=n.current.getSelection())||void 0===i?void 0:i.index)||1)-1,0))}}}(t,n),I(o,n,e.theme))}))}),[e.theme]),o.a.useEffect((function(){n.current&&void 0!==r&&(n.current.setText(r,"user"),I("user",n,e.theme))}),[e.activeFile]),o.a.createElement(q,null,o.a.createElement(L,{id:"editor"}))}));var q=p.b.div(A(),(function(e){return e.theme.primary})),L=p.b.div(D(),(function(e){return e.theme.primary}),(function(e){return e.theme.secondary}),(function(e){return e.theme.text}),(function(e){return e.theme.text}));function P(){var e=Object(u.a)(["\n    bottom: 0px;\n    height: 50px;\n    border-radius: 0;\n    background-color: ",";\n    color: ",";\n    cursor: pointer;\n    font-family: ",";\n    font-size: 16;\n    border: none;\n    outline: none;\n    font-weight: 500;\n"]);return P=function(){return e},e}function z(){var e=Object(u.a)(["\n    height: 50px;\n    width: 100%;\n    border: 0;\n    box-shadow: none;\n    text-align: center;\n"]);return z=function(){return e},e}function M(){var e=Object(u.a)(["\n    height: 50px;\n    width: 100%;\n    box-shadow: none;\n    background-color: ",";\n    color: ",";\n    cursor: pointer;\n    fontfamily: ",";\n    padding: 0;\n    border-bottom: solid 2px ",";\n    border-top: none;\n    border-right: none;\n    border-left: none;\n    outline: none;\n    font-weight: 500;\n"]);return M=function(){return e},e}function N(){var e=Object(u.a)(["\n    height: 100%;\n    overflow-y: auto;\n"]);return N=function(){return e},e}function K(){var e=Object(u.a)(["\n    display: flex;\n    background-color: ",";\n"]);return K=function(){return e},e}function U(){var e=Object(l.c)((function(e){return e})),n=Object(l.b)(),t=o.a.useRef(null),r=o.a.useState(!1),i=Object(a.a)(r,2),c=i[0],u=i[1],f=o.a.useState(""),d=Object(a.a)(f,2),s=d[0],h=d[1];o.a.useEffect((function(){c&&t.current&&t.current.focus()}));var b=function(e){n(function(e){return{type:"SET_ACTIVE_FILE",filename:e}}(e))},p=function(){var t=function e(n,t){if(n.find((function(e){return e.filename===t}))||!t)return e(n,t.concat("_"));return t}(e.files,s);n(function(e){return{type:"ADD_FILE",filename:e}}(t)),b(t),u(!1)};return o.a.createElement(o.a.Fragment,null,o.a.createElement(G,null,e.files.map((function(n){var t=n.filename===e.activeFile;return o.a.createElement(J,{key:n.filename,onClick:function(){return b(n.filename)},isActive:t},n.filename)})),c?o.a.createElement(Z,null,o.a.createElement(W,{onChange:function(e){return h(e.target.value)},onKeyDown:function(e){"Enter"===e.key&&p()},ref:t})):null),o.a.createElement($,{onClick:function(){return u(!0)}}," Add "))}var V,Z=p.b.div(K(),(function(e){return e.theme.text})),G=p.b.div(N()),J=p.b.button(M(),(function(e){return e.isActive?e.theme.tertiary:e.theme.secondary}),(function(e){return e.theme.text}),(function(e){return e.theme.fontMono}),(function(e){return e.theme.secondary})),W=p.b.input(z()),$=p.b.button(P(),(function(e){return e.theme.secondary}),(function(e){return e.theme.text}),(function(e){return e.theme.fontMono})),H={blue:"#569CD6",yellow:"#D5DCAA",lightBlue:"#4FC1FF",purple:"#C586C0",orange:"#E19577",grey:"#D4D4D4",primary:"#1E1E1E",green:"#629155",secondary:"#A89492",tertiary:"#BD7B7B",text:"white",fontMono:"monospace",otherPrimary:"#FDF6E3",otherText:"black"},Q={blue:"#569CD6",yellow:"#D5DCAA",lightBlue:"#4FC1FF",purple:"#C586C0",orange:"#E19577",grey:"#D4D4D4",primary:"#FDF6E3",green:"#629155",secondary:"#8CB3C8",tertiary:"#AAC2CF",text:"black",fontMono:"monospace",otherPrimary:"#1E1E1E",otherText:"white"},X=t(21);!function(e){e.dark="dark",e.light="light"}(V||(V={}));var Y=o.a.createContext({theme:V.light,setAppState:X.noop});function ee(){var e=Object(u.a)(["\n    position: absolute;\n    right: 30px;\n    top: 10px;\n"]);return ee=function(){return e},e}function ne(){var e=Object(u.a)(["\n    border: none;\n    width: 150px;\n    height: 30px;\n    outline: none;\n    padding: 0px 10px 0px 10px;\n    font-size: 14px;\n    background-color: ",";\n    font-family: ",";\n    border-radius: 10px;\n    color: ",";\n"]);return ne=function(){return e},e}function te(){var e=o.a.useContext(Y),n=function(n){e.setAppState(Object(f.a)(Object(f.a)({},e),{},{theme:n}))};return o.a.createElement(oe,null,o.a.createElement(re,{name:"theme",defaultValue:e.theme,onChange:function(e){return n(e.target.value)}},o.a.createElement("option",{value:V.light,onSelect:function(){return n(V.light)}},"\uf185 light theme"),o.a.createElement("option",{style:{borderRadius:10},value:V.dark,onSelect:function(){return n(V.dark)}},"\uf186 dark theme")))}var re=p.b.select(ne(),(function(e){return e.theme.otherPrimary}),(function(e){return e.theme.fontMono}),(function(e){return e.theme.otherText})),oe=p.b.div(ee());function ie(){var e=Object(u.a)(["\n    flex-grow: 1;\n    height: 100%;\n    border-top: solid 2px;\n    border-right: solid 2px;\n    border-left: solid 2px;\n    border-bottom: solid 2px;\n    border-radius: 0 20px 20px 0;\n    border-color: ",";\n    overflow: hidden;\n"]);return ie=function(){return e},e}function ce(){var e=Object(u.a)(["\n    background: ",";\n    height: 100%;\n    flex-basis: 20%;\n    align-content: center;\n    display: flex;\n    flex-direction: column;\n    border-left: solid 2px;\n    border-top: solid 2px;\n    border-bottom: solid 2px;\n    border-color: ",";\n    border-radius: 20px 0 0 20px;\n    overflow: hidden;\n"]);return ce=function(){return e},e}function ue(){var e=Object(u.a)(["\n    height: 90%;\n    width: 90%;\n    display: flex;\n    flex-direction: row;\n    justify-content: center;\n    align-items: center;\n"]);return ue=function(){return e},e}function ae(){var e=Object(u.a)(["\n    height: 100vh;\n    width: 100vw;\n    min-height: 100px;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    background: ",";\n"]);return ae=function(){return e},e}function le(e){switch(e){case V.light:return Q;case V.dark:return H}}var fe=p.b.div(ae(),(function(e){return e.theme.primary})),de=p.b.div(ue()),se=p.b.div(ce(),(function(e){return e.theme.primary}),(function(e){return e.theme.secondary})),he=p.b.div(ie(),(function(e){return e.theme.secondary})),be=function(){var e=o.a.useState({theme:V.dark}),n=Object(a.a)(e,2),t=n[0],r=n[1];return o.a.createElement(Y.Provider,{value:{theme:t.theme,setAppState:r}},o.a.createElement(l.a,{store:b},o.a.createElement(p.a,{theme:le(t.theme)},o.a.createElement(fe,null,o.a.createElement(te,null),o.a.createElement(de,null,o.a.createElement(se,null,o.a.createElement(U,null)),o.a.createElement(he,null,o.a.createElement(R,null),o.a.createElement(x,null)))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(be,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[22,1,2]]]);
//# sourceMappingURL=main.cd0587bb.chunk.js.map