import { Jwt } from 'jsonwebtoken';
import { z } from 'zod';

export const JWTSchema = z.object({
  id: z.string().uuid(),
});

export type JWTObject = z.infer<typeof JWTSchema>;

export const validateJWT = (jwt: Jwt): JWTObject => {
  const validatedJWT = JWTSchema.parse(JSON.parse(JSON.stringify(jwt.payload)));
  return validatedJWT;
};
