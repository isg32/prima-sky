/**
 * Prima Sky — enquiry form → Google Sheet.
 *
 * Deploy as a Web app (Execute as: Me, Who has access: Anyone) and put its URL
 * in APPS_SCRIPT_URL. Set the same random string below and in APPS_SCRIPT_SECRET.
 */

const SECRET = 'CHANGE-ME-to-a-long-random-string';
const SHEET_NAME = 'Enquiries';
const NOTIFY_EMAIL = 'shreebalajilotusbuildcon@gmail.com'; // set to '' to disable alerts

const HEADERS = ['Timestamp', 'Name', 'Phone', 'Email', 'Interest', 'Message', 'Language', 'Source page'];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents || '{}');
    if (data.secret !== SECRET) return json_({ ok: false, error: 'forbidden' });

    const sheet = getSheet_();
    const row = [
      new Date(),
      clean_(data.name),
      "'" + clean_(data.phone), // keep leading zeros / stop formula parsing
      clean_(data.email),
      clean_(data.interest),
      clean_(data.message),
      clean_(data.lang),
      clean_(data.page),
    ];
    sheet.appendRow(row);

    if (NOTIFY_EMAIL) {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: 'New Prima Sky enquiry — ' + row[1] + ' (' + row[4] + ')',
        body: HEADERS.map(function (h, i) { return h + ': ' + String(row[i]).replace(/^'/, ''); }).join('\n'),
      });
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Strip leading formula characters so a lead can't inject a spreadsheet formula.
function clean_(v) {
  return String(v == null ? '' : v).replace(/^[=+\-@]+/, '').slice(0, 2000);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
