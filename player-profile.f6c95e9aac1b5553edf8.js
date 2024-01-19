(()=>{var s,t={9030:(s,t,e)=>{"use strict";e(4669);var a=e(3132),n=e(9717),r=e(6295);const i=["Total","Extreme","Insane","Hard","Main","Easy","Solo","Mod"],o=(s,t)=>{let e;return function(...a){e&&clearTimeout(e),e=setTimeout((()=>{s.call(this,...a),clearTimeout(e)}),t)}};var l=e(7485),c=e.n(l),h=e(4627);class d{static compareMapEntries(s,t){const e=s.getOptions().rank-t.getOptions().rank;if(0!==e)return e;const a=s.getOptions().category,n=t.getOptions().category,r=i.indexOf(a)-i.indexOf(n);return 0!==r?r:0}constructor(s,{records:t,withPlayers:e=!1,withDate:a=!1,shouldSort:n=!0,isMapsPage:r=!1}){this.options={records:t,withPlayers:e,withDate:a,isMapsPage:r},this.className="map-records",this.$component=s.find(`.js-${this.className}`),this.$tableBody=this.$component.find(`.js-${this.className}__table-body`),this.recordEntries=this.options.records.map((s=>new class{constructor(s){this.options=s,this.className="map-records",this.$component=this.initHtml(),this.$rank=this.$component.find(`.js-${this.className}__table-cell-rank`)}getOptions(){return this.options.record}update(s){this.$rank.html(`${s}`)}getHtml(){return this.$component}getPlayerProfileUrl(s){const t=new URLSearchParams(window.location.search);return t.set("player",s),function(s){const t=location.pathname.split("/");return t[t.length-1]=s,t.join("/")}(`player-profile.html?${t.toString()}`)}initHtml(){const s=`https://kog.tw/#p=maps&map=${this.options.record.name}`,t=this.options.record.category.toLowerCase(),e=void 0===this.options.record.time?"unfinished":function(s){const t=Math.round(100*s%100),e=Math.floor(s);return[Math.floor(e/3600),Math.floor(e/60)%60,e%60,t].map((s=>s<10?"0"+s:s)).filter(((s,t)=>"00"!==s||t>0)).reduce(((s,t,e,a)=>{const n=e+1!==a.length?":":".";return 0===e?`${t}`:`${s}${n}${t}`}),"")}(this.options.record.time);let a="";void 0!==this.options.record.players&&(a+=`\n        <td class="${this.className}__table-cell-players ${0===this.options.record.players.length?`${this.className}__table-cell-players_no-data`:""}">\n          ${this.options.record.players.length?this.options.record.players.map((s=>`\n            <a\n              class="${this.className}__player-link"\n              href="${this.getPlayerProfileUrl(s)}"\n            >\n              ${s}\n            </a>\n          `)).join(`\n            <span class="${this.className}__player-separator">\n              &\n            </span>\n            `):"unfinished"}\n        </td>\n      `);const n=this.options.record.date,r=void 0===n?"no data":new Date(n),i=this.options.withDate?`\n      <td\n        class="${this.className}__table-cell-date ${r instanceof Date?"":`${this.className}__table-cell-date_no-data`}\n         js-${this.className}__table-cell-date"\n      >\n        <span class="${this.className}__date-text">\n          ${r instanceof Date?c()(Date.parse(r.toString())).fromNow():r}\n        </span>\n        ${r instanceof Date?`\n            <div class="${this.className}__date-tooltip">\n              ${r instanceof Date?r.toLocaleDateString("en-GB"):r}\n            </div>`:""}\n      </td>\n    `:"";return h(`\n      <tr class="${this.className}__table-row js-${this.className}__table-row ${this.className}__table-row_body">\n        <td class="${this.className}__table-cell-rank js-${this.className}__table-cell-rank ${this.options.isMapsPage?"":`${this.className}__table-cell-rank_rank${this.options.record.rank}`}">\n          ${this.options.record.rank}\n        </td>\n        <td class="${this.className}__table-cell-name">\n          <a class="${this.className}__table-cell-name-link" href="${s}" target="_blank" rel="noopener noreferrer">\n            ${this.options.record.name}\n          </a>\n        </td>\n        ${a}\n        <td class="${this.className}__table-cell-category ${this.className}__table-cell-category_${t} js-${this.className}__table-cell-category">\n          ${this.options.record.category}\n        </td>\n        ${i}\n        <td class="${this.className}__table-cell-time js-${this.className}__table-cell-time ${"unfinished"===e?`${this.className}__table-cell-time_no-data`:""}">\n          ${e}\n        </td>\n      </tr>\n    `)}}({withDate:a,record:s,isMapsPage:r}))),n&&this.sortRecordEntries()}generateRecordEntries(s,t,e=""){const a=this.recordEntries.filter((a=>{const{category:n,name:r,players:i}=a.getOptions();return("Total"===s||n===s)&&this.doesIncludeMap(r,t)&&this.doesIncludePlayer(e,i)}));return this.options.isMapsPage&&a.forEach(((s,t)=>s.update(t+1))),a}render(s){this.$tableBody.empty(),s.forEach((s=>{const t=s.getHtml();this.$tableBody.append(t)}))}doesIncludeMap(s,t){return s.toLowerCase().includes(t.trim().toLowerCase())}doesIncludePlayer(s,t){return""===s||t.some((t=>t.toLowerCase().includes(s.trim().toLowerCase())))}sortRecordEntries(){this.recordEntries.sort(d.compareMapEntries)}}const p=d;var m=e(9284),j=e(1263);!function(s){const t=e(8525),i=e(559),l=new URLSearchParams(window.location.search),c=Object.fromEntries(l.entries()),h=void 0===c.player?"":c.player,d=i.data.filter((({topFinishes:s})=>s.some((({name:s})=>s===h)))).map((({topFinishes:s,...t})=>{const e=s.filter((({name:s})=>h===s))[0],{time:a,rank:n,date:r}=e,i=s.filter((s=>s.time===a)).map((s=>s.name));return{...t,time:a,rank:n,players:i,date:r}})),u={playerName:h,playerRecords:d,sortBy:"Total",...t};new a.Z(s(".js-layout"),{header:{date:i.date}}),new class{category="Total";name="";constructor(s,t){this.options=t,this.className="player-profile",this.$component=s,this.category=this.options.sortBy,this.$title=this.$component.find(`.js-${this.className}__title`),this.$title.attr("href",`https://kog.tw/#p=players&player=${this.options.playerName}`),this.$titlePlayerName=this.$title.find(`.js-${this.className}__title-text`),this.$titlePlayerName.html(`${this.options.playerName}'s map records`),this.$categoryMenu=this.$component.find(`.js-${this.className}__category-menu`),this.$resetButton=this.$component.find(`.js-${this.className}__reset-button`);const e={...this.options.categoryMenu,sortBy:this.options.sortBy,onChange:this.handleMenuChange.bind(this)};this.categoryMenu=new n.Z(this.$categoryMenu,e),new m.Z(this.$component.find(`.js-${this.className}__expander`)),this.inputName=new j.Z(this.$component.find(`.js-${this.className}__input-name`),{onChange:o(this.handleInputNameChange.bind(this),250)}),this.mapRecords=new p(this.$component.find(`.js-${this.className}__map-records`),{...this.options.mapRecords,records:this.options.playerRecords}),this.pagination=new r.Z(this.$component.find(`.js-${this.className}__pagination`)),this.setHandlers(),this.render()}setHandlers(){this.$resetButton.on("click.resetButton",this.handleResetButtonClick.bind(this))}handleResetButtonClick(){this.name="",this.category="Total",this.inputName.setValue(this.name),this.categoryMenu.setCategory(this.category),this.render()}handleInputNameChange(s){this.name=s,this.render()}handleMenuChange(s){this.category=s,this.render()}render(){this.pagination.render(this.mapRecords.generateRecordEntries(this.category,this.name),this.mapRecords.render.bind(this.mapRecords))}}(s(".js-player-profile"),u)}(e(4627))},5126:(s,t,e)=>{var a={"./af":5436,"./af.js":5436,"./ar":7662,"./ar-dz":3578,"./ar-dz.js":3578,"./ar-kw":9535,"./ar-kw.js":9535,"./ar-ly":5801,"./ar-ly.js":5801,"./ar-ma":4784,"./ar-ma.js":4784,"./ar-sa":9050,"./ar-sa.js":9050,"./ar-tn":2042,"./ar-tn.js":2042,"./ar.js":7662,"./az":1071,"./az.js":1071,"./be":8369,"./be.js":8369,"./bg":7874,"./bg.js":7874,"./bm":8393,"./bm.js":8393,"./bn":2722,"./bn-bd":643,"./bn-bd.js":643,"./bn.js":2722,"./bo":5165,"./bo.js":5165,"./br":6645,"./br.js":6645,"./bs":5870,"./bs.js":5870,"./ca":3993,"./ca.js":3993,"./cs":3627,"./cs.js":3627,"./cv":8957,"./cv.js":8957,"./cy":5770,"./cy.js":5770,"./da":4649,"./da.js":4649,"./de":9084,"./de-at":8709,"./de-at.js":8709,"./de-ch":1320,"./de-ch.js":1320,"./de.js":9084,"./dv":3575,"./dv.js":3575,"./el":6395,"./el.js":6395,"./en-au":3826,"./en-au.js":3826,"./en-ca":3769,"./en-ca.js":3769,"./en-gb":4155,"./en-gb.js":4155,"./en-ie":1518,"./en-ie.js":1518,"./en-il":4043,"./en-il.js":4043,"./en-in":8404,"./en-in.js":8404,"./en-nz":9220,"./en-nz.js":9220,"./en-sg":9133,"./en-sg.js":9133,"./eo":8648,"./eo.js":8648,"./es":8465,"./es-do":6734,"./es-do.js":6734,"./es-mx":1910,"./es-mx.js":1910,"./es-us":7093,"./es-us.js":7093,"./es.js":8465,"./et":3742,"./et.js":3742,"./eu":1088,"./eu.js":1088,"./fa":3554,"./fa.js":3554,"./fi":3996,"./fi.js":3996,"./fil":368,"./fil.js":368,"./fo":6132,"./fo.js":6132,"./fr":1265,"./fr-ca":1467,"./fr-ca.js":1467,"./fr-ch":8279,"./fr-ch.js":8279,"./fr.js":1265,"./fy":8841,"./fy.js":8841,"./ga":5254,"./ga.js":5254,"./gd":2520,"./gd.js":2520,"./gl":4898,"./gl.js":4898,"./gom-deva":5171,"./gom-deva.js":5171,"./gom-latn":3681,"./gom-latn.js":3681,"./gu":2613,"./gu.js":2613,"./he":2716,"./he.js":2716,"./hi":1315,"./hi.js":1315,"./hr":4577,"./hr.js":4577,"./hu":6736,"./hu.js":6736,"./hy-am":3417,"./hy-am.js":3417,"./id":8890,"./id.js":8890,"./is":4468,"./is.js":4468,"./it":5652,"./it-ch":4064,"./it-ch.js":4064,"./it.js":5652,"./ja":4511,"./ja.js":4511,"./jv":3069,"./jv.js":3069,"./ka":5258,"./ka.js":5258,"./kk":7086,"./kk.js":7086,"./km":4125,"./km.js":4125,"./kn":7197,"./kn.js":7197,"./ko":5508,"./ko.js":5508,"./ku":8195,"./ku.js":8195,"./ky":3971,"./ky.js":3971,"./lb":9651,"./lb.js":9651,"./lo":8072,"./lo.js":8072,"./lt":2146,"./lt.js":2146,"./lv":4824,"./lv.js":4824,"./me":9674,"./me.js":9674,"./mi":6500,"./mi.js":6500,"./mk":5111,"./mk.js":5111,"./ml":5597,"./ml.js":5597,"./mn":3610,"./mn.js":3610,"./mr":7565,"./mr.js":7565,"./ms":7918,"./ms-my":4736,"./ms-my.js":4736,"./ms.js":7918,"./mt":5947,"./mt.js":5947,"./my":5624,"./my.js":5624,"./nb":8607,"./nb.js":8607,"./ne":5457,"./ne.js":5457,"./nl":4041,"./nl-be":3439,"./nl-be.js":3439,"./nl.js":4041,"./nn":2457,"./nn.js":2457,"./oc-lnc":6236,"./oc-lnc.js":6236,"./pa-in":8772,"./pa-in.js":8772,"./pl":3219,"./pl.js":3219,"./pt":9315,"./pt-br":376,"./pt-br.js":376,"./pt.js":9315,"./ro":3551,"./ro.js":3551,"./ru":878,"./ru.js":878,"./sd":3332,"./sd.js":3332,"./se":5268,"./se.js":5268,"./si":7050,"./si.js":7050,"./sk":6201,"./sk.js":6201,"./sl":6675,"./sl.js":6675,"./sq":7632,"./sq.js":7632,"./sr":3419,"./sr-cyrl":617,"./sr-cyrl.js":617,"./sr.js":3419,"./ss":5321,"./ss.js":5321,"./sv":2765,"./sv.js":2765,"./sw":2831,"./sw.js":2831,"./ta":7530,"./ta.js":7530,"./te":6726,"./te.js":6726,"./tet":5763,"./tet.js":5763,"./tg":8165,"./tg.js":8165,"./th":9496,"./th.js":9496,"./tk":8573,"./tk.js":8573,"./tl-ph":4742,"./tl-ph.js":4742,"./tlh":4780,"./tlh.js":4780,"./tr":835,"./tr.js":835,"./tzl":2840,"./tzl.js":2840,"./tzm":6757,"./tzm-latn":442,"./tzm-latn.js":442,"./tzm.js":6757,"./ug-cn":4413,"./ug-cn.js":4413,"./uk":4800,"./uk.js":4800,"./ur":1809,"./ur.js":1809,"./uz":7448,"./uz-latn":3337,"./uz-latn.js":3337,"./uz.js":7448,"./vi":3528,"./vi.js":3528,"./x-pseudo":581,"./x-pseudo.js":581,"./yo":7658,"./yo.js":7658,"./zh-cn":5526,"./zh-cn.js":5526,"./zh-hk":2809,"./zh-hk.js":2809,"./zh-mo":7892,"./zh-mo.js":7892,"./zh-tw":9204,"./zh-tw.js":9204};function n(s){var t=r(s);return e(t)}function r(s){if(!e.o(a,s)){var t=new Error("Cannot find module '"+s+"'");throw t.code="MODULE_NOT_FOUND",t}return a[s]}n.keys=function(){return Object.keys(a)},n.resolve=r,s.exports=n,n.id=5126},8525:s=>{"use strict";s.exports=JSON.parse('{"mapRecords":{"withPlayers":true,"withDate":true},"categoryMenu":{"categories":["Total","Extreme","Insane","Hard","Main","Easy","Solo","Mod"]},"expander":{"title":"Filtering options"},"inputName":{"title":"Filter by map name","placeholder":"Name","icon":"search"}}')}},e={};function a(s){var n=e[s];if(void 0!==n)return n.exports;var r=e[s]={id:s,loaded:!1,exports:{}};return t[s].call(r.exports,r,r.exports,a),r.loaded=!0,r.exports}a.m=t,s=[],a.O=(t,e,n,r)=>{if(!e){var i=1/0;for(h=0;h<s.length;h++){for(var[e,n,r]=s[h],o=!0,l=0;l<e.length;l++)(!1&r||i>=r)&&Object.keys(a.O).every((s=>a.O[s](e[l])))?e.splice(l--,1):(o=!1,r<i&&(i=r));if(o){s.splice(h--,1);var c=n();void 0!==c&&(t=c)}}return t}r=r||0;for(var h=s.length;h>0&&s[h-1][2]>r;h--)s[h]=s[h-1];s[h]=[e,n,r]},a.n=s=>{var t=s&&s.__esModule?()=>s.default:()=>s;return a.d(t,{a:t}),t},a.d=(s,t)=>{for(var e in t)a.o(t,e)&&!a.o(s,e)&&Object.defineProperty(s,e,{enumerable:!0,get:t[e]})},a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(s){if("object"==typeof window)return window}}(),a.o=(s,t)=>Object.prototype.hasOwnProperty.call(s,t),a.nmd=s=>(s.paths=[],s.children||(s.children=[]),s),(()=>{var s;a.g.importScripts&&(s=a.g.location+"");var t=a.g.document;if(!s&&t&&(t.currentScript&&(s=t.currentScript.src),!s)){var e=t.getElementsByTagName("script");if(e.length)for(var n=e.length-1;n>-1&&!s;)s=e[n--].src}if(!s)throw new Error("Automatic publicPath is not supported in this browser");s=s.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),a.p=s})(),(()=>{var s={526:0};a.O.j=t=>0===s[t];var t=(t,e)=>{var n,r,[i,o,l]=e,c=0;if(i.some((t=>0!==s[t]))){for(n in o)a.o(o,n)&&(a.m[n]=o[n]);if(l)var h=l(a)}for(t&&t(e);c<i.length;c++)r=i[c],a.o(s,r)&&s[r]&&s[r][0](),s[r]=0;return a.O(h)},e=self.webpackChunk=self.webpackChunk||[];e.forEach(t.bind(null,0)),e.push=t.bind(null,e.push.bind(e))})();var n=a.O(void 0,[871,202,215],(()=>a(9030)));n=a.O(n)})();