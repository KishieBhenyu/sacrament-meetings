"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import {
  addMeeting,
  updateMeeting as updateMeetingInDb,
  deleteMeeting as deleteMeetingFromDb,
} from "./meetings-db";

import { State } from "./types";

const hymnSchema = z
  .object({
    number: z.number().int().nonnegative(),
    title: z.string().trim(),
  })
  .nullable();

const speakerSchema = z.object({
  name: z.string().trim(),
  topic: z.string().trim(),
  type: z.enum(["speaker", "musical-number"]),
});

const MeetingFormSchema = z.object({
  date: z
    .string()
    .min(1, "Meeting date is required.")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Enter a valid date."),

  meetingType: z.enum(["regular", "special"], {
    message: "Select a valid meeting type.",
  }),

  presiding: z
    .string()
    .trim()
    .min(1, "Presiding officer is required."),

  conducting: z
    .string()
    .trim()
    .min(1, "Conducting officer is required."),

  openingHymn: hymnSchema,

  openingPrayer: z.string(),

  wardBusiness: z.array(
    z.object({
      description: z.string().trim(),
    })
  ),

  stakeBusiness: z.boolean(),

  sacramentHymn: hymnSchema,

  speakers: z.array(speakerSchema),

  closingHymn: hymnSchema,

  closingPrayer: z.string(),

  announcements: z.array(z.string().trim()),
});

function parseHymn(
  numberValue: FormDataEntryValue | null,
  titleValue: FormDataEntryValue | null
) {
  const numberText = String(numberValue ?? "").trim();
  const title = String(titleValue ?? "").trim();

  if (!numberText && !title) {
    return null;
  }

  return {
    number: Number(numberText),
    title,
  };
}

function parseMeetingFormData(formData: FormData) {
  const raw = Object.fromEntries(formData.entries());

  return {
    date: String(raw.date ?? ""),

    meetingType: String(raw.meetingType ?? ""),

    presiding: String(raw.presiding ?? ""),

    conducting: String(raw.conducting ?? ""),

    openingHymn: parseHymn(
      raw.openingHymnNumber ?? null,
      raw.openingHymnTitle ?? null
    ),

    openingPrayer: String(raw.openingPrayer ?? ""),

    wardBusiness: String(raw.wardBusiness ?? "")
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((description) => ({ description })),

    stakeBusiness:
      String(raw.stakeBusiness ?? "false") === "true",

    sacramentHymn: parseHymn(
      raw.sacramentHymnNumber ?? null,
      raw.sacramentHymnTitle ?? null
    ),

    speakers: String(raw.speakers ?? "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [type, name, topic] = line.split("|");

        return {
          type: type?.trim() ?? "",
          name: name?.trim() ?? "",
          topic: topic?.trim() ?? "",
        };
      }),

    closingHymn: parseHymn(
      raw.closingHymnNumber ?? null,
      raw.closingHymnTitle ?? null
    ),

    closingPrayer: String(raw.closingPrayer ?? ""),

    announcements: String(raw.announcements ?? "")
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean),
  };
}

function getValidationErrors(
  error: z.ZodError
): Record<string, string[]> {
  const errors: Record<string, string[]> = {};

  for (const issue of error.issues) {
    const field = String(issue.path[0] ?? "form");

    if (!errors[field]) {
      errors[field] = [];
    }

    errors[field].push(issue.message);
  }

  return errors;
}

export async function createMeeting(
  _prevState: State,
  formData: FormData
): Promise<State> {
  const rawData = parseMeetingFormData(formData);

  const validatedFields = MeetingFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      message: "Please correct the errors below.",
      errors: getValidationErrors(validatedFields.error),
    };
  }

  try {
    await addMeeting({
      id: 0,
      ...validatedFields.data,
    });

    revalidatePath("/meetings");
  } catch (error) {
    console.error("Failed to create meeting:", error);

    throw new Error(
      "Unable to create the meeting. Please try again."
    );
  }

  redirect("/meetings");
}

export async function updateMeeting(
  id: number,
  _prevState: State,
  formData: FormData
): Promise<State> {
  const rawData = parseMeetingFormData(formData);

  const validatedFields = MeetingFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      message: "Please correct the errors below.",
      errors: getValidationErrors(validatedFields.error),
    };
  }

  try {
    const updated = await updateMeetingInDb(id, {
      id,
      ...validatedFields.data,
    });

    if (!updated) {
      throw new Error("Meeting not found.");
    }

    revalidatePath("/meetings");
    revalidatePath(`/meetings/${id}`);
  } catch (error) {
    console.error(
      `Failed to update meeting ${id}:`,
      error
    );

    if (
      error instanceof Error &&
      error.message === "Meeting not found."
    ) {
      throw error;
    }

    throw new Error(
      "Unable to update the meeting. Please try again."
    );
  }

  redirect("/meetings");
}

export async function deleteMeeting(
  formData: FormData
): Promise<void> {
  const idValue = formData.get("id");

  const parsedId = z.coerce
    .number()
    .int()
    .positive()
    .safeParse(idValue);

  if (!parsedId.success) {
    throw new Error("Invalid meeting ID.");
  }

  try {
    const deleted = await deleteMeetingFromDb(
      parsedId.data
    );

    if (!deleted) {
      throw new Error("Meeting not found.");
    }

    revalidatePath("/meetings");
  } catch (error) {
    console.error(
      `Failed to delete meeting ${parsedId.data}:`,
      error
    );

    if (
      error instanceof Error &&
      error.message === "Meeting not found."
    ) {
      throw error;
    }

    throw new Error(
      "Unable to delete the meeting. Please try again."
    );
  }
}