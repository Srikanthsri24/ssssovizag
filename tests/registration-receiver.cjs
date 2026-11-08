const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const rows=[];
const headers=['Submission ID','Submitted At','Name','Gender','Age','Date of Birth','Email ID','Highest education qualification','Current profession','Special skills','Bhajan Mandali / City Samithi','City Samithi groups'];
const sheet={getLastRow:()=>rows.length+1,getRange:r=>r===1?{getDisplayValues:()=>[headers]}:{createTextFinder:id=>({matchEntireCell:()=>({findNext:()=>rows.some(row=>row[0]===id)})})},appendRow:row=>rows.push(row)};
const context={ContentService:{createTextOutput:text=>({setMimeType:()=>JSON.parse(text)}),MimeType:{JSON:'JSON'}},SpreadsheetApp:{openById:()=>({getSheetByName:()=>sheet}),flush:()=>{}},LockService:{getScriptLock:()=>({waitLock:()=>{},hasLock:()=>true,releaseLock:()=>{}})},Utilities:{formatDate:(_date,_zone,format)=>format==='yyyy-MM-dd'?'2026-11-08':'2026-11-08 10:00:00'}};
vm.createContext(context);vm.runInContext(readFileSync('integrations/google-sheets/Code.gs','utf8'),context);
const good={submissionId:'11111111-1111-4111-8111-111111111111',community:'MVP Colony',groups:[],name:'TEST Required Fields',gender:'Other',age:'26',dob:'15/08/00',email:'sample@example.com',education:'Graduate',profession:'Teacher',skills:'None'};
const post=data=>context.doPost({postData:{contents:JSON.stringify(data)}});
for(const key of ['community','name','gender','age','dob','education','profession','skills']){
  assert.equal(post({...good,[key]:''}).ok,false,`${key} cannot be blank`);
  assert.equal(post({...good,[key]:'   '}).ok,false,`${key} cannot be whitespace`);
}
assert.equal(post({...good,community:'City Samithi',groups:[]}).ok,false);
assert.equal(post({...good,dob:'31/02/00'}).ok,false);
assert.equal(rows.length,0);
assert.equal(post(good).ok,true);assert.equal(rows.length,1);
assert.equal(post(good).ok,true);assert.equal(rows.length,1);
assert.equal(post({...good,submissionId:'22222222-2222-4222-8222-222222222222',community:'City Samithi',groups:['Spiritual Wing']}).ok,true);
assert.equal(rows[1][11],'Spiritual Wing');
console.log('Passed: every required field, whitespace rejection, City Samithi groups, invalid dates, valid submission and duplicate prevention.');

assert.equal(post({...good,email:'bad-email'}).ok,false);
for (const email of ['', '   ']) {
 const submissionId=require('node:crypto').randomUUID();
 assert.equal(post({...good,submissionId,email}).ok,true);
 assert.equal(rows.at(-1)[6],'');
}
