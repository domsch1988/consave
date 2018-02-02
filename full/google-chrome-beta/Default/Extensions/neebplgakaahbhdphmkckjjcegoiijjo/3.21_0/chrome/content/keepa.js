var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.checkStringArgs = function(b, k, f) {
  if (null == b) {
    throw new TypeError("The 'this' value for String.prototype." + f + " must not be null or undefined");
  }
  if (k instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + f + " must not be a regular expression");
  }
  return b + "";
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, k, f) {
  b != Array.prototype && b != Object.prototype && (b[k] = f.value);
};
$jscomp.getGlobal = function(b) {
  return "undefined" != typeof window && window === b ? b : "undefined" != typeof global && null != global ? global : b;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(b, k, f, q) {
  if (k) {
    f = $jscomp.global;
    b = b.split(".");
    for (q = 0; q < b.length - 1; q++) {
      var t = b[q];
      t in f || (f[t] = {});
      f = f[t];
    }
    b = b[b.length - 1];
    q = f[b];
    k = k(q);
    k != q && null != k && $jscomp.defineProperty(f, b, {configurable:!0, writable:!0, value:k});
  }
};
$jscomp.polyfill("String.prototype.endsWith", function(b) {
  return b ? b : function(b, f) {
    var k = $jscomp.checkStringArgs(this, b, "endsWith");
    b += "";
    void 0 === f && (f = k.length);
    f = Math.max(0, Math.min(f | 0, k.length));
    for (var t = b.length; 0 < t && 0 < f;) {
      if (k[--f] != b[--t]) {
        return !1;
      }
    }
    return 0 >= t;
  };
}, "es6", "es3");
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.Symbol = function() {
  var b = 0;
  return function(k) {
    return $jscomp.SYMBOL_PREFIX + (k || "") + b++;
  };
}();
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var b = $jscomp.global.Symbol.iterator;
  b || (b = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  "function" != typeof Array.prototype[b] && $jscomp.defineProperty(Array.prototype, b, {configurable:!0, writable:!0, value:function() {
    return $jscomp.arrayIterator(this);
  }});
  $jscomp.initSymbolIterator = function() {
  };
};
$jscomp.arrayIterator = function(b) {
  var k = 0;
  return $jscomp.iteratorPrototype(function() {
    return k < b.length ? {done:!1, value:b[k++]} : {done:!0};
  });
};
$jscomp.iteratorPrototype = function(b) {
  $jscomp.initSymbolIterator();
  b = {next:b};
  b[$jscomp.global.Symbol.iterator] = function() {
    return this;
  };
  return b;
};
$jscomp.polyfill("Array.from", function(b) {
  return b ? b : function(b, f, q) {
    $jscomp.initSymbolIterator();
    f = null != f ? f : function(b) {
      return b;
    };
    var k = [], x = b[Symbol.iterator];
    if ("function" == typeof x) {
      for (b = x.call(b); !(x = b.next()).done;) {
        k.push(f.call(q, x.value));
      }
    } else {
      x = b.length;
      for (var C = 0; C < x; C++) {
        k.push(f.call(q, b[C]));
      }
    }
    return k;
  };
}, "es6", "es3");
$jscomp.iteratorFromArray = function(b, k) {
  $jscomp.initSymbolIterator();
  b instanceof String && (b += "");
  var f = 0, q = {next:function() {
    if (f < b.length) {
      var t = f++;
      return {value:k(t, b[t]), done:!1};
    }
    q.next = function() {
      return {done:!0, value:void 0};
    };
    return q.next();
  }};
  q[Symbol.iterator] = function() {
    return q;
  };
  return q;
};
$jscomp.polyfill("Array.prototype.entries", function(b) {
  return b ? b : function() {
    return $jscomp.iteratorFromArray(this, function(b, f) {
      return [b, f];
    });
  };
}, "es6", "es3");
(function() {
  var b = window, k = !1, f = "console", q = "clear";
  String.prototype.hashCode = function() {
    var a = 0, c;
    if (0 === this.length) {
      return a;
    }
    var d = 0;
    for (c = this.length; d < c; d++) {
      var b = this.charCodeAt(d);
      a = (a << 5) - a + b;
      a |= 0;
    }
    return a;
  };
  1.2 < Math.random() && (q = f = "c");
  var t = window.opera || -1 < navigator.userAgent.indexOf(" OPR/"), x = -1 < navigator.userAgent.toLowerCase().indexOf("firefox"), C = -1 < navigator.userAgent.toLowerCase().indexOf("edge/"), Y = x ? "firefox" : "chrome", p = !t && !x && !C, J = p ? "keepaChrome" : t ? "keepaOpera" : C ? "keepaEdge" : "keepaFirefox", F = !1;
  try {
    F = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
  } catch (a) {
  }
  if (p) {
    try {
      chrome.runtime.sendMessage("hnkcfpcejkafcihlgbojoidoihckciin", {type:"isActive"}, null, function(a) {
        a && a.isActive && (k = !0);
      });
    } catch (a) {
    }
  }
  C && (window.chrome = window.browser);
  var K = {}, M = 0;
  if (p || t || x || C) {
    chrome.runtime.onMessage.addListener(function(a, c, d) {
      if (c.tab && c.tab.url || c.url) {
        switch(a.type) {
          case "getStorage":
            a.key && h.get(a.key);
            d({value:window.localStorage});
            break;
          case "setStorage":
            h.set(a.key, a.val);
            d({value:window.localStorage});
            break;
          case "removeStorage":
            h.remove(a.key);
            d({value:window.localStorage});
            break;
          case "getFilters":
            d({value:z.getFilters()});
            break;
          case "sendData":
            a = a.val;
            if (null != a.ratings) {
              if (c = a.ratings, 1000 > M) {
                if ("f1" == a.key) {
                  if (c) {
                    for (var b = c.length; b--;) {
                      var A = c[b];
                      null == A ? c.splice(b, 1) : (A = a.domainId + A.asin, K[A] ? c.splice(b, 1) : (K[A] = 1, M++));
                    }
                    0 < c.length && v.sendPlainMessage(a);
                  }
                } else {
                  v.sendPlainMessage(a);
                }
              } else {
                K = null;
              }
            } else {
              v.sendPlainMessage(a);
            }
            d({});
            break;
          case "log":
            r.quiet || console.log(a.val);
            d({});
            break;
          case "refreshStorage":
            r.refreshSettings();
            d({value:window.localStorage});
            break;
          default:
            d({});
        }
      }
    }), window.onload = function() {
      var a = document.getElementById("keepa_storage");
      a.src = "https://keepa.com/storageProxy" + (x ? "Firefox" : "") + ".html";
      a.onload = function() {
        document.getElementById("keepa_storage");
        r.register();
      };
    };
  }
  var h = {storage:chrome.storage.local, contextMenu:function() {
    try {
      "Off" === h.storage.contextMenuActive ? chrome.contextMenus.removeAll() : (chrome.contextMenus.create({title:"View products on Keepa", contexts:["page"], documentUrlPatterns:"*://*.amazon.com/* *://*.amzn.com/* *://*.amazon.co.uk/* *://*.amazon.de/* *://*.amazon.fr/* *://*.amazon.it/* *://*.amazon.ca/* *://*.amazon.com.mx/* *://*.amazon.es/* *://*.amazon.co.jp/* *://*.amazon.in/* *://*.amazon.com.br/*".split(" ")}), chrome.contextMenus.onClicked.addListener(function(a, c) {
        chrome.tabs.sendMessage(c.id, {key:"collectASINs"}, {}, function(a) {
          "undefined" != typeof a && chrome.tabs.create({url:"https://keepa.com/#!viewer/" + encodeURIComponent(JSON.stringify(a))});
        });
      }));
    } catch (a) {
      console.log(a);
    }
  }, addComma:function(a, c) {
    null == c && (c = domain);
    return 5 != c ? (a / 100).toFixed(2) : a.toFixed(0);
  }, formatCurrency:function(a, c, d) {
    if ("" == a) {
      return a;
    }
    a = a.toString().replace(/[$\u20ac\uffe5\u00a3,-]/g, "");
    isNaN(a) && (a = "0");
    a = Math.floor(100 * a + 0.50000000001);
    var b = a % 100;
    a = Math.floor(a / 100).toString();
    10 > b && (b = "0" + b);
    for (var A = 0; A < Math.floor((a.length - (1 + A)) / 3); A++) {
      a = a.substring(0, a.length - (4 * A + 3)) + "," + a.substring(a.length - (4 * A + 3));
    }
    null == d && (d = domain);
    return 5 == d || c ? a : a + "." + b;
  }, log:function(a) {
    r.quiet || console.log(a);
  }, iframeWin:null, operationComplete:!1, init:function() {
    h.iframeWin = document.getElementById("keepa_storage").contentWindow;
    h.iframeWin.postMessage({type:"getAll"}, "*");
    r.convertToStorage();
    var a = null;
    h.get(["token", "hashSynced"], function(c) {
      a = c.token;
      !a && (p || x || C) && chrome.storage.sync.get("KeepaHash", function(d) {
        if (!chrome.runtime.lastError) {
          try {
            var c = d.KeepaHash;
            c && 64 == c.length ? (h.set("token", c), console.log("loaded token from sync")) : h.get({token:r.Guid.newGuid()}, function(d) {
              a = d.token;
            });
          } catch (A) {
            r.reportBug("r9 " + A);
          }
        }
      });
    });
    chrome.storage.onChanged.addListener(function(a, d) {
      if ("local" == d) {
        for (var c in a) {
          d = a[c], "string" != typeof d.oldValue && (d.oldValue = JSON.stringify(d.oldValue)), "string" != typeof d.newValue && (d.newValue = JSON.stringify(d.newValue)), d.oldValue != d.newValue && h.iframeWin.postMessage({type:"set", key:c, value:d.newValue}, "*");
        }
      }
    });
    window.addEventListener("message", function(a) {
      var d = a.data;
      if (d) {
        if ("string" === typeof d) {
          try {
            d = JSON.parse(d);
          } catch (G) {
            r.reportBug("on storage message: " + d + " ### " + G);
            return;
          }
        }
        if (d.log) {
          console.log(d.log);
        } else {
          var b = function() {
          };
          if (a.origin != r.url) {
            var c = z.getMessage();
            if (null != c && ("function" == typeof c.onDone && (b = c.onDone, delete c.onDone), "undefined" == typeof c.sent && d.sandbox && a.source == document.getElementById("keepa_data").contentWindow)) {
              if (d.sandbox == c.url) {
                z.setStatTime(40);
                try {
                  a.source.postMessage({key:"data", value:c}, "*");
                } catch (G) {
                  z.abortJob(407), b();
                }
              } else {
                d.isUrlMsg ? z.abortJob(405) : (c = z.getOutgoingMessage(c, d.sandbox), v.sendMessage(c)), b();
              }
            }
          } else {
            switch(d.type) {
              case "get":
                h.set(d.key, d.value);
                break;
              case "getAll":
                b = d.value;
                a = {};
                var f = !0;
                for (c in b) {
                  var k = b[c];
                  k && "null" != k && "" != k && "undefined" != k && (a[c] = k, f = !1);
                }
                f || h.setAll(a);
                break;
              case "update":
                h.get(d.key, function(a) {
                  a[d.key] != d.value && (d.value ? h.set(d.key, d.value) : h.remove(d.key));
                });
            }
          }
        }
      }
    });
    try {
      chrome.notifications.onButtonClicked.addListener(function(c, d) {
        "unvalidInstallSource" == c ? window.open("https://chrome.google.com/webstore/detail/keepacom-price-tracker/neebplgakaahbhdphmkckjjcegoiijjo") : "optPermission" == c ? chrome.runtime.openOptionsPage(function() {
        }) : 0 == d ? window.open(c) : 1 == d && (null != a && 64 == a.length ? window.open("https://keepa.com/r/" + a + "manage") : window.open("https://keepa.com/#manage"));
      });
    } catch (c) {
    }
  }, set:function(a, c, d) {
    var b = {};
    b[a] = c;
    h.storage.set(b, d);
    h.iframeWin.postMessage({type:"set", key:a, value:c}, "*");
    "token" == a && 64 == c.length && (p || x || C) && chrome.storage.sync.set({KeepaHash:c}, function() {
    });
  }, remove:function(a, c) {
    h.storage.remove(a, c);
    h.iframeWin.postMessage({type:"remove", key:a}, "*");
  }, get:function(a, c) {
    "function" != typeof c && (c = function() {
    });
    h.storage.get(a, function(d) {
      if ("string" == typeof a && void 0 == d[a]) {
        if (d = r.defaultSettings[a]) {
          h.set(a, d);
          var b = {};
          b[a] = d;
          c(b);
        } else {
          c({});
        }
      } else {
        c(d);
      }
    });
  }, getAll:function(a) {
    h.storage.get(a);
  }, setAll:function(a, c) {
    h.storage.set(a, c);
    void 0 != a.token && 64 == a.token.length && (p || x || C) && chrome.storage.sync.set({KeepaHash:a.token}, function() {
    });
  }};
  (p || t || x) && h.contextMenu();
  var r = {quiet:!0, version:"3.21", browser:1, url:"https://keepa.com", getDomain:function(a) {
    switch(a) {
      case "com":
        return 1;
      case "co.uk":
        return 2;
      case "de":
        return 3;
      case "fr":
        return 4;
      case "co.jp":
        return 5;
      case "ca":
        return 6;
      case "cn":
        return 7;
      case "it":
        return 8;
      case "es":
        return 9;
      case "in":
        return 10;
      case "com.mx":
        return 11;
      case "com.br":
        return 12;
      default:
        return 1;
    }
  }, objectStorage:[], Guid:function() {
    var a = function(d, c, b) {
      return d.length >= c ? d : a(b + d, c, b || " ");
    }, c = function() {
      var a = (new Date).getTime();
      return "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/x/g, function(c) {
        var d = (a + 16 * Math.random()) % 16 | 0;
        a = Math.floor(a / 16);
        return ("x" === c ? d : d & 7 | 8).toString(16);
      });
    };
    return {newGuid:function() {
      var d = "undefined" != typeof window.crypto.getRandomValues;
      if ("undefined" != typeof window.crypto && d) {
        d = new window.Uint16Array(16);
        window.crypto.getRandomValues(d);
        var b = "";
        for (f in d) {
          var A = d[f].toString(16);
          A = a(A, 4, "0");
          b += A;
        }
        var f = b;
      } else {
        f = c();
      }
      return f;
    }};
  }(), convertToStorage:function() {
    chrome.storage.local.get("migrated", function(a) {
      if (void 0 == a.migrated) {
        a = {migrated:1};
        for (var b in localStorage) {
          var d = localStorage[b];
          d && "function" != typeof d && (a[b] = d);
        }
        chrome.storage.local.set(a, function() {
          chrome.runtime.lastError || localStorage.clear();
        });
      }
    });
  }, defaultSettings:{s_merchantChart:"111", s_range:"2160", s_zoom:"0", s_extreme:"0", s_dateFormat:"D, M j G:i", s_percent:"5", s_merchantTrack:"100", s_boxVertical:"200", s_boxHorizontal:"0", s_boxType:"0", s_alerts:"0", s_alertTimer:"900000", extremeFilter:"0", revealStock:"0", optOut_crawl:"0"}, resetSettings:function() {
    console.log("loading default settings.");
    for (var a in r.defaultSettings) {
      h.set(a, r.defaultSettings[a]);
    }
    h.set("install", Date.now());
    h.set("token", r.Guid.newGuid());
  }, settingsArray:"s_merchantChart s_range s_zoom s_extreme s_dateFormat s_percent s_merchantTrack s_boxVertical s_boxHorizontal s_boxType s_alerts s_alertTimer extremeFilter revealStock".split(" "), refreshSettings:function() {
  }, register:function() {
    h.init();
    x ? h.set("addonVersionFirefox", r.version) : h.set("addonVersionChrome", r.version);
    try {
      chrome.runtime.setUninstallURL("https://dyn.keepa.com/app/stats/?type=uninstall&version=" + J + "." + r.version);
    } catch (a) {
    }
    try {
      !t && p && "neebplgakaahbhdphmkckjjcegoiijjo" != chrome.runtime.id && "ipbakfmnjdenbmoenhicfmoojdojjjem" != chrome.runtime.id && chrome.notifications.create("unvalidInstallSource", {type:"basic", iconUrl:"../../icons/i100.png", title:"Your Keepa installation is not from an official source!", message:"Please uninstall Keepa and reinstall it from the Chrome Web Store", buttons:[{title:"Open Chrome Web Store", iconUrl:"../../icons/i16.png"}], priority:2}, function(a) {
      });
    } catch (a) {
      r.reportBug(a);
    }
    p && setTimeout(function() {
      h.get("noFreshInstall", function(a) {
        if ("undefined" == typeof a.noFreshInstall) {
          try {
            h.set("noFreshInstall", 1), chrome.notifications.create("firstInstall", {type:"basic", iconUrl:"../../icons/i100.png", title:"Hi there and thanks for using Keepa!", message:"This extension does not add any context menus or browser buttons. You can access it directly on any Amazon product page.", priority:2}, function(a) {
            });
          } catch (c) {
            r.reportBug(c);
          }
        }
      });
    }, 3000);
    h.get(["s_merchantChart", "token"], function(a) {
      void 0 != a.s_merchantChart && void 0 != a.token && 64 == a.token.length || r.resetSettings();
    });
    (p || t || x || C) && window.setTimeout(function() {
      v.initWebSocket();
    }, 1000);
  }, unregister:function() {
  }, log:function(a) {
    h.log(a);
  }, lastBugReport:0, reportBug:function(a) {
    h.get(["install", "token"], function(b) {
      var d = b.install, c = Date.now();
      if (!(12E5 > c - r.lastBugReport || /(dead object)|(Script error)|(\.location is null)/i.test(a))) {
        r.lastBugReport = c;
        var f = "bug";
        try {
          c = {};
          for (var h in navigator) {
            !navigator.hasOwnProperty(h) || "string" != typeof navigator[h] && "number" != typeof navigator[h] || (c[h] = navigator[h]);
          }
          f = JSON.stringify(c, null, "&emsp;").replace(/(\r\n)|\n/g, "<br>");
        } catch (G) {
        }
        var k = "";
        h = r.version;
        try {
          k = Error().stack.split("\n").splice(1).splice(1).join("&ensp;&lArr;&ensp;");
        } catch (G) {
        }
        try {
          k = k.replace(/chrome-extension:\/\/.*?\/content\//g, "").replace(/:[0-9]*?\)/g, ")").replace(/[ ]{2,}/g, "");
        } catch (G) {
        }
        try {
          k = '<span style="color: #999; font-size: xx-small">' + J + ":" + h + "-" + d + "&emsp;" + k + "</span>";
        } catch (G) {
        }
        setTimeout(function() {
          r.httpPost("https://dyn.keepa.com/service/bugreport/?user=" + b.token + "&type=" + Y, a + "<br><br>" + k + "<br><br>" + f, null, !1);
        }, 50);
      }
    });
  }, httpGet:function(a, b, d) {
    var c = new XMLHttpRequest;
    b && (c.onreadystatechange = function() {
      4 == c.readyState && b.call(this, c.responseText);
    });
    c.withCredentials = d;
    c.open("GET", a, !0);
    c.send();
  }, httpPost:function(a, b, d, f) {
    var c = new XMLHttpRequest;
    d && (c.onreadystatechange = function() {
      4 == c.readyState && d.call(this, c.responseText);
    });
    c.withCredentials = f;
    c.open("POST", a, !0);
    c.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    c.send(b);
  }};
  window.onerror = function(a, b, d, f, h) {
    "object" === typeof a && a.srcElement && a.target && (a = "[object HTMLScriptElement]" == a.srcElement && "[object HTMLScriptElement]" == a.target ? "Error loading script" : "Event Error - target:" + a.target + " srcElement:" + a.srcElement);
    a = a.toString();
    var c = "";
    f = f || 0;
    var k = h.stack;
    if (h && k) {
      c = k;
      try {
        c = k.split("\n").splice(1).splice(1).join("&ensp;&lArr;&ensp;"), c = c.replace(/http|s:\/\/.*?\//g, "").replace(/:[0-9]*?\)/g, ")").replace(/[ ]{2,}/g, "");
      } catch (G) {
      }
    }
    a = "error: " + a + " url: " + (b || document.location.toString()) + " line: " + parseInt(d || 0) + " col: " + parseInt(f || 0) + " date: " + new Date + " stack: " + c;
    r.reportBug(a);
    return !1;
  };
  var N = 0;
  if (p || t || x || C) {
    var v = {server:["wss://dyn.keepa.com"], serverIndex:0, clearTimeout:0, webSocket:null, sendPlainMessage:function(a) {
      F || (a = JSON.stringify(a), v.webSocket.send(pako.deflate(a)));
    }, sendMessage:function(a) {
      if (!F) {
        z.clearIframe();
        var c = pako.deflate(JSON.stringify(a));
        z.clearMessage();
        v.webSocket.send(c);
        403 == a.status && z.endSession(N);
        b[f][q]();
      }
    }, initWebSocket:function() {
      F || h.get(["token", "optOut_crawl"], function(a) {
        var b = a.token, d = a.optOut_crawl;
        if (b && 64 == b.length) {
          var f = function() {
            delete localStorage.session;
            if (null == v.webSocket || 1 != v.webSocket.readyState) {
              v.serverIndex++;
              v.serverIndex %= v.server.length;
              if ("undefined" == typeof d || "undefined" == d || null == d || "null" == d) {
                d = "0";
              }
              k && (d = "1");
              var a = new WebSocket(v.server[v.serverIndex] + "/apps/cloud/?user=" + b + "&app=" + J + "&version=" + r.version + "&optOut=" + d);
              a.binaryType = "arraybuffer";
              a.onmessage = function(a) {
                a = a.data;
                a instanceof ArrayBuffer && (a = pako.inflate(a, {to:"string"}));
                a = JSON.parse(a);
                108 != a.status && (a.domainId && (N = a.domainId), z.clearIframe(), z.onMessage(a));
              };
              a.onclose = function() {
                setTimeout(function() {
                  f();
                }, 6E5 * Math.random());
              };
              a.onerror = function() {
                a.close();
              };
              a.onopen = function() {
                z.abortJob(414);
              };
              v.webSocket = a;
            }
          };
          f();
        }
      });
    }};
  }
  if (p || t || x || C) {
    var z = function() {
      function a(a) {
        try {
          m.stats.times.push(a), m.stats.times.push(Date.now() - m.stats.start);
        } catch (g) {
        }
      }
      function c(b, c) {
        b.sent = !0;
        a(25);
        var l = b.key, d = b.messageId;
        b = b.stats;
        try {
          var e = B[E]["session-id"];
        } catch (O) {
          e = "";
        }
        l = {key:l, messageId:d, stats:b, sessionId:e, payload:[], status:200};
        for (var g in c) {
          l[g] = c[g];
        }
        return l;
      }
      function d(b) {
        E = m.domainId;
        P = p(B);
        "object" != typeof B[E] && (B[E] = {});
        "undefined" == typeof m.headers.Accept && (m.headers.Accept = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*!/!*;q=0.8");
        k(b, !b.isAjax, function(d) {
          a(0);
          var l = {payload:[]};
          if (d.match(R)) {
            l.status = 403;
          } else {
            if (b.contentFilters && 0 < b.contentFilters.length) {
              for (var g in b.contentFilters) {
                var e = d.match(new RegExp(b.contentFilters[g]));
                if (e) {
                  l.payload[g] = e[1].replace(/\n/g, "");
                } else {
                  l.status = 305;
                  l.payload[g] = d;
                  break;
                }
              }
            } else {
              l.payload = [d];
            }
          }
          try {
            b.stats.times.push(3), b.stats.times.push(r.lastBugReport);
          } catch (y) {
          }
          "undefined" == typeof b.sent && (l = c(b, l), v.sendMessage(l));
        });
      }
      function h(b) {
        E = m.domainId;
        P = p(B);
        "object" != typeof B[E] && (B[E] = {});
        "undefined" == typeof m.headers.Accept && (m.headers.Accept = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*!/!*;q=0.8");
        a(4);
        k(b, !b.isAjax, function(d, l) {
          a(6);
          if ("undefined" == typeof b.sent) {
            var g = {};
            try {
              for (var e = d.evaluate("//comment()", d, null, XPathResult.ANY_TYPE, null), f = e.iterateNext(), h = ""; f;) {
                h += f.textContent, f = e.iterateNext();
              }
              if (d.querySelector("body").textContent.match(R) || h.match(R)) {
                g.status = 403;
                if ("undefined" != typeof b.sent) {
                  return;
                }
                g = c(b, g);
                v.sendMessage(g);
                return;
              }
            } catch (D) {
            }
            a(7);
            if (b.scrapeFilters && 0 < b.scrapeFilters.length) {
              var k = {}, m = {}, H = {}, q = "", t = null, x = function() {
                if ("" === q) {
                  g.payload = [t];
                  g.scrapedData = H;
                  for (var a in m) {
                    g[a] = m[a];
                  }
                } else {
                  g.status = 305, g.payload = [t, q, ""];
                }
                try {
                  b.stats.times.push(99), b.stats.times.push(r.lastBugReport);
                } catch (ca) {
                }
                "undefined" == typeof b.sent && (g = c(b, g), v.sendMessage(g));
              }, z = function(a, b, c) {
                var g = [];
                if (!a.selector) {
                  if (!a.regExp) {
                    return q = "invalid selector, sel/regexp", !1;
                  }
                  g = d.querySelector("html").innerHTML.match(new RegExp(a.regExp));
                  if (!g || g.length < a.reGroup) {
                    c = "regexp fail: html - " + a.name + c;
                    if (!1 === a.optional) {
                      return q = c, !1;
                    }
                    t += " // " + c;
                    return !0;
                  }
                  return g[a.reGroup];
                }
                var e = b.querySelectorAll(a.selector);
                0 == e.length && (e = b.querySelectorAll(a.altSelector));
                if (0 == e.length) {
                  if (!0 === a.optional) {
                    return !0;
                  }
                  q = "selector no match: " + a.name + c;
                  return !1;
                }
                if (a.parentSelector && (e = [e[0].parentNode.querySelector(a.parentSelector)], null == e[0])) {
                  if (!0 === a.optional) {
                    return !0;
                  }
                  q = "parent selector no match: " + a.name + c;
                  return !1;
                }
                if ("undefined" != typeof a.multiple && null != a.multiple && (!0 === a.multiple && 1 > e.length || !1 === a.multiple && 1 < e.length)) {
                  c = "selector multiple mismatch: " + a.name + c + " found: " + e.length;
                  if (!1 === a.optional) {
                    return q = c, !1;
                  }
                  t += " // " + c;
                  return !0;
                }
                if (a.isListSelector) {
                  return k[a.name] = e, !0;
                }
                if (!a.attribute) {
                  return q = "selector attribute undefined?: " + a.name + c, !1;
                }
                for (var l in e) {
                  if (e.hasOwnProperty(l)) {
                    var f = e[l];
                    if (!f) {
                      break;
                    }
                    if (a.childNode) {
                      a.childNode = Number(a.childNode);
                      b = f.childNodes;
                      if (b.length < a.childNode) {
                        c = "childNodes fail: " + b.length + " - " + a.name + c;
                        if (!1 === a.optional) {
                          return q = c, !1;
                        }
                        t += " // " + c;
                        return !0;
                      }
                      f = b[a.childNode];
                    }
                    b = null;
                    "text" == a.attribute ? b = f.textContent : "html" != a.attribute && (b = f.getAttribute(a.attribute));
                    if (!b || 0 == b.length || 0 == b.replace(/(\r\n|\n|\r)/gm, "").replace(/^\s+|\s+$/g, "").length) {
                      c = "selector attribute null: " + a.name + c;
                      if (!1 === a.optional) {
                        return q = c, !1;
                      }
                      t += " // " + c;
                      return !0;
                    }
                    if (a.regExp) {
                      f = b.match(new RegExp(a.regExp));
                      if (!f || f.length < a.reGroup) {
                        c = "regexp fail: " + b + " - " + a.name + c;
                        if (!1 === a.optional) {
                          return q = c, !1;
                        }
                        t += " // " + c;
                        return !0;
                      }
                      g.push("undefined" == typeof f[a.reGroup] ? f[0] : f[a.reGroup]);
                    } else {
                      g.push(b);
                    }
                    if (!a.multiple) {
                      break;
                    }
                  }
                }
                return a.multiple ? g : g[0];
              };
              f = !1;
              e = {};
              for (var A in b.scrapeFilters) {
                e.pageType = A;
                if (f) {
                  break;
                }
                e.pageFilter = b.scrapeFilters[e.pageType];
                e.pageVersionTest = e.pageFilter.pageVersionTest;
                h = d.querySelectorAll(e.pageVersionTest.selector);
                0 == h.length && (h = d.querySelectorAll(e.pageVersionTest.altSelector));
                if (0 != h.length) {
                  if ("undefined" != typeof e.pageVersionTest.multiple && null != e.pageVersionTest.multiple) {
                    if (!0 === e.pageVersionTest.multiple && 2 > h.length) {
                      continue;
                    }
                    if (!1 === e.pageVersionTest.multiple && 1 < h.length) {
                      continue;
                    }
                  }
                  if (e.pageVersionTest.attribute) {
                    var p = null;
                    p = "text" == e.pageVersionTest.attribute ? "" : h[0].getAttribute(e.pageVersionTest.attribute);
                    if (null == p) {
                      continue;
                    }
                  }
                  var B = e.pageType;
                  e.revealMAP = e.pageFilter.revealMAP;
                  e.revealed = !1;
                  e.afterAjaxFinished = function(c) {
                    return function() {
                      var e = 0, l = [], f = 500, h = [], q = !1;
                      a(26);
                      var n = {}, r;
                      for (r in c.pageFilter) {
                        if (n.sel = c.pageFilter[r], !(n.sel.name == c.pageVersionTest.name || c.revealed && "revealMAP" == n.sel.name)) {
                          var v = d;
                          if (n.sel.parentList) {
                            var u = [];
                            if ("undefined" != typeof k[n.sel.parentList]) {
                              u = k[n.sel.parentList];
                            } else {
                              if (!0 === z(c.pageFilter[n.sel.parentList], v, c.pageType)) {
                                u = k[n.sel.parentList];
                              } else {
                                break;
                              }
                            }
                            m[n.sel.parentList] || (m[n.sel.parentList] = []);
                            v = 0;
                            n.appendedHTMLOnce = !1;
                            var y = {}, D;
                            for (D in u) {
                              if (u.hasOwnProperty(D)) {
                                if ("stock" == n.sel.name) {
                                  v++;
                                  try {
                                    var w = void 0, p = void 0;
                                    n.sel.selector && (w = u[D].querySelector(n.sel.selector));
                                    n.sel.altSelector && (p = u[D].querySelector(n.sel.altSelector));
                                    p && (p = p.getAttribute(n.sel.attribute));
                                    if (w && p) {
                                      var A = w.querySelector('input[type="submit"]'), B = document.createElement("input");
                                      B.name = A.getAttribute("name");
                                      B.value = A.getAttribute("value");
                                      var O = document.createElement("input");
                                      O.type = "hidden";
                                      var S = n.sel.regExp.split(";");
                                      O.name = S[0];
                                      O.value = S[1];
                                      h.push(p);
                                      w.appendChild(O);
                                      w.appendChild(B);
                                      var E = Array.from((new FormData(w)).entries());
                                      y.postData = [];
                                      for (p = 0; p < E.length; p++) {
                                        var L = E[p];
                                        null != L && 2 == L.length && ("mbbq" == L[0] && (L[1] = 0), y.postData.push(L[0] + "=" + encodeURIComponent(L[1])));
                                      }
                                      y.postData = y.postData.join("&").replace(/%20/g, "+");
                                      y.url = "https://" + (new URL(b.url)).hostname + w.getAttribute("action");
                                      f = n.sel.reGroup;
                                      l.push(function(a, c) {
                                        return function() {
                                          var d = 0 == l.length;
                                          e++;
                                          var f = new XMLHttpRequest, k = !1, u = function() {
                                            k = !0;
                                            0 == --e && 0 == l.length ? x() : l.shift()();
                                          }, y = setTimeout(u, 4000), n = function(c) {
                                            for (var e = 0; e < h.length; e++) {
                                              var l = h[e];
                                              try {
                                                var f = 0;
                                                a: for (; f < m[a.sel.parentList].length; f++) {
                                                  var k = -1, u = m[a.sel.parentList][f];
                                                  if (!(u[a.sel.name] >= k)) {
                                                    for (var n in u) {
                                                      if (u[n] == l) {
                                                        var y = JSON.parse(a.sel.childNode);
                                                        y[0] = y[0].replace("[ID]", l);
                                                        var p = c.match(new RegExp(y[0]));
                                                        if (p && !(2 > p.length)) {
                                                          var D = p[1].match(new RegExp(y[1]));
                                                          D && 2 == p.length && (k = D[1], !u[a.sel.name] || u[a.sel.name] < k) && (m[a.sel.parentList][f][a.sel.name] = k);
                                                          break a;
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              } catch (ea) {
                                                try {
                                                  a.appendedHTMLOnce || (a.appendedHTMLOnce = !0, g.payload || (g.payload = [""]), null == g.payload[0] && (g.payload[0] = ""), g.payload[0] += " // toofast", b.dbg2 && g.payload.push(c));
                                                } catch (fa) {
                                                }
                                              }
                                            }
                                            !q && 0 < c.indexOf(a.sel.parentSelector) && (q = !0);
                                            return !d;
                                          };
                                          f.onreadystatechange = function() {
                                            k || 4 != f.readyState || (clearTimeout(y), 200 == f.status && !n(f.responseText) && q && (e++, C(c.url, "GET", null, 4000, function(a) {
                                              n(a);
                                              0 == --e && 0 == l.length && x();
                                            })), 0 == --e && 0 == l.length && x());
                                          };
                                          f.onerror = u;
                                          f.open("POST", c.url, !0);
                                          f.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                                          f.send(c.postData);
                                        };
                                      }(n, y));
                                    }
                                  } catch (aa) {
                                  }
                                } else {
                                  if ("revealMAP" == n.sel.name) {
                                    if (y.revealMAP$28 = n.sel, w = void 0, w = y.revealMAP$28.selector ? u[D].querySelector(y.revealMAP$28.selector) : u[D], null != w) {
                                      if (!w.textContent.match(new RegExp(y.revealMAP$28.regExp))) {
                                        continue;
                                      }
                                      w = b.url.match(/(B[A-Z0-9]{9}|\d{9}(!?X|\d))/)[1];
                                      p = c.pageFilter.sellerId;
                                      if ("undefined" == typeof p || null == p || null == w || 2 > w.length) {
                                        continue;
                                      }
                                      p = u[D].querySelector(n.sel.childNode).value;
                                      if (null == p || 20 > p + 0) {
                                        continue;
                                      }
                                      w = y.revealMAP$28.altSelector.replace("OFFERID", p).replace("ASINID", w);
                                      e++;
                                      y.mapIndex = D + "";
                                      C(w, "GET", null, 3000, function(a) {
                                        return function(b) {
                                          try {
                                            var d = c.pageFilter.price;
                                            if (d && d.regExp) {
                                              if (b.match(/no valid offer--/)) {
                                                m[a.revealMAP$28.parentList][a.mapIndex] || (m[a.revealMAP$28.parentList][a.mapIndex] = {}), m[a.revealMAP$28.parentList][a.mapIndex][a.revealMAP$28.name] = -1;
                                              } else {
                                                var g = b.match(new RegExp("price info--\x3e(?:.|\\n)*?" + d.regExp + "(?:.|\\n)*?\x3c!--")), f = b.match(/price info--\x3e(?:.|\n)*?(?:<span.*?size-small.*?">)([^]*?<\/span)(?:.|\n)*?\x3c!--/);
                                                if (!g || g.length < d.reGroup) {
                                                  t += " // " + (" priceMAP regexp fail: " + b + " - " + d.name + c.pageType);
                                                } else {
                                                  var h = g[d.reGroup];
                                                  m[a.revealMAP$28.parentList][a.mapIndex] || (m[a.revealMAP$28.parentList][a.mapIndex] = {});
                                                  m[a.revealMAP$28.parentList][a.mapIndex][a.revealMAP$28.name] = h;
                                                  null != f && 2 == f.length && (m[a.revealMAP$28.parentList][a.mapIndex][a.revealMAP$28.name + "Shipping"] = f[1].replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                                                }
                                              }
                                            }
                                          } catch (da) {
                                          }
                                          0 == --e && 0 == l.length && x();
                                        };
                                      }(y), function() {
                                        0 == --e && 0 == l.length && x();
                                      });
                                    }
                                  } else {
                                    w = z(n.sel, u[D], c.pageType);
                                    if (!1 === w) {
                                      break;
                                    }
                                    if (!0 === w) {
                                      continue;
                                    }
                                    m[n.sel.parentList][D] || (m[n.sel.parentList][D] = {});
                                    if (n.sel.multiple) {
                                      for (var F in w) {
                                        w.hasOwnProperty(F) && (w[F] = w[F].replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                                      }
                                      w = w.join("\u271c\u271c");
                                      m[n.sel.parentList][D][n.sel.name] = w;
                                    } else {
                                      m[n.sel.parentList][D][n.sel.name] = w.replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " ");
                                    }
                                  }
                                }
                                y = {url:y.url, postData:y.postData, revealMAP$28:y.revealMAP$28, mapIndex:y.mapIndex};
                              }
                            }
                          } else {
                            u = z(n.sel, v, c.pageType);
                            if (!1 === u) {
                              break;
                            }
                            if (!0 === u) {
                              continue;
                            }
                            if (n.sel.multiple) {
                              for (var G in u) {
                                u.hasOwnProperty(G) && (u[G] = u[G].replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                              }
                              u = u.join();
                            } else {
                              u = u.replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " ");
                            }
                            H[n.sel.name] = u;
                          }
                          n = {sel:n.sel, appendedHTMLOnce:n.appendedHTMLOnce};
                        }
                      }
                      try {
                        if (1 == l.length || (f + "").endsWith("8")) {
                          l.shift()();
                        } else {
                          for (n = 0; n < l.length; n++) {
                            setTimeout(function() {
                              0 < l.length && l.shift()();
                            }, n * f);
                          }
                        }
                      } catch (aa) {
                      }
                      0 == e && 0 == l.length && x();
                    };
                  }(e);
                  if (e.revealMAP) {
                    if (f = d.querySelector(e.revealMAP.selector), null != f) {
                      e.url = f.getAttribute(e.revealMAP.attribute);
                      if (null == e.url || 0 == e.url.length) {
                        e.afterAjaxFinished();
                        break;
                      }
                      0 != e.url.indexOf("http") && (f = document.createElement("a"), f.href = b.url, e.url = f.origin + e.url);
                      H[e.revealMAP.name] = "1";
                      e.url = e.url.replace(/(mapPopover.*?)(false)/, "$1true");
                      e.xhr = new XMLHttpRequest;
                      e.hasTimeout = !1;
                      e.ti = setTimeout(function(a) {
                        return function() {
                          a.hasTimeout = !0;
                          a.afterAjaxFinished();
                        };
                      }(e), 4000);
                      e.xhr.onreadystatechange = function(a) {
                        return function() {
                          if (!a.hasTimeout && 4 == a.xhr.readyState) {
                            clearTimeout(a.ti);
                            if (200 == a.xhr.status) {
                              var b = a.xhr.responseText;
                              if (a.revealMAP.regExp) {
                                var c = b.match(new RegExp(a.revealMAP.regExp));
                                if (!c || c.length < a.revealMAP.reGroup) {
                                  if (c = d.querySelector(a.revealMAP.selector)) {
                                    var g = c.cloneNode(!1);
                                    g.innerHTML = b;
                                    c.parentNode.replaceChild(g, c);
                                  }
                                } else {
                                  H[a.revealMAP.name] = c[a.revealMAP.reGroup], H[a.revealMAP.name + "url"] = a.url;
                                }
                              }
                            }
                            a.revealed = !0;
                            a.afterAjaxFinished();
                          }
                        };
                      }(e);
                      e.xhr.onerror = e.afterAjaxFinished;
                      e.xhr.open("GET", e.url, !0);
                      e.xhr.send();
                    } else {
                      e.afterAjaxFinished();
                    }
                  } else {
                    e.afterAjaxFinished();
                  }
                  f = !0;
                  e = {pageFilter:e.pageFilter, pageVersionTest:e.pageVersionTest, revealed:e.revealed, pageType:e.pageType, hasTimeout:e.hasTimeout, afterAjaxFinished:e.afterAjaxFinished, xhr:e.xhr, ti:e.ti, revealMAP:e.revealMAP, url:e.url};
                }
              }
              a(8);
              if (null == B) {
                q += " // no pageVersion matched";
                g.payload = [t, q, b.dbg1 ? l : ""];
                g.status = 308;
                a(10);
                try {
                  b.stats.times.push(99), b.stats.times.push(r.lastBugReport);
                } catch (D) {
                }
                "undefined" == typeof b.sent && (g = c(b, g), v.sendMessage(g));
              }
            } else {
              a(9), g.status = 306, "undefined" == typeof b.sent && (g = c(b, g), v.sendMessage(g));
            }
          }
        });
      }
      function k(c, d, h) {
        I = c;
        var g = c.messageId;
        setTimeout(function() {
          null != I && I.messageId == g && (I = I = null);
        }, c.timeout);
        c.onDone = function() {
          I = null;
        };
        if (d) {
          a(11), d = document.getElementById("keepa_data"), d.removeAttribute("srcdoc"), d.src = c.url;
        } else {
          if (1 == c.httpMethod && (c.scrapeFilters && 0 < c.scrapeFilters.length && (K = c), !N && (N = !0, c.l && 0 < c.l.length))) {
            for (d = 0; d < c.l.length; d++) {
              var e = c.l[d];
              try {
                for (var l = window, k = 0; k < e.path.length - 1; k++) {
                  l = l[e.path[k]];
                }
                if (e.b) {
                  l[e.path[k]](M[e.index], e.a, e.b);
                } else {
                  l[e.path[k]](M[e.index], e.a);
                }
              } catch (S) {
              }
            }
            b[f][q]();
          }
          C(c.url, V[c.httpMethod], c.postData, c.timeout, function(d) {
            a(12);
            if ("o0" == c.key) {
              h(d);
            } else {
              var e = document.getElementById("keepa_data_2");
              e.src = "";
              d = d.replace(/src=".*?"/g, 'src=""');
              m.block && (d = d.replace(new RegExp(m.block, "g"), ""));
              a(13);
              var g = !1;
              e.srcdoc = d;
              a(18);
              e.onload = function() {
                a(19);
                g || (e.onload = void 0, g = !0, a(20), setTimeout(function() {
                  a(21);
                  var b = document.getElementById("keepa_data_2").contentWindow;
                  try {
                    h(b.document, d);
                  } catch (Z) {
                    r.reportBug(Z), J(410);
                  }
                }, 80));
              };
              b[f][q]();
            }
          });
        }
      }
      function t() {
        try {
          var a = document.getElementById("keepa_data");
          a.src = "";
          a.removeAttribute("srcdoc");
        } catch (H) {
        }
        try {
          var b = document.getElementById("keepa_data_2");
          b.src = "";
          b.removeAttribute("srcdoc");
        } catch (H) {
        }
        I = null;
      }
      function C(b, c, d, f, e) {
        var g = new XMLHttpRequest;
        if (e) {
          var l = !1, h = setTimeout(function() {
            l = !0;
            z.abortJob(413);
          }, f || 15000);
          g.onreadystatechange = function() {
            l || (2 == g.readyState && a(27), 4 == g.readyState && (clearTimeout(h), a(29), 503 != g.status && (0 == g.status || 399 < g.status) ? z.abortJob(415, [g.status]) : 50 > g.responseText.length && c == V[0] ? z.abortJob(416) : e.call(this, g.responseText)));
          };
          g.onerror = function() {
            z.abortJob(408);
          };
        }
        g.open(c, b, !0);
        null == d ? g.send() : g.send(d);
      }
      function p(a) {
        var b = "", c = "", d;
        for (d in a[E]) {
          b += c + d + "=" + a[E][d] + ";", c = " ";
        }
        return b;
      }
      function F(a) {
        delete B["" + a];
        localStorage.cache = pako.deflate(JSON.stringify(B), {to:"string"});
      }
      function J(a, d) {
        if (null != m) {
          if ("undefined" != typeof m.sent) {
            return;
          }
          var g = c(m, {});
          d && (g.payload = d);
          g.status = a;
          v.sendMessage(g);
          t();
        }
        b[f][q]();
      }
      var K = null, m = null, R = /automated access/, M = [function(a) {
        if (!(20 < W) && null == m && 0 < a.url.indexOf("eywords")) {
          var b = a.url.match(/^https?:\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|jp|ca|fr|es|it|cn|in|com\.mx|com\.br)\/(?:.*?arch\/ajax|s)\/.*?rh=(.*?)(?:$|&)/), c = 0;
          null != b && 3 == b.length ? c = 200 : (b = a.url.match(/^https?:\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|jp|ca|fr|es|it|cn|in|com\.mx|com\.br)\/(?:.*?arch\/ajax|s)\/.*?words=(.*?)(?:$|&)/), null != b && 3 == b.length && (c = 201));
          0 != c && (a = (b[1] + b[2]).hashCode(), T[a] || (T[a] = 1, 20 < ++W && (T = {}), v.sendPlainMessage({key:"i1", payload:[b[1], b[2]], status:c})));
        }
      }, function(a) {
        if (null != m) {
          var b = !0;
          if (m.url == a.url) {
            Q = a.frameId, U = a.tabId, X = a.parentFrameId, b = !1;
          } else {
            if (Q == a.parentFrameId || X == a.parentFrameId || Q == a.frameId) {
              b = !1;
            }
          }
          if (-2 != Q && U == a.tabId) {
            a = a.requestHeaders;
            var c = {};
            (m.timeout + "").endsWith("108") || (m.headers.Cookie = b ? "" : P);
            for (var d in m.headers) {
              b = !1;
              for (var e = 0; e < a.length; ++e) {
                if (a[e].name.toLowerCase() == d.toLowerCase()) {
                  "" == m.headers[d] ? a.splice(e, 1) : a[e].value = m.headers[d];
                  b = !0;
                  break;
                }
              }
              b || "" == m.headers[d] || a.push({name:x ? d.toLowerCase() : d, value:m.headers[d]});
            }
            c.requestHeaders = a;
            return c;
          }
        }
      }, function(a) {
        var b = a.responseHeaders;
        try {
          if (U != a.tabId || null == m) {
            return;
          }
          for (var c = !1, d = 0; d < b.length; ++d) {
            var e = b[d], f = e.name.toLowerCase();
            if ("set-cookie" == f) {
              var h = e.value.substring(0, e.value.indexOf(";")), k = h.indexOf("="), l = [h.substring(0, k), h.substring(k + 1)];
              b.splice(d, 1);
              d--;
              2 != l.length || "undefined" != typeof B[E][l[0]] && B[E][l[0]] == l[1] || (c = !0, B[E][l[0]] = l[1]);
            } else {
              "x-frame-options" == f && (b.splice(d, 1), d--);
            }
          }
          !(m.timeout + "").endsWith("108") && c && m.url == a.url && (localStorage.cache = pako.deflate(JSON.stringify(B), {to:"string"}), P = p(B));
        } catch (ba) {
        }
        return {responseHeaders:b};
      }, function(a) {
        if (null != m && m.url == a.url) {
          var b = 0;
          switch(a.error) {
            case "net::ERR_TUNNEL_CONNECTION_FAILED":
              b = 510;
              break;
            case "net::ERR_INSECURE_RESPONSE":
              b = 511;
              break;
            case "net::ERR_CONNECTION_REFUSED":
              b = 512;
              break;
            case "net::ERR_BAD_SSL_CLIENT_AUTH_CERT":
              b = 513;
              break;
            case "net::ERR_CONNECTION_CLOSED":
              b = 514;
              break;
            case "net::ERR_NAME_NOT_RESOLVED":
              b = 515;
              break;
            case "net::ERR_NAME_RESOLUTION_FAILED":
              b = 516;
              break;
            case "net::ERR_ABORTED":
            case "net::ERR_CONNECTION_ABORTED":
              b = 517;
              break;
            case "net::ERR_CONTENT_DECODING_FAILED":
              b = 518;
              break;
            case "net::ERR_NETWORK_ACCESS_DENIED":
              b = 519;
              break;
            case "net::ERR_NETWORK_CHANGED":
              b = 520;
              break;
            case "net::ERR_INCOMPLETE_CHUNKED_ENCODING":
              b = 521;
              break;
            case "net::ERR_CONNECTION_TIMED_OUT":
            case "net::ERR_TIMED_OUT":
              b = 522;
              break;
            case "net::ERR_CONNECTION_RESET":
              b = 523;
              break;
            case "net::ERR_NETWORK_IO_SUSPENDED":
              b = 524;
              break;
            case "net::ERR_EMPTY_RESPONSE":
              b = 525;
              break;
            case "net::ERR_SSL_PROTOCOL_ERROR":
              b = 526;
              break;
            case "net::ERR_ADDRESS_UNREACHABLE":
              b = 527;
              break;
            case "net::ERR_INTERNET_DISCONNECTED":
              b = 528;
              break;
            case "net::ERR_BLOCKED_BY_ADMINISTRATOR":
              b = 529;
              break;
            case "net::ERR_SSL_VERSION_OR_CIPHER_MISMATCH":
              b = 530;
              break;
            case "net::ERR_CONTENT_LENGTH_MISMATCH":
              b = 531;
              break;
            case "net::ERR_PROXY_CONNECTION_FAILED":
              b = 532;
              break;
            default:
              b = 533;
              return;
          }
          setTimeout(function() {
            z.setStatTime(33);
            z.abortJob(b);
          }, 0);
        }
      }], N = !1, I = null, V = ["GET", "HEAD", "POST", "PUT", "DELETE"], B = {}, P = "", E = 1;
      try {
        localStorage.cache && (B = JSON.parse(pako.inflate(localStorage.cache, {to:"string"})));
      } catch (l) {
        setTimeout(function() {
          r.reportBug(l);
        }, 2000);
      }
      var Q = -2, U = -2, X = -2, T = {}, W = 0;
      return {onMessage:function(a) {
        switch(a.key) {
          case "o0":
          case "o1":
            m = a, m.stats = {start:Date.now(), times:[]};
        }
        switch(a.key) {
          case "update":
            chrome.runtime.requestUpdateCheck(function(a, b) {
              "update_available" == a && chrome.runtime.reload();
            });
            break;
          case "o0":
            z.clearIframe();
            d(a);
            break;
          case "o1":
            z.clearIframe();
            h(a);
            break;
          case "o2":
            F(a.domainId);
            break;
          case "o3":
            document.location.reload(!1);
        }
      }, clearIframe:t, endSession:F, getOutgoingMessage:c, setStatTime:a, getFilters:function() {
        return K;
      }, getMessage:function() {
        return m;
      }, clearMessage:function() {
        m = null;
      }, abortJob:J};
    }();
  }
})();

