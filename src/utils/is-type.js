const pattern = {
    // http://emailregex.com/
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    url: new RegExp(
        "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
        "i"
    ),
    hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i,
    phone: /^1[345789]\d{9}$/
};

export const isNumber = (value) => {
    return typeof value === "number";
};

export const isRegExp = (value) => {
    return Object.prototype.toString.call(value) === "[object RegExp]";
};

export const isObject = (value) => {
    return Object.prototype.toString.call(value) === "[object Object]";
};

export const isError = (value) => {
    return Object.prototype.toString.call(value) === "[object Error]";
};

export const isString = (value) => {
    return typeof value === "string";
};

export const isFunction = (value) => {
    return typeof value === "function";
};

export const isArray = (value) => {
    return Object.prototype.toString.call(value) === "[object Array]";
};

export const isEmptyObject = (obj) => {
    if (obj === null || obj === undefined)
        return "Cannot convert undefined or null to object";
    return Object.keys(obj).length === 0;
};

export const isBoolean = (value) => {
    return (
        value === true ||
        value === false ||
        (isObject(value) &&
            Object.prototype.toString.call(value) === "[object Boolean]")
    );
};

export const isInteger = (value) => {
    return isNumber(value) && parseInt(value, 10) === value;
};
export const isFloat = (value) => {
    return isNumber(value) && !isInteger(value);
};

export const isDate = (value) => {
    if (!value) return false;
    return (
        typeof value.getTime === "function" &&
        typeof value.getMonth === "function" &&
        typeof value.getYear === "function"
    );
};

export const isEmail = (value) => {
    return (
        typeof value === "string" &&
        !!value.match(pattern.email) &&
        value.length < 255
    );
};

export const isUrl = (value) => {
    return typeof value === "string" && !!value.match(pattern.url);
};

export const isHex = (value) => {
    return typeof value === "string" && !!value.match(pattern.hex);
};

export const isPromise = (value) => {
    return value && typeof value.then === "function";
};

export const isPhone = (value) => {
    return !!value.match(pattern.phone);
}