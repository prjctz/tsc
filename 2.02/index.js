var string = 'Hello TypeScript';
function transform(str, uppercase) {
    if (uppercase) {
        return str.toUpperCase();
    }
    return str.toLowerCase();
}
var arrowTransform = function (str, uppercase) {
    if (uppercase) {
        return str.toUpperCase();
    }
    return str.toLowerCase();
};
console.log(transform(string));
