// Bound to City Samithi DB. Only appends registration rows; never returns registrant data.
const SPREADSHEET_ID = '140173DevRMJVly0v2Uo8Z9o3wT5QzFTjz5W-tF3PZcQ';
const HEADERS = ['Submission ID','Submitted At','Full Name','Mobile','Email','Mandali / Group','Category','Locality','Contact Consent'];
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
    const name = text(data.name,100), phone = text(data.phone,10), email = text(data.email,100), locality = text(data.locality,150);
    const id = text(data.submissionId,36);
    if (!/^[a-f0-9-]{36}$/i.test(id) || name.length < 2 || !/^[6-9]\d{9}$/.test(phone) || locality.length < 2 || data.consent !== true) throw new Error('Please check required fields.');
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Invalid email.');
    if (!['Devotee','Active Sevadal','Balvikas Guru'].includes(data.category)) throw new Error('Invalid registration category.');
    const group = MANDALI_NAMES[data.mandali];
    if (!group) throw new Error('Invalid Mandali.');
    lock = LockService.getScriptLock(); lock.waitLock(20000);
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Sheet1');
    if (!sheet) throw new Error('Registration sheet is unavailable.');
    const current = sheet.getRange(1,1,1,HEADERS.length).getDisplayValues()[0];
    if (current.some((value,i)=>value!==HEADERS[i])) throw new Error('Registration sheet columns have changed. Please contact the Samithi.');
    if (sheet.getLastRow()>1 && sheet.getRange(2,1,sheet.getLastRow()-1,1).createTextFinder(id).matchEntireCell(true).findNext()) return jsonResponse({ok:true,submissionId:id});
    const safe = value => /^[=+@\-\t\r]/.test(value) ? "'"+value : value;
    sheet.appendRow([id,Utilities.formatDate(new Date(),'Asia/Kolkata','yyyy-MM-dd HH:mm:ss'),safe(name),"'"+phone,safe(email),group,data.category,safe(locality),'Yes']);
    SpreadsheetApp.flush();
    return jsonResponse({ok:true,submissionId:id});
  } catch(error) { return jsonResponse({ok:false,error:error.message || 'Could not save registration.'}); }
  finally { if(lock && lock.hasLock()) lock.releaseLock(); }
}

const MANDALI_NAMES = {
  "mvp-colony": "MVP Colony",
  "lawsons-bay-colony": "Lawsons Bay Colony",
  "waltair-uplands": "Waltair Uplands",
  "seethammadhara": "Seethammadhara",
  "nakkavanipalem": "Nakkavanipalem",
  "hb-colony": "HB Colony",
  "arilova": "Arilova",
  "sagar-nagar": "Sagar Nagar",
  "yendada": "Yendada",
  "vishalakshi-nagar": "Vishalakshi Nagar",
  "city-samithi-members": "City Samithi (Devotee/Active Sevadal/Balvikas Guru)",
  "city-samithi-office-bearers": "City Samithi Office Bearers"
};
