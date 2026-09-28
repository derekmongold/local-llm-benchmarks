'use strict';
// Finite synthetic JS verifier. VM is supplementary; OS read/network denial is separate.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const cases=require('./oracles.cjs');
let stage='source',property,checks=0;
try{
 const key=process.argv[2],source=fs.readFileSync(process.argv[3],'utf8');
 if(!Object.hasOwn(cases,key)||Buffer.byteLength(source)>16000)throw Error('source_limit');
 if(/\b(?:require|import|export|process|fetch|eval|Function|WebAssembly|console|setTimeout|setInterval|Proxy|Reflect)\b|__proto__|\bconstructor\b|Math\.random|Date\s*[.(]/.test(source))throw Error('restricted_source');
 const {fn,tests}=cases[key];
 new vm.Script(source);stage='oracle';
 for(const test of tests){
  property=test.property;
  const encoded=test.argsExpression || JSON.stringify(test.args);
  // Inputs are constructed inside the VM; no host objects/functions are passed in.
  const program=source+'\nconst encode=(k,v)=>typeof v==="number"&&!Number.isFinite(v)?{$number:String(v)}:v; const args='+encoded+'; const before=JSON.stringify(args,encode); const actual='+fn+'(...args); JSON.stringify({actual,sameArray:actual===args[0],before,after:JSON.stringify(args,encode)},encode);';
  const context=vm.createContext(Object.create(null),{codeGeneration:{strings:false,wasm:false}});
  const result=JSON.parse(new vm.Script(program).runInContext(context,{timeout:100}));
  assert.deepEqual(result.actual,test.expected);checks++;
  property='input_unchanged';assert.equal(result.before,result.after);checks++;
  if(key==='stable-order'){property='new_array';assert.equal(result.sameArray,false);checks++;}
  if(key==='status-summary'){property='row_conservation';assert.equal(Object.values(result.actual).reduce((a,b)=>a+b,0),JSON.parse(result.before)[0].length);checks++;}
 }
 console.log(JSON.stringify({passed:true,stage,checks,case:key}));
}catch(error){
 console.log(JSON.stringify({passed:false,stage,checks,property,error_class:error instanceof assert.AssertionError?'AssertionError':error.name,failure_class:stage==='source'?'source_rejected':'independent_check_rejected'}));
 process.exitCode=2;
}
