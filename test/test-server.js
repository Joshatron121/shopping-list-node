var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var expect = chai.expect;
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);

describe('Shopping List', function() {
    it('should list items on GET', function(done) {
    	chai.request(app)
    		.get('/items')
    		.end(function(err, res) {
    			should.equal(err, null);
    			res.should.have.status(200);
    			res.should.be.json;
    			res.body.should.be.a('array');
    			res.body.should.have.length(5);
    			res.body[0].should.be.a('object');
    			res.body[0].should.have.property('id');
    			res.body[0].should.have.property('name');
    			res.body[0].id.should.be.a('number');
    			res.body[0].name.should.be.a('string');
    			res.body[0].name.should.equal('Broad beans');
    			res.body[1].name.should.equal('Tomatoes');
    			res.body[2].name.should.equal('Peppers');
    			res.body[3].name.should.equal('Bananas');
    			res.body[4].name.should.equal('Tacos');
    			done();
    		})
    });
    it('should add an item on post', function(done) {
    	chai.request(app)
	    	.post('/items')
	    	.send({'name': 'Kale'})
	    	.end(function(err, res) {
	    		should.equal(err, null);
	    		res.should.have.status(201);
	    		res.should.be.json;
	    		res.body.should.be.a('object');
	    		res.body.should.have.property('name');
	    		res.body.should.have.property('id');
	    		res.body.name.should.be.a('string');
	    		res.body.id.should.be.a('number');
	    		res.body.name.should.equal('Kale');
	    		storage.items.should.be.a('array');
	    		storage.items.should.have.length(6);
	    		storage.items[0].should.all.have.keys('id', 'name');
	    		storage.items[1].should.all.have.keys('id', 'name');
	    		storage.items[2].should.all.have.keys('id', 'name');
	    		storage.items[3].should.all.have.keys('id', 'name');
	    		storage.items[4].should.all.have.keys('id', 'name');
	    		storage.items[5].should.all.have.keys('id', 'name');
	    		storage.items[0].name.should.be.a('string').and.equal('Broad beans');
	    		storage.items[0].id.should.be.a('number');
	    		storage.items[1].name.should.be.a('string').and.equal('Tomatoes');
	    		storage.items[1].id.should.be.a('number');
	    		storage.items[2].name.should.be.a('string').and.equal('Peppers');
	    		storage.items[2].id.should.be.a('number');
	    		storage.items[3].name.should.be.a('string').and.equal('Bananas');
	    		storage.items[3].id.should.be.a('number');
	    		storage.items[4].name.should.be.a('string').and.equal('Tacos');
	    		storage.items[4].id.should.be.a('number');
	    		storage.items[5].name.should.be.a('string').and.equal('Kale');
	    		storage.items[5].id.should.be.a('number');
	    		done();
	    	})
    });
    it('should exit gracefully if no name is given', function(done) {
    	chai.request(app)
    		.post('/items')
    		.send({'name': ''})
    		.end(function(err, res) {
    			err.should.have.status(400);
    			storage.items.should.be.a('array');
    			storage.items.should.have.length(6);
    			storage.items[0].should.all.have.keys('id', 'name');
    			storage.items[1].should.all.have.keys('id', 'name');
	    		storage.items[2].should.all.have.keys('id', 'name');
	    		storage.items[3].should.all.have.keys('id', 'name');
	    		storage.items[4].should.all.have.keys('id', 'name');
	    		storage.items[5].should.all.have.keys('id', 'name');
	    		expect(storage.items[6]).to.be.undefined;
	    		storage.items[0].name.should.be.a('string').and.equal('Broad beans');
	    		storage.items[0].id.should.be.a('number');
	    		storage.items[1].name.should.be.a('string').and.equal('Tomatoes');
	    		storage.items[1].id.should.be.a('number');
	    		storage.items[2].name.should.be.a('string').and.equal('Peppers');
	    		storage.items[2].id.should.be.a('number');
	    		storage.items[3].name.should.be.a('string').and.equal('Bananas');
	    		storage.items[3].id.should.be.a('number');
	    		storage.items[4].name.should.be.a('string').and.equal('Tacos');
	    		storage.items[4].id.should.be.a('number');
	    		storage.items[5].name.should.be.a('string').and.equal('Kale');
	    		storage.items[5].id.should.be.a('number');
       			done();
    		})
    });
    it('should exit gacefully if invalid json is sent', function(done) {
    	chai.request(app)
    		.post('/items')
    		.send('kale')
    		.end(function(err, res) {
    			err.should.have.status(400);
    			storage.items.should.be.a('array');
    			storage.items.should.have.length(6);
    			storage.items[0].should.be.a('object').and.all.have.keys('id', 'name');
    			storage.items[1].should.be.a('object').and.all.have.keys('id', 'name');
	    		storage.items[2].should.be.a('object').and.all.have.keys('id', 'name');
	    		storage.items[3].should.be.a('object').and.all.have.keys('id', 'name');
	    		storage.items[4].should.be.a('object').and.all.have.keys('id', 'name');
	    		storage.items[5].should.be.a('object').and.all.have.keys('id', 'name');
	    		expect(storage.items[6]).to.be.undefined;
	    		storage.items[0].name.should.be.a('string').and.equal('Broad beans');
	    		storage.items[0].id.should.be.a('number');
	    		storage.items[1].name.should.be.a('string').and.equal('Tomatoes');
	    		storage.items[1].id.should.be.a('number');
	    		storage.items[2].name.should.be.a('string').and.equal('Peppers');
	    		storage.items[2].id.should.be.a('number');
	    		storage.items[3].name.should.be.a('string').and.equal('Bananas');
	    		storage.items[3].id.should.be.a('number');
	    		storage.items[4].name.should.be.a('string').and.equal('Tacos');
	    		storage.items[4].id.should.be.a('number');
	    		storage.items[5].name.should.be.a('string').and.equal('Kale');
	    		storage.items[5].id.should.be.a('number');
    			done();
    		})
    });
    it('should edit an item on put', function(done) {
    	chai.request(app)
    		.put('/items/1')
    		.send({'name': 'Kale', 'id': 1})
    		.end(function(err, res) {
    			res.should.have.status(200);
    			storage.items.should.be.a('array');
    			storage.items.should.have.length(6);
    			storage.items[0].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[0].name.should.be.a('string').and.equal('Kale');
    			storage.items[0].id.should.be.a('number').and.equal(1);
    			storage.items[1].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[1].name.should.be.a('string').and.equal('Tomatoes');
    			storage.items[1].id.should.be.a('number').and.equal(2);
    			storage.items[2].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[2].name.should.be.a('string').and.equal('Peppers');
    			storage.items[2].id.should.be.a('number').and.equal(3);
    			storage.items[3].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[3].name.should.be.a('string').and.equal('Bananas');
    			storage.items[3].id.should.be.a('number').and.equal(4);
    			storage.items[4].should.be.an('object').and.have.all.keys('name', 'id')
    			storage.items[4].name.should.be.a('string').and.equal('Tacos');
    			storage.items[4].id.should.be.a('number').and.equal(5);
    			storage.items[5].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[5].name.should.be.a('string').and.equal('Kale');
    			storage.items[5].id.should.be.a('number').and.equal(6);
    			expect(storage.items[6]).to.be.undefined;
    			done();
    		})
    });
    it('should exit gracefully when no id is recieved', function(done) {
    	chai.request(app)
    		.put('/items/')
    		.send({'name': 'Kale', 'id': 1})
    		.end(function(err,res) {
    			err.should.have.status(404);
    			storage.items.should.be.a('array');
    			storage.items.should.have.length(6);
    			storage.items[0].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[0].name.should.be.a('string').and.equal('Kale');
    			storage.items[0].id.should.be.a('number').and.equal(1);
    			storage.items[1].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[1].name.should.be.a('string').and.equal('Tomatoes');
    			storage.items[1].id.should.be.a('number').and.equal(2);
    			storage.items[2].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[2].name.should.be.a('string').and.equal('Peppers');
    			storage.items[2].id.should.be.a('number').and.equal(3);
    			storage.items[3].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[3].name.should.be.a('string').and.equal('Bananas');
    			storage.items[3].id.should.be.a('number').and.equal(4);
    			storage.items[4].should.be.an('object').and.have.all.keys('name', 'id')
    			storage.items[4].name.should.be.a('string').and.equal('Tacos');
    			storage.items[4].id.should.be.a('number').and.equal(5);
    			storage.items[5].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[5].name.should.be.a('string').and.equal('Kale');
    			storage.items[5].id.should.be.a('number').and.equal(6);
    			expect(storage.items[6]).to.be.undefined;
    			done();
    		})

    });
    it('should exit gracefully when a different id is used in the body than the url', function(done){
    	chai.request(app)
    		.put('/items/1')
    		.send({'name': 'Kale', 'id': 2})
    		.end(function(err,res) {
    			err.should.have.status(400);	
    			storage.items.should.be.a('array');
    			storage.items.should.have.length(6);
    			storage.items[0].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[0].name.should.be.a('string').and.equal('Kale');
    			storage.items[0].id.should.be.a('number').and.equal(1);
    			storage.items[1].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[1].name.should.be.a('string').and.equal('Tomatoes');
    			storage.items[1].id.should.be.a('number').and.equal(2);
    			storage.items[2].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[2].name.should.be.a('string').and.equal('Peppers');
    			storage.items[2].id.should.be.a('number').and.equal(3);
    			storage.items[3].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[3].name.should.be.a('string').and.equal('Bananas');
    			storage.items[3].id.should.be.a('number').and.equal(4);
    			storage.items[4].should.be.an('object').and.have.all.keys('name', 'id')
    			storage.items[4].name.should.be.a('string').and.equal('Tacos');
    			storage.items[4].id.should.be.a('number').and.equal(5);
    			storage.items[5].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[5].name.should.be.a('string').and.equal('Kale');
    			storage.items[5].id.should.be.a('number').and.equal(6);
    			expect(storage.items[6]).to.be.undefined;
    			done();
    		})
    })
    it('should exit gracefully if no body data is given', function(done) {
    	chai.request(app)
    		.put('/items/1')
    		.send()
    		.end(function(err,res) {
    			err.should.have.status(400);
    			storage.items.should.be.a('array');
    			storage.items.should.have.length(6);
    			storage.items[0].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[0].name.should.be.a('string').and.equal('Kale');
    			storage.items[0].id.should.be.a('number').and.equal(1);
    			storage.items[1].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[1].name.should.be.a('string').and.equal('Tomatoes');
    			storage.items[1].id.should.be.a('number').and.equal(2);
    			storage.items[2].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[2].name.should.be.a('string').and.equal('Peppers');
    			storage.items[2].id.should.be.a('number').and.equal(3);
    			storage.items[3].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[3].name.should.be.a('string').and.equal('Bananas');
    			storage.items[3].id.should.be.a('number').and.equal(4);
    			storage.items[4].should.be.an('object').and.have.all.keys('name', 'id')
    			storage.items[4].name.should.be.a('string').and.equal('Tacos');
    			storage.items[4].id.should.be.a('number').and.equal(5);
    			storage.items[5].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[5].name.should.be.a('string').and.equal('Kale');
    			storage.items[5].id.should.be.a('number').and.equal(6);
    			expect(storage.items[6]).to.be.undefined;
    			done();
    		})
    });
    it('should exit gracefully if invalid json is sent', function(done) {
    	chai.request(app)
    		.put('/items/1')
    		.send({'nam': 'Kale', 'id': 1})
    		.end(function(err, res) {
    			err.should.have.status(400);
    			storage.items.should.be.a('array');
    			storage.items.should.have.length(6);
    			storage.items[0].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[0].name.should.be.a('string').and.equal('Kale');
    			storage.items[0].id.should.be.a('number').and.equal(1);
    			storage.items[1].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[1].name.should.be.a('string').and.equal('Tomatoes');
    			storage.items[1].id.should.be.a('number').and.equal(2);
    			storage.items[2].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[2].name.should.be.a('string').and.equal('Peppers');
    			storage.items[2].id.should.be.a('number').and.equal(3);
    			storage.items[3].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[3].name.should.be.a('string').and.equal('Bananas');
    			storage.items[3].id.should.be.a('number').and.equal(4);
    			storage.items[4].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[4].name.should.be.a('string').and.equal('Tacos');
    			storage.items[4].id.should.be.a('number').and.equal(5);
    			storage.items[5].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[5].name.should.be.a('string').and.equal('Kale');
    			storage.items[5].id.should.be.a('number').and.equal(6);
    			expect(storage.items[6]).to.be.undefined;
    			done();
    		})
    })
    it('shoudl create a new item if an unused id is given', function(done) {
    	chai.request(app)
    		.put('/items/7')
    		.send({'name': 'Pizza', 'id': 7})
    		.end(function(err, res){
    			should.equal(err, null);
    			res.should.have.status(200);
    			storage.items.should.be.an('array').and.have.length(7);
    			storage.items[0].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[0].name.should.be.a('string').and.equal('Kale');
    			storage.items[0].id.should.be.a('number').and.equal(1);
    			storage.items[1].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[1].name.should.be.a('string').and.equal('Tomatoes');
    			storage.items[1].id.should.be.a('number').and.equal(2);
    			storage.items[2].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[2].name.should.be.a('string').and.equal('Peppers');
    			storage.items[2].id.should.be.a('number').and.equal(3);
    			storage.items[3].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[3].name.should.be.a('string').and.equal('Bananas');
    			storage.items[3].id.should.be.a('number').and.equal(4);
    			storage.items[4].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[4].name.should.be.a('string').and.equal('Tacos');
    			storage.items[4].id.should.be.a('number').and.equal(5);
    			storage.items[5].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[5].name.should.be.a('string').and.equal('Kale');
    			storage.items[5].id.should.be.a('number').and.equal(6);
    			storage.items[6].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[6].name.should.be.a('string').and.equal('Pizza');
    			storage.items[6].id.should.be.a('number').and.equal(7);
    			done();
    		})
    });
    it('should delete an item on delete', function(done) {
    	chai.request(app)
    		.delete('/items/6')
    		.end(function(err, res){
    			should.equal(err, null);
    			res.should.have.status(200);
    			storage.items.should.be.an('array').and.have.length(6);
    			storage.items[0].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[0].name.should.be.a('string').and.equal('Kale');
    			storage.items[0].id.should.be.a('number').and.equal(1);
    			storage.items[1].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[1].name.should.be.a('string').and.equal('Tomatoes');
    			storage.items[1].id.should.be.a('number').and.equal(2);
    			storage.items[2].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[2].name.should.be.a('string').and.equal('Peppers');
    			storage.items[2].id.should.be.a('number').and.equal(3);
    			storage.items[3].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[3].name.should.be.a('string').and.equal('Bananas');
    			storage.items[3].id.should.be.a('number').and.equal(4);
    			storage.items[4].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[4].name.should.be.a('string').and.equal('Tacos');
    			storage.items[4].id.should.be.a('number').and.equal(5);
    			storage.items[5].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[5].name.should.be.a('string').and.equal('Pizza');
    			storage.items[5].id.should.be.a('number').and.equal(7);
    			done();
    		})
    });
    it('should exit gracefully if no item is there to delete', function(done) {
    	chai.request(app)
    		.delete('/items/6')
    		.end(function(err, res){
    			err.should.have.status(404);
    			storage.items.should.be.an('array').and.have.length(6);
    			storage.items[0].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[0].name.should.be.a('string').and.equal('Kale');
    			storage.items[0].id.should.be.a('number').and.equal(1);
    			storage.items[1].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[1].name.should.be.a('string').and.equal('Tomatoes');
    			storage.items[1].id.should.be.a('number').and.equal(2);
    			storage.items[2].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[2].name.should.be.a('string').and.equal('Peppers');
    			storage.items[2].id.should.be.a('number').and.equal(3);
    			storage.items[3].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[3].name.should.be.a('string').and.equal('Bananas');
    			storage.items[3].id.should.be.a('number').and.equal(4);
    			storage.items[4].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[4].name.should.be.a('string').and.equal('Tacos');
    			storage.items[4].id.should.be.a('number').and.equal(5);
    			storage.items[5].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[5].name.should.be.a('string').and.equal('Pizza');
    			storage.items[5].id.should.be.a('number').and.equal(7);
    			done();
    		})
    });
    it('should exit gracefully if no id is sent in the url', function(done) {
    	chai.request(app)
    		.delete('/items/')
    		.end(function(err, res){
    			err.should.have.status(404);
    			storage.items.should.be.an('array').and.have.length(6);
    			storage.items[0].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[0].name.should.be.a('string').and.equal('Kale');
    			storage.items[0].id.should.be.a('number').and.equal(1);
    			storage.items[1].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[1].name.should.be.a('string').and.equal('Tomatoes');
    			storage.items[1].id.should.be.a('number').and.equal(2);
    			storage.items[2].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[2].name.should.be.a('string').and.equal('Peppers');
    			storage.items[2].id.should.be.a('number').and.equal(3);
    			storage.items[3].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[3].name.should.be.a('string').and.equal('Bananas');
    			storage.items[3].id.should.be.a('number').and.equal(4);
    			storage.items[4].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[4].name.should.be.a('string').and.equal('Tacos');
    			storage.items[4].id.should.be.a('number').and.equal(5);
    			storage.items[5].should.be.an('object').and.have.all.keys('name', 'id');
    			storage.items[5].name.should.be.a('string').and.equal('Pizza');
    			storage.items[5].id.should.be.a('number').and.equal(7);
    			done();
    		})
    });
});