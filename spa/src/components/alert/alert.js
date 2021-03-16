function tempAlert(msg, duration) {
  var el = document.createElement("div");
  el.setAttribute(
    "style",
    "position:fixed;top:0%;left:50%;padding: 15px 20px;  font-weight: 300;border-radius: 5px;margin-top: 20px;transform: translate(-50%); background-color: #682ae9;font-size: 20px;color:white;z-index:1000;"
  );
  el.innerHTML = msg;
  setTimeout(function () {
    el.parentNode.removeChild(el);
  }, duration);
  document.body.appendChild(el);
}

export default tempAlert;
