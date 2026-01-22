import { relations } from "drizzle-orm";
import { boolean, index, int, json, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const user = mysqlTable("user", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull()
});

export const session = mysqlTable(
  "session",
  {
    id: varchar("id", { length: 255 }).primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: varchar("token", { length: 500 }).notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" })
  },
  (table) => [index("session_userId_idx").on(table.userId)]
);

export const account = mysqlTable(
  "account",
  {
    id: varchar("id", { length: 255 }).primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull()
  },
  (table) => [index("account_userId_idx").on(table.userId)]
);

export const verification = mysqlTable(
  "verification",
  {
    id: varchar("id", { length: 255 }).primaryKey(),
    identifier: varchar("identifier", { length: 255 }).notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull()
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)]
);

export const passkey = mysqlTable(
  "passkey",
  {
    id: varchar("id", { length: 255 }).primaryKey(),
    name: text("name"),
    publicKey: text("public_key").notNull(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    credentialID: varchar("credential_id", { length: 500 }).notNull(),
    counter: int("counter").notNull(),
    deviceType: text("device_type").notNull(),
    backedUp: boolean("backed_up").notNull(),
    transports: text("transports"),
    createdAt: timestamp("created_at"),
    aaguid: text("aaguid")
  },
  (table) => [index("passkey_userId_idx").on(table.userId), index("passkey_credentialID_idx").on(table.credentialID)]
);

export const jwks = mysqlTable("jwks", {
  id: varchar("id", { length: 255 }).primaryKey(),
  publicKey: text("public_key").notNull(),
  privateKey: text("private_key").notNull(),
  createdAt: timestamp("created_at").notNull(),
  expiresAt: timestamp("expires_at")
});

export const oauthClient = mysqlTable("oauth_client", {
  id: varchar("id", { length: 255 }).primaryKey(),
  clientId: varchar("client_id", { length: 255 }).notNull().unique(),
  clientSecret: text("client_secret"),
  disabled: boolean("disabled").default(false),
  skipConsent: boolean("skip_consent"),
  enableEndSession: boolean("enable_end_session"),
  scopes: text("scopes"),
  userId: varchar("user_id", { length: 255 }).references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
  name: text("name"),
  uri: text("uri"),
  icon: text("icon"),
  contacts: text("contacts"),
  tos: text("tos"),
  policy: text("policy"),
  softwareId: text("software_id"),
  softwareVersion: text("software_version"),
  softwareStatement: text("software_statement"),
  redirectUris: text("redirect_uris").notNull(),
  postLogoutRedirectUris: text("post_logout_redirect_uris"),
  tokenEndpointAuthMethod: text("token_endpoint_auth_method"),
  grantTypes: text("grant_types"),
  responseTypes: text("response_types"),
  public: boolean("public"),
  type: text("type"),
  referenceId: varchar("reference_id", { length: 255 }),
  metadata: json("metadata")
});

export const oauthRefreshToken = mysqlTable("oauth_refresh_token", {
  id: varchar("id", { length: 255 }).primaryKey(),
  token: varchar("token", { length: 500 }).notNull(),
  clientId: varchar("client_id", { length: 255 })
    .notNull()
    .references(() => oauthClient.clientId, { onDelete: "cascade" }),
  sessionId: varchar("session_id", { length: 255 }).references(() => session.id, {
    onDelete: "set null"
  }),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  referenceId: varchar("reference_id", { length: 255 }),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at"),
  revoked: timestamp("revoked"),
  scopes: text("scopes").notNull()
});

export const oauthAccessToken = mysqlTable("oauth_access_token", {
  id: varchar("id", { length: 255 }).primaryKey(),
  token: varchar("token", { length: 500 }).unique(),
  clientId: varchar("client_id", { length: 255 })
    .notNull()
    .references(() => oauthClient.clientId, { onDelete: "cascade" }),
  sessionId: varchar("session_id", { length: 255 }).references(() => session.id, {
    onDelete: "set null"
  }),
  userId: varchar("user_id", { length: 255 }).references(() => user.id, { onDelete: "cascade" }),
  referenceId: varchar("reference_id", { length: 255 }),
  refreshId: varchar("refresh_id", { length: 255 }).references(() => oauthRefreshToken.id, {
    onDelete: "cascade"
  }),
  expiresAt: timestamp("expires_at"),
  createdAt: timestamp("created_at"),
  scopes: text("scopes").notNull()
});

export const oauthConsent = mysqlTable("oauth_consent", {
  id: varchar("id", { length: 255 }).primaryKey(),
  clientId: varchar("client_id", { length: 255 })
    .notNull()
    .references(() => oauthClient.clientId, { onDelete: "cascade" }),
  userId: varchar("user_id", { length: 255 }).references(() => user.id, { onDelete: "cascade" }),
  referenceId: varchar("reference_id", { length: 255 }),
  scopes: text("scopes").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at")
});

export const apikey = mysqlTable(
  "apikey",
  {
    id: varchar("id", { length: 255 }).primaryKey(),
    name: text("name"),
    start: text("start"),
    prefix: text("prefix"),
    key: varchar("key", { length: 255 }).notNull(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    refillInterval: int("refill_interval"),
    refillAmount: int("refill_amount"),
    lastRefillAt: timestamp("last_refill_at"),
    enabled: boolean("enabled").default(true),
    rateLimitEnabled: boolean("rate_limit_enabled").default(true),
    rateLimitTimeWindow: int("rate_limit_time_window").default(86400000),
    rateLimitMax: int("rate_limit_max").default(10),
    requestCount: int("request_count").default(0),
    remaining: int("remaining"),
    lastRequest: timestamp("last_request"),
    expiresAt: timestamp("expires_at"),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
    permissions: text("permissions"),
    metadata: text("metadata")
  },
  (table) => [index("apikey_key_idx").on(table.key), index("apikey_userId_idx").on(table.userId)]
);

export const minecraftAccount = mysqlTable("minecraft_account", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$default(() => crypto.randomUUID()),
  uuid: varchar("uuid", { length: 255 }).notNull().unique(),
  username: varchar("username", { length: 255 }).notNull(),
  primary: boolean("primary").notNull().default(false),
  userId: varchar("user_id", { length: 255 })
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull()
});

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  passkeys: many(passkey),
  oauthClients: many(oauthClient),
  oauthRefreshTokens: many(oauthRefreshToken),
  oauthAccessTokens: many(oauthAccessToken),
  oauthConsents: many(oauthConsent),
  apikeys: many(apikey),
  minecraftAccounts: many(minecraftAccount)
}));

export const sessionRelations = relations(session, ({ one, many }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id]
  }),
  oauthRefreshTokens: many(oauthRefreshToken),
  oauthAccessTokens: many(oauthAccessToken)
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id]
  })
}));

export const passkeyRelations = relations(passkey, ({ one }) => ({
  user: one(user, {
    fields: [passkey.userId],
    references: [user.id]
  })
}));

export const oauthClientRelations = relations(oauthClient, ({ one, many }) => ({
  user: one(user, {
    fields: [oauthClient.userId],
    references: [user.id]
  }),
  oauthRefreshTokens: many(oauthRefreshToken),
  oauthAccessTokens: many(oauthAccessToken),
  oauthConsents: many(oauthConsent)
}));

export const oauthRefreshTokenRelations = relations(oauthRefreshToken, ({ one, many }) => ({
  oauthClient: one(oauthClient, {
    fields: [oauthRefreshToken.clientId],
    references: [oauthClient.clientId]
  }),
  session: one(session, {
    fields: [oauthRefreshToken.sessionId],
    references: [session.id]
  }),
  user: one(user, {
    fields: [oauthRefreshToken.userId],
    references: [user.id]
  }),
  oauthAccessTokens: many(oauthAccessToken)
}));

export const oauthAccessTokenRelations = relations(oauthAccessToken, ({ one }) => ({
  oauthClient: one(oauthClient, {
    fields: [oauthAccessToken.clientId],
    references: [oauthClient.clientId]
  }),
  session: one(session, {
    fields: [oauthAccessToken.sessionId],
    references: [session.id]
  }),
  user: one(user, {
    fields: [oauthAccessToken.userId],
    references: [user.id]
  }),
  oauthRefreshToken: one(oauthRefreshToken, {
    fields: [oauthAccessToken.refreshId],
    references: [oauthRefreshToken.id]
  })
}));

export const oauthConsentRelations = relations(oauthConsent, ({ one }) => ({
  oauthClient: one(oauthClient, {
    fields: [oauthConsent.clientId],
    references: [oauthClient.clientId]
  }),
  user: one(user, {
    fields: [oauthConsent.userId],
    references: [user.id]
  })
}));

export const apikeyRelations = relations(apikey, ({ one }) => ({
  user: one(user, {
    fields: [apikey.userId],
    references: [user.id]
  })
}));

export const minecraftAccountRelations = relations(minecraftAccount, ({ one }) => ({
  user: one(user, {
    fields: [minecraftAccount.userId],
    references: [user.id]
  })
}));
