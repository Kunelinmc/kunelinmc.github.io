/**release 2.6*/
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
	enableIndexedDbPersistence,
	collection,
	setDoc,
	doc,
	getDoc,
	getDocs,
	startAfter,
	onSnapshot,
	query,
	orderBy,
	arrayRemove,
	updateDoc,
	limit,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

class MyIcons {
	constructor() {
		this.resources = {
			check: ['<path d="M20 6 9 17l-5-5" />'],
			loader: ['<path d="M21 12a9 9 0 1 1-6.219-8.56" />'],
			copy: [
				'<rect width="14" height="14" x="8" y="8" rx="2" ry="2" />',
				'<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />',
			],
			translate: [
				'<path d="m5 8 6 6" />',
				'<path d="m4 14 6-6 2-3" />',
				'<path d="M2 5h12" />',
				'<path d="M7 2h1" />',
				'<path d="m22 22-5-10-5 10" />',
				'<path d="M14 18h6" />',
			],
			edit: [
				'<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />',
			],
			more: [
				'<circle cx="12" cy="12" r="1" />',
				'<circle cx="12" cy="5" r="1" />',
				'<circle cx="12" cy="19" r="1" />',
			],
			info: [
				'<circle cx="12" cy="12" r="10"/>',
				'<path d="M12 16v-4"/>',
				'<path d="M12 8h.01"/>',
			],
			close: ['<path d="M18 6 6 18"/>', '<path d="m6 6 12 12"/>'],
		};
	}

	get({ name, size = 20, styles = "" } = {}) {
		if (!this.resources[name]) {
			throw new Error(`Icon with name "${name}" does not exist`);
		}
		return `<svg aria-hidden="true" style="${styles}" xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${this.resources[
			name
		].join("")}</svg>`;
	}
}

const _myicons = new MyIcons();

function oek(d, c) {
	d.focusable(true);

	d.addEventListener("keydown", function (event) {
		if (event.keyCode === 13 || event.key === "Enter") {
			c();
		}
	});
	d.addEventListener("click", function () {
		c();
	});
}

function MyWrapper(g, k = "") {
	const e = ec(g);
	e.innerHTML = k;
	return e;
}

HTMLElement.prototype.clear = function () {
	this.innerHTML = "";
};

HTMLElement.prototype.focusable = function (t) {
	this.tabIndex = t ? "0" : "-1";
};

class MyPopover {
	constructor(trigger) {
		this.Root = ec("xEHCrF5Oe");
		this.Overlay = ec("overlay");
		this.Content = ec("xC3Uih0ex");
		this.trigger = trigger;
		const TriggerRect = this.trigger.getBoundingClientRect();
		this.Content.style.left = TriggerRect.left + "px";
		this.Content.style.top = TriggerRect.top + TriggerRect.height + "px";
		this.Root.setAttribute("data-state", "open");
		this.Root.setAttribute("role", "popover");
		this.Root.setAttribute("aria-modal", "true");
		document.body.appendChild(this.Root);
		this.Root.appendChild(this.Overlay);
		this.Root.appendChild(this.Content);
		this.Root.onwheel = function (e) {
			e.ctrlKey && e.preventDefault();
		};
		this.hidden_elements = document.querySelectorAll(
			"body > *:not(.xEHCrF5Oe, script, [hidden])"
		);
		this.hidden_elements.forEach((item) => {
			item.setAttribute("inert", "true");
		});
		this.Overlay.addEventListener("click", () => this.close());
		this.Overlay.addEventListener("contextmenu", () => this.close());
		document.addEventListener("keydown", this._handleKeyDown);
	}
	_handleKeyDown = (event) => {
		if (event.keyCode === 27) {
			this.close();
			this.trigger.focus();
		}
	};
	_removeListeners() {
		document.removeEventListener("keydown", this._handleKeyDown);
	}
	close() {
		this._removeListeners();
		this.hidden_elements.forEach((item) => {
			item.removeAttribute("inert");
		});
		this.Root.setAttribute("data-state", "closed");
		setTimeout(() => {
			this.Root.remove();
		}, 100);
	}
}

class MyDialog {
	constructor({ closeOnOverlayClick = false, closeOnEsc = false } = {}) {
		this.Root = ec("x54SkYRT0");
		this.Overlay = ec("overlay");
		this.Content = ec("content");
		this.Root.setAttribute("data-state", "open");
		this.Root.appendChild(this.Overlay);
		this.Root.appendChild(this.Content);
		this.Root.setAttribute("role", "dialog");
		this.Root.setAttribute("aria-modal", "true");
		this.Root.onwheel = function (e) {
			e.ctrlKey && e.preventDefault();
		};
		this.hidden_elements = document.querySelectorAll(
			"body > *:not(.x54SkYRT0, script, style, [hidden])"
		);
		this.hidden_elements.forEach((item) => {
			item.setAttribute("inert", "true");
		});
		document.body.appendChild(this.Root);
		this.Root.classList.add("show");

		// Add this instance to the stack
		MyDialog.stack.push(this);

		if (closeOnOverlayClick) {
			this.Overlay.addEventListener("click", this._handleOverlayClick);
		}
		if (closeOnEsc) {
			document.addEventListener("keydown", this._handleKeyDown);
		}
	}

	_handleOverlayClick = () => {
		this.close();
	};

	_handleKeyDown = (event) => {
		if (event.keyCode === 27) {
			// Only close the topmost dialog
			const topDialog = MyDialog.stack[MyDialog.stack.length - 1];
			if (topDialog === this) {
				this.close();
			}
		}
	};

	close() {
		// Remove this instance from the stack
		const index = MyDialog.stack.indexOf(this);
		if (index > -1) {
			MyDialog.stack.splice(index, 1);
		}

		this.hidden_elements.forEach((item) => {
			item.removeAttribute("inert");
		});
		this.Root.setAttribute("data-state", "closed");
		setTimeout(() => {
			this.Root.remove();
		}, 100);

		this._removeListeners();
	}

	_removeListeners() {
		this.Overlay.onclick = null;
		document.removeEventListener("keydown", this._handleKeyDown);
	}
}

// Static property to maintain the stack of dialogs
MyDialog.stack = [];

// 新方法 (尚未全域套用)
const ec = (t) => {
	const Q = document.createElement("div");
	Q.classList.add(t);
	return Q;
};

// 快速選取元素用
const _ = (e) => {
	return document.querySelector(e);
};

// 初始化 Firebase App
const app = initializeApp({
	apiKey: "AIzaSyAp73V5ZsBUtpy4kS3-QyGirGSpz71DPWo",
	authDomain: "smiling-theory-397204.firebaseapp.com",
	databaseURL:
		"https://smiling-theory-397204-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "smiling-theory-397204",
	storageBucket: "smiling-theory-397204.appspot.com",
	messagingSenderId: "360479398694",
	appId: "1:360479398694:web:05b7df5ce277f89ea8ffe7",
	measurementId: "G-6BKTT1K7D1",
});

const db = getFirestore(app);

// 離線緩存
enableIndexedDbPersistence(db)
	.then(() => {
		console.log("Offline persistence is enabled.");
	})
	.catch((err) => {
		if (err.code === "failed-precondition") {
			console.error(
				"Multiple tabs open, persistence can only be enabled in one tab at a time."
			);
		} else if (err.code === "unimplemented") {
			console.error(
				"The current browser does not support offline persistence."
			);
		}
	});

const storage = getStorage(app);
// 驗證
const provider = new GoogleAuthProvider();
const auth = getAuth();

// 判斷是否為行動裝置
const isMobileDevice =
	/(Android|webOS|Windows Phone|iPhone|iPod|iPad)/i.test(
		window.navigator.platform
	) || window.innerWidth < 550;

// 所有已加入的聊天室
const allRoom = [];

// 是否支持PWA徽章
const isAppBadgeSupport =
	"setAppBadge" in navigator && "clearAppBadge" in navigator;

//常用的組件列表
const components = {
	sidebar: _(".sidebar"), // 側邊欄
	main: _(".main"), // 主要區域
	messageInput: _(".xtsARDHTI"), // 訊息輸入框
	searchInput: _(".xujXllYgW"), // 搜尋輸入框
	messageArea: _(".xikyLwDf4"), // 訊息容器
	sendButton: _(".xuwRtDpu4"), // 送出按鈕
	fileInput: _(".xVEJA40Qh"), // 上傳文件輸入
	signOutButton: _(".xlifWPlRj#x8Kzd47QX"), // 登出按鈕
	backButton: _(".xehdiGgBv .xMyenRl7K .x8JU9DbQZ"), // 返回按鈕
	primaryArea: _(".xemr1y6ie"),
};

// 敏感詞彙列表
const sensitiveWords = [
	"\u5e79",
	"\u64cd",
	"\u767d\u7661",
	"\u667a\u969c",
	"\u6b7b",
	"\u7b28\u86cb",
	"\u50bb\u903c",
];

// 當前版本
const versionInfo = {
	current: "v0.7",
	directions: "Optimized the operation steps and fixed some errors.",
};

// 定義一個全局快取對象
const userProfileCache = {};

const roomProfileCache = {};

// 是否已初始化
let initialized = false;

// 舊的捲動高度
let oldScrollHeight;

// 上一次點擊結束的時間
let lastTouchEndTime = 0;

// 當前聊天室
let currentRoom = "";

// 上一個文檔 (分頁用)
let lastDoc;

// 用戶尚未查看的訊息
let unreadCount = 0;

// 用戶ID
let userID;

// 自動加上移動裝置標籤
if (isMobileDevice) {
	document.body.classList.add("mobile");
}

// 帶頂欄的對話框
function quickHpdDialog(hd, k = false) {
	const $f = new MyDialog({ closeOnEsc: true, closeOnOverlayClick: true });

	const $n = ec("xrYn5ZY3v");
	$n.classList.add("lf");

	$f.Content.style.padding = "0";

	const $g = ec("x6Y89FynP");
	$n.appendChild($g);
	$g.innerText = hd;

	$f.Content.appendChild($n);

	const $z = ec("xWDUelLWA");

	$f.Content.appendChild($z);

	if (k) {
		const $b = ec("xvb5soWNa");
		$b.focusable(true);
		$b.innerHTML = _myicons.get({
			name: "close",
			size: 24,
			styles: "min-width: 24px",
		});
		$f.close = $f.close.bind($f);
		oek($b, $f.close);

		$n.appendChild($b);
	}

	return { root: $f, body: $z };
}

// 格式化訊息文本
function formatMessageContent(text) {
	return replaceEmojiWithImage(
		replaceSensitiveWords(
			replaceSeparatorLines(
				replaceUrlsWithLinks(
					text
						.replace(/&([^;]+)/g, "&amp;$1")
						.replaceAll("<", "&lt;")
						.replaceAll(">", "&gt;")
						.replace(/(\r?\n){3,}/g, "\n\n")
				)
			)
		).replaceAll("\n", "<br>")
	);
}

// 處理發送訊息
async function handleSendMessage() {
	let messageText = components.messageInput.innerText.trim();
	if (!messageText || messageText.length >= 800 || !currentRoom) return;

	messageText = formatMessageContent(messageText);

	components.messageInput.clear();

	let a = doc(collection(db, "chats", currentRoom, "messages"));

	await setDoc(a, {
		sender: userID,
		content: messageText,
		timestamp: Date.now(),
	});

	displaySentMessage(messageText, a.id);
}

function afc(root) {
	const self = root.querySelector("img.xGsec9lFd");

	self &&
		oek(self, function () {
			window.open(self.src);
		});
}

// 展示自己送出的訊息
function displaySentMessage(text, id, n = true) {
	const o = ec("xVC8gtuyS"),
		i = ec("xMyW2iRSH"),
		c = ec("xKljxgVJA"),
		l = ec("xu4Celbbq"),
		d = ec("xc4iCj2Gy"),
		u = ec("xRHoYYwoZ");

	o.setAttribute("data-message-id", id); // 訊息的 ID
	o.classList.add("xiOw4dg0O");

	o.appendChild(c);
	c.appendChild(u);
	u.appendChild(l);
	l.appendChild(d);
	u.appendChild(i);

	d.innerText = "You";
	i.innerHTML = text; // 訊息內容

	if (n) {
		// 作為新的訊息
		components.messageArea.appendChild(o); // 將訊息加入容器中
		components.messageArea.scrollTo({
			top: components.messageArea.scrollHeight,
			behavior: "instant",
		}); // 滾動到最底部
	} else {
		// 過往的訊息
		const v = components.messageArea.firstChild;
		components.messageArea.insertBefore(o, v); // 將訊息插入到容器中的最前面
	}
}

// 展示別人送出的訊息
function displayReceivedMessage(text, id, sender, a, s = true) {
	const o = ec("xVC8gtuyS"),
		i = ec("xMyW2iRSH"),
		r = ec("xSYcbYqTG"),
		c = ec("xKljxgVJA"),
		l = ec("xu4Celbbq"),
		d = ec("xc4iCj2Gy"),
		m = ec("xt8fROB2L"),
		u = ec("xRHoYYwoZ"),
		q = document.createElement("img");

	// 先添加到容器中
	if (s) {
		// 作為新的訊息
		components.messageArea.appendChild(o); // 將訊息加入容器中
		components.messageArea.scrollTo({
			top: components.messageArea.scrollHeight,
			behavior: "instant",
		});
	} else {
		// 載入過往訊息
		const v = components.messageArea.firstChild;
		components.messageArea.insertBefore(o, v); // 將訊息插入到容器中的最前面
	}

	m.classList.add("xt8fROB2L");

	o.appendChild(r);
	o.appendChild(c);
	c.appendChild(u);
	u.appendChild(l);
	l.appendChild(d);
	u.appendChild(i);
	l.appendChild(m);
	r.appendChild(q);

	// 訊息ID
	o.setAttribute("data-message-id", id);

	// 訊息內容
	i.innerHTML = text;

	// 佔位符
	m.innerText = "0s";
	d.innerText = "Unknown";

	// 較耗時的工作，所以集成在這裡
	getUserProfile(sender).then((userData) => {
		// 距離時間
		m.innerText = timeAgo(a);

		// 用戶頭像
		q.src = userData.avatarUrl || "/assets/avatar.png";

		// 用戶數據
		d.onclick = function () {
			const _0 = quickHpdDialog("Details", true);

			_0.body.innerHTML = `<div class="xGGKUZ7B3"><div class="xF37V7xd0">Name</div><div class="xeUKJgV96">${
				userData.name
			}</div></div><div class="xGGKUZ7B3"><div class="xF37V7xd0">Description</div><div class="xeUKJgV96">${
				userData.signature || "(empty)"
			}</div></div>`;
		};
		// 成功加載
		r.classList.add("xWzeTGC6P");
		// 用戶名稱
		d.innerText = userData.name || "Unknown";
	});
}

// 匹配並替換網址(連結)
function replaceUrlsWithLinks(text) {
	return text.replace(/https?:\/\/[^\s/$.?#].[^\s]*/g, function (e) {
		return '<a class="x0ciSQShX" translate="no" href="'
			.concat(e, '" target="_blank" rel="noreferrer noopener">')
			.concat(decodeURIComponent(e), "</a>");
	});
}

// 匹配並替換分隔線
function replaceSeparatorLines(text) {
	return text.replace(
		/^\s*[-]{10,}\s*\n?/gm,
		'<div class="x3nWNfdWy horizontal"></div>'
	);
}

// 初始化
function initialize() {
	if (initialized) return; // 防止再次初始化

	components.searchInput.removeAttribute("disabled");
	components.searchInput.focusable(true); // 允許使用搜尋框

	components.messageArea.classList.remove("xVjpzmyej"); // 允許使用訊息容器

	if (localStorage.getItem("cvs") !== versionInfo.current) {
		localStorage.setItem("cvs", versionInfo.current);
		const _fg = quickHpdDialog("What's new", true).body;
		_fg.appendChild(MyWrapper("xeUKJgV96", versionInfo.directions));
	}

	// 根據時間不同，發送一條問候訊息
	let e = new Date().getHours();
	displayReceivedMessage(
		`Good {dl} and welcome back. Let's start the chatting now`.replace(
			"{dl}",
			e >= 5 && e < 11
				? "morning" // 早上
				: e >= 11 && e < 14
				? "afternoon" // 下午
				: e >= 14 && e < 18
				? "evening" // 傍晚
				: "night" // 晚上
		),
		"0",
		"oKyF1fvm",
		1704038400000,
		true
	);
	initialized = true; // 已初始化
}

// 規避HTML實體
function escapeHTML(e) {
	return e
		.replace(/&([^;]+)/g, "&amp;$1")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll(" ", "&nbsp;")
		.replaceAll("\n", "<br>");
}

// 格式化數字
function formatNumberWithCommas(e) {
	return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 替換敏感詞彙
function replaceSensitiveWords(text) {
	const escapedWords = sensitiveWords.map((word) =>
		word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
	);
	const regex = new RegExp(escapedWords.join("|"), "gi");
	return text.replace(regex, (match) => "*".repeat(match.length));
}

function replaceEmojiWithImage(str) {
	return str.replace(/(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu, (emoji) => {
		const unicodeCode = Array.from(emoji)
			.map((char) => char.codePointAt(0).toString(16))
			.join("-");
		return `<img src="https://raw.githubusercontent.com/AdvenaHQ/fluent-emoji/main/dist/100x100/${unicodeCode}.png" alt="${emoji}" draggable="false" class="xb1Ycteg3">`;
	});
}

class EventManager {
	constructor() {
		this.eventMap = new Map(); // 儲存事件類型與其回調函數的映射
	}

	/**
	 * 註冊事件回調函數
	 * @param {string} eventType - 事件類型 (如 "mousemove", "click")
	 * @param {Function} callback - 事件觸發時執行的回調函數
	 */
	addEvent(eventType, callback) {
		if (!this.eventMap.has(eventType)) {
			this.eventMap.set(eventType, new Set());
			document.addEventListener(eventType, (event) => {
				this.triggerEvent(eventType, event);
			});
		}
		this.eventMap.get(eventType).add(callback);
	}

	/**
	 * 移除特定事件的回調函數
	 * @param {string} eventType - 事件類型
	 * @param {Function} callback - 要移除的回調函數
	 */
	removeEvent(eventType, callback) {
		if (this.eventMap.has(eventType)) {
			this.eventMap.get(eventType).delete(callback);
			// 如果該事件已無回調函數，從 eventMap 中移除
			if (this.eventMap.get(eventType).size === 0) {
				this.eventMap.delete(eventType);
				document.removeEventListener(eventType, (event) => {
					this.triggerEvent(eventType, event);
				});
			}
		}
	}

	/**
	 * 觸發所有與該事件類型相關的回調函數
	 * @param {string} eventType - 事件類型
	 * @param {Event} event - 事件物件
	 */
	triggerEvent(eventType, event) {
		if (this.eventMap.has(eventType)) {
			this.eventMap.get(eventType).forEach((callback) => {
				callback(event);
			});
		}
	}
}
// 創建聊天室
function createChatRoom(e, t, n, a, z = false) {
	let s = ec("x2fP9fkxS"),
		o = ec("xQ65c0Nkc"),
		i = ec("xybvM5cRF"),
		r = ec("xT3Ta8vKw"),
		j = ec("x6HyfOZS7"),
		p = ec("xQkxrD9ZA");
	s.focusable(true);
	createListener(t);

	const l = async () => {
		const urlParams = new URLSearchParams(window.location.search);
		urlParams.set("r", t);
		window.history.replaceState({}, "", "?" + urlParams.toString());
		(currentRoom !== t || isMobileDevice) &&
			((lastDoc = void 0),
			(currentRoom = t),
			loadChatHistory(currentRoom),
			components.messageArea.clear(),
			components.sendButton.classList.remove("disabled"),
			components.fileInput.removeAttribute("disabled"),
			_(".xpbRox0hO").classList.remove("disabled"),
			_(".xpbRox0hO").focusable(true),
			components.sendButton.focusable(true),
			components.messageInput.setAttribute("contenteditable", "true"),
			isMobileDevice ||
				(_(".x2fP9fkxS.active") &&
					_(".x2fP9fkxS.active").classList.remove("active"),
				_(".x2fP9fkxS.interim:not(.active)") &&
					_(".x2fP9fkxS.interim:not(.active)").remove(),
				s.classList.add("active")),
			isMobileDevice && _(".xehdiGgBv .xMyenRl7K .x8JU9DbQZ").focusable(true),
			_(".main").classList.add("x8VAGH6N2"),
			(_(".xvwhg72ii").innerText = e),
			components.messageInput.setAttribute("contenteditable", "true"),
			components.messageInput.focusable(true));
	};
	oek(s, l);

	z && l();
	allRoom.push({
		id: t,
		name: e,
		dom: s,
	});
	s.appendChild(o), s.appendChild(j), j.appendChild(p);
	p.focusable(true);
	const openInvitePopup = function () {
		const popup = quickHpdDialog("Invitation link", true).body;
		const _pc1 = ec("xKfGtNfnX");
		const btc = ec("xMMSyk68x");
		btc.innerText = "Some people may not be able to join";
		const _fs5 = document.createElement("div");
		_fs5.classList.add("xIcrOS5lb");
		const myLink = `${window.location.origin}/?join=${t}`;
		_fs5.innerText = myLink;
		const _fs6 = document.createElement("div");
		_fs6.focusable(true);
		_fs6.classList.add("xGugcvsJF");
		const defaultIcon = _myicons.get({
			name: "copy",
			size: 20,
			styles: "min-width: 20px",
		});
		_fs6.innerHTML = defaultIcon;
		function copyFunc() {
			navigator.clipboard.writeText(myLink);
			// 打勾部分
			_fs6.innerHTML = _myicons.get({
				name: "check",
				size: 20,
				styles: "min-width: 20px",
			});
			setTimeout(function () {
				_fs6.innerHTML = defaultIcon;
			}, 1500);
		}
		oek(_fs6, copyFunc);
		popup.appendChild(_pc1);
		popup.appendChild(btc);
		_pc1.appendChild(_fs5);
		_pc1.appendChild(_fs6);
	};
	const openSettingsPopup = function () {
		const popup = new quickHpdDialog("Settings", true).body;
		popup.textContent = "Not yet completed construction";
	};

	const Leave = async function () {
		const index = allRoom.findIndex((item) => item.id === t);
		if (index !== -1) {
			try {
				// 確保更新後才移除
				await updateDoc(doc(db, "users", userID), {
					joined: arrayRemove(t),
				});
				allRoom.splice(index, 1);
				s.remove();
				if (currentRoom === t) {
					components.messageArea.clear();
				}
			} catch (error) {
				console.error("Error while deleting item:", error);
			}
		}
	};

	const openPopover = function () {
		const popover = new MyPopover(p);
		const _x1 = ec("xrQdSHI2A");
		const _x2 = ec("xrQdSHI2A");
		const _x3 = ec("xcoXgMpFW");
		const _x4 = ec("xrQdSHI2A");
		// 邀請
		_x1.innerText = "Invite People";
		_x1.style.color = "rgb(112, 184, 255)";
		[_x1, _x2, _x4].forEach((item) => {
			item.focusable(true);
		});
		function _fung(apk) {
			popover.close();
			apk();
		}
		oek(_x1, () => _fung(openInvitePopup));
		oek(_x2, () => _fung(openSettingsPopup));
		oek(_x4, () => _fung(Leave));
		popover.Content.appendChild(_x1);
		_x2.innerText = "Privacy Settings";
		popover.Content.appendChild(_x2);
		popover.Content.appendChild(_x3);
		_x4.innerText = "Leave";
		_x4.style.color = "rgb(239, 68, 68)";
		popover.Content.appendChild(_x4);
	};
	p.onkeydown = (event) => {
		event.stopPropagation();
		if (event.keyCode === 13) {
			openPopover();
		}
	};
	p.innerHTML = _myicons.get({
		name: "more",
		size: 20,
		styles: "min-width: 20px",
	});
	p.onclick = (event) => {
		event.stopPropagation();
		openPopover();
	};
	o.appendChild(i), (i.innerText = e);
	var c;
	if (!n) {
		if (a === 0) {
			c = "No message";
		} else {
			c = `${formatNumberWithCommas(a)} messages`;
		}
	} else {
		c = n;
	}
	(r.innerText = c), o.appendChild(r), components.primaryArea.appendChild(s);
}

const pluralize = (unit, value) => {
	return `${value} ${value > 1 ? formatNumberWithCommas(unit) + "s" : unit}`;
};

// 計算傳入時間戳與現在的差距
function timeAgo(e) {
	let t = Math.max(Math.floor((Date.now() - e) / 1e3), 0);
	return t < 60
		? `${pluralize("second", t)} ago`
		: t < 3600
		? `${pluralize("minute", Math.floor(t / 60))} ago`
		: t < 86400
		? `${pluralize("hour", Math.floor(t / 3600))} ago`
		: t < 2592e3
		? `${pluralize("day", Math.floor(t / 86400))} ago`
		: t < 31536e3
		? `${pluralize("month", Math.floor(t / 2592e3))} ago`
		: `${pluralize("year", Math.floor(t / 31536e3))} ago`;
}

// 格式化文件大小到不同單位
function formatFileSize(e) {
	let t = ["B", "KB", "MB", "GB", "TB", "PB"],
		B = e,
		i = 0;
	for (; B >= 1024 && i < t.length - 1; ) (B /= 1024), i++;
	return `${B.toFixed(2)} ${t[i]}`;
}

// 獲取用戶數據
async function getUserProfile(id) {
	if (userProfileCache[id]) {
		console.log("Get data from memory cache");
		return userProfileCache[id];
	}
	const cachedData = sessionStorage.getItem(`userProfile_${id}`);
	if (cachedData) {
		console.log("Get data from sessionStorage");
		const parsedData = JSON.parse(cachedData);
		userProfileCache[id] = parsedData;
		return parsedData;
	}

	try {
		const docRef = doc(db, "users", id);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			const userData = docSnap.data();
			userProfileCache[id] = userData;
			sessionStorage.setItem(`userProfile_${id}`, JSON.stringify(userData));
			console.log("Get data from Firestore");
			return userData;
		} else {
			console.log("No data found for this user");
			return null;
		}
	} catch (error) {
		console.error("Error while getting user data:", error.toString());
		throw error;
	}
}

// 獲取房間數據
async function getRoomProfile(id) {
	if (roomProfileCache[id]) {
		console.log("Get data from memory cache");
		return roomProfileCache[id];
	}
	const cachedData = sessionStorage.getItem(`roomProfile_${id}`);
	if (cachedData) {
		console.log("Get data from sessionStorage");
		const parsedData = JSON.parse(cachedData);
		roomProfileCache[id] = parsedData;
		return parsedData;
	}

	try {
		const docRef = doc(db, "chats", id);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			const roomData = docSnap.data();
			userProfileCache[id] = roomData;
			sessionStorage.setItem(`roomProfile_${id}`, JSON.stringify(roomData));
			console.log("Get data from Firestore");
			return roomData;
		} else {
			console.log("No data found for this user");
			return null;
		}
	} catch (error) {
		console.error("Error while getting user data:", error.toString());
		throw error;
	}
}

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
				if (messageData.sender === userID) {
					displaySentMessage(messageData.content, doc.id, false);
				} else {
					displayReceivedMessage(
						messageData.content,
						doc.id,
						messageData.sender,
						messageData.timestamp,
						false
					);
				}
			});
			if (snapshot.docs.length !== 0) {
				// Update scrolling
				const newScrollHeight = components.messageArea.scrollHeight;
				components.messageArea.scrollTop = newScrollHeight - oldScrollHeight;
			}
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
	// Every times to load 10 messages (10-1=9)
	s.docs[9] && (lastDoc = s.docs[9]);
	let t = [];
	// firestore only supports this method
	s.forEach((e) => {
		t.push(e);
	});
	t.reverse();
	t.map((e) => {
		var s = e.data();
		s.sender === userID
			? displaySentMessage(s.content, e.id, true)
			: displayReceivedMessage(s.content, e.id, s.sender, s.timestamp, true);
	});
	oldScrollHeight = components.messageArea.scrollHeight;
}

function createListener(e) {
	onSnapshot(
		collection(db, "chats", e, "messages"),
		(s) => {
			s.docChanges().forEach((g) => {
				// 是否為當前聊天室
				if (currentRoom !== e) return;
				// 數據
				let t = g.doc.data();
				switch (g.type) {
					// Created
					case "added":
						if (t.sender !== userID && !s.metadata.fromCache) {
							if (document.visibilityState === "hidden") {
								unreadCount++;
								document.title = `(${unreadCount}) Structure`;
								isAppBadgeSupport && navigator.setAppBadge(unreadCount);
							}
							displayReceivedMessage(
								t.content,
								g.doc.id,
								t.sender,
								t.timestamp,
								true
							);
						}

						break;
					// Deleted
					case "removed":
						try {
							var a = _(`.xikyLwDf4 .xVC8gtuyS[data-message-id="${g.doc.id}"]`);
							a.classList.add("deleted"),
								(a.innerHTML = "This message has been deleted");
						} catch (i) {
							console.log("An unknown error occurred", i);
						}
						break;
					// Edited
					case "modified":
						try {
							var a = _(
								`.xikyLwDf4 .xVC8gtuyS[data-message-id="${g.doc.id}"] .xMyW2iRSH`
							);
							a.innerHTML = t.content;
						} catch (i) {
							console.log("An unknown error occurred", i);
						}
						break;
				}
			});
		},
		(e) => {
			console.error("An unknown error occurred", e);
		}
	);
}

function setupLoginUI() {
	const l = document.createElement("div");
	l.classList.add("xrYn5ZY3v");
	l.innerText = "Account Login";
	const e = document.createElement("div");
	e.classList.add("xRRuA0Z3S");
	const a = document.createElement("div");
	a.id = "x7BYgkdiJ";
	a.focusable(true);
	a.innerHTML = `<svg aria-hidden="true" class="xGBqJjpdr" viewBox="0 0 20 20">
	<path d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z" fill=#4285F4></path>
	<path d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z" fill=#34A853></path>
	<path d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z" fill=#FBBC05></path>
	<path d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z" fill=#EA4335></path></svg>
	<div>Sign in with Google</div>`;
	const i = document.createElement("div");
	i.focusable(true);
	i.id = "xBnuWNG6V";
	i.className = "actionbtn xYIKBnbHS";
	a.className = "actionbtn xYIKBnbHS";
	i.innerHTML = `<svg aria-hidden="true" class="xGBqJjpdr" viewBox="0 0 20 20"><path d="M1 5.006A2 2 0 012.995 3h14.01A2 2 0 0119 5.006v9.988A2 2 0 0117.005 17H2.995A2 2 0 011 14.994V5.006zM3 5l7 4 7-4v2l-7 4-7-4V5z" fill-rule=evenodd fill=#788aa2></path></svg><div>Sign in with email</div>`;
	e.appendChild(a);
	e.appendChild(i);
	const $ = new MyDialog();
	$.Content.classList.add("bt"),
		$.Content.appendChild(l),
		$.Content.appendChild(e),
		(a.onclick = function () {
			signInWithPopup(auth, provider)
				.then((l) => {
					GoogleAuthProvider.credentialFromResult(l).accessToken;
					const e = l.user;
					userID = e.uid;
					getUserProfile(userID)
						.then((userData) => {
							$.close();
							if (!userData) {
								setupProfileSettingUI(e.displayName);
							}
						})
						.catch((error) => {
							console.error(error);
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
		_b0.innerText = "Account Login";
		α.Content.appendChild(_b0);
		const γ = document.createElement("div");
		γ.classList.add("xZdL9CF5M");
		α.Content.appendChild(γ);
		const _z0 = document.createElement("div");
		_z0.classList.add("xGGKUZ7B3");
		γ.appendChild(_z0);
		const _f0 = document.createElement("label");
		_f0.classList.add("xF37V7xd0");
		_f0.innerText = "Email";
		_z0.appendChild(_f0);
		const _b1 = document.createElement("input");
		_b1.classList.add("xYvZ9WF6d");
		_b1.autocomplete = "off";
		_b1.type = "text";
		_b1.spellcheck = "false";
		_z0.appendChild(_b1);
		const _z1 = document.createElement("div");
		_z1.classList.add("xGGKUZ7B3");
		_z1.style.marginTop = "10px";
		_z1.style.marginBottom = "5px";
		γ.appendChild(_z1);
		const _f1 = document.createElement("label");
		_f1.classList.add("xF37V7xd0");
		_f1.innerText = "Password";
		_z1.appendChild(_f1);
		const _b2 = document.createElement("input");
		_b2.classList.add("xYvZ9WF6d");
		_b2.type = "password";
		_b2.autocomplete = "off";
		_z1.appendChild(_b2);
		const κ = document.createElement("div");
		κ.classList.add("xw0IanPrC");
		γ.appendChild(κ);
		const _b3 = document.createElement("div");
		_b3.innerText = "Login";
		_b3.focusable(true);
		_b3.classList.add("x40AApYkW");
		γ.appendChild(_b3);
		_b1.focus();
		var _f14919x = true;
		const SWE = function (np) {
			if (!_f14919x) return;
			_f14919x = false;
			// 隱藏錯誤
			κ.classList.remove("show");
			_b3.innerHTML = `<svg aria-hidden="true" class="x3xXCjYFp" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`;
			// 禁用
			_b1.disabled = true;
			_b2.disabled = true;
			_b3.classList.add("disabled");
			_b3.focusable(false);
			_b3.blur();
			signInWithEmailAndPassword(auth, _b1.value, _b2.value)
				.then((userCredential) => {
					try {
						$.close();
						α.close();
					} catch (error) {}
					const user = userCredential.user;
					console.log("User is logged in: ", user);
					getUserProfile(user.uid)
						.then((userData) => {
							if (!userData) {
								setupProfileSettingUI();
							}
						})
						.catch((error) => {
							console.error(error);
						});
				})
				.catch((error) => {
					setTimeout(function () {
						const errorCode = error.code;
						κ.classList.add("show");
						switch (errorCode) {
							case "auth/invalid-login-credentials":
							case "auth/invalid-email":
								κ.innerText = "Wrong account or password";
								break;
							case "auth/network-request-failed":
								κ.innerText = "Network request failed";
								break;
							default:
								κ.innerText = "An unexpected error occurred.";
								break;
						}
						_b3.innerHTML = "Login";
						_b3.classList.remove("disabled");
						_b3.focusable(true);
						_b1.disabled = false;
						_b2.disabled = false;
						_f14919x = true;
					}, 3000);
				});
		};
		_b2.onkeydown = function (e) {
			if (e.keyCode === 13) {
				SWE();
			}
		};
		oek(_b3, SWE);
	};
}

function setupProfileSettingUI(a0c1 = "Unnamed") {
	const profileSet = new MyDialog({
		closeOnEsc: false,
		closeOnOverlayClick: false,
	});
	profileSet.Content.style.padding = "0";
	profileSet.Content.classList.add("lg");
	const _ea01 = ec("xrYn5ZY3v");
	_ea01.classList.add("lf");
	const _ppg = ec("x6Y89FynP");
	_ppg.innerText = "Edit Profiles";
	_ea01.appendChild(_ppg);
	profileSet.Content.appendChild(_ea01);
	const _ea02 = ec("xWDUelLWA");
	profileSet.Content.appendChild(_ea02);
	const fi = document.createElement("input");
	fi.setAttribute("hidden", "true");
	fi.id = "_Jy2eOVG7";
	fi.type = "file";
	const _ep01 = ec("xGGKUZ7B3");
	const _pp0 = document.createElement("label");
	_pp0.innerText = "Display Name";
	_pp0.classList.add("xF37V7xd0");
	_pp0.htmlFor = "_rJvAjH9O";
	const _pp1 = document.createElement("input");
	_pp1.value = a0c1;
	_pp1.classList.add("xYvZ9WF6d");
	_pp1.id = "_rJvAjH9O";
	_pp1.type = "text";
	_pp1.maxLength = "20";
	_pp1.autocomplete = "off";
	_pp1.spellcheck = "false";
	_ea02.appendChild(_ep01);
	_ep01.appendChild(_pp0);
	_ep01.appendChild(_pp1);
	const _ep02 = ec("xGGKUZ7B3");
	const _pp3 = document.createElement("label");
	_pp3.innerText = "Description";
	_pp3.classList.add("xF37V7xd0");
	_pp3.htmlFor = "_fM6Qcf9q";
	const _pp4 = document.createElement("textarea");
	_pp4.value = "I am a human";
	_pp4.maxLength = "80";
	_pp4.classList.add("xGuwEx6qN");
	_pp4.id = "_fM6Qcf9q";
	_pp4.rows = "3";
	_pp4.maxLength = "50";
	_pp4.autocomplete = "off";
	_pp4.spellcheck = "false";
	_ea02.appendChild(_ep02);
	_ep02.appendChild(_pp3);
	_ep02.appendChild(_pp4);
	const _pp5 = ec("x40AApYkW");
	_pp5.focusable(true);
	_pp5.innerText = "Save";
	_pp5.style.marginTop = "5px";
	_ea02.appendChild(_pp5);
	async function save() {
		_pp5.classList.add("disabled");
		_pp5.innerText = "Saving...";
		_pp5.focusable(false);
		_pp1.disabled = true;
		_pp4.disabled = true;
		fi.disabled = true;
		await setDoc(doc(db, "users", userID), {
			avatarUrl: null,
			name: _pp1.value,
			signature: _pp4.value,
			verified: false,
		});
		profileSet.close();
	}
	oek(_pp5, save);
}

async function preActionofCreate(info, focus) {
	const documents = await getDocs(collection(db, "chats", info.id, "messages"));

	createChatRoom(info.name, info.id, info.description, documents.size, focus);
}

async function loadAllChatRoom() {
	components.primaryArea.clear();

	const e = await getDoc(doc(db, "users", userID)); // Use doc() instead of collection()

	const userData = e.data(); // Extract the document data
	const g = _(".xemr1y6ie .spinner");

	g && g.remove();

	const searchParams = new URLSearchParams(window.location.search).get("r");

	// Use map to return an array of promises
	userData.joined.map(async (e) => {
		try {
			getRoomProfile(e).then(async (n) => {
				preActionofCreate(
					{
						id: e,
						name: n.name,
						description: n.description,
					},
					searchParams === e
				);
			});
		} catch (error) {
			console.error("Error fetching document for ID:", e, error);
		}
	});
}

// Identity status update
onAuthStateChanged(auth, (event) => {
	if (event) {
		userID = event.uid;
		loadAllChatRoom();
		initialize();
	} else {
		userID = "";
		setupLoginUI();
	}
});

// Sign out
components.signOutButton.onclick = () => {
	signOut(auth)
		.then(() => {
			userID = "";
			components.primaryArea.clear();
			components.messageArea.clear();
			localStorage.setItem("cvs", "");
			("User signed out");
		})
		.catch((e) => {
			console.error("Sign out error", e);
		});
};

// Upload files
components.fileInput.onchange = async function (e) {
	const file = e.target.files[0];
	// No files selected yet
	if (!file) return;
	const _a0 = new MyDialog();
	_a0.Content.classList.add("bt");
	const _a1 = document.createElement("div");
	_a1.classList.add("xrYn5ZY3v");
	const _a2 = document.createElement("div");
	_a2.classList.add("xb1IsDa6e");
	_a0.Content.appendChild(_a1);
	_a0.Content.appendChild(_a2);
	if (file.size / 1024 / 1024 > 5) {
		_a1.innerText = "This file is too large";
		_a2.innerText = `This file is ${formatFileSize(
			file.size
		)}, we can't afford it.`;
		_a0.Overlay.onclick = function () {
			_a0.close();
		};
		return;
	}
	// 先預備好
	const storageRef = ref(storage, "uploads/" + file.name);
	_a1.innerText = "Uploading";
	_a2.innerText = "This may take a while, please be patient...";
	const fx0 = document.createElement("div");
	fx0.classList.add("xCECpHDwZ");
	_a0.Content.appendChild(fx0);
	const fx1 = document.createElement("div");
	fx1.classList.add("xty9qDHrl");
	fx0.appendChild(fx1);
	const fx2 = document.createElement("div");
	fx2.classList.add("xIEj1ZAnA");
	fx2.innerHTML =
		'<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'.concat(
			'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path></svg>'
		);
	fx1.appendChild(fx2);
	const fx3 = document.createElement("div");
	fx3.classList.add("xxs4n9nhX");
	fx1.appendChild(fx3);
	fx3.innerHTML = '<div class="xTGGn7ABj">'
		.concat(file.name)
		.concat(`</div><div class="xtyaQiCLO">${formatFileSize(file.size)}</div>`);
	fx1.appendChild(fx3);
	const fx4 = document.createElement("div");
	fx4.classList.add("xsoLox5sj");
	fx1.appendChild(fx4);
	const fx5 = document.createElement("div");
	fx5.classList.add("xk0osKWCK");
	fx4.appendChild(fx5);
	// Start
	const uploadTask = uploadBytesResumable(storageRef, file);
	uploadTask.on(
		"state_changed",
		(snapshot) => {
			// 上傳進度
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			fx5.style.width = `${progress}%`;
		},
		(error) => {
			console.error(error);
		},
		async () => {
			// 允許關閉窗口
			_a0.Overlay.onclick = function () {
				_a0.close();
			};
			// 刪除進度條
			fx0.remove();
			_a1.innerText = "Complete upload";
			_a2.innerText = "This file has been uploaded successfully";
			// 下載連結
			const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
			var messageContent;
			const fileType = String(file.type);

			if (fileType.startsWith("image/")) {
				// 圖片
				messageContent = `<img loading="lazy" tabindex="0" src="${downloadURL}" class="xGsec9lFd">`;
			} else if (fileType.startsWith("video/")) {
				// 視頻
				messageContent = '<video tabindex="0" src="'
					.concat(downloadURL)
					.concat(
						'" controlslist="nodownload" controls class="xGsec9lFd"></video>'
					);
			} else if (fileType.startsWith("audio/")) {
				// 音檔
				messageContent = `<audio tabindex="0" src="${downloadURL}" controlslist="nodownload" controls class="xGsec9lFd"></audio>`;
			} else {
				// 其他類型
				messageContent = `I just uploaded a file "${file.name}", <a href="${downloadURL}" class="x0ciSQShX" target="_blank">Download</a>`;
			}
			// 寫入數據
			const a = doc(collection(db, "chats", currentRoom, "messages"));
			await setDoc(a, {
				sender: userID,
				content: messageContent,
				timestamp: Date.now(),
			});
			// 展示出來
			displaySentMessage(messageContent, a.id, true);
			// 清除
			components.fileInput.value = "";
		}
	);
};
// 用戶切換到此分頁就當作已看完所有訊息
document.addEventListener("visibilitychange", function () {
	if (document.visibilityState === "visible") {
		document.title = "Structure"; // 原標題
		isAppBadgeSupport && navigator.clearAppBadge(); // 清除徽章
		unreadCount = 0; // 清除未讀數
	}
});
// 防止頁面被縮放
document.addEventListener("gesturestart", function (e) {
	e.preventDefault();
});
// 搜尋功能
components.searchInput.oninput = (e) => {
	allRoom.forEach((item) => {
		if (item.name.toLowerCase().includes(e.target.value.toLowerCase().trim())) {
			item.dom.classList.remove("hide");
		} else {
			item.dom.classList.add("hide");
		}
	});
};
// 如果頁面滾動到最上方，就加載更多訊息
components.messageArea.addEventListener("scroll", function () {
	if (userID !== "") {
		let e =
			components.messageArea.pageYOffset || components.messageArea.scrollTop;
		oldScrollHeight = components.messageArea.scrollHeight;
		0 === e && loadMoreChatHistory(currentRoom);
	}
});
// 自動清除
components.messageInput.addEventListener("input", function () {
	const childNodes = components.messageInput.childNodes;
	if (childNodes.length == 1 && childNodes[0].nodeName === "BR") {
		components.messageInput.clear();
	}
});

// 純文字貼上
components.messageInput.onpaste = function (e) {
	e.preventDefault(),
		document.execCommand(
			"insertHTML",
			!0,
			escapeHTML((e.clipboardData || window.Clipboard).getData("text/plain"))
		);
};
// 讀取放置的文字內容並插入
components.messageInput.addEventListener("drop", function (e) {
	e.preventDefault();
	var t = e.dataTransfer.getData("text/plain");
	e.target.focus();
	document.execCommand("insertHTML", !0, escapeHTML(t));
});
// 純文字複製
components.messageInput.oncopy = function (e) {
	e.preventDefault();
	var t = window.getSelection().toString();
	e.clipboardData.setData("text/plain", t);
};
// 編輯器的按鍵綁定
components.messageInput.addEventListener("keydown", function (event) {
	switch (event.keyCode) {
		case 13:
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
// 送出按鈕事件綁定
components.sendButton.onclick = handleSendMessage;
components.sendButton.onkeydown = function (e) {
	if (e.keyCode === 13) handleSendMessage();
};
// 鍵盤事件綁定
document.onkeydown = function (e) {
	switch (e.keyCode) {
		case 191:
			if (
				document.activeElement != components.messageInput &&
				document.activeElement !== components.searchInput
			) {
				e.preventDefault();
				components.messageInput.focus();
			}
			break;
		case 75:
			if (e.ctrlKey && initialized) {
				e.preventDefault();
				components.searchInput.focus();
			}
			break;
		case 123:
			e.preventDefault();
			break;
		case 67:
			if (e.ctrlKey && e.shiftKey) e.preventDefault();
			break;
		case 85:
		case 79:
		case 187:
		case 189:
		case 80:
		case 83:
		case 109:
		case 107:
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
// 禁用原右鍵選單
document.oncontextmenu = function (e) {
	e.preventDefault();
};

// 返回主頁面
components.backButton.onclick = function () {
	currentRoom = ""; // 重置當前房間值
	const url = window.location.href;
	const cleanUrl = url.replace(/\?.*$/, "");
	window.history.replaceState(null, "", cleanUrl); // 清除參數
	components.main.classList.remove("x8VAGH6N2"); // 關閉主區塊
	components.messageArea.clear();
	components.messageInput.clear(); // 清除訊息輸入框
	components.messageInput.setAttribute("contenteditable", "true");
	components.messageInput.focusable(false); // 禁用訊息輸入框
	components.sendButton.focusable(false); // 禁用送出按鈕
};
// 防止多指操作
document.addEventListener(
	"touchstart",
	function (e) {
		e.touches && e.touches.length > 1 && e.preventDefault();
	},
	{ passive: false }
);
// 防止連點縮放
document.addEventListener(
	"touchend",
	function (e) {
		var t = new Date().getTime();
		t - lastTouchEndTime <= 300 && e.preventDefault(), (lastTouchEndTime = t);
	},
	false
);
