import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email().max(120),
  password: z.string().min(8).max(120)
});

export const saveCollegeSchema = z.object({
  collegeId: z.string().min(1)
});

export const compareIdsSchema = z.object({
  ids: z.string().min(1)
});

export const discussionCreateSchema = z.object({
  title: z.string().trim().min(5).max(200),
  content: z.string().trim().min(20).max(5000),
  collegeId: z.string().min(1).optional().nullable()
});

export const savedComparisonSchema = z.object({
  collegeIds: z.array(z.string().min(1)).min(2).max(3),
  name: z.string().trim().min(2).max(120).optional().nullable()
});

export const collegesQuerySchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  course: z.string().optional(),
  degree: z.string().optional(),
  minFees: z.coerce.number().optional(),
  maxFees: z.coerce.number().optional(),
  minRating: z.coerce.number().optional(),
  minPlacement: z.coerce.number().optional(),
  minYear: z.coerce.number().optional(),
  maxNirf: z.coerce.number().optional(),
  sortBy: z.enum(["rating", "fees", "placement", "name", "popular"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional()
});
