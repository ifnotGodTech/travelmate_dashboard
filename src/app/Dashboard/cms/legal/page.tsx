"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import About from "@/components/molecues/legal/About";
import Privacy from "@/components/molecues/legal/Privacy";
import Terms from "@/components/molecues/legal/Terms";
import Partner from "@/components/molecues/legal/Partner";
import Button from "@/components/reuseables/Button";
import SuccessModal from "@/components/ui/LegalSuccessModal";
import Link from "next/link";
import axios from "axios";
import env from "@/config/env";
import Loading from "../../admin/loading";
import { showErrorToast, showSuccessToast } from "@/utils/toasters";

const page = () => {
  return (
    <div>
      <ContentTab />
    </div>
  );
};

type AboutContent = {
  id: number;
  content: string;
  updated_at: string;
};
type PrivacyPolicy = {
  id: number;
  content: string;
  last_updated: string;
};
type TermsContent = {
  id: number;
  content: string;
  updated_at: string;
  last_updated: string;
};

type Partners = {
  id: number;
  name: string;
  logo: string;
  description: string;
  website: string;
  category: number;
  is_active: boolean;
};

type PartnerCategory = {
  id: number;
  name: string;
  description: string;
  partners: Partners[];
};

type ContentTypes = {
  about: string;
  privacy: PrivacyPolicy[];
  terms: TermsContent[];
  partnerCategory: PartnerCategory[];
};

const ContentTab = () => {
  const [editStates, setEditStates] = useState({
    about: false,
    privacy: false,
    terms: false,
    partner: false,
  });

  type TabKey = keyof typeof editStates; // "about" | "privacy" | "terms" | "partner"
  const [activeTab, setActiveTab] = useState<TabKey>("about");
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
  const [showAddPartnersModal, setShowAddPartnersModal] = useState(false);

  const [isLoadingAboutUpdate, setIsLoadingAboutUpdate] =
    useState<boolean>(false);
  const [isLoadingPrivacyUpdate, setIsLoadingPrivacyUpdate] =
    useState<boolean>(false);
  const [isLoadingTermsUpdate, setIsLoadingTermsUpdate] =
    useState<boolean>(false);
  const [isLoadingPartnerUpdate, setIsLoadingPartnerUpdate] =
    useState<boolean>(false);
  const [isLoadingPartnerCategoryUpdate, setIsLoadingPartnerCategoryUpdate] =
    useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const [contents, setContents] = useState<ContentTypes>({
    about: "",
    privacy: [],
    terms: [],
    partnerCategory: [],
  });

  const [contentIds, setContentIds] = useState({
    about: null,
    privacy: null,
    terms: null,
    partners: null,
    partnerCategory: null,
  });

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [aboutRes, privacyRes, termsRes, partnerRes, partnerCategoryRes] =
        await Promise.all([
          axios.get(env.api.aboutus),
          axios.get(env.api.privacypolicy),
          axios.get(env.api.termsofuse),
          axios.get(env.api.partners),
          axios.get(env.api.partnercategories),
        ]);
      const partnerCategories = partnerCategoryRes.data.results;
      const partners = partnerRes.data.results;
      const merged = partnerCategories.map((category: any) => ({
        ...category,
        partners: partners.filter(
          (partner: any) => partner.category === category.id
        ),
      }));
      setContents({
        about: aboutRes.data.content || aboutRes.data,
        privacy: [
          {
            id: privacyRes.data.id,
            content: privacyRes.data.content,
            last_updated: privacyRes.data.last_updated,
          },
        ],

        terms: [
          {
            id: termsRes.data.id,
            content: termsRes.data.content,
            updated_at: termsRes.data.updated_at,
            last_updated: termsRes.data.updated_at,
          },
        ],
        partnerCategory: merged,
      });
      setContentIds({
        about: aboutRes.data.id,
        privacy: privacyRes.data.id,
        terms: termsRes.data.id,
        partnerCategory: partnerCategoryRes.data.results?.map(
          (item: any) => item.id
        ),
        partners: partnerRes.data.results?.map((item: any) => item.id),
      });
      if (merged.length === 0) {
        merged.push({
          id: 0,
          name: "car_rental",
          description: "<p>Description for car rental category</p>",
          partners: [
            {
              id: 0,
              name: "Sample Partner",
              logo: "",
              description: "<p>Sample description for this partner</p>",
              website: "https://example.com",
              category: 0,
              is_active: true,
            },
          ],
        });
      }
      console.log(partnerCategoryRes.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load content. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateAboutContent = async () => {
    setIsLoadingAboutUpdate(true);
    setError(null);
    try {
      if (!editStates.about) {
        await axios.post(`${env.api.aboutus}/`, {
          content: contents.about,
        });
        showSuccessToast({
          message: "About content added successfully!",
        });
      } else {
        await axios.patch(`${env.api.aboutus}/${contentIds.about}/`, {
          content: contents.about,
        });
        setEditStates((prev) => ({ ...prev, about: false }));
        showSuccessToast({
          message: "About content updated successfully!",
        });
      }
    } catch (error: any) {
      console.error("Error updating about content:", error);
      showErrorToast({
        message:
          error?.response?.data?.detail ||
          "Failed to update about content. Please try again!",
      });
    } finally {
      setIsLoadingAboutUpdate(false);
    }
  };

  const updatePrivacyContent = async () => {
    setIsLoadingPrivacyUpdate(true);
    setError(null);
    try {
      if (!editStates.privacy) {
        await axios.post(`${env.api.privacypolicy}/`, {
          content: contents.privacy,
        });
        showSuccessToast({
          message: "Privacy content added successfully!",
        });
      } else {
        axios.patch(`${env.api.privacypolicy}/${contentIds.privacy}/`, {
          content: contents.privacy[0].content,
          last_updated: contents.privacy[0].last_updated,
        }),
          setEditStates((prev) => ({ ...prev, privacy: false }));
        showSuccessToast({
          message: "Privacy content updated successfully!",
        });
      }
    } catch (error: any) {
      console.error("Error updating privacy content:", error);
      showErrorToast({
        message:
          error?.response?.data?.detail ||
          "Failed to update privacy content. Please try again!",
      });
    } finally {
      setIsLoadingPrivacyUpdate(false);
    }
  };

  const updateTermsContent = async () => {
    setIsLoadingTermsUpdate(true);
    setError(null);
    try {
      if (!editStates.terms) {
        await axios.post(`${env.api.termsofuse}/`, {
          content: contents.terms,
        });
        showSuccessToast({
          message: "Terms of use content added successfully!",
        });
      } else {
        axios.patch(`${env.api.termsofuse}/${contentIds.terms}/`, {
          content: contents.terms[0].content,
          last_updated: contents.terms[0].updated_at,
        }),
          setEditStates((prev) => ({ ...prev, terms: false }));
        showSuccessToast({
          message: "Terms of use content updated successfully!",
        });
      }
    } catch (error: any) {
      console.error("Error updating terms of use content:", error);
      showErrorToast({
        message:
          error?.response?.data?.detail ||
          "Failed to update terms of use content. Please try again!",
      });
    } finally {
      setIsLoadingTermsUpdate(false);
    }
  };

  const deletePartners = async (categoryId: number, partnerId: number) => {
    try {
      await axios.delete(`${env.api.partners}/${partnerId}/`);
      fetchData();
    } catch (error) {
      console.error("Error deleting partner:", error);
      setError("Failed to delete partner. Please try again.");
    }
  };

  const toggleEdit = (section: keyof typeof editStates) => {
    setEditStates((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
    // Optionally: refetch to reset content when cancelling
    if (editStates[section]) {
      fetchData();
    }
  };

  const cancelAllEdits = () => {
    setEditStates({
      about: false,
      privacy: false,
      terms: false,
      partner: false,
    });
    fetchData();
  };

  const handleContentAboutChange = (
    section: keyof ContentTypes,
    value: AboutContent[] | string
  ) => {
    setContents((prev) => ({
      ...prev,
      [section]: value,
    }));
  };
  const handleContentPartnerChange = (
    section: keyof ContentTypes,
    value: PartnerCategory[]
  ) => {
    setContents((prev) => ({
      ...prev,
      [section]: value,
    }));
  };
  const handleContentTermsChange = (
    section: keyof ContentTypes,
    value: TermsContent[] | string
  ) => {
    setContents((prev) => ({
      ...prev,
      [section]: value,
    }));
  };
  const handleContentPrivacyChange = (
    section: keyof ContentTypes,
    value: PrivacyPolicy[] | string
  ) => {
    setContents((prev) => ({
      ...prev,
      [section]: value,
    }));
  };

  // const handleConfirmChanges = (): void => {
  //   updateContent();
  // };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="bg-[#fff] rounded-[8px] py-4 px-6 space-y-10">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <p className="font-[600] text-[14px] lg:text-[20px] text-[#181818] leading-[100%] ">
            Manage Information and Policies
          </p>
          {activeTab !== "partner" ? (
            <button
              onClick={() => {
                setEditStates((prev) => ({
                  ...prev,
                  [activeTab]: !prev[activeTab],
                }));
                if (editStates[activeTab]) fetchData();
              }}
              className="cursor-pointer py-2 px-4 rounded-[4px] bg-[#023E8A] font-[600] text-[16px] text-[#FFFFFF]"
            >
              {editStates[activeTab] ? "Cancel" : "Edit"}
            </button>
          ) : (
            <button
              onClick={() => {
                // setEditingPartner(null);
                setShowAddPartnersModal(true);
              }}
              className="bg-[#023E8A] text-white px-4 py-2 rounded-md hover:bg-blue-800 cursor-pointer"
            >
              Add Partner
            </button>
          )}

          <img
            onClick={() => {
              setEditStates((prev) => ({
                ...prev,
                [activeTab]: !prev[activeTab],
              }));
              if (editStates[activeTab]) fetchData();
            }}
            src="/assets/icons/mode_edit.svg"
            alt="Edit"
            className="cursor-pointer lg:hidden "
          />
        </div>

        <Tabs
          className="w-full space-y-8"
          value={activeTab}
          onValueChange={(value: string) => setActiveTab(value)}
        >
          <TabsList className="w-full bg-transparent border-[#CDCED1] border-b-[1px] pb-[6px] rounded-none">
            <TabsTrigger
              value="about"
              className="cursor-pointer p-2 bg-transparent shadow-transparent rounded-none border-b-[1px] border-transparent data-[state=active]:border-[#023E8A]"
            >
              About Us
            </TabsTrigger>
            <TabsTrigger
              value="privacy"
              className="cursor-pointer p-2 bg-transparent shadow-transparent rounded-none border-b-[1px] border-transparent data-[state=active]:border-[#023E8A]"
            >
              Privacy <span className="hidden lg:block ">Policy</span>
            </TabsTrigger>
            <TabsTrigger
              value="terms"
              className="cursor-pointer p-2 bg-transparent shadow-transparent rounded-none border-b-[1px] border-transparent data-[state=active]:border-[#023E8A]"
            >
              Terms
            </TabsTrigger>
            <TabsTrigger
              value="partner"
              className="cursor-pointer p-2 bg-transparent shadow-transparent rounded-none border-b-[1px] border-transparent data-[state=active]:border-[#023E8A]"
            >
              <span className="hidden lg:block ">Our Trusted</span> Partners
            </TabsTrigger>
          </TabsList>
          {isLoading && <Loading />}

          {error && (
            <div className="text-center text-red-500">
              <p>{error}</p>
            </div>
          )}
          <TabsContent value="about">
            <About
              isEditing={editStates.about}
              content={contents.about}
              onContentChange={(value) =>
                handleContentAboutChange("about", value)
              }
              updateAboutContent={updateAboutContent}
              isLoadingAboutUpdate={isLoadingAboutUpdate}
              onCancel={() =>
                setEditStates((prev) => ({ ...prev, about: false }))
              }
              onEdit={() => setEditStates((prev) => ({ ...prev, about: true }))}
            />
          </TabsContent>
          <TabsContent value="privacy">
            <Privacy
              isEditing={editStates.privacy}
              content={contents.privacy}
              onContentChange={(value) =>
                handleContentPrivacyChange("privacy", value)
              }
              updatePrivacyContent={updatePrivacyContent}
              isLoadingPrivacyUpdate={isLoadingPrivacyUpdate}
              onCancel={() =>
                setEditStates((prev) => ({ ...prev, privacy: false }))
              }
              onEdit={() =>
                setEditStates((prev) => ({ ...prev, privacy: true }))
              }
            />
          </TabsContent>
          <TabsContent value="terms">
            <Terms
              isEditing={editStates.terms}
              content={contents.terms}
              onContentChange={(value) =>
                handleContentTermsChange("terms", value)
              }
              updateTermsContent={updateTermsContent}
              isLoadingTermsUpdate={isLoadingTermsUpdate}
              onEdit={() => setEditStates((prev) => ({ ...prev, terms: true }))}
              onCancel={() =>
                setEditStates((prev) => ({ ...prev, partner: false }))
              }
            />
          </TabsContent>
          <TabsContent value="partner">
            <Partner
              isEditing={editStates.partner}
              content={contents.partnerCategory}
              onContentChange={(value) =>
                handleContentPartnerChange("partnerCategory", value)
              }
              onDeletePartner={(partnerId, categoryId) =>
                deletePartners(partnerId, categoryId)
              }
              showAddPartnersModal={showAddPartnersModal}
              setShowAddPartnersModal={setShowAddPartnersModal}
            />
          </TabsContent>
        </Tabs>
      </div>

      {editStates[activeTab] && (
        <div className="flex items-center justify-center relative">
          {isLoadingUpdate && (
            <svg
              className="animate-spin -ml-1 mr-48  h-4 w-4 text-white absolute "
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="#ffffff"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          {/* <Button
            onClick={handleConfirmChanges}
            full
            title="CONFIRM CHANGES"
            className="bg-[#023E8A] text-white"
          /> */}
        </div>
      )}
      {!editStates[activeTab] && (
        <Link href="/Dashboard/cms">
          <Button full variant="success" title="GO TO BACK TO SERVICES" />
        </Link>
      )}
      <div className="bg-[#fff] p-[40px] rounded-[20px]">
        <SuccessModal isOpen={showSuccessModal} onClose={handleCloseModal} />
      </div>
    </div>
  );
};

export default page;
