import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEditServices } from "@/hooks/api/cms";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const EditDialog = ({ serviceId, refresh }: any) => {
  const { onCMSdata } = useEditServices();

  const handleSubmit = async (values: { percentage: string }) => {
    await onCMSdata({
      id: serviceId,
      payload: values,
    });

    refresh();
  };

  const validationSchema = Yup.object({
    percentage: Yup.number()
      .required("Commission rate is required")
      .min(0, "Percentage must be at least 0")
      .max(100, "Percentage must be at most 100"),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-md text-[#023E8A] font-semibold text-xs lg:text-sm cursor-pointer">
          Edit
        </button>
      </DialogTrigger>
      <DialogContent className="p-0 min-w-[335px] lg:min-w-[800px]">
        <div className="py-6 space-y-4">
          <DialogHeader className="border-b-[1px] border-[#9B9EA4]">
            <DialogTitle className="px-6 pb-6">
              Stays Commission Rate
            </DialogTitle>
          </DialogHeader>

          <div className="px-6 space-y-8">
            <Formik
              initialValues={{ percentage: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isValid, values }) => (
                <Form>
                  <div className="space-y-3">
                    <label className="block text-[14px] lg:text-[20px] font-[500] text-[#181818]">
                      Commission Rate
                    </label>
                    <div className="flex py-4 px-3 border-[#818489] border-[1px] rounded-[8px] space-x-2 items-center">
                      <img src="/assets/icons/percentage.svg" alt="" />
                      <Field
                        name="percentage"
                        type="text"
                        className="outline-none flex-1"
                        placeholder="Enter commission rate"
                      />
                    </div>

                    <div className="flex bg-[#F5F5F5] p-4 rounded-[12px] space-x-[10px] items-start">
                      <img src="/assets/icons/in-fo.svg" alt="" />
                      <p>
                        The commission rate is the percentage added on top of
                        the base price we receive from the third-party provider
                        for flights.
                      </p>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        type="reset"
                        className="text-[#023E8A] border-[1px] border-[#023E8A] text-[20px] font-[500] cursor-pointer rounded-[8px] p-4"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-[#023E8A] text-white p-4 rounded-[8px] text-[20px] font-[500] cursor-pointer"
                        disabled={!isValid || !values.percentage}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
