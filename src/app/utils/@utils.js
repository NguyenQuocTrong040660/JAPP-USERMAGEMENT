import dayjs from "dayjs";

export function checkingRouter(props, correctPath) {
    const { login } = props;
    let matchRole = false;
    login.navigation.forEach((element) => {
        if (element.path) {
            if (correctPath === element.path) matchRole = true;
        }
        if (element.sub) {
            element.sub.forEach((subElement) => {
                if (subElement.path) {
                    if (correctPath === subElement.path) matchRole = true;
                }
            });
        }
    });
    return matchRole;
}

export function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
}

export function isMobile() {
    if (window) {
        return window.matchMedia(`(max-width: 767px)`).matches;
    }
    return false;
}

export function isMdScreen() {
    if (window) {
        return window.matchMedia(`(max-width: 1199px)`).matches;
    }
    return false;
}

function currentYPosition() {
    if (!window) {
        return;
    }
    // Firefox, Chrome, Opera, Safari
    if (window.pageYOffset) return window.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop) return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}

function elmYPosition(elm) {
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent !== document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    }
    return y;
}

export function scrollTo(scrollableElement, elmID) {
    var elm = document.getElementById(elmID);
    if (!elmID || !elm) {
        return;
    }
    var startY = currentYPosition();
    var stopY = elmYPosition(elm);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY);
        return;
    }
    var speed = Math.round(distance / 50);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for (var i = startY; i < stopY; i += step) {
            setTimeout(
                (function (leapY) {
                    return () => {
                        scrollableElement.scrollTo(0, leapY);
                    };
                })(leapY),
                timer * speed
            );
            leapY += step;
            if (leapY > stopY) leapY = stopY;
            timer++;
        }
        return;
    }
    for (let i = startY; i > stopY; i -= step) {
        setTimeout(
            (function (leapY) {
                return () => {
                    scrollableElement.scrollTo(0, leapY);
                };
            })(leapY),
            timer * speed
        );
        leapY -= step;
        if (leapY < stopY) leapY = stopY;
        timer++;
    }
    return false;
}

export function getTimeDifference(date) {
    let difference = dayjs(new Date(), "DD/MM/YYYY HH:mm:ss").diff(dayjs(date, "DD/MM/YYYY HH:mm:ss")) / 1000;

    if (difference < 60) return `${Math.floor(difference)} seconds`;
    else if (difference < 3600) return `${Math.floor(difference / 60)} minutes`;
    else if (difference < 86400) return `${Math.floor(difference / 3660)} hours`;
    else if (difference < 86400 * 30) return `${Math.floor(difference / 86400)} days`;
    else if (difference < 86400 * 30 * 12) return `${Math.floor(difference / 86400 / 30)} months`;
    else return `${(difference / 86400 / 30 / 12).toFixed(1)} years`;
}

export function generateRandomId() {
    let tempId = Math.random().toString();
    let uid = tempId.substr(2, tempId.length - 1);
    return uid;
}

export function getQueryParam(prop) {
    var params = {};
    var search = decodeURIComponent(window.location.href.slice(window.location.href.indexOf("?") + 1));
    var definitions = search.split("&");
    definitions.forEach(function (val, key) {
        var parts = val.split("=", 2);
        params[parts[0]] = parts[1];
    });
    return prop && prop in params ? params[prop] : params;
}

export function classList(classes) {
    return Object.entries(classes)
        .filter((entry) => entry[1])
        .map((entry) => entry[0])
        .join(" ");
}

export function initCodeViewer() {
    if (!document) return;
    const pre = document.getElementsByTagName("pre");
    if (!pre.length) return;
    Array.prototype.map.call(pre, (p) => {
        p.classList.add("collapsed");
        p.addEventListener("click", (e) => {
            e.target.classList.remove("collapsed");
        });
    });
}

export const getAllDatabyMenu = (menu, path, param) => {
    let data = {};
    let newPath = replaceString(path, param);
    let item = getItemMenuByPath(menu, newPath);

    if (item) {
        data.breadCrumb = getBreadCrumb(menu, item.name);
        let json = item.actionsetting ? JSON.parse(item.actionsetting) : JSON.parse("{}");
        data.baseUrl = json.api;
        data.searchfunc = item.searchfunc;
        data.isMatch = true;
        data.tableButton = {};
        data.commonButton = {};
        if (item.button) {
            item.button.forEach((element) => {
                if (element.cmdtype === "TB") {
                    data.tableButton[element.actionid] = { ...element };
                    if (element.actionsetting && element.actionsetting !== "") {
                        data.tableButton[element.actionid].actionsetting = JSON.parse(element.actionsetting);
                    }
                }
                if (element.cmdtype === "CB") {
                    data.commonButton[element.actionid] = { ...element };
                    if (element.actionsetting) {
                        data.commonButton[element.actionid].actionsetting = JSON.parse(element.actionsetting);
                    }
                }
            });
        }
    } else {
        data.isMatch = false;
    }
    return data;
};

export const replaceString = (path, param) => {
    let newPath = path;
    Object.keys(param).map(function (key, index) {
        newPath = newPath.replace(":" + key, param[key]);
        return newPath;
    });
    return newPath;
};

export const getBreadCrumb = (menu, name) => {
    let data = [];
    var lastmenu = getItemMenu(menu, name);
    if (lastmenu) {
        data.unshift(lastmenu);
        var parentmenu = lastmenu.menuparent;
        while (parentmenu !== "0") {
            var temp = getItemMenu(menu, parentmenu);
            if (temp) {
                data.unshift(temp);
                parentmenu = temp.menuparent;
            } else {
                parentmenu = "0";
            }
        }
    }
    return data;
};

export const getItemMenu = (menu, name) => {
    var dest = null;
    menu.forEach((element) => {
        if (element.name === name) {
            dest = element;
            return dest;
        } else {
            if (element.sub) {
                var temp = getItemMenu(element.sub, name);
                if (temp != null) {
                    dest = temp;
                    return dest;
                }
            }
        }
    });
    return dest;
};

export const compare2Value = (value1, value2, compareString) => {
    let compare = true;
    switch (compareString) {
        case "!=":
            compare = value1 !== value2 ? true : false;
            break;
        case "=":
            compare = value1 === value2 ? true : false;
            break;
        case ">":
            compare = value1 > value2 ? true : false;
            break;
        case "<":
            compare = value1 < value2 ? true : false;
            break;
        case ">=":
            compare = value1 >= value2 ? true : false;
            break;
        case "<=":
            compare = value1 <= value2 ? true : false;
            break;
        case "contains":
            compare = value2.includes(value1)  ? true : false;
            break;
        case "notcontains":
            compare = value2.includes(value1)  ? false : true;
            break;
        default:
            compare = value1 === value2 ? true : false;
            break;
    }
    return compare;
};

export const getItemMenuByPath = (menu, path) => {
    var dest = null;
    menu.forEach((element) => {
        if (element.path === path) {
            dest = element;
            return dest;
        } else {
            if (element.sub) {
                var temp = getItemMenuByPath(element.sub, path);
                if (temp != null) {
                    dest = temp;
                    return dest;
                }
            }
        }
    });
    return dest;
};
