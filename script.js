import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";

import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";

import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-storage.js";

import {
	getFirestore,
	collection,
	setDoc,
	doc,
	getDocs,
	startAfter,
	onSnapshot,
	query,
	orderBy,
	limit,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

const firebaseConfig = {
	apiKey: "AIzaSyAp73V5ZsBUtpy4kS3-QyGirGSpz71DPWo",
	authDomain: "smiling-theory-397204.firebaseapp.com",
	databaseURL:
		"https://smiling-theory-397204-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "smiling-theory-397204",
	storageBucket: "smiling-theory-397204.appspot.com",
	messagingSenderId: "360479398694",
	appId: "1:360479398694:web:05b7df5ce277f89ea8ffe7",
	measurementId: "G-6BKTT1K7D1",
};

class MyDialog {
	constructor({ closeOnOverlayClick = false, closeOnEsc = false } = {}) {
		this.dialogRoot = document.createElement("div");
		this.dialogOverlay = document.createElement("div");
		this.dialogContent = document.createElement("div");

		this.dialogRoot.classList.add("x54SkYRT0");
		this.dialogRoot.setAttribute("data-state", "open");
		this.dialogOverlay.classList.add("overlay");
		this.dialogContent.classList.add("content");
		this.dialogRoot.appendChild(this.dialogOverlay);
		this.dialogRoot.appendChild(this.dialogContent);

		document.body.appendChild(this.dialogRoot);
		this.dialogRoot.classList.add("show");

		// Bind context for event listeners
		if (closeOnOverlayClick) {
			this.dialogOverlay.addEventListener("click", this._handleOverlayClick);
		}
		if (closeOnEsc) {
			document.addEventListener("keydown", this._handleKeyDown);
		}
	}

	_handleOverlayClick = () => {
		this.close();
		this._removeListeners();
	};

	_handleKeyDown = (event) => {
		if (event.keyCode === 27) {
			this.close();
			this._removeListeners();
		}
	};

	_removeListeners() {
		this.dialogOverlay.onclick = null;
		document.removeEventListener("keydown", this._handleKeyDown);
	}

	close() {
		this.dialogRoot.setAttribute("data-state", "closed");
		setTimeout(() => {
			this.dialogRoot.remove();
		}, 100);
	}
}

// 快速選取元素用
const _ = function (e) {
	return document.querySelector(e);
};

// 判斷是否為行動裝置
const isMobileDevice =
	/(Android|webOS|Windows Phone|iPhone|iPod|iPad)/i.test(
		window.navigator.platform
	) || window.innerWidth < 550;

// 當前聊天室
var currentRoom = "";

var isAppBadgeSupport = false;

// 上一個文檔 (分頁用)
var lastDoc;

// 用戶尚未查看的訊息
var unreadCount = 0;

// 用戶數據
var userID;
var userName;

//常用的組件列表
const components = {
	activitybar: _(".activitybar"),
	sidebar: _(".sidebar"),
	main: _(".main"),
	messageInput: _(".xtsARDHTI"),
	searchInput: _(".xujXllYgW"),
	messageArea: _(".xikyLwDf4"),
	sendButton: _(".xuwRtDpu4"),
	fileInput: _(".xVEJA40Qh"),
	actionModalContent: _(".x54SkYRT0"),
	actionModal: _(".x54SkYRT0"),
	actionModalTitle: _(".x54SkYRT0 .xrYn5ZY3v"),
	actionModalSubtitle: _(".xWDUelLWA"),
	actionModalOverlay: _(".x54SkYRT0 .overlay"),
	actionModalIcon: _(".x3DtTJteF"),
	signOutBtn: _(".xlifWPlRj#x8Kzd47QX"),
	directionsBtn: _(".xlifWPlRj#x93dGr74c"),
};

// 敏感詞彙列表
const sensitiveWords = ["幹", "操", "草", "白癡", "智障", "死", "笨蛋", "傻逼"];

var _N0 = false;
var _GF = false;
var currentRoom;

// 處理發送訊息
async function handleSendMessage() {
	let messageText = components.messageInput.innerText.trim();

	if (!messageText || messageText.length > 80) return;

	messageText = replaceSensitiveWords(
		replaceUrlsWithLinks(
			messageText
				.replace(/&([^;]+)/g, "&amp;$1")
				.replaceAll("<", "&lt;")
				.replaceAll(">", "&gt;")
				.replace(/(\r?\n){3,}/g, "\n\n")
		).replaceAll("\n", "<br>")
	);

	components.messageInput.innerHTML = "";

	let a = doc(collection(db, "chats", currentRoom, "messages"));

	await setDoc(a, {
		senderUID: userID,
		sender: userName,
		content: messageText,
		timestamp: Date.now(),
	});

	displaySentMessage(messageText, a.id);
}

// 展示送出的訊息
function displaySentMessage(text, id) {
	const o = document.createElement("div"),
		i = document.createElement("div"),
		c = document.createElement("div"),
		l = document.createElement("div"),
		d = document.createElement("div"),
		u = document.createElement("div");

	u.classList.add("xRHoYYwoZ");
	i.classList.add("xMyW2iRSH");
	o.classList.add("xVC8gtuyS");
	o.classList.add("xiOw4dg0O");
	c.classList.add("xKljxgVJA");
	l.classList.add("xu4Celbbq");
	d.classList.add("xc4iCj2Gy");
	o.appendChild(c);
	c.appendChild(u);
	u.appendChild(l);
	l.appendChild(d);
	u.appendChild(i);
	d.innerHTML = "你";
	i.innerHTML = text;

	components.messageArea.appendChild(o);
	components.messageArea.scrollTo({
		top: components.messageArea.scrollHeight,
		behavior: "smooth",
	});

	try {
		o.setAttribute("data-mid", id);
	} catch (i) {
		console.log("無法設置該元素參數：", i);
	}
}

function displayReceivedMessage(text, y, n, a, s = true) {
	const o = document.createElement("div"),
		i = document.createElement("div"),
		r = document.createElement("div"),
		c = document.createElement("div"),
		l = document.createElement("div"),
		d = document.createElement("div"),
		m = document.createElement("div"),
		u = document.createElement("div");
	u.classList.add("xRHoYYwoZ");
	i.classList.add("xMyW2iRSH");
	o.classList.add("xVC8gtuyS");
	r.classList.add("xSYcbYqTG");
	c.classList.add("xKljxgVJA");
	l.classList.add("xu4Celbbq");
	d.classList.add("xc4iCj2Gy");
	m.classList.add("xt8fROB2L");
	m.innerText = a;
	o.setAttribute("data-mid", y);
	o.appendChild(r);
	o.appendChild(c);
	c.appendChild(u);
	u.appendChild(l);
	l.appendChild(d);
	l.appendChild(m);
	u.appendChild(i);
	d.innerText = n;
	i.innerHTML = text;
	if (s) {
		components.messageArea.appendChild(o);
		components.messageArea.scrollTo({
			top: components.messageArea.scrollHeight,
			behavior: "smooth",
		});
	} else {
		let v = components.messageArea.firstChild;
		components.messageArea.insertBefore(o, v);
	}
}
function replaceUrlsWithLinks(text) {
	return text.replace(/https?:\/\/[^\s/$.?#].[^\s]*/g, function (e) {
		return '<a class="x0ciSQShX" href="'
			.concat(e, '" target="_blank">')
			.concat(decodeURIComponent(e), "</a>");
	});
}

// 初始化
function initialize() {
	if (false === _GF) {
		components.searchInput.removeAttribute("disabled"),
			components.searchInput.setAttribute("tabindex", "0"),
			components.messageArea.classList.remove("xVjpzmyej"),
			_(".xnKzgeITl") && _(".xnKzgeITl").remove();
		var e = new Date().getHours();
		displayReceivedMessage(
			`{dl}好，歡迎回來，現在就開始對話吧！`.replace(
				"{dl}",
				e >= 5 && e < 11
					? "早上"
					: e >= 11 && e < 14
					? "中午"
					: e >= 14 && e < 18
					? "下午"
					: "晚安"
			),
			"0",
			"陌生人",
			"現在"
		),
			(_GF = true),
			(_N0 = true);
	}
}
function _A22(e, t, n = true) {
	var a = document.createElement("div"),
		s = document.createElement("div"),
		o = document.createElement("div"),
		i = document.createElement("div"),
		r = document.createElement("div");
	r.classList.add("xRHoYYwoZ"),
		s.classList.add("xMyW2iRSH"),
		a.classList.add("xVC8gtuyS"),
		o.classList.add("xKljxgVJA"),
		i.classList.add("xu4Celbbq"),
		a.setAttribute("data-mid", t),
		a.appendChild(o),
		o.appendChild(r),
		r.appendChild(i),
		r.appendChild(s),
		(s.innerHTML = e),
		a.classList.add("xiOw4dg0O"),
		(i.innerHTML = '<div class="xc4iCj2Gy">你</div>');
	if (n) {
		components.messageArea.appendChild(a),
			components.messageArea.scrollTo({
				top: components.messageArea.scrollHeight,
				behavior: "smooth",
			});
	} else {
		let c = components.messageArea.firstChild;
		components.messageArea.insertBefore(a, c);
	}
}

// 用戶切換到此分頁就當作已看完所有訊息
document.addEventListener("visibilitychange", function () {
	if (document.visibilityState === "visible") {
		document.title = "Structure";
		isAppBadgeSupport && navigator.clearAppBadge();
		unreadCount = 0;
	}
});

components.messageInput.addEventListener("input", function (e) {
	// /^\/(\w+)\s+(\w+)\s+(\w+)$/;
	// 防止遺留br
	const children = e.target.childNodes;
	if (children.length === 1) {
		const child = e.target.childNodes[0];
		if (child.nodeType === Node.ELEMENT_NODE && child.tagName === "BR") {
			e.target.innerHTML = "";
		}
	}
	
});

// 編輯器的按鍵綁定
components.messageInput.addEventListener("keydown", function (event) {
	switch (event.keyCode) {
		case 13:
			// 沒有Shift且不是行動裝置
			if (!isMobileDevice && !event.shiftKey) {
				event.preventDefault();
				handleSendMessage();
			}
			break;
		case 85:
		case 66:
			if (event.ctrlKey) event.preventDefault();
	}
});

// 如果偵測到該裝置為行動裝置，就添加一個mobile的class類別
isMobileDevice && document.body.classList.add("mobile");

if ("setAppBadge" in navigator || "clearAppBadge" in navigator) {
	isAppBadgeSupport = true;
}

// 送出按鈕點擊事件綁定
components.sendButton.onclick = handleSendMessage;

// 自動將剪貼簿中的資料替換成純文本
components.messageInput.onpaste = function (e) {
	e.preventDefault();
	document.execCommand(
		"insertHTML",
		true,
		protectHtml((e.clipboardData || window.Clipboard).getData("text/plain"))
	);
};

// 規避 HTML 特殊字符
function protectHtml(str) {
	return str
		.replace(/&([^;]+)/g, "&amp;$1")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll(" ", "&nbsp;")
		.replaceAll("\n", "<br>");
}

// 全局鍵盤事件綁定
document.onkeydown = function (e) {
	switch (e.keyCode) {
		case 191:
			"true" === components.messageInput.getAttribute("contenteditable") &&
				document.activeElement !== components.messageInput &&
				document.activeElement !== components.searchInput &&
				(e.preventDefault(), _(".xtsARDHTI").focus());
			break;
		case 75:
			e.ctrlKey && _N0 && (e.preventDefault(), components.searchInput.focus());
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
		case 80:
		case 83:
			e.ctrlKey && e.preventDefault();
			break;
		case 37:
		case 39:
			e.altKey && e.preventDefault();
	}
};

// 防止用戶縮放介面
document.querySelectorAll("body > div").forEach(function (e) {
	e.onwheel = function (e) {
		e.ctrlKey && e.preventDefault();
	};
});

// 禁用瀏覽器自帶的右鍵選單
document.oncontextmenu = function (e) {
	e.preventDefault();
};

_(".xehdiGgBv .xMyenRl7K .x8JU9DbQZ").onclick = function () {
	currentRoom = "";
	_(".main").classList.remove("x8VAGH6N2");
	components.messageInput.innerHTML = ``;
	components.messageInput.setAttribute("contenteditable", "false");
	components.messageInput.setAttribute("tabindex", "-1");
	components.sendButton.setAttribute("tabindex", "-1");
};

// iOS 防止縮放介面
document.addEventListener(
	"touchstart",
	function (e) {
		e.touches && e.touches.length > 1 && e.preventDefault();
	},
	{ passive: false }
);

var lastTouchEndTime = 0;

document.addEventListener(
	"touchend",
	function (e) {
		var t = new Date().getTime();
		t - lastTouchEndTime <= 300 && e.preventDefault(), (lastTouchEndTime = t);
	},
	false
);

document.addEventListener("gesturestart", function (e) {
	e.preventDefault();
});

function formatNumberWithCommas(e) {
	return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function replaceSensitiveWords(text) {
	const escapedWords = sensitiveWords.map((word) =>
		word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
	);
	const regex = new RegExp(escapedWords.join("|"), "gi");
	return text.replace(regex, (match) => "*".repeat(match.length));
}

// 創建聊天室項目
function createChatRoom(e, t, n, a) {
	let s = document.createElement("div"),
		o = document.createElement("div"),
		i = document.createElement("div"),
		r = document.createElement("div");
	s.setAttribute("tabindex", "0"), s.classList.add("x2fP9fkxS");
	createListener(t);
	let l = async () => {
		(currentRoom !== t || isMobileDevice) &&
			((lastDoc = void 0),
			(currentRoom = t),
			loadChatHistory(currentRoom),
			(components.messageArea.innerHTML = ""),
			components.sendButton.classList.remove("disabled"),
			components.fileInput.removeAttribute("disabled"),
			components.messageInput.setAttribute("contenteditable", "true"),
			isMobileDevice ||
				(_(".x2fP9fkxS.active") &&
					_(".x2fP9fkxS.active").classList.remove("active"),
				_(".x2fP9fkxS.interim:not(.active)") &&
					_(".x2fP9fkxS.interim:not(.active)").remove(),
				s.classList.add("active")),
			isMobileDevice &&
				_(".xehdiGgBv .xMyenRl7K .x8JU9DbQZ").setAttribute("tabindex", "0"),
			_(".main").classList.add("x8VAGH6N2"),
			(_(".xvwhg72ii").innerText = s.getAttribute("data-roomName")),
			components.messageInput.setAttribute("contenteditable", "true"),
			components.messageInput.setAttribute("tabindex", "0"),
			components.sendButton.setAttribute("tabindex", "0"));
	};
	(s.onclick = function () {
		l();
	}),
		(s.onkeydown = function (e) {
			13 === e.keyCode && l();
		}),
		s.setAttribute("data-roomid", t),
		s.setAttribute("data-roomname", e),
		s.appendChild(o),
		o.classList.add("xQ65c0Nkc"),
		i.classList.add("xybvM5cRF"),
		o.appendChild(i),
		(i.innerText = e),
		r.classList.add("xT3Ta8vKw");
	var c;
	if (!n) {
		if (a === 0) {
			c = "暫無訊息";
		} else {
			c = `${formatNumberWithCommas(a)} 則訊息`;
		}
	} else {
		c = n;
	}
	(r.innerHTML = `
		<span class="x97KBA8qs">${c}</span>
	`),
		o.appendChild(r),
		_(".xemr1y6ie").appendChild(s);
}

// 計算傳入時間戳與現在的差距
function timeAgo(e) {
	let t = Math.floor((Date.now() - e) / 1e3);
	return t < 60
		? `${t}秒`
		: t < 3600
		? `${Math.floor(t / 60)}分鐘`
		: t < 86400
		? `${Math.floor(t / 3600)}小時`
		: t < 2592e3
		? `${Math.floor(t / 86400)}天`
		: t < 31536e3
		? `${Math.floor(t / 2592e3)}個月`
		: `${Math.floor(t / 31536e3)}年前`;
}

// 允許用戶將文字拖曳到編輯器中
components.messageInput.addEventListener("drop", (e) => {
	e.preventDefault();
	let t = e.dataTransfer.getData("text/plain");
	try {
		e.target.focus(), document.execCommand("insertHTML", true, protectHtml(t));
	} catch (n) {
		console.log(n);
	}
});

// 搜尋功能
components.searchInput.oninput = (e) => {
	document.querySelectorAll(".x8FrVw7Ca .x2fP9fkxS").forEach((item) => {
		if (
			!item
				.getAttribute("data-roomname")
				.toLowerCase()
				.includes(e.target.value.toLowerCase())
		) {
			item.classList.add("hide");
		} else {
			item.classList.remove("hide");
		}
	});
};

// 點擊搜尋文本框模板自動聚焦
_(".x8u3Iqtu9").onclick = function () {
	components.searchInput.focus();
};

// 複製純文本
components.messageInput.oncopy = (e) => {
	e.preventDefault();
	let selection = window.getSelection();
	let selectedText = selection.toString();
	e.clipboardData.setData("text/plain", selectedText);
};

// 如果頁面滾動到最上方，就加載更多訊息
components.messageArea.addEventListener("scroll", function () {
	let e =
		components.messageArea.pageYOffset || components.messageArea.scrollTop;
	0 === e && loadMoreChatHistory(currentRoom);
});

// 格式化文件大小到不同單位
function formatFileSize(e) {
	let t = ["B", "KB", "MB", "GB", "TB"],
		B = e,
		i = 0;
	for (; B >= 1024 && i < t.length - 1; ) (B /= 1024), i++;
	return `${B.toFixed(2)} ${t[i]}`;
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

async function _A2653(e, p, s) {
	var t = await getDocs(collection(db, "chats", s, "messages"));
	createChatRoom(e, s, p, t.size);
}

let oldScrollHeight;

async function loadMoreChatHistory(e) {
	try {
		if (lastDoc !== undefined) {
			let snapshot = await getDocs(
				query(
					collection(db, "chats", e, "messages"),
					orderBy("timestamp", "desc"),
					startAfter(lastDoc),
					limit(10)
				)
			);

			// Update lastDoc if there are more messages to fetch
			if (snapshot.docs.length === 10) {
				lastDoc = snapshot.docs[9];
			} else {
				lastDoc = undefined; // No more messages to load
			}

			snapshot.forEach((doc) => {
				const messageData = doc.data();
				if (messageData.senderUID === userID) {
					_A22(messageData.content, doc.id, false);
				} else {
					displayReceivedMessage(
						messageData.content,
						doc.id,
						messageData.sender,
						timeAgo(messageData.timestamp),
						false
					);
				}
			});

			// Update scrolling
			const newScrollHeight = components.messageArea.scrollHeight;
			components.messageArea.scrollTop = newScrollHeight - oldScrollHeight;
			oldScrollHeight = newScrollHeight;
		}
	} catch (error) {
		console.error("Error fetching messages: ", error);
	}
}

async function loadChatHistory(e) {
	let s = await getDocs(
		query(
			collection(db, "chats", e, "messages"),
			orderBy("timestamp", "desc"),
			limit(10)
		)
	);
	s.docs[9] && (lastDoc = s.docs[9]);
	let t = [];
	s.forEach((e) => {
		t.push(e);
	}),
		t.reverse(),
		t.forEach((e) => {
			var s = e.data();
			s.senderUID === userID
				? _A22(s.content, e.id)
				: displayReceivedMessage(
						s.content,
						e.id,
						s.sender,
						timeAgo(s.timestamp)
				  );
		});
	oldScrollHeight = components.messageArea.scrollHeight;
}

function createListener(e) {
	onSnapshot(
		collection(db, "chats", e, "messages"),
		(s) => {
			// 防止快取數據來作亂
			s.metadata.fromCache ||
				s.docChanges().forEach((s) => {
					// 是否為當前聊天室
					if (currentRoom !== e) return;
					// 數據
					let t = s.doc.data();
					switch (s.type) {
						// 添加
						case "added":
							if (t.senderUID !== userID) {
								if (document.visibilityState === "hidden") {
									unreadCount++;
									document.title = `(${unreadCount}) Structure`;
									isAppBadgeSupport && navigator.setAppBadge(unreadCount);
								}
								displayReceivedMessage(t.content, s.doc.id, t.sender, "現在");
							}
							break;
						// 刪除
						case "removed":
							try {
								var a = _(`.xikyLwDf4 .xVC8gtuyS[data-mid="${s.doc.id}"]`);
								a.classList.add("deleted"), (a.innerHTML = "這則訊息已被刪除");
							} catch (i) {
								console.log("發生未知錯誤", i);
							}
							break;
						// 修改
						case "modified":
							try {
								var a = _(
									`.xikyLwDf4 .xVC8gtuyS[data-mid="${s.doc.id}"] .xMyW2iRSH`
								);
								a.innerHTML = t.content;
							} catch (i) {
								console.log("發生未知錯誤", i);
							}
							break;
					}
				});
		},
		(e) => {
			console.error("監聽錯誤:", e);
		}
	);
}

window.onload = async function () {
	let e = await getDocs(collection(db, "chats"));
	let count = 0;
	_(".xemr1y6ie .spinner").remove();
	e.forEach((e) => {
		var s = e.data();
		if (s.members.indexOf(userID) !== -1) {
			count++;
			_A2653(s.name, s.description, e.id);
		}
	});

	count === 0 &&
		(_(
			".xemr1y6ie"
		).innerHTML = `<div class="xZYFExNlg">尚未加入任何聊天室</div>`);
};

let provider = new GoogleAuthProvider();
let auth = getAuth();

function setupLoginUI() {
	let l = document.createElement("div");
	l.classList.add("xrYn5ZY3v"), (l.innerText = "帳號登入");
	let e = document.createElement("div");
	e.classList.add("xRRuA0Z3S");
	let a = document.createElement("div");
	(a.id = "x7BYgkdiJ"),
		(a.innerHTML = `<svg class="xGBqJjpdr" viewBox="0 0 20 20">
	<path d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z" fill=#4285F4></path>
	<path d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z" fill=#34A853></path>
	<path d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z" fill=#FBBC05></path>
	<path d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z" fill=#EA4335></path></svg>
	<div>使用 Google 登入</div>`);
	let i = document.createElement("div");
	i.id = "xBnuWNG6V";
	i.className = "actionbtn xYIKBnbHS";
	a.className = "actionbtn xYIKBnbHS";
	i.innerHTML = `<svg class=xGBqJjpdr viewBox="0 0 20 20">
	<path d="M1 5.006A2 2 0 012.995 3h14.01A2 2 0 0119 5.006v9.988A2 2 0 0117.005 17H2.995A2 2 0 011 14.994V5.006zM3 5l7 4 7-4v2l-7 4-7-4V5z" fill-rule=evenodd fill=#788aa2></path>
	</svg>
	<div>使用 電子郵件 登入</div>`;
	e.appendChild(a);
	e.appendChild(i);
	let $ = new MyDialog();
	$.dialogContent.classList.add("bt"),
		$.dialogContent.appendChild(l),
		$.dialogContent.appendChild(e),
		(a.onclick = function () {
			signInWithPopup(auth, provider)
				.then((l) => {
					GoogleAuthProvider.credentialFromResult(l).accessToken;
					let e = l.user;
					(userID = e.uid),
						(userName = e.displayName),
						($.dialogContent.innerHTML = `<div class="xJ0pEZGEO">已成功登入Google帳號</div>
						<div class="xDmLoXo3E">
						<img class="xm7NzrczQ" draggable="false" src="${e.photoURL}" alt="avatar"/>
						<div class="xDLBHn55v"><div class="xQ6IT8O6S">${e.displayName}</div>
						<div class="xPnpcvswL">${e.email}</div></div></div>`),
						($.dialogOverlay.onclick = function () {
							$.close();
						});
				})
				.catch((l) => {
					GoogleAuthProvider.credentialFromError(l),
						console.log(l.code, l.message);
				});
		});
	i.onclick = function () {
		const α = new MyDialog({ closeOnEsc: true, closeOnOverlayClick: true });
		const _b0 = document.createElement("div");
		_b0.classList.add("xrYn5ZY3v");
		_b0.innerText = "帳號登入";
		α.dialogContent.appendChild(_b0);
		const γ = document.createElement("div");
		γ.classList.add("xZdL9CF5M");
		α.dialogContent.appendChild(γ);
		const _b1 = document.createElement("input");
		_b1.placeholder = "電子郵件";
		_b1.type = "text";
		_b1.autocomplete = "off";
		_b1.spellcheck = "false";
		γ.appendChild(_b1);
		const _b2 = document.createElement("input");
		_b2.placeholder = "密碼";
		_b2.type = "password";
		γ.appendChild(_b2);
		const κ = document.createElement("div");
		κ.classList.add("xw0IanPrC");
		γ.appendChild(κ);
		const _b3 = document.createElement("div");
		_b3.innerText = "登入";
		_b3.tabIndex = "0";
		_b3.classList.add("x40AApYkW");
		γ.appendChild(_b3);
		_b1.focus();
		var _f14919x = true;

		const SWE = function (email, password) {
			if (!_f14919x) return;
			_f14919x = false;
			κ.classList.remove("show");
			_b3.innerHTML = `
			<svg class="x3xXCjYFp" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<path d="M21 12a9 9 0 1 1-6.219-8.56"/>
			</svg>`;
			signInWithEmailAndPassword(auth, email, password)
				.then((userCredential) => {
					try {
						$.close();
						α.close();
					} catch (error) {}
					// 登录成功
					const user = userCredential.user;
					console.log("用户已登录:", user);
				})
				.catch((error) => {
					setTimeout(function () {
						const errorCode = error.code;
						const errorMessage = error.message;
						κ.classList.add("show");
						if (errorCode === "auth/invalid-login-credentials") {
							console.error("帳號或密碼錯誤");
							κ.innerText = "帳號或密碼錯誤";
						} else if (errorCode === "auth/invalid-email") {
							κ.innerText = "電子郵件格式錯誤";
						} else {
							console.error("其他错误:", errorMessage);
						}
						_b3.innerHTML = "登入";
						_f14919x = true;
					}, 3000);
				});
		};
		_b3.onclick = function () {
			SWE(_b1.value, _b2.value);
		};
		_b2.onkeydown = function (event) {
			if (event.keyCode === 13) {
				SWE(_b1.value, _b2.value);
			}
		};
	};
}

// 身分狀態更新
onAuthStateChanged(auth, (event) => {
	if (event) {
		userID = event.uid;
		userName = event.displayName;
		initialize();
	} else {
		userID = "";
		setupLoginUI();
	}
});

// 登出
components.signOutBtn.onclick = () => {
	signOut(auth)
		.then(() => {
			console.log("User signed out");
		})
		.catch((e) => {
			console.error("Sign out error", e);
		});
};

components.directionsBtn.onclick = () => {
	const dialog = new MyDialog({ closeOnEsc: true, closeOnOverlayClick: true });

	const _b0 = document.createElement("div");
	const _b1 = document.createElement("div");

	_b0.classList.add("xrYn5ZY3v");
	_b1.classList.add("xWDUelLWA");

	_b0.innerText = "設定";
	_b1.innerHTML = `
	<div class="xtTvvWnjq bt">
	</div>
	<div class="xtTvvWnjq">
	<span class="xIzeE22ru">深色模式</span>
	<input type="checkbox" class="cls-switch" checked>
	</div>
	<div class="xtTvvWnjq">
	<span class="xIzeE22ru">自動接受邀請</span>
	<input type="checkbox" class="cls-switch">
	</div>
	<div class="xtTvvWnjq">
	<span class="xIzeE22ru">開啟通知</span>
	<input type="checkbox" class="cls-switch">
	</div>
	`;

	dialog.dialogContent.appendChild(_b0);
	dialog.dialogContent.appendChild(_b1);
};

// 上傳文件
components.fileInput.onchange = function (e) {
	const file = e.target.files[0];
	const _a0 = new MyDialog();
	_a0.dialogContent.classList.add("bt");
	const _a1 = document.createElement("div");
	_a1.classList.add("xrYn5ZY3v");
	const _a2 = document.createElement("div");
	_a2.classList.add("xWDUelLWA");
	_a0.dialogContent.appendChild(_a1);
	_a0.dialogContent.appendChild(_a2);
	// 5MB
	if (file.size / 1024 / 1024 > 5) {
		_a1.innerText = "這個文件太大了";
		_a2.innerText = `這個文件足足有 ${formatFileSize(file.size)}，我們無法負擔`;
		_a0.dialogOverlay.onclick = function () {
			_a0.close();
		};
		return;
	}
	const storageRef = ref(storage, "uploads/" + file.name);
	_a1.innerText = "正在努力上傳中";
	_a2.innerText = "這可能需要一點時間，請耐心等待...";

	const fx0 = document.createElement("div");
	fx0.classList.add("xCECpHDwZ");
	// _a0.dialogContent.appendChild(fx0)
	_a0.dialogContent.appendChild(fx0);
	const fx1 = document.createElement("div");
	fx1.classList.add("xty9qDHrl");

	fx0.appendChild(fx1);

	const fx2 = document.createElement("div");
	fx2.classList.add("xIEj1ZAnA");
	fx2.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
								<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
								<path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
							</svg>`;
	fx1.appendChild(fx2);
	const fx3 = document.createElement("div");
	fx3.classList.add("xxs4n9nhX");
	fx1.appendChild(fx3);
	fx3.innerHTML = `<div class="xTGGn7ABj">${
		file.name
	}</div><div class="xtyaQiCLO">${formatFileSize(file.size)}</div>`;

	fx1.appendChild(fx3);

	const fx4 = document.createElement("div");
	fx4.classList.add("xsoLox5sj");
	fx1.appendChild(fx4);
	const fx5 = document.createElement("div");
	fx5.classList.add("xk0osKWCK");
	fx4.appendChild(fx5);
	const uploadTask = uploadBytesResumable(storageRef, file);
	uploadTask.on(
		"state_changed",
		(snapshot) => {
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			fx5.style.width = `${progress}%`;
			console.log("Upload is " + progress + "% done");
		},
		(error) => {
			console.error(error);
		},
		async () => {
			_a0.dialogOverlay.onclick = function () {
				_a0.close();
			};
			fx0.remove();
			_a1.innerText = "完成上傳";
			_a2.innerText = "這個文件已成功上傳，你的好友可以訪問了";
			const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
			const messageText = `我剛剛上傳了一個名為「${file.name}」的文件，<a href="${downloadURL}" class="x0ciSQShX" target="_blank">點擊下載</a>`;
			let a = doc(collection(db, "chats", currentRoom, "messages"));
			await setDoc(a, {
				senderUID: userID,
				sender: userName,
				content: messageText,
				timestamp: Date.now(),
			});
			displaySentMessage(messageText, a.id);
			components.fileInput.value = "";
		}
	);
};
