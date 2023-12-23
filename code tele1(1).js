var token = "tokten của bot";
var telegramUrl = "https://api.telegram.org/bot" + token;
var webAppUrl = "link web app";
var ssId = "ID của gg sheet";


function setWebhook() {
  var url = telegramUrl + "/setWebhook?url=" + webAppUrl;
  var response = UrlFetchApp.fetch(url);
}


function sendMessage(id, text) {
  var url = telegramUrl + "/sendMessage?chat_id=" + id + "&text=" + text;
  var response = UrlFetchApp.fetch(url);
}


function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


function getCellValue(sheetName, cell) {
  var sheet = SpreadsheetApp.openById(ssId).getSheetByName(sheetName);
  var value = sheet.getRange(cell).getValue();
  return value;
}


function doPost(e) {
  var contents = JSON.parse(e.postData.contents);
  var id = contents.message.from.id;
  var name = contents.message.chat.first_name;
  var text = contents.message.text;

    sendMessage(id, "OK! Dữ liệu của bạn đã được cập nhật!!!. Số dư còn lại của bạn là: " + update_result + " VND");
    
  // Kiểm tra nếu tin nhắn chứa lệnh "/check"
  if (text.toLowerCase() === "/check") {
    var result = getCellValue("QL", "D4");    //Chữ "QL" là tên sheet bạn muốn lấy dữ liệu có chứa ô “D4”. Chứ "D4" là vị trí ô bạn muốn lấy dữ liệu cho bot trong sheet “QL”
    var formattedResult = formatNumberWithCommas(result);
    sendMessage(id, "Số dư còn lại của bạn là: " + formattedResult + " VND");
  } else {
    // Nếu không có lệnh "check," ghi dữ liệu vào bảng tính và cập nhật giá trị mới
    var item = text.split(";");
    var sheet = SpreadsheetApp.openById(ssId).getSheetByName("Data_Expense");
    sheet.appendRow([new Date(), name, item[0], item[1], item[2], item[3], item[4]]);
   
    // Cập nhật giá trị mới từ ô D4
    var result = getCellValue("QL", "D4");  //Chữ "QL" là tên sheet bạn muốn lấy dữ liệu có chứa ô “D4”. Chứ "D4" là vị trí ô bạn muốn lấy dữ liệu cho bot trong sheet “QL”
    var update_result = formatNumberWithCommas(result);
   
    
  }
}
