export default () => ({
  database: {
    name: process.env.DATABASE_NAME || undefined,
    password: process.env.DATABASE_PASSWORD || undefined,
    user: process.env.DATABASE_USER || undefined,
    host: process.env.DATABASE_HOST || undefined,
    port: process.env.DATABASE_PORT || undefined,
    enableLogging: process.env.DATABASE_ENABLE_LOGGING || false,
  },
  graphql: {
    enablePlayground: process.env.NEST_ENABLE_PLAYGROUND || false,
  },
  jwt: {
    secret: process.env.NEST_JWT_SECRET || undefined,
    lifeSpan: process.env.NEST_JWT_TOKEN_LIFE_SPAN || undefined,
  },
});
