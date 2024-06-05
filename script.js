console.log(
	`%c 💀 Please do not perform any operations in the console,\nattackers may steal your data.`,
	"font-size:22px"
);
const _J0 =
		"tsARDHTI.ikyLwDf4.uwRtDpu4.9jgvlvYK.nKzgeITl.ujXllYgW.emr1y6ie.5WLQI9tU.LXlNqANi".split(
			"."
		),
	_J1 = ".data-v-";
let _N0 = false;
let _GF = false;
document.querySelector(_J1 + _J0[5]).addEventListener("input", (e) => {
	// 尚未實作的搜尋功能
	if (e.target.value.trim() === "") {
		e.target.value = "";
		document.querySelector(_J1 + _J0[6]).classList.remove("show");
	} else {
		document.querySelector(_J1 + _J0[6]).classList.add("show");
	}
});

document.querySelector(_J1 + _J0[0]).addEventListener("input", (e) => {
	// 防止輸入框中有不必要的元素
	if (e.target.innerText.trim() === "") {
		e.target.innerHTML = "";
	}
});

document.querySelector(_J1 + _J0[0]).addEventListener("keydown", (e) => {
	switch (e.keyCode) {
		// 按下 "Enter" 發送、按下 "Shift Enter" 換行
		case 13:
			if (!e.shiftKey && e.target.innerHTML.trim() !== "") {
				e.preventDefault();
				if (_N0) _A16(e.target.innerText);
				else console.log("Unable to send the message");
			}
			break;
		// "Ctrl U": 防止加底線
		case 85:
			if (e.ctrlKey) e.preventDefault();
			break;
		// "Ctrl B": 防止變粗體
		case 66:
			if (e.ctrlKey) e.preventDefault();
			break;
		// "ArrowUp": 上一個
		case 38:
			console.log("Previous");
			break;
		// "ArrowDown": 下一個
		case 40:
			console.log("Next");
			break;
	}
});

document.querySelector(_J1 + _J0[2]).onclick = function () {
	// 按下按鈕送出
	if (document.querySelector(_J1 + _J0[0]).innerHTML.trim() !== "") {
		if (_N0) _A16(document.querySelector(_J1 + _J0[0]).innerText);
		else console.log("Unable to send the message");
	}
};

document.querySelector(_J1 + _J0[0]).onpaste = function (t) {
	t.preventDefault();
	document.execCommand(
		"insertText",
		!1,
		(t.clipboardData || window.clipboardData).getData("text/plain")
	); // 插入已複製的純文字
	console.log("Process is completed");
};

document.onkeydown = function (e) {
	// 鍵盤按下事件
	switch (e.keyCode) {
		// "/": 聚焦到輸入框
		case 191:
			if (
				document.activeElement !== document.querySelector(_J1 + _J0[0]) &&
				document.activeElement !== document.querySelector(_J1 + _J0[5])
			) {
				e.preventDefault();
				document.querySelector(_J1 + _J0[0]).focus();
			}
			break;
		case 123:
			// "F12": 防止用戶開啟 DevTools
			e.preventDefault();
			break;
		case 67:
			// "Ctrl Shift C": 防止用戶開啟 DevTools
			if (e.ctrlKey && e.shiftKey) e.preventDefault();
			break;
		case 85:
		case 79:
		case 187:
		case 189:
			// "Ctrl U": 防止用戶查看源代碼
			// "Ctrl O": 防止用戶開啟文件
			// "Ctrl +": 防止用戶縮放
			// "Ctrl -": 防止用戶縮放
			if (e.ctrlKey) e.preventDefault();
			break;
	}
};

// 防止用戶通過Ctrl+Wheel縮放
[".sidebar", ".main"].forEach((item) => {
	document.querySelector(item).onwheel = (e) => {
		if (e.ctrlKey) e.preventDefault();
	};
});
// 禁用預設上下文選單
document.oncontextmenu = (e) => {
	e.preventDefault();
};

function _A16(text) {
	// 發送前置步驟，規避HTML字符
	document.querySelector(_J1 + _J0[0]).innerHTML = "";
	_A17(
		text
			.replaceAll("<", "&lt;")
			.replaceAll(">", "&gt;")
			.replaceAll("\n", "<br>"),
		true,
		true
	);
}

function _A9(length) {
	// 產生指定長度隨機文本
	let _rs = "",
		_ct = 0,
		_cs = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
		_cl = _cs.length;
	while (_ct < length) {
		_rs += _cs.charAt(Math.floor(Math.random() * _cl));
		_ct += 1; // _ct++
	}
	return _rs;
}
function _A18(text) {
	// 匹配所有網址
	return text.replace(/https?:\/\/[^\s/$.?#].[^\s]*/g, function (d) {
		return `<span class="data-v-0ciSQShX" onclick="window.open(&quot;${d}&quot;);this.classList.add(&quot;visited&quot;);">${decodeURIComponent(d)}</span>`;
	});
}
function _B1() {
	// 獲取瀏覽器默認語言 zh-TW → zh, en-US → en
	let _lc = navigator.language.toLowerCase();
	return _lc.includes("-") ? _lc.split("-")[0] : _lc;
}
function _A22(a) {
	var s = RegExp(
		`(${/(\d{1,2}):(\d{2})/.source}|${
			//HH:MM
			/(\d{4}[-\/]\d{1,2}[-\/]\d{1,2})/.source // YYYY/MM/DD
		})`,
		"g"
	);
	return a.replace(s, function (a, s, t, e, n) {
		if (!s.match(/(\d{1,2}):(\d{2})/g))
			return `<span class="data-v-m1PyIOn2">${s}</span>`;
		var r = parseInt(s.split(":")[0]),
			d = parseInt(s.split(":")[1]);
		return r >= 0 && r <= 23 && d >= 0 && d <= 59
			? `<span class="data-v-m1PyIOn2">${s}</span>`
			: s;
	});
}
function _A2(a) {
	if (_GF === false) {
		GetData("history")
			.then((data) => {
				document
					.querySelector(_J1 + _J0[1])
					.classList.remove("data-v-Vjpzmyej");
				if (document.querySelector(_J1 + _J0[4]))
					document.querySelector(_J1 + _J0[4]).remove();
				data["en"].forEach((t) => {
					//data[_B1()]
					_A17(t, false, false);
				});
				_GF = true;
				_N0 = true;
			})
			.catch((e) => {
				console.log("Unable to connect to the server.");
				_A2(e);
			});
	}
}
window.onload = function () {
	var _t091 = sessionStorage.getItem("_structure_invite_code");
	_t091 = _t091 != null ? _t091 : "";
	try {
		GetData("invitation_code")
			.then((data) => {
				document.querySelector(".data-v-pbK92VG3").remove();
				Swal.fire({
					icon: "info",
					title: "Please enter the invitation code",
					input: "text",
					allowOutsideClick: false,
					inputValue: _t091,
					inputAttributes: {
						autocapitalize: "off",
						autocomplete: "off",
						maxlength: 25,
					},
					customClass: {
						title: "data-v-3HKKqelB",
						input: "data-v-pAibjdG1",
					},
					preConfirm: (value) => {
						return new Promise((resolve) => {
							vart = value.toLowerCase();
							setTimeout(() => {
								if (value.trim() === "") {
									Swal.showValidationMessage("You need to write something!");
								} else if (data.indexOf(value.toLowerCase()) === -1) {
									Swal.showValidationMessage(
										"The invitation code cannot be found"
									);
								}
								resolve();
							}, 1000);
						});
					},
				}).then((result) => {
					if (result.isConfirmed) {
						window.user_id = result.value;
						sessionStorage.setItem("_structure_invite_code", result.value);
						Swal.mixin({
							toast: true,
							position: "top-end",
							showConfirmButton: false,
							timer: 2500,
						}).fire({
							icon: "success",
							title: "Login successful",
						});
						_A2();
					}
				});
			})
			.catch((error) => {
				Swal.fire({
					icon: "error",
					title: "Unable to connect to server, please try again",
				});
			});
	} catch (error) {
		Swal.fire({
			icon: "error",
			title: "An unknown error occurred, please try again",
		});
	}
};

// 關鍵詞
const _Y9 =
	'svg class="data-v-leSg0o1l {^1}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"&error.notice.success.info.debug&xmlns="http://www.w3.org/2000/svg"'.split(
		"&"
	);
// 通知的狀態圖標
const _Y1 = new Map([
	[
		_Y9[1].split(".")[0],
		`<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>`,
	],
	[
		_Y9[1].split(".")[1],
		`<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>`,
	],
	[_Y9[1].split(".")[2], `<polyline points="20 6 9 17 4 12"></polyline>`],
	[
		_Y9[1].split(".")[3],
		`<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>`,
	],
	[
		_Y9[1].split(".")[4],
		`<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>`,
	],
]);
var _G17 = false;

function quickStart() {
	_N0 = true;
	document.querySelector(".data-v-nKzgeITl").remove();
	document
		.querySelector(".data-v-ikyLwDf4")
		.classList.remove("data-v-Vjpzmyej");
}

window.ononline = () => {
	window.location.reload();
};
function _A17(t, u) {
	var f = document.createElement("div"),
		n = document.createElement("div"),
		p = document.createElement("div"),
		a = document.createElement("div"),
		y = document.createElement("div"),
		now = new Date(),
		hour = now.getHours(),
		minute = now.getMinutes(), // 當前時間
		ts = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`, // 自動補零
		uid = _A9(8),
		suid = btoa(`${now.getTime()}${uid}`);

	n.classList.add("data-v-MyW2iRSH");
	f.classList.add("data-v-VC8gtuyS");
	p.classList.add("data-v-SYcbYqTG");
	a.classList.add("data-v-KljxgVJA");
	y.classList.add("data-v-u4Celbbq");

	f.setAttribute("data-uid", suid);
	f.appendChild(p);
	f.appendChild(a);
	a.appendChild(y);
	a.appendChild(n);
	var z = _A22(_A18(t));
	y.innerText = "You";
	n.innerHTML = z;
	// 滾動到底部
	const scrollTop = msgfr.scrollTop;
	const divHeight = msgfr.clientHeight;
	const contentHeight = msgfr.scrollHeight;
	msgfr.appendChild(f);
	if (scrollTop + divHeight >= contentHeight) {
		msgfr.scrollTo(0, msgfr.scrollHeight);
	}
	if (u) {
		f.classList.add("data-v-iOw4dg0O");
		try {
			WriteData(z, ts, suid, window.user_id);
		} catch (err) {
			console.log(err);
		}
	}
}

const msgfr = document.querySelector(_J1 + _J0[1]);
function _A25(text, uid, sender) {
	var f = document.createElement("div"),
		n = document.createElement("div"),
		p = document.createElement("div"),
		z = document.createElement("div"),
		y = document.createElement("div");
	n.classList.add("data-v-MyW2iRSH");
	f.classList.add("data-v-VC8gtuyS");
	p.classList.add("data-v-SYcbYqTG");
	z.classList.add("data-v-KljxgVJA");
	y.classList.add("data-v-u4Celbbq");
	f.setAttribute("data-uid", uid);
	f.appendChild(p);
	f.appendChild(z);
	z.appendChild(y);
	z.appendChild(n);
	n.innerHTML = text;
	y.innerText = sender;
	const scrollTop = msgfr.scrollTop;
	const divHeight = msgfr.clientHeight;
	const contentHeight = msgfr.scrollHeight;
	msgfr.appendChild(f);
	if (scrollTop + divHeight >= contentHeight) {
		msgfr.scrollTo(0, msgfr.scrollHeight);
	}
}
window._A25 = _A25;
