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