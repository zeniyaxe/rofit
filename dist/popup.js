"use strict";(()=>{var dt="https://rofit.site",ua="https://github.com/zeniyaxe/rofit",ut=ua+"/issues",ct="https://www.roblox.com/games/6513295364/hi#!/store",ca="#!/rofit",mt="https://www.roblox.com/my/account"+ca;var C,bt,ma,X,xt,ue,vt,le,Q,wt,Ue,qe,He,yt,ce={},me=[],xa=/^m(i|n|o|s|text|space)$/,Ie=Array.isArray,kt=me.slice,K=Object.assign;function xe(e){e&&e.parentNode&&e.remove()}function pe(e,r,t,a,s){var o={type:e,props:r,key:t,ref:a,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:s||++bt,__i:-1,__u:0};return!s&&C.vnode&&C.vnode(o),o}function Y(e){return e.children}function de(e,r){this.props=e,this.context=r,this.__g=0}function $(e,r){if(r==null)return e.__?$(e.__,e.__i+1):null;for(var t;r<e.__k.length;r++)if((t=e.__k[r])&&t.__e)return t.__e;return typeof e.type!="function"||e.props.__P?null:$(e)}function Ct(e){if((e=e.__)&&e.__c&&!e.props.__P)return e.__e=null,e.__k.some(function(r){return r&&(e.__e=r.__e)}),Ct(e)}function Oe(e){(8&e.__g||!(e.__g|=8)||!X.push(e)||ue++)&&xt==C.debounceRendering||((xt=C.debounceRendering)||queueMicrotask)(ga)}function ga(){var e,r,t,a,s,o,l,f,d;try{for(r=1;X.length;)X.length>r&&X.sort(vt),e=X.shift(),r=X.length,8&e.__g&&(a=void 0,s=void 0,o=(s=(t=e).__v).__e,l=[],f=[],(d=t.__P)&&((a=K({constructor:void 0},s)).__v=s.__v+1,C.vnode&&C.vnode(a),Ne(d,a,s,t.__n,d.namespaceURI,32&s.__u?[o]:null,l,o||$(s),32&s.__u,f),a.__v=s.__v,a.__.__k[a.__i]=a,Rt(l,a,f),s.__=s.__e=null,a.__e!=o&&Ct(a)))}finally{X.length=ue=0}}function _t(e,r,t,a,s,o,l,f,d,c,p){var g,b,x,w,i,P,v=a.__k||me,A=r.length;for(d=ha(t,r,v,d,A),g=0;g<A;g++)(x=t.__k[g])!=null&&(b=~x.__i&&v[x.__i]||ce,x.__i=g,P=Ne(e,x,b,s,o,l,f,d,c,p),w=x.__e,x.ref&&(b.ref!=x.ref||8&b.__u)&&(b.ref!=x.ref&&b.ref&&Ve(b.ref,null,x),p.push(x.ref,x.__c||w,x)),i=i||w,4&x.__u?(d=St(x,d,e,!b.__v),b.__e&&(b.__e=null)):typeof x.type=="function"&&P!==void 0?d=P:w&&(d=w.nextSibling),x.__u&=-7);return t.__e=i,d}function ha(e,r,t,a,s){var o,l,f,d,c,p,g,b,x,w,i=t.length,P=i,v=0,A=!1,h=e.__k=Array(s);for(o=0;o<s;o++)(l=r[o])!=null&&typeof l!="boolean"&&typeof l!="function"?(typeof l!="object"||l.constructor==String?l=h[o]=pe(null,l):Ie(l)?l=h[o]=pe(Y,{children:l}):l.constructor===void 0&&l.__b?l=h[o]=pe(l.type,l.props,l.key,l.ref,l.__v):h[o]=l,d=o+v,l.__=e,l.__b=e.__b+1,f=null,~(c=l.__i=ba(l,t,d,P))&&(P--,(f=t[c])&&(f.__u|=2)),f&&f.__v?(l.__u|=2,c==d-1?v--:c==d+1?v++:c!=d&&(c>d?v--:v++,A=!0)):(~c||(s>i?v--:s<i&&v++),typeof l.type!="function"&&(l.__u|=4))):h[o]=null;if(A){for(p=[],g=[],o=0;o<s;o++)if((l=h[o])&&2&l.__u){for(b=0,x=p.length;b<x;)p[w=b+x>>1]<l.__i?b=w+1:x=w;p[b]=l.__i,g[o]=b+1}for(v=p.length;o--;)g[o]&&(g[o]==v?v--:h[o].__u|=4)}if(P)for(o=0;o<i;o++)!(f=t[o])||2&f.__u||(f.__e==a&&(a=$(f)),je(f,f));return a}function St(e,r,t,a){var s,o;if(typeof e.type=="function"){if(e.props.__P)return r;if(s=e.__k)for(o=0;o<s.length;o++)s[o]&&(s[o].__=e,r=St(s[o],r,t,!1));return r}for(r&&!r.parentNode&&(r=$(e))&&!r.parentNode&&(r=null),e.__e!=r&&(!a&&t.moveBefore&&e.__e.parentNode?t.moveBefore(e.__e,r):t.insertBefore(e.__e,r||null)),r=e.__e;(r=r&&r.nextSibling)&&r.nodeType==8;);return r}function ba(e,r,t,a){var s,o,l,f=e.key,d=e.type,c=r[t],p=c&&!(2&c.__u);if(c===null&&f==null||p&&f==c.key&&d==c.type)return t;if(a>(p?1:0)){for(s=t-1,o=t+1;s>=0||o<r.length;)if((c=r[l=s>=0?s--:o++])&&!(2&c.__u)&&f==c.key&&d==c.type)return l}return-1}function gt(e,r,t){t==null&&(t=""),r[0]=="-"?e.setProperty(r,t):e[r]=t}function ie(e,r,t,a,s){var o;e:if(r=="style")if(typeof t=="string")e.style.cssText=t;else{if(typeof a=="string"&&(e.style.cssText=a=""),a)for(r in a)t&&r in t||gt(e.style,r,"");if(t)for(r in t)a&&t[r]==a[r]||gt(e.style,r,t[r])}else if(r[0]=="o"&&r[1]=="n")o=r!=(r=r.replace(wt,"$1")),(r=r.slice(2))[0]<"a"&&(r=r.toLowerCase()),(e.__e||(e.__e={}))[r+o]=t,t?a?t[Q]=a[Q]:(t[Q]=Ue,e.addEventListener(r,o?He:qe,o)):e.removeEventListener(r,o?He:qe,o);else{if(s=="http://www.w3.org/2000/svg")r=r.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(r!="width"&&r!="height"&&r!="href"&&r!="list"&&r!="form"&&r!="tabIndex"&&r!="download"&&r!="rowSpan"&&r!="colSpan"&&r!="role"&&r!="popover"&&r in e)try{e[r]=t??"";break e}catch{}typeof t=="function"||(t==null||t===!1&&r[4]!="-"?e.removeAttribute(r):e.setAttribute(r,r=="popover"&&t==1?"":t))}}function ht(e){return function(r){if(this.__e){var t=this.__e[r.type+e];if(r[le]==null)r[le]=Ue++;else if(r[le]<t[Q])return;return t(C.event?C.event(r):r)}}}function Ne(e,r,t,a,s,o,l,f,d,c){var p,g,b,x,w,i,P,v,A,h,k,_,S,q,N,z,I,V,H,F,O=r.type;if(r.constructor!==void 0)return null;if(128&t.__u&&(d=32&t.__u,p=t.__c.__z)){if(r.__u|=d,g=o=[],p.nodeType==8)for(b=1,x=p.nextSibling;x;x=x.nextSibling){if(x.nodeType==8){if(x.data.startsWith("$s"))b++;else if(x.data.startsWith("/$s")&&!--b)break}o.push(x)}else o.push(p);f=o[0]}(p=C.__b)&&p(r);e:if(typeof O=="function"){w=l.length;try{if(h=r.props,k=(p=O.prototype)&&p.render,_=(p=O.contextType)&&a[p.__c],S=p?_?_.props.value:p.__:a,t.__c?2&(i=r.__c=t.__c).__g&&(i.__g|=1):(k?r.__c=i=new O(h,S):(r.__c=i=new de(h,S),i.constructor=O,i.render=wa),_&&_.sub(i),i.state||(i.state={}),i.__n=a,i.__g|=8,i.__h=[],i.__k=[]),k&&(i.__s||(i.__s=i.state),O.getDerivedStateFromProps&&(i.__s==i.state&&(i.__s=K({},i.__s)),K(i.__s,O.getDerivedStateFromProps(h,i.__s)))),P=i.props,v=i.state,i.__v=r,t.__c){if(k&&!O.getDerivedStateFromProps&&h!==P&&i.componentWillReceiveProps&&i.componentWillReceiveProps(h,S),r.__v==t.__v&&!(8&i.__g)||!(4&i.__g)&&i.shouldComponentUpdate&&i.shouldComponentUpdate(h,i.__s,S)===!1){r.__v!=t.__v&&(i.props=h,i.state=i.__s,i.__g&=-9),r.__e=t.__e,r.__k=t.__k,r.__k.some(function(E){E&&(E.__=r)}),me.push.apply(i.__h,i.__k),i.__k=[],i.__h.length&&l.push(i),f=$(t);break e}i.componentWillUpdate&&i.componentWillUpdate(h,i.__s,S),k&&i.componentDidUpdate&&i.__h.push(function(){i.componentDidUpdate(P,v,A)})}else k&&!O.getDerivedStateFromProps&&i.componentWillMount&&i.componentWillMount(),k&&i.componentDidMount&&i.__h.push(i.componentDidMount);if(i.context=S,i.props=h,i.__P=e,i.__g&=-5,q=C.__r,N=0,k)i.state=i.__s,i.__g&=-9,q&&q(r),p=i.render(i.props,i.state,i.context),me.push.apply(i.__h,i.__k),i.__k=[];else do i.__g&=-9,q&&q(r),p=i.render(i.props,i.state,i.context),i.state=i.__s;while(8&i.__g&&++N<25);i.state=i.__s,i.getChildContext&&(a=K({},a,i.getChildContext())),k&&t.__c&&i.getSnapshotBeforeUpdate&&(A=i.getSnapshotBeforeUpdate(P,v)),z=p&&p.type===Y&&p.key==null?p.props.children:p,h.__P&&(p=f,s=(e=h.__P).namespaceURI,d=o=null,t.props&&t.props.__P!=e&&(t.__k.some(function(E){E&&je(E,E)}),t.__k=null),f=t.__k?$(t,0):null),f=_t(e,Ie(z)?z:[z],r,t,a,s,o,l,f,d,c),h.__P&&(r.__e=null,f=p),r.__u&=-161,128&t.__u&&(i.__z=null),g&&g.some(xe),i.__h.length&&l.push(i),1&i.__g&&(i.__g&=-4)}catch(E){if(l.length=w,r.__v=null,d||o)if(E.then){if(I=0,r.__u|=d?160:128,o){for(H=0;H<o.length;H++)if(F=o[H])if(F.nodeType==8){if(o[H]=null,F.data.startsWith("$s"))I++||(V=F);else if(F.data.startsWith("/$s")&&!--I){f=F;break}}else I&&(o[H]=null)}if(!V){for(;f&&f.nodeType==8&&f.nextSibling;)f=f.nextSibling;o&&(o[o.indexOf(f)]=null),V=f}r.__c.__z||(r.__c.__z=V),r.__e=f}else o&&o.some(xe);else r.__e=t.__e;r.__k||(r.__k=t.__k||[]),E.then||Mt(r),C.__e(E,r,t)}}else f=r.__e=va(t.__e,r,t,a,s,o,l,d,c,e);return(p=C.diffed)&&p(r),128&r.__u?void 0:f}function Mt(e){e&&(e.__c&&(e.__c.__g|=4),e.__k&&e.__k.some(Mt))}function Rt(e,r,t){for(var a=0;a<t.length;)Ve(t[a++],t[a++],t[a++]);C.__c&&C.__c(r,e),e.some(function(s){try{e=s.__h,s.__h=[],e.some(function(o){o.call(s)})}catch(o){C.__e(o,s.__v)}})}function va(e,r,t,a,s,o,l,f,d,c){var p,g,b,x,w,i,P,v,A,h=t.props||ce,k=r.props,_=r.type;if(_=="svg"?s="http://www.w3.org/2000/svg":_=="math"?s="http://www.w3.org/1998/Math/MathML":s||(s="http://www.w3.org/1999/xhtml"),o){for(p=0;p<o.length;p++)if((w=o[p])&&(_?w.localName==_:w.nodeType==3)){e=w,o[p]=null;break}}if(!e){if(v=c.ownerDocument||document,!_)return v.createTextNode(k);e=v.createElementNS(s,_,k.is&&k),f&&(C.__m&&C.__m(r,o),f=!1),o=null}if(_){if(c=_=="template"?e.content:e,o=_=="textarea"&&k.defaultValue!=null?null:o&&kt.call(c.childNodes),!f&&o)for(h={},p=0;p<e.attributes.length;p++)h[(w=e.attributes[p]).name]=w.value;for(p in h)w=h[p],p=="dangerouslySetInnerHTML"?b=w:p=="children"||p in k||p=="value"&&"defaultValue"in k||p=="checked"&&"defaultChecked"in k||ie(e,p,null,w,s);for(p in A=1&t.__u,k)w=k[p],p=="children"?x=w:p=="dangerouslySetInnerHTML"?g=w:p=="value"?i=w:p=="checked"?P=w:f&&typeof w!="function"||!(h[p]!==w||A&&w!=null)||ie(e,p,w,h[p],s);g?(f||b&&(g.__html==b.__html||g.__html==e.innerHTML)||(e.innerHTML=g.__html),r.__k=[]):(b&&(e.textContent=""),(_=="foreignObject"||s=="http://www.w3.org/1998/Math/MathML"&&xa.test(_))&&(s="http://www.w3.org/1999/xhtml"),_t(c,Ie(x)?x:[x],r,t,a,s,o,l,o?o[0]:t.__k&&$(t,0),f,d),o&&o.some(xe)),f&&_!="textarea"||(p="value",_=="progress"&&i==null?e.removeAttribute(p):i==null||i===e[p]&&(_!="progress"||i)||ie(e,p,i,h[p],s),p="checked",P!=null&&P!=e[p]&&ie(e,p,P,h[p],s))}else h===k||f&&e.data==k||(e.data=k);return e}function Ve(e,r,t){try{typeof e=="function"?(typeof e.__u=="function"&&e.__u(),(typeof e.__u!="function"||r)&&(e.__u=e(r))):e.current=r}catch(a){C.__e(a,t)}}function je(e,r,t){var a,s;if(C.unmount&&C.unmount(e),!(a=e.ref)||a.current&&a.current!=e.__e||Ve(a,null,r),a=e.__c){if(a.componentWillUnmount)try{a.componentWillUnmount()}catch(o){C.__e(o,r)}a.__P=a.__n=null}if(a=e.__k)for(s=0;s<a.length;s++)a[s]&&je(a[s],r,typeof e.type!="function"||t&&!e.props.__P);(a=e.__e)&&(t||xe(a),a.__e&&(a.__e=null)),e.__e=e.__c=e.__=null}function wa(e,r,t){return this.constructor(e,t)}function Pt(e,r){var t,a,s,o;C.__&&C.__(e,r),r.nodeType==9&&(r=r.documentElement),a=(t=e&&32&e.__u)?null:r.__k,r.__k=pe(Y,{children:[e]}),s=[],o=[],Ne(r,r.__k,a||ce,ce,r.namespaceURI,a?null:r.firstChild?kt.call(r.childNodes):null,s,a?a.__e:r.firstChild,t,o),Rt(s,r.__k,o),r.__k.props.children=null}function Lt(e){function r(t){var a,s;return this.getChildContext||(a=new Set,(s={})[r.__c]=this,this.getChildContext=function(){return s},this.shouldComponentUpdate=function(o){this.props.value!=o.value&&a.forEach(function(l){l.__g|=4,Oe(l)})},this.sub=function(o){a.add(o);var l=o.componentWillUnmount;o.componentWillUnmount=function(){a.delete(o),l&&l.call(o)}}),t.children}return r.__c="__cC"+yt++,r.__=e,r.Provider=(r.Consumer=function(t,a){return t.children(a)}).contextType=r,r}C={__e:function(e,r,t,a){for(var s,o,l;r=r.__;)if((s=r.__c)&&!(1&s.__g)){s.__g|=4;try{if((o=s.constructor)&&o.getDerivedStateFromError&&(s.setState(o.getDerivedStateFromError(e)),l=8&s.__g),s.componentDidCatch&&(s.componentDidCatch(e,a||{}),l=8&s.__g),l)return void(s.__g|=2)}catch(f){e=f,l=0}}throw ue=0,e}},bt=0,ma=function(e){return e!=null&&e.constructor===void 0},de.prototype.setState=function(e,r){var t=this.__s;t&&t!=this.state||(t=this.__s=K({},this.state)),typeof e=="function"&&(e=e(K({},t),this.props)),e&&(K(t,e),this.__v&&(r&&this.__k.push(r),Oe(this)))},de.prototype.forceUpdate=function(e){this.__v&&(this.__g|=4,e&&this.__h.push(e),Oe(this))},de.prototype.render=Y,X=[],ue=0,vt=function(e,r){return e.__v.__b-r.__v.__b},le=Symbol(),Q=Symbol(),wt=/(PointerCapture)$|Capture$/i,Ue=0,qe=ht(!1),He=ht(!0),yt=0;var Z,T,Ge,At,We=Object.is,ge=0,Ot=[],Xe=[],L=C,Tt=L.__b,Dt=L.__r,zt=L.diffed,Ft=L.__c,Bt=L.unmount,Et=L.__;function he(e,r){L.__h&&L.__h(T,e,ge||r),ge=0;var t=T.__H||(T.__H={__:[],__h:[]});return e>=t.__.length&&t.__.push({}),t.__[e]}function D(e){return ge=1,ya(Ut,e)}function ya(e,r,t){var a=he(Z++,2);if(a.t=e,!a.__c&&(a.__=[t?t(r):Ut(void 0,r),function(o){var l=a.__N?a.__N[0]:a.__[0],f=a.t(l,o);We(l,f)||(a.__N=[f,a.__[1]],a.__c.setState({}))}],a.__c=T,!T.__f)){T.__f=!0;var s=T.shouldComponentUpdate;T.shouldComponentUpdate=function(o,l,f){var d=this.__H;if(!d)return!0;var c=!1,p=this.props!=o;if(d.__.some(function(b){b.__N&&(c=!0,We(b.__[0],b.__N[0])||(p=!0))}),s){var g=s.call(this,o,l,f);return c?g||p:g}return!c||p}}return a.__}function B(e,r){var t=he(Z++,3);!L.__s&&Ke(t.__H,r)&&(t.__P=!0,t.__=e,t.u=r,T.__H.__h.push(t))}function be(e,r){var t=he(Z++,4);!L.__s&&Ke(t.__H,r)&&(t.__P=!1,t.__=e,t.u=r,T.__h.push(t))}function j(e){return ge=5,re(function(){return{current:e}},[])}function re(e,r){var t=he(Z++,7);return Ke(t.__H,r)&&(t.__=e(),t.__H=r),t.__}function ka(){var e;do{for(;e=Xe.shift();)try{ee(e)}catch(t){L.__e(t,{__:(e=e.__P)&&e.__v})}for(;e=Ot.shift();){var r=e.__H;if(e.__P&&r)try{r.__h.some(ee),r.__h.some($e),r.__h=[]}catch(t){r.__h=[],L.__e(t,e.__v)}}}while(Xe.length)}L.__b=function(e){T=null,Tt&&Tt(e)},L.__=function(e,r){e&&r.__k&&r.__k.__m&&(e.__m=r.__k.__m),Et&&Et(e,r)},L.__r=function(e){Dt&&Dt(e),Z=0;var r=(T=e.__c).__H;r&&(Ge==T?T.__h=[]:(r.__h.some(ee),r.__h.some($e),Z=0),r.__h=[],r.__.some(function(t){t.__N&&(t.__=t.__N),t.u=t.__N=void 0})),Ge=T},L.diffed=function(e){zt&&zt(e);var r=e.__c;r&&r.__H&&(r.__H.__h.length&&Ht(Ot.push(r)),r.__H.__.some(function(t){t.u&&(t.__H=t.u)})),Ge=T=null},L.__c=function(e,r){r.some(function(t){try{t.__h.some(ee),t.__h=t.__h.filter(function(a){return!a.__||$e(a)})}catch(a){r.some(function(s){s.__h&&(s.__h=[])}),r=[],L.__e(a,t.__v)}}),Ft&&Ft(e,r)},L.unmount=function(e){Bt&&Bt(e);var r,t,a=e.__c;a&&a.__H&&(a.__H.__.some(function(s){try{if(s.__P&&s.__c){if(t===void 0){for(t=e.__;t&&(!t.__c||!t.__c.__P);)t=t.__;t=t&&t.__c}s.__P=t,Ht(Xe.push(s))}else ee(s)}catch(o){r=o}}),a.__H=void 0,r&&L.__e(r,a.__v))};var qt=typeof requestAnimationFrame=="function";function Ca(e){var r,t=function(){clearTimeout(a),qt&&cancelAnimationFrame(r),setTimeout(e)},a=setTimeout(t,35);qt&&(r=requestAnimationFrame(t))}function Ht(e){e!=1&&At==L.requestAnimationFrame||((At=L.requestAnimationFrame)||Ca)(ka)}function ee(e){var r=T,t=e.__c;typeof t=="function"&&(e.__c=void 0,t()),T=r}function $e(e){var r=T;e.__c=e.__(),T=r}function Ke(e,r){return!e||e.length!=r.length||r.some(function(t,a){return!We(t,e[a])})}function Ut(e,r){return typeof r=="function"?r(e):r}var It=`/* RoFit \u2014 one stylesheet for the on-profile sheet, the library/settings page and the popup.
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
  /* 66%: secondary text stays \u2265 4.5:1 on the tinted surfaces too (62% measured ~4.3:1 on --rf-surface in light). */
  --rf-muted: color-mix(in srgb, var(--rf-fg) 66%, var(--rf-bg));
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
.rf-ib.sm { width: 28px; height: 28px; }
.rf-upd .rf-ib.sm { margin: -4px 0; color: var(--rf-muted); }
.rf-upd .rf-ib.sm:hover:not(:disabled) { color: var(--rf-fg); }
.rf-upd { display: inline-flex; align-items: center; gap: 2px; }
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
.rf .rf-search input:focus-visible { outline: none; }
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
.rf-logo { width: 48px; height: 48px; border-radius: 12px; background: var(--rf-accent); color: var(--rf-accent-fg); display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }

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

/* ==== 2.0 ============================================================================================ */

/* Balanced motion: the same choreography as Full at about half the travel, no overshoot, no stagger. */
.rf.mb { --rf-dy: 6px; --rf-dy-s: 4px; --rf-dx: 5px; --rf-pop: .985; --rf-lift: -1px; --rf-press: .98; --rf-drop: 3px; --rf-spring: var(--rf-ease); }
.rf.mb .rf-grid.intro .rf-cell, .rf.mb .rf-pop-row, .rf.mb .rf-reasons li { animation-delay: 0s; }
.rf.mb .rf-btn.on .rf-ico { animation: none; }

/* small helpers */
.rf-ell { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
.rf-maxw { max-width: 16ch; }
.rf-pad { padding-left: 20px; padding-right: 20px; }
.rf-btn em.rf-count-badge, .rf-count-badge { font-style: normal; margin-left: 0; min-width: 18px; height: 18px; padding: 0 5px; border-radius: 9px; background: var(--rf-accent); color: var(--rf-accent-fg);
  font-size: 11px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center; font-variant-numeric: tabular-nums; }
.rf-btn.danger.solid { background: var(--rf-bad); color: #fff; }
.rf-btn.danger.solid:hover:not(:disabled) { background: color-mix(in srgb, var(--rf-bad) 86%, #000); }
.rf-cmdk { gap: 8px; height: 34px; padding: 0 8px 0 10px; color: var(--rf-muted); border: 1px solid var(--rf-line); }
.rf-cmdk:hover:not(:disabled) { color: var(--rf-fg); }
.rf-note.warn { background: color-mix(in srgb, var(--rf-warn) 13%, var(--rf-bg)); }
.rf-note.warn > .rf-ico { color: var(--rf-warn); }
.rf-hintline.warn { color: var(--rf-warn); margin: 0; }

/* popovers reuse the menu surface */
.rf-menu.rf-pop { min-width: 0; max-width: none; padding: 14px; transform-origin: top left; }

/* dialogs: header with close, scrolling body */
.rf-page .rf-scrim { position: fixed; }
.rf-dialog-h { display: flex; align-items: flex-start; gap: 8px; margin: -6px -8px 10px 0; }
.rf-dialog-h h3 { flex: 1; margin: 6px 0 0; min-width: 0; overflow-wrap: anywhere; }
.rf-dialog-b { display: flex; flex-direction: column; gap: 12px; max-height: min(64vh, 560px); overflow-y: auto; margin: 0 -20px; padding: 2px 20px 4px; scrollbar-width: thin; }
.rf-dialog-b p { margin-bottom: 0; }
.rf-dialog-b + .rf-dialog-actions { margin-top: 18px; }
.rf-dialog.wide { width: min(560px, calc(100% - 32px)); }
.rf-dialog-p { color: var(--rf-muted); margin-bottom: 18px; }
.rf-dialog-p p { margin-bottom: 8px; }
.rf-field { display: flex; flex-direction: column; gap: 6px; font-size: 12px; font-weight: 600; color: var(--rf-muted); }
.rf-field input, .rf-field textarea { border: 0; border-radius: var(--rf-r); background: var(--rf-surface-2); padding: 9px 11px; font-size: 14px; font-weight: 400; color: var(--rf-fg); width: 100%; resize: vertical; }
.rf-field textarea { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 12.5px; min-height: 84px; }
.rf-field input:focus, .rf-field textarea:focus { outline: 2px solid var(--rf-accent); outline-offset: 0; background: var(--rf-bg); }
.rf-sugg { display: flex; flex-wrap: wrap; gap: 6px; }

/* explorer filters */
.rf-filters { display: flex; flex-direction: column; gap: 14px; }
.rf-frow { display: flex; align-items: center; justify-content: space-between; gap: 12px; font-weight: 600; font-size: 13px; }
.rf-frow > span { display: flex; flex-direction: column; min-width: 0; }
.rf-frow small { font-weight: 400; color: var(--rf-muted); font-size: 12px; }
label.rf-frow { cursor: pointer; }
.rf-fsec { display: flex; flex-direction: column; gap: 7px; font-weight: 600; font-size: 13px; }
.rf-fchips { display: flex; flex-wrap: wrap; gap: 6px; }
.rf-fchips .rf-chip.btn { height: 26px; font-size: 12px; }
.rf-fnote { display: flex; align-items: flex-start; gap: 8px; padding: 10px; border-radius: 8px; background: var(--rf-surface); font-size: 12.5px; color: var(--rf-muted); }
.rf-fnote > .rf-ico { margin-top: 2px; }
.rf-fnote span { flex: 1; }
.rf-factions { display: flex; justify-content: flex-end; border-top: 1px solid var(--rf-line); padding-top: 10px; margin-top: -2px; }
.rf-card-cost { margin-left: auto; padding-left: 6px; font-weight: 700; color: var(--rf-fg); font-variant-numeric: tabular-nums; font-size: 11.5px; flex: none; }
.rf-card-ic { color: var(--rf-muted); }

/* who-can-see badge */
.rf-access .rf-ico { margin-left: -1px; }
.rf-access-pop { display: flex; flex-direction: column; gap: 10px; font-size: 13px; }
.rf-access-pop .rf-btn { align-self: flex-start; }
.rf-access-h { display: flex; align-items: center; gap: 10px; font-size: 15px; }
.rf-access-i { width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: var(--rf-surface-2); color: var(--rf-muted); flex: none; }
.rf-access-i.ok { background: color-mix(in srgb, var(--rf-ok) 16%, var(--rf-bg)); color: var(--rf-ok); }
.rf-access-i.accent { background: var(--rf-accent-soft); color: var(--rf-accent); }
.rf-access-i.warn { background: color-mix(in srgb, var(--rf-warn) 16%, var(--rf-bg)); color: var(--rf-warn); }
.rf-access-pop .rf-techdl { padding: 0; }

/* command palette & shortcuts */
.rf-scrim.top { align-items: flex-start; padding-top: min(12vh, 96px); }
.rf-palette { width: min(620px, calc(100% - 24px)); max-height: min(70vh, 560px); display: flex; flex-direction: column; overflow: hidden; background: var(--rf-bg); border: 1px solid var(--rf-line);
  border-radius: 14px; box-shadow: 0 24px 60px rgb(0 0 0 / .4); animation: rf-pop .24s var(--rf-ease) backwards; transform-origin: top center; }
.rf-scrim[data-state=closed] > .rf-palette { animation: rf-pop-out .14s var(--rf-ease-in) forwards; }
.rf-pal-in { display: flex; align-items: center; gap: 10px; height: 54px; padding: 0 16px; border-bottom: 1px solid var(--rf-line); color: var(--rf-muted); flex: none; }
.rf-pal-in input { flex: 1; min-width: 0; height: 100%; border: 0; background: transparent; outline: none; font-size: 16px; color: var(--rf-fg); }
.rf-pal-in input::placeholder { color: var(--rf-muted); }
.rf-pal-note { display: flex; align-items: center; gap: 8px; padding: 8px 16px; font-size: 12.5px; color: var(--rf-muted); background: var(--rf-surface); flex: none; }
.rf-pal-list { flex: 1 1 auto; min-height: 0; overflow-y: auto; padding: 6px; scrollbar-width: thin; }
.rf-pal-sec { padding: 10px 10px 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .07em; color: var(--rf-muted); }
.rf-pal-row { display: flex; align-items: center; gap: 12px; padding: 7px 10px; border-radius: 8px; cursor: pointer; }
.rf-pal-row.on { background: var(--rf-surface-2); }
.rf-pal-ic { position: relative; width: 32px; height: 32px; border-radius: 7px; background: var(--rf-surface-2); display: flex; align-items: center; justify-content: center; flex: none; overflow: hidden; color: var(--rf-muted); }
.rf-pal-row.on .rf-pal-ic { background: var(--rf-bg); color: var(--rf-fg); }
.rf-pal-ic .rf-thumb { width: 100%; height: 100%; border-radius: 0; background: none; }
.rf-pal-t { display: flex; flex-direction: column; flex: 1; min-width: 0; }
.rf-pal-t b, .rf-pal-t small { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.rf-pal-t b { font-weight: 600; }
.rf-pal-t small { font-size: 12px; color: var(--rf-muted); }
.rf-pal-enter { color: var(--rf-muted); }
.rf-pal-empty { padding: 24px; text-align: center; color: var(--rf-muted); }
.rf-pal-foot { display: flex; gap: 16px; padding: 8px 16px; border-top: 1px solid var(--rf-line); font-size: 12px; color: var(--rf-muted); flex: none; }
.rf-pal-foot span { display: inline-flex; align-items: center; gap: 4px; }
.rf-keys { display: flex; flex-direction: column; margin: 0; }
.rf-keyrow { display: grid; grid-template-columns: 140px 1fr; gap: 12px; align-items: center; padding: 7px 0; border-bottom: 1px solid var(--rf-line); font-size: 13px; }
.rf-keyrow:last-child { border-bottom: 0; }
.rf-keyrow dt { display: flex; gap: 4px; flex-wrap: wrap; }
.rf-keyrow dd { margin: 0; color: var(--rf-muted); }
.rf-keyrow .rf-kbd { min-width: 22px; text-align: center; font-size: 12px; line-height: 20px; background: var(--rf-surface); }

/* share */
.rf-share-access { display: flex; align-items: flex-start; gap: 10px; padding: 10px 12px; border-radius: 10px; background: var(--rf-surface); }
.rf-share-access > .rf-ico { margin-top: 2px; color: var(--rf-muted); }
.rf-share-access.ok > .rf-ico { color: var(--rf-ok); }
.rf-share-access.accent > .rf-ico { color: var(--rf-accent); }
.rf-share-access.warn > .rf-ico { color: var(--rf-warn); }
.rf-share-access div { display: flex; flex-direction: column; gap: 2px; font-size: 13px; }
.rf-share-access span { color: var(--rf-muted); }
.rf-consent { padding: 10px 12px; border-radius: 10px; border: 1px solid var(--rf-line); }
.rf-linkbox { display: flex; align-items: center; gap: 8px; border-radius: var(--rf-r); background: var(--rf-surface-2); padding-right: 10px; }
.rf-field .rf-linkbox input { background: transparent; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 12.5px; }
.rf-share-what { display: flex; flex-direction: column; gap: 8px; font-size: 13px; }
.rf-share-what ul, .rf-report ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 5px; }
.rf-share-what li, .rf-report li { display: flex; align-items: flex-start; gap: 8px; }
.rf-share-what li .rf-ico, .rf-report li .rf-ico { margin-top: 2px; color: var(--rf-ok); }
.rf-share-what li:last-child .rf-ico { color: var(--rf-muted); }

/* inspector: similar outfits */
.rf-similar { display: grid; grid-template-columns: repeat(auto-fill, minmax(96px, 1fr)); gap: 6px; margin-bottom: 8px; }
.rf-sim-card { display: flex; flex-direction: column; gap: 6px; min-width: 0; padding: 5px; border-radius: 10px; text-align: left; transition: background .12s, transform .12s var(--rf-ease); }
.rf-sim-card:hover { background: var(--rf-surface); }
.rf-sim-card:active { transform: scale(var(--rf-press)); }
.rf-sim-t { display: flex; flex-direction: column; min-width: 0; font-size: 12.5px; }
.rf-sim-t b { font-weight: 600; }
.rf-sim-t small { color: var(--rf-muted); font-size: 11.5px; }
.rf-hrow + .rf-hrow { border-top: 1px solid var(--rf-line); }

/* library 2.0 */
.rf-fav { position: absolute; top: 12px; right: 12px; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--rf-muted);
  background: color-mix(in srgb, var(--rf-bg) 84%, transparent); box-shadow: 0 1px 3px rgb(0 0 0 / .14); opacity: 0; transform: scale(.8); transition: opacity .12s, transform .3s var(--rf-spring), color .12s; }
.rf-cell:hover .rf-fav, .rf-cell:focus-within .rf-fav, .rf-fav.on { opacity: 1; transform: none; }
.rf-fav:hover { color: var(--rf-fg); }
.rf-fav.on { color: #e9a100; }
.rf-fav.on .rf-ico { fill: currentColor; }
.rf-colls { display: flex; flex-direction: column; }
.rf-coll { display: flex; align-items: center; gap: 10px; padding: 8px 0; border-bottom: 1px solid var(--rf-line); }
.rf-coll:last-child { border-bottom: 0; }
.rf-coll b { font-weight: 600; }
.rf-filepill { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: var(--rf-r); background: var(--rf-surface-2); font-size: 13px; }
.rf-filepill span { flex: 1; }
.rf-row-acts { display: flex; gap: 8px; flex-wrap: wrap; }
.rf-report { display: flex; flex-direction: column; gap: 8px; padding: 12px 14px; border-radius: 10px; background: var(--rf-surface); font-size: 13px; animation: rf-rise .25s var(--rf-ease) backwards; }
.rf-report li.warn { color: var(--rf-warn); }
.rf-report li.warn .rf-ico { color: currentColor; }
.rf-report-h b { font-weight: 700; }
.rf-report .rf-frow { border-top: 1px solid var(--rf-line); padding-top: 10px; }
.rf-report .rf-details { margin: 0; }

/* settings 2.0: sections nav + body */
.rf-settings { width: min(1040px, 100%); display: grid; grid-template-columns: 220px minmax(0, 1fr); gap: 40px; align-items: start; padding: 28px 24px 80px; }
.rf-setnav { position: sticky; top: 20px; display: flex; flex-direction: column; gap: 14px; }
.rf-setnav h1 { font-size: 24px; font-weight: 800; letter-spacing: -.01em; }
.rf-setnav .rf-search { flex: none; max-width: none; }
.rf-setnav nav { display: flex; flex-direction: column; gap: 1px; }
.rf-setnav nav button { display: flex; align-items: center; gap: 10px; padding: 7px 10px; border-radius: 8px; font-weight: 600; color: var(--rf-muted); text-align: left; transition: background .12s, color .12s; }
.rf-setnav nav button:hover:not(:disabled) { background: var(--rf-surface); color: var(--rf-fg); }
.rf-setnav nav button.on { background: var(--rf-surface-2); color: var(--rf-fg); }
.rf-setnav nav button:disabled { opacity: .35; }
.rf-setbody { min-width: 0; max-width: 720px; }
.rf-setbody > .rf-setgroup:first-child { margin-top: 2px; }
.rf-setgroup { scroll-margin-top: 16px; margin-top: 36px; }
.rf-setgroup h2 { display: flex; align-items: center; gap: 8px; }
.rf-motion > .rf-setrow { border-bottom: 0; }
.rf-mprev { border-radius: 12px; background: var(--rf-surface); padding: 14px 14px 12px; margin-bottom: 6px; border-bottom: 1px solid var(--rf-line); }
.rf-mprev .rf-grid { grid-template-columns: repeat(5, minmax(0, 1fr)); pointer-events: none; }
.rf-mprev .rf-card.sk .rf-thumb { background: var(--rf-bg); }
.rf-mprev .rf-sk-l { background: var(--rf-surface-3); }
.rf-mprev-fig { position: absolute; left: 34%; right: 34%; top: 16%; bottom: 12%; border-radius: 999px 999px 10px 10px; background: var(--rf-surface-3); }
.rf-mprev-foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 10px; }
.rf-plist { list-style: none; margin: 4px 0 0; padding: 0; display: flex; flex-direction: column; }
.rf-plist li { display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid var(--rf-line); font-size: 13px; color: var(--rf-muted); }
.rf-plist li > .rf-ico { margin-top: 2px; color: var(--rf-fg); }
.rf-plist b { color: var(--rf-fg); }
.rf-plist code { font-size: 12px; }
.rf-about { display: flex; flex-direction: column; gap: 12px; padding: 14px 0; }
.rf-about-h { display: flex; align-items: center; gap: 12px; }
.rf-about-h > div { display: flex; flex-direction: column; }
.rf-logo.sm { width: 36px; height: 36px; border-radius: 9px; margin: 0; flex: none; }

/* popup 2.0 */
.rf-pop-search { padding: 0 10px 8px; }
.rf-pop-search .rf-search { max-width: none; height: 38px; }
.rf-pop-results { display: flex; flex-direction: column; gap: 1px; padding: 0 10px 4px; max-height: 360px; overflow-y: auto; }
.rf-pop-results .rf-pop-row { animation: none; cursor: pointer; }
.rf-pop-row.on { background: var(--rf-surface-2); }
.rf-pop-av.ic { color: var(--rf-muted); }
.rf-pop-row.on .rf-pop-av.ic { background: var(--rf-bg); color: var(--rf-fg); }
.rf-pop-msg { display: flex; align-items: flex-start; gap: 8px; margin: 4px 0; padding: 8px 10px; border-radius: 8px; font-size: 12.5px; background: color-mix(in srgb, var(--rf-warn) 12%, var(--rf-bg)); }
.rf-pop-msg > .rf-ico, .rf-pop-msg > .rf-spin { margin-top: 1px; color: var(--rf-warn); }
.rf-pop-msg.muted { background: none; color: var(--rf-muted); padding: 6px 8px; }
.rf-popup > .rf-pop-msg { margin: 4px 10px; }
.rf-pop-foot { margin-top: 4px; }

@media (max-width: 760px) {
  .rf-settings { grid-template-columns: 1fr; gap: 12px; padding-top: 16px; }
  .rf-setnav { position: static; }
  .rf-setnav nav { flex-direction: row; overflow-x: auto; scrollbar-width: none; }
  .rf-setnav nav button { flex: none; }
  .rf-keyrow { grid-template-columns: 1fr; gap: 4px; }
  .rf-mprev .rf-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .rf-mprev .rf-cell:nth-child(n+4) { display: none; }
  .rf-pad { padding-left: 12px; padding-right: 12px; }
}

.rf-worn-cta { display: grid; justify-items: center; gap: 6px; margin-top: 18px; color: var(--rf-muted); text-align: center; }
.rf-worn { display: grid; grid-template-columns: minmax(120px, 190px) 1fr; gap: 18px; margin-top: 20px; padding: 16px; border-radius: 12px; background: var(--rf-surface); text-align: left; animation: rf-rise .4s var(--rf-ease) backwards; }
.rf-worn-img { aspect-ratio: 1; border-radius: 10px; background: var(--rf-surface-2); display: grid; place-items: center; overflow: hidden; }
.rf-worn-img img { width: 100%; height: 100%; object-fit: contain; }
.rf-worn h4 { margin: 0; font-size: 15px; display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.rf-chip-note { font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 6px; background: color-mix(in srgb, var(--rf-accent) 14%, transparent); color: var(--rf-accent); }
.rf-worn ul { list-style: none; margin: 10px 0 0; padding: 0; display: grid; gap: 2px; }
.rf-worn li { display: flex; justify-content: space-between; gap: 12px; padding: 7px 0; border-top: 1px solid var(--rf-line); font-size: 13px; }
.rf-worn li a { display: grid; min-width: 0; text-decoration: none; color: inherit; }
.rf-worn li b { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.rf-worn li small { color: var(--rf-muted); font-size: 12px; }
.rf-worn li em { font-style: normal; font-weight: 700; white-space: nowrap; }
.rf-worn-total { margin: 10px 0 0; font-size: 13px; font-weight: 700; }
@media (max-width: 560px) { .rf-worn { grid-template-columns: 1fr; } .rf-worn-img { max-width: 220px; } }

.rf-acct { background: var(--rf-bg); min-height: 100%; }
.rf-settings.native { width: 100%; max-width: none; margin: 0; padding: 0 0 40px; }
.rf-settings.native .rf-sethead { margin-bottom: 4px; }
.rf-nativetitle { font-size: 28px; font-weight: 800; letter-spacing: -.01em; }
.rf-settings.native .rf-setgroup { margin-top: 26px; }
.rf-settings.native .rf-setgroup h2 { font-size: 18px; font-weight: 700; text-transform: none; letter-spacing: 0; color: var(--rf-fg); border-bottom: 0; padding-bottom: 2px; }
.rf-settings.native .rf-setrow { padding: 11px 0; border-bottom: 1px solid color-mix(in srgb, var(--rf-line) 60%, transparent); gap: 18px; }
.rf-settings.native .rf-setl span { font-weight: 600; font-size: 14px; }
.rf-settings.native .rf-setl small { font-size: 12px; }
.rf-settings.native .rf-setrow { animation: rf-rise .35s var(--rf-ease) backwards; }
.rf-settings.native .rf-seg button { height: 28px; font-size: 12.5px; padding: 0 9px; }
.rf-settings.native .rf-btn { height: 32px; font-size: 13px; }
.rf-settings.native .rf-switch { transform: scale(.9); transform-origin: right center; }

/* ---- toolbar popup: a list, not a poster ------------------------------------------------------------------------ */
.rf-popup.pp { width: 330px; padding: 16px 14px 10px; background: var(--rf-bg); display: flex; flex-direction: column; gap: 12px; }
.pp-head { display: flex; align-items: center; gap: 12px; padding: 0 4px; }
.pp-logo { width: 46px; height: 46px; border-radius: 14px; background: var(--rf-accent); color: var(--rf-accent-fg); display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 16px color-mix(in srgb, var(--rf-accent) 35%, transparent); animation: pp-pop .6s var(--rf-spring) backwards; }
@keyframes pp-pop { from { transform: scale(var(--rf-pop)) translateY(var(--rf-dy-s)); opacity: 0; } }
.pp-swing { transform-origin: 50% 12%; animation: pp-swing 1.6s var(--rf-ease) .35s backwards; }
@keyframes pp-swing { 0% { transform: rotate(var(--rf-sw, 24deg)); } 25% { transform: rotate(calc(var(--rf-sw, 24deg) * -.7)); } 50% { transform: rotate(calc(var(--rf-sw, 24deg) * .4)); } 75% { transform: rotate(calc(var(--rf-sw, 24deg) * -.2)); } 100% { transform: none; } }
.rm .pp-swing { --rf-sw: 0deg; }
.pp-name { flex: 1; min-width: 0; animation: rf-rise .4s var(--rf-ease) .08s backwards; }
.pp-name h1 { font-size: 24px; line-height: 1.05; font-weight: 900; letter-spacing: -.025em; }
.pp-name p { font-size: 12.5px; color: var(--rf-muted); margin-top: 2px; }
.pp-ver { font-size: 11px; font-weight: 700; color: var(--rf-muted); background: var(--rf-surface-2); padding: 2px 7px; border-radius: 6px; animation: rf-rise .4s var(--rf-ease) .2s backwards; }

.pp-here { display: flex; align-items: center; gap: 12px; width: 100%; padding: 11px 12px; border-radius: 14px; text-align: left; color: var(--rf-accent-fg); background: var(--rf-accent); position: relative; overflow: hidden;
  transition: transform .35s var(--rf-spring), box-shadow .2s; animation: rf-rise .45s var(--rf-ease) .12s backwards; }
.pp-here::after { content: ''; position: absolute; top: 0; bottom: 0; width: 40%; left: -60%; background: linear-gradient(100deg, transparent, rgb(255 255 255 / .22), transparent); transform: skewX(-18deg); }
.pp-here:hover { transform: translateY(var(--rf-lift)); box-shadow: 0 10px 24px color-mix(in srgb, var(--rf-accent) 38%, transparent); }
.pp-here:hover::after { left: 130%; transition: left .7s var(--rf-ease); }
.pp-here:active { transform: scale(var(--rf-press)); transition-duration: .08s; }
.pp-av { width: 38px; height: 38px; border-radius: 50%; background: rgb(255 255 255 / .22); display: flex; align-items: center; justify-content: center; font-weight: 800; flex: none; }
.pp-here .pp-txt small { color: color-mix(in srgb, var(--rf-accent-fg) 80%, transparent); }
.pp-open { display: inline-flex; align-items: center; gap: 4px; font-weight: 800; font-size: 13px; white-space: nowrap; }
.pp-open .rf-ico { transition: transform .3s var(--rf-spring); }
.pp-here:hover .pp-open .rf-ico { transform: translateX(4px); }

.pp-list { display: flex; flex-direction: column; border-radius: 14px; background: var(--rf-surface); overflow: hidden; }
.pp-row { display: flex; align-items: center; gap: 12px; width: 100%; padding: 11px 12px; text-align: left; position: relative; transition: background .15s;
  animation: rf-rise .42s var(--rf-ease) backwards; animation-delay: calc(160ms + var(--i, 0) * 60ms); }
.pp-row + .pp-row::before { content: ''; position: absolute; top: 0; left: 62px; right: 0; height: 1px; background: var(--rf-line); }
.pp-row:hover { background: var(--rf-surface-2); }
.pp-row:active { background: var(--rf-surface-3); }
.pp-ico { width: 38px; height: 38px; border-radius: 11px; background: var(--rf-bg); color: var(--rf-fg); display: flex; align-items: center; justify-content: center; flex: none; transition: transform .45s var(--rf-spring), background .15s, color .15s; }
.pp-row:hover .pp-ico { transform: scale(1.1) rotate(-6deg); background: var(--rf-accent); color: var(--rf-accent-fg); }
.pp-row.heart:hover .pp-ico { background: #e0457b; }
.pp-txt { display: flex; flex-direction: column; flex: 1; min-width: 0; line-height: 1.2; }
.pp-txt b { font-size: 14.5px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pp-txt small { font-size: 12px; color: var(--rf-muted); font-weight: 500; }
.pp-go { color: var(--rf-muted); transition: transform .3s var(--rf-spring), color .15s; }
.pp-row:hover .pp-go { transform: translateX(3px); color: var(--rf-fg); }
.pp-foot { display: flex; justify-content: center; align-items: center; gap: 8px; font-size: 12px; color: var(--rf-muted); animation: rf-rise .4s var(--rf-ease) .4s backwards; }
.pp-foot button { display: inline-flex; align-items: center; gap: 6px; color: var(--rf-muted); padding: 4px 6px; border-radius: 6px; transition: color .15s, background .15s; }
.pp-foot button:hover { color: var(--rf-fg); background: var(--rf-surface-2); }

.wl { position: relative; flex: 1; display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); min-height: 100vh; overflow: hidden; background: var(--rf-bg); }
.wl-glow { position: absolute; width: 70vmax; height: 70vmax; right: -20vmax; top: -25vmax; border-radius: 50%; background: radial-gradient(closest-side, color-mix(in srgb, var(--rf-accent) 22%, transparent), transparent); animation: wl-drift 14s ease-in-out infinite alternate; pointer-events: none; }
@keyframes wl-drift { to { transform: translate(-6vmax, 8vmax) scale(1.08); } }
.rm .wl-glow { animation: none; }
.wl-left { position: relative; padding: 7vh 5vw 5vh 7vw; display: flex; flex-direction: column; justify-content: center; max-width: 720px; margin-left: auto; width: 100%; }
.wl-logo { width: 64px; height: 64px; border-radius: 18px; background: var(--rf-accent); color: var(--rf-accent-fg); display: flex; align-items: center; justify-content: center; margin-bottom: 22px; box-shadow: 0 12px 30px color-mix(in srgb, var(--rf-accent) 38%, transparent); animation: pp-pop .7s var(--rf-spring) backwards; }
.wl-eyebrow { font-size: 12px; font-weight: 800; letter-spacing: .09em; text-transform: uppercase; color: var(--rf-accent); animation: rf-rise .5s var(--rf-ease) .1s backwards; }
.wl-title { font-size: clamp(38px, 5.2vw, 60px); line-height: 1.02; font-weight: 900; letter-spacing: -.035em; margin: 8px 0 14px; }
.wl-title span { display: inline-block; margin-right: .26em; animation: rf-rise .7s var(--rf-spring) backwards; animation-delay: calc(160ms + var(--i, 0) * 90ms); }
.wl-lead { font-size: 17px; color: var(--rf-muted); max-width: 46ch; margin-bottom: 26px; animation: rf-rise .6s var(--rf-ease) .45s backwards; }
.wl-lead b { color: var(--rf-fg); }
.wl-steps, .wl-news { list-style: none; display: flex; flex-direction: column; gap: 16px; margin-bottom: 30px; }
.wl-steps li, .wl-news li { display: flex; gap: 14px; animation: rf-rise .6s var(--rf-ease) backwards; animation-delay: calc(520ms + var(--i, 0) * 110ms); }
.wl-steps li > span { width: 28px; height: 28px; border-radius: 50%; background: var(--rf-accent-soft); color: var(--rf-accent); font-weight: 800; font-size: 13px; display: flex; align-items: center; justify-content: center; flex: none; }
.wl-news li > span { width: 36px; height: 36px; border-radius: 11px; background: var(--rf-accent-soft); color: var(--rf-accent); display: flex; align-items: center; justify-content: center; flex: none; transition: transform .45s var(--rf-spring); }
.wl-news li:hover > span { transform: scale(1.12) rotate(-8deg); }
.wl-steps b, .wl-news b { font-size: 15px; }
.wl-steps p, .wl-news p { color: var(--rf-muted); margin-top: 2px; max-width: 48ch; font-size: 14px; }
.wl-actions { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; animation: rf-rise .6s var(--rf-ease) .95s backwards; }
.wl-links { display: flex; gap: 18px; margin-top: 18px; animation: rf-rise .6s var(--rf-ease) 1.05s backwards; }
.wl-links a { display: inline-flex; align-items: center; gap: 6px; color: var(--rf-muted); font-weight: 600; font-size: 13.5px; transition: color .15s, transform .3s var(--rf-spring); }
.wl-links a:hover { color: var(--rf-accent); transform: translateY(var(--rf-lift)); }
.wl-right { position: relative; display: flex; align-items: center; justify-content: center; padding: 40px 5vw 40px 2vw; }

/* the self-playing demo */
.demo { position: relative; width: min(500px, 100%); border-radius: 16px; background: var(--rf-bg); border: 1px solid var(--rf-line); box-shadow: 0 30px 70px rgb(0 0 0 / .16); overflow: hidden; animation: rf-rise .8s var(--rf-ease) .3s backwards; transition: opacity .5s; }
.demo.reset { opacity: 0; }
.d-bar { display: flex; gap: 6px; padding: 10px 12px; background: var(--rf-surface); }
.d-bar i { width: 9px; height: 9px; border-radius: 50%; background: var(--rf-surface-3); }
.d-head { display: flex; align-items: center; gap: 12px; padding: 16px 18px 10px; }
.d-av { width: 46px; height: 46px; border-radius: 50%; background: var(--rf-surface-3); }
.d-head b { display: block; font-size: 16px; } .d-head small { color: var(--rf-muted); }
.d-tabs { position: relative; display: flex; border-bottom: 1px solid var(--rf-line); padding: 0 8px; }
.d-tabs > span { flex: 1; text-align: center; padding: 11px 0; font-weight: 700; font-size: 13px; color: var(--rf-muted); transition: color .3s; }
.d-tabs .on-about { color: var(--rf-fg); }
.d-outfits-tab { opacity: 0; transform: translateX(26px); transition: opacity .4s, transform .7s var(--rf-spring), color .3s; }
.a1 .d-outfits-tab { opacity: 1; transform: none; }
.a3 .d-outfits-tab { color: var(--rf-fg) !important; }
.a3 .on-about { color: var(--rf-muted); }
.d-underline { position: absolute; left: 8px; bottom: -1px; height: 2px; width: calc((100% - 16px) / 3); background: var(--rf-fg); transform: translateX(0); transition: transform .5s var(--rf-ease); }
.a3 .d-underline { transform: translateX(200%); }
.d-ripple { position: absolute; right: calc(8px + (100% - 16px) / 6 - 16px); top: 6px; width: 32px; height: 32px; border-radius: 50%; border: 2px solid var(--rf-accent); opacity: 0; transform: scale(.3); }
.a3 .d-ripple { animation: d-ripple .7s var(--rf-ease); }
@keyframes d-ripple { 0% { opacity: .9; transform: scale(.3); } 100% { opacity: 0; transform: scale(1.8); } }
.d-body { position: relative; display: flex; gap: 12px; padding: 14px; min-height: 250px; }
.d-grid { flex: 1; min-width: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; align-content: start; }
.tile { opacity: 0; transform: translateY(12px) scale(.94); transition: opacity .4s, transform .6s var(--rf-spring); transition-delay: 0s; }
.a3 .tile { opacity: 1; transform: none; transition-delay: calc(var(--i, 0) * 70ms); }
.tile > span { display: flex; align-items: center; justify-content: center; aspect-ratio: 1; border-radius: 10px; background: var(--rf-surface); color: var(--rf-muted); transition: background .3s, box-shadow .3s, color .3s; }
.tile > b { display: block; height: 7px; width: 70%; border-radius: 4px; background: var(--rf-surface-2); margin-top: 7px; }
.a4 .tile.t1 > span { background: var(--rf-accent-soft); color: var(--rf-accent); box-shadow: inset 0 0 0 2px var(--rf-accent); }
.d-insp { flex: 0 0 0; min-width: 0; overflow: hidden; border-radius: 12px; background: var(--rf-surface); padding: 0; opacity: 0; transform: translateX(16px); transition: flex-basis .5s var(--rf-ease), opacity .35s, transform .5s var(--rf-ease); }
.a4 .d-insp { flex-basis: 44%; padding: 12px; opacity: 1; transform: none; }
.d-hero { height: 78px; border-radius: 9px; background: var(--rf-surface-2); display: flex; align-items: center; justify-content: center; color: var(--rf-muted); }
.d-title { display: block; height: 10px; width: 60%; border-radius: 5px; background: var(--rf-surface-3); margin: 12px 0 10px; }
.d-rows i { display: block; height: 20px; border-radius: 6px; background: var(--rf-surface-2); margin-bottom: 7px; opacity: 0; transform: translateY(6px); transition: opacity .3s, transform .5s var(--rf-spring); }
.a4 .d-rows i { opacity: 1; transform: none; }
.a4 .d-rows i:nth-child(2) { transition-delay: .08s; } .a4 .d-rows i:nth-child(3) { transition-delay: .16s; } .a4 .d-rows i:nth-child(4) { transition-delay: .24s; }
.d-cursor { position: absolute; left: 0; top: 0; opacity: 0; pointer-events: none; transform: translate(380px, 260px); transition: transform .9s var(--rf-ease), opacity .3s; filter: drop-shadow(0 2px 3px rgb(0 0 0 / .3)); z-index: 3; }
.a2 .d-cursor { opacity: 1; transform: translate(410px, 112px); }
.a3 .d-cursor { transform: translate(410px, 112px) scale(.88); }
.a4 .d-cursor { transform: translate(170px, 215px); }
.rm .demo, .rm .d-cursor, .rm .tile, .rm .d-insp { transition-duration: .01s; }
@media (max-width: 900px) { .wl { grid-template-columns: 1fr; } .wl-right { display: none; } .wl-left { margin: 0 auto; padding: 6vh 6vw; } }

/* ---- "Wearing now" panel shown when saved outfits are private ------------------------------------------- */

/* ---- motion v3 & polish ---------------------------------------------------------------------------
   One layer on top of everything above, so it can be read (and reverted) as a unit.
   - Springs are re-tuned to be near-critically damped: ~2% overshoot instead of ~16%. Still physical, never wobbly.
   - Distinct gestures per component (press, pop, settle, burst) instead of one bounce everywhere.
   - Inspector entrance is choreographed: surface \u2192 preview \u2192 title/meta \u2192 cost \u2192 sections, each a beat apart,
     and every part is interactive from frame one (only transform/opacity animate; nothing waits).
   - All travel still reads --rf-* distances, so Balanced shortens it and Calm (.rm) zeroes it automatically. */
.rf {
  --rf-spring: linear(0, .0175, .0659 2.3%, .1381 3.6%, .4245 8%, .5574 10.3%, .6763, .7759 15.1%, .8541 17.7%, .9147 20.5%, .9568 23.4%, .9837 26.4%, 1.0007 29.6%, 1.0153 34.4%, 1.0198 40%, 1.0168 46.6%, 1.0056 59.3%, .9994 74.2%, 1);
  /* a livelier spring reserved for small confirmations (save, pick, toast) */
  --rf-spring-pop: linear(0, .039, .157 3.7%, .629 10.6%, .82 14%, .953 17.4%, 1.044 21%, 1.098 24.9%, 1.114 28.3%, 1.108 31.5%, 1.064 37.3%, 1.008 46.3%, .988 53.2%, .995 66.4%, 1);
  --rf-beat: 45ms;
  --rf-elev-1: 0 1px 2px rgb(0 0 0 / .06), 0 2px 8px rgb(0 0 0 / .06);
  --rf-elev-2: 0 2px 6px rgb(0 0 0 / .08), 0 12px 28px rgb(0 0 0 / .14);
  --rf-elev-3: 0 8px 20px rgb(0 0 0 / .14), 0 28px 60px rgb(0 0 0 / .26);
  --rf-ring: 0 0 0 2px var(--rf-bg), 0 0 0 4px var(--rf-accent);
}
.rf.mb { --rf-spring-pop: var(--rf-ease); --rf-beat: 20ms; }
.rf.rm { --rf-spring-pop: var(--rf-ease); --rf-beat: 0ms; }

/* type: slightly tighter headings, tabular numbers anywhere a count can change under the cursor */
.rf-iname-h { letter-spacing: -.012em; text-wrap: balance; }
.rf-count, .rf-tabs em, .rf-cost-n, .rf-progress + * { font-variant-numeric: tabular-nums; }
.rf-empty h3, .rf-dialog h3 { text-wrap: balance; letter-spacing: -.005em; }
.rf-empty p, .rf-dialog p { text-wrap: pretty; }

/* ---- buttons: a press you can feel, a release that settles ------------------------------------- */
.rf-btn, .rf-ib { transition: background .14s, color .14s, box-shadow .18s, transform .32s var(--rf-spring); will-change: auto; }
.rf-btn:active:not(:disabled), .rf-ib:active:not(:disabled) { transition: background .06s, transform .07s var(--rf-ease); }
.rf-btn.primary { box-shadow: 0 1px 0 rgb(255 255 255 / .12) inset, 0 1px 2px rgb(0 0 0 / .18); }
.rf-btn.primary:hover:not(:disabled) { box-shadow: 0 1px 0 rgb(255 255 255 / .12) inset, 0 4px 14px color-mix(in srgb, var(--rf-accent) 36%, transparent); }
.rf-btn .rf-ico, .rf-ib .rf-ico { transition: transform .32s var(--rf-spring); }
.rf-ib:hover:not(:disabled) .rf-ico { transform: scale(1.08); }
.rf-ib:active:not(:disabled) .rf-ico { transform: scale(.9); transition-duration: .07s; }
/* toggled-on buttons (Save \u2192 Saved, filters): icon pops with a soft ring burst */
.rf-btn.on { box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--rf-accent) 30%, transparent); }
.rf-btn.on .rf-ico { animation: rf-pop-ico .46s var(--rf-spring-pop); }
@keyframes rf-pop-ico { 0% { transform: scale(.55) rotate(-12deg); } 60% { transform: scale(1.12) rotate(3deg); } }
.rf-btn.on::after { content: ''; position: absolute; inset: 0; border-radius: inherit; pointer-events: none; box-shadow: 0 0 0 0 color-mix(in srgb, var(--rf-accent) 45%, transparent); animation: rf-burst .6s var(--rf-ease) both; }
@keyframes rf-burst { to { box-shadow: 0 0 0 10px transparent; } }
.rf.rm .rf-btn.on::after, .rf.mb .rf-btn.on::after { animation: none; }
.rf.rm .rf-btn.on .rf-ico { animation: none; }

/* focus: a two-tone ring that works on any surface, light or dark */
.rf :focus-visible { outline: none; box-shadow: var(--rf-ring); transition: box-shadow .12s; }
.rf .rf-search input:focus-visible { box-shadow: none; }

/* ---- segmented controls & tabs: thumbs ride the spring, labels cross-fade ---------------------- */
.rf-seg::before { transition: transform .42s var(--rf-spring), width .42s var(--rf-spring); }
.rf-tabs::after { height: 3px; border-radius: 3px 3px 0 0; background: var(--rf-accent); transition: transform .44s var(--rf-spring), width .44s var(--rf-spring); }
.rf-tabs button { transition: color .18s; }
.rf-tabs button .rf-ico { transition: transform .3s var(--rf-spring); }
.rf-tabs button.on .rf-ico { transform: translateY(-1px); }
.rf-tabs em { transition: background .2s, color .2s; }
.rf-tabs button.on em { background: var(--rf-accent-soft); color: var(--rf-accent); }

/* ---- search: the field grows when it has your attention --------------------------------------- */
.rf-search { transition: box-shadow .18s, background .18s, flex-basis .36s var(--rf-ease), max-width .36s var(--rf-ease); }
.rf-search:focus-within { max-width: 460px; flex-basis: 300px; box-shadow: 0 0 0 2px var(--rf-accent), var(--rf-elev-1); }
.rf-search > .rf-ico { transition: transform .3s var(--rf-spring), color .15s; }
.rf-search:focus-within > .rf-ico { transform: scale(1.1); color: var(--rf-accent); }
.rf-clear { animation: rf-pop .22s var(--rf-ease) backwards; }

/* ---- explorer cards ---------------------------------------------------------------------------- */
.rf-card { transition: background .16s, box-shadow .2s, transform .34s var(--rf-spring); }
.rf-card:hover { box-shadow: var(--rf-elev-1); }
.rf-thumb { transition: transform .38s var(--rf-spring), box-shadow .2s; }
.rf-card:hover .rf-thumb { box-shadow: 0 8px 18px -10px rgb(0 0 0 / .35); }
.rf-thumb img { transition: opacity .3s, transform .5s var(--rf-ease); }
.rf-card:hover .rf-thumb.loaded img { transform: scale(1.035); }
.rf-grid.list .rf-card:hover .rf-thumb.loaded img { transform: none; }
.rf-card:active .rf-thumb { transition: transform .08s var(--rf-ease); }
.rf-card-name { transition: color .15s; }
.rf-card:hover .rf-card-name { color: var(--rf-fg); }
/* the open outfit is anchored with an accent rail, so you can see where the inspector came from */
.rf-cell.active .rf-card { background: var(--rf-accent-soft); box-shadow: inset 0 0 0 1.5px color-mix(in srgb, var(--rf-accent) 55%, transparent); }
.rf-cell.active .rf-thumb { box-shadow: 0 0 0 2px var(--rf-accent); }
/* multi-select: card sinks slightly, ring draws in, check pops */
.rf-cell.picked .rf-card { transform: scale(.975); box-shadow: inset 0 0 0 2px var(--rf-accent), 0 0 0 4px color-mix(in srgb, var(--rf-accent) 16%, transparent); }
.rf.rm .rf-cell.picked .rf-card { transform: none; }
.rf-pick { transition: opacity .14s, transform .4s var(--rf-spring-pop), background .14s, border-color .14s; }
.rf-cell.picked .rf-pick { animation: rf-pick .42s var(--rf-spring-pop); }
.rf-cell.picked .rf-pick svg { animation: rf-check .32s .05s var(--rf-ease) backwards; }
@keyframes rf-pick { 0% { transform: scale(.6); } }
@keyframes rf-check { from { opacity: 0; transform: scale(.4) rotate(-20deg); } }
.rf.rm .rf-cell.picked .rf-pick, .rf.rm .rf-cell.picked .rf-pick svg { animation: none; }
.rf-badge { transition: transform .3s var(--rf-spring); animation: rf-pick .4s var(--rf-spring-pop) backwards; }
.rf-card:hover .rf-badge { transform: translateY(var(--rf-lift)); }
/* density/layout switches are FLIP-animated in JS; give grid gap changes a matching ease */
.rf-grid { transition: gap .3s var(--rf-ease); }
/* first load cascade: fewer, tighter beats, with a little lift */
.rf-grid.intro .rf-cell { animation: rf-card-in .5s var(--rf-spring) backwards; animation-delay: calc(min(var(--i, 0), 18) * 22ms); }
@keyframes rf-card-in { from { opacity: 0; transform: translateY(calc(var(--rf-dy-s) * 1.5)) scale(var(--rf-pop)); } }
/* skeletons: a softer sweep that doesn't flicker against Roblox's own shimmer */
.rf-skel { background: linear-gradient(105deg, transparent 30%, color-mix(in srgb, var(--rf-fg) 7%, transparent) 50%, transparent 70%) var(--rf-surface); background-size: 220% 100%; animation-duration: 1.6s; animation-timing-function: var(--rf-ease); }

/* selection tray: rises with the spring, its count ticks */
.rf-tray { box-shadow: var(--rf-elev-3); border-color: color-mix(in srgb, var(--rf-accent) 25%, var(--rf-line)); backdrop-filter: saturate(1.2); animation: rf-tray-in .46s var(--rf-spring) backwards; }
@keyframes rf-tray-in { from { opacity: 0; transform: translateY(calc(var(--rf-dy) * 1.6)) scale(var(--rf-pop)); } }
.rf-tray b { display: inline-block; animation: rf-tick .3s var(--rf-ease) backwards; }
@keyframes rf-tick { from { opacity: .3; transform: translateY(var(--rf-drop)); } }

/* empty / error states: icon floats in first, copy follows */
.rf-empty > * { animation: rf-rise .4s var(--rf-ease) backwards; }
.rf-empty > :nth-child(2) { animation-delay: calc(var(--rf-beat) * 1); }
.rf-empty > :nth-child(3) { animation-delay: calc(var(--rf-beat) * 2); }
.rf-empty > :nth-child(n+4) { animation-delay: calc(var(--rf-beat) * 3); }
.rf-empty > .rf-ico:first-child, .rf-empty > svg:first-child { color: var(--rf-accent); padding: 12px; box-sizing: content-box; border-radius: 16px; background: var(--rf-accent-soft); }

/* ---- inspector choreography ------------------------------------------------------------------- */
.rf-dock[data-anim=enter] > .rf-insp { animation: rf-dock-in .42s var(--rf-spring) backwards; }
.rf-dock[data-anim=enter] .rf-ibar > * { animation: rf-fade .3s backwards; animation-delay: calc(var(--rf-beat) * 2); }
.rf-dock[data-anim=enter] .rf-hero > *,
.rf-dock[data-anim=switch] .rf-hero > :not(.rf-stage) { animation: rf-rise .42s var(--rf-ease) backwards; }
.rf-dock[data-anim=enter] .rf-hero > :nth-child(2), .rf-dock[data-anim=switch] .rf-hero > :nth-child(2) { animation-delay: calc(var(--rf-beat) * 2); }
.rf-dock[data-anim=enter] .rf-hero > :nth-child(3), .rf-dock[data-anim=switch] .rf-hero > :nth-child(3) { animation-delay: calc(var(--rf-beat) * 3); }
.rf-dock[data-anim=enter] .rf-hero > :nth-child(n+4), .rf-dock[data-anim=switch] .rf-hero > :nth-child(n+4) { animation-delay: calc(var(--rf-beat) * 4); }
.rf-dock[data-anim=enter] .rf-cost, .rf-dock[data-anim=switch] .rf-cost { animation: rf-rise .44s var(--rf-ease) backwards; animation-delay: calc(var(--rf-beat) * 5); }
.rf-dock[data-anim=enter] .rf-sec { animation: rf-rise .44s var(--rf-ease) backwards; animation-delay: calc(var(--rf-beat) * 6); }
.rf-dock[data-anim=enter] .rf-sec + .rf-sec { animation-delay: calc(var(--rf-beat) * 7); }
.rf-dock[data-anim=enter] .rf-sec + .rf-sec + .rf-sec ~ .rf-sec { animation-delay: calc(var(--rf-beat) * 8); }
/* switching outfits: the panel stays; the preview cross-dissolves with a small zoom, details re-settle */
.rf-dock[data-anim=switch] > .rf-insp > .rf-iscroll { animation: none; }
.rf-dock[data-anim=switch] .rf-stage .rf-thumb { animation: rf-swap .38s var(--rf-ease) backwards; }
@keyframes rf-swap { from { opacity: 0; transform: scale(calc(2 - var(--rf-pop))); } }
.rf-dock[data-anim=switch] .rf-sec { animation: rf-fade .3s calc(var(--rf-beat) * 4) backwards; }
.rf-dock[data-anim=exit] > .rf-insp { animation: rf-dock-out .24s var(--rf-ease-in) both; }

/* inspector surfaces */
.rf-stage { box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--rf-fg) 6%, transparent); isolation: isolate; }
.rf-stage::after { content: ''; position: absolute; left: 18%; right: 18%; bottom: 7%; height: 9%; border-radius: 50%; z-index: -1;
  background: radial-gradient(closest-side, color-mix(in srgb, var(--rf-fg) 16%, transparent), transparent); }
.rf-ibar { position: relative; backdrop-filter: blur(8px); background: color-mix(in srgb, var(--rf-bg) 88%, transparent); z-index: 2; }
.rf-cost { box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--rf-fg) 5%, transparent); }
.rf-costbar .seg { transition: flex-grow .6s var(--rf-spring); transform-origin: left; animation: rf-bar .7s var(--rf-ease) backwards; }
.rf-costbar .seg:nth-child(2) { animation-delay: 40ms; } .rf-costbar .seg:nth-child(3) { animation-delay: 80ms; } .rf-costbar .seg:nth-child(n+4) { animation-delay: 120ms; }
@keyframes rf-bar { from { transform: scaleX(0); } }
.rf.rm .rf-costbar .seg { animation: rf-fade .3s backwards; }
.rf-sec-h { border-radius: 8px; margin: 0 8px; width: calc(100% - 16px); padding: 7px 12px; transition: background .14s; }
.rf-sec-b { padding-left: 20px; padding-right: 20px; }
.rf-sec + .rf-sec { border-top: 1px solid color-mix(in srgb, var(--rf-line) 60%, transparent); padding-top: 10px; }
.rf-chev { transition: transform .38s var(--rf-spring); }
.rf-collapse { transition: grid-template-rows .36s var(--rf-ease); }

/* ---- menus, dialogs, toasts, tooltips -------------------------------------------------------- */
.rf-menu { box-shadow: var(--rf-elev-3); animation: rf-menu-in .24s var(--rf-spring) backwards; }
@keyframes rf-menu-in { from { opacity: 0; transform: scale(var(--rf-pop)) translateY(calc(var(--rf-drop) * -1)); } }
.rf-menu .rf-mi { animation: rf-fade .2s backwards; transition: background .1s, padding-left .2s var(--rf-ease); }
.rf-menu .rf-mi:nth-child(-n+3) { animation-delay: 20ms; } .rf-menu .rf-mi:nth-child(n+4) { animation-delay: 40ms; }
.rf-mi:hover:not(:disabled) { padding-left: 13px; }
.rf.rm .rf-mi:hover:not(:disabled) { padding-left: 10px; }
.rf-mi .rf-ico { transition: transform .26s var(--rf-spring); }
.rf-mi:hover:not(:disabled) .rf-ico { transform: scale(1.1); }
.rf-scrim { backdrop-filter: blur(3px); background: rgb(0 0 0 / .38); }
.rf-dialog { box-shadow: var(--rf-elev-3); border: 1px solid var(--rf-line); animation: rf-dialog-in .38s var(--rf-spring) backwards; }
@keyframes rf-dialog-in { from { opacity: 0; transform: translateY(var(--rf-dy-s)) scale(var(--rf-pop)); } }
.rf-toast { padding: 11px 18px 11px 14px; border-radius: 12px; animation: rf-toast .5s var(--rf-spring-pop) backwards; box-shadow: var(--rf-elev-3); }
.rf-toast > .rf-ico:first-child { animation: rf-pop-ico .5s .08s var(--rf-spring-pop) backwards; }
.rf.rm .rf-toast > .rf-ico:first-child { animation: none; }
[title]:where(.rf-ib) { position: relative; }

/* ---- compare mirror: a slider you want to grab ------------------------------------------------- */
.rf-overlay { border-radius: 12px; overflow: hidden; }
.rf-overlay-line { width: 2px; background: linear-gradient(transparent, var(--rf-accent) 12%, var(--rf-accent) 88%, transparent); }
.rf-overlay-line::after { width: 34px; height: 34px; margin: -17px; border-width: 3px; box-shadow: var(--rf-elev-2);
  background: var(--rf-accent) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m9 7-5 5 5 5M15 7l5 5-5 5'/%3E%3C/svg%3E") center / 18px no-repeat;
  transition: transform .3s var(--rf-spring), box-shadow .2s; }
.rf-overlay:hover .rf-overlay-line::after { transform: scale(1.08); }
.rf-overlay:active .rf-overlay-line::after { transform: scale(.94); box-shadow: 0 0 0 8px color-mix(in srgb, var(--rf-accent) 22%, transparent); transition-duration: .1s; }
.rf-overlay-tag { box-shadow: var(--rf-elev-1); backdrop-filter: blur(6px); background: color-mix(in srgb, var(--rf-bg) 82%, transparent); transition: opacity .2s; }
.rf-compare .rf-thumb.loaded img { animation: rf-swap .36s var(--rf-ease) backwards; }

/* ---- refresh line & progress: meaning, not decoration ----------------------------------------- */
.rf-progress { height: 5px; border-radius: 3px; }
.rf-progress i { border-radius: inherit; transition: transform .45s var(--rf-spring); background: linear-gradient(90deg, var(--rf-accent), color-mix(in srgb, var(--rf-accent) 70%, #fff)); }
.rf-refresh::after { background: linear-gradient(90deg, transparent, var(--rf-accent), transparent); }

/* ---- narrow / mobile: the inspector becomes a sheet that rises over the grid --------------------- */
@media (max-width: 760px) {
  .rf-shell.narrow .rf-dock { border-radius: 16px 16px 0 0; top: 10px; box-shadow: 0 -10px 40px rgb(0 0 0 / .24); overflow: hidden; }
  .rf-shell.narrow .rf-dock::before { content: ''; position: absolute; top: 6px; left: 50%; width: 36px; height: 4px; margin-left: -18px; border-radius: 2px; background: var(--rf-surface-3); z-index: 3; }
  .rf-shell.narrow .rf-dock[data-anim=enter] > .rf-insp { animation: rf-sheet-up .44s var(--rf-spring) backwards; }
  .rf-shell.narrow .rf-dock[data-anim=exit] > .rf-insp { animation: rf-sheet-down .26s var(--rf-ease-in) both; }
  .rf-shell.narrow .rf-ibar { padding-top: 14px; }
  .rf-stage { height: clamp(200px, 42vh, 340px); }
  .rf-tray { left: 10px; right: 10px; bottom: 10px; }
  .rf-toolbar { gap: 6px; }
  .rf-search, .rf-search:focus-within { flex-basis: 100%; max-width: none; }
  .rf-btn, .rf-ib { min-height: 40px; }
  .rf-ib { min-width: 40px; }
  .rf-overlay-line::after { width: 40px; height: 40px; margin: -20px; }
}
@keyframes rf-sheet-up { from { transform: translateY(calc(var(--rf-dy) * 6)); opacity: 0; } }
@keyframes rf-sheet-down { to { transform: translateY(calc(var(--rf-dy) * 6)); opacity: 0; } }
@media (min-width: 1500px) {
  .rf-dock { width: min(560px, 38%); }
  .rf-stage { height: clamp(280px, 42vh, 440px); }
}

/* Calm: same choreography order, no travel. Delays compress so nothing feels laggy. */
.rf.rm .rf-dock[data-anim] *, .rf.rm .rf-empty > * { animation-delay: 0s !important; }
.rf.rm .rf-card:hover .rf-thumb.loaded img { transform: none; }
.rf.rm .rf-search:focus-within > .rf-ico, .rf.rm .rf-ib:hover .rf-ico { transform: none; }

/* ==== pass 2: popup (rebuilt component) ======================================================= */
.rf-pop2 { width: 340px; max-width: 100%; } /* yields to a vertical scrollbar instead of forcing a horizontal one */
.rf-pop2 .rf-pop-h { gap: 4px; padding: 10px 6px 8px 12px; }
.rf-pop2 .rf-pop-h > b { margin-left: 5px; }
.rf-pop-status { display: inline-flex; align-items: center; gap: 5px; margin-left: 8px; padding: 2px 8px 2px 6px; border-radius: 99px; font-size: 11px; font-weight: 700; color: var(--rf-muted); background: var(--rf-surface); }
.rf-pop-status i { width: 7px; height: 7px; border-radius: 50%; background: currentColor; }
.rf-pop-status.ok i { background: #2fb36b; box-shadow: 0 0 0 0 rgb(47 179 107 / .5); animation: rf-pop-ping 2.4s var(--rf-ease) 1s 2; }
.rf-pop-status.off i, .rf-pop-status.bad i { background: #e2a03f; }
@keyframes rf-pop-ping { 70% { box-shadow: 0 0 0 6px rgb(47 179 107 / 0); } 100% { box-shadow: 0 0 0 0 rgb(47 179 107 / 0); } }
.rf-pop-clear { width: 22px; height: 22px; margin-right: -4px; animation: rf-pop .16s var(--rf-spring-pop, var(--rf-ease)) backwards; }
.rf-pop-banner { margin: 0 10px 6px; border-radius: 9px; background: color-mix(in srgb, #e2a03f 14%, var(--rf-bg)); }
.rf-pop-home, .rf-pop-results { animation: rf-rise .26s var(--rf-ease) backwards; }
.rf-pop-here { margin: 2px 10px 4px; }
.rf-pop-here .rf-pop-now { margin: 0; width: 100%; text-align: left; }
.rf-pop-acts { display: flex; gap: 6px; flex-wrap: wrap; padding: 8px 0 2px; }
.rf-pop-acts .rf-chip { cursor: pointer; display: inline-flex; align-items: center; gap: 5px; transition: transform .25s var(--rf-spring), background .15s, color .15s; animation: rf-rise .3s var(--rf-ease) backwards; }
.rf-pop-acts .rf-chip:nth-child(2) { animation-delay: 40ms; } .rf-pop-acts .rf-chip:nth-child(3) { animation-delay: 80ms; }
.rf-pop-acts .rf-chip:active { transform: scale(var(--rf-press)); }
.rf-pop-acts .rf-chip.on { background: var(--rf-accent-soft); color: var(--rf-accent); }
.rf-pop-tabs { margin: 8px 10px 4px; display: flex; width: calc(100% - 20px); }
.rf-pop-tabs button { flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 5px; }
.rf-pop-tabs em { font-style: normal; font-size: 10.5px; font-weight: 800; color: var(--rf-accent); }
.rf-pop-panel { padding: 2px 10px 4px; min-height: 132px; animation: rf-pop-panel .28s var(--rf-ease) backwards; }
@keyframes rf-pop-panel { from { opacity: 0; transform: translateX(var(--rf-dx)); } }
.rf-pop-item { display: flex; align-items: center; gap: 2px; animation: rf-rise .32s var(--rf-ease) backwards; animation-delay: calc(40ms + var(--i, 0) * 35ms); }
.rf-pop-item > .rf-pop-row { animation: none; flex: 1; min-width: 0; }
.rf-pop-row:focus-visible, .rf-pop-side:focus-visible { outline: 2px solid var(--rf-accent); outline-offset: -2px; }
.rf-pop-name { overflow: hidden; } .rf-pop-name, .rf-pop-name small { white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }
.rf-pop-av:not(.ic) { color: #fff; font-weight: 800; font-size: 13px; background: hsl(var(--h, 210) 55% 46%); }
.rf-pop-th { width: 38px; height: 38px; flex: none; border-radius: 9px; overflow: hidden; background: var(--rf-surface-3); display: flex; align-items: center; justify-content: center; color: var(--rf-muted); transition: transform .3s var(--rf-spring); }
.rf-pop-th img { width: 100%; height: 100%; object-fit: cover; }
.rf-pop-row:hover .rf-pop-th { transform: scale(1.06) rotate(-2deg); }
.rf-pop-side { opacity: 0; transition: opacity .15s; } .rf-pop-item:hover .rf-pop-side, .rf-pop-side:focus-visible { opacity: 1; }
.rf-pop-empty { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 4px; padding: 16px 18px 12px; color: var(--rf-muted); font-size: 12.5px; animation: rf-pop .3s var(--rf-spring) backwards; }
.rf-pop-empty b { color: var(--rf-fg); font-size: 13.5px; }
.rf-pop-empty .rf-btn { margin-top: 6px; }
.rf-pop-empty-ic { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: var(--rf-accent-soft); color: var(--rf-accent); margin-bottom: 4px; }
.rf-pop-skels { display: flex; flex-direction: column; gap: 8px; padding-top: 6px; }
.rf-pop-skels .rf-skel { height: 40px; border-radius: 10px; position: relative; overflow: hidden; }
.rf-pop-lib em { font-style: normal; margin-left: auto; color: var(--rf-muted); font-weight: 500; font-size: 12px; }

/* ==== pass 2: the mirror (Compare rebuilt) ===================================================== */
.rf-mirror { display: grid; grid-template-columns: minmax(0, 1fr) 150px minmax(0, 1fr); gap: 18px; align-items: center; margin-bottom: 22px; }
.rf-mirror.blend { grid-template-columns: 1fr; justify-items: center; }
.rf-mside { margin: 0; display: flex; flex-direction: column; gap: 10px; min-width: 0; }
.rf-mside figcaption { display: flex; flex-direction: column; gap: 3px; align-items: flex-start; }
.rf-mside.b figcaption { align-items: flex-end; text-align: right; }
.rf-mside figcaption b { font-size: 16px; }
.rf-mstage { height: clamp(280px, 48vh, 520px); will-change: transform; box-shadow: var(--rf-elev-1, none); }
.rf-mside.a .rf-mstage { box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--rf-accent) 35%, transparent); }
.rf-mside.b .rf-mstage { box-shadow: inset 0 0 0 2px color-mix(in srgb, #e2a03f 40%, transparent); }
.rf-mid { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.rf-mid-n { display: flex; gap: 10px; font-size: 12px; font-weight: 700; font-variant-numeric: tabular-nums; }
.rf-mid-n span { display: inline-flex; align-items: center; gap: 4px; }
.rf-mid-n i, .rf-mirror-legend span::before { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
.rf-mid-n i.a, .rf-mirror-legend .a::before { background: var(--rf-accent); } .rf-mid-n i.b, .rf-mirror-legend .b::before { background: #e2a03f; } .rf-mid-n i.both { background: var(--rf-muted); }
.rf-mirror-legend span::before { content: ''; }
.rf-simring { position: relative; width: 120px; height: 120px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.rf-simring svg { position: absolute; inset: 0; transform: rotate(-90deg); }
.rf-simring circle { fill: none; stroke-width: 6; }
.rf-simring .bg { stroke: var(--rf-surface-3); }
.rf-simring .fg { stroke: var(--rf-accent); stroke-linecap: round; transition: stroke-dashoffset .9s var(--rf-spring); animation: rf-ring-in 1s var(--rf-ease) backwards; }
@keyframes rf-ring-in { from { stroke-dashoffset: 214; } }
.rf-simring b { font-size: 34px; font-weight: 800; line-height: 1; letter-spacing: -.02em; font-variant-numeric: tabular-nums; }
.rf-simring b small { font-size: 15px; color: var(--rf-muted); }
.rf-simring span { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--rf-muted); }
.rf-wipe { position: relative; width: min(100%, 620px); height: clamp(320px, 58vh, 600px); user-select: none; touch-action: pan-y; cursor: ew-resize; overflow: hidden; will-change: transform; }
.rf-wipe.grab { cursor: grabbing; }
.rf-wipe-l, .rf-wipe-r { position: absolute; inset: 0; }
.rf-wipe-r { clip-path: inset(0 0 0 var(--pos)); background: var(--rf-surface); }
.rf-wipe .rf-thumb { position: absolute; inset: 0; aspect-ratio: auto; background: none; border-radius: 0; }
.rf-wipe .rf-thumb img { width: 100%; height: 100%; object-fit: contain; }
.rf-wipe-h { position: absolute; top: 0; bottom: 0; left: var(--pos); width: 44px; margin-left: -22px; display: flex; align-items: center; justify-content: center; outline: none; }
.rf-wipe-h::before { content: ''; position: absolute; top: 0; bottom: 0; left: 21px; width: 2px; background: var(--rf-accent); box-shadow: 0 0 12px rgb(0 0 0 / .25); }
.rf-wipe-k { position: relative; width: 34px; height: 34px; border-radius: 50%; background: var(--rf-accent); color: var(--rf-accent-fg); display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 18px rgb(0 0 0 / .3); transition: transform .3s var(--rf-spring-pop, var(--rf-spring)); }
.rf-wipe:hover .rf-wipe-k, .rf-wipe.grab .rf-wipe-k { transform: scale(1.12); }
.rf-wipe-h:focus-visible .rf-wipe-k { outline: 2px solid var(--rf-fg); outline-offset: 3px; }
/* Keyboard/double-click steps glide with a soft spring; pointer drags track the finger 1:1. */
.rf-wipe.glide .rf-wipe-r { transition: clip-path .34s var(--rf-spring); }
.rf-wipe.glide .rf-wipe-h { transition: left .34s var(--rf-spring); }
.rf-overlay-tag.l { left: 10px; } .rf-overlay-tag.r { right: 10px; }
.rf-wipe .rf-overlay-tag { transition: opacity .2s; }
.rf-mirror-legend { display: flex; align-items: center; gap: 16px; font-size: 13px; font-weight: 600; }
.rf-mirror-legend span { display: inline-flex; align-items: center; gap: 6px; }
.rf-mirror-legend b { padding: 3px 10px; border-radius: 99px; background: var(--rf-accent-soft); color: var(--rf-accent); font-size: 12px; }
.rf-swapico { display: inline-flex; transform: rotate(calc(var(--turn, 0) * 180deg)); transition: transform .5s var(--rf-spring); }
.rf-lens { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 12px; }
.rf-lens .rf-chip { cursor: pointer; display: inline-flex; align-items: center; gap: 6px; max-width: 260px; transition: background .15s, color .15s, transform .25s var(--rf-spring); }
.rf-lens .rf-chip:active { transform: scale(var(--rf-press)); }
.rf-lens .rf-chip.on { background: var(--rf-fg); color: var(--rf-bg); }
.rf-lens .rf-chip.lens-a.on { background: var(--rf-accent); color: var(--rf-accent-fg); }
.rf-lens .rf-chip.lens-b.on { background: #e2a03f; color: #111; }
.rf-lens-t { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.rf-lens em { font-style: normal; font-weight: 800; font-variant-numeric: tabular-nums; opacity: .8; }
.rf-cols3:not(.lens-all) { grid-template-columns: 1fr; }
.rf-cols3:not(.lens-all) .rf-ccol { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 4px 12px; align-content: start; }
.rf-cols3:not(.lens-all) .rf-ccol h3 { grid-column: 1 / -1; }
.rf-ccol { animation: rf-rise .3s var(--rf-ease) backwards; }
.rf-crow { position: relative; animation: rf-rise .3s var(--rf-ease) backwards; animation-delay: calc(var(--i, 0) * 22ms); }
.rf-owned { margin-left: auto; color: #2fb36b; display: inline-flex; }
.rf-ccost h3, .rf-cdetails h3 { display: flex; align-items: center; gap: 6px; }
.rf-cbarrow { display: grid; grid-template-columns: minmax(0, 9em) 1fr auto; gap: 10px; align-items: center; margin: 6px 0; font-size: 13px; }
.rf-cbarrow span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.rf-cbarrow i { height: 8px; border-radius: 99px; background: var(--rf-surface-3); position: relative; overflow: hidden; }
.rf-cbarrow i::after { content: ''; position: absolute; inset: 0; border-radius: inherit; transform-origin: left; transform: scaleX(var(--w, 0)); transition: transform .8s var(--rf-spring); animation: rf-bar-in .9s var(--rf-ease) backwards; background: var(--rf-accent); }
.rf-cbarrow.b i::after { background: #e2a03f; }
@keyframes rf-bar-in { from { transform: scaleX(0); } }
.rf-scalediff em { font-style: normal; font-weight: 700; font-size: 12px; margin-left: auto; }
.rf-scalediff em.up { color: #2fb36b; } .rf-scalediff em.down { color: #e2a03f; }
@media (max-width: 760px) {
  .rf-mirror:not(.blend) { grid-template-columns: 1fr 1fr; gap: 12px; }
  .rf-mirror:not(.blend) .rf-mid { grid-column: 1 / -1; order: -1; flex-direction: row; justify-content: center; gap: 18px; }
  .rf-simring { width: 84px; height: 84px; } .rf-simring b { font-size: 24px; }
  .rf-mstage { height: clamp(200px, 36vh, 320px); }
  .rf-wipe { height: clamp(280px, 52vh, 460px); }
  .rf-mside.b figcaption { align-items: flex-start; text-align: left; }
}
.rm .rf-simring .fg, .rm .rf-cbarrow i::after, .rm .rf-swapico, .rm .rf-wipe.glide .rf-wipe-r, .rm .rf-wipe.glide .rf-wipe-h { transition: none; animation: none; }

/* ==== pass 2: welcome story (one persistent miniature, six moments) =========================== */
.wl2 .wl-actions .rf-btn.primary .rf-ico { transition: transform .3s var(--rf-spring); }
.wl2 .wl-actions .rf-btn.primary:hover .rf-ico { transform: translateX(3px); }
.wl-keys { display: inline-flex; align-items: center; gap: 4px; color: var(--rf-muted); font-size: 12.5px; }
.wl-story { width: min(600px, 100%); display: flex; flex-direction: column; gap: 16px; animation: rf-rise .8s var(--rf-spring) .3s backwards; }
.ws-stage { position: relative; }
.ws-win { border-radius: 16px; background: var(--rf-bg); box-shadow: 0 30px 80px rgb(0 0 0 / .28), 0 0 0 1px var(--rf-line); overflow: hidden; }
.ws-bar { display: flex; align-items: center; gap: 6px; padding: 9px 12px; background: var(--rf-surface); font-size: 11px; color: var(--rf-muted); }
.ws-bar i { width: 10px; height: 10px; border-radius: 50%; background: #ff5f57; box-shadow: inset 0 0 0 .5px rgb(0 0 0 / .18); }
.ws-bar i:nth-child(2) { background: #febc2e; }
.ws-bar i:nth-child(3) { background: #28c840; }
.ws-bar span { margin-left: 10px; padding: 2px 10px; border-radius: 99px; background: var(--rf-bg); }
.ws-head { display: flex; align-items: center; gap: 10px; padding: 12px 16px 0; font-size: 13px; }
.ws-head small { display: block; color: var(--rf-muted); font-size: 11px; }
.ws-av { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, hsl(210 60% 55%), hsl(260 55% 55%)); }
.ws-tabs { position: relative; display: flex; gap: 16px; margin-left: auto; font-size: 12px; font-weight: 600; color: var(--rf-muted); padding-bottom: 8px; }
.ws-tab-o { display: inline-flex; gap: 4px; align-items: center; transition: color .3s; }
.ws-tab-o em { font-style: normal; font-size: 10px; padding: 0 5px; border-radius: 99px; background: var(--rf-accent-soft); color: var(--rf-accent); }
.ws-ul { position: absolute; bottom: 0; left: 0; width: 38px; height: 2px; border-radius: 2px; background: var(--rf-accent); transform: translateX(var(--ul-x, 0)); transition: transform .55s var(--rf-spring), width .55s var(--rf-spring); }
.wl-story:not([data-step=discover]) .ws-ul { --ul-x: 132px; width: 58px; }
.wl-story:not([data-step=discover]) .ws-tab-o { color: var(--rf-fg); }
.ws-body { position: relative; aspect-ratio: 16 / 10; margin-top: 2px; border-top: 1px solid var(--rf-line); }
.ws-grid { position: absolute; left: 4%; top: 6%; width: 92%; height: 88%; display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 1fr); gap: 3%; transition: opacity .5s var(--rf-ease), transform .6s var(--rf-spring), filter .5s; transform-origin: left center; }
.ws-tile { position: relative; border-radius: 10px; background: color-mix(in srgb, hsl(var(--h) 60% 55%) 16%, var(--rf-surface)); overflow: hidden; display: flex; align-items: center; justify-content: center; animation: ws-tile-in .6s var(--rf-spring) backwards; animation-delay: calc(500ms + var(--i) * 70ms); }
.ws-tile b { position: absolute; left: 8%; right: 30%; bottom: 7%; height: 7%; border-radius: 3px; background: color-mix(in srgb, var(--rf-fg) 18%, transparent); }
@keyframes ws-tile-in { from { opacity: 0; transform: translateY(14px) scale(.94); } }
.ws-fig { position: relative; width: 34%; height: 70%; display: block; }
.ws-fig i { position: absolute; left: 50%; background: hsl(var(--h) 60% 52%); border-radius: 4px; transform: translateX(-50%); }
.ws-fig i:nth-child(1) { top: 0; width: 46%; aspect-ratio: 1; border-radius: 30%; background: hsl(36 60% 74%); }
.ws-fig i:nth-child(2) { top: 28%; width: 82%; height: 36%; }
.ws-fig i:nth-child(3) { top: 64%; width: 62%; height: 34%; background: hsl(var(--h) 35% 30%); }
.ws-fig.big { width: 30%; height: 64%; }
.ws-hero, .ws-twin { position: absolute; border-radius: 12px; display: flex; align-items: center; justify-content: center; background: radial-gradient(120% 90% at 50% 10%, color-mix(in srgb, hsl(var(--h) 60% 55%) 24%, var(--rf-surface)), var(--rf-surface)); transition: left .7s var(--rf-spring), top .7s var(--rf-spring), width .7s var(--rf-spring), height .7s var(--rf-spring), opacity .35s var(--rf-ease), box-shadow .4s, border-radius .5s; }
.ws-hero { left: 3.6%; top: 6%; width: 28.6%; height: 42.5%; opacity: 0; z-index: 2; }
.ws-twin { left: 96%; top: 6%; width: 42%; height: 88%; opacity: 0; z-index: 1; }
.ws-panel { position: absolute; left: 52%; top: 6%; width: 44%; height: 88%; padding: 4% 4.5%; border-radius: 12px; background: var(--rf-surface); display: flex; flex-direction: column; gap: 7px; opacity: 0; transform: translateX(16px); transition: opacity .4s var(--rf-ease), transform .6s var(--rf-spring), left .7s var(--rf-spring), width .7s var(--rf-spring); font-size: 12px; overflow: hidden; }
.ws-title { font-size: 15px; letter-spacing: -.01em; }
.ws-cost { display: inline-flex; align-items: center; gap: 5px; font-weight: 700; } .ws-cost em { font-style: normal; color: var(--rf-muted); font-weight: 500; }
.ws-chips { display: flex; gap: 5px; } .ws-chips i { height: 14px; width: 22%; border-radius: 99px; background: var(--rf-surface-3); }
.ws-items { list-style: none; display: flex; flex-direction: column; gap: 5px; margin: 2px 0 0; padding: 0; }
.ws-items li { display: flex; align-items: center; gap: 7px; opacity: 0; transform: translateY(6px); transition: opacity .3s var(--rf-ease), transform .45s var(--rf-spring); transition-delay: calc(var(--i) * 70ms); }
.ws-items li span { width: 20px; height: 20px; border-radius: 5px; background: var(--rf-surface-3); flex: none; }
.ws-items li b { height: 7px; flex: 1; border-radius: 3px; background: color-mix(in srgb, var(--rf-fg) 16%, transparent); }
.ws-items li em { width: 18%; height: 7px; border-radius: 3px; background: var(--rf-accent-soft); }
.ws-save { margin-top: auto; display: inline-flex; align-items: center; gap: 6px; align-self: flex-start; padding: 6px 12px; border-radius: 99px; background: var(--rf-accent); color: var(--rf-accent-fg); font-weight: 700; transition: transform .4s var(--rf-spring-pop, var(--rf-spring)), background .3s; }
.ws-save .rf-ico:last-child { display: none; }
.ws-sim, .ws-wipe { position: absolute; opacity: 0; transition: opacity .4s var(--rf-ease), transform .6s var(--rf-spring); }
.ws-sim { left: 50%; top: 50%; transform: translate(-50%, -50%) scale(.6); z-index: 3; width: 64px; height: 64px; border-radius: 50%; background: var(--rf-bg); box-shadow: 0 8px 24px rgb(0 0 0 / .2), inset 0 0 0 4px var(--rf-accent); display: flex; flex-direction: column; align-items: center; justify-content: center; line-height: 1; }
.ws-sim b { font-size: 16px; } .ws-sim small { font-size: 9px; color: var(--rf-muted); text-transform: uppercase; font-weight: 700; }
.ws-wipe { top: 6%; height: 88%; left: 50%; width: 2px; background: var(--rf-accent); z-index: 3; }
.ws-lib { position: absolute; right: 4%; bottom: 5%; display: inline-flex; align-items: center; gap: 5px; padding: 5px 10px; border-radius: 99px; background: var(--rf-surface); font-size: 11.5px; font-weight: 700; opacity: 0; transform: translateY(8px); transition: opacity .3s, transform .5s var(--rf-spring); z-index: 4; }
.ws-lib em { font-style: normal; color: var(--rf-accent); opacity: 0; transition: opacity .3s .5s; }
.ws-cursor { position: absolute; left: 60%; top: 22%; z-index: 5; filter: drop-shadow(0 2px 3px rgb(0 0 0 / .3)); transition: left .8s var(--rf-spring), top .8s var(--rf-spring), opacity .3s; }
/* moments */
.wl-story[data-step=discover] .ws-cursor { left: 82%; top: 17%; }
.wl-story[data-step=open] .ws-hero { opacity: 1; box-shadow: 0 18px 40px rgb(0 0 0 / .28); }
.wl-story[data-step=open] .ws-cursor { left: 18%; top: 40%; }
.wl-story[data-step=open] .ws-grid { filter: saturate(.6); }
.wl-story:is([data-step=inspect], [data-step=explore], [data-step=compare], [data-step=save]) .ws-grid { opacity: 0; transform: scale(.92); pointer-events: none; }
.wl-story:is([data-step=inspect], [data-step=explore]) .ws-hero { opacity: 1; left: 4%; top: 6%; width: 44%; height: 88%; }
.wl-story:is([data-step=inspect], [data-step=explore]) .ws-panel { opacity: 1; transform: none; }
.wl-story[data-step=inspect] .ws-items li:nth-child(-n+2) { opacity: 1; transform: none; }
.wl-story[data-step=inspect] .ws-cursor { left: 74%; top: 34%; }
.wl-story[data-step=explore] .ws-hero { width: 36%; }
.wl-story[data-step=explore] .ws-panel { left: 44%; width: 52%; }
.wl-story[data-step=explore] .ws-items li { opacity: 1; transform: none; }
.wl-story[data-step=explore] .ws-cursor { left: 70%; top: 70%; }
.wl-story[data-step=compare] .ws-hero { opacity: 1; left: 5%; top: 6%; width: 42%; height: 88%; }
.wl-story[data-step=compare] .ws-twin { opacity: 1; left: 53%; }
.wl-story[data-step=compare] .ws-sim { opacity: 1; transform: translate(-50%, -50%) scale(1); transition-delay: .35s; }
.wl-story[data-step=compare] .ws-wipe { opacity: .9; animation: ws-sweep 2.6s var(--rf-ease) .5s both; }
@keyframes ws-sweep { 0% { transform: translateX(0); } 40% { transform: translateX(-160px); } 75% { transform: translateX(140px); } 100% { transform: translateX(0); } }
.wl-story[data-step=compare] .ws-cursor { left: 52%; top: 80%; }
.wl-story[data-step=save] .ws-hero { opacity: 1; left: 76%; top: 64%; width: 18%; height: 22%; border-radius: 9px; box-shadow: 0 10px 26px rgb(0 0 0 / .25); }
.wl-story[data-step=save] .ws-panel { opacity: .5; transform: none; left: 4%; width: 60%; }
.wl-story[data-step=save] .ws-save { transform: scale(1.06); background: #2fb36b; }
.wl-story[data-step=save] .ws-save .rf-ico:first-child { display: none; } .wl-story[data-step=save] .ws-save .rf-ico:last-child { display: inline-flex; }
.wl-story[data-step=save] .ws-lib { opacity: 1; transform: none; } .wl-story[data-step=save] .ws-lib em { opacity: 1; }
.wl-story[data-step=save] .ws-cursor { left: 18%; top: 84%; }
.ws-caption { display: flex; gap: 12px; align-items: flex-start; min-height: 64px; }
.ws-caption > div { animation: rf-rise .45s var(--rf-ease) backwards; }
.ws-caption b { font-size: 16px; } .ws-caption p { color: var(--rf-muted); font-size: 14px; margin: 2px 0 0; max-width: 46ch; }
.ws-cap-ic { width: 34px; height: 34px; flex: none; border-radius: 10px; display: flex; align-items: center; justify-content: center; background: var(--rf-accent-soft); color: var(--rf-accent); animation: rf-pop .4s var(--rf-spring) backwards; }
.ws-ctrl { display: flex; align-items: center; gap: 10px; }
.ws-dots { display: flex; gap: 6px; flex: 1; }
.ws-dots button { flex: 1; height: 18px; display: flex; align-items: center; cursor: pointer; background: none; border: 0; padding: 0; }
.ws-dots button i { position: relative; display: block; width: 100%; height: 4px; border-radius: 99px; background: var(--rf-surface-3); overflow: hidden; transition: height .2s; }
.ws-dots button:hover i { height: 6px; }
.ws-dots button i::after { content: ''; position: absolute; inset: 0; background: var(--rf-accent); transform-origin: left; transform: scaleX(0); }
.ws-dots button.past i::after, .ws-dots button.on i::after { transform: scaleX(1); }
.ws-dots button.on i.run::after { animation: ws-prog var(--ms) linear both; }
.wl-story:hover .ws-dots button.on i.run::after { animation-play-state: paused; }
@keyframes ws-prog { from { transform: scaleX(0); } }
.ws-dots button:focus-visible { outline: 2px solid var(--rf-accent); outline-offset: 2px; border-radius: 4px; }
@media (max-width: 900px) {
  .wl2 { grid-template-columns: 1fr; }
  .wl2 .wl-right { display: flex; order: -1; padding: 18px 5vw 0; }
  .wl2 .wl-left { padding: 18px 6vw 6vh; }
  .wl2 .wl-title { font-size: clamp(32px, 9vw, 44px); }
  .wl-story { gap: 10px; }
  .ws-bar span, .ws-head small { display: none; }
  .ws-tabs { gap: 10px; font-size: 11px; }
  .wl-story:not([data-step=discover]) .ws-ul { --ul-x: 108px; width: 52px; }
  .ws-panel { font-size: 10.5px; gap: 5px; } .ws-title { font-size: 12.5px; }
  .ws-caption { min-height: 0; } .ws-caption p { font-size: 13px; }
  .wl-keys { display: none; }
}
.rm .wl-story *, .rm .wl-story { transition: none !important; animation: none !important; }
@media (prefers-reduced-motion: reduce) { .wl-story *, .wl-story { transition-duration: .01ms !important; animation: none !important; } }

/* ==== 3.0: collector numbering, honest unknowns, steady cards, wardrobe overview ===================
   Inside roblox.com this still inherits Roblox's font and sampled colours; only details are borrowed from the
   "get the look" editorial: a quiet catalogue number, figures that show when they are a lower bound. */
.rf-sr { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); clip-path: inset(50%); white-space: nowrap; border: 0; }
/* A known value prints solid. A lower bound (or an unknown) is visibly different: dashed underline + help cursor + tooltip. */
.rf-fig-n { font-variant-numeric: tabular-nums; white-space: nowrap; }
.rf-fig-n.approx { text-decoration: underline dashed; text-decoration-color: color-mix(in srgb, currentColor 55%, transparent); text-decoration-thickness: 1px; text-underline-offset: .22em; cursor: help; }
.rf-fig-n.unknown { color: var(--rf-muted); }
.rf-chip.unknown { background: transparent; box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--rf-fg) 26%, transparent); color: var(--rf-muted); }
.rf-chip.unknown .rf-ico { opacity: .85; }

/* cards: fixed thumbnail, names clamp to two lines, the line below never changes height */
.rf-grid:not(.list) .rf-card-name { display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; line-clamp: 2; white-space: normal; overflow-wrap: anywhere; line-height: 1.25; min-height: 2.5em; }
.rf-grid.compact:not(.list) .rf-card-name { -webkit-line-clamp: 1; line-clamp: 1; min-height: 1.25em; white-space: nowrap; display: block; text-overflow: ellipsis; }
.rf-card-sub { height: 17px; }
.rf-card-cost { margin-left: auto; padding-left: 6px; font-weight: 700; color: var(--rf-fg); font-size: 11.5px; flex: none; }
.rf-grid.big .rf-cell { contain-intrinsic-size: auto 236px; }
.rf-thumb-note { text-align: center; padding: 8px; line-height: 1.25; }
.rf-thumb-note.stalled, .rf-thumb-note.ratelimited { color: color-mix(in srgb, var(--rf-fg) 55%, var(--rf-bg)); }
.rf-stage .rf-thumb-note { font-size: 13px; gap: 8px; }

/* inspector header: catalogue number, title, who/what, provenance */
.rf-kicker { display: flex; align-items: center; gap: 8px; margin: 14px 0 0; min-height: 22px; }
.rf-no { display: inline-flex; align-items: baseline; gap: 5px; padding: 2px 6px; margin-left: -6px; border-radius: 6px; color: var(--rf-muted); font-size: 12px; transition: background .14s, color .14s; }
.rf-no:hover { background: var(--rf-surface); color: var(--rf-fg); }
.rf-no-k { font-weight: 700; letter-spacing: .02em; }
.rf-no-n { font-variant-numeric: tabular-nums; letter-spacing: .02em; font-weight: 600; }
.rf-no .rf-ico { align-self: center; opacity: 0; transition: opacity .14s; }
.rf-no:hover .rf-ico, .rf-no:focus-visible .rf-ico { opacity: .8; }
.rf-kicker + .rf-iname-h { margin-top: 2px; }
.rf-meta-who { color: var(--rf-fg); font-weight: 600; }

/* cost summary: one headline figure, its make-up, then what isn't counted */
.rf-cost-k { font-size: 11px; font-weight: 700; letter-spacing: .07em; text-transform: uppercase; color: var(--rf-muted); margin-bottom: 4px; }
.rf-cost-n .rf-fig-n.approx { text-decoration-thickness: 2px; text-underline-offset: .16em; }
.rf-cost-l { margin-top: 4px; }

/* wardrobe overview (the inspector pane before an outfit is picked) */
.rf-dock.empty.ov { align-items: stretch; justify-content: flex-start; overflow-y: auto; }
.rf-ov { display: flex; flex-direction: column; gap: 6px; padding: 28px 28px 22px; width: 100%; min-height: 100%; animation: rf-rise .4s var(--rf-ease) backwards; }
.rf-ov-k { font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: var(--rf-muted); }
.rf-ov-h { font-size: 17px; font-weight: 600; display: flex; align-items: baseline; gap: 8px; margin-top: 2px; }
.rf-ov-n { font-size: 40px; line-height: 1; font-weight: 800; letter-spacing: -.02em; font-variant-numeric: tabular-nums; }
.rf-ov-sub { color: var(--rf-fg); font-size: 13.5px; line-height: 1.5; }
.rf-ov-part { color: var(--rf-muted); }
.rf-ov-dl { display: grid; grid-template-columns: max-content minmax(0, 1fr); gap: 8px 16px; margin: 14px 0 2px; padding-top: 14px; border-top: 1px solid var(--rf-line); font-size: 13px; align-items: baseline; }
.rf-ov-dl dt { color: var(--rf-muted); }
.rf-ov-dl dd { margin: 0; display: flex; align-items: baseline; gap: 8px; min-width: 0; }
.rf-ov-dl dd .rf-fig-n { margin-left: auto; font-weight: 700; }
.rf-ov-o { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--rf-fg); font-weight: 600; text-align: left; }
.rf-ov-re { margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--rf-line); }
.rf-ov-re ul { list-style: none; margin: 6px -8px 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
.rf-ov-item { display: flex; align-items: center; gap: 10px; width: 100%; padding: 5px 8px; border-radius: 8px; text-align: left; transition: background .12s; }
.rf-ov-item:hover { background: var(--rf-surface-2); }
.rf-ov-item .rf-ithumb { width: 32px; height: 32px; background: var(--rf-bg); }
.rf-ov-c { font-size: 12px; color: var(--rf-muted); flex: none; font-variant-numeric: tabular-nums; }
.rf-ov-foot { margin-top: auto; padding-top: 22px; display: flex; flex-direction: column; gap: 6px; color: var(--rf-muted); font-size: 12.5px; }
.rf-ov-foot p:first-child { display: flex; align-items: center; gap: 8px; color: var(--rf-fg); font-size: 13.5px; }
.rf-ov-keys { line-height: 1.7; }
.rf-dock-hint .rf-ov-keys { font-size: 12px; }

/* compare: one colour per side everywhere (left = accent, right = amber, shared = neutral) */
.rf-compare { --rf-side-a: var(--rf-accent); --rf-side-b: #c9861f; }
.rf-ccol.a h3 { border-color: var(--rf-side-a); } .rf-ccol.b h3 { border-color: var(--rf-side-b); } .rf-ccol.both h3 { border-color: color-mix(in srgb, var(--rf-fg) 35%, var(--rf-bg)); }
.rf-ccol h3::before { content: ''; width: 8px; height: 8px; border-radius: 50%; margin: auto 7px auto 0; flex: none; background: color-mix(in srgb, var(--rf-fg) 35%, var(--rf-bg)); }
.rf-ccol.a h3::before { background: var(--rf-side-a); } .rf-ccol.b h3::before { background: var(--rf-side-b); }
.rf-ccol h3 span { margin-left: auto; }
.rf-mside.b .rf-mstage { box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--rf-side-b) 45%, transparent); }
.rf-cbarrow.b i::after { background: var(--rf-side-b); }
.rf-cbarrow.approx i::after { -webkit-mask: linear-gradient(90deg, #000 calc(100% - 14px), transparent); mask: linear-gradient(90deg, #000 calc(100% - 14px), transparent); }
.rf-cbarrow > .rf-fig-n { font-weight: 700; }
.rf-cdelta { margin: 8px 0 4px; }
dl.rf-mid-n { display: flex; flex-direction: column; gap: 4px; margin: 0; width: 100%; max-width: 132px; }
dl.rf-mid-n > div { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
dl.rf-mid-n dt { font-size: 10.5px; font-weight: 700; letter-spacing: .04em; text-transform: uppercase; color: var(--rf-muted); display: inline-flex; align-items: center; gap: 4px; white-space: nowrap; }
dl.rf-mid-n dt::before { content: ''; width: 7px; height: 7px; border-radius: 50%; background: color-mix(in srgb, var(--rf-fg) 35%, var(--rf-bg)); }
dl.rf-mid-n .a dt::before { background: var(--rf-side-a); } dl.rf-mid-n .b dt::before { background: var(--rf-side-b); }
dl.rf-mid-n dd { margin: 0; font-size: 15px; font-weight: 800; font-variant-numeric: tabular-nums; }
@media (max-width: 760px) { dl.rf-mid-n { flex-direction: row; max-width: none; width: auto; gap: 14px; } dl.rf-mid-n > div { flex-direction: column; align-items: center; gap: 0; } }
.rf-cbar { flex-wrap: wrap; row-gap: 8px; }
.rf-cbar h2 { white-space: nowrap; }
@media (max-width: 760px) {
  .rf-cbar { padding: 8px 12px; gap: 6px; }
  .rf-cscroll { padding: 14px 12px; }
  .rf-cbarrow { grid-template-columns: minmax(0, 7em) 1fr auto; }
}

/* ==== 3.0: RoFit's own pages carry the brand (popup, library/settings page, welcome) ======================
   Fluoro pink only as a solid field or mark, always with black ink on it; deeper pink for text links. No glow,
   no gradient. The roblox.com sheet never gets .rf-own, so it keeps Roblox's sampled accent. */
.rf-own .rf-pop-logo, .rf-own .wl-logo, .rf-own .rf-logo, .rf-pbrand-m { background: var(--rf-brand); color: var(--rf-brand-on); box-shadow: none; }
.rf-pbrand-m { width: 24px; height: 24px; border-radius: 7px; display: inline-flex; align-items: center; justify-content: center; }
.rf-own .wl-eyebrow { color: var(--rf-brand-ink); }
.rf-own .wl-links a, .rf-own .rf-poplinks a, .rf-own .rf-about a { color: var(--rf-brand-ink); }
.rf-own .rf-poplinks a:hover, .rf-own .wl-links a:hover { text-decoration: underline; text-underline-offset: 2px; }
.rf-own .rf-pop-now.live { background: var(--rf-brand); color: var(--rf-brand-on); }
.rf-own .rf-pop-now.live:hover { background: color-mix(in srgb, var(--rf-brand) 88%, #000); }
.rf-own .rf-pop-now.live .rf-muted, .rf-own .rf-pop-now.live small { color: var(--rf-brand-on); opacity: 1; }
.rf-own .rf-pop-now.live:focus-visible { box-shadow: 0 0 0 2px var(--rf-bg), 0 0 0 4px var(--rf-fg); }
.rf-own .rf-pop-tabs em { color: var(--rf-brand-ink); }
.rf-pop-statuswrap:empty { display: none; }
.rf-compare .rf-mirror-legend .b::before, .rf-compare .rf-lens .rf-chip.lens-b.on { background: var(--rf-side-b); }
.rf-compare .rf-lens .rf-chip.lens-b.on { color: #111; }
.rf-poplinks { padding: 8px 14px 12px; font-size: 12px; color: var(--rf-muted); text-align: center; }

/* Welcome tour: real outfit renders instead of drawn figures */
.ws-img { width: 100%; height: 100%; object-fit: contain; display: block; }
.ws-tile .ws-img { height: 86%; margin-bottom: 8%; }
.ws-av { overflow: hidden; background: var(--rf-surface-2); }
.ws-av img { width: 100%; height: 100%; object-fit: cover; display: block; }
`;async function G(e,r){let t;try{t=await chrome.runtime.sendMessage({__rofit:!0,type:e,req:r})}catch{throw{kind:"network",message:"RoFit\u2019s background worker did not answer. Reload the page and try again."}}if(!t)throw{kind:"network",message:"RoFit\u2019s background worker did not answer. Reload the page and try again."};if(!t.ok)throw t.error;return t.data}var Sa=/[\u0300-\u036f]/g;function Ye(e){return e.normalize("NFKD").replace(Sa,"").toLowerCase().replace(/[^\p{L}\p{N}]+/gu," ").trim()}function Ma(e){let r={raw:e,terms:[],phrases:[],ids:[],not:[]},t=/(-?)"([^"]*)"|(\S+)/g,a;for(;a=t.exec(e);){if(a[2]!==void 0){let d=Ye(a[2]);if(!d)continue;(a[1]?r.not:r.phrases).push(d);continue}let s=a[3],o=s.startsWith("-")&&s.length>1;o&&(s=s.slice(1));let l=/^#(\d{1,20})$/.exec(s);if(l&&!o){r.ids.push(Number(l[1]));continue}let f=Ye(s);if(f){if(o){r.not.push(f);continue}for(let d of f.split(" "))r.terms.push(d),/^\d{3,20}$/.test(d)&&r.ids.push(Number(d))}}return r}var Ra=e=>!e.terms.length&&!e.phrases.length&&!e.ids.length&&!e.not.length;function Pa(e,r){if(e===r)return!0;let t=e.length,a=r.length;if(Math.abs(t-a)>1)return!1;let s=0;for(;s<t&&s<a&&e[s]===r[s];)s++;return t===a?e.slice(s+1)===r.slice(s+1)?!0:e[s]===r[s+1]&&e[s+1]===r[s]&&e.slice(s+2)===r.slice(s+2):t>a?e.slice(s+1)===r.slice(s):e.slice(s)===r.slice(s+1)}function La(e,r){if(!e||!r)return 0;if(r===e)return 100;let t=s=>s+e.length===r.length||r[s+e.length]===" ";if(r.startsWith(e))return(t(0)?92:84)-Math.min(6,(r.length-e.length)/6);let a=r.indexOf(" "+e);if(a>=0)return a++,(t(a)?78:70)-Math.min(6,a/8);if(a=r.indexOf(e),a>0)return 52-Math.min(6,a/8);if(e.length>=3){let s=0,o=-1,l=-1;for(let f=0;f<r.length&&s<e.length;f++)r[f]===e[s]&&(o<0&&(o=f),s++,l=f);if(s===e.length){let f=l-o+1;if(f<=e.length*2+2)return 34-Math.min(14,f-e.length)}}if(e.length>=5){for(let s of r.split(" "))if(s.length>=4&&Pa(e,s))return 24}return 0}function Aa(e,r,t){let a=t??r.map(f=>Ye(f.text));for(let f of e.not)if(a.some(d=>d.includes(f)))return null;let s=0,o={s:0},l=f=>r.findIndex(d=>d.id===f);for(let f of e.phrases){let d=a.findIndex(p=>p.includes(f));if(d<0)return null;let c=90*(r[d].weight??1);s+=c,c>o.s&&(o={s:c,f:r[d]})}for(let f of e.terms){let d=0,c;for(let p=0;p<r.length;p++){let g=La(f,a[p])*(r[p].weight??1);g>d&&(d=g,c=r[p])}if(/^\d{3,20}$/.test(f)){let p=l(Number(f));p>=0&&120>d&&(d=120,c=r[p])}if(!d)return null;s+=d,d>o.s&&(o={s:d,f:c})}for(let f of e.ids){if(e.terms.includes(String(f)))continue;let d=l(f);if(d<0)return null;s+=120,120>o.s&&(o={s:120,f:r[d]})}return{score:s,field:o.f}}function Ze(e,r,t){let a=typeof r=="string"?Ma(r):r;if(Ra(a))return e.map(o=>({item:o,match:{score:0}}));let s=[];return e.forEach((o,l)=>{let f=Aa(a,t(o));f&&s.push({item:o,match:f,i:l})}),s.sort((o,l)=>l.match.score-o.match.score||o.i-l.i),s}var Nt=[["path",{d:"M12 10.5V9.5a2.5 2.5 0 1 0-2.5-2.5"}],["path",{d:"M12 10.5 3 17a1.3 1.3 0 0 0 .8 2.4h16.4A1.3 1.3 0 0 0 21 17l-9-6.5Z"}]];var Je=[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]];var Qe=[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]];var er=[["path",{d:"m21 16-4 4-4-4"}],["path",{d:"M17 20V4"}],["path",{d:"m3 8 4-4 4 4"}],["path",{d:"M7 4v16"}]];var rr=[["path",{d:"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"}],["path",{d:"m9 10 2 2 4-4"}]];var tr=[["path",{d:"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"}]];var ar=[["path",{d:"M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"}],["path",{d:"m7 16.5-4.74-2.85"}],["path",{d:"m7 16.5 5-3"}],["path",{d:"M7 16.5v5.17"}],["path",{d:"M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"}],["path",{d:"m17 16.5-5-3"}],["path",{d:"m17 16.5 4.74-2.85"}],["path",{d:"M17 16.5v5.17"}],["path",{d:"M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"}],["path",{d:"M12 8 7.26 5.15"}],["path",{d:"m12 8 4.74-2.85"}],["path",{d:"M12 13.5V8"}]];var or=[["path",{d:"M18 6 7 17l-5-5"}],["path",{d:"m22 10-7.5 7.5L13 16"}]];var sr=[["path",{d:"M20 6 9 17l-5-5"}]];var fr=[["path",{d:"m6 9 6 6 6-6"}]];var nr=[["path",{d:"m9 18 6-6-6-6"}]];var ve=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m16 9-5.5 5.5L8 12"}]];var ir=[["path",{d:"M10.1 2.182a10 10 0 0 1 3.8 0"}],["path",{d:"M13.9 21.818a10 10 0 0 1-3.8 0"}],["path",{d:"M17.609 3.721a10 10 0 0 1 2.69 2.7"}],["path",{d:"M2.182 13.9a10 10 0 0 1 0-3.8"}],["path",{d:"M20.279 17.609a10 10 0 0 1-2.7 2.69"}],["path",{d:"M21.818 10.1a10 10 0 0 1 0 3.8"}],["path",{d:"M3.721 6.391a10 10 0 0 1 2.7-2.69"}],["path",{d:"M6.391 20.279a10 10 0 0 1-2.69-2.7"}]];var lr=[["path",{d:"M11 14h10"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v1.344"}],["path",{d:"m17 18 4-4-4-4"}],["path",{d:"M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113"}],["rect",{x:"8",y:"2",width:"8",height:"4",rx:"1"}]];var pr=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 6v6l4 2"}]];var dr=[["path",{d:"M13.744 17.736a6 6 0 1 1-7.48-7.48"}],["path",{d:"M15 6h1v4"}],["path",{d:"m6.134 14.768.866-.5 2 3.464"}],["circle",{cx:"16",cy:"8",r:"6"}]];var ur=[["path",{d:"M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"}]];var cr=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]];var mr=[["path",{d:"M20 4v7a4 4 0 0 1-4 4H4"}],["path",{d:"m9 10-5 5 5 5"}]];var xr=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];var we=[["circle",{cx:"12",cy:"12",r:"1"}],["circle",{cx:"19",cy:"12",r:"1"}],["circle",{cx:"5",cy:"12",r:"1"}]];var gr=[["path",{d:"M15 3h6v6"}],["path",{d:"M10 14 21 3"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}]];var hr=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"}],["path",{d:"m2 2 20 20"}]];var br=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{cx:"12",cy:"12",r:"3"}]];var ye=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{d:"M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"}],["path",{d:"M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"}]];var ke=[["path",{d:"M4 12.15V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3.35"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{d:"m5 16-3 3 3 3"}],["path",{d:"m9 22 3-3-3-3"}]];var vr=[["path",{d:"M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1"}],["path",{d:"M2 13h10"}],["path",{d:"m9 16 3-3-3-3"}]];var Ce=[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"}]];var wr=[["path",{d:"m12 14 4-4"}],["path",{d:"M3.34 19a10 10 0 1 1 17.32 0"}]];var yr=[["circle",{cx:"5",cy:"6",r:"3"}],["path",{d:"M12 6h5a2 2 0 0 1 2 2v7"}],["path",{d:"m15 9-3-3 3-3"}],["circle",{cx:"19",cy:"18",r:"3"}],["path",{d:"M12 18H7a2 2 0 0 1-2-2V9"}],["path",{d:"m9 15 3 3-3 3"}]];var kr=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}],["path",{d:"M2 12h20"}]];var Cr=[["line",{x1:"4",x2:"20",y1:"9",y2:"9"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21"}]];var _r=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]];var Sr=[["path",{d:"M10 8h.01"}],["path",{d:"M12 12h.01"}],["path",{d:"M14 8h.01"}],["path",{d:"M16 12h.01"}],["path",{d:"M18 8h.01"}],["path",{d:"M6 8h.01"}],["path",{d:"M7 16h10"}],["path",{d:"M8 12h.01"}],["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2"}]];var _e=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"}]];var Mr=[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1"}]];var Rr=[["path",{d:"m16 6 4 14"}],["path",{d:"M12 6v14"}],["path",{d:"M8 8v12"}],["path",{d:"M4 4v16"}]];var Pr=[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"}]];var Lr=[["path",{d:"M13 5h8"}],["path",{d:"M13 12h8"}],["path",{d:"M13 19h8"}],["path",{d:"m3 17 2 2 4-4"}],["path",{d:"m3 7 2 2 4-4"}]];var Ar=[["path",{d:"M3 5h.01"}],["path",{d:"M3 12h.01"}],["path",{d:"M3 19h.01"}],["path",{d:"M8 5h13"}],["path",{d:"M8 12h13"}],["path",{d:"M8 19h13"}]];var Tr=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4"}]];var Dr=[["path",{d:"M5 12h14"}]];var zr=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21"}]];var Fr=[["path",{d:"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"}],["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor"}]];var Br=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{d:"m15 5 4 4"}]];var Er=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];var qr=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];var Hr=[["path",{d:"m2 9 3-3 3 3"}],["path",{d:"M13 18H7a2 2 0 0 1-2-2V6"}],["path",{d:"m22 15-3 3-3-3"}],["path",{d:"M11 6h6a2 2 0 0 1 2 2v10"}]];var Se=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}],["path",{d:"M12 7v5l4 2"}]];var Or=[["path",{d:"M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"}],["path",{d:"m14.5 12.5 2-2"}],["path",{d:"m11.5 9.5 2-2"}],["path",{d:"m8.5 6.5 2-2"}],["path",{d:"m17.5 15.5 2-2"}]];var Ur=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];var Ir=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{cx:"12",cy:"12",r:"3"}]];var Nr=[["circle",{cx:"18",cy:"5",r:"3"}],["circle",{cx:"6",cy:"12",r:"3"}],["circle",{cx:"18",cy:"19",r:"3"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49"}]];var Vr=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"m9 12 2 2 4-4"}]];var jr=[["path",{d:"M16 10a4 4 0 0 1-8 0"}],["path",{d:"M3.103 6.034h17.794"}],["path",{d:"M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"}]];var Gr=[["path",{d:"M10 5H3"}],["path",{d:"M12 19H3"}],["path",{d:"M14 3v4"}],["path",{d:"M16 17v4"}],["path",{d:"M21 12h-9"}],["path",{d:"M21 19h-5"}],["path",{d:"M21 5h-7"}],["path",{d:"M8 10v4"}],["path",{d:"M8 12H3"}]];var Wr=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"}]];var Xr=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"}]];var $r=[["path",{d:"M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"}],["path",{d:"M15 3v5a1 1 0 0 0 1 1h5"}]];var Kr=[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor"}]];var Me=[["path",{d:"M10 11v6"}],["path",{d:"M14 11v6"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{d:"M3 6h18"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}]];var Re=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]];var Yr=[["path",{d:"M12 3v12"}],["path",{d:"m17 8-5-5-5 5"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}]];var Zr=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{cx:"12",cy:"7",r:"4"}]];var Jr=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}],["circle",{cx:"9",cy:"7",r:"4"}]];var Qr=[["path",{d:"M12 20h.01"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0"}],["path",{d:"M5 12.859a10 10 0 0 1 5.17-2.69"}],["path",{d:"M19 12.859a10 10 0 0 0-2.007-1.523"}],["path",{d:"M2 8.82a15 15 0 0 1 4.177-2.643"}],["path",{d:"M22 8.82a15 15 0 0 0-11.288-3.764"}],["path",{d:"m2 2 20 20"}]];var et=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];var Ta=0;function n(e,r,t,a,s,o){r||(r={});var l,f,d=r;if("ref"in d&&typeof e!="function")for(f in d={},r)f=="ref"?l=r[f]:d[f]=r[f];var c={type:e,props:d,key:t,ref:l,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--Ta,__i:-1,__u:0};return(s||o)&&(c.__source=s,c.__self=o),C.vnode&&C.vnode(c),c}function Da({node:e,size:r=18,class:t,label:a}){return n("svg",{class:"rf-ico "+(t??""),width:r,height:r,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":a?void 0:"true",role:a?"img":void 0,"aria-label":a,children:e.map(([s,o],l)=>n(s,{...o},l))})}var za={search:Ur,close:et,back:Je,settings:Ir,check:sr,copy:cr,external:gr,save:tr,saved:rr,compare:yr,more:we,grid:Mr,list:Ar,refresh:qr,down:fr,right:nr,outfit:Nt,library:Rr,download:xr,upload:Yr,trash:Me,filter:Ce,history:Se,warn:Re,info:_r,link:Pr,code:ke,json:ye,layers:_e,scale:Or,palette:Fr,tag:Kr,note:$r,lock:Tr,user:Zr,ok:ve,dashed:ir,sort:er,eye:br,eyeOff:hr,minus:Dr,plus:Er,repeat:Hr,tasks:Lr,spark:Wr,boxes:ar,hash:Cr,bag:jr,clock:pr,star:Xr,command:ur,share:Nr,keyboard:Sr,move:vr,edit:Br,globe:kr,shield:Vr,selectAll:or,sliders:Gr,arrow:Qe,users:Jr,enter:mr,offline:Qr,paste:lr,coins:dr,gauge:wr,monitor:zr},R=({n:e,size:r,class:t,label:a})=>n(Da,{node:za[e],size:r,class:t,label:a});var Le={v:2,appearance:"auto",motion:"system",density:"comfortable",layout:"grid",showPrices:!0,technical:!1,showPresets:!1,profileTab:!0,profileButton:!0,keepHistory:!0,historyLimit:20,cacheMinutes:10,onboarded:!1,autoIndex:!1,indexPrices:!0,checkAccess:!0},Pe="settings";function Vt(e){let r=e&&typeof e=="object"?e:{},t={...Le,...r};return(!r.v||r.v<2)&&(r.motion==="reduced"?t.motion="calm":(r.motion==="full"||r.motion===void 0)&&(t.motion="system")),["system","full","balanced","calm"].includes(t.motion)||(t.motion="system"),t.v=2,t}async function jt(){try{let e=await chrome.storage.local.get(Pe);return Vt(e[Pe])}catch{return{...Le}}}function Gt(e){let r=(t,a)=>{a==="local"&&t[Pe]&&e(Vt(t[Pe].newValue))};return chrome.storage.onChanged.addListener(r),()=>chrome.storage.onChanged.removeListener(r)}function Wt(e,r){return e==="full"||e==="balanced"||e==="calm"?e:r?"calm":"full"}var Xt={full:{flip:420,enter:320,fly:440,flyBack:300},balanced:{flip:240,enter:200,fly:0,flyBack:0},calm:{flip:0,enter:0,fly:0,flyBack:0}},$t=e=>e==="calm"?" rm":e==="balanced"?" mb":"";function Kt(){let[e,r]=D(Le);return B(()=>(jt().then(r),Gt(r)),[]),e}var Ba=[2500,4e3,6e3,9e3,13e3,18e3],Ea=[8e3,2e4],rt=class{map=new Map;queue=new Map;listeners=new Set;timer=0;timerAt=0;get(r,t="150x150"){return this.map.get(`${r}:${t}`)}subscribe(r){return this.listeners.add(r),()=>this.listeners.delete(r)}request(r,t="150x150"){let a=`${r}:${t}`;this.map.get(a)?.url||this.queue.has(a)||(this.queue.set(a,{id:r,size:t,tries:0,due:0}),this.schedule(50))}schedule(r){let t=Date.now()+r;this.timer&&this.timerAt<=t||(clearTimeout(this.timer),this.timerAt=t,this.timer=window.setTimeout(()=>this.flush(),Math.max(0,r)))}retry(r,t,a,s){return a>=s.length?!1:(this.queue.set(`${r}:${t}`,{id:r,size:t,tries:a+1,due:Date.now()+s[a]}),!0)}emit(){this.listeners.forEach(r=>r())}async flush(){this.timer=0;let r=Date.now()+25,t=[...this.queue.values()].filter(a=>a.due<=r);for(let a of t)this.queue.delete(`${a.id}:${a.size}`);for(let a of["150x150","420x420"]){let s=t.filter(o=>o.size===a);for(let o=0;o<s.length;o+=50){let l=s.slice(o,o+50);try{let f=await G("outfits.thumbs",{ids:l.map(d=>d.id),size:a});for(let d of l){let c=f[d.id]??{state:"Error",url:null},p=c.state==="Pending"&&this.retry(d.id,a,d.tries,Ba);this.map.set(`${d.id}:${a}`,c.state==="Pending"&&!p?{state:"Stalled",url:null}:c)}}catch(f){let d=f.kind==="rate-limited";for(let c of l)d&&this.retry(c.id,a,c.tries,Ea),this.map.set(`${c.id}:${a}`,{state:d?"RateLimited":"Error",url:null})}this.emit()}}this.queue.size&&this.schedule(Math.min(...[...this.queue.values()].map(a=>a.due))-Date.now())}},Ae=new rt;function tt(e,r="150x150",t=!0){let[,a]=D(0);return B(()=>{if(t)return Ae.request(e,r),Ae.subscribe(()=>a(s=>s+1))},[e,r,t]),Ae.get(e,r)}function te(e,r){let[t,a]=D({loading:!0}),[s,o]=D(0);return B(()=>{let l=!1;return a(f=>({data:f.data,loading:!0})),e().then(f=>!l&&a({data:f,loading:!1}),f=>!l&&a({error:f,loading:!1})),()=>{l=!0}},[...r,s]),{...t,reload:()=>o(l=>l+1)}}function qa(){let[e,r]=D(()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches);return B(()=>{let t=window.matchMedia("(prefers-reduced-motion: reduce)"),a=()=>r(t.matches);return t.addEventListener("change",a),()=>t.removeEventListener("change",a)},[]),e}function Yt(e){return Wt(e,qa())}var Ha="cubic-bezier(.22, 1, .36, 1)",Oa="linear(0, .0175, .0659 2.3%, .1381 3.6%, .4245 8%, .5574 10.3%, .6763, .7759 15.1%, .8541 17.7%, .9147 20.5%, .9568 23.4%, .9837 26.4%, 1.0007 29.6%, 1.0153 34.4%, 1.0198 40%, 1.0168 46.6%, 1.0056 59.3%, .9994 74.2%, 1)",Zt=e=>e==="full"?Oa:Ha;function Ua(e){let r=getComputedStyle(e).transform;if(!r||r==="none")return[0,0];let t=new DOMMatrixReadOnly(r);return[t.m41,t.m42]}function at(e,r,t=0){be(()=>{let a=e.current;if(!a)return;let s=()=>{let f=a.querySelector("[aria-checked=true],[aria-selected=true]");if(!f){a.style.setProperty("--w","0px");return}a.style.setProperty("--x",f.offsetLeft+t+"px"),a.style.setProperty("--w",Math.max(0,f.offsetWidth-t*2)+"px")},o=()=>{a.classList.add("still"),s(),requestAnimationFrame(()=>requestAnimationFrame(()=>a.classList.remove("still")))};a.dataset.ready?s():(a.dataset.ready="1",o());let l=new ResizeObserver(o);return l.observe(a),()=>l.disconnect()},[r])}function Jt(e,r,t){let a=t==="calm",s=Xt[t],o=j(new Map),l=j(new WeakMap),f=()=>{let d=new Map;return e.current?.querySelectorAll(":scope > [data-k]").forEach(c=>d.set(c.dataset.k,[c.offsetLeft,c.offsetTop])),d};be(()=>{let d=e.current;if(!d)return;let c=f(),p=o.current;if(!a&&p.size&&c.size){let g=d.closest(".rf-scroll"),b=(g?.scrollTop??0)-160-d.offsetTop,x=b+(g?.clientHeight??800)+320,w=[],i=0;d.querySelectorAll(":scope > [data-k]").forEach(v=>{if(i>=90)return;let A=v.dataset.k,h=c.get(A),k=p.get(A),_=z=>z+v.offsetHeight>=b&&z<=x,S=l.current.get(v),q=0,N=0;if(S&&S.playState==="running"&&([q,N]=Ua(v),S.cancel()),k){let z=k[0]-h[0]+q,I=k[1]-h[1]+N;if((Math.abs(z)>.5||Math.abs(I)>.5)&&(_(h[1])||_(k[1]))){i++;let V=Math.round(s.flip*Math.min(1.25,.8+Math.hypot(z,I)/1200));l.current.set(v,v.animate([{transform:`translate(${z}px, ${I}px)`},{transform:"none"}],{duration:V,easing:Zt(t)}))}}else _(h[1])&&(i++,w.push(v))});let P=t==="full"&&w.length<=24?22:0;w.forEach((v,A)=>{let h=t==="full"?[{opacity:0,transform:"translateY(8px) scale(.94)"},{opacity:1,transform:"none"}]:[{opacity:0},{opacity:1}];l.current.set(v,v.animate(h,{duration:s.enter,delay:A*P,easing:Zt(t),fill:"backwards"}))})}o.current=c},[r]),B(()=>{let d=e.current;if(!d)return;let c=0,p=new ResizeObserver(()=>{cancelAnimationFrame(c),c=requestAnimationFrame(()=>{o.current=f()})});return p.observe(d),()=>{cancelAnimationFrame(c),p.disconnect()}},[])}var an=Lt(()=>{});function ot({size:e=16}){return n("span",{class:"rf-spin",style:{width:e+"px",height:e+"px"},role:"progressbar","aria-label":"Loading"})}var Te={bg:"rgb(255, 255, 255)",fg:"rgb(32, 34, 39)",accent:"rgb(51, 95, 255)",accentFg:"#ffffff",tint:"rgb(27, 37, 75)"},st={bg:"rgb(18, 18, 21)",fg:"rgb(247, 247, 248)",accent:"rgb(51, 95, 255)",accentFg:"#ffffff",tint:"rgb(208, 217, 251)"},Ia={bg:"rgb(0, 0, 0)",fg:"rgb(247, 247, 248)",accent:"rgb(51, 95, 255)",accentFg:"#ffffff",tint:"rgb(208, 217, 251)"};function ae(e){let r=e.match(/rgba?\(([^)]+)\)/);if(!r)return null;let t=r[1].split(/[ ,/]+/).filter(Boolean).map(Number);return[t[0],t[1],t[2],t[3]??1]}var Qt=([e,r,t])=>{let a=s=>(s/=255,s<=.03928?s/12.92:((s+.055)/1.055)**2.4);return .2126*a(e)+.7152*a(r)+.0722*a(t)};function Na(){let e=g=>{for(let b=g;b;b=b.parentElement){let x=ae(getComputedStyle(b).backgroundColor);if(x&&x[3]>.9)return x}return null},r=e(document.body)??e(document.documentElement);if(!r)return Te;let a=Qt(r)<.4?st:Te,s=ae(getComputedStyle(document.body).color),o=a.accent,l=document.querySelector(".bg-action-emphasis, .btn-primary-md, .btn-growth-md"),f=l?ae(getComputedStyle(l).backgroundColor):null;f&&f[3]>.9&&(o=`rgb(${f[0]}, ${f[1]}, ${f[2]})`);let d=document.querySelector(".bg-action-standard"),c=d?ae(getComputedStyle(d).backgroundColor):null,p=c?`rgb(${c[0]}, ${c[1]}, ${c[2]})`:a.tint;return{bg:`rgb(${r[0]}, ${r[1]}, ${r[2]})`,fg:s?`rgb(${s[0]}, ${s[1]}, ${s[2]})`:a.fg,accent:o,accentFg:"#ffffff",tint:p}}function ea(e,r){let t;e.appearance==="light"?t=Te:e.appearance==="dark"?t=st:e.appearance==="oled"?t=Ia:r?t=Na():t=window.matchMedia("(prefers-color-scheme: dark)").matches?st:Te;let a=ae(t.bg);return{...t,dark:a?Qt(a)<.4:!1}}function ra(e){return{"--rf-brand":"#FF3D7F","--rf-brand-on":"#111111","--rf-brand-ink":e.dark?"#FF6F9F":"#C8104F"}}function ta(e){let[r,t,a,s]=e.dark?["11%","17%","23%","19%"]:["3.5%","7.5%","12%","13%"];return{"--rf-bg":e.bg,"--rf-fg":e.fg,"--rf-accent":e.accent,"--rf-accent-fg":e.accentFg,"--rf-tint":e.tint,"--rf-s1":r,"--rf-s2":t,"--rf-s3":a,"--rf-line-pct":s,"color-scheme":e.dark?"dark":"light"}}var Va=new Intl.NumberFormat("en-US");function oe(e,r=Date.now()){let t=Math.max(0,(r-e)/1e3);return t<45?"just now":t<3600?`${Math.round(t/60)}m ago`:t<86400?`${Math.round(t/3600)}h ago`:t<86400*30?`${Math.round(t/86400)}d ago`:new Date(e).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}var se=(e,r,t=r+"s")=>`${Va.format(e)} ${e===1?r:t}`;function ft(e){let r=e.access?.state;return r==="restricted"?"Outfits private":r==="unavailable"?"Unavailable":e.outfitCount==null?"Profile":e.outfitCount?se(e.outfitCount,"outfit"):"No outfits shown"}var aa=(e,r)=>`https://www.roblox.com/users/${e}/profile#rofit/${r}`;async function oa(e){try{return await navigator.clipboard.writeText(e),!0}catch{let r=document.createElement("textarea");r.value=e,r.style.cssText="position:fixed;opacity:0",document.body.appendChild(r),r.select();let t=document.execCommand("copy");return r.remove(),t}}function nt(e){switch(e?.kind){case"rate-limited":return{title:"Roblox is rate limiting RoFit",body:`Too many requests in a short time. Wait ${e.retryAfter??10}s and try again.`};case"not-found":return{title:"Roblox can\u2019t find that",body:"The user or outfit no longer exists, or its ID is wrong."};case"forbidden":return{title:"Roblox won\u2019t show this",body:"This list is private or restricted. RoFit doesn\u2019t get around that."};case"network":return typeof navigator<"u"&&navigator.onLine===!1?{title:"You\u2019re offline",body:"RoFit shows what it has saved; anything new from Roblox needs a connection. Try again once you\u2019re back online."}:{title:"Couldn\u2019t reach Roblox",body:e.message||"Check your connection and try again."};case"timeout":return{title:"Roblox took too long",body:"It didn\u2019t answer within 20 seconds. It may be busy; try again in a moment."};case"unauthenticated":return{title:"Sign in to Roblox",body:e.message||"This needs you to be signed in to Roblox in this browser."};case"server":return{title:"Roblox had a problem",body:"Their servers returned an error. Try again shortly."};case"bad-response":return{title:"Roblox changed something",body:e.message||"The response wasn\u2019t in the shape RoFit expects. Diagnostics in settings has details."};default:return{title:"Request failed",body:e?.message||"Try again."}}}var sa=document.createElement("style");sa.textContent=It;document.head.appendChild(sa);var fe=[{id:"recent",label:"Recent",icon:"clock"},{id:"favorites",label:"Favorites",icon:"star"},{id:"saved",label:"Saved",icon:"saved"}],fa="rofit.popup.tab",ja=()=>{try{let e=localStorage.getItem(fa);return e==="favorites"||e==="saved"?e:"recent"}catch{return"recent"}},na=/^https:\/\/www\.roblox\.com\/(?:[a-z]{2}(?:-[a-z]{2,4})?\/)?users\/(\d+)/i,De=(e,r)=>`https://www.roblox.com/users/${e}/profile#rofit${r?"/"+r:""}`,Ga=e=>na.test(e)||/^#?\d{1,19}$/.test(e)||/^@?[A-Za-z0-9_]{3,20}$/.test(e);function Wa(){let[e,r]=D(navigator.onLine);return B(()=>{let t=()=>r(!0),a=()=>r(!1);return addEventListener("online",t),addEventListener("offline",a),()=>{removeEventListener("online",t),removeEventListener("offline",a)}},[]),e}function Xa(e,r){let a=[...e.currentTarget.querySelectorAll("[data-row]")],s=a.indexOf(document.activeElement),o=-1;if(e.key==="ArrowDown")o=Math.min(a.length-1,s+1);else if(e.key==="ArrowUp"){if(s<=0){e.preventDefault(),r?.focus();return}o=s-1}else e.key==="Home"?o=0:e.key==="End"&&(o=a.length-1);o>=0&&a[o]&&(e.preventDefault(),a[o].focus())}function $a({name:e}){let r=0;for(let t of e)r=(r*31+t.charCodeAt(0))%360;return n("span",{class:"rf-pop-av",style:{"--h":String(r)},children:e.slice(0,1).toUpperCase()})}function Ka({e,i:r,onOpen:t,onProfile:a}){let s=tt(e.outfitId,"150x150",!e.thumb),o=e.thumb??s?.url??null;return n("div",{class:"rf-pop-item","data-k":"l"+e.key,style:{"--i":String(r)},children:[n("button",{class:"rf-pop-row","data-row":!0,onClick:t,title:`Open \u201C${e.name}\u201D in your library`,children:[n("span",{class:"rf-pop-th"+(o?"":" none"),children:o?n("img",{src:o,alt:"",loading:"lazy"}):n(R,{n:"outfit",size:16})}),n("span",{class:"rf-pop-name",children:[e.name,n("small",{children:[e.favorite?"\u2605 ":"","by ",e.userName,e.collection?" \xB7 "+e.collection:""," \xB7 ",oe(e.savedAt)]})]})]}),e.source!=="import"&&e.source!=="share"&&n("button",{class:"rf-ib rf-pop-side","data-row":!0,title:"Open on their Roblox profile","aria-label":`Open ${e.name} on ${e.userName}\u2019s profile`,onClick:a,children:n(R,{n:"external",size:15})})]})}function ze({icon:e,title:r,body:t,action:a}){return n("div",{class:"rf-pop-empty",children:[n("span",{class:"rf-pop-empty-ic",children:n(R,{n:e,size:20})}),n("b",{children:r}),n("p",{children:t}),a&&n("button",{class:"rf-btn",onClick:a.run,children:a.label})]})}function Ya(){let e=Kt(),r=Yt(e.motion),t=Wa(),[a,s]=D(void 0),[o,l]=D(""),[f,d]=D(0),[c,p]=D(null),[g,b]=D(ja),[x,w]=D(!1),[i,P]=D(g!=="recent"),v=j(null),A=j(null),h=j(null),k=te(()=>G("users.recent",{limit:24}),[]),_=te(()=>G("diag.get",{}).then(u=>u.counts.library),[]),S=te(()=>i?G("library.list",{}):Promise.resolve(null),[i]),q=te(async()=>a?G("outfits.cached",{userId:a.userId}):null,[a?.userId]),N=u=>{b(u),u!=="recent"&&P(!0);try{localStorage.setItem(fa,u)}catch{}};at(A,g,3),B(()=>{chrome.tabs.query({active:!0,currentWindow:!0}).then(([m])=>{let M=m?.url?.match(na);s(m?.id&&M?{tabId:m.id,userId:Number(M[1]),name:(m.title??"").replace(/\s*[-–|]\s*Roblox.*$/i,"").trim()||"this profile"}:null)}).catch(()=>s(null))},[]),B(()=>{o.trim()&&P(!0),d(0),p(u=>u&&u.q===o.trim()?u:null)},[o]),B(()=>{let u=m=>{let M=document.activeElement===v.current;m.key==="/"&&!M?(m.preventDefault(),v.current?.focus(),v.current?.select()):!M&&!m.metaKey&&!m.ctrlKey&&!m.altKey&&/^[1-3]$/.test(m.key)&&(m.preventDefault(),N(fe[Number(m.key)-1].id))};return addEventListener("keydown",u),()=>removeEventListener("keydown",u)},[]);let z=ea(e,!1),I={...ta(z),...ra(z)},V=async u=>{if(a)try{if(u)throw 0;await chrome.tabs.sendMessage(a.tabId,{__rofit:"open"}),window.close()}catch{await chrome.tabs.update(a.tabId,{url:De(a.userId,u)}),window.close()}},H=u=>{chrome.tabs.create({url:u}),window.close()},F=u=>{G("page.open",{route:u}),window.close()},O=async()=>{a&&await oa(`https://www.roblox.com/users/${a.userId}/profile`)&&(w(!0),setTimeout(()=>w(!1),1400))},E=async u=>{let m=u.trim();if(!Ga(m)){p({q:m,msg:"That isn\u2019t a Roblox username or user ID. Usernames are 3\u201320 letters, numbers or underscores."});return}if(!t){p({q:m,msg:"You\u2019re offline, so RoFit can\u2019t ask Roblox who that is. Your saved outfits below still work."});return}p({q:m,busy:!0});try{let M=await G("users.lookup",{query:m});M?M.isBanned?p({q:m,msg:`@${M.name} is banned, so Roblox shows no profile.`}):H(De(M.id)):p({q:m,msg:`No Roblox account is called \u201C${m.replace(/^@/,"")}\u201D.`})}catch(M){let y=nt(M);p({q:m,msg:y.title+". "+y.body})}},W=o.trim(),U=re(()=>{if(!W)return[];let u=[{key:"find",icon:"search",title:`Find \u201C${W.replace(/^@/,"")}\u201D on Roblox`,sub:"Open their profile with RoFit",run:()=>E(W)}],m=Ze(k.data??[],W,y=>[{text:y.name,weight:1.2},{text:y.displayName},{text:"",id:y.id}]).slice(0,4);for(let{item:y}of m)u.push({key:"u"+y.id,icon:"user",title:y.displayName&&y.displayName!==y.name?`${y.displayName} (@${y.name})`:y.name,sub:`${ft(y)} \xB7 seen ${oe(y.lastSeen)}`,run:()=>H(De(y.id))});let M=Ze(S.data??[],W,y=>[{text:y.name,weight:1.25},{text:y.userName},{text:y.collection,weight:.8},...y.tags.map(da=>({text:da})),{text:y.note,weight:.5},{text:"",id:y.outfitId}]).slice(0,5);for(let{item:y}of M)u.push({key:"l"+y.key,icon:y.favorite?"star":"saved",title:y.name,sub:`Saved \xB7 by ${y.userName}${y.collection?" \xB7 "+y.collection:""}`,run:()=>F("library/open/"+encodeURIComponent(y.key))});return u},[W,k.data,S.data,t]),ia=u=>{u.key==="ArrowDown"&&U.length?(u.preventDefault(),d(m=>(m+1)%U.length)):u.key==="ArrowUp"&&U.length?(u.preventDefault(),d(m=>(m-1+U.length)%U.length)):u.key==="ArrowDown"&&!W?(u.preventDefault(),h.current?.querySelector("[data-row]")?.focus()):u.key==="Enter"&&U[f]?(u.preventDefault(),U[f].run()):u.key==="Escape"&&o&&(u.preventDefault(),l(""))},J=q.data?.outfits.filter(u=>u.isEditable)??[],it=(S.data??[]).filter(u=>a&&u.userId===a.userId).length,Fe=(k.data??[]).filter(u=>u.id!==a?.userId).slice(0,6),lt=re(()=>(S.data??[]).filter(u=>u.favorite).sort((u,m)=>m.savedAt-u.savedAt).slice(0,6),[S.data]),Be=re(()=>[...S.data??[]].sort((u,m)=>m.savedAt-u.savedAt).slice(0,6),[S.data]),Ee=!!(k.error&&_.error),ne=t?Ee?{cls:"bad",label:"Worker asleep"}:{cls:"ok",label:"Ready"}:{cls:"off",label:"Offline"},la=g==="recent"?Fe.map(u=>"u"+u.id):(g==="favorites"?lt:Be).map(u=>"l"+u.key);Jt(h,g+":"+la.join(","),r);let pt=S.loading&&i,pa=(()=>{if(g==="recent")return k.loading&&!k.data?n("div",{class:"rf-pop-skels",children:[0,1,2].map(m=>n("div",{class:"rf-skel"},m))}):Fe.length?Fe.map((m,M)=>n("div",{class:"rf-pop-item","data-k":"u"+m.id,style:{"--i":String(M)},children:n("button",{class:"rf-pop-row","data-row":!0,onClick:()=>H(De(m.id)),children:[n($a,{name:m.name}),n("span",{class:"rf-pop-name",children:[m.displayName&&m.displayName!==m.name?m.displayName:m.name,n("small",{children:["@",m.name," \xB7 ",ft(m)," \xB7 ",oe(m.lastSeen)]})]}),n(R,{n:"right",size:16,class:"rf-pop-chev"})]})},m.id)):n(ze,{icon:"users",title:"No profiles yet",body:"Profiles you open with RoFit show up here, so you can jump back in one click."});let u=g==="favorites"?lt:Be;return pt&&!S.data?n("div",{class:"rf-pop-skels",children:[0,1,2].map(m=>n("div",{class:"rf-skel"},m))}):S.error?n(ze,{icon:"warn",title:"Couldn\u2019t read your library",body:nt(S.error).body,action:{label:"Try again",run:S.reload}}):u.length?u.map((m,M)=>n(Ka,{e:m,i:M,onOpen:()=>F("library/open/"+encodeURIComponent(m.key)),onProfile:()=>H(aa(m.userId,m.outfitId))},m.key)):g==="favorites"?n(ze,{icon:"star",title:"No favorites yet",body:"Star an outfit in your library and it lives here for quick access.",action:Be.length?{label:"Open library",run:()=>F("library")}:void 0}):n(ze,{icon:"saved",title:"Nothing saved yet",body:"Open any outfit on a profile and press Save. It stays in your library even if the owner deletes it."})})();return n("div",{class:"rf rf-popup rf-pop2 rf-own"+$t(r),style:I,children:[n("header",{class:"rf-pop-h",children:[n("span",{class:"rf-pop-logo",children:n(R,{n:"outfit",size:16})}),n("b",{children:"RoFit"}),n("span",{role:"status",class:"rf-pop-statuswrap",children:ne.cls!=="ok"&&n("span",{class:"rf-pop-status "+ne.cls,title:Ee?"RoFit\u2019s background worker didn\u2019t answer. Reload the extension from chrome://extensions if this keeps happening.":ne.label,children:[n("i",{}),ne.label]})}),n("span",{class:"rf-grow"}),n("button",{class:"rf-ib","aria-label":"Open settings",title:"Settings",onClick:()=>F("settings"),children:n(R,{n:"settings",size:18})}),n("a",{class:"rf-ib",href:mt,target:"_blank",rel:"noopener noreferrer",title:"RoFit settings on Roblox","aria-label":"RoFit settings on Roblox",children:n(R,{n:"user",size:18})})]}),n("div",{class:"rf-pop-search",children:n("label",{class:"rf-search",children:[n(R,{n:"search",size:16}),n("input",{ref:v,autoFocus:!0,value:o,spellcheck:!1,autocomplete:"off","aria-autocomplete":"list",placeholder:"Username, user ID or saved outfit","aria-label":"Search Roblox users and your library",role:"combobox","aria-expanded":U.length>0,"aria-controls":"rf-pop-results","aria-activedescendant":U[f]?"rf-pr-"+f:void 0,onInput:u=>l(u.target.value),onKeyDown:ia}),o?n("button",{class:"rf-ib rf-pop-clear","aria-label":"Clear search",onClick:()=>{l(""),v.current?.focus()},children:n(R,{n:"close",size:14})}):n("kbd",{class:"rf-kbd","aria-hidden":"true",children:"/"})]})}),!t&&n("p",{class:"rf-pop-msg rf-pop-banner",role:"alert",children:[n(R,{n:"offline",size:14}),"You\u2019re offline. Saved outfits still open; new profiles need a connection."]}),W?n("div",{class:"rf-pop-results",id:"rf-pop-results",role:"listbox","aria-label":"Results","data-anim":"enter",children:[U.map((u,m)=>n("div",{id:"rf-pr-"+m,role:"option","aria-selected":m===f,class:"rf-pop-row"+(m===f?" on":""),style:{"--i":String(m)},onMouseMove:()=>d(m),onClick:u.run,children:[n("span",{class:"rf-pop-av ic",children:n(R,{n:u.icon,size:16})}),n("span",{class:"rf-pop-name",children:[u.title,n("small",{children:u.sub})]}),m===0&&c?.busy?n(ot,{size:14}):m===f?n("kbd",{class:"rf-kbd",children:"\u21B5"}):null]},u.key)),c?.msg&&n("p",{class:"rf-pop-msg",role:"alert",children:[n(R,{n:"warn",size:14}),c.msg]}),pt&&n("p",{class:"rf-pop-msg muted",children:[n(ot,{size:12}),"Searching your library\u2026"]}),!S.loading&&U.length===1&&!c&&n("p",{class:"rf-pop-msg muted",children:"Nothing saved or recently viewed matches. Press Enter to look the name up on Roblox."})]}):n("div",{class:"rf-pop-home","data-anim":"enter",children:[a===void 0?n("div",{class:"rf-pop-now sk",children:n("div",{class:"rf-skel"})}):a?n("div",{class:"rf-pop-here",children:[n("button",{class:"rf-pop-now live",onClick:()=>V(),children:[n("span",{class:"rf-pop-now-t",children:[n("small",{children:"On this profile"}),n("b",{children:a.name}),n("span",{class:"rf-muted",children:J.length?`${se(J.length,"saved outfit")} \xB7 checked ${oe(q.data?.user?.lastSyncAt??Date.now())}`:"Browse their saved outfits"})]}),n("span",{class:"rf-pop-go",children:n(R,{n:"right",size:18})})]}),n("div",{class:"rf-pop-acts",children:[n("button",{class:"rf-chip"+(x?" on":""),onClick:O,children:[n(R,{n:x?"check":"link",size:14}),x?"Copied":"Copy link"]}),it>0&&n("button",{class:"rf-chip",onClick:()=>F("library"),children:[n(R,{n:"saved",size:14}),se(it,"in library","in library")]}),J[0]&&n("button",{class:"rf-chip",onClick:()=>V(J[0].id),title:`Open \u201C${J[0].name}\u201D`,children:[n(R,{n:"eye",size:14}),"Newest outfit"]})]})]}):n("div",{class:"rf-pop-now idle",children:[n(R,{n:"outfit",size:20}),n("span",{children:["Open any Roblox profile and look for ",n("b",{children:"Saved Outfits"})," (an ",n("b",{children:"Outfits"})," tab on older layouts), or search for someone above."]})]}),Ee&&n("p",{class:"rf-pop-msg",role:"alert",children:[n(R,{n:"warn",size:14}),"RoFit\u2019s background worker didn\u2019t answer. Reload the extension from chrome://extensions if this keeps happening."]}),n("div",{class:"rf-pop-tabs rf-seg",role:"tablist","aria-label":"Quick access",ref:A,children:fe.map((u,m)=>n("button",{role:"tab",id:"rf-pt-"+u.id,"aria-selected":g===u.id,"aria-controls":"rf-pop-panel",tabIndex:g===u.id?0:-1,title:`${u.label} (${m+1})`,onClick:()=>N(u.id),onKeyDown:M=>{if(M.key==="ArrowRight"||M.key==="ArrowLeft"){M.preventDefault();let y=fe[(m+(M.key==="ArrowRight"?1:fe.length-1))%fe.length];N(y.id),A.current?.querySelector("#rf-pt-"+y.id)?.focus()}},children:[n(R,{n:u.icon,size:14}),u.label,u.id==="favorites"&&S.data?n("em",{children:S.data.filter(M=>M.favorite).length||""}):null]},u.id))}),n("div",{class:"rf-pop-panel",id:"rf-pop-panel",role:"tabpanel","aria-labelledby":"rf-pt-"+g,ref:h,onKeyDown:u=>Xa(u,v.current),children:pa},g)]}),n("footer",{class:"rf-pop-foot",children:[n("button",{class:"rf-pop-lib",onClick:()=>F("library"),children:[n(R,{n:"library",size:16}),n("span",{children:"Library"}),n("em",{children:_.data!=null?se(_.data,"saved outfit"):""}),n(R,{n:"right",size:16,class:"rf-pop-chev"})]}),n("div",{class:"rf-poplinks",children:[n("a",{href:dt,target:"_blank",rel:"noopener noreferrer",children:"Official site"})," \xB7 ",n("a",{href:ut,target:"_blank",rel:"noopener noreferrer",children:"Report a problem"})," \xB7 ",n("a",{href:ct,target:"_blank",rel:"noopener noreferrer",children:"Donate"})]})]})]})}Pt(n(Ya,{}),document.getElementById("root"));chrome.action.setBadgeText({text:""}).catch(()=>{});})();
