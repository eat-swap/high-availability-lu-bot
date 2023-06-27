import { get_api_root } from './utils';

async function call_telegram_api(token: string, method_name: string, body: any) {
	const URL = `${get_api_root(token)}/${method_name}`;
	const body_str = JSON.stringify(body);
	const request = new Request(URL, {
		body: body_str,
		headers: new Headers({
			'Content-Type': 'application/json'
		}),
		method: 'POST'
	});

	return await fetch(request);
}

export async function send_message(
	token: string,
	chat_id: string | number,
	text: string,
	parse_mode: "MarkdownV2" | "HTML" | undefined,
	reply_to_message_id: number | undefined = undefined
) {
	return await call_telegram_api(token, 'sendMessage', {
		chat_id,
		text,
		parse_mode,
		reply_to_message_id,
	});
}
