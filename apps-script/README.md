# Enquiry form → Google Sheets

The website's enquiry form posts to `/api/enquiry`, which forwards each lead to a
Google Apps Script web app. The script appends a row to a Google Sheet and
(optionally) emails the sales inbox.

## One-time setup

1. Create a new Google Sheet (e.g. **Prima Sky — Enquiries**) with the Google
   account that should own the leads.
2. In the sheet, open **Extensions → Apps Script**. Delete the sample code and
   paste in the contents of [`Code.gs`](./Code.gs).
3. Change `SECRET` at the top to a long random string (for example the output of
   `openssl rand -hex 24`). Change `NOTIFY_EMAIL` if alerts should go elsewhere,
   or set it to `''` to turn them off.
4. Click **Deploy → New deployment**, choose type **Web app**, and set:
   - *Execute as*: **Me**
   - *Who has access*: **Anyone**
5. Authorise the permissions it asks for (Sheets + send email), then copy the
   **Web app URL** (it ends in `/exec`).
6. Add both values to the site's environment:

   ```bash
   # .env.local (for local dev) and Vercel → Project → Settings → Environment Variables
   APPS_SCRIPT_URL=https://script.google.com/macros/s/XXXXXXXX/exec
   APPS_SCRIPT_SECRET=the-same-random-string-as-in-Code.gs
   ```

7. Redeploy the site. Submit a test enquiry; a row should appear in the
   **Enquiries** tab within a few seconds.

## Updating the script later

After editing `Code.gs`, use **Deploy → Manage deployments → Edit → Version: New
version**. Creating a *new* deployment would change the URL.

## Columns

Timestamp · Name · Phone · Email · Interest · Message · Language · Source page
