(()=>{var e={};e.id=94,e.ids=[94],e.modules={440:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>l});var r=s(1658);let l=async e=>[{type:"image/x-icon",sizes:"16x16",url:(0,r.fillMetadataSegment)(".",await e.params,"favicon.ico")+""}]},681:(e,t,s)=>{Promise.resolve().then(s.bind(s,3514))},846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},1135:()=>{},1583:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,5814,23))},1844:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>r});let r=(0,s(2907).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/project/sandbox/user-workspace/octave-drift-detection/src/app/mode2/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/project/sandbox/user-workspace/octave-drift-detection/src/app/mode2/page.tsx","default")},1860:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,6444,23)),Promise.resolve().then(s.t.bind(s,6042,23)),Promise.resolve().then(s.t.bind(s,8170,23)),Promise.resolve().then(s.t.bind(s,9477,23)),Promise.resolve().then(s.t.bind(s,9345,23)),Promise.resolve().then(s.t.bind(s,2089,23)),Promise.resolve().then(s.t.bind(s,6577,23)),Promise.resolve().then(s.t.bind(s,1307,23))},2534:(e,t,s)=>{"use strict";s.r(t),s.d(t,{GlobalError:()=>d.a,__next_app__:()=>x,pages:()=>c,routeModule:()=>m,tree:()=>o});var r=s(5239),l=s(8088),a=s(8170),d=s.n(a),i=s(893),n={};for(let e in i)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(n[e]=()=>i[e]);s.d(t,n);let o={children:["",{children:["mode2",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,1844)),"/project/sandbox/user-workspace/octave-drift-detection/src/app/mode2/page.tsx"]}]},{metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,440))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(s.bind(s,5912)),"/project/sandbox/user-workspace/octave-drift-detection/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,7398,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(s.t.bind(s,9999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(s.t.bind(s,5284,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[async e=>(await Promise.resolve().then(s.bind(s,440))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]}.children,c=["/project/sandbox/user-workspace/octave-drift-detection/src/app/mode2/page.tsx"],x={require:s,loadChunk:()=>Promise.resolve()},m=new r.AppPageRouteModule({definition:{kind:l.RouteKind.APP_PAGE,page:"/mode2/page",pathname:"/mode2",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:o}})},3033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},3514:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>i});var r=s(687),l=s(3210),a=s(6189);s(9189);var d=s(4305);function i(){let[e,t]=(0,l.useState)(""),[s,i]=(0,l.useState)(""),[n,o]=(0,l.useState)(""),[c,x]=(0,l.useState)([]),[m,u]=(0,l.useState)([]),[h,p]=(0,l.useState)(!0);return(0,a.useRouter)(),(0,r.jsx)("div",{className:"bg-gray-900 min-h-screen flex flex-col",children:(0,r.jsxs)("main",{className:"flex-grow container mx-auto px-4 py-8",children:[(0,r.jsxs)("div",{className:"bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 border border-gray-700",children:[(0,r.jsx)("h2",{className:"text-2xl font-semibold text-blue-300 mb-4",children:"OCTAVE - RG Dashboard"}),(0,r.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-4 mb-6",children:[(0,r.jsxs)("div",{className:"bg-blue-900/30 p-4 rounded-lg border border-blue-800/50",children:[(0,r.jsx)("h3",{className:"text-lg font-medium text-blue-200 mb-2",children:"Business Unit"}),(0,r.jsxs)("select",{className:"w-full bg-gray-700 border-blue-600 rounded p-2 text-white",value:e,onChange:e=>{t(e.target.value),i(""),o("")},children:[(0,r.jsx)("option",{value:"",children:"Select Business Unit"}),(0,r.jsx)("option",{value:"CCS",children:"CCS"}),(0,r.jsx)("option",{value:"JMSL",children:"JMSL"})]})]}),(0,r.jsxs)("div",{className:"bg-blue-900/30 p-4 rounded-lg border border-blue-800/50",children:[(0,r.jsx)("h3",{className:"text-lg font-medium text-blue-200 mb-2",children:"Use Case"}),(0,r.jsxs)("select",{className:"w-full bg-gray-700 border-blue-600 rounded p-2 text-white",value:s,onChange:t=>{let s=t.target.value;i(s),e&&o(`${e.substring(0,2)}-${s.substring(0,2)}`)},disabled:!e,children:[(0,r.jsx)("option",{value:"",children:e?"Select Use Case":"Select Business Unit first"}),("CCS"===e?["Distribution Efficiency","MT Promo"]:"JMSL"===e?["Dry Sales"]:[]).map(e=>(0,r.jsx)("option",{value:e,children:e},e))]})]}),(0,r.jsxs)("div",{className:"bg-blue-900/30 p-4 rounded-lg border border-blue-800/50",children:[(0,r.jsx)("h3",{className:"text-lg font-medium text-blue-200 mb-2",children:"Short Code"}),(0,r.jsx)("input",{type:"text",value:e&&s?`${e.substring(0,2)}-${s.substring(0,2)}`:"-",onChange:e=>{},className:"w-full bg-gray-700 border-blue-600 rounded p-2 text-white"})]}),(0,r.jsxs)("div",{className:"bg-blue-900/30 p-4 rounded-lg border border-blue-800/50",children:[(0,r.jsx)("h3",{className:"text-lg font-medium text-blue-200 mb-2",children:"Runtime"}),(0,r.jsx)("input",{type:"text",value:"2h 45m",onChange:e=>{},className:"w-full bg-gray-700 border-blue-600 rounded p-2 text-white"})]})]}),(0,r.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4 mb-6",children:[(0,r.jsxs)("div",{className:"bg-blue-900/30 p-4 rounded-lg border border-blue-800/50 flex flex-col",children:[(0,r.jsx)("h3",{className:"text-lg font-medium text-blue-200 mb-2",children:"Current Alert Time"}),(0,r.jsx)("p",{className:"text-xl mt-auto",children:h?"Loading...":c.find(e=>"alertTime"===e.rowKey)?.value||"N/A"})]}),(0,r.jsxs)("div",{className:"bg-blue-900/30 p-4 rounded-lg border border-blue-800/50 flex flex-col",children:[(0,r.jsx)("h3",{className:"text-lg font-medium text-blue-200 mb-2",children:"No. of Runtime"}),(0,r.jsx)("p",{className:"text-xl mt-auto",children:h?"Loading...":c.find(e=>"runtimeCount"===e.rowKey)?.value||"0"})]}),(0,r.jsxs)("div",{className:"bg-blue-900/30 p-4 rounded-lg border border-blue-800/50 flex flex-col",children:[(0,r.jsx)("h3",{className:"text-lg font-medium text-blue-200 mb-2",children:"Alert Keeper"}),(0,r.jsx)("p",{className:"text-xl mt-auto",children:h?"Loading...":c.find(e=>"alertKeeper"===e.rowKey)?.value||"N/A"})]})]})]}),(0,r.jsxs)("div",{className:"bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 border border-gray-700",children:[(0,r.jsx)("h2",{className:"text-2xl font-semibold text-blue-300 mb-4",children:"Confusion Matrix"}),(0,r.jsx)("div",{className:"h-96 bg-gray-700 rounded p-4",children:h?(0,r.jsx)("div",{className:"flex items-center justify-center h-full",children:(0,r.jsx)("div",{className:"text-white",children:"Loading confusion matrix..."})}):(0,r.jsx)(d.A,{data:[[.8,.1,.1],[.2,.6,.2],[.1,.1,.8]],labels:["Class 1","Class 2","Class 3"],title:"Prediction vs Actual"})})]}),(0,r.jsxs)("div",{className:"bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 border border-gray-700",children:[(0,r.jsx)("h2",{className:"text-2xl font-semibold text-blue-300 mb-4",children:"Hyperparameters"}),(0,r.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-4",children:[(0,r.jsxs)("div",{className:"bg-blue-900/30 p-4 rounded-lg border border-blue-800/50",children:[(0,r.jsx)("h3",{className:"text-lg font-medium text-blue-200 mb-2",children:"Auto Hyperparameters"}),(0,r.jsx)("p",{className:"text-xl",children:"True"})]}),(0,r.jsxs)("div",{className:"bg-blue-900/30 p-4 rounded-lg border border-blue-800/50",children:[(0,r.jsx)("h3",{className:"text-lg font-medium text-blue-200 mb-2",children:"Custom Hyperparameters"}),(0,r.jsx)("p",{className:"text-xl",children:"[10,2,3]"})]}),(0,r.jsxs)("div",{className:"bg-blue-900/30 p-4 rounded-lg border border-blue-800/50",children:[(0,r.jsx)("h3",{className:"text-lg font-medium text-blue-200 mb-2",children:"Default Hyperparameters"}),(0,r.jsx)("p",{className:"text-xl",children:"False"})]}),(0,r.jsxs)("div",{className:"bg-blue-900/30 p-4 rounded-lg border border-blue-800/50",children:[(0,r.jsx)("h3",{className:"text-lg font-medium text-blue-200 mb-2",children:"Status"}),(0,r.jsx)("p",{className:"text-xl text-orange-400",children:"Warning"})]})]})]}),(0,r.jsxs)("div",{className:"bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 border border-gray-700",children:[(0,r.jsx)("h2",{className:"text-2xl font-semibold text-blue-300 mb-4",children:"XAI Result"}),(0,r.jsxs)("div",{className:"space-y-3 text-white",children:[(0,r.jsx)("p",{children:"The current model shows increased error rates compared to reference values, particularly in:"}),(0,r.jsxs)("ul",{className:"list-disc pl-5 space-y-1",children:[(0,r.jsx)("li",{children:"MSE (50% increase)"}),(0,r.jsx)("li",{children:"MAE (37.5% increase)"})]}),(0,r.jsxs)("p",{children:["The Wasserstein distance of ",(0,r.jsx)("span",{className:"font-semibold",children:"1.85"})," indicates significant distribution shift."]}),(0,r.jsxs)("p",{children:["The KStest value of ",(0,r.jsx)("span",{className:"font-semibold",children:"0.42"})," suggests moderate deviation from expected behavior."]})]})]}),(0,r.jsxs)("div",{className:"bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 mb-6 border border-gray-700",children:[(0,r.jsx)("h2",{className:"text-2xl font-semibold text-blue-300 mb-4",children:"Error Comparison"}),(0,r.jsx)("div",{className:"overflow-x-auto",children:(0,r.jsxs)("table",{className:"min-w-full divide-y divide-gray-700",children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider",children:"ID"}),(0,r.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider",children:"Time Period"}),(0,r.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider",children:"Mean Prediction"}),(0,r.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-blue-200 uppercase tracking-wider",children:"Error"})]})}),(0,r.jsx)("tbody",{className:"divide-y divide-gray-700",children:h?(0,r.jsx)("tr",{children:(0,r.jsx)("td",{colSpan:4,className:"px-6 py-4 text-center text-sm text-white",children:"Loading error data..."})}):m.length>0?m.map((e,t)=>(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-white",children:t+1}),(0,r.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-white",children:e.timePeriod}),(0,r.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-white",children:e.meanPrediction}),(0,r.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-red-400",children:e.error})]},t)):(0,r.jsx)("tr",{children:(0,r.jsx)("td",{colSpan:4,className:"px-6 py-4 text-center text-sm text-white",children:"No error data available"})})})]})})]}),(0,r.jsxs)("div",{className:"bg-red-900/20 rounded-xl shadow-md overflow-hidden p-6 mb-6 border border-red-800/50",children:[(0,r.jsx)("h2",{className:"text-2xl font-semibold text-red-300 mb-4",children:"Error Threshold Exceeded"}),(0,r.jsx)("div",{className:"overflow-x-auto",children:(0,r.jsxs)("table",{className:"min-w-full divide-y divide-red-800/50",children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-red-200 uppercase tracking-wider",children:"ID"}),(0,r.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-red-200 uppercase tracking-wider",children:"y_true"}),(0,r.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-red-200 uppercase tracking-wider",children:"y_pred"}),(0,r.jsx)("th",{className:"px-6 py-3 text-left text-xs font-medium text-red-200 uppercase tracking-wider",children:"percentage_error"})]})}),(0,r.jsx)("tbody",{className:"divide-y divide-red-800/50",children:h?(0,r.jsx)("tr",{children:(0,r.jsx)("td",{colSpan:4,className:"px-6 py-4 text-center text-sm text-white",children:"Loading threshold data..."})}):m.filter(e=>e.exceedsThreshold).length>0?m.filter(e=>e.exceedsThreshold).map((e,t)=>(0,r.jsxs)("tr",{children:[(0,r.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-white",children:t+1}),(0,r.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-white",children:e.yTrue}),(0,r.jsx)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-white",children:e.yPred}),(0,r.jsxs)("td",{className:"px-6 py-4 whitespace-nowrap text-sm text-red-300",children:[e.percentageError,"%"]})]},t)):(0,r.jsx)("tr",{children:(0,r.jsx)("td",{colSpan:4,className:"px-6 py-4 text-center text-sm text-white",children:"No threshold exceedances"})})})]})})]})]})})}},3873:e=>{"use strict";e.exports=require("path")},4305:(e,t,s)=>{"use strict";s.d(t,{A:()=>a});var r=s(687),l=s(3210);function a({data:e,labels:t,title:s}){(0,l.useRef)(null);let a=(0,l.useRef)(null);return(0,r.jsxs)("div",{className:"relative h-full w-full",children:[(0,r.jsx)("h3",{className:"text-lg font-medium text-blue-200 mb-2",children:s}),(0,r.jsx)("canvas",{ref:a,className:"w-full h-full"})]})}s(983)},5912:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>i});var r=s(7413);s(1120);var l=s(4536),a=s.n(l);function d(){return(0,r.jsx)("header",{className:"bg-[#96FFE6] py-6 shadow-md",children:(0,r.jsxs)("div",{className:"container mx-auto px-4 flex justify-between items-center",children:[(0,r.jsxs)("div",{className:"flex items-center",children:[(0,r.jsx)("img",{src:"https://www.octave.lk/wp-content/uploads/2023/11/logo.png",alt:"OCTAVE Logo",className:"h-10 mr-4"}),(0,r.jsx)("h1",{className:"text-3xl font-bold text-[#F910B2]",children:"Drift Detection Tool"})]}),(0,r.jsx)("nav",{children:(0,r.jsxs)(a(),{href:"/",className:"text-[#F910B2] hover:text-[#d40e9a]",children:[(0,r.jsx)("i",{className:"fas fa-home"})," Home"]})})]})})}function i({children:e}){return(0,r.jsx)("html",{lang:"en",className:"dark",children:(0,r.jsxs)("body",{className:"bg-gray-900 text-gray-100",children:[(0,r.jsx)(d,{}),(0,r.jsx)("main",{className:"min-h-screen",children:e})]})})}s(1135)},6087:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,4536,23))},6189:(e,t,s)=>{"use strict";var r=s(5773);s.o(r,"useRouter")&&s.d(t,{useRouter:function(){return r.useRouter}})},7529:(e,t,s)=>{Promise.resolve().then(s.bind(s,1844))},7892:(e,t,s)=>{Promise.resolve().then(s.t.bind(s,6346,23)),Promise.resolve().then(s.t.bind(s,7924,23)),Promise.resolve().then(s.t.bind(s,5656,23)),Promise.resolve().then(s.t.bind(s,99,23)),Promise.resolve().then(s.t.bind(s,8243,23)),Promise.resolve().then(s.t.bind(s,8827,23)),Promise.resolve().then(s.t.bind(s,2763,23)),Promise.resolve().then(s.t.bind(s,7173,23))},9121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},9189:(e,t,s)=>{"use strict";s.d(t,{K:()=>a,f:()=>d});let r={mode1:[{rowKey:"alertTime",value:"15:42 UTC"},{rowKey:"runtimeCount",value:"142"},{rowKey:"alertKeeper",value:"Kalpa (kalpa@keells.com)"},{rowKey:"kstest",value:"0.42"},{rowKey:"wasserstein",value:"1.85"},{rowKey:"mseRef",value:"0.12"},{rowKey:"mseCurrent",value:"0.18"},{rowKey:"status",value:"Warning"}]},l={mode1:[{timePeriod:"2025-01",meanPrediction:"1250",error:"-90",exceedsThreshold:!0},{timePeriod:"2025-01",meanPrediction:"980",error:"-65",exceedsThreshold:!0},{timePeriod:"2025-02",meanPrediction:"1100",error:"-42",exceedsThreshold:!1}]};async function a(e){return r[e]||[]}async function d(e){return l[e]||[]}},9294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},9551:e=>{"use strict";e.exports=require("url")}};var t=require("../../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),r=t.X(0,[828,663,658,983],()=>s(2534));module.exports=r})();