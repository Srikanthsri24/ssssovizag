// Bound to City Samithi DB. Only appends registration rows; never returns registrant data.
const SPREADSHEET_ID = '140173DevRMJVly0v2Uo8Z9o3wT5QzFTjz5W-tF3PZcQ';
const HEADERS = ['Submission ID','Submitted At','Name','Gender','Age','Date of Birth','Email ID','Highest education qualification','Current profession','Special skills'];
function jsonResponse(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
function doGet() { return jsonResponse({ok:true,service:'devotee-registrations',version:1}); }
function doPost(e) {
  let lock;
  try {
    if (!e || !e.postData || e.postData.contents.length > 5000) throw new Error('Invalid request.');
    const data = JSON.parse(e.postData.contents);
    if (data.website) throw new Error('Invalid request.');
    const text = (value, max) => typeof value === 'string' ? value.trim().slice(0,max) : '';
    const name = text(data.name,100), email = text(data.email,150);
    const id = text(data.submissionId,36), ageText = typeof data.age === 'string' ? data.age.trim() : '', dob = text(data.dob,8);
    if (!/^[a-f0-9-]{36}$/i.test(id) || name.length < 2 || !['Female','Male','Other','Prefer not to say'].includes(data.gender) || !validBirthDate(dob,ageText)) throw new Error('Please check name, gender, age and date of birth.');
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid email.');
    lock = LockService.getScriptLock(); lock.waitLock(20000);
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Devotee Registrations');
    if (!sheet) throw new Error('Registration sheet is unavailable.');
    const current = sheet.getRange(1,1,1,HEADERS.length).getDisplayValues()[0];
    if (current.some((value,i)=>value!==HEADERS[i])) throw new Error('Registration sheet columns have changed. Please contact the Samithi.');
    if (sheet.getLastRow()>1 && sheet.getRange(2,1,sheet.getLastRow()-1,1).createTextFinder(id).matchEntireCell(true).findNext()) return jsonResponse({ok:true,submissionId:id});
    const safe = value => /^[=+@\-\t\r]/.test(value) ? "'"+value : value;
    sheet.appendRow([id,Utilities.formatDate(new Date(),'Asia/Kolkata','yyyy-MM-dd HH:mm:ss'),safe(name),data.gender,Number(ageText),"'"+dob,safe(email),safe(text(data.education,200)),safe(text(data.profession,200)),safe(text(data.skills,1000))]);
    SpreadsheetApp.flush();
    return jsonResponse({ok:true,submissionId:id});
  } catch(error) { return jsonResponse({ok:false,error:error.message || 'Could not save registration.'}); }
  finally { if(lock && lock.hasLock()) lock.releaseLock(); }
}

function validBirthDate(dob, ageText) {
  if (!/^\d{2}\/\d{2}\/\d{2}$/.test(dob) || !/^\d{1,3}$/.test(ageText)) return false;
  const parts = dob.split('/').map(Number), day=parts[0], month=parts[1], shortYear=parts[2], age=Number(ageText);
  if (age < 0 || age > 120) return false;
  const now = new Date();
  const partsToday = Utilities.formatDate(now,'Asia/Kolkata','yyyy-MM-dd').split('-').map(Number);
  const currentYear=partsToday[0], currentMonth=partsToday[1], currentDay=partsToday[2];
  return [currentYear-age,currentYear-age-1].some(year => {
    if (year % 100 !== shortYear) return false;
    const birth = new Date(year,month-1,day);
    if (birth.getFullYear() !== year || birth.getMonth() !== month-1 || birth.getDate() !== day) return false;
    const actualAge=currentYear-year-(currentMonth<month || (currentMonth===month && currentDay<day) ? 1 : 0);
    return actualAge===age;
  });
}
