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
import HistoryModal from "@/components/molecues/legal/modals/HistoryModal";
import { useAuthContext } from "@/context/AuthContext";

const page = () => {
  return (
    <div>
      <ContentTab />
    </div>
  );
};

export type AboutContent = {
  id: number;
  content: string;
  updated_at: string;
};
export type PrivacyPolicy = {
  id: number;
  content: string;
  last_updated: string;
};
export type TermsContent = {
  id: number;
  content: string;
  updated_at: string;
  last_updated: string;
};

export type Partners = {
  id: number;
  name: string;
  logo: string | File;
  description: string;
  website: string;
  category: number;
  is_active: boolean;
};

export type PartnerCategory = {
  id: number;
  name: string;
  description: string;
  partners: Partners[];
};

type ContentTypes = {
  about: AboutContent[];
  privacy: PrivacyPolicy[];
  terms: TermsContent[];
  partnerCategory: PartnerCategory[];
};
export type HistoryProps = {
  id: number;
  object_id: number;
  action: "create" | "update";
  admin_full_name: string;
  admin_role: string;
  content_type: "privacy_policy" | "about_us" | "terms_of_use" | "partner";
  timestamp: string;
};

const ContentTab = () => {
  const { accessToken } = useAuthContext();

  const [editStates, setEditStates] = useState({
    about_us: false,
    privacy_policy: false,
    terms_of_use: false,
    partner: false,
  });

  type TabKey = keyof typeof editStates; // "about_us" | "privacy_policy" | "terms_of_use" | "partners"
  const [activeTab, setActiveTab] = useState<TabKey>("about_us");
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
  const [showAddPartnersModal, setShowAddPartnersModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [historyDetails, setHistoryDetails] = useState<HistoryProps[]>([]);

  const [isLoadingAboutUpdate, setIsLoadingAboutUpdate] =
    useState<boolean>(false);
  const [isLoadingPrivacyUpdate, setIsLoadingPrivacyUpdate] =
    useState<boolean>(false);
  const [isLoadingTermsUpdate, setIsLoadingTermsUpdate] =
    useState<boolean>(false);

  const [error, setError] = useState<string | null>(null);

  const [contents, setContents] = useState<ContentTypes>({
    about: [],
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
        about: [
          {
            id: aboutRes.data.id,
            content: aboutRes.data.content,
            updated_at: aboutRes.data.updated_at,
          },
        ],
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
      if (!editStates.about_us) {
        await axios.post(`${env.api.aboutus}/`, {
          content: contents.about,
        });
        showSuccessToast({
          message: "About content added successfully!",
        });
      } else {
        await axios.patch(`${env.api.aboutus}/${contentIds.about}/`, {
          content: contents.about[0].content,
          last_updated: contents.about[0].updated_at,
        });
        setEditStates((prev) => ({ ...prev, about_us: false }));
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
      if (!editStates.privacy_policy) {
        await axios.post(`${env.api.privacypolicy}/`, {
          content: contents.privacy,
        });
        showSuccessToast({
          message: "Privacy content added successfully!",
        });
      } else {
        await axios.patch(`${env.api.privacypolicy}/${contentIds.privacy}/`, {
          content: contents.privacy[0].content,
          last_updated: contents.privacy[0].last_updated,
        });
        setEditStates((prev) => ({ ...prev, privacy_policy: false }));
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
      if (!editStates.terms_of_use) {
        await axios.post(
          `${env.api.termsofuse}/`,
          {
            content: contents.terms,
          }
        );
        showSuccessToast({
          message: "Terms of use content added successfully!",
        });
      } else {
        await axios.patch(`${env.api.termsofuse}/${contentIds.terms}/`, {
          content: contents.terms[0].content,
          last_updated: contents.terms[0].updated_at,
        }),
          setEditStates((prev) => ({ ...prev, terms_of_use: false }));
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
  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  const getHistory = async () => {
    try {
      const response = await axios.get(
        `${env.api.admin}/policy-update-history/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("History data:", response.data);
      setHistoryDetails(response.data.results);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };
  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div className="bg-[#fff] rounded-[8px] py-4 px-6 space-y-10">
      <div className="space-y-8">
        <HistoryModal
          activeTab={activeTab}
          historyDetails={historyDetails}
          showHistoryModal={showHistoryModal}
          onClose={() => setShowHistoryModal(false)}
        />
        <div className="flex lg:flex-row flex-col lg:items-center justify-normal lg:justify-between">
          <p className="font-[600] text-[14px] lg:text-[20px] text-[#181818] leading-[100%] ">
            Manage Information and Policies
          </p>
          <div className="flex lg:justify-end justify-normal items-center space-x-4 mt-5">
            <button
              className="cursor-pointer py-2 px-4 rounded-lg border-[1px] border-[#023E8A] font-[600] text-[16px] text-[#023E8A]"
              onClick={() => setShowHistoryModal(true)}
            >
              History
            </button>
            {activeTab !== "partner" ? (
              <button
                onClick={() => {
                  setEditStates((prev) => ({
                    ...prev,
                    [activeTab]: !prev[activeTab],
                  }));
                  if (editStates[activeTab]) fetchData();
                }}
                className="cursor-pointer py-2 px-4 rounded-lg bg-[#023E8A] font-[600] text-[16px] text-[#FFFFFF] hidden lg:block"
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
            {activeTab !== "partner" && (
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
            )}
          </div>
        </div>

        <Tabs
          className="w-full space-y-8"
          value={activeTab}
          onValueChange={(value: string) => setActiveTab(value)}
        >
          <TabsList className="w-full bg-transparent border-[#CDCED1] border-b-[1px] pb-[6px] rounded-none">
            <TabsTrigger
              value="about_us"
              className="cursor-pointer p-2 bg-transparent shadow-transparent rounded-none border-b-[1px] border-transparent data-[state=active]:border-[#023E8A]"
            >
              About Us
            </TabsTrigger>
            <TabsTrigger
              value="privacy_policy"
              className="cursor-pointer p-2 bg-transparent shadow-transparent rounded-none border-b-[1px] border-transparent data-[state=active]:border-[#023E8A]"
            >
              Privacy <span className="hidden lg:block ">Policy</span>
            </TabsTrigger>
            <TabsTrigger
              value="terms_of_use"
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
          <TabsContent value="about_us">
            <About
              isEditing={editStates.about_us}
              content={contents.about}
              onContentChange={(value) =>
                handleContentAboutChange("about", value)
              }
              updateAboutContent={updateAboutContent}
              isLoadingAboutUpdate={isLoadingAboutUpdate}
              onCancel={() =>
                setEditStates((prev) => ({ ...prev, about_us: false }))
              }
              onEdit={() =>
                setEditStates((prev) => ({ ...prev, about_us: true }))
              }
            />
          </TabsContent>
          <TabsContent value="privacy_policy">
            <Privacy
              isEditing={editStates.privacy_policy}
              content={contents.privacy}
              onContentChange={(value) =>
                handleContentPrivacyChange("privacy", value)
              }
              updatePrivacyContent={updatePrivacyContent}
              isLoadingPrivacyUpdate={isLoadingPrivacyUpdate}
              onCancel={() =>
                setEditStates((prev) => ({ ...prev, privacy_policy: false }))
              }
              onEdit={() =>
                setEditStates((prev) => ({ ...prev, privacy_policy: true }))
              }
            />
          </TabsContent>
          <TabsContent value="terms_of_use">
            <Terms
              isEditing={editStates.terms_of_use}
              content={contents.terms}
              onContentChange={(value) =>
                handleContentTermsChange("terms", value)
              }
              updateTermsContent={updateTermsContent}
              isLoadingTermsUpdate={isLoadingTermsUpdate}
              onEdit={() =>
                setEditStates((prev) => ({ ...prev, terms_of_use: true }))
              }
              onCancel={() =>
                setEditStates((prev) => ({ ...prev, terms_of_use: false }))
              }
            />
          </TabsContent>
          <TabsContent value="partner">
            <Partner
              content={contents.partnerCategory}
              onContentChange={(value) =>
                handleContentPartnerChange("partnerCategory", value)
              }
              onDeletePartner={(partnerId, categoryId) =>
                deletePartners(partnerId, categoryId)
              }
              showAddPartnersModal={showAddPartnersModal}
              setShowAddPartnersModal={setShowAddPartnersModal}
              historyDetails={historyDetails}
              getHistory={getHistory}
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
