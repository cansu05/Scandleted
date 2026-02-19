"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ContactFormValues, contactSchema } from "@/schemas/contact";
import { updateContactInformationAction } from "@/utils/action";

const fallbackContact: ContactFormValues = {
  fullName: "",
  address: "",
  city: "",
  postalCode: "",
  phone: "",
};

const ContactInformation = ({
  initialContact,
}: {
  initialContact?: Partial<ContactFormValues>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [contact, setContact] = useState<ContactFormValues>({
    fullName: initialContact?.fullName ?? fallbackContact.fullName,
    address: initialContact?.address ?? fallbackContact.address,
    city: initialContact?.city ?? fallbackContact.city,
    postalCode: initialContact?.postalCode ?? fallbackContact.postalCode,
    phone: initialContact?.phone ?? fallbackContact.phone,
  });
  const resolver = useMemo(() => yupResolver(contactSchema), []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver,
    defaultValues: contact,
  });

  const openModal = () => {
    reset(contact);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const onSubmit = handleSubmit(async (values) => {
    setSaveError("");
    const result = await updateContactInformationAction(values);
    if (!result?.ok) {
      setSaveError(result?.message || "Failed to save contact information.");
      return;
    }
    setContact(values);
    closeModal();
  });

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-xl">Contact Information</h3>
        <Button
          type="button"
          variant="outline"
          className="rounded-3xl cursor-pointer"
          onClick={openModal}
        >
          Edit
        </Button>
      </div>

      <div
        style={{ backgroundColor: "var(--bg-hero)" }}
        className="flex flex-row items-center gap-x-6 border border-secondary rounded-[1vw] p-4"
      >
        <div className="space-y-1 w-full">
          <p style={{ color: "var(--text)" }} className="text-xs tracking-wider">
            Recipient&apos;s Name
          </p>
          <h2 className="font-medium text-xl">
            {contact.fullName || "No contact info yet"}
          </h2>
          <div className="grid lg:grid-cols-3 sm:grid-cols-3 grid-cols-1 space-y-3 lg:space-y-0 sm:space-y-0">
            <div className="flex flex-col items-start space-y-1">
              <h5 className="text-sm font-medium tracking-wider">Address</h5>
              <p style={{ color: "var(--text)" }} className="text-xs leading-5">
                {contact.address} <br />
                {contact.city} <br />
                {contact.postalCode}
              </p>
            </div>

            <div className="flex flex-col items-start space-y-1">
              <h5 className="text-sm font-medium tracking-wider">Phone</h5>
              <p style={{ color: "var(--text)" }} className="text-xs tracking-wider">
                {contact.phone}
              </p>
            </div>

            <div className="flex flex-col items-start space-y-1">
              <h5 className="text-sm font-medium tracking-wider">City</h5>
              <p style={{ color: "var(--text)" }} className="text-xs leading-5">
                {contact.city}
              </p>
            </div>
          </div>
        </div>
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div
            style={{ backgroundColor: "var(--bg-hero)" }}
            className="w-full max-w-xl rounded-2xl border border-secondary p-6 shadow-lg"
          >
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-xl font-semibold">Update Contact Info</h4>
              <button
                type="button"
                className="cursor-pointer text-sm underline"
                onClick={closeModal}
              >
                Close
              </button>
            </div>

            <form onSubmit={onSubmit} className="space-y-3">
              <div>
                <Input placeholder="Full Name" {...register("fullName")} />
                {errors.fullName ? (
                  <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
                ) : null}
              </div>
              <div>
                <Input placeholder="Address" {...register("address")} />
                {errors.address ? (
                  <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                ) : null}
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <Input placeholder="City" {...register("city")} />
                  {errors.city ? (
                    <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                  ) : null}
                </div>
                <div>
                  <Input placeholder="Postal Code" {...register("postalCode")} />
                  {errors.postalCode ? (
                    <p className="mt-1 text-sm text-red-600">{errors.postalCode.message}</p>
                  ) : null}
                </div>
              </div>
              <div>
                <Input placeholder="Phone Number" {...register("phone")} />
                {errors.phone ? (
                  <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                ) : null}
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <Button type="button" variant="ghost" onClick={closeModal}>
                  Cancel
                </Button>
                <Button type="submit" className="rounded-3xl" disabled={isSubmitting}>
                  Save
                </Button>
              </div>
              {saveError ? (
                <p className="text-sm text-red-600">{saveError}</p>
              ) : null}
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ContactInformation;
