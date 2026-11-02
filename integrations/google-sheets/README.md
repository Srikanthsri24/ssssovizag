# Devotee registrations → City Samithi DB

The destination is the existing spreadsheet `140173DevRMJVly0v2Uo8Z9o3wT5QzFTjz5W-tF3PZcQ`, tab `Sheet1`.
Headers A1:I1 must match the `HEADERS` constant in Code.gs. Do not reorder them without updating the receiver.

## Setup

1. Open the spreadsheet → Extensions → Apps Script. The prepared project is named **Premsadan Devotee Registrations**. Source is in `Code.gs` in this directory.
2. Deploy → New deployment → Web app. Execute as the Google account with edit access to the sheet. Access: Anyone, for visitors who are not signed into Google. Authorize spreadsheet access in Google. This is an append-only public endpoint; GET returns health information only. Keep sheet sharing restricted to its coordinators.
3. Copy the deployment URL ending `/exec` (not the project editor URL or `/dev`).
4. Set the GitHub repository Actions variable `VITE_REGISTRATION_ENDPOINT` to that URL. For local use, set the same variable in `.env.local` and restart Vite.
5. Rebuild and manually deploy GitHub Pages. The form remains clearly marked demo mode until this variable is present.
6. Test using fictitious details. Verify exactly one new row appears in Sheet1 before opening registration to visitors. Verify a network failure does not show success and retrying the same request does not add a duplicate.

The browser sends a JSON body with `Content-Type: text/plain` and follows the Apps Script ContentService redirect. A readable `{ok:true,submissionId}` response is required before displaying success. Never use `no-cors` and assume delivery.

Google authorization and public deployment require the account holder's approval. No account credentials or private access tokens are embedded in the website. The endpoint URL itself is public.

The receiver validates required fields and finite options, serializes writes using a script lock, deduplicates retries by submission ID, and escapes formula-like input before appending. It does not provide a registration listing or editing API. A public endpoint can still receive spam; monitor usage before a large registration drive and add server-verified anti-abuse protection if needed.

Changing script code requires deploying a new version through Manage deployments; pushing Code.gs to GitHub alone does not update Google's running receiver.
