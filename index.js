var csrf=require('./header-check');
var app=require('express')();

app.use(csrf.headerCheck());
