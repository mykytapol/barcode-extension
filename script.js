// async function generate_barcode() {
//     console.log(document.URL)
// }
// generate_barcode();

function get_asin(url_arr) {
  if (!url_arr.includes("www.amazon.com")) return null;
  let id = url_arr.indexOf("dp");
  if (id < 0) return null;
  if (id >= url_arr) return null;
  let asin = url_arr[id + 1];
  if (asin.length != 10 || asin[0] != "B") return null;
  return asin;
}

chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  let url = tabs[0].url;
  let array = url.split("/");
  let asin = get_asin(array);
  if (asin === null) {
    if (document.getElementById("error_text"))
      document.getElementById("error_text").innerHTML = "Oops...<br>Wrong Url";
    var elem = document.getElementById("barcode");
    elem.remove();
    return;
  }
  JsBarcode("#barcode", asin);
});
