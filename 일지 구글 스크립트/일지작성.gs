function showSidebar_writeLog() {

  // var template = HtmlService.createTemplateFromFile("일지작성창");

  // var html = template.evaluate().setHeight(1000).setWidth(2000);
  // // var html = template.evaluate();

  // // SpreadsheetApp.getUi().showSidebar(html);
  // SpreadsheetApp.getUi().showDialog(html);
  // // SpreadsheetApp.getUi().showModalDialog(html);
  // // SpreadsheetApp.getUi().showModelessDialog(html);
  // // return HtmlService.createHtmlOutputFromFile("일지작성창");
  var html = HtmlService.createHtmlOutputFromFile("일지작성창");
  SpreadsheetApp.getUi().showSidebar(html);
}

function doGet() {
  // return HtmlService.createHtmlOutputFromFile('index.html');
  var template = HtmlService.createTemplateFromFile("index");
  var html = template.evaluate().setHeight(1000).setWidth(2000);
  SpreadsheetApp.getUi().showDialog(html);
}

function search_DB_return_values(DB_number) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet_album_DB = ss.getSheetByName("음반DB");
  var lastRow = sheet_album_DB.getLastRow();
  var lastCol = sheet_album_DB.getLastColumn();
  // var album_DB = sheet_album_DB.getRange(1, 1, lastRow, lastCol).getValues();
  var album_DB = sheet_album_DB.getRange(1, 1, lastRow, 1).getValues();
  var searched_Row = 0;
  var DB_doesnt_exist = 1;
  var target_DB = {
    "genre": "",
    "genre_number": "",
    "composer": "",
    "music_title": "",
    "player": "",
    "album": "",
    "conductor": "",
    "album_label": "",
    "album_year": "",
    "orchestra": "",
    "choir": "",

  }

  for(var i = 0; i < lastRow; i++){
    // Browser.msgBox(album_DB[i][0]);
    if(album_DB[i][0] == DB_number){
      searched_Row = i + 1;
      DB_doesnt_exist = 0;
      break;
    }
  }
  if(DB_doesnt_exist){
    Browser.msgBox("오류: 일치하는 DB 번호가 없습니다");
    return;
  }

  var searched_DB = sheet_album_DB.getRange(searched_Row, 1, searched_Row, lastCol).getValues();
  target_DB["genre"] = searched_DB[0][1];
  target_DB["genre_number"] = searched_DB[0][2];
  target_DB["composer"] = searched_DB[0][3];
  // target_DB["music_title"] = searched_DB[0][];
  target_DB["player"] = searched_DB[0][5];
  target_DB["album"] = searched_DB[0][4];
  target_DB["conductor"] = searched_DB[0][6];
  target_DB["album_label"] = searched_DB[0][10];
  target_DB["album_year"] = searched_DB[0][11];
  target_DB["orchestra"] = searched_DB[0][7];
  target_DB["choir"] = searched_DB[0][8];

  // for(var index = 0; index < lastRow; index++){
  //   if(album_DB[index][0] == DB_number){
  //     target_DB["genre"] = album_DB[index][1];
  //     target_DB["genre_number"] = album_DB[index][2];
  //     target_DB["composer"] = album_DB[index][3];
  //     // target_DB["music_title"] = album_DB[index][];
  //     target_DB["player"] = album_DB[index][5];
  //     target_DB["album"] = album_DB[index][4];
  //     target_DB["conductor"] = album_DB[index][6];
  //     target_DB["album_label"] = album_DB[index][10];
  //     target_DB["album_year"] = album_DB[index][11];
  //     target_DB["orchestra"] = album_DB[index][7];
  //     target_DB["choir"] = album_DB[index][8];
  //     break;
  //   }
  // }

  return target_DB;
}

function enroll_Log(enroll_DB){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet_manage_DB = ss.getSheetByName("운영DB");
  var lastRow = sheet_manage_DB.getLastRow();
  sheet_manage_DB.getRange(lastRow + 1, 1).setValue(enroll_DB["year"] + "-" + enroll_DB["month"] + "-" + enroll_DB["date"]);
  sheet_manage_DB.getRange(lastRow + 1, 2).setValue(enroll_DB["operation_type"]);
  sheet_manage_DB.getRange(lastRow + 1, 3).setValue(enroll_DB["order"]);
  sheet_manage_DB.getRange(lastRow + 1, 4).setValue(enroll_DB["manager"]);
  sheet_manage_DB.getRange(lastRow + 1, 5).setValue(enroll_DB["DB_number"]);
  sheet_manage_DB.getRange(lastRow + 1, 6).setValue(enroll_DB["genre"]);
  sheet_manage_DB.getRange(lastRow + 1, 7).setValue(enroll_DB["genre_number"]);
  sheet_manage_DB.getRange(lastRow + 1, 8).setValue(enroll_DB["composer"]);
  sheet_manage_DB.getRange(lastRow + 1, 10).setValue(enroll_DB["player"]);
  sheet_manage_DB.getRange(lastRow + 1, 11).setValue(enroll_DB["conductor"]);
  sheet_manage_DB.getRange(lastRow + 1, 12).setValue(enroll_DB["orchestra"]);
  sheet_manage_DB.getRange(lastRow + 1, 13).setValue(enroll_DB["choir"]);
  sheet_manage_DB.getRange(lastRow + 1, 14).setValue(enroll_DB["user_number"]);
  sheet_manage_DB.getRange(lastRow + 1, 15).setValue(enroll_DB["comment"]);
}