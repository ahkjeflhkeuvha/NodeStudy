var express = require('express')
var cookieParser = require('cookie-parser')
const e = require('express')
var app = express()
app.use(cookieParser())

var products = {
    1: {title : 'Goods1'},
    2: {title : 'Goods2'},
    3: {title : 'Goods3'}
}
app.get('/products', function(req, res) {
    var output = ''
    for(var name in products){
        output += `<li><a href="/cart/${name}">${products[name].title}</a></li>`
    }
    res.send(`<h1>Products</h1><ul>${output}</ul><a href="/cart">CART</a>`)
})

app.get('/cart/:id', function(req, res){
    var id = req.params.id
    if(req.cookies.cart){
        var cart = req.cookies.cart
    }
    else {
        var cart = {}
    }
    if(!cart[id]) cart[id] = 0
    cart[id] = parseInt(cart[id]) + 1

    res.cookie('cart', cart)
    res.redirect('/cart')
})

app.get('/cart', function(req, res){
    // cart의 쿠키값 전달
    var cart = req.cookies.cart
    if(!cart){
        res.send('EMPTY!')
    }
    else {
        var output = ''
        for(var id in cart){
            // id는 제품의 id값
            output += `<li>${products[id].title} (${cart[id]})</li>`
        }
        res.send(`<h1>CART</h1><ul>${output}</ul><a href="/products">Products List</a>`)
    }

    res.send('hi! cart')
})

app.get('/count', function(req, res){
    if(req.cookies.count) {
        var count =  parseInt(req.cookies.count)
    }
    else {
        var count = 0
    }
    count = count + 1
    res.cookie('count', count)
    res.send('count : ' + count)
})

app.listen(3003, function(){
    console.log(`connected ${3003}`)
})