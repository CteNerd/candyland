const express = require('express');
const path = require('path');
const app = express();

const buildPath = path.join(__dirname, 'build');
app.use(express.static(buildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});