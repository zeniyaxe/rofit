"use strict";(()=>{var b,wr,Qr,A,hr,J,yr,$,E,_r,ge,ce,he,Yr,Q={},Y=[],et=/^m(i|n|o|s|text|space)$/,be=Array.isArray,kr=Y.slice,B=Object.assign;function ee(r){r&&r.parentNode&&r.remove()}function K(r,e,t,a,o){var f={type:r,props:e,key:t,ref:a,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:o||++wr,__i:-1,__u:0};return!o&&b.vnode&&b.vnode(f),f}function U(r){return r.children}function Z(r,e){this.props=r,this.context=e,this.__g=0}function R(r,e){if(e==null)return r.__?R(r.__,r.__i+1):null;for(var t;e<r.__k.length;e++)if((t=r.__k[e])&&t.__e)return t.__e;return typeof r.type!="function"||r.props.__P?null:R(r)}function Cr(r){if((r=r.__)&&r.__c&&!r.props.__P)return r.__e=null,r.__k.some(function(e){return e&&(r.__e=e.__e)}),Cr(r)}function gr(r){(8&r.__g||!(r.__g|=8)||!A.push(r)||J++)&&hr==b.debounceRendering||((hr=b.debounceRendering)||queueMicrotask)(rt)}function rt(){var r,e,t,a,o,f,i,l,p;try{for(e=1;A.length;)A.length>e&&A.sort(yr),r=A.shift(),e=A.length,8&r.__g&&(a=void 0,o=void 0,f=(o=(t=r).__v).__e,i=[],l=[],(p=t.__P)&&((a=B({constructor:void 0},o)).__v=o.__v+1,b.vnode&&b.vnode(a),ve(p,a,o,t.__n,p.namespaceURI,32&o.__u?[f]:null,i,f||R(o),32&o.__u,l),a.__v=o.__v,a.__.__k[a.__i]=a,Ar(i,a,l),o.__=o.__e=null,a.__e!=f&&Cr(a)))}finally{A.length=J=0}}function Sr(r,e,t,a,o,f,i,l,p,u,d){var g,x,n,c,s,C,w=a.__k||Y,S=e.length;for(p=tt(t,e,w,p,S),g=0;g<S;g++)(n=t.__k[g])!=null&&(x=~n.__i&&w[n.__i]||Q,n.__i=g,C=ve(r,n,x,o,f,i,l,p,u,d),c=n.__e,n.ref&&(x.ref!=n.ref||8&x.__u)&&(x.ref!=n.ref&&x.ref&&we(x.ref,null,n),d.push(n.ref,n.__c||c,n)),s=s||c,4&n.__u?(p=Mr(n,p,r,!x.__v),x.__e&&(x.__e=null)):typeof n.type=="function"&&C!==void 0?p=C:c&&(p=c.nextSibling),n.__u&=-7);return t.__e=s,p}function tt(r,e,t,a,o){var f,i,l,p,u,d,g,x,n,c,s=t.length,C=s,w=0,S=!1,h=r.__k=Array(o);for(f=0;f<o;f++)(i=e[f])!=null&&typeof i!="boolean"&&typeof i!="function"?(typeof i!="object"||i.constructor==String?i=h[f]=K(null,i):be(i)?i=h[f]=K(U,{children:i}):i.constructor===void 0&&i.__b?i=h[f]=K(i.type,i.props,i.key,i.ref,i.__v):h[f]=i,p=f+w,i.__=r,i.__b=r.__b+1,l=null,~(u=i.__i=at(i,t,p,C))&&(C--,(l=t[u])&&(l.__u|=2)),l&&l.__v?(i.__u|=2,u==p-1?w--:u==p+1?w++:u!=p&&(u>p?w--:w++,S=!0)):(~u||(o>s?w--:o<s&&w++),typeof i.type!="function"&&(i.__u|=4))):h[f]=null;if(S){for(d=[],g=[],f=0;f<o;f++)if((i=h[f])&&2&i.__u){for(x=0,n=d.length;x<n;)d[c=x+n>>1]<i.__i?x=c+1:n=c;d[x]=i.__i,g[f]=x+1}for(w=d.length;f--;)g[f]&&(g[f]==w?w--:h[f].__u|=4)}if(C)for(f=0;f<s;f++)!(l=t[f])||2&l.__u||(l.__e==a&&(a=R(l)),ye(l,l));return a}function Mr(r,e,t,a){var o,f;if(typeof r.type=="function"){if(r.props.__P)return e;if(o=r.__k)for(f=0;f<o.length;f++)o[f]&&(o[f].__=r,e=Mr(o[f],e,t,!1));return e}for(e&&!e.parentNode&&(e=R(r))&&!e.parentNode&&(e=null),r.__e!=e&&(!a&&t.moveBefore&&r.__e.parentNode?t.moveBefore(r.__e,e):t.insertBefore(r.__e,e||null)),e=r.__e;(e=e&&e.nextSibling)&&e.nodeType==8;);return e}function at(r,e,t,a){var o,f,i,l=r.key,p=r.type,u=e[t],d=u&&!(2&u.__u);if(u===null&&l==null||d&&l==u.key&&p==u.type)return t;if(a>(d?1:0)){for(o=t-1,f=t+1;o>=0||f<e.length;)if((u=e[i=o>=0?o--:f++])&&!(2&u.__u)&&l==u.key&&p==u.type)return i}return-1}function br(r,e,t){t==null&&(t=""),e[0]=="-"?r.setProperty(e,t):r[e]=t}function j(r,e,t,a,o){var f;e:if(e=="style")if(typeof t=="string")r.style.cssText=t;else{if(typeof a=="string"&&(r.style.cssText=a=""),a)for(e in a)t&&e in t||br(r.style,e,"");if(t)for(e in t)a&&t[e]==a[e]||br(r.style,e,t[e])}else if(e[0]=="o"&&e[1]=="n")f=e!=(e=e.replace(_r,"$1")),(e=e.slice(2))[0]<"a"&&(e=e.toLowerCase()),(r.__e||(r.__e={}))[e+f]=t,t?a?t[E]=a[E]:(t[E]=ge,r.addEventListener(e,f?he:ce,f)):r.removeEventListener(e,f?he:ce,f);else{if(o=="http://www.w3.org/2000/svg")e=e.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(e!="width"&&e!="height"&&e!="href"&&e!="list"&&e!="form"&&e!="tabIndex"&&e!="download"&&e!="rowSpan"&&e!="colSpan"&&e!="role"&&e!="popover"&&e in r)try{r[e]=t??"";break e}catch{}typeof t=="function"||(t==null||t===!1&&e[4]!="-"?r.removeAttribute(e):r.setAttribute(e,e=="popover"&&t==1?"":t))}}function vr(r){return function(e){if(this.__e){var t=this.__e[e.type+r];if(e[$]==null)e[$]=ge++;else if(e[$]<t[E])return;return t(b.event?b.event(e):e)}}}function ve(r,e,t,a,o,f,i,l,p,u){var d,g,x,n,c,s,C,w,S,h,v,_,L,O,cr,W,N,X,q,z,P=e.type;if(e.constructor!==void 0)return null;if(128&t.__u&&(p=32&t.__u,d=t.__c.__z)){if(e.__u|=p,g=f=[],d.nodeType==8)for(x=1,n=d.nextSibling;n;n=n.nextSibling){if(n.nodeType==8){if(n.data.startsWith("$s"))x++;else if(n.data.startsWith("/$s")&&!--x)break}f.push(n)}else f.push(d);l=f[0]}(d=b.__b)&&d(e);e:if(typeof P=="function"){c=i.length;try{if(h=e.props,v=(d=P.prototype)&&d.render,_=(d=P.contextType)&&a[d.__c],L=d?_?_.props.value:d.__:a,t.__c?2&(s=e.__c=t.__c).__g&&(s.__g|=1):(v?e.__c=s=new P(h,L):(e.__c=s=new Z(h,L),s.constructor=P,s.render=ft),_&&_.sub(s),s.state||(s.state={}),s.__n=a,s.__g|=8,s.__h=[],s.__k=[]),v&&(s.__s||(s.__s=s.state),P.getDerivedStateFromProps&&(s.__s==s.state&&(s.__s=B({},s.__s)),B(s.__s,P.getDerivedStateFromProps(h,s.__s)))),C=s.props,w=s.state,s.__v=e,t.__c){if(v&&!P.getDerivedStateFromProps&&h!==C&&s.componentWillReceiveProps&&s.componentWillReceiveProps(h,L),e.__v==t.__v&&!(8&s.__g)||!(4&s.__g)&&s.shouldComponentUpdate&&s.shouldComponentUpdate(h,s.__s,L)===!1){e.__v!=t.__v&&(s.props=h,s.state=s.__s,s.__g&=-9),e.__e=t.__e,e.__k=t.__k,e.__k.some(function(M){M&&(M.__=e)}),Y.push.apply(s.__h,s.__k),s.__k=[],s.__h.length&&i.push(s),l=R(t);break e}s.componentWillUpdate&&s.componentWillUpdate(h,s.__s,L),v&&s.componentDidUpdate&&s.__h.push(function(){s.componentDidUpdate(C,w,S)})}else v&&!P.getDerivedStateFromProps&&s.componentWillMount&&s.componentWillMount(),v&&s.componentDidMount&&s.__h.push(s.componentDidMount);if(s.context=L,s.props=h,s.__P=r,s.__g&=-5,O=b.__r,cr=0,v)s.state=s.__s,s.__g&=-9,O&&O(e),d=s.render(s.props,s.state,s.context),Y.push.apply(s.__h,s.__k),s.__k=[];else do s.__g&=-9,O&&O(e),d=s.render(s.props,s.state,s.context),s.state=s.__s;while(8&s.__g&&++cr<25);s.state=s.__s,s.getChildContext&&(a=B({},a,s.getChildContext())),v&&t.__c&&s.getSnapshotBeforeUpdate&&(S=s.getSnapshotBeforeUpdate(C,w)),W=d&&d.type===U&&d.key==null?d.props.children:d,h.__P&&(d=l,o=(r=h.__P).namespaceURI,p=f=null,t.props&&t.props.__P!=r&&(t.__k.some(function(M){M&&ye(M,M)}),t.__k=null),l=t.__k?R(t,0):null),l=Sr(r,be(W)?W:[W],e,t,a,o,f,i,l,p,u),h.__P&&(e.__e=null,l=d),e.__u&=-161,128&t.__u&&(s.__z=null),g&&g.some(ee),s.__h.length&&i.push(s),1&s.__g&&(s.__g&=-4)}catch(M){if(i.length=c,e.__v=null,p||f)if(M.then){if(N=0,e.__u|=p?160:128,f){for(q=0;q<f.length;q++)if(z=f[q])if(z.nodeType==8){if(f[q]=null,z.data.startsWith("$s"))N++||(X=z);else if(z.data.startsWith("/$s")&&!--N){l=z;break}}else N&&(f[q]=null)}if(!X){for(;l&&l.nodeType==8&&l.nextSibling;)l=l.nextSibling;f&&(f[f.indexOf(l)]=null),X=l}e.__c.__z||(e.__c.__z=X),e.__e=l}else f&&f.some(ee);else e.__e=t.__e;e.__k||(e.__k=t.__k||[]),M.then||Pr(e),b.__e(M,e,t)}}else l=e.__e=ot(t.__e,e,t,a,o,f,i,p,u,r);return(d=b.diffed)&&d(e),128&e.__u?void 0:l}function Pr(r){r&&(r.__c&&(r.__c.__g|=4),r.__k&&r.__k.some(Pr))}function Ar(r,e,t){for(var a=0;a<t.length;)we(t[a++],t[a++],t[a++]);b.__c&&b.__c(e,r),r.some(function(o){try{r=o.__h,o.__h=[],r.some(function(f){f.call(o)})}catch(f){b.__e(f,o.__v)}})}function ot(r,e,t,a,o,f,i,l,p,u){var d,g,x,n,c,s,C,w,S,h=t.props||Q,v=e.props,_=e.type;if(_=="svg"?o="http://www.w3.org/2000/svg":_=="math"?o="http://www.w3.org/1998/Math/MathML":o||(o="http://www.w3.org/1999/xhtml"),f){for(d=0;d<f.length;d++)if((c=f[d])&&(_?c.localName==_:c.nodeType==3)){r=c,f[d]=null;break}}if(!r){if(w=u.ownerDocument||document,!_)return w.createTextNode(v);r=w.createElementNS(o,_,v.is&&v),l&&(b.__m&&b.__m(e,f),l=!1),f=null}if(_){if(u=_=="template"?r.content:r,f=_=="textarea"&&v.defaultValue!=null?null:f&&kr.call(u.childNodes),!l&&f)for(h={},d=0;d<r.attributes.length;d++)h[(c=r.attributes[d]).name]=c.value;for(d in h)c=h[d],d=="dangerouslySetInnerHTML"?x=c:d=="children"||d in v||d=="value"&&"defaultValue"in v||d=="checked"&&"defaultChecked"in v||j(r,d,null,c,o);for(d in S=1&t.__u,v)c=v[d],d=="children"?n=c:d=="dangerouslySetInnerHTML"?g=c:d=="value"?s=c:d=="checked"?C=c:l&&typeof c!="function"||!(h[d]!==c||S&&c!=null)||j(r,d,c,h[d],o);g?(l||x&&(g.__html==x.__html||g.__html==r.innerHTML)||(r.innerHTML=g.__html),e.__k=[]):(x&&(r.textContent=""),(_=="foreignObject"||o=="http://www.w3.org/1998/Math/MathML"&&et.test(_))&&(o="http://www.w3.org/1999/xhtml"),Sr(u,be(n)?n:[n],e,t,a,o,f,i,f?f[0]:t.__k&&R(t,0),l,p),f&&f.some(ee)),l&&_!="textarea"||(d="value",_=="progress"&&s==null?r.removeAttribute(d):s==null||s===r[d]&&(_!="progress"||s)||j(r,d,s,h[d],o),d="checked",C!=null&&C!=r[d]&&j(r,d,C,h[d],o))}else h===v||l&&r.data==v||(r.data=v);return r}function we(r,e,t){try{typeof r=="function"?(typeof r.__u=="function"&&r.__u(),(typeof r.__u!="function"||e)&&(r.__u=r(e))):r.current=e}catch(a){b.__e(a,t)}}function ye(r,e,t){var a,o;if(b.unmount&&b.unmount(r),!(a=r.ref)||a.current&&a.current!=r.__e||we(a,null,e),a=r.__c){if(a.componentWillUnmount)try{a.componentWillUnmount()}catch(f){b.__e(f,e)}a.__P=a.__n=null}if(a=r.__k)for(o=0;o<a.length;o++)a[o]&&ye(a[o],e,typeof r.type!="function"||t&&!r.props.__P);(a=r.__e)&&(t||ee(a),a.__e&&(a.__e=null)),r.__e=r.__c=r.__=null}function ft(r,e,t){return this.constructor(r,t)}function Rr(r,e){var t,a,o,f;b.__&&b.__(r,e),e.nodeType==9&&(e=e.documentElement),a=(t=r&&32&r.__u)?null:e.__k,e.__k=K(U,{children:[r]}),o=[],f=[],ve(e,e.__k,a||Q,Q,e.namespaceURI,a?null:e.firstChild?kr.call(e.childNodes):null,o,a?a.__e:e.firstChild,t,f),Ar(o,e.__k,f),e.__k.props.children=null}b={__e:function(r,e,t,a){for(var o,f,i;e=e.__;)if((o=e.__c)&&!(1&o.__g)){o.__g|=4;try{if((f=o.constructor)&&f.getDerivedStateFromError&&(o.setState(f.getDerivedStateFromError(r)),i=8&o.__g),o.componentDidCatch&&(o.componentDidCatch(r,a||{}),i=8&o.__g),i)return void(o.__g|=2)}catch(l){r=l,i=0}}throw J=0,r}},wr=0,Qr=function(r){return r!=null&&r.constructor===void 0},Z.prototype.setState=function(r,e){var t=this.__s;t&&t!=this.state||(t=this.__s=B({},this.state)),typeof r=="function"&&(r=r(B({},t),this.props)),r&&(B(t,r),this.__v&&(e&&this.__k.push(e),gr(this)))},Z.prototype.forceUpdate=function(r){this.__v&&(this.__g|=4,r&&this.__h.push(r),gr(this))},Z.prototype.render=U,A=[],J=0,yr=function(r,e){return r.__v.__b-e.__v.__b},$=Symbol(),E=Symbol(),_r=/(PointerCapture)$|Capture$/i,ge=0,ce=vr(!1),he=vr(!0),Yr=0;var re,k,_e,Dr,ke=Object.is,Ce=0,Or=[],Se=[],y=b,Lr=y.__b,Br=y.__r,Tr=y.diffed,Fr=y.__c,qr=y.unmount,zr=y.__;function Er(r,e){y.__h&&y.__h(k,r,Ce||e),Ce=0;var t=k.__H||(k.__H={__:[],__h:[]});return r>=t.__.length&&t.__.push({}),t.__[r]}function T(r){return Ce=1,st(Ir,r)}function st(r,e,t){var a=Er(re++,2);if(a.t=r,!a.__c&&(a.__=[t?t(e):Ir(void 0,e),function(f){var i=a.__N?a.__N[0]:a.__[0],l=a.t(i,f);ke(i,l)||(a.__N=[l,a.__[1]],a.__c.setState({}))}],a.__c=k,!k.__f)){k.__f=!0;var o=k.shouldComponentUpdate;k.shouldComponentUpdate=function(f,i,l){var p=this.__H;if(!p)return!0;var u=!1,d=this.props!=f;if(p.__.some(function(x){x.__N&&(u=!0,ke(x.__[0],x.__N[0])||(d=!0))}),o){var g=o.call(this,f,i,l);return u?g||d:g}return!u||d}}return a.__}function H(r,e){var t=Er(re++,3);!y.__s&&it(t.__H,e)&&(t.__P=!0,t.__=r,t.u=e,k.__H.__h.push(t))}function lt(){var r;do{for(;r=Se.shift();)try{I(r)}catch(t){y.__e(t,{__:(r=r.__P)&&r.__v})}for(;r=Or.shift();){var e=r.__H;if(r.__P&&e)try{e.__h.some(I),e.__h.some(Me),e.__h=[]}catch(t){e.__h=[],y.__e(t,r.__v)}}}while(Se.length)}y.__b=function(r){k=null,Lr&&Lr(r)},y.__=function(r,e){r&&e.__k&&e.__k.__m&&(r.__m=e.__k.__m),zr&&zr(r,e)},y.__r=function(r){Br&&Br(r),re=0;var e=(k=r.__c).__H;e&&(_e==k?k.__h=[]:(e.__h.some(I),e.__h.some(Me),re=0),e.__h=[],e.__.some(function(t){t.__N&&(t.__=t.__N),t.u=t.__N=void 0})),_e=k},y.diffed=function(r){Tr&&Tr(r);var e=r.__c;e&&e.__H&&(e.__H.__h.length&&Hr(Or.push(e)),e.__H.__.some(function(t){t.u&&(t.__H=t.u)})),_e=k=null},y.__c=function(r,e){e.some(function(t){try{t.__h.some(I),t.__h=t.__h.filter(function(a){return!a.__||Me(a)})}catch(a){e.some(function(o){o.__h&&(o.__h=[])}),e=[],y.__e(a,t.__v)}}),Fr&&Fr(r,e)},y.unmount=function(r){qr&&qr(r);var e,t,a=r.__c;a&&a.__H&&(a.__H.__.some(function(o){try{if(o.__P&&o.__c){if(t===void 0){for(t=r.__;t&&(!t.__c||!t.__c.__P);)t=t.__;t=t&&t.__c}o.__P=t,Hr(Se.push(o))}else I(o)}catch(f){e=f}}),a.__H=void 0,e&&y.__e(e,a.__v))};var Ur=typeof requestAnimationFrame=="function";function dt(r){var e,t=function(){clearTimeout(a),Ur&&cancelAnimationFrame(e),setTimeout(r)},a=setTimeout(t,35);Ur&&(e=requestAnimationFrame(t))}function Hr(r){r!=1&&Dr==y.requestAnimationFrame||((Dr=y.requestAnimationFrame)||dt)(lt)}function I(r){var e=k,t=r.__c;typeof t=="function"&&(r.__c=void 0,t()),k=e}function Me(r){var e=k;r.__c=r.__(),k=e}function it(r,e){return!r||r.length!=e.length||e.some(function(t,a){return!ke(t,r[a])})}function Ir(r,e){return typeof e=="function"?e(r):e}var Vr=`/* RoFit \u2014 one stylesheet for the on-profile sheet, the library/settings page and the popup.
   Colors come from three inputs (--rf-bg, --rf-fg, --rf-accent) that the host sets from what Roblox is
   actually painting; every other surface is a mix of those, so light, dark and OLED all fall out of the same rules. */

.rf, .rf *, .rf *::before, .rf *::after { box-sizing: border-box; }
.rf {
  --rf-tint: var(--rf-fg);
  --rf-s1: 5%; --rf-s2: 9%; --rf-s3: 14%; --rf-line-pct: 13%;
  --rf-surface: color-mix(in srgb, var(--rf-tint) var(--rf-s1), var(--rf-bg));
  --rf-surface-2: color-mix(in srgb, var(--rf-tint) var(--rf-s2), var(--rf-bg));
  --rf-surface-3: color-mix(in srgb, var(--rf-tint) var(--rf-s3), var(--rf-bg));
  --rf-line: color-mix(in srgb, var(--rf-tint) var(--rf-line-pct), var(--rf-bg));
  --rf-muted: color-mix(in srgb, var(--rf-fg) 62%, var(--rf-bg));
  --rf-accent-soft: color-mix(in srgb, var(--rf-accent) 14%, var(--rf-bg));
  --rf-warn: #d97706;
  --rf-ok: #1f9d55;
  --rf-bad: #d63b3b;
  --rf-r: 8px;
  /* Motion language: everything uses these. Spatial distances are variables so reduced motion can zero them
     and keep the same timing as plain fades (see .rm below). */
  --rf-ease: cubic-bezier(.22, 1, .36, 1);
  --rf-ease-in: cubic-bezier(.5, 0, .9, .5);
  --rf-spring: linear(0, .009, .035 2.1%, .141, .281 6.7%, .723 12.9%, .938 16.7%, 1.017, 1.077, 1.121, 1.149 24.3%, 1.159, 1.163, 1.161, 1.154 29.9%, 1.129 32.8%, 1.051 39.6%, 1.017 43.1%, .991, .977 51%, .974 53.8%, .975 57.1%, .997 69.8%, 1.003 76.9%, 1);
  --rf-dy: 14px; --rf-dy-s: 8px; --rf-dx: 10px; --rf-pop: .96; --rf-lift: -3px; --rf-press: .96; --rf-drop: 6px;
  --rf-top: 0px;
  font-family: inherit; font-size: 14px; line-height: 1.4; color: var(--rf-fg);
  -webkit-font-smoothing: antialiased; text-align: left;
}
.rf { --rf-warn: color-mix(in srgb, #e08a00 80%, var(--rf-fg)); --rf-ok: color-mix(in srgb, #1f9d55 85%, var(--rf-fg)); }
:where(.rf) :where(button, input, textarea, select) { font: inherit; color: inherit; }
:where(.rf) button { cursor: pointer; border: 0; background: none; padding: 0; }
.rf button:disabled { cursor: default; opacity: .45; }
:where(.rf) a { color: inherit; text-decoration: none; }
:where(.rf) :where(h1, h2, h3, p, dl, dd, ol) { margin: 0; padding: 0; }
:where(.rf) :focus { outline: none; }
.rf :focus-visible { outline: 2px solid var(--rf-accent); outline-offset: 2px; border-radius: 6px; }
.rf-ico { flex: none; }
.rf-grow { flex: 1 1 0; min-width: 0; }
.rf-muted { color: var(--rf-muted); }
.rf-small { font-size: 12px; }
.rf-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: .92em; }
.rf-center { text-align: center; padding: 12px; }

/* ---- sheet frame --------------------------------------------------------------------------- */
.rf-sheet { position: fixed; left: 0; right: 0; bottom: 0; top: var(--rf-top); background: var(--rf-bg); display: flex; flex-direction: column;
  animation: rf-sheet-in .3s var(--rf-ease) backwards; border-top: 1px solid var(--rf-line); }
.rf-sheet[data-state=closed] { animation: rf-sheet-out .2s var(--rf-ease-in) both; pointer-events: none; }
@keyframes rf-sheet-in { from { opacity: 0; transform: translateY(var(--rf-dy)); } }
@keyframes rf-sheet-out { to { opacity: 0; transform: translateY(var(--rf-dy)); } }
.rf-shell { display: flex; flex-direction: column; height: 100%; min-height: 0; outline: none; }
.rf-page { min-height: 100vh; background: var(--rf-bg); display: flex; flex-direction: column; }
.rf-page > .rf-shell { height: calc(100vh - 49px); }

.rf-bar { display: flex; align-items: center; gap: 12px; padding: 8px 20px; min-height: 56px; border-bottom: 1px solid var(--rf-line); flex: none; }
.rf-who { display: flex; flex-direction: column; line-height: 1.15; min-width: 0; }
.rf-who b { font-size: 16px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 28ch; }
.rf-who span { font-size: 11px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: var(--rf-muted); }
.rf-tabs { display: flex; gap: 2px; margin-left: 12px; align-self: stretch; position: relative; }
.rf-tabs::after { content: ''; position: absolute; left: 0; bottom: -9px; height: 2px; width: var(--w, 0); background: var(--rf-fg); border-radius: 2px; transform: translateX(var(--x, 0)); transition: transform .38s var(--rf-ease), width .38s var(--rf-ease); }
.rf-tabs.still::after { transition: none; }
.rf-tabs button { display: inline-flex; align-items: center; gap: 7px; padding: 0 14px; font-weight: 600; color: var(--rf-muted); position: relative; transition: color .15s; }
.rf-tabs button:hover { color: var(--rf-fg); }
.rf-tabs button.on { color: var(--rf-fg); }
.rf-tabs em { font-style: normal; font-size: 12px; font-weight: 600; color: var(--rf-muted); background: var(--rf-surface-2); padding: 1px 7px; border-radius: 10px; }

.rf-main { flex: 1 1 0; min-height: 0; display: flex; position: relative; }
.rf-pane { flex: 1 1 0; min-width: 0; display: flex; }
.rf-pane > .rf-explorer { flex: 1 1 0; }
.rf-dock { width: min(480px, 42%); flex: none; border-left: 1px solid var(--rf-line); display: flex; min-height: 0; background: var(--rf-bg); }
.rf-dock[data-anim=enter] > .rf-insp { animation: rf-dock-in .36s var(--rf-ease) backwards; }
.rf-dock[data-anim=switch] > .rf-insp > .rf-iscroll { animation: rf-fade .2s backwards; }
.rf-dock[data-anim=exit] > .rf-insp { animation: rf-dock-out .22s var(--rf-ease-in) both; }
@keyframes rf-dock-in { from { opacity: 0; transform: translateX(var(--rf-dx)); } }
@keyframes rf-dock-out { to { opacity: 0; transform: translateX(var(--rf-dx)); } }
.rf-dock.empty { background: var(--rf-surface); align-items: center; justify-content: center; }
.rf-dock-hint { text-align: center; color: var(--rf-muted); padding: 24px; display: flex; flex-direction: column; align-items: center; gap: 8px; max-width: 260px; }
/* Narrow: the inspector slides over the explorer instead of replacing it, so the grid keeps its scroll position. */
.rf-shell.narrow .rf-dock { position: absolute; inset: 0; width: 100%; border-left: 0; z-index: 4; box-shadow: -12px 0 30px rgb(0 0 0 / .12); }

/* ---- buttons & controls --------------------------------------------------------------------- */
.rf-btn { flex: none; display: inline-flex; align-items: center; justify-content: center; gap: 7px; height: 36px; padding: 0 14px; border-radius: var(--rf-r); font-weight: 600;
  background: var(--rf-surface-2); transition: background .12s, transform .12s var(--rf-ease), box-shadow .12s; white-space: nowrap; position: relative; }
.rf-btn:hover:not(:disabled) { background: var(--rf-surface-3); }
.rf-btn:active:not(:disabled) { transform: scale(var(--rf-press)); transition-duration: .06s; }
.rf-btn.primary { background: var(--rf-accent); color: var(--rf-accent-fg); }
.rf-btn.primary:hover:not(:disabled) { background: color-mix(in srgb, var(--rf-accent) 88%, #000); }
.rf-btn.ghost { background: transparent; padding: 0 10px 0 6px; }
.rf-btn.ghost:hover:not(:disabled) { background: var(--rf-surface-2); }
.rf-btn.danger { color: var(--rf-bad); }
.rf-btn.on { background: var(--rf-accent-soft); color: var(--rf-accent); }
.rf-btn.sm { height: 30px; padding: 0 10px; font-size: 13px; }
.rf-btn.lg { height: 42px; padding: 0 20px; font-size: 15px; }
.rf-btn.wide { width: 100%; justify-content: flex-start; }
.rf-btn em { font-style: normal; margin-left: auto; font-size: 12px; color: var(--rf-muted); }
.rf-ib { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: var(--rf-r); flex: none; transition: background .12s, transform .12s var(--rf-ease); color: var(--rf-fg); }
.rf-ib:hover:not(:disabled) { background: var(--rf-surface-2); }
.rf-ib:active:not(:disabled) { transform: scale(calc(var(--rf-press) - .04)); transition-duration: .06s; }
.rf-linkbtn { color: var(--rf-accent); font-weight: 600; font-size: inherit; }
.rf-linkbtn:hover { text-decoration: underline; }
.rf-dot { position: absolute; top: 6px; right: 6px; width: 7px; height: 7px; border-radius: 50%; background: var(--rf-accent); }
.rf-hide-s { }

.rf-seg { display: inline-flex; background: var(--rf-surface-2); border-radius: var(--rf-r); padding: 2px; gap: 2px; position: relative; }
.rf-seg::before { content: ''; position: absolute; top: 2px; bottom: 2px; left: 0; width: var(--w, 0); border-radius: 6px; background: var(--rf-bg); box-shadow: 0 1px 2px rgb(0 0 0 / .14); transform: translateX(var(--x, 0)); transition: transform .34s var(--rf-ease), width .34s var(--rf-ease); }
.rf-seg.still::before { transition: none; }
.rf-seg button { display: inline-flex; align-items: center; gap: 6px; height: 32px; min-width: 32px; padding: 0 10px; border-radius: 6px; font-weight: 600; font-size: 13px; color: var(--rf-muted); justify-content: center; transition: background .15s, color .15s; }
.rf-seg button:hover { color: var(--rf-fg); }
.rf-seg button { position: relative; }
.rf-seg button.on { color: var(--rf-fg); }

.rf-switch { width: 40px; height: 24px; border-radius: 12px; background: var(--rf-surface-3); position: relative; transition: background .18s; flex: none; }
.rf-switch.on { background: var(--rf-accent); }
.rf-knob { position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; border-radius: 50%; background: #fff; transition: transform .45s var(--rf-spring); box-shadow: 0 1px 2px rgb(0 0 0 / .3); }
.rf-switch.on .rf-knob { transform: translateX(16px); }

.rf-chip { display: inline-flex; align-items: center; gap: 4px; height: 20px; padding: 0 7px; border-radius: 4px; font-size: 11.5px; font-weight: 600; background: var(--rf-surface-2); color: var(--rf-muted); white-space: nowrap; }
.rf-chip.warn { background: color-mix(in srgb, var(--rf-warn) 16%, var(--rf-bg)); color: var(--rf-warn); }
.rf-chip.ok { background: color-mix(in srgb, var(--rf-ok) 16%, var(--rf-bg)); color: var(--rf-ok); }
.rf-chip.accent { background: var(--rf-accent-soft); color: var(--rf-accent); }
.rf-chip.btn { height: 24px; padding: 0 9px; cursor: pointer; border-radius: 12px; }
.rf-chip.btn:hover { background: var(--rf-surface-3); }
.rf-chip.btn.accent:hover { background: color-mix(in srgb, var(--rf-accent) 22%, var(--rf-bg)); }

.rf-spin { display: inline-block; border-radius: 50%; border: 2px solid var(--rf-surface-3); border-top-color: var(--rf-fg); animation: rf-rot .7s linear infinite; flex: none; }
@keyframes rf-rot { to { transform: rotate(360deg); } }

.rf-kbd { font: inherit; font-size: 11px; font-weight: 600; color: var(--rf-muted); border: 1px solid var(--rf-line); border-radius: 4px; padding: 0 5px; line-height: 17px; }

/* ---- menu / dialog / toast --------------------------------------------------------------------- */
.rf-menu { position: fixed; z-index: 20; min-width: 230px; max-width: 320px; overflow: auto; padding: 6px; border-radius: 10px; background: var(--rf-bg);
  border: 1px solid var(--rf-line); box-shadow: 0 10px 30px rgb(0 0 0 / .22); animation: rf-pop .2s var(--rf-ease) backwards; transform-origin: top right; }
.rf-menu[data-state=closed] { animation: rf-pop-out .12s var(--rf-ease-in) forwards; pointer-events: none; }
@keyframes rf-pop { from { opacity: 0; transform: scale(var(--rf-pop)) translateY(calc(var(--rf-drop) * -1)); } }
@keyframes rf-pop-out { to { opacity: 0; transform: scale(var(--rf-pop)) translateY(calc(var(--rf-drop) * -1)); } }
.rf-mi { display: flex; align-items: center; gap: 10px; width: 100%; padding: 8px 10px; border-radius: 6px; text-align: left; font-weight: 500; }
.rf-mi:hover:not(:disabled), .rf-mi:focus-visible { background: var(--rf-surface-2); outline: none; }
.rf-mi.danger { color: var(--rf-bad); }
.rf-mi-gap { width: 16px; flex: none; }
.rf-mi-l { flex: 1; }
.rf-mi-hint { font-size: 11px; color: var(--rf-muted); }
.rf-mi-chk { color: var(--rf-accent); }
.rf-sep { height: 1px; background: var(--rf-line); margin: 5px 4px; }

.rf-scrim { position: absolute; inset: 0; z-index: 30; background: rgb(0 0 0 / .42); display: flex; align-items: center; justify-content: center; animation: rf-fade .18s backwards; }
.rf-scrim[data-state=closed] { animation: rf-fade-out .14s both; pointer-events: none; }
.rf-scrim[data-state=closed] > .rf-dialog { animation: rf-pop-out .14s var(--rf-ease-in) forwards; }
@keyframes rf-fade { from { opacity: 0; } }
@keyframes rf-fade-out { to { opacity: 0; } }
.rf-dialog { width: min(400px, calc(100% - 32px)); background: var(--rf-bg); border-radius: 12px; padding: 20px; box-shadow: 0 20px 50px rgb(0 0 0 / .35); animation: rf-pop .3s var(--rf-ease) backwards; transform-origin: center; }
.rf-dialog h3 { font-size: 17px; margin-bottom: 6px; }
.rf-dialog p { color: var(--rf-muted); margin-bottom: 18px; }
.rf-dialog-actions { display: flex; justify-content: flex-end; gap: 8px; }

.rf-toast-wrap { position: fixed; left: 50%; bottom: 22px; transform: translateX(-50%); z-index: 40; pointer-events: none; }
.rf-toast { display: flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: 10px; background: var(--rf-fg); color: var(--rf-bg); font-weight: 600; box-shadow: 0 8px 24px rgb(0 0 0 / .25); animation: rf-toast .4s var(--rf-spring) backwards; }
.rf-toast[data-state=closed] { animation: rf-toast-out .18s var(--rf-ease-in) forwards; }
@keyframes rf-toast { from { opacity: 0; transform: translateY(calc(var(--rf-drop) * 2)) scale(var(--rf-pop)); } }
@keyframes rf-toast-out { to { opacity: 0; transform: translateY(var(--rf-drop)) scale(var(--rf-pop)); } }

/* ---- explorer ------------------------------------------------------------------------------- */
.rf-explorer { display: flex; flex-direction: column; min-width: 0; min-height: 0; }
.rf-toolbar { display: flex; align-items: center; gap: 8px; padding: 12px 20px 8px; flex-wrap: wrap; }
.rf-search { display: flex; align-items: center; gap: 8px; height: 36px; padding: 0 10px; border-radius: var(--rf-r); background: var(--rf-surface-2); flex: 1 1 220px; max-width: 380px; color: var(--rf-muted); transition: box-shadow .15s, background .15s; }
.rf-search:focus-within { background: var(--rf-bg); box-shadow: 0 0 0 2px var(--rf-accent); color: var(--rf-fg); }
.rf-search input { flex: 1; min-width: 0; border: 0; background: transparent; outline: none; height: 100%; color: var(--rf-fg); }
.rf-search input::placeholder { color: var(--rf-muted); }
.rf-search input::-webkit-search-cancel-button { display: none; }
.rf-clear { display: inline-flex; width: 22px; height: 22px; align-items: center; justify-content: center; border-radius: 50%; }
.rf-clear:hover { background: var(--rf-surface-3); }
.rf-subbar { display: flex; align-items: center; gap: 10px; padding: 2px 20px 10px; flex-wrap: wrap; min-height: 32px; }
.rf-count { color: var(--rf-muted); }
.rf-count b { color: var(--rf-fg); font-weight: 600; }

.rf-note { display: flex; align-items: center; gap: 12px; margin: 0 20px 10px; padding: 10px 12px 10px 14px; border-radius: 10px; background: var(--rf-accent-soft); }
.rf-note-t { display: flex; flex-direction: column; flex: 1; min-width: 0; font-size: 13px; }
.rf-note-t span { color: var(--rf-muted); }
.rf-progress { width: 120px; height: 4px; border-radius: 2px; background: var(--rf-surface-3); overflow: hidden; }
.rf-progress i { display: block; height: 100%; background: var(--rf-accent); transform-origin: left; transition: transform .25s; }

.rf-scroll { flex: 1 1 0; min-height: 0; overflow-y: auto; padding: 4px 20px 24px; scrollbar-width: thin; scrollbar-color: var(--rf-surface-3) transparent; }
.rf-grid { position: relative; display: grid; gap: 4px 6px; --card: 148px; grid-template-columns: repeat(auto-fill, minmax(var(--card), 1fr)); }
.rf-grid.compact { --card: 108px; gap: 2px 4px; }
.rf-grid.large { --card: 204px; }
.rf-cell { position: relative; }
/* Measured at 300 outfits: p99 frame 20.7ms vs 27.7ms (worst 21 vs 49ms). Not worth the paint containment below ~150. */
.rf-grid.big .rf-cell { content-visibility: auto; contain-intrinsic-size: auto 220px; }
.rf-card { display: flex; flex-direction: column; gap: 8px; width: 100%; text-align: left; border-radius: 10px; padding: 6px; transition: background .14s, transform .18s var(--rf-ease); position: relative; }
.rf-card:hover { background: var(--rf-surface); }
.rf-card:hover .rf-thumb { transform: translateY(var(--rf-lift)); }
.rf-card:active .rf-thumb { transform: scale(var(--rf-press)); transition-duration: .08s; }
.rf-cell.active .rf-card { background: var(--rf-accent-soft); }
.rf-cell.picked .rf-card { background: var(--rf-accent-soft); box-shadow: inset 0 0 0 2px var(--rf-accent); }
.rf-card-t { display: flex; flex-direction: column; min-width: 0; padding: 0 2px; }
.rf-card-name { font-weight: 600; font-size: 13.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.rf-card-sub { display: flex; align-items: center; gap: 5px; font-size: 12px; color: var(--rf-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-height: 17px; }
.rf-tag { font-style: normal; font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: .04em; padding: 0 5px; border-radius: 3px; background: var(--rf-surface-3); }
.rf-badge { position: absolute; top: 12px; right: 12px; width: 24px; height: 24px; border-radius: 50%; background: var(--rf-bg); color: var(--rf-accent); display: flex; align-items: center; justify-content: center; box-shadow: 0 1px 4px rgb(0 0 0 / .2); }
.rf-pick { position: absolute; top: 12px; left: 12px; width: 22px; height: 22px; border-radius: 6px; border: 2px solid var(--rf-muted); background: color-mix(in srgb, var(--rf-bg) 80%, transparent); color: var(--rf-accent-fg);
  display: flex; align-items: center; justify-content: center; opacity: 0; transform: scale(.7); transition: opacity .12s, transform .35s var(--rf-spring), background .12s; }
.rf-cell:hover .rf-pick, .rf-cell:focus-within .rf-pick, .rf-cell.picked .rf-pick { opacity: 1; transform: none; }
.rf-cell.picked .rf-pick { background: var(--rf-accent); border-color: var(--rf-accent); }

.rf-thumb { position: relative; aspect-ratio: 1; border-radius: var(--rf-r); background: var(--rf-surface); overflow: hidden; transition: transform .2s var(--rf-ease); }
.rf-thumb img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; opacity: 0; transform: scale(.96); transition: opacity .25s, transform .35s var(--rf-ease); user-select: none; }
.rf-thumb.loaded img { opacity: 1; transform: none; }
.rf-skel { position: absolute; inset: 0; background: linear-gradient(100deg, transparent 20%, color-mix(in srgb, var(--rf-fg) 8%, transparent) 50%, transparent 80%) var(--rf-surface); background-size: 200% 100%; animation: rf-shimmer 1.3s linear infinite; }
.rf-skel.inline.sm { width: 54px; height: 20px; }
.rf-skel.inline { position: relative; display: inline-block; width: 110px; height: 30px; border-radius: 6px; vertical-align: middle; }
@keyframes rf-shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
.rf-thumb-note { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; color: var(--rf-muted); font-size: 12px; }
.rf-card.sk { pointer-events: none; }
.rf-sk-l { height: 12px; width: 70%; border-radius: 4px; background: var(--rf-surface); margin: 2px; }

.rf-grid.list { grid-template-columns: 1fr; gap: 2px; }
.rf-grid.list .rf-card { flex-direction: row; align-items: center; gap: 12px; padding: 6px 10px 6px 12px; }
.rf-grid.list .rf-card:hover .rf-thumb { transform: none; }
.rf-grid.list .rf-thumb { width: 52px; flex: none; }
.rf-grid.list .rf-card-t { flex: 1; }
.rf-grid.list .rf-pick { left: auto; right: 14px; top: 50%; margin-top: -11px; }
.rf-grid.list .rf-badge { right: 48px; top: 50%; margin-top: -12px; }
.rf-grid.big.list .rf-cell { contain-intrinsic-size: auto 64px; }

.rf-tray { position: absolute; left: 20px; right: 20px; bottom: 16px; display: flex; align-items: center; gap: 10px; padding: 10px 12px 10px 16px; border-radius: 12px; background: var(--rf-bg); border: 1px solid var(--rf-line);
  box-shadow: 0 10px 30px rgb(0 0 0 / .22); animation: rf-toast .4s var(--rf-spring) backwards; z-index: 5; }
.rf-explorer { position: relative; }

.rf-empty { margin: 8vh auto 0; max-width: 360px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 8px; color: var(--rf-muted); }
.rf-empty h3 { color: var(--rf-fg); font-size: 17px; }
.rf-empty-actions { display: flex; gap: 8px; margin-top: 8px; }

/* ---- items / patterns view ------------------------------------------------------------------------ */
.rf-items { display: flex; flex-direction: column; gap: 24px; }
.rf-block h3 { font-size: 15px; margin-bottom: 10px; }
.rf-block h3 .rf-muted { font-weight: 400; font-size: 13px; }
.rf-variants { display: flex; flex-direction: column; gap: 6px; }
.rf-variant { display: flex; align-items: center; gap: 14px; padding: 8px 12px 8px 8px; border-radius: 10px; background: var(--rf-surface); }
.rf-vstack { display: flex; }
.rf-vthumb { width: 52px; border-radius: 8px; margin-right: -14px; border: 2px solid var(--rf-surface); transition: transform .18s var(--rf-ease); }
.rf-vthumb:hover { transform: translateY(-3px); z-index: 2; }
.rf-vmeta { display: flex; flex-direction: column; min-width: 0; flex: 1; padding-left: 14px; }
.rf-vmeta b { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: 600; }
.rf-irows { display: flex; flex-direction: column; margin-bottom: 10px; }
.rf-irow { display: flex; align-items: center; gap: 12px; padding: 6px 10px; border-radius: 8px; text-align: left; width: 100%; }
.rf-irow:hover { background: var(--rf-surface); }
.rf-ithumb { width: 36px; height: 36px; border-radius: 6px; background: var(--rf-surface-2); display: flex; align-items: center; justify-content: center; flex: none; overflow: hidden; color: var(--rf-muted); }
.rf-ithumb.lg { width: 44px; height: 44px; border-radius: 8px; }
.rf-ithumb img { width: 100%; height: 100%; object-fit: cover; }
.rf-iname { display: flex; flex-direction: column; min-width: 0; flex: 1; }
.rf-iname b { font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.rf-istrip { display: flex; }
.rf-mini { width: 28px; margin-left: -8px; border-radius: 6px; overflow: hidden; border: 2px solid var(--rf-bg); }
.rf-mini .rf-thumb { border-radius: 0; }
.rf-icount { font-size: 12.5px; color: var(--rf-muted); min-width: 84px; text-align: right; }

/* ---- inspector -------------------------------------------------------------------------------- */
.rf-insp { display: flex; flex-direction: column; width: 100%; min-height: 0; }
.rf-ibar { display: flex; align-items: center; gap: 4px; padding: 8px 12px 8px 16px; border-bottom: 1px solid var(--rf-line); min-height: 52px; flex: none; }
.rf-ibar-t { font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: .07em; color: var(--rf-muted); margin: 0 8px; }
.rf-iscroll { flex: 1 1 0; overflow-y: auto; min-height: 0; padding-bottom: 32px; scrollbar-width: thin; scrollbar-color: var(--rf-surface-3) transparent; }
.rf-hero { padding: 16px 20px 6px; }
.rf-stage { width: 100%; height: clamp(220px, 36vh, 360px); border-radius: 12px; background: radial-gradient(120% 90% at 50% 10%, color-mix(in srgb, var(--rf-fg) 3%, var(--rf-surface)) 0%, var(--rf-surface-2) 100%); overflow: hidden; position: relative; }
.rf-stage .rf-thumb { position: absolute; inset: 0; aspect-ratio: auto; background: none; border-radius: 0; }
.rf-stage.sm { height: clamp(200px, 30vh, 280px); }
.rf-stage .rf-fig { position: absolute; inset: 14% 28%; width: 44%; height: 72%; }
.rf-iname-h { font-size: 22px; line-height: 1.2; font-weight: 700; margin: 14px 0 4px; overflow-wrap: anywhere; }
.rf-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 8px; color: var(--rf-muted); font-size: 13px; }
.rf-meta i { font-style: normal; opacity: .6; }
.rf-prov { margin-top: 8px; min-height: 20px; }
.rf-sk-block { padding: 12px 20px; display: flex; flex-direction: column; gap: 12px; }
.rf-sk-block .rf-skel { position: relative; border-radius: 8px; }

.rf-change { display: flex; gap: 10px; align-items: flex-start; margin: 10px 20px 0; padding: 10px 12px; border-radius: 10px; background: var(--rf-accent-soft); color: var(--rf-fg); }
.rf-change > .rf-ico { margin-top: 2px; color: var(--rf-accent); }

.rf-cost { margin: 14px 20px 0; padding: 14px 16px; border-radius: 12px; background: var(--rf-surface); }
.rf-cost-top { display: flex; justify-content: space-between; gap: 16px; align-items: flex-end; flex-wrap: wrap; }
.rf-cost-n { font-size: 26px; font-weight: 800; letter-spacing: -.01em; font-variant-numeric: tabular-nums; line-height: 1.1; }
.rf-cost-n.sm { font-size: 17px; font-weight: 700; color: var(--rf-muted); }
.rf-cost-l { font-size: 12.5px; color: var(--rf-muted); margin-top: 2px; }
.rf-cost-r { text-align: right; }
.rf-costbar { display: flex; height: 8px; gap: 2px; margin-top: 12px; border-radius: 4px; overflow: hidden; }
.rf-costbar .seg { display: block; min-width: 4px; background: var(--rf-accent); transition: flex-grow .4s var(--rf-ease); }
.rf-costbar .s1 { opacity: .78; } .rf-costbar .s2 { opacity: .6; } .rf-costbar .s3 { opacity: .46; } .rf-costbar .s4 { opacity: .34; } .rf-costbar .s5 { opacity: .24; }
.rf-costbar .resale { background: repeating-linear-gradient(135deg, var(--rf-accent) 0 3px, transparent 3px 6px); }
.rf-cost-notes { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
.rf-cost-own { margin-top: 8px; font-size: 12.5px; color: var(--rf-muted); }

.rf-sec { margin-top: 18px; }
.rf-sec-h { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 20px; text-align: left; }
.rf-sec-h h3 { font-size: 15px; }
.rf-sec-h:hover { background: var(--rf-surface); }
.rf-sec-b { padding: 4px 20px 0; }
.rf-sec-tools { display: flex; gap: 6px; flex-wrap: wrap; margin: 4px 0 8px; }
.rf-hintline { display: flex; align-items: center; gap: 6px; font-size: 12.5px; color: var(--rf-muted); margin-bottom: 8px; }
.rf-group { margin-top: 8px; }
.rf-group-h { display: flex; justify-content: space-between; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; color: var(--rf-muted); padding: 6px 0 4px; }

.rf-item { border-radius: 8px; margin: 0 -8px; transition: background .12s; }
.rf-item:hover, .rf-item.open { background: var(--rf-surface); }
.rf-item-main { display: flex; align-items: center; gap: 12px; padding: 6px 8px; cursor: pointer; border-radius: 8px; }
.rf-item.dim .rf-ithumb img { filter: grayscale(1); opacity: .6; }
.rf-item-t { display: flex; flex-direction: column; min-width: 0; flex: 1; }
.rf-item-name { font-weight: 600; font-size: 13.5px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.rf-item-sub { font-size: 12px; color: var(--rf-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.rf-item-r { display: flex; align-items: center; gap: 6px; flex: none; flex-wrap: wrap; justify-content: flex-end; max-width: 50%; }
.rf-price { font-weight: 700; font-variant-numeric: tabular-nums; font-size: 13px; display: inline-flex; align-items: baseline; gap: 4px; }
.rf-price small { font-size: 10.5px; font-weight: 600; color: var(--rf-muted); }
.rf-item-more { padding: 2px 8px 10px 64px; animation: rf-fade .15s; }
.rf-item-more dl { display: grid; grid-template-columns: max-content 1fr; gap: 3px 14px; font-size: 12.5px; margin-bottom: 8px; }
.rf-item-more dt { color: var(--rf-muted); }
.rf-item-acts { display: flex; gap: 6px; flex-wrap: wrap; }
.rf-reuse { margin-top: 8px; font-size: 12.5px; color: var(--rf-muted); }

.rf-body { display: flex; gap: 20px; align-items: flex-start; }
.rf-fig { width: 56px; flex: none; }
.rf-body-cols { flex: 1; display: grid; gap: 14px; min-width: 0; }
.rf-colors { display: grid; grid-template-columns: repeat(auto-fill, minmax(116px, 1fr)); gap: 6px 10px; }
.rf-color { display: flex; align-items: center; gap: 8px; font-size: 13px; }
.rf-color code { font-size: 11px; color: var(--rf-muted); }
.rf-swatch { width: 18px; height: 18px; border-radius: 5px; box-shadow: inset 0 0 0 1px rgb(0 0 0 / .18); flex: none; display: inline-block; }
.rf-scales { display: grid; gap: 4px; }
.rf-scale { display: grid; grid-template-columns: 84px 1fr 44px; align-items: center; gap: 10px; font-size: 13px; color: var(--rf-muted); }
.rf-scale.changed { color: var(--rf-fg); font-weight: 600; }
.rf-scale .rf-mono { text-align: right; }
.rf-track { height: 4px; border-radius: 2px; background: var(--rf-surface-3); position: relative; }
.rf-track i { position: absolute; top: -3px; width: 10px; height: 10px; margin-left: -5px; border-radius: 50%; background: var(--rf-muted); }
.rf-scale.changed .rf-track i { background: var(--rf-accent); }

.rf-form { display: flex; flex-direction: column; gap: 10px; }
.rf-form label { display: flex; flex-direction: column; gap: 4px; font-size: 12px; font-weight: 600; color: var(--rf-muted); }
.rf-form input, .rf-form textarea { border: 0; border-radius: var(--rf-r); background: var(--rf-surface-2); padding: 8px 10px; font-weight: 400; color: var(--rf-fg); resize: vertical; width: 100%; }
.rf-form input:focus, .rf-form textarea:focus { outline: 2px solid var(--rf-accent); background: var(--rf-bg); }

.rf-hist { display: flex; flex-direction: column; }
.rf-hbtn { display: flex; align-items: center; gap: 10px; width: 100%; padding: 6px 0; text-align: left; }
.rf-hdot { width: 8px; height: 8px; border-radius: 50%; background: var(--rf-accent); flex: none; }
.rf-hdate { font-weight: 600; font-size: 13px; min-width: 96px; }
.rf-hlabel { flex: 1; font-size: 13px; color: var(--rf-muted); }
.rf-hdetail { margin: 0 0 8px 18px; padding-left: 12px; border-left: 2px solid var(--rf-line); font-size: 12.5px; display: flex; flex-direction: column; gap: 2px; }
.rf-hdetail .add { color: var(--rf-ok); } .rf-hdetail .rem { color: var(--rf-bad); }
.rf-hdetail .clr { display: flex; align-items: center; gap: 6px; }

/* ---- compare ------------------------------------------------------------------------------------ */
.rf-compare { flex: 1; display: flex; flex-direction: column; min-width: 0; min-height: 0; }
.rf-cbar { display: flex; align-items: center; gap: 10px; padding: 10px 20px; border-bottom: 1px solid var(--rf-line); }
.rf-cbar h2 { font-size: 17px; margin-left: 4px; }
.rf-cscroll { flex: 1; overflow-y: auto; padding: 20px; }
.rf-cheads { display: grid; grid-template-columns: minmax(0, 1fr) 200px minmax(0, 1fr); gap: 20px; align-items: center; margin-bottom: 24px; }
.rf-chead { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.rf-chead .rf-stage { margin-bottom: 8px; }
.rf-chead b { font-size: 16px; overflow-wrap: anywhere; }
.rf-sim { text-align: center; }
.rf-sim-n { font-size: 44px; font-weight: 800; letter-spacing: -.02em; line-height: 1; font-variant-numeric: tabular-nums; }
.rf-sim-n small { font-size: 20px; font-weight: 700; color: var(--rf-muted); }
.rf-simbar { height: 6px; border-radius: 3px; background: var(--rf-surface-3); margin-top: 10px; overflow: hidden; }
.rf-simbar i { display: block; height: 100%; background: var(--rf-accent); border-radius: 3px; animation: rf-grow .6s var(--rf-ease); transform-origin: left; }
@keyframes rf-grow { from { transform: scaleX(0); } }
.rf-cols3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
.rf-ccol h3 { font-size: 13px; display: flex; justify-content: space-between; padding: 0 0 8px; border-bottom: 2px solid var(--rf-line); margin-bottom: 6px; }
.rf-ccol h3 span { color: var(--rf-muted); font-weight: 600; }
.rf-ccol.a h3 { border-color: var(--rf-bad); } .rf-ccol.b h3 { border-color: var(--rf-ok); } .rf-ccol.both h3 { border-color: var(--rf-muted); }
.rf-crow { display: flex; align-items: center; gap: 10px; padding: 5px 4px; border-radius: 8px; }
.rf-crow:hover { background: var(--rf-surface); }
.rf-cdetails { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; margin-top: 28px; }
.rf-cdetails h3 { font-size: 14px; margin-bottom: 8px; }
.rf-cdiff { display: flex; align-items: center; gap: 8px; padding: 3px 0; font-size: 13px; }
.rf-cdiff span:first-child { min-width: 80px; color: var(--rf-muted); }
.rf-cdiff code { margin-left: auto; font-size: 12px; color: var(--rf-muted); }

/* ---- settings page ---------------------------------------------------------------------------------- */
.rf-pnav { display: flex; align-items: center; gap: 4px; padding: 0 20px; height: 49px; border-bottom: 1px solid var(--rf-line); flex: none; }
.rf-pbrand { display: inline-flex; align-items: center; gap: 8px; margin-right: 18px; font-size: 15px; }
.rf-pnav button { height: 100%; padding: 0 12px; font-weight: 600; color: var(--rf-muted); position: relative; }
.rf-pnav button.on { color: var(--rf-fg); }
.rf-pnav button.on::after { content: ''; position: absolute; left: 8px; right: 8px; bottom: 0; height: 2px; background: var(--rf-fg); }
.rf-settings { width: min(720px, 100%); margin: 0 auto; padding: 28px 20px 80px; }
.rf-sethead { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 8px; flex-wrap: wrap; }
.rf-sethead h1 { font-size: 26px; font-weight: 800; }
.rf-setgroup { margin-top: 28px; }
.rf-setgroup h2 { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: var(--rf-muted); padding-bottom: 8px; border-bottom: 1px solid var(--rf-line); }
.rf-setrow { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 14px 0; border-bottom: 1px solid var(--rf-line); }
.rf-setl { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.rf-setl span { font-weight: 600; }
.rf-setl small { color: var(--rf-muted); font-size: 12.5px; max-width: 56ch; }
.rf-setc { display: flex; gap: 8px; flex: none; align-items: center; }
.rf-setc.wrap { flex-wrap: wrap; justify-content: flex-end; max-width: 260px; }
.rf-setp { color: var(--rf-muted); padding: 12px 0; max-width: 62ch; }
.rf-setfoot { margin-top: 32px; }
.rf-caps { display: flex; flex-direction: column; }
.rf-cap { display: grid; grid-template-columns: 14px 1fr auto; gap: 12px; align-items: center; padding: 9px 0; border-bottom: 1px solid var(--rf-line); }
.rf-cap-n { display: flex; flex-direction: column; font-weight: 600; }
.rf-cap-n small { font-weight: 400; color: var(--rf-muted); font-size: 12px; }
.rf-cap-s { font-size: 12.5px; color: var(--rf-muted); text-align: right; max-width: 240px; }
.rf-led { width: 9px; height: 9px; border-radius: 50%; background: var(--rf-surface-3); }
.rf-led.ok { background: var(--rf-ok); } .rf-led.bad { background: var(--rf-bad); }
.rf-details { margin: 8px 0; font-size: 13px; } .rf-details summary { cursor: pointer; color: var(--rf-muted); }

/* ---- welcome ------------------------------------------------------------------------------------- */
.rf-welcome { flex: 1; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); min-height: 100vh; }
.rf-wl { padding: 8vh 6vw; display: flex; flex-direction: column; justify-content: center; max-width: 640px; margin-left: auto; }
.rf-logo { width: 48px; height: 48px; border-radius: 12px; background: var(--rf-accent); color: var(--rf-accent-fg); display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
.rf-wl h1 { font-size: 40px; line-height: 1.05; font-weight: 800; letter-spacing: -.02em; }
.rf-lead { font-size: 17px; margin: 12px 0 28px; color: var(--rf-muted); max-width: 44ch; }
.rf-lead b { color: var(--rf-fg); }
.rf-steps { list-style: none; display: flex; flex-direction: column; gap: 18px; margin-bottom: 32px; }
.rf-steps li { display: flex; gap: 14px; }
.rf-steps li > span { width: 26px; height: 26px; border-radius: 50%; background: var(--rf-surface-2); font-weight: 700; font-size: 13px; display: flex; align-items: center; justify-content: center; flex: none; margin-top: 1px; }
.rf-steps p { color: var(--rf-muted); margin-top: 2px; max-width: 46ch; }
.rf-wa { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.rf-wr { background: var(--rf-surface); display: flex; align-items: center; justify-content: center; padding: 40px; }
.rf-faux { width: min(420px, 100%); background: var(--rf-bg); border-radius: 12px; box-shadow: 0 20px 50px rgb(0 0 0 / .14); overflow: hidden; transform: rotate(-1.2deg); }
.rf-faux-tabs { display: flex; border-bottom: 1px solid var(--rf-line); }
.rf-faux-tabs span { flex: 1; text-align: center; padding: 14px 0; font-weight: 600; color: var(--rf-muted); }
.rf-faux-tabs .on { color: var(--rf-fg); box-shadow: inset 0 -2px var(--rf-fg); }
.rf-faux-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; padding: 16px; }
.rf-faux-grid i { display: block; aspect-ratio: 1; border-radius: 8px; background: var(--rf-surface-2); }
.rf-faux-grid b { display: block; height: 8px; width: 70%; border-radius: 4px; background: var(--rf-surface-2); margin-top: 8px; }
.rf-faux-grid div:nth-child(2) i { background: var(--rf-accent-soft); box-shadow: inset 0 0 0 2px var(--rf-accent); }

/* ---- responsive & motion ------------------------------------------------------------------------------- */
@media (max-width: 760px) {
  .rf-bar { padding: 8px 12px; gap: 8px; }
  .rf-who b { max-width: 14ch; }
  .rf-tabs { margin-left: 0; }
  .rf-tabs button { padding: 0 9px; }
  .rf-toolbar, .rf-subbar { padding-left: 12px; padding-right: 12px; }
  .rf-scroll { padding-left: 12px; padding-right: 12px; }
  .rf-hide-s { display: none; }
  .rf-cols3 { grid-template-columns: 1fr; }
  .rf-cheads { grid-template-columns: 1fr 1fr; } .rf-sim { grid-column: 1 / -1; order: -1; }
  .rf-welcome { grid-template-columns: 1fr; } .rf-wr { display: none; } .rf-wl { margin: 0 auto; }
  .rf-setrow { flex-direction: column; align-items: flex-start; gap: 10px; }
}
/* ---- motion v2 ------------------------------------------------------------------------------------
   Entrances are one-shot and cheap (transform/opacity). Collection changes are animated in JS with FLIP (see motion.ts),
   so nothing below replays when a list is merely filtered or sorted. */
@keyframes rf-rise { from { opacity: 0; transform: translateY(var(--rf-dy-s)); } }
.rf-grid.intro .rf-cell { animation: rf-rise .42s var(--rf-ease) backwards; animation-delay: calc(var(--i, 0) * 18ms); }
.rf-scroll > .rf-items, .rf-explorer > .rf-empty, .rf-scroll > .rf-empty { animation: rf-rise .3s var(--rf-ease) backwards; }
.rf-pane > .rf-explorer { animation: rf-rise .26s var(--rf-ease) backwards; }
.rf-compare { animation: rf-rise .3s var(--rf-ease) backwards; }
.rf-cost, .rf-change { animation: rf-rise .34s var(--rf-ease) backwards; }

/* disclosure: height animates via grid rows (no layout measuring in JS) */
.rf-collapse { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .32s var(--rf-ease); }
.rf-collapse[data-open=true] { grid-template-rows: 1fr; }
.rf-collapse-in { overflow: hidden; min-height: 0; opacity: 0; visibility: hidden; transition: opacity .2s, visibility 0s .32s; }
.rf-collapse[data-open=true] > .rf-collapse-in { opacity: 1; visibility: visible; transition: opacity .28s .06s, visibility 0s; }
.rf-chev { transition: transform .3s var(--rf-ease); }
[aria-expanded=true] > .rf-chev { transform: rotate(90deg); }

/* background refresh: a thin indeterminate line instead of swapping content for skeletons */
.rf-refresh { position: relative; height: 2px; flex: none; overflow: hidden; opacity: 0; transition: opacity .2s; }
.rf-refresh.on { opacity: 1; }
.rf-refresh::after { content: ''; position: absolute; inset: 0; width: 40%; background: var(--rf-accent); animation: rf-slide 1.1s var(--rf-ease) infinite; }
@keyframes rf-slide { from { transform: translateX(-100%); } to { transform: translateX(250%); } }

.rf-btn.on .rf-ico { animation: rf-boing .5s var(--rf-spring); }
@keyframes rf-boing { from { transform: scale(.5); } }
.rf-fresh { animation: rf-flash 1.2s var(--rf-ease) both; }
@keyframes rf-flash { from { background: var(--rf-accent-soft); } }

/* compare overlay */
.rf-overlay { position: relative; user-select: none; touch-action: none; }
.rf-overlay .rf-thumb.top { position: absolute; inset: 0; background: none; }
.rf-overlay-line { position: absolute; top: 0; bottom: 0; width: 2px; margin-left: -1px; background: var(--rf-accent); pointer-events: none; }
.rf-overlay-line::after { content: ''; position: absolute; top: 50%; left: 50%; width: 22px; height: 22px; margin: -11px; border-radius: 50%; background: var(--rf-accent); border: 3px solid var(--rf-bg); }
.rf-overlay input { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; cursor: ew-resize; margin: 0; }
.rf-overlay input:focus-visible ~ .rf-overlay-line::after { outline: 2px solid var(--rf-fg); outline-offset: 2px; }
.rf-overlay-tag { position: absolute; top: 8px; font-size: 11px; font-weight: 700; padding: 2px 7px; border-radius: 4px; background: var(--rf-bg); }
.rf-bodypair { display: flex; gap: 18px; align-items: flex-start; margin-bottom: 8px; }
.rf-bodypair .rf-fig { width: 44px; }

/* library: collection headings and item strips */
.rf-lgroup { margin-bottom: 18px; }
.rf-lgroup > h3 { font-size: 13px; font-weight: 700; padding: 6px 2px 8px; display: flex; gap: 8px; align-items: baseline; }
.rf-lgroup > h3 span { color: var(--rf-muted); font-weight: 600; }
.rf-strip { display: flex; margin-top: 3px; padding-left: 2px; min-height: 20px; }
.rf-strip img, .rf-strip i { width: 20px; height: 20px; border-radius: 5px; margin-right: -5px; border: 2px solid var(--rf-bg); background: var(--rf-surface-2); object-fit: cover; flex: none; }
.rf-strip em { font-style: normal; font-size: 11px; color: var(--rf-muted); margin-left: 10px; align-self: center; }
.rf-cell.picked .rf-strip img, .rf-cell.active .rf-strip img { border-color: transparent; }

/* Reduced motion, designed rather than disabled: same timing, no travel, no spring.
   Content still eases in and out with opacity, which keeps state changes legible.
   Spinners and the refresh line keep running because they carry meaning. */
.rf.rm { --rf-dy: 0px; --rf-dy-s: 0px; --rf-dx: 0px; --rf-pop: 1; --rf-lift: 0px; --rf-press: 1; --rf-drop: 0px; --rf-spring: cubic-bezier(.22, 1, .36, 1); }
.rf.rm .rf-skel { animation: rf-pulse 1.6s ease-in-out infinite; background: var(--rf-surface); }
@keyframes rf-pulse { 50% { opacity: .55; } }
.rf.rm .rf-collapse, .rf.rm .rf-seg::before, .rf.rm .rf-tabs::after { transition-duration: .12s; }
.rf.rm .rf-btn.on .rf-ico { animation: none; }

.rf-ghost { position: fixed; transform-origin: 0 0; pointer-events: none; z-index: 60; border-radius: 8px; overflow: hidden; }
.rf-ghost img { width: 100%; height: 100%; object-fit: contain; display: block; }
.rf-fresh-text { animation: rf-fade .3s backwards; display: inline-block; }
.rf-cblend { max-width: 620px; margin: 0 auto 20px; }
.rf-overlay .rf-thumb { position: absolute; inset: 0; aspect-ratio: auto; background: none; border-radius: 0; }
.rf-overlay .rf-thumb.top { background: var(--rf-surface); }
.rf-cheads.compact { grid-template-columns: minmax(0, 1fr) 200px minmax(0, 1fr); }
.rf-cheads.compact .rf-chead { align-items: flex-start; }
[hidden] { display: none !important; }

/* ---- "why no outfits" ---------------------------------------------------------------------------- */
.rf-why { max-width: 520px; margin: 6vh auto 0; display: flex; flex-direction: column; align-items: flex-start; gap: 8px; animation: rf-rise .4s var(--rf-ease) backwards; }
.rf-why h3 { font-size: 20px; font-weight: 800; letter-spacing: -.01em; }
.rf-why-lead { color: var(--rf-muted); margin-bottom: 6px; }
.rf-why-art { width: 64px; height: 64px; border-radius: 16px; background: var(--rf-surface-2); display: flex; align-items: center; justify-content: center; color: var(--rf-muted); margin-bottom: 6px; }
.rf-why-art.lock { color: var(--rf-fg); }
.rf-why-art .shackle { transform-box: fill-box; transform-origin: 100% 100%; animation: rf-shackle .9s var(--rf-spring) .25s backwards; }
@keyframes rf-shackle { from { transform: translateY(-4px) rotate(-18deg); } }
.rf-reasons { list-style: none; padding: 0; margin: 4px 0 8px; width: 100%; display: flex; flex-direction: column; }
.rf-reasons li { display: grid; grid-template-columns: 22px 1fr auto; gap: 12px; align-items: start; padding: 11px 0; border-top: 1px solid var(--rf-line); animation: rf-rise .4s var(--rf-ease) backwards; animation-delay: calc(120ms + var(--i, 0) * 70ms); }
.rf-reasons li:last-child { border-bottom: 1px solid var(--rf-line); }
.rf-vdot { width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-top: 1px; background: var(--rf-surface-3); color: var(--rf-muted); }
.rf-vdot i { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.v-yes .rf-vdot { background: var(--rf-accent); color: var(--rf-accent-fg); }
.v-no .rf-vdot { background: var(--rf-surface-2); }
.rf-rtext { display: flex; flex-direction: column; min-width: 0; }
.rf-rtext b { font-weight: 700; font-size: 13.5px; }
.rf-rtext span { color: var(--rf-muted); font-size: 12.5px; }
.rf-rtag { font-style: normal; font-size: 11px; font-weight: 700; color: var(--rf-muted); white-space: nowrap; margin-top: 2px; }
.v-yes .rf-rtag { color: var(--rf-accent); }
.rf-why-tech { font-size: 12.5px; margin-top: 8px; }
.rf-techdl { display: grid; grid-template-columns: max-content 1fr; gap: 3px 14px; font-size: 12.5px; padding: 8px 0 0; }
.rf-techdl dt { color: var(--rf-muted); }

/* ---- toolbar popup: one job (get to outfits), three rows at most ---------------------------------------------- */
.rf-popup { width: 320px; padding: 0 0 6px; gap: 0; background: var(--rf-bg); }
.rf-pop-h { display: flex; align-items: center; gap: 9px; padding: 10px 8px 8px 14px; font-size: 15px; }
.rf-pop-logo { width: 26px; height: 26px; border-radius: 7px; background: var(--rf-accent); color: var(--rf-accent-fg); display: flex; align-items: center; justify-content: center; }
.rf-pop-now { display: flex; align-items: center; gap: 12px; margin: 2px 10px 6px; padding: 12px 14px; border-radius: 12px; background: var(--rf-surface); text-align: left; width: calc(100% - 20px); animation: rf-rise .32s var(--rf-ease) backwards; }
.rf-pop-now.live { background: var(--rf-accent); color: var(--rf-accent-fg); transition: transform .3s var(--rf-spring), background .15s; }
.rf-pop-now.live:hover { background: color-mix(in srgb, var(--rf-accent) 90%, #000); }
.rf-pop-now.live:active { transform: scale(var(--rf-press)); }
.rf-pop-now.live .rf-muted { color: color-mix(in srgb, var(--rf-accent-fg) 78%, transparent); }
.rf-pop-now-t { display: flex; flex-direction: column; min-width: 0; flex: 1; gap: 1px; }
.rf-pop-now-t small { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; opacity: .75; }
.rf-pop-now-t b { font-size: 16px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.rf-pop-now-t span { font-size: 12.5px; }
.rf-pop-go { width: 30px; height: 30px; border-radius: 50%; background: rgb(255 255 255 / .2); display: flex; align-items: center; justify-content: center; transition: transform .3s var(--rf-spring); }
.rf-pop-now.live:hover .rf-pop-go { transform: translateX(3px); }
.rf-pop-now.idle { color: var(--rf-muted); font-size: 13px; align-items: flex-start; }
.rf-pop-now.idle b { color: var(--rf-fg); }
.rf-pop-now.idle .rf-ico { margin-top: 1px; flex: none; }
.rf-pop-now.sk { height: 74px; position: relative; overflow: hidden; padding: 0; }
.rf-pop-sec { padding: 4px 10px 0; }
.rf-pop-sec h2 { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; color: var(--rf-muted); padding: 8px 4px 4px; }
.rf-pop-row, .rf-pop-lib { display: flex; align-items: center; gap: 11px; width: 100%; padding: 8px 8px; border-radius: 10px; text-align: left; transition: background .12s, transform .12s var(--rf-ease); }
.rf-pop-row { animation: rf-rise .34s var(--rf-ease) backwards; animation-delay: calc(80ms + var(--i, 0) * 45ms); }
.rf-pop-row:hover, .rf-pop-lib:hover { background: var(--rf-surface); }
.rf-pop-row:active, .rf-pop-lib:active { transform: scale(.985); }
.rf-pop-av { width: 30px; height: 30px; border-radius: 50%; background: var(--rf-surface-3); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px; flex: none; }
.rf-pop-name { display: flex; flex-direction: column; flex: 1; min-width: 0; font-weight: 600; font-size: 13.5px; }
.rf-pop-name small { font-weight: 400; color: var(--rf-muted); font-size: 12px; }
.rf-pop-chev { color: var(--rf-muted); transition: transform .25s var(--rf-ease); }
.rf-pop-row:hover .rf-pop-chev, .rf-pop-lib:hover .rf-pop-chev { transform: translateX(2px); }
.rf-pop-lib { margin: 6px 10px 0; width: calc(100% - 20px); font-weight: 600; border-top: 1px solid var(--rf-line); border-radius: 0 0 10px 10px; padding-top: 11px; }
.rf-pop-lib em { margin-left: auto; font-style: normal; font-weight: 400; font-size: 12px; color: var(--rf-muted); }
.rf-pop-lib .rf-pop-chev { margin-left: 0; }
`;async function F(r,e){let t;try{t=await chrome.runtime.sendMessage({__rofit:!0,type:r,req:e})}catch{throw{kind:"network",message:"RoFit\u2019s background worker did not answer. Reload the page and try again."}}if(!t)throw{kind:"network",message:"RoFit\u2019s background worker did not answer. Reload the page and try again."};if(!t.ok)throw t.error;return t.data}var Gr=[["path",{d:"M12 10.5V9.5a2.5 2.5 0 1 0-2.5-2.5"}],["path",{d:"M12 10.5 3 17a1.3 1.3 0 0 0 .8 2.4h16.4A1.3 1.3 0 0 0 21 17l-9-6.5Z"}]];var Pe=[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]];var Ae=[["path",{d:"m21 16-4 4-4-4"}],["path",{d:"M17 20V4"}],["path",{d:"m3 8 4-4 4 4"}],["path",{d:"M7 4v16"}]];var Re=[["path",{d:"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"}],["path",{d:"m9 10 2 2 4-4"}]];var De=[["path",{d:"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"}]];var Le=[["path",{d:"M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"}],["path",{d:"m7 16.5-4.74-2.85"}],["path",{d:"m7 16.5 5-3"}],["path",{d:"M7 16.5v5.17"}],["path",{d:"M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"}],["path",{d:"m17 16.5-5-3"}],["path",{d:"m17 16.5 4.74-2.85"}],["path",{d:"M17 16.5v5.17"}],["path",{d:"M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"}],["path",{d:"M12 8 7.26 5.15"}],["path",{d:"m12 8 4.74-2.85"}],["path",{d:"M12 13.5V8"}]];var Be=[["path",{d:"M20 6 9 17l-5-5"}]];var Te=[["path",{d:"m6 9 6 6 6-6"}]];var Fe=[["path",{d:"m9 18 6-6-6-6"}]];var te=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m16 9-5.5 5.5L8 12"}]];var qe=[["path",{d:"M10.1 2.182a10 10 0 0 1 3.8 0"}],["path",{d:"M13.9 21.818a10 10 0 0 1-3.8 0"}],["path",{d:"M17.609 3.721a10 10 0 0 1 2.69 2.7"}],["path",{d:"M2.182 13.9a10 10 0 0 1 0-3.8"}],["path",{d:"M20.279 17.609a10 10 0 0 1-2.7 2.69"}],["path",{d:"M21.818 10.1a10 10 0 0 1 0 3.8"}],["path",{d:"M3.721 6.391a10 10 0 0 1 2.7-2.69"}],["path",{d:"M6.391 20.279a10 10 0 0 1-2.69-2.7"}]];var ze=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 6v6l4 2"}]];var Ue=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]];var He=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];var ae=[["circle",{cx:"12",cy:"12",r:"1"}],["circle",{cx:"19",cy:"12",r:"1"}],["circle",{cx:"5",cy:"12",r:"1"}]];var Oe=[["path",{d:"M15 3h6v6"}],["path",{d:"M10 14 21 3"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}]];var Ee=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"}],["path",{d:"m2 2 20 20"}]];var Ie=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{cx:"12",cy:"12",r:"3"}]];var oe=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{d:"M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"}],["path",{d:"M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"}]];var fe=[["path",{d:"M4 12.15V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3.35"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{d:"m5 16-3 3 3 3"}],["path",{d:"m9 22 3-3-3-3"}]];var se=[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"}]];var Ve=[["circle",{cx:"5",cy:"6",r:"3"}],["path",{d:"M12 6h5a2 2 0 0 1 2 2v7"}],["path",{d:"m15 9-3-3 3-3"}],["circle",{cx:"19",cy:"18",r:"3"}],["path",{d:"M12 18H7a2 2 0 0 1-2-2V9"}],["path",{d:"m9 15 3 3-3 3"}]];var Ge=[["line",{x1:"4",x2:"20",y1:"9",y2:"9"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21"}]];var We=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]];var le=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"}]];var Ne=[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1"}]];var Xe=[["path",{d:"m16 6 4 14"}],["path",{d:"M12 6v14"}],["path",{d:"M8 8v12"}],["path",{d:"M4 4v16"}]];var je=[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"}]];var $e=[["path",{d:"M13 5h8"}],["path",{d:"M13 12h8"}],["path",{d:"M13 19h8"}],["path",{d:"m3 17 2 2 4-4"}],["path",{d:"m3 7 2 2 4-4"}]];var Ke=[["path",{d:"M3 5h.01"}],["path",{d:"M3 12h.01"}],["path",{d:"M3 19h.01"}],["path",{d:"M8 5h13"}],["path",{d:"M8 12h13"}],["path",{d:"M8 19h13"}]];var Ze=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4"}]];var Je=[["path",{d:"M5 12h14"}]];var Qe=[["path",{d:"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"}],["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor"}]];var Ye=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];var er=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];var rr=[["path",{d:"m2 9 3-3 3 3"}],["path",{d:"M13 18H7a2 2 0 0 1-2-2V6"}],["path",{d:"m22 15-3 3-3-3"}],["path",{d:"M11 6h6a2 2 0 0 1 2 2v10"}]];var de=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}],["path",{d:"M12 7v5l4 2"}]];var tr=[["path",{d:"M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"}],["path",{d:"m14.5 12.5 2-2"}],["path",{d:"m11.5 9.5 2-2"}],["path",{d:"m8.5 6.5 2-2"}],["path",{d:"m17.5 15.5 2-2"}]];var ar=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];var or=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{cx:"12",cy:"12",r:"3"}]];var fr=[["path",{d:"M16 10a4 4 0 0 1-8 0"}],["path",{d:"M3.103 6.034h17.794"}],["path",{d:"M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"}]];var sr=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"}]];var lr=[["path",{d:"M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"}],["path",{d:"M15 3v5a1 1 0 0 0 1 1h5"}]];var dr=[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor"}]];var ie=[["path",{d:"M10 11v6"}],["path",{d:"M14 11v6"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{d:"M3 6h18"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}]];var ne=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]];var ir=[["path",{d:"M12 3v12"}],["path",{d:"m17 8-5-5-5 5"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}]];var nr=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{cx:"12",cy:"7",r:"4"}]];var pr=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];var pt=0;function m(r,e,t,a,o,f){e||(e={});var i,l,p=e;if("ref"in p&&typeof r!="function")for(l in p={},e)l=="ref"?i=e[l]:p[l]=e[l];var u={type:r,props:p,key:t,ref:i,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--pt,__i:-1,__u:0};return(o||f)&&(u.__source=o,u.__self=f),b.vnode&&b.vnode(u),u}function ut({node:r,size:e=18,class:t,label:a}){return m("svg",{class:"rf-ico "+(t??""),width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":a?void 0:"true",role:a?"img":void 0,"aria-label":a,children:r.map(([o,f],i)=>m(o,{...f},i))})}var mt={search:ar,close:pr,back:Pe,settings:or,check:Be,copy:Ue,external:Oe,save:De,saved:Re,compare:Ve,more:ae,grid:Ne,list:Ke,refresh:er,down:Te,right:Fe,outfit:Gr,library:Xe,download:He,upload:ir,trash:ie,filter:se,history:de,warn:ne,info:We,link:je,code:fe,json:oe,layers:le,scale:tr,palette:Qe,tag:dr,note:lr,lock:Ze,user:nr,ok:te,dashed:qe,sort:Ae,eye:Ie,eyeOff:Ee,minus:Je,plus:Ye,repeat:rr,tasks:$e,spark:sr,boxes:Le,hash:Ge,bag:fr,clock:ze},D=({n:r,size:e,class:t,label:a})=>m(ut,{node:mt[r],size:e,class:t,label:a});var V={appearance:"auto",motion:"full",density:"comfortable",layout:"grid",showPrices:!0,technical:!1,showPresets:!1,profileTab:!0,profileButton:!0,keepHistory:!0,historyLimit:20,cacheMinutes:10,onboarded:!1},pe="settings";async function Wr(){try{let r=await chrome.storage.local.get(pe);return{...V,...r[pe]||{}}}catch{return{...V}}}function Nr(r){let e=(t,a)=>{a==="local"&&t[pe]&&r({...V,...t[pe].newValue||{}})};return chrome.storage.onChanged.addListener(e),()=>chrome.storage.onChanged.removeListener(e)}function Xr(){let[r,e]=T(V);return H(()=>(Wr().then(e),Nr(e)),[]),r}var ur=class{map=new Map;queue=new Map;listeners=new Set;timer=0;get(e,t="150x150"){return this.map.get(`${e}:${t}`)}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}request(e,t="150x150"){let a=`${e}:${t}`;this.map.get(a)?.url||this.queue.has(a)||(this.queue.set(a,{id:e,size:t,tries:0}),this.timer||(this.timer=window.setTimeout(()=>this.flush(),50)))}emit(){this.listeners.forEach(e=>e())}async flush(){this.timer=0;let e=[...this.queue.values()];this.queue.clear();for(let t of["150x150","420x420"]){let a=e.filter(o=>o.size===t).map(o=>o.id);for(let o=0;o<a.length;o+=50){let f=a.slice(o,o+50);try{let i=await F("outfits.thumbs",{ids:f,size:t});for(let l of f){let p=i[l]??{state:"Error",url:null};this.map.set(`${l}:${t}`,p);let u=e.find(d=>d.id===l&&d.size===t);p.state==="Pending"&&u.tries<6&&(this.queue.set(`${l}:${t}`,{id:l,size:t,tries:u.tries+1}),this.timer||(this.timer=window.setTimeout(()=>this.flush(),2500)))}}catch(i){for(let l of f)this.map.set(`${l}:${t}`,{state:i.kind==="rate-limited"?"RateLimited":"Error",url:null})}this.emit()}}}},Po=new ur;function ue(r,e){let[t,a]=T({loading:!0}),[o,f]=T(0);return H(()=>{let i=!1;return a(l=>({data:l.data,loading:!0})),r().then(l=>!i&&a({data:l,loading:!1}),l=>!i&&a({error:l,loading:!1})),()=>{i=!0}},[...e,o]),{...t,reload:()=>f(i=>i+1)}}function jr(r){let[e,t]=T(()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches);return H(()=>{let a=window.matchMedia("(prefers-reduced-motion: reduce)"),o=()=>t(a.matches);return a.addEventListener("change",o),()=>a.removeEventListener("change",o)},[]),e||r==="reduced"}var me={bg:"rgb(255, 255, 255)",fg:"rgb(32, 34, 39)",accent:"rgb(51, 95, 255)",accentFg:"#ffffff",tint:"rgb(27, 37, 75)"},mr={bg:"rgb(18, 18, 21)",fg:"rgb(247, 247, 248)",accent:"rgb(51, 95, 255)",accentFg:"#ffffff",tint:"rgb(208, 217, 251)"},xt={bg:"rgb(0, 0, 0)",fg:"rgb(247, 247, 248)",accent:"rgb(51, 95, 255)",accentFg:"#ffffff",tint:"rgb(208, 217, 251)"};function G(r){let e=r.match(/rgba?\(([^)]+)\)/);if(!e)return null;let t=e[1].split(/[ ,/]+/).filter(Boolean).map(Number);return[t[0],t[1],t[2],t[3]??1]}var $r=([r,e,t])=>{let a=o=>(o/=255,o<=.03928?o/12.92:((o+.055)/1.055)**2.4);return .2126*a(r)+.7152*a(e)+.0722*a(t)};function ct(){let r=g=>{for(let x=g;x;x=x.parentElement){let n=G(getComputedStyle(x).backgroundColor);if(n&&n[3]>.9)return n}return null},e=r(document.body)??r(document.documentElement);if(!e)return me;let a=$r(e)<.4?mr:me,o=G(getComputedStyle(document.body).color),f=a.accent,i=document.querySelector(".bg-action-emphasis, .btn-primary-md, .btn-growth-md"),l=i?G(getComputedStyle(i).backgroundColor):null;l&&l[3]>.9&&(f=`rgb(${l[0]}, ${l[1]}, ${l[2]})`);let p=document.querySelector(".bg-action-standard"),u=p?G(getComputedStyle(p).backgroundColor):null,d=u?`rgb(${u[0]}, ${u[1]}, ${u[2]})`:a.tint;return{bg:`rgb(${e[0]}, ${e[1]}, ${e[2]})`,fg:o?`rgb(${o[0]}, ${o[1]}, ${o[2]})`:a.fg,accent:f,accentFg:"#ffffff",tint:d}}function Kr(r,e){let t;r.appearance==="light"?t=me:r.appearance==="dark"?t=mr:r.appearance==="oled"?t=xt:e?t=ct():t=window.matchMedia("(prefers-color-scheme: dark)").matches?mr:me;let a=G(t.bg);return{...t,dark:a?$r(a)<.4:!1}}function Zr(r){let[e,t,a,o]=r.dark?["11%","17%","23%","19%"]:["3.5%","7.5%","12%","13%"];return{"--rf-bg":r.bg,"--rf-fg":r.fg,"--rf-accent":r.accent,"--rf-accent-fg":r.accentFg,"--rf-tint":r.tint,"--rf-s1":e,"--rf-s2":t,"--rf-s3":a,"--rf-line-pct":o,"color-scheme":r.dark?"dark":"light"}}var ht=new Intl.NumberFormat("en-US");function xr(r,e=Date.now()){let t=Math.max(0,(e-r)/1e3);return t<45?"just now":t<3600?`${Math.round(t/60)}m ago`:t<86400?`${Math.round(t/3600)}h ago`:t<86400*30?`${Math.round(t/86400)}d ago`:new Date(r).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}var xe=(r,e,t=e+"s")=>`${ht.format(r)} ${r===1?e:t}`;var Jr=document.createElement("style");Jr.textContent=Vr;document.head.appendChild(Jr);function gt(){let r=Xr(),e=jr(r.motion),[t,a]=T(void 0),o=ue(()=>F("users.recent",{}),[]),f=ue(()=>F("diag.get",{}).then(n=>n.counts.library),[]),i=ue(async()=>t?F("outfits.cached",{userId:t.userId}):null,[t?.userId]);H(()=>{chrome.tabs.query({active:!0,currentWindow:!0}).then(([c])=>{let s=c?.url?.match(/^https:\/\/www\.roblox\.com\/(?:[a-z]{2}(?:-[a-z]{2,4})?\/)?users\/(\d+)/i);a(c?.id&&s?{tabId:c.id,userId:Number(s[1]),name:(c.title??"").replace(/\s*[-–|]\s*Roblox.*$/i,"").trim()||"this profile"}:null)}).catch(()=>a(null))},[]);let l=Zr(Kr(r,!1)),p=async()=>{if(t)try{await chrome.tabs.sendMessage(t.tabId,{__rofit:"open"}),window.close()}catch{await chrome.tabs.update(t.tabId,{url:`https://www.roblox.com/users/${t.userId}/profile#rofit`}),window.close()}},u=n=>{chrome.tabs.create({url:`https://www.roblox.com/users/${n}/profile#rofit`}),window.close()},d=n=>{F("page.open",{route:n}),window.close()},g=i.data?.outfits.filter(n=>n.isEditable).length,x=(o.data??[]).filter(n=>n.id!==t?.userId).slice(0,4);return m("div",{class:"rf rf-popup"+(e?" rm":""),style:l,children:[m("header",{class:"rf-pop-h",children:[m("span",{class:"rf-pop-logo",children:m(D,{n:"outfit",size:16})}),m("b",{children:"RoFit"}),m("span",{class:"rf-grow"}),m("button",{class:"rf-ib","aria-label":"Open settings",title:"Settings",onClick:()=>d("settings"),children:m(D,{n:"settings",size:18})})]}),t===void 0?m("div",{class:"rf-pop-now sk",children:m("div",{class:"rf-skel"})}):t?m("button",{class:"rf-pop-now live",onClick:p,children:[m("span",{class:"rf-pop-now-t",children:[m("small",{children:"This profile"}),m("b",{children:t.name}),m("span",{class:"rf-muted",children:g===void 0?"Browse their saved outfits":g?`${xe(g,"saved outfit")} \xB7 seen ${xr(i.data.user?.lastSyncAt??Date.now())}`:"Browse their saved outfits"})]}),m("span",{class:"rf-pop-go",children:m(D,{n:"right",size:18})})]}):m("div",{class:"rf-pop-now idle",children:[m(D,{n:"outfit",size:20}),m("span",{children:["Open a Roblox profile and RoFit adds ",m("b",{children:"Outfits"})," next to About and Creations."]})]}),x.length>0&&m("section",{class:"rf-pop-sec","aria-label":"Recently viewed",children:[m("h2",{children:"Recently viewed"}),x.map((n,c)=>m("button",{class:"rf-pop-row",style:{"--i":c},onClick:()=>u(n.id),children:[m("span",{class:"rf-pop-av",children:n.name.slice(0,1).toUpperCase()}),m("span",{class:"rf-pop-name",children:[n.name,m("small",{children:[n.outfitCount!=null?xe(n.outfitCount,"outfit"):"profile"," \xB7 ",xr(n.lastSeen)]})]}),m(D,{n:"right",size:16,class:"rf-pop-chev"})]},n.id))]}),m("button",{class:"rf-pop-lib",onClick:()=>d("library"),children:[m(D,{n:"library",size:16}),m("span",{children:"Library"}),m("em",{children:f.data?xe(f.data,"saved outfit"):""}),m(D,{n:"right",size:16,class:"rf-pop-chev"})]})]})}Rr(m(gt,{}),document.getElementById("root"));})();
