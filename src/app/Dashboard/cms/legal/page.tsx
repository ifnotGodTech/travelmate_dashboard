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
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("about");
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

      console.log("Terms of Use API Response:", partnerCategoryRes);
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

  const updateContent = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const patchPartnerCategories = contents.partnerCategory
        .filter((item) => item && item.id)
        .map((item) =>
          axios.patch(`${env.api.partnercategories}/${item.id}/`, {
            name: item.name,
            description: item.description,
          })
        );

      const allPartners = contents.partnerCategory
        .filter((cat) => cat && cat.partners)
        .flatMap((cat) => cat.partners);

      const patchPartners = allPartners
        .filter((partner) => partner && partner.id)
        .map((partner) =>
          axios.patch(`${env.api.partners}/${partner.id}/`, {
            name: partner.name,
            description: partner.description,
            logo: partner.logo,
            website: partner.website,
            category: partner.category,
            is_active: partner.is_active,
          })
        );

      const postPartners = allPartners
        .filter((partner) => !partner.id) // Handle new partners without an ID
        .map((partner) =>
          axios.post(`${env.api.partners}/`, {
            name: partner.name,
            description: partner.description,
            logo: partner.logo,
            website: partner.website,
            category: partner.category,
            is_active: partner.is_active,
          })
        );

      await Promise.all([
        axios.patch(`${env.api.aboutus}/${contentIds.about}/`, {
          content: contents.about,
        }),
        axios.patch(`${env.api.privacypolicy}/${contentIds.privacy}/`, {
          content: contents.privacy[0].content,
          last_updated: contents.privacy[0].last_updated,
        }),
        axios.patch(`${env.api.termsofuse}/${contentIds.terms}/`, {
          content: contents.terms[0].content,
          last_updated: contents.terms[0].updated_at,
        }),
        ...patchPartnerCategories,
        ...patchPartners,
        ...postPartners,
      ]);
      console.log("Partner Categories After Patch:", contents.partnerCategory);
      console.log("All Partners after Patch:", allPartners);

      setIsEditing(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error updating content:", error);
      setError("Failed to update content. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = (): void => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Reset contents to original if canceling
      fetchData();
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

  const handleConfirmChanges = (): void => {
    updateContent();
  };

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
          <div
            onClick={handleEditClick}
            className=" cursor-pointer py-2 px-4 rounded-[4px] bg-[#023E8A] font-[600] text-[16px] leading-[100%] text-[#FFFFFF] hidden lg:block"
          >
            {isEditing ? "Cancel" : "Edit"}
          </div>
          <img
            onClick={handleEditClick}
            src="/assets/icons/mode_edit.svg"
            alt="Edit"
            className="cursor-pointer lg:hidden "
          />
        </div>

        <Tabs
          defaultValue="about"
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
          {isLoading && (
            <div className="text-center flex items-center justify-center gap-3">
              <p>Loading...</p>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          )}

          {error && (
            <div className="text-center text-red-500">
              <p>{error}</p>
            </div>
          )}
          <TabsContent value="about">
            <About
              isEditing={isEditing}
              content={contents.about}
              onContentChange={(value) =>
                handleContentAboutChange("about", value)
              }
            />
          </TabsContent>
          <TabsContent value="privacy">
            <Privacy
              isEditing={isEditing}
              content={contents.privacy}
              onContentChange={(value) =>
                handleContentPrivacyChange("privacy", value)
              }
            />
          </TabsContent>
          <TabsContent value="terms">
            <Terms
              isEditing={isEditing}
              content={contents.terms}
              onContentChange={(value) =>
                handleContentTermsChange("terms", value)
              }
            />
          </TabsContent>
          <TabsContent value="partner">
            <Partner
              isEditing={isEditing}
              content={contents.partnerCategory}
              onContentChange={(value) =>
                handleContentPartnerChange("partnerCategory", value)
              }
            />
          </TabsContent>
        </Tabs>
      </div>

      {isEditing && (
        <Button
          onClick={handleConfirmChanges}
          full
          title="CONFIRM CHANGES"
          className="bg-[#023E8A] text-white"
        />
      )}
      {!isEditing && (
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
