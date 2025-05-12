const express = require('express');
const routes = require('./routes/routes');
 

const app = express();
const PORT = process.env.PORT || 2000;



app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
 
// Use the router
app.use(routes);
  

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
