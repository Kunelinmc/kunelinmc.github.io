const allmsg = [];
const aa = (s) => document.querySelector(s);
const ba = (d) => localStorage.getItem(d);
const editor = aa(".tg1");
const sendbtn = aa(".tg2");
const msgb = aa(".kl1");

window.focd = 0;

document.getElementById("Myin");
var chatroom = [];

function ab() {
  const userAgentData = window.navigator.userAgentData;
  if (userAgentData && userAgentData.brands) {
    return userAgentData.brands.some(
      (brand) => brand.brand === "Google Chrome"
    );
  }
  return false;
}

function ac(t, ar) {
  for (let index = 0; index < ar.length; index++) {
    if (t.includes(ar)) {
      return ["success", t, ar];
    }
  }
  return ["failure"];
}

function ud() {
  const timestamp = new Date().getTime();
  const randomNum = Math.floor(Math.random() * 1000000);
  return `${timestamp}-${randomNum}`;
}

function cg(t) {
  editor.setAttribute("contenteditable", true);
  aa(".gub1").removeAttribute("disabled");
  aa(".un .name").innerText = "Chat Room";
  aa(".bn .thumbnail").src = "/assets/unnamed.jpg";
  document.title = "Structure - Chat Room";
  aa(".account").innerText = t;
  window.login = true;
  window.pgin = true;
  window.ddt1();
}

window.onload = () => {
  var username = localStorage.getItem("username");
  if (username) {
    cg(username);
  } else {
    aa(".account").innerText = "Login";
    Swal.fire({
      iconHtml: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width=70 heigh=70 fill="#2bbaea">
      <path d="M234.7 42.7L197 56.8c-3 1.1-5 4-5 7.2s2 6.1 5 7.2l37.7 14.1L248.8 123c1.1 3 4 5 7.2 5s6.1-2 7.2-5l14.1-37.7L315 71.2c3-1.1 5-4 5-7.2s-2-6.1-5-7.2L277.3 42.7 263.2 5c-1.1-3-4-5-7.2-5s-6.1 2-7.2 5L234.7 42.7zM46.1 395.4c-18.7 18.7-18.7 49.1 0 67.9l34.6 34.6c18.7 18.7 49.1 18.7 67.9 0L529.9 116.5c18.7-18.7 18.7-49.1 0-67.9L495.3 14.1c-18.7-18.7-49.1-18.7-67.9 0L46.1 395.4zM484.6 82.6l-105 105-23.3-23.3 105-105 23.3 23.3zM7.5 117.2C3 118.9 0 123.2 0 128s3 9.1 7.5 10.8L64 160l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L128 160l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L128 96 106.8 39.5C105.1 35 100.8 32 96 32s-9.1 3-10.8 7.5L64 96 7.5 117.2zm352 256c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L416 416l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L480 416l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L480 352l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L416 352l-56.5 21.2z"/>
      </svg>`,
      title: "Welcome to <span class='swalf'>Structure</span>",
      text: "you can use it in just a few steps",
      confirmButtonText: `Next&nbsp;
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="#fff" width=20 height=20>
        <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
        </svg>`,
      customClass: {
        icon: "no-border",
      },
    }).then(() => {
      Swal.fire({
        title: "Enter your name",
        input: "text",
        confirmButtonText: `Next&nbsp;
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="#fff" width=20 height=20>
        <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
        </svg>`,
        allowOutsideClick: false,
        inputValidator: (value) => {
          if (!value) {
            return "name cannot be empty";
          } else if (!/^[a-zA-Z0-9]+$/.test(value)) {
            return "The name can only contain letters or numbers";
          } else if (value.length < 5) {
            return "The name cannot be less than 5 characters";
          } else if (/^\d+$/.test(value)) {
            return "The name cannot be all numbers";
          } else {
            Swal.fire({
              title: "Enter invitation code",
              input: "text",
              confirmButtonText: `Okay&nbsp;<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#fff" width=20 height=20>
              <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
              </svg>`,
              allowOutsideClick: false,
              inputValidator: (value2) => {
                if (!value2) {
                  return "Invitation code cannot be empty";
                } else if (value2 !== "25a3395fe136") {
                  return "Invalid invitation code";
                } else {
                  localStorage.setItem("uuid", ud());
                  localStorage.setItem("username", value);
                  cg(value);
                }
              },
            });
          }
        },
      });
    });
  }
};

let enletters = Array.from(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz<>;-+|''\"'[](){}=~.,/\\1234567890*&^%$#@"
);

let inited = false;

window.ccc1 = ''

function sendmsg() {
  if (editor.innerText.trim() !== "" && editor.textContent.charAt(0) !== "/") {
    var message = editor.innerText
      .replaceAll("\\n", "\n")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
    editor.innerHTML = "";
    let id = Date.now();
    window.ccc1 = id
    window.writeUserData(message, id);
    window.dc(message, true);
    editor.focus();
  }
}

window.dc = function (message, ud, mine = true) {
  const a0 = document.createElement("div");
  a0.classList.add("gdk");
  if (mine) {
    a0.classList.add("rg");
  }
  const a01 = document.createElement("div");
  a01.classList.add("sgv0");
  const a02 = document.createElement("div");
  a02.classList.add("sgv1");
  a02.setAttribute("tabindex", "0");
  const a1 = document.createElement("div");
  a1.classList.add("sgv2");
  a1.innerText = getCurrentTime();
  const a2 = document.createElement("div");
  a2.classList.add("dlu");
  if (message.length > 500) {
    a2.classList.add("longer");
  }
  var menu = aa(".ddh");

  a02.oncontextmenu = (event) => {
    menu.classList.add("show");
    Update(event);
    menu.querySelector(".context_menu .option.copy").onclick = () => {
      navigator.clipboard.writeText(message);
    };
    menu.querySelector(".context_menu .option.share").onclick = () =>
      share(message);
    menu.querySelector(".context_menu .option.delete").onclick = () => {
      a0.remove();
    };
  };
  msgb.appendChild(a0);
  if (!mine) {
    a0.appendChild(a01);
    var t = ud.split("-")[0];
    tippy(a01, {
      arrow: false,
      animation: "fade",
      trigger: "click",
      content: t,
      placement: "right-start",
    });
  }
  a0.appendChild(a02);
  a0.appendChild(a1);
  a02.appendChild(a2);
  a2.innerText = message.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  E(a2);
  msgb.scrollTop = msgb.scrollHeight;
};
function getCurrentDateTime() {
  const n = new Date();
  const y = n.getFullYear();
  const m = (n.getMonth() + 1).toString().padStart(2, "0");
  const d = n.getDate().toString().padStart(2, "0");
  const h = n.getHours().toString().padStart(2, "0");
  const mi = n.getMinutes().toString().padStart(2, "0");
  const se = n.getSeconds().toString().padStart(2, "0");
  const ms = n.getMilliseconds().toString().padStart(3, "0");
  const formattedDateTime = `${y}-${m}-${d}-${h}-${mi}-${se}-${ms}`;
  return formattedDateTime;
}

function getCurrentTime() {
  var date = new Date(),
    hour = date.getHours(),
    min = date.getMinutes();

  hour = hour >= 10 ? hour : `0${hour}`;
  min = min >= 10 ? min : `0${min}`;
  return `${hour}:${min}`;
}

sendbtn.onclick = () => {
  sendmsg();
};

editor.onkeydown = (e) => {
  "Enter" == e.key && e.shiftKey
    ? (key = "Backspace")
    : "Enter" == e.key
    ? (e.preventDefault(), sendmsg())
    : "Tab" == e.key
    ? e.preventDefault()
    : (key = e.key);
};

function handlePaste(e) {
  e.preventDefault();
  let t = (e.clipboardData || window.clipboardData).getData("text/plain");
  console.log("Process is completed"),
    document.execCommand("insertText", !1, t);
}

function E(e) {
  for (
    var a = /((https?:\/\/|www\.)[^\s<)]+)/gi, n = 0;
    n < e.childNodes.length;
    n++
  ) {
    var r = e.childNodes[n];
    if (r.nodeType === Node.TEXT_NODE) {
      var l = r.nodeValue.replace(
          a,
          "<a href='$1' target='_blank' onclick='this.classList.add('visited')' draggable='false'>$1</a>"
        ),
        d = document.createElement("span");
      (d.innerHTML = l), e.replaceChild(d, r);
    }
    r.nodeType === Node.ELEMENT_NODE && E(r);
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
var list = [];

var builtInCommands = [
  "kick",
  "say",
  "ban",
  "timeout",
  "msg",
  "help",
  "settings",
  "copilot",
];

for (let index = 0; index < builtInCommands.length; index++) {
  list.push(Array.from(builtInCommands[index]));
}

function gcp(e, list) {
  for (let index = 0; index < list.length; index++) {
    if (e.toLowerCase() === list[index][0]) {
      return list[index].slice(1).join("");
    }
  }
  return "Not found";
}

const websites = [
  ["google", "google.com/"],
  ["map", "maps.google.com/"],
  ["meet", "meet.google.com"],
  ["yt", "youtube.com/"],
  ["youtube", "youtube.com/"],
  ["instagram", "instagram.com/"],
  ["github", "github.com/"],
  ["twitter", "twitter.com/"],
  ["x", "x.com/"],
  ["twitch", "twitch.tv/"],
  ["niconico", "niconico.jp/"],
  ["twitcasting", "twitcasting.tv/"],
  ["discord", "discord.com/app/"],
  ["gmail", "mail.google.com/"],
];

function analyzeurl() {
  var s = editor.textContent,
    a = new VanillaCaret(editor),
    e = a.getCaretPosition();
  for (let i = 0; i < websites.length; i++) {
    var m = websites[i];
    if (s.includes(`~${m[0]}`)) {
      editor.innerText = s.replaceAll(`~${m[0]}`, "https://" + m[1]);
      // c
      a.setCaretPosition(e - websites[i][0].length + websites[i][1].length + 7);
    }
  }
}

function analyzecommand() {
  var s = editor.textContent.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
    a = new VanillaCaret(editor),
    e = a.getCaretPosition(),
    t = s.match(/\/(\S+)/),
    n = t ? t[1] : null;
  if ("/" === s.charAt(0) && /^[a-zA-Z]+/.test(n)) {
    if (s && s.length > 1) {
      editor.classList.add("cm");
      var l = -1 !== builtInCommands.indexOf(n) ? 2 : 4,
        i = s.substr(Number(t.index + n.length + 1)),
        c =
          "@" === i.trim().charAt(0) &&
          i.trim().slice(1).split(" ")[0].length >= 1
            ? 5
            : 3;
      editor.innerHTML = `<div class='viewer'><span class="mk mark1">/</span><span class="mk mark${l}">${n}</span><span class="mk mark${c}">${i}</span></div>`;
    }
  } else
    -1 !== editor.classList.value.indexOf("cm") &&
      (editor.classList.remove("cm"), (editor.innerHTML = s));
  a.setCaretPosition(e);
}

var key = undefined;

editor.addEventListener("input", (e) => {
  "" === e.target.innerText.trim() && (e.target.innerHTML = ""),
    "Backspace" === key || isAppleClient || (analyzeurl(), analyzecommand());
});

document.addEventListener("keydown", (e) => {
  191 === e.keyCode &&
    document.activeElement !== editor &&
    document.activeElement !== aa(".gub1") &&
    (e.preventDefault(), editor.focus());
});

function d7(A, s, g) {
  var k = "";
  var c = "";

  if (s === "Chat Room") {
    k = " active";
  } else {
    k = " disabled";
  }

  if (g === 1) {
    c = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>`;
  } else {
    c = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>`;
  }
  var d = `<div class="gbop${k}" tabindex="0" data-opd="${A}" data-query="${s}">
      <div class="glc">
        <span class="un">
          ${c}${s}</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="ud" fill="#d9d9d9">
        <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
        </svg>
      </div>
      </div>`;
  aa(".selection.du2 .opdc").innerHTML += d;
  chatroom.push(s);
  aa(".selection.du2").classList.add("lo");
}

window.d7 = d7;

aa(".gub1").addEventListener("input", (e) => {
  aa(".selection.du2").classList.remove("snot");
  document.querySelectorAll(".opdc .gbop").forEach((element) => {
    if (
      element
        .getAttribute("data-query")
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    ) {
      element.classList.remove("hide");
    } else {
      element.classList.add("hide");
    }
  });
});

let lorem_ipsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

document.addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

aa(".ddh").addEventListener("contextmenu", Hide);

document.addEventListener("click", Hide);

["resize", "blur"].forEach((e) => {
  window.addEventListener(e, Hide);
});

var c = aa(".ddh"),
  d = aa(".ddh .context_menu");

function Hide() {
  c.classList.remove("show");
}

function Update(t) {
  t.pageX + 330 > window.innerWidth
    ? ((d.style.left = "auto"), (d.style.right = "80px"))
    : (d.style.left = t.pageX + "px"),
    (d.style.top = t.pageY + "px");
}

const isAppleClient = /(Mac|iPhone|iPod|iPad)/i.test(window.navigator.platform);

function share(t) {
  window.open(`https://twitter.com/share?text=${t}`);
}

window.addTpc = function () {
  if (document.visibilityState !== "visible") {
    window.focd++;
    document.title = `(${window.focd}) Structure - Chat Room`;
  } else {
    window.focd = 0;
    document.title = "Structure - Chat Room";
  }
};

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && window.focd !== 0) {
    document.title = "Structure - Chat Room";
    window.focd = 0;
  }
});

// 如果有重複顯示訊息的話是你的問題，Firebase沒連上
