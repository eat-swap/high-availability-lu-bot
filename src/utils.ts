/**
 * Generate a simple HTTP response using given body and status.
 * @param body string of response body
 * @param status status code of response
 */
export function generate_simple_response(body: string, status: number) {
	return new Response(body, {
		status: status,
	})
}

/**
 * Construct API root for specific Telegram token
 * @param token the api token to be used
 */
export function get_api_root(token: string) {
	return `https://api.telegram.org/bot${token}`
}

export function parse_json(str: string): readonly [any, boolean] {
	try {
		return [JSON.parse(str), true] as const;
	} catch (err) {
		return [null, false] as const;
	}
}

export function concat_name(first: string | undefined, last: string | undefined): string {
	let ret = '';
	if (first) {
		ret += first;
	}
	if (last) {
		ret += (ret.length > 0) ? ' ' : '';
		ret += last;
	}
	return ret;
}

export function random<T>(list: T[]): T {
	return list[Math.floor(Math.random() * list.length)];
}

function starts_with_space_or_all(s: string, prefix: string): boolean {
	return s.startsWith(`${prefix} `) || s === prefix;
}

export function is_command(text: string, cmd: string): boolean {
	return starts_with_space_or_all(text, cmd) ||
		starts_with_space_or_all(text, `${cmd}@high_availability_lu_bot`);
}
