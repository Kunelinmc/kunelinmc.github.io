/**release 3.0*/
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
		this._deactivated_elements = document.querySelectorAll(
			"body > *:not(.x54SkYRT0, script, style, [hidden])"
		);
		this._deactivated_elements.forEach((item) => {
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

		this._deactivated_elements.forEach((item) => {
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

const ec = (t) => {
	const Q = document.createElement("div");
	Q.classList.add(t);
	return Q;
};

// A lite method of inheriting `document.querySelector`
const _ = (e) => {
	return document.querySelector(e);
};

// Initialize Firebase app
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

// Firestore Database
const db = getFirestore(app);

// Firebase Storage
const storage = getStorage(app);

// Authentication
const provider = new GoogleAuthProvider();
const auth = getAuth();

// Enable offline presistence
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

// Check whether it is a mobile device
const isMobileDevice =
	/(Android|webOS|Windows Phone|iPhone|iPod|iPad)/i.test(
		window.navigator.platform
	) || window.innerWidth < 550;

// All the rooms that have been joined
const allGroups = [];

// Commonly used components
const components = {
	sidebar: _(".sidebar"),
	main: _(".main"),
	messageInput: _(".xtsARDHTI"),
	searchInput: _(".xujXllYgW"),
	messageContainer: _(".xikyLwDf4"),
	sendButton: _(".xuwRtDpu4"),
	fileInput: _(".xVEJA40Qh"),
	attachButton: _(".xpbRox0hO"),
	signOutButton: _(".xlifWPlRj#x8Kzd47QX"),
	settingsButton: _(".xlifWPlRj#xaNIU3S5N"),
	backButton: _(".xehdiGgBv .xMyenRl7K .x8JU9DbQZ"),
	primaryArea: _(".xemr1y6ie"),
};

// List of sensitive words
const sensitiveWords = [
	"\u5e79",
	"\u64cd",
	"\u767d\u7661",
	"\u667a\u969c",
	"\u6b7b",
	"\u7b28\u86cb",
	"\u50bb\u903c",
];

// Current Version Infomation
const versionInfo = {
	current: "0.75",
	directions: "Adjusted some operating interfaces and fixed some errors",
};

const userProfileCache = {};
const roomDataCache = {};

let initialized = false;
let oldScrollHeight;
let lastTouchEndTime = 0;
let currentRoom = "";
let lastDoc;
let unreadCount = 0;
let userID;

class MyTooltip {
	constructor({ parent, text, placement = "top", interactive = true }) {
		this._parent = parent;
		this._content = text;
		this._placement = placement;
		this._tooltip = null;

		this._tooltip = ec("xuocLuDI6");
		this._tooltip.setAttribute("placement", this._placement);
		this._tooltip.innerText = this._content;

		const tooltipId = `tooltip-${Math.random().toString(36).substr(2, 9)}`;
		this._tooltip.id = tooltipId;
		this._parent.setAttribute("aria-describedby", tooltipId);

		this.hideTooltip();

		document.body.appendChild(this._tooltip);

		if (interactive) {
			this.showTooltip = this.showTooltip.bind(this);
			this.hideTooltip = this.hideTooltip.bind(this);
			this._parent.addEventListener("mouseenter", (event) => {
				if (
					!this._parent.disabled &&
					!this._parent.classList.contains("disabled")
				) {
					this.showTooltip(event);
				}
			});
			this._parent.addEventListener("focus", (event) => {
				if (
					!this._parent.disabled &&
					!this._parent.classList.contains("disabled")
				) {
					this.showTooltip(event);
				}
			});
			this._parent.addEventListener("blur", this.hideTooltip);
			this._parent.addEventListener("mouseleave", this.hideTooltip);
		}
	}

	showTooltip() {
		// Calculate positions
		const parentRect = this._parent.getBoundingClientRect();
		const tooltipRect = this._tooltip.getBoundingClientRect();

		let top, left;

		switch (this._placement) {
			case "top":
				top = window.scrollY + parentRect.top - tooltipRect.height - 8;
				left =
					window.scrollX +
					parentRect.left +
					parentRect.width / 2 -
					tooltipRect.width / 2;
				break;
			case "bottom":
				top = window.scrollY + parentRect.bottom + 8;
				left =
					window.scrollX +
					parentRect.left +
					parentRect.width / 2 -
					tooltipRect.width / 2;
				break;
			case "left":
				top =
					window.scrollY +
					parentRect.top +
					parentRect.height / 2 -
					tooltipRect.height / 2;
				left = window.scrollX + parentRect.left - tooltipRect.width - 8;
				break;
			case "right":
				top =
					window.scrollY +
					parentRect.top +
					parentRect.height / 2 -
					tooltipRect.height / 2;
				left = window.scrollX + parentRect.right + 8;
				break;
			default:
				throw new Error("Invalid placement value");
		}

		// Apply styles
		this._tooltip.style.top = `${top}px`;
		this._tooltip.style.left = `${left}px`;

		this._tooltip.setAttribute("data-state", "delayed-open");
		this._tooltip.setAttribute("aria-expanded", "true");
	}

	hideTooltip() {
		this._tooltip.setAttribute("data-state", "closed");
		this._tooltip.setAttribute("aria-expanded", "false");
	}
}

HTMLElement.prototype.trigger = function (func) {
	const handler = (event) => {
		if (
			!this.classList.contains("disabled") &&
			!this.hasAttribute("disabled") &&
			(event.type === "click" || event.keyCode === 32 || event.keyCode === 13)
		) {
			func();
		}
	};

	this.addEventListener("click", handler);
	this.addEventListener("keydown", handler);
};

if (isMobileDevice) {
	// Let CSS identify the type of device
	document.body.classList.add("mobile");
} else {
	new MyTooltip({
		parent: components.attachButton,
		text: "Attach Files (10M)",
		placement: "top",
	});

	new MyTooltip({
		parent: components.sendButton,
		text: "Send",
		placement: "top",
		interactive: true,
	});
}

// Setting popup
components.settingsButton.onclick = function () {
	const popup = new quickHpdDialog("Settings", true);

	popup.content.classList.add("lg");
	popup.body.classList.add("x4iK5ughg");

	popup.body.innerHTML = `
	<div class="xKHLILifi">
		<label for="NyEmfBQf" class="xzmwkPvN9">
			<div class="xeZC1awtn">Enable Desktop Notifications</div>
		</label>
		<input type="checkbox" class="cls-switch" id="NyEmfBQf">
	</div>
	<div class="xKHLILifi">
		<label for="vKsvPX5N" class="xzmwkPvN9">
			<div class="xeZC1awtn">Enable beta features</div>
		</label>
		<input type="checkbox" class="cls-switch" id="vKsvPX5N">
	</div>
	`;
};

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
		$b.innerHTML = `<svg aria-hidden="true" style="min-width: 24px" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;

		$f.close = $f.close.bind($f);
		$b.trigger($f.close);

		$n.appendChild($b);
	}

	return { root: $f, body: $z, content: $f.Content };
}

function quickAlertDialog() {
	const self = new MyDialog({ closeOnEsc: true, closeOnOverlayClick: true });
	const title = ec("xmHZMf936");
	const desc = ec("xujSSErs5");
	const btnCin = ec("xWh2LBcgj");

	self.Content.style.padding = "24px";

	self.Content.appendChild(title);
	self.Content.appendChild(desc);
	self.Content.appendChild(btnCin);

	return {
		root: self,
		title: title,
		description: desc,
		footer: btnCin,
	};
}

function parseMessageContent(text) {
	if (text.startsWith("<")) {
		const match = text.match(/<\s*(\w+)\s+(\S+)/); // Capture tag type and attribute

		const tagType = match[1];
		const content = match[2];

		switch (tagType) {
			case "image":
				return `<img tabindex="0" src="${content}" class="xGsec9lFd">`;
			case "video":
				return `<video tabindex="0" src="${content}" controlslist="nodownload" controls class="xGsec9lFd"></video>`;

			case "audio":
				return `<audio tabindex="0" src="${content}" controlslist="nodownload" controls class="xGsec9lFd"></audio>`;
			default:
				return `The file cannot be previewed <a class="x0ciSQShX no-wrap" href="${content}" target="_blank" rel="noreferrer noopener">Download</a>`;
		}
	} else {
		return replaceEmojiWithImage(
			replaceSensitiveWords(replaceSeparatorLines(replaceUrlsWithLinks(text)))
		).replaceAll("\n", "<br>");
	}
}

async function handleSendMessage() {
	let messageText = components.messageInput.innerText.trim();

	if (!messageText || !currentRoom) return;

	messageText = messageText
		.replace(/&([^;]+)/g, "&amp;$1")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replace(/(\r?\n){3,}/g, "\n\n");

	components.messageInput.clear();

	// Create a new firestore document for message data
	const collectionRef = doc(collection(db, "chats", currentRoom, "messages"));

	// Set up data
	await setDoc(collectionRef, {
		sender: userID,
		content: messageText,
		timestamp: Date.now(),
	});
	displaySentMessage(messageText, collectionRef.id);
}

// Display the message that have been sent (yourself)
function displaySentMessage(text, id, n = true) {
	const o = ec("xVC8gtuyS"),
		i = ec("xMyW2iRSH"),
		c = ec("xKljxgVJA"),
		l = ec("xu4Celbbq"),
		d = ec("xc4iCj2Gy"),
		u = ec("xRHoYYwoZ");

	o.setAttribute("data-message-id", id);
	o.classList.add("xiOw4dg0O");

	o.appendChild(c);
	c.appendChild(u);
	u.appendChild(l);
	l.appendChild(d);
	u.appendChild(i);

	d.innerText = "You";
	i.innerHTML = parseMessageContent(text);

	if (n) {
		components.messageContainer.appendChild(o);
		components.messageContainer.scrollTo({
			top: components.messageContainer.scrollHeight,
			behavior: "instant",
		});
	} else {
		const v = components.messageContainer.firstChild;
		components.messageContainer.insertBefore(o, v);
	}
}

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

	m.classList.add("xt8fROB2L");

	o.appendChild(r);
	o.appendChild(c);
	c.appendChild(u);
	u.appendChild(l);
	l.appendChild(d);
	u.appendChild(i);
	l.appendChild(m);
	r.appendChild(q);

	o.setAttribute("data-message-id", id);

	i.innerHTML = parseMessageContent(text);

	m.innerText = "0s";
	d.innerText = "Unknown";

	if (s) {
		components.messageContainer.appendChild(o);
		components.messageContainer.scrollTo({
			top: components.messageContainer.scrollHeight,
			behavior: "instant",
		});
	} else {
		const v = components.messageContainer.firstChild;
		components.messageContainer.insertBefore(o, v);
	}

	getUserProfile(sender).then((userData) => {
		m.innerText = timeAgo(a);

		q.src = userData.avatarUrl || "/assets/avatar.png";

		d.onclick = function () {
			const popup = quickHpdDialog("Details", true);

			popup.body.innerHTML = `<div class="xGGKUZ7B3"><div class="xF37V7xd0">Name</div><div class="xeUKJgV96">${
				userData.name
			}</div></div><div class="xGGKUZ7B3"><div class="xF37V7xd0">Description</div><div class="xeUKJgV96">${
				userData.signature || "(empty)"
			}</div></div>`;
		};
		r.classList.add("xWzeTGC6P");
		d.innerText = userData.name || "Unknown";
	});
}

function replaceUrlsWithLinks(text) {
	return text.replace(/https?:\/\/[^\s/$.?#].[^\s]*/g, function (e) {
		return '<a class="x0ciSQShX" translate="no" href="'
			.concat(e, '" target="_blank" rel="noreferrer noopener">')
			.concat(decodeURIComponent(e), "</a>");
	});
}

function replaceSeparatorLines(text) {
	return text.replace(
		/^\s*[-]{10,}\s*\n?/gm,
		'<div class="x3nWNfdWy horizontal"></div>'
	);
}

function initialize() {
	if (initialized) return;

	components.searchInput.removeAttribute("disabled");
	components.searchInput.focusable(true);

	if (localStorage.getItem("cvs") !== versionInfo.current) {
		const popup = quickHpdDialog("What's new", true).body;
		popup.innerHTML = `<div class="xeUKJgV96">${versionInfo.directions}</div>`;
		localStorage.setItem("cvs", versionInfo.current);
	}
	initialized = true;
}

function escapeHTML(e) {
	return e
		.replace(/&([^;]+)/g, "&amp;$1")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;")
		.replaceAll(" ", "&nbsp;")
		.replaceAll("\n", "<br>");
}

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

function replaceEmojiWithImage(str) {
	return str.replace(/(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu, (emoji) => {
		const unicodeCode = Array.from(emoji)
			.map((char) => char.codePointAt(0).toString(16))
			.join("-");
		return `<img src="https://raw.githubusercontent.com/bignutty/fluent-emoji/refs/heads/main/static/${unicodeCode}.png" alt="${emoji}" draggable="false" class="xb1Ycteg3">`;
	});
}

// Solutions of managing multiple global listeners
function createChatRoom(e, t, n, a, z = false) {
	let s = ec("x2fP9fkxS"),
		o = ec("xQ65c0Nkc"),
		i = ec("xybvM5cRF"),
		r = ec("xT3Ta8vKw"),
		j = ec("x6HyfOZS7"),
		p = ec("xQkxrD9ZA");
	s.focusable(true);
	createListener(t);

	async function showContext() {
		// Update URL parameters
		const urlParams = new URLSearchParams(window.location.search);
		urlParams.set("r", t);
		window.history.replaceState({}, "", "?" + urlParams.toString());

		if (currentRoom !== t || isMobileDevice) {
			currentRoom = t;

			// Allow messages container
			components.messageContainer.classList.remove("xVjpzmyej");
			components.messageContainer.clear();

			components.sendButton.classList.remove("disabled");
			components.fileInput.removeAttribute("disabled");
			components.attachButton.classList.remove("disabled");
			components.attachButton.focusable(true);
			components.sendButton.focusable(true);
			components.messageInput.setAttribute("contenteditable", "true");

			if (!isMobileDevice) {
				if (_(".x2fP9fkxS.active")) {
					_(".x2fP9fkxS.active").classList.remove("active");
				}
				s.classList.add("active");
			} else {
				_(".xehdiGgBv .xMyenRl7K .x8JU9DbQZ").focusable(true);
				_(".main").classList.add("x8VAGH6N2");
				_(".xvwhg72ii").innerText = e;
			}

			components.messageInput.setAttribute("contenteditable", "true");
			components.messageInput.focusable(true);

			const messagesRef = await getDocs(
				query(
					collection(db, "chats", t, "messages"),
					orderBy("timestamp", "desc"),
					limit(10)
				)
			);

			// Every times to load 10 messages
			lastDoc = messagesRef.docs[9];

			const tempArray = [];

			// firestore only supports this method
			messagesRef.forEach((item) => {
				tempArray.push(item);
			});
			tempArray.reverse();
			tempArray.map((item) => {
				var data = item.data();
				s.sender === userID
					? displaySentMessage(data.content, item.id, true)
					: displayReceivedMessage(
							data.content,
							item.id,
							data.sender,
							data.timestamp,
							true
					  );
			});
			oldScrollHeight = components.messageContainer.scrollHeight;
		}
	}
	s.trigger(showContext);
	z && showContext();
	allGroups.push({
		id: t,
		name: e,
		dom: s,
	});
	s.appendChild(o);
	s.appendChild(j);
	j.appendChild(p);
	p.focusable(true);

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
		_x4.trigger(function () {
			popover.close();

			const dialog = new quickAlertDialog();

			dialog.title.innerText = "Leave group";

			dialog.description.innerText =
				"Are you sure you want to leave this group?";

			const cencelButton = ec("xgw2tzk6r");

			cencelButton.innerText = "Cencel";
			cencelButton.focusable(true);

			const comfirmButton = ec("xgw2tzk6r");

			comfirmButton.innerText = "Leave";
			comfirmButton.focusable(true);
			comfirmButton.classList.add("xTJA9U7y9");
			comfirmButton.style.fontWeight = "500";

			dialog.root.close = dialog.root.close.bind(dialog.root);

			cencelButton.trigger(dialog.root.close);

			comfirmButton.trigger(async function () {
				const index = allGroups.findIndex((item) => item.id === t);
				if (index !== -1) {
					try {
						// Remove after confirming the update
						await updateDoc(doc(db, "users", userID), {
							joined: arrayRemove(t),
						});
						allGroups.splice(index, 1);
						s.remove();
						dialog.root.close();
						if (currentRoom === t) {
							components.messageContainer.clear();
						}
					} catch (error) {
						console.error("Error while deleting item:", error);
					}
				}
			});

			dialog.footer.appendChild(cencelButton);
			dialog.footer.appendChild(comfirmButton);
		});
		popover.Content.appendChild(_x1);
		_x2.innerHTML = ` Start video call`;
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
	p.innerHTML = `<svg aria-hidden="true" style="min-width: 24px" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>`;
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

function formatFileSize(e) {
	let t = ["B", "KB", "MB", "GB", "TB", "PB"],
		B = e,
		i = 0;
	for (; B >= 1024 && i < t.length - 1; ) (B /= 1024), i++;
	return `${B.toFixed(2)} ${t[i]}`;
}

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

async function getRoomData(id) {
	if (roomDataCache[id]) {
		console.log("Get data from memory cache");
		return roomDataCache[id];
	}
	const cachedData = sessionStorage.getItem(`roomProfile_${id}`);
	if (cachedData) {
		console.log("Get data from sessionStorage");
		const parsedData = JSON.parse(cachedData);
		roomDataCache[id] = parsedData;
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

async function loadMessages(e) {
	if (lastDoc !== undefined) {
		const snapshot = await getDocs(
			query(
				collection(db, "chats", e, "messages"),
				orderBy("timestamp", "desc"),
				startAfter(lastDoc),
				limit(10)
			)
		);
		// Update lastDoc if there are more messages to fetch
		if (snapshot.docs.length === 10) {
			console.log("訊息尚未全部加載完畢");
			lastDoc = snapshot.docs[9];
		} else {
			console.log("全部訊息皆已加載完畢");
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
		// Update scrolling
		const newScrollHeight = components.messageContainer.scrollHeight;
		components.messageContainer.scrollTop = newScrollHeight - oldScrollHeight;
	}
}

const messageTemplete =
	'.xikyLwDf4 .xVC8gtuyS[data-message-id="{sid}"] .xMyW2iRSH';

function createListener(e) {
	onSnapshot(
		collection(db, "chats", e, "messages"),
		(s) => {
			s.docChanges().forEach((g) => {
				// 是否為當前聊天室
				if (currentRoom !== e) return;
				// 數據
				const t = g.doc.data();
				switch (g.type) {
					// Created
					case "added":
						if (t.sender !== userID && !s.metadata.fromCache) {
							if (document.visibilityState === "hidden") {
								unreadCount++;
								document.title = `(${unreadCount}) Structure`;
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
							const target = _(messageTemplete.replace("{sid}", g.doc.id));
							target.classList.add("deleted");
							target.innerHTML = "This message has been deleted";
						} catch (i) {
							console.log("An unknown error occurred", i);
						}
						break;
					// Edited
					case "modified":
						try {
							const target = _(messageTemplete.replace("{sid}", g.doc.id));
							target.innerHTML = parseMessageContent(t.content);
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
	a.innerHTML = `<svg aria-hidden="true" class="xGBqJjpdr" viewBox="0 0 20 20"><path d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z" fill=#4285F4></path><path d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z" fill=#34A853></path><path d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z" fill=#FBBC05></path><path d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z" fill=#EA4335></path></svg><div>Sign in with Google</div>`;
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
		a.trigger(function () {
			a.classList.add("disabled");
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
					if (l.code === "auth/popup-closed-by-user") {
						a.classList.remove("disabled");
					}
				});
		});
	i.trigger(function () {
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
		_b3.onclick = SWE;
	});
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
	_pp4.maxLength = "80";
	_pp4.value = "I am a human";
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
	_pp5.trigger(save);
}

async function preActionofCreate(info, focus) {
	const documents = await getDocs(collection(db, "chats", info.id, "messages"));

	console.log(info.plugins);

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
			getRoomData(e).then(async (n) => {
				preActionofCreate(
					{
						id: e,
						name: n.name,
						plugins: n.plugins,
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
			components.messageContainer.clear();
			localStorage.setItem("cvs", "");
		})
		.catch((e) => {
			console.error("Sign out error", e);
		});
};

// Simulate triggered upload
components.attachButton.trigger(function () {
	components.fileInput.click();
});

// Upload files
components.fileInput.onchange = async function (e) {
	const file = e.target.files[0];

	if (!file) return; // No files selected yet

	const popup = new MyDialog({
		closeOnEsc: true,
		closeOnOverlayClick: true,
	});

	popup.close = popup.close.bind(popup);

	popup.Content.classList.add("bt");
	const titleText = ec("xrYn5ZY3v");
	const descText = ec("xb1IsDa6e");
	popup.Content.appendChild(titleText);
	popup.Content.appendChild(descText);

	const closebtn = ec("xIx9gX0tx");

	closebtn.innerHTML = `<svg aria-hidden="true" style="min-width: 24px" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>`;

	popup.Content.appendChild(closebtn);

	if (file.size / 1024 / 1024 > 10) {
		titleText.innerText = "This file is too large";
		descText.innerText = `This file is ${formatFileSize(
			file.size
		)}, we can't afford it.`;
		closebtn.onclick = popup.close;
		return;
	}
	const storageRef = ref(storage, "uploads/" + file.name);

	titleText.innerText = "Uploading";
	descText.innerText = "This may take a while, please be patient...";

	const fx0 = document.createElement("div");
	fx0.classList.add("xCECpHDwZ");
	popup.Content.appendChild(fx0);
	const fx1 = document.createElement("div");
	fx1.classList.add("xty9qDHrl");
	fx0.appendChild(fx1);
	const fx2 = document.createElement("div");
	fx2.classList.add("xIEj1ZAnA");
	fx2.innerHTML =
		'<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path></svg>';
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

	const uploadTask = uploadBytesResumable(storageRef, file);

	// Cancel upload when close button is clicked
	closebtn.onclick = function () {
		uploadTask.cancel(); // Cancel the upload
		popup.close(); // Close the popup
	};

	// Track upload progress
	uploadTask.on(
		"state_changed",
		(snapshot) => {
			// Display the upload progress
			const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			fx5.style.width = `${progress}%`;
		},
		(error) => {
			console.error(error);
		},
		async () => {
			// Remove progressbar
			fx0.remove();
			titleText.innerText = "Complete upload";
			descText.innerText = "This file has been uploaded successfully";

			// Get download link
			const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

			const fileType = String(file.type);

			let messageContent;

			if (fileType.startsWith("image/")) {
				// Image
				messageContent = `< image ${downloadURL}`;
			} else if (fileType.startsWith("video/")) {
				// Video
				messageContent = `< video ${downloadURL}`;
			} else if (fileType.startsWith("audio/")) {
				// Audio
				messageContent = `< audio ${downloadURL}`;
			} else {
				// Other type
				messageContent = `< other ${downloadURL}`;
			}

			// New message with file item
			const collectionRef = doc(
				collection(db, "chats", currentRoom, "messages")
			);
			await setDoc(collectionRef, {
				sender: userID,
				content: messageContent,
				timestamp: Date.now(),
			});

			// Display it
			displaySentMessage(messageContent, collectionRef.id, true);

			components.fileInput.value = "";
		}
	);
};

// Reset title when page becomes visible
document.addEventListener("visibilitychange", function () {
	if (document.visibilityState === "visible") {
		document.title = "Structure";
		unreadCount = 0;
	}
});

// Implement simple search function
components.searchInput.oninput = function () {
	const filter = components.searchInput.value.toLowerCase().trim();

	allGroups.forEach((item) => {
		if (item.name.toLowerCase().includes(filter)) {
			item.dom.classList.remove("hide");
		} else {
			item.dom.classList.add("hide");
		}
	});
};

// Load more messages when the page scrolls to a certain extent
components.messageContainer.addEventListener("scroll", function () {
	if (userID !== "") {
		const scrollHeight =
			components.messageContainer.pageYOffset ||
			components.messageContainer.scrollTop;
		oldScrollHeight = components.messageContainer.scrollHeight;

		if (scrollHeight == 0) {
			loadMessages(currentRoom);
		}
	}
});

// Automatic waste removal
components.messageInput.oninput = function () {
	const childNodes = components.messageInput.childNodes;
	if (childNodes.length == 1 && childNodes[0].nodeName === "BR") {
		components.messageInput.clear();
	}
};

// Only plain text can be pasted
components.messageInput.onpaste = function (e) {
	e.preventDefault();
	document.execCommand(
		"insertHTML",
		!0,
		escapeHTML((e.clipboardData || window.Clipboard).getData("text/plain"))
	);
};

// Allow users to drag text into the editor
components.messageInput.addEventListener("drop", function (event) {
	event.preventDefault();
	const data = event.dataTransfer.getData("text/plain");
	event.target.focus();
	document.execCommand("insertHTML", !0, escapeHTML(data));
});

// Only plain text can be copied
components.messageInput.oncopy = function (e) {
	e.preventDefault();
	var t = window.getSelection().toString();
	e.clipboardData.setData("text/plain", t);
};

// Send messages, wrap lines, and prevent text styles
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
		case 73:
			if (event.ctrlKey) event.preventDefault();
	}
});

components.sendButton.trigger(handleSendMessage);

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

// Prevent page from zooming
document.querySelectorAll("body > div").forEach(function (e) {
	e.onwheel = function (e) {
		e.ctrlKey && e.preventDefault();
	};
});

// Disable default context menu
document.oncontextmenu = function (e) {
	e.preventDefault();
};

// Reset current room set
components.backButton.onclick = function () {
	currentRoom = "";
	const url = window.location.href;
	const cleanUrl = url.replace(/\?.*$/, "");
	window.history.replaceState(null, "", cleanUrl);
	components.main.classList.remove("x8VAGH6N2");
	components.messageContainer.clear();
	components.messageInput.clear();
	components.messageInput.setAttribute("contenteditable", "true");
	components.messageInput.focusable(false);
	components.sendButton.focusable(false);
};

// Prevent zooming via gestures
document.addEventListener(
	"touchstart",
	function (e) {
		e.touches && e.touches.length > 1 && e.preventDefault();
	},
	{ passive: false }
);
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
