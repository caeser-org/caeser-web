// Curated SVG layouts for the three documentation architecture diagrams.
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const text = (x, y, lines, options = '') => `<text x="${x}" y="${y}" ${options}>${lines.map((line,i)=>`<tspan x="${x}" dy="${i ? 21 : 0}">${escape(line)}</tspan>`).join('')}</text>`;
const label = (x,y,value) => text(x,y,[value], 'class="label"');
const card = (x,y,w,lines,{dark=false,optional=false,small=false}={}) => {
  const h = small ? 58 : 82;
  return `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" class="${dark ? 'dark' : 'card'}" ${optional ? 'stroke-dasharray="5 5"' : ''}/>${text(x+16,y+(h-(lines.length-1)*21)/2+5,lines,`class="${dark ? 'inverse' : ''}"`)}</g>`;
};
const arrow = (path, dashed=false) => `<path d="${path}" class="edge" marker-end="url(#arrow)" ${dashed ? 'stroke-dasharray="5 5"' : ''}/>`;
function svg(title, description, height, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="760" height="${height}" viewBox="0 0 760 ${height}" role="img" aria-labelledby="title description"><title id="title">${title}</title><desc id="description">${description}</desc><style>text{font:15px Arial,sans-serif;fill:#242822}.label{font:10px monospace;letter-spacing:1.4px;fill:#73786e}.card{fill:#fff;stroke:#d5d9cf;stroke-width:1}.dark{fill:#262e26;stroke:#262e26}.inverse{fill:#fff}.edge{fill:none;stroke:#8a9385;stroke-width:1.4;stroke-linejoin:round;stroke-linecap:round}.lane{fill:#f0f2ec;stroke:none}</style><defs><marker id="arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M1 1 L7 4 L1 7" fill="none" stroke="#8a9385" stroke-width="1.3"/></marker></defs>${body}</svg>`;
}
export function renderDesignedDiagram(hash) {
  if (hash === '116388c638f8') return svg('From failed CI to a pull request comment', 'Evidence enters a read-only diagnosis job. Reports optionally pass through model analysis before a separate publication job updates one PR comment.', 646,
    `<rect class="lane" x="258" y="22" width="240" height="598" rx="12"/>`+
    label(24,44,'01 / EVIDENCE')+label(278,44,'02 / INVESTIGATE')+label(530,44,'03 / PUBLISH')+
    arrow('M230 113 H250 V205 H278')+arrow('M230 205 H278')+arrow('M230 297 H250 V205 H278')+
    arrow('M378 246 V286')+arrow('M378 368 V410',true)+arrow('M478 327 H530')+arrow('M478 451 H505 V327 H530',true)+arrow('M630 368 V410')+arrow('M630 492 V532')+
    card(24,72,206,['Failed CI run','Logs and artifacts'])+card(24,164,206,['Source checkout','Failing revision'])+card(24,256,206,['Caeser release','Prebuilt CLI'])+
    card(278,164,200,['Diagnose','Read-only permissions'],{dark:true})+card(278,286,200,['JSON report','Evidence bundle + brief'])+card(278,410,200,['Model analysis','Optional · bounded input'],{optional:true})+
    card(530,286,206,['Final artifact','Evidence + analysis'])+card(530,410,206,['Publish','Comment permissions'],{dark:true})+card(530,532,206,['One updated','PR comment'])
  );
  if (hash === '7640a07e6c1d') return svg('Investigation pipeline', 'Normalize a failed run, find source leads and produce a deterministic report. Execution and model analysis are optional. Publication remains separate.', 548,
    label(24,35,'01 / READ EVIDENCE')+label(278,35,'02 / INVESTIGATE')+label(530,35,'03 / HAND OFF')+
    arrow('M230 106 H278')+arrow('M378 147 V187')+arrow('M478 228 H530')+arrow('M630 269 V309')+arrow('M630 391 V431')+
    arrow('M230 228 H278',true)+arrow('M378 269 V309',true)+arrow('M478 350 H530',true)+
    card(24,65,206,['Failed CI run','Logs + artifacts'])+card(278,65,200,['Normalize failures','Find source leads'],{dark:true})+card(278,187,200,['Deterministic report','Ranked function leads'])+
    card(24,187,206,['Execution + probes','Optional evidence'],{optional:true})+card(278,309,200,['Model analysis','Optional enrichment'],{optional:true})+
    card(530,187,206,['JSON + brief','Inspectable evidence'])+card(530,309,206,['Final artifact','Keep original evidence'])+card(530,431,206,['Separate publication','Update one PR comment'],{dark:true})
  );
  if (hash === 'c513f0cc9e45') return svg('Workspace and execution lifecycle', 'Prepare and validate an isolated workspace, execute locally or in Docker, capture bounded output, preserve evidence, then clean up. Cancellation terminates the selected backend.', 664,
    label(24,36,'01 / PREPARE')+label(278,36,'02 / EXECUTE')+label(530,36,'03 / PRESERVE')+
    arrow('M127 147 V187')+arrow('M127 269 V309')+arrow('M230 350 H250 V52 H378 V65')+arrow('M378 147 V187')+
    arrow('M478 106 H506 V350 H478')+arrow('M478 228 H505 V350 H530')+arrow('M478 350 H530')+arrow('M630 391 V431')+arrow('M630 513 V553')+
    arrow('M378 391 V431',true)+arrow('M478 472 H505 V350 H530',true)+
    card(24,65,206,['Requested experiment','Exact revision'])+card(24,187,206,['Disposable workspace','Recorded checkout'])+card(24,309,206,['Validate policy','Command · env · limits'],{dark:true})+
    card(278,65,200,['Choose backend','Configured executor'])+card(278,187,200,['Local execution','Process group'])+card(278,309,200,['Docker execution','Disposable container'])+
    card(278,431,200,['On cancellation','Terminate / remove'],{optional:true})+
    card(530,309,206,['Capture output','Bounded stdout + stderr'])+card(530,431,206,['Preserve evidence','Exit · timing · artifacts'])+card(530,553,206,['Clean up','Workspace + resources'],{dark:true})
  );
}
