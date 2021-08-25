function get_asin(url_arr) {
  if (!url_arr.includes("www.amazon.com")) return null;
  let id = url_arr.indexOf("dp");
  if (id < 0) return null;
  if (id >= url_arr) return null;
  let asin = url_arr[id + 1];
  if (asin.length != 10 || asin[0] != "B") return null;
  return asin;
}

function create_element(asin) {
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("jsbarcode-value", asin);
  svg.className.baseVal = "barcode";
  svg.setAttribute(
    "style",
    "position: absolute;right:10px;top:10px;z-index: 9999;"
  );
  document.body.appendChild(svg);
  JsBarcode(".barcode").init();
}

function display() {
  let url = window.location.href;
  let array = url.split("/");
  let asin = get_asin(array);
  if (asin === null) {
    return;
  }
  create_element(asin);
}

display();
