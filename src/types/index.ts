import z from "zod";

export const CompassSchema = z.object({
    x: z.number().min(-1).max(1),
    y: z.number().min(-1).max(1),
});

export type Compass = z.infer<typeof CompassSchema>;

export const UserSchema = z.object({
    fid: z.number(),
    name: z.string(),
    pfpUrl: z.string().nullish(),
});

export type User = z.infer<typeof UserSchema>;
