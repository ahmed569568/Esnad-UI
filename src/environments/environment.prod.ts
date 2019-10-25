// `.env.ts` is generated by the `npm run env` command
// `npm run env` exposes environment variables as JSON for any usage you might
// want, like displaying the version or getting extra config from your CI bot, etc.
// This is useful for granularity you might need beyond just the environment.
// Note that as usual, any environment variables you expose through it will end up in your
// bundle, and you should not use it for any sensitive information like passwords or keys.
import { env } from './.env';

export const environment = {
	production: true,
	hmr: false,
	version: env.npm_package_version,
	serverUrl: 'http://35.243.244.23:7000/api/',
	imagePath: 'http://35.243.244.23:7000/storage/app/',
	defaultLanguage: 'ar-SA',
	supportedLanguages: ['en-US', 'ar-SA']
};
