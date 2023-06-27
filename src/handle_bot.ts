import * as utils from "./utils";
import { handle_lu } from './lu';
import { handle_n } from './n';

export async function handle_bot_request(request : Request, ctx : ExecutionContext) {
	// Non-POST requests were not from Telegram.
	if (request.method != "POST") {
		return utils.generate_simple_response("405 Method Not Allowed", 405);
	}

	// POST body
	// This is a string
	const request_body = await request.text();
	console.log(request_body);

	// Parse JSON from body
	const [json_obj, parseOK] = utils.parse_json(request_body);
	if (!parseOK || !json_obj.message) {
		// Discard silently.
		// For telegram, this means something not implemented (thus cannot handle, 2xx to ignore).
		// For any 3rd party, do not let them know how we worked.
		return utils.generate_simple_response("201 Created", 201);
	}
	const message = json_obj.message;

	await Promise.all([
		handle_lu(message),
		handle_n(message),
	]);

	// Respond to requester
	return utils.generate_simple_response("200 OK", 200);
}
