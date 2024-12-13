import express from 'express';
const app = express();

app.listen(8080, () => {
  console.dir("Server running");
});


app.get ('/',(req,res) => {
  res.send("Hello World");
})


app.get ('/cats',(req,res) => {
  res.send("meow");
})


app.get ('*',(req,res) => {
  res.send("Enter the correct URL");
})

