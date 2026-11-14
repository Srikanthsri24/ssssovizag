const {readFileSync}=require('node:fs');
const vm=require('node:vm'),assert=require('node:assert/strict');
const rows=[];
const headers=['Submission ID','Submitted At','Name','Gender','Age','Date of Birth','Email ID','Highest education qualification','Current profession','Special skills','Bhajan Mandali / City Samithi','City Samithi groups'];
let columns=12;
const sheet={getMaxColumns:()=>columns,insertColumnsAfter:(_c,n)=>columns+=n,getLastRow:()=>rows.length+1,getRange:(r,c,n,w)=>({getDisplayValues:()=>r===1?[headers.slice(c-1,c-1+w)]:rows.map(row=>row.map(String)),getDisplayValue:()=>headers[c-1]||'',setValue:value=>headers[c-1]=value}),appendRow:row=>rows.push(row)};
const context={ContentService:{createTextOutput:text=>({setMimeType:()=>JSON.parse(text)}),MimeType:{JSON:'JSON'}},SpreadsheetApp:{openById:()=>({getSheetByName:()=>sheet}),flush:()=>{}},LockService:{getScriptLock:()=>({waitLock:()=>{},hasLock:()=>true,releaseLock:()=>{}})},Utilities:{formatDate:(_d,_z,f)=>f==='yyyy-MM-dd'?'2026-11-10':'2026-11-10 10:00:00'}};
vm.createContext(context);vm.runInContext(readFileSync('integrations/google-sheets/Code.gs','utf8'),context);
const id=()=>require('node:crypto').randomUUID();
const good={submissionId:id(),community:'MVP Colony',groups:[],name:'TEST Required Fields',gender:'Other',age:'26',dob:'2000-08-15',contact:'9888888888',email:'',education:'',profession:'',skills:''};
const post=data=>context.doPost({postData:{contents:JSON.stringify(data)}});
for(const key of ['community','name','gender','age','dob','contact'])for(const blank of ['', '   ']) assert.equal(post({...good,[key]:blank}).ok,false,key);
for(const data of [{email:'bad'},{dob:'2000-02-31'},{dob:'2030-01-01'},{age:'25'},{contact:'12345'},{community:'City Samithi',groups:[]}]) assert.equal(post({...good,...data}).ok,false);
assert.equal(rows.length,0);
assert.equal(post(good).ok,true);
assert.equal(headers[7],'Education Qualification');assert.equal(headers[12],'Contact number');assert.equal(headers[13],'Blood Group');assert.equal(columns,14);
assert.equal(rows[0][12],'9888888888');
assert.equal(post(good).ok,true);assert.equal(rows.length,1);
assert.equal(post({...good,submissionId:id()}).ok,false);assert.equal(rows.length,1);
assert.equal(post({...good,submissionId:id(),name:'  test   required fields ',contact:'+91 9888888888'}).ok,false);
assert.equal(post({...good,submissionId:id(),name:'Second Person',community:'City Samithi',groups:['Spiritual Wing']}).ok,true);
// Existing registrations without a phone are also protected, including old date format.
rows.push([id(),'2026-11-08 10:00:00','Legacy Person','Other','26',"'15/08/00",'','','','','MVP Colony','']);
assert.equal(post({...good,submissionId:id(),name:'Legacy Person'}).ok,false);
console.log('Passed required fields, optional fields, dates/age, contact, schema migration, duplicate and legacy checks.');

assert.equal(post({...good,submissionId:id(),name:'City Devotee',community:'City Samithi',groups:['Devotee']}).ok,true);
assert.equal(rows.at(-1)[11],'Devotee');
assert.equal(post({...good,submissionId:id(),community:'Devotee'}).ok,false);

const city={...good,submissionId:id(),community:'City Samithi',groups:['Vedam Group'],bloodGroup:'Prefer not to say'};
assert.equal(post(city).ok,true,'Mandali members can also register for City Samithi');
assert.equal(rows.at(-1)[11],'Vedam Group');
assert.equal(rows.at(-1)[13],'Prefer not to say');
assert.equal(post({...city,submissionId:id()}).ok,false,'City Samithi duplicates are rejected');
assert.equal(post({...good,submissionId:id(),name:'Invalid Blood Group',bloodGroup:'C+'}).ok,false);
assert.equal(post({...good,submissionId:id(),name:'Blood Group Choice',bloodGroup:'AB-'}).ok,true);
assert.equal(rows.at(-1)[13],'AB-');
console.log('Passed Vedam Group, Blood Group and community-scoped duplicates.');
