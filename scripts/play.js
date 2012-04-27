//
// The following is an test script for CRUD on the Clients api
//see http://developers.freshbooks.com/docs/clients/
//

var Client = require('freshbooks/Client').Client;
var assert = require('assert');

//Replace this token w/ the one from FreshBooks - don't worry I've already got a new one, this one won't work
//I left it here so you can do the base64 encoding and confirm you did it right ;)
var token = '9f83a95a8899b312e399f35d5dec1d79';
var url = 'https://trashers.freshbooks.com/api/2.1/xml-in';


//Since the base64 encoding is static, I figured it once and saved it
//Get the base64 encoding from: http://www.motobit.com/util/base64-decoder-encoder.asp
//Make sure you encode 'token:X' see: http://developers.freshbooks.com/authentication-2/#TokenBased
var base64 = 'OWY4M2E5NWE4ODk5YjMxMmUzOTlmMzVkNWRlYzFkNzk6WA==';

//Create an instance of a Client
var client = new Client(url, base64);
assert.ok(client,'client is not truthy');
assert.equal(client.url,url,'client.url is not set');
assert.equal(client.base64,base64,'client.base64 is not set');

//Note: FB does not consider email as Unique Key
client.email='foo@bar.com';
client.create();

var id = client.client_id;

//Confirm create occurred
client = new Client(url, base64);
client.client_id = id;
client.read();
assert.equal(client.email,'foo@bar.com','email was not set on update');

//Update email
client = new Client(url, base64);
client.client_id = id;
client.email = 'foochanged@bar.com';
client.update();

//Confirm update occurred
client = new Client(url, base64);
client.client_id = id;
client.read();
assert.equal(client.email,'foochanged@bar.com','email was not set on update');

//Delete (destroy) object
client = new Client(url, base64);
client.client_id = id;
try {
    client.destroy();

    //confirm deletion
    client = new Client(url, base64);
    client.client_id = id;
    client.read();
    assert.fail('client should not be read - should have thrown exception');

} catch(error) {
    console.log(error.message);
}





 