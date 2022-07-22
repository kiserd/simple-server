# simple-server

To interact with TODO list application, navigate to the following url:
https://kiser-tecace.herokuapp.com/

api: node.js, express
db: google-spreadsheet
frontend: React.js (create-react-app)
styling: Tailwindcss

To run locally:
- clone repository
- create Google sheet document with sheet named 'tasks'
- update docId in backend_node/sheetconn.js
- create .env and populate with Google client_email and private_key
- from the root, run 'npm run build' and 'npm start'
