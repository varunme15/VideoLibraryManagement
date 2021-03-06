
var user = require('../Model/User');
var movie = require('../Model/Movie');
var order = require('../Model/Order');
var ejs = require("ejs");

// hadrcoded value. we need to get the value from session
var membershipid ="937-49-3682";


exports.index = function(req, res){
	console.log("index");
  res.render('index', { title: 'Express' });
  
};

exports.userSignIn =function(req,res){
	console.log("user sign in");
	res.render('SignUp');
};
exports.signUp =function(req,res){
	console.log("signup");
	res.render('SignUpin');
};
exports.updateUser =function(req,res){
	console.log("Update User");
	res.render('updateUser');
};

exports.validateUser =function(req,res){
	console.log("validate user");
	var newUser = new user();
	newUser.validateUser(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			res.render('Welcome.ejs');
		}

	},req.body);
	
	console.log("Username "+ req.param('userName'));
};

exports.createUser =function(req,res){
	console.log("create user");
	var newUser = new user();
	var a = req.param;
	console.log("a"+ a);
	//newUser.validateUser(req.param('username'), req.param('password'));
	newUser.signUp(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			res.render('Welcome.ejs');
		}

	},req.body);
	console.log("Username"+ req.param('userName'));
	console.log("Username"+ req.param('password'));
};

exports.removeUser = function(req,res){
	var memberTypeID = 111;  //hard code here, should get from user add/update/delete page
	
	var newUser = new user();
	newUser.remove(function(err,result){
		if(err){
			console.log("remove user error"+err);
			throw(err);
		}else{
			//return number of rows that deleted
			console.log("return "+result);
			res.render('Welcome.ejs');
		}
		
	}, memberTypeID);
	
};

exports.generateBill = function(req,res){
	var MemberShipID = 'cdef'; //hard code here, should be input by admin
	var newOrder = new order();
	newOrder.generateBill(function(err,result,total){
		if(err){
			console.log("generateBill error"+err);
			throw(err);
		}else{
			console.log("return "+JSON.stringify(result));
			console.log(total);
			 res.render('Bill.ejs',
					 {data:result,
					  total:total
					 },
					 function(err, result) {
				// render on success
				if (!err) {
					res.end(result);
					
				}
				// render or error
				else {
					res.end('An error occurred');
					console.log(err);
				}
			});
		}
		
	},MemberShipID);
	
};

exports.payBill = function(req,res){
	console.log('in paybill');
	var paymentInfo = JSON.parse(req.params.data);
	 res.send(paymentInfo[0].MemberShipID);
	 
};

exports.listMovies =function(req,res){
	console.log("list movies index");
	var newMovie = new movie();
	
	newMovie.listMovies(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			ejs.renderFile('views/ListMovies.ejs', {
				result : result
			}, function(err, result) {
				// render on success
				if (!err) {
					res.end(result);
				}
				// render or error
				else {
					res.end('An error occurred in rendering page');
					console.log(err);
				}
			});
		}

	},req.body);
};


exports.viewCustomers =function(req,res){
	console.log("view customers");
	var newUser = new user();
	
	newUser.viewCustomers(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			ejs.renderFile('views/ViewCustomers.ejs', {
				result : result
			}, function(err, result) {
				// render on success
				if (!err) {
					res.end(result);
				}
				// render or error
				else {
					res.end('An error occurred in rendering page');
					console.log(err);
				}
			});
		}

	},req.body);
};


exports.viewHistory =function(req,res){
	console.log("view history");
	var orders = new order();
	
	orders.viewHistory(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			ejs.renderFile('views/ViewHistory.ejs', {
				result : result
			}, function(err, result) {
				// render on success
				if (!err) {
					res.end(result);
				}
				// render or error
				else {
					res.end('An error occurred in rendering page');
					console.log(err);
				}
			});
		}
		// instead ofmembership id which is hardcoded, here we need to send the value from session

	},membershipid);
};


exports.updateuser =function(req,res){
	req.body.MemberShipID = "937-49-3682";
	console.log("Update user");
	var newUser = new user();
	newUser.updateUser(function(err,result) {
		if(err){
			console.log("Error"+err);
			throw(err);
		}else
		{
			console.log(result.membershipID);
			res.render('Welcome.ejs',{name:result.data.FirstName,membershipID:result.data.MemberShipID});
			//console.log(res);
		}

	},req.body);
	
};

