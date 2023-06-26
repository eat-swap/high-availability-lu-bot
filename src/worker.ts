/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { WEBHOOK_PREFIX } from './config';
import { handleBotRequest } from './handle_bot';
import { generateSimpleResponse } from './utils';

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	// MY_BUCKET: R2Bucket;
	//
	// Example binding to a Service. Learn more at https://developers.cloudflare.com/workers/runtime-apis/service-bindings/
	// MY_SERVICE: Fetcher;
	//
	// Example binding to a Queue. Learn more at https://developers.cloudflare.com/queues/javascript-apis/
	// MY_QUEUE: Queue;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		// ----- HTTP CHECK & PATH PARSE BEGINS -----
		// Check insecure HTTP
		if (request.url.startsWith("http://")) {
			return new Response("Insecure HTTP detected. Use HTTPS instead!", {
				headers: {
					"Location": "https" + request.url.substring(4)
				},
				status: 308
			});
		}

		// Now: https
		// Get path. "https://" is 8 chars long.
		const path = request.url.substring(request.url.indexOf("/", 8));
		// ----- HTTP CHECK & PATH PARSE ENDS -----

		// ----- Filter non-bot requests -----
		if (path.startsWith("/" + WEBHOOK_PREFIX)) {
			return await handleBotRequest(request, ctx);
		}

		// If reached here, the request is not what we want.
		// Return a "402 Payment Required" response for fun.
		return generateSimpleResponse("402 Payment Required", 402);
	},
};
