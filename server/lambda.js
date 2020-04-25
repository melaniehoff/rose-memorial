import fetch from 'node-fetch';
const process_api_key = process.env.AIRTABLE_API_KEY;
const MAX_RECORDS = 500;

exports.handler = async (event) => {
  console.log(process_api_key);
  const response = await fetch(`https://api.airtable.com/v0/appZuPErukOoOExF9/RoseGarden?maxRecords=${MAX_RECORDS}&view=Grid%20view`, {
"headers": {"Authorization": `Bearer ${process_api_key}`} })
  const data = await response.text();

  return { statusCode: 200, body: data};
}
