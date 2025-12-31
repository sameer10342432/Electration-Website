import { z } from 'zod';
import { insertInquirySchema, inquiries, services, cities } from './schema';

// ============================================
// SHARED ERROR SCHEMAS
// ============================================
export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

// ============================================
// API CONTRACT
// ============================================
export const api = {
  inquiries: {
    create: {
      method: 'POST' as const,
      path: '/api/inquiries',
      input: insertInquirySchema,
      responses: {
        201: z.custom<typeof inquiries.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    list: {
      method: 'GET' as const,
      path: '/api/inquiries',
      responses: {
        200: z.array(z.custom<typeof inquiries.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/inquiries/:id',
      responses: {
        200: z.custom<typeof inquiries.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    updateStatus: {
      method: 'PATCH' as const,
      path: '/api/inquiries/:id/status',
      input: z.object({
        status: z.string(),
        adminNotes: z.string().optional(),
      }),
      responses: {
        200: z.custom<typeof inquiries.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  services: {
    list: {
      method: 'GET' as const,
      path: '/api/services',
      responses: {
        200: z.array(z.custom<typeof services.$inferSelect>()),
      },
    },
    getBySlug: {
      method: 'GET' as const,
      path: '/api/services/:slug',
      responses: {
        200: z.custom<typeof services.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  cities: {
    list: {
      method: 'GET' as const,
      path: '/api/cities',
      responses: {
        200: z.array(z.custom<typeof cities.$inferSelect>()),
      },
    },
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================
export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

// ============================================
// TYPE HELPERS
// ============================================
export type CreateInquiryInput = z.infer<typeof api.inquiries.create.input>;
