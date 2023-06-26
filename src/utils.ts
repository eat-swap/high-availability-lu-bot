/**
 * Generate a simple HTTP response using given body and status.
 * @param body string of response body
 * @param status status code of response
 */
export function generateSimpleResponse(body: string, status: number) {
	return new Response(body, {
		status: status,
	})
}

/**
 * Construct API root for specific Telegram token
 * @param token the api token to be used
 */
export function getApiRoot(token: string) {
	return `https://api.telegram.org/bot${token}`
}

export function parseJSON(str: string): readonly [any, boolean] {
	try {
		return [JSON.parse(str), true] as const;
	} catch (err) {
		return [null, false] as const;
	}
}

export function concatName(first: string | undefined, last: string | undefined): string {
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
