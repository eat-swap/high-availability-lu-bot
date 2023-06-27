import { concatName, is_command, random } from './utils';
import { sendMessage } from './telegram';
import { API_TOKEN } from './config';

class S {
	s: S[];

	constructor(s: S[]) {
		this.s = s;
	}

	to_string(): string {
		if (this.s.length <= 0)
			return "{}";
		let ret = `{${this.s[0].to_string()}`;
		for (let i = 1; i < this.s.length; ++i)
			ret += `, ${this.s[i].to_string()}`;
		return `${ret}}`;
	}
}

const cache: {
	[key: number]: S;
} = {};

function f(n: number): S {
	if (n <= 0)
		return new S([]);
	if (cache[n])
		return cache[n];
	const ret: S[] = [];
	for (let i = 0; i < n; ++i)
		ret.push(f(i));
	cache[n] = new S(ret);
	return cache[n];
}

export async function handle_n(message: any) {
	if (!message?.text || !is_command(message.text, "/n")) {
		return;
	}
	const text = message.text as string;
	const space_pos = text.indexOf(' ');
	const n = space_pos !== -1 ? Number(text.slice(1 + space_pos)) : -1;

	await sendMessage(
		API_TOKEN,
		message.chat.id,
		n >= 0 && n <= 10 ? f(n).to_string() : "?",
		undefined,
		message?.message_id,
	);
}

