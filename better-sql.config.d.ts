interface BetterSqlConfig {
  url: string;
}

declare module 'better-sql' {
  const config: BetterSqlConfig;
  export default config;
}
