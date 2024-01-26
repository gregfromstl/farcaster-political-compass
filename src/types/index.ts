import z from "zod";

export const CompassSchema = z.object({
    left: z.number(),
    right: z.number(),
    up: z.number(),
    down: z.number(),
});

export type Compass = z.infer<typeof CompassSchema>;

export const UserSchema = z.object({
    fid: z.number(),
    name: z.string(),
    pfpUrl: z.string().nullish(),
});

export type User = z.infer<typeof UserSchema>;
