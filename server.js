var express = require('express')
var app= express()
var fs = require('fs');
var fileName = 'user.txt';  

//const engines = require('consolidate');
//app.engine('hbs',engines.handlebars);
//app.set('views','./views');
var hbs = require('hbs')
app.set('view engine','hbs');
hbs.registerPartials(__dirname +'/views/partials')


app.get('/',(req,res)=>{
    res.render('home',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my Page',
        currentYear: new Date().getFullYear()
    })
})
app.get('/maintenance', (req,res)=>{
    res.render('template', {pageTitle : 'Maintenance Page',body: 'Maintenance body'});
})
app.get('/about', (req,res)=>{
    res.render('template', {pageTitle : 'About Page',body: 'About us body'});
})
hbs.registerHelper('CountUser', (fileName)=>{
    let file = fs.readFileSync(fileName,'utf8');
    let users = file.split('/');
    let userJson = [];

    users.shift();
    users.forEach(element =>{
        let name = element.split(':')[0];
        let password = element.split(':')[1];
        let positon = element.split(':')[2]
        let user = {
            'name' : name,
            'password' : password,
            'posiiion' : positon

        }
        userJson.push(user);
    })
    return userJson.length;
})

hbs.registerHelper('FindUser', (name)=>{
    let file = fs.readFileSync('user.txt','utf8');
    let users = file.split('/');
    let userJson = [];

    users.shift();
    users.forEach(element =>{
        let name = element.split(':')[0];
        let password = element.split(':')[1];
        let positon = element.split(':')[2]
        let user = {
            'name' : name,
            'password' : password,
            'posiiion' : positon

        }
        userJson.push(user);
    })
    let found = false;
    for(i = 0; i<userJson.length;i++){
        if(userJson[i].name == name){
            found = true;
            break;
        }
    }
    return found;
})

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})
hbs.registerHelper('screamIt',(msg)=>{
    return msg.toUpperCase();
})

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.debug('Server is runing..' + PORT);