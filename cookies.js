var express = require('express')
        var cookieParser = require('cookie-parser')
        var app = express()
        var port = 3000

        app.use(cookieParser())

        const pool = mysql.createPool ({
            host : 'localhost',
            user : 'root',
            password : '1234',
            database : 'login-exam'
        })
        
        pool.getConnection((err)=>{
            if(err) console.error('database err')
            else console.log('successful')
        })

        const info = document.getElementById('info')

        app.get('/login', ()=>{
            console.log('~~')  
        })

        app.listen(port, ()=>{
            console.log(`Connected!! ${port}`)
        })