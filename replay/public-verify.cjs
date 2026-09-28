'use strict';
// Public checkpoint reports only. Hidden diagnostics are handled by a separate verifier.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const cases=JSON.parse(fs.readFileSync(__dirname+'/public-cases.json','utf8')).cases;
let checks=0,stage='source';const failures=[];
try{
 const key=process.argv[2],source=fs.readFileSync(process.argv[3],'utf8');
 if(!Object.hasOwn(cases,key)||Buffer.byteLength(source)>16000)throw Error('source_limit');
 if(/\b(?:require|import|export|process|fetch|eval|Function|WebAssembly|console|setTimeout|setInterval|Proxy|Reflect)\b|__proto__|\bconstructor\b|Math\.random|Date\s*[.(]/.test(source))throw Error('restricted_source');
 new vm.Script(source);stage='oracle';
 for(const [index,test]of cases[key].tests.entries()){
  const args=test.argsExpression||JSON.stringify(test.args);
  const program=source+'\nconst encode=(k,v)=>typeof v==="number"&&!Number.isFinite(v)?{$number:String(v)}:v; const args='+args+'; const before=JSON.stringify(args,encode); const actual='+cases[key].fn+'(...args); JSON.stringify({actual,sameArray:actual===args[0],before,after:JSON.stringify(args,encode)},encode);';
  const context=vm.createContext(Object.create(null),{codeGeneration:{strings:false,wasm:false}});
  let r;
  try{
   r=JSON.parse(new vm.Script(program).runInContext(context,{timeout:100}));
   assert.deepEqual(r.actual,test.expected);checks++;assert.equal(r.before,r.after);checks++;
   if(key==='stable-order'){assert.equal(r.sameArray,false);checks++;}
   if(key==='status-summary'){assert.equal(Object.values(r.actual).reduce((a,b)=>a+b,0),JSON.parse(r.before)[0].length);checks++;}
  }catch(e){
   if(e.code==='ERR_SCRIPT_EXECUTION_TIMEOUT')throw e;
   failures.push({test_index:index,...(test.argsExpression?{argsExpression:test.argsExpression}:{args:test.args}),expected:test.expected,...(r?{actual:r.actual,unchanged_input:r.before===r.after}:{error_class:e.name}),...(key==='stable-order'&&r?{returned_input_array:r.sameArray}: {})});
  }
 }
 const passed=failures.length===0;
 console.log(JSON.stringify({passed,stage,case:key,checks,...(!passed?{error_class:'AssertionError',failure_class:'public_check_rejected',public_failures:failures}: {})}));process.exitCode=passed?0:2;
}catch(e){console.log(JSON.stringify({passed:false,stage,checks,error_class:e.name,failure_class:'public_verifier_rejected'}));process.exitCode=2;}
