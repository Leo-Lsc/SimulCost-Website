import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: './tests',
	use: {
		baseURL: 'http://localhost:4321',
		viewport: { width: 1280, height: 720 },
	},
	projects: [
		{ name: 'chromium', use: { browserName: 'chromium' } },
	],
	webServer: {
		command: 'npm run dev',
		url: 'http://localhost:4321',
		reuseExistingServer: !process.env.CI,
	},
});
