self.qsaObserver=function(e){"use strict";var t=function(e){return"querySelectorAll"in e},r=[].filter;return e.default=function(e){var n=new Set,l=new WeakMap,o=function(n){var l=e.query;if(l.length)for(var o=0,c=n.length;o<c;o++)a(r.call(n[o].addedNodes,t),!0,l),a(r.call(n[o].removedNodes,t),!1,l)},a=function t(r,o,a){for(var u,s,f,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:new Set,d=function(d,h,v,g,S){if(!i.has(v=r[g])){if(i.add(v),d=l.has(v),o)for(var q,b=d?l.get(v):n,w=c(v),y=0,m=a.length;y<m;y++)!b.has(q=a[y])&&w.call(v,q)&&(d||(d=!d,l.set(v,b=new Set)),b.add(q),e.handle(v,o,q));else d&&(h=l.get(v),l.delete(v),h.forEach((function(t){e.handle(v,o,t)})));t(v.querySelectorAll(a),o,a,i)}u=d,s=h,f=v},h=0,v=r.length;h<v;h++)d(u,s,f,h)},c=function(e){return e.matches||e.webkitMatchesSelector||e.msMatchesSelector},u=function(t){var r=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];a(t,r,e.query)},s=new MutationObserver(o),f=e.root||document,i=e.query;return s.observe(f,{childList:!0,subtree:!0}),i.length&&u(f.querySelectorAll(i)),{drop:function(e){for(var t=0,r=e.length;t<r;t++)l.delete(e[t])},flush:function(){o(s.takeRecords())},observer:s,parse:u}},e}({}).default;