import { router } from "$api/router";
import { ApiErrorSchema, MinecraftUsernameSchema, MinecraftUUIDSchema, VerificationCodeSchema } from "$api/schemas";
import { dev } from "$app/environment";
import { auth } from "$lib/server/auth";
import { SmartCoercionPlugin } from "@orpc/json-schema";
import type { OpenAPIGeneratorGenerateOptions } from "@orpc/openapi";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { onError } from "@orpc/server";
import { RequestHeadersPlugin } from "@orpc/server/plugins";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import type { RequestHandler } from "@sveltejs/kit";

const servers = [
  {
    url: "https://hajiutong.com/api",
    description: "Production server",
    variables: {
      version: {
        default: "v1",
        enum: ["v1"],
        description: "API version"
      }
    }
  }
] satisfies OpenAPIGeneratorGenerateOptions["servers"];

if (dev) {
  servers.unshift({
    url: "http://localhost:{port}/api",
    description: "Development server",
    variables: {
      // @ts-expect-error port variable does exist
      port: {
        default: "5173"
      },
      version: {
        default: "v1",
        enum: ["v1"],
        description: "API version"
      }
    }
  });
}

const handler = new OpenAPIHandler(router, {
  interceptors: [
    onError((error) => {
      console.error(error);
    })
  ],
  plugins: [
    new RequestHeadersPlugin(),
    new SmartCoercionPlugin({
      schemaConverters: [new ZodToJsonSchemaConverter()]
    }),
    new OpenAPIReferencePlugin({
      docsPath: "/",
      specPath: "/openapi.json",
      docsTitle: "API Documentation",
      schemaConverters: [new ZodToJsonSchemaConverter()],
      specGenerateOptions: {
        info: {
          title: "HAJI UTONG API",
          description: `
The backend API for https://hajiutong.com/ - Premium game enhancements platform.

## Overview
HAJI UTONG API provides secure endpoints for managing premium game enhancements, DLCs, and user authentication.

<details>
  <summary>Authentication Flow</summary>
  <p>The typical flow for using the HAJI UTONG API is as follows:</p>
  <ol>
    <li><strong>User Registration</strong>: Create an account on HAJI UTONG</li>
    <li><strong>Browse Products</strong>: Access our catalog of premium enhancements</li>
    <li><strong>Purchase</strong>: Complete secure payment for selected products</li>
    <li><strong>Delivery</strong>: Instant access to purchased enhancements</li>
  </ol>
</details>

<details>
  <summary>Error Handling</summary>
  <p>All endpoints return standardized error responses with proper HTTP status codes. Error responses include:</p>
  <ul>
    <li><code>error</code>: Error category (e.g., "Bad Request", "Unauthorized")</li>
    <li><code>message</code>: Human-readable error message</li>
    <li><code>statusCode</code>: HTTP status code</li>
    <li><code>timestamp</code>: ISO 8601 timestamp when the error occurred</li>
  </ul>
</details>

<details>
  <summary>Rate Limiting</summary>
  <p>The API implements rate limiting to prevent abuse. If you exceed the limits, you'll receive a 429 status code.</p>
</details>
`,
          version: "1",
          contact: {
            name: "Tonantzintla",
            url: "https://github.com/Tonantzintla",
            email: ""
          }
        },
        tags: [
          {
            name: "Codes",
            description: "Authentication code operations for verifying Minecraft players"
          },
          {
            name: "Plugin",
            description: "Minecraft plugin integration endpoints for in-game code display"
          }
        ],
        servers,
        externalDocs: {
          description: "HAJI UTONG Documentation",
          url: "https://docs.hajiutong.com"
        },
        security: [{ "API Key": [] }],
        commonSchemas: {
          MinecraftUUID: {
            schema: MinecraftUUIDSchema
          },
          VerificationCode: {
            schema: VerificationCodeSchema
          },
          MinecraftUsername: {
            schema: MinecraftUsernameSchema
          },
          ApiError: {
            schema: ApiErrorSchema
          }
        },
        components: {
          securitySchemes: {
            "API Key": {
              type: "apiKey",
              in: "header",
              name: "X-API-Key",
              description: "Your application API key. Obtain one from https://hajiutong.com/dashboard/developer/keys."
            }
          }
        }
      },
      docsConfig: {
        sources: [
          { url: "/api/openapi.json", title: "HAJI UTONG API", slug: "haji-utong-api", default: true },
          // Better Auth schema generation endpoint
          { content: await auth.api.generateOpenAPISchema(), title: "Better-Auth API", slug: "better-auth-api" }
        ],
        pageTitle: "API Documentation",
        theme: "saturn",
        metaData: {
          title: "Documentation | HAJI UTONG API",
          description: "Documentation for the HAJI UTONG API",
          ogDescription: "Documentation for the HAJI UTONG API",
          ogTitle: "Documentation | HAJI UTONG API",
          ogImage: "/assets/images/haji-utong.png",
          twitterCard: "summary_large_image"
        },
        favicon: "/favicon.svg",
        persistAuth: true,
        defaultHttpClient: {
          targetKey: "js",
          clientKey: "fetch"
        },
        authentication: {
          securitySchemes: {
            "API Key": {
              type: "apiKey",
              in: "header",
              name: "X-API-Key",
              description: "Your application API key. Obtain one from https://hajiutong.com/dashboard/developer/keys."
            }
          }
        }
      }
    })
  ]
});

const handle: RequestHandler = async ({ request }) => {
  const context = request.headers.get("Authorization") ? { user: { id: "test", name: "John Doe", email: "john@doe.com" } } : {};

  const { response } = await handler.handle(request, {
    prefix: "/api",
    context
  });

  return response ?? new Response("Not Found", { status: 404 });
};

export const GET = handle;
export const POST = handle;
export const PUT = handle;
export const PATCH = handle;
export const DELETE = handle;
