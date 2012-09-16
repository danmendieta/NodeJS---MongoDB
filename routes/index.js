var USR=require('../models/users')

module.exports = function(app){
  app.get('/', function(req, res){
    USR.list(function(error, users){
      res.render('index', { title: 'Registro de Usuarios', author:'@danmendieta',error:error, users: users })
    });
  });

  app.post('/', function(req, res){
    USR.new(
      {
        name:req.param('name'),
        email:req.param('email')
      }, function(error){
        USR.list(function(errorList, users){
          res.render('index', { title: 'Registro de Usuarios', author:'@danmendieta',error:error, users: users })
        });
      }
   );
  });
  app.post('/save', function(req,res){
    USR.edit({name: req.param('name'), email:req.param('email'), id:req.param('id')}, function(object){
      if(object){
        res.redirect('/');
      }else{
        res.send('Error al actualizar registro', 400)
      }
    });
  });
  app.post('/delete', function(req, res){
    USR.delete(req.body.id, function(error, object){
      if(!error){
        res.send('OK',200);
      }else{
        res.send('El suscriptor no existe', 400);
      }
    });
  });
}