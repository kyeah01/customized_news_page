(function(t){function e(e){for(var n,o,s=e[0],c=e[1],l=e[2],u=0,d=[];u<s.length;u++)o=s[u],r[o]&&d.push(r[o][0]),r[o]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(t[n]=c[n]);p&&p(e);while(d.length)d.shift()();return i.push.apply(i,l||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],n=!0,o=1;o<a.length;o++){var s=a[o];0!==r[s]&&(n=!1)}n&&(i.splice(e--,1),t=c(c.s=a[0]))}return t}var n={},o={app:0},r={app:0},i=[];function s(t){return c.p+"js/"+({about:"about"}[t]||t)+"."+{about:"cf7e2eb5","chunk-76e88597":"33c723cc"}[t]+".js"}function c(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,c),a.l=!0,a.exports}c.e=function(t){var e=[],a={about:1,"chunk-76e88597":1};o[t]?e.push(o[t]):0!==o[t]&&a[t]&&e.push(o[t]=new Promise(function(e,a){for(var n="css/"+({about:"about"}[t]||t)+"."+{about:"05747a5c","chunk-76e88597":"92e105f3"}[t]+".css",r=c.p+n,i=document.getElementsByTagName("link"),s=0;s<i.length;s++){var l=i[s],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===n||u===r))return e()}var d=document.getElementsByTagName("style");for(s=0;s<d.length;s++){l=d[s],u=l.getAttribute("data-href");if(u===n||u===r)return e()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=e,p.onerror=function(e){var n=e&&e.target&&e.target.src||r,i=new Error("Loading CSS chunk "+t+" failed.\n("+n+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=n,delete o[t],p.parentNode.removeChild(p),a(i)},p.href=r;var v=document.getElementsByTagName("head")[0];v.appendChild(p)}).then(function(){o[t]=0}));var n=r[t];if(0!==n)if(n)e.push(n[2]);else{var i=new Promise(function(e,a){n=r[t]=[e,a]});e.push(n[2]=i);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,c.nc&&u.setAttribute("nonce",c.nc),u.src=s(t),l=function(e){u.onerror=u.onload=null,clearTimeout(d);var a=r[t];if(0!==a){if(a){var n=e&&("load"===e.type?"missing":e.type),o=e&&e.target&&e.target.src,i=new Error("Loading chunk "+t+" failed.\n("+n+": "+o+")");i.type=n,i.request=o,a[1](i)}r[t]=void 0}};var d=setTimeout(function(){l({type:"timeout",target:u})},12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(e)},c.m=t,c.c=n,c.d=function(t,e,a){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(c.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)c.d(a,n,function(e){return t[e]}.bind(null,n));return a},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/",c.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=e,l=l.slice();for(var d=0;d<l.length;d++)e(l[d]);var p=u;i.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"01e4":function(t,e,a){"use strict";var n=a("8aa5"),o=a.n(n),r={apiKey:"AIzaSyBtTyQwI0xLNukBEnzvF-BRbGHhd6LPXIE",authDomain:"test1-e4911.firebaseapp.com",databaseURL:"https://test1-e4911.firebaseio.com",projectId:"test1-e4911",storageBucket:"test1-e4911.appspot.com",messagingSenderId:"YOUR_MESSAGING_SEND_ID"};o.a.initializeApp(r),e["a"]={data:function(){return{}},Logout:function(){o.a.auth().signOut().then(function(){alert("Logout")}).catch(function(t){})},Delete:function(){var t=o.a.auth().currentUser;t.delete().then(function(){alert("Delete")}).catch(function(t){})},Userstatus:function(){var t=this;o.a.auth().onAuthStateChanged(function(e){e||t.$router.push("/")})}}},"034f":function(t,e,a){"use strict";var n=a("1356"),o=a.n(n);o.a},"0c12":function(t,e,a){"use strict";var n=a("2b0e"),o=new n["a"];e["a"]=o},1356:function(t,e,a){},"51a5":function(t,e,a){},5677:function(t,e,a){"use strict";var n=a("768a"),o=a.n(n);o.a},"56d7":function(t,e,a){"use strict";a.r(e);a("cadf"),a("551c"),a("f751"),a("097d");var n=a("2b0e"),o=a("bb71");a("da64");n["a"].use(o["a"],{iconfont:"md"});var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("Navbar"),a("LoginCheck"),a("v-content",[a("router-view")],1)],1)},i=[],s=(a("96cf"),a("3b8d")),c=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("nav",[a("v-toolbar",{attrs:{app:"",color:"white"}},[a("v-toolbar-side-icon",{on:{click:function(e){t.drawer=!t.drawer}}}),a("v-toolbar-title",[t._v("Idle")]),a("v-spacer"),a("v-toolbar-items",{staticClass:"hidden-sm-and-down"},[a("div",{staticClass:"box"},[a("div",{staticClass:"container-1"},[a("br",{staticStyle:{height:"20.8px"}}),a("span",{staticClass:"icon"},[a("i",{staticClass:"fa fa-search"})]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.searchWord,expression:"searchWord"}],attrs:{type:"search",id:"search",placeholder:"Search..."},domProps:{value:t.searchWord},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.search(e)},input:function(e){e.target.composing||(t.searchWord=e.target.value)}}})])]),t.userinfo?a("v-btn",{attrs:{flat:""},on:{click:t.Logout}},[t._v("Logout")]):a("v-btn",{attrs:{flat:""},on:{click:function(e){e.stopPropagation(),t.dialog2=!0}}},[t._v("\n      Login\n    ")]),a("v-dialog",{attrs:{"max-width":"400"},model:{value:t.dialog2,callback:function(e){t.dialog2=e},expression:"dialog2"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[t._v("Login")]),a("v-card-text",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticStyle:{width:"100%",height:"50px"},attrs:{type:"text",placeholder:"Email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),a("br"),a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticStyle:{width:"100%",height:"50px"},attrs:{type:"password",placeholder:"Password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),a("br")]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"green darken-1",flat:"flat"},on:{click:[function(e){t.dialog2=!1},t.Login]}},[t._v("\n              Login\n          ")])],1),a("v-flex",{attrs:{"text-xl-center":"","text-lg-center":"","text-md-center":"","text-sm-center":"","text-xs-center":""}},[a("GoogleLogin"),a("FacebookLogin"),t._v("\n            You don't have an account? You can \n            "),a("v-btn",{attrs:{flat:""},on:{click:function(e){e.stopPropagation(),t.dialog1=!0}}},[t._v("\n              create one\n            ")]),a("v-dialog",{attrs:{"max-width":"500"},model:{value:t.dialog1,callback:function(e){t.dialog1=e},expression:"dialog1"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[t._v("Sign Up")]),a("v-card-text",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.signupemail,expression:"signupemail"}],staticStyle:{width:"100%",height:"50px"},attrs:{type:"text",placeholder:"Email"},domProps:{value:t.signupemail},on:{input:function(e){e.target.composing||(t.signupemail=e.target.value)}}}),a("br"),a("input",{directives:[{name:"model",rawName:"v-model",value:t.signuppassword,expression:"signuppassword"}],staticStyle:{width:"100%",height:"50px"},attrs:{type:"password",placeholder:"Password"},domProps:{value:t.signuppassword},on:{input:function(e){e.target.composing||(t.signuppassword=e.target.value)}}}),a("br")]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"green darken-1",flat:"flat"},on:{click:[function(e){t.dialog1=!1},t.SignUp]}},[t._v("\n                      Sign Up\n                  ")])],1)],1)],1)],1)],1)],1),a("v-btn",{attrs:{flat:""},on:{click:function(e){return t.goto("test")}}},[t._v("Test Space")])],1),t.userinfo?a("NavbarAvatar"):t._e()],1),a("v-navigation-drawer",{staticStyle:{"background-color":"#d9d9d9"},attrs:{app:"",stateless:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[a("v-list",[a("v-list-tile",[a("v-list-tile-content",[a("v-list-tile-title",{staticClass:"title"},[t._v("\n            Application\n          ")])],1)],1)],1),a("v-divider"),a("v-list",{staticClass:"pt-0",attrs:{dense:""}},[a("v-list-group",{attrs:{"prepend-icon":"account_circle",value:"true"},scopedSlots:t._u([{key:"activator",fn:function(){return[a("v-list-item-title",[t._v("Feeds")])]},proxy:!0}])},[a("v-list-group",{attrs:{"no-action":"","sub-group":"",value:"true"},scopedSlots:t._u([{key:"activator",fn:function(){return[a("v-list-item-content",[a("v-list-item-title",[t._v("original")])],1)]},proxy:!0}])},t._l(t.items,function(e){return a("v-list-tile",{key:e.title,attrs:{router:"",to:{name:e.routerTo}}},[a("v-list-tile-action",[a("v-icon",[t._v(t._s(e.icon))])],1),a("v-list-tile-content",[a("v-list-tile-title",[t._v(t._s(e.title))])],1)],1)}),1),a("v-list-group",{attrs:{"no-action":"","sub-group":"",value:"true"},scopedSlots:t._u([{key:"activator",fn:function(){return[a("v-list-item-content",[a("v-list-item-title",[t._v("follow")])],1)]},proxy:!0}])},t._l(t.contents,function(e){return a("v-list-tile",{on:{click:function(t){}}},[a("v-list-tile-action",[a("v-icon",[t._v(t._s(e.icon))])],1),a("v-list-tile-content",[a("v-list-tile-title",[t._v(t._s(e.title))])],1)],1)}),1)],1)],1),a("v-spacer"),a("v-btn",{staticClass:"test",attrs:{to:"/addcontent",flat:"",color:"#2bb24c"}},[a("v-icon",{staticClass:"white--text mr-1"},[t._v("add")]),a("span",{staticClass:"white--text",staticStyle:{"font-size":"12px"}},[t._v("ADD CONTENT")])],1),a("v-spacer")],1)],1)},l=[],u=a("8aa5"),d=a.n(u),p=a("01e4"),v=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-btn",{attrs:{round:"",color:"#df4a31",dark:""},on:{click:t.GoogleLogin}},[t._v("Google Login")])],1)},m=[],f={data:function(){return{}},methods:{GoogleLogin:function(){var t=new d.a.auth.GoogleAuthProvider;d.a.auth().signInWithPopup(t).then(function(t){t.credential.accessToken,t.user}).catch(function(t){t.code,t.message,t.email,t.credential})}}},h=f,g=a("2877"),b=a("6544"),w=a.n(b),_=a("8336"),x=Object(g["a"])(h,v,m,!1,null,null,null),y=x.exports;w()(x,{VBtn:_["a"]});var k=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-btn",{attrs:{round:"",color:"blue",dark:""},on:{click:t.FacebookLogin}},[t._v("Facebook Login")])],1)},V=[],C={data:function(){return{}},methods:{FacebookLogin:function(){var t=new d.a.auth.FacebookAuthProvider;d.a.auth().signInWithPopup(t).then(function(t){t.credential.accessToken,t.user}).catch(function(t){t.code,t.message,t.email,t.credential})}}},S=C,L=Object(g["a"])(S,k,V,!1,null,null,null),T=L.exports;w()(L,{VBtn:_["a"]});var A=a("0c12"),E=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"text-xs-center"},[a("v-menu",{attrs:{"close-on-content-click":!1,"nudge-width":200,"offset-x":""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[a("v-avatar",t._g({},n),[a("img",{attrs:{src:t.imgSrc,alt:"Profile Image Button for some settings"}})])]}}]),model:{value:t.menu,callback:function(e){t.menu=e},expression:"menu"}},[a("v-card",[a("v-list",[a("v-list-tile",{attrs:{avatar:""}},[a("v-list-tile-content",[a("v-list-tile-title",[t._v(t._s(t.user.email))]),a("v-list-tile-sub-title",[t._v("welcome! "+t._s(t.user.displayName))])],1)],1)],1),a("v-divider"),a("v-list",{attrs:{flat:""}},[a("v-list-item-group",{attrs:{color:"primary"}},[t._l(t.items,function(e,n){return a("v-list-tile",{key:n,attrs:{to:e.url}},[a("v-list-tile-content",[a("v-list-tile-title",[t._v(" "+t._s(e.name))])],1)],1)}),a("v-list-tile",{on:{click:t.Logout}},[a("v-list-tile-content",[a("v-list-tile-title",[t._v("Log Out")])],1)],1)],2)],1)],1)],1)],1)},j=[],P={data:function(){return{menu:!1,imgSrc:"http://1.bp.blogspot.com/-Du37vfsR5RA/VUnNvMwUmEI/AAAAAAAAEJc/9yFnzYYr-lo/s1600/%EC%9D%B4%EB%AF%B8%EC%A7%80%2B2.png",user:"",items:[{name:"Profile Page",url:"/profile"},{name:"Keyword Setting",url:"/"}]}},created:function(){var t=this;d.a.auth().onAuthStateChanged(function(e){e&&(t.user=e)})},methods:{Logout:function(){p["a"].Logout()}}},O=P,D=a("8212"),N=a("b0af"),U=a("ce7e"),B=a("8860"),I=a("ba95"),F=a("5d23"),G=a("e449"),$=Object(g["a"])(O,E,j,!1,null,null,null),W=$.exports;w()($,{VAvatar:D["a"],VCard:N["a"],VDivider:U["a"],VList:B["a"],VListTile:I["a"],VListTileContent:F["a"],VListTileSubTitle:F["b"],VListTileTitle:F["c"],VMenu:G["a"]});a("bc3a");var q={components:{GoogleLogin:y,FacebookLogin:T,NavbarAvatar:W},data:function(){return{signupemail:"",signuppassword:"",email:"",password:"",userinfo:"",dialog1:!1,dialog2:!1,weather:[],drawer:!1,write:!1,searchWord:"",items:[{title:"Home",icon:"dashboard",routerTo:"home"},{title:"article",icon:"question_answer",routerTo:"article"},{title:"Profile",icon:"question_answer",routerTo:"profile"},{title:"admin",icon:"question_answer",routerTo:"admin"},{title:"addContent",icon:"question_answer",routerTo:"addcontent"},{title:"Test Space",icon:"question_answer",routerTo:"test"}],contents:[{icon:"dashboard",title:"hojin"}]}},methods:{search:function(){this.$router.push("/addcontent/"+this.searchWord)},goto:function(t){this.$router.push("/"+t)},Login:function(){var t=this;d.a.auth().signInWithEmailAndPassword(this.email,this.password).then(function(e){alert("Well done ! You are now connected"),t.email="",t.password=""},function(e){alert("Oops, "+e.message),t.dialog2=!0})},SignUp:function(){var t=this;d.a.auth().createUserWithEmailAndPassword(this.signupemail,this.signuppassword).then(function(e,a){alert("created!!"),t.dialog2=!1,t.signupemail="",t.signuppassword="",d.a.firestore().collection("Userinfo").doc(e.user.uid).set({keyword:[],markasread:[],readlater:[],sourceFollow:[],follow:{}})},function(e){alert("Oops, "+e.message),t.dialog1=!0})},Logout:function(){p["a"].Logout()}},created:function(){var t=this;d.a.auth().onAuthStateChanged(function(e){t.userinfo=e||""})},watch:{drawer:function(t){var e=this;A["a"].$on("leftDrawer",function(t){t&&(e.drawer=!1)})},write:function(t){alert("nav source")}}},M=q,R=(a("5677"),a("99d9")),Y=a("12b2"),H=a("169a"),K=a("0e8f"),J=a("132d"),z=a("56b0"),X=a("40fe"),Q=a("f774"),Z=a("9910"),tt=a("71d9"),et=a("2a7f"),at=a("706c"),nt=Object(g["a"])(M,c,l,!1,null,"0c224a9a",null),ot=nt.exports;w()(nt,{VBtn:_["a"],VCard:N["a"],VCardActions:R["a"],VCardText:R["b"],VCardTitle:Y["a"],VDialog:H["a"],VDivider:U["a"],VFlex:K["a"],VIcon:J["a"],VList:B["a"],VListGroup:z["a"],VListTile:I["a"],VListTileAction:X["a"],VListTileContent:F["a"],VListTileTitle:F["c"],VNavigationDrawer:Q["a"],VSpacer:Z["a"],VToolbar:tt["a"],VToolbarItems:et["a"],VToolbarSideIcon:at["a"],VToolbarTitle:et["b"]});var rt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-btn",{on:{click:t.LoginCheck}},[t._v("확인")])],1)},it=[],st={methods:{LoginCheck:function(){var t=d.a.auth().currentUser;console.log(t)}}},ct=st,lt=Object(g["a"])(ct,rt,it,!1,null,null,null),ut=lt.exports;w()(lt,{VBtn:_["a"]});var dt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-layout",{attrs:{row:"","justify-center":""}},[a("v-btn",{attrs:{color:"primary",dark:""},on:{click:function(e){e.stopPropagation(),t.dialog=!0}}},[t._v("\r\n        Sign Up\r\n        ")]),a("v-dialog",{attrs:{"max-width":"290"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[t._v("Sign Up")]),a("v-card-text",[a("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],attrs:{type:"text",placeholder:"Email"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),a("br"),a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],attrs:{type:"password",placeholder:"Password"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}}),a("br")]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"green darken-1",flat:"flat"},on:{click:[function(e){t.dialog=!1},t.SignUp]}},[t._v("\r\n                Sign Up\r\n            ")])],1)],1)],1)],1)],1)},pt=[],vt={data:function(){return{email:"",password:"",dialog:!1}},methods:{SignUp:function(){d.a.auth().createUserWithEmailAndPassword(this.email,this.password).then(function(t){alert("created!!")},function(t){alert("Oops, "+t.message)})}}},mt=vt,ft=a("a722"),ht=Object(g["a"])(mt,dt,pt,!1,null,null,null);ht.exports;w()(ht,{VBtn:_["a"],VCard:N["a"],VCardActions:R["a"],VCardText:R["b"],VCardTitle:Y["a"],VDialog:H["a"],VLayout:ft["a"],VSpacer:Z["a"]});var gt={name:"App",components:{Navbar:ot,LoginCheck:ut},data:function(){return{}},methods:{translater:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:case"end":return t.stop()}},t)}));function e(){return t.apply(this,arguments)}return e}()},created:function(){this.translater()}},bt=gt,wt=(a("034f"),a("7496")),_t=a("549c"),xt=Object(g["a"])(bt,r,i,!1,null,null,null),yt=xt.exports;w()(xt,{VApp:wt["a"],VContent:_t["a"]});var kt=a("8c4f"),Vt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-container",[a("v-layout",{attrs:{row:""}},[a("v-flex",{attrs:{xs12:""}},[t._v("\r\n        Discover the best sources for any topic\r\n      ")])],1),a("v-layout",[a("v-flex",[a("v-form",[a("v-text-field",{attrs:{outline:"",label:"Prepend inner","prepend-inner-icon":"place"}}),a("div",{staticClass:"autocomplete",attrs:{id:"autocomplete"}},[a("input",{staticClass:"autocomplete-input",attrs:{placeholder:"Search by topic","aria-label":"Search by topic"}}),a("ul",{staticClass:"autocomplete-result-list"})])],1)],1)],1),a("GitGraph")],1),a("Footer")],1)},Ct=[],St=(a("f559"),a("28a5"),a("e71f"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("v-btn",{on:{click:function(e){return t.Open("https://lab.ssafy.com/HSx3/webmobile-sub2/network/master")}}},[t._v("그래프")]),a("v-layout",[a("v-flex",{staticClass:"hidden-sm-and-down"},[a("div",{attrs:{id:"graph-container"}})])],1)],1)}),Lt=[],Tt=a("bc3a"),At={data:function(){return{}},mounted:function(){Tt.get("https://lab.ssafy.com/api/v4/projects/6064/repository/commits?page=1&per_page=100",{headers:{"PRIVATE-TOKEN":"KyjLocxYqV5AV5wjBBUo"}}).then(function(t){Tt.get("https://lab.ssafy.com/api/v4/projects/6064/repository/commits?page=2&per_page=100",{headers:{"PRIVATE-TOKEN":"KyjLocxYqV5AV5wjBBUo"}}).then(function(e){var a=t.data.concat(e.data),n=a,o=document.getElementById("graph-container"),r=GitgraphJS.templateExtend("metro",{commit:{message:{displayAuthor:!1}}}),i=GitgraphJS.createGitgraph(o,{template:r}),s="",c="",l="",u="",d="";for(var p in n.reverse())if("Merge"===n[p].title.slice(0,5)){var v=n[p].parent_ids[0],m="";for(var f in n)n[f].id===v&&(m=n[f].author_email);"hs.ssafy@gmail.com"===m?s.merge(s):"hj123190@gmail.com"===m?s.merge(l):"hojin1357@naver.com"===m?s.merge(c):"jnunseok@gmail.com"===m?s.merge(d):"kyeah01@gmail.com"===m&&s.merge(u)}else"kyeah01@gmail.com"===n[p].author_email?(u||(u=i.branch("KYW")),u.commit(n[p].title)):"hs.ssafy@gmail.com"===n[p].author_email?(s||(s=i.branch("master")),s.commit(n[p].title)):"hj123190@gmail.com"===n[p].author_email?(l||(l=i.branch("PHJ")),l.commit(n[p].title)):"hojin1357@naver.com"===n[p].author_email?(c||(c=i.branch("LHJ")),c.commit(n[p].title)):"jnunseok@gmail.com"===n[p].author_email&&(d||(d=i.branch("KJS")),d.commit(n[p].title))})})},methods:{Open:function(t){var e=window.open(t,"_blank");e.focus()}}},Et=At,jt=(a("8420"),a("a523")),Pt=Object(g["a"])(Et,St,Lt,!1,null,null,null),Ot=Pt.exports;w()(Pt,{VBtn:_["a"],VContainer:jt["a"],VFlex:K["a"],VLayout:ft["a"]});var Dt=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-footer",{staticClass:"my-5",attrs:{dark:""}},[a("v-card",{staticClass:"indigo lighten-1 white--text text-xs-center",attrs:{flat:"",tile:"",width:"100%"}},[a("v-card-text",t._l(t.icons,function(e){return a("v-btn",{key:e,staticClass:"mx-3 white--text",attrs:{icon:""}},[a("a","fab fa-github"==e?{staticStyle:{color:"white"},attrs:{href:"https://lab.ssafy.com/HSx3/webmobile-sub2",target:"_blank"}}:{staticStyle:{color:"white"},attrs:{href:"#",target:"_blank"}},[a("v-icon",{attrs:{size:"24px"}},[t._v(t._s(e))])],1)])}),1),a("v-card-text",{staticClass:"white--text pt-0"},[t._v("\n        "+t._s(t.weather.one)+", "+t._s(t.weather.two)),a("br"),t._v("\n        the low : "+t._s(t.weather.temp_min)+" °C"),a("br"),t._v("\n        the high : "+t._s(t.weather.temp_max)+" °C\n    ")]),a("v-divider"),a("v-card-text",{staticClass:"white--text"},[t._v("\n      ©2019.07.08 — "),a("strong",[t._v("Idle")])])],1)],1)},Nt=[],Ut={data:function(){return{weather:{one:"",two:"",temp_max:"",temp_min:"",raw:""},icons:["fab fa-github","fab fa-twitter","fab fa-google-plus","fab fa-linkedin","fab fa-instagram"]}},created:function(){var t=this;axios.get("http://api.openweathermap.org/data/2.5/weather?q=daejeon&appid=ab8589d621c1abe7a5d4d62b9bb21c33").then(function(e){t.weather.raw=e.data,t.weather.one=e.data.weather[0].main,t.weather.two=e.data.length>1?e.data.weather[1].main:"",t.weather.temp_max=e.data.main.temp_max-273.15,t.weather.temp_min=e.data.main.temp_min-273.15}).catch(function(t){return console.log(t)})}},Bt=Ut,It=(a("760c"),a("553a")),Ft=Object(g["a"])(Bt,Dt,Nt,!1,null,null,null),Gt=Ft.exports;w()(Ft,{VBtn:_["a"],VCard:N["a"],VCardText:R["b"],VDivider:U["a"],VFooter:It["a"],VIcon:J["a"]});var $t=a("5d59"),Wt=a("9aff"),qt={data:function(){return{sDate:null,eDate:null,path:"/",words:null}},components:{GitGraph:Ot,Footer:Gt},created:function(){var t=this;this.sDate=Object($t["a"])(),d.a.auth().onAuthStateChanged(function(e){e&&t.$router.push("/article")})},mounted:function(){this.loadAutoComplete();var t="https://raw.githubusercontent.com/dwyl/autocomplete/master/words.txt",e=this.loadFile(t);this.words=e.split("\n")},destroyed:function(){this.eDate=Object($t["a"])();var t=d.a.auth().currentUser;Object(Wt["a"])(t,this.path,this.sDate,this.eDate)},methods:{loadAutoComplete:function(){var t=this;new Autocomplete("#autocomplete",{search:function(e){return e.length<2?[]:t.words.filter(function(t){return t.toLowerCase().startsWith(e.toLowerCase())})}})},loadFile:function(t){var e=null,a=new XMLHttpRequest;return a.open("GET",t,!1),a.send(),200==a.status&&(e=a.responseText),e}}},Mt=qt,Rt=(a("96fc"),a("4bd4")),Yt=a("2677"),Ht=Object(g["a"])(Mt,Vt,Ct,!1,null,"012f973d",null),Kt=Ht.exports;w()(Ht,{VContainer:jt["a"],VFlex:K["a"],VForm:Rt["a"],VLayout:ft["a"],VTextField:Yt["a"]});a("0706");n["a"].use(kt["a"]);var Jt=new kt["a"]({mode:"history",base:"/",routes:[{path:"/",name:"home",component:Kt},{path:"/article",name:"article",component:function(){return a.e("about").then(a.bind(null,"93a2"))}},{path:"/test",name:"test",component:function(){return a.e("about").then(a.bind(null,"3c08"))}},{path:"/profile",name:"profile",component:function(){return a.e("about").then(a.bind(null,"c66d"))}},{path:"/admin",name:"admin",component:function(){return a.e("about").then(a.bind(null,"b6a5"))}},{path:"/imageupload",name:"imageupload",component:function(){return a.e("about").then(a.bind(null,"2df0"))}},{path:"/addcontent",name:"addcontent",component:function(){return a.e("about").then(a.bind(null,"59ac"))}},{path:"/addcontent/:searchWord",props:!0,name:"addcontent",component:function(){return a.e("about").then(a.bind(null,"59ac"))}}]}),zt=a("2f62");n["a"].use(zt["a"]);var Xt=new zt["a"].Store({state:{},mutations:{},actions:{}}),Qt=(a("d5e8"),a("d1e7"),a("da19")),Zt=a("0284"),te=a.n(Zt),ee=a("bc3a"),ae=a.n(ee);n["a"].prototype.$axios=ae.a;var ne=a("487a"),oe=a.n(ne);n["a"].config.productionTip=!1,n["a"].use(oe.a),new n["a"]({router:Jt,store:Xt,render:function(t){return t(yt)}}).$mount("#app"),n["a"].use(Qt["a"]),n["a"].use(te.a,{id:"UA-143664405-1",router:Jt,autoTracking:{pageviewOnLoad:!1}})},"5d59":function(t,e,a){"use strict";e["a"]=function(){var t=new Date,e=t.getFullYear(),a=t.getMonth(),n=t.getDay(),o=t.getHours(),r=t.getMinutes(),i=t.getSeconds();return{date:t,year:e,month:a,day:n,hour:o,min:r,second:i}}},"760c":function(t,e,a){"use strict";var n=a("93ff"),o=a.n(n);o.a},"768a":function(t,e,a){},8420:function(t,e,a){"use strict";var n=a("51a5"),o=a.n(n);o.a},"93ff":function(t,e,a){},"96fc":function(t,e,a){"use strict";var n=a("9b77"),o=a.n(n);o.a},"9aff":function(t,e,a){"use strict";var n=function(t,e){var a=60*t.hour*60+60*t.min+t.second,n=60*e.hour*60+60*e.min+e.second,o=n-a,r=0,i=0;return i=o/60,o%=60,r=i/60,i%=60,{hour:parseInt(r),min:parseInt(i),second:o}},o=a("8aa5"),r=a.n(o);e["a"]=function(t,e,a,o){null===t?console.log("no user"):r.a.firestore().collection("Users").add({Email:t.email,Uid:t.uid,Path:e,enterTime:a.date,exitTime:o.date,diffTime:n(a,o)})}},"9b77":function(t,e,a){}});
//# sourceMappingURL=app.db3c502b.js.map