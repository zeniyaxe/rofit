"use strict";(()=>{var pt="https://rofit.site",pa="https://github.com/zeniyaxe/rofit",dt=pa+"/issues",ut="https://www.roblox.com/games/6513295364/hi#!/store",da="#!/rofit",ct="https://www.roblox.com/my/account"+da;var C,ht,ua,j,mt,pe,bt,fe,J,vt,He,Be,Ee,wt,de={},ue=[],ca=/^m(i|n|o|s|text|space)$/,qe=Array.isArray,yt=ue.slice,X=Object.assign;function ce(e){e&&e.parentNode&&e.remove()}function ie(e,r,t,a,o){var s={type:e,props:r,key:t,ref:a,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:o||++ht,__i:-1,__u:0};return!o&&C.vnode&&C.vnode(s),s}function K(e){return e.children}function le(e,r){this.props=e,this.context=r,this.__g=0}function W(e,r){if(r==null)return e.__?W(e.__,e.__i+1):null;for(var t;r<e.__k.length;r++)if((t=e.__k[r])&&t.__e)return t.__e;return typeof e.type!="function"||e.props.__P?null:W(e)}function kt(e){if((e=e.__)&&e.__c&&!e.props.__P)return e.__e=null,e.__k.some(function(r){return r&&(e.__e=r.__e)}),kt(e)}function Oe(e){(8&e.__g||!(e.__g|=8)||!j.push(e)||pe++)&&mt==C.debounceRendering||((mt=C.debounceRendering)||queueMicrotask)(ma)}function ma(){var e,r,t,a,o,s,l,n,d;try{for(r=1;j.length;)j.length>r&&j.sort(bt),e=j.shift(),r=j.length,8&e.__g&&(a=void 0,o=void 0,s=(o=(t=e).__v).__e,l=[],n=[],(d=t.__P)&&((a=X({constructor:void 0},o)).__v=o.__v+1,C.vnode&&C.vnode(a),Ue(d,a,o,t.__n,d.namespaceURI,32&o.__u?[s]:null,l,s||W(o),32&o.__u,n),a.__v=o.__v,a.__.__k[a.__i]=a,Mt(l,a,n),o.__=o.__e=null,a.__e!=s&&kt(a)))}finally{j.length=pe=0}}function Ct(e,r,t,a,o,s,l,n,d,c,p){var g,b,x,w,i,L,v=a.__k||ue,T=r.length;for(d=xa(t,r,v,d,T),g=0;g<T;g++)(x=t.__k[g])!=null&&(b=~x.__i&&v[x.__i]||de,x.__i=g,L=Ue(e,x,b,o,s,l,n,d,c,p),w=x.__e,x.ref&&(b.ref!=x.ref||8&b.__u)&&(b.ref!=x.ref&&b.ref&&Ie(b.ref,null,x),p.push(x.ref,x.__c||w,x)),i=i||w,4&x.__u?(d=_t(x,d,e,!b.__v),b.__e&&(b.__e=null)):typeof x.type=="function"&&L!==void 0?d=L:w&&(d=w.nextSibling),x.__u&=-7);return t.__e=i,d}function xa(e,r,t,a,o){var s,l,n,d,c,p,g,b,x,w,i=t.length,L=i,v=0,T=!1,h=e.__k=Array(o);for(s=0;s<o;s++)(l=r[s])!=null&&typeof l!="boolean"&&typeof l!="function"?(typeof l!="object"||l.constructor==String?l=h[s]=ie(null,l):qe(l)?l=h[s]=ie(K,{children:l}):l.constructor===void 0&&l.__b?l=h[s]=ie(l.type,l.props,l.key,l.ref,l.__v):h[s]=l,d=s+v,l.__=e,l.__b=e.__b+1,n=null,~(c=l.__i=ga(l,t,d,L))&&(L--,(n=t[c])&&(n.__u|=2)),n&&n.__v?(l.__u|=2,c==d-1?v--:c==d+1?v++:c!=d&&(c>d?v--:v++,T=!0)):(~c||(o>i?v--:o<i&&v++),typeof l.type!="function"&&(l.__u|=4))):h[s]=null;if(T){for(p=[],g=[],s=0;s<o;s++)if((l=h[s])&&2&l.__u){for(b=0,x=p.length;b<x;)p[w=b+x>>1]<l.__i?b=w+1:x=w;p[b]=l.__i,g[s]=b+1}for(v=p.length;s--;)g[s]&&(g[s]==v?v--:h[s].__u|=4)}if(L)for(s=0;s<i;s++)!(n=t[s])||2&n.__u||(n.__e==a&&(a=W(n)),Ne(n,n));return a}function _t(e,r,t,a){var o,s;if(typeof e.type=="function"){if(e.props.__P)return r;if(o=e.__k)for(s=0;s<o.length;s++)o[s]&&(o[s].__=e,r=_t(o[s],r,t,!1));return r}for(r&&!r.parentNode&&(r=W(e))&&!r.parentNode&&(r=null),e.__e!=r&&(!a&&t.moveBefore&&e.__e.parentNode?t.moveBefore(e.__e,r):t.insertBefore(e.__e,r||null)),r=e.__e;(r=r&&r.nextSibling)&&r.nodeType==8;);return r}function ga(e,r,t,a){var o,s,l,n=e.key,d=e.type,c=r[t],p=c&&!(2&c.__u);if(c===null&&n==null||p&&n==c.key&&d==c.type)return t;if(a>(p?1:0)){for(o=t-1,s=t+1;o>=0||s<r.length;)if((c=r[l=o>=0?o--:s++])&&!(2&c.__u)&&n==c.key&&d==c.type)return l}return-1}function xt(e,r,t){t==null&&(t=""),r[0]=="-"?e.setProperty(r,t):e[r]=t}function ne(e,r,t,a,o){var s;e:if(r=="style")if(typeof t=="string")e.style.cssText=t;else{if(typeof a=="string"&&(e.style.cssText=a=""),a)for(r in a)t&&r in t||xt(e.style,r,"");if(t)for(r in t)a&&t[r]==a[r]||xt(e.style,r,t[r])}else if(r[0]=="o"&&r[1]=="n")s=r!=(r=r.replace(vt,"$1")),(r=r.slice(2))[0]<"a"&&(r=r.toLowerCase()),(e.__e||(e.__e={}))[r+s]=t,t?a?t[J]=a[J]:(t[J]=He,e.addEventListener(r,s?Ee:Be,s)):e.removeEventListener(r,s?Ee:Be,s);else{if(o=="http://www.w3.org/2000/svg")r=r.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(r!="width"&&r!="height"&&r!="href"&&r!="list"&&r!="form"&&r!="tabIndex"&&r!="download"&&r!="rowSpan"&&r!="colSpan"&&r!="role"&&r!="popover"&&r in e)try{e[r]=t??"";break e}catch{}typeof t=="function"||(t==null||t===!1&&r[4]!="-"?e.removeAttribute(r):e.setAttribute(r,r=="popover"&&t==1?"":t))}}function gt(e){return function(r){if(this.__e){var t=this.__e[r.type+e];if(r[fe]==null)r[fe]=He++;else if(r[fe]<t[J])return;return t(C.event?C.event(r):r)}}}function Ue(e,r,t,a,o,s,l,n,d,c){var p,g,b,x,w,i,L,v,T,h,k,_,S,O,N,B,H,q,F,$,U=r.type;if(r.constructor!==void 0)return null;if(128&t.__u&&(d=32&t.__u,p=t.__c.__z)){if(r.__u|=d,g=s=[],p.nodeType==8)for(b=1,x=p.nextSibling;x;x=x.nextSibling){if(x.nodeType==8){if(x.data.startsWith("$s"))b++;else if(x.data.startsWith("/$s")&&!--b)break}s.push(x)}else s.push(p);n=s[0]}(p=C.__b)&&p(r);e:if(typeof U=="function"){w=l.length;try{if(h=r.props,k=(p=U.prototype)&&p.render,_=(p=U.contextType)&&a[p.__c],S=p?_?_.props.value:p.__:a,t.__c?2&(i=r.__c=t.__c).__g&&(i.__g|=1):(k?r.__c=i=new U(h,S):(r.__c=i=new le(h,S),i.constructor=U,i.render=ba),_&&_.sub(i),i.state||(i.state={}),i.__n=a,i.__g|=8,i.__h=[],i.__k=[]),k&&(i.__s||(i.__s=i.state),U.getDerivedStateFromProps&&(i.__s==i.state&&(i.__s=X({},i.__s)),X(i.__s,U.getDerivedStateFromProps(h,i.__s)))),L=i.props,v=i.state,i.__v=r,t.__c){if(k&&!U.getDerivedStateFromProps&&h!==L&&i.componentWillReceiveProps&&i.componentWillReceiveProps(h,S),r.__v==t.__v&&!(8&i.__g)||!(4&i.__g)&&i.shouldComponentUpdate&&i.shouldComponentUpdate(h,i.__s,S)===!1){r.__v!=t.__v&&(i.props=h,i.state=i.__s,i.__g&=-9),r.__e=t.__e,r.__k=t.__k,r.__k.some(function(D){D&&(D.__=r)}),ue.push.apply(i.__h,i.__k),i.__k=[],i.__h.length&&l.push(i),n=W(t);break e}i.componentWillUpdate&&i.componentWillUpdate(h,i.__s,S),k&&i.componentDidUpdate&&i.__h.push(function(){i.componentDidUpdate(L,v,T)})}else k&&!U.getDerivedStateFromProps&&i.componentWillMount&&i.componentWillMount(),k&&i.componentDidMount&&i.__h.push(i.componentDidMount);if(i.context=S,i.props=h,i.__P=e,i.__g&=-5,O=C.__r,N=0,k)i.state=i.__s,i.__g&=-9,O&&O(r),p=i.render(i.props,i.state,i.context),ue.push.apply(i.__h,i.__k),i.__k=[];else do i.__g&=-9,O&&O(r),p=i.render(i.props,i.state,i.context),i.state=i.__s;while(8&i.__g&&++N<25);i.state=i.__s,i.getChildContext&&(a=X({},a,i.getChildContext())),k&&t.__c&&i.getSnapshotBeforeUpdate&&(T=i.getSnapshotBeforeUpdate(L,v)),B=p&&p.type===K&&p.key==null?p.props.children:p,h.__P&&(p=n,o=(e=h.__P).namespaceURI,d=s=null,t.props&&t.props.__P!=e&&(t.__k.some(function(D){D&&Ne(D,D)}),t.__k=null),n=t.__k?W(t,0):null),n=Ct(e,qe(B)?B:[B],r,t,a,o,s,l,n,d,c),h.__P&&(r.__e=null,n=p),r.__u&=-161,128&t.__u&&(i.__z=null),g&&g.some(ce),i.__h.length&&l.push(i),1&i.__g&&(i.__g&=-4)}catch(D){if(l.length=w,r.__v=null,d||s)if(D.then){if(H=0,r.__u|=d?160:128,s){for(F=0;F<s.length;F++)if($=s[F])if($.nodeType==8){if(s[F]=null,$.data.startsWith("$s"))H++||(q=$);else if($.data.startsWith("/$s")&&!--H){n=$;break}}else H&&(s[F]=null)}if(!q){for(;n&&n.nodeType==8&&n.nextSibling;)n=n.nextSibling;s&&(s[s.indexOf(n)]=null),q=n}r.__c.__z||(r.__c.__z=q),r.__e=n}else s&&s.some(ce);else r.__e=t.__e;r.__k||(r.__k=t.__k||[]),D.then||St(r),C.__e(D,r,t)}}else n=r.__e=ha(t.__e,r,t,a,o,s,l,d,c,e);return(p=C.diffed)&&p(r),128&r.__u?void 0:n}function St(e){e&&(e.__c&&(e.__c.__g|=4),e.__k&&e.__k.some(St))}function Mt(e,r,t){for(var a=0;a<t.length;)Ie(t[a++],t[a++],t[a++]);C.__c&&C.__c(r,e),e.some(function(o){try{e=o.__h,o.__h=[],e.some(function(s){s.call(o)})}catch(s){C.__e(s,o.__v)}})}function ha(e,r,t,a,o,s,l,n,d,c){var p,g,b,x,w,i,L,v,T,h=t.props||de,k=r.props,_=r.type;if(_=="svg"?o="http://www.w3.org/2000/svg":_=="math"?o="http://www.w3.org/1998/Math/MathML":o||(o="http://www.w3.org/1999/xhtml"),s){for(p=0;p<s.length;p++)if((w=s[p])&&(_?w.localName==_:w.nodeType==3)){e=w,s[p]=null;break}}if(!e){if(v=c.ownerDocument||document,!_)return v.createTextNode(k);e=v.createElementNS(o,_,k.is&&k),n&&(C.__m&&C.__m(r,s),n=!1),s=null}if(_){if(c=_=="template"?e.content:e,s=_=="textarea"&&k.defaultValue!=null?null:s&&yt.call(c.childNodes),!n&&s)for(h={},p=0;p<e.attributes.length;p++)h[(w=e.attributes[p]).name]=w.value;for(p in h)w=h[p],p=="dangerouslySetInnerHTML"?b=w:p=="children"||p in k||p=="value"&&"defaultValue"in k||p=="checked"&&"defaultChecked"in k||ne(e,p,null,w,o);for(p in T=1&t.__u,k)w=k[p],p=="children"?x=w:p=="dangerouslySetInnerHTML"?g=w:p=="value"?i=w:p=="checked"?L=w:n&&typeof w!="function"||!(h[p]!==w||T&&w!=null)||ne(e,p,w,h[p],o);g?(n||b&&(g.__html==b.__html||g.__html==e.innerHTML)||(e.innerHTML=g.__html),r.__k=[]):(b&&(e.textContent=""),(_=="foreignObject"||o=="http://www.w3.org/1998/Math/MathML"&&ca.test(_))&&(o="http://www.w3.org/1999/xhtml"),Ct(c,qe(x)?x:[x],r,t,a,o,s,l,s?s[0]:t.__k&&W(t,0),n,d),s&&s.some(ce)),n&&_!="textarea"||(p="value",_=="progress"&&i==null?e.removeAttribute(p):i==null||i===e[p]&&(_!="progress"||i)||ne(e,p,i,h[p],o),p="checked",L!=null&&L!=e[p]&&ne(e,p,L,h[p],o))}else h===k||n&&e.data==k||(e.data=k);return e}function Ie(e,r,t){try{typeof e=="function"?(typeof e.__u=="function"&&e.__u(),(typeof e.__u!="function"||r)&&(e.__u=e(r))):e.current=r}catch(a){C.__e(a,t)}}function Ne(e,r,t){var a,o;if(C.unmount&&C.unmount(e),!(a=e.ref)||a.current&&a.current!=e.__e||Ie(a,null,r),a=e.__c){if(a.componentWillUnmount)try{a.componentWillUnmount()}catch(s){C.__e(s,r)}a.__P=a.__n=null}if(a=e.__k)for(o=0;o<a.length;o++)a[o]&&Ne(a[o],r,typeof e.type!="function"||t&&!e.props.__P);(a=e.__e)&&(t||ce(a),a.__e&&(a.__e=null)),e.__e=e.__c=e.__=null}function ba(e,r,t){return this.constructor(e,t)}function At(e,r){var t,a,o,s;C.__&&C.__(e,r),r.nodeType==9&&(r=r.documentElement),a=(t=e&&32&e.__u)?null:r.__k,r.__k=ie(K,{children:[e]}),o=[],s=[],Ue(r,r.__k,a||de,de,r.namespaceURI,a?null:r.firstChild?yt.call(r.childNodes):null,o,a?a.__e:r.firstChild,t,s),Mt(o,r.__k,s),r.__k.props.children=null}function Lt(e){function r(t){var a,o;return this.getChildContext||(a=new Set,(o={})[r.__c]=this,this.getChildContext=function(){return o},this.shouldComponentUpdate=function(s){this.props.value!=s.value&&a.forEach(function(l){l.__g|=4,Oe(l)})},this.sub=function(s){a.add(s);var l=s.componentWillUnmount;s.componentWillUnmount=function(){a.delete(s),l&&l.call(s)}}),t.children}return r.__c="__cC"+wt++,r.__=e,r.Provider=(r.Consumer=function(t,a){return t.children(a)}).contextType=r,r}C={__e:function(e,r,t,a){for(var o,s,l;r=r.__;)if((o=r.__c)&&!(1&o.__g)){o.__g|=4;try{if((s=o.constructor)&&s.getDerivedStateFromError&&(o.setState(s.getDerivedStateFromError(e)),l=8&o.__g),o.componentDidCatch&&(o.componentDidCatch(e,a||{}),l=8&o.__g),l)return void(o.__g|=2)}catch(n){e=n,l=0}}throw pe=0,e}},ht=0,ua=function(e){return e!=null&&e.constructor===void 0},le.prototype.setState=function(e,r){var t=this.__s;t&&t!=this.state||(t=this.__s=X({},this.state)),typeof e=="function"&&(e=e(X({},t),this.props)),e&&(X(t,e),this.__v&&(r&&this.__k.push(r),Oe(this)))},le.prototype.forceUpdate=function(e){this.__v&&(this.__g|=4,e&&this.__h.push(e),Oe(this))},le.prototype.render=K,j=[],pe=0,bt=function(e,r){return e.__v.__b-r.__v.__b},fe=Symbol(),J=Symbol(),vt=/(PointerCapture)$|Capture$/i,He=0,Be=gt(!1),Ee=gt(!0),wt=0;var Y,P,Ge,Rt,Ve=Object.is,me=0,Ht=[],$e=[],R=C,Tt=R.__b,Pt=R.__r,Dt=R.diffed,zt=R.__c,Ft=R.unmount,Bt=R.__;function xe(e,r){R.__h&&R.__h(P,e,me||r),me=0;var t=P.__H||(P.__H={__:[],__h:[]});return e>=t.__.length&&t.__.push({}),t.__[e]}function z(e){return me=1,va(qt,e)}function va(e,r,t){var a=xe(Y++,2);if(a.t=e,!a.__c&&(a.__=[t?t(r):qt(void 0,r),function(s){var l=a.__N?a.__N[0]:a.__[0],n=a.t(l,s);Ve(l,n)||(a.__N=[n,a.__[1]],a.__c.setState({}))}],a.__c=P,!P.__f)){P.__f=!0;var o=P.shouldComponentUpdate;P.shouldComponentUpdate=function(s,l,n){var d=this.__H;if(!d)return!0;var c=!1,p=this.props!=s;if(d.__.some(function(b){b.__N&&(c=!0,Ve(b.__[0],b.__N[0])||(p=!0))}),o){var g=o.call(this,s,l,n);return c?g||p:g}return!c||p}}return a.__}function E(e,r){var t=xe(Y++,3);!R.__s&&We(t.__H,r)&&(t.__P=!0,t.__=e,t.u=r,P.__H.__h.push(t))}function ge(e,r){var t=xe(Y++,4);!R.__s&&We(t.__H,r)&&(t.__P=!1,t.__=e,t.u=r,P.__h.push(t))}function G(e){return me=5,ee(function(){return{current:e}},[])}function ee(e,r){var t=xe(Y++,7);return We(t.__H,r)&&(t.__=e(),t.__H=r),t.__}function wa(){var e;do{for(;e=$e.shift();)try{Q(e)}catch(t){R.__e(t,{__:(e=e.__P)&&e.__v})}for(;e=Ht.shift();){var r=e.__H;if(e.__P&&r)try{r.__h.some(Q),r.__h.some(je),r.__h=[]}catch(t){r.__h=[],R.__e(t,e.__v)}}}while($e.length)}R.__b=function(e){P=null,Tt&&Tt(e)},R.__=function(e,r){e&&r.__k&&r.__k.__m&&(e.__m=r.__k.__m),Bt&&Bt(e,r)},R.__r=function(e){Pt&&Pt(e),Y=0;var r=(P=e.__c).__H;r&&(Ge==P?P.__h=[]:(r.__h.some(Q),r.__h.some(je),Y=0),r.__h=[],r.__.some(function(t){t.__N&&(t.__=t.__N),t.u=t.__N=void 0})),Ge=P},R.diffed=function(e){Dt&&Dt(e);var r=e.__c;r&&r.__H&&(r.__H.__h.length&&Ot(Ht.push(r)),r.__H.__.some(function(t){t.u&&(t.__H=t.u)})),Ge=P=null},R.__c=function(e,r){r.some(function(t){try{t.__h.some(Q),t.__h=t.__h.filter(function(a){return!a.__||je(a)})}catch(a){r.some(function(o){o.__h&&(o.__h=[])}),r=[],R.__e(a,t.__v)}}),zt&&zt(e,r)},R.unmount=function(e){Ft&&Ft(e);var r,t,a=e.__c;a&&a.__H&&(a.__H.__.some(function(o){try{if(o.__P&&o.__c){if(t===void 0){for(t=e.__;t&&(!t.__c||!t.__c.__P);)t=t.__;t=t&&t.__c}o.__P=t,Ot($e.push(o))}else Q(o)}catch(s){r=s}}),a.__H=void 0,r&&R.__e(r,a.__v))};var Et=typeof requestAnimationFrame=="function";function ya(e){var r,t=function(){clearTimeout(a),Et&&cancelAnimationFrame(r),setTimeout(e)},a=setTimeout(t,35);Et&&(r=requestAnimationFrame(t))}function Ot(e){e!=1&&Rt==R.requestAnimationFrame||((Rt=R.requestAnimationFrame)||ya)(wa)}function Q(e){var r=P,t=e.__c;typeof t=="function"&&(e.__c=void 0,t()),P=r}function je(e){var r=P;e.__c=e.__(),P=r}function We(e,r){return!e||e.length!=r.length||r.some(function(t,a){return!Ve(t,e[a])})}function qt(e,r){return typeof r=="function"?r(e):r}var Ut=`/* RoFit \u2014 one stylesheet for the on-profile sheet, the library/settings page and the popup.\r
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
`;async function V(e,r){let t;try{t=await chrome.runtime.sendMessage({__rofit:!0,type:e,req:r})}catch{throw{kind:"network",message:"RoFit\u2019s background worker did not answer. Reload the page and try again."}}if(!t)throw{kind:"network",message:"RoFit\u2019s background worker did not answer. Reload the page and try again."};if(!t.ok)throw t.error;return t.data}var Ca=/[\u0300-\u036f]/g;function Xe(e){return e.normalize("NFKD").replace(Ca,"").toLowerCase().replace(/[^\p{L}\p{N}]+/gu," ").trim()}function _a(e){let r={raw:e,terms:[],phrases:[],ids:[],not:[]},t=/(-?)"([^"]*)"|(\S+)/g,a;for(;a=t.exec(e);){if(a[2]!==void 0){let d=Xe(a[2]);if(!d)continue;(a[1]?r.not:r.phrases).push(d);continue}let o=a[3],s=o.startsWith("-")&&o.length>1;s&&(o=o.slice(1));let l=/^#(\d{1,20})$/.exec(o);if(l&&!s){r.ids.push(Number(l[1]));continue}let n=Xe(o);if(n){if(s){r.not.push(n);continue}for(let d of n.split(" "))r.terms.push(d),/^\d{3,20}$/.test(d)&&r.ids.push(Number(d))}}return r}var Sa=e=>!e.terms.length&&!e.phrases.length&&!e.ids.length&&!e.not.length;function Ma(e,r){if(e===r)return!0;let t=e.length,a=r.length;if(Math.abs(t-a)>1)return!1;let o=0;for(;o<t&&o<a&&e[o]===r[o];)o++;return t===a?e.slice(o+1)===r.slice(o+1)?!0:e[o]===r[o+1]&&e[o+1]===r[o]&&e.slice(o+2)===r.slice(o+2):t>a?e.slice(o+1)===r.slice(o):e.slice(o)===r.slice(o+1)}function Aa(e,r){if(!e||!r)return 0;if(r===e)return 100;let t=o=>o+e.length===r.length||r[o+e.length]===" ";if(r.startsWith(e))return(t(0)?92:84)-Math.min(6,(r.length-e.length)/6);let a=r.indexOf(" "+e);if(a>=0)return a++,(t(a)?78:70)-Math.min(6,a/8);if(a=r.indexOf(e),a>0)return 52-Math.min(6,a/8);if(e.length>=3){let o=0,s=-1,l=-1;for(let n=0;n<r.length&&o<e.length;n++)r[n]===e[o]&&(s<0&&(s=n),o++,l=n);if(o===e.length){let n=l-s+1;if(n<=e.length*2+2)return 34-Math.min(14,n-e.length)}}if(e.length>=5){for(let o of r.split(" "))if(o.length>=4&&Ma(e,o))return 24}return 0}function La(e,r,t){let a=t??r.map(n=>Xe(n.text));for(let n of e.not)if(a.some(d=>d.includes(n)))return null;let o=0,s={s:0},l=n=>r.findIndex(d=>d.id===n);for(let n of e.phrases){let d=a.findIndex(p=>p.includes(n));if(d<0)return null;let c=90*(r[d].weight??1);o+=c,c>s.s&&(s={s:c,f:r[d]})}for(let n of e.terms){let d=0,c;for(let p=0;p<r.length;p++){let g=Aa(n,a[p])*(r[p].weight??1);g>d&&(d=g,c=r[p])}if(/^\d{3,20}$/.test(n)){let p=l(Number(n));p>=0&&120>d&&(d=120,c=r[p])}if(!d)return null;o+=d,d>s.s&&(s={s:d,f:c})}for(let n of e.ids){if(e.terms.includes(String(n)))continue;let d=l(n);if(d<0)return null;o+=120,120>s.s&&(s={s:120,f:r[d]})}return{score:o,field:s.f}}function Ke(e,r,t){let a=typeof r=="string"?_a(r):r;if(Sa(a))return e.map(s=>({item:s,match:{score:0}}));let o=[];return e.forEach((s,l)=>{let n=La(a,t(s));n&&o.push({item:s,match:n,i:l})}),o.sort((s,l)=>l.match.score-s.match.score||s.i-l.i),o}var It=[["path",{d:"M12 10.5V9.5a2.5 2.5 0 1 0-2.5-2.5"}],["path",{d:"M12 10.5 3 17a1.3 1.3 0 0 0 .8 2.4h16.4A1.3 1.3 0 0 0 21 17l-9-6.5Z"}]];var Ye=[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]];var Ze=[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]];var Je=[["path",{d:"m21 16-4 4-4-4"}],["path",{d:"M17 20V4"}],["path",{d:"m3 8 4-4 4 4"}],["path",{d:"M7 4v16"}]];var Qe=[["path",{d:"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"}],["path",{d:"m9 10 2 2 4-4"}]];var er=[["path",{d:"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"}]];var rr=[["path",{d:"M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"}],["path",{d:"m7 16.5-4.74-2.85"}],["path",{d:"m7 16.5 5-3"}],["path",{d:"M7 16.5v5.17"}],["path",{d:"M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"}],["path",{d:"m17 16.5-5-3"}],["path",{d:"m17 16.5 4.74-2.85"}],["path",{d:"M17 16.5v5.17"}],["path",{d:"M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"}],["path",{d:"M12 8 7.26 5.15"}],["path",{d:"m12 8 4.74-2.85"}],["path",{d:"M12 13.5V8"}]];var tr=[["path",{d:"M18 6 7 17l-5-5"}],["path",{d:"m22 10-7.5 7.5L13 16"}]];var ar=[["path",{d:"M20 6 9 17l-5-5"}]];var or=[["path",{d:"m6 9 6 6 6-6"}]];var sr=[["path",{d:"m9 18 6-6-6-6"}]];var he=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m16 9-5.5 5.5L8 12"}]];var nr=[["path",{d:"M10.1 2.182a10 10 0 0 1 3.8 0"}],["path",{d:"M13.9 21.818a10 10 0 0 1-3.8 0"}],["path",{d:"M17.609 3.721a10 10 0 0 1 2.69 2.7"}],["path",{d:"M2.182 13.9a10 10 0 0 1 0-3.8"}],["path",{d:"M20.279 17.609a10 10 0 0 1-2.7 2.69"}],["path",{d:"M21.818 10.1a10 10 0 0 1 0 3.8"}],["path",{d:"M3.721 6.391a10 10 0 0 1 2.7-2.69"}],["path",{d:"M6.391 20.279a10 10 0 0 1-2.69-2.7"}]];var fr=[["path",{d:"M11 14h10"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v1.344"}],["path",{d:"m17 18 4-4-4-4"}],["path",{d:"M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113"}],["rect",{x:"8",y:"2",width:"8",height:"4",rx:"1"}]];var ir=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 6v6l4 2"}]];var lr=[["path",{d:"M13.744 17.736a6 6 0 1 1-7.48-7.48"}],["path",{d:"M15 6h1v4"}],["path",{d:"m6.134 14.768.866-.5 2 3.464"}],["circle",{cx:"16",cy:"8",r:"6"}]];var pr=[["path",{d:"M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"}]];var dr=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]];var ur=[["path",{d:"M20 4v7a4 4 0 0 1-4 4H4"}],["path",{d:"m9 10-5 5 5 5"}]];var cr=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];var be=[["circle",{cx:"12",cy:"12",r:"1"}],["circle",{cx:"19",cy:"12",r:"1"}],["circle",{cx:"5",cy:"12",r:"1"}]];var mr=[["path",{d:"M15 3h6v6"}],["path",{d:"M10 14 21 3"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}]];var xr=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"}],["path",{d:"m2 2 20 20"}]];var gr=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{cx:"12",cy:"12",r:"3"}]];var ve=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{d:"M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"}],["path",{d:"M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"}]];var we=[["path",{d:"M4 12.15V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3.35"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{d:"m5 16-3 3 3 3"}],["path",{d:"m9 22 3-3-3-3"}]];var hr=[["path",{d:"M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1"}],["path",{d:"M2 13h10"}],["path",{d:"m9 16 3-3-3-3"}]];var ye=[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"}]];var br=[["path",{d:"m12 14 4-4"}],["path",{d:"M3.34 19a10 10 0 1 1 17.32 0"}]];var vr=[["circle",{cx:"5",cy:"6",r:"3"}],["path",{d:"M12 6h5a2 2 0 0 1 2 2v7"}],["path",{d:"m15 9-3-3 3-3"}],["circle",{cx:"19",cy:"18",r:"3"}],["path",{d:"M12 18H7a2 2 0 0 1-2-2V9"}],["path",{d:"m9 15 3 3-3 3"}]];var wr=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}],["path",{d:"M2 12h20"}]];var yr=[["line",{x1:"4",x2:"20",y1:"9",y2:"9"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21"}]];var kr=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]];var Cr=[["path",{d:"M10 8h.01"}],["path",{d:"M12 12h.01"}],["path",{d:"M14 8h.01"}],["path",{d:"M16 12h.01"}],["path",{d:"M18 8h.01"}],["path",{d:"M6 8h.01"}],["path",{d:"M7 16h10"}],["path",{d:"M8 12h.01"}],["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2"}]];var ke=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"}]];var _r=[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1"}]];var Sr=[["path",{d:"m16 6 4 14"}],["path",{d:"M12 6v14"}],["path",{d:"M8 8v12"}],["path",{d:"M4 4v16"}]];var Mr=[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"}]];var Ar=[["path",{d:"M13 5h8"}],["path",{d:"M13 12h8"}],["path",{d:"M13 19h8"}],["path",{d:"m3 17 2 2 4-4"}],["path",{d:"m3 7 2 2 4-4"}]];var Lr=[["path",{d:"M3 5h.01"}],["path",{d:"M3 12h.01"}],["path",{d:"M3 19h.01"}],["path",{d:"M8 5h13"}],["path",{d:"M8 12h13"}],["path",{d:"M8 19h13"}]];var Rr=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4"}]];var Tr=[["path",{d:"M5 12h14"}]];var Pr=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21"}]];var Dr=[["path",{d:"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"}],["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor"}]];var zr=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{d:"m15 5 4 4"}]];var Fr=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];var Br=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];var Er=[["path",{d:"m2 9 3-3 3 3"}],["path",{d:"M13 18H7a2 2 0 0 1-2-2V6"}],["path",{d:"m22 15-3 3-3-3"}],["path",{d:"M11 6h6a2 2 0 0 1 2 2v10"}]];var Ce=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}],["path",{d:"M12 7v5l4 2"}]];var Or=[["path",{d:"M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"}],["path",{d:"m14.5 12.5 2-2"}],["path",{d:"m11.5 9.5 2-2"}],["path",{d:"m8.5 6.5 2-2"}],["path",{d:"m17.5 15.5 2-2"}]];var Hr=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];var qr=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{cx:"12",cy:"12",r:"3"}]];var Ur=[["circle",{cx:"18",cy:"5",r:"3"}],["circle",{cx:"6",cy:"12",r:"3"}],["circle",{cx:"18",cy:"19",r:"3"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49"}]];var Ir=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"m9 12 2 2 4-4"}]];var Nr=[["path",{d:"M16 10a4 4 0 0 1-8 0"}],["path",{d:"M3.103 6.034h17.794"}],["path",{d:"M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"}]];var Gr=[["path",{d:"M10 5H3"}],["path",{d:"M12 19H3"}],["path",{d:"M14 3v4"}],["path",{d:"M16 17v4"}],["path",{d:"M21 12h-9"}],["path",{d:"M21 19h-5"}],["path",{d:"M21 5h-7"}],["path",{d:"M8 10v4"}],["path",{d:"M8 12H3"}]];var Vr=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"}]];var $r=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"}]];var jr=[["path",{d:"M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"}],["path",{d:"M15 3v5a1 1 0 0 0 1 1h5"}]];var Wr=[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor"}]];var _e=[["path",{d:"M10 11v6"}],["path",{d:"M14 11v6"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{d:"M3 6h18"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}]];var Se=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]];var Xr=[["path",{d:"M12 3v12"}],["path",{d:"m17 8-5-5-5 5"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}]];var Kr=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{cx:"12",cy:"7",r:"4"}]];var Yr=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}],["circle",{cx:"9",cy:"7",r:"4"}]];var Zr=[["path",{d:"M12 20h.01"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0"}],["path",{d:"M5 12.859a10 10 0 0 1 5.17-2.69"}],["path",{d:"M19 12.859a10 10 0 0 0-2.007-1.523"}],["path",{d:"M2 8.82a15 15 0 0 1 4.177-2.643"}],["path",{d:"M22 8.82a15 15 0 0 0-11.288-3.764"}],["path",{d:"m2 2 20 20"}]];var Jr=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];var Ra=0;function f(e,r,t,a,o,s){r||(r={});var l,n,d=r;if("ref"in d&&typeof e!="function")for(n in d={},r)n=="ref"?l=r[n]:d[n]=r[n];var c={type:e,props:d,key:t,ref:l,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--Ra,__i:-1,__u:0};return(o||s)&&(c.__source=o,c.__self=s),C.vnode&&C.vnode(c),c}function Ta({node:e,size:r=18,class:t,label:a}){return f("svg",{class:"rf-ico "+(t??""),width:r,height:r,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":a?void 0:"true",role:a?"img":void 0,"aria-label":a,children:e.map(([o,s],l)=>f(o,{...s},l))})}var Pa={search:Hr,close:Jr,back:Ye,settings:qr,check:ar,copy:dr,external:mr,save:er,saved:Qe,compare:vr,more:be,grid:_r,list:Lr,refresh:Br,down:or,right:sr,outfit:It,library:Sr,download:cr,upload:Xr,trash:_e,filter:ye,history:Ce,warn:Se,info:kr,link:Mr,code:we,json:ve,layers:ke,scale:Or,palette:Dr,tag:Wr,note:jr,lock:Rr,user:Kr,ok:he,dashed:nr,sort:Je,eye:gr,eyeOff:xr,minus:Tr,plus:Fr,repeat:Er,tasks:Ar,spark:Vr,boxes:rr,hash:yr,bag:Nr,clock:ir,star:$r,command:pr,share:Ur,keyboard:Cr,move:hr,edit:zr,globe:wr,shield:Ir,selectAll:tr,sliders:Gr,arrow:Ze,users:Yr,enter:ur,offline:Zr,paste:fr,coins:lr,gauge:br,monitor:Pr},A=({n:e,size:r,class:t,label:a})=>f(Ta,{node:Pa[e],size:r,class:t,label:a});var Ae={v:2,appearance:"auto",motion:"system",density:"comfortable",layout:"grid",showPrices:!0,technical:!1,showPresets:!1,profileTab:!0,profileButton:!0,keepHistory:!0,historyLimit:20,cacheMinutes:10,onboarded:!1,autoIndex:!1,indexPrices:!0,checkAccess:!0},Me="settings";function Nt(e){let r=e&&typeof e=="object"?e:{},t={...Ae,...r};return(!r.v||r.v<2)&&(r.motion==="reduced"?t.motion="calm":(r.motion==="full"||r.motion===void 0)&&(t.motion="system")),["system","full","balanced","calm"].includes(t.motion)||(t.motion="system"),t.v=2,t}async function Gt(){try{let e=await chrome.storage.local.get(Me);return Nt(e[Me])}catch{return{...Ae}}}function Vt(e){let r=(t,a)=>{a==="local"&&t[Me]&&e(Nt(t[Me].newValue))};return chrome.storage.onChanged.addListener(r),()=>chrome.storage.onChanged.removeListener(r)}function $t(e,r){return e==="full"||e==="balanced"||e==="calm"?e:r?"calm":"full"}var jt={full:{flip:420,enter:320,fly:440,flyBack:300},balanced:{flip:240,enter:200,fly:0,flyBack:0},calm:{flip:0,enter:0,fly:0,flyBack:0}},Wt=e=>e==="calm"?" rm":e==="balanced"?" mb":"";function Xt(){let[e,r]=z(Ae);return E(()=>(Gt().then(r),Vt(r)),[]),e}var et=class{map=new Map;queue=new Map;listeners=new Set;timer=0;get(r,t="150x150"){return this.map.get(`${r}:${t}`)}subscribe(r){return this.listeners.add(r),()=>this.listeners.delete(r)}request(r,t="150x150"){let a=`${r}:${t}`;this.map.get(a)?.url||this.queue.has(a)||(this.queue.set(a,{id:r,size:t,tries:0}),this.timer||(this.timer=window.setTimeout(()=>this.flush(),50)))}emit(){this.listeners.forEach(r=>r())}async flush(){this.timer=0;let r=[...this.queue.values()];this.queue.clear();for(let t of["150x150","420x420"]){let a=r.filter(o=>o.size===t).map(o=>o.id);for(let o=0;o<a.length;o+=50){let s=a.slice(o,o+50);try{let l=await V("outfits.thumbs",{ids:s,size:t});for(let n of s){let d=l[n]??{state:"Error",url:null};this.map.set(`${n}:${t}`,d);let c=r.find(p=>p.id===n&&p.size===t);d.state==="Pending"&&c.tries<6&&(this.queue.set(`${n}:${t}`,{id:n,size:t,tries:c.tries+1}),this.timer||(this.timer=window.setTimeout(()=>this.flush(),2500)))}}catch(l){for(let n of s)this.map.set(`${n}:${t}`,{state:l.kind==="rate-limited"?"RateLimited":"Error",url:null})}this.emit()}}}},Qr=new et;function rt(e,r="150x150",t=!0){let[,a]=z(0);return E(()=>{if(t)return Qr.request(e,r),Qr.subscribe(()=>a(o=>o+1))},[e,r,t]),Qr.get(e,r)}function re(e,r){let[t,a]=z({loading:!0}),[o,s]=z(0);return E(()=>{let l=!1;return a(n=>({data:n.data,loading:!0})),e().then(n=>!l&&a({data:n,loading:!1}),n=>!l&&a({error:n,loading:!1})),()=>{l=!0}},[...r,o]),{...t,reload:()=>s(l=>l+1)}}function za(){let[e,r]=z(()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches);return E(()=>{let t=window.matchMedia("(prefers-reduced-motion: reduce)"),a=()=>r(t.matches);return t.addEventListener("change",a),()=>t.removeEventListener("change",a)},[]),e}function Kt(e){return $t(e,za())}var Fa="cubic-bezier(.22, 1, .36, 1)",Ba="linear(0, .0175, .0659 2.3%, .1381 3.6%, .4245 8%, .5574 10.3%, .6763, .7759 15.1%, .8541 17.7%, .9147 20.5%, .9568 23.4%, .9837 26.4%, 1.0007 29.6%, 1.0153 34.4%, 1.0198 40%, 1.0168 46.6%, 1.0056 59.3%, .9994 74.2%, 1)",Yt=e=>e==="full"?Ba:Fa;function Ea(e){let r=getComputedStyle(e).transform;if(!r||r==="none")return[0,0];let t=new DOMMatrixReadOnly(r);return[t.m41,t.m42]}function tt(e,r,t=0){ge(()=>{let a=e.current;if(!a)return;let o=()=>{let n=a.querySelector("[aria-checked=true],[aria-selected=true]");if(!n){a.style.setProperty("--w","0px");return}a.style.setProperty("--x",n.offsetLeft+t+"px"),a.style.setProperty("--w",Math.max(0,n.offsetWidth-t*2)+"px")},s=()=>{a.classList.add("still"),o(),requestAnimationFrame(()=>requestAnimationFrame(()=>a.classList.remove("still")))};a.dataset.ready?o():(a.dataset.ready="1",s());let l=new ResizeObserver(s);return l.observe(a),()=>l.disconnect()},[r])}function Zt(e,r,t){let a=t==="calm",o=jt[t],s=G(new Map),l=G(new WeakMap),n=()=>{let d=new Map;return e.current?.querySelectorAll(":scope > [data-k]").forEach(c=>d.set(c.dataset.k,[c.offsetLeft,c.offsetTop])),d};ge(()=>{let d=e.current;if(!d)return;let c=n(),p=s.current;if(!a&&p.size&&c.size){let g=d.closest(".rf-scroll"),b=(g?.scrollTop??0)-160-d.offsetTop,x=b+(g?.clientHeight??800)+320,w=[],i=0;d.querySelectorAll(":scope > [data-k]").forEach(v=>{if(i>=90)return;let T=v.dataset.k,h=c.get(T),k=p.get(T),_=B=>B+v.offsetHeight>=b&&B<=x,S=l.current.get(v),O=0,N=0;if(S&&S.playState==="running"&&([O,N]=Ea(v),S.cancel()),k){let B=k[0]-h[0]+O,H=k[1]-h[1]+N;if((Math.abs(B)>.5||Math.abs(H)>.5)&&(_(h[1])||_(k[1]))){i++;let q=Math.round(o.flip*Math.min(1.25,.8+Math.hypot(B,H)/1200));l.current.set(v,v.animate([{transform:`translate(${B}px, ${H}px)`},{transform:"none"}],{duration:q,easing:Yt(t)}))}}else _(h[1])&&(i++,w.push(v))});let L=t==="full"&&w.length<=24?22:0;w.forEach((v,T)=>{let h=t==="full"?[{opacity:0,transform:"translateY(8px) scale(.94)"},{opacity:1,transform:"none"}]:[{opacity:0},{opacity:1}];l.current.set(v,v.animate(h,{duration:o.enter,delay:T*L,easing:Yt(t),fill:"backwards"}))})}s.current=c},[r]),E(()=>{let d=e.current;if(!d)return;let c=0,p=new ResizeObserver(()=>{cancelAnimationFrame(c),c=requestAnimationFrame(()=>{s.current=n()})});return p.observe(d),()=>{cancelAnimationFrame(c),p.disconnect()}},[])}var Qn=Lt(()=>{});function at({size:e=16}){return f("span",{class:"rf-spin",style:{width:e+"px",height:e+"px"},role:"progressbar","aria-label":"Loading"})}var Le={bg:"rgb(255, 255, 255)",fg:"rgb(32, 34, 39)",accent:"rgb(51, 95, 255)",accentFg:"#ffffff",tint:"rgb(27, 37, 75)"},ot={bg:"rgb(18, 18, 21)",fg:"rgb(247, 247, 248)",accent:"rgb(51, 95, 255)",accentFg:"#ffffff",tint:"rgb(208, 217, 251)"},Oa={bg:"rgb(0, 0, 0)",fg:"rgb(247, 247, 248)",accent:"rgb(51, 95, 255)",accentFg:"#ffffff",tint:"rgb(208, 217, 251)"};function te(e){let r=e.match(/rgba?\(([^)]+)\)/);if(!r)return null;let t=r[1].split(/[ ,/]+/).filter(Boolean).map(Number);return[t[0],t[1],t[2],t[3]??1]}var Jt=([e,r,t])=>{let a=o=>(o/=255,o<=.03928?o/12.92:((o+.055)/1.055)**2.4);return .2126*a(e)+.7152*a(r)+.0722*a(t)};function Ha(){let e=g=>{for(let b=g;b;b=b.parentElement){let x=te(getComputedStyle(b).backgroundColor);if(x&&x[3]>.9)return x}return null},r=e(document.body)??e(document.documentElement);if(!r)return Le;let a=Jt(r)<.4?ot:Le,o=te(getComputedStyle(document.body).color),s=a.accent,l=document.querySelector(".bg-action-emphasis, .btn-primary-md, .btn-growth-md"),n=l?te(getComputedStyle(l).backgroundColor):null;n&&n[3]>.9&&(s=`rgb(${n[0]}, ${n[1]}, ${n[2]})`);let d=document.querySelector(".bg-action-standard"),c=d?te(getComputedStyle(d).backgroundColor):null,p=c?`rgb(${c[0]}, ${c[1]}, ${c[2]})`:a.tint;return{bg:`rgb(${r[0]}, ${r[1]}, ${r[2]})`,fg:o?`rgb(${o[0]}, ${o[1]}, ${o[2]})`:a.fg,accent:s,accentFg:"#ffffff",tint:p}}function Qt(e,r){let t;e.appearance==="light"?t=Le:e.appearance==="dark"?t=ot:e.appearance==="oled"?t=Oa:r?t=Ha():t=window.matchMedia("(prefers-color-scheme: dark)").matches?ot:Le;let a=te(t.bg);return{...t,dark:a?Jt(a)<.4:!1}}function ea(e){let[r,t,a,o]=e.dark?["11%","17%","23%","19%"]:["3.5%","7.5%","12%","13%"];return{"--rf-bg":e.bg,"--rf-fg":e.fg,"--rf-accent":e.accent,"--rf-accent-fg":e.accentFg,"--rf-tint":e.tint,"--rf-s1":r,"--rf-s2":t,"--rf-s3":a,"--rf-line-pct":o,"color-scheme":e.dark?"dark":"light"}}var qa=new Intl.NumberFormat("en-US");function ae(e,r=Date.now()){let t=Math.max(0,(r-e)/1e3);return t<45?"just now":t<3600?`${Math.round(t/60)}m ago`:t<86400?`${Math.round(t/3600)}h ago`:t<86400*30?`${Math.round(t/86400)}d ago`:new Date(e).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}var oe=(e,r,t=r+"s")=>`${qa.format(e)} ${e===1?r:t}`;function st(e){let r=e.access?.state;return r==="restricted"?"Outfits private":r==="unavailable"?"Unavailable":e.outfitCount==null?"Profile":e.outfitCount?oe(e.outfitCount,"outfit"):"No outfits shown"}var ra=(e,r)=>`https://www.roblox.com/users/${e}/profile#rofit/${r}`;async function ta(e){try{return await navigator.clipboard.writeText(e),!0}catch{let r=document.createElement("textarea");r.value=e,r.style.cssText="position:fixed;opacity:0",document.body.appendChild(r),r.select();let t=document.execCommand("copy");return r.remove(),t}}function nt(e){switch(e?.kind){case"rate-limited":return{title:"Roblox is rate limiting RoFit",body:`Too many requests in a short time. Wait ${e.retryAfter??10}s and try again.`};case"not-found":return{title:"Roblox can\u2019t find that",body:"The user or outfit no longer exists, or its ID is wrong."};case"forbidden":return{title:"Roblox won\u2019t show this",body:"This list is private or restricted. RoFit doesn\u2019t get around that."};case"network":return typeof navigator<"u"&&navigator.onLine===!1?{title:"You\u2019re offline",body:"RoFit shows what it has saved; anything new from Roblox needs a connection. Try again once you\u2019re back online."}:{title:"Couldn\u2019t reach Roblox",body:e.message||"Check your connection and try again."};case"timeout":return{title:"Roblox took too long",body:"It didn\u2019t answer within 20 seconds. It may be busy; try again in a moment."};case"unauthenticated":return{title:"Sign in to Roblox",body:e.message||"This needs you to be signed in to Roblox in this browser."};case"server":return{title:"Roblox had a problem",body:"Their servers returned an error. Try again shortly."};case"bad-response":return{title:"Roblox changed something",body:e.message||"The response wasn\u2019t in the shape RoFit expects. Diagnostics in settings has details."};default:return{title:"Request failed",body:e?.message||"Try again."}}}var aa=document.createElement("style");aa.textContent=Ut;document.head.appendChild(aa);var se=[{id:"recent",label:"Recent",icon:"clock"},{id:"favorites",label:"Favorites",icon:"star"},{id:"saved",label:"Saved",icon:"saved"}],oa="rofit.popup.tab",Ua=()=>{try{let e=localStorage.getItem(oa);return e==="favorites"||e==="saved"?e:"recent"}catch{return"recent"}},sa=/^https:\/\/www\.roblox\.com\/(?:[a-z]{2}(?:-[a-z]{2,4})?\/)?users\/(\d+)/i,Re=(e,r)=>`https://www.roblox.com/users/${e}/profile#rofit${r?"/"+r:""}`,Ia=e=>sa.test(e)||/^#?\d{1,19}$/.test(e)||/^@?[A-Za-z0-9_]{3,20}$/.test(e);function Na(){let[e,r]=z(navigator.onLine);return E(()=>{let t=()=>r(!0),a=()=>r(!1);return addEventListener("online",t),addEventListener("offline",a),()=>{removeEventListener("online",t),removeEventListener("offline",a)}},[]),e}function Ga(e,r){let a=[...e.currentTarget.querySelectorAll("[data-row]")],o=a.indexOf(document.activeElement),s=-1;if(e.key==="ArrowDown")s=Math.min(a.length-1,o+1);else if(e.key==="ArrowUp"){if(o<=0){e.preventDefault(),r?.focus();return}s=o-1}else e.key==="Home"?s=0:e.key==="End"&&(s=a.length-1);s>=0&&a[s]&&(e.preventDefault(),a[s].focus())}function Va({name:e}){let r=0;for(let t of e)r=(r*31+t.charCodeAt(0))%360;return f("span",{class:"rf-pop-av",style:{"--h":String(r)},children:e.slice(0,1).toUpperCase()})}function $a({e,i:r,onOpen:t,onProfile:a}){let o=rt(e.outfitId,"150x150",!e.thumb),s=e.thumb??o?.url??null;return f("div",{class:"rf-pop-item","data-k":"l"+e.key,style:{"--i":String(r)},children:[f("button",{class:"rf-pop-row","data-row":!0,onClick:t,title:`Open \u201C${e.name}\u201D in your library`,children:[f("span",{class:"rf-pop-th"+(s?"":" none"),children:s?f("img",{src:s,alt:"",loading:"lazy"}):f(A,{n:"outfit",size:16})}),f("span",{class:"rf-pop-name",children:[e.name,f("small",{children:[e.favorite?"\u2605 ":"","by ",e.userName,e.collection?" \xB7 "+e.collection:""," \xB7 ",ae(e.savedAt)]})]})]}),e.source!=="import"&&e.source!=="share"&&f("button",{class:"rf-ib rf-pop-side","data-row":!0,title:"Open on their Roblox profile","aria-label":`Open ${e.name} on ${e.userName}\u2019s profile`,onClick:a,children:f(A,{n:"external",size:15})})]})}function Te({icon:e,title:r,body:t,action:a}){return f("div",{class:"rf-pop-empty",children:[f("span",{class:"rf-pop-empty-ic",children:f(A,{n:e,size:20})}),f("b",{children:r}),f("p",{children:t}),a&&f("button",{class:"rf-btn",onClick:a.run,children:a.label})]})}function ja(){let e=Xt(),r=Kt(e.motion),t=Na(),[a,o]=z(void 0),[s,l]=z(""),[n,d]=z(0),[c,p]=z(null),[g,b]=z(Ua),[x,w]=z(!1),[i,L]=z(g!=="recent"),v=G(null),T=G(null),h=G(null),k=re(()=>V("users.recent",{limit:24}),[]),_=re(()=>V("diag.get",{}).then(u=>u.counts.library),[]),S=re(()=>i?V("library.list",{}):Promise.resolve(null),[i]),O=re(async()=>a?V("outfits.cached",{userId:a.userId}):null,[a?.userId]),N=u=>{b(u),u!=="recent"&&L(!0);try{localStorage.setItem(oa,u)}catch{}};tt(T,g,3),E(()=>{chrome.tabs.query({active:!0,currentWindow:!0}).then(([m])=>{let M=m?.url?.match(sa);o(m?.id&&M?{tabId:m.id,userId:Number(M[1]),name:(m.title??"").replace(/\s*[-–|]\s*Roblox.*$/i,"").trim()||"this profile"}:null)}).catch(()=>o(null))},[]),E(()=>{s.trim()&&L(!0),d(0),p(u=>u&&u.q===s.trim()?u:null)},[s]),E(()=>{let u=m=>{let M=document.activeElement===v.current;m.key==="/"&&!M?(m.preventDefault(),v.current?.focus(),v.current?.select()):!M&&!m.metaKey&&!m.ctrlKey&&!m.altKey&&/^[1-3]$/.test(m.key)&&(m.preventDefault(),N(se[Number(m.key)-1].id))};return addEventListener("keydown",u),()=>removeEventListener("keydown",u)},[]);let B=ea(Qt(e,!1)),H=async u=>{if(a)try{if(u)throw 0;await chrome.tabs.sendMessage(a.tabId,{__rofit:"open"}),window.close()}catch{await chrome.tabs.update(a.tabId,{url:Re(a.userId,u)}),window.close()}},q=u=>{chrome.tabs.create({url:u}),window.close()},F=u=>{V("page.open",{route:u}),window.close()},$=async()=>{a&&await ta(`https://www.roblox.com/users/${a.userId}/profile`)&&(w(!0),setTimeout(()=>w(!1),1400))},U=async u=>{let m=u.trim();if(!Ia(m)){p({q:m,msg:"That isn\u2019t a Roblox username or user ID. Usernames are 3\u201320 letters, numbers or underscores."});return}if(!t){p({q:m,msg:"You\u2019re offline, so RoFit can\u2019t ask Roblox who that is. Your saved outfits below still work."});return}p({q:m,busy:!0});try{let M=await V("users.lookup",{query:m});M?M.isBanned?p({q:m,msg:`@${M.name} is banned, so Roblox shows no profile.`}):q(Re(M.id)):p({q:m,msg:`No Roblox account is called \u201C${m.replace(/^@/,"")}\u201D.`})}catch(M){let y=nt(M);p({q:m,msg:y.title+". "+y.body})}},D=s.trim(),I=ee(()=>{if(!D)return[];let u=[{key:"find",icon:"search",title:`Find \u201C${D.replace(/^@/,"")}\u201D on Roblox`,sub:"Open their profile with RoFit",run:()=>U(D)}],m=Ke(k.data??[],D,y=>[{text:y.name,weight:1.2},{text:y.displayName},{text:"",id:y.id}]).slice(0,4);for(let{item:y}of m)u.push({key:"u"+y.id,icon:"user",title:y.displayName&&y.displayName!==y.name?`${y.displayName} (@${y.name})`:y.name,sub:`${st(y)} \xB7 seen ${ae(y.lastSeen)}`,run:()=>q(Re(y.id))});let M=Ke(S.data??[],D,y=>[{text:y.name,weight:1.25},{text:y.userName},{text:y.collection,weight:.8},...y.tags.map(la=>({text:la})),{text:y.note,weight:.5},{text:"",id:y.outfitId}]).slice(0,5);for(let{item:y}of M)u.push({key:"l"+y.key,icon:y.favorite?"star":"saved",title:y.name,sub:`Saved \xB7 by ${y.userName}${y.collection?" \xB7 "+y.collection:""}`,run:()=>F("library/open/"+encodeURIComponent(y.key))});return u},[D,k.data,S.data,t]),na=u=>{u.key==="ArrowDown"&&I.length?(u.preventDefault(),d(m=>(m+1)%I.length)):u.key==="ArrowUp"&&I.length?(u.preventDefault(),d(m=>(m-1+I.length)%I.length)):u.key==="ArrowDown"&&!D?(u.preventDefault(),h.current?.querySelector("[data-row]")?.focus()):u.key==="Enter"&&I[n]?(u.preventDefault(),I[n].run()):u.key==="Escape"&&s&&(u.preventDefault(),l(""))},Z=O.data?.outfits.filter(u=>u.isEditable)??[],ft=(S.data??[]).filter(u=>a&&u.userId===a.userId).length,Pe=(k.data??[]).filter(u=>u.id!==a?.userId).slice(0,6),it=ee(()=>(S.data??[]).filter(u=>u.favorite).sort((u,m)=>m.savedAt-u.savedAt).slice(0,6),[S.data]),De=ee(()=>[...S.data??[]].sort((u,m)=>m.savedAt-u.savedAt).slice(0,6),[S.data]),ze=!!(k.error&&_.error),Fe=t?ze?{cls:"bad",label:"Worker asleep"}:{cls:"ok",label:"Ready"}:{cls:"off",label:"Offline"},fa=g==="recent"?Pe.map(u=>"u"+u.id):(g==="favorites"?it:De).map(u=>"l"+u.key);Zt(h,g+":"+fa.join(","),r);let lt=S.loading&&i,ia=(()=>{if(g==="recent")return k.loading&&!k.data?f("div",{class:"rf-pop-skels",children:[0,1,2].map(m=>f("div",{class:"rf-skel"},m))}):Pe.length?Pe.map((m,M)=>f("div",{class:"rf-pop-item","data-k":"u"+m.id,style:{"--i":String(M)},children:f("button",{class:"rf-pop-row","data-row":!0,onClick:()=>q(Re(m.id)),children:[f(Va,{name:m.name}),f("span",{class:"rf-pop-name",children:[m.displayName&&m.displayName!==m.name?m.displayName:m.name,f("small",{children:["@",m.name," \xB7 ",st(m)," \xB7 ",ae(m.lastSeen)]})]}),f(A,{n:"right",size:16,class:"rf-pop-chev"})]})},m.id)):f(Te,{icon:"users",title:"No profiles yet",body:"Profiles you open with RoFit show up here, so you can jump back in one click."});let u=g==="favorites"?it:De;return lt&&!S.data?f("div",{class:"rf-pop-skels",children:[0,1,2].map(m=>f("div",{class:"rf-skel"},m))}):S.error?f(Te,{icon:"warn",title:"Couldn\u2019t read your library",body:nt(S.error).body,action:{label:"Try again",run:S.reload}}):u.length?u.map((m,M)=>f($a,{e:m,i:M,onOpen:()=>F("library/open/"+encodeURIComponent(m.key)),onProfile:()=>q(ra(m.userId,m.outfitId))},m.key)):g==="favorites"?f(Te,{icon:"star",title:"No favorites yet",body:"Star an outfit in your library and it lives here for quick access.",action:De.length?{label:"Open library",run:()=>F("library")}:void 0}):f(Te,{icon:"saved",title:"Nothing saved yet",body:"Open any outfit on a profile and press Save. It stays in your library even if the owner deletes it."})})();return f("div",{class:"rf rf-popup rf-pop2"+Wt(r),style:B,children:[f("header",{class:"rf-pop-h",children:[f("span",{class:"rf-pop-logo",children:f(A,{n:"outfit",size:16})}),f("b",{children:"RoFit"}),f("span",{class:"rf-pop-status "+Fe.cls,role:"status",title:ze?"RoFit\u2019s background worker didn\u2019t answer. Reload the extension from chrome://extensions if this keeps happening.":Fe.label,children:[f("i",{}),Fe.label]}),f("span",{class:"rf-grow"}),f("button",{class:"rf-ib","aria-label":"Open library",title:"Library",onClick:()=>F("library"),children:f(A,{n:"library",size:18})}),f("button",{class:"rf-ib","aria-label":"Open settings",title:"Settings",onClick:()=>F("settings"),children:f(A,{n:"settings",size:18})}),f("a",{class:"rf-ib",href:ct,target:"_blank",rel:"noopener noreferrer",title:"RoFit settings on Roblox","aria-label":"RoFit settings on Roblox",children:f(A,{n:"user",size:18})})]}),f("div",{class:"rf-pop-search",children:f("label",{class:"rf-search",children:[f(A,{n:"search",size:16}),f("input",{ref:v,autoFocus:!0,value:s,spellcheck:!1,autocomplete:"off","aria-autocomplete":"list",placeholder:"Username, user ID or saved outfit","aria-label":"Search Roblox users and your library",role:"combobox","aria-expanded":I.length>0,"aria-controls":"rf-pop-results","aria-activedescendant":I[n]?"rf-pr-"+n:void 0,onInput:u=>l(u.target.value),onKeyDown:na}),s?f("button",{class:"rf-ib rf-pop-clear","aria-label":"Clear search",onClick:()=>{l(""),v.current?.focus()},children:f(A,{n:"close",size:14})}):f("kbd",{class:"rf-kbd","aria-hidden":"true",children:"/"})]})}),!t&&f("p",{class:"rf-pop-msg rf-pop-banner",role:"alert",children:[f(A,{n:"offline",size:14}),"You\u2019re offline. Saved outfits still open; new profiles need a connection."]}),D?f("div",{class:"rf-pop-results",id:"rf-pop-results",role:"listbox","aria-label":"Results","data-anim":"enter",children:[I.map((u,m)=>f("div",{id:"rf-pr-"+m,role:"option","aria-selected":m===n,class:"rf-pop-row"+(m===n?" on":""),style:{"--i":String(m)},onMouseMove:()=>d(m),onClick:u.run,children:[f("span",{class:"rf-pop-av ic",children:f(A,{n:u.icon,size:16})}),f("span",{class:"rf-pop-name",children:[u.title,f("small",{children:u.sub})]}),m===0&&c?.busy?f(at,{size:14}):m===n?f("kbd",{class:"rf-kbd",children:"\u21B5"}):null]},u.key)),c?.msg&&f("p",{class:"rf-pop-msg",role:"alert",children:[f(A,{n:"warn",size:14}),c.msg]}),lt&&f("p",{class:"rf-pop-msg muted",children:[f(at,{size:12}),"Searching your library\u2026"]}),!S.loading&&I.length===1&&!c&&f("p",{class:"rf-pop-msg muted",children:"Nothing saved or recently viewed matches. Press Enter to look the name up on Roblox."})]}):f("div",{class:"rf-pop-home","data-anim":"enter",children:[a===void 0?f("div",{class:"rf-pop-now sk",children:f("div",{class:"rf-skel"})}):a?f("div",{class:"rf-pop-here",children:[f("button",{class:"rf-pop-now live",onClick:()=>H(),children:[f("span",{class:"rf-pop-now-t",children:[f("small",{children:"On this profile"}),f("b",{children:a.name}),f("span",{class:"rf-muted",children:Z.length?`${oe(Z.length,"saved outfit")} \xB7 checked ${ae(O.data?.user?.lastSyncAt??Date.now())}`:"Browse their saved outfits"})]}),f("span",{class:"rf-pop-go",children:f(A,{n:"right",size:18})})]}),f("div",{class:"rf-pop-acts",children:[f("button",{class:"rf-chip"+(x?" on":""),onClick:$,children:[f(A,{n:x?"check":"link",size:14}),x?"Copied":"Copy link"]}),ft>0&&f("button",{class:"rf-chip",onClick:()=>F("library"),children:[f(A,{n:"saved",size:14}),oe(ft,"in library","in library")]}),Z[0]&&f("button",{class:"rf-chip",onClick:()=>H(Z[0].id),title:`Open \u201C${Z[0].name}\u201D`,children:[f(A,{n:"eye",size:14}),"Newest outfit"]})]})]}):f("div",{class:"rf-pop-now idle",children:[f(A,{n:"outfit",size:20}),f("span",{children:["Open any Roblox profile and look for ",f("b",{children:"Outfits"})," (or ",f("b",{children:"Saved Outfits"}),"), or search for someone above."]})]}),ze&&f("p",{class:"rf-pop-msg",role:"alert",children:[f(A,{n:"warn",size:14}),"RoFit\u2019s background worker didn\u2019t answer. Reload the extension from chrome://extensions if this keeps happening."]}),f("div",{class:"rf-pop-tabs rf-seg",role:"tablist","aria-label":"Quick access",ref:T,children:se.map((u,m)=>f("button",{role:"tab",id:"rf-pt-"+u.id,"aria-selected":g===u.id,"aria-controls":"rf-pop-panel",tabIndex:g===u.id?0:-1,title:`${u.label} (${m+1})`,onClick:()=>N(u.id),onKeyDown:M=>{if(M.key==="ArrowRight"||M.key==="ArrowLeft"){M.preventDefault();let y=se[(m+(M.key==="ArrowRight"?1:se.length-1))%se.length];N(y.id),T.current?.querySelector("#rf-pt-"+y.id)?.focus()}},children:[f(A,{n:u.icon,size:14}),u.label,u.id==="favorites"&&S.data?f("em",{children:S.data.filter(M=>M.favorite).length||""}):null]},u.id))}),f("div",{class:"rf-pop-panel",id:"rf-pop-panel",role:"tabpanel","aria-labelledby":"rf-pt-"+g,ref:h,onKeyDown:u=>Ga(u,v.current),children:ia},g)]}),f("footer",{class:"rf-pop-foot",children:[f("button",{class:"rf-pop-lib",onClick:()=>F("library"),children:[f(A,{n:"library",size:16}),f("span",{children:"Library"}),f("em",{children:_.data!=null?oe(_.data,"saved outfit"):""}),f(A,{n:"right",size:16,class:"rf-pop-chev"})]}),f("div",{class:"rf-poplinks",children:[f("a",{href:pt,target:"_blank",rel:"noopener noreferrer",children:"Official site"})," \xB7 ",f("a",{href:dt,target:"_blank",rel:"noopener noreferrer",children:"Report a problem"})," \xB7 ",f("a",{href:ut,target:"_blank",rel:"noopener noreferrer",children:"Donate"})]})]})]})}At(f(ja,{}),document.getElementById("root"));chrome.action.setBadgeText({text:""}).catch(()=>{});})();
