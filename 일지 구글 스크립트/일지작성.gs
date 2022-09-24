function showUserForm() {

  var template = HtmlService.createTemplateFromFile("일지작성창");

  var html = template.evaluate().setHeight(1000).setWidth(2000);
  // var html = template.evaluate();

  // SpreadsheetApp.getUi().showSidebar(html);
  SpreadsheetApp.getUi().showDialog(html);
  // SpreadsheetApp.getUi().showModalDialog(html);
  // SpreadsheetApp.getUi().showModelessDialog(html);
  // return HtmlService.createHtmlOutputFromFile("일지작성창");
}

    function search_DB_autofill(){
        alert("eadsfa");
    }

function doGet() {
  // return HtmlService.createHtmlOutputFromFile('index.html');
  var template = HtmlService.createTemplateFromFile("index");
  var html = template.evaluate().setHeight(1000).setWidth(2000);
  SpreadsheetApp.getUi().showDialog(html);
}

function doSomething() {
  Logger.log('I was called!');
  var helloWorld = Browser.msgBox("Hola mundo!");
}