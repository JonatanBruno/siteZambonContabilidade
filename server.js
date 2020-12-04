const usuario = require("./models/usuario")

const express = require("express")
const app = express()

const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")

//configuração do handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.use('/static', express.static(__dirname + '/public'));

app.listen(3000);

//esse bloco é disparado pelo enviar do formulario
app.post('/cadUsuario', function(req,res){
    usuario.create({
        text:req.body.text,
        emai:req.body.email,
        password:req.body.password
    }).then(function(){
        res.send('Cadastrado com Sucesso')
    }).catch(function(erro){
        res.render('formulario')
    })
})


//Rotas para o navegador

app.get('/formulario', function(req,res){
    res.render('formulario')
})


app.get('/', function(req,res){
    res.render('pagina-principal')
})

//Rotas para o site
app.get('/missao', function(req,res){
    res.render('missao')
})

app.get('/valores', function(req,res){
    res.render('valores')
})

app.get('/abertura-de-empresa', function(req,res){
    res.render('abertura-de-empresa')
})

app.get('/folha-de-pagamento-e-declaracoes', function(req,res){
    res.render('folha-de-pagamento-e-declaracoes')
})

app.get('/apuracao-de-impostos-mensais-e-declaracoes', function(req,res){
    res.render('apuracao-de-impostos-mensais-e-declaracoes')
})

app.get('/contabilidade-societaria', function(req,res){
    res.render('contabilidade-societaria')
})

app.get('/contabilidade-consultiva', function(req,res){
    res.render('contabilidade-consultiva')
})

app.get('/area-restrita-do-cliente', function(req,res){
    res.render('area-restrita-do-cliente')
})

app.get('/sistema-web', function(req,res){
    res.render('sistema-web')
})

app.get('/login/meulogin', function(req,res){
    usuario.findAll().then(function(doadores){
        res.render('formulario', {doador: doadores.map(pagamento => pagamento.toJSON())})
    })
})