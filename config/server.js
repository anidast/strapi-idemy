module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'b89ef1a75e59885f330cb8036caa5d14'),
    },
  },
  cron: {
    enabled: true
  },
});
