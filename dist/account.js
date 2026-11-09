var $t=Object.defineProperty;var jt=(r,e,t)=>()=>{if(t)throw t[0];try{return r&&(e=r(r=0)),e}catch(a){throw t=[a],a}};var Wt=(r,e)=>{for(var t in e)$t(r,t,{get:e[t],enumerable:!0})};var Rt={};Wt(Rt,{DEFAULTS:()=>I,loadSettings:()=>de,normalizeSettings:()=>Ne,onSettings:()=>Ve,saveSettings:()=>Ge});function Ne(r){let e=r&&typeof r=="object"?r:{},t={...I,...e};return(!e.v||e.v<2)&&(e.motion==="reduced"?t.motion="calm":(e.motion==="full"||e.motion===void 0)&&(t.motion="system")),["system","full","balanced","calm"].includes(t.motion)||(t.motion="system"),t.v=2,t}async function de(){try{let r=await chrome.storage.local.get(Y);return Ne(r[Y])}catch{return{...I}}}async function Ge(r){let e={...await de(),...r,v:2};return await chrome.storage.local.set({[Y]:e}),e}function Ve(r){let e=(t,a)=>{a==="local"&&t[Y]&&r(Ne(t[Y].newValue))};return chrome.storage.onChanged.addListener(e),()=>chrome.storage.onChanged.removeListener(e)}var I,Y,ue=jt(()=>{"use strict";I={v:2,appearance:"auto",motion:"system",density:"comfortable",layout:"grid",showPrices:!0,technical:!1,showPresets:!1,profileTab:!0,profileButton:!0,keepHistory:!0,historyLimit:20,cacheMinutes:10,onboarded:!1,autoIndex:!1,indexPrices:!0,checkAccess:!0},Y="settings"});var b,ot,Xt,B,rt,fe,st,oe,j,nt,Re,Se,Me,ft,ie={},le=[],Kt=/^m(i|n|o|s|text|space)$/,Pe=Array.isArray,it=le.slice,q=Object.assign;function pe(r){r&&r.parentNode&&r.remove()}function se(r,e,t,a,n){var o={type:r,props:e,key:t,ref:a,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:n||++ot,__i:-1,__u:0};return!n&&b.vnode&&b.vnode(o),o}function T(r){return r.children}function ne(r,e){this.props=r,this.context=e,this.__g=0}function E(r,e){if(e==null)return r.__?E(r.__,r.__i+1):null;for(var t;e<r.__k.length;e++)if((t=r.__k[e])&&t.__e)return t.__e;return typeof r.type!="function"||r.props.__P?null:E(r)}function lt(r){if((r=r.__)&&r.__c&&!r.props.__P)return r.__e=null,r.__k.some(function(e){return e&&(r.__e=e.__e)}),lt(r)}function Ae(r){(8&r.__g||!(r.__g|=8)||!B.push(r)||fe++)&&rt==b.debounceRendering||((rt=b.debounceRendering)||queueMicrotask)(Yt)}function Yt(){var r,e,t,a,n,o,i,p,d;try{for(e=1;B.length;)B.length>e&&B.sort(st),r=B.shift(),e=B.length,8&r.__g&&(a=void 0,n=void 0,o=(n=(t=r).__v).__e,i=[],p=[],(d=t.__P)&&((a=q({constructor:void 0},n)).__v=n.__v+1,b.vnode&&b.vnode(a),Le(d,a,n,t.__n,d.namespaceURI,32&n.__u?[o]:null,i,o||E(n),32&n.__u,p),a.__v=n.__v,a.__.__k[a.__i]=a,ct(i,a,p),n.__=n.__e=null,a.__e!=o&&lt(a)))}finally{B.length=fe=0}}function pt(r,e,t,a,n,o,i,p,d,m,f){var x,c,u,g,l,M,k=a.__k||le,P=e.length;for(d=Zt(t,e,k,d,P),x=0;x<P;x++)(u=t.__k[x])!=null&&(c=~u.__i&&k[u.__i]||ie,u.__i=x,M=Le(r,u,c,n,o,i,p,d,m,f),g=u.__e,u.ref&&(c.ref!=u.ref||8&c.__u)&&(c.ref!=u.ref&&c.ref&&Te(c.ref,null,u),f.push(u.ref,u.__c||g,u)),l=l||g,4&u.__u?(d=dt(u,d,r,!c.__v),c.__e&&(c.__e=null)):typeof u.type=="function"&&M!==void 0?d=M:g&&(d=g.nextSibling),u.__u&=-7);return t.__e=l,d}function Zt(r,e,t,a,n){var o,i,p,d,m,f,x,c,u,g,l=t.length,M=l,k=0,P=!1,h=r.__k=Array(n);for(o=0;o<n;o++)(i=e[o])!=null&&typeof i!="boolean"&&typeof i!="function"?(typeof i!="object"||i.constructor==String?i=h[o]=se(null,i):Pe(i)?i=h[o]=se(T,{children:i}):i.constructor===void 0&&i.__b?i=h[o]=se(i.type,i.props,i.key,i.ref,i.__v):h[o]=i,d=o+k,i.__=r,i.__b=r.__b+1,p=null,~(m=i.__i=Jt(i,t,d,M))&&(M--,(p=t[m])&&(p.__u|=2)),p&&p.__v?(i.__u|=2,m==d-1?k--:m==d+1?k++:m!=d&&(m>d?k--:k++,P=!0)):(~m||(n>l?k--:n<l&&k++),typeof i.type!="function"&&(i.__u|=4))):h[o]=null;if(P){for(f=[],x=[],o=0;o<n;o++)if((i=h[o])&&2&i.__u){for(c=0,u=f.length;c<u;)f[g=c+u>>1]<i.__i?c=g+1:u=g;f[c]=i.__i,x[o]=c+1}for(k=f.length;o--;)x[o]&&(x[o]==k?k--:h[o].__u|=4)}if(M)for(o=0;o<l;o++)!(p=t[o])||2&p.__u||(p.__e==a&&(a=E(p)),De(p,p));return a}function dt(r,e,t,a){var n,o;if(typeof r.type=="function"){if(r.props.__P)return e;if(n=r.__k)for(o=0;o<n.length;o++)n[o]&&(n[o].__=r,e=dt(n[o],e,t,!1));return e}for(e&&!e.parentNode&&(e=E(r))&&!e.parentNode&&(e=null),r.__e!=e&&(!a&&t.moveBefore&&r.__e.parentNode?t.moveBefore(r.__e,e):t.insertBefore(r.__e,e||null)),e=r.__e;(e=e&&e.nextSibling)&&e.nodeType==8;);return e}function Jt(r,e,t,a){var n,o,i,p=r.key,d=r.type,m=e[t],f=m&&!(2&m.__u);if(m===null&&p==null||f&&p==m.key&&d==m.type)return t;if(a>(f?1:0)){for(n=t-1,o=t+1;n>=0||o<e.length;)if((m=e[i=n>=0?n--:o++])&&!(2&m.__u)&&p==m.key&&d==m.type)return i}return-1}function tt(r,e,t){t==null&&(t=""),e[0]=="-"?r.setProperty(e,t):r[e]=t}function ae(r,e,t,a,n){var o;e:if(e=="style")if(typeof t=="string")r.style.cssText=t;else{if(typeof a=="string"&&(r.style.cssText=a=""),a)for(e in a)t&&e in t||tt(r.style,e,"");if(t)for(e in t)a&&t[e]==a[e]||tt(r.style,e,t[e])}else if(e[0]=="o"&&e[1]=="n")o=e!=(e=e.replace(nt,"$1")),(e=e.slice(2))[0]<"a"&&(e=e.toLowerCase()),(r.__e||(r.__e={}))[e+o]=t,t?a?t[j]=a[j]:(t[j]=Re,r.addEventListener(e,o?Me:Se,o)):r.removeEventListener(e,o?Me:Se,o);else{if(n=="http://www.w3.org/2000/svg")e=e.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(e!="width"&&e!="height"&&e!="href"&&e!="list"&&e!="form"&&e!="tabIndex"&&e!="download"&&e!="rowSpan"&&e!="colSpan"&&e!="role"&&e!="popover"&&e in r)try{r[e]=t??"";break e}catch{}typeof t=="function"||(t==null||t===!1&&e[4]!="-"?r.removeAttribute(e):r.setAttribute(e,e=="popover"&&t==1?"":t))}}function at(r){return function(e){if(this.__e){var t=this.__e[e.type+r];if(e[oe]==null)e[oe]=Re++;else if(e[oe]<t[j])return;return t(b.event?b.event(e):e)}}}function Le(r,e,t,a,n,o,i,p,d,m){var f,x,c,u,g,l,M,k,P,h,v,_,H,$,et,ee,re,te,G,V,z=e.type;if(e.constructor!==void 0)return null;if(128&t.__u&&(d=32&t.__u,f=t.__c.__z)){if(e.__u|=d,x=o=[],f.nodeType==8)for(c=1,u=f.nextSibling;u;u=u.nextSibling){if(u.nodeType==8){if(u.data.startsWith("$s"))c++;else if(u.data.startsWith("/$s")&&!--c)break}o.push(u)}else o.push(f);p=o[0]}(f=b.__b)&&f(e);e:if(typeof z=="function"){g=i.length;try{if(h=e.props,v=(f=z.prototype)&&f.render,_=(f=z.contextType)&&a[f.__c],H=f?_?_.props.value:f.__:a,t.__c?2&(l=e.__c=t.__c).__g&&(l.__g|=1):(v?e.__c=l=new z(h,H):(e.__c=l=new ne(h,H),l.constructor=z,l.render=ea),_&&_.sub(l),l.state||(l.state={}),l.__n=a,l.__g|=8,l.__h=[],l.__k=[]),v&&(l.__s||(l.__s=l.state),z.getDerivedStateFromProps&&(l.__s==l.state&&(l.__s=q({},l.__s)),q(l.__s,z.getDerivedStateFromProps(h,l.__s)))),M=l.props,k=l.state,l.__v=e,t.__c){if(v&&!z.getDerivedStateFromProps&&h!==M&&l.componentWillReceiveProps&&l.componentWillReceiveProps(h,H),e.__v==t.__v&&!(8&l.__g)||!(4&l.__g)&&l.shouldComponentUpdate&&l.shouldComponentUpdate(h,l.__s,H)===!1){e.__v!=t.__v&&(l.props=h,l.state=l.__s,l.__g&=-9),e.__e=t.__e,e.__k=t.__k,e.__k.some(function(L){L&&(L.__=e)}),le.push.apply(l.__h,l.__k),l.__k=[],l.__h.length&&i.push(l),p=E(t);break e}l.componentWillUpdate&&l.componentWillUpdate(h,l.__s,H),v&&l.componentDidUpdate&&l.__h.push(function(){l.componentDidUpdate(M,k,P)})}else v&&!z.getDerivedStateFromProps&&l.componentWillMount&&l.componentWillMount(),v&&l.componentDidMount&&l.__h.push(l.componentDidMount);if(l.context=H,l.props=h,l.__P=r,l.__g&=-5,$=b.__r,et=0,v)l.state=l.__s,l.__g&=-9,$&&$(e),f=l.render(l.props,l.state,l.context),le.push.apply(l.__h,l.__k),l.__k=[];else do l.__g&=-9,$&&$(e),f=l.render(l.props,l.state,l.context),l.state=l.__s;while(8&l.__g&&++et<25);l.state=l.__s,l.getChildContext&&(a=q({},a,l.getChildContext())),v&&t.__c&&l.getSnapshotBeforeUpdate&&(P=l.getSnapshotBeforeUpdate(M,k)),ee=f&&f.type===T&&f.key==null?f.props.children:f,h.__P&&(f=p,n=(r=h.__P).namespaceURI,d=o=null,t.props&&t.props.__P!=r&&(t.__k.some(function(L){L&&De(L,L)}),t.__k=null),p=t.__k?E(t,0):null),p=pt(r,Pe(ee)?ee:[ee],e,t,a,n,o,i,p,d,m),h.__P&&(e.__e=null,p=f),e.__u&=-161,128&t.__u&&(l.__z=null),x&&x.some(pe),l.__h.length&&i.push(l),1&l.__g&&(l.__g&=-4)}catch(L){if(i.length=g,e.__v=null,d||o)if(L.then){if(re=0,e.__u|=d?160:128,o){for(G=0;G<o.length;G++)if(V=o[G])if(V.nodeType==8){if(o[G]=null,V.data.startsWith("$s"))re++||(te=V);else if(V.data.startsWith("/$s")&&!--re){p=V;break}}else re&&(o[G]=null)}if(!te){for(;p&&p.nodeType==8&&p.nextSibling;)p=p.nextSibling;o&&(o[o.indexOf(p)]=null),te=p}e.__c.__z||(e.__c.__z=te),e.__e=p}else o&&o.some(pe);else e.__e=t.__e;e.__k||(e.__k=t.__k||[]),L.then||ut(e),b.__e(L,e,t)}}else p=e.__e=Qt(t.__e,e,t,a,n,o,i,d,m,r);return(f=b.diffed)&&f(e),128&e.__u?void 0:p}function ut(r){r&&(r.__c&&(r.__c.__g|=4),r.__k&&r.__k.some(ut))}function ct(r,e,t){for(var a=0;a<t.length;)Te(t[a++],t[a++],t[a++]);b.__c&&b.__c(e,r),r.some(function(n){try{r=n.__h,n.__h=[],r.some(function(o){o.call(n)})}catch(o){b.__e(o,n.__v)}})}function Qt(r,e,t,a,n,o,i,p,d,m){var f,x,c,u,g,l,M,k,P,h=t.props||ie,v=e.props,_=e.type;if(_=="svg"?n="http://www.w3.org/2000/svg":_=="math"?n="http://www.w3.org/1998/Math/MathML":n||(n="http://www.w3.org/1999/xhtml"),o){for(f=0;f<o.length;f++)if((g=o[f])&&(_?g.localName==_:g.nodeType==3)){r=g,o[f]=null;break}}if(!r){if(k=m.ownerDocument||document,!_)return k.createTextNode(v);r=k.createElementNS(n,_,v.is&&v),p&&(b.__m&&b.__m(e,o),p=!1),o=null}if(_){if(m=_=="template"?r.content:r,o=_=="textarea"&&v.defaultValue!=null?null:o&&it.call(m.childNodes),!p&&o)for(h={},f=0;f<r.attributes.length;f++)h[(g=r.attributes[f]).name]=g.value;for(f in h)g=h[f],f=="dangerouslySetInnerHTML"?c=g:f=="children"||f in v||f=="value"&&"defaultValue"in v||f=="checked"&&"defaultChecked"in v||ae(r,f,null,g,n);for(f in P=1&t.__u,v)g=v[f],f=="children"?u=g:f=="dangerouslySetInnerHTML"?x=g:f=="value"?l=g:f=="checked"?M=g:p&&typeof g!="function"||!(h[f]!==g||P&&g!=null)||ae(r,f,g,h[f],n);x?(p||c&&(x.__html==c.__html||x.__html==r.innerHTML)||(r.innerHTML=x.__html),e.__k=[]):(c&&(r.textContent=""),(_=="foreignObject"||n=="http://www.w3.org/1998/Math/MathML"&&Kt.test(_))&&(n="http://www.w3.org/1999/xhtml"),pt(m,Pe(u)?u:[u],e,t,a,n,o,i,o?o[0]:t.__k&&E(t,0),p,d),o&&o.some(pe)),p&&_!="textarea"||(f="value",_=="progress"&&l==null?r.removeAttribute(f):l==null||l===r[f]&&(_!="progress"||l)||ae(r,f,l,h[f],n),f="checked",M!=null&&M!=r[f]&&ae(r,f,M,h[f],n))}else h===v||p&&r.data==v||(r.data=v);return r}function Te(r,e,t){try{typeof r=="function"?(typeof r.__u=="function"&&r.__u(),(typeof r.__u!="function"||e)&&(r.__u=r(e))):r.current=e}catch(a){b.__e(a,t)}}function De(r,e,t){var a,n;if(b.unmount&&b.unmount(r),!(a=r.ref)||a.current&&a.current!=r.__e||Te(a,null,e),a=r.__c){if(a.componentWillUnmount)try{a.componentWillUnmount()}catch(o){b.__e(o,e)}a.__P=a.__n=null}if(a=r.__k)for(n=0;n<a.length;n++)a[n]&&De(a[n],e,typeof r.type!="function"||t&&!r.props.__P);(a=r.__e)&&(t||pe(a),a.__e&&(a.__e=null)),r.__e=r.__c=r.__=null}function ea(r,e,t){return this.constructor(r,t)}function Fe(r,e){var t,a,n,o;b.__&&b.__(r,e),e.nodeType==9&&(e=e.documentElement),a=(t=r&&32&r.__u)?null:e.__k,e.__k=se(T,{children:[r]}),n=[],o=[],Le(e,e.__k,a||ie,ie,e.namespaceURI,a?null:e.firstChild?it.call(e.childNodes):null,n,a?a.__e:e.firstChild,t,o),ct(n,e.__k,o),e.__k.props.children=null}function mt(r){function e(t){var a,n;return this.getChildContext||(a=new Set,(n={})[e.__c]=this,this.getChildContext=function(){return n},this.shouldComponentUpdate=function(o){this.props.value!=o.value&&a.forEach(function(i){i.__g|=4,Ae(i)})},this.sub=function(o){a.add(o);var i=o.componentWillUnmount;o.componentWillUnmount=function(){a.delete(o),i&&i.call(o)}}),t.children}return e.__c="__cC"+ft++,e.__=r,e.Provider=(e.Consumer=function(t,a){return t.children(a)}).contextType=e,e}b={__e:function(r,e,t,a){for(var n,o,i;e=e.__;)if((n=e.__c)&&!(1&n.__g)){n.__g|=4;try{if((o=n.constructor)&&o.getDerivedStateFromError&&(n.setState(o.getDerivedStateFromError(r)),i=8&n.__g),n.componentDidCatch&&(n.componentDidCatch(r,a||{}),i=8&n.__g),i)return void(n.__g|=2)}catch(p){r=p,i=0}}throw fe=0,r}},ot=0,Xt=function(r){return r!=null&&r.constructor===void 0},ne.prototype.setState=function(r,e){var t=this.__s;t&&t!=this.state||(t=this.__s=q({},this.state)),typeof r=="function"&&(r=r(q({},t),this.props)),r&&(q(t,r),this.__v&&(e&&this.__k.push(e),Ae(this)))},ne.prototype.forceUpdate=function(r){this.__v&&(this.__g|=4,r&&this.__h.push(r),Ae(this))},ne.prototype.render=T,B=[],fe=0,st=function(r,e){return r.__v.__b-e.__v.__b},oe=Symbol(),j=Symbol(),nt=/(PointerCapture)$|Capture$/i,Re=0,Se=at(!1),Me=at(!0),ft=0;var U,y,ze,xt,Be=Object.is,X=0,_t=[],Ee=[],w=b,gt=w.__b,ht=w.__r,bt=w.diffed,vt=w.__c,wt=w.unmount,yt=w.__;function K(r,e){w.__h&&w.__h(y,r,X||e),X=0;var t=y.__H||(y.__H={__:[],__h:[]});return r>=t.__.length&&t.__.push({}),t.__[r]}function C(r){return X=1,ra(Mt,r)}function ra(r,e,t){var a=K(U++,2);if(a.t=r,!a.__c&&(a.__=[t?t(e):Mt(void 0,e),function(o){var i=a.__N?a.__N[0]:a.__[0],p=a.t(i,o);Be(i,p)||(a.__N=[p,a.__[1]],a.__c.setState({}))}],a.__c=y,!y.__f)){y.__f=!0;var n=y.shouldComponentUpdate;y.shouldComponentUpdate=function(o,i,p){var d=this.__H;if(!d)return!0;var m=!1,f=this.props!=o;if(d.__.some(function(c){c.__N&&(m=!0,Be(c.__[0],c.__N[0])||(f=!0))}),n){var x=n.call(this,o,i,p);return m?x||f:x}return!m||f}}return a.__}function R(r,e){var t=K(U++,3);!w.__s&&Ie(t.__H,e)&&(t.__P=!0,t.__=r,t.u=e,y.__H.__h.push(t))}function He(r,e){var t=K(U++,4);!w.__s&&Ie(t.__H,e)&&(t.__P=!1,t.__=r,t.u=e,y.__h.push(t))}function D(r){return X=5,qe(function(){return{current:r}},[])}function qe(r,e){var t=K(U++,7);return Ie(t.__H,e)&&(t.__=r(),t.__H=e),t.__}function Ue(r,e){return X=8,qe(function(){return r},e)}function St(r){var e=y.context[r.__c],t=K(U++,9);return t.c=r,e?(t.__==null&&(t.__=!0,e.sub(y)),e.props.value):r.__}function ta(){var r;do{for(;r=Ee.shift();)try{W(r)}catch(t){w.__e(t,{__:(r=r.__P)&&r.__v})}for(;r=_t.shift();){var e=r.__H;if(r.__P&&e)try{e.__h.some(W),e.__h.some(Oe),e.__h=[]}catch(t){e.__h=[],w.__e(t,r.__v)}}}while(Ee.length)}w.__b=function(r){y=null,gt&&gt(r)},w.__=function(r,e){r&&e.__k&&e.__k.__m&&(r.__m=e.__k.__m),yt&&yt(r,e)},w.__r=function(r){ht&&ht(r),U=0;var e=(y=r.__c).__H;e&&(ze==y?y.__h=[]:(e.__h.some(W),e.__h.some(Oe),U=0),e.__h=[],e.__.some(function(t){t.__N&&(t.__=t.__N),t.u=t.__N=void 0})),ze=y},w.diffed=function(r){bt&&bt(r);var e=r.__c;e&&e.__H&&(e.__H.__h.length&&Ct(_t.push(e)),e.__H.__.some(function(t){t.u&&(t.__H=t.u)})),ze=y=null},w.__c=function(r,e){e.some(function(t){try{t.__h.some(W),t.__h=t.__h.filter(function(a){return!a.__||Oe(a)})}catch(a){e.some(function(n){n.__h&&(n.__h=[])}),e=[],w.__e(a,t.__v)}}),vt&&vt(r,e)},w.unmount=function(r){wt&&wt(r);var e,t,a=r.__c;a&&a.__H&&(a.__H.__.some(function(n){try{if(n.__P&&n.__c){if(t===void 0){for(t=r.__;t&&(!t.__c||!t.__c.__P);)t=t.__;t=t&&t.__c}n.__P=t,Ct(Ee.push(n))}else W(n)}catch(o){e=o}}),a.__H=void 0,e&&w.__e(e,a.__v))};var kt=typeof requestAnimationFrame=="function";function aa(r){var e,t=function(){clearTimeout(a),kt&&cancelAnimationFrame(e),setTimeout(r)},a=setTimeout(t,35);kt&&(e=requestAnimationFrame(t))}function Ct(r){r!=1&&xt==w.requestAnimationFrame||((xt=w.requestAnimationFrame)||aa)(ta)}function W(r){var e=y,t=r.__c;typeof t=="function"&&(r.__c=void 0,t()),y=e}function Oe(r){var e=y;r.__c=r.__(),y=e}function Ie(r,e){return!r||r.length!=e.length||e.some(function(t,a){return!Be(t,r[a])})}function Mt(r,e){return typeof e=="function"?e(r):e}var At=`/* RoFit \u2014 one stylesheet for the on-profile sheet, the library/settings page and the popup.\r
   Colors come from three inputs (--rf-bg, --rf-fg, --rf-accent) that the host sets from what Roblox is\r
   actually painting; every other surface is a mix of those, so light, dark and OLED all fall out of the same rules. */\r
\r
.rf, .rf *, .rf *::before, .rf *::after { box-sizing: border-box; }\r
.rf {\r
  --rf-tint: var(--rf-fg);\r
  --rf-s1: 5%; --rf-s2: 9%; --rf-s3: 14%; --rf-line-pct: 13%;\r
  --rf-surface: color-mix(in srgb, var(--rf-tint) var(--rf-s1), var(--rf-bg));\r
  --rf-surface-2: color-mix(in srgb, var(--rf-tint) var(--rf-s2), var(--rf-bg));\r
  --rf-surface-3: color-mix(in srgb, var(--rf-tint) var(--rf-s3), var(--rf-bg));\r
  --rf-line: color-mix(in srgb, var(--rf-tint) var(--rf-line-pct), var(--rf-bg));\r
  --rf-muted: color-mix(in srgb, var(--rf-fg) 62%, var(--rf-bg));\r
  --rf-accent-soft: color-mix(in srgb, var(--rf-accent) 14%, var(--rf-bg));\r
  --rf-warn: #d97706;\r
  --rf-ok: #1f9d55;\r
  --rf-bad: #d63b3b;\r
  --rf-r: 8px;\r
  /* Motion language: everything uses these. Spatial distances are variables so reduced motion can zero them\r
     and keep the same timing as plain fades (see .rm below). */\r
  --rf-ease: cubic-bezier(.22, 1, .36, 1);\r
  --rf-ease-in: cubic-bezier(.5, 0, .9, .5);\r
  --rf-spring: linear(0, .009, .035 2.1%, .141, .281 6.7%, .723 12.9%, .938 16.7%, 1.017, 1.077, 1.121, 1.149 24.3%, 1.159, 1.163, 1.161, 1.154 29.9%, 1.129 32.8%, 1.051 39.6%, 1.017 43.1%, .991, .977 51%, .974 53.8%, .975 57.1%, .997 69.8%, 1.003 76.9%, 1);\r
  --rf-dy: 14px; --rf-dy-s: 8px; --rf-dx: 10px; --rf-pop: .96; --rf-lift: -3px; --rf-press: .96; --rf-drop: 6px;\r
  --rf-top: 0px;\r
  font-family: inherit; font-size: 14px; line-height: 1.4; color: var(--rf-fg);\r
  -webkit-font-smoothing: antialiased; text-align: left;\r
}\r
.rf { --rf-warn: color-mix(in srgb, #e08a00 80%, var(--rf-fg)); --rf-ok: color-mix(in srgb, #1f9d55 85%, var(--rf-fg)); }\r
:where(.rf) :where(button, input, textarea, select) { font: inherit; color: inherit; }\r
:where(.rf) button { cursor: pointer; border: 0; background: none; padding: 0; }\r
.rf button:disabled { cursor: default; opacity: .45; }\r
:where(.rf) a { color: inherit; text-decoration: none; }\r
:where(.rf) :where(h1, h2, h3, p, dl, dd, ol) { margin: 0; padding: 0; }\r
:where(.rf) :focus { outline: none; }\r
.rf :focus-visible { outline: 2px solid var(--rf-accent); outline-offset: 2px; border-radius: 6px; }\r
.rf-ico { flex: none; }\r
.rf-grow { flex: 1 1 0; min-width: 0; }\r
.rf-muted { color: var(--rf-muted); }\r
.rf-small { font-size: 12px; }\r
.rf-mono { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: .92em; }\r
.rf-center { text-align: center; padding: 12px; }\r
\r
/* ---- sheet frame --------------------------------------------------------------------------- */\r
.rf-sheet { position: fixed; left: 0; right: 0; bottom: 0; top: var(--rf-top); background: var(--rf-bg); display: flex; flex-direction: column;\r
  animation: rf-sheet-in .3s var(--rf-ease) backwards; border-top: 1px solid var(--rf-line); }\r
.rf-sheet[data-state=closed] { animation: rf-sheet-out .2s var(--rf-ease-in) both; pointer-events: none; }\r
@keyframes rf-sheet-in { from { opacity: 0; transform: translateY(var(--rf-dy)); } }\r
@keyframes rf-sheet-out { to { opacity: 0; transform: translateY(var(--rf-dy)); } }\r
.rf-shell { display: flex; flex-direction: column; height: 100%; min-height: 0; outline: none; }\r
.rf-page { min-height: 100vh; background: var(--rf-bg); display: flex; flex-direction: column; }\r
.rf-page > .rf-shell { height: calc(100vh - 49px); }\r
\r
.rf-bar { display: flex; align-items: center; gap: 12px; padding: 8px 20px; min-height: 56px; border-bottom: 1px solid var(--rf-line); flex: none; }\r
.rf-who { display: flex; flex-direction: column; line-height: 1.15; min-width: 0; }\r
.rf-who b { font-size: 16px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 28ch; }\r
.rf-who span { font-size: 11px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: var(--rf-muted); }\r
.rf-tabs { display: flex; gap: 2px; margin-left: 12px; align-self: stretch; position: relative; }\r
.rf-tabs::after { content: ''; position: absolute; left: 0; bottom: -9px; height: 2px; width: var(--w, 0); background: var(--rf-fg); border-radius: 2px; transform: translateX(var(--x, 0)); transition: transform .38s var(--rf-ease), width .38s var(--rf-ease); }\r
.rf-tabs.still::after { transition: none; }\r
.rf-tabs button { display: inline-flex; align-items: center; gap: 7px; padding: 0 14px; font-weight: 600; color: var(--rf-muted); position: relative; transition: color .15s; }\r
.rf-tabs button:hover { color: var(--rf-fg); }\r
.rf-tabs button.on { color: var(--rf-fg); }\r
.rf-tabs em { font-style: normal; font-size: 12px; font-weight: 600; color: var(--rf-muted); background: var(--rf-surface-2); padding: 1px 7px; border-radius: 10px; }\r
\r
.rf-main { flex: 1 1 0; min-height: 0; display: flex; position: relative; }\r
.rf-pane { flex: 1 1 0; min-width: 0; display: flex; }\r
.rf-pane > .rf-explorer { flex: 1 1 0; }\r
.rf-dock { width: min(480px, 42%); flex: none; border-left: 1px solid var(--rf-line); display: flex; min-height: 0; background: var(--rf-bg); }\r
.rf-dock[data-anim=enter] > .rf-insp { animation: rf-dock-in .36s var(--rf-ease) backwards; }\r
.rf-dock[data-anim=switch] > .rf-insp > .rf-iscroll { animation: rf-fade .2s backwards; }\r
.rf-dock[data-anim=exit] > .rf-insp { animation: rf-dock-out .22s var(--rf-ease-in) both; }\r
@keyframes rf-dock-in { from { opacity: 0; transform: translateX(var(--rf-dx)); } }\r
@keyframes rf-dock-out { to { opacity: 0; transform: translateX(var(--rf-dx)); } }\r
.rf-dock.empty { background: var(--rf-surface); align-items: center; justify-content: center; }\r
.rf-dock-hint { text-align: center; color: var(--rf-muted); padding: 24px; display: flex; flex-direction: column; align-items: center; gap: 8px; max-width: 260px; }\r
/* Narrow: the inspector slides over the explorer instead of replacing it, so the grid keeps its scroll position. */\r
.rf-shell.narrow .rf-dock { position: absolute; inset: 0; width: 100%; border-left: 0; z-index: 4; box-shadow: -12px 0 30px rgb(0 0 0 / .12); }\r
\r
/* ---- buttons & controls --------------------------------------------------------------------- */\r
.rf-btn { flex: none; display: inline-flex; align-items: center; justify-content: center; gap: 7px; height: 36px; padding: 0 14px; border-radius: var(--rf-r); font-weight: 600;\r
  background: var(--rf-surface-2); transition: background .12s, transform .12s var(--rf-ease), box-shadow .12s; white-space: nowrap; position: relative; }\r
.rf-btn:hover:not(:disabled) { background: var(--rf-surface-3); }\r
.rf-btn:active:not(:disabled) { transform: scale(var(--rf-press)); transition-duration: .06s; }\r
.rf-btn.primary { background: var(--rf-accent); color: var(--rf-accent-fg); }\r
.rf-btn.primary:hover:not(:disabled) { background: color-mix(in srgb, var(--rf-accent) 88%, #000); }\r
.rf-btn.ghost { background: transparent; padding: 0 10px 0 6px; }\r
.rf-btn.ghost:hover:not(:disabled) { background: var(--rf-surface-2); }\r
.rf-btn.danger { color: var(--rf-bad); }\r
.rf-btn.on { background: var(--rf-accent-soft); color: var(--rf-accent); }\r
.rf-btn.sm { height: 30px; padding: 0 10px; font-size: 13px; }\r
.rf-btn.lg { height: 42px; padding: 0 20px; font-size: 15px; }\r
.rf-btn.wide { width: 100%; justify-content: flex-start; }\r
.rf-btn em { font-style: normal; margin-left: auto; font-size: 12px; color: var(--rf-muted); }\r
.rf-ib { display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: var(--rf-r); flex: none; transition: background .12s, transform .12s var(--rf-ease); color: var(--rf-fg); }\r
.rf-ib:hover:not(:disabled) { background: var(--rf-surface-2); }\r
.rf-ib:active:not(:disabled) { transform: scale(calc(var(--rf-press) - .04)); transition-duration: .06s; }\r
.rf-ib.sm { width: 28px; height: 28px; }\r
.rf-upd .rf-ib.sm { margin: -4px 0; color: var(--rf-muted); }\r
.rf-upd .rf-ib.sm:hover:not(:disabled) { color: var(--rf-fg); }\r
.rf-upd { display: inline-flex; align-items: center; gap: 2px; }\r
.rf-linkbtn { color: var(--rf-accent); font-weight: 600; font-size: inherit; }\r
.rf-linkbtn:hover { text-decoration: underline; }\r
.rf-dot { position: absolute; top: 6px; right: 6px; width: 7px; height: 7px; border-radius: 50%; background: var(--rf-accent); }\r
.rf-hide-s { }\r
\r
.rf-seg { display: inline-flex; background: var(--rf-surface-2); border-radius: var(--rf-r); padding: 2px; gap: 2px; position: relative; }\r
.rf-seg::before { content: ''; position: absolute; top: 2px; bottom: 2px; left: 0; width: var(--w, 0); border-radius: 6px; background: var(--rf-bg); box-shadow: 0 1px 2px rgb(0 0 0 / .14); transform: translateX(var(--x, 0)); transition: transform .34s var(--rf-ease), width .34s var(--rf-ease); }\r
.rf-seg.still::before { transition: none; }\r
.rf-seg button { display: inline-flex; align-items: center; gap: 6px; height: 32px; min-width: 32px; padding: 0 10px; border-radius: 6px; font-weight: 600; font-size: 13px; color: var(--rf-muted); justify-content: center; transition: background .15s, color .15s; }\r
.rf-seg button:hover { color: var(--rf-fg); }\r
.rf-seg button { position: relative; }\r
.rf-seg button.on { color: var(--rf-fg); }\r
\r
.rf-switch { width: 40px; height: 24px; border-radius: 12px; background: var(--rf-surface-3); position: relative; transition: background .18s; flex: none; }\r
.rf-switch.on { background: var(--rf-accent); }\r
.rf-knob { position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; border-radius: 50%; background: #fff; transition: transform .45s var(--rf-spring); box-shadow: 0 1px 2px rgb(0 0 0 / .3); }\r
.rf-switch.on .rf-knob { transform: translateX(16px); }\r
\r
.rf-chip { display: inline-flex; align-items: center; gap: 4px; height: 20px; padding: 0 7px; border-radius: 4px; font-size: 11.5px; font-weight: 600; background: var(--rf-surface-2); color: var(--rf-muted); white-space: nowrap; }\r
.rf-chip.warn { background: color-mix(in srgb, var(--rf-warn) 16%, var(--rf-bg)); color: var(--rf-warn); }\r
.rf-chip.ok { background: color-mix(in srgb, var(--rf-ok) 16%, var(--rf-bg)); color: var(--rf-ok); }\r
.rf-chip.accent { background: var(--rf-accent-soft); color: var(--rf-accent); }\r
.rf-chip.btn { height: 24px; padding: 0 9px; cursor: pointer; border-radius: 12px; }\r
.rf-chip.btn:hover { background: var(--rf-surface-3); }\r
.rf-chip.btn.accent:hover { background: color-mix(in srgb, var(--rf-accent) 22%, var(--rf-bg)); }\r
\r
.rf-spin { display: inline-block; border-radius: 50%; border: 2px solid var(--rf-surface-3); border-top-color: var(--rf-fg); animation: rf-rot .7s linear infinite; flex: none; }\r
@keyframes rf-rot { to { transform: rotate(360deg); } }\r
\r
.rf-kbd { font: inherit; font-size: 11px; font-weight: 600; color: var(--rf-muted); border: 1px solid var(--rf-line); border-radius: 4px; padding: 0 5px; line-height: 17px; }\r
\r
/* ---- menu / dialog / toast --------------------------------------------------------------------- */\r
.rf-menu { position: fixed; z-index: 20; min-width: 230px; max-width: 320px; overflow: auto; padding: 6px; border-radius: 10px; background: var(--rf-bg);\r
  border: 1px solid var(--rf-line); box-shadow: 0 10px 30px rgb(0 0 0 / .22); animation: rf-pop .2s var(--rf-ease) backwards; transform-origin: top right; }\r
.rf-menu[data-state=closed] { animation: rf-pop-out .12s var(--rf-ease-in) forwards; pointer-events: none; }\r
@keyframes rf-pop { from { opacity: 0; transform: scale(var(--rf-pop)) translateY(calc(var(--rf-drop) * -1)); } }\r
@keyframes rf-pop-out { to { opacity: 0; transform: scale(var(--rf-pop)) translateY(calc(var(--rf-drop) * -1)); } }\r
.rf-mi { display: flex; align-items: center; gap: 10px; width: 100%; padding: 8px 10px; border-radius: 6px; text-align: left; font-weight: 500; }\r
.rf-mi:hover:not(:disabled), .rf-mi:focus-visible { background: var(--rf-surface-2); outline: none; }\r
.rf-mi.danger { color: var(--rf-bad); }\r
.rf-mi-gap { width: 16px; flex: none; }\r
.rf-mi-l { flex: 1; }\r
.rf-mi-hint { font-size: 11px; color: var(--rf-muted); }\r
.rf-mi-chk { color: var(--rf-accent); }\r
.rf-sep { height: 1px; background: var(--rf-line); margin: 5px 4px; }\r
\r
.rf-scrim { position: absolute; inset: 0; z-index: 30; background: rgb(0 0 0 / .42); display: flex; align-items: center; justify-content: center; animation: rf-fade .18s backwards; }\r
.rf-scrim[data-state=closed] { animation: rf-fade-out .14s both; pointer-events: none; }\r
.rf-scrim[data-state=closed] > .rf-dialog { animation: rf-pop-out .14s var(--rf-ease-in) forwards; }\r
@keyframes rf-fade { from { opacity: 0; } }\r
@keyframes rf-fade-out { to { opacity: 0; } }\r
.rf-dialog { width: min(400px, calc(100% - 32px)); background: var(--rf-bg); border-radius: 12px; padding: 20px; box-shadow: 0 20px 50px rgb(0 0 0 / .35); animation: rf-pop .3s var(--rf-ease) backwards; transform-origin: center; }\r
.rf-dialog h3 { font-size: 17px; margin-bottom: 6px; }\r
.rf-dialog p { color: var(--rf-muted); margin-bottom: 18px; }\r
.rf-dialog-actions { display: flex; justify-content: flex-end; gap: 8px; }\r
\r
.rf-toast-wrap { position: fixed; left: 50%; bottom: 22px; transform: translateX(-50%); z-index: 40; pointer-events: none; }\r
.rf-toast { display: flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: 10px; background: var(--rf-fg); color: var(--rf-bg); font-weight: 600; box-shadow: 0 8px 24px rgb(0 0 0 / .25); animation: rf-toast .4s var(--rf-spring) backwards; }\r
.rf-toast[data-state=closed] { animation: rf-toast-out .18s var(--rf-ease-in) forwards; }\r
@keyframes rf-toast { from { opacity: 0; transform: translateY(calc(var(--rf-drop) * 2)) scale(var(--rf-pop)); } }\r
@keyframes rf-toast-out { to { opacity: 0; transform: translateY(var(--rf-drop)) scale(var(--rf-pop)); } }\r
\r
/* ---- explorer ------------------------------------------------------------------------------- */\r
.rf-explorer { display: flex; flex-direction: column; min-width: 0; min-height: 0; }\r
.rf-toolbar { display: flex; align-items: center; gap: 8px; padding: 12px 20px 8px; flex-wrap: wrap; }\r
.rf-search { display: flex; align-items: center; gap: 8px; height: 36px; padding: 0 10px; border-radius: var(--rf-r); background: var(--rf-surface-2); flex: 1 1 220px; max-width: 380px; color: var(--rf-muted); transition: box-shadow .15s, background .15s; }\r
.rf-search:focus-within { background: var(--rf-bg); box-shadow: 0 0 0 2px var(--rf-accent); color: var(--rf-fg); }\r
.rf-search input { flex: 1; min-width: 0; border: 0; background: transparent; outline: none; height: 100%; color: var(--rf-fg); }\r
.rf-search input::placeholder { color: var(--rf-muted); }\r
.rf-search input::-webkit-search-cancel-button { display: none; }\r
.rf .rf-search input:focus-visible { outline: none; }\r
.rf-clear { display: inline-flex; width: 22px; height: 22px; align-items: center; justify-content: center; border-radius: 50%; }\r
.rf-clear:hover { background: var(--rf-surface-3); }\r
.rf-subbar { display: flex; align-items: center; gap: 10px; padding: 2px 20px 10px; flex-wrap: wrap; min-height: 32px; }\r
.rf-count { color: var(--rf-muted); }\r
.rf-count b { color: var(--rf-fg); font-weight: 600; }\r
\r
.rf-note { display: flex; align-items: center; gap: 12px; margin: 0 20px 10px; padding: 10px 12px 10px 14px; border-radius: 10px; background: var(--rf-accent-soft); }\r
.rf-note-t { display: flex; flex-direction: column; flex: 1; min-width: 0; font-size: 13px; }\r
.rf-note-t span { color: var(--rf-muted); }\r
.rf-progress { width: 120px; height: 4px; border-radius: 2px; background: var(--rf-surface-3); overflow: hidden; }\r
.rf-progress i { display: block; height: 100%; background: var(--rf-accent); transform-origin: left; transition: transform .25s; }\r
\r
.rf-scroll { flex: 1 1 0; min-height: 0; overflow-y: auto; padding: 4px 20px 24px; scrollbar-width: thin; scrollbar-color: var(--rf-surface-3) transparent; }\r
.rf-grid { position: relative; display: grid; gap: 4px 6px; --card: 148px; grid-template-columns: repeat(auto-fill, minmax(var(--card), 1fr)); }\r
.rf-grid.compact { --card: 108px; gap: 2px 4px; }\r
.rf-grid.large { --card: 204px; }\r
.rf-cell { position: relative; }\r
/* Measured at 300 outfits: p99 frame 20.7ms vs 27.7ms (worst 21 vs 49ms). Not worth the paint containment below ~150. */\r
.rf-grid.big .rf-cell { content-visibility: auto; contain-intrinsic-size: auto 220px; }\r
.rf-card { display: flex; flex-direction: column; gap: 8px; width: 100%; text-align: left; border-radius: 10px; padding: 6px; transition: background .14s, transform .18s var(--rf-ease); position: relative; }\r
.rf-card:hover { background: var(--rf-surface); }\r
.rf-card:hover .rf-thumb { transform: translateY(var(--rf-lift)); }\r
.rf-card:active .rf-thumb { transform: scale(var(--rf-press)); transition-duration: .08s; }\r
.rf-cell.active .rf-card { background: var(--rf-accent-soft); }\r
.rf-cell.picked .rf-card { background: var(--rf-accent-soft); box-shadow: inset 0 0 0 2px var(--rf-accent); }\r
.rf-card-t { display: flex; flex-direction: column; min-width: 0; padding: 0 2px; }\r
.rf-card-name { font-weight: 600; font-size: 13.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\r
.rf-card-sub { display: flex; align-items: center; gap: 5px; font-size: 12px; color: var(--rf-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-height: 17px; }\r
.rf-tag { font-style: normal; font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: .04em; padding: 0 5px; border-radius: 3px; background: var(--rf-surface-3); }\r
.rf-badge { position: absolute; top: 12px; right: 12px; width: 24px; height: 24px; border-radius: 50%; background: var(--rf-bg); color: var(--rf-accent); display: flex; align-items: center; justify-content: center; box-shadow: 0 1px 4px rgb(0 0 0 / .2); }\r
.rf-pick { position: absolute; top: 12px; left: 12px; width: 22px; height: 22px; border-radius: 6px; border: 2px solid var(--rf-muted); background: color-mix(in srgb, var(--rf-bg) 80%, transparent); color: var(--rf-accent-fg);\r
  display: flex; align-items: center; justify-content: center; opacity: 0; transform: scale(.7); transition: opacity .12s, transform .35s var(--rf-spring), background .12s; }\r
.rf-cell:hover .rf-pick, .rf-cell:focus-within .rf-pick, .rf-cell.picked .rf-pick { opacity: 1; transform: none; }\r
.rf-cell.picked .rf-pick { background: var(--rf-accent); border-color: var(--rf-accent); }\r
\r
.rf-thumb { position: relative; aspect-ratio: 1; border-radius: var(--rf-r); background: var(--rf-surface); overflow: hidden; transition: transform .2s var(--rf-ease); }\r
.rf-thumb img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; opacity: 0; transform: scale(.96); transition: opacity .25s, transform .35s var(--rf-ease); user-select: none; }\r
.rf-thumb.loaded img { opacity: 1; transform: none; }\r
.rf-skel { position: absolute; inset: 0; background: linear-gradient(100deg, transparent 20%, color-mix(in srgb, var(--rf-fg) 8%, transparent) 50%, transparent 80%) var(--rf-surface); background-size: 200% 100%; animation: rf-shimmer 1.3s linear infinite; }\r
.rf-skel.inline.sm { width: 54px; height: 20px; }\r
.rf-skel.inline { position: relative; display: inline-block; width: 110px; height: 30px; border-radius: 6px; vertical-align: middle; }\r
@keyframes rf-shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }\r
.rf-thumb-note { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; color: var(--rf-muted); font-size: 12px; }\r
.rf-card.sk { pointer-events: none; }\r
.rf-sk-l { height: 12px; width: 70%; border-radius: 4px; background: var(--rf-surface); margin: 2px; }\r
\r
.rf-grid.list { grid-template-columns: 1fr; gap: 2px; }\r
.rf-grid.list .rf-card { flex-direction: row; align-items: center; gap: 12px; padding: 6px 10px 6px 12px; }\r
.rf-grid.list .rf-card:hover .rf-thumb { transform: none; }\r
.rf-grid.list .rf-thumb { width: 52px; flex: none; }\r
.rf-grid.list .rf-card-t { flex: 1; }\r
.rf-grid.list .rf-pick { left: auto; right: 14px; top: 50%; margin-top: -11px; }\r
.rf-grid.list .rf-badge { right: 48px; top: 50%; margin-top: -12px; }\r
.rf-grid.big.list .rf-cell { contain-intrinsic-size: auto 64px; }\r
\r
.rf-tray { position: absolute; left: 20px; right: 20px; bottom: 16px; display: flex; align-items: center; gap: 10px; padding: 10px 12px 10px 16px; border-radius: 12px; background: var(--rf-bg); border: 1px solid var(--rf-line);\r
  box-shadow: 0 10px 30px rgb(0 0 0 / .22); animation: rf-toast .4s var(--rf-spring) backwards; z-index: 5; }\r
.rf-explorer { position: relative; }\r
\r
.rf-empty { margin: 8vh auto 0; max-width: 360px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 8px; color: var(--rf-muted); }\r
.rf-empty h3 { color: var(--rf-fg); font-size: 17px; }\r
.rf-empty-actions { display: flex; gap: 8px; margin-top: 8px; }\r
\r
/* ---- items / patterns view ------------------------------------------------------------------------ */\r
.rf-items { display: flex; flex-direction: column; gap: 24px; }\r
.rf-block h3 { font-size: 15px; margin-bottom: 10px; }\r
.rf-block h3 .rf-muted { font-weight: 400; font-size: 13px; }\r
.rf-variants { display: flex; flex-direction: column; gap: 6px; }\r
.rf-variant { display: flex; align-items: center; gap: 14px; padding: 8px 12px 8px 8px; border-radius: 10px; background: var(--rf-surface); }\r
.rf-vstack { display: flex; }\r
.rf-vthumb { width: 52px; border-radius: 8px; margin-right: -14px; border: 2px solid var(--rf-surface); transition: transform .18s var(--rf-ease); }\r
.rf-vthumb:hover { transform: translateY(-3px); z-index: 2; }\r
.rf-vmeta { display: flex; flex-direction: column; min-width: 0; flex: 1; padding-left: 14px; }\r
.rf-vmeta b { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: 600; }\r
.rf-irows { display: flex; flex-direction: column; margin-bottom: 10px; }\r
.rf-irow { display: flex; align-items: center; gap: 12px; padding: 6px 10px; border-radius: 8px; text-align: left; width: 100%; }\r
.rf-irow:hover { background: var(--rf-surface); }\r
.rf-ithumb { width: 36px; height: 36px; border-radius: 6px; background: var(--rf-surface-2); display: flex; align-items: center; justify-content: center; flex: none; overflow: hidden; color: var(--rf-muted); }\r
.rf-ithumb.lg { width: 44px; height: 44px; border-radius: 8px; }\r
.rf-ithumb img { width: 100%; height: 100%; object-fit: cover; }\r
.rf-iname { display: flex; flex-direction: column; min-width: 0; flex: 1; }\r
.rf-iname b { font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\r
.rf-istrip { display: flex; }\r
.rf-mini { width: 28px; margin-left: -8px; border-radius: 6px; overflow: hidden; border: 2px solid var(--rf-bg); }\r
.rf-mini .rf-thumb { border-radius: 0; }\r
.rf-icount { font-size: 12.5px; color: var(--rf-muted); min-width: 84px; text-align: right; }\r
\r
/* ---- inspector -------------------------------------------------------------------------------- */\r
.rf-insp { display: flex; flex-direction: column; width: 100%; min-height: 0; }\r
.rf-ibar { display: flex; align-items: center; gap: 4px; padding: 8px 12px 8px 16px; border-bottom: 1px solid var(--rf-line); min-height: 52px; flex: none; }\r
.rf-ibar-t { font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: .07em; color: var(--rf-muted); margin: 0 8px; }\r
.rf-iscroll { flex: 1 1 0; overflow-y: auto; min-height: 0; padding-bottom: 32px; scrollbar-width: thin; scrollbar-color: var(--rf-surface-3) transparent; }\r
.rf-hero { padding: 16px 20px 6px; }\r
.rf-stage { width: 100%; height: clamp(220px, 36vh, 360px); border-radius: 12px; background: radial-gradient(120% 90% at 50% 10%, color-mix(in srgb, var(--rf-fg) 3%, var(--rf-surface)) 0%, var(--rf-surface-2) 100%); overflow: hidden; position: relative; }\r
.rf-stage .rf-thumb { position: absolute; inset: 0; aspect-ratio: auto; background: none; border-radius: 0; }\r
.rf-stage.sm { height: clamp(200px, 30vh, 280px); }\r
.rf-stage .rf-fig { position: absolute; inset: 14% 28%; width: 44%; height: 72%; }\r
.rf-iname-h { font-size: 22px; line-height: 1.2; font-weight: 700; margin: 14px 0 4px; overflow-wrap: anywhere; }\r
.rf-meta { display: flex; flex-wrap: wrap; align-items: center; gap: 4px 8px; color: var(--rf-muted); font-size: 13px; }\r
.rf-meta i { font-style: normal; opacity: .6; }\r
.rf-prov { margin-top: 8px; min-height: 20px; }\r
.rf-sk-block { padding: 12px 20px; display: flex; flex-direction: column; gap: 12px; }\r
.rf-sk-block .rf-skel { position: relative; border-radius: 8px; }\r
\r
.rf-change { display: flex; gap: 10px; align-items: flex-start; margin: 10px 20px 0; padding: 10px 12px; border-radius: 10px; background: var(--rf-accent-soft); color: var(--rf-fg); }\r
.rf-change > .rf-ico { margin-top: 2px; color: var(--rf-accent); }\r
\r
.rf-cost { margin: 14px 20px 0; padding: 14px 16px; border-radius: 12px; background: var(--rf-surface); }\r
.rf-cost-top { display: flex; justify-content: space-between; gap: 16px; align-items: flex-end; flex-wrap: wrap; }\r
.rf-cost-n { font-size: 26px; font-weight: 800; letter-spacing: -.01em; font-variant-numeric: tabular-nums; line-height: 1.1; }\r
.rf-cost-n.sm { font-size: 17px; font-weight: 700; color: var(--rf-muted); }\r
.rf-cost-l { font-size: 12.5px; color: var(--rf-muted); margin-top: 2px; }\r
.rf-cost-r { text-align: right; }\r
.rf-costbar { display: flex; height: 8px; gap: 2px; margin-top: 12px; border-radius: 4px; overflow: hidden; }\r
.rf-costbar .seg { display: block; min-width: 4px; background: var(--rf-accent); transition: flex-grow .4s var(--rf-ease); }\r
.rf-costbar .s1 { opacity: .78; } .rf-costbar .s2 { opacity: .6; } .rf-costbar .s3 { opacity: .46; } .rf-costbar .s4 { opacity: .34; } .rf-costbar .s5 { opacity: .24; }\r
.rf-costbar .resale { background: repeating-linear-gradient(135deg, var(--rf-accent) 0 3px, transparent 3px 6px); }\r
.rf-cost-notes { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }\r
.rf-cost-own { margin-top: 8px; font-size: 12.5px; color: var(--rf-muted); }\r
\r
.rf-sec { margin-top: 18px; }\r
.rf-sec-h { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 20px; text-align: left; }\r
.rf-sec-h h3 { font-size: 15px; }\r
.rf-sec-h:hover { background: var(--rf-surface); }\r
.rf-sec-b { padding: 4px 20px 0; }\r
.rf-sec-tools { display: flex; gap: 6px; flex-wrap: wrap; margin: 4px 0 8px; }\r
.rf-hintline { display: flex; align-items: center; gap: 6px; font-size: 12.5px; color: var(--rf-muted); margin-bottom: 8px; }\r
.rf-group { margin-top: 8px; }\r
.rf-group-h { display: flex; justify-content: space-between; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; color: var(--rf-muted); padding: 6px 0 4px; }\r
\r
.rf-item { border-radius: 8px; margin: 0 -8px; transition: background .12s; }\r
.rf-item:hover, .rf-item.open { background: var(--rf-surface); }\r
.rf-item-main { display: flex; align-items: center; gap: 12px; padding: 6px 8px; cursor: pointer; border-radius: 8px; }\r
.rf-item.dim .rf-ithumb img { filter: grayscale(1); opacity: .6; }\r
.rf-item-t { display: flex; flex-direction: column; min-width: 0; flex: 1; }\r
.rf-item-name { font-weight: 600; font-size: 13.5px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\r
.rf-item-sub { font-size: 12px; color: var(--rf-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\r
.rf-item-r { display: flex; align-items: center; gap: 6px; flex: none; flex-wrap: wrap; justify-content: flex-end; max-width: 50%; }\r
.rf-price { font-weight: 700; font-variant-numeric: tabular-nums; font-size: 13px; display: inline-flex; align-items: baseline; gap: 4px; }\r
.rf-price small { font-size: 10.5px; font-weight: 600; color: var(--rf-muted); }\r
.rf-item-more { padding: 2px 8px 10px 64px; animation: rf-fade .15s; }\r
.rf-item-more dl { display: grid; grid-template-columns: max-content 1fr; gap: 3px 14px; font-size: 12.5px; margin-bottom: 8px; }\r
.rf-item-more dt { color: var(--rf-muted); }\r
.rf-item-acts { display: flex; gap: 6px; flex-wrap: wrap; }\r
.rf-reuse { margin-top: 8px; font-size: 12.5px; color: var(--rf-muted); }\r
\r
.rf-body { display: flex; gap: 20px; align-items: flex-start; }\r
.rf-fig { width: 56px; flex: none; }\r
.rf-body-cols { flex: 1; display: grid; gap: 14px; min-width: 0; }\r
.rf-colors { display: grid; grid-template-columns: repeat(auto-fill, minmax(116px, 1fr)); gap: 6px 10px; }\r
.rf-color { display: flex; align-items: center; gap: 8px; font-size: 13px; }\r
.rf-color code { font-size: 11px; color: var(--rf-muted); }\r
.rf-swatch { width: 18px; height: 18px; border-radius: 5px; box-shadow: inset 0 0 0 1px rgb(0 0 0 / .18); flex: none; display: inline-block; }\r
.rf-scales { display: grid; gap: 4px; }\r
.rf-scale { display: grid; grid-template-columns: 84px 1fr 44px; align-items: center; gap: 10px; font-size: 13px; color: var(--rf-muted); }\r
.rf-scale.changed { color: var(--rf-fg); font-weight: 600; }\r
.rf-scale .rf-mono { text-align: right; }\r
.rf-track { height: 4px; border-radius: 2px; background: var(--rf-surface-3); position: relative; }\r
.rf-track i { position: absolute; top: -3px; width: 10px; height: 10px; margin-left: -5px; border-radius: 50%; background: var(--rf-muted); }\r
.rf-scale.changed .rf-track i { background: var(--rf-accent); }\r
\r
.rf-form { display: flex; flex-direction: column; gap: 10px; }\r
.rf-form label { display: flex; flex-direction: column; gap: 4px; font-size: 12px; font-weight: 600; color: var(--rf-muted); }\r
.rf-form input, .rf-form textarea { border: 0; border-radius: var(--rf-r); background: var(--rf-surface-2); padding: 8px 10px; font-weight: 400; color: var(--rf-fg); resize: vertical; width: 100%; }\r
.rf-form input:focus, .rf-form textarea:focus { outline: 2px solid var(--rf-accent); background: var(--rf-bg); }\r
\r
.rf-hist { display: flex; flex-direction: column; }\r
.rf-hbtn { display: flex; align-items: center; gap: 10px; width: 100%; padding: 6px 0; text-align: left; }\r
.rf-hdot { width: 8px; height: 8px; border-radius: 50%; background: var(--rf-accent); flex: none; }\r
.rf-hdate { font-weight: 600; font-size: 13px; min-width: 96px; }\r
.rf-hlabel { flex: 1; font-size: 13px; color: var(--rf-muted); }\r
.rf-hdetail { margin: 0 0 8px 18px; padding-left: 12px; border-left: 2px solid var(--rf-line); font-size: 12.5px; display: flex; flex-direction: column; gap: 2px; }\r
.rf-hdetail .add { color: var(--rf-ok); } .rf-hdetail .rem { color: var(--rf-bad); }\r
.rf-hdetail .clr { display: flex; align-items: center; gap: 6px; }\r
\r
/* ---- compare ------------------------------------------------------------------------------------ */\r
.rf-compare { flex: 1; display: flex; flex-direction: column; min-width: 0; min-height: 0; }\r
.rf-cbar { display: flex; align-items: center; gap: 10px; padding: 10px 20px; border-bottom: 1px solid var(--rf-line); }\r
.rf-cbar h2 { font-size: 17px; margin-left: 4px; }\r
.rf-cscroll { flex: 1; overflow-y: auto; padding: 20px; }\r
.rf-cheads { display: grid; grid-template-columns: minmax(0, 1fr) 200px minmax(0, 1fr); gap: 20px; align-items: center; margin-bottom: 24px; }\r
.rf-chead { display: flex; flex-direction: column; gap: 2px; min-width: 0; }\r
.rf-chead .rf-stage { margin-bottom: 8px; }\r
.rf-chead b { font-size: 16px; overflow-wrap: anywhere; }\r
.rf-sim { text-align: center; }\r
.rf-sim-n { font-size: 44px; font-weight: 800; letter-spacing: -.02em; line-height: 1; font-variant-numeric: tabular-nums; }\r
.rf-sim-n small { font-size: 20px; font-weight: 700; color: var(--rf-muted); }\r
.rf-simbar { height: 6px; border-radius: 3px; background: var(--rf-surface-3); margin-top: 10px; overflow: hidden; }\r
.rf-simbar i { display: block; height: 100%; background: var(--rf-accent); border-radius: 3px; animation: rf-grow .6s var(--rf-ease); transform-origin: left; }\r
@keyframes rf-grow { from { transform: scaleX(0); } }\r
.rf-cols3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }\r
.rf-ccol h3 { font-size: 13px; display: flex; justify-content: space-between; padding: 0 0 8px; border-bottom: 2px solid var(--rf-line); margin-bottom: 6px; }\r
.rf-ccol h3 span { color: var(--rf-muted); font-weight: 600; }\r
.rf-ccol.a h3 { border-color: var(--rf-bad); } .rf-ccol.b h3 { border-color: var(--rf-ok); } .rf-ccol.both h3 { border-color: var(--rf-muted); }\r
.rf-crow { display: flex; align-items: center; gap: 10px; padding: 5px 4px; border-radius: 8px; }\r
.rf-crow:hover { background: var(--rf-surface); }\r
.rf-cdetails { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; margin-top: 28px; }\r
.rf-cdetails h3 { font-size: 14px; margin-bottom: 8px; }\r
.rf-cdiff { display: flex; align-items: center; gap: 8px; padding: 3px 0; font-size: 13px; }\r
.rf-cdiff span:first-child { min-width: 80px; color: var(--rf-muted); }\r
.rf-cdiff code { margin-left: auto; font-size: 12px; color: var(--rf-muted); }\r
\r
/* ---- settings page ---------------------------------------------------------------------------------- */\r
.rf-pnav { display: flex; align-items: center; gap: 4px; padding: 0 20px; height: 49px; border-bottom: 1px solid var(--rf-line); flex: none; }\r
.rf-pbrand { display: inline-flex; align-items: center; gap: 8px; margin-right: 18px; font-size: 15px; }\r
.rf-pnav button { height: 100%; padding: 0 12px; font-weight: 600; color: var(--rf-muted); position: relative; }\r
.rf-pnav button.on { color: var(--rf-fg); }\r
.rf-pnav button.on::after { content: ''; position: absolute; left: 8px; right: 8px; bottom: 0; height: 2px; background: var(--rf-fg); }\r
.rf-settings { width: min(720px, 100%); margin: 0 auto; padding: 28px 20px 80px; }\r
.rf-sethead { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 8px; flex-wrap: wrap; }\r
.rf-sethead h1 { font-size: 26px; font-weight: 800; }\r
.rf-setgroup { margin-top: 28px; }\r
.rf-setgroup h2 { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; color: var(--rf-muted); padding-bottom: 8px; border-bottom: 1px solid var(--rf-line); }\r
.rf-setrow { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 14px 0; border-bottom: 1px solid var(--rf-line); }\r
.rf-setl { display: flex; flex-direction: column; gap: 2px; min-width: 0; }\r
.rf-setl span { font-weight: 600; }\r
.rf-setl small { color: var(--rf-muted); font-size: 12.5px; max-width: 56ch; }\r
.rf-setc { display: flex; gap: 8px; flex: none; align-items: center; }\r
.rf-setc.wrap { flex-wrap: wrap; justify-content: flex-end; max-width: 260px; }\r
.rf-setp { color: var(--rf-muted); padding: 12px 0; max-width: 62ch; }\r
.rf-setfoot { margin-top: 32px; }\r
.rf-caps { display: flex; flex-direction: column; }\r
.rf-cap { display: grid; grid-template-columns: 14px 1fr auto; gap: 12px; align-items: center; padding: 9px 0; border-bottom: 1px solid var(--rf-line); }\r
.rf-cap-n { display: flex; flex-direction: column; font-weight: 600; }\r
.rf-cap-n small { font-weight: 400; color: var(--rf-muted); font-size: 12px; }\r
.rf-cap-s { font-size: 12.5px; color: var(--rf-muted); text-align: right; max-width: 240px; }\r
.rf-led { width: 9px; height: 9px; border-radius: 50%; background: var(--rf-surface-3); }\r
.rf-led.ok { background: var(--rf-ok); } .rf-led.bad { background: var(--rf-bad); }\r
.rf-details { margin: 8px 0; font-size: 13px; } .rf-details summary { cursor: pointer; color: var(--rf-muted); }\r
\r
/* ---- welcome ------------------------------------------------------------------------------------- */\r
.rf-welcome { flex: 1; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); min-height: 100vh; }\r
.rf-wl { padding: 8vh 6vw; display: flex; flex-direction: column; justify-content: center; max-width: 640px; margin-left: auto; }\r
.rf-logo { width: 48px; height: 48px; border-radius: 12px; background: var(--rf-accent); color: var(--rf-accent-fg); display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }\r
.rf-wl h1 { font-size: 40px; line-height: 1.05; font-weight: 800; letter-spacing: -.02em; }\r
.rf-lead { font-size: 17px; margin: 12px 0 28px; color: var(--rf-muted); max-width: 44ch; }\r
.rf-lead b { color: var(--rf-fg); }\r
.rf-steps { list-style: none; display: flex; flex-direction: column; gap: 18px; margin-bottom: 32px; }\r
.rf-steps li { display: flex; gap: 14px; }\r
.rf-steps li > span { width: 26px; height: 26px; border-radius: 50%; background: var(--rf-surface-2); font-weight: 700; font-size: 13px; display: flex; align-items: center; justify-content: center; flex: none; margin-top: 1px; }\r
.rf-steps p { color: var(--rf-muted); margin-top: 2px; max-width: 46ch; }\r
.rf-wa { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }\r
.rf-wr { background: var(--rf-surface); display: flex; align-items: center; justify-content: center; padding: 40px; }\r
.rf-faux { width: min(420px, 100%); background: var(--rf-bg); border-radius: 12px; box-shadow: 0 20px 50px rgb(0 0 0 / .14); overflow: hidden; transform: rotate(-1.2deg); }\r
.rf-faux-tabs { display: flex; border-bottom: 1px solid var(--rf-line); }\r
.rf-faux-tabs span { flex: 1; text-align: center; padding: 14px 0; font-weight: 600; color: var(--rf-muted); }\r
.rf-faux-tabs .on { color: var(--rf-fg); box-shadow: inset 0 -2px var(--rf-fg); }\r
.rf-faux-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; padding: 16px; }\r
.rf-faux-grid i { display: block; aspect-ratio: 1; border-radius: 8px; background: var(--rf-surface-2); }\r
.rf-faux-grid b { display: block; height: 8px; width: 70%; border-radius: 4px; background: var(--rf-surface-2); margin-top: 8px; }\r
.rf-faux-grid div:nth-child(2) i { background: var(--rf-accent-soft); box-shadow: inset 0 0 0 2px var(--rf-accent); }\r
\r
/* ---- responsive & motion ------------------------------------------------------------------------------- */\r
@media (max-width: 760px) {\r
  .rf-bar { padding: 8px 12px; gap: 8px; }\r
  .rf-who b { max-width: 14ch; }\r
  .rf-tabs { margin-left: 0; }\r
  .rf-tabs button { padding: 0 9px; }\r
  .rf-toolbar, .rf-subbar { padding-left: 12px; padding-right: 12px; }\r
  .rf-scroll { padding-left: 12px; padding-right: 12px; }\r
  .rf-hide-s { display: none; }\r
  .rf-cols3 { grid-template-columns: 1fr; }\r
  .rf-cheads { grid-template-columns: 1fr 1fr; } .rf-sim { grid-column: 1 / -1; order: -1; }\r
  .rf-welcome { grid-template-columns: 1fr; } .rf-wr { display: none; } .rf-wl { margin: 0 auto; }\r
  .rf-setrow { flex-direction: column; align-items: flex-start; gap: 10px; }\r
}\r
/* ---- motion v2 ------------------------------------------------------------------------------------\r
   Entrances are one-shot and cheap (transform/opacity). Collection changes are animated in JS with FLIP (see motion.ts),\r
   so nothing below replays when a list is merely filtered or sorted. */\r
@keyframes rf-rise { from { opacity: 0; transform: translateY(var(--rf-dy-s)); } }\r
.rf-grid.intro .rf-cell { animation: rf-rise .42s var(--rf-ease) backwards; animation-delay: calc(var(--i, 0) * 18ms); }\r
.rf-scroll > .rf-items, .rf-explorer > .rf-empty, .rf-scroll > .rf-empty { animation: rf-rise .3s var(--rf-ease) backwards; }\r
.rf-pane > .rf-explorer { animation: rf-rise .26s var(--rf-ease) backwards; }\r
.rf-compare { animation: rf-rise .3s var(--rf-ease) backwards; }\r
.rf-cost, .rf-change { animation: rf-rise .34s var(--rf-ease) backwards; }\r
\r
/* disclosure: height animates via grid rows (no layout measuring in JS) */\r
.rf-collapse { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .32s var(--rf-ease); }\r
.rf-collapse[data-open=true] { grid-template-rows: 1fr; }\r
.rf-collapse-in { overflow: hidden; min-height: 0; opacity: 0; visibility: hidden; transition: opacity .2s, visibility 0s .32s; }\r
.rf-collapse[data-open=true] > .rf-collapse-in { opacity: 1; visibility: visible; transition: opacity .28s .06s, visibility 0s; }\r
.rf-chev { transition: transform .3s var(--rf-ease); }\r
[aria-expanded=true] > .rf-chev { transform: rotate(90deg); }\r
\r
/* background refresh: a thin indeterminate line instead of swapping content for skeletons */\r
.rf-refresh { position: relative; height: 2px; flex: none; overflow: hidden; opacity: 0; transition: opacity .2s; }\r
.rf-refresh.on { opacity: 1; }\r
.rf-refresh::after { content: ''; position: absolute; inset: 0; width: 40%; background: var(--rf-accent); animation: rf-slide 1.1s var(--rf-ease) infinite; }\r
@keyframes rf-slide { from { transform: translateX(-100%); } to { transform: translateX(250%); } }\r
\r
.rf-btn.on .rf-ico { animation: rf-boing .5s var(--rf-spring); }\r
@keyframes rf-boing { from { transform: scale(.5); } }\r
.rf-fresh { animation: rf-flash 1.2s var(--rf-ease) both; }\r
@keyframes rf-flash { from { background: var(--rf-accent-soft); } }\r
\r
/* compare overlay */\r
.rf-overlay { position: relative; user-select: none; touch-action: none; }\r
.rf-overlay .rf-thumb.top { position: absolute; inset: 0; background: none; }\r
.rf-overlay-line { position: absolute; top: 0; bottom: 0; width: 2px; margin-left: -1px; background: var(--rf-accent); pointer-events: none; }\r
.rf-overlay-line::after { content: ''; position: absolute; top: 50%; left: 50%; width: 22px; height: 22px; margin: -11px; border-radius: 50%; background: var(--rf-accent); border: 3px solid var(--rf-bg); }\r
.rf-overlay input { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; cursor: ew-resize; margin: 0; }\r
.rf-overlay input:focus-visible ~ .rf-overlay-line::after { outline: 2px solid var(--rf-fg); outline-offset: 2px; }\r
.rf-overlay-tag { position: absolute; top: 8px; font-size: 11px; font-weight: 700; padding: 2px 7px; border-radius: 4px; background: var(--rf-bg); }\r
.rf-bodypair { display: flex; gap: 18px; align-items: flex-start; margin-bottom: 8px; }\r
.rf-bodypair .rf-fig { width: 44px; }\r
\r
/* library: collection headings and item strips */\r
.rf-lgroup { margin-bottom: 18px; }\r
.rf-lgroup > h3 { font-size: 13px; font-weight: 700; padding: 6px 2px 8px; display: flex; gap: 8px; align-items: baseline; }\r
.rf-lgroup > h3 span { color: var(--rf-muted); font-weight: 600; }\r
.rf-strip { display: flex; margin-top: 3px; padding-left: 2px; min-height: 20px; }\r
.rf-strip img, .rf-strip i { width: 20px; height: 20px; border-radius: 5px; margin-right: -5px; border: 2px solid var(--rf-bg); background: var(--rf-surface-2); object-fit: cover; flex: none; }\r
.rf-strip em { font-style: normal; font-size: 11px; color: var(--rf-muted); margin-left: 10px; align-self: center; }\r
.rf-cell.picked .rf-strip img, .rf-cell.active .rf-strip img { border-color: transparent; }\r
\r
/* Reduced motion, designed rather than disabled: same timing, no travel, no spring.\r
   Content still eases in and out with opacity, which keeps state changes legible.\r
   Spinners and the refresh line keep running because they carry meaning. */\r
.rf.rm { --rf-dy: 0px; --rf-dy-s: 0px; --rf-dx: 0px; --rf-pop: 1; --rf-lift: 0px; --rf-press: 1; --rf-drop: 0px; --rf-spring: cubic-bezier(.22, 1, .36, 1); }\r
.rf.rm .rf-skel { animation: rf-pulse 1.6s ease-in-out infinite; background: var(--rf-surface); }\r
@keyframes rf-pulse { 50% { opacity: .55; } }\r
.rf.rm .rf-collapse, .rf.rm .rf-seg::before, .rf.rm .rf-tabs::after { transition-duration: .12s; }\r
.rf.rm .rf-btn.on .rf-ico { animation: none; }\r
\r
.rf-ghost { position: fixed; transform-origin: 0 0; pointer-events: none; z-index: 60; border-radius: 8px; overflow: hidden; }\r
.rf-ghost img { width: 100%; height: 100%; object-fit: contain; display: block; }\r
.rf-fresh-text { animation: rf-fade .3s backwards; display: inline-block; }\r
.rf-cblend { max-width: 620px; margin: 0 auto 20px; }\r
.rf-overlay .rf-thumb { position: absolute; inset: 0; aspect-ratio: auto; background: none; border-radius: 0; }\r
.rf-overlay .rf-thumb.top { background: var(--rf-surface); }\r
.rf-cheads.compact { grid-template-columns: minmax(0, 1fr) 200px minmax(0, 1fr); }\r
.rf-cheads.compact .rf-chead { align-items: flex-start; }\r
[hidden] { display: none !important; }\r
\r
/* ---- "why no outfits" ---------------------------------------------------------------------------- */\r
.rf-why { max-width: 520px; margin: 6vh auto 0; display: flex; flex-direction: column; align-items: flex-start; gap: 8px; animation: rf-rise .4s var(--rf-ease) backwards; }\r
.rf-why h3 { font-size: 20px; font-weight: 800; letter-spacing: -.01em; }\r
.rf-why-lead { color: var(--rf-muted); margin-bottom: 6px; }\r
.rf-why-art { width: 64px; height: 64px; border-radius: 16px; background: var(--rf-surface-2); display: flex; align-items: center; justify-content: center; color: var(--rf-muted); margin-bottom: 6px; }\r
.rf-why-art.lock { color: var(--rf-fg); }\r
.rf-why-art .shackle { transform-box: fill-box; transform-origin: 100% 100%; animation: rf-shackle .9s var(--rf-spring) .25s backwards; }\r
@keyframes rf-shackle { from { transform: translateY(-4px) rotate(-18deg); } }\r
.rf-reasons { list-style: none; padding: 0; margin: 4px 0 8px; width: 100%; display: flex; flex-direction: column; }\r
.rf-reasons li { display: grid; grid-template-columns: 22px 1fr auto; gap: 12px; align-items: start; padding: 11px 0; border-top: 1px solid var(--rf-line); animation: rf-rise .4s var(--rf-ease) backwards; animation-delay: calc(120ms + var(--i, 0) * 70ms); }\r
.rf-reasons li:last-child { border-bottom: 1px solid var(--rf-line); }\r
.rf-vdot { width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-top: 1px; background: var(--rf-surface-3); color: var(--rf-muted); }\r
.rf-vdot i { width: 6px; height: 6px; border-radius: 50%; background: currentColor; }\r
.v-yes .rf-vdot { background: var(--rf-accent); color: var(--rf-accent-fg); }\r
.v-no .rf-vdot { background: var(--rf-surface-2); }\r
.rf-rtext { display: flex; flex-direction: column; min-width: 0; }\r
.rf-rtext b { font-weight: 700; font-size: 13.5px; }\r
.rf-rtext span { color: var(--rf-muted); font-size: 12.5px; }\r
.rf-rtag { font-style: normal; font-size: 11px; font-weight: 700; color: var(--rf-muted); white-space: nowrap; margin-top: 2px; }\r
.v-yes .rf-rtag { color: var(--rf-accent); }\r
.rf-why-tech { font-size: 12.5px; margin-top: 8px; }\r
.rf-techdl { display: grid; grid-template-columns: max-content 1fr; gap: 3px 14px; font-size: 12.5px; padding: 8px 0 0; }\r
.rf-techdl dt { color: var(--rf-muted); }\r
\r
/* ---- toolbar popup: one job (get to outfits), three rows at most ---------------------------------------------- */\r
.rf-popup { width: 320px; padding: 0 0 6px; gap: 0; background: var(--rf-bg); }\r
.rf-pop-h { display: flex; align-items: center; gap: 9px; padding: 10px 8px 8px 14px; font-size: 15px; }\r
.rf-pop-logo { width: 26px; height: 26px; border-radius: 7px; background: var(--rf-accent); color: var(--rf-accent-fg); display: flex; align-items: center; justify-content: center; }\r
.rf-pop-now { display: flex; align-items: center; gap: 12px; margin: 2px 10px 6px; padding: 12px 14px; border-radius: 12px; background: var(--rf-surface); text-align: left; width: calc(100% - 20px); animation: rf-rise .32s var(--rf-ease) backwards; }\r
.rf-pop-now.live { background: var(--rf-accent); color: var(--rf-accent-fg); transition: transform .3s var(--rf-spring), background .15s; }\r
.rf-pop-now.live:hover { background: color-mix(in srgb, var(--rf-accent) 90%, #000); }\r
.rf-pop-now.live:active { transform: scale(var(--rf-press)); }\r
.rf-pop-now.live .rf-muted { color: color-mix(in srgb, var(--rf-accent-fg) 78%, transparent); }\r
.rf-pop-now-t { display: flex; flex-direction: column; min-width: 0; flex: 1; gap: 1px; }\r
.rf-pop-now-t small { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; opacity: .75; }\r
.rf-pop-now-t b { font-size: 16px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\r
.rf-pop-now-t span { font-size: 12.5px; }\r
.rf-pop-go { width: 30px; height: 30px; border-radius: 50%; background: rgb(255 255 255 / .2); display: flex; align-items: center; justify-content: center; transition: transform .3s var(--rf-spring); }\r
.rf-pop-now.live:hover .rf-pop-go { transform: translateX(3px); }\r
.rf-pop-now.idle { color: var(--rf-muted); font-size: 13px; align-items: flex-start; }\r
.rf-pop-now.idle b { color: var(--rf-fg); }\r
.rf-pop-now.idle .rf-ico { margin-top: 1px; flex: none; }\r
.rf-pop-now.sk { height: 74px; position: relative; overflow: hidden; padding: 0; }\r
.rf-pop-sec { padding: 4px 10px 0; }\r
.rf-pop-sec h2 { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; color: var(--rf-muted); padding: 8px 4px 4px; }\r
.rf-pop-row, .rf-pop-lib { display: flex; align-items: center; gap: 11px; width: 100%; padding: 8px 8px; border-radius: 10px; text-align: left; transition: background .12s, transform .12s var(--rf-ease); }\r
.rf-pop-row { animation: rf-rise .34s var(--rf-ease) backwards; animation-delay: calc(80ms + var(--i, 0) * 45ms); }\r
.rf-pop-row:hover, .rf-pop-lib:hover { background: var(--rf-surface); }\r
.rf-pop-row:active, .rf-pop-lib:active { transform: scale(.985); }\r
.rf-pop-av { width: 30px; height: 30px; border-radius: 50%; background: var(--rf-surface-3); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px; flex: none; }\r
.rf-pop-name { display: flex; flex-direction: column; flex: 1; min-width: 0; font-weight: 600; font-size: 13.5px; }\r
.rf-pop-name small { font-weight: 400; color: var(--rf-muted); font-size: 12px; }\r
.rf-pop-chev { color: var(--rf-muted); transition: transform .25s var(--rf-ease); }\r
.rf-pop-row:hover .rf-pop-chev, .rf-pop-lib:hover .rf-pop-chev { transform: translateX(2px); }\r
.rf-pop-lib { margin: 6px 10px 0; width: calc(100% - 20px); font-weight: 600; border-top: 1px solid var(--rf-line); border-radius: 0 0 10px 10px; padding-top: 11px; }\r
.rf-pop-lib em { margin-left: auto; font-style: normal; font-weight: 400; font-size: 12px; color: var(--rf-muted); }\r
.rf-pop-lib .rf-pop-chev { margin-left: 0; }\r
\r
/* ==== 2.0 ============================================================================================ */\r
\r
/* Balanced motion: the same choreography as Full at about half the travel, no overshoot, no stagger. */\r
.rf.mb { --rf-dy: 6px; --rf-dy-s: 4px; --rf-dx: 5px; --rf-pop: .985; --rf-lift: -1px; --rf-press: .98; --rf-drop: 3px; --rf-spring: var(--rf-ease); }\r
.rf.mb .rf-grid.intro .rf-cell, .rf.mb .rf-pop-row, .rf.mb .rf-reasons li { animation-delay: 0s; }\r
.rf.mb .rf-btn.on .rf-ico { animation: none; }\r
\r
/* small helpers */\r
.rf-ell { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }\r
.rf-maxw { max-width: 16ch; }\r
.rf-pad { padding-left: 20px; padding-right: 20px; }\r
.rf-btn em.rf-count-badge, .rf-count-badge { font-style: normal; margin-left: 0; min-width: 18px; height: 18px; padding: 0 5px; border-radius: 9px; background: var(--rf-accent); color: var(--rf-accent-fg);\r
  font-size: 11px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; font-variant-numeric: tabular-nums; }\r
.rf-btn.danger.solid { background: var(--rf-bad); color: #fff; }\r
.rf-btn.danger.solid:hover:not(:disabled) { background: color-mix(in srgb, var(--rf-bad) 86%, #000); }\r
.rf-cmdk { gap: 8px; height: 34px; padding: 0 8px 0 10px; color: var(--rf-muted); border: 1px solid var(--rf-line); }\r
.rf-cmdk:hover:not(:disabled) { color: var(--rf-fg); }\r
.rf-note.warn { background: color-mix(in srgb, var(--rf-warn) 13%, var(--rf-bg)); }\r
.rf-note.warn > .rf-ico { color: var(--rf-warn); }\r
.rf-hintline.warn { color: var(--rf-warn); margin: 0; }\r
\r
/* popovers reuse the menu surface */\r
.rf-menu.rf-pop { min-width: 0; max-width: none; padding: 14px; transform-origin: top left; }\r
\r
/* dialogs: header with close, scrolling body */\r
.rf-page .rf-scrim { position: fixed; }\r
.rf-dialog-h { display: flex; align-items: flex-start; gap: 8px; margin: -6px -8px 10px 0; }\r
.rf-dialog-h h3 { flex: 1; margin: 6px 0 0; min-width: 0; overflow-wrap: anywhere; }\r
.rf-dialog-b { display: flex; flex-direction: column; gap: 12px; max-height: min(64vh, 560px); overflow-y: auto; margin: 0 -20px; padding: 2px 20px 4px; scrollbar-width: thin; }\r
.rf-dialog-b p { margin-bottom: 0; }\r
.rf-dialog-b + .rf-dialog-actions { margin-top: 18px; }\r
.rf-dialog.wide { width: min(560px, calc(100% - 32px)); }\r
.rf-dialog-p { color: var(--rf-muted); margin-bottom: 18px; }\r
.rf-dialog-p p { margin-bottom: 8px; }\r
.rf-field { display: flex; flex-direction: column; gap: 6px; font-size: 12px; font-weight: 600; color: var(--rf-muted); }\r
.rf-field input, .rf-field textarea { border: 0; border-radius: var(--rf-r); background: var(--rf-surface-2); padding: 9px 11px; font-size: 14px; font-weight: 400; color: var(--rf-fg); width: 100%; resize: vertical; }\r
.rf-field textarea { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 12.5px; min-height: 84px; }\r
.rf-field input:focus, .rf-field textarea:focus { outline: 2px solid var(--rf-accent); outline-offset: 0; background: var(--rf-bg); }\r
.rf-sugg { display: flex; flex-wrap: wrap; gap: 6px; }\r
\r
/* explorer filters */\r
.rf-filters { display: flex; flex-direction: column; gap: 14px; }\r
.rf-frow { display: flex; align-items: center; justify-content: space-between; gap: 12px; font-weight: 600; font-size: 13px; }\r
.rf-frow > span { display: flex; flex-direction: column; min-width: 0; }\r
.rf-frow small { font-weight: 400; color: var(--rf-muted); font-size: 12px; }\r
label.rf-frow { cursor: pointer; }\r
.rf-fsec { display: flex; flex-direction: column; gap: 7px; font-weight: 600; font-size: 13px; }\r
.rf-fchips { display: flex; flex-wrap: wrap; gap: 6px; }\r
.rf-fchips .rf-chip.btn { height: 26px; font-size: 12px; }\r
.rf-fnote { display: flex; align-items: flex-start; gap: 8px; padding: 10px; border-radius: 8px; background: var(--rf-surface); font-size: 12.5px; color: var(--rf-muted); }\r
.rf-fnote > .rf-ico { margin-top: 2px; }\r
.rf-fnote span { flex: 1; }\r
.rf-factions { display: flex; justify-content: flex-end; border-top: 1px solid var(--rf-line); padding-top: 10px; margin-top: -2px; }\r
.rf-card-cost { margin-left: auto; padding-left: 6px; font-weight: 700; color: var(--rf-fg); font-variant-numeric: tabular-nums; font-size: 11.5px; flex: none; }\r
.rf-card-ic { color: var(--rf-muted); }\r
\r
/* who-can-see badge */\r
.rf-access .rf-ico { margin-left: -1px; }\r
.rf-access-pop { display: flex; flex-direction: column; gap: 10px; font-size: 13px; }\r
.rf-access-pop .rf-btn { align-self: flex-start; }\r
.rf-access-h { display: flex; align-items: center; gap: 10px; font-size: 15px; }\r
.rf-access-i { width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: var(--rf-surface-2); color: var(--rf-muted); flex: none; }\r
.rf-access-i.ok { background: color-mix(in srgb, var(--rf-ok) 16%, var(--rf-bg)); color: var(--rf-ok); }\r
.rf-access-i.accent { background: var(--rf-accent-soft); color: var(--rf-accent); }\r
.rf-access-i.warn { background: color-mix(in srgb, var(--rf-warn) 16%, var(--rf-bg)); color: var(--rf-warn); }\r
.rf-access-pop .rf-techdl { padding: 0; }\r
\r
/* command palette & shortcuts */\r
.rf-scrim.top { align-items: flex-start; padding-top: min(12vh, 96px); }\r
.rf-palette { width: min(620px, calc(100% - 24px)); max-height: min(70vh, 560px); display: flex; flex-direction: column; overflow: hidden; background: var(--rf-bg); border: 1px solid var(--rf-line);\r
  border-radius: 14px; box-shadow: 0 24px 60px rgb(0 0 0 / .4); animation: rf-pop .24s var(--rf-ease) backwards; transform-origin: top center; }\r
.rf-scrim[data-state=closed] > .rf-palette { animation: rf-pop-out .14s var(--rf-ease-in) forwards; }\r
.rf-pal-in { display: flex; align-items: center; gap: 10px; height: 54px; padding: 0 16px; border-bottom: 1px solid var(--rf-line); color: var(--rf-muted); flex: none; }\r
.rf-pal-in input { flex: 1; min-width: 0; height: 100%; border: 0; background: transparent; outline: none; font-size: 16px; color: var(--rf-fg); }\r
.rf-pal-in input::placeholder { color: var(--rf-muted); }\r
.rf-pal-note { display: flex; align-items: center; gap: 8px; padding: 8px 16px; font-size: 12.5px; color: var(--rf-muted); background: var(--rf-surface); flex: none; }\r
.rf-pal-list { flex: 1 1 auto; min-height: 0; overflow-y: auto; padding: 6px; scrollbar-width: thin; }\r
.rf-pal-sec { padding: 10px 10px 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; color: var(--rf-muted); }\r
.rf-pal-row { display: flex; align-items: center; gap: 12px; padding: 7px 10px; border-radius: 8px; cursor: pointer; }\r
.rf-pal-row.on { background: var(--rf-surface-2); }\r
.rf-pal-ic { position: relative; width: 32px; height: 32px; border-radius: 7px; background: var(--rf-surface-2); display: flex; align-items: center; justify-content: center; flex: none; overflow: hidden; color: var(--rf-muted); }\r
.rf-pal-row.on .rf-pal-ic { background: var(--rf-bg); color: var(--rf-fg); }\r
.rf-pal-ic .rf-thumb { width: 100%; height: 100%; border-radius: 0; background: none; }\r
.rf-pal-t { display: flex; flex-direction: column; flex: 1; min-width: 0; }\r
.rf-pal-t b, .rf-pal-t small { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\r
.rf-pal-t b { font-weight: 600; }\r
.rf-pal-t small { font-size: 12px; color: var(--rf-muted); }\r
.rf-pal-enter { color: var(--rf-muted); }\r
.rf-pal-empty { padding: 24px; text-align: center; color: var(--rf-muted); }\r
.rf-pal-foot { display: flex; gap: 16px; padding: 8px 16px; border-top: 1px solid var(--rf-line); font-size: 12px; color: var(--rf-muted); flex: none; }\r
.rf-pal-foot span { display: inline-flex; align-items: center; gap: 4px; }\r
.rf-keys { display: flex; flex-direction: column; margin: 0; }\r
.rf-keyrow { display: grid; grid-template-columns: 140px 1fr; gap: 12px; align-items: center; padding: 7px 0; border-bottom: 1px solid var(--rf-line); font-size: 13px; }\r
.rf-keyrow:last-child { border-bottom: 0; }\r
.rf-keyrow dt { display: flex; gap: 4px; flex-wrap: wrap; }\r
.rf-keyrow dd { margin: 0; color: var(--rf-muted); }\r
.rf-keyrow .rf-kbd { min-width: 22px; text-align: center; font-size: 12px; line-height: 20px; background: var(--rf-surface); }\r
\r
/* share */\r
.rf-share-access { display: flex; align-items: flex-start; gap: 10px; padding: 10px 12px; border-radius: 10px; background: var(--rf-surface); }\r
.rf-share-access > .rf-ico { margin-top: 2px; color: var(--rf-muted); }\r
.rf-share-access.ok > .rf-ico { color: var(--rf-ok); }\r
.rf-share-access.accent > .rf-ico { color: var(--rf-accent); }\r
.rf-share-access.warn > .rf-ico { color: var(--rf-warn); }\r
.rf-share-access div { display: flex; flex-direction: column; gap: 2px; font-size: 13px; }\r
.rf-share-access span { color: var(--rf-muted); }\r
.rf-consent { padding: 10px 12px; border-radius: 10px; border: 1px solid var(--rf-line); }\r
.rf-linkbox { display: flex; align-items: center; gap: 8px; border-radius: var(--rf-r); background: var(--rf-surface-2); padding-right: 10px; }\r
.rf-field .rf-linkbox input { background: transparent; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 12.5px; }\r
.rf-share-what { display: flex; flex-direction: column; gap: 8px; font-size: 13px; }\r
.rf-share-what ul, .rf-report ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 5px; }\r
.rf-share-what li, .rf-report li { display: flex; align-items: flex-start; gap: 8px; }\r
.rf-share-what li .rf-ico, .rf-report li .rf-ico { margin-top: 2px; color: var(--rf-ok); }\r
.rf-share-what li:last-child .rf-ico { color: var(--rf-muted); }\r
\r
/* inspector: similar outfits */\r
.rf-similar { display: grid; grid-template-columns: repeat(auto-fill, minmax(96px, 1fr)); gap: 6px; margin-bottom: 8px; }\r
.rf-sim-card { display: flex; flex-direction: column; gap: 6px; min-width: 0; padding: 5px; border-radius: 10px; text-align: left; transition: background .12s, transform .12s var(--rf-ease); }\r
.rf-sim-card:hover { background: var(--rf-surface); }\r
.rf-sim-card:active { transform: scale(var(--rf-press)); }\r
.rf-sim-t { display: flex; flex-direction: column; min-width: 0; font-size: 12.5px; }\r
.rf-sim-t b { font-weight: 600; }\r
.rf-sim-t small { color: var(--rf-muted); font-size: 11.5px; }\r
.rf-hrow + .rf-hrow { border-top: 1px solid var(--rf-line); }\r
\r
/* library 2.0 */\r
.rf-fav { position: absolute; top: 12px; right: 12px; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--rf-muted);\r
  background: color-mix(in srgb, var(--rf-bg) 84%, transparent); box-shadow: 0 1px 3px rgb(0 0 0 / .14); opacity: 0; transform: scale(.8); transition: opacity .12s, transform .3s var(--rf-spring), color .12s; }\r
.rf-cell:hover .rf-fav, .rf-cell:focus-within .rf-fav, .rf-fav.on { opacity: 1; transform: none; }\r
.rf-fav:hover { color: var(--rf-fg); }\r
.rf-fav.on { color: #e9a100; }\r
.rf-fav.on .rf-ico { fill: currentColor; }\r
.rf-colls { display: flex; flex-direction: column; }\r
.rf-coll { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid var(--rf-line); }\r
.rf-coll:last-child { border-bottom: 0; }\r
.rf-coll b { font-weight: 600; }\r
.rf-filepill { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: var(--rf-r); background: var(--rf-surface-2); font-size: 13px; }\r
.rf-filepill span { flex: 1; }\r
.rf-row-acts { display: flex; gap: 8px; flex-wrap: wrap; }\r
.rf-report { display: flex; flex-direction: column; gap: 8px; padding: 12px 14px; border-radius: 10px; background: var(--rf-surface); font-size: 13px; animation: rf-rise .25s var(--rf-ease) backwards; }\r
.rf-report li.warn { color: var(--rf-warn); }\r
.rf-report li.warn .rf-ico { color: currentColor; }\r
.rf-report-h b { font-weight: 700; }\r
.rf-report .rf-frow { border-top: 1px solid var(--rf-line); padding-top: 10px; }\r
.rf-report .rf-details { margin: 0; }\r
\r
/* settings 2.0: sections nav + body */\r
.rf-settings { width: min(1040px, 100%); display: grid; grid-template-columns: 220px minmax(0, 1fr); gap: 40px; align-items: start; padding: 28px 24px 80px; }\r
.rf-setnav { position: sticky; top: 20px; display: flex; flex-direction: column; gap: 14px; }\r
.rf-setnav h1 { font-size: 24px; font-weight: 800; letter-spacing: -.01em; }\r
.rf-setnav .rf-search { flex: none; max-width: none; }\r
.rf-setnav nav { display: flex; flex-direction: column; gap: 1px; }\r
.rf-setnav nav button { display: flex; align-items: center; gap: 10px; padding: 7px 10px; border-radius: 8px; font-weight: 600; color: var(--rf-muted); text-align: left; transition: background .12s, color .12s; }\r
.rf-setnav nav button:hover:not(:disabled) { background: var(--rf-surface); color: var(--rf-fg); }\r
.rf-setnav nav button.on { background: var(--rf-surface-2); color: var(--rf-fg); }\r
.rf-setnav nav button:disabled { opacity: .35; }\r
.rf-setbody { min-width: 0; max-width: 720px; }\r
.rf-setbody > .rf-setgroup:first-child { margin-top: 2px; }\r
.rf-setgroup { scroll-margin-top: 16px; margin-top: 36px; }\r
.rf-setgroup h2 { display: flex; align-items: center; gap: 8px; }\r
.rf-motion > .rf-setrow { border-bottom: 0; }\r
.rf-mprev { border-radius: 12px; background: var(--rf-surface); padding: 14px 14px 12px; margin-bottom: 6px; border-bottom: 1px solid var(--rf-line); }\r
.rf-mprev .rf-grid { grid-template-columns: repeat(5, minmax(0, 1fr)); pointer-events: none; }\r
.rf-mprev .rf-card.sk .rf-thumb { background: var(--rf-bg); }\r
.rf-mprev .rf-sk-l { background: var(--rf-surface-3); }\r
.rf-mprev-fig { position: absolute; left: 34%; right: 34%; top: 16%; bottom: 12%; border-radius: 999px 999px 10px 10px; background: var(--rf-surface-3); }\r
.rf-mprev-foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 10px; }\r
.rf-plist { list-style: none; margin: 4px 0 0; padding: 0; display: flex; flex-direction: column; }\r
.rf-plist li { display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--rf-line); font-size: 13px; color: var(--rf-muted); }\r
.rf-plist li > .rf-ico { margin-top: 2px; color: var(--rf-fg); }\r
.rf-plist b { color: var(--rf-fg); }\r
.rf-plist code { font-size: 12px; }\r
.rf-about { display: flex; flex-direction: column; gap: 12px; padding: 14px 0; }\r
.rf-about-h { display: flex; align-items: center; gap: 12px; }\r
.rf-about-h > div { display: flex; flex-direction: column; }\r
.rf-logo.sm { width: 36px; height: 36px; border-radius: 9px; margin: 0; flex: none; }\r
\r
/* popup 2.0 */\r
.rf-pop-search { padding: 0 10px 8px; }\r
.rf-pop-search .rf-search { max-width: none; height: 38px; }\r
.rf-pop-results { display: flex; flex-direction: column; gap: 1px; padding: 0 10px 4px; max-height: 360px; overflow-y: auto; }\r
.rf-pop-results .rf-pop-row { animation: none; cursor: pointer; }\r
.rf-pop-row.on { background: var(--rf-surface-2); }\r
.rf-pop-av.ic { color: var(--rf-muted); }\r
.rf-pop-row.on .rf-pop-av.ic { background: var(--rf-bg); color: var(--rf-fg); }\r
.rf-pop-msg { display: flex; align-items: flex-start; gap: 8px; margin: 4px 0; padding: 8px 10px; border-radius: 8px; font-size: 12.5px; background: color-mix(in srgb, var(--rf-warn) 12%, var(--rf-bg)); }\r
.rf-pop-msg > .rf-ico, .rf-pop-msg > .rf-spin { margin-top: 1px; color: var(--rf-warn); }\r
.rf-pop-msg.muted { background: none; color: var(--rf-muted); padding: 6px 8px; }\r
.rf-popup > .rf-pop-msg { margin: 4px 10px; }\r
.rf-pop-foot { margin-top: 4px; }\r
\r
@media (max-width: 760px) {\r
  .rf-settings { grid-template-columns: 1fr; gap: 12px; padding-top: 16px; }\r
  .rf-setnav { position: static; }\r
  .rf-setnav nav { flex-direction: row; overflow-x: auto; scrollbar-width: none; }\r
  .rf-setnav nav button { flex: none; }\r
  .rf-keyrow { grid-template-columns: 1fr; gap: 4px; }\r
  .rf-mprev .rf-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }\r
  .rf-mprev .rf-cell:nth-child(n+4) { display: none; }\r
  .rf-pad { padding-left: 12px; padding-right: 12px; }\r
}\r
\r
.rf-worn-cta { display: grid; justify-items: center; gap: 6px; margin-top: 18px; color: var(--rf-muted); text-align: center; }\r
.rf-worn { display: grid; grid-template-columns: minmax(120px, 190px) 1fr; gap: 18px; margin-top: 20px; padding: 16px; border-radius: 12px; background: var(--rf-surface); text-align: left; animation: rf-rise .4s var(--rf-ease) backwards; }\r
.rf-worn-img { aspect-ratio: 1; border-radius: 10px; background: var(--rf-surface-2); display: grid; place-items: center; overflow: hidden; }\r
.rf-worn-img img { width: 100%; height: 100%; object-fit: contain; }\r
.rf-worn h4 { margin: 0; font-size: 15px; display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }\r
.rf-chip-note { font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 6px; background: color-mix(in srgb, var(--rf-accent) 14%, transparent); color: var(--rf-accent); }\r
.rf-worn ul { list-style: none; margin: 10px 0 0; padding: 0; display: grid; gap: 2px; }\r
.rf-worn li { display: flex; justify-content: space-between; gap: 12px; padding: 7px 0; border-top: 1px solid var(--rf-line); font-size: 13px; }\r
.rf-worn li a { display: grid; min-width: 0; text-decoration: none; color: inherit; }\r
.rf-worn li b { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\r
.rf-worn li small { color: var(--rf-muted); font-size: 12px; }\r
.rf-worn li em { font-style: normal; font-weight: 700; white-space: nowrap; }\r
.rf-worn-total { margin: 10px 0 0; font-size: 13px; font-weight: 700; }\r
@media (max-width: 560px) { .rf-worn { grid-template-columns: 1fr; } .rf-worn-img { max-width: 220px; } }\r
\r
.rf-acct { background: var(--rf-bg); min-height: 100%; }\r
.rf-settings.native { width: 100%; max-width: none; margin: 0; padding: 0 0 40px; }\r
.rf-settings.native .rf-sethead { margin-bottom: 4px; }\r
.rf-nativetitle { font-size: 28px; font-weight: 800; letter-spacing: -.01em; }\r
.rf-settings.native .rf-setgroup { margin-top: 26px; }\r
.rf-settings.native .rf-setgroup h2 { font-size: 18px; font-weight: 700; text-transform: none; letter-spacing: 0; color: var(--rf-fg); border-bottom: 0; padding-bottom: 2px; }\r
.rf-settings.native .rf-setrow { padding: 11px 0; border-bottom: 1px solid color-mix(in srgb, var(--rf-line) 60%, transparent); gap: 18px; }\r
.rf-settings.native .rf-setl span { font-weight: 600; font-size: 14px; }\r
.rf-settings.native .rf-setl small { font-size: 12px; }\r
.rf-settings.native .rf-setrow { animation: rf-rise .35s var(--rf-ease) backwards; }\r
.rf-settings.native .rf-seg button { height: 28px; font-size: 12.5px; padding: 0 9px; }\r
.rf-settings.native .rf-btn { height: 32px; font-size: 13px; }\r
.rf-settings.native .rf-switch { transform: scale(.9); transform-origin: right center; }\r
\r
/* ---- toolbar popup: a list, not a poster ------------------------------------------------------------------------ */\r
.rf-popup.pp { width: 330px; padding: 16px 14px 10px; background: var(--rf-bg); display: flex; flex-direction: column; gap: 12px; }\r
.pp-head { display: flex; align-items: center; gap: 12px; padding: 0 4px; }\r
.pp-logo { width: 46px; height: 46px; border-radius: 14px; background: var(--rf-accent); color: var(--rf-accent-fg); display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 16px color-mix(in srgb, var(--rf-accent) 35%, transparent); animation: pp-pop .6s var(--rf-spring) backwards; }\r
@keyframes pp-pop { from { transform: scale(var(--rf-pop)) translateY(var(--rf-dy-s)); opacity: 0; } }\r
.pp-swing { transform-origin: 50% 12%; animation: pp-swing 1.6s var(--rf-ease) .35s backwards; }\r
@keyframes pp-swing { 0% { transform: rotate(var(--rf-sw, 24deg)); } 25% { transform: rotate(calc(var(--rf-sw, 24deg) * -.7)); } 50% { transform: rotate(calc(var(--rf-sw, 24deg) * .4)); } 75% { transform: rotate(calc(var(--rf-sw, 24deg) * -.2)); } 100% { transform: none; } }\r
.rm .pp-swing { --rf-sw: 0deg; }\r
.pp-name { flex: 1; min-width: 0; animation: rf-rise .4s var(--rf-ease) .08s backwards; }\r
.pp-name h1 { font-size: 24px; line-height: 1.05; font-weight: 900; letter-spacing: -.025em; }\r
.pp-name p { font-size: 12.5px; color: var(--rf-muted); margin-top: 2px; }\r
.pp-ver { font-size: 11px; font-weight: 700; color: var(--rf-muted); background: var(--rf-surface-2); padding: 2px 7px; border-radius: 6px; animation: rf-rise .4s var(--rf-ease) .2s backwards; }\r
\r
.pp-here { display: flex; align-items: center; gap: 12px; width: 100%; padding: 11px 12px; border-radius: 14px; text-align: left; color: var(--rf-accent-fg); background: var(--rf-accent); position: relative; overflow: hidden;\r
  transition: transform .35s var(--rf-spring), box-shadow .2s; animation: rf-rise .45s var(--rf-ease) .12s backwards; }\r
.pp-here::after { content: ''; position: absolute; top: 0; bottom: 0; width: 40%; left: -60%; background: linear-gradient(100deg, transparent, rgb(255 255 255 / .22), transparent); transform: skewX(-18deg); }\r
.pp-here:hover { transform: translateY(var(--rf-lift)); box-shadow: 0 10px 24px color-mix(in srgb, var(--rf-accent) 38%, transparent); }\r
.pp-here:hover::after { left: 130%; transition: left .7s var(--rf-ease); }\r
.pp-here:active { transform: scale(var(--rf-press)); transition-duration: .08s; }\r
.pp-av { width: 38px; height: 38px; border-radius: 50%; background: rgb(255 255 255 / .22); display: flex; align-items: center; justify-content: center; font-weight: 800; flex: none; }\r
.pp-here .pp-txt small { color: color-mix(in srgb, var(--rf-accent-fg) 80%, transparent); }\r
.pp-open { display: inline-flex; align-items: center; gap: 4px; font-weight: 800; font-size: 13px; white-space: nowrap; }\r
.pp-open .rf-ico { transition: transform .3s var(--rf-spring); }\r
.pp-here:hover .pp-open .rf-ico { transform: translateX(4px); }\r
\r
.pp-list { display: flex; flex-direction: column; border-radius: 14px; background: var(--rf-surface); overflow: hidden; }\r
.pp-row { display: flex; align-items: center; gap: 12px; width: 100%; padding: 11px 12px; text-align: left; position: relative; transition: background .15s;\r
  animation: rf-rise .42s var(--rf-ease) backwards; animation-delay: calc(160ms + var(--i, 0) * 60ms); }\r
.pp-row + .pp-row::before { content: ''; position: absolute; top: 0; left: 62px; right: 0; height: 1px; background: var(--rf-line); }\r
.pp-row:hover { background: var(--rf-surface-2); }\r
.pp-row:active { background: var(--rf-surface-3); }\r
.pp-ico { width: 38px; height: 38px; border-radius: 11px; background: var(--rf-bg); color: var(--rf-fg); display: flex; align-items: center; justify-content: center; flex: none; transition: transform .45s var(--rf-spring), background .15s, color .15s; }\r
.pp-row:hover .pp-ico { transform: scale(1.1) rotate(-6deg); background: var(--rf-accent); color: var(--rf-accent-fg); }\r
.pp-row.heart:hover .pp-ico { background: #e0457b; }\r
.pp-txt { display: flex; flex-direction: column; flex: 1; min-width: 0; line-height: 1.2; }\r
.pp-txt b { font-size: 14.5px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\r
.pp-txt small { font-size: 12px; color: var(--rf-muted); font-weight: 500; }\r
.pp-go { color: var(--rf-muted); transition: transform .3s var(--rf-spring), color .15s; }\r
.pp-row:hover .pp-go { transform: translateX(3px); color: var(--rf-fg); }\r
.pp-foot { display: flex; justify-content: center; align-items: center; gap: 8px; font-size: 12px; color: var(--rf-muted); animation: rf-rise .4s var(--rf-ease) .4s backwards; }\r
.pp-foot button { display: inline-flex; align-items: center; gap: 6px; color: var(--rf-muted); padding: 4px 6px; border-radius: 6px; transition: color .15s, background .15s; }\r
.pp-foot button:hover { color: var(--rf-fg); background: var(--rf-surface-2); }\r
\r
.wl { position: relative; flex: 1; display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); min-height: 100vh; overflow: hidden; background: var(--rf-bg); }\r
.wl-glow { position: absolute; width: 70vmax; height: 70vmax; right: -20vmax; top: -25vmax; border-radius: 50%; background: radial-gradient(closest-side, color-mix(in srgb, var(--rf-accent) 22%, transparent), transparent); animation: wl-drift 14s ease-in-out infinite alternate; pointer-events: none; }\r
@keyframes wl-drift { to { transform: translate(-6vmax, 8vmax) scale(1.08); } }\r
.rm .wl-glow { animation: none; }\r
.wl-left { position: relative; padding: 7vh 5vw 5vh 7vw; display: flex; flex-direction: column; justify-content: center; max-width: 720px; margin-left: auto; width: 100%; }\r
.wl-logo { width: 64px; height: 64px; border-radius: 18px; background: var(--rf-accent); color: var(--rf-accent-fg); display: flex; align-items: center; justify-content: center; margin-bottom: 22px; box-shadow: 0 12px 30px color-mix(in srgb, var(--rf-accent) 38%, transparent); animation: pp-pop .7s var(--rf-spring) backwards; }\r
.wl-eyebrow { font-size: 12px; font-weight: 800; letter-spacing: .09em; text-transform: uppercase; color: var(--rf-accent); animation: rf-rise .5s var(--rf-ease) .1s backwards; }\r
.wl-title { font-size: clamp(38px, 5.2vw, 60px); line-height: 1.02; font-weight: 900; letter-spacing: -.035em; margin: 8px 0 14px; }\r
.wl-title span { display: inline-block; margin-right: .26em; animation: rf-rise .7s var(--rf-spring) backwards; animation-delay: calc(160ms + var(--i, 0) * 90ms); }\r
.wl-lead { font-size: 17px; color: var(--rf-muted); max-width: 46ch; margin-bottom: 26px; animation: rf-rise .6s var(--rf-ease) .45s backwards; }\r
.wl-lead b { color: var(--rf-fg); }\r
.wl-steps, .wl-news { list-style: none; display: flex; flex-direction: column; gap: 16px; margin-bottom: 30px; }\r
.wl-steps li, .wl-news li { display: flex; gap: 14px; animation: rf-rise .6s var(--rf-ease) backwards; animation-delay: calc(520ms + var(--i, 0) * 110ms); }\r
.wl-steps li > span { width: 28px; height: 28px; border-radius: 50%; background: var(--rf-accent-soft); color: var(--rf-accent); font-weight: 800; font-size: 13px; display: flex; align-items: center; justify-content: center; flex: none; }\r
.wl-news li > span { width: 36px; height: 36px; border-radius: 11px; background: var(--rf-accent-soft); color: var(--rf-accent); display: flex; align-items: center; justify-content: center; flex: none; transition: transform .45s var(--rf-spring); }\r
.wl-news li:hover > span { transform: scale(1.12) rotate(-8deg); }\r
.wl-steps b, .wl-news b { font-size: 15px; }\r
.wl-steps p, .wl-news p { color: var(--rf-muted); margin-top: 2px; max-width: 48ch; font-size: 14px; }\r
.wl-actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; animation: rf-rise .6s var(--rf-ease) .95s backwards; }\r
.wl-links { display: flex; gap: 18px; margin-top: 18px; animation: rf-rise .6s var(--rf-ease) 1.05s backwards; }\r
.wl-links a { display: inline-flex; align-items: center; gap: 6px; color: var(--rf-muted); font-weight: 600; font-size: 13.5px; transition: color .15s, transform .3s var(--rf-spring); }\r
.wl-links a:hover { color: var(--rf-accent); transform: translateY(var(--rf-lift)); }\r
.wl-right { position: relative; display: flex; align-items: center; justify-content: center; padding: 40px 5vw 40px 2vw; }\r
\r
/* the self-playing demo */\r
.demo { position: relative; width: min(500px, 100%); border-radius: 16px; background: var(--rf-bg); border: 1px solid var(--rf-line); box-shadow: 0 30px 70px rgb(0 0 0 / .16); overflow: hidden; animation: rf-rise .8s var(--rf-ease) .3s backwards; transition: opacity .5s; }\r
.demo.reset { opacity: 0; }\r
.d-bar { display: flex; gap: 6px; padding: 10px 12px; background: var(--rf-surface); }\r
.d-bar i { width: 9px; height: 9px; border-radius: 50%; background: var(--rf-surface-3); }\r
.d-head { display: flex; align-items: center; gap: 12px; padding: 16px 18px 10px; }\r
.d-av { width: 46px; height: 46px; border-radius: 50%; background: var(--rf-surface-3); }\r
.d-head b { display: block; font-size: 16px; } .d-head small { color: var(--rf-muted); }\r
.d-tabs { position: relative; display: flex; border-bottom: 1px solid var(--rf-line); padding: 0 8px; }\r
.d-tabs > span { flex: 1; text-align: center; padding: 11px 0; font-weight: 700; font-size: 13px; color: var(--rf-muted); transition: color .3s; }\r
.d-tabs .on-about { color: var(--rf-fg); }\r
.d-outfits-tab { opacity: 0; transform: translateX(26px); transition: opacity .4s, transform .7s var(--rf-spring), color .3s; }\r
.a1 .d-outfits-tab { opacity: 1; transform: none; }\r
.a3 .d-outfits-tab { color: var(--rf-fg) !important; }\r
.a3 .on-about { color: var(--rf-muted); }\r
.d-underline { position: absolute; left: 8px; bottom: -1px; height: 2px; width: calc((100% - 16px) / 3); background: var(--rf-fg); transform: translateX(0); transition: transform .5s var(--rf-ease); }\r
.a3 .d-underline { transform: translateX(200%); }\r
.d-ripple { position: absolute; right: calc(8px + (100% - 16px) / 6 - 16px); top: 6px; width: 32px; height: 32px; border-radius: 50%; border: 2px solid var(--rf-accent); opacity: 0; transform: scale(.3); }\r
.a3 .d-ripple { animation: d-ripple .7s var(--rf-ease); }\r
@keyframes d-ripple { 0% { opacity: .9; transform: scale(.3); } 100% { opacity: 0; transform: scale(1.8); } }\r
.d-body { position: relative; display: flex; gap: 12px; padding: 14px; min-height: 250px; }\r
.d-grid { flex: 1; min-width: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; align-content: start; }\r
.tile { opacity: 0; transform: translateY(12px) scale(.94); transition: opacity .4s, transform .6s var(--rf-spring); transition-delay: 0s; }\r
.a3 .tile { opacity: 1; transform: none; transition-delay: calc(var(--i, 0) * 70ms); }\r
.tile > span { display: flex; align-items: center; justify-content: center; aspect-ratio: 1; border-radius: 10px; background: var(--rf-surface); color: var(--rf-muted); transition: background .3s, box-shadow .3s, color .3s; }\r
.tile > b { display: block; height: 7px; width: 70%; border-radius: 4px; background: var(--rf-surface-2); margin-top: 7px; }\r
.a4 .tile.t1 > span { background: var(--rf-accent-soft); color: var(--rf-accent); box-shadow: inset 0 0 0 2px var(--rf-accent); }\r
.d-insp { flex: 0 0 0; min-width: 0; overflow: hidden; border-radius: 12px; background: var(--rf-surface); padding: 0; opacity: 0; transform: translateX(16px); transition: flex-basis .5s var(--rf-ease), opacity .35s, transform .5s var(--rf-ease); }\r
.a4 .d-insp { flex-basis: 44%; padding: 12px; opacity: 1; transform: none; }\r
.d-hero { height: 78px; border-radius: 9px; background: var(--rf-surface-2); display: flex; align-items: center; justify-content: center; color: var(--rf-muted); }\r
.d-title { display: block; height: 10px; width: 60%; border-radius: 5px; background: var(--rf-surface-3); margin: 12px 0 10px; }\r
.d-rows i { display: block; height: 20px; border-radius: 6px; background: var(--rf-surface-2); margin-bottom: 7px; opacity: 0; transform: translateY(6px); transition: opacity .3s, transform .5s var(--rf-spring); }\r
.a4 .d-rows i { opacity: 1; transform: none; }\r
.a4 .d-rows i:nth-child(2) { transition-delay: .08s; } .a4 .d-rows i:nth-child(3) { transition-delay: .16s; } .a4 .d-rows i:nth-child(4) { transition-delay: .24s; }\r
.d-cursor { position: absolute; left: 0; top: 0; opacity: 0; pointer-events: none; transform: translate(380px, 260px); transition: transform .9s var(--rf-ease), opacity .3s; filter: drop-shadow(0 2px 3px rgb(0 0 0 / .3)); z-index: 3; }\r
.a2 .d-cursor { opacity: 1; transform: translate(410px, 112px); }\r
.a3 .d-cursor { transform: translate(410px, 112px) scale(.88); }\r
.a4 .d-cursor { transform: translate(170px, 215px); }\r
.rm .demo, .rm .d-cursor, .rm .tile, .rm .d-insp { transition-duration: .01s; }\r
@media (max-width: 900px) { .wl { grid-template-columns: 1fr; } .wl-right { display: none; } .wl-left { margin: 0 auto; padding: 6vh 6vw; } }\r
\r
/* ---- "Wearing now" panel shown when saved outfits are private ------------------------------------------- */\r
\r
/* ---- motion v3 & polish ---------------------------------------------------------------------------\r
   One layer on top of everything above, so it can be read (and reverted) as a unit.\r
   - Springs are re-tuned to be near-critically damped: ~2% overshoot instead of ~16%. Still physical, never wobbly.\r
   - Distinct gestures per component (press, pop, settle, burst) instead of one bounce everywhere.\r
   - Inspector entrance is choreographed: surface \u2192 preview \u2192 title/meta \u2192 cost \u2192 sections, each a beat apart,\r
     and every part is interactive from frame one (only transform/opacity animate; nothing waits).\r
   - All travel still reads --rf-* distances, so Balanced shortens it and Calm (.rm) zeroes it automatically. */\r
.rf {\r
  --rf-spring: linear(0, .0175, .0659 2.3%, .1381 3.6%, .4245 8%, .5574 10.3%, .6763, .7759 15.1%, .8541 17.7%, .9147 20.5%, .9568 23.4%, .9837 26.4%, 1.0007 29.6%, 1.0153 34.4%, 1.0198 40%, 1.0168 46.6%, 1.0056 59.3%, .9994 74.2%, 1);\r
  /* a livelier spring reserved for small confirmations (save, pick, toast) */\r
  --rf-spring-pop: linear(0, .039, .157 3.7%, .629 10.6%, .82 14%, .953 17.4%, 1.044 21%, 1.098 24.9%, 1.114 28.3%, 1.108 31.5%, 1.064 37.3%, 1.008 46.3%, .988 53.2%, .995 66.4%, 1);\r
  --rf-beat: 45ms;\r
  --rf-elev-1: 0 1px 2px rgb(0 0 0 / .06), 0 2px 8px rgb(0 0 0 / .06);\r
  --rf-elev-2: 0 2px 6px rgb(0 0 0 / .08), 0 12px 28px rgb(0 0 0 / .14);\r
  --rf-elev-3: 0 8px 20px rgb(0 0 0 / .14), 0 28px 60px rgb(0 0 0 / .26);\r
  --rf-ring: 0 0 0 2px var(--rf-bg), 0 0 0 4px var(--rf-accent);\r
}\r
.rf.mb { --rf-spring-pop: var(--rf-ease); --rf-beat: 20ms; }\r
.rf.rm { --rf-spring-pop: var(--rf-ease); --rf-beat: 0ms; }\r
\r
/* type: slightly tighter headings, tabular numbers anywhere a count can change under the cursor */\r
.rf-iname-h { letter-spacing: -.012em; text-wrap: balance; }\r
.rf-count, .rf-tabs em, .rf-cost-n, .rf-progress + * { font-variant-numeric: tabular-nums; }\r
.rf-empty h3, .rf-dialog h3 { text-wrap: balance; letter-spacing: -.005em; }\r
.rf-empty p, .rf-dialog p { text-wrap: pretty; }\r
\r
/* ---- buttons: a press you can feel, a release that settles ------------------------------------- */\r
.rf-btn, .rf-ib { transition: background .14s, color .14s, box-shadow .18s, transform .32s var(--rf-spring); will-change: auto; }\r
.rf-btn:active:not(:disabled), .rf-ib:active:not(:disabled) { transition: background .06s, transform .07s var(--rf-ease); }\r
.rf-btn.primary { box-shadow: 0 1px 0 rgb(255 255 255 / .12) inset, 0 1px 2px rgb(0 0 0 / .18); }\r
.rf-btn.primary:hover:not(:disabled) { box-shadow: 0 1px 0 rgb(255 255 255 / .12) inset, 0 4px 14px color-mix(in srgb, var(--rf-accent) 36%, transparent); }\r
.rf-btn .rf-ico, .rf-ib .rf-ico { transition: transform .32s var(--rf-spring); }\r
.rf-ib:hover:not(:disabled) .rf-ico { transform: scale(1.08); }\r
.rf-ib:active:not(:disabled) .rf-ico { transform: scale(.9); transition-duration: .07s; }\r
/* toggled-on buttons (Save \u2192 Saved, filters): icon pops with a soft ring burst */\r
.rf-btn.on { box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--rf-accent) 30%, transparent); }\r
.rf-btn.on .rf-ico { animation: rf-pop-ico .46s var(--rf-spring-pop); }\r
@keyframes rf-pop-ico { 0% { transform: scale(.55) rotate(-12deg); } 60% { transform: scale(1.12) rotate(3deg); } }\r
.rf-btn.on::after { content: ''; position: absolute; inset: 0; border-radius: inherit; pointer-events: none; box-shadow: 0 0 0 0 color-mix(in srgb, var(--rf-accent) 45%, transparent); animation: rf-burst .6s var(--rf-ease) both; }\r
@keyframes rf-burst { to { box-shadow: 0 0 0 10px transparent; } }\r
.rf.rm .rf-btn.on::after, .rf.mb .rf-btn.on::after { animation: none; }\r
.rf.rm .rf-btn.on .rf-ico { animation: none; }\r
\r
/* focus: a two-tone ring that works on any surface, light or dark */\r
.rf :focus-visible { outline: none; box-shadow: var(--rf-ring); transition: box-shadow .12s; }\r
.rf .rf-search input:focus-visible { box-shadow: none; }\r
\r
/* ---- segmented controls & tabs: thumbs ride the spring, labels cross-fade ---------------------- */\r
.rf-seg::before { transition: transform .42s var(--rf-spring), width .42s var(--rf-spring); }\r
.rf-tabs::after { height: 3px; border-radius: 3px 3px 0 0; background: var(--rf-accent); transition: transform .44s var(--rf-spring), width .44s var(--rf-spring); }\r
.rf-tabs button { transition: color .18s; }\r
.rf-tabs button .rf-ico { transition: transform .3s var(--rf-spring); }\r
.rf-tabs button.on .rf-ico { transform: translateY(-1px); }\r
.rf-tabs em { transition: background .2s, color .2s; }\r
.rf-tabs button.on em { background: var(--rf-accent-soft); color: var(--rf-accent); }\r
\r
/* ---- search: the field grows when it has your attention --------------------------------------- */\r
.rf-search { transition: box-shadow .18s, background .18s, flex-basis .36s var(--rf-ease), max-width .36s var(--rf-ease); }\r
.rf-search:focus-within { max-width: 460px; flex-basis: 300px; box-shadow: 0 0 0 2px var(--rf-accent), var(--rf-elev-1); }\r
.rf-search > .rf-ico { transition: transform .3s var(--rf-spring), color .15s; }\r
.rf-search:focus-within > .rf-ico { transform: scale(1.1); color: var(--rf-accent); }\r
.rf-clear { animation: rf-pop .22s var(--rf-ease) backwards; }\r
\r
/* ---- explorer cards ---------------------------------------------------------------------------- */\r
.rf-card { transition: background .16s, box-shadow .2s, transform .34s var(--rf-spring); }\r
.rf-card:hover { box-shadow: var(--rf-elev-1); }\r
.rf-thumb { transition: transform .38s var(--rf-spring), box-shadow .2s; }\r
.rf-card:hover .rf-thumb { box-shadow: 0 8px 18px -10px rgb(0 0 0 / .35); }\r
.rf-thumb img { transition: opacity .3s, transform .5s var(--rf-ease); }\r
.rf-card:hover .rf-thumb.loaded img { transform: scale(1.035); }\r
.rf-grid.list .rf-card:hover .rf-thumb.loaded img { transform: none; }\r
.rf-card:active .rf-thumb { transition: transform .08s var(--rf-ease); }\r
.rf-card-name { transition: color .15s; }\r
.rf-card:hover .rf-card-name { color: var(--rf-fg); }\r
/* the open outfit is anchored with an accent rail, so you can see where the inspector came from */\r
.rf-cell.active .rf-card { background: var(--rf-accent-soft); box-shadow: inset 0 0 0 1.5px color-mix(in srgb, var(--rf-accent) 55%, transparent); }\r
.rf-cell.active .rf-thumb { box-shadow: 0 0 0 2px var(--rf-accent); }\r
/* multi-select: card sinks slightly, ring draws in, check pops */\r
.rf-cell.picked .rf-card { transform: scale(.975); box-shadow: inset 0 0 0 2px var(--rf-accent), 0 0 0 4px color-mix(in srgb, var(--rf-accent) 16%, transparent); }\r
.rf.rm .rf-cell.picked .rf-card { transform: none; }\r
.rf-pick { transition: opacity .14s, transform .4s var(--rf-spring-pop), background .14s, border-color .14s; }\r
.rf-cell.picked .rf-pick { animation: rf-pick .42s var(--rf-spring-pop); }\r
.rf-cell.picked .rf-pick svg { animation: rf-check .32s .05s var(--rf-ease) backwards; }\r
@keyframes rf-pick { 0% { transform: scale(.6); } }\r
@keyframes rf-check { from { opacity: 0; transform: scale(.4) rotate(-20deg); } }\r
.rf.rm .rf-cell.picked .rf-pick, .rf.rm .rf-cell.picked .rf-pick svg { animation: none; }\r
.rf-badge { transition: transform .3s var(--rf-spring); animation: rf-pick .4s var(--rf-spring-pop) backwards; }\r
.rf-card:hover .rf-badge { transform: translateY(var(--rf-lift)); }\r
/* density/layout switches are FLIP-animated in JS; give grid gap changes a matching ease */\r
.rf-grid { transition: gap .3s var(--rf-ease); }\r
/* first load cascade: fewer, tighter beats, with a little lift */\r
.rf-grid.intro .rf-cell { animation: rf-card-in .5s var(--rf-spring) backwards; animation-delay: calc(min(var(--i, 0), 18) * 22ms); }\r
@keyframes rf-card-in { from { opacity: 0; transform: translateY(calc(var(--rf-dy-s) * 1.5)) scale(var(--rf-pop)); } }\r
/* skeletons: a softer sweep that doesn't flicker against Roblox's own shimmer */\r
.rf-skel { background: linear-gradient(105deg, transparent 30%, color-mix(in srgb, var(--rf-fg) 7%, transparent) 50%, transparent 70%) var(--rf-surface); background-size: 220% 100%; animation-duration: 1.6s; animation-timing-function: var(--rf-ease); }\r
\r
/* selection tray: rises with the spring, its count ticks */\r
.rf-tray { box-shadow: var(--rf-elev-3); border-color: color-mix(in srgb, var(--rf-accent) 25%, var(--rf-line)); backdrop-filter: saturate(1.2); animation: rf-tray-in .46s var(--rf-spring) backwards; }\r
@keyframes rf-tray-in { from { opacity: 0; transform: translateY(calc(var(--rf-dy) * 1.6)) scale(var(--rf-pop)); } }\r
.rf-tray b { display: inline-block; animation: rf-tick .3s var(--rf-ease) backwards; }\r
@keyframes rf-tick { from { opacity: .3; transform: translateY(var(--rf-drop)); } }\r
\r
/* empty / error states: icon floats in first, copy follows */\r
.rf-empty > * { animation: rf-rise .4s var(--rf-ease) backwards; }\r
.rf-empty > :nth-child(2) { animation-delay: calc(var(--rf-beat) * 1); }\r
.rf-empty > :nth-child(3) { animation-delay: calc(var(--rf-beat) * 2); }\r
.rf-empty > :nth-child(n+4) { animation-delay: calc(var(--rf-beat) * 3); }\r
.rf-empty > .rf-ico:first-child, .rf-empty > svg:first-child { color: var(--rf-accent); padding: 12px; box-sizing: content-box; border-radius: 16px; background: var(--rf-accent-soft); }\r
\r
/* ---- inspector choreography ------------------------------------------------------------------- */\r
.rf-dock[data-anim=enter] > .rf-insp { animation: rf-dock-in .42s var(--rf-spring) backwards; }\r
.rf-dock[data-anim=enter] .rf-ibar > * { animation: rf-fade .3s backwards; animation-delay: calc(var(--rf-beat) * 2); }\r
.rf-dock[data-anim=enter] .rf-hero > *,\r
.rf-dock[data-anim=switch] .rf-hero > :not(.rf-stage) { animation: rf-rise .42s var(--rf-ease) backwards; }\r
.rf-dock[data-anim=enter] .rf-hero > :nth-child(2), .rf-dock[data-anim=switch] .rf-hero > :nth-child(2) { animation-delay: calc(var(--rf-beat) * 2); }\r
.rf-dock[data-anim=enter] .rf-hero > :nth-child(3), .rf-dock[data-anim=switch] .rf-hero > :nth-child(3) { animation-delay: calc(var(--rf-beat) * 3); }\r
.rf-dock[data-anim=enter] .rf-hero > :nth-child(n+4), .rf-dock[data-anim=switch] .rf-hero > :nth-child(n+4) { animation-delay: calc(var(--rf-beat) * 4); }\r
.rf-dock[data-anim=enter] .rf-cost, .rf-dock[data-anim=switch] .rf-cost { animation: rf-rise .44s var(--rf-ease) backwards; animation-delay: calc(var(--rf-beat) * 5); }\r
.rf-dock[data-anim=enter] .rf-sec { animation: rf-rise .44s var(--rf-ease) backwards; animation-delay: calc(var(--rf-beat) * 6); }\r
.rf-dock[data-anim=enter] .rf-sec + .rf-sec { animation-delay: calc(var(--rf-beat) * 7); }\r
.rf-dock[data-anim=enter] .rf-sec + .rf-sec + .rf-sec ~ .rf-sec { animation-delay: calc(var(--rf-beat) * 8); }\r
/* switching outfits: the panel stays; the preview cross-dissolves with a small zoom, details re-settle */\r
.rf-dock[data-anim=switch] > .rf-insp > .rf-iscroll { animation: none; }\r
.rf-dock[data-anim=switch] .rf-stage .rf-thumb { animation: rf-swap .38s var(--rf-ease) backwards; }\r
@keyframes rf-swap { from { opacity: 0; transform: scale(calc(2 - var(--rf-pop))); } }\r
.rf-dock[data-anim=switch] .rf-sec { animation: rf-fade .3s calc(var(--rf-beat) * 4) backwards; }\r
.rf-dock[data-anim=exit] > .rf-insp { animation: rf-dock-out .24s var(--rf-ease-in) both; }\r
\r
/* inspector surfaces */\r
.rf-stage { box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--rf-fg) 6%, transparent); isolation: isolate; }\r
.rf-stage::after { content: ''; position: absolute; left: 18%; right: 18%; bottom: 7%; height: 9%; border-radius: 50%; z-index: -1;\r
  background: radial-gradient(closest-side, color-mix(in srgb, var(--rf-fg) 16%, transparent), transparent); }\r
.rf-ibar { position: relative; backdrop-filter: blur(8px); background: color-mix(in srgb, var(--rf-bg) 88%, transparent); z-index: 2; }\r
.rf-cost { box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--rf-fg) 5%, transparent); }\r
.rf-costbar .seg { transition: flex-grow .6s var(--rf-spring); transform-origin: left; animation: rf-bar .7s var(--rf-ease) backwards; }\r
.rf-costbar .seg:nth-child(2) { animation-delay: 40ms; } .rf-costbar .seg:nth-child(3) { animation-delay: 80ms; } .rf-costbar .seg:nth-child(n+4) { animation-delay: 120ms; }\r
@keyframes rf-bar { from { transform: scaleX(0); } }\r
.rf.rm .rf-costbar .seg { animation: rf-fade .3s backwards; }\r
.rf-sec-h { border-radius: 8px; margin: 0 8px; width: calc(100% - 16px); padding: 7px 12px; transition: background .14s; }\r
.rf-sec-b { padding-left: 20px; padding-right: 20px; }\r
.rf-sec + .rf-sec { border-top: 1px solid color-mix(in srgb, var(--rf-line) 60%, transparent); padding-top: 10px; }\r
.rf-chev { transition: transform .38s var(--rf-spring); }\r
.rf-collapse { transition: grid-template-rows .36s var(--rf-ease); }\r
\r
/* ---- menus, dialogs, toasts, tooltips -------------------------------------------------------- */\r
.rf-menu { box-shadow: var(--rf-elev-3); animation: rf-menu-in .24s var(--rf-spring) backwards; }\r
@keyframes rf-menu-in { from { opacity: 0; transform: scale(var(--rf-pop)) translateY(calc(var(--rf-drop) * -1)); } }\r
.rf-menu .rf-mi { animation: rf-fade .2s backwards; transition: background .1s, padding-left .2s var(--rf-ease); }\r
.rf-menu .rf-mi:nth-child(-n+3) { animation-delay: 20ms; } .rf-menu .rf-mi:nth-child(n+4) { animation-delay: 40ms; }\r
.rf-mi:hover:not(:disabled) { padding-left: 13px; }\r
.rf.rm .rf-mi:hover:not(:disabled) { padding-left: 10px; }\r
.rf-mi .rf-ico { transition: transform .26s var(--rf-spring); }\r
.rf-mi:hover:not(:disabled) .rf-ico { transform: scale(1.1); }\r
.rf-scrim { backdrop-filter: blur(3px); background: rgb(0 0 0 / .38); }\r
.rf-dialog { box-shadow: var(--rf-elev-3); border: 1px solid var(--rf-line); animation: rf-dialog-in .38s var(--rf-spring) backwards; }\r
@keyframes rf-dialog-in { from { opacity: 0; transform: translateY(var(--rf-dy-s)) scale(var(--rf-pop)); } }\r
.rf-toast { padding: 11px 18px 11px 14px; border-radius: 12px; animation: rf-toast .5s var(--rf-spring-pop) backwards; box-shadow: var(--rf-elev-3); }\r
.rf-toast > .rf-ico:first-child { animation: rf-pop-ico .5s .08s var(--rf-spring-pop) backwards; }\r
.rf.rm .rf-toast > .rf-ico:first-child { animation: none; }\r
[title]:where(.rf-ib) { position: relative; }\r
\r
/* ---- compare mirror: a slider you want to grab ------------------------------------------------- */\r
.rf-overlay { border-radius: 12px; overflow: hidden; }\r
.rf-overlay-line { width: 2px; background: linear-gradient(transparent, var(--rf-accent) 12%, var(--rf-accent) 88%, transparent); }\r
.rf-overlay-line::after { width: 34px; height: 34px; margin: -17px; border-width: 3px; box-shadow: var(--rf-elev-2);\r
  background: var(--rf-accent) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m9 7-5 5 5 5M15 7l5 5-5 5'/%3E%3C/svg%3E") center / 18px no-repeat;\r
  transition: transform .3s var(--rf-spring), box-shadow .2s; }\r
.rf-overlay:hover .rf-overlay-line::after { transform: scale(1.08); }\r
.rf-overlay:active .rf-overlay-line::after { transform: scale(.94); box-shadow: 0 0 0 8px color-mix(in srgb, var(--rf-accent) 22%, transparent); transition-duration: .1s; }\r
.rf-overlay-tag { box-shadow: var(--rf-elev-1); backdrop-filter: blur(6px); background: color-mix(in srgb, var(--rf-bg) 82%, transparent); transition: opacity .2s; }\r
.rf-compare .rf-thumb.loaded img { animation: rf-swap .36s var(--rf-ease) backwards; }\r
\r
/* ---- refresh line & progress: meaning, not decoration ----------------------------------------- */\r
.rf-progress { height: 5px; border-radius: 3px; }\r
.rf-progress i { border-radius: inherit; transition: transform .45s var(--rf-spring); background: linear-gradient(90deg, var(--rf-accent), color-mix(in srgb, var(--rf-accent) 70%, #fff)); }\r
.rf-refresh::after { background: linear-gradient(90deg, transparent, var(--rf-accent), transparent); }\r
\r
/* ---- narrow / mobile: the inspector becomes a sheet that rises over the grid --------------------- */\r
@media (max-width: 760px) {\r
  .rf-shell.narrow .rf-dock { border-radius: 16px 16px 0 0; top: 10px; box-shadow: 0 -10px 40px rgb(0 0 0 / .24); overflow: hidden; }\r
  .rf-shell.narrow .rf-dock::before { content: ''; position: absolute; top: 6px; left: 50%; width: 36px; height: 4px; margin-left: -18px; border-radius: 2px; background: var(--rf-surface-3); z-index: 3; }\r
  .rf-shell.narrow .rf-dock[data-anim=enter] > .rf-insp { animation: rf-sheet-up .44s var(--rf-spring) backwards; }\r
  .rf-shell.narrow .rf-dock[data-anim=exit] > .rf-insp { animation: rf-sheet-down .26s var(--rf-ease-in) both; }\r
  .rf-shell.narrow .rf-ibar { padding-top: 14px; }\r
  .rf-stage { height: clamp(200px, 42vh, 340px); }\r
  .rf-tray { left: 10px; right: 10px; bottom: 10px; }\r
  .rf-toolbar { gap: 6px; }\r
  .rf-search, .rf-search:focus-within { flex-basis: 100%; max-width: none; }\r
  .rf-btn, .rf-ib { min-height: 40px; }\r
  .rf-ib { min-width: 40px; }\r
  .rf-overlay-line::after { width: 40px; height: 40px; margin: -20px; }\r
}\r
@keyframes rf-sheet-up { from { transform: translateY(calc(var(--rf-dy) * 6)); opacity: 0; } }\r
@keyframes rf-sheet-down { to { transform: translateY(calc(var(--rf-dy) * 6)); opacity: 0; } }\r
@media (min-width: 1500px) {\r
  .rf-dock { width: min(560px, 38%); }\r
  .rf-stage { height: clamp(280px, 42vh, 440px); }\r
}\r
\r
/* Calm: same choreography order, no travel. Delays compress so nothing feels laggy. */\r
.rf.rm .rf-dock[data-anim] *, .rf.rm .rf-empty > * { animation-delay: 0s !important; }\r
.rf.rm .rf-card:hover .rf-thumb.loaded img { transform: none; }\r
.rf.rm .rf-search:focus-within > .rf-ico, .rf.rm .rf-ib:hover .rf-ico { transform: none; }\r
\r
/* ==== pass 2: popup (rebuilt component) ======================================================= */\r
.rf-pop2 { width: 340px; }\r
.rf-pop2 .rf-pop-h { gap: 4px; padding: 10px 6px 8px 12px; }\r
.rf-pop2 .rf-pop-h > b { margin-left: 5px; }\r
.rf-pop-status { display: inline-flex; align-items: center; gap: 5px; margin-left: 8px; padding: 2px 8px 2px 6px; border-radius: 99px; font-size: 11px; font-weight: 700; color: var(--rf-muted); background: var(--rf-surface); }\r
.rf-pop-status i { width: 7px; height: 7px; border-radius: 50%; background: currentColor; }\r
.rf-pop-status.ok i { background: #2fb36b; box-shadow: 0 0 0 0 rgb(47 179 107 / .5); animation: rf-pop-ping 2.4s var(--rf-ease) 1s 2; }\r
.rf-pop-status.off i, .rf-pop-status.bad i { background: #e2a03f; }\r
@keyframes rf-pop-ping { 70% { box-shadow: 0 0 0 6px rgb(47 179 107 / 0); } 100% { box-shadow: 0 0 0 0 rgb(47 179 107 / 0); } }\r
.rf-pop-clear { width: 22px; height: 22px; margin-right: -4px; animation: rf-pop .16s var(--rf-spring-pop, var(--rf-ease)) backwards; }\r
.rf-pop-banner { margin: 0 10px 6px; border-radius: 9px; background: color-mix(in srgb, #e2a03f 14%, var(--rf-bg)); }\r
.rf-pop-home, .rf-pop-results { animation: rf-rise .26s var(--rf-ease) backwards; }\r
.rf-pop-here { margin: 2px 10px 4px; }\r
.rf-pop-here .rf-pop-now { margin: 0; width: 100%; text-align: left; }\r
.rf-pop-acts { display: flex; gap: 6px; flex-wrap: wrap; padding: 8px 0 2px; }\r
.rf-pop-acts .rf-chip { cursor: pointer; display: inline-flex; align-items: center; gap: 5px; transition: transform .25s var(--rf-spring), background .15s, color .15s; animation: rf-rise .3s var(--rf-ease) backwards; }\r
.rf-pop-acts .rf-chip:nth-child(2) { animation-delay: 40ms; } .rf-pop-acts .rf-chip:nth-child(3) { animation-delay: 80ms; }\r
.rf-pop-acts .rf-chip:active { transform: scale(var(--rf-press)); }\r
.rf-pop-acts .rf-chip.on { background: var(--rf-accent-soft); color: var(--rf-accent); }\r
.rf-pop-tabs { margin: 8px 10px 4px; display: flex; width: calc(100% - 20px); }\r
.rf-pop-tabs button { flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 5px; }\r
.rf-pop-tabs em { font-style: normal; font-size: 10.5px; font-weight: 800; color: var(--rf-accent); }\r
.rf-pop-panel { padding: 2px 10px 4px; min-height: 132px; animation: rf-pop-panel .28s var(--rf-ease) backwards; }\r
@keyframes rf-pop-panel { from { opacity: 0; transform: translateX(var(--rf-dx)); } }\r
.rf-pop-item { display: flex; align-items: center; gap: 2px; animation: rf-rise .32s var(--rf-ease) backwards; animation-delay: calc(40ms + var(--i, 0) * 35ms); }\r
.rf-pop-item > .rf-pop-row { animation: none; flex: 1; min-width: 0; }\r
.rf-pop-row:focus-visible, .rf-pop-side:focus-visible { outline: 2px solid var(--rf-accent); outline-offset: -2px; }\r
.rf-pop-name { overflow: hidden; } .rf-pop-name, .rf-pop-name small { white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }\r
.rf-pop-av:not(.ic) { color: #fff; font-weight: 800; font-size: 13px; background: hsl(var(--h, 210) 55% 46%); }\r
.rf-pop-th { width: 38px; height: 38px; flex: none; border-radius: 9px; overflow: hidden; background: var(--rf-surface-3); display: flex; align-items: center; justify-content: center; color: var(--rf-muted); transition: transform .3s var(--rf-spring); }\r
.rf-pop-th img { width: 100%; height: 100%; object-fit: cover; }\r
.rf-pop-row:hover .rf-pop-th { transform: scale(1.06) rotate(-2deg); }\r
.rf-pop-side { opacity: 0; transition: opacity .15s; } .rf-pop-item:hover .rf-pop-side, .rf-pop-side:focus-visible { opacity: 1; }\r
.rf-pop-empty { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 4px; padding: 16px 18px 12px; color: var(--rf-muted); font-size: 12.5px; animation: rf-pop .3s var(--rf-spring) backwards; }\r
.rf-pop-empty b { color: var(--rf-fg); font-size: 13.5px; }\r
.rf-pop-empty .rf-btn { margin-top: 6px; }\r
.rf-pop-empty-ic { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: var(--rf-accent-soft); color: var(--rf-accent); margin-bottom: 4px; }\r
.rf-pop-skels { display: flex; flex-direction: column; gap: 8px; padding-top: 6px; }\r
.rf-pop-skels .rf-skel { height: 40px; border-radius: 10px; position: relative; overflow: hidden; }\r
.rf-pop-lib em { font-style: normal; margin-left: auto; color: var(--rf-muted); font-weight: 500; font-size: 12px; }\r
\r
/* ==== pass 2: the mirror (Compare rebuilt) ===================================================== */\r
.rf-mirror { display: grid; grid-template-columns: minmax(0, 1fr) 150px minmax(0, 1fr); gap: 18px; align-items: center; margin-bottom: 22px; }\r
.rf-mirror.blend { grid-template-columns: 1fr; justify-items: center; }\r
.rf-mside { margin: 0; display: flex; flex-direction: column; gap: 10px; min-width: 0; }\r
.rf-mside figcaption { display: flex; flex-direction: column; gap: 3px; align-items: flex-start; }\r
.rf-mside.b figcaption { align-items: flex-end; text-align: right; }\r
.rf-mside figcaption b { font-size: 16px; }\r
.rf-mstage { height: clamp(280px, 48vh, 520px); will-change: transform; box-shadow: var(--rf-elev-1, none); }\r
.rf-mside.a .rf-mstage { box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--rf-accent) 35%, transparent); }\r
.rf-mside.b .rf-mstage { box-shadow: inset 0 0 0 2px color-mix(in srgb, #e2a03f 40%, transparent); }\r
.rf-mid { display: flex; flex-direction: column; align-items: center; gap: 12px; }\r
.rf-mid-n { display: flex; gap: 10px; font-size: 12px; font-weight: 700; font-variant-numeric: tabular-nums; }\r
.rf-mid-n span { display: inline-flex; align-items: center; gap: 4px; }\r
.rf-mid-n i, .rf-mirror-legend span::before { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }\r
.rf-mid-n i.a, .rf-mirror-legend .a::before { background: var(--rf-accent); } .rf-mid-n i.b, .rf-mirror-legend .b::before { background: #e2a03f; } .rf-mid-n i.both { background: var(--rf-muted); }\r
.rf-mirror-legend span::before { content: ''; }\r
.rf-simring { position: relative; width: 120px; height: 120px; display: flex; flex-direction: column; align-items: center; justify-content: center; }\r
.rf-simring svg { position: absolute; inset: 0; transform: rotate(-90deg); }\r
.rf-simring circle { fill: none; stroke-width: 6; }\r
.rf-simring .bg { stroke: var(--rf-surface-3); }\r
.rf-simring .fg { stroke: var(--rf-accent); stroke-linecap: round; transition: stroke-dashoffset .9s var(--rf-spring); animation: rf-ring-in 1s var(--rf-ease) backwards; }\r
@keyframes rf-ring-in { from { stroke-dashoffset: 214; } }\r
.rf-simring b { font-size: 34px; font-weight: 800; line-height: 1; letter-spacing: -.02em; font-variant-numeric: tabular-nums; }\r
.rf-simring b small { font-size: 15px; color: var(--rf-muted); }\r
.rf-simring span { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--rf-muted); }\r
.rf-wipe { position: relative; width: min(100%, 620px); height: clamp(320px, 58vh, 600px); user-select: none; touch-action: pan-y; cursor: ew-resize; overflow: hidden; will-change: transform; }\r
.rf-wipe.grab { cursor: grabbing; }\r
.rf-wipe-l, .rf-wipe-r { position: absolute; inset: 0; }\r
.rf-wipe-r { clip-path: inset(0 0 0 var(--pos)); background: var(--rf-surface); }\r
.rf-wipe .rf-thumb { position: absolute; inset: 0; aspect-ratio: auto; background: none; border-radius: 0; }\r
.rf-wipe .rf-thumb img { width: 100%; height: 100%; object-fit: contain; }\r
.rf-wipe-h { position: absolute; top: 0; bottom: 0; left: var(--pos); width: 44px; margin-left: -22px; display: flex; align-items: center; justify-content: center; outline: none; }\r
.rf-wipe-h::before { content: ''; position: absolute; top: 0; bottom: 0; left: 21px; width: 2px; background: var(--rf-accent); box-shadow: 0 0 12px rgb(0 0 0 / .25); }\r
.rf-wipe-k { position: relative; width: 34px; height: 34px; border-radius: 50%; background: var(--rf-accent); color: var(--rf-accent-fg); display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 18px rgb(0 0 0 / .3); transition: transform .3s var(--rf-spring-pop, var(--rf-spring)); }\r
.rf-wipe:hover .rf-wipe-k, .rf-wipe.grab .rf-wipe-k { transform: scale(1.12); }\r
.rf-wipe-h:focus-visible .rf-wipe-k { outline: 2px solid var(--rf-fg); outline-offset: 3px; }\r
/* Keyboard/double-click steps glide with a soft spring; pointer drags track the finger 1:1. */\r
.rf-wipe.glide .rf-wipe-r { transition: clip-path .34s var(--rf-spring); }\r
.rf-wipe.glide .rf-wipe-h { transition: left .34s var(--rf-spring); }\r
.rf-overlay-tag.l { left: 10px; } .rf-overlay-tag.r { right: 10px; }\r
.rf-wipe .rf-overlay-tag { transition: opacity .2s; }\r
.rf-mirror-legend { display: flex; align-items: center; gap: 16px; font-size: 13px; font-weight: 600; }\r
.rf-mirror-legend span { display: inline-flex; align-items: center; gap: 6px; }\r
.rf-mirror-legend b { padding: 3px 10px; border-radius: 99px; background: var(--rf-accent-soft); color: var(--rf-accent); font-size: 12px; }\r
.rf-swapico { display: inline-flex; transform: rotate(calc(var(--turn, 0) * 180deg)); transition: transform .5s var(--rf-spring); }\r
.rf-lens { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; }\r
.rf-lens .rf-chip { cursor: pointer; display: inline-flex; align-items: center; gap: 6px; max-width: 260px; transition: background .15s, color .15s, transform .25s var(--rf-spring); }\r
.rf-lens .rf-chip:active { transform: scale(var(--rf-press)); }\r
.rf-lens .rf-chip.on { background: var(--rf-fg); color: var(--rf-bg); }\r
.rf-lens .rf-chip.lens-a.on { background: var(--rf-accent); color: var(--rf-accent-fg); }\r
.rf-lens .rf-chip.lens-b.on { background: #e2a03f; color: #111; }\r
.rf-lens-t { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\r
.rf-lens em { font-style: normal; font-weight: 800; font-variant-numeric: tabular-nums; opacity: .8; }\r
.rf-cols3:not(.lens-all) { grid-template-columns: 1fr; }\r
.rf-cols3:not(.lens-all) .rf-ccol { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 4px 12px; align-content: start; }\r
.rf-cols3:not(.lens-all) .rf-ccol h3 { grid-column: 1 / -1; }\r
.rf-ccol { animation: rf-rise .3s var(--rf-ease) backwards; }\r
.rf-crow { position: relative; animation: rf-rise .3s var(--rf-ease) backwards; animation-delay: calc(var(--i, 0) * 22ms); }\r
.rf-owned { margin-left: auto; color: #2fb36b; display: inline-flex; }\r
.rf-ccost h3, .rf-cdetails h3 { display: flex; align-items: center; gap: 6px; }\r
.rf-cbarrow { display: grid; grid-template-columns: minmax(0, 9em) 1fr auto; gap: 10px; align-items: center; margin: 6px 0; font-size: 13px; }\r
.rf-cbarrow span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }\r
.rf-cbarrow i { height: 8px; border-radius: 99px; background: var(--rf-surface-3); position: relative; overflow: hidden; }\r
.rf-cbarrow i::after { content: ''; position: absolute; inset: 0; border-radius: inherit; transform-origin: left; transform: scaleX(var(--w, 0)); transition: transform .8s var(--rf-spring); animation: rf-bar-in .9s var(--rf-ease) backwards; background: var(--rf-accent); }\r
.rf-cbarrow.b i::after { background: #e2a03f; }\r
@keyframes rf-bar-in { from { transform: scaleX(0); } }\r
.rf-scalediff em { font-style: normal; font-weight: 700; font-size: 12px; margin-left: auto; }\r
.rf-scalediff em.up { color: #2fb36b; } .rf-scalediff em.down { color: #e2a03f; }\r
@media (max-width: 760px) {\r
  .rf-mirror:not(.blend) { grid-template-columns: 1fr 1fr; gap: 12px; }\r
  .rf-mirror:not(.blend) .rf-mid { grid-column: 1 / -1; order: -1; flex-direction: row; justify-content: center; gap: 18px; }\r
  .rf-simring { width: 84px; height: 84px; } .rf-simring b { font-size: 24px; }\r
  .rf-mstage { height: clamp(200px, 36vh, 320px); }\r
  .rf-wipe { height: clamp(280px, 52vh, 460px); }\r
  .rf-mside.b figcaption { align-items: flex-start; text-align: left; }\r
}\r
.rm .rf-simring .fg, .rm .rf-cbarrow i::after, .rm .rf-swapico, .rm .rf-wipe.glide .rf-wipe-r, .rm .rf-wipe.glide .rf-wipe-h { transition: none; animation: none; }\r
\r
/* ==== pass 2: welcome story (one persistent miniature, six moments) =========================== */\r
.wl2 .wl-actions .rf-btn.primary .rf-ico { transition: transform .3s var(--rf-spring); }\r
.wl2 .wl-actions .rf-btn.primary:hover .rf-ico { transform: translateX(3px); }\r
.wl-keys { display: inline-flex; align-items: center; gap: 4px; color: var(--rf-muted); font-size: 12.5px; }\r
.wl-story { width: min(600px, 100%); display: flex; flex-direction: column; gap: 16px; animation: rf-rise .8s var(--rf-spring) .3s backwards; }\r
.ws-stage { position: relative; }\r
.ws-win { border-radius: 16px; background: var(--rf-bg); box-shadow: 0 30px 80px rgb(0 0 0 / .28), 0 0 0 1px var(--rf-line); overflow: hidden; }\r
.ws-bar { display: flex; align-items: center; gap: 6px; padding: 9px 12px; background: var(--rf-surface); font-size: 11px; color: var(--rf-muted); }\r
.ws-bar i { width: 9px; height: 9px; border-radius: 50%; background: var(--rf-surface-3); }\r
.ws-bar span { margin-left: 10px; padding: 2px 10px; border-radius: 99px; background: var(--rf-bg); }\r
.ws-head { display: flex; align-items: center; gap: 10px; padding: 12px 16px 0; font-size: 13px; }\r
.ws-head small { display: block; color: var(--rf-muted); font-size: 11px; }\r
.ws-av { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, hsl(210 60% 55%), hsl(260 55% 55%)); }\r
.ws-tabs { position: relative; display: flex; gap: 16px; margin-left: auto; font-size: 12px; font-weight: 600; color: var(--rf-muted); padding-bottom: 8px; }\r
.ws-tab-o { display: inline-flex; gap: 4px; align-items: center; transition: color .3s; }\r
.ws-tab-o em { font-style: normal; font-size: 10px; padding: 0 5px; border-radius: 99px; background: var(--rf-accent-soft); color: var(--rf-accent); }\r
.ws-ul { position: absolute; bottom: 0; left: 0; width: 38px; height: 2px; border-radius: 2px; background: var(--rf-accent); transform: translateX(var(--ul-x, 0)); transition: transform .55s var(--rf-spring), width .55s var(--rf-spring); }\r
.wl-story:not([data-step=discover]) .ws-ul { --ul-x: 132px; width: 58px; }\r
.wl-story:not([data-step=discover]) .ws-tab-o { color: var(--rf-fg); }\r
.ws-body { position: relative; aspect-ratio: 16 / 10; margin-top: 2px; border-top: 1px solid var(--rf-line); }\r
.ws-grid { position: absolute; left: 4%; top: 6%; width: 92%; height: 88%; display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 1fr); gap: 3%; transition: opacity .5s var(--rf-ease), transform .6s var(--rf-spring), filter .5s; transform-origin: left center; }\r
.ws-tile { position: relative; border-radius: 10px; background: color-mix(in srgb, hsl(var(--h) 60% 55%) 16%, var(--rf-surface)); overflow: hidden; display: flex; align-items: center; justify-content: center; animation: ws-tile-in .6s var(--rf-spring) backwards; animation-delay: calc(500ms + var(--i) * 70ms); }\r
.ws-tile b { position: absolute; left: 8%; right: 30%; bottom: 7%; height: 7%; border-radius: 3px; background: color-mix(in srgb, var(--rf-fg) 18%, transparent); }\r
@keyframes ws-tile-in { from { opacity: 0; transform: translateY(14px) scale(.94); } }\r
.ws-fig { position: relative; width: 34%; height: 70%; display: block; }\r
.ws-fig i { position: absolute; left: 50%; background: hsl(var(--h) 60% 52%); border-radius: 4px; transform: translateX(-50%); }\r
.ws-fig i:nth-child(1) { top: 0; width: 46%; aspect-ratio: 1; border-radius: 30%; background: hsl(36 60% 74%); }\r
.ws-fig i:nth-child(2) { top: 28%; width: 82%; height: 36%; }\r
.ws-fig i:nth-child(3) { top: 64%; width: 62%; height: 34%; background: hsl(var(--h) 35% 30%); }\r
.ws-fig.big { width: 30%; height: 64%; }\r
.ws-hero, .ws-twin { position: absolute; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: radial-gradient(120% 90% at 50% 10%, color-mix(in srgb, hsl(var(--h) 60% 55%) 24%, var(--rf-surface)), var(--rf-surface)); transition: left .7s var(--rf-spring), top .7s var(--rf-spring), width .7s var(--rf-spring), height .7s var(--rf-spring), opacity .35s var(--rf-ease), box-shadow .4s, border-radius .5s; }\r
.ws-hero { left: 35.7%; top: 6%; width: 28.6%; height: 42.5%; opacity: 0; z-index: 2; }\r
.ws-twin { left: 96%; top: 6%; width: 42%; height: 88%; opacity: 0; z-index: 1; }\r
.ws-panel { position: absolute; left: 52%; top: 6%; width: 44%; height: 88%; padding: 4% 4.5%; border-radius: 12px; background: var(--rf-surface); display: flex; flex-direction: column; gap: 7px; opacity: 0; transform: translateX(16px); transition: opacity .4s var(--rf-ease), transform .6s var(--rf-spring), left .7s var(--rf-spring), width .7s var(--rf-spring); font-size: 12px; overflow: hidden; }\r
.ws-title { font-size: 15px; letter-spacing: -.01em; }\r
.ws-cost { display: inline-flex; align-items: center; gap: 5px; font-weight: 700; } .ws-cost em { font-style: normal; color: var(--rf-muted); font-weight: 500; }\r
.ws-chips { display: flex; gap: 5px; } .ws-chips i { height: 14px; width: 22%; border-radius: 99px; background: var(--rf-surface-3); }\r
.ws-items { list-style: none; display: flex; flex-direction: column; gap: 5px; margin: 2px 0 0; padding: 0; }\r
.ws-items li { display: flex; align-items: center; gap: 7px; opacity: 0; transform: translateY(6px); transition: opacity .3s var(--rf-ease), transform .45s var(--rf-spring); transition-delay: calc(var(--i) * 70ms); }\r
.ws-items li span { width: 20px; height: 20px; border-radius: 5px; background: var(--rf-surface-3); flex: none; }\r
.ws-items li b { height: 7px; flex: 1; border-radius: 3px; background: color-mix(in srgb, var(--rf-fg) 16%, transparent); }\r
.ws-items li em { width: 18%; height: 7px; border-radius: 3px; background: var(--rf-accent-soft); }\r
.ws-save { margin-top: auto; display: inline-flex; align-items: center; gap: 6px; align-self: flex-start; padding: 6px 12px; border-radius: 99px; background: var(--rf-accent); color: var(--rf-accent-fg); font-weight: 700; transition: transform .4s var(--rf-spring-pop, var(--rf-spring)), background .3s; }\r
.ws-save .rf-ico:last-child { display: none; }\r
.ws-sim, .ws-wipe { position: absolute; opacity: 0; transition: opacity .4s var(--rf-ease), transform .6s var(--rf-spring); }\r
.ws-sim { left: 50%; top: 50%; transform: translate(-50%, -50%) scale(.6); z-index: 3; width: 64px; height: 64px; border-radius: 50%; background: var(--rf-bg); box-shadow: 0 8px 24px rgb(0 0 0 / .2), inset 0 0 0 4px var(--rf-accent); display: flex; flex-direction: column; align-items: center; justify-content: center; line-height: 1; }\r
.ws-sim b { font-size: 16px; } .ws-sim small { font-size: 9px; color: var(--rf-muted); text-transform: uppercase; font-weight: 700; }\r
.ws-wipe { top: 6%; height: 88%; left: 50%; width: 2px; background: var(--rf-accent); z-index: 3; }\r
.ws-lib { position: absolute; right: 4%; bottom: 5%; display: inline-flex; align-items: center; gap: 5px; padding: 5px 10px; border-radius: 99px; background: var(--rf-surface); font-size: 11.5px; font-weight: 700; opacity: 0; transform: translateY(8px); transition: opacity .3s, transform .5s var(--rf-spring); z-index: 4; }\r
.ws-lib em { font-style: normal; color: var(--rf-accent); opacity: 0; transition: opacity .3s .5s; }\r
.ws-cursor { position: absolute; left: 60%; top: 22%; z-index: 5; filter: drop-shadow(0 2px 3px rgb(0 0 0 / .3)); transition: left .8s var(--rf-spring), top .8s var(--rf-spring), opacity .3s; }\r
/* moments */\r
.wl-story[data-step=discover] .ws-cursor { left: 82%; top: 17%; }\r
.wl-story[data-step=open] .ws-hero { opacity: 1; box-shadow: 0 18px 40px rgb(0 0 0 / .28); }\r
.wl-story[data-step=open] .ws-cursor { left: 50%; top: 40%; }\r
.wl-story[data-step=open] .ws-grid { filter: saturate(.6); }\r
.wl-story:is([data-step=inspect], [data-step=explore], [data-step=compare], [data-step=save]) .ws-grid { opacity: 0; transform: scale(.92); pointer-events: none; }\r
.wl-story:is([data-step=inspect], [data-step=explore]) .ws-hero { opacity: 1; left: 4%; top: 6%; width: 44%; height: 88%; }\r
.wl-story:is([data-step=inspect], [data-step=explore]) .ws-panel { opacity: 1; transform: none; }\r
.wl-story[data-step=inspect] .ws-items li:nth-child(-n+2) { opacity: 1; transform: none; }\r
.wl-story[data-step=inspect] .ws-cursor { left: 74%; top: 34%; }\r
.wl-story[data-step=explore] .ws-hero { width: 36%; }\r
.wl-story[data-step=explore] .ws-panel { left: 44%; width: 52%; }\r
.wl-story[data-step=explore] .ws-items li { opacity: 1; transform: none; }\r
.wl-story[data-step=explore] .ws-cursor { left: 70%; top: 70%; }\r
.wl-story[data-step=compare] .ws-hero { opacity: 1; left: 5%; top: 6%; width: 42%; height: 88%; }\r
.wl-story[data-step=compare] .ws-twin { opacity: 1; left: 53%; }\r
.wl-story[data-step=compare] .ws-sim { opacity: 1; transform: translate(-50%, -50%) scale(1); transition-delay: .35s; }\r
.wl-story[data-step=compare] .ws-wipe { opacity: .9; animation: ws-sweep 2.6s var(--rf-ease) .5s both; }\r
@keyframes ws-sweep { 0% { transform: translateX(0); } 40% { transform: translateX(-160px); } 75% { transform: translateX(140px); } 100% { transform: translateX(0); } }\r
.wl-story[data-step=compare] .ws-cursor { left: 52%; top: 80%; }\r
.wl-story[data-step=save] .ws-hero { opacity: 1; left: 76%; top: 64%; width: 18%; height: 22%; border-radius: 9px; box-shadow: 0 10px 26px rgb(0 0 0 / .25); }\r
.wl-story[data-step=save] .ws-panel { opacity: .5; transform: none; left: 4%; width: 60%; }\r
.wl-story[data-step=save] .ws-save { transform: scale(1.06); background: #2fb36b; }\r
.wl-story[data-step=save] .ws-save .rf-ico:first-child { display: none; } .wl-story[data-step=save] .ws-save .rf-ico:last-child { display: inline-flex; }\r
.wl-story[data-step=save] .ws-lib { opacity: 1; transform: none; } .wl-story[data-step=save] .ws-lib em { opacity: 1; }\r
.wl-story[data-step=save] .ws-cursor { left: 18%; top: 84%; }\r
.ws-caption { display: flex; gap: 12px; align-items: flex-start; min-height: 64px; }\r
.ws-caption > div { animation: rf-rise .45s var(--rf-ease) backwards; }\r
.ws-caption b { font-size: 16px; } .ws-caption p { color: var(--rf-muted); font-size: 14px; margin: 2px 0 0; max-width: 46ch; }\r
.ws-cap-ic { width: 34px; height: 34px; flex: none; border-radius: 10px; display: flex; align-items: center; justify-content: center; background: var(--rf-accent-soft); color: var(--rf-accent); animation: rf-pop .4s var(--rf-spring) backwards; }\r
.ws-ctrl { display: flex; align-items: center; gap: 10px; }\r
.ws-dots { display: flex; gap: 6px; flex: 1; }\r
.ws-dots button { flex: 1; height: 18px; display: flex; align-items: center; cursor: pointer; background: none; border: 0; padding: 0; }\r
.ws-dots button i { position: relative; display: block; width: 100%; height: 4px; border-radius: 99px; background: var(--rf-surface-3); overflow: hidden; transition: height .2s; }\r
.ws-dots button:hover i { height: 6px; }\r
.ws-dots button i::after { content: ''; position: absolute; inset: 0; background: var(--rf-accent); transform-origin: left; transform: scaleX(0); }\r
.ws-dots button.past i::after, .ws-dots button.on i::after { transform: scaleX(1); }\r
.ws-dots button.on i.run::after { animation: ws-prog var(--ms) linear both; }\r
.wl-story:hover .ws-dots button.on i.run::after { animation-play-state: paused; }\r
@keyframes ws-prog { from { transform: scaleX(0); } }\r
.ws-dots button:focus-visible { outline: 2px solid var(--rf-accent); outline-offset: 2px; border-radius: 4px; }\r
@media (max-width: 900px) {\r
  .wl2 { grid-template-columns: 1fr; }\r
  .wl2 .wl-right { display: flex; order: -1; padding: 18px 5vw 0; }\r
  .wl2 .wl-left { padding: 18px 6vw 6vh; }\r
  .wl2 .wl-title { font-size: clamp(32px, 9vw, 44px); }\r
  .wl-story { gap: 10px; }\r
  .ws-bar span, .ws-head small { display: none; }\r
  .ws-tabs { gap: 10px; font-size: 11px; }\r
  .wl-story:not([data-step=discover]) .ws-ul { --ul-x: 108px; width: 52px; }\r
  .ws-panel { font-size: 10.5px; gap: 5px; } .ws-title { font-size: 12.5px; }\r
  .ws-caption { min-height: 0; } .ws-caption p { font-size: 13px; }\r
  .wl-keys { display: none; }\r
}\r
.rm .wl-story *, .rm .wl-story { transition: none !important; animation: none !important; }\r
@media (prefers-reduced-motion: reduce) { .wl-story *, .wl-story { transition-duration: .01ms !important; animation: none !important; } }\r
`;ue();function Z(r,e){return r==="full"||r==="balanced"||r==="calm"?r:e?"calm":"full"}async function O(r,e){let t;try{t=await chrome.runtime.sendMessage({__rofit:!0,type:r,req:e})}catch{throw{kind:"network",message:"RoFit\u2019s background worker did not answer. Reload the page and try again."}}if(!t)throw{kind:"network",message:"RoFit\u2019s background worker did not answer. Reload the page and try again."};if(!t.ok)throw t.error;return t.data}var Pt=[["path",{d:"M12 10.5V9.5a2.5 2.5 0 1 0-2.5-2.5"}],["path",{d:"M12 10.5 3 17a1.3 1.3 0 0 0 .8 2.4h16.4A1.3 1.3 0 0 0 21 17l-9-6.5Z"}]];var $e=[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]];var je=[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]];var We=[["path",{d:"m21 16-4 4-4-4"}],["path",{d:"M17 20V4"}],["path",{d:"m3 8 4-4 4 4"}],["path",{d:"M7 4v16"}]];var Xe=[["path",{d:"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"}],["path",{d:"m9 10 2 2 4-4"}]];var Ke=[["path",{d:"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"}]];var Ye=[["path",{d:"M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"}],["path",{d:"m7 16.5-4.74-2.85"}],["path",{d:"m7 16.5 5-3"}],["path",{d:"M7 16.5v5.17"}],["path",{d:"M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"}],["path",{d:"m17 16.5-5-3"}],["path",{d:"m17 16.5 4.74-2.85"}],["path",{d:"M17 16.5v5.17"}],["path",{d:"M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"}],["path",{d:"M12 8 7.26 5.15"}],["path",{d:"m12 8 4.74-2.85"}],["path",{d:"M12 13.5V8"}]];var Ze=[["path",{d:"M18 6 7 17l-5-5"}],["path",{d:"m22 10-7.5 7.5L13 16"}]];var Je=[["path",{d:"M20 6 9 17l-5-5"}]];var Qe=[["path",{d:"m6 9 6 6 6-6"}]];var er=[["path",{d:"m9 18 6-6-6-6"}]];var ce=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m16 9-5.5 5.5L8 12"}]];var rr=[["path",{d:"M10.1 2.182a10 10 0 0 1 3.8 0"}],["path",{d:"M13.9 21.818a10 10 0 0 1-3.8 0"}],["path",{d:"M17.609 3.721a10 10 0 0 1 2.69 2.7"}],["path",{d:"M2.182 13.9a10 10 0 0 1 0-3.8"}],["path",{d:"M20.279 17.609a10 10 0 0 1-2.7 2.69"}],["path",{d:"M21.818 10.1a10 10 0 0 1 0 3.8"}],["path",{d:"M3.721 6.391a10 10 0 0 1 2.7-2.69"}],["path",{d:"M6.391 20.279a10 10 0 0 1-2.69-2.7"}]];var tr=[["path",{d:"M11 14h10"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v1.344"}],["path",{d:"m17 18 4-4-4-4"}],["path",{d:"M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113"}],["rect",{x:"8",y:"2",width:"8",height:"4",rx:"1"}]];var ar=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 6v6l4 2"}]];var or=[["path",{d:"M13.744 17.736a6 6 0 1 1-7.48-7.48"}],["path",{d:"M15 6h1v4"}],["path",{d:"m6.134 14.768.866-.5 2 3.464"}],["circle",{cx:"16",cy:"8",r:"6"}]];var sr=[["path",{d:"M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"}]];var nr=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]];var fr=[["path",{d:"M20 4v7a4 4 0 0 1-4 4H4"}],["path",{d:"m9 10-5 5 5 5"}]];var ir=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];var me=[["circle",{cx:"12",cy:"12",r:"1"}],["circle",{cx:"19",cy:"12",r:"1"}],["circle",{cx:"5",cy:"12",r:"1"}]];var lr=[["path",{d:"M15 3h6v6"}],["path",{d:"M10 14 21 3"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}]];var pr=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"}],["path",{d:"m2 2 20 20"}]];var dr=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{cx:"12",cy:"12",r:"3"}]];var xe=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{d:"M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"}],["path",{d:"M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"}]];var ge=[["path",{d:"M4 12.15V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3.35"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{d:"m5 16-3 3 3 3"}],["path",{d:"m9 22 3-3-3-3"}]];var ur=[["path",{d:"M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1"}],["path",{d:"M2 13h10"}],["path",{d:"m9 16 3-3-3-3"}]];var he=[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"}]];var cr=[["path",{d:"m12 14 4-4"}],["path",{d:"M3.34 19a10 10 0 1 1 17.32 0"}]];var mr=[["circle",{cx:"5",cy:"6",r:"3"}],["path",{d:"M12 6h5a2 2 0 0 1 2 2v7"}],["path",{d:"m15 9-3-3 3-3"}],["circle",{cx:"19",cy:"18",r:"3"}],["path",{d:"M12 18H7a2 2 0 0 1-2-2V9"}],["path",{d:"m9 15 3 3-3 3"}]];var xr=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}],["path",{d:"M2 12h20"}]];var gr=[["line",{x1:"4",x2:"20",y1:"9",y2:"9"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21"}]];var hr=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]];var br=[["path",{d:"M10 8h.01"}],["path",{d:"M12 12h.01"}],["path",{d:"M14 8h.01"}],["path",{d:"M16 12h.01"}],["path",{d:"M18 8h.01"}],["path",{d:"M6 8h.01"}],["path",{d:"M7 16h10"}],["path",{d:"M8 12h.01"}],["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2"}]];var be=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"}]];var vr=[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1"}]];var wr=[["path",{d:"m16 6 4 14"}],["path",{d:"M12 6v14"}],["path",{d:"M8 8v12"}],["path",{d:"M4 4v16"}]];var yr=[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"}]];var kr=[["path",{d:"M13 5h8"}],["path",{d:"M13 12h8"}],["path",{d:"M13 19h8"}],["path",{d:"m3 17 2 2 4-4"}],["path",{d:"m3 7 2 2 4-4"}]];var Cr=[["path",{d:"M3 5h.01"}],["path",{d:"M3 12h.01"}],["path",{d:"M3 19h.01"}],["path",{d:"M8 5h13"}],["path",{d:"M8 12h13"}],["path",{d:"M8 19h13"}]];var _r=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4"}]];var Sr=[["path",{d:"M5 12h14"}]];var Mr=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21"}]];var Ar=[["path",{d:"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"}],["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor"}]];var Rr=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{d:"m15 5 4 4"}]];var Pr=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];var Lr=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];var Tr=[["path",{d:"m2 9 3-3 3 3"}],["path",{d:"M13 18H7a2 2 0 0 1-2-2V6"}],["path",{d:"m22 15-3 3-3-3"}],["path",{d:"M11 6h6a2 2 0 0 1 2 2v10"}]];var ve=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}],["path",{d:"M12 7v5l4 2"}]];var Dr=[["path",{d:"M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"}],["path",{d:"m14.5 12.5 2-2"}],["path",{d:"m11.5 9.5 2-2"}],["path",{d:"m8.5 6.5 2-2"}],["path",{d:"m17.5 15.5 2-2"}]];var Fr=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];var zr=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{cx:"12",cy:"12",r:"3"}]];var Br=[["circle",{cx:"18",cy:"5",r:"3"}],["circle",{cx:"6",cy:"12",r:"3"}],["circle",{cx:"18",cy:"19",r:"3"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49"}]];var Er=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"m9 12 2 2 4-4"}]];var Or=[["path",{d:"M16 10a4 4 0 0 1-8 0"}],["path",{d:"M3.103 6.034h17.794"}],["path",{d:"M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"}]];var Hr=[["path",{d:"M10 5H3"}],["path",{d:"M12 19H3"}],["path",{d:"M14 3v4"}],["path",{d:"M16 17v4"}],["path",{d:"M21 12h-9"}],["path",{d:"M21 19h-5"}],["path",{d:"M21 5h-7"}],["path",{d:"M8 10v4"}],["path",{d:"M8 12H3"}]];var qr=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"}]];var Ur=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"}]];var Ir=[["path",{d:"M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"}],["path",{d:"M15 3v5a1 1 0 0 0 1 1h5"}]];var Nr=[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor"}]];var we=[["path",{d:"M10 11v6"}],["path",{d:"M14 11v6"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{d:"M3 6h18"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}]];var ye=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]];var Gr=[["path",{d:"M12 3v12"}],["path",{d:"m17 8-5-5-5 5"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}]];var Vr=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{cx:"12",cy:"7",r:"4"}]];var $r=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}],["circle",{cx:"9",cy:"7",r:"4"}]];var jr=[["path",{d:"M12 20h.01"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0"}],["path",{d:"M5 12.859a10 10 0 0 1 5.17-2.69"}],["path",{d:"M19 12.859a10 10 0 0 0-2.007-1.523"}],["path",{d:"M2 8.82a15 15 0 0 1 4.177-2.643"}],["path",{d:"M22 8.82a15 15 0 0 0-11.288-3.764"}],["path",{d:"m2 2 20 20"}]];var Wr=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];var sa=0;function s(r,e,t,a,n,o){e||(e={});var i,p,d=e;if("ref"in d&&typeof r!="function")for(p in d={},e)p=="ref"?i=e[p]:d[p]=e[p];var m={type:r,props:d,key:t,ref:i,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--sa,__i:-1,__u:0};return(n||o)&&(m.__source=n,m.__self=o),b.vnode&&b.vnode(m),m}function na({node:r,size:e=18,class:t,label:a}){return s("svg",{class:"rf-ico "+(t??""),width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":a?void 0:"true",role:a?"img":void 0,"aria-label":a,children:r.map(([n,o],i)=>s(n,{...o},i))})}var fa={search:Fr,close:Wr,back:$e,settings:zr,check:Je,copy:nr,external:lr,save:Ke,saved:Xe,compare:mr,more:me,grid:vr,list:Cr,refresh:Lr,down:Qe,right:er,outfit:Pt,library:wr,download:ir,upload:Gr,trash:we,filter:he,history:ve,warn:ye,info:hr,link:yr,code:ge,json:xe,layers:be,scale:Dr,palette:Ar,tag:Nr,note:Ir,lock:_r,user:Vr,ok:ce,dashed:rr,sort:We,eye:dr,eyeOff:pr,minus:Sr,plus:Pr,repeat:Tr,tasks:kr,spark:qr,boxes:Ye,hash:gr,bag:Or,clock:ar,star:Ur,command:sr,share:Br,keyboard:br,move:ur,edit:Rr,globe:xr,shield:Er,selectAll:Ze,sliders:Hr,arrow:je,users:$r,enter:fr,offline:jr,paste:tr,coins:or,gauge:cr,monitor:Mr},S=({n:r,size:e,class:t,label:a})=>s(na,{node:fa[r],size:e,class:t,label:a});ue();function Lt(){let[r,e]=C(I);return R(()=>(de().then(e),Ve(e)),[]),r}var Xr=class{map=new Map;queue=new Map;listeners=new Set;timer=0;get(e,t="150x150"){return this.map.get(`${e}:${t}`)}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}request(e,t="150x150"){let a=`${e}:${t}`;this.map.get(a)?.url||this.queue.has(a)||(this.queue.set(a,{id:e,size:t,tries:0}),this.timer||(this.timer=window.setTimeout(()=>this.flush(),50)))}emit(){this.listeners.forEach(e=>e())}async flush(){this.timer=0;let e=[...this.queue.values()];this.queue.clear();for(let t of["150x150","420x420"]){let a=e.filter(n=>n.size===t).map(n=>n.id);for(let n=0;n<a.length;n+=50){let o=a.slice(n,n+50);try{let i=await O("outfits.thumbs",{ids:o,size:t});for(let p of o){let d=i[p]??{state:"Error",url:null};this.map.set(`${p}:${t}`,d);let m=e.find(f=>f.id===p&&f.size===t);d.state==="Pending"&&m.tries<6&&(this.queue.set(`${p}:${t}`,{id:p,size:t,tries:m.tries+1}),this.timer||(this.timer=window.setTimeout(()=>this.flush(),2500)))}}catch(i){for(let p of o)this.map.set(`${p}:${t}`,{state:i.kind==="rate-limited"?"RateLimited":"Error",url:null})}this.emit()}}}},un=new Xr;function Kr(r,e){let[t,a]=C({loading:!0}),[n,o]=C(0);return R(()=>{let i=!1;return a(p=>({data:p.data,loading:!0})),r().then(p=>!i&&a({data:p,loading:!1}),p=>!i&&a({error:p,loading:!1})),()=>{i=!0}},[...e,n]),{...t,reload:()=>o(i=>i+1)}}function ke(){let[r,e]=C(()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches);return R(()=>{let t=window.matchMedia("(prefers-reduced-motion: reduce)"),a=()=>e(t.matches);return t.addEventListener("change",a),()=>t.removeEventListener("change",a)},[]),r}function Tt(r){return Z(r,ke())}function Dt(r,e,t=0){He(()=>{let a=r.current;if(!a)return;let n=()=>{let p=a.querySelector("[aria-checked=true],[aria-selected=true]");if(!p){a.style.setProperty("--w","0px");return}a.style.setProperty("--x",p.offsetLeft+t+"px"),a.style.setProperty("--w",Math.max(0,p.offsetWidth-t*2)+"px")},o=()=>{a.classList.add("still"),n(),requestAnimationFrame(()=>requestAnimationFrame(()=>a.classList.remove("still")))};a.dataset.ready?n():(a.dataset.ready="1",o());let i=new ResizeObserver(o);return i.observe(a),()=>i.disconnect()},[e])}function Ft(r){R(()=>{let e=r.current;if(!e)return;let t=e.getRootNode(),a=t.activeElement;return()=>{let n=t.activeElement;if(n&&n!==document.body&&!e.contains(n))return;(a?.isConnected&&!e.contains(a)?a:t.querySelector(".rf-shell"))?.focus({preventScroll:!0})}},[])}var zt=mt(()=>{}),Yr=()=>St(zt);function Bt({children:r}){let[e,t]=C(null),[a,n]=C(!1),o=D(0),i=Ue((p,d)=>{clearTimeout(o.current),t(m=>({msg:p,tone:d?.tone??"ok",n:(m?.n??0)+1})),n(!0),o.current=window.setTimeout(()=>{n(!1),o.current=window.setTimeout(()=>t(null),200)},2600)},[]);return s(zt.Provider,{value:i,children:[r,s("div",{class:"rf-toast-wrap",role:"status","aria-live":"polite",children:e&&s("div",{class:"rf-toast "+e.tone,"data-state":a?"open":"closed",children:[s(S,{n:e.tone==="warn"?"warn":"check",size:16}),e.msg]},e.n)})]})}function Et({title:r,body:e,confirm:t,onConfirm:a,onCancel:n,danger:o}){let i=D(null),p=D(null),[d,m]=C(!1),f=c=>{m(!0),setTimeout(c,140)},x=()=>f(n);return Ft(p),R(()=>{i.current?.focus({preventScroll:!0})},[]),s("div",{class:"rf-scrim","data-state":d?"closed":"open",onClick:x,onKeyDown:c=>{c.key==="Escape"&&(c.stopPropagation(),x())},children:s("div",{ref:p,class:"rf-dialog",role:"alertdialog","aria-modal":"true","aria-label":r,onClick:c=>c.stopPropagation(),children:[s("h3",{children:r}),s("div",{class:"rf-dialog-p",children:e}),s("div",{class:"rf-dialog-actions",children:[s("button",{class:"rf-btn",onClick:x,children:"Cancel"}),s("button",{class:"rf-btn "+(o?"danger solid":"primary"),ref:i,onClick:()=>f(a),children:t})]})]})})}function F({on:r,onChange:e,label:t}){return s("button",{class:"rf-switch"+(r?" on":""),role:"switch","aria-checked":r,"aria-label":t,onClick:()=>e(!r),children:s("span",{class:"rf-knob"})})}function N({value:r,options:e,onChange:t,label:a}){let n=D(null);return Dt(n,r),s("div",{class:"rf-seg",ref:n,role:"radiogroup","aria-label":a,children:e.map(o=>s("button",{role:"radio","aria-checked":r===o.v,class:r===o.v?"on":"",title:o.title??o.label,"aria-label":o.title??o.label,onClick:()=>t(o.v),children:[o.icon&&s(S,{n:o.icon,size:16}),o.label]},o.v))})}var ia=new Intl.NumberFormat("en-US");function Ce(r,e=Date.now()){let t=Math.max(0,(e-r)/1e3);return t<45?"just now":t<3600?`${Math.round(t/60)}m ago`:t<86400?`${Math.round(t/3600)}h ago`:t<86400*30?`${Math.round(t/86400)}d ago`:new Date(r).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}var J=(r,e,t=e+"s")=>`${ia.format(r)} ${r===1?e:t}`;function Ot(r,e,t="application/json"){let a=URL.createObjectURL(e instanceof Blob?e:new Blob([e],{type:t})),n=document.createElement("a");n.href=a,n.download=r,document.body.appendChild(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(a),2e3)}async function Ht(r){try{return await navigator.clipboard.writeText(r),!0}catch{let e=document.createElement("textarea");e.value=r,e.style.cssText="position:fixed;opacity:0",document.body.appendChild(e),e.select();let t=document.execCommand("copy");return e.remove(),t}}var la=typeof navigator<"u"&&/Mac|iPhone|iPad/.test(navigator.platform)?"\u2318":"Ctrl",pa=[[["/"],"Search"],[[la,"K"],"Command palette: outfits, library, profiles, actions"],[["?"],"Keyboard shortcuts"],[["Esc"],"Clear search, close the panel on top, or close RoFit"],[["\u2190","\u2192","\u2191","\u2193"],"Move between outfits"],[["Enter"],"Open the focused outfit"],[["Space"],"Select the focused outfit"],[["Shift","Click"],"Select several"],[["J"],"Next outfit, while one is open"],[["K"],"Previous outfit, while one is open"],[["S"],"Save or unsave the open outfit"],[["C"],"Compare the open outfit with another"]];function qt(){return s("dl",{class:"rf-keys",children:pa.map(([r,e])=>s("div",{class:"rf-keyrow",children:[s("dt",{children:r.map(t=>s("kbd",{class:"rf-kbd",children:t},t))}),s("dd",{children:e})]},e))})}var A=r=>Ge(r),da={system:"Follows your device: Full, or Calm when it asks for reduced motion.",full:"Everything RoFit does: cards glide when you sort, the avatar flies into the inspector, springy toggles.",balanced:"Shorter and gentler: things still slide into place, without the avatar flight, overshoot or staggered entrances.",calm:"No movement across the screen. Changes fade in place, at the same pace, so you can still follow them."},Ut=[{id:"appearance",title:"Appearance",icon:"palette",rows:[{id:"theme",label:"Theme",hint:"Auto follows Roblox on roblox.com and your system elsewhere.",keywords:"dark light oled color",control:r=>s(N,{label:"Theme",value:r.appearance,onChange:e=>A({appearance:e}),options:[{v:"auto",label:"Auto"},{v:"light",label:"Light"},{v:"dark",label:"Dark"},{v:"oled",label:"OLED"}]})},{id:"density",label:"Thumbnail size",keywords:"density grid",control:r=>s(N,{label:"Thumbnail size",value:r.density,onChange:e=>A({density:e}),options:[{v:"compact",label:"Small"},{v:"comfortable",label:"Medium"},{v:"large",label:"Large"}]})},{id:"layout",label:"Outfit layout",keywords:"grid list",control:r=>s(N,{label:"Outfit layout",value:r.layout,onChange:e=>A({layout:e}),options:[{v:"grid",icon:"grid",label:"Grid"},{v:"list",icon:"list",label:"List"}]})}]},{id:"motion",title:"Motion",icon:"gauge",keywords:"animation reduced",panel:()=>s(ua,{})},{id:"explorer",title:"Explorer",icon:"outfit",rows:[{id:"auto",label:"Read outfits automatically",hint:"When a profile opens, read every outfit right away so search, filters and cost sorting work without asking. Uses one request per outfit, paced for Roblox\u2019s limits.",keywords:"index scan automatic",control:r=>s(F,{label:"Read outfits automatically",on:r.autoIndex,onChange:e=>A({autoIndex:e})})},{id:"iprices",label:"Look up prices while reading",hint:"Also fetch item prices in batches of 100, for price filters, cost sorting and costs on cards.",keywords:"robux cost index",control:r=>s(F,{label:"Look up prices while reading",on:r.indexPrices,onChange:e=>A({indexPrices:e})})},{id:"presets",label:"Show Roblox presets",hint:"Roblox lists its own non-editable outfits on profiles. They aren\u2019t saved by the user, so they\u2019re hidden by default.",keywords:"preset robloxian default",control:r=>s(F,{label:"Show Roblox presets",on:r.showPresets,onChange:e=>A({showPresets:e})})},{id:"prices",label:"Show prices and cost to recreate",keywords:"robux price cost",control:r=>s(F,{label:"Show prices",on:r.showPrices,onChange:e=>A({showPrices:e})})},{id:"tech",label:"Technical details",hint:"IDs and hex values inline.",keywords:"id hex developer",control:r=>s(F,{label:"Technical details",on:r.technical,onChange:e=>A({technical:e})})}]},{id:"profiles",title:"Profiles",icon:"user",rows:[{id:"tab",label:"Outfits entry on profiles",hint:"A tab next to About and Creations, or a Saved Outfits row under Currently Wearing on profiles without tabs.",keywords:"integration profile tab section",control:r=>s(F,{label:"Outfits entry on profiles",on:r.profileTab,onChange:e=>A({profileTab:e})})},{id:"btn",label:"Outfits button by the profile actions",hint:"A hanger icon next to the \u22EF menu.",keywords:"integration profile button",control:r=>s(F,{label:"Outfits button",on:r.profileButton,onChange:e=>A({profileButton:e})})}]},{id:"data",title:"Library & data",icon:"library",keywords:"storage clear export backup import cache",rows:[{id:"cache",label:"Refresh after",hint:"How long a loaded outfit list or outfit stays fresh before RoFit asks Roblox again. Manual refresh always works.",keywords:"cache ttl minutes",control:r=>s(N,{label:"Refresh after",value:String(r.cacheMinutes),onChange:e=>A({cacheMinutes:Number(e)}),options:[{v:"2",label:"2 min"},{v:"10",label:"10 min"},{v:"60",label:"1 hr"}]})},{id:"history",label:"Keep outfit history",hint:"Snapshots what an outfit contained each time you open it and it has changed.",keywords:"snapshot changes",control:r=>s(F,{label:"Keep history",on:r.keepHistory,onChange:e=>A({keepHistory:e})})},{id:"hlimit",label:"Snapshots per outfit",keywords:"history limit",control:r=>s(N,{label:"Snapshots per outfit",value:String(r.historyLimit),onChange:e=>A({historyLimit:Number(e)}),options:[{v:"5",label:"5"},{v:"20",label:"20"},{v:"50",label:"50"}]})}],panel:()=>s(ma,{})},{id:"privacy",title:"Privacy",icon:"shield",keywords:"public private access share rofit.site permission",lead:"Everything RoFit knows lives in this browser. It talks to Roblox with read-only requests, using your Roblox session the way the Roblox site does. No analytics, no accounts, nothing uploaded.",rows:[{id:"access",label:"Check whether outfits are public",keywords:"visibility anonymous signed out",hint:"Asks Roblox once more, without your session, whether a list is visible to people who aren\u2019t signed in. That\u2019s how RoFit tells \u201CPublic\u201D from \u201CVisible to you\u201D and warns before you share something that isn\u2019t public. Off: those outfits show \u201CVisibility unknown\u201D and sharing always asks first.",control:r=>s(F,{label:"Check whether outfits are public",on:r.checkAccess,onChange:e=>A({checkAccess:e})})}],panel:()=>s(ca,{})},{id:"diagnostics",title:"Diagnostics",icon:"monitor",keywords:"debug errors status endpoints",panel:()=>s(xa,{})},{id:"shortcuts",title:"Shortcuts",icon:"keyboard",keywords:"keyboard keys palette",panel:()=>s(qt,{})},{id:"about",title:"About",icon:"info",keywords:"version licence license credits",panel:()=>s(ga,{})}],Zr=(r,e,t)=>typeof r.hint=="function"?r.hint(e,t):r.hint??"";function It({settings:r}){let[e,t]=C(""),a=ke(),[n,o]=C(location.hash.split("/")[1]||"appearance"),i=e.trim().toLowerCase(),p=Ut.map(f=>{if(!i)return{sec:f,rows:f.rows??[],panel:!0};let x=`${f.title} ${f.keywords??""} ${f.lead??""}`.toLowerCase().includes(i),c=(f.rows??[]).filter(u=>x||`${u.label} ${Zr(u,r,a)} ${u.keywords??""}`.toLowerCase().includes(i));return{sec:f,rows:c,panel:x}}).filter(f=>f.rows.length||f.panel&&f.sec.panel||f.panel&&f.sec.lead),d=D(null);R(()=>{let f=[...d.current?.querySelectorAll("section[data-sec]")??[]],x=new IntersectionObserver(c=>{let u=c.filter(g=>g.isIntersecting).sort((g,l)=>g.boundingClientRect.top-l.boundingClientRect.top)[0];u&&o(u.target.dataset.sec)},{rootMargin:"-20% 0px -70% 0px"});return f.forEach(c=>x.observe(c)),()=>x.disconnect()},[i]),R(()=>{let f=location.hash.split("/")[1];f&&d.current?.querySelector("[data-sec="+CSS.escape(f)+"]")?.scrollIntoView()},[]);let m=f=>{d.current?.querySelector("[data-sec="+CSS.escape(f)+"]")?.scrollIntoView({behavior:Z(r.motion,a)==="calm"?"auto":"smooth",block:"start"}),o(f)};return s("div",{class:"rf-settings",children:[s("aside",{class:"rf-setnav","aria-label":"Settings sections",children:[s("h1",{children:"Settings"}),s("label",{class:"rf-search",children:[s(S,{n:"search",size:16}),s("input",{type:"search",placeholder:"Search settings",value:e,onInput:f=>t(f.target.value),"aria-label":"Search settings"})]}),s("nav",{children:Ut.map(f=>{let x=p.some(c=>c.sec.id===f.id);return s("button",{class:n===f.id&&x?"on":"","aria-current":n===f.id&&x?"true":void 0,disabled:!x,onClick:()=>m(f.id),children:[s(S,{n:f.icon,size:16}),f.title]},f.id)})})]}),s("div",{class:"rf-setbody",ref:d,children:[p.map(({sec:f,rows:x,panel:c})=>s("section",{class:"rf-setgroup",id:"set-"+f.id,"data-sec":f.id,"aria-labelledby":"seth-"+f.id,children:[s("h2",{id:"seth-"+f.id,children:[s(S,{n:f.icon,size:16}),f.title]}),f.lead&&s("p",{class:"rf-setp",children:f.lead}),x.map(u=>s("div",{class:"rf-setrow",children:[s("div",{class:"rf-setl",children:[s("span",{children:u.label}),Zr(u,r,a)&&s("small",{children:Zr(u,r,a)})]}),s("div",{class:"rf-setc",children:u.control(r)})]},u.id)),c&&f.panel?.()]},f.id)),p.length===0&&s("p",{class:"rf-muted rf-setp",children:["No settings match \u201C",e,"\u201D."]}),s("div",{class:"rf-setfoot",children:s("button",{class:"rf-linkbtn",onClick:()=>A({...I,onboarded:!0}),children:"Reset settings to defaults"})})]})]})}function ua(){let[r,e]=C(null);R(()=>{Promise.resolve().then(()=>(ue(),Rt)).then(i=>(i.loadSettings().then(e),i.onSettings(e)))},[]);let t=ke(),[a,n]=C(0);if(!r)return null;let o=Z(r.motion,t);return s("div",{class:"rf-motion",children:[s("div",{class:"rf-setrow",children:[s("div",{class:"rf-setl",children:[s("span",{children:"Motion"}),s("small",{children:[da[r.motion],r.motion==="system"?` Right now: ${t?"Calm (your device asks for reduced motion)":"Full"}.`:t?" This overrides your device\u2019s reduced-motion setting, because you picked it here.":""]})]}),s("div",{class:"rf-setc",children:s(N,{label:"Motion",value:r.motion,onChange:i=>{A({motion:i}),n(p=>p+1)},options:[{v:"system",label:"System"},{v:"full",label:"Full"},{v:"balanced",label:"Balanced"},{v:"calm",label:"Calm"}]})})]}),s("div",{class:"rf-mprev","aria-label":`Preview of ${o} motion`,children:[s("div",{class:"rf-grid comfortable intro","aria-hidden":"true",children:Array.from({length:5},(i,p)=>s("div",{class:"rf-cell",style:{"--i":p},children:s("div",{class:"rf-card sk",children:[s("div",{class:"rf-thumb",children:s("div",{class:"rf-mprev-fig"})}),s("div",{class:"rf-sk-l"})]})},p))},a),s("div",{class:"rf-mprev-foot",children:[s("span",{class:"rf-muted rf-small",children:["Playing: ",s("b",{children:o[0].toUpperCase()+o.slice(1)}),". Spinners and progress bars always move, because they mean something is happening."]}),s("button",{class:"rf-btn sm",onClick:()=>n(i=>i+1),children:[s(S,{n:"refresh",size:14}),"Replay"]})]})]})]})}function ca(){return s("ul",{class:"rf-plist",children:[s("li",{children:[s(S,{n:"lock",size:16}),s("div",{children:[s("b",{children:"Private stays private."})," When Roblox won\u2019t show someone\u2019s outfits to you, RoFit says so and also hides anything it cached on earlier visits."]})]}),s("li",{children:[s(S,{n:"share",size:16}),s("div",{children:[s("b",{children:"Share links carry a snapshot, not access."})," The outfit travels inside the link\u2019s ",s("code",{children:"#fragment"}),", which browsers never send to a server. Links for outfits that aren\u2019t public need your OK first."]})]}),s("li",{children:[s(S,{n:"globe",size:16}),s("div",{children:[s("b",{children:"rofit.site can only suggest."})," On rofit.site, RoFit listens for one thing: \u201Cimport this share link\u201D. It opens RoFit\u2019s own import screen with a preview; nothing is saved until you press Import. The site never sees your library."]})]}),s("li",{children:[s(S,{n:"monitor",size:16}),s("div",{children:[s("b",{children:"Diagnostics stay local."})," \u201CCopy diagnostics\u201D never includes cookies, tokens or outfit contents."]})]})]})}var Jr={worn:["Currently worn avatar","Roblox avatar API"],list:["Outfit lists","avatar.roblox.com v2 (v1 fallback)"],details:["Outfit details","avatar.roblox.com v3 (v4 fallback)"],access:["Public check","avatar.roblox.com v2, without your session"],thumbs:["Thumbnails","thumbnails.roblox.com"],catalog:["Item catalog data","catalog.roblox.com"],economy:["Item sale data (fallback)","economy.roblox.com"],resale:["Resale averages","economy.roblox.com"],ownership:["Ownership check","inventory.roblox.com, needs Roblox sign-in"],myAvatar:["Your current avatar","avatar.roblox.com v1, needs sign-in"],users:["Profile search","users.roblox.com"]};function ma(){let r=Yr(),e=Kr(()=>O("diag.get",{}),[]),[t,a]=C(null),n=e.data,o=n?.storageBytes!=null?`${(n.storageBytes/1048576).toFixed(1)} MB`:"\u2014",i={cache:"Clear cache",history:"Clear history",library:"Clear library",all:"Erase everything"};return s(T,{children:[s("div",{class:"rf-setrow",children:[s("div",{class:"rf-setl",children:[s("span",{children:"Stored on this computer"}),s("small",{children:n?`${J(n.counts.library,"saved outfit")} \xB7 ${J(n.counts.details,"cached outfit")} \xB7 ${J(n.counts.assets,"item record")} \xB7 ${J(n.counts.snapshots,"snapshot")} \xB7 ${o}`:"Loading\u2026"})]}),s("div",{class:"rf-setc wrap",children:[s("button",{class:"rf-btn",onClick:async()=>{Ot(`rofit-backup-${new Date().toISOString().slice(0,10)}.json`,JSON.stringify(await O("data.export",{}),null,2)),r("Exported backup")},children:[s(S,{n:"download",size:16}),"Export backup"]}),s("a",{class:"rf-btn",href:"#library/import",children:[s(S,{n:"upload",size:16}),"Import\u2026"]})]})]}),s("div",{class:"rf-setrow",children:[s("div",{class:"rf-setl",children:[s("span",{children:"Clear"}),s("small",{children:"Cache holds outfit lists and item data, including the \u201Clast known\u201D records of items Roblox no longer shows. Your library is self-contained, so clearing cache doesn\u2019t touch it."})]}),s("div",{class:"rf-setc wrap",children:[s("button",{class:"rf-btn",onClick:()=>a("cache"),children:"Cache"}),s("button",{class:"rf-btn",onClick:()=>a("history"),children:"History"}),s("button",{class:"rf-btn danger",onClick:()=>a("library"),children:"Library"}),s("button",{class:"rf-btn danger",onClick:()=>a("all"),children:"Everything"})]})]}),t&&s(Et,{title:`${i[t]}?`,confirm:i[t],danger:t==="library"||t==="all",body:t==="library"||t==="all"?"This permanently removes saved outfits from this browser. Export a backup first if you might want them.":t==="history"?"Removes recorded changes for every outfit.":"RoFit will re-fetch outfits and items from Roblox as you browse. \u201CLast known\u201D item data for things Roblox has since removed is lost.",onCancel:()=>a(null),onConfirm:async()=>{await O("data.clear",{what:t}),a(null),r("Cleared"),e.reload()}})]})}function xa(){let r=Yr(),e=Kr(()=>O("diag.get",{}),[]),[t]=C(()=>chrome.runtime.getManifest().version),a=e.data,n=async()=>{let o={rofit:t,chrome:navigator.userAgent,...a,note:"No cookies, tokens or outfit contents included."};r(await Ht(JSON.stringify(o,null,2))?"Copied diagnostics":"Couldn\u2019t copy")};return s(T,{children:[s("p",{class:"rf-setp",children:"What RoFit could and couldn\u2019t get from Roblox since the background worker last started. A feature that fails here degrades on its own; the rest keeps working."}),s("div",{class:"rf-caps",children:Object.keys(Jr).map(o=>{let i=a?.capabilities[o];return s("div",{class:"rf-cap",children:[s("span",{class:"rf-led "+(i?i.ok?"ok":"bad":"idle"),"aria-hidden":"true"}),s("span",{class:"rf-cap-n",children:[Jr[o][0],s("small",{children:Jr[o][1]})]}),s("span",{class:"rf-cap-s",children:i?i.ok?`OK \xB7 ${Ce(i.at)}`:`Failing \xB7 ${i.error}`:"Not used yet"})]},o)})}),a&&a.transport.at>0&&s("p",{class:"rf-setp",children:["Requests last ran ",a.transport.via==="tab"?"inside your Roblox tab, so Roblox sees your session (needed for friends-only content and ownership).":"in RoFit\u2019s background worker, which Roblox sees as signed out. Keep a roblox.com tab open to use your session."]}),a&&a.limiter.cooldownMs>0&&s("p",{class:"rf-setp",children:["Roblox asked RoFit to slow down. Pausing for ",Math.ceil(a.limiter.cooldownMs/1e3),"s."]}),a&&a.recentErrors.length>0&&s("details",{class:"rf-details",children:[s("summary",{children:[a.recentErrors.length," recent errors"]}),a.recentErrors.map((o,i)=>s("div",{class:"rf-mono rf-small",children:[Ce(o.at)," \xB7 ",o.where," \xB7 ",o.message]},i))]}),s("div",{class:"rf-setrow",children:[s("div",{class:"rf-setl",children:[s("span",{children:"Copy diagnostics"}),s("small",{children:"Never includes cookies, tokens or outfit contents."})]}),s("div",{class:"rf-setc",children:[s("button",{class:"rf-btn",onClick:n,disabled:!a,children:[s(S,{n:"copy",size:16}),"Copy"]}),s("button",{class:"rf-btn",onClick:e.reload,children:[s(S,{n:"refresh",size:16}),"Recheck"]})]})]})]})}function ga(){let[r]=C(()=>chrome.runtime.getManifest().version);return s("div",{class:"rf-about",children:[s("a",{href:chrome.runtime.getURL("workspace.html#welcome"),target:"_blank",rel:"noopener noreferrer",children:"Replay welcome"}),s("div",{class:"rf-about-h",children:[s("span",{class:"rf-logo sm",children:s(S,{n:"outfit",size:18})}),s("div",{children:[s("b",{children:["RoFit ",r]}),s("span",{class:"rf-muted rf-small",children:"Browse, inspect, compare and keep the outfits people save on Roblox."})]})]}),s("p",{class:"rf-setp",children:"Not affiliated with Roblox Corporation. RoFit reads the same public endpoints the Roblox website uses and shows only what Roblox returns to you."}),s("p",{class:"rf-muted rf-small",children:["Built with Preact (MIT) and Lucide icons (ISC); licence texts ship in the extension\u2019s ",s("code",{children:"licenses/"})," folder."]})]})}var _e={bg:"rgb(255, 255, 255)",fg:"rgb(32, 34, 39)",accent:"rgb(51, 95, 255)",accentFg:"#ffffff",tint:"rgb(27, 37, 75)"},Qr={bg:"rgb(18, 18, 21)",fg:"rgb(247, 247, 248)",accent:"rgb(51, 95, 255)",accentFg:"#ffffff",tint:"rgb(208, 217, 251)"},ha={bg:"rgb(0, 0, 0)",fg:"rgb(247, 247, 248)",accent:"rgb(51, 95, 255)",accentFg:"#ffffff",tint:"rgb(208, 217, 251)"};function Q(r){let e=r.match(/rgba?\(([^)]+)\)/);if(!e)return null;let t=e[1].split(/[ ,/]+/).filter(Boolean).map(Number);return[t[0],t[1],t[2],t[3]??1]}var Nt=([r,e,t])=>{let a=n=>(n/=255,n<=.03928?n/12.92:((n+.055)/1.055)**2.4);return .2126*a(r)+.7152*a(e)+.0722*a(t)};function ba(){let r=x=>{for(let c=x;c;c=c.parentElement){let u=Q(getComputedStyle(c).backgroundColor);if(u&&u[3]>.9)return u}return null},e=r(document.body)??r(document.documentElement);if(!e)return _e;let a=Nt(e)<.4?Qr:_e,n=Q(getComputedStyle(document.body).color),o=a.accent,i=document.querySelector(".bg-action-emphasis, .btn-primary-md, .btn-growth-md"),p=i?Q(getComputedStyle(i).backgroundColor):null;p&&p[3]>.9&&(o=`rgb(${p[0]}, ${p[1]}, ${p[2]})`);let d=document.querySelector(".bg-action-standard"),m=d?Q(getComputedStyle(d).backgroundColor):null,f=m?`rgb(${m[0]}, ${m[1]}, ${m[2]})`:a.tint;return{bg:`rgb(${e[0]}, ${e[1]}, ${e[2]})`,fg:n?`rgb(${n[0]}, ${n[1]}, ${n[2]})`:a.fg,accent:o,accentFg:"#ffffff",tint:f}}function Gt(r,e){let t;r.appearance==="light"?t=_e:r.appearance==="dark"?t=Qr:r.appearance==="oled"?t=ha:e?t=ba():t=window.matchMedia("(prefers-color-scheme: dark)").matches?Qr:_e;let a=Q(t.bg);return{...t,dark:a?Nt(a)<.4:!1}}function Vt(r){let[e,t,a,n]=r.dark?["11%","17%","23%","19%"]:["3.5%","7.5%","12%","13%"];return{"--rf-bg":r.bg,"--rf-fg":r.fg,"--rf-accent":r.accent,"--rf-accent-fg":r.accentFg,"--rf-tint":r.tint,"--rf-s1":e,"--rf-s2":t,"--rf-s3":a,"--rf-line-pct":n,"color-scheme":r.dark?"dark":"light"}}function va(){let r=Lt(),e=Tt(r.motion)==="calm",[,t]=C(0);return R(()=>{let a=new MutationObserver(()=>t(n=>n+1));return a.observe(document.body,{attributes:!0,attributeFilter:["class","style"]}),()=>a.disconnect()},[]),s("div",{class:"rf rf-acct"+(e?" rm":""),style:Vt(Gt(r,!0)),children:s(Bt,{children:s(It,{settings:r})})})}function bf(r){let e=r.attachShadow({mode:"closed"}),t=document.createElement("style");t.textContent=At;let a=document.createElement("div");return e.append(t,a),Fe(s(va,{}),a),()=>Fe(null,a)}export{bf as mountPanel};
