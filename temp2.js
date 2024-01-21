
const cluster = require('cluster');
let numCPUs = require('os').cpus().length;
const redis = require('redis');
var crypto = require('crypto');

const max = 1000000000;
numCPUs = numCPUs-1;


if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

	init();

  // Создание рабочих процессов
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });

} else {

  console.log(`Worker ${process.pid} started`);
	init();

}


/*
const client = redis.createClient({
  url: 'redis://default:eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81@127.0.0.1:6379'
});

const startTime = Date.now();
client.connect();

client.on('connect', async () => {
    console.log('Connected to Redis');

    // Очищаем все данные в Redis
    await client.flushAll();

    // Добавляем 1000 строковых ключей
    for (let i = 0; i < max; i++) {
		let rand = await gen_rand();
		let key = rand[0];
		let value = rand[1];
        //let key = `key${i}`;
        //let value = `value${i}`;
        const exists = await client.exists(key);

        if (exists) {
            console.log(`Key already exists: ${key}`);
        } else {
            await client.set(key, value);
        }
    }

    client.quit();
    
    const endTime = Date.now();
    console.log(`Time taken: ${endTime - startTime} ms`);
});
*/

function init() {
		const client = redis.createClient({
		  url: 'redis://default:!!!!!!!!!!!!!!@127.0.0.1:6379'
		});

		const startTime = Date.now();
		client.connect();

		client.on('connect', async () => {
			console.log('Connected to Redis');

			// Очищаем все данные в Redis
			//await client.flushAll();

			// Добавляем 1000 строковых ключей
			for (let i = 0; i < max; i++) {
				let rand = await gen_rand();
				let key = rand[0];
				let value = rand[1];
				//let key = `key${i}`;
				//let value = `value${i}`;
				const exists = await client.exists(key);

				if (exists) {
				    console.log(`Key already exists: ${key}`);
				} else {
				    await client.set(key, value);
				}
			}
			
			client.quit();
			
			const endTime = Date.now();
			console.log(`Time taken: ${endTime - startTime} ms`);
		});
}


async function gen_rand() {
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

	//console.log(str);

	var m= crypto
		.createHash('sha1')
		.update(str, 'utf8')
		.digest('hex')

		//console.log(m);

	return [str,m];

}

/*
PHP SESSION
https://github.com/php/php-src/blob/master/ext/session/session.c#L747

#define PS_MAX_SID_LENGTH 256
PHP_INI_ENTRY("session.sid_length",             "32"

PHPAPI zend_string *php_session_create_id(PS_CREATE_SID_ARGS) - генерирует 256 байт
static PHP_INI_MH(OnUpdateSidLength) - обрезает до 32

*/
