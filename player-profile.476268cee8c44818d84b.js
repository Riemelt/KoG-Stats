(()=>{var t,e={9030:(t,e,s)=>{"use strict";s(4669);var a=s(3132),n=s(9717),i=s(6295);const r=["Total","Extreme","Insane","Hard","Main","Easy","Solo","Mod"];function o(t){const e=location.pathname.split("/");return e[e.length-1]=t,e.join("/")}const l=(t,e)=>{let s;return function(...a){s&&clearTimeout(s),s=setTimeout((()=>{t.call(this,...a),clearTimeout(s)}),e)}};var h=s(7485),c=s.n(h),d=s(4627);class p{static compareMapEntries(t,e){const s=t.getOptions().rank-e.getOptions().rank;if(0!==s)return s;const a=t.getOptions().category,n=e.getOptions().category,i=r.indexOf(a)-r.indexOf(n);return 0!==i?i:0}constructor(t,{records:e,withPlayers:s=!1,withDate:a=!1,shouldSort:n=!0,isMapsPage:i=!1,withAuthors:r=!1,withReleaseDate:l=!1}){this.options={records:e,withPlayers:s,withDate:a,isMapsPage:i,withAuthors:r,withReleaseDate:l},this.className="map-records",this.$component=t.find(`.js-${this.className}`),this.$tableBody=this.$component.find(`.js-${this.className}__table-body`),this.recordEntries=this.options.records.map((t=>new class{constructor(t){this.options=t,this.className="map-records",this.$component=this.initHtml(),this.$rank=this.$component.find(`.js-${this.className}__table-cell-rank`)}getOptions(){return this.options.record}update(t){this.$rank.html(`${t}`)}getHtml(){return this.$component}getPlayerProfileUrl(t){const e=new URLSearchParams(window.location.search);return e.set("player",t),o(`player-profile.html?${e.toString()}`)}getMapProfileUrl(t){const e=new URLSearchParams(window.location.search);return e.set("map",t),o(`map-profile.html?${e.toString()}`)}initStar(t){return`\n      <span class="${this.className}__star material-icons-outlined ${t?`${this.className}__star_not-active`:""}">star</span>\n    `}initStars(t){return new Array(5).fill(0).map(((e,s)=>this.initStar(t-s<=0))).join("")}initHtml(){const t=this.options.record.category.toLowerCase(),e=void 0===this.options.record.time?"unfinished":function(t){const e=Math.round(100*t%100),s=Math.floor(t);return[Math.floor(s/3600),Math.floor(s/60)%60,s%60,e].map((t=>t<10?"0"+t:t)).filter(((t,e)=>"00"!==t||e>0)).reduce(((t,e,s,a)=>{const n=s+1!==a.length?":":".";return 0===s?`${e}`:`${t}${n}${e}`}),"")}(this.options.record.time);let s="";void 0!==this.options.record.players&&(s+=`\n        <td class="${this.className}__table-cell-players ${0===this.options.record.players.length?`${this.className}__table-cell-players_no-data`:""}">\n          ${this.options.record.players.length?this.options.record.players.map((t=>`\n            <a\n              class="${this.className}__player-link"\n              href="${this.getPlayerProfileUrl(t)}"\n            >\n              ${t}\n            </a>\n          `)).join(`\n            <span class="${this.className}__player-separator">\n              &\n            </span>\n            `):"unfinished"}\n        </td>\n      `);const a=this.options.withAuthors?`\n      <td class="${this.className}__table-cell-authors">\n        ${this.options.record.authors.join(", ")}\n      </td>\n    `:"",n=this.options.record.date,i=void 0===n?"no data":new Date(n),r=this.options.withDate?`\n      <td\n        class="${this.className}__table-cell-date ${i instanceof Date?"":`${this.className}__table-cell-date_no-data`}\n         js-${this.className}__table-cell-date"\n      >\n        <span class="${this.className}__date-text">\n          ${i instanceof Date?c()(Date.parse(i.toString())).fromNow():i}\n        </span>\n        ${i instanceof Date?`\n            <div class="${this.className}__date-tooltip">\n              ${i instanceof Date?i.toLocaleDateString("en-GB"):i}\n            </div>`:""}\n      </td>\n    `:"",o=this.options.record.releaseDate,l=new Date(o),h=this.options.withReleaseDate?`\n        <td\n          class="${this.className}__table-cell-date ${"Invalid Date"!==l.toString()?"":`${this.className}__table-cell-date_no-data`}\n           js-${this.className}__table-cell-date"\n        >\n          <span class="${this.className}__date-text">\n            ${"Invalid Date"!==l.toString()?c()(Date.parse(l.toString())).fromNow():"no data"}\n          </span>\n          ${"Invalid Date"!==l.toString()?`\n              <div class="${this.className}__date-tooltip">\n                ${"Invalid Date"!==l.toString()?l.toLocaleDateString("en-GB"):l}\n              </div>`:""}\n        </td>\n      `:"";return d(`\n      <tr class="${this.className}__table-row js-${this.className}__table-row ${this.className}__table-row_body">\n        <td class="${this.className}__table-cell-rank js-${this.className}__table-cell-rank ${this.options.isMapsPage?"":`${this.className}__table-cell-rank_rank${this.options.record.rank}`}">\n          ${this.options.record.rank}\n        </td>\n        <td class="${this.className}__table-cell-name">\n          <a class="${this.className}__table-cell-name-link" href="${this.getMapProfileUrl(this.options.record.name)}">\n            ${this.options.record.name}\n          </a>\n        </td>\n        ${a}\n        ${s}\n        ${h}\n        <td class="${this.className}__table-cell-category ${this.className}__table-cell-category_${t} js-${this.className}__table-cell-category">\n          <div class="${this.className}__category-wrapper">\n            <div class="${this.className}__category-title">\n              ${this.options.record.category}\n            </div>\n            <div class="${this.className}__category-stats">\n              <div class="${this.className}__map-points">\n                ${this.options.record.points} point${this.options.record.points>1?"s":""}\n              </div>\n              <div class="${this.className}__map-stars">\n                ${this.initStars(this.options.record.stars)}\n              </div>\n            </div>\n          </di>\n        </td>\n        ${r}\n        <td class="${this.className}__table-cell-time js-${this.className}__table-cell-time ${"unfinished"===e?`${this.className}__table-cell-time_no-data`:""}">\n          ${e}\n        </td>\n      </tr>\n    `)}}({withDate:a,record:t,isMapsPage:i,withAuthors:r,withReleaseDate:l}))),n&&this.sortRecordEntries()}generateRecordEntries({mapCategory:t="Total",mapName:e="",playerName:s="",author:a="",tiedPlayersFrom:n=null,tiedPlayersTo:i=null}){const r=this.recordEntries.filter((r=>{const{category:o,name:l,players:h=[],authors:c}=r.getOptions(),d=null===n||h.length>=n,p=null===i||h.length<=i;return("Total"===t||o===t)&&d&&p&&this.doesIncludeMap(l,e)&&this.doesIncludePlayer(s,h)&&this.doesIncludePlayer(a,c)}));return this.options.isMapsPage&&r.forEach(((t,e)=>t.update(e+1))),r}render(t){this.$tableBody.empty(),t.forEach((t=>{const e=t.getHtml();this.$tableBody.append(e)}))}doesIncludeMap(t,e){return t.toLowerCase().includes(e.trim().toLowerCase())}doesIncludePlayer(t,e){return""===t||e.some((e=>e.toLowerCase().includes(t.trim().toLowerCase())))}sortRecordEntries(){this.recordEntries.sort(p.compareMapEntries)}}const m=p;var u=s(9284),j=s(1263);!function(t){const e=s(8525),r=s(559),o=new URLSearchParams(window.location.search),h=Object.fromEntries(o.entries()),c=void 0===h.player?"":h.player,d=r.data.filter((({topFinishes:t})=>t.some((({name:t})=>t===c)))).map((({topFinishes:t,...e})=>{const s=t.filter((({name:t})=>c===t))[0],{time:a,rank:n,date:i}=s,r=t.filter((t=>t.time===a)).map((t=>t.name));return{...e,time:a,rank:n,players:r,date:i}})),p={playerName:c,playerRecords:d,sortBy:"Total",...e};new a.Z(t(".js-layout"),{header:{date:r.date}}),new class{category="Total";mapName="";playerName="";author="";tiedPlayersFrom=null;tiedPlayersTo=null;constructor(t,e){this.options=e,this.className="player-profile",this.$component=t,this.category=this.options.sortBy,this.$title=this.$component.find(`.js-${this.className}__title`),this.$title.attr("href",`https://kog.tw/#p=players&player=${this.options.playerName}`),this.$titlePlayerName=this.$title.find(`.js-${this.className}__title-text`),this.$titlePlayerName.html(`${this.options.playerName}'s map records`),this.$categoryMenu=this.$component.find(`.js-${this.className}__category-menu`),this.$resetButton=this.$component.find(`.js-${this.className}__reset-button`);const s={...this.options.categoryMenu,sortBy:this.options.sortBy,onChange:this.handleMenuChange.bind(this)};this.categoryMenu=new n.Z(this.$categoryMenu,s),new u.Z(this.$component.find(`.js-${this.className}__expander`)),this.inputMapName=new j.Z(this.$component.find(`.js-${this.className}__input-map-name`),{onChange:l(this.handleInputMapNameChange.bind(this),250)}),this.inputPlayerName=new j.Z(this.$component.find(`.js-${this.className}__input-player-name`),{onChange:l(this.handleInputPlayerNameChange.bind(this),250)}),this.inputAuthorName=new j.Z(this.$component.find(`.js-${this.className}__input-author-name`),{onChange:l(this.handleInputAuthorNameChange.bind(this),250)}),this.inputTiedPlayersFrom=new j.Z(this.$component.find(`.js-${this.className}__input-tied-players-from`),{onChange:l(this.handleInputTiedPlayersFromChange.bind(this),250)}),this.inputTiedPlayersTo=new j.Z(this.$component.find(`.js-${this.className}__input-tied-players-to`),{onChange:l(this.handleInputTiedPlayersToChange.bind(this),250)}),this.mapRecords=new m(this.$component.find(`.js-${this.className}__map-records`),{...this.options.mapRecords,records:this.options.playerRecords}),this.pagination=new i.Z(this.$component.find(`.js-${this.className}__pagination`)),this.setHandlers(),this.render()}setHandlers(){this.$resetButton.on("click.resetButton",this.handleResetButtonClick.bind(this))}handleResetButtonClick(){this.mapName="",this.playerName="",this.author="",this.category="Total",this.inputMapName.setValue(this.mapName),this.inputPlayerName.setValue(this.playerName),this.inputAuthorName.setValue(this.author),this.categoryMenu.setCategory(this.category),this.tiedPlayersFrom=null,this.inputTiedPlayersFrom.setValue(""),this.tiedPlayersTo=null,this.inputTiedPlayersTo.setValue(""),this.render()}handleInputPlayerNameChange(t){this.playerName=t,this.render()}handleInputMapNameChange(t){this.mapName=t,this.render()}handleInputAuthorNameChange(t){this.author=t,this.render()}handleInputTiedPlayersFromChange(t){const e=parseInt(t),s=Number.isNaN(e)?null:e;this.tiedPlayersFrom=s,this.render()}handleInputTiedPlayersToChange(t){const e=parseInt(t),s=Number.isNaN(e)?null:e;this.tiedPlayersTo=s,this.render()}handleMenuChange(t){this.category=t,this.render()}render(){this.pagination.render(this.mapRecords.generateRecordEntries({mapCategory:this.category,mapName:this.mapName,playerName:this.playerName,author:this.author,tiedPlayersFrom:this.tiedPlayersFrom,tiedPlayersTo:this.tiedPlayersTo}),this.mapRecords.render.bind(this.mapRecords))}}(t(".js-player-profile"),p)}(s(4627))},5126:(t,e,s)=>{var a={"./af":5436,"./af.js":5436,"./ar":7662,"./ar-dz":3578,"./ar-dz.js":3578,"./ar-kw":9535,"./ar-kw.js":9535,"./ar-ly":5801,"./ar-ly.js":5801,"./ar-ma":4784,"./ar-ma.js":4784,"./ar-sa":9050,"./ar-sa.js":9050,"./ar-tn":2042,"./ar-tn.js":2042,"./ar.js":7662,"./az":1071,"./az.js":1071,"./be":8369,"./be.js":8369,"./bg":7874,"./bg.js":7874,"./bm":8393,"./bm.js":8393,"./bn":2722,"./bn-bd":643,"./bn-bd.js":643,"./bn.js":2722,"./bo":5165,"./bo.js":5165,"./br":6645,"./br.js":6645,"./bs":5870,"./bs.js":5870,"./ca":3993,"./ca.js":3993,"./cs":3627,"./cs.js":3627,"./cv":8957,"./cv.js":8957,"./cy":5770,"./cy.js":5770,"./da":4649,"./da.js":4649,"./de":9084,"./de-at":8709,"./de-at.js":8709,"./de-ch":1320,"./de-ch.js":1320,"./de.js":9084,"./dv":3575,"./dv.js":3575,"./el":6395,"./el.js":6395,"./en-au":3826,"./en-au.js":3826,"./en-ca":3769,"./en-ca.js":3769,"./en-gb":4155,"./en-gb.js":4155,"./en-ie":1518,"./en-ie.js":1518,"./en-il":4043,"./en-il.js":4043,"./en-in":8404,"./en-in.js":8404,"./en-nz":9220,"./en-nz.js":9220,"./en-sg":9133,"./en-sg.js":9133,"./eo":8648,"./eo.js":8648,"./es":8465,"./es-do":6734,"./es-do.js":6734,"./es-mx":1910,"./es-mx.js":1910,"./es-us":7093,"./es-us.js":7093,"./es.js":8465,"./et":3742,"./et.js":3742,"./eu":1088,"./eu.js":1088,"./fa":3554,"./fa.js":3554,"./fi":3996,"./fi.js":3996,"./fil":368,"./fil.js":368,"./fo":6132,"./fo.js":6132,"./fr":1265,"./fr-ca":1467,"./fr-ca.js":1467,"./fr-ch":8279,"./fr-ch.js":8279,"./fr.js":1265,"./fy":8841,"./fy.js":8841,"./ga":5254,"./ga.js":5254,"./gd":2520,"./gd.js":2520,"./gl":4898,"./gl.js":4898,"./gom-deva":5171,"./gom-deva.js":5171,"./gom-latn":3681,"./gom-latn.js":3681,"./gu":2613,"./gu.js":2613,"./he":2716,"./he.js":2716,"./hi":1315,"./hi.js":1315,"./hr":4577,"./hr.js":4577,"./hu":6736,"./hu.js":6736,"./hy-am":3417,"./hy-am.js":3417,"./id":8890,"./id.js":8890,"./is":4468,"./is.js":4468,"./it":5652,"./it-ch":4064,"./it-ch.js":4064,"./it.js":5652,"./ja":4511,"./ja.js":4511,"./jv":3069,"./jv.js":3069,"./ka":5258,"./ka.js":5258,"./kk":7086,"./kk.js":7086,"./km":4125,"./km.js":4125,"./kn":7197,"./kn.js":7197,"./ko":5508,"./ko.js":5508,"./ku":8195,"./ku.js":8195,"./ky":3971,"./ky.js":3971,"./lb":9651,"./lb.js":9651,"./lo":8072,"./lo.js":8072,"./lt":2146,"./lt.js":2146,"./lv":4824,"./lv.js":4824,"./me":9674,"./me.js":9674,"./mi":6500,"./mi.js":6500,"./mk":5111,"./mk.js":5111,"./ml":5597,"./ml.js":5597,"./mn":3610,"./mn.js":3610,"./mr":7565,"./mr.js":7565,"./ms":7918,"./ms-my":4736,"./ms-my.js":4736,"./ms.js":7918,"./mt":5947,"./mt.js":5947,"./my":5624,"./my.js":5624,"./nb":8607,"./nb.js":8607,"./ne":5457,"./ne.js":5457,"./nl":4041,"./nl-be":3439,"./nl-be.js":3439,"./nl.js":4041,"./nn":2457,"./nn.js":2457,"./oc-lnc":6236,"./oc-lnc.js":6236,"./pa-in":8772,"./pa-in.js":8772,"./pl":3219,"./pl.js":3219,"./pt":9315,"./pt-br":376,"./pt-br.js":376,"./pt.js":9315,"./ro":3551,"./ro.js":3551,"./ru":878,"./ru.js":878,"./sd":3332,"./sd.js":3332,"./se":5268,"./se.js":5268,"./si":7050,"./si.js":7050,"./sk":6201,"./sk.js":6201,"./sl":6675,"./sl.js":6675,"./sq":7632,"./sq.js":7632,"./sr":3419,"./sr-cyrl":617,"./sr-cyrl.js":617,"./sr.js":3419,"./ss":5321,"./ss.js":5321,"./sv":2765,"./sv.js":2765,"./sw":2831,"./sw.js":2831,"./ta":7530,"./ta.js":7530,"./te":6726,"./te.js":6726,"./tet":5763,"./tet.js":5763,"./tg":8165,"./tg.js":8165,"./th":9496,"./th.js":9496,"./tk":8573,"./tk.js":8573,"./tl-ph":4742,"./tl-ph.js":4742,"./tlh":4780,"./tlh.js":4780,"./tr":835,"./tr.js":835,"./tzl":2840,"./tzl.js":2840,"./tzm":6757,"./tzm-latn":442,"./tzm-latn.js":442,"./tzm.js":6757,"./ug-cn":4413,"./ug-cn.js":4413,"./uk":4800,"./uk.js":4800,"./ur":1809,"./ur.js":1809,"./uz":7448,"./uz-latn":3337,"./uz-latn.js":3337,"./uz.js":7448,"./vi":3528,"./vi.js":3528,"./x-pseudo":581,"./x-pseudo.js":581,"./yo":7658,"./yo.js":7658,"./zh-cn":5526,"./zh-cn.js":5526,"./zh-hk":2809,"./zh-hk.js":2809,"./zh-mo":7892,"./zh-mo.js":7892,"./zh-tw":9204,"./zh-tw.js":9204};function n(t){var e=i(t);return s(e)}function i(t){if(!s.o(a,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return a[t]}n.keys=function(){return Object.keys(a)},n.resolve=i,t.exports=n,n.id=5126},8525:t=>{"use strict";t.exports=JSON.parse('{"mapRecords":{"withPlayers":true,"withDate":true,"withAuthors":true,"withReleaseDate":true},"categoryMenu":{"categories":["Total","Extreme","Insane","Hard","Main","Easy","Solo","Mod"]},"expander":{"title":"Filtering options"},"inputMapName":{"title":"Filter by map","placeholder":"Map","icon":"search"},"inputPlayerName":{"title":"Filter by player","placeholder":"Player","icon":"search"},"inputAuthorName":{"title":"Filter by author","placeholder":"Author","icon":"search"},"inputTiedPlayersFrom":{"title":"Tied players from","type":"number"},"inputTiedPlayersTo":{"title":"Tied players to","type":"number"}}')}},s={};function a(t){var n=s[t];if(void 0!==n)return n.exports;var i=s[t]={id:t,loaded:!1,exports:{}};return e[t].call(i.exports,i,i.exports,a),i.loaded=!0,i.exports}a.m=e,t=[],a.O=(e,s,n,i)=>{if(!s){var r=1/0;for(c=0;c<t.length;c++){for(var[s,n,i]=t[c],o=!0,l=0;l<s.length;l++)(!1&i||r>=i)&&Object.keys(a.O).every((t=>a.O[t](s[l])))?s.splice(l--,1):(o=!1,i<r&&(r=i));if(o){t.splice(c--,1);var h=n();void 0!==h&&(e=h)}}return e}i=i||0;for(var c=t.length;c>0&&t[c-1][2]>i;c--)t[c]=t[c-1];t[c]=[s,n,i]},a.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return a.d(e,{a:e}),e},a.d=(t,e)=>{for(var s in e)a.o(e,s)&&!a.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},a.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),a.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),a.nmd=t=>(t.paths=[],t.children||(t.children=[]),t),(()=>{var t;a.g.importScripts&&(t=a.g.location+"");var e=a.g.document;if(!t&&e&&(e.currentScript&&(t=e.currentScript.src),!t)){var s=e.getElementsByTagName("script");if(s.length)for(var n=s.length-1;n>-1&&!t;)t=s[n--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),a.p=t})(),(()=>{var t={526:0};a.O.j=e=>0===t[e];var e=(e,s)=>{var n,i,[r,o,l]=s,h=0;if(r.some((e=>0!==t[e]))){for(n in o)a.o(o,n)&&(a.m[n]=o[n]);if(l)var c=l(a)}for(e&&e(s);h<r.length;h++)i=r[h],a.o(t,i)&&t[i]&&t[i][0](),t[i]=0;return a.O(c)},s=self.webpackChunk=self.webpackChunk||[];s.forEach(e.bind(null,0)),s.push=e.bind(null,s.push.bind(s))})();var n=a.O(void 0,[627,202,871,215],(()=>a(9030)));n=a.O(n)})();