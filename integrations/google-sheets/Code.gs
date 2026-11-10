// Bound to City Samithi DB. Only appends registration rows; never returns registrant data.
const SPREADSHEET_ID = '140173DevRMJVly0v2Uo8Z9o3wT5QzFTjz5W-tF3PZcQ';
const HEADERS = ['Submission ID','Submitted At','Name','Gender','Age','Date of Birth','Email ID','Education Qualification','Current profession','Special skills','Bhajan Mandali / City Samithi','City Samithi groups','Contact number'];
function jsonResponse(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
function doGet() { return jsonResponse({ok:true,service:'devotee-registrations',version:8}); }
function doPost(e) {
  let lock;
  try {
    if (!e || !e.postData || e.postData.contents.length > 5000) throw new Error('Invalid request.');
    const data = JSON.parse(e.postData.contents);
    if (data.website) throw new Error('Invalid request.');
    const text = (value, max) => typeof value === 'string' ? value.trim().slice(0,max) : '';
    const name = text(data.name,100), email = text(data.email,150);
    const id = text(data.submissionId,36), ageText = typeof data.age === 'string' ? data.age.trim() : '', dob = text(data.dob,10);
    if (!/^[a-f0-9-]{36}$/i.test(id) || name.length < 2 || !['Female','Male','Other','Prefer not to say'].includes(data.gender) || !validBirthDate(dob,ageText)) throw new Error('Please check name, gender, age and date of birth.');
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid email.');
    const contact = text(data.contact,15).replace(/[ +()-]/g,'').replace(/^91(?=\d{10}$)/,'');
    if (!/^[6-9]\d{9}$/.test(contact)) throw new Error('Enter a valid 10-digit WhatsApp contact number.');
    const community = text(data.community,100), groups = data.groups === undefined ? [] : data.groups;
    if (!COMMUNITY_OPTIONS.includes(community)) throw new Error('Invalid Bhajan Mandali or City Samithi.');
    if (!Array.isArray(groups) || groups.length>CITY_GROUPS.length || groups.some(g=>!CITY_GROUPS.includes(g)) || (community !== 'City Samithi' && groups.length) || (community === 'City Samithi' && !groups.length)) throw new Error('Invalid City Samithi groups.');
    lock = LockService.getScriptLock(); lock.waitLock(20000);
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Devotee Registrations');
    if (!sheet) throw new Error('Registration sheet is unavailable.');
    ensureRegistrationColumns(sheet);
    const rows = sheet.getLastRow()>1 ? sheet.getRange(2,1,sheet.getLastRow()-1,HEADERS.length).getDisplayValues() : [];
    if (rows.some(row=>row[0]===id)) return jsonResponse({ok:true,submissionId:id});
    const normalName = value => String(value).normalize('NFKC').trim().replace(/\s+/g,' ').toLowerCase();
    const birthKey = value => {
      const v = String(value).replace(/^'/,'').trim();
      if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v.slice(8)+'/'+v.slice(5,7)+'/'+v.slice(2,4);
      return v.replace(/(\d{2}\/\d{2}\/)\d{2}(\d{2})$/, '$1$2');
    };
    if (rows.some(row=>normalName(row[2])===normalName(name) && birthKey(row[5])===birthKey(dob) && row[3]===data.gender && (!row[12] || String(row[12]).replace(/[^0-9]/g,'').replace(/^91(?=\d{10}$)/,'')===contact)))
      throw new Error('This person is already registered. Please contact the Samithi if you need to update the details.');
    const safe = value => /^[=+@\-\t\r]/.test(value) ? "'"+value : value;
    sheet.appendRow([id,Utilities.formatDate(new Date(),'Asia/Kolkata','yyyy-MM-dd HH:mm:ss'),safe(name),data.gender,Number(ageText),"'"+dob,safe(email),safe(text(data.education,200)),safe(text(data.profession,200)),safe(text(data.skills,1000)),community,[...new Set(groups)].join(', '),safe(contact)]);
    SpreadsheetApp.flush();
    return jsonResponse({ok:true,submissionId:id});
  } catch(error) { return jsonResponse({ok:false,error:error.message || 'Could not save registration.'}); }
  finally { if(lock && lock.hasLock()) lock.releaseLock(); }
}

function ensureRegistrationColumns(sheet) {
  const current = sheet.getRange(1,1,1,12).getDisplayValues()[0];
  if (current.some((value,i)=>value!==HEADERS[i] && !(i===7 && value==='Highest education qualification')))
    throw new Error('Registration sheet columns have changed. Please contact the Samithi.');
  if (sheet.getMaxColumns()<13) sheet.insertColumnsAfter(sheet.getMaxColumns(),13-sheet.getMaxColumns());
  const contactHeader=sheet.getRange(1,13).getDisplayValue();
  if (contactHeader && contactHeader!=='Contact number') throw new Error('Contact column is already in use. Please contact the Samithi.');
  if (current[7]!==HEADERS[7]) sheet.getRange(1,8).setValue(HEADERS[7]);
  if (!contactHeader) sheet.getRange(1,13).setValue('Contact number');
}
function validBirthDate(dob, ageText) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dob) || !/^\d{1,3}$/.test(ageText)) return false;
  const [year,month,day]=dob.split('-').map(Number);
  const birth=new Date(year,month-1,day);
  const [y,m,d]=Utilities.formatDate(new Date(),'Asia/Kolkata','yyyy-MM-dd').split('-').map(Number);
  const age=y-year-(m<month || (m===month && d<day) ? 1 : 0);
  return birth.getFullYear()===year && birth.getMonth()===month-1 && birth.getDate()===day && dob<=Utilities.formatDate(new Date(),'Asia/Kolkata','yyyy-MM-dd') && age>=0 && age<=120 && age===Number(ageText);
}

const COMMUNITY_OPTIONS = ['Devotee','MVP Colony','Lawsons Bay Colony','Waltair Uplands','Seethammadhara','Nakkavanipalem','HB Colony','Arilova','Sagar Nagar','Yendada','Vishalakshi Nagar','City Samithi'];
const CITY_GROUPS = ['Singers Group','Balvikas Group','Youth Wing','Sevadal','Spiritual Wing'];
