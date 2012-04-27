/**
 * Main XMLHttpRequest wrapper
 */
var base=require('./Class').Class;
var HttpClient = Class.extend({
    //Constructor
    init: function(url, base64 ){
        this.url = url;
        this.base64 = base64;
        this.xhr = new XMLHttpRequest();
        //The parsed response for subclassees
        this.dataObj = {};
    },
    //Helper functin to create XML tag
    //returns <tag>value</tag>
    getTagXML : function(tag,value){
	if(value == "" || value == null)
		return "";
		
	var result = "<" + tag + ">" + value + "</" + tag + ">";
	return result;
    },
    //Send the request and parse the respone
    send: function(data) {
        console.log('send: ' + data);
        this.xhr.open('POST', this.url, false);
        this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        this.xhr.setRequestHeader("Authorization", "Basic " + this.base64);
        this.xhr.send(data);

        //Get the response and make a dataobj for subclasses to parse
        var jsonText = XmlToJSON(this.xhr.responseText, "json-bag","response");
        this.dataObj = JSON.parse(jsonText);
        if (this.dataObj.status === 'fail') {
            throw new Error(this.getData('error'));
        }
    },
/** response from read 
"<?xml version="1.0" encoding="utf-8"?> <response xmlns="http://www.freshbooks.com/api/" status="ok"> <client> <client_id>7</client_id> <first_name></first_name> <last_name></last_name> <email>foo@bar.com</email> <username>realusername</username> <home_phone></home_phone> <mobile></mobile> <contacts/> <organization>foo@bar.com</organization> <work_phone></work_phone> <fax></fax> <vat_name></vat_name> <vat_number></vat_number> <p_street1></p_street1> <p_street2></p_street2> <p_city></p_city> <p_state></p_state> <p_country></p_country> <p_code></p_code> <s_street1></s_street1> <s_street2></s_street2> <s_city></s_city> <s_state></s_state> <s_country></s_country> <s_code></s_code> <notes></notes> <language>en</language> <currency_code>USD</currency_code> <credit currency="USD" deprecated="true">0</credit> <url deprecated="true">https://trashers.freshbooks.com/view/3wGyPgYCerrhVLTm</url> <auth_url deprecated="true">https://trashers.freshbooks.com/clients/7</auth_url> <folder>active</folder> <updated>2012-04-27 07:28:22</updated> <credits> <credit currency="USD">0</credit> </credits> <links> <client_view>https://trashers.freshbooks.com/view/3wGyPgYCerrhVLTm</client_view> <view>https://trashers.freshbooks.com/clients/7</view> <statement>https://trashers.freshbooks.com/view/3cWVZYP5PLakqBvb</statement> </links> <notifications> <late_payment_reminders>1</late_payment_reminders> </notifications> </client> </response> "
*/

/** response on destroy request:
"<?xml version="1.0" encoding="utf-8"?> <response xmlns="http://www.freshbooks.com/api/" status="fail"> <error>Failed to delete client. Request failed.</error> <code>50020</code> <resource>client</resource> </response> "
*/
    getData: function(element0, element1) {
        console.log('getData : ' + element0 + ':' + element1);
        if (typeof element0 === 'undefined') {
            return '';
        }
        if (typeof element0 !== 'undefined' &&
            typeof element1 !== 'undefined') {
            return this.dataObj[element0][0][element1][0].__CDATA;
        }
        
        return this.dataObj[element0][0].__CDATA;

    }
    
});

exports.HttpClient = HttpClient;