import * as utils from "./utils";
import { handle_lu } from './lu';
import { handle_n } from './n';

export async function handleBotRequest(request : Request, ctx : ExecutionContext) {
	// Non-POST requests were not from Telegram.
	if (request.method != "POST") {
		return utils.generateSimpleResponse("405 Method Not Allowed", 405);
	}

	// POST body
	// This is a string
	const requestBody = await request.text();
	console.log(requestBody);

	// Parse JSON from body
	const [jsonObj, parseOK] = utils.parseJSON(requestBody);
	if (!parseOK || !jsonObj.message) {
		// Discard silently.
		// For telegram, this means something not implemented (thus cannot handle, 2xx to ignore).
		// For any 3rd party, do not let them know how we worked.
		return utils.generateSimpleResponse("201 Created", 201);
	}
	const message = jsonObj.message;

	await Promise.all([
		handle_lu(message),
		handle_n(message),
	]);

	// Respond to requester
	return utils.generateSimpleResponse("200 OK", 200);
}
