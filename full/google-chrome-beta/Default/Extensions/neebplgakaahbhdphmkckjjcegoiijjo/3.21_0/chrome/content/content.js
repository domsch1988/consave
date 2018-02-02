var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.checkStringArgs = function(c, p, k) {
  if (null == c) {
    throw new TypeError("The 'this' value for String.prototype." + k + " must not be null or undefined");
  }
  if (p instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + k + " must not be a regular expression");
  }
  return c + "";
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(c, p, k) {
  c != Array.prototype && c != Object.prototype && (c[p] = k.value);
};
$jscomp.getGlobal = function(c) {
  return "undefined" != typeof window && window === c ? c : "undefined" != typeof global && null != global ? global : c;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(c, p, k, z) {
  if (p) {
    k = $jscomp.global;
    c = c.split(".");
    for (z = 0; z < c.length - 1; z++) {
      var r = c[z];
      r in k || (k[r] = {});
      k = k[r];
    }
    c = c[c.length - 1];
    z = k[c];
    p = p(z);
    p != z && null != p && $jscomp.defineProperty(k, c, {configurable:!0, writable:!0, value:p});
  }
};
$jscomp.polyfill("String.prototype.startsWith", function(c) {
  return c ? c : function(c, k) {
    var p = $jscomp.checkStringArgs(this, c, "startsWith");
    c += "";
    var r = p.length, B = c.length;
    k = Math.max(0, Math.min(k | 0, p.length));
    for (var C = 0; C < B && k < r;) {
      if (p[k++] != c[C++]) {
        return !1;
      }
    }
    return C >= B;
  };
}, "es6", "es3");
$jscomp.polyfill("Object.is", function(c) {
  return c ? c : function(c, k) {
    return c === k ? 0 !== c || 1 / c === 1 / k : c !== c && k !== k;
  };
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.includes", function(c) {
  return c ? c : function(c, k) {
    var p = this;
    p instanceof String && (p = String(p));
    var r = p.length;
    for (k = k || 0; k < r; k++) {
      if (p[k] == c || Object.is(p[k], c)) {
        return !0;
      }
    }
    return !1;
  };
}, "es7", "es3");
$jscomp.polyfill("String.prototype.includes", function(c) {
  return c ? c : function(c, k) {
    return -1 !== $jscomp.checkStringArgs(this, c, "includes").indexOf(c, k || 0);
  };
}, "es6", "es3");
var scanner = function() {
  function c(c, k, b, p, r, t) {
    var a = new XMLHttpRequest, d = !1, q = setTimeout(function() {
      d = !0;
      t();
    }, p || 4000);
    a.onreadystatechange = function() {
      d || (clearTimeout(q), r(a));
    };
    a.onerror = t;
    a.open(k, c, !0);
    null == b ? a.send() : a.send(b);
  }
  function p(k, p) {
    for (var b = {}, v = document.evaluate("//comment()", document, null, XPathResult.ANY_TYPE, null), r = v.iterateNext(), t = ""; r;) {
      t += r, r = v.iterateNext();
    }
    v = document.body.textContent.match(/you're not a robot/);
    r = t.match(/automated access/);
    t = t.match(/ref=cs_503_link/);
    if (v || r) {
      b.status = 403, p(b);
    } else {
      if (t) {
        b.status = 503, p(b);
      } else {
        var a = 0;
        if (k.scrapeFilters && 0 < k.scrapeFilters.length) {
          t = {};
          v = null;
          var d = "", q = null, g = {}, f = {}, e = !1, h = function(a, b, f) {
            var l = [];
            if (!a.selector) {
              if (!a.regExp) {
                return d = "invalid selector, sel/regexp", !1;
              }
              var c = document.getElementsByTagName("html")[0].innerHTML.match(new RegExp(a.regExp));
              if (!c || c.length < a.reGroup) {
                c = "regexp fail: html - " + a.name + f;
                if (!1 === a.optional) {
                  return d = c, !1;
                }
                q += " // " + c;
                return !0;
              }
              return c[a.reGroup];
            }
            c = b.querySelectorAll(a.selector);
            0 == c.length && (c = b.querySelectorAll(a.altSelector));
            if (0 == c.length) {
              if (!0 === a.optional) {
                return !0;
              }
              d = "selector no match: " + a.name + f;
              return !1;
            }
            if (a.parentSelector && (c = [c[0].parentNode.querySelector(a.parentSelector)], null == c[0])) {
              if (!0 === a.optional) {
                return !0;
              }
              d = "parent selector no match: " + a.name + f;
              return !1;
            }
            if ("undefined" != typeof a.multiple && null != a.multiple && (!0 === a.multiple && 1 > c.length || !1 === a.multiple && 1 < c.length)) {
              if (!e) {
                return e = !0, h(a, b, f);
              }
              f = "selector multiple mismatch: " + a.name + f + " found: " + c.length;
              if (!1 === a.optional) {
                a = "";
                for (var m in c) {
                  !c.hasOwnProperty(m) || 1000 < a.length || (a += " - " + m + ": " + c[m].outerHTML + " " + c[m].getAttribute("class") + " " + c[m].getAttribute("id"));
                }
                d = f + a + " el: " + b.getAttribute("class") + " " + b.getAttribute("id");
                return !1;
              }
              q += " // " + f;
              return !0;
            }
            if (a.isListSelector) {
              return g[a.name] = c, !0;
            }
            if (!a.attribute) {
              return d = "selector attribute undefined?: " + a.name + f, !1;
            }
            for (var n in c) {
              if (c.hasOwnProperty(n)) {
                m = c[n];
                if (!m) {
                  break;
                }
                if (a.childNode) {
                  a.childNode = Number(a.childNode);
                  b = m.childNodes;
                  if (b.length < a.childNode) {
                    c = "childNodes fail: " + b.length + " - " + a.name + f;
                    if (!1 === a.optional) {
                      return d = c, !1;
                    }
                    q += " // " + c;
                    return !0;
                  }
                  m = b[a.childNode];
                }
                b = null;
                "text" == a.attribute ? b = m.textContent : "html" != a.attribute && (b = m.getAttribute(a.attribute));
                if (!b || 0 == b.length || 0 == b.replace(/(\r\n|\n|\r)/gm, "").replace(/^\s+|\s+$/g, "").length) {
                  c = "selector attribute null: " + a.name + f;
                  if (!1 === a.optional) {
                    return d = c, !1;
                  }
                  q += " // " + c;
                  return !0;
                }
                if (a.regExp) {
                  m = b.match(new RegExp(a.regExp));
                  if (!m || m.length < a.reGroup) {
                    c = "regexp fail: " + b + " - " + a.name + f;
                    if (!1 === a.optional) {
                      return d = c, !1;
                    }
                    q += " // " + c;
                    return !0;
                  }
                  l.push(m[a.reGroup]);
                } else {
                  l.push(b);
                }
                if (!a.multiple) {
                  break;
                }
              }
            }
            return a.multiple ? l : l[0];
          };
          r = document;
          var E = !1, m = {}, A;
          for (A in k.scrapeFilters) {
            m.pageType = A;
            if (E) {
              break;
            }
            m.pageFilter = k.scrapeFilters[m.pageType];
            var w = m.pageFilter.pageVersionTest, l = document.querySelectorAll(w.selector);
            0 == l.length && (l = document.querySelectorAll(w.altSelector));
            if (0 != l.length) {
              if ("undefined" != typeof w.multiple && null != w.multiple) {
                if (!0 === w.multiple && 2 > l.length) {
                  continue;
                }
                if (!1 === w.multiple && 1 < l.length) {
                  continue;
                }
              }
              if (w.attribute) {
                var u = null;
                u = "text" == w.attribute ? "" : l[0].getAttribute(w.attribute);
                if (null == u) {
                  continue;
                }
              }
              v = m.pageType;
              l = {};
              for (var M in m.pageFilter) {
                if (E) {
                  break;
                }
                l.sel = m.pageFilter[M];
                if (l.sel.name != w.name) {
                  if (l.sel.parentList) {
                    u = [];
                    if ("undefined" != typeof g[l.sel.parentList]) {
                      u = g[l.sel.parentList];
                    } else {
                      if (!0 === h(m.pageFilter[l.sel.parentList], r, m.pageType)) {
                        u = g[l.sel.parentList];
                      } else {
                        break;
                      }
                    }
                    f[l.sel.parentList] || (f[l.sel.parentList] = []);
                    var C = 0;
                    l.appendedHTMLOnce = !1;
                    var n = {}, y;
                    for (y in u) {
                      if (E) {
                        break;
                      }
                      if (u.hasOwnProperty(y)) {
                        if ("stock" == l.sel.name) {
                          C++;
                          try {
                            if (n.form = void 0, n.offerId = void 0, l.sel.selector && (n.form = u[y].querySelector(l.sel.selector)), l.sel.altSelector && (n.offerId = u[y].querySelector(l.sel.altSelector)), n.offerId && (n.offerId = n.offerId.getAttribute(l.sel.attribute)), n.form) {
                              n.iframe = document.createElement("iframe");
                              n.iframe.style.display = "none";
                              n.iframe.name = l.sel.selector + "_" + n.offerId;
                              document.body.appendChild(n.iframe);
                              n.form.setAttribute("target", n.iframe.name);
                              var H = n.form.querySelector('input[type="submit"]'), I = document.createElement("input");
                              I.name = "submit.addToCart";
                              I.value = H.getAttribute("value");
                              var D = document.createElement("input");
                              D.type = "hidden";
                              var K = l.sel.regExp.split(";");
                              D.name = K[0];
                              D.value = K[1];
                              n.qtySel = JSON.parse(l.sel.childNode);
                              n.form.appendChild(D);
                              a++;
                              n.mapIndex = y + "";
                              setTimeout(function(d, q) {
                                return function() {
                                  var e = !1;
                                  d.iframe.onload = function() {
                                    if (!e) {
                                      d.iframe.onload = void 0;
                                      e = !0;
                                      var g = -1;
                                      try {
                                        for (var c = 0; c < d.qtySel.length; c++) {
                                          var h = d.qtySel[c][0];
                                          h = h.replace("[ID]", d.offerId);
                                          var l = d.qtySel[c][1], m = d.iframe.contentWindow.document.querySelector(h);
                                          if (m && (g = m.getAttribute(l))) {
                                            break;
                                          }
                                        }
                                        if (!g) {
                                          throw "not found";
                                        }
                                        f[q.sel.parentList][d.mapIndex][q.sel.name] = g;
                                      } catch (O) {
                                        try {
                                          q.appendedHTMLOnce || (q.appendedHTMLOnce = !0, b.payload || (b.payload = [""]), null == b.payload[0] && (b.payload[0] = ""), b.payload[0] += " // toofast", k.dbg2 && b.payload.push(d.iframe.contentWindow.document.body.innerHTML));
                                        } catch (Q) {
                                        }
                                      }
                                      0 == --a && p(b);
                                    }
                                  };
                                  d.form.submit();
                                };
                              }(n, l), C * l.sel.reGroup);
                            }
                          } catch (P) {
                          }
                        } else {
                          if ("revealMAP" == l.sel.name) {
                            n.revealMAP = l.sel;
                            var x = void 0;
                            x = n.revealMAP.selector ? u[y].querySelector(n.revealMAP.selector) : u[y];
                            if (null != x) {
                              if (!x.textContent.match(new RegExp(n.revealMAP.regExp))) {
                                continue;
                              }
                              x = document.location.href.match(/(B[A-Z0-9]{9}|\d{9}(!?X|\d))/);
                              x = x[1];
                              var F = m.pageFilter.sellerId;
                              if ("undefined" == typeof F || null == F || null == x || 2 > x.length) {
                                continue;
                              }
                              F = u[y].querySelector('input[name="oid"]').value;
                              if (null == F || 20 > F + 0) {
                                continue;
                              }
                              x = n.revealMAP.altSelector.replace("OFFERID", F).replace("ASINID", x);
                              a++;
                              n.mapIndex$6 = y + "";
                              c(x, "GET", null, 3000, function(d, e) {
                                return function(c) {
                                  if (4 == c.readyState) {
                                    a--;
                                    if (200 == c.status) {
                                      try {
                                        var g = c.responseText, h = d.pageFilter.price;
                                        if (h && h.regExp) {
                                          if (g.match(/no valid offer--/)) {
                                            f[e.revealMAP.parentList][e.mapIndex$6] || (f[e.revealMAP.parentList][e.mapIndex$6] = {}), f[e.revealMAP.parentList][e.mapIndex$6][e.revealMAP.name] = -1;
                                          } else {
                                            var l = g.match(new RegExp("price info--\x3e(?:.|\\n)*?" + h.regExp + "(?:.|\\n)*?\x3c!--")), m = g.match(/price info--\x3e(?:.|\n)*?(?:<span.*?size-small.*?">)([^]*?<\/span)(?:.|\n)*?\x3c!--/);
                                            if (!l || l.length < h.reGroup) {
                                              q += " // " + (" priceMAP regexp fail: " + g + " - " + h.name + d.pageType);
                                            } else {
                                              var n = l[h.reGroup];
                                              f[e.revealMAP.parentList][e.mapIndex$6] || (f[e.revealMAP.parentList][e.mapIndex$6] = {});
                                              f[e.revealMAP.parentList][e.mapIndex$6][e.revealMAP.name] = n;
                                              null != m && 2 == m.length && (f[e.revealMAP.parentList][e.mapIndex$6][e.revealMAP.name + "Shipping"] = m[1].replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                                            }
                                          }
                                        }
                                      } catch (O) {
                                      }
                                    }
                                    0 == a && p(b);
                                  }
                                };
                              }(m, n), function() {
                                0 == --a && p(b);
                              });
                            }
                          } else {
                            x = h(l.sel, u[y], m.pageType);
                            if (!1 === x) {
                              E = !0;
                              break;
                            }
                            if (!0 === x) {
                              continue;
                            }
                            f[l.sel.parentList][y] || (f[l.sel.parentList][y] = {});
                            if (l.sel.multiple) {
                              for (var z in x) {
                                x.hasOwnProperty(z) && (x[z] = x[z].replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                              }
                              x = x.join("\u271c\u271c");
                              f[l.sel.parentList][y][l.sel.name] = x;
                            } else {
                              f[l.sel.parentList][y][l.sel.name] = x.replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " ");
                            }
                          }
                        }
                        n = {iframe:n.iframe, qtySel:n.qtySel, offerId:n.offerId, mapIndex:n.mapIndex, form:n.form, revealMAP:n.revealMAP, mapIndex$6:n.mapIndex$6};
                      }
                    }
                  } else {
                    u = h(l.sel, r, m.pageType);
                    if (!1 === u) {
                      E = !0;
                      break;
                    }
                    if (!0 === u) {
                      continue;
                    }
                    if (l.sel.multiple) {
                      for (var B in u) {
                        u.hasOwnProperty(B) && (u[B] = u[B].replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                      }
                      u = u.join();
                    } else {
                      u = u.replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " ");
                    }
                    t[l.sel.name] = u;
                  }
                  l = {sel:l.sel, appendedHTMLOnce:l.appendedHTMLOnce};
                }
              }
              E = !0;
              m = {pageFilter:m.pageFilter, pageType:m.pageType};
            }
          }
          if (null == v) {
            d += " // no pageVersion matched", b.status = 308, b.payload = [q, d, k.dbg1 ? document.getElementsByTagName("html")[0].innerHTML : ""];
          } else {
            if ("" === d) {
              b.payload = [q];
              b.scrapedData = t;
              for (var L in f) {
                b[L] = f[L];
              }
            } else {
              b.status = 305, b.payload = [q, d, k.dbg2 ? document.getElementsByTagName("html")[0].innerHTML : ""];
            }
          }
        } else {
          b.status = 306;
        }
        0 == a && p(b);
      }
    }
  }
  var k = window.opera || -1 < navigator.userAgent.indexOf(" OPR/"), z = -1 < navigator.userAgent.toLowerCase().indexOf("firefox"), r = -1 < navigator.userAgent.toLowerCase().indexOf("edge/");
  r && (window.chrome = window.browser);
  var B = !0;
  !k && !z && !r || k || z || r || (B = !1);
  window.self === window.top && (B = !1);
  window.sandboxHasRun && (B = !1);
  B && (window.sandboxHasRun = !0, window.addEventListener("message", function(c) {
    if (c.source == window.parent && c.data) {
      var k = c.data.value;
      "data" == c.data.key && k.url && k.url == document.location && setTimeout(function() {
        p(k, function(b) {
          window.parent.postMessage({sandbox:b}, "*");
        });
      }, 800);
    }
  }, !1), window.parent.postMessage({sandbox:document.location + "", isUrlMsg:!0}, "*"));
  window.onerror = function(c, k, b, p, r) {
    "ipbakfmnjdenbmoenhicfmoojdojjjem" == chrome.runtime.id && console.log(r);
    window.parent.postMessage({sandbox:{status:411}}, "*");
    return !1;
  };
  return {scan:p};
}();
(function() {
  var c = window.opera || -1 < navigator.userAgent.indexOf(" OPR/"), p = -1 < navigator.userAgent.toLowerCase().indexOf("firefox"), k = -1 < navigator.userAgent.toLowerCase().indexOf("edge/"), z = p ? "firefox" : "chrome", r = !c && !p && !k, B = r ? "keepaChrome" : c ? "keepaOpera" : k ? "keepaEdge" : "keepaFirefox";
  !k || "undefined" != typeof window.chrome && "undefined" != typeof window.chrome.runtime || (window.chrome = window.browser);
  var C = !1;
  try {
    C = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
  } catch (a) {
  }
  if (r || c || p || k) {
    if (window.keepaHasRun) {
      return;
    }
    window.keepaHasRun = !0;
  }
  var v = {amazonBridge:function() {
    var a = document.getElementsByTagName("head")[0], d = document.createElement("script");
    d.type = "text/javascript";
    d.src = "https://cdn.keepa.com/selectionHook2.js";
    a.appendChild(d);
    var q = 0;
    window.addEventListener("message", function(a) {
      if ("undefined" == typeof a.data.sandbox) {
        if ("https://keepa.com" == a.origin || "https://test.keepa.com" == a.origin) {
          if (a.data.hasOwnProperty("origin") && "keepaIframe" == a.data.origin) {
            b.handleIFrameMessage(a.data.key, a.data.value, function(b) {
              try {
                a.source.postMessage({origin:"keepaContentScript", key:a.data.key, value:b, id:a.data.id}, a.origin);
              } catch (A) {
              }
            });
          } else {
            var d = a.data.split(",");
            if (2 > d.length) {
              return;
            }
            if (2 < d.length) {
              for (var e = 2, c = d.length; e < c; e++) {
                d[1] += "," + d[e];
              }
            }
            b.handleIFrameMessage(d[0], d[1], function(b) {
              a.source.postMessage({origin:"keepaContentScript", value:b}, a.origin);
            });
          }
        }
        if (a.origin.match(/^https?:\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|jp|ca|fr|es|it|cn|in|com\.mx|com\.br)/)) {
          v.staticBridge("log", "msg: " + a.data);
          try {
            var g = JSON.parse(a.data);
          } catch (m) {
            return;
          }
          (g = g.asin) && "null" != g && /(B[A-Z0-9]{9}|\d{9}(!?X|\d))/.test(g) && (g != b.ASIN ? (b.ASIN = g, b.swapIFrame()) : 0 != q ? (window.clearTimeout(q), q = 1) : q = window.setTimeout(function() {
            b.swapIFrame();
          }, 1000));
        }
      }
    });
  }, storage:chrome.storage.local, iframeBridge:function() {
  }, get:function(a, b) {
    "function" != typeof b && (b = function() {
    });
    chrome.storage.local.get(a, b);
  }, set:function(a, b, c) {
    var d = {};
    d[a] = b;
    v.storage.set(d, c);
    "token" == a && 64 == b.length && (r || p || k) && chrome.storage.sync.set({KeepaHash:b}, function() {
    });
  }, remove:function(a, b) {
    v.storage.remove(a, b);
  }, staticBridge:function(a, b) {
    switch(a) {
      case "log":
        return null;
      case "showAlert":
        return chrome.runtime.sendMessage({type:"showAlert", val:b}), null;
      default:
        return null;
    }
  }}, b = {offset:1293836400000, offsetHours:359399, domain:0, yen:String.fromCharCode(165), iframeDocument:[], iframeWindow:[], iframeDOM:[], iframeJQ:[], iframeStorage:[], ASIN:null, tld:"", placeholder:"", storageIndex:-1, cssFlex:function() {
    var a = "flex", b = ["flex", "-webkit-flex", "-moz-box", "-webkit-box", "-ms-flexbox"], c = document.createElement("flexelement"), g;
    for (g in b) {
      try {
        if ("undefined" != c.style[b[g]]) {
          a = b[g];
          break;
        }
      } catch (f) {
      }
    }
    return a;
  }(), getDomain:function(a) {
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
      case "jp":
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
        return -1;
    }
  }, revealWorking:!1, revealCache:{}, revealCacheStock:{}, revealMAP:function() {
    v.get("revealStock", function(a) {
      var d = 0;
      try {
        d = "0" != a.revealStock;
      } catch (D) {
      }
      try {
        if ((d || "com" == b.tld) && !b.revealWorking) {
          if (b.revealWorking = !0, document.getElementById("keepaMAP")) {
            b.revealWorking = !1;
          } else {
            var c = function() {
              var a = new MutationObserver(function(d) {
                setTimeout(function() {
                  b.revealMAP();
                }, 100);
                try {
                  a.disconnect();
                } catch (x) {
                }
              });
              a.observe(document.getElementById("keepaMAP").parentNode.parentNode.parentNode, {childList:!0, subtree:!0});
            }, g = function(a, d, e) {
              b.revealWorking = !1;
              var f = document.createElement("div"), q = !1, h = document.createElement("div");
              h.id = "keepaMAP";
              h.style = "font-size: 12px;color: #999;";
              var g = document.createElement("div");
              d && (q = !0, h.textContent = "Hidden Price revealed by Keepa:", g.innerHTML = b.revealCache[b.ASIN + e]);
              b.revealCacheStock[b.ASIN + e] && (g.textContent = b.revealCacheStock[b.ASIN + e], h.textContent = "Stock revealed by Keepa:", q = !0);
              q && (f.appendChild(h), f.appendChild(g), a.appendChild(f), c());
            }, f = document.location.href;
            a = function(a, d, e) {
              b.httpGet("https://www.amazon." + b.tld + "/gp/cart/desktop/ajax-mini-detail.html/ref=added_item_1?ie=UTF8&asin=" + b.ASIN + "&offerlistingid=" + a, function(c) {
                c && (c.match(/no valid offer--/) ? (b.revealCache[b.ASIN + a] = -1, b.revealCacheStock[b.ASIN + a] = 0, g(d, e, a)) : c.match(/price info--\x3e((.|\n)*?)\x3c!--/) ? (b.revealCache[b.ASIN + a] = RegExp.$1, c.match(/sc-product-scarcity">((.|\n)*?)<\//) && (b.revealCacheStock[b.ASIN + a] = RegExp.$1), (e || b.revealCacheStock[b.ASIN + a]) && g(d, e, a)) : b.reportBug("invalid MAP response: https://www.amazon.com/gp/cart/desktop/ajax-mini-detail.html/ref=added_item_1?ie=UTF8&asin=" + 
                b.ASIN + "&offerlistingid=" + a + " result: " + c));
              });
            };
            if (0 < f.indexOf("/offer-listing/")) {
              try {
                var e = document.getElementById("olpTabContent");
                if (null == e && (e = document.getElementById("olpOfferList"), null == e)) {
                  return;
                }
                var h = e.querySelector('[role="grid"]');
                if (null != h) {
                  var k = h.childNodes, m;
                  for (m in k) {
                    if (k.hasOwnProperty(m)) {
                      var A = k[m];
                      if (null != A && "DIV" == A.nodeName) {
                        var w = A.querySelector('input[name="offeringID.1"]');
                        if (w) {
                          var l = w.getAttribute("value"), u = A.children[0];
                          -1 != A.textContent.toLowerCase().indexOf("add to cart to see product details.") ? a(l, u, !0) : d && a(l, u, !1);
                        }
                      }
                    }
                  }
                }
              } catch (D) {
                b.reportBug("MAP error: " + f + " " + D);
              }
            } else {
              var p = document.getElementById("price");
              if (null != p && /(our price|always remove it|add this item to your cart|see product details in cart|see price in cart)/i.test(p.textContent)) {
                var r = document.getElementById("merchant-info"), n = "", y = "";
                if (r) {
                  if (-1 == r.textContent.toLowerCase().indexOf("amazon.com")) {
                    var v = p.querySelector('span[data-action="a-modal"]');
                    if (v) {
                      var t = v.getAttribute("data-a-modal");
                      t.match(/offeringID\.1=(.*?)&amp/) && (n = RegExp.$1);
                    }
                    if (0 == n.length) {
                      if (t.match(/map_help_pop_(.*?)"/)) {
                        y = RegExp.$1;
                      } else {
                        b.revealWorking = !1;
                        return;
                      }
                    }
                  }
                  void 0 != b.revealCache[b.ASIN + n] ? g(p, !0, n) : b.httpGet("https://www.amazon.com/gp/cart/desktop/ajax-mini-detail.html/ref=added_item_1?ie=UTF8&asin=" + b.ASIN + "&offerlistingid=" + n, function(a) {
                    "" != y && -1 == a.indexOf("seller=" + y) && (b.revealWorking = !1);
                    var d = !1;
                    if (a.match(/price info--\x3e((.|\n)*?)\x3c!--/)) {
                      var e = RegExp.$1.match(/\$(\d{1,3}(?:[., \u00A0\u2003\u2002]\d{2,3})*(?:[., \u00A0\u2003\u2002]\d{2,3}))</);
                      e && (b.revealCache[b.ASIN + n] = e[1], g(p, document.getElementById("price"), n), d = !0);
                    }
                    d || a.match(/no valid offer/) || b.reportBug("invalid MAP response: https://www.amazon.com/gp/cart/desktop/ajax-mini-detail.html/ref=added_item_1?ie=UTF8&asin=" + b.ASIN + "&offerlistingid=" + n + " " + a);
                  });
                } else {
                  b.revealWorking = !1;
                }
              } else {
                b.revealWorking = !1;
              }
            }
          }
        }
      } catch (D) {
        b.revealWorking = !1;
      }
    });
  }, onPageLoad:function() {
    b.tld = RegExp.$2;
    var a = RegExp.$4;
    v.amazonBridge();
    b.ASIN || (b.ASIN = a);
    b.domain = b.getDomain(b.tld);
    v.get("s_boxType", function(a) {
      if ("0" == a.s_boxType) {
        b.swapIFrame();
      } else {
        var d = document.getElementsByClassName("bucketDivider"), c = 0;
        if (void 0 === d[c]) {
          if (void 0 === d[0]) {
            return;
          }
          c = 0;
        }
        a = document.createElement("div");
        a.setAttribute("id", "keepaButton");
        a.setAttribute("style", "background-color: #444; border: 0 solid #ccc; border-radius: 6px 6px 6px 6px; color: #fff;cursor: pointer; font-size: 12px; margin: 15px;\tpadding: 6px; text-decoration: none; text-shadow: none;\tfloat:left;\tbox-shadow: 0px 0px 7px 0px #888;");
        var f = document.createElement("style");
        f.appendChild(document.createTextNode("#keepaButton:hover{background-color:#666 !important}"));
        document.getElementsByTagName("head")[0].appendChild(f);
        a.addEventListener("click", function() {
          var a = document.getElementById("keepaButton");
          a.parentNode.removeChild(a);
          b.swapIFrame();
        }, !1);
        a.textContent = "Show KeepaBox";
        d = document.getElementsByClassName("lpo")[0] && d[1] && 0 == c ? d[1] : d[c];
        d = "promotions_feature_div" == d.parentNode.id ? d.parentNode : d;
        d.parentNode.insertBefore(a, d);
      }
    });
  }, swapIFrame:function() {
    v.staticBridge("log", "swap in ASIN: " + b.ASIN);
    try {
      b.revealMAP(document, b.ASIN, b.tld);
    } catch (g) {
    }
    if (!document.getElementById("keepaButton")) {
      var a;
      for (c in b.iframeStorage) {
        b.iframeStorage[c].style.display = "none";
        var d = b.iframeStorage[c].id;
        d = d.replace("Container", "Clear");
        if (a = document.getElementById(d)) {
          a.style.display = "none";
        }
      }
      b.swapIFrame.swapTimer && clearTimeout(b.swapIFrame.swapTimer);
      b.swapIFrame.swapTimer = setTimeout(function() {
        C || (document.getElementById("keepaContainer" + b.ASIN) || b.getPlaceholderAndInsertIFrame(), b.swapIFrame.swapTimer = setTimeout(function() {
          document.getElementById("keepaContainer" + b.ASIN) || b.getPlaceholderAndInsertIFrame();
        }, 2000));
      }, 2000);
      var c = document.getElementById("keepaContainer" + b.ASIN);
      if (b.iframeStorage[b.ASIN] && c) {
        v.staticBridge("log", "swap in ASIN - found old iframe: " + b.ASIN + " element: " + c);
        try {
          if (b.iframeStorage[b.ASIN].style.display = b.cssFlex, d = b.iframeStorage[b.ASIN].id, d = d.replace("Container", "Clear"), a = document.getElementById(d)) {
            a.style.display = "";
          }
        } catch (g) {
          v.staticBridge("log", "swap - catch: " + b.ASIN), b.iframeStorage[b.ASIN].style.display = "none", b.iframeStorage[b.ASIN] = null, window.setTimeout(function() {
            b.getPlaceholderAndInsertIFrame();
          }, 500);
        }
      } else {
        b.getPlaceholderAndInsertIFrame();
      }
    }
  }, getDevicePixelRatio:function() {
    var a = 1;
    void 0 !== window.screen.systemXDPI && void 0 !== window.screen.logicalXDPI && window.screen.systemXDPI > window.screen.logicalXDPI ? a = window.screen.systemXDPI / window.screen.logicalXDPI : void 0 !== window.devicePixelRatio && (a = window.devicePixelRatio);
    return a;
  }, getPlaceholderAndInsertIFrame:function() {
    v.get(["keepaBoxPlaceholder", "keepaBoxPlaceholderBackup", "keepaBoxPlaceholderBackupClass"], function(a) {
      var d = 0, c = function() {
        if (!document.getElementById("keepaButton") && !document.getElementById("amazonlive-homepage-widget")) {
          if (C) {
            var g = document.getElementById("tellAFriendBox_feature_div");
            if (g && g.previousSibling) {
              v.get(["s_overlay"], function(a) {
                try {
                  var d = a.s_overlay;
                  try {
                    d = JSON.parse(d);
                  } catch (N) {
                  }
                  var c = Math.min(1000, 1.5 * window.innerWidth).toFixed(0), e = (c / (window.innerWidth / 200)).toFixed(0), f = "https://dyn.keepa.com/pricehistory.png?type=2&asin=" + b.ASIN + "&domain=" + b.domain + "&width=" + c + "&height=" + e;
                  f = "undefined" == typeof d ? f + "&amazon=1&new=1&used=1&salesrank=1&range=365" : f + ("&amazon=" + d[0] + "&new=" + d[1] + "&used=" + d[2] + "&salesrank=" + d[3] + "&range=" + d[4]);
                  var h = document.createElement("img");
                  h.setAttribute("style", "margin-top: 15px; width: " + window.innerWidth + "px; height: 200px;");
                  h.setAttribute("id", "keepaImageContainer" + b.ASIN);
                  h.setAttribute("src", f);
                  g.previousSibling.after(h);
                  h.addEventListener("click", function() {
                    h.remove();
                    b.insertIFrame(g.previousSibling, !1, !0);
                  }, !1);
                } catch (N) {
                }
              });
              return;
            }
          }
          var f = document.getElementsByClassName("mocaGlamorContainer")[0];
          f || (f = document.getElementById("dv-sims"));
          f || (f = document.getElementById("mas-terms-of-use"));
          if (f && f.nextSibling) {
            b.insertIFrame(f.nextSibling, !1, !0);
          } else {
            if ((f = document.getElementById("ppd")) || (f = document.getElementById("ppd-left")), f && f.nextSibling) {
              for (f = f.nextSibling; 3 == f.nodeType;) {
                f = f.nextSibling;
              }
              b.insertIFrame(f, !1, !0);
            } else {
              var e = a.keepaBoxPlaceholder || "bottomRow";
              f = !1;
              if (e = document.getElementById(e)) {
                "sims_fbt" == e.previousElementSibling.id && (e = e.previousElementSibling, "bucketDivider" == e.previousElementSibling.className && (e = e.previousElementSibling), f = !0), b.insertIFrame(e, f);
              } else {
                if (e = a.keepaBoxPlaceholderBackup || "elevatorBottom", e = document.getElementById(e)) {
                  b.insertIFrame(e, !0);
                } else {
                  if (e = document.getElementById("hover-zoom-end")) {
                    b.insertIFrame(e, !0);
                  } else {
                    if (e = a.keepaBoxPlaceholderBackupClass || "a-fixed-left-grid", (e = document.getElementsByClassName(e)[0]) && e.nextSibling) {
                      b.insertIFrame(e.nextSibling, !0);
                    } else {
                      f = 0;
                      e = document.getElementsByClassName("twisterMediaMatrix");
                      var h = !!document.getElementById("dm_mp3Player");
                      if ((e = 0 == e.length ? document.getElementById("handleBuy") : e[0]) && 0 == f && !h && null != e.nextElementSibling) {
                        var q = !1;
                        for (h = e; h;) {
                          if (h = h.parentNode, "table" === h.tagName.toLowerCase()) {
                            if ("buyboxrentTable" === h.className || /buyBox/.test(h.className) || "buyingDetailsGrid" === h.className) {
                              q = !0;
                            }
                            break;
                          } else {
                            if ("html" === h.tagName.toLowerCase()) {
                              break;
                            }
                          }
                        }
                        if (!q) {
                          e = e.nextElementSibling;
                          b.insertIFrame(e, !1);
                          return;
                        }
                      }
                      e = document.getElementsByClassName("bucketDivider");
                      0 == e.length && (e = document.getElementsByClassName("a-divider-normal"));
                      if (!e[f]) {
                        if (!e[0]) {
                          40 > d++ && window.setTimeout(function() {
                            c();
                          }, 100);
                          return;
                        }
                        f = 0;
                      }
                      for (h = e[f]; h && e[f];) {
                        if (h = h.parentNode, "table" === h.tagName.toLowerCase()) {
                          if ("buyboxrentTable" === h.className || /buyBox/.test(h.className) || "buyingDetailsGrid" === h.className) {
                            h = e[++f];
                          } else {
                            break;
                          }
                        } else {
                          if ("html" === h.tagName.toLowerCase()) {
                            break;
                          }
                        }
                      }
                      b.placeholder = e[f];
                      e[f] && e[f].parentNode && (v.staticBridge("log", "getPlaceholderAndInsertIFrame Insert"), f = document.getElementsByClassName("lpo")[0] && e[1] && 0 == f ? e[1] : e[f], b.insertIFrame(f, !1));
                    }
                  }
                }
              }
            }
          }
        }
      };
      c();
    });
  }, getAFComment:function(a) {
    for (a = [a]; 0 < a.length;) {
      for (var b = a.pop(), c = 0; c < b.childNodes.length; c++) {
        var g = b.childNodes[c];
        if (8 === g.nodeType && -1 < g.textContent.indexOf("MarkAF")) {
          return g;
        }
        a.push(g);
      }
    }
    return null;
  }, insertIFrame:function(a, d) {
    if (b.iframeStorage[b.ASIN] && document.getElementById("keepaContainer" + b.ASIN)) {
      b.swapIFrame();
    } else {
      var q = document.getElementById("hover-zoom-end"), g = function(a) {
        for (var b = document.getElementById(a), d = []; b;) {
          d.push(b), b.id = "a-different-id", b = document.getElementById(a);
        }
        for (b = 0; b < d.length; ++b) {
          d[b].id = a;
        }
        return d;
      }("hover-zoom-end");
      v.get("s_boxHorizontal", function(f) {
        if (null == a) {
          setTimeout(b.getPlaceholderAndInsertIFrame, 2000);
        } else {
          var e = f.s_boxHorizontal, h = window.innerWidth - 50;
          if (document.getElementById("keepaContainer" + b.ASIN)) {
            v.staticBridge("log", "could not find keepa container");
          } else {
            f = 0 < document.location.href.indexOf("/offer-listing/");
            var t = "https://keepa.com/iframe_addon.html#" + b.domain + "-0-" + b.ASIN;
            "ipbakfmnjdenbmoenhicfmoojdojjjem" == chrome.runtime.id && (t = "https://test.keepa.com/iframe_addon.html#" + b.domain + "-0-" + b.ASIN);
            var m = document.createElement("div");
            "0" != e || f ? m.setAttribute("style", "width: calc(100% - 30px); height: 320px; display: flex; border:0 none; margin: 10px 0 0;") : (h -= 550, 960 > h && (h = 960), m.setAttribute("style", "min-width: 700px; max-width:" + h + "px;display: flex;  height: 320px; border:0 none; margin: 10px 0 0;"));
            m.setAttribute("id", "keepaContainer" + b.ASIN);
            var A = document.createElement("iframe");
            e = document.createElement("div");
            e.setAttribute("id", "keepaClear" + b.ASIN);
            A.setAttribute("style", "width: 100%; height: 100%; border:0 none;overflow: hidden;");
            A.setAttribute("src", t);
            A.setAttribute("scrolling", "no");
            A.setAttribute("id", "keepa" + b.ASIN);
            m.appendChild(A);
            h = !1;
            if (!d) {
              null == a.parentNode || "promotions_feature_div" !== a.parentNode.id && "dp-out-of-stock-top_feature_div" !== a.parentNode.id || (a = a.parentNode);
              try {
                var w = a.previousSibling.previousSibling;
                null != w && "technicalSpecifications_feature_div" == w.id && (a = w);
              } catch (H) {
              }
              0 < g.length && (q = g[g.length - 1]) && (a = b.getFirstInDOM([a, q], document.body), a === q && (h = !0));
              (w = document.getElementById("title") || document.getElementById("title_row")) && b.getFirstInDOM([a, w], document.body) !== w && (a = w);
              null == document.getElementById("ppd-left") && 100 < b.getClipRect(a.parentNode).left && (a = b.findPlaceholderBelowImages(a));
            }
            w = document.getElementById("vellumMsg");
            null != w && (a = w);
            w = document.body;
            var l = document.documentElement;
            l = Math.max(w.scrollHeight, w.offsetHeight, l.clientHeight, l.scrollHeight, l.offsetHeight);
            var u = a.offsetTop / l;
            if (0.5 < u || 0 > u) {
              w = b.getAFComment(w), null != w && (u = a.offsetTop / l, 0.5 > u && (a = w));
            }
            if (a.parentNode) {
              f ? (a = document.getElementById("olpTabContent"), a || (a = document.getElementById("olpProduct"), a = a.nextSibling), a.parentNode.insertBefore(m, a)) : "burjPageDivider" == a.id ? (a.parentNode.insertBefore(m, a), d || a.parentNode.insertBefore(e, m.nextSibling)) : "bottomRow" == a.id ? (a.parentNode.insertBefore(m, a), d || a.parentNode.insertBefore(e, m.nextSibling)) : h ? (a.parentNode.insertBefore(m, a.nextSibling), d || a.parentNode.insertBefore(e, m.nextSibling)) : (a.parentNode.insertBefore(m, 
              a), d || a.parentNode.insertBefore(e, m));
              b.iframeStorage[b.ASIN] = m;
              b.iframeStorage[b.ASIN].style.display = b.cssFlex;
              var z = !1, B = 5;
              if (r || c || p || k) {
                if (C) {
                  return;
                }
                var n = setInterval(function() {
                  if (0 >= B--) {
                    clearInterval(n);
                  } else {
                    var a = null != document.getElementById("keepa" + b.ASIN);
                    try {
                      if (!a) {
                        throw b.getPlaceholderAndInsertIFrame(), 1;
                      }
                      if (z) {
                        throw 1;
                      }
                      document.getElementById("keepa" + b.ASIN).contentDocument.location = t;
                    } catch (I) {
                      clearInterval(n);
                    }
                  }
                }, 4000);
              }
              var y = function() {
                z = !0;
                A.removeEventListener("load", y, !1);
                b.synchronizeIFrame();
              };
              A.addEventListener("load", y, !1);
            } else {
              b.swapIFrame(), v.staticBridge("log", "placeholder.parentNode null...");
            }
          }
        }
      });
    }
  }, handleIFrameMessage:function(a, d, c) {
    switch(a) {
      case "resize":
        d = "" + d;
        -1 == d.indexOf("px") && (d += "px");
        document.getElementById("keepaContainer" + b.ASIN).style.height = d;
        break;
      case "alert":
        a = encodeURIComponent("Kindle Fire HD Tablet");
        d = encodeURIComponent("51e5r0yV5AL.jpg");
        v.staticBridge("showAlert", "https://keepa.com/app/notification.html#B0083PWAPW/1/0/0/16900/19000/" + d + "/" + a);
        break;
      case "ping":
        c({location:chrome.runtime.id + " " + document.location});
    }
  }, synchronizeIFrame:function() {
    v.iframeBridge();
    var a = 0;
    v.get("s_boxHorizontal", function(b) {
      a = b.s_boxHorizontal;
    });
    var d = window.innerWidth, c = !1;
    C || window.addEventListener("resize", function() {
      c || (c = !0, window.setTimeout(function() {
        if (d != window.innerWidth) {
          d = window.innerWidth;
          var g = window.innerWidth - 50;
          "0" == a && (g -= 550, 800 > g && (g = 800));
          document.getElementById("keepaContainer" + b.ASIN).style.width = g;
        }
        c = !1;
      }, 100));
    }, !1);
  }, getFirstInDOM:function(a, d) {
    var c;
    for (d = d.firstChild; d; d = d.nextSibling) {
      if ("IFRAME" !== d.nodeName && 1 === d.nodeType) {
        if (-1 !== a.indexOf(d)) {
          return d;
        }
        if (c = b.getFirstInDOM(a, d)) {
          return c;
        }
      }
    }
    return null;
  }, getClipRect:function(a) {
    "string" === typeof a && (a = document.querySelector(a));
    var d = 0, c = 0, g = function(a) {
      d += a.offsetLeft;
      c += a.offsetTop;
      a.offsetParent && g(a.offsetParent);
    };
    g(a);
    return 0 == c && 0 == d ? b.getClipRect(a.parentNode) : {top:c, left:d, width:a.offsetWidth, height:a.offsetHeight};
  }, findPlaceholderBelowImages:function(a) {
    var d = a, c, g = 100;
    do {
      for (g--, c = null; !c;) {
        c = a.nextElementSibling, c || (c = a.parentNode.nextElementSibling), a = c ? c : a.parentNode.parentNode, !c || "IFRAME" !== c.nodeName && "SCRIPT" !== c.nodeName && 1 === c.nodeType || (c = null);
      }
    } while (0 < g && 100 < b.getClipRect(c).left);
    return c ? c : d;
  }, httpGet:function(a, b) {
    var c = new XMLHttpRequest;
    b && (c.onreadystatechange = function() {
      4 == c.readyState && b.call(this, c.responseText);
    });
    c.open("GET", a, !0);
    c.send();
  }, httpPost:function(a, b, c, g) {
    var d = new XMLHttpRequest;
    c && (d.onreadystatechange = function() {
      4 == d.readyState && c.call(this, d.responseText);
    });
    d.withCredentials = g;
    d.open("POST", a, !0);
    d.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    d.send(b);
  }, lastBugReport:0, reportBug:function(a) {
    var c = Date.now();
    if (!(6E5 > c - b.lastBugReport || /(dead object)|(Script error)|(\.location is null)/i.test(a))) {
      b.lastBugReport = c;
      c = "";
      try {
        c = Error().stack.split("\n").splice(1).splice(1).join("&ensp;&lArr;&ensp;");
        if (!/(keepa|content)\.js/.test(c)) {
          return;
        }
        c = c.replace(/chrome-extension:\/\/.*?\/content\//g, "").replace(/:[0-9]*?\)/g, ")").replace(/[ ]{2,}/g, "");
        c = '<span style="color: #999; font-size: xx-small">' + B + ":3.21debug:content.js&emsp;" + c + "</span>";
      } catch (g) {
      }
      var k = a + ('<br><span style="color: #222; font-size: x-small">' + window.location.protocol + "//" + window.location.hostname + '</span><span style="color: #777; font-size: x-small">' + window.location.pathname + "</span>&emsp;&emsp;") + c;
      v.get("token", function(a) {
        b.httpPost("https://dyn.keepa.com/service/bugreport/?user=" + a.token + "&type=" + z, k);
      });
    }
  }};
  window.onerror = function(a, c, k, g, f) {
    "object" === typeof a && a.srcElement && a.target && (a = "[object HTMLScriptElement]" == a.srcElement && "[object HTMLScriptElement]" == a.target ? "Error loading script" : "Event Error - target:" + a.target + " srcElement:" + a.srcElement);
    a = a.toString();
    var d = "";
    g = g || 0;
    if (f && f.stack) {
      d = f.stack;
      try {
        d = f.stack.split("\n").splice(1).splice(1).join("&ensp;&lArr;&ensp;"), d = d.replace(/http|s:\/\/.*?\//g, "").replace(/:[0-9]*?\)/g, ")").replace(/[ ]{2,}/g, "");
      } catch (h) {
      }
    }
    a = "error: " + a + " url: " + (c || document.location.toString()) + " line: " + parseInt(k || 0) + " col: " + parseInt(g || 0);
    "ipbakfmnjdenbmoenhicfmoojdojjjem" == chrome.runtime.id && console.log(a + " " + ostack);
    b.reportBug(a + " date: " + new Date + " stack: " + d);
    return !1;
  };
  if (r || c || p || k) {
    try {
      if (document.location.href.startsWith("https://keepa.com")) {
        var G = document.createElement("div");
        G.id = "extension";
        G.setAttribute("type", p ? "Firefox" : r ? "Chrome" : c ? "Opera" : k ? "Edge" : "Unknown");
        G.setAttribute("version", "3.21");
        document.body.appendChild(G);
      }
    } catch (a) {
    }
    if (window.self != window.top) {
      return;
    }
    var J = function(a) {
      chrome.runtime.sendMessage({type:"sendData", val:{key:"m1", payload:[a]}}, function() {
      });
    };
    chrome.runtime.sendMessage({type:"getStorage"}, function(a) {
      var d = !1;
      /((\/images)|(\/review)|(\/product-reviews))/.test(document.location.href) || /\/e\/(B[A-Z0-9]{9}|\d{9}(!?X|\d))/.test(document.location.href) || !document.location.href.match(/^htt(p|ps):\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|ca|fr|cn|it|es|in|com\.mx|com\.br)\/[^.]*?(\/|\?ASIN=)(B[A-Z0-9]{9}|\d{9}(!?X|\d))/) && !document.location.href.match(/^htt(p|ps):\/\/.*?\.amzn\.(com).*?\/(B[A-Z0-9]{9}|\d{9}(!?X|\d))/) ? document.location.href.match(/^htt(p|ps):\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|ca|fr|cn|it|es|in|com\.mx|com\.br)\/[^.]*?\/(wishlist|registry)/) || 
      document.location.href.match(/^htt(p|ps):\/\/w*?\.amzn\.(com)[^.]*?\/(wishlist|registry)/) || (document.location.href.match(/^https?:\/\/.*?(?:seller).*?\.amazon\.(de|com|co\.uk|co\.jp|ca|fr|cn|it|es|in|com\.mx|com\.br)\//) ? J("s" + b.getDomain(RegExp.$1)) : document.location.href.match(/^https?:\/\/.*?(?:af.?ilia|part|assoc).*?\.amazon\.(de|com|co\.uk|co\.jp|ca|fr|cn|it|es|in|com\.mx|com\.br)\//) && J("a" + b.getDomain(RegExp.$1))) : (b.onPageLoad(), d = !0);
      if (r || p || c || k) {
        if (C) {
          return;
        }
        a = /^http(?:|s):\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|ca|fr|cn|it|es|in|com\.mx|com\.br)\/(s\/|gp\/search\/|.*?\/b\/)/;
        if (d || document.location.href.match(a)) {
          var q = null;
          chrome.runtime.sendMessage({type:"getFilters"}, function(a) {
            q = a;
            if (null != q && null != q.value) {
              var c = function() {
                var c = document.location.href.match(/^https?:\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|ca|fr|cn|it|es|in|com\.mx|com\.br)\//);
                if (d || c) {
                  var e = b.getDomain(RegExp.$1);
                  scanner.scan(a.value, function(a) {
                    a.key = "f1";
                    a.domainId = e;
                    chrome.runtime.sendMessage({type:"sendData", val:a}, function(a) {
                    });
                  });
                }
              };
              c();
              var e = document.location.href, f = -1, h = -1, g = -1;
              h = setInterval(function() {
                e != document.location.href && (e = document.location.href, clearTimeout(g), g = setTimeout(function() {
                  c();
                }, 2000), clearTimeout(f), f = setTimeout(function() {
                  clearInterval(h);
                }, 180000));
              }, 2000);
              f = setTimeout(function() {
                clearInterval(h);
              }, 180000);
            }
          });
        }
      }
      a = document.location.href;
      if (a.startsWith("https://keepa.com/") || a.startsWith("https://test.keepa.com/")) {
        var g = null, f = null, e = function() {
          null == g && (g = chrome.runtime.connect("nmmhkkegccagdldgiimedpiccmgmieda", {}), g.onMessage.addListener(function(a) {
            f.response = a;
            window.postMessage(f, "*");
          }), g.onDisconnect.addListener(function() {
            g = null;
            f.response = {errorType:"INTERNAL_SERVER_ERROR"};
            window.postMessage(f, "*");
          }));
        };
        window.addEventListener("message", function(a) {
          if (a.source == window && a.data.key) {
            switch(a.data.key) {
              case "IAP":
                e(), f = a.data, f.key = "IAPResponse", g.postMessage(a.data.value);
            }
          }
        });
      }
      document.location.href.match(/^https?:\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|ca|fr|cn|it|es|in|com\.mx|com\.br)/) && setTimeout(function() {
        chrome.runtime.onMessage.addListener(function(a, c, d) {
          switch(a.key) {
            case "collectASINs":
              a = {};
              var e = !1;
              c = (document.querySelector("#main") || document.querySelector("#zg") || document.querySelector("#pageContent") || document.querySelector("#wishlist-page") || document.querySelector("#merchandised-content") || document.querySelector("[id^='contentGrid']") || document.querySelector("#container") || document.querySelector(".a-container") || document).getElementsByTagName("a");
              if (void 0 != c && null != c) {
                for (var f = 0; f < c.length; f++) {
                  var g = c[f].href;
                  /\/images/.test(g) || /\/e\/(B[A-Z0-9]{9}|\d{9}(!?X|\d))/.test(g) || !g.match(/^https?:\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|ca|fr|cn|it|es|in|com\.mx|com\.br)\/[^.]*?(?:\/|\?ASIN=)(B[A-Z0-9]{9}|\d{9}(!?X|\d))/) && !g.match(/^https?:\/\/.*?\.amzn\.(com)[^.]*?\/(B[A-Z0-9]{9}|\d{9}(!?X|\d))/) || (e = RegExp.$2, g = b.getDomain(RegExp.$1), "undefined" === typeof a[g] && (a[g] = []), a[g].includes(e) || a[g].push(e), e = !0);
                }
              }
              if (e) {
                d(a);
              } else {
                return alert("Keepa: No product ASINs found on this page."), !1;
              }
              break;
            default:
              d({});
          }
        });
        v.get(["overlayPriceGraph", "s_overlay"], function(a) {
          try {
            var b = a.overlayPriceGraph, c = a.s_overlay;
            try {
              c = JSON.parse(c);
            } catch (n) {
            }
            var d;
            if (1 == b) {
              var e = document.getElementsByTagName("a"), f = 0 < document.location.href.indexOf("/offer-listing/");
              if (void 0 != e && null != e) {
                for (d = 0; d < e.length; d++) {
                  var g = e[d].href;
                  /\/images/.test(g) || /\/e\/(B[A-Z0-9]{9}|\d{9}(!?X|\d))/.test(g) || !g.match(/^https?:\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|ca|fr|cn|it|es|in|com\.mx|com\.br)\/[^.]*?(?:\/|\?ASIN=)(B[A-Z0-9]{9}|\d{9}(!?X|\d))/) && !g.match(/^https?:\/\/.*?\.amzn\.(com)[^.]*?\/(B[A-Z0-9]{9}|\d{9}(!?X|\d))/) || (f || -1 == g.indexOf("offer-listing")) && t.add_events(c, e[d], g, RegExp.$1, RegExp.$2);
                }
              }
              var h = function(a) {
                if ("A" == a.nodeName) {
                  var b = a.href;
                  /\/images/.test(b) || /\/e\/(B[A-Z0-9]{9}|\d{9}(!?X|\d))/.test(b) || !b.match(/^https?:\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|ca|fr|cn|it|es|in|com\.mx|com\.br)\/[^.]*?(?:\/|\?ASIN=)(B[A-Z0-9]{9}|\d{9}(!?X|\d))/) && !b.match(/^https?:\/\/.*?\.amzn\.(com)[^.]*?\/(B[A-Z0-9]{9}|\d{9}(!?X|\d))/) || (f || -1 == b.indexOf("offer-listing")) && t.add_events(c, a, b, RegExp.$1, RegExp.$2);
                }
              }, k = new MutationObserver(function(a) {
                a.forEach(function(a) {
                  try {
                    if ("childList" === a.type) {
                      for (d = 0; d < a.addedNodes.length; d++) {
                        h(a.addedNodes[d]);
                        for (var b = a.addedNodes[d].children; null != b && "undefined" != b && 0 < b.length;) {
                          for (var c = [], e = 0; e < b.length; e++) {
                            h(b[e]);
                            try {
                              if (b[e].children && 0 < b[e].children.length) {
                                for (var f = 0; f < b[e].children.length && 30 > f; f++) {
                                  c.push(b[e].children[f]);
                                }
                              }
                            } catch (x) {
                            }
                          }
                          b = c;
                        }
                      }
                    } else {
                      if (c = a.target.getElementsByTagName("a"), "undefined" != c && null != c) {
                        for (b = 0; b < c.length; b++) {
                          h(c[b]);
                        }
                      }
                    }
                    h(a.target);
                  } catch (x) {
                  }
                });
              });
              k.observe(document.querySelector("html"), {childList:!0, attributes:!1, characterData:!1, subtree:!0, attributeOldValue:!1, characterDataOldValue:!1});
              window.onunload = function y() {
                try {
                  window.detachEvent("onunload", y), k.disconnect();
                } catch (H) {
                }
              };
            }
          } catch (n) {
          }
        });
      }, 100);
    });
  }
  var t = {image_urls_main:[], pf_preview_current:"", preview_images:[], tld:"", img_string:'<img style="border: 1px solid #ff9f29;  -moz-border-radius: 0px;  margin: -3px;   display:block;   position: relative;   top: -3px;   left: -3px;" src=\'', createNewImageElement:function(a) {
    a = a.createElement("img");
    a.style.borderTop = "2px solid #ff9f29";
    a.style.borderBottom = "3px solid grey";
    a.style.display = "block";
    a.style.position = "relative";
    a.style.padding = "5px";
    return a;
  }, preview_image:function(a, b, c, g, f) {
    try {
      var d = b.originalTarget.ownerDocument;
    } catch (A) {
      d = document;
    }
    if (!d.getElementById("pf_preview")) {
      var h = d.createElement("div");
      h.id = "pf_preview";
      h.addEventListener("mouseout", function(a) {
        t.clear_image(a);
      }, !1);
      h.style.boxShadow = "rgb(68, 68, 68) 0px 1px 7px -2px";
      h.style.position = "fixed";
      h.style.zIndex = "10000000";
      h.style.bottom = "0px";
      h.style.right = "0px";
      h.style.margin = "12px 12px";
      h.style.backgroundColor = "#fff";
      d.body.appendChild(h);
    }
    t.pf_preview_current = d.getElementById("pf_preview");
    if (!t.pf_preview_current.firstChild) {
      h = Math.max(Math.floor(0.3 * d.defaultView.innerHeight), 128);
      var k = Math.max(Math.floor(0.3 * d.defaultView.innerWidth), 128), m = 2;
      if (300 > k || 150 > h) {
        m = 1;
      }
      1000 < k && (k = 1000);
      1000 < h && (h = 1000);
      t.pf_preview_current.current = -1;
      t.pf_preview_current.a = g;
      t.pf_preview_current.href = c;
      t.pf_preview_current.size = Math.floor(1.1 * Math.min(k, h));
      d.defaultView.innerWidth - b.clientX < 1.05 * k && d.defaultView.innerHeight - b.clientY < 1.05 * h && (b = d.getElementById("pf_preview"), b.style.right = "", b.style.left = "6px");
      g = "https://dyn.keepa.com/pricehistory.png?type=" + m + "&asin=" + g + "&domain=" + f + "&width=" + k + "&height=" + h;
      g = "undefined" == typeof a ? g + "&amazon=1&new=1&used=1&salesrank=1&range=365" : g + ("&amazon=" + a[0] + "&new=" + a[1] + "&used=" + a[2] + "&salesrank=" + a[3] + "&range=" + a[4]);
      d.getElementById("pf_preview").style.display = "block";
      a = t.createNewImageElement(d);
      a.setAttribute("src", g);
      t.pf_preview_current.appendChild(a);
    }
  }, clear_image:function(a) {
    try {
      try {
        var b = a.originalTarget.ownerDocument;
      } catch (g) {
        b = document;
      }
      var c = b.getElementById("pf_preview");
      c.style.display = "none";
      c.style.right = "2px";
      c.style.left = "";
      t.pf_preview_current.innerHTML = "";
    } catch (g) {
    }
  }, add_events:function(a, b, c, g, f) {
    0 <= c.indexOf("#") || (t.tld = g, "pf_prevImg" != b.getAttribute("keepaPreview") && (b.addEventListener("mouseover", function(b) {
      t.preview_image(a, b, c, f, g);
      return !0;
    }, !0), b.addEventListener("mouseout", function(a) {
      t.clear_image(a);
    }, !1), b.setAttribute("keepaPreview", "pf_prevImg")));
  }};
})();

