import { getApiRoot } from './utils';

async function callTelegramAPI(token: string, methodName: string, body: any) {
	const URL = `${getApiRoot(token)}/${methodName}`;
	const bodyStr = JSON.stringify(body);
	const request = new Request(URL, {
		body: bodyStr,
		headers: new Headers({
			'Content-Type': 'application/json'
		}),
		method: 'POST'
	});

	return await fetch(request);
}

export async function sendMessage(
	token: string,
	chat_id: string | number,
	text: string,
	parse_mode: "MarkdownV2" | "HTML" | undefined,
	reply_to_message_id: number | undefined = undefined
) {
	return await callTelegramAPI(token, 'sendMessage', {
		chat_id,
		text,
		parse_mode,
		reply_to_message_id,
	});
}
