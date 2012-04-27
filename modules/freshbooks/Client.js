/**
 * 
 */
var base = require('./Class').Class;
var HttpClient = require('./HttpClient').HttpClient;

var Client = HttpClient.extend({
    /**
     * called by constructor
     */
    init: function(url, base64) {
        this._super(url, base64);
        this.client_id = "";
        this.email = "";
        this.username = "";
    },
    /**
     * Common set data method
     */
    setAllData: function() {
        this.client_id = this.getData('client','client_id');
        this.email = this.getData('client', 'email');
        this.username = this.getData('client', 'username');
    },
    /**
     * Create instance w/ email provided
     */
    create: function() {
        var content = '<request method="client.create">' 
        	+ this.getTagXML('client', this.getTagXML('email', this.email)) 
        	+ '</request>';
        this.send(content);
        this.client_id = this.getData('client_id');
    },
    /**
     * Read instance and set all available data
     */
    read: function() {
        var content = '<request method="client.get">' 
            + this.getTagXML('client_id', this.client_id) 
            + '</request>';
        this.send(content);
        this.setAllData();
    },
    update: function() {
        var content = '<request method="client.update">' 
            + this.getTagXML('client', 
                             this.getTagXML('client_id', this.client_id) 
                             + this.getTagXML('email', this.email) 
        	             + this.getTagXML('username', this.username)) 
            + '</request>';
        this.send(content);
    },
    /**
     * Can't use reserved word 'delete'
     */
    destroy: function() {
        var content = '<request method="client.delete">' 
            + this.getTagXML('client_id', this.client_id) 
            + '</request>';
        this.send(content);
        
    }
});

exports.Client = Client;