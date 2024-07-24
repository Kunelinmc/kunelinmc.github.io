console.log(
	"\uD83D\uDC80 Please do not perform any operations in the console, attackers may steal your data."
);
var _ = function (e) {
		return document.querySelector(e);
	},
	isMobileDevice = /(Android|webOS|Windows Phone|Mac|iPhone|iPod|iPad)/i.test(
		window.navigator.platform
	);
var hasInterim = true;
var history = [];
var currentRoom = "?";
isMobileDevice && document.body.classList.add("mobile");
var components = {
		activitybar: _(".activitybar"),
		sidebar: _(".sidebar"),
		main: _(".main"),
		modalInput: _(".xPgDa0opT"),
		modalButton: _(".x7dBirbNO"),
		messageInput: _(".xtsARDHTI"),
		searchInput: _(".xujXllYgW"),
		messageArea: _(".xikyLwDf4"),
		sendButton: _(".xuwRtDpu4"),
	},
	_N0 = !1,
	_GF = !1,
	totalNoSee = 0;
function _A16(e) {
	(components.messageInput.innerHTML = ""), _A17(e);
}
function _A9(e) {
	for (
		var t = "",
			n = 0,
			o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
			s = o.length;
		n < e;

	)
		(t += o.charAt(Math.floor(Math.random() * s))), (n += 1);
	return t;
}
function _A18(e) {
	return e.replace(/https?:\/\/[^\s/$.?#].[^\s]*/g, function (e) {
		return '<a class="x0ciSQShX" href="'
			.concat(e, '" target="_blank">')
			.concat(decodeURIComponent(e), "</a>");
	});
}
function _A2() {
	if (!1 === _GF) {
		components.searchInput.removeAttribute("disabled"),
			components.messageInput.setAttribute("contenteditable", "true"),
			components.messageArea.classList.remove("xVjpzmyej");
		_(".xnKzgeITl") && _(".xnKzgeITl").remove();
		var e = new Date().getHours();
		var _etw352 = "{dl}好，歡迎來到 Structure!".replace(
			"{dl}",
			e >= 5 && e < 11
				? "早上"
				: e >= 11 && e < 14
				? "中午"
				: e >= 14 && e < 18
				? "下午"
				: e >= 18 && e < 24
				? "晚上"
				: "晚上"
		);
		_A25(_etw352, "0", "陌生人", !0), (_GF = !0), (_N0 = !0);
	}
}
function _A17(e) {
	var t = e
		.replace(/&([^;]+)/g, "&amp;$1")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;");
	var n = document.createElement("div"),
		o = document.createElement("div"),
		s = document.createElement("div"),
		i = document.createElement("div");
	(suid = btoa("".concat((ts = new Date().getTime())).concat((uid = _A9(8))))),
		o.classList.add("xMyW2iRSH"),
		n.classList.add("xVC8gtuyS"),
		s.classList.add("xKljxgVJA"),
		i.classList.add("xu4Celbbq"),
		n.setAttribute("data-xg4wIdv2", suid),
		n.setAttribute("data-TSPuidV2", suid),
		n.appendChild(s),
		s.appendChild(i),
		s.appendChild(o);
	var c = _A18(t)
		.trim()
		.replace(/(\r?\n){3,}/g, "\n\n")
		.replace(/\n+$/, "")
		.replaceAll("\n", "<br>");
	(o.innerHTML = c),
		(o.oncontextmenu = function (_r1) {
			S119(_r1, n, t);
		});
	n.classList.add("xiOw4dg0O");
	i.innerHTML = '<div class="xc4iCj2Gy">你</div>';
	components.messageArea.appendChild(n);
	components.messageArea.scrollTo({
		top: components.messageArea.scrollHeight,
		behavior: "smooth",
	});
}
function _A25(e, t, n, o, zf) {
	var s = document.createElement("div"),
		i = document.createElement("div"),
		c = document.createElement("div"),
		r = document.createElement("div"),
		l = document.createElement("div"),
		d = document.createElement("div"),
		u = document.createElement("div"),
		p = document.createElement("div");
	i.classList.add("xMyW2iRSH"),
		s.classList.add("xVC8gtuyS"),
		c.classList.add("xSYcbYqTG"),
		r.classList.add("xKljxgVJA"),
		l.classList.add("xu4Celbbq"),
		d.classList.add("xc4iCj2Gy"),
		u.classList.add("xuvoVURIs"),
		p.classList.add("xt8fROB2L"),
		(u.innerText = " • "),
		(p.innerText = "現在"),
		console.log(t);
	s.setAttribute("data-xg4wIdv2", t),
		s.appendChild(c),
		s.appendChild(r),
		r.appendChild(l),
		l.appendChild(d),
		l.appendChild(u),
		l.appendChild(p),
		r.appendChild(i);
	if (zf == "warning") {
		s.classList.add("warning");
	} else if (zf == "info") {
		s.classList.add("info");
	}
	d.innerHTML = n;
	if (o) {
		i.innerHTML = marked.parse(e);
		i.querySelectorAll("pre code").forEach((block) => {
			hljs.highlightElement(block);
		});
	} else {
		i.innerHTML = e;
	}
	i.oncontextmenu = function (_r1) {
		S119(_r1, s, e);
	};

	components.messageArea.appendChild(s),
		components.messageArea.scrollTo({
			top: components.messageArea.scrollHeight,
			behavior: "smooth",
		});
}
function S119(e, n, text) {
	var o = _(".xaAFBykLS");
	o.classList.value.includes("show")
		? o.classList.remove("show")
		: ((o.querySelector(".menuitem[data-event='_delete']").onclick =
				function () {
					n.remove(), o.classList.remove("show");
				}),
		  (o.querySelector(".menuitem[data-event='_copy']").onclick =
				async function () {
					await navigator.clipboard.writeText(text.replaceAll("	", "    ")),
						o.classList.remove("show");
				}),
		  (o.querySelector(".menuitem[data-event='_translate']").onclick =
				async function () {
					await fetch(
						`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${
							navigator.language
						}&dt=t&q=${encodeURIComponent(text)}`
					)
						.then((response) => {
							return response.json();
						})
						.then((json) => {
							console.log(json[0].map((item) => item[0]).join(""));
						});
					o.classList.remove("show");
				}),
		  (o.querySelector(".menuitem[data-event='_edit']").onclick = function () {
				console.log("EDITED"), o.classList.remove("show");
		  }),
		  (o.querySelector(".menuitem[data-event='_share']").onclick = function () {
				window.open(
					`https://www.threads.net/intent/post?text=${encodeURIComponent(text)}`
				),
					o.classList.remove("show");
		  }),
		  (o.style.left = e.clientX + "px"),
		  (o.style.top = e.clientY + "px"),
		  o.classList.add("show"));
}
function addRippleAnimation(e, t) {
	e.addEventListener("click", function (e) {
		var n = e.currentTarget,
			o = document.createElement("span"),
			s = Math.max(n.clientWidth, n.clientHeight);
		(o.style.background = t),
			(o.style.width = o.style.height = s + "px"),
			(o.style.left = e.offsetX - s / 2 + "px"),
			(o.style.top = e.offsetY - s / 2 + "px"),
			o.classList.add("ripple_effect");
		var i = n.getElementsByClassName("ripple_effect")[0];
		i && i.remove(), n.appendChild(o);
	});
}
(window.totalNoSee = totalNoSee),
	document.addEventListener("visibilitychange", function () {
		"visible" == document.visibilityState &&
			((document.title = "Structure"), (totalNoSee = 0));
	}),
	components.messageInput.addEventListener("input", function (e) {
		"" === e.target.innerText.trim() && (e.target.innerHTML = "");
	}),
	components.messageInput.addEventListener("keydown", function (e) {
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
	}),
	(components.sendButton.onclick = function () {
		"" !== components.messageInput.innerHTML.trim() &&
			(_N0
				? _A16(components.messageInput.innerText)
				: console.log("Unable to send the message"));
	}),
	(components.messageInput.onpaste = function (e) {
		e.preventDefault(),
			document.execCommand(
				"insertHTML",
				!0,
				(e.clipboardData || window.clipboardData)
					.getData("text/plain")
					.replace(/&([^;]+)/g, "&amp;$1")
					.replaceAll("<", "&lt;")
					.replaceAll(">", "&gt;")
					.replaceAll("	", "    ")
					.replaceAll(" ", "&nbsp;")
					.replaceAll("\n", "<br>")
			);
	}),
	(document.onkeydown = function (e) {
		//37' 39
		switch (e.keyCode) {
			case 191:
				"true" === components.messageInput.getAttribute("contenteditable") &&
					document.activeElement !== _(".xPgDa0opT") &&
					document.activeElement !== components.messageInput &&
					document.activeElement !== components.searchInput &&
					(e.preventDefault(), _(".xtsARDHTI").focus());
				break;
			case 75:
				e.ctrlKey &&
					_N0 &&
					(e.preventDefault(), components.searchInput.focus());
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
				break;
			case 37:
			case 39:
				if (e.altKey) e.preventDefault();
				break;
		}
	}),
	document.querySelectorAll("body > div").forEach(function (e) {
		e.onwheel = function (e) {
			e.ctrlKey && e.preventDefault();
		};
	}),
	(document.oncontextmenu = function (e) {
		e.preventDefault();
	}),
	(window.onload = function () {
		_A2();
	}),
	(window._A25 = _A25),
	document.addEventListener("click", function (e) {
		var t = _(".xaAFBykLS");
		t.contains(e.target) || t.classList.remove("show");
	}),
	components.messageArea.addEventListener("scroll", function () {
		_(".xaAFBykLS").classList.remove("show");
	}),
	_(".xehdiGgBv .xMyenRl7K .x8JU9DbQZ").onclick = function() {
		_(".main").classList.remove("x8VAGH6N2")
	},
	addRippleAnimation(_(".x8u3Iqtu9"), "#2d2d3866"),
	addRippleAnimation(_(".xuwRtDpu4"), "#a8a8af71"),
	addRippleAnimation(_(".xehdiGgBv .xMyenRl7K .x8JU9DbQZ"), "#a9a9a947"),
	document.addEventListener(
		"touchstart",
		function (e) {
			e.touches && e.touches.length > 1 && e.preventDefault();
		},
		{ passive: !1 }
	);
var lastTouchEndTime = 0;
document.addEventListener(
	"touchend",
	function (e) {
		var t = new Date().getTime();
		t - lastTouchEndTime <= 300 && e.preventDefault(), (lastTouchEndTime = t);
	},
	!1
),
	document.addEventListener("gesturestart", function (e) {
		e.preventDefault();
	});
var _f991 = true;
function formatFileSize(_) {
	return _ < 1024
		? _ + " B"
		: _ < 1048576
		? (_ / 1024).toFixed(2) + " KB"
		: _ < 1073741824
		? (_ / 1048576).toFixed(2) + " MB"
		: (_ / 1073741824).toFixed(2) + " GB";
}

function _Z641(s) {
	var p = components.modalInput.value.trim();
	if (p === "") {
		_(".xHiNaAdY7").innerText = "你需要寫點東西！";
		_(".xHiNaAdY7").classList.add("show");
	} else {
		_(".xHiNaAdY7").classList.remove("show");
		_(".xLwq2C6gp").classList.remove("in");
		_A251(s, p);
		components.modalInput.onkeydown = function (e) {
			13 === e.keyCode && e.preventDefault();
		};
		components.modalButton.onclick = function (e) {
			e.preventDefault();
		};
	}
}

function _A5815(list) {
	return list[Math.floor(Math.random() * list.length)];
}

function _A199() {
	_(".xLwq2C6gp").classList.add("in");
}

document.querySelectorAll(".x2fP9fkxS").forEach((item) => {
	item.onclick = function (e) {
		_(".x2fP9fkxS.active").classList.remove("active");
		_(".main").classList.add("x8VAGH6N2")
		_(".xvwhg72ii").innerText = item.getAttribute("data-roomName")
		item.classList.add("active");
		if (_(".x2fP9fkxS.interim:not(.active)")) {
			_(".x2fP9fkxS.interim:not(.active)").remove();
		}
	};
});
components.messageInput.addEventListener("drop", (event) => {
	event.preventDefault();
	const textData = event.dataTransfer.getData("text/plain");
	try {
		event.target.focus();
		document.execCommand(
			"insertHTML",
			!0,
			textData
				.replace(/&([^;]+)/g, "&amp;$1")
				.replaceAll("<", "&lt;")
				.replaceAll(">", "&gt;")
				.replaceAll("	", "    ")
				.replaceAll(" ", "&nbsp;")
				.replaceAll("\n", "<br>")
		);
	} catch (err) {
		console.log(err);
	}
});

function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
