const token = "6474557268:AAE654zdKVcxj_5wP_QDXeANlvOo1TiAS7k";
const telegramUrl = "https://api.telegram.org/bot" + token;
const webAppUrl = "https://script.google.com/macros/s/AKfycbxUv9T2tc8n20Dg6dk30J9qazrD4NAneE-qvDXT_Z6-xvz6FI61hCk0ChFFlkJ_aKpe/exec";

const CHAT_ID = "6169796686";

function getMe() {
    var url = telegramUrl + "/getMe";
    var response = UrlFetchApp.fetch(url);
    Logger.log(response.getContentText());
}
function getUpdates() {
    var url = telegramUrl + "/getUpdates";
    var response = UrlFetchApp.fetch(url);
    Logger.log(response.getContentText());
}
function setWebhook() {
    const url = telegramUrl + '/setWebhook?url=' + webAppUrl;
    const response = UrlFetchApp.fetch(url);
   Logger.log(response.getContentText())
}
function sendMessage(id, text) {
   const url = telegramUrl + '/sendMessage?chat_id=' + id + '&text=' + text;
    const response = UrlFetchApp.fetch(url);
}

function doPost(e) {
    const contents = JSON.parse(e.postData.contents)
    
    const timestamp = new Date()
    const text = contents.message.text
    let text_array = text.script("")
    let command = text_array.shift()

    if(command === "//add") {
      let total = parseFloat(text_array.shift())
      let descriptione = text_array.join('')

      SpreadsheetApp
        .getActive()
        .getSheetByName('Chitieu')
        .appendRow([timestamp, total, description])

      sendMessage(CHAT_ID, "Đã lưu")
    }
    else if(command === "//report"){
      let total = SpreadsheetApp.getActive().getSheetByName('Chitieu').getRange('B1').getValue()
      let thang = SpreadsheetApp.getActive().getSheetByName('Chitieu').getRange('D1').getValue()
      sendMessage(CHAT_ID, "Tổng tháng" + thang + "là:" + total)
    }
}

function test (){
  const id = "6009505865"
  const text = "This is..."
  sendMessage (id, text)
}

function sendMessageWithKeyboard(id, text, keyboard) {
  let data = {
    method: 'post',
    payload: {
      method: 'sendMessage',
      chat_id: String(id),
      text: text,
      parse_mode: 'HTML',
      reply_markup: JSON.stringify(keyboard)
    
    }
  }
  UrlFetchApp.fetch(telegramUrl + '/', data)
}




