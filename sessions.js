var express = require('express')
var session = require('express-session')
var app = express()

app.use(session({
    secret: 'randomkey', 
    resave: false,
    saveUnitionaized: true //session id를 사용하기 전까지 접속 X
}))

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