const allmsg = [],
	aa = (t) => document.querySelector(t),
	ag = (t) => document.querySelectorAll(t);
(ba = (t) => localStorage.getItem(t)),
	(editor = aa(".tg1")),
	(sendbtn = aa(".tg2")),
	(msgb = aa(".kl1"));
(window.focd = 0), (window.login = !1);
var chatroom = [];
function ab() {
	let t = window.navigator.userAgentData;
	return !!t && !!t.brands && t.brands.some((t) => "Google Chrome" === t.brand);
}
function ac(t, e) {
	for (let n = 0; n < e.length; n++)
		if (t.includes(e)) return ["success", t, e];
	return ["failure"];
}
function ud() {
	let t = new Date().getTime();
	return `${t}-${Math.floor(1e6 * Math.random())}`;
}
function cg(t) {
	editor.setAttribute("contenteditable", !0),
		aa(".gub1").removeAttribute("disabled"),
		(aa(".un .name").innerText = "Chat Room"),
		(aa(".bn .thumbnail").src = "/assets/unnamed.jpg"),
		(document.title = "Structure - Chat Room"),
		(aa(".account").innerText = t),
		(window.login = !0);
	window.ddt1();
}
window.onload = () => {
	var t = ba("username");
	t
		? cg(t)
		: ((aa(".account").innerText = "Login"),
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
				customClass: { icon: "no-border" },
		  }).then(() => {
				Swal.fire({
					title: "Enter your name",
					input: "text",
					confirmButtonText: `Next&nbsp;
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="#fff" width=20 height=20>
        <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
        </svg>`,
					allowOutsideClick: !1,
					inputValidator(t) {
						if (!t) return "name cannot be empty";
						if (!/^[a-zA-Z0-9]+$/.test(t))
							return "The name can only contain letters or numbers";
						if (t.length < 5)
							return "The name cannot be less than 5 characters";
						if (/^\d+$/.test(t)) return "The name cannot be all numbers";
						Swal.fire({
							title: "Enter invitation code",
							input: "text",
							confirmButtonText: `Okay&nbsp;<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="#fff" width=20 height=20>
              <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
              </svg>`,
							allowOutsideClick: !1,
							inputValidator: (e) =>
								e
									? "25a3395fe136" !== e
										? "Invalid invitation code"
										: void (localStorage.setItem("uuid", ud()),
										  localStorage.setItem("username", t),
										  cg(t))
									: "Invitation code cannot be empty",
						});
					},
				});
		  }));
};
let enletters = Array.from(
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz<>;-+|''\"'[](){}=~.,/\\1234567890*&^%$#@"
	),
	inited = !1;
function sendmsg() {
	if ("" !== editor.innerText.trim() && "/" !== editor.textContent.charAt(0)) {
		var t = editor.innerText
			.replaceAll("\\n", "\n")
			.replaceAll("<", "&lt;")
			.replaceAll(">", "&gt;");
		editor.innerHTML = "";
		let e = Date.now();
		(window.ccc1 = e),
			window.writeUserData(t, e),
			window.dc(t, !0),
			editor.focus();
	}
}
function getCurrentDateTime() {
	let t = new Date(),
		e = t.getFullYear(),
		n = (t.getMonth() + 1).toString().padStart(2, "0"),
		i = t.getDate().toString().padStart(2, "0"),
		a = t.getHours().toString().padStart(2, "0"),
		s = t.getMinutes().toString().padStart(2, "0"),
		o = t.getSeconds().toString().padStart(2, "0"),
		r = t.getMilliseconds().toString().padStart(3, "0"),
		l = `${e}-${n}-${i}-${a}-${s}-${o}-${r}`;
	return l;
}
function getCurrentTime() {
	var t = new Date(),
		e = t.getHours(),
		n = t.getMinutes();
	return `${(e = e >= 10 ? e : `0${e}`)}:${(n = n >= 10 ? n : `0${n}`)}`;
}
function handlePaste(t) {
	t.preventDefault();
	let e = (t.clipboardData || window.clipboardData).getData("text/plain");
	console.log("Process is completed"),
		document.execCommand("insertText", !1, e);
}
function E(t) {
	for (
		var e = /((https?:\/\/|www\.)[^\s<)]+)/gi, n = 0;
		n < t.childNodes.length;
		n++
	) {
		var i = t.childNodes[n];
		if (i.nodeType === Node.TEXT_NODE) {
			var a = i.nodeValue.replace(
					e,
					"<a href='$1' target='_blank' onclick='this.classList.add(\"visited\")' draggable='false'>$1</a>"
				),
				s = document.createElement("span");
			(s.innerHTML = a), t.replaceChild(s, i);
		}
		i.nodeType === Node.ELEMENT_NODE && E(i);
	}
}
function getRandomInt(t) {
	return Math.floor(Math.random() * Math.floor(t));
}
(window.ccc1 = ""),
	(window.dc = function (t, e, n = !0) {
		let i = document.createElement("div");
		i.classList.add("gdk"), n && i.classList.add("rg");
		let a = document.createElement("div");
		a.classList.add("sgv0");
		let s = document.createElement("div");
		s.classList.add("sgv1"), s.setAttribute("tabindex", "0");
		let o = document.createElement("div");
		o.classList.add("sgv2"), (o.innerText = getCurrentTime());
		let r = document.createElement("div");
		r.classList.add("dlu"), t.length > 500 && r.classList.add("longer");
		var l = aa(".ddh");
		(s.oncontextmenu = (e) => {
			editor.setAttribute("contenteditable", !1),
				aa(".gub1").setAttribute("disabled", !0),
				l.classList.add("show"),
				Update(e),
				(l.querySelector(".context_menu .option.copy").onclick = () => {
					navigator.clipboard.writeText(t);
				}),
				(l.querySelector(".context_menu .option.share").onclick = () =>
					share(t)),
				(l.querySelector(".context_menu .option.delete").onclick = () => {
					i.remove();
				});
		}),
			msgb.appendChild(i),
			!n &&
				(i.appendChild(a),
				tippy(a, {
					arrow: !1,
					animation: "fade",
					trigger: "click",
					content: e.split("-")[0],
					placement: "right-start",
				})),
			i.appendChild(s),
			i.appendChild(o),
			s.appendChild(r),
			(r.innerText = t.replaceAll("<", "&lt;").replaceAll(">", "&gt;")),
			E(r),
			(msgb.scrollTop = msgb.scrollHeight);
	}),
	(sendbtn.onclick = () => {
		sendmsg();
	}),
	(editor.onkeydown = (t) => {
		"Enter" == t.key && t.shiftKey
			? (key = "Backspace")
			: "Enter" == t.key
			? (t.preventDefault(), sendmsg())
			: "Tab" == t.key
			? t.preventDefault()
			: (key = t.key);
	});
var list = [],
	builtInCommands = [
		"kick",
		"say",
		"ban",
		"timeout",
		"msg",
		"help",
		"settings",
		"copilot",
	];
for (let index = 0; index < builtInCommands.length; index++)
	list.push(Array.from(builtInCommands[index]));
function gcp(t, e) {
	for (let n = 0; n < e.length; n++)
		if (t.toLowerCase() === e[n][0]) return e[n].slice(1).join("");
	return "Not found";
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
var key = void 0;
function d7(t, e, n) {
	var f = `onclick="s8(${t},\'${e}\')"`;
	var s = `<div class="gbop${1 === n ? " nowrap" : " disabled"} ${
		"Chat Room" === e ? "active" : ""
	}" tabindex="0" data-opd="${t}" data-query="${e}" ${1 === n ? f : ""}>
      <div class="glc">
        <span class="un">
          ${
						1 === n
							? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>`
							: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>`
					}${e}</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="ud" fill="#d9d9d9">
        <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
        </svg>
      </div>
      </div>`;
	(aa(".selection.du2 .opdc").innerHTML += s),
		chatroom.push(e),
		aa(".selection.du2").classList.add("lo");
}

function s8(num, f) {
	ag(".opdc .gbop.nowrap").forEach((element) => {
		element.classList.remove("active");
	});
	try {
		aa(`.opdc .gbop.nowrap[data-opd="${num}"]`).classList.add("active");
		aa(".un .name").innerText = `${f}`;
	} catch (e) {
		return e;
	}
}
editor.addEventListener("input", (t) => {
	"" === t.target.innerText.trim() && (t.target.innerHTML = ""),
		"Backspace" === key || isAppleClient || analyzecommand();
}),
	document.addEventListener("keydown", (t) => {
		191 === t.keyCode &&
			document.activeElement !== editor &&
			document.activeElement !== aa(".gub1") &&
			(t.preventDefault(), editor.focus());
	}),
	(window.d7 = d7),
	aa(".gub1").addEventListener("input", (t) => {
		aa(".selection.du2").classList.remove("snot"),
			ag(".opdc .gbop").forEach((e) => {
				e
					.getAttribute("data-query")
					.toLowerCase()
					.includes(t.target.value.toLowerCase())
					? e.classList.remove("hide")
					: e.classList.add("hide");
			});
	});
document.addEventListener("contextmenu", (t) => {
	t.preventDefault();
}),
	aa(".ddh").addEventListener("contextmenu", Hide),
	document.addEventListener("click", Hide),
	["resize", "blur"].forEach((t) => {
		window.addEventListener(t, Hide);
	});
var c = aa(".ddh"),
	d = aa(".ddh .context_menu");
function Hide() {
	c.classList.remove("show"),
		editor.setAttribute("contenteditable", !0),
		aa(".gub1").removeAttribute("disabled");
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
(window.addTpc = function () {
	"visible" !== document.visibilityState
		? (window.focd++,
		  (document.title = `(${window.focd}) Structure - Chat Room`))
		: ((window.focd = 0), (document.title = "Structure - Chat Room"));
}),
	document.addEventListener("visibilitychange", () => {
		"visible" === document.visibilityState &&
			0 !== window.focd &&
			((document.title = "Structure - Chat Room"), (window.focd = 0));
	});
const checkStatus = async () => {
	try {
		let t = await fetch("https://jsonplaceholder.typicode.com/posts");
		return t.status >= 200 && t.status < 300;
	} catch (e) {
		return !1;
	}
};
function sendNotification(t, e) {
	"Notification" in window
		? Notification.requestPermission().then(function (n) {
				"granted" === n
					? (new Notification(t, { body: e }).onclick = function () {
							console.log("Clicker");
					  })
					: console.warn("Pic");
		  })
		: console.warn("unSupport");
}
