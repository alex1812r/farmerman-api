const server = require('./server');
const database = require('./database');
const functions = require('./functions');

async function main() {
	const app = server();
	try {
		await database();
	} catch(err) {
		console.log('dabase conexion error', err);
	}
	functions();
}

main();