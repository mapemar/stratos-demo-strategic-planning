(function(){
const refs=[
['S1','SACE50 2026–2028','https://www.sace.it/chi-siamo/piano-strategico-sace50'],
['S2','SACE 2025 annual accounts','https://www.sace.it/docs/default-source/gruppo-in-cifre/2025/sace-spa---bilancio-d-esercizio-e-consolidato-2025.pdf?Status=Master'],
['S3','UKEF Business Plan 2024–2029','https://www.gov.uk/government/publications/uk-export-finance-business-plan-2024-29/uk-export-finance-business-plan-2024-2029'],
['S4','Finnvera strategy 2026–2029','https://www.finnvera.fi/eng/about-finnvera/finnvera-in-brief/strategy-and-values'],
['S5','CESCE strategy / annual reporting','https://www.cesce.es/'],
['S6','CDP Strategic Plan 2025–2027','https://www.cdp.it/pages/it/chi-siamo/strategia/piano-strategico/'],
['S7','Intesa Sanpaolo Business Plan 2026–2029','https://group.intesasanpaolo.com/it/investor-relations/piano-impresa']];
const esc=x=>String(x??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
window.loadDemoPlan=async()=>{if(window.stratosAIPlan)return window.stratosAIPlan;const r=await fetch('./demo-plan.json',{cache:'no-store'});if(!r.ok)throw Error('Cannot load demo-plan.json ('+r.status+')');window.stratosAIPlan=await r.json();return window.stratosAIPlan};
window.generatePlanAI=async kind=>{
 const btn=document.getElementById('ai-'+kind);if(btn){btn.disabled=true;btn.textContent='Preparing demo output…'}
 try{const p=await window.loadDemoPlan();if(kind==='pdf'){render();setTimeout(()=>window.print(),450)}else await window.exportPlanPPT(); }
 catch(e){alert('Cannot prepare the demo output: '+e.message)}
 finally{if(btn){btn.disabled=false;btn.textContent=kind==='pdf'?'Export Business Plan · PDF':'Export Executive Plan · PowerPoint'}}
};
window.makePlanPDF=()=>window.generatePlanAI('pdf');
window.makePlanPPT=()=>window.generatePlanAI('ppt');
window.exportPlanPPT=async()=>{
 const p=await window.loadDemoPlan();const C=window.PptxGenJS||window.pptxgen;if(!C){alert('PowerPoint library unavailable.');return}
 const ppt=new C();ppt.layout='LAYOUT_WIDE';ppt.author='STRATOS';ppt.subject='Independent SACE strategic planning case study';ppt.title=p.title;
 const add=(title,label)=>{const s=ppt.addSlide();s.background={color:'F5F7FA'};s.addText(label||'STRATOS / STRATEGIC PLAN',{x:.55,y:.25,w:11,h:.2,fontSize:8,bold:true,color:'168B8B'});s.addText(title,{x:.6,y:.72,w:12,h:.65,fontSize:23,bold:true,color:'10243A',fit:'shrink'});s.addText('INDEPENDENT CASE STUDY · PUBLIC SOURCES · ILLUSTRATIVE ANALYSIS',{x:.6,y:7.18,w:11,h:.16,fontSize:7,color:'8291A0'});return s};
 let c=ppt.addSlide();c.background={color:'10243A'};c.addText('STRATOS',{x:.8,y:.65,w:5,h:.5,fontSize:23,bold:true,color:'FFFFFF'});c.addText(p.title,{x:.8,y:1.8,w:11.5,h:1.5,fontSize:32,bold:true,color:'FFFFFF',fit:'shrink'});c.addText(p.period,{x:.85,y:3.75,w:7,h:.5,fontSize:20,color:'8CD1D0'});c.addText(p.thesis,{x:.85,y:4.55,w:10.8,h:1.35,fontSize:14,color:'D5E1EA',fit:'shrink'});
 let e=add('Executive Summary','BOARD OVERVIEW');e.addText(p.summary,{x:.75,y:1.55,w:11.8,h:5.1,fontSize:13,color:'30485E',fit:'shrink',valign:'top'});
 p.chapters.forEach((ch,i)=>{let s=add(ch.title,'CHAPTER '+String(i+1).padStart(2,'0'));s.addText(ch.slide_summary,{x:.75,y:1.45,w:11.8,h:1.25,fontSize:13,bold:true,color:'10243A',fit:'shrink',valign:'top'});(ch.bullets||[]).slice(0,5).forEach((v,j)=>s.addText(v,{x:.95,y:2.9+j*.68,w:11.1,h:.52,fontSize:12,color:'30485E',bullet:{indent:12},hanging:3,fit:'shrink'}))});
 let f=add('Financial Plan & Scenarios','FINANCIAL SUSTAINABILITY');f.addText(p.financial+'\n\n'+p.scenarios,{x:.75,y:1.45,w:11.8,h:5.35,fontSize:11,color:'30485E',fit:'shrink',valign:'top'});
 let k=add('KPI Scorecard','PERFORMANCE & IMPACT');(p.kpis||[]).slice(0,10).forEach((v,i)=>k.addText(v.name+' — '+v.definition+' | '+v.target+' | '+v.frequency,{x:.8,y:1.35+i*.52,w:11.5,h:.42,fontSize:10,color:'30485E',fit:'shrink'}));
 let a=add('Sources & Limitations','ANNEX');a.addText(refs.map(x=>'['+x[0]+'] '+x[1]+' — '+x[2]).join('\n\n')+'\n\n'+p.limitations,{x:.75,y:1.45,w:11.8,h:5.3,fontSize:9,color:'30485E',fit:'shrink',valign:'top'});
 await ppt.writeFile({fileName:'STRATOS_SACE_Industrial_Plan_Demo.pptx'});
};
window.reports=()=>{
 const p=window.stratosAIPlan;let doc='';
 if(p)doc='<div class="report-document"><div class="report-cover"><div class="report-brand">STRATOS / STRATEGIC PLANNING</div><div class="report-cover-main"><div class="eyebrow">INDEPENDENT STRATEGIC CASE STUDY</div><h1>'+esc(p.title)+'</h1><div class="report-period">'+esc(p.period)+'</div><p>'+esc(p.thesis)+'</p></div><div class="report-cover-foot">Public sources and illustrative modelling · Not an approved SACE plan</div></div><div class="report-body"><div class="report-toc"><h2>Contents</h2><ol>'+p.chapters.map(x=>'<li>'+esc(x.title)+'</li>').join('')+'</ol></div><section class="report-chapter"><h2>Executive Summary</h2><p>'+esc(p.summary).replace(/\n/g,'<br>')+'</p></section>'+p.chapters.map((x,i)=>'<section class="report-chapter"><div class="eyebrow">CHAPTER '+String(i+1).padStart(2,'0')+'</div><h2>'+esc(x.title)+'</h2><p>'+esc(x.full).replace(/\n/g,'<br>')+'</p></section>').join('')+'<section class="report-chapter"><h2>Financial Plan & Scenarios</h2><p>'+esc(p.financial)+'</p><p>'+esc(p.scenarios)+'</p></section><section class="report-chapter"><h2>KPI Scorecard</h2><table><thead><tr><th>KPI</th><th>Definition</th><th>Target</th><th>Frequency</th></tr></thead><tbody>'+(p.kpis||[]).map(x=>'<tr><td>'+esc(x.name)+'</td><td>'+esc(x.definition)+'</td><td>'+esc(x.target)+'</td><td>'+esc(x.frequency)+'</td></tr>').join('')+'</tbody></table></section><section class="report-chapter"><h2>Sources & Limitations</h2>'+refs.map(x=>'<p>['+x[0]+'] <a href="'+x[2]+'">'+esc(x[1])+'</a></p>').join('')+'<p>'+esc(p.limitations)+'</p></section></div></div>';
 return head('FINAL OUTPUT','AI Business Plan Generator','Test the complete strategic-plan output without API keys or paid token usage.','')+'<div class="card ai-control"><div class="eyebrow">NO-COST DEMO MODE · GITHUB PAGES</div><h3>SACE Industrial Plan · 2026–2028</h3><p class="small muted">Pre-generated strategic case study · 16 chapters · Executive summary · Financial framework · Scenarios · KPI scorecard</p><div class="grid g2"><div><button id="ai-pdf" class="btn primary block" onclick="makePlanPDF()">Export Business Plan · PDF</button><p class="small muted">Opens the browser print dialogue. Select “Save as PDF”.</p></div><div><button id="ai-ppt" class="btn primary block" onclick="makePlanPPT()">Export Executive Plan · PowerPoint</button><p class="small muted">Downloads an editable PowerPoint presentation.</p></div></div><p class="small muted">This demo uses a pre-generated plan stored in this GitHub repository. It does not call an AI API, require an API key or incur token charges. Live AI regeneration is intentionally disabled.</p></div>'+doc+'<style>@media print{.side,.topbar,.pagehead,.ai-control{display:none!important}.app{display:block}.content{padding:0!important;max-width:none!important}.report-document{border:0!important;box-shadow:none!important;margin:0!important}.report-cover{min-height:95vh;break-after:page}.report-body{padding:18mm 17mm}.report-chapter{break-inside:avoid}.report-toc{break-after:page}a{color:inherit;text-decoration:none}}</style>';
};
render();
})();