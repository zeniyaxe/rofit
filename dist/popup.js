"use strict";(()=>{var Vr="https://rofit.site",Et="https://github.com/zeniyaxe/rofit",Wr=Et+"/issues",$r="https://www.roblox.com/games/6513295364/hi#!/store",Ot="#!/rofit",jr="https://www.roblox.com/my/account"+Ot;var y,Jr,qt,O,Xr,ee,Qr,J,G,Yr,Ce,we,ye,et,re={},te=[],Ht=/^m(i|n|o|s|text|space)$/,_e=Array.isArray,rt=te.slice,I=Object.assign;function ae(r){r&&r.parentNode&&r.remove()}function Q(r,e,t,a,o){var s={type:r,props:e,key:t,ref:a,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:o||++Jr,__i:-1,__u:0};return!o&&y.vnode&&y.vnode(s),s}function B(r){return r.children}function Y(r,e){this.props=r,this.context=e,this.__g=0}function q(r,e){if(e==null)return r.__?q(r.__,r.__i+1):null;for(var t;e<r.__k.length;e++)if((t=r.__k[e])&&t.__e)return t.__e;return typeof r.type!="function"||r.props.__P?null:q(r)}function tt(r){if((r=r.__)&&r.__c&&!r.props.__P)return r.__e=null,r.__k.some(function(e){return e&&(r.__e=e.__e)}),tt(r)}function ke(r){(8&r.__g||!(r.__g|=8)||!O.push(r)||ee++)&&Xr==y.debounceRendering||((Xr=y.debounceRendering)||queueMicrotask)(Ut)}function Ut(){var r,e,t,a,o,s,l,f,p;try{for(e=1;O.length;)O.length>e&&O.sort(Qr),r=O.shift(),e=O.length,8&r.__g&&(a=void 0,o=void 0,s=(o=(t=r).__v).__e,l=[],f=[],(p=t.__P)&&((a=I({constructor:void 0},o)).__v=o.__v+1,y.vnode&&y.vnode(a),Se(p,a,o,t.__n,p.namespaceURI,32&o.__u?[s]:null,l,s||q(o),32&o.__u,f),a.__v=o.__v,a.__.__k[a.__i]=a,ft(l,a,f),o.__=o.__e=null,a.__e!=s&&tt(a)))}finally{O.length=ee=0}}function at(r,e,t,a,o,s,l,f,p,u,i){var w,g,m,h,n,A,C=a.__k||te,D=e.length;for(p=It(t,e,C,p,D),w=0;w<D;w++)(m=t.__k[w])!=null&&(g=~m.__i&&C[m.__i]||re,m.__i=w,A=Se(r,m,g,o,s,l,f,p,u,i),h=m.__e,m.ref&&(g.ref!=m.ref||8&g.__u)&&(g.ref!=m.ref&&g.ref&&Me(g.ref,null,m),i.push(m.ref,m.__c||h,m)),n=n||h,4&m.__u?(p=ot(m,p,r,!g.__v),g.__e&&(g.__e=null)):typeof m.type=="function"&&A!==void 0?p=A:h&&(p=h.nextSibling),m.__u&=-7);return t.__e=n,p}function It(r,e,t,a,o){var s,l,f,p,u,i,w,g,m,h,n=t.length,A=n,C=0,D=!1,b=r.__k=Array(o);for(s=0;s<o;s++)(l=e[s])!=null&&typeof l!="boolean"&&typeof l!="function"?(typeof l!="object"||l.constructor==String?l=b[s]=Q(null,l):_e(l)?l=b[s]=Q(B,{children:l}):l.constructor===void 0&&l.__b?l=b[s]=Q(l.type,l.props,l.key,l.ref,l.__v):b[s]=l,p=s+C,l.__=r,l.__b=r.__b+1,f=null,~(u=l.__i=Nt(l,t,p,A))&&(A--,(f=t[u])&&(f.__u|=2)),f&&f.__v?(l.__u|=2,u==p-1?C--:u==p+1?C++:u!=p&&(u>p?C--:C++,D=!0)):(~u||(o>n?C--:o<n&&C++),typeof l.type!="function"&&(l.__u|=4))):b[s]=null;if(D){for(i=[],w=[],s=0;s<o;s++)if((l=b[s])&&2&l.__u){for(g=0,m=i.length;g<m;)i[h=g+m>>1]<l.__i?g=h+1:m=h;i[g]=l.__i,w[s]=g+1}for(C=i.length;s--;)w[s]&&(w[s]==C?C--:b[s].__u|=4)}if(A)for(s=0;s<n;s++)!(f=t[s])||2&f.__u||(f.__e==a&&(a=q(f)),Ae(f,f));return a}function ot(r,e,t,a){var o,s;if(typeof r.type=="function"){if(r.props.__P)return e;if(o=r.__k)for(s=0;s<o.length;s++)o[s]&&(o[s].__=r,e=ot(o[s],e,t,!1));return e}for(e&&!e.parentNode&&(e=q(r))&&!e.parentNode&&(e=null),r.__e!=e&&(!a&&t.moveBefore&&r.__e.parentNode?t.moveBefore(r.__e,e):t.insertBefore(r.__e,e||null)),e=r.__e;(e=e&&e.nextSibling)&&e.nodeType==8;);return e}function Nt(r,e,t,a){var o,s,l,f=r.key,p=r.type,u=e[t],i=u&&!(2&u.__u);if(u===null&&f==null||i&&f==u.key&&p==u.type)return t;if(a>(i?1:0)){for(o=t-1,s=t+1;o>=0||s<e.length;)if((u=e[l=o>=0?o--:s++])&&!(2&u.__u)&&f==u.key&&p==u.type)return l}return-1}function Kr(r,e,t){t==null&&(t=""),e[0]=="-"?r.setProperty(e,t):r[e]=t}function Z(r,e,t,a,o){var s;e:if(e=="style")if(typeof t=="string")r.style.cssText=t;else{if(typeof a=="string"&&(r.style.cssText=a=""),a)for(e in a)t&&e in t||Kr(r.style,e,"");if(t)for(e in t)a&&t[e]==a[e]||Kr(r.style,e,t[e])}else if(e[0]=="o"&&e[1]=="n")s=e!=(e=e.replace(Yr,"$1")),(e=e.slice(2))[0]<"a"&&(e=e.toLowerCase()),(r.__e||(r.__e={}))[e+s]=t,t?a?t[G]=a[G]:(t[G]=Ce,r.addEventListener(e,s?ye:we,s)):r.removeEventListener(e,s?ye:we,s);else{if(o=="http://www.w3.org/2000/svg")e=e.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(e!="width"&&e!="height"&&e!="href"&&e!="list"&&e!="form"&&e!="tabIndex"&&e!="download"&&e!="rowSpan"&&e!="colSpan"&&e!="role"&&e!="popover"&&e in r)try{r[e]=t??"";break e}catch{}typeof t=="function"||(t==null||t===!1&&e[4]!="-"?r.removeAttribute(e):r.setAttribute(e,e=="popover"&&t==1?"":t))}}function Zr(r){return function(e){if(this.__e){var t=this.__e[e.type+r];if(e[J]==null)e[J]=Ce++;else if(e[J]<t[G])return;return t(y.event?y.event(e):e)}}}function Se(r,e,t,a,o,s,l,f,p,u){var i,w,g,m,h,n,A,C,D,b,k,_,R,P,K,H,U,N,c,v,S=e.type;if(e.constructor!==void 0)return null;if(128&t.__u&&(p=32&t.__u,i=t.__c.__z)){if(e.__u|=p,w=s=[],i.nodeType==8)for(g=1,m=i.nextSibling;m;m=m.nextSibling){if(m.nodeType==8){if(m.data.startsWith("$s"))g++;else if(m.data.startsWith("/$s")&&!--g)break}s.push(m)}else s.push(i);f=s[0]}(i=y.__b)&&i(e);e:if(typeof S=="function"){h=l.length;try{if(b=e.props,k=(i=S.prototype)&&i.render,_=(i=S.contextType)&&a[i.__c],R=i?_?_.props.value:i.__:a,t.__c?2&(n=e.__c=t.__c).__g&&(n.__g|=1):(k?e.__c=n=new S(b,R):(e.__c=n=new Y(b,R),n.constructor=S,n.render=Vt),_&&_.sub(n),n.state||(n.state={}),n.__n=a,n.__g|=8,n.__h=[],n.__k=[]),k&&(n.__s||(n.__s=n.state),S.getDerivedStateFromProps&&(n.__s==n.state&&(n.__s=I({},n.__s)),I(n.__s,S.getDerivedStateFromProps(b,n.__s)))),A=n.props,C=n.state,n.__v=e,t.__c){if(k&&!S.getDerivedStateFromProps&&b!==A&&n.componentWillReceiveProps&&n.componentWillReceiveProps(b,R),e.__v==t.__v&&!(8&n.__g)||!(4&n.__g)&&n.shouldComponentUpdate&&n.shouldComponentUpdate(b,n.__s,R)===!1){e.__v!=t.__v&&(n.props=b,n.state=n.__s,n.__g&=-9),e.__e=t.__e,e.__k=t.__k,e.__k.some(function(x){x&&(x.__=e)}),te.push.apply(n.__h,n.__k),n.__k=[],n.__h.length&&l.push(n),f=q(t);break e}n.componentWillUpdate&&n.componentWillUpdate(b,n.__s,R),k&&n.componentDidUpdate&&n.__h.push(function(){n.componentDidUpdate(A,C,D)})}else k&&!S.getDerivedStateFromProps&&n.componentWillMount&&n.componentWillMount(),k&&n.componentDidMount&&n.__h.push(n.componentDidMount);if(n.context=R,n.props=b,n.__P=r,n.__g&=-5,P=y.__r,K=0,k)n.state=n.__s,n.__g&=-9,P&&P(e),i=n.render(n.props,n.state,n.context),te.push.apply(n.__h,n.__k),n.__k=[];else do n.__g&=-9,P&&P(e),i=n.render(n.props,n.state,n.context),n.state=n.__s;while(8&n.__g&&++K<25);n.state=n.__s,n.getChildContext&&(a=I({},a,n.getChildContext())),k&&t.__c&&n.getSnapshotBeforeUpdate&&(D=n.getSnapshotBeforeUpdate(A,C)),H=i&&i.type===B&&i.key==null?i.props.children:i,b.__P&&(i=f,o=(r=b.__P).namespaceURI,p=s=null,t.props&&t.props.__P!=r&&(t.__k.some(function(x){x&&Ae(x,x)}),t.__k=null),f=t.__k?q(t,0):null),f=at(r,_e(H)?H:[H],e,t,a,o,s,l,f,p,u),b.__P&&(e.__e=null,f=i),e.__u&=-161,128&t.__u&&(n.__z=null),w&&w.some(ae),n.__h.length&&l.push(n),1&n.__g&&(n.__g&=-4)}catch(x){if(l.length=h,e.__v=null,p||s)if(x.then){if(U=0,e.__u|=p?160:128,s){for(c=0;c<s.length;c++)if(v=s[c])if(v.nodeType==8){if(s[c]=null,v.data.startsWith("$s"))U++||(N=v);else if(v.data.startsWith("/$s")&&!--U){f=v;break}}else U&&(s[c]=null)}if(!N){for(;f&&f.nodeType==8&&f.nextSibling;)f=f.nextSibling;s&&(s[s.indexOf(f)]=null),N=f}e.__c.__z||(e.__c.__z=N),e.__e=f}else s&&s.some(ae);else e.__e=t.__e;e.__k||(e.__k=t.__k||[]),x.then||st(e),y.__e(x,e,t)}}else f=e.__e=Gt(t.__e,e,t,a,o,s,l,p,u,r);return(i=y.diffed)&&i(e),128&e.__u?void 0:f}function st(r){r&&(r.__c&&(r.__c.__g|=4),r.__k&&r.__k.some(st))}function ft(r,e,t){for(var a=0;a<t.length;)Me(t[a++],t[a++],t[a++]);y.__c&&y.__c(e,r),r.some(function(o){try{r=o.__h,o.__h=[],r.some(function(s){s.call(o)})}catch(s){y.__e(s,o.__v)}})}function Gt(r,e,t,a,o,s,l,f,p,u){var i,w,g,m,h,n,A,C,D,b=t.props||re,k=e.props,_=e.type;if(_=="svg"?o="http://www.w3.org/2000/svg":_=="math"?o="http://www.w3.org/1998/Math/MathML":o||(o="http://www.w3.org/1999/xhtml"),s){for(i=0;i<s.length;i++)if((h=s[i])&&(_?h.localName==_:h.nodeType==3)){r=h,s[i]=null;break}}if(!r){if(C=u.ownerDocument||document,!_)return C.createTextNode(k);r=C.createElementNS(o,_,k.is&&k),f&&(y.__m&&y.__m(e,s),f=!1),s=null}if(_){if(u=_=="template"?r.content:r,s=_=="textarea"&&k.defaultValue!=null?null:s&&rt.call(u.childNodes),!f&&s)for(b={},i=0;i<r.attributes.length;i++)b[(h=r.attributes[i]).name]=h.value;for(i in b)h=b[i],i=="dangerouslySetInnerHTML"?g=h:i=="children"||i in k||i=="value"&&"defaultValue"in k||i=="checked"&&"defaultChecked"in k||Z(r,i,null,h,o);for(i in D=1&t.__u,k)h=k[i],i=="children"?m=h:i=="dangerouslySetInnerHTML"?w=h:i=="value"?n=h:i=="checked"?A=h:f&&typeof h!="function"||!(b[i]!==h||D&&h!=null)||Z(r,i,h,b[i],o);w?(f||g&&(w.__html==g.__html||w.__html==r.innerHTML)||(r.innerHTML=w.__html),e.__k=[]):(g&&(r.textContent=""),(_=="foreignObject"||o=="http://www.w3.org/1998/Math/MathML"&&Ht.test(_))&&(o="http://www.w3.org/1999/xhtml"),at(u,_e(m)?m:[m],e,t,a,o,s,l,s?s[0]:t.__k&&q(t,0),f,p),s&&s.some(ae)),f&&_!="textarea"||(i="value",_=="progress"&&n==null?r.removeAttribute(i):n==null||n===r[i]&&(_!="progress"||n)||Z(r,i,n,b[i],o),i="checked",A!=null&&A!=r[i]&&Z(r,i,A,b[i],o))}else b===k||f&&r.data==k||(r.data=k);return r}function Me(r,e,t){try{typeof r=="function"?(typeof r.__u=="function"&&r.__u(),(typeof r.__u!="function"||e)&&(r.__u=r(e))):r.current=e}catch(a){y.__e(a,t)}}function Ae(r,e,t){var a,o;if(y.unmount&&y.unmount(r),!(a=r.ref)||a.current&&a.current!=r.__e||Me(a,null,e),a=r.__c){if(a.componentWillUnmount)try{a.componentWillUnmount()}catch(s){y.__e(s,e)}a.__P=a.__n=null}if(a=r.__k)for(o=0;o<a.length;o++)a[o]&&Ae(a[o],e,typeof r.type!="function"||t&&!r.props.__P);(a=r.__e)&&(t||ae(a),a.__e&&(a.__e=null)),r.__e=r.__c=r.__=null}function Vt(r,e,t){return this.constructor(r,t)}function nt(r,e){var t,a,o,s;y.__&&y.__(r,e),e.nodeType==9&&(e=e.documentElement),a=(t=r&&32&r.__u)?null:e.__k,e.__k=Q(B,{children:[r]}),o=[],s=[],Se(e,e.__k,a||re,re,e.namespaceURI,a?null:e.firstChild?rt.call(e.childNodes):null,o,a?a.__e:e.firstChild,t,s),ft(o,e.__k,s),e.__k.props.children=null}function lt(r){function e(t){var a,o;return this.getChildContext||(a=new Set,(o={})[e.__c]=this,this.getChildContext=function(){return o},this.shouldComponentUpdate=function(s){this.props.value!=s.value&&a.forEach(function(l){l.__g|=4,ke(l)})},this.sub=function(s){a.add(s);var l=s.componentWillUnmount;s.componentWillUnmount=function(){a.delete(s),l&&l.call(s)}}),t.children}return e.__c="__cC"+et++,e.__=r,e.Provider=(e.Consumer=function(t,a){return t.children(a)}).contextType=e,e}y={__e:function(r,e,t,a){for(var o,s,l;e=e.__;)if((o=e.__c)&&!(1&o.__g)){o.__g|=4;try{if((s=o.constructor)&&s.getDerivedStateFromError&&(o.setState(s.getDerivedStateFromError(r)),l=8&o.__g),o.componentDidCatch&&(o.componentDidCatch(r,a||{}),l=8&o.__g),l)return void(o.__g|=2)}catch(f){r=f,l=0}}throw ee=0,r}},Jr=0,qt=function(r){return r!=null&&r.constructor===void 0},Y.prototype.setState=function(r,e){var t=this.__s;t&&t!=this.state||(t=this.__s=I({},this.state)),typeof r=="function"&&(r=r(I({},t),this.props)),r&&(I(t,r),this.__v&&(e&&this.__k.push(e),ke(this)))},Y.prototype.forceUpdate=function(r){this.__v&&(this.__g|=4,r&&this.__h.push(r),ke(this))},Y.prototype.render=B,O=[],ee=0,Qr=function(r,e){return r.__v.__b-e.__v.__b},J=Symbol(),G=Symbol(),Yr=/(PointerCapture)$|Capture$/i,Ce=0,we=Zr(!1),ye=Zr(!0),et=0;var W,L,Le,it,Pe=Object.is,oe=0,bt=[],Re=[],M=y,pt=M.__b,dt=M.__r,ut=M.diffed,ct=M.__c,mt=M.unmount,xt=M.__;function De(r,e){M.__h&&M.__h(L,r,oe||e),oe=0;var t=L.__H||(L.__H={__:[],__h:[]});return r>=t.__.length&&t.__.push({}),t.__[r]}function F(r){return oe=1,Wt(wt,r)}function Wt(r,e,t){var a=De(W++,2);if(a.t=r,!a.__c&&(a.__=[t?t(e):wt(void 0,e),function(s){var l=a.__N?a.__N[0]:a.__[0],f=a.t(l,s);Pe(l,f)||(a.__N=[f,a.__[1]],a.__c.setState({}))}],a.__c=L,!L.__f)){L.__f=!0;var o=L.shouldComponentUpdate;L.shouldComponentUpdate=function(s,l,f){var p=this.__H;if(!p)return!0;var u=!1,i=this.props!=s;if(p.__.some(function(g){g.__N&&(u=!0,Pe(g.__[0],g.__N[0])||(i=!0))}),o){var w=o.call(this,s,l,f);return u?w||i:w}return!u||i}}return a.__}function z(r,e){var t=De(W++,3);!M.__s&&vt(t.__H,e)&&(t.__P=!0,t.__=r,t.u=e,L.__H.__h.push(t))}function $(r){return oe=5,Fe(function(){return{current:r}},[])}function Fe(r,e){var t=De(W++,7);return vt(t.__H,e)&&(t.__=r(),t.__H=e),t.__}function $t(){var r;do{for(;r=Re.shift();)try{V(r)}catch(t){M.__e(t,{__:(r=r.__P)&&r.__v})}for(;r=bt.shift();){var e=r.__H;if(r.__P&&e)try{e.__h.some(V),e.__h.some(Te),e.__h=[]}catch(t){e.__h=[],M.__e(t,r.__v)}}}while(Re.length)}M.__b=function(r){L=null,pt&&pt(r)},M.__=function(r,e){r&&e.__k&&e.__k.__m&&(r.__m=e.__k.__m),xt&&xt(r,e)},M.__r=function(r){dt&&dt(r),W=0;var e=(L=r.__c).__H;e&&(Le==L?L.__h=[]:(e.__h.some(V),e.__h.some(Te),W=0),e.__h=[],e.__.some(function(t){t.__N&&(t.__=t.__N),t.u=t.__N=void 0})),Le=L},M.diffed=function(r){ut&&ut(r);var e=r.__c;e&&e.__H&&(e.__H.__h.length&&ht(bt.push(e)),e.__H.__.some(function(t){t.u&&(t.__H=t.u)})),Le=L=null},M.__c=function(r,e){e.some(function(t){try{t.__h.some(V),t.__h=t.__h.filter(function(a){return!a.__||Te(a)})}catch(a){e.some(function(o){o.__h&&(o.__h=[])}),e=[],M.__e(a,t.__v)}}),ct&&ct(r,e)},M.unmount=function(r){mt&&mt(r);var e,t,a=r.__c;a&&a.__H&&(a.__H.__.some(function(o){try{if(o.__P&&o.__c){if(t===void 0){for(t=r.__;t&&(!t.__c||!t.__c.__P);)t=t.__;t=t&&t.__c}o.__P=t,ht(Re.push(o))}else V(o)}catch(s){e=s}}),a.__H=void 0,e&&M.__e(e,a.__v))};var gt=typeof requestAnimationFrame=="function";function jt(r){var e,t=function(){clearTimeout(a),gt&&cancelAnimationFrame(e),setTimeout(r)},a=setTimeout(t,35);gt&&(e=requestAnimationFrame(t))}function ht(r){r!=1&&it==M.requestAnimationFrame||((it=M.requestAnimationFrame)||jt)($t)}function V(r){var e=L,t=r.__c;typeof t=="function"&&(r.__c=void 0,t()),L=e}function Te(r){var e=L;r.__c=r.__(),L=e}function vt(r,e){return!r||r.length!=e.length||e.some(function(t,a){return!Pe(t,r[a])})}function wt(r,e){return typeof e=="function"?e(r):e}var yt=`/* RoFit \u2014 one stylesheet for the on-profile sheet, the library/settings page and the popup.\r
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
.demo { position: relative; width: min(500px, 100%); border-radius: 16px; background: var(--rf-bg); border: 1px solid var(--rf-line); box-shadow: 0 30px 70px rgb(0 0 0 / .16); overflow: hidden; transform: rotate(-1.4deg); animation: rf-rise .8s var(--rf-ease) .3s backwards; transition: opacity .5s; }
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
.d-grid { flex: 1; display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; align-content: start; transition: padding .5s var(--rf-ease); }
.tile { opacity: 0; transform: translateY(12px) scale(.94); transition: opacity .4s, transform .6s var(--rf-spring); transition-delay: 0s; }
.a3 .tile { opacity: 1; transform: none; transition-delay: calc(var(--i, 0) * 70ms); }
.tile > span { display: flex; align-items: center; justify-content: center; aspect-ratio: 1; border-radius: 10px; background: var(--rf-surface); color: var(--rf-muted); transition: background .3s, box-shadow .3s, color .3s; }
.tile > b { display: block; height: 7px; width: 70%; border-radius: 4px; background: var(--rf-surface-2); margin-top: 7px; }
.a4 .tile.t1 > span { background: var(--rf-accent-soft); color: var(--rf-accent); box-shadow: inset 0 0 0 2px var(--rf-accent); }
.d-insp { position: absolute; top: 14px; right: 14px; bottom: 14px; width: 44%; border-radius: 12px; background: var(--rf-surface); padding: 12px; opacity: 0; transform: translateX(30px); transition: opacity .35s, transform .6s var(--rf-ease); }
.a4 .d-insp { opacity: 1; transform: none; }
.a4 .d-grid { padding-right: 46%; }
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
`;async function E(r,e){let t;try{t=await chrome.runtime.sendMessage({__rofit:!0,type:r,req:e})}catch{throw{kind:"network",message:"RoFit\u2019s background worker did not answer. Reload the page and try again."}}if(!t)throw{kind:"network",message:"RoFit\u2019s background worker did not answer. Reload the page and try again."};if(!t.ok)throw t.error;return t.data}var Kt=/[\u0300-\u036f]/g;function Be(r){return r.normalize("NFKD").replace(Kt,"").toLowerCase().replace(/[^\p{L}\p{N}]+/gu," ").trim()}function Zt(r){let e={raw:r,terms:[],phrases:[],ids:[],not:[]},t=/(-?)"([^"]*)"|(\S+)/g,a;for(;a=t.exec(r);){if(a[2]!==void 0){let p=Be(a[2]);if(!p)continue;(a[1]?e.not:e.phrases).push(p);continue}let o=a[3],s=o.startsWith("-")&&o.length>1;s&&(o=o.slice(1));let l=/^#(\d{1,20})$/.exec(o);if(l&&!s){e.ids.push(Number(l[1]));continue}let f=Be(o);if(f){if(s){e.not.push(f);continue}for(let p of f.split(" "))e.terms.push(p),/^\d{3,20}$/.test(p)&&e.ids.push(Number(p))}}return e}var Jt=r=>!r.terms.length&&!r.phrases.length&&!r.ids.length&&!r.not.length;function Qt(r,e){if(r===e)return!0;let t=r.length,a=e.length;if(Math.abs(t-a)>1)return!1;let o=0;for(;o<t&&o<a&&r[o]===e[o];)o++;return t===a?r.slice(o+1)===e.slice(o+1)?!0:r[o]===e[o+1]&&r[o+1]===e[o]&&r.slice(o+2)===e.slice(o+2):t>a?r.slice(o+1)===e.slice(o):r.slice(o)===e.slice(o+1)}function Yt(r,e){if(!r||!e)return 0;if(e===r)return 100;let t=o=>o+r.length===e.length||e[o+r.length]===" ";if(e.startsWith(r))return(t(0)?92:84)-Math.min(6,(e.length-r.length)/6);let a=e.indexOf(" "+r);if(a>=0)return a++,(t(a)?78:70)-Math.min(6,a/8);if(a=e.indexOf(r),a>0)return 52-Math.min(6,a/8);if(r.length>=3){let o=0,s=-1,l=-1;for(let f=0;f<e.length&&o<r.length;f++)e[f]===r[o]&&(s<0&&(s=f),o++,l=f);if(o===r.length){let f=l-s+1;if(f<=r.length*2+2)return 34-Math.min(14,f-r.length)}}if(r.length>=5){for(let o of e.split(" "))if(o.length>=4&&Qt(r,o))return 24}return 0}function ea(r,e,t){let a=t??e.map(f=>Be(f.text));for(let f of r.not)if(a.some(p=>p.includes(f)))return null;let o=0,s={s:0},l=f=>e.findIndex(p=>p.id===f);for(let f of r.phrases){let p=a.findIndex(i=>i.includes(f));if(p<0)return null;let u=90*(e[p].weight??1);o+=u,u>s.s&&(s={s:u,f:e[p]})}for(let f of r.terms){let p=0,u;for(let i=0;i<e.length;i++){let w=Yt(f,a[i])*(e[i].weight??1);w>p&&(p=w,u=e[i])}if(/^\d{3,20}$/.test(f)){let i=l(Number(f));i>=0&&120>p&&(p=120,u=e[i])}if(!p)return null;o+=p,p>s.s&&(s={s:p,f:u})}for(let f of r.ids){if(r.terms.includes(String(f)))continue;let p=l(f);if(p<0)return null;o+=120,120>s.s&&(s={s:120,f:e[p]})}return{score:o,field:s.f}}function ze(r,e,t){let a=typeof e=="string"?Zt(e):e;if(Jt(a))return r.map(s=>({item:s,match:{score:0}}));let o=[];return r.forEach((s,l)=>{let f=ea(a,t(s));f&&o.push({item:s,match:f,i:l})}),o.sort((s,l)=>l.match.score-s.match.score||s.i-l.i),o}var kt=[["path",{d:"M12 10.5V9.5a2.5 2.5 0 1 0-2.5-2.5"}],["path",{d:"M12 10.5 3 17a1.3 1.3 0 0 0 .8 2.4h16.4A1.3 1.3 0 0 0 21 17l-9-6.5Z"}]];var Ee=[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]];var Oe=[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]];var qe=[["path",{d:"m21 16-4 4-4-4"}],["path",{d:"M17 20V4"}],["path",{d:"m3 8 4-4 4 4"}],["path",{d:"M7 4v16"}]];var He=[["path",{d:"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"}],["path",{d:"m9 10 2 2 4-4"}]];var Ue=[["path",{d:"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"}]];var Ie=[["path",{d:"M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"}],["path",{d:"m7 16.5-4.74-2.85"}],["path",{d:"m7 16.5 5-3"}],["path",{d:"M7 16.5v5.17"}],["path",{d:"M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"}],["path",{d:"m17 16.5-5-3"}],["path",{d:"m17 16.5 4.74-2.85"}],["path",{d:"M17 16.5v5.17"}],["path",{d:"M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"}],["path",{d:"M12 8 7.26 5.15"}],["path",{d:"m12 8 4.74-2.85"}],["path",{d:"M12 13.5V8"}]];var Ne=[["path",{d:"M18 6 7 17l-5-5"}],["path",{d:"m22 10-7.5 7.5L13 16"}]];var Ge=[["path",{d:"M20 6 9 17l-5-5"}]];var Ve=[["path",{d:"m6 9 6 6 6-6"}]];var We=[["path",{d:"m9 18 6-6-6-6"}]];var se=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m16 9-5.5 5.5L8 12"}]];var $e=[["path",{d:"M10.1 2.182a10 10 0 0 1 3.8 0"}],["path",{d:"M13.9 21.818a10 10 0 0 1-3.8 0"}],["path",{d:"M17.609 3.721a10 10 0 0 1 2.69 2.7"}],["path",{d:"M2.182 13.9a10 10 0 0 1 0-3.8"}],["path",{d:"M20.279 17.609a10 10 0 0 1-2.7 2.69"}],["path",{d:"M21.818 10.1a10 10 0 0 1 0 3.8"}],["path",{d:"M3.721 6.391a10 10 0 0 1 2.7-2.69"}],["path",{d:"M6.391 20.279a10 10 0 0 1-2.69-2.7"}]];var je=[["path",{d:"M11 14h10"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v1.344"}],["path",{d:"m17 18 4-4-4-4"}],["path",{d:"M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113"}],["rect",{x:"8",y:"2",width:"8",height:"4",rx:"1"}]];var Xe=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 6v6l4 2"}]];var Ke=[["path",{d:"M13.744 17.736a6 6 0 1 1-7.48-7.48"}],["path",{d:"M15 6h1v4"}],["path",{d:"m6.134 14.768.866-.5 2 3.464"}],["circle",{cx:"16",cy:"8",r:"6"}]];var Ze=[["path",{d:"M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"}]];var Je=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]];var Qe=[["path",{d:"M20 4v7a4 4 0 0 1-4 4H4"}],["path",{d:"m9 10-5 5 5 5"}]];var Ye=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];var fe=[["circle",{cx:"12",cy:"12",r:"1"}],["circle",{cx:"19",cy:"12",r:"1"}],["circle",{cx:"5",cy:"12",r:"1"}]];var er=[["path",{d:"M15 3h6v6"}],["path",{d:"M10 14 21 3"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}]];var rr=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"}],["path",{d:"m2 2 20 20"}]];var tr=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{cx:"12",cy:"12",r:"3"}]];var ne=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{d:"M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"}],["path",{d:"M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"}]];var le=[["path",{d:"M4 12.15V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3.35"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{d:"m5 16-3 3 3 3"}],["path",{d:"m9 22 3-3-3-3"}]];var ar=[["path",{d:"M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1"}],["path",{d:"M2 13h10"}],["path",{d:"m9 16 3-3-3-3"}]];var ie=[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"}]];var or=[["path",{d:"m12 14 4-4"}],["path",{d:"M3.34 19a10 10 0 1 1 17.32 0"}]];var sr=[["circle",{cx:"5",cy:"6",r:"3"}],["path",{d:"M12 6h5a2 2 0 0 1 2 2v7"}],["path",{d:"m15 9-3-3 3-3"}],["circle",{cx:"19",cy:"18",r:"3"}],["path",{d:"M12 18H7a2 2 0 0 1-2-2V9"}],["path",{d:"m9 15 3 3-3 3"}]];var fr=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}],["path",{d:"M2 12h20"}]];var nr=[["line",{x1:"4",x2:"20",y1:"9",y2:"9"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21"}]];var lr=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]];var ir=[["path",{d:"M10 8h.01"}],["path",{d:"M12 12h.01"}],["path",{d:"M14 8h.01"}],["path",{d:"M16 12h.01"}],["path",{d:"M18 8h.01"}],["path",{d:"M6 8h.01"}],["path",{d:"M7 16h10"}],["path",{d:"M8 12h.01"}],["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2"}]];var pe=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"}]];var pr=[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1"}]];var dr=[["path",{d:"m16 6 4 14"}],["path",{d:"M12 6v14"}],["path",{d:"M8 8v12"}],["path",{d:"M4 4v16"}]];var ur=[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"}]];var cr=[["path",{d:"M13 5h8"}],["path",{d:"M13 12h8"}],["path",{d:"M13 19h8"}],["path",{d:"m3 17 2 2 4-4"}],["path",{d:"m3 7 2 2 4-4"}]];var mr=[["path",{d:"M3 5h.01"}],["path",{d:"M3 12h.01"}],["path",{d:"M3 19h.01"}],["path",{d:"M8 5h13"}],["path",{d:"M8 12h13"}],["path",{d:"M8 19h13"}]];var xr=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4"}]];var gr=[["path",{d:"M5 12h14"}]];var hr=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21"}]];var br=[["path",{d:"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"}],["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor"}]];var vr=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{d:"m15 5 4 4"}]];var wr=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];var yr=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];var kr=[["path",{d:"m2 9 3-3 3 3"}],["path",{d:"M13 18H7a2 2 0 0 1-2-2V6"}],["path",{d:"m22 15-3 3-3-3"}],["path",{d:"M11 6h6a2 2 0 0 1 2 2v10"}]];var de=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}],["path",{d:"M12 7v5l4 2"}]];var Cr=[["path",{d:"M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"}],["path",{d:"m14.5 12.5 2-2"}],["path",{d:"m11.5 9.5 2-2"}],["path",{d:"m8.5 6.5 2-2"}],["path",{d:"m17.5 15.5 2-2"}]];var _r=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];var Sr=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{cx:"12",cy:"12",r:"3"}]];var Mr=[["circle",{cx:"18",cy:"5",r:"3"}],["circle",{cx:"6",cy:"12",r:"3"}],["circle",{cx:"18",cy:"19",r:"3"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49"}]];var Ar=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"m9 12 2 2 4-4"}]];var Lr=[["path",{d:"M16 10a4 4 0 0 1-8 0"}],["path",{d:"M3.103 6.034h17.794"}],["path",{d:"M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"}]];var Pr=[["path",{d:"M10 5H3"}],["path",{d:"M12 19H3"}],["path",{d:"M14 3v4"}],["path",{d:"M16 17v4"}],["path",{d:"M21 12h-9"}],["path",{d:"M21 19h-5"}],["path",{d:"M21 5h-7"}],["path",{d:"M8 10v4"}],["path",{d:"M8 12H3"}]];var Rr=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"}]];var Tr=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"}]];var Dr=[["path",{d:"M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"}],["path",{d:"M15 3v5a1 1 0 0 0 1 1h5"}]];var Fr=[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor"}]];var ue=[["path",{d:"M10 11v6"}],["path",{d:"M14 11v6"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{d:"M3 6h18"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}]];var ce=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]];var Br=[["path",{d:"M12 3v12"}],["path",{d:"m17 8-5-5-5 5"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}]];var zr=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{cx:"12",cy:"7",r:"4"}]];var Er=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}],["circle",{cx:"9",cy:"7",r:"4"}]];var Or=[["path",{d:"M12 20h.01"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0"}],["path",{d:"M5 12.859a10 10 0 0 1 5.17-2.69"}],["path",{d:"M19 12.859a10 10 0 0 0-2.007-1.523"}],["path",{d:"M2 8.82a15 15 0 0 1 4.177-2.643"}],["path",{d:"M22 8.82a15 15 0 0 0-11.288-3.764"}],["path",{d:"m2 2 20 20"}]];var qr=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];var ra=0;function d(r,e,t,a,o,s){e||(e={});var l,f,p=e;if("ref"in p&&typeof r!="function")for(f in p={},e)f=="ref"?l=e[f]:p[f]=e[f];var u={type:r,props:p,key:t,ref:l,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--ra,__i:-1,__u:0};return(o||s)&&(u.__source=o,u.__self=s),y.vnode&&y.vnode(u),u}function ta({node:r,size:e=18,class:t,label:a}){return d("svg",{class:"rf-ico "+(t??""),width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":a?void 0:"true",role:a?"img":void 0,"aria-label":a,children:r.map(([o,s],l)=>d(o,{...s},l))})}var aa={search:_r,close:qr,back:Ee,settings:Sr,check:Ge,copy:Je,external:er,save:Ue,saved:He,compare:sr,more:fe,grid:pr,list:mr,refresh:yr,down:Ve,right:We,outfit:kt,library:dr,download:Ye,upload:Br,trash:ue,filter:ie,history:de,warn:ce,info:lr,link:ur,code:le,json:ne,layers:pe,scale:Cr,palette:br,tag:Fr,note:Dr,lock:xr,user:zr,ok:se,dashed:$e,sort:qe,eye:tr,eyeOff:rr,minus:gr,plus:wr,repeat:kr,tasks:cr,spark:Rr,boxes:Ie,hash:nr,bag:Lr,clock:Xe,star:Tr,command:Ze,share:Mr,keyboard:ir,move:ar,edit:vr,globe:fr,shield:Ar,selectAll:Ne,sliders:Pr,arrow:Oe,users:Er,enter:Qe,offline:Or,paste:je,coins:Ke,gauge:or,monitor:hr},T=({n:r,size:e,class:t,label:a})=>d(ta,{node:aa[r],size:e,class:t,label:a});var xe={v:2,appearance:"auto",motion:"system",density:"comfortable",layout:"grid",showPrices:!0,technical:!1,showPresets:!1,profileTab:!0,profileButton:!0,keepHistory:!0,historyLimit:20,cacheMinutes:10,onboarded:!1,autoIndex:!1,indexPrices:!0,checkAccess:!0},me="settings";function Ct(r){let e=r&&typeof r=="object"?r:{},t={...xe,...e};return(!e.v||e.v<2)&&(e.motion==="reduced"?t.motion="calm":(e.motion==="full"||e.motion===void 0)&&(t.motion="system")),["system","full","balanced","calm"].includes(t.motion)||(t.motion="system"),t.v=2,t}async function _t(){try{let r=await chrome.storage.local.get(me);return Ct(r[me])}catch{return{...xe}}}function St(r){let e=(t,a)=>{a==="local"&&t[me]&&r(Ct(t[me].newValue))};return chrome.storage.onChanged.addListener(e),()=>chrome.storage.onChanged.removeListener(e)}function Mt(r,e){return r==="full"||r==="balanced"||r==="calm"?r:e?"calm":"full"}var At=r=>r==="calm"?" rm":r==="balanced"?" mb":"";function Lt(){let[r,e]=F(xe);return z(()=>(_t().then(e),St(e)),[]),r}var Hr=class{map=new Map;queue=new Map;listeners=new Set;timer=0;get(e,t="150x150"){return this.map.get(`${e}:${t}`)}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}request(e,t="150x150"){let a=`${e}:${t}`;this.map.get(a)?.url||this.queue.has(a)||(this.queue.set(a,{id:e,size:t,tries:0}),this.timer||(this.timer=window.setTimeout(()=>this.flush(),50)))}emit(){this.listeners.forEach(e=>e())}async flush(){this.timer=0;let e=[...this.queue.values()];this.queue.clear();for(let t of["150x150","420x420"]){let a=e.filter(o=>o.size===t).map(o=>o.id);for(let o=0;o<a.length;o+=50){let s=a.slice(o,o+50);try{let l=await E("outfits.thumbs",{ids:s,size:t});for(let f of s){let p=l[f]??{state:"Error",url:null};this.map.set(`${f}:${t}`,p);let u=e.find(i=>i.id===f&&i.size===t);p.state==="Pending"&&u.tries<6&&(this.queue.set(`${f}:${t}`,{id:f,size:t,tries:u.tries+1}),this.timer||(this.timer=window.setTimeout(()=>this.flush(),2500)))}}catch(l){for(let f of s)this.map.set(`${f}:${t}`,{state:l.kind==="rate-limited"?"RateLimited":"Error",url:null})}this.emit()}}}},sf=new Hr;function j(r,e){let[t,a]=F({loading:!0}),[o,s]=F(0);return z(()=>{let l=!1;return a(f=>({data:f.data,loading:!0})),r().then(f=>!l&&a({data:f,loading:!1}),f=>!l&&a({error:f,loading:!1})),()=>{l=!0}},[...e,o]),{...t,reload:()=>s(l=>l+1)}}function sa(){let[r,e]=F(()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches);return z(()=>{let t=window.matchMedia("(prefers-reduced-motion: reduce)"),a=()=>e(t.matches);return t.addEventListener("change",a),()=>t.removeEventListener("change",a)},[]),r}function Pt(r){return Mt(r,sa())}var kf=lt(()=>{});function Ur({size:r=16}){return d("span",{class:"rf-spin",style:{width:r+"px",height:r+"px"},role:"progressbar","aria-label":"Loading"})}var ge={bg:"rgb(255, 255, 255)",fg:"rgb(32, 34, 39)",accent:"rgb(51, 95, 255)",accentFg:"#ffffff",tint:"rgb(27, 37, 75)"},Ir={bg:"rgb(18, 18, 21)",fg:"rgb(247, 247, 248)",accent:"rgb(51, 95, 255)",accentFg:"#ffffff",tint:"rgb(208, 217, 251)"},na={bg:"rgb(0, 0, 0)",fg:"rgb(247, 247, 248)",accent:"rgb(51, 95, 255)",accentFg:"#ffffff",tint:"rgb(208, 217, 251)"};function X(r){let e=r.match(/rgba?\(([^)]+)\)/);if(!e)return null;let t=e[1].split(/[ ,/]+/).filter(Boolean).map(Number);return[t[0],t[1],t[2],t[3]??1]}var Rt=([r,e,t])=>{let a=o=>(o/=255,o<=.03928?o/12.92:((o+.055)/1.055)**2.4);return .2126*a(r)+.7152*a(e)+.0722*a(t)};function la(){let r=w=>{for(let g=w;g;g=g.parentElement){let m=X(getComputedStyle(g).backgroundColor);if(m&&m[3]>.9)return m}return null},e=r(document.body)??r(document.documentElement);if(!e)return ge;let a=Rt(e)<.4?Ir:ge,o=X(getComputedStyle(document.body).color),s=a.accent,l=document.querySelector(".bg-action-emphasis, .btn-primary-md, .btn-growth-md"),f=l?X(getComputedStyle(l).backgroundColor):null;f&&f[3]>.9&&(s=`rgb(${f[0]}, ${f[1]}, ${f[2]})`);let p=document.querySelector(".bg-action-standard"),u=p?X(getComputedStyle(p).backgroundColor):null,i=u?`rgb(${u[0]}, ${u[1]}, ${u[2]})`:a.tint;return{bg:`rgb(${e[0]}, ${e[1]}, ${e[2]})`,fg:o?`rgb(${o[0]}, ${o[1]}, ${o[2]})`:a.fg,accent:s,accentFg:"#ffffff",tint:i}}function Tt(r,e){let t;r.appearance==="light"?t=ge:r.appearance==="dark"?t=Ir:r.appearance==="oled"?t=na:e?t=la():t=window.matchMedia("(prefers-color-scheme: dark)").matches?Ir:ge;let a=X(t.bg);return{...t,dark:a?Rt(a)<.4:!1}}function Dt(r){let[e,t,a,o]=r.dark?["11%","17%","23%","19%"]:["3.5%","7.5%","12%","13%"];return{"--rf-bg":r.bg,"--rf-fg":r.fg,"--rf-accent":r.accent,"--rf-accent-fg":r.accentFg,"--rf-tint":r.tint,"--rf-s1":e,"--rf-s2":t,"--rf-s3":a,"--rf-line-pct":o,"color-scheme":r.dark?"dark":"light"}}var ia=new Intl.NumberFormat("en-US");function he(r,e=Date.now()){let t=Math.max(0,(e-r)/1e3);return t<45?"just now":t<3600?`${Math.round(t/60)}m ago`:t<86400?`${Math.round(t/3600)}h ago`:t<86400*30?`${Math.round(t/86400)}d ago`:new Date(r).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}var be=(r,e,t=e+"s")=>`${ia.format(r)} ${r===1?e:t}`;function Nr(r){let e=r.access?.state;return e==="restricted"?"Outfits private":e==="unavailable"?"Unavailable":r.outfitCount==null?"Profile":r.outfitCount?be(r.outfitCount,"outfit"):"No outfits shown"}function Gr(r){switch(r?.kind){case"rate-limited":return{title:"Roblox is rate limiting RoFit",body:`Too many requests in a short time. Wait ${r.retryAfter??10}s and try again.`};case"not-found":return{title:"Roblox can\u2019t find that",body:"The user or outfit no longer exists, or its ID is wrong."};case"forbidden":return{title:"Roblox won\u2019t show this",body:"This list is private or restricted. RoFit doesn\u2019t get around that."};case"network":return typeof navigator<"u"&&navigator.onLine===!1?{title:"You\u2019re offline",body:"RoFit shows what it has saved; anything new from Roblox needs a connection. Try again once you\u2019re back online."}:{title:"Couldn\u2019t reach Roblox",body:r.message||"Check your connection and try again."};case"timeout":return{title:"Roblox took too long",body:"It didn\u2019t answer within 20 seconds. It may be busy; try again in a moment."};case"unauthenticated":return{title:"Sign in to Roblox",body:r.message||"This needs you to be signed in to Roblox in this browser."};case"server":return{title:"Roblox had a problem",body:"Their servers returned an error. Try again shortly."};case"bad-response":return{title:"Roblox changed something",body:r.message||"The response wasn\u2019t in the shape RoFit expects. Diagnostics in settings has details."};default:return{title:"Request failed",body:r?.message||"Try again."}}}var Ft=document.createElement("style");Ft.textContent=yt;document.head.appendChild(Ft);var Bt=/^https:\/\/www\.roblox\.com\/(?:[a-z]{2}(?:-[a-z]{2,4})?\/)?users\/(\d+)/i,ve=(r,e)=>`https://www.roblox.com/users/${r}/profile#rofit${e?"/"+e:""}`,pa=r=>Bt.test(r)||/^#?\d{1,19}$/.test(r)||/^@?[A-Za-z0-9_]{3,20}$/.test(r);function da(){let r=Lt(),e=Pt(r.motion),[t,a]=F(void 0),[o,s]=F(""),[l,f]=F(0),[p,u]=F(null),[i,w]=F(!1),g=$(null),m=j(()=>E("users.recent",{limit:24}),[]),h=j(()=>E("diag.get",{}).then(c=>c.counts.library),[]),n=j(()=>i?E("library.list",{}):Promise.resolve(null),[i]),A=j(async()=>t?E("outfits.cached",{userId:t.userId}):null,[t?.userId]);z(()=>{chrome.tabs.query({active:!0,currentWindow:!0}).then(([v])=>{let S=v?.url?.match(Bt);a(v?.id&&S?{tabId:v.id,userId:Number(S[1]),name:(v.title??"").replace(/\s*[-–|]\s*Roblox.*$/i,"").trim()||"this profile"}:null)}).catch(()=>a(null))},[]),z(()=>{o.trim()&&w(!0),f(0),u(c=>c&&c.q===o.trim()?c:null)},[o]);let C=Dt(Tt(r,!1)),D=async()=>{if(t)try{await chrome.tabs.sendMessage(t.tabId,{__rofit:"open"}),window.close()}catch{await chrome.tabs.update(t.tabId,{url:ve(t.userId)}),window.close()}},b=c=>{chrome.tabs.create({url:c}),window.close()},k=c=>{E("page.open",{route:c}),window.close()},_=async c=>{let v=c.trim();if(!pa(v)){u({q:v,msg:"That isn\u2019t a Roblox username or user ID. Usernames are 3\u201320 letters, numbers or underscores."});return}u({q:v,busy:!0});try{let S=await E("users.lookup",{query:v});S?S.isBanned?u({q:v,msg:`@${S.name} is banned, so Roblox shows no profile.`}):b(ve(S.id)):u({q:v,msg:`No Roblox account is called \u201C${v.replace(/^@/,"")}\u201D.`})}catch(S){u({q:v,msg:Gr(S).title+". "+Gr(S).body})}},R=o.trim(),P=Fe(()=>{if(!R)return[];let c=[{key:"find",icon:"search",title:`Find \u201C${R.replace(/^@/,"")}\u201D on Roblox`,sub:"Open their profile with RoFit",run:()=>_(R)}],v=ze(m.data??[],R,x=>[{text:x.name,weight:1.2},{text:x.displayName},{text:"",id:x.id}]).slice(0,4);for(let{item:x}of v)c.push({key:"u"+x.id,icon:"user",title:x.displayName&&x.displayName!==x.name?`${x.displayName} (@${x.name})`:x.name,sub:`${Nr(x)} \xB7 seen ${he(x.lastSeen)}`,run:()=>b(ve(x.id))});let S=ze(n.data??[],R,x=>[{text:x.name,weight:1.25},{text:x.userName},{text:x.collection,weight:.8},...x.tags.map(zt=>({text:zt})),{text:"",id:x.outfitId}]).slice(0,5);for(let{item:x}of S)c.push({key:"l"+x.key,icon:x.favorite?"star":"saved",title:x.name,sub:`Saved \xB7 by ${x.userName}${x.collection?" \xB7 "+x.collection:""}`,run:()=>k("library/open/"+encodeURIComponent(x.key))});return c},[R,m.data,n.data]),K=c=>{c.key==="ArrowDown"&&P.length?(c.preventDefault(),f(v=>(v+1)%P.length)):c.key==="ArrowUp"&&P.length?(c.preventDefault(),f(v=>(v-1+P.length)%P.length)):c.key==="Enter"&&P[l]?(c.preventDefault(),P[l].run()):c.key==="Escape"&&o&&(c.preventDefault(),s(""))},H=A.data?.outfits.filter(c=>c.isEditable).length,U=(m.data??[]).filter(c=>c.id!==t?.userId).slice(0,4),N=m.error&&h.error;return d("div",{class:"rf rf-popup"+At(e),style:C,children:[d("header",{class:"rf-pop-h",children:[d("span",{class:"rf-pop-logo",children:d(T,{n:"outfit",size:16})}),d("b",{children:"RoFit"}),d("span",{class:"rf-grow"}),d("button",{class:"rf-ib","aria-label":"Open settings",title:"Settings",onClick:()=>k("settings"),children:d(T,{n:"settings",size:18})}),d("a",{class:"rf-ib",href:jr,target:"_blank",rel:"noopener noreferrer",title:"RoFit settings on Roblox","aria-label":"RoFit settings on Roblox",children:d(T,{n:"user",size:18})})]}),d("div",{class:"rf-pop-search",children:d("label",{class:"rf-search",children:[d(T,{n:"search",size:16}),d("input",{ref:g,autoFocus:!0,value:o,spellcheck:!1,autocomplete:"off","aria-autocomplete":"list",placeholder:"Username, user ID or saved outfit","aria-label":"Search Roblox users and your library",role:"combobox","aria-expanded":P.length>0,"aria-controls":"rf-pop-results","aria-activedescendant":P[l]?"rf-pr-"+l:void 0,onInput:c=>s(c.target.value),onKeyDown:K})]})}),R?d("div",{class:"rf-pop-results",id:"rf-pop-results",role:"listbox","aria-label":"Results",children:[P.map((c,v)=>d("div",{id:"rf-pr-"+v,role:"option","aria-selected":v===l,class:"rf-pop-row"+(v===l?" on":""),onMouseMove:()=>f(v),onClick:c.run,children:[d("span",{class:"rf-pop-av ic",children:d(T,{n:c.icon,size:16})}),d("span",{class:"rf-pop-name",children:[c.title,d("small",{children:c.sub})]}),v===0&&p?.busy?d(Ur,{size:14}):v===l?d("kbd",{class:"rf-kbd",children:"\u21B5"}):null]},c.key)),p?.msg&&d("p",{class:"rf-pop-msg",role:"alert",children:[d(T,{n:"warn",size:14}),p.msg]}),n.loading&&i&&d("p",{class:"rf-pop-msg muted",children:[d(Ur,{size:12}),"Searching your library\u2026"]}),!n.loading&&P.length===1&&!p&&d("p",{class:"rf-pop-msg muted",children:"Nothing saved or recently viewed matches. Press Enter to look the name up on Roblox."})]}):d(B,{children:[t===void 0?d("div",{class:"rf-pop-now sk",children:d("div",{class:"rf-skel"})}):t?d("button",{class:"rf-pop-now live",onClick:D,children:[d("span",{class:"rf-pop-now-t",children:[d("small",{children:"This profile"}),d("b",{children:t.name}),d("span",{class:"rf-muted",children:H?`${be(H,"saved outfit")} \xB7 seen ${he(A.data.user?.lastSyncAt??Date.now())}`:"Browse their saved outfits"})]}),d("span",{class:"rf-pop-go",children:d(T,{n:"right",size:18})})]}):d("div",{class:"rf-pop-now idle",children:[d(T,{n:"outfit",size:20}),d("span",{children:["Open any Roblox profile and look for ",d("b",{children:"Outfits"})," (or ",d("b",{children:"Saved Outfits"}),"), or search for someone above."]})]}),N&&d("p",{class:"rf-pop-msg",role:"alert",children:[d(T,{n:"warn",size:14}),"RoFit\u2019s background worker didn\u2019t answer. Reload the extension from chrome://extensions if this keeps happening."]}),U.length>0&&d("section",{class:"rf-pop-sec","aria-label":"Recently viewed",children:[d("h2",{children:"Recently viewed"}),U.map((c,v)=>d("button",{class:"rf-pop-row",style:{"--i":v},onClick:()=>b(ve(c.id)),children:[d("span",{class:"rf-pop-av",children:c.name.slice(0,1).toUpperCase()}),d("span",{class:"rf-pop-name",children:[c.name,d("small",{children:[Nr(c)," \xB7 ",he(c.lastSeen)]})]}),d(T,{n:"right",size:16,class:"rf-pop-chev"})]},c.id))]})]}),d("footer",{class:"rf-pop-foot",children:[d("button",{class:"rf-pop-lib",onClick:()=>k("library"),children:[d(T,{n:"library",size:16}),d("span",{children:"Library"}),d("em",{children:h.data!=null?be(h.data,"saved outfit"):""}),d(T,{n:"right",size:16,class:"rf-pop-chev"})]}),d("div",{class:"rf-poplinks",children:[d("a",{href:Vr,target:"_blank",rel:"noopener noreferrer",children:"Official site"})," \xB7 ",d("a",{href:Wr,target:"_blank",rel:"noopener noreferrer",children:"Report a problem"})," \xB7 ",d("a",{href:$r,target:"_blank",rel:"noopener noreferrer",children:"Donate"})]})]})]})}nt(d(da,{}),document.getElementById("root"));chrome.action.setBadgeText({text:""}).catch(()=>{});})();
