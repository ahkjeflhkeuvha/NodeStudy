var express = require('express')
var session = require('express-session')
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.urlencoded({extended : false}))
app.use(session({
    secret: 'randomkey', 
    resave: false,
    saveUnitionaized: true //session id를 사용하기 전까지 접속 X
}))

app.post('/auth/login', (req, res)=>{
    var savedUser = {
        user : 'jieun',
        pw : '1234'
    }
    var user = req.body.username
    var pw = req.body.password
    
    
    if(user === savedUser.user && pw === savedUser.pw) res.redirect('/welcome')
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

app.get('/count', (req, res)=>{
    if(req.session.count) req.session.count++
    else req.session.count = 1
    res.send('session : ' + req.session.count)
})

app.listen(3000, ()=>{
    console.log('connected')
})