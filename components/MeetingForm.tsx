
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { createMeeting, updateMeeting } from "@/lib/actions";
import {
  SacramentMeeting,
  Speaker,
  WardBusiness,
  State,
} from "@/lib/types";

interface MeetingFormProps {
  action:
    | typeof createMeeting
    | ((
        prevState: State,
        formData: FormData
      ) => Promise<State>);
  initialData?: SacramentMeeting;
}

const initialState: State = {
  message: "",
  errors: {},
};

function SubmitButton({ isEdit }: { isEdit: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded bg-blue-600 px-4 py-2 font-semibold text-white disabled:opacity-50"
    >
      {pending
        ? "Saving..."
        : isEdit
          ? "Update Meeting"
          : "Create Meeting"}
    </button>
  );
}

function FieldError({
  id,
  errors,
}: {
  id: string;
  errors?: string[];
}) {
  return (
    <div
      id={id}
      aria-live="polite"
      className="mt-1 text-sm text-red-600"
    >
      {errors?.map((error) => (
        <p key={error}>{error}</p>
      ))}
    </div>
  );
}

export default function MeetingForm({
  action,
  initialData,
}: MeetingFormProps) {
  const isEdit = Boolean(initialData);

  const actionWithId = initialData
    ? updateMeeting.bind(null, initialData.id)
    : action;

  const [state, formAction] = useActionState(
    actionWithId,
    initialState
  );

  const speakers: Speaker[] = initialData?.speakers ?? [];

  const wardBusiness: WardBusiness[] =
    initialData?.wardBusiness ?? [];

  const errors = state.errors ?? {};

  return (
    <form action={formAction} className="space-y-8">
      {state.message && (
        <div
          aria-live="polite"
          className="rounded border border-red-300 bg-red-50 p-4 text-red-700"
        >
          {state.message}
        </div>
      )}

      {/* Date */}
      <div>
        <label
          htmlFor="date"
          className="block font-semibold"
        >
          Date
        </label>

        <input
          id="date"
          name="date"
          type="date"
          required
          defaultValue={initialData?.date ?? ""}
          aria-describedby="date-error"
          className="w-full rounded border p-2"
        />

        <FieldError
          id="date-error"
          errors={errors.date}
        />
      </div>

      {/* Meeting Type */}
      <div>
        <label
          htmlFor="meetingType"
          className="block font-semibold"
        >
          Meeting Type
        </label>

        <select
          id="meetingType"
          name="meetingType"
          defaultValue={
            initialData?.meetingType ?? "regular"
          }
          aria-describedby="meetingType-error"
          className="w-full rounded border p-2"
        >
          <option value="regular">Regular</option>
          <option value="special">Special</option>
        </select>

        <FieldError
          id="meetingType-error"
          errors={errors.meetingType}
        />
      </div>

      {/* Presiding */}
      <div>
        <label
          htmlFor="presiding"
          className="block font-semibold"
        >
          Presiding
        </label>

        <input
          id="presiding"
          name="presiding"
          type="text"
          required
          defaultValue={initialData?.presiding ?? ""}
          aria-describedby="presiding-error"
          className="w-full rounded border p-2"
        />

        <FieldError
          id="presiding-error"
          errors={errors.presiding}
        />
      </div>

      {/* Conducting */}
      <div>
        <label
          htmlFor="conducting"
          className="block font-semibold"
        >
          Conducting
        </label>

        <input
          id="conducting"
          name="conducting"
          type="text"
          required
          defaultValue={initialData?.conducting ?? ""}
          aria-describedby="conducting-error"
          className="w-full rounded border p-2"
        />

        <FieldError
          id="conducting-error"
          errors={errors.conducting}
        />
      </div>

      {/* Opening Hymn */}
      <fieldset className="space-y-3 rounded border p-4">
        <legend className="px-2 font-bold">
          Opening Hymn
        </legend>

        <label
          htmlFor="openingHymnNumber"
          className="block font-semibold"
        >
          Hymn Number
        </label>

        <input
          id="openingHymnNumber"
          name="openingHymnNumber"
          type="number"
          min="0"
          defaultValue={
            initialData?.openingHymn?.number ?? ""
          }
          aria-describedby="openingHymn-error"
          className="w-full rounded border p-2"
        />

        <label
          htmlFor="openingHymnTitle"
          className="block font-semibold"
        >
          Hymn Title
        </label>

        <input
          id="openingHymnTitle"
          name="openingHymnTitle"
          type="text"
          defaultValue={
            initialData?.openingHymn?.title ?? ""
          }
          aria-describedby="openingHymn-error"
          className="w-full rounded border p-2"
        />

        <FieldError
          id="openingHymn-error"
          errors={errors.openingHymn}
        />
      </fieldset>

      {/* Opening Prayer */}
      <div>
        <label
          htmlFor="openingPrayer"
          className="block font-semibold"
        >
          Opening Prayer
        </label>

        <input
          id="openingPrayer"
          name="openingPrayer"
          type="text"
          defaultValue={
            initialData?.openingPrayer ?? ""
          }
          aria-describedby="openingPrayer-error"
          className="w-full rounded border p-2"
        />

        <FieldError
          id="openingPrayer-error"
          errors={errors.openingPrayer}
        />
      </div>

      {/* Ward Business */}
      <fieldset className="space-y-3 rounded border p-4">
        <legend className="px-2 font-bold">
          Ward Business
        </legend>

        <textarea
          id="wardBusiness"
          name="wardBusiness"
          rows={4}
          defaultValue={wardBusiness
            .map((item) => item.description)
            .join("\n")}
          aria-describedby="wardBusiness-error"
          placeholder="Enter one item per line"
          className="w-full rounded border p-2"
        />

        <FieldError
          id="wardBusiness-error"
          errors={errors.wardBusiness}
        />
      </fieldset>

      {/* Stake Business */}
      <div>
        <label
          htmlFor="stakeBusiness"
          className="block font-semibold"
        >
          Stake Business
        </label>

        <select
          id="stakeBusiness"
          name="stakeBusiness"
          defaultValue={
            initialData?.stakeBusiness
              ? "true"
              : "false"
          }
          aria-describedby="stakeBusiness-error"
          className="w-full rounded border p-2"
        >
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>

        <FieldError
          id="stakeBusiness-error"
          errors={errors.stakeBusiness}
        />
      </div>

      {/* Sacrament Hymn */}
      <fieldset className="space-y-3 rounded border p-4">
        <legend className="px-2 font-bold">
          Sacrament Hymn
        </legend>

        <label
          htmlFor="sacramentHymnNumber"
          className="block font-semibold"
        >
          Hymn Number
        </label>

        <input
          id="sacramentHymnNumber"
          name="sacramentHymnNumber"
          type="number"
          min="0"
          defaultValue={
            initialData?.sacramentHymn?.number ?? ""
          }
          aria-describedby="sacramentHymn-error"
          className="w-full rounded border p-2"
        />

        <label
          htmlFor="sacramentHymnTitle"
          className="block font-semibold"
        >
          Hymn Title
        </label>

        <input
          id="sacramentHymnTitle"
          name="sacramentHymnTitle"
          type="text"
          defaultValue={
            initialData?.sacramentHymn?.title ?? ""
          }
          aria-describedby="sacramentHymn-error"
          className="w-full rounded border p-2"
        />

        <FieldError
          id="sacramentHymn-error"
          errors={errors.sacramentHymn}
        />
      </fieldset>

      {/* Speakers */}
      <fieldset className="space-y-3 rounded border p-4">
        <legend className="px-2 font-bold">
          Speakers
        </legend>

        <textarea
          id="speakers"
          name="speakers"
          rows={6}
          defaultValue={speakers
            .map(
              (speaker) =>
                `${speaker.type}|${speaker.name}|${speaker.topic}`
            )
            .join("\n")}
          aria-describedby="speakers-error"
          placeholder="One per line: speaker|Name|Topic"
          className="w-full rounded border p-2"
        />

        <p className="text-sm text-gray-600">
          Format: speaker|Name|Topic or
          musical-number|Name|Topic
        </p>

        <FieldError
          id="speakers-error"
          errors={errors.speakers}
        />
      </fieldset>

      {/* Closing Hymn */}
      <fieldset className="space-y-3 rounded border p-4">
        <legend className="px-2 font-bold">
          Closing Hymn
        </legend>

        <label
          htmlFor="closingHymnNumber"
          className="block font-semibold"
        >
          Hymn Number
        </label>

        <input
          id="closingHymnNumber"
          name="closingHymnNumber"
          type="number"
          min="0"
          defaultValue={
            initialData?.closingHymn?.number ?? ""
          }
          aria-describedby="closingHymn-error"
          className="w-full rounded border p-2"
        />

        <label
          htmlFor="closingHymnTitle"
          className="block font-semibold"
        >
          Hymn Title
        </label>

        <input
          id="closingHymnTitle"
          name="closingHymnTitle"
          type="text"
          defaultValue={
            initialData?.closingHymn?.title ?? ""
          }
          aria-describedby="closingHymn-error"
          className="w-full rounded border p-2"
        />

        <FieldError
          id="closingHymn-error"
          errors={errors.closingHymn}
        />
      </fieldset>

      {/* Closing Prayer */}
      <div>
        <label
          htmlFor="closingPrayer"
          className="block font-semibold"
        >
          Closing Prayer
        </label>

        <input
          id="closingPrayer"
          name="closingPrayer"
          type="text"
          defaultValue={
            initialData?.closingPrayer ?? ""
          }
          aria-describedby="closingPrayer-error"
          className="w-full rounded border p-2"
        />

        <FieldError
          id="closingPrayer-error"
          errors={errors.closingPrayer}
        />
      </div>

      {/* Announcements */}
      <div>
        <label
          htmlFor="announcements"
          className="block font-semibold"
        >
          Announcements
        </label>

        <textarea
          id="announcements"
          name="announcements"
          rows={4}
          defaultValue={
            initialData?.announcements.join("\n") ?? ""
          }
          aria-describedby="announcements-error"
          placeholder="Enter one announcement per line"
          className="w-full rounded border p-2"
        />

        <FieldError
          id="announcements-error"
          errors={errors.announcements}
        />
      </div>

      <SubmitButton isEdit={isEdit} />
    </form>
  );
}

