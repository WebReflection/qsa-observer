self.qsaObserver=function(e){"use strict";var t=!0,r=!1,n="querySelectorAll",o="querySelectorAll",a=self,l=a.document,d=a.MutationObserver,s=a.Set,u=a.WeakMap,c=function(e){return o in e},f=[].filter;return e.default=function(e){var a=new u,i=function(t,r){var n;if(r)for(var o,l=function(e){return e.matches||e.webkitMatchesSelector||e.msMatchesSelector}(t),d=0,u=g.length;d<u;d++)l.call(t,o=g[d])&&(a.has(t)||a.set(t,new s),(n=a.get(t)).has(o)||(n.add(o),e.handle(t,r,o)));else a.has(t)&&(n=a.get(t),a.delete(t),n.forEach((function(n){e.handle(t,r,n)})))},h=function(e){for(var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=0,n=e.length;r<n;r++)i(e[r],t)},v=e.root||l,g=e.query,b=function(e,o,a){var l=function r(o,a,l,d,s){for(var u=0,c=o.length;u<c;u++){var f=o[u];(s||n in f)&&(d?a.has(f)||(a.add(f),l.delete(f),e(f,d)):l.has(f)||(l.add(f),a.delete(f),e(f,d)),s||r((f.shadowRoot||f)[n]("*"),a,l,d,t))}},d=new(a||MutationObserver)((function(e){for(var n=new Set,o=new Set,a=0,d=e.length;a<d;a++){var s=e[a],u=s.addedNodes,c=s.removedNodes;l(c,n,o,r,r),l(u,n,o,t,r)}}));return d.observe(o||document,{subtree:t,childList:t}),d}(i,v,d);return g.length&&h(v[o](g)),{drop:function(e){for(var t=0,r=e.length;t<r;t++)a.delete(e[t])},flush:function(){for(var e=b.takeRecords(),t=0,r=e.length;t<r;t++)h(f.call(e[t].removedNodes,c),!1),h(f.call(e[t].addedNodes,c),!0)},observer:b,parse:h}},Object.defineProperty(e,"__esModule",{value:!0}),e}({}).default;