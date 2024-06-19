const express = require("express");

const { google } = require("googleapis");

const app = express();
const port = 8080;
const id = "1l92Id7YCJj4ajTlic53Wu1sZNDiWnI-ToQ5BsbVKqKo";
//This allows us to parse the incoming request body as JSON
app.use(express.json());

// With this, we'll listen for the server on port 8080
app.listen(port, () => console.log(`Listening on port ${port}`));
async function authSheets() {
  //Function for authentication object
  const auth = new google.auth.GoogleAuth({
    keyFile: "keys.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  //Create client instance for auth
  const authClient = await auth.getClient();

  //Instance of the Sheets API
  const sheets = google.sheets({ version: "v4", auth: authClient });
  await sheets.spreadsheets.values.append({
    spreadsheetId: id,
    range: "Sheet1",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [["Gabriella", "Female", "4. Senior"]],
    },
  });
  return {
    auth,
    authClient,
    sheets,
  };
}
app.get("/", async (req, res) => {
  const { sheets } = await authSheets();

  // Read rows from spreadsheet
  const getRows = await sheets.spreadsheets.values.get({
    spreadsheetId: id,
    range: "Sheet1",
  });

  res.send(getRows.data);
});
