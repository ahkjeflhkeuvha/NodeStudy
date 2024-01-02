var express = require('express');
        var app = express();
        var port = 3000;

        app.get('/login', (req, res)=>{
            
        })

        app.post('/login/auth', (req, res) => {
            const username = req.body.username;
            const password = req.body.password;
            
            res.send(`<h1>
                ${username}님의 비밀번호는 ${password}입니다.
            </h1>`)
        })
app.listen(port, () => {
    console.log(`port ${port} connected~!`)
})