const express = require ('express');
const hbs = require ('hbs');
const fs = require ('fs');
const port = process.env.PORT || 3000 ;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('View engine','hbs');
app.use(express.static(__dirname + '/public')); //since it comes before mainatiancence , it is excluded

app.use((req,res,next)=>{                      //middleware
	var now = new Date().toString();
	var log = `${now} : ${req.method} ${req.url}`;
	// fs.appendFile('server.log',log +'\n',(err)=> {
	// if (err) console.log('unable to print');})
	next();
});
// app.use((req,res,next)=>{
	// res.render('maintainance.hbs',{
		// pageTitle : 'Maintainance',
		// message : 'Site is being updated !'
	// });
// });

hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear()
});
hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase()
});

app.get('/',(req,res)=>{
	//res.send('<h1><i>Hello Express!</i></h1>');
	// res.send ({
		// name : 'Rasmita',
		// likes :['sleeping',
		         // 'shoppng']
	// });
	res.render('home.hbs',{
		pageTitle : 'home page',
		message : 'Welcome here'
	});
	
});

app.get('/about',(req,res) =>{
	//res.send('About Page');
	res.render('about.hbs',{
		pageTitle : 'About page'
		});
});

app.get('/projects',(req,res)=>{
	res.render('projects.hbs',{
		pageTitle : 'Projects page'
	});
});
app.get('/bad',(req,res) =>{
	res.send({
	error :'error handling request'});
});

app.listen(port,()=>{
	console.log('Server is up on port ',port);
});
