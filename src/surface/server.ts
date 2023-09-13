import dotenv from 'dotenv';
dotenv.config();

import app from './web/http/express/app';

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
