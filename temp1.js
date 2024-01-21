/*
const redis = require('redis');
const client = redis.createClient();

const startTime = new Date();

client.on('error', (err) => console.log('Redis Client Error', err));

client.connect();

// Очистка Redis
client.flushAll();

// Добавление 1000 уникальных строковых ключей
const uniqueKeys = new Set();
let duplicateCount = 0;

for (let i = 0; i < 1000; i++) {
    let key = `key${i}`;
    if (uniqueKeys.has(key)) {
        duplicateCount++;
        console.log(`Duplicate key found: ${key}`);
    } else {
        uniqueKeys.add(key);
        client.set(key, `value${i}`);
    }
}

console.log(`Total duplicates: ${duplicateCount}`);

client.quit();

const endTime = new Date();
console.log(`Time taken: ${endTime - startTime}ms`);

*/



var crypto = require('crypto')
var GENERATE_ATTEMPTS = crypto.randomBytes === crypto.pseudoRandomBytes ? 1 : 3
function randomBytesSync (size) {
  var err = null

  for (var i = 0; i < GENERATE_ATTEMPTS; i++) {
    try {
      return crypto.randomBytes(size)
    } catch (e) {
      err = e
    }
  }

  throw err
}
var EQUAL_END_REGEXP = /=+$/
var PLUS_GLOBAL_REGEXP = /\+/g
var SLASH_GLOBAL_REGEXP = /\//g
function toString (buf) {
  return buf.toString('base64')
    .replace(EQUAL_END_REGEXP, '')
    .replace(PLUS_GLOBAL_REGEXP, '-')
    .replace(SLASH_GLOBAL_REGEXP, '_')
}

var t= randomBytesSync (24);

var str = JSON.stringify(toString(t), function (key, val) {
    return val
  });

console.log(str);

var m= crypto
    .createHash('sha1')
    .update(str, 'utf8')
    .digest('hex')

    console.log(m);

function Session(req, data) {
  Object.defineProperty(this, 'req', { value: req });
  Object.defineProperty(this, 'id', { value: req.sessionID });

  if (typeof data === 'object' && data !== null) {
    // merge data into this, ignoring prototype properties
    for (var prop in data) {
      if (!(prop in this)) {
        this[prop] = data[prop]
      }
    }
  }
}

var p=Session()

/*
PHP SESSION
https://github.com/php/php-src/blob/master/ext/session/session.c#L747

#define PS_MAX_SID_LENGTH 256
PHP_INI_ENTRY("session.sid_length",             "32"

PHPAPI zend_string *php_session_create_id(PS_CREATE_SID_ARGS) - генерирует 256 байт
static PHP_INI_MH(OnUpdateSidLength) - обрезает до 32

*/
