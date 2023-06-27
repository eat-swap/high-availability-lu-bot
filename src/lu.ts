import { concatName, random } from './utils';
import { sendMessage } from './telegram';
import { API_TOKEN } from './config';

const lu_talk = [
	"你带我走吧😭",
	"你到底是谁😭",
	"你给我出来😭",
	"你在哪里😭",
];

function starts_with_space_or_all(s: string, prefix: string): boolean {
	return s.startsWith(`${prefix} `) || s === prefix;
}

export async function handle_lu(message: any) {
	if (!message?.text) {
		return;
	}
	const text = message.text as string;
	if (!(starts_with_space_or_all(text, "/lu@high_availability_lu_bot") || starts_with_space_or_all(text, "/lu"))) {
		return;
	}

	const space_pos = text.indexOf(' ');
	const lu_content = space_pos !== -1 ?
		text.slice(1 + space_pos) :
		message?.reply_to_message?.from ?
			concatName(message?.reply_to_message?.from.first_name, message?.reply_to_message?.from.last_name) :
			concatName(message.from.first_name, message.from.last_name);

	const space = lu_content.charCodeAt(lu_content.length - 1) > 127 ? '' : ' ';
	await sendMessage(
		API_TOKEN,
		message.chat.id,
		`${lu_content}${space}${random(lu_talk)}`,
		undefined,
		message?.message_id,
	);
}
