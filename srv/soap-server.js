
const soap = require('soap');
// const fs = require('fs');

// const xmltjs = require('xml2js');
const short = require('short-uuid');
const uuid = require('uuid');
// const { Console } = require('console');
var sid =short.generate();
var id = uuid.v1();

console.log(id);
// const wsdl = fs.readFileSync('./external/JOURNALENTRYBULKCHANGEREQUEST_.wsdl',{encoding:'utf8',flag:'r'});
// console.log(wsdl);
var options = {
  forceSoap12Headers: true
};
var date1 =new Date().toISOString();

var args = {'MessageHeader':{'ID':sid,'UUID':id,'CreationDateTime':date1},'JournalEntryHeader':{'MessageHeader':{'ID':sid,'CreationDateTime':date1},'HeaderKey':{'AccountingDocument':'5100000050','CompanyCode':'1310','FiscalYear':'2022'},'DocumentHeaderTextChange':{'DocumentHeaderText':'hello1','FieldValueChangeIsRequested':true}},'JournalEntryDebtorCreditorItem':{'MessageHeader':{'ID':sid,'CreationDateTime':date1},'ItemKey':{'AccountingDocument':'5100000050','CompanyCode':'1310','FiscalYear':'2022','AccountingDocumentItemID':'1'},'PaymentBlockingReasonCodeChange':{'PaymentBlockingReasonCode':'A','FieldValueChangeIsRequested':true}}};

// const builder = new xmltjs.Builder();
// console.log(builder.buildObject(args));
soap.createClient('./external/JOURNALENTRYBULKCHANGEREQUEST_.wsdl',options,function(err,client){
  client.setEndpoint('https://my300018-api.saps4hanacloud.cn/sap/bc/srt/scs_ext/sap/journalentrybulkchangerequest_');
  client.setSecurity(new soap.BasicAuthSecurity('username','password'));
  // client.addSoapHeader('MessageID',id,'Action','http://sap.com/xi/SAPSCORE/SFIN/JournalEntryBulkChangeRequest_In/JournalEntryBulkChangeRequest_InRequest')

   client.addSoapHeader({MessageID:id},'http://www.w3.org/2005/08/addressing','wsa','http://www.w3.org/2005/08/addressing');

   client.addSoapHeader({CreationDateTime:date1});

   client.setSOAPAction('JOURNALENTRYBULKCHANGEREQUEST_.binding.JournalEntryBulkChangeRequest_In');
  client.JournalEntryBulkChangeRequest_In(args,function(err,result){

    if(err){console.log(err);}else{console.log(result);}

  });
});
