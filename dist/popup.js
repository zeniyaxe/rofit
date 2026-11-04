"use strict";(()=>{var w,jr,Dt,q,Vr,ee,Xr,J,G,Kr,Ce,ye,we,Zr,re={},te=[],Ft=/^m(i|n|o|s|text|space)$/,_e=Array.isArray,Jr=te.slice,I=Object.assign;function ae(r){r&&r.parentNode&&r.remove()}function Q(r,e,t,a,o){var f={type:r,props:e,key:t,ref:a,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:o||++jr,__i:-1,__u:0};return!o&&w.vnode&&w.vnode(f),f}function B(r){return r.children}function Y(r,e){this.props=r,this.context=e,this.__g=0}function H(r,e){if(e==null)return r.__?H(r.__,r.__i+1):null;for(var t;e<r.__k.length;e++)if((t=r.__k[e])&&t.__e)return t.__e;return typeof r.type!="function"||r.props.__P?null:H(r)}function Qr(r){if((r=r.__)&&r.__c&&!r.props.__P)return r.__e=null,r.__k.some(function(e){return e&&(r.__e=e.__e)}),Qr(r)}function ke(r){(8&r.__g||!(r.__g|=8)||!q.push(r)||ee++)&&Vr==w.debounceRendering||((Vr=w.debounceRendering)||queueMicrotask)(Bt)}function Bt(){var r,e,t,a,o,f,l,s,p;try{for(e=1;q.length;)q.length>e&&q.sort(Xr),r=q.shift(),e=q.length,8&r.__g&&(a=void 0,o=void 0,f=(o=(t=r).__v).__e,l=[],s=[],(p=t.__P)&&((a=I({constructor:void 0},o)).__v=o.__v+1,w.vnode&&w.vnode(a),Se(p,a,o,t.__n,p.namespaceURI,32&o.__u?[f]:null,l,f||H(o),32&o.__u,s),a.__v=o.__v,a.__.__k[a.__i]=a,tt(l,a,s),o.__=o.__e=null,a.__e!=f&&Qr(a)))}finally{q.length=ee=0}}function Yr(r,e,t,a,o,f,l,s,p,u,i){var y,g,c,h,n,A,C=a.__k||te,T=e.length;for(p=Et(t,e,C,p,T),y=0;y<T;y++)(c=t.__k[y])!=null&&(g=~c.__i&&C[c.__i]||re,c.__i=y,A=Se(r,c,g,o,f,l,s,p,u,i),h=c.__e,c.ref&&(g.ref!=c.ref||8&g.__u)&&(g.ref!=c.ref&&g.ref&&Me(g.ref,null,c),i.push(c.ref,c.__c||h,c)),n=n||h,4&c.__u?(p=et(c,p,r,!g.__v),g.__e&&(g.__e=null)):typeof c.type=="function"&&A!==void 0?p=A:h&&(p=h.nextSibling),c.__u&=-7);return t.__e=n,p}function Et(r,e,t,a,o){var f,l,s,p,u,i,y,g,c,h,n=t.length,A=n,C=0,T=!1,b=r.__k=Array(o);for(f=0;f<o;f++)(l=e[f])!=null&&typeof l!="boolean"&&typeof l!="function"?(typeof l!="object"||l.constructor==String?l=b[f]=Q(null,l):_e(l)?l=b[f]=Q(B,{children:l}):l.constructor===void 0&&l.__b?l=b[f]=Q(l.type,l.props,l.key,l.ref,l.__v):b[f]=l,p=f+C,l.__=r,l.__b=r.__b+1,s=null,~(u=l.__i=zt(l,t,p,A))&&(A--,(s=t[u])&&(s.__u|=2)),s&&s.__v?(l.__u|=2,u==p-1?C--:u==p+1?C++:u!=p&&(u>p?C--:C++,T=!0)):(~u||(o>n?C--:o<n&&C++),typeof l.type!="function"&&(l.__u|=4))):b[f]=null;if(T){for(i=[],y=[],f=0;f<o;f++)if((l=b[f])&&2&l.__u){for(g=0,c=i.length;g<c;)i[h=g+c>>1]<l.__i?g=h+1:c=h;i[g]=l.__i,y[f]=g+1}for(C=i.length;f--;)y[f]&&(y[f]==C?C--:b[f].__u|=4)}if(A)for(f=0;f<n;f++)!(s=t[f])||2&s.__u||(s.__e==a&&(a=H(s)),Ae(s,s));return a}function et(r,e,t,a){var o,f;if(typeof r.type=="function"){if(r.props.__P)return e;if(o=r.__k)for(f=0;f<o.length;f++)o[f]&&(o[f].__=r,e=et(o[f],e,t,!1));return e}for(e&&!e.parentNode&&(e=H(r))&&!e.parentNode&&(e=null),r.__e!=e&&(!a&&t.moveBefore&&r.__e.parentNode?t.moveBefore(r.__e,e):t.insertBefore(r.__e,e||null)),e=r.__e;(e=e&&e.nextSibling)&&e.nodeType==8;);return e}function zt(r,e,t,a){var o,f,l,s=r.key,p=r.type,u=e[t],i=u&&!(2&u.__u);if(u===null&&s==null||i&&s==u.key&&p==u.type)return t;if(a>(i?1:0)){for(o=t-1,f=t+1;o>=0||f<e.length;)if((u=e[l=o>=0?o--:f++])&&!(2&u.__u)&&s==u.key&&p==u.type)return l}return-1}function $r(r,e,t){t==null&&(t=""),e[0]=="-"?r.setProperty(e,t):r[e]=t}function Z(r,e,t,a,o){var f;e:if(e=="style")if(typeof t=="string")r.style.cssText=t;else{if(typeof a=="string"&&(r.style.cssText=a=""),a)for(e in a)t&&e in t||$r(r.style,e,"");if(t)for(e in t)a&&t[e]==a[e]||$r(r.style,e,t[e])}else if(e[0]=="o"&&e[1]=="n")f=e!=(e=e.replace(Kr,"$1")),(e=e.slice(2))[0]<"a"&&(e=e.toLowerCase()),(r.__e||(r.__e={}))[e+f]=t,t?a?t[G]=a[G]:(t[G]=Ce,r.addEventListener(e,f?we:ye,f)):r.removeEventListener(e,f?we:ye,f);else{if(o=="http://www.w3.org/2000/svg")e=e.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(e!="width"&&e!="height"&&e!="href"&&e!="list"&&e!="form"&&e!="tabIndex"&&e!="download"&&e!="rowSpan"&&e!="colSpan"&&e!="role"&&e!="popover"&&e in r)try{r[e]=t??"";break e}catch{}typeof t=="function"||(t==null||t===!1&&e[4]!="-"?r.removeAttribute(e):r.setAttribute(e,e=="popover"&&t==1?"":t))}}function Wr(r){return function(e){if(this.__e){var t=this.__e[e.type+r];if(e[J]==null)e[J]=Ce++;else if(e[J]<t[G])return;return t(w.event?w.event(e):e)}}}function Se(r,e,t,a,o,f,l,s,p,u){var i,y,g,c,h,n,A,C,T,b,k,_,R,L,K,O,U,N,m,v,S=e.type;if(e.constructor!==void 0)return null;if(128&t.__u&&(p=32&t.__u,i=t.__c.__z)){if(e.__u|=p,y=f=[],i.nodeType==8)for(g=1,c=i.nextSibling;c;c=c.nextSibling){if(c.nodeType==8){if(c.data.startsWith("$s"))g++;else if(c.data.startsWith("/$s")&&!--g)break}f.push(c)}else f.push(i);s=f[0]}(i=w.__b)&&i(e);e:if(typeof S=="function"){h=l.length;try{if(b=e.props,k=(i=S.prototype)&&i.render,_=(i=S.contextType)&&a[i.__c],R=i?_?_.props.value:i.__:a,t.__c?2&(n=e.__c=t.__c).__g&&(n.__g|=1):(k?e.__c=n=new S(b,R):(e.__c=n=new Y(b,R),n.constructor=S,n.render=Ht),_&&_.sub(n),n.state||(n.state={}),n.__n=a,n.__g|=8,n.__h=[],n.__k=[]),k&&(n.__s||(n.__s=n.state),S.getDerivedStateFromProps&&(n.__s==n.state&&(n.__s=I({},n.__s)),I(n.__s,S.getDerivedStateFromProps(b,n.__s)))),A=n.props,C=n.state,n.__v=e,t.__c){if(k&&!S.getDerivedStateFromProps&&b!==A&&n.componentWillReceiveProps&&n.componentWillReceiveProps(b,R),e.__v==t.__v&&!(8&n.__g)||!(4&n.__g)&&n.shouldComponentUpdate&&n.shouldComponentUpdate(b,n.__s,R)===!1){e.__v!=t.__v&&(n.props=b,n.state=n.__s,n.__g&=-9),e.__e=t.__e,e.__k=t.__k,e.__k.some(function(x){x&&(x.__=e)}),te.push.apply(n.__h,n.__k),n.__k=[],n.__h.length&&l.push(n),s=H(t);break e}n.componentWillUpdate&&n.componentWillUpdate(b,n.__s,R),k&&n.componentDidUpdate&&n.__h.push(function(){n.componentDidUpdate(A,C,T)})}else k&&!S.getDerivedStateFromProps&&n.componentWillMount&&n.componentWillMount(),k&&n.componentDidMount&&n.__h.push(n.componentDidMount);if(n.context=R,n.props=b,n.__P=r,n.__g&=-5,L=w.__r,K=0,k)n.state=n.__s,n.__g&=-9,L&&L(e),i=n.render(n.props,n.state,n.context),te.push.apply(n.__h,n.__k),n.__k=[];else do n.__g&=-9,L&&L(e),i=n.render(n.props,n.state,n.context),n.state=n.__s;while(8&n.__g&&++K<25);n.state=n.__s,n.getChildContext&&(a=I({},a,n.getChildContext())),k&&t.__c&&n.getSnapshotBeforeUpdate&&(T=n.getSnapshotBeforeUpdate(A,C)),O=i&&i.type===B&&i.key==null?i.props.children:i,b.__P&&(i=s,o=(r=b.__P).namespaceURI,p=f=null,t.props&&t.props.__P!=r&&(t.__k.some(function(x){x&&Ae(x,x)}),t.__k=null),s=t.__k?H(t,0):null),s=Yr(r,_e(O)?O:[O],e,t,a,o,f,l,s,p,u),b.__P&&(e.__e=null,s=i),e.__u&=-161,128&t.__u&&(n.__z=null),y&&y.some(ae),n.__h.length&&l.push(n),1&n.__g&&(n.__g&=-4)}catch(x){if(l.length=h,e.__v=null,p||f)if(x.then){if(U=0,e.__u|=p?160:128,f){for(m=0;m<f.length;m++)if(v=f[m])if(v.nodeType==8){if(f[m]=null,v.data.startsWith("$s"))U++||(N=v);else if(v.data.startsWith("/$s")&&!--U){s=v;break}}else U&&(f[m]=null)}if(!N){for(;s&&s.nodeType==8&&s.nextSibling;)s=s.nextSibling;f&&(f[f.indexOf(s)]=null),N=s}e.__c.__z||(e.__c.__z=N),e.__e=s}else f&&f.some(ae);else e.__e=t.__e;e.__k||(e.__k=t.__k||[]),x.then||rt(e),w.__e(x,e,t)}}else s=e.__e=qt(t.__e,e,t,a,o,f,l,p,u,r);return(i=w.diffed)&&i(e),128&e.__u?void 0:s}function rt(r){r&&(r.__c&&(r.__c.__g|=4),r.__k&&r.__k.some(rt))}function tt(r,e,t){for(var a=0;a<t.length;)Me(t[a++],t[a++],t[a++]);w.__c&&w.__c(e,r),r.some(function(o){try{r=o.__h,o.__h=[],r.some(function(f){f.call(o)})}catch(f){w.__e(f,o.__v)}})}function qt(r,e,t,a,o,f,l,s,p,u){var i,y,g,c,h,n,A,C,T,b=t.props||re,k=e.props,_=e.type;if(_=="svg"?o="http://www.w3.org/2000/svg":_=="math"?o="http://www.w3.org/1998/Math/MathML":o||(o="http://www.w3.org/1999/xhtml"),f){for(i=0;i<f.length;i++)if((h=f[i])&&(_?h.localName==_:h.nodeType==3)){r=h,f[i]=null;break}}if(!r){if(C=u.ownerDocument||document,!_)return C.createTextNode(k);r=C.createElementNS(o,_,k.is&&k),s&&(w.__m&&w.__m(e,f),s=!1),f=null}if(_){if(u=_=="template"?r.content:r,f=_=="textarea"&&k.defaultValue!=null?null:f&&Jr.call(u.childNodes),!s&&f)for(b={},i=0;i<r.attributes.length;i++)b[(h=r.attributes[i]).name]=h.value;for(i in b)h=b[i],i=="dangerouslySetInnerHTML"?g=h:i=="children"||i in k||i=="value"&&"defaultValue"in k||i=="checked"&&"defaultChecked"in k||Z(r,i,null,h,o);for(i in T=1&t.__u,k)h=k[i],i=="children"?c=h:i=="dangerouslySetInnerHTML"?y=h:i=="value"?n=h:i=="checked"?A=h:s&&typeof h!="function"||!(b[i]!==h||T&&h!=null)||Z(r,i,h,b[i],o);y?(s||g&&(y.__html==g.__html||y.__html==r.innerHTML)||(r.innerHTML=y.__html),e.__k=[]):(g&&(r.textContent=""),(_=="foreignObject"||o=="http://www.w3.org/1998/Math/MathML"&&Ft.test(_))&&(o="http://www.w3.org/1999/xhtml"),Yr(u,_e(c)?c:[c],e,t,a,o,f,l,f?f[0]:t.__k&&H(t,0),s,p),f&&f.some(ae)),s&&_!="textarea"||(i="value",_=="progress"&&n==null?r.removeAttribute(i):n==null||n===r[i]&&(_!="progress"||n)||Z(r,i,n,b[i],o),i="checked",A!=null&&A!=r[i]&&Z(r,i,A,b[i],o))}else b===k||s&&r.data==k||(r.data=k);return r}function Me(r,e,t){try{typeof r=="function"?(typeof r.__u=="function"&&r.__u(),(typeof r.__u!="function"||e)&&(r.__u=r(e))):r.current=e}catch(a){w.__e(a,t)}}function Ae(r,e,t){var a,o;if(w.unmount&&w.unmount(r),!(a=r.ref)||a.current&&a.current!=r.__e||Me(a,null,e),a=r.__c){if(a.componentWillUnmount)try{a.componentWillUnmount()}catch(f){w.__e(f,e)}a.__P=a.__n=null}if(a=r.__k)for(o=0;o<a.length;o++)a[o]&&Ae(a[o],e,typeof r.type!="function"||t&&!r.props.__P);(a=r.__e)&&(t||ae(a),a.__e&&(a.__e=null)),r.__e=r.__c=r.__=null}function Ht(r,e,t){return this.constructor(r,t)}function at(r,e){var t,a,o,f;w.__&&w.__(r,e),e.nodeType==9&&(e=e.documentElement),a=(t=r&&32&r.__u)?null:e.__k,e.__k=Q(B,{children:[r]}),o=[],f=[],Se(e,e.__k,a||re,re,e.namespaceURI,a?null:e.firstChild?Jr.call(e.childNodes):null,o,a?a.__e:e.firstChild,t,f),tt(o,e.__k,f),e.__k.props.children=null}function ot(r){function e(t){var a,o;return this.getChildContext||(a=new Set,(o={})[e.__c]=this,this.getChildContext=function(){return o},this.shouldComponentUpdate=function(f){this.props.value!=f.value&&a.forEach(function(l){l.__g|=4,ke(l)})},this.sub=function(f){a.add(f);var l=f.componentWillUnmount;f.componentWillUnmount=function(){a.delete(f),l&&l.call(f)}}),t.children}return e.__c="__cC"+Zr++,e.__=r,e.Provider=(e.Consumer=function(t,a){return t.children(a)}).contextType=e,e}w={__e:function(r,e,t,a){for(var o,f,l;e=e.__;)if((o=e.__c)&&!(1&o.__g)){o.__g|=4;try{if((f=o.constructor)&&f.getDerivedStateFromError&&(o.setState(f.getDerivedStateFromError(r)),l=8&o.__g),o.componentDidCatch&&(o.componentDidCatch(r,a||{}),l=8&o.__g),l)return void(o.__g|=2)}catch(s){r=s,l=0}}throw ee=0,r}},jr=0,Dt=function(r){return r!=null&&r.constructor===void 0},Y.prototype.setState=function(r,e){var t=this.__s;t&&t!=this.state||(t=this.__s=I({},this.state)),typeof r=="function"&&(r=r(I({},t),this.props)),r&&(I(t,r),this.__v&&(e&&this.__k.push(e),ke(this)))},Y.prototype.forceUpdate=function(r){this.__v&&(this.__g|=4,r&&this.__h.push(r),ke(this))},Y.prototype.render=B,q=[],ee=0,Xr=function(r,e){return r.__v.__b-e.__v.__b},J=Symbol(),G=Symbol(),Kr=/(PointerCapture)$|Capture$/i,Ce=0,ye=Wr(!1),we=Wr(!0),Zr=0;var $,P,Pe,ft,Le=Object.is,oe=0,ct=[],Re=[],M=w,st=M.__b,nt=M.__r,lt=M.diffed,it=M.__c,pt=M.unmount,dt=M.__;function De(r,e){M.__h&&M.__h(P,r,oe||e),oe=0;var t=P.__H||(P.__H={__:[],__h:[]});return r>=t.__.length&&t.__.push({}),t.__[r]}function D(r){return oe=1,Ot(gt,r)}function Ot(r,e,t){var a=De($++,2);if(a.t=r,!a.__c&&(a.__=[t?t(e):gt(void 0,e),function(f){var l=a.__N?a.__N[0]:a.__[0],s=a.t(l,f);Le(l,s)||(a.__N=[s,a.__[1]],a.__c.setState({}))}],a.__c=P,!P.__f)){P.__f=!0;var o=P.shouldComponentUpdate;P.shouldComponentUpdate=function(f,l,s){var p=this.__H;if(!p)return!0;var u=!1,i=this.props!=f;if(p.__.some(function(g){g.__N&&(u=!0,Le(g.__[0],g.__N[0])||(i=!0))}),o){var y=o.call(this,f,l,s);return u?y||i:y}return!u||i}}return a.__}function E(r,e){var t=De($++,3);!M.__s&&xt(t.__H,e)&&(t.__P=!0,t.__=r,t.u=e,P.__H.__h.push(t))}function W(r){return oe=5,Fe(function(){return{current:r}},[])}function Fe(r,e){var t=De($++,7);return xt(t.__H,e)&&(t.__=r(),t.__H=e),t.__}function Ut(){var r;do{for(;r=Re.shift();)try{V(r)}catch(t){M.__e(t,{__:(r=r.__P)&&r.__v})}for(;r=ct.shift();){var e=r.__H;if(r.__P&&e)try{e.__h.some(V),e.__h.some(Te),e.__h=[]}catch(t){e.__h=[],M.__e(t,r.__v)}}}while(Re.length)}M.__b=function(r){P=null,st&&st(r)},M.__=function(r,e){r&&e.__k&&e.__k.__m&&(r.__m=e.__k.__m),dt&&dt(r,e)},M.__r=function(r){nt&&nt(r),$=0;var e=(P=r.__c).__H;e&&(Pe==P?P.__h=[]:(e.__h.some(V),e.__h.some(Te),$=0),e.__h=[],e.__.some(function(t){t.__N&&(t.__=t.__N),t.u=t.__N=void 0})),Pe=P},M.diffed=function(r){lt&&lt(r);var e=r.__c;e&&e.__H&&(e.__H.__h.length&&mt(ct.push(e)),e.__H.__.some(function(t){t.u&&(t.__H=t.u)})),Pe=P=null},M.__c=function(r,e){e.some(function(t){try{t.__h.some(V),t.__h=t.__h.filter(function(a){return!a.__||Te(a)})}catch(a){e.some(function(o){o.__h&&(o.__h=[])}),e=[],M.__e(a,t.__v)}}),it&&it(r,e)},M.unmount=function(r){pt&&pt(r);var e,t,a=r.__c;a&&a.__H&&(a.__H.__.some(function(o){try{if(o.__P&&o.__c){if(t===void 0){for(t=r.__;t&&(!t.__c||!t.__c.__P);)t=t.__;t=t&&t.__c}o.__P=t,mt(Re.push(o))}else V(o)}catch(f){e=f}}),a.__H=void 0,e&&M.__e(e,a.__v))};var ut=typeof requestAnimationFrame=="function";function It(r){var e,t=function(){clearTimeout(a),ut&&cancelAnimationFrame(e),setTimeout(r)},a=setTimeout(t,35);ut&&(e=requestAnimationFrame(t))}function mt(r){r!=1&&ft==M.requestAnimationFrame||((ft=M.requestAnimationFrame)||It)(Ut)}function V(r){var e=P,t=r.__c;typeof t=="function"&&(r.__c=void 0,t()),P=e}function Te(r){var e=P;r.__c=r.__(),P=e}function xt(r,e){return!r||r.length!=e.length||e.some(function(t,a){return!Le(t,r[a])})}function gt(r,e){return typeof e=="function"?e(r):e}var ht=`/* RoFit \u2014 one stylesheet for the on-profile sheet, the library/settings page and the popup.
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
`;async function z(r,e){let t;try{t=await chrome.runtime.sendMessage({__rofit:!0,type:r,req:e})}catch{throw{kind:"network",message:"RoFit\u2019s background worker did not answer. Reload the page and try again."}}if(!t)throw{kind:"network",message:"RoFit\u2019s background worker did not answer. Reload the page and try again."};if(!t.ok)throw t.error;return t.data}var Gt=/[\u0300-\u036f]/g;function Be(r){return r.normalize("NFKD").replace(Gt,"").toLowerCase().replace(/[^\p{L}\p{N}]+/gu," ").trim()}function Vt(r){let e={raw:r,terms:[],phrases:[],ids:[],not:[]},t=/(-?)"([^"]*)"|(\S+)/g,a;for(;a=t.exec(r);){if(a[2]!==void 0){let p=Be(a[2]);if(!p)continue;(a[1]?e.not:e.phrases).push(p);continue}let o=a[3],f=o.startsWith("-")&&o.length>1;f&&(o=o.slice(1));let l=/^#(\d{1,20})$/.exec(o);if(l&&!f){e.ids.push(Number(l[1]));continue}let s=Be(o);if(s){if(f){e.not.push(s);continue}for(let p of s.split(" "))e.terms.push(p),/^\d{3,20}$/.test(p)&&e.ids.push(Number(p))}}return e}var $t=r=>!r.terms.length&&!r.phrases.length&&!r.ids.length&&!r.not.length;function Wt(r,e){if(r===e)return!0;let t=r.length,a=e.length;if(Math.abs(t-a)>1)return!1;let o=0;for(;o<t&&o<a&&r[o]===e[o];)o++;return t===a?r.slice(o+1)===e.slice(o+1)?!0:r[o]===e[o+1]&&r[o+1]===e[o]&&r.slice(o+2)===e.slice(o+2):t>a?r.slice(o+1)===e.slice(o):r.slice(o)===e.slice(o+1)}function jt(r,e){if(!r||!e)return 0;if(e===r)return 100;let t=o=>o+r.length===e.length||e[o+r.length]===" ";if(e.startsWith(r))return(t(0)?92:84)-Math.min(6,(e.length-r.length)/6);let a=e.indexOf(" "+r);if(a>=0)return a++,(t(a)?78:70)-Math.min(6,a/8);if(a=e.indexOf(r),a>0)return 52-Math.min(6,a/8);if(r.length>=3){let o=0,f=-1,l=-1;for(let s=0;s<e.length&&o<r.length;s++)e[s]===r[o]&&(f<0&&(f=s),o++,l=s);if(o===r.length){let s=l-f+1;if(s<=r.length*2+2)return 34-Math.min(14,s-r.length)}}if(r.length>=5){for(let o of e.split(" "))if(o.length>=4&&Wt(r,o))return 24}return 0}function Xt(r,e,t){let a=t??e.map(s=>Be(s.text));for(let s of r.not)if(a.some(p=>p.includes(s)))return null;let o=0,f={s:0},l=s=>e.findIndex(p=>p.id===s);for(let s of r.phrases){let p=a.findIndex(i=>i.includes(s));if(p<0)return null;let u=90*(e[p].weight??1);o+=u,u>f.s&&(f={s:u,f:e[p]})}for(let s of r.terms){let p=0,u;for(let i=0;i<e.length;i++){let y=jt(s,a[i])*(e[i].weight??1);y>p&&(p=y,u=e[i])}if(/^\d{3,20}$/.test(s)){let i=l(Number(s));i>=0&&120>p&&(p=120,u=e[i])}if(!p)return null;o+=p,p>f.s&&(f={s:p,f:u})}for(let s of r.ids){if(r.terms.includes(String(s)))continue;let p=l(s);if(p<0)return null;o+=120,120>f.s&&(f={s:120,f:e[p]})}return{score:o,field:f.f}}function Ee(r,e,t){let a=typeof e=="string"?Vt(e):e;if($t(a))return r.map(f=>({item:f,match:{score:0}}));let o=[];return r.forEach((f,l)=>{let s=Xt(a,t(f));s&&o.push({item:f,match:s,i:l})}),o.sort((f,l)=>l.match.score-f.match.score||f.i-l.i),o}var bt=[["path",{d:"M12 10.5V9.5a2.5 2.5 0 1 0-2.5-2.5"}],["path",{d:"M12 10.5 3 17a1.3 1.3 0 0 0 .8 2.4h16.4A1.3 1.3 0 0 0 21 17l-9-6.5Z"}]];var ze=[["path",{d:"m12 19-7-7 7-7"}],["path",{d:"M19 12H5"}]];var qe=[["path",{d:"M5 12h14"}],["path",{d:"m12 5 7 7-7 7"}]];var He=[["path",{d:"m21 16-4 4-4-4"}],["path",{d:"M17 20V4"}],["path",{d:"m3 8 4-4 4 4"}],["path",{d:"M7 4v16"}]];var Oe=[["path",{d:"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"}],["path",{d:"m9 10 2 2 4-4"}]];var Ue=[["path",{d:"M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"}]];var Ie=[["path",{d:"M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"}],["path",{d:"m7 16.5-4.74-2.85"}],["path",{d:"m7 16.5 5-3"}],["path",{d:"M7 16.5v5.17"}],["path",{d:"M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"}],["path",{d:"m17 16.5-5-3"}],["path",{d:"m17 16.5 4.74-2.85"}],["path",{d:"M17 16.5v5.17"}],["path",{d:"M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"}],["path",{d:"M12 8 7.26 5.15"}],["path",{d:"m12 8 4.74-2.85"}],["path",{d:"M12 13.5V8"}]];var Ne=[["path",{d:"M18 6 7 17l-5-5"}],["path",{d:"m22 10-7.5 7.5L13 16"}]];var Ge=[["path",{d:"M20 6 9 17l-5-5"}]];var Ve=[["path",{d:"m6 9 6 6 6-6"}]];var $e=[["path",{d:"m9 18 6-6-6-6"}]];var fe=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"m16 9-5.5 5.5L8 12"}]];var We=[["path",{d:"M10.1 2.182a10 10 0 0 1 3.8 0"}],["path",{d:"M13.9 21.818a10 10 0 0 1-3.8 0"}],["path",{d:"M17.609 3.721a10 10 0 0 1 2.69 2.7"}],["path",{d:"M2.182 13.9a10 10 0 0 1 0-3.8"}],["path",{d:"M20.279 17.609a10 10 0 0 1-2.7 2.69"}],["path",{d:"M21.818 10.1a10 10 0 0 1 0 3.8"}],["path",{d:"M3.721 6.391a10 10 0 0 1 2.7-2.69"}],["path",{d:"M6.391 20.279a10 10 0 0 1-2.69-2.7"}]];var je=[["path",{d:"M11 14h10"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v1.344"}],["path",{d:"m17 18 4-4-4-4"}],["path",{d:"M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113"}],["rect",{x:"8",y:"2",width:"8",height:"4",rx:"1"}]];var Xe=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 6v6l4 2"}]];var Ke=[["path",{d:"M13.744 17.736a6 6 0 1 1-7.48-7.48"}],["path",{d:"M15 6h1v4"}],["path",{d:"m6.134 14.768.866-.5 2 3.464"}],["circle",{cx:"16",cy:"8",r:"6"}]];var Ze=[["path",{d:"M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"}]];var Je=[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]];var Qe=[["path",{d:"M20 4v7a4 4 0 0 1-4 4H4"}],["path",{d:"m9 10-5 5 5 5"}]];var Ye=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];var se=[["circle",{cx:"12",cy:"12",r:"1"}],["circle",{cx:"19",cy:"12",r:"1"}],["circle",{cx:"5",cy:"12",r:"1"}]];var er=[["path",{d:"M15 3h6v6"}],["path",{d:"M10 14 21 3"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"}]];var rr=[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"}],["path",{d:"m2 2 20 20"}]];var tr=[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"}],["circle",{cx:"12",cy:"12",r:"3"}]];var ne=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{d:"M10 12a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1 1 1 0 0 1 1 1v1a1 1 0 0 0 1 1"}],["path",{d:"M14 18a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1 1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"}]];var le=[["path",{d:"M4 12.15V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3.35"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5"}],["path",{d:"m5 16-3 3 3 3"}],["path",{d:"m9 22 3-3-3-3"}]];var ar=[["path",{d:"M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1"}],["path",{d:"M2 13h10"}],["path",{d:"m9 16 3-3-3-3"}]];var ie=[["path",{d:"M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z"}]];var or=[["path",{d:"m12 14 4-4"}],["path",{d:"M3.34 19a10 10 0 1 1 17.32 0"}]];var fr=[["circle",{cx:"5",cy:"6",r:"3"}],["path",{d:"M12 6h5a2 2 0 0 1 2 2v7"}],["path",{d:"m15 9-3-3 3-3"}],["circle",{cx:"19",cy:"18",r:"3"}],["path",{d:"M12 18H7a2 2 0 0 1-2-2V9"}],["path",{d:"m9 15 3 3-3 3"}]];var sr=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}],["path",{d:"M2 12h20"}]];var nr=[["line",{x1:"4",x2:"20",y1:"9",y2:"9"}],["line",{x1:"4",x2:"20",y1:"15",y2:"15"}],["line",{x1:"10",x2:"8",y1:"3",y2:"21"}],["line",{x1:"16",x2:"14",y1:"3",y2:"21"}]];var lr=[["circle",{cx:"12",cy:"12",r:"10"}],["path",{d:"M12 16v-4"}],["path",{d:"M12 8h.01"}]];var ir=[["path",{d:"M10 8h.01"}],["path",{d:"M12 12h.01"}],["path",{d:"M14 8h.01"}],["path",{d:"M16 12h.01"}],["path",{d:"M18 8h.01"}],["path",{d:"M6 8h.01"}],["path",{d:"M7 16h10"}],["path",{d:"M8 12h.01"}],["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2"}]];var pe=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"}]];var pr=[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1"}]];var dr=[["path",{d:"m16 6 4 14"}],["path",{d:"M12 6v14"}],["path",{d:"M8 8v12"}],["path",{d:"M4 4v16"}]];var ur=[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"}]];var mr=[["path",{d:"M13 5h8"}],["path",{d:"M13 12h8"}],["path",{d:"M13 19h8"}],["path",{d:"m3 17 2 2 4-4"}],["path",{d:"m3 7 2 2 4-4"}]];var cr=[["path",{d:"M3 5h.01"}],["path",{d:"M3 12h.01"}],["path",{d:"M3 19h.01"}],["path",{d:"M8 5h13"}],["path",{d:"M8 12h13"}],["path",{d:"M8 19h13"}]];var xr=[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4"}]];var gr=[["path",{d:"M5 12h14"}]];var hr=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21"}]];var br=[["path",{d:"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"}],["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor"}]];var vr=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],["path",{d:"m15 5 4 4"}]];var yr=[["path",{d:"M5 12h14"}],["path",{d:"M12 5v14"}]];var wr=[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],["path",{d:"M21 3v5h-5"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],["path",{d:"M8 16H3v5"}]];var kr=[["path",{d:"m2 9 3-3 3 3"}],["path",{d:"M13 18H7a2 2 0 0 1-2-2V6"}],["path",{d:"m22 15-3 3-3-3"}],["path",{d:"M11 6h6a2 2 0 0 1 2 2v10"}]];var de=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],["path",{d:"M3 3v5h5"}],["path",{d:"M12 7v5l4 2"}]];var Cr=[["path",{d:"M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"}],["path",{d:"m14.5 12.5 2-2"}],["path",{d:"m11.5 9.5 2-2"}],["path",{d:"m8.5 6.5 2-2"}],["path",{d:"m17.5 15.5 2-2"}]];var _r=[["path",{d:"m21 21-4.34-4.34"}],["circle",{cx:"11",cy:"11",r:"8"}]];var Sr=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{cx:"12",cy:"12",r:"3"}]];var Mr=[["circle",{cx:"18",cy:"5",r:"3"}],["circle",{cx:"6",cy:"12",r:"3"}],["circle",{cx:"18",cy:"19",r:"3"}],["line",{x1:"8.59",x2:"15.42",y1:"13.51",y2:"17.49"}],["line",{x1:"15.41",x2:"8.59",y1:"6.51",y2:"10.49"}]];var Ar=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],["path",{d:"m9 12 2 2 4-4"}]];var Pr=[["path",{d:"M16 10a4 4 0 0 1-8 0"}],["path",{d:"M3.103 6.034h17.794"}],["path",{d:"M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"}]];var Lr=[["path",{d:"M10 5H3"}],["path",{d:"M12 19H3"}],["path",{d:"M14 3v4"}],["path",{d:"M16 17v4"}],["path",{d:"M21 12h-9"}],["path",{d:"M21 19h-5"}],["path",{d:"M21 5h-7"}],["path",{d:"M8 10v4"}],["path",{d:"M8 12H3"}]];var Rr=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"}]];var Tr=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"}]];var Dr=[["path",{d:"M21 9a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 15 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"}],["path",{d:"M15 3v5a1 1 0 0 0 1 1h5"}]];var Fr=[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor"}]];var ue=[["path",{d:"M10 11v6"}],["path",{d:"M14 11v6"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],["path",{d:"M3 6h18"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}]];var me=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],["path",{d:"M12 9v4"}],["path",{d:"M12 17h.01"}]];var Br=[["path",{d:"M12 3v12"}],["path",{d:"m17 8-5-5-5 5"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}]];var Er=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}],["circle",{cx:"12",cy:"7",r:"4"}]];var zr=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87"}],["circle",{cx:"9",cy:"7",r:"4"}]];var qr=[["path",{d:"M12 20h.01"}],["path",{d:"M8.5 16.429a5 5 0 0 1 7 0"}],["path",{d:"M5 12.859a10 10 0 0 1 5.17-2.69"}],["path",{d:"M19 12.859a10 10 0 0 0-2.007-1.523"}],["path",{d:"M2 8.82a15 15 0 0 1 4.177-2.643"}],["path",{d:"M22 8.82a15 15 0 0 0-11.288-3.764"}],["path",{d:"m2 2 20 20"}]];var Hr=[["path",{d:"M18 6 6 18"}],["path",{d:"m6 6 12 12"}]];var Kt=0;function d(r,e,t,a,o,f){e||(e={});var l,s,p=e;if("ref"in p&&typeof r!="function")for(s in p={},e)s=="ref"?l=e[s]:p[s]=e[s];var u={type:r,props:p,key:t,ref:l,__k:null,__:null,__b:0,__e:null,__c:null,constructor:void 0,__v:--Kt,__i:-1,__u:0};return(o||f)&&(u.__source=o,u.__self=f),w.vnode&&w.vnode(u),u}function Zt({node:r,size:e=18,class:t,label:a}){return d("svg",{class:"rf-ico "+(t??""),width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round","aria-hidden":a?void 0:"true",role:a?"img":void 0,"aria-label":a,children:r.map(([o,f],l)=>d(o,{...f},l))})}var Jt={search:_r,close:Hr,back:ze,settings:Sr,check:Ge,copy:Je,external:er,save:Ue,saved:Oe,compare:fr,more:se,grid:pr,list:cr,refresh:wr,down:Ve,right:$e,outfit:bt,library:dr,download:Ye,upload:Br,trash:ue,filter:ie,history:de,warn:me,info:lr,link:ur,code:le,json:ne,layers:pe,scale:Cr,palette:br,tag:Fr,note:Dr,lock:xr,user:Er,ok:fe,dashed:We,sort:He,eye:tr,eyeOff:rr,minus:gr,plus:yr,repeat:kr,tasks:mr,spark:Rr,boxes:Ie,hash:nr,bag:Pr,clock:Xe,star:Tr,command:Ze,share:Mr,keyboard:ir,move:ar,edit:vr,globe:sr,shield:Ar,selectAll:Ne,sliders:Lr,arrow:qe,users:zr,enter:Qe,offline:qr,paste:je,coins:Ke,gauge:or,monitor:hr},F=({n:r,size:e,class:t,label:a})=>d(Zt,{node:Jt[r],size:e,class:t,label:a});var xe={v:2,appearance:"auto",motion:"system",density:"comfortable",layout:"grid",showPrices:!0,technical:!1,showPresets:!1,profileTab:!0,profileButton:!0,keepHistory:!0,historyLimit:20,cacheMinutes:10,onboarded:!1,autoIndex:!1,indexPrices:!0,checkAccess:!0},ce="settings";function vt(r){let e=r&&typeof r=="object"?r:{},t={...xe,...e};return(!e.v||e.v<2)&&(e.motion==="reduced"?t.motion="calm":(e.motion==="full"||e.motion===void 0)&&(t.motion="system")),["system","full","balanced","calm"].includes(t.motion)||(t.motion="system"),t.v=2,t}async function yt(){try{let r=await chrome.storage.local.get(ce);return vt(r[ce])}catch{return{...xe}}}function wt(r){let e=(t,a)=>{a==="local"&&t[ce]&&r(vt(t[ce].newValue))};return chrome.storage.onChanged.addListener(e),()=>chrome.storage.onChanged.removeListener(e)}function kt(r,e){return r==="full"||r==="balanced"||r==="calm"?r:e?"calm":"full"}var Ct=r=>r==="calm"?" rm":r==="balanced"?" mb":"";function _t(){let[r,e]=D(xe);return E(()=>(yt().then(e),wt(e)),[]),r}var Or=class{map=new Map;queue=new Map;listeners=new Set;timer=0;get(e,t="150x150"){return this.map.get(`${e}:${t}`)}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}request(e,t="150x150"){let a=`${e}:${t}`;this.map.get(a)?.url||this.queue.has(a)||(this.queue.set(a,{id:e,size:t,tries:0}),this.timer||(this.timer=window.setTimeout(()=>this.flush(),50)))}emit(){this.listeners.forEach(e=>e())}async flush(){this.timer=0;let e=[...this.queue.values()];this.queue.clear();for(let t of["150x150","420x420"]){let a=e.filter(o=>o.size===t).map(o=>o.id);for(let o=0;o<a.length;o+=50){let f=a.slice(o,o+50);try{let l=await z("outfits.thumbs",{ids:f,size:t});for(let s of f){let p=l[s]??{state:"Error",url:null};this.map.set(`${s}:${t}`,p);let u=e.find(i=>i.id===s&&i.size===t);p.state==="Pending"&&u.tries<6&&(this.queue.set(`${s}:${t}`,{id:s,size:t,tries:u.tries+1}),this.timer||(this.timer=window.setTimeout(()=>this.flush(),2500)))}}catch(l){for(let s of f)this.map.set(`${s}:${t}`,{state:l.kind==="rate-limited"?"RateLimited":"Error",url:null})}this.emit()}}}},Yf=new Or;function j(r,e){let[t,a]=D({loading:!0}),[o,f]=D(0);return E(()=>{let l=!1;return a(s=>({data:s.data,loading:!0})),r().then(s=>!l&&a({data:s,loading:!1}),s=>!l&&a({error:s,loading:!1})),()=>{l=!0}},[...e,o]),{...t,reload:()=>f(l=>l+1)}}function Yt(){let[r,e]=D(()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches);return E(()=>{let t=window.matchMedia("(prefers-reduced-motion: reduce)"),a=()=>e(t.matches);return t.addEventListener("change",a),()=>t.removeEventListener("change",a)},[]),r}function St(r){return kt(r,Yt())}var xs=ot(()=>{});function Ur({size:r=16}){return d("span",{class:"rf-spin",style:{width:r+"px",height:r+"px"},role:"progressbar","aria-label":"Loading"})}var ge={bg:"rgb(255, 255, 255)",fg:"rgb(32, 34, 39)",accent:"rgb(51, 95, 255)",accentFg:"#ffffff",tint:"rgb(27, 37, 75)"},Ir={bg:"rgb(18, 18, 21)",fg:"rgb(247, 247, 248)",accent:"rgb(51, 95, 255)",accentFg:"#ffffff",tint:"rgb(208, 217, 251)"},ra={bg:"rgb(0, 0, 0)",fg:"rgb(247, 247, 248)",accent:"rgb(51, 95, 255)",accentFg:"#ffffff",tint:"rgb(208, 217, 251)"};function X(r){let e=r.match(/rgba?\(([^)]+)\)/);if(!e)return null;let t=e[1].split(/[ ,/]+/).filter(Boolean).map(Number);return[t[0],t[1],t[2],t[3]??1]}var Mt=([r,e,t])=>{let a=o=>(o/=255,o<=.03928?o/12.92:((o+.055)/1.055)**2.4);return .2126*a(r)+.7152*a(e)+.0722*a(t)};function ta(){let r=y=>{for(let g=y;g;g=g.parentElement){let c=X(getComputedStyle(g).backgroundColor);if(c&&c[3]>.9)return c}return null},e=r(document.body)??r(document.documentElement);if(!e)return ge;let a=Mt(e)<.4?Ir:ge,o=X(getComputedStyle(document.body).color),f=a.accent,l=document.querySelector(".bg-action-emphasis, .btn-primary-md, .btn-growth-md"),s=l?X(getComputedStyle(l).backgroundColor):null;s&&s[3]>.9&&(f=`rgb(${s[0]}, ${s[1]}, ${s[2]})`);let p=document.querySelector(".bg-action-standard"),u=p?X(getComputedStyle(p).backgroundColor):null,i=u?`rgb(${u[0]}, ${u[1]}, ${u[2]})`:a.tint;return{bg:`rgb(${e[0]}, ${e[1]}, ${e[2]})`,fg:o?`rgb(${o[0]}, ${o[1]}, ${o[2]})`:a.fg,accent:f,accentFg:"#ffffff",tint:i}}function At(r,e){let t;r.appearance==="light"?t=ge:r.appearance==="dark"?t=Ir:r.appearance==="oled"?t=ra:e?t=ta():t=window.matchMedia("(prefers-color-scheme: dark)").matches?Ir:ge;let a=X(t.bg);return{...t,dark:a?Mt(a)<.4:!1}}function Pt(r){let[e,t,a,o]=r.dark?["11%","17%","23%","19%"]:["3.5%","7.5%","12%","13%"];return{"--rf-bg":r.bg,"--rf-fg":r.fg,"--rf-accent":r.accent,"--rf-accent-fg":r.accentFg,"--rf-tint":r.tint,"--rf-s1":e,"--rf-s2":t,"--rf-s3":a,"--rf-line-pct":o,"color-scheme":r.dark?"dark":"light"}}var aa=new Intl.NumberFormat("en-US");function he(r,e=Date.now()){let t=Math.max(0,(e-r)/1e3);return t<45?"just now":t<3600?`${Math.round(t/60)}m ago`:t<86400?`${Math.round(t/3600)}h ago`:t<86400*30?`${Math.round(t/86400)}d ago`:new Date(r).toLocaleDateString(void 0,{year:"numeric",month:"short",day:"numeric"})}var be=(r,e,t=e+"s")=>`${aa.format(r)} ${r===1?e:t}`;function Nr(r){let e=r.access?.state;return e==="restricted"?"Outfits private":e==="unavailable"?"Unavailable":r.outfitCount==null?"Profile":r.outfitCount?be(r.outfitCount,"outfit"):"No outfits shown"}function Gr(r){switch(r?.kind){case"rate-limited":return{title:"Roblox is rate limiting RoFit",body:`Too many requests in a short time. Wait ${r.retryAfter??10}s and try again.`};case"not-found":return{title:"Roblox can\u2019t find that",body:"The user or outfit no longer exists, or its ID is wrong."};case"forbidden":return{title:"Roblox won\u2019t show this",body:"This list is private or restricted. RoFit doesn\u2019t get around that."};case"network":return typeof navigator<"u"&&navigator.onLine===!1?{title:"You\u2019re offline",body:"RoFit shows what it has saved; anything new from Roblox needs a connection. Try again once you\u2019re back online."}:{title:"Couldn\u2019t reach Roblox",body:r.message||"Check your connection and try again."};case"timeout":return{title:"Roblox took too long",body:"It didn\u2019t answer within 20 seconds. It may be busy; try again in a moment."};case"unauthenticated":return{title:"Sign in to Roblox",body:r.message||"This needs you to be signed in to Roblox in this browser."};case"server":return{title:"Roblox had a problem",body:"Their servers returned an error. Try again shortly."};case"bad-response":return{title:"Roblox changed something",body:r.message||"The response wasn\u2019t in the shape RoFit expects. Diagnostics in settings has details."};default:return{title:"Request failed",body:r?.message||"Try again."}}}var Lt=document.createElement("style");Lt.textContent=ht;document.head.appendChild(Lt);var Rt=/^https:\/\/www\.roblox\.com\/(?:[a-z]{2}(?:-[a-z]{2,4})?\/)?users\/(\d+)/i,ve=(r,e)=>`https://www.roblox.com/users/${r}/profile#rofit${e?"/"+e:""}`,oa=r=>Rt.test(r)||/^#?\d{1,19}$/.test(r)||/^@?[A-Za-z0-9_]{3,20}$/.test(r);function fa(){let r=_t(),e=St(r.motion),[t,a]=D(void 0),[o,f]=D(""),[l,s]=D(0),[p,u]=D(null),[i,y]=D(!1),g=W(null),c=j(()=>z("users.recent",{limit:24}),[]),h=j(()=>z("diag.get",{}).then(m=>m.counts.library),[]),n=j(()=>i?z("library.list",{}):Promise.resolve(null),[i]),A=j(async()=>t?z("outfits.cached",{userId:t.userId}):null,[t?.userId]);E(()=>{chrome.tabs.query({active:!0,currentWindow:!0}).then(([v])=>{let S=v?.url?.match(Rt);a(v?.id&&S?{tabId:v.id,userId:Number(S[1]),name:(v.title??"").replace(/\s*[-–|]\s*Roblox.*$/i,"").trim()||"this profile"}:null)}).catch(()=>a(null))},[]),E(()=>{o.trim()&&y(!0),s(0),u(m=>m&&m.q===o.trim()?m:null)},[o]);let C=Pt(At(r,!1)),T=async()=>{if(t)try{await chrome.tabs.sendMessage(t.tabId,{__rofit:"open"}),window.close()}catch{await chrome.tabs.update(t.tabId,{url:ve(t.userId)}),window.close()}},b=m=>{chrome.tabs.create({url:m}),window.close()},k=m=>{z("page.open",{route:m}),window.close()},_=async m=>{let v=m.trim();if(!oa(v)){u({q:v,msg:"That isn\u2019t a Roblox username or user ID. Usernames are 3\u201320 letters, numbers or underscores."});return}u({q:v,busy:!0});try{let S=await z("users.lookup",{query:v});S?S.isBanned?u({q:v,msg:`@${S.name} is banned, so Roblox shows no profile.`}):b(ve(S.id)):u({q:v,msg:`No Roblox account is called \u201C${v.replace(/^@/,"")}\u201D.`})}catch(S){u({q:v,msg:Gr(S).title+". "+Gr(S).body})}},R=o.trim(),L=Fe(()=>{if(!R)return[];let m=[{key:"find",icon:"search",title:`Find \u201C${R.replace(/^@/,"")}\u201D on Roblox`,sub:"Open their profile with RoFit",run:()=>_(R)}],v=Ee(c.data??[],R,x=>[{text:x.name,weight:1.2},{text:x.displayName},{text:"",id:x.id}]).slice(0,4);for(let{item:x}of v)m.push({key:"u"+x.id,icon:"user",title:x.displayName&&x.displayName!==x.name?`${x.displayName} (@${x.name})`:x.name,sub:`${Nr(x)} \xB7 seen ${he(x.lastSeen)}`,run:()=>b(ve(x.id))});let S=Ee(n.data??[],R,x=>[{text:x.name,weight:1.25},{text:x.userName},{text:x.collection,weight:.8},...x.tags.map(Tt=>({text:Tt})),{text:"",id:x.outfitId}]).slice(0,5);for(let{item:x}of S)m.push({key:"l"+x.key,icon:x.favorite?"star":"saved",title:x.name,sub:`Saved \xB7 by ${x.userName}${x.collection?" \xB7 "+x.collection:""}`,run:()=>k("library/open/"+encodeURIComponent(x.key))});return m},[R,c.data,n.data]),K=m=>{m.key==="ArrowDown"&&L.length?(m.preventDefault(),s(v=>(v+1)%L.length)):m.key==="ArrowUp"&&L.length?(m.preventDefault(),s(v=>(v-1+L.length)%L.length)):m.key==="Enter"&&L[l]?(m.preventDefault(),L[l].run()):m.key==="Escape"&&o&&(m.preventDefault(),f(""))},O=A.data?.outfits.filter(m=>m.isEditable).length,U=(c.data??[]).filter(m=>m.id!==t?.userId).slice(0,4),N=c.error&&h.error;return d("div",{class:"rf rf-popup"+Ct(e),style:C,children:[d("header",{class:"rf-pop-h",children:[d("span",{class:"rf-pop-logo",children:d(F,{n:"outfit",size:16})}),d("b",{children:"RoFit"}),d("span",{class:"rf-grow"}),d("button",{class:"rf-ib","aria-label":"Open settings",title:"Settings",onClick:()=>k("settings"),children:d(F,{n:"settings",size:18})})]}),d("div",{class:"rf-pop-search",children:d("label",{class:"rf-search",children:[d(F,{n:"search",size:16}),d("input",{ref:g,autoFocus:!0,value:o,spellcheck:!1,autocomplete:"off","aria-autocomplete":"list",placeholder:"Username, user ID or saved outfit","aria-label":"Search Roblox users and your library",role:"combobox","aria-expanded":L.length>0,"aria-controls":"rf-pop-results","aria-activedescendant":L[l]?"rf-pr-"+l:void 0,onInput:m=>f(m.target.value),onKeyDown:K})]})}),R?d("div",{class:"rf-pop-results",id:"rf-pop-results",role:"listbox","aria-label":"Results",children:[L.map((m,v)=>d("div",{id:"rf-pr-"+v,role:"option","aria-selected":v===l,class:"rf-pop-row"+(v===l?" on":""),onMouseMove:()=>s(v),onClick:m.run,children:[d("span",{class:"rf-pop-av ic",children:d(F,{n:m.icon,size:16})}),d("span",{class:"rf-pop-name",children:[m.title,d("small",{children:m.sub})]}),v===0&&p?.busy?d(Ur,{size:14}):v===l?d("kbd",{class:"rf-kbd",children:"\u21B5"}):null]},m.key)),p?.msg&&d("p",{class:"rf-pop-msg",role:"alert",children:[d(F,{n:"warn",size:14}),p.msg]}),n.loading&&i&&d("p",{class:"rf-pop-msg muted",children:[d(Ur,{size:12}),"Searching your library\u2026"]}),!n.loading&&L.length===1&&!p&&d("p",{class:"rf-pop-msg muted",children:"Nothing saved or recently viewed matches. Press Enter to look the name up on Roblox."})]}):d(B,{children:[t===void 0?d("div",{class:"rf-pop-now sk",children:d("div",{class:"rf-skel"})}):t?d("button",{class:"rf-pop-now live",onClick:T,children:[d("span",{class:"rf-pop-now-t",children:[d("small",{children:"This profile"}),d("b",{children:t.name}),d("span",{class:"rf-muted",children:O?`${be(O,"saved outfit")} \xB7 seen ${he(A.data.user?.lastSyncAt??Date.now())}`:"Browse their saved outfits"})]}),d("span",{class:"rf-pop-go",children:d(F,{n:"right",size:18})})]}):d("div",{class:"rf-pop-now idle",children:[d(F,{n:"outfit",size:20}),d("span",{children:["Open any Roblox profile and look for ",d("b",{children:"Outfits"})," (or ",d("b",{children:"Saved Outfits"}),"), or search for someone above."]})]}),N&&d("p",{class:"rf-pop-msg",role:"alert",children:[d(F,{n:"warn",size:14}),"RoFit\u2019s background worker didn\u2019t answer. Reload the extension from chrome://extensions if this keeps happening."]}),U.length>0&&d("section",{class:"rf-pop-sec","aria-label":"Recently viewed",children:[d("h2",{children:"Recently viewed"}),U.map((m,v)=>d("button",{class:"rf-pop-row",style:{"--i":v},onClick:()=>b(ve(m.id)),children:[d("span",{class:"rf-pop-av",children:m.name.slice(0,1).toUpperCase()}),d("span",{class:"rf-pop-name",children:[m.name,d("small",{children:[Nr(m)," \xB7 ",he(m.lastSeen)]})]}),d(F,{n:"right",size:16,class:"rf-pop-chev"})]},m.id))]})]}),d("footer",{class:"rf-pop-foot",children:d("button",{class:"rf-pop-lib",onClick:()=>k("library"),children:[d(F,{n:"library",size:16}),d("span",{children:"Library"}),d("em",{children:h.data!=null?be(h.data,"saved outfit"):""}),d(F,{n:"right",size:16,class:"rf-pop-chev"})]})})]})}at(d(fa,{}),document.getElementById("root"));})();
