console.log(
	"💀 Please do not perform any operations in the console, attackers may steal your data."
);

const _ = (e) => document.querySelector(e); // 比較簡潔的寫法

const isMobileDevice =
	/(Android|webOS|Windows Phone|Mac|iPhone|iPod|iPad)/i.test(
		window.navigator.platform
	); // 用於匹配行動裝置

if (isMobileDevice) {
	document.body.classList.add("mobile");
}

// 定義常用元件
const components = {
	activitybar: _(".activitybar"),
	sidebar: _(".sidebar"),
	main: _(".main"),
	modalInput: _(".data-v-PgDa0opT"),
	modalButton: _(".data-v-7dBirbNO"),
	messageInput: _(".data-v-tsARDHTI"),
	searchInput: _(".data-v-ujXllYgW"),
	messageArea: _(".data-v-ikyLwDf4"),
	sendButton: _(".data-v-uwRtDpu4"),
};

let _N0 = false,
	_GF = false;

// 前置動作
function _A16(e) {
	(components.messageInput.innerHTML = ""), _A17(e);
}

// 生成隨機文字串
function _A9(e) {
	let t = "",
		a = 0,
		n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
		i = n.length;
	for (; a < e; ) (t += n.charAt(Math.floor(Math.random() * i))), (a += 1);
	return t;
}

// 匹配網址
function _A18(e) {
	return e.replace(/https?:\/\/[^\s/$.?#].[^\s]*/g, function (e) {
		return `<a class="data-v-0ciSQShX" href="${e}" target="_blank">${decodeURIComponent(e)}</span>`;
	});
}

components.searchInput.addEventListener("input", (e) => {
	"" === e.target.value.trim()
		? ((e.target.value = ""), _(".data-v-emr1y6ie").classList.remove("show"))
		: _(".data-v-emr1y6ie").classList.add("show");
});
components.messageInput.addEventListener("input", (e) => {
	"" === e.target.innerText.trim() && (e.target.innerHTML = "");
});

components.messageInput.addEventListener("keydown", (e) => {
	switch (e.keyCode) {
		case 13:
			e.shiftKey ||
				"" === e.target.innerHTML.trim() ||
				isMobileDevice ||
				(e.preventDefault(),
				_N0
					? _A16(e.target.innerText)
					: console.log("Unable to send the message"));
			break;
		case 85:
		case 66:
			e.ctrlKey && e.preventDefault();
	}
});

// 點擊按鈕送出
components.sendButton.onclick = function () {
	"" !== components.messageInput.innerHTML.trim() &&
		(_N0
			? _A16(components.messageInput.innerText)
			: console.log("Unable to send the message"));
};

// 替換並規避字符
//white-space: pre;
components.messageInput.onpaste = function (e) {
	e.preventDefault();
	document.execCommand(
		"insertHTML",
		true,
		(e.clipboardData || window.clipboardData)
			.getData("text/plain")
			.replace(/&([^;]+)/g, "&amp;$1")
			.replaceAll("<", "&lt;")
			.replaceAll(">", "&gt;")
			.replaceAll(" ", "&nbsp;")
			.replaceAll("\n", "<br>")
	);
};

// 防止連結被拖到編輯器
components.messageInput.ondragover = (e) => {
	e.preventDefault();
};

document.onkeydown = function (e) {
	switch (e.keyCode) {
		case 191:
			"true" === components.messageInput.getAttribute("contenteditable") &&
				document.activeElement !== components.messageInput &&
				document.activeElement !== components.searchInput &&
				(e.preventDefault(), _(".data-v-tsARDHTI").focus());
			break;
		case 123:
			e.preventDefault();
			break;
		case 67:
			e.ctrlKey && e.shiftKey && e.preventDefault();
			break;
		case 85:
		case 79:
		case 187:
		case 189:
		case 83:
			e.ctrlKey && e.preventDefault();
	}
};

// 防止通過Ctrl+Wheel縮放
document.querySelectorAll("body > div").forEach((e) => {
	e.onwheel = (e) => {
		e.ctrlKey && e.preventDefault();
	};
});

// 禁用原右鍵上下文選單
document.oncontextmenu = (e) => {
	e.preventDefault();
};
function _A2() {
	if (!1 === _GF) {
		_(".data-v-Lwq2C6gp").classList.remove("in"),
			setTimeout(() => _(".data-v-Lwq2C6gp").remove(), 500),
			components.searchInput.removeAttribute("disabled"),
			components.messageInput.setAttribute("contenteditable", "true"),
			components.messageArea.classList.remove("data-v-Vjpzmyej"),
			_(".data-v-nKzgeITl") && _(".data-v-nKzgeITl").remove();
		let e = new Date().getHours();
		_A25(
			//Good {dl} and welcome to Structure
			'Good <span style="color:#6cb6ff">{dl}</span> and welcome to Structure'.replaceAll(
				"{dl}",
				e >= 5 && e < 12
					? "morning" //morning
					: e >= 12 && e < 18
					? "afternoon" //afternoon
					: e >= 18 && e < 24
					? "evening" //evening
					: "night" //night
			),
			"0",
			"Official",
			true
		),
			(_GF = !0),
			(_N0 = !0);
	}
}
function _A17(e) {
	var h = e
		.replace(/&([^;]+)/g, "&amp;$1")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;");

	console.log(h);
	var t = document.createElement("div"),
		a = document.createElement("div"),
		n = document.createElement("div"),
		i = document.createElement("div");
	(ts = new Date().getTime()),
		(suid = btoa(`${ts}${(uid = _A9(8))}`)),
		a.classList.add("data-v-MyW2iRSH"),
		t.classList.add("data-v-VC8gtuyS"),
		n.classList.add("data-v-KljxgVJA"),
		i.classList.add("data-v-u4Celbbq"),
		t.setAttribute("data-uid", suid),
		t.appendChild(n),
		n.appendChild(i),
		n.appendChild(a);
	var s = _A18(h).replaceAll("\n", "<br>");
	(a.oncontextmenu = function (z) {
		_GF && S119(z, e, a);
	}),
		(a.innerHTML = s),
		(i.innerHTML = '<div class="data-v-c4iCj2Gy">You</div>'),
		components.messageArea.appendChild(t),
		components.messageArea.scrollTo({
			top: components.messageArea.scrollHeight,
			behavior: "smooth",
		}),
		t.classList.add("data-v-iOw4dg0O");
	try {
		WriteData(s, ts, suid, window.user_id);
	} catch (l) {
		console.log(l);
	}
}
(window.onload = function () {
	var e = new URLSearchParams(window.location.search).get("invitecd");
	e = null != e ? e : "";
	var t = localStorage.getItem("_structure_invite_code");
	t = null != t ? t : e;
	try {
		function _ac() {
			components.modalInput.onkeydown = () => {
				return "";
			};
			components.modalInput.blur();
			components.modalButton.blur();
			components.modalButton.onclick = () => {
				return "";
			};
			var e = components.modalInput.value.toLowerCase(),
				t = _(".data-v-HiNaAdY7");
			components.modalButton.classList.add("progress");
			components.modalButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="spinner"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>`;
			GetData("invitation_code")
				.then((a) => {
					"" === e.trim()
						? (t.classList.add("show"),
						  (t.querySelector("span").textContent =
								"You need to write something!"))
						: -1 !== a.indexOf(e)
						? (t.classList.remove("show"),
						  localStorage.setItem("_structure_invite_code", e),
						  (window.user_id = e),
						  _A2())
						: (t.classList.add("show"),
						  (t.querySelector("span").textContent =
								"The invitation code cannot be found"));
					components.modalInput.onkeydown = (e) => {
						13 === e.keyCode && _ac();
					};
					components.modalButton.onclick = a;
					components.modalButton.classList.remove("progress");
					components.modalButton.innerHTML = "<span>OK</span>";
				})
				.catch((e) => {
					console.error(e);
					t.classList.add("show");
					t.querySelector("span").textContent = "An unknown error occurred";
					components.modalButton.classList.remove("progress");
					components.modalButton.innerHTML = "<span>OK</span>";
					components.modalInput.onkeydown = (e) => {
						13 === e.keyCode && _ac();
					};
					components.modalButton.onclick = a;
				});
		}
		setTimeout(function () {
			_(".data-v-Lwq2C6gp").classList.add("in");
		}, 1e3),
			(components.modalInput.value = t),
			_(".data-v-aAFBykLS").classList.remove("show"),
			(components.modalInput.onkeydown = (e) => {
				13 === e.keyCode && _ac();
			}),
			(components.modalButton.onclick = _ac),
			_(".data-v-PgDa0opT").focus();
	} catch (n) {
		console.error(n);
	}
}),
	(window.ononline = () => {
		window.location.reload();
	});
function _A25(e, t, a, nn) {
	var n = document.createElement("div"),
		i = document.createElement("div"),
		s = document.createElement("div"),
		l = document.createElement("div"),
		r = document.createElement("div"),
		fs = document.createElement("div"),
		h = document.createElement("div"),
		v = document.createElement("div");
	i.classList.add("data-v-MyW2iRSH"),
		n.classList.add("data-v-VC8gtuyS"),
		s.classList.add("data-v-SYcbYqTG"),
		l.classList.add("data-v-KljxgVJA"),
		r.classList.add("data-v-u4Celbbq"),
		fs.classList.add("data-v-c4iCj2Gy"),
		h.classList.add("data-v-uvoVURIs");
	v.classList.add("data-v-t8fROB2L");
	h.innerText = " • ";
	v.innerText = "0 sec";
	n.setAttribute("data-uid", t),
		n.appendChild(s),
		n.appendChild(l),
		l.appendChild(r),
		r.appendChild(fs),
		r.appendChild(h),
		r.appendChild(v),
		l.appendChild(i),
		(fs.innerText = a),
		(i.oncontextmenu = function (j) {
			let _n = document.createElement("div");
			_n.innerHTML = e;
			let _r = _n.textContent || _n.innerText || "";
			_GF && S119(j, _r, i);
		}),
		(i.innerHTML = e);
	if (nn) {
		console.log("verify account");
	}
	let o = components.messageArea.scrollTop,
		d = components.messageArea.clientHeight,
		c = components.messageArea.scrollHeight;
	components.messageArea.appendChild(n),
		80 > Math.abs(o + d - c) &&
			components.messageArea.scrollTo({ top: c, behavior: "smooth" });
}
function S119(e, s, f) {
	var t = _(".data-v-aAFBykLS");
	if (t.classList.value.includes("show")) t.classList.remove("show");
	else {
		t.querySelector(".item[data-conid='copy']").onclick = async function () {
			await navigator.clipboard.writeText(s);
			t.classList.remove("show");
		};
		t.querySelector(".item[data-conid='translate']").onclick = function () {
			window.open(
				`https://translate.google.com.tw/?sl=auto&tl=${navigator.language}&op=translate&text=${s}`
			);
		};

		t.style.left = e.clientX + "px";
		t.style.top = e.clientY + "px";
		t.classList.add("show");
	}
}
(window._A25 = _A25),
	document.querySelectorAll(".activitybar ._top .option").forEach((e) => {
		e.onclick = () => {
			_(".activitybar ._top .option.active").classList.remove("active"),
				e.classList.add("active");
		};
	}),
	document.addEventListener("click", function (e) {
		var t = _(".data-v-aAFBykLS");
		t.contains(e.target) || t.classList.remove("show");
	});

components.messageArea.addEventListener("scroll", function () {
	_(".data-v-aAFBykLS").classList.remove("show");
});

function addRippleAnimation(element, color) {
	element.addEventListener("click", (event) => {
		const button = event.currentTarget;
		const circle = document.createElement("span");
		const diameter = Math.max(button.clientWidth, button.clientHeight);
		circle.style.background = color;
		circle.style.width = circle.style.height = diameter + "px";
		circle.style.left = event.offsetX - diameter / 2 + "px";
		circle.style.top = event.offsetY - diameter / 2 + "px";
		circle.classList.add("ripple_effect");
		const ripple = button.getElementsByClassName("ripple_effect")[0];
		if (ripple) {
			ripple.remove();
		}
		button.appendChild(circle);
	});
}

addRippleAnimation(_(".data-v-8u3Iqtu9"), "#2d2d3866");

document.addEventListener(
	"touchstart",
	(event) => {
		if (event.touches && event.touches.length > 1) {
			// 禁止多指觸控
			event.preventDefault();
		}
	},
	{ passive: false }
);

let lastTouchEndTime = 0;
document.addEventListener(
	"touchend",
	(event) => {
		const now = new Date().getTime();
		if (now - lastTouchEndTime <= 300) {
			// 偵測時間差是否小於 300ms
			event.preventDefault();
		}
		lastTouchEndTime = now;
	},
	false
);

document.addEventListener("gesturestart", function (event) {
	// 阻止兩指縮放畫面
	event.preventDefault();
});
