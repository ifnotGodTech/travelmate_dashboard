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

type ContentTypes = {
  about: string;
  privacy: string;
  terms: string;
  partner: string;
};

const ContentTab = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("about");
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

//   const fetchData= async()=>{
//     try {
//       const response = await axios.get(`${env.api.privacypolicy}`);
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }
// useEffect(()=>{
//   fetchData()
// })
  const [contents, setContents] = useState<ContentTypes>({
    about: `"At TravelMate, we make travel seamless and stress-free. Whether you're
    booking flights, finding the perfect stay, or renting a car, we provide
    a one-stop solution for all your travel needs. With an easy-to-use
    platform and a commitment to customer satisfaction, TravelMate ensures
    that every journey is smooth, affordable, and memorable. Wherever you're
    headed, let TravelMate be your trusted travel companion.`,

    privacy: `1. Introduction Welcome to TravelMate. We respect your privacy and are
      committed to protecting your personal data. This Privacy Policy explains
      how we collect, use, disclose, and safeguard your information when you use
      our website and mobile application (collectively, the "Service"). Please
      read this Privacy Policy carefully. By using our Service, you consent to
      the collection, use, and disclosure of your information as described in
      this Privacy Policy.
      
      2. Information We Collect
      
      2.1 Personal Information We may collect personal information that you
      voluntarily provide to us when you: Create an account Make a booking
      (flights, accommodations, car rentals) Contact our customer support
      Subscribe to our newsletter This information may include: Full name Email
      address Phone number Payment information Date of birth--
      
      2.2 Usage Information We automatically collect certain information when
      you use our Service, including: IP address Device type and identifiers
      Browser type and version Operating system Pages visited and features used
      Time and date of visits Referring website Search terms used to reach our
      Service Clickstream data
      
      2.3 Location Information With your consent, we may collect precise
      location information from your device to provide location-based services,
      such as finding nearby hotels or car rental locations.
      
      2.4 Cookies and Similar Technologies We use cookies, web beacons, and
      similar technologies to collect information about your browsing
      activities. For more information, please see our Cookie Policy.
      
      3. How We Use Your Information We use your information for the following
      purposes:
      
      3.1 To Provide Our Service Process and confirm your bookings Facilitate
      payments Send booking confirmations and updates Provide customer support
      Personalize your experience
      
      3.2 To Improve Our Service Analyze usage patterns and trends Troubleshoot
      issues Develop new features and services Conduct research and analysis
      
      3.3 For Marketing and Communication Send promotional offers and
      newsletters (if you have opted in) Provide updates about our Service
      Respond to your inquiries
      
      3.4 For Legal and Security Purposes Comply with legal obligations Enforce
      our Terms of Use Protect against fraudulent or illegal activity Ensure the
      security of our Service
      
      4. Information Sharing and Disclosure
      
      4.1 Service Providers We may share your information with third-party
      service providers who perform services on our behalf, such as: Payment
      processors Airlines, hotels, and car rental companies Customer support
      services Email and SMS delivery services Analytics providers Marketing
      partners
      
      4.2 Business Transfers If we are involved in a merger, acquisition, or
      sale of assets, your information may be transferred as part of that
      transaction.
      
      4.3 Legal Requirements We may disclose your information if required by
      law, regulation, legal process, or governmental request.
      
      4.4 With Your Consent We may share your information with third parties
      when you have given us your consent to do so.
      
      5. Data Security We implement appropriate technical and organizational
      measures to protect your personal information against unauthorized access,
      alteration, disclosure, or destruction. However, no method of transmission
      over the Internet or electronic storage is 100% secure, and we cannot
      guarantee absolute security.n
      
      6. International Data Transfers Your information may be transferred to,
      stored, and processed in countries other than your country of residence.
      These countries may have different data protection laws. We will take
      appropriate measures to ensure that your personal information remains
      protected in accordance with this Privacy Policy.
      
      7. Changes to This Privacy Policy We may update this Privacy Policy from
      time to time. The updated version will be indicated by an updated "Last
      Updated" date. We encourage you to review this Privacy Policy periodically
      to stay informed about how we are protecting your information.
      
      10. Contact Us If you have any questions about this Privacy Policy or our
      privacy practices, please contact us at: Email: privacy@travelmate.com
      Phone: 1-800-TRAVEL-MATE Address: 123 Booking Street, Suite 456, Travel
      City, TC 12345`,

    terms: `Last Updated: March 19, 2025

      1. Acceptance of Terms Welcome to TravelMate. These Terms of Use
      constitute a legally binding agreement between you and TravelMate Inc.
      ("TravelMate," "we," "us," or "our") governing your access to and use of
      the TravelMate website, mobile application, and services (collectively,
      the "Service"). By accessing or using the Service, you agree to be bound
      by these Terms of Use. If you do not agree to these Terms of Use, you may
      not access or use the Service.

      2. Eligibility You must be at least 18 years old and capable of forming a
      binding contract to use our Service. By using our Service, you represent
      and warrant that you meet these requirements.
      
      3. User Accounts
      
      3.1 Account Creation To access certain features of the Service, you may
      need to create an account. You agree to provide accurate, current, and
      complete information during the registration process and to update such
      information to keep it accurate, current, and complete.
      
      3.2 Account Security You are responsible for maintaining the
      confidentiality of your account credentials and for all activities that
      occur under your account. You agree to notify us immediately of any
      unauthorized use of your account or any other breach of security.
      
      3.3 Account Termination We reserve the right to suspend or terminate your
      account at any time for any reason, including if we believe that you have
      violated these Terms of Use
      
      4. Booking Services
      
      4.1 Booking Process TravelMate acts as an intermediary between you and
      travel service providers (airlines, stays, car rental companies, etc.).
      When you make a booking through our Service, you are entering into a
      contract directly with the travel service provider.
      
      4.2 Prices and Availability All prices and availability information
      displayed on our Service are subject to change without notice. We cannot
      guarantee that a price or particular item will be available until your
      booking is confirmed.
      
      4.3 Payment You agree to pay all applicable fees and charges for bookings
      made through our Service. We use third-party payment processors to handle
      payments, and your payment information will be subject to their terms and
      privacy policies.
      
      4.4 Cancellations and Refunds Cancellation and refund policies vary
      depending on the travel service provider. Please review the specific terms
      and conditions for each booking before confirming your purchase.
      
      5. Data Security You agree not to:
      Use the Service for any illegal purpose or in violation of any laws Post
      or transmit any content that is unlawful, harmful, threatening, abusive,
      harassing, defamatory, or otherwise objectionable Impersonate any person
      or entity or falsely state or misrepresent your affiliation with a person
      or entity Interfere with or disrupt the Service or servers or networks
      connected to the Service Attempt to gain unauthorized access to any
      portion of the Service or any other systems or networks connected to the
      Service Use any automated means to access the Service or collect any
      information from the Service Use the Service to send unsolicited
      communications or promotions Engage in any activity that could damage,
      disable, overburden, or impair the Service
      
      Intellectual Property
      
      6.1 TravelMate Content The Service and its original content, features, and
      functionality are owned by TravelMate and are protected by copyright,
      trademark, and other intellectual property laws. You may not reproduce,
      distribute, modify, create derivative works of, publicly display, publicly
      perform, republish, download, store, or transmit any of the material on
      our Service without our prior written consent.
      
      6.2 User Content You may be permitted to post, upload, or submit content
      to the Service (such as reviews). By providing content to the Service, you
      grant us a non-exclusive, transferable, sub-licensable, royalty-free,
      worldwide license to use, copy, modify, create derivative works based on,
      distribute, publicly display, and otherwise exploit such content in
      connection with the Service.
      
      7. Third-Party Links and Services The Service may contain links to
      third-party websites or services that are not owned or controlled by
      TravelMate. We have no control over, and assume no responsibility for, the
      content, privacy policies, or practices of any third-party websites or
      services. You further acknowledge and agree that we shall not be
      responsible or liable for any damage or loss caused by your use of such
      third-party websites or services.
      
      8. Limitation of Liability To the maximum extent permitted by law, in no
      event shall TravelMate, its affiliates, or their licensors, service
      providers, employees, agents, officers, or directors be liable for damages
      of any kind, whether direct, indirect, incidental, special, consequential,
      or punitive, arising out of or in connection with your use of the Service.
      
      9. Disclaimer of Warranties The Service is provided on an "as is" and "as
      available" basis, without any warranties of any kind, either express or
      implied. To the maximum extent permitted by law, we disclaim all
      warranties, including but not limited to implied warranties of
      merchantability, fitness for a particular purpose, and non-infringement.
      
      10. Contact Us If you have any questions about this Privacy Policy or our
      privacy practices, please contact us at: Email: privacy@travelmate.com
      Phone: 1-800-TRAVEL-MATE Address: 123 Booking Street, Suite 456, Travel
      City, TC 12345`,

    partner: `From luxury five-star hotels to cozy boutique stays and budget-friendly
    options, our accommodation partners offer variety and quality in every
    corner of the globe.`,
  });



  const handleEditClick = (): void => {
    setIsEditing(!isEditing);
  };

  const handleContentChange = (section: keyof ContentTypes, value: string) => {
    setContents((prev) => ({
      ...prev,
      [section]: value,
    }));
  };

  const handleConfirmChanges = (): void => {
    setIsEditing(false);
    setShowSuccessModal(true);
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

          <TabsContent value="about">
            <About
              isEditing={isEditing}
              content={contents.about}
              onContentChange={(value) => handleContentChange("about", value)}
            />
          </TabsContent>
          <TabsContent value="privacy">
            <Privacy
              isEditing={isEditing}
              content={contents.privacy}
              onContentChange={(value) => handleContentChange("privacy", value)}
            />
          </TabsContent>
          <TabsContent value="terms">
            <Terms
              isEditing={isEditing}
              content={contents.terms}
              onContentChange={(value) => handleContentChange("terms", value)}
            />
          </TabsContent>
          <TabsContent value="partner">
            <Partner
              isEditing={isEditing}
              content={contents.partner}
              onContentChange={(value) => handleContentChange("partner", value)}
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
      <Link href="/Dashboard/cms">
        <Button full variant="success" title="GO TO BACK TO SERVICES" />
      </Link>

      <div className="bg-[#fff] p-[40px] rounded-[20px]">
        <SuccessModal isOpen={showSuccessModal} onClose={handleCloseModal} />
      </div>
    </div>
  );
};

export default page;
