var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value);
				  });
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator["throw"](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done
					? resolve(result.value)
					: adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
var __generator =
	(this && this.__generator) ||
	function (thisArg, body) {
		var _ = {
				label: 0,
				sent: function () {
					if (t[0] & 1) throw t[1];
					return t[1];
				},
				trys: [],
				ops: [],
			},
			f,
			y,
			t,
			g;
		return (
			(g = { next: verb(0), throw: verb(1), return: verb(2) }),
			typeof Symbol === "function" &&
				(g[Symbol.iterator] = function () {
					return this;
				}),
			g
		);
		function verb(n) {
			return function (v) {
				return step([n, v]);
			};
		}
		function step(op) {
			if (f) throw new TypeError("Generator is already executing.");
			while ((g && ((g = 0), op[0] && (_ = 0)), _))
				try {
					if (
						((f = 1),
						y &&
							(t =
								op[0] & 2
									? y["return"]
									: op[0]
									? y["throw"] || ((t = y["return"]) && t.call(y), 0)
									: y.next) &&
							!(t = t.call(y, op[1])).done)
					)
						return t;
					if (((y = 0), t)) op = [op[0] & 2, t.value];
					switch (op[0]) {
						case 0:
						case 1:
							t = op;
							break;
						case 4:
							_.label++;
							return { value: op[1], done: false };
						case 5:
							_.label++;
							y = op[1];
							op = [0];
							continue;
						case 7:
							op = _.ops.pop();
							_.trys.pop();
							continue;
						default:
							if (
								!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
								(op[0] === 6 || op[0] === 2)
							) {
								_ = 0;
								continue;
							}
							if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
								_.label = op[1];
								break;
							}
							if (op[0] === 6 && _.label < t[1]) {
								_.label = t[1];
								t = op;
								break;
							}
							if (t && _.label < t[2]) {
								_.label = t[2];
								_.ops.push(op);
								break;
							}
							if (t[2]) _.ops.pop();
							_.trys.pop();
							continue;
					}
					op = body.call(thisArg, _);
				} catch (e) {
					op = [6, e];
					y = 0;
				} finally {
					f = t = 0;
				}
			if (op[0] & 5) throw op[1];
			return { value: op[0] ? op[1] : void 0, done: true };
		}
	};

console.log(
	"\uD83D\uDC80 Please do not perform any operations in the console, attackers may steal your data."
);
var _ = function (e) {
		return document.querySelector(e);
	},
	isMobileDevice = /(Android|webOS|Windows Phone|Mac|iPhone|iPod|iPad)/i.test(
		window.navigator.platform
	);
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
			.concat(decodeURIComponent(e), "</span>");
	});
}
function _A2() {
	if (!1 === _GF) {
		_(".xLwq2C6gp").classList.remove("in"),
			components.searchInput.removeAttribute("disabled"),
			components.messageInput.setAttribute("contenteditable", "true"),
			components.messageArea.classList.remove("xVjpzmyej"),
			_("#file_uploader").removeAttribute("disabled");
		_(".xnKzgeITl") && _(".xnKzgeITl").remove();
		var e = new Date().getHours();
		_A25(
			"{dl}好，歡迎來到 Structure".replace(
				"{dl}",
				e >= 5 && e < 12
					? "早上"
					: e >= 12 && e < 18
					? "下午"
					: e >= 18 && e < 24
					? "晚上"
					: "半夜"
			),
			"0",
			"陌生人",
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
	var n = document.createElement("div"),
		o = document.createElement("div"),
		s = document.createElement("div"),
		i = document.createElement("div");
	(suid = btoa("".concat((ts = new Date().getTime())).concat((uid = _A9(8))))),
		o.classList.add("xMyW2iRSH"),
		n.classList.add("xVC8gtuyS"),
		s.classList.add("xKljxgVJA"),
		i.classList.add("xu4Celbbq"),
		n.setAttribute("data-uid", suid),
		n.appendChild(s),
		s.appendChild(i),
		s.appendChild(o);
	var c = _A18(t)
		.replace(/(\r?\n){3,}/g, "\n\n")
		.replaceAll("\n", "<br>");
	(o.innerHTML = c),
		(i.innerHTML = '<div class="xc4iCj2Gy">You</div>'),
		components.messageArea.appendChild(n),
		components.messageArea.scrollTo({
			top: components.messageArea.scrollHeight,
			behavior: "smooth",
		}),
		n.classList.add("xiOw4dg0O");
	try {
		WriteData(c, ts, suid, window.user_id);
	} catch (r) {
		console.log(r);
	}
}
function _A25(e, t, n, o) {
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
	s.setAttribute("data-uid", t),
		s.appendChild(c),
		s.appendChild(r),
		r.appendChild(l),
		l.appendChild(d),
		l.appendChild(u),
		l.appendChild(p),
		r.appendChild(i),
		(d.innerHTML = n);
	(i.innerHTML = e), o && console.log("verify account");

	var m = components.messageArea.scrollTop,
		v = components.messageArea.clientHeight,
		f = components.messageArea.scrollHeight;
	components.messageArea.appendChild(s),
		80 > Math.abs(m + v - f) &&
			components.messageArea.scrollTo({ top: f, behavior: "smooth" });
}
function S119(e, t, n) {
	var o = _(".xaAFBykLS");
	o.classList.value.includes("show")
		? o.classList.remove("show")
		: ((o.querySelector(".item[data-conid='delete']").onclick = function () {
				n.remove(), o.classList.remove("show");
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
	components.searchInput.addEventListener("input", function (e) {
		"" === e.target.value.trim()
			? ((e.target.value = ""), _(".xemr1y6ie").classList.remove("show"))
			: _(".xemr1y6ie").classList.add("show");
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
					.replaceAll(" ", "&nbsp;")
					.replaceAll("\n", "<br>")
			);
	}),
	(components.messageInput.ondragover = function (e) {
		e.preventDefault();
	}),
	(document.onkeydown = function (e) {
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
		var e = localStorage.getItem("_structure_invite_code");
		e = null != e ? e : "";
		var t = new URLSearchParams(window.location.search).get("invitecd");
		t = null != t ? t : e;
		try {
			function n() {
				(components.modalInput.onkeydown = function () {
					return "";
				}),
					components.modalInput.blur(),
					components.modalButton.blur(),
					(components.modalButton.onclick = function () {
						return "";
					});
				var e = components.modalInput.value.toLowerCase(),
					t = _(".xHiNaAdY7");
				components.modalButton.classList.add("progress"),
					(components.modalButton.innerHTML =
						'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="spinner"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>'),
					GetData("banned_users").then((data) => {
						if (data.indexOf(e) !== -1) {
							console.log("你已被封禁");
							_(".xK6zzHdt3").innerText = "你已被封禁";
							_(".xPgDa0opT").style.display = "none";
							components.modalButton.style.display = "none";
						} else {
							GetData("invitation_code")
								.then(function (o) {
									"" === e.trim()
										? (t.classList.add("show"),
										  (t.querySelector("span").textContent =
												"你需要寫點東西！"))
										: -1 !== o.indexOf(e)
										? (t.classList.remove("show"),
										  localStorage.setItem("_structure_invite_code", e),
										  (window.user_id = e),
										  _A2())
										: (t.classList.add("show"),
										  (t.querySelector("span").textContent = "找不到邀請碼")),
										(components.modalInput.onkeydown = function (e) {
											13 === e.keyCode && n();
										}),
										(components.modalButton.onclick = n),
										components.modalButton.classList.remove("progress"),
										(components.modalButton.innerHTML = "<span>OK</span>");
								})
								.catch(function (e) {
									console.error(e),
										t.classList.add("show"),
										(t.querySelector("span").textContent = "出現未知錯誤"),
										components.modalButton.classList.remove("progress"),
										(components.modalButton.innerHTML = "<span>OK</span>"),
										(components.modalInput.onkeydown = function (e) {
											13 === e.keyCode && n();
										}),
										(components.modalButton.onclick = a);
								});
						}
					});
			}
			setTimeout(function () {
				_(".xLwq2C6gp").classList.add("in");
			}, 1e3),
				(components.modalInput.value = t),
				_(".xaAFBykLS").classList.remove("show"),
				(components.modalInput.onkeydown = function (e) {
					13 === e.keyCode && n();
				}),
				(components.modalButton.onclick = n),
				_(".xPgDa0opT").focus();
		} catch (o) {
			console.error(o);
		}
	}),
	(window._A25 = _A25),
	document.querySelectorAll(".activitybar ._top .option").forEach(function (e) {
		e.onclick = function () {
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
components.activitybar.querySelector("._top").onwheel = (t) => {
	if (_f991) {
		_f991 = !1;
		var e = components.activitybar.querySelectorAll("._top .option"),
			a = components.activitybar.querySelector("._top .option.active");
		(index = Array.from(e).findIndex((t) => t === a)),
			t.deltaY > 0
				? index === e.length - 1
					? e[0].classList.add("active")
					: e[index + 1].classList.add("active")
				: t.deltaY < 0 &&
				  (0 === index
						? e[e.length - 1].classList.add("active")
						: e[index - 1].classList.add("active")),
			a.classList.remove("active"),
			setTimeout(function () {
				_f991 = !0;
			}, 200);
	}
};
function formatFileSize(bytes) {
	if (bytes < 1024) {
		return bytes + " B";
	} else if (bytes < 1048576) {
		return (bytes / 1024).toFixed(2) + " KB";
	} else if (bytes < 1073741824) {
		return (bytes / 1048576).toFixed(2) + " MB";
	} else {
		return (bytes / 1073741824).toFixed(2) + " GB";
	}
}

function _A251(param, param2) {
	var npf = param;
	var n = document.createElement("div"),
		o = document.createElement("div"),
		s = document.createElement("div"),
		i = document.createElement("div");
	(suid = btoa("".concat((ts = new Date().getTime())).concat((uid = _A9(8))))),
		o.classList.add("xMyW2iRSH"),
		n.classList.add("xVC8gtuyS"),
		s.classList.add("xKljxgVJA"),
		i.classList.add("xu4Celbbq"),
		n.setAttribute("data-uid", suid),
		n.appendChild(s),
		s.appendChild(i),
		s.appendChild(o);
	o.classList.add("noc");
	var x7tEi32S9 = document.createElement("a");
	x7tEi32S9.setAttribute("draggable", "false");
	x7tEi32S9.setAttribute("tabindex", "-1");
	x7tEi32S9.href = "javascript:void(0);";
	var x7AADV79i = document.createElement("div");
	var xFUGLhuJT = document.createElement("div");
	var xfHleneBl = document.createElement("div");
	x7tEi32S9.classList.add("x7tEi32S9");
	xFUGLhuJT.classList.add("xFUGLhuJT");
	x7AADV79i.classList.add("x7AADV79i");
	xfHleneBl.classList.add("xfHleneBl");
	xfHleneBl.innerHTML = `<div class="xyf6y5jpd">${npf.name}</div>
			<div class="xuGoroqT8">${formatFileSize(npf.size)}</div>`;
	x7tEi32S9.appendChild(x7AADV79i);
	x7AADV79i.appendChild(xFUGLhuJT);
	x7AADV79i.appendChild(xfHleneBl);
	var progressbar = document.createElement("div");
	progressbar.classList.add("progressbar");
	x7AADV79i.appendChild(progressbar);
	var xoW9yDyFK = document.createElement("div");
	xoW9yDyFK.classList.add("xoW9yDyFK");
	progressbar.appendChild(xoW9yDyFK);
	xFUGLhuJT.innerHTML = `<svg xmlns=http://www.w3.org/2000/svg viewBox="0 0 24 24" width=24 height=24 fill=none>
<path d="M3.5 10C3.5 6.22876 3.5 4.34315 4.7448 3.17157C5.98959 2 7.99306 2 12 2H12.7727C16.0339 2 17.6645 2 18.7969 2.79784C19.1214 3.02643 19.4094 3.29752 19.6523 3.60289C20.5 4.66867 20.5 6.20336 20.5 9.27273V11.8182C20.5 14.7814 20.5 16.2629 20.0311 17.4462C19.2772 19.3486 17.6829 20.8491 15.6616 21.5586C14.4044 22 12.8302 22 9.68182 22C7.88275 22 6.98322 22 6.26478 21.7478C5.10979 21.3424 4.19875 20.4849 3.76796 19.3979C3.5 18.7217 3.5 17.8751 3.5 16.1818V10Z" stroke="#e2e3e5" stroke-width=2 stroke-linejoin=round />
<path d="M20.5 12C20.5 13.8409 19.0076 15.3333 17.1667 15.3333C16.5009 15.3333 15.716 15.2167 15.0686 15.3901C14.4935 15.5442 14.0442 15.9935 13.8901 16.5686C13.7167 17.216 13.8333 18.0009 13.8333 18.6667C13.8333 20.5076 12.3409 22 10.5 22" stroke="#e2e3e5" stroke-width=2 stroke-linecap=round stroke-linejoin=round />
<path d="M8 7H15" stroke="#e2e3e5" stroke-width=2 stroke-linecap=round stroke-linejoin=round />
<path d="M8 11H11" stroke="#e2e3e5" stroke-width=2 stroke-linecap=round stroke-linejoin=round />
</svg>`;

	var tspp = document.createElement("div");
	tspp.innerText = param2;
	tspp.classList.add("x7zYNq8HG");
	o.appendChild(tspp);
	o.appendChild(x7tEi32S9);
	i.innerHTML = '<div class="xc4iCj2Gy">You</div>';
	components.messageArea.appendChild(n);
	components.messageArea.scrollTo({
		top: components.messageArea.scrollHeight,
		behavior: "smooth",
	});
	n.classList.add("xiOw4dg0O");
	uploadFile(xoW9yDyFK, npf, x7tEi32S9, {
		a: o,
		b: ts,
		c: suid,
		d: window.user_id,
	});
	_("#file_uploader").value = null;
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

_("#file_uploader").onchange = (e) => {
	var n = e.target.files[0];
	if (n.size / 1024 / 1024 <= 10) {
		_(".xLwq2C6gp").classList.add("in");
		_(".xPgDa0opT").value = "";
		_(".xPgDa0opT").style.display = "flex";
		_(".x3OPJI1nX").style.display = "flex";
		_(".x3OPJI1nX").innerText = "提示：{a1}、{a2}..."
			.replace("{a1}", _A5815(["好聽的歌", "重要的報告", "一張吸睛的風景照"]))
			.replace("{a2}", _A5815(["怪物的圖鑑", "今天的回家作業", "我也不知道"]));
		_(".xK6zzHdt3").innerText = "請輸入文件敘述";
		components.modalInput.onkeydown = function (e) {
			13 === e.keyCode && _Z641(n);
		};
		components.modalButton.onclick = function (e) {
			_Z641(n);
		};
	} else {
		_(".xLwq2C6gp").classList.add("in");
		_(".xPgDa0opT").style.display = "none";
		_(".xK6zzHdt3").innerText = "文件太大了";
		_(".x3OPJI1nX").style.display = "flex";
		_(".x3OPJI1nX").innerText = "提示：換個小一點的文件試試";
		_(".x7dBirbNO").onclick = function () {
			_(".xLwq2C6gp").classList.remove("in");
		};
		_("#file_uploader").value = null;
	}
};

OML2D.loadOml2d({
	models: [
		{
			path: "./sagiri.model.json",
			scale: 0.15,
		},
	],
});
