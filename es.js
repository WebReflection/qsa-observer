self.qsaObserver=function(e){"use strict";const t=!0,l=!1,r="querySelectorAll";function s(e){this.observe(e,{subtree:t,childList:t})}const o="querySelectorAll",{document:d,MutationObserver:n,Set:a,WeakMap:c}=self,h=e=>o in e,{filter:u}=[];return e.default=e=>{const f=new c,i=(t,l)=>{let r;if(l)for(let s,o=(e=>e.matches||e.webkitMatchesSelector||e.msMatchesSelector)(t),d=0,{length:n}=v;d<n;d++)o.call(t,s=v[d])&&(f.has(t)||f.set(t,new a),r=f.get(t),r.has(s)||(r.add(s),e.handle(t,l,s)));else f.has(t)&&(r=f.get(t),f.delete(t),r.forEach((r=>{e.handle(t,l,r)})))},g=(e,t=!0)=>{for(let l=0,{length:r}=e;l<r;l++)i(e[l],t)},{query:v}=e,b=e.root||d,S=((e,o,d)=>{const n=(l,s,o,d,a)=>{for(let c=0,{length:h}=l;c<h;c++){const h=l[c];(a||r in h)&&(d?s.has(h)||(s.add(h),o.delete(h),e(h,d)):o.has(h)||(o.add(h),s.delete(h),e(h,d)),a||n(h[r]("*"),s,o,d,t))}},a=new(d||MutationObserver)((e=>{for(let r=new Set,s=new Set,o=0,{length:d}=e;o<d;o++){const{addedNodes:d,removedNodes:a}=e[o];n(a,r,s,l,l),n(d,r,s,t,l)}}));return a.add=s,a.add(o||document),a})(i,b,n);return v.length&&g(b[o](v)),{drop:e=>{for(let t=0,{length:l}=e;t<l;t++)f.delete(e[t])},flush:()=>{const e=S.takeRecords();for(let t=0,{length:l}=e;t<l;t++)g(u.call(e[t].removedNodes,h),!1),g(u.call(e[t].addedNodes,h),!0)},observer:S,parse:g}},e}({}).default;
