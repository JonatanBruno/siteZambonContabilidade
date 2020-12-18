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

app.get('/delete/:id', function(req,res){
    usuario.destroy({
        where:{'id': req.params.id}
    }).then(function(){
        usuario.findAll().then(function(doadores){
            res.render('formulario', {doador: doadores.map(pagamento => pagamento.toJSON())})
        })

    .catch(function(){res.send("não deu certo")})
    })
})



app.get('/update/:id', function(req,res){
    usuario.findAll({where:{'id': req.params.id}}).then(function(doadores){
        res.render('atualizacaoFormulario', {doador: doadores.map(pagamento => pagamento.toJSON())})
    })
})



app.post('/updateUsuario', function(req,res){
    usuario.update({text:req.body.nome,password:req.body.senha},{
        where:{id:req.body.codigo}
    }).then(function(){
        usuario.findAll().then(function(doadores){
            res.render('formulario', {doador: doadores.map(pagamento => pagamento.toJSON())})
        })
    }).catch(function(erro){
        res.send("erro"+erro)
    })
})


//esse bloco é disparado pelo enviar do formulario
app.post('/cadUsuario', function(req,res){
    usuario.create({
        text:req.body.text,
        email:req.body.email,
        password:req.body.password
    }).then(function(){
        usuario.findAll().then(function(doadores){
        res.render('formulario',{doador: doadores.map(pagamento => pagamento.toJSON())})
    })
    }).catch(function(erro){
           res.render("Erro" +erro)
    })
    //res.send("Nome: "+req.body.nome + "<br>Valor: "+ req.body.senha)
})



//Rotas para o navegador
app.get('/formulario', function(req,res){
    usuario.findAll().then(function(doadores){
    res.render('formulario', {doador: doadores.map(pagamento => pagamento.toJSON())})

    })
})


//ROTAS DO SITE

app.get('/', function(req,res){
    res.render('pagina-principal')
})

//---------------------------------------------------------------

app.get('/missao', function(req,res){
    res.render('missao')
})

//---------------------------------------------------------------

app.get('/valores', function(req,res){
    res.render('valores')
})

//---------------------------------------------------------------

app.get('/abertura-de-empresa', function(req,res){
    res.render('abertura-de-empresa')
})

//---------------------------------------------------------------

app.get('/folha-de-pagamento-e-declaracoes', function(req,res){
    res.render('folha-de-pagamento-e-declaracoes')
})

//---------------------------------------------------------------

app.get('/apuracao-de-impostos-mensais-e-declaracoes', function(req,res){
    res.render('apuracao-de-impostos-mensais-e-declaracoes')
})

//---------------------------------------------------------------

app.get('/contabilidade-societaria', function(req,res){
    res.render('contabilidade-societaria')
})

//---------------------------------------------------------------

app.get('/contabilidade-consultiva', function(req,res){
    res.render('contabilidade-consultiva')
})

//---------------------------------------------------------------

app.get('/area-restrita-do-cliente', function(req,res){
    res.render('area-restrita-do-cliente')
})

//---------------------------------------------------------------

app.get('/sistema-web', function(req,res){
    res.render('sistema-web')
})

//---------------------------------------------------------------

app.get('/calculo-ponto-de-equilibrio', function(req,res){
    res.render('calculo-ponto-de-equilibrio')
})

//----------------------------------------------------------------
//RESPONSAVEL PELA PORTA
app.listen(3000);