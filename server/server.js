const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors')

app.use(cors());
app.use('/', routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
