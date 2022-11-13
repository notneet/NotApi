module.exports = {
  apps: [
    {
      name: 'core-api',
      script: 'dist/apps/not-api/main.js',
      watch: ['./dist/apps/not-api'],
      autorestart: true,
      cron_restart: '1 0 * * *',
    },
  ],
};
