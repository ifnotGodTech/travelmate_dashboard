"use client";
import React, { useState } from "react";
import { SuccessModal } from "@/components/reuseables/SuccessModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { LoadingFaqSkeleton } from "@/components/molecues/support/Faq";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useDeleteFaq, useGetAllFaq } from "@/hooks/api/faq";
import Button from "@/components/reuseables/Button";

// Define the FAQ type
type Faq = {
  id: number;
  category: number;
  category_name: string;
  question: string;
  answer: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  views: number;
};

// Define the Category type
type Category = {
  id: number;
  name: string;
  name_display: string;
  description: string;
  icon: string;
  order: number;
  faqs: Faq[];
};

// Define the main response type
export type FaqResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Category[];
};

const Page = () => {
  const [selectedFaqId, setSelectedFaqId] = useState<number | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { data, loading } = useGetAllFaq({ initalFetch: true, refresh });
  const { isloading, onDeleteFaq } = useDeleteFaq();

  const handleDeleteFaq = async () => {
    if (selectedFaqId !== null) {
      await onDeleteFaq({
        id: selectedFaqId,
        successCallback: async () => {
          setRefresh((prev: any) => !prev);
          setShowModal(true);
        },
      });
      setSelectedFaqId(null);
      setShowConfirmation(false);
    }
  };

  return (
    <>
      <div className="space-y-6 py-4 px-6 rounded-[8px] bg-[#fff]">
        <div className="space-y-6">
          <h1 className="font-semibold text-[20px] text-[#181818]">FAQs</h1>

          <FaqTabContent
            data={data}
            loading={loading}
            selectedFaqId={selectedFaqId}
            onSelectFaq={(id) => setSelectedFaqId(id)}
          />
        </div>

        {/* Delete Button */}
        <Button
          variant="red"
          title="DELETE SELECTED"
          full
          onClick={() => setShowConfirmation(true)}
          disabled={selectedFaqId === null || isloading}
        />

        {/* Confirmation Modal */}
        {showConfirmation && (
          <Dialog
            open={showConfirmation}
            onOpenChange={() => setShowConfirmation(false)}
          >
            <DialogContent className="w-full lg:min-w-[800px] p-[40px] space-y-10 rounded-[20px]">
              <DialogHeader>
                <DialogTitle>Delete FAQ?</DialogTitle>
              </DialogHeader>
              <DialogDescription>
                Are you sure you want to delete this FAQ? This action cannot be
                undone.
              </DialogDescription>
              <div className="flex justify-between space-x-4">
                <Button
                  title={isloading ? "DELETING..." : "DELETE"}
                  variant="red"
                  onClick={handleDeleteFaq}
                  full
                  disabled={isloading}
                />
                <Button
                  title="CANCEL"
                  variant="outline-dark"
                  onClick={() => setShowConfirmation(false)}
                  full
                />
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {showModal && (
        <SuccessModal
          title="FAQ deleted Successfully"
          description="You have successfully deleted a new FAQ for customers."
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

const FaqTabContent: React.FC<{
  data?: FaqResponse | null;
  loading: boolean;
  selectedFaqId: number | null;
  onSelectFaq: (id: number | null) => void;
}> = ({ data, loading, selectedFaqId, onSelectFaq }) => {
  const categories = data?.results || [];
  return (
    <div className="space-y-10">
      {loading ? (
        <LoadingFaqSkeleton />
      ) : (
        <Tabs defaultValue={categories[0]?.name_display || "Category"}>
          <TabsList className="w-full bg-transparent border-[#CDCED1] border-b-[1px] pb-[6px] rounded-none">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.name_display}
                className="p-2 bg-transparent shadow-transparent rounded-none border-b-[1px] border-transparent data-[state=active]:border-[#D72638]"
              >
                {category.name_display}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.name_display}>
              <Accordion type="single" collapsible>
                {category.faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={`faq-${faq.id}`}>
                    <AccordionTrigger>
                      <div className="flex items-center space-x-4">
                        <input
                          type="checkbox"
                          checked={selectedFaqId === faq.id}
                          onChange={(e) =>
                            onSelectFaq(e.target.checked ? faq.id : null)
                          }
                        />
                        <span>{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default Page;
