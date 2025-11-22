import adapter from "@sveltejs/adapter-vercel";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: "404.html"
		}),
		paths: {
			base: process.argv.includes("dev") ? "" : "/trivia-da-luz"
		}
	}
};

export default config;
