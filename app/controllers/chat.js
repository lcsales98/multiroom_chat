module.exports.iniciaChat = function(application, req, res) {
    
    var dadosForm = req.body;
    
    if(dadosForm.apelido < 1) {
        
        
        req.assert('apelido','O apelido é obrigatório!').notEmpty();
        req.assert('apelido','O apelido deve conter entre 3 e 15 caracteres!').len(3, 15);
        
        var errors = req.validationErrors();
        
        console.log(errors);
        
        if(errors != null) {
            res.render('index', {validacao: errors});
        }
    }
    console.log(dadosForm.apelido);
    application.get('io').emit('msgParaCliente', {apelido: dadosForm.apelido, mensagem: ' entrou no chat!'});

    res.render('chat', {nome: dadosForm.apelido});

}