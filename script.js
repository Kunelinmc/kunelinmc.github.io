console.log(
	`%c 💀 Please do not perform any operations in the console,
	attackers may steal your data.`,
	"font-size:22px"
);
const _ = (e) => document.querySelector(e),
	InvCdInput = _(".data-v-PgDa0opT"),
	InCdBtn = _(".data-v-7dBirbNO"),
	isMobileDevice = /(Android|webOS|Windows Phone|Mac|iPhone|iPod|iPad)/i.test(
		window.navigator.platform
	);
let _N0 = !1,
	_GF = !1;
function _A16(e) {
	(_(".data-v-tsARDHTI").innerHTML = ""),
		_A17(
			e
				.replace(/&([^;]+)/g, "&amp;$1")
				.replaceAll("<", "&lt;")
				.replaceAll(">", "&gt;")
				.replaceAll("\n", "<br>")
		);
}
function _A9(e) {
	let t = "",
		a = 0,
		n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
		i = n.length;
	for (; a < e; ) (t += n.charAt(Math.floor(Math.random() * i))), (a += 1);
	return t;
}
function _A18(e) {
	return e.replace(/https?:\/\/[^\s/$.?#].[^\s]*/g, function (e) {
		return `<span class="data-v-0ciSQShX" onclick="window.open(&quot;${e}&quot;);this.classList.add(&quot;visited&quot;);">${decodeURIComponent(e)}</span>`;
	});
}
_(".data-v-ujXllYgW").addEventListener("input", (e) => {
	"" === e.target.value.trim()
		? ((e.target.value = ""),
		  _(".data-v-fDyhYSGO").classList.add("show"),
		  _(".data-v-emr1y6ie").classList.remove("show"))
		: (_(".data-v-fDyhYSGO").classList.remove("show"),
		  _(".data-v-emr1y6ie").classList.add("show"));
}),
	_(".data-v-tsARDHTI").addEventListener("input", (e) => {
		"" === e.target.innerText.trim() && (e.target.innerHTML = "");
	}),
	document
		.querySelector(".data-v-tsARDHTI")
		.addEventListener("keydown", (e) => {
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
	(_(".data-v-uwRtDpu4").onclick = function () {
		"" !== _(".data-v-tsARDHTI").innerHTML.trim() &&
			(_N0
				? _A16(_(".data-v-tsARDHTI").innerText)
				: console.log("Unable to send the message"));
	}),
	(_(".data-v-tsARDHTI").onpaste = function (e) {
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
	(document.onkeydown = function (e) {
		switch (e.keyCode) {
			case 191:
				"true" === _(".data-v-tsARDHTI").getAttribute("contenteditable") &&
					document.activeElement !== _(".data-v-tsARDHTI") &&
					document.activeElement !== _(".data-v-ujXllYgW") &&
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
	}),
	document.querySelectorAll("body > div").forEach((e) => {
		e.onwheel = (e) => {
			e.ctrlKey && e.preventDefault();
		};
	}),
	[".sidebar", ".main"].forEach((e) => {
		_(e).onwheel = (e) => {
			e.ctrlKey && e.preventDefault();
		};
	}),
	(document.oncontextmenu = (e) => {
		e.preventDefault();
	});
function _A2() {
	if (!1 === _GF) {
		_(".data-v-Lwq2C6gp").classList.remove("in"),
			setTimeout(() => _(".data-v-Lwq2C6gp").remove(), 500),
			_(".data-v-ujXllYgW").removeAttribute("disabled"),
			document
				.querySelector(".data-v-tsARDHTI")
				.setAttribute("contenteditable", "true"),
			document
				.querySelector(".data-v-ikyLwDf4")
				.classList.remove("data-v-Vjpzmyej"),
			_(".data-v-nKzgeITl") && _(".data-v-nKzgeITl").remove();
		let e = new Date().getHours();
		_A25(
			"Good {dl} and welcome to Structure 👋".replace(
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
			"Structure",
			true
		),
			(_GF = !0),
			(_N0 = !0);
	}
}
function _A17(e) {
	var t = document.createElement("div"),
		a = document.createElement("div"),
		n = document.createElement("div"),
		i = document.createElement("div");
	(ts = `${String((hour = (now = new Date()).getHours())).padStart(
		2,
		"0"
	)}:${String((minute = now.getMinutes())).padStart(2, "0")}`),
		(suid = btoa(`${now.getTime()}${(uid = _A9(8))}`)),
		a.classList.add("data-v-MyW2iRSH"),
		t.classList.add("data-v-VC8gtuyS"),
		n.classList.add("data-v-KljxgVJA"),
		i.classList.add("data-v-u4Celbbq"),
		t.setAttribute("data-uid", suid),
		t.appendChild(n),
		n.appendChild(i),
		n.appendChild(a);
	var s = _A18(e); //_A18(e)
	(a.oncontextmenu = function (e) {
		_GF && S119(e);
	}),
		(a.innerHTML = s),
		(i.innerText = "You"),
		msgfr.appendChild(t),
		msgfr.scrollTo(0, msgfr.scrollHeight),
		t.classList.add("data-v-iOw4dg0O");
	try {
		WriteData(s, ts, suid, window.user_id);
	} catch (l) {
		console.log(l);
	}
}
(window.onload = function () {
	var e = new URLSearchParams(window.location.search).get("invitecd");
	(e = null != e ? e : ""), console.log(e);
	var t = sessionStorage.getItem("_structure_invite_code");
	t = null != t ? t : e;
	try {
		function a() {
			InvCdInput.setAttribute("disabled", "");
			InvCdInput.onkeydown = () => {
				return "";
			};
			InvCdInput.blur();
			InCdBtn.blur();
			InCdBtn.onclick = () => {
				return "";
			};
			var e = InvCdInput.value.toLowerCase(),
				t = _(".data-v-HiNaAdY7");
			InCdBtn.classList.add("progress");
			InCdBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="spinner"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>`;
			GetData("invitation_code")
				.then((a) => {
					console.log(a);
					"" === e.trim()
						? (t.classList.add("show"),
						  (t.querySelector("span").textContent =
								"You need to write something!"))
						: -1 !== a.indexOf(e)
						? (t.classList.remove("show"), (window.user_id = e), _A2())
						: (t.classList.add("show"),
						  (t.querySelector("span").textContent =
								"The invitation code cannot be found"));
				})
				.catch((e) => {
					console.error(e);
					t.classList.add("show");
					InvCdInput.removeAttribute("disabled");
					t.querySelector("span").textContent = "An unknown error occurred";
					InCdBtn.classList.remove("progress");
					InCdBtn.innerHTML = "<span>OK</span>";
					InvCdInput.onkeydown = (e) => {
						13 === e.keyCode && a();
					};
					InCdBtn.onclick = a;
				});
		}
		setTimeout(function () {
			_(".data-v-Lwq2C6gp").classList.add("in");
		}, 1e3),
			(InvCdInput.value = t),
			_(".data-v-aAFBykLS").classList.remove("show"),
			(InvCdInput.onkeydown = (e) => {
				13 === e.keyCode && a();
			}),
			(InCdBtn.onclick = a),
			_(".data-v-PgDa0opT").focus();
	} catch (n) {
		console.error(n);
	}
}),
	(window.ononline = () => {
		window.location.reload();
	});
const msgfr = _(".data-v-ikyLwDf4");
function _A25(e, t, a, nn) {
	var n = document.createElement("div"),
		i = document.createElement("div"),
		s = document.createElement("div"),
		l = document.createElement("div"),
		r = document.createElement("div"),
		fs = document.createElement("div");
	i.classList.add("data-v-MyW2iRSH"),
		n.classList.add("data-v-VC8gtuyS"),
		s.classList.add("data-v-SYcbYqTG"),
		l.classList.add("data-v-KljxgVJA"),
		r.classList.add("data-v-u4Celbbq"),
		fs.classList.add("data-v-c4iCj2Gy");
	n.setAttribute("data-uid", t),
		n.appendChild(s),
		n.appendChild(l),
		l.appendChild(r),
		r.appendChild(fs),
		l.appendChild(i),
		(fs.innerText = a),
		(i.oncontextmenu = function (j) {
			_GF && S119(j, e.replaceAll("<br>", "\n"));
		}),
		(i.innerHTML = e);
	if (nn) {
		r.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" style="margin-left: 4px"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" /><path fill="#8ae8ff" d="M21.546 5.111a1.5 1.5 0 0 1 0 2.121L10.303 18.475a1.6 1.6 0 0 1-2.263 0L2.454 12.89a1.5 1.5 0 1 1 2.121-2.121l4.596 4.596L19.424 5.111a1.5 1.5 0 0 1 2.122 0" /></g></svg>`;
	}
	let o = msgfr.scrollTop,
		d = msgfr.clientHeight,
		c = msgfr.scrollHeight;
	msgfr.appendChild(n),
		80 > Math.abs(o + d - c) && msgfr.scrollTo(0, msgfr.scrollHeight);
}
function S119(e, s) {
	var t = _(".data-v-aAFBykLS");
	if (t.classList.value.includes("show")) t.classList.remove("show");
	else {
		t.querySelector(".item[data-conid='copy']").onclick = async function () {
			await navigator.clipboard.writeText(s);
			t.classList.remove("show");
		};
		t.style.left = e.clientX + "px";
		t.style.top = e.clientY + "px";
		t.classList.add("show");
	}
}
(window._A25 = _A25),
	window.addEventListener("visibilitychange", () => {
		console.log(document.visibilityState);
	}),
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

_(".main .data-v-ikyLwDf4").addEventListener("scroll", function () {
	_(".data-v-aAFBykLS").classList.remove("show");
});
