console.log(
	"\uD83D\uDC80 Please do not perform any operations in the console, attackers may steal your data."
);
const _ = (e) => document.querySelector(e),
	isMobileDevice = /(Android|webOS|Windows Phone|Mac|iPhone|iPod|iPad)/i.test(
		window.navigator.platform
	);
isMobileDevice && document.body.classList.add("mobile");
const components = {
	activitybar: _(".activitybar"),
	sidebar: _(".sidebar"),
	main: _(".main"),
	modalInput: _(".xPgDa0opT"),
	modalButton: _(".x7dBirbNO"),
	messageInput: _(".xtsARDHTI"),
	searchInput: _(".xujXllYgW"),
	messageArea: _(".xikyLwDf4"),
	sendButton: _(".xuwRtDpu4"),
};
let _N0 = !1,
	_GF = !1;
function _A16(e) {
	(components.messageInput.innerHTML = ""), _A17(e);
}
function _A9(e) {
	let t = "",
		n = 0,
		o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
		s = o.length;
	for (; n < e; ) (t += o.charAt(Math.floor(Math.random() * s))), (n += 1);
	return t;
}
function _A18(e) {
	return e.replace(/https?:\/\/[^\s/$.?#].[^\s]*/g, function (e) {
		return `<a class="x0ciSQShX" href="${e}" target="_blank">${decodeURIComponent(e)}</span>`;
	});
}
function _A2() {
	if (!1 === _GF) {
		_(".xLwq2C6gp").classList.remove("in"),
			setTimeout(() => _(".xLwq2C6gp").remove(), 500),
			components.searchInput.removeAttribute("disabled"),
			components.messageInput.setAttribute("contenteditable", "true"),
			components.messageArea.classList.remove("xVjpzmyej"),
			_(".xnKzgeITl") && _(".xnKzgeITl").remove();
		let e = new Date().getHours();
		_A25(
			'Good <span style="color:#6cb6ff; user-select: none">{dl}</span> and welcome to Structure'.replaceAll(
				"{dl}",
				e >= 5 && e < 12
					? "morning"
					: e >= 12 && e < 18
					? "afternoon"
					: e >= 18 && e < 24
					? "evening"
					: "night"
			),
			"0",
			"Official",
			!0
		),
			(_GF = !0),
			(_N0 = !0);
	}
}
function _A17(e) {
	var t = e
		.replace(/&([^;]+)/g, "&amp;$1")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;");
	console.log(t);
	var n = document.createElement("div"),
		o = document.createElement("div"),
		s = document.createElement("div"),
		i = document.createElement("div");
	(suid = btoa(`${(ts = new Date().getTime())}${(uid = _A9(8))}`)),
		o.classList.add("xMyW2iRSH"),
		n.classList.add("xVC8gtuyS"),
		s.classList.add("xKljxgVJA"),
		i.classList.add("xu4Celbbq"),
		n.setAttribute("data-uid", suid),
		n.appendChild(s),
		s.appendChild(i),
		s.appendChild(o);
	var l = _A18(t)
		.replace(/^-{15,}\n/gm, '<div class="xBAgKhSPI"></div>') //分隔線
		.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>') //粗體
		.replace(/(\r?\n){3,}/g, "\n\n") // 合併每行
		.replaceAll("\n", "<br>");
	(o.oncontextmenu = function (t) {
		_GF && S119(t, e, n);
	}),
		(o.innerHTML = l),
		(i.innerHTML = '<div class="xc4iCj2Gy">You</div>'),
		components.messageArea.appendChild(n),
		components.messageArea.scrollTo({
			top: components.messageArea.scrollHeight,
			behavior: "smooth",
		}),
		n.classList.add("xiOw4dg0O");
	try {
		WriteData(l, ts, suid, window.user_id);
	} catch (c) {
		console.log(c);
	}
}
function _A25(e, t, n, o) {
	var s = document.createElement("div"),
		i = document.createElement("div"),
		l = document.createElement("div"),
		c = document.createElement("div"),
		r = document.createElement("div"),
		d = document.createElement("div"),
		p = document.createElement("div"),
		m = document.createElement("div");
	i.classList.add("xMyW2iRSH"),
		s.classList.add("xVC8gtuyS"),
		l.classList.add("xSYcbYqTG"),
		c.classList.add("xKljxgVJA"),
		r.classList.add("xu4Celbbq"),
		d.classList.add("xc4iCj2Gy"),
		p.classList.add("xuvoVURIs"),
		m.classList.add("xt8fROB2L"),
		(p.innerText = " • "),
		(m.innerText = "now"),
		s.setAttribute("data-uid", t),
		s.appendChild(l),
		s.appendChild(c),
		c.appendChild(r),
		r.appendChild(d),
		r.appendChild(p),
		r.appendChild(m),
		c.appendChild(i),
		(d.innerText = n),
		(i.oncontextmenu = function (t) {
			let n = document.createElement("div");
			n.innerHTML = e;
			let o = n.textContent || n.innerText || "";
			_GF && S119(t, o, s);
		}),
		(i.innerHTML = e),
		o && console.log("verify account");
	let u = components.messageArea.scrollTop,
		v = components.messageArea.clientHeight,
		g = components.messageArea.scrollHeight;
	components.messageArea.appendChild(s),
		80 > Math.abs(u + v - g) &&
			components.messageArea.scrollTo({ top: g, behavior: "smooth" });
}
function S119(e, t, n) {
	var o = _(".xaAFBykLS");
	o.classList.value.includes("show")
		? o.classList.remove("show")
		: ((o.querySelector(".item[data-conid='copy']").onclick =
				async function () {
					await navigator.clipboard.writeText(t), o.classList.remove("show");
				}),
		  (o.querySelector(".item[data-conid='translate']").onclick = function () {
				o.classList.remove("show");
				window.open(
					`https://translate.google.com.tw/?sl=auto&tl=${navigator.language}&op=translate&text=${t}`
				);
		  }),
		  (o.querySelector(".item[data-conid='delete']").onclick = function () {
				n.remove();
				o.classList.remove("show");
		  }),
		  (o.style.left = e.clientX + "px"),
		  (o.style.top = e.clientY + "px"),
		  o.classList.add("show"));
}
function addRippleAnimation(e, t) {
	e.addEventListener("click", (e) => {
		let n = e.currentTarget,
			o = document.createElement("span"),
			s = Math.max(n.clientWidth, n.clientHeight);
		(o.style.background = t),
			(o.style.width = o.style.height = s + "px"),
			(o.style.left = e.offsetX - s / 2 + "px"),
			(o.style.top = e.offsetY - s / 2 + "px"),
			o.classList.add("ripple_effect");
		let i = n.getElementsByClassName("ripple_effect")[0];
		i && i.remove(), n.appendChild(o);
	});
}
components.searchInput.addEventListener("input", (e) => {
	"" === e.target.value.trim()
		? ((e.target.value = ""), _(".xemr1y6ie").classList.remove("show"))
		: _(".xemr1y6ie").classList.add("show");
}),
	components.messageInput.addEventListener("input", (e) => {
		"" === e.target.innerText.trim() && (e.target.innerHTML = "");
	}),
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
					.replaceAll(" ", "&nbsp;")
					.replaceAll("\n", "<br>")
			);
	}),
	(components.messageInput.ondragover = (e) => {
		e.preventDefault();
	}),
	(document.onkeydown = function (e) {
		switch (e.keyCode) {
			case 191:
				"true" === components.messageInput.getAttribute("contenteditable") &&
					document.activeElement !== components.messageInput &&
					document.activeElement !== components.searchInput &&
					(e.preventDefault(), _(".xtsARDHTI").focus());
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
	}),
	document.querySelectorAll("body > div").forEach((e) => {
		e.onwheel = (e) => {
			e.ctrlKey && e.preventDefault();
		};
	}),
	(document.oncontextmenu = (e) => {
		e.preventDefault();
	}),
	(window.onload = function () {
		var e = new URLSearchParams(window.location.search).get("invitecd");
		e = null != e ? e : "";
		var t = localStorage.getItem("_structure_invite_code");
		t = null != t ? t : e;
		try {
			function n() {
				(components.modalInput.onkeydown = () => ""),
					components.modalInput.blur(),
					components.modalButton.blur(),
					(components.modalButton.onclick = () => "");
				var e = components.modalInput.value.toLowerCase(),
					t = _(".xHiNaAdY7");
				components.modalButton.classList.add("progress"),
					(components.modalButton.innerHTML =
						'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="spinner"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>'),
					GetData("invitation_code")
						.then((o) => {
							"" === e.trim()
								? (t.classList.add("show"),
								  (t.querySelector("span").textContent =
										"You need to write something!"))
								: -1 !== o.indexOf(e)
								? (t.classList.remove("show"),
								  localStorage.setItem("_structure_invite_code", e),
								  (window.user_id = e),
								  _A2())
								: (t.classList.add("show"),
								  (t.querySelector("span").textContent =
										"The invitation code cannot be found")),
								(components.modalInput.onkeydown = (e) => {
									13 === e.keyCode && n();
								}),
								(components.modalButton.onclick = o),
								components.modalButton.classList.remove("progress"),
								(components.modalButton.innerHTML = "<span>OK</span>");
						})
						.catch((e) => {
							console.error(e),
								t.classList.add("show"),
								(t.querySelector("span").textContent =
									"An unknown error occurred"),
								components.modalButton.classList.remove("progress"),
								(components.modalButton.innerHTML = "<span>OK</span>"),
								(components.modalInput.onkeydown = (e) => {
									13 === e.keyCode && n();
								}),
								(components.modalButton.onclick = a);
						});
			}
			setTimeout(function () {
				_(".xLwq2C6gp").classList.add("in");
			}, 1e3),
				(components.modalInput.value = t),
				_(".xaAFBykLS").classList.remove("show"),
				(components.modalInput.onkeydown = (e) => {
					13 === e.keyCode && n();
				}),
				(components.modalButton.onclick = n),
				_(".xPgDa0opT").focus();
		} catch (o) {
			console.error(o);
		}
	}),
	(window.ononline = () => {
		window.location.reload();
	}),
	(window._A25 = _A25),
	document.querySelectorAll(".activitybar ._top .option").forEach((e) => {
		e.onclick = () => {
			_(".activitybar ._top .option.active").classList.remove("active"),
				e.classList.add("active");
		};
	}),
	document.addEventListener("click", function (e) {
		var t = _(".xaAFBykLS");
		t.contains(e.target) || t.classList.remove("show");
	}),
	components.messageArea.addEventListener("scroll", function () {
		_(".xaAFBykLS").classList.remove("show");
	}),
	addRippleAnimation(_(".x8u3Iqtu9"), "#2d2d3866"),
	addRippleAnimation(_(".xuwRtDpu4"), "#a8a8af71"),
	addRippleAnimation(_(".header ._left .actionbtn"), "#a9a9a947"),
	addRippleAnimation(_(".header ._right .actionbtn"), "#a9a9a947"),
	document.addEventListener(
		"touchstart",
		(e) => {
			e.touches && e.touches.length > 1 && e.preventDefault();
		},
		{ passive: !1 }
	);
let lastTouchEndTime = 0;
document.addEventListener(
	"touchend",
	(e) => {
		let t = new Date().getTime();
		t - lastTouchEndTime <= 300 && e.preventDefault(), (lastTouchEndTime = t);
	},
	!1
),
	document.addEventListener("gesturestart", function (e) {
		e.preventDefault();
	}),
	_A25(
		"If you're not familiar with Structure yet, consider typing `/help` for help!",
		"0",
		"Official",
		!0
	);
