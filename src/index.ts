export default {
	async fetch(request, env, ctx): Promise<Response> {
		const url = new URL(request.url);
		if (url.pathname === '/api/hello') {
			return Response.json({ ok: true, msg: 'Hello API' }, { headers: { 'Access-Control-Allow-Origin': '*' } });
		}
		if (url.pathname === '/api/notes') {
			const { results } = await env.DB.prepare('SELECT * FROM notes').all<any>();
			return Response.json(results);
		}
		if (url.pathname === '/api/config') {
			return Response.json({
				greeting: env.GREETING,
				hasKey: !!env.API_KEY,
			});
		}
		return env.ASSETS.fetch(request);
	},
} satisfies ExportedHandler<Env>;
