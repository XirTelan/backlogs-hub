import { TemplateDTOSchema } from "@/shared/zodSchemas/zod";
import { z } from "zod";

export type TemplateDTO = z.infer<typeof TemplateDTOSchema>;
