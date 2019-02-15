var express = require('express');
var skills = require("../skill.json");
var country = require("../country.json");
var router = express.Router();
var User = require('../models/user');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res){
	console.log(req.user._id);
	if(req.user){
		User.getUserById(req.user._id, function(err, user){
			if(err) throw err;
			if(!user){
				req.flash('error_msg', 'No user found');
					res.redirect('/users/login');
			}
			console.log(user);
			res.render('index', {data: user});
		});
	} else {
		res.render('index');
	}
});

router.get('/getSkills/:_skillName', function(req, res){
	var skillName = req.params._skillName;
	var retSkillArray = [];

	for(let ii=0; ii < skills.length; ii+=1) {
		if(skills[ii].name.toLowerCase().indexOf(skillName.toLowerCase()) > -1){
			retSkillArray.push(skills[ii].name);
		}
	}
	res.status(200).json(retSkillArray); 
});

router.get('/getCountry/:_countryName', function(req, res){
	var countryName = req.params._countryName;
	var retCountryArray = [];

	for(let ii=0; ii < country.length; ii+=1) {
		if(country[ii].name.toLowerCase().indexOf(countryName.toLowerCase()) > -1){
			retCountryArray.push(country[ii].name);
		}
	}
	res.status(200).json(retCountryArray);
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;