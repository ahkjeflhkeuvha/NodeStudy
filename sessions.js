var express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser')
var bkfd2Password = require('pbkdf2-password')
var md5 = require('md5')
var salt = 'dfae$#@Eaf#we3'
var hasher = bkfd2Password()
var app = express()

app.use(bodyParser.urlencoded({extended : false}))
app.use(session({
    secret: 'randomkey', 
    resave: false,
    saveUnitionaized: true //session id를 사용하기 전까지 접속 X
}))

var savedUser = {
    user : 'jieun',
    pw : 'c7803d1d15ddf56af8b3898c0644c174',
    displayname : 'Jieun!'
}

app.post('/auth/login', (req, res)=>{   
    var user = req.body.username
    var pw = req.body.password
    
    if(user === savedUser.user && md5(pw + salt) === savedUser.pw) {
        req.session.displayname = savedUser.displayname
        res.redirect('/welcome')
    }
    else res.send(`who are you <a href="/auth/login>login</a>"`)
})

app.get('/auth/login', (req, res)=>{
    var output = `
        <form action="/auth/login" method="post">
            <p>
                <input type="text" name="username" placeholder="username">
            </p>
            <p>
                <input type="password" name="password" placeholder="password">
            </p>
            <p>
                <input type="submit">
            </p>
        </form>
    `
    res.send(output)
})

app.get('/logout', (req, res)=>{
    delete req.session.displayname
    res.redirect('/welcome')
})

app.get('/welcome', (req, res)=>{
    if(req.session.displayname){
        res.send(`<h1>Welcome : ${req.session.displayname}</h1>
                <a href="/logout"> logout </a>`)
    }
    else {
        res.send(`
            <h1>Login please</h1>
            <a href="/auth/login">login</a>
        `)
    }
})

app.get('/count', (req, res)=>{
    if(req.session.count) req.session.count++
    else req.session.count = 1
    res.send('session : ' + req.session.count)
})

app.listen(3000, ()=>{
    console.log('connected')
})