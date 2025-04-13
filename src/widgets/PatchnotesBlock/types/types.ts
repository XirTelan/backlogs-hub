import { NewsSchema } from "@/shared/zodSchemas/zod";
import { z } from "zod";

export type NewsType = z.infer<typeof NewsSchema>;
