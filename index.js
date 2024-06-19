const express = require("express");

const { google } = require("googleapis");

const app = express();
const port = 8080;
const id = "1l92Id7YCJj4ajTlic53Wu1sZNDiWnI-ToQ5BsbVKqKo";
//This allows us to parse the incoming request body as JSON
app.use(express.json());

// With this, we'll listen for the server on port 8080
app.listen(port, () => console.log(`Listening on port ${port}`));

const credentials = {
  type: "service_account",
  project_id: "integral-surfer-404705",
  private_key_id: "1c8bfb8fc72fc233b2fbd708102b7b71d86f7932",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCwZY+s390NZruG\n9zt975xLva5Fa+pYLJG/3HatJwne6R+ju3sfIpNQL8m8Yfrn21Ih8Y65zzIJhz8w\nqaYCQkUVkVTAhkg8XaiBRptvdP3QgUGwMVoAGmwpxRNAYpREfCJ6kfV5axvf4wgH\nenTmVz/If8xt0N3ROGIT8L55s4H7khkIfkTsLVe0nS8G3ZDIoqoE/VVZbWyiLRqV\nIgPTL/yfMPeKEc2/WGAXaonvkM7LLKDFdtW4t06q8JQz2dV4Y6LFwMfRR1krQZUL\nZDqM6T/FSYic3kfzoNLudH7yApf/NIvJJRTrtC1a3Iw8U7Rselu3mmnB0ukqkr8R\nJA1MoT3PAgMBAAECggEAUIWkDvHICjCNxSABx8zD561IKseG28ZIqDD++a7a6ic3\n+rmADCfv4EhYSkbdzs5G0Vjf4sEK4d+bwF6I+fn/aEeFzTbfLbNBUvYEyV256V6/\nuirlHyvwmSat0ZPOg+64nIQZbtouiMat6SAE0gsdAi0YiD6yqymWV+zrPknruYbm\n1mP1NcSU8+FCW5tmLk3l7U2MAfMbh7Dq4nZh0xudztus+v9fITC17gYh+b0rPcVe\n20SjyKeVxYxD2mqJ2YO/+FpnxvaZdV5ie+qY8yi4q/T+eNco7yIYrCL7UFYo0IRE\nGYV98UWVq02xMHr0ikVXwbpYTd7qSQYYoKIDTudOAQKBgQDgxx/xaLwwcFESAnP6\nznJegO6JPaUvYwwVENXWzXdLopUlvtuUHE/OLBPf2vBEjV+H9/2zEERmiAGs7/To\n/NWLPciKrs95v81Zju8HzleosTV5LxGy7fP6vKNkzaSIyaTqcmmYqpobYFDyXKsD\ndGjpxC5TBQXDEZNs/2Yg6WiSAQKBgQDI5g111ZEXT/NJwDoUD5bjkx91rmu6YkGs\nzBpEosnYSjsQr/eU2NRRqnmML/C3ZeP0yv70uH+4xGgFqs7HpMYkMeCTwWoCxQTP\nm50bCw4qpjUYg4QdEMYGjQwsLGyYwnd47wpRhIPMcbnplQFQMKLdd3IClWTQfhAF\n2UsfBEUvzwKBgQDVmoTxfW0wvttbuPcMRXmL8ww7YViDcqV9s1Ty3qhaOPNxPjEe\nS9VPALYWSdF/47T/2hu+OVw271JgTFu5uOMZgin8GGlTsoBrdhgSm/TTeytssN0p\n41SyVucTGRUdZDoTDYzppl3yXBIwbv2Yt9wnIeY/wIscN6yYrRAZgJV+AQKBgE0z\nGjkNuJOcxYCxvZ+33ePVxWEThZI578LXK8D0TVwwKkJfXGR2biBzwgF86qOPI+oN\nl6uyumHmF5MV8CAH0ZxXDlW5HWOzEgY1ZkneFbON6xlgcIQ6zd32lZbj+1c4Y3C1\nauGoan1FtotsFvUZu3wfSlBz2CnGR6H3vkZM/clBAoGAOubc0GeFtpzP079qsimg\nexD9yf1oeEKwoPNVy5Tl1X7zxw6tFjN6G8jcEaAtIicz78VUhJzfiUQlCeldh3yv\nJP9JE0bLvVCnSApHvKqtGTocWTXqt2/4G2ER4LeMYNFuXglxuxcHRoWAHr3N/DFG\nuAeo5IWAoIRHn3UEnF9UtIY=\n-----END PRIVATE KEY-----\n",
  client_email: "json2table@integral-surfer-404705.iam.gserviceaccount.com",
  client_id: "118308490847777898246",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/json2table%40integral-surfer-404705.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};
async function authSheets() {
  //Function for authentication object
  const auth = new google.auth.GoogleAuth({
    credentials: credentials,
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
