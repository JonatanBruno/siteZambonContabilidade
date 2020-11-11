const usuario = require("./models/usuario")

const express = require("express")
const app = express()

app.listen(3000);

const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")

//configuração do handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/login', function(req,res){
    res.render('Formulario')
})

//esse bloco é disparado pelo enviar do formulario

app.post('/cadUsuario', function(req,res){
    usuario.create({
        nome:req.body.nome,
        senha:req.body.senha
    }).then(function(){
        res.send('Cadastrado com Sucesso')
    }).catch(function(erro){
        res.send('Erro '+erro)
    })
})