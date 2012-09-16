var mongoDataBase = require ('mongodb').Db;
var Server = require('mongodb').Server;
var dbPort=27017;
var dbHost="localhost";
var dbName="danMendieta";

var usr={};
usr.db = new mongoDataBase(dbName, new Server(dbHost, dbPort, {auto_reconnect:true},{}));
usr.db.open(function(error,d){
	if(error){
		console.log(error);
	}else{
		console.log("Conectado a la base de datos: " +dbName);
	}
});

usr.users = usr.db.collection('users');

module.exports = usr;

usr.new = function(newUser, callback) {
	usr.users.findOne({email:newUser.email}, function(error, object){
		if(object){
			callback('Email Exists!!');
		}else{
			usr.users.insert(newUser, callback(null));
		}
	});
}//end newUser

usr.list = function(callback){
	usr.users.find().toArray(function (error,res){
		if (error){
			callback(error);
		}else{
			callback(null, res);
		}
	});
}//end list

usr.edit= function(editUser, callback){
	usr.users.findOne({_id: this.getObjectId(editUser.id)}, function(error,object){
		object.name= editUser.name;
		object.email=editUser.email;
		usr.users.save(object);
		callback(object);
	});
}

usr.delete= function(deleteUserID, callback){
  usr.users.remove({_id: this.getObjectId(deleteUserID)}, callback);
}

usr.getObjectId= function(id){
	return usr.users.db.bson_serializer.ObjectID.createFromHexString(id);
};