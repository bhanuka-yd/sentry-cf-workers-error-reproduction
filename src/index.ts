import * as Sentry from '@sentry/cloudflare';

export default Sentry.withSentry(
	(env: Env) => ({
		dsn: env.SENTRY_DSN,
		// Set tracesSampleRate to 1.0 to capture 100% of spans for tracing.
		tracesSampleRate: 1.0,
		environment: 'production'
	}),
	{
		async fetch(request, env, ctx): Promise<Response> {
			try {
				throw new Error('controlled error');
			} catch (e) {
				Sentry.captureException(e);
			}
			return new Response('Hello World!');
		}
	} satisfies ExportedHandler<Env>
);
