import React from "react";
import Tiptap from "@/components/ui/Tiptap";
type Partner = {
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
  partners: Partner[];
};

type PartnerProps = {
  isEditing: boolean;
  content: PartnerCategory[];
  onContentChange: (value: PartnerCategory[]) => void;
  onDeletePartner?: (categoryId: number, partnerId: number) => void;
};

const Partner = ({
  isEditing,
  content,
  onContentChange,
  onDeletePartner,
}: PartnerProps) => {
  const handleCategoryChange = (
    index: number,
    field: keyof PartnerCategory,
    value: string
  ) => {
    const updated = [...content];
    updated[index] = { ...updated[index], [field]: value };
    onContentChange(updated);
  };

  const handlePartnerChange = (
    categoryIndex: number,
    partnerIndex: number,
    field: keyof Partner,
    value: string | boolean
  ) => {
    const updated = [...content];
    const partners = [...updated[categoryIndex].partners];
    partners[partnerIndex] = {
      ...partners[partnerIndex],
      [field]: value,
    };
    updated[categoryIndex].partners = partners;
    onContentChange(updated);
  };

  const formatSnakeToTitle = (value: string): string => {
    return value
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="space-y-12">
      {content.map((cat, catIndex) => (
        <div key={cat.id} className="space-y-4">
          {/* Category Title */}
          <h3 className="text-lg font-semibold text-gray-900 capitalize">
            {formatSnakeToTitle(cat.name)} Partner
          </h3>

          {/* Category Description */}
          <div>
            {isEditing ? (
              <Tiptap
                content={cat.description}
                onChange={(value: string) =>
                  handleCategoryChange(catIndex, "description", value)
                }
              />
            ) : (
              <p
                className="text-gray-700 leading-relaxed text-base"
                dangerouslySetInnerHTML={{
                  __html: cat.description || "<p>No description available.</p>",
                }}
              ></p>
            )}
          </div>

          {/* Partner Names Line */}
          {!isEditing && (
            <div className="flex flex-wrap gap-x-2 text-base font-medium text-gray-800 uppercase">
              {cat.partners.map((partner, index) => (
                <span key={partner.id} className="capitalize">
                  <a href={partner.website} target="blank">
                    {partner.name || "No Partners for this category"}
                  </a>
                  {index < cat.partners.length - 1 && (
                    <span className="mx-2 text-gray-500">•</span>
                  )}
                </span>
              ))}
            </div>
          )}

          {/* Editable Partner List */}
          {isEditing && (
            <div className="space-y-6">
              {cat.partners.map((partner, partnerIndex) => (
                <div
                  key={partner.id}
                  className="p-4 bg-white rounded-md border border-gray-200 space-y-4"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block font-medium text-sm text-gray-700">
                        Name
                      </label>
                      <Tiptap
                        content={partner.name || "Unnamed Partner"}
                        onChange={(value: string) =>
                          handlePartnerChange(
                            catIndex,
                            partnerIndex,
                            "name",
                            value
                          )
                        }
                      />
                    </div>

                    {/* Website */}
                    <div>
                      <label className="block font-medium text-sm text-gray-700">
                        Website
                      </label>
                      <input
                        className="w-full border p-2"
                        value={partner.website || "https://example.com"}
                        onChange={(e) =>
                          handlePartnerChange(
                            catIndex,
                            partnerIndex,
                            "website",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block font-medium text-sm text-gray-700">
                      Description
                    </label>
                    <Tiptap
                      content={
                        partner.description || "No description provided."
                      }
                      onChange={(value: string) =>
                        handlePartnerChange(
                          catIndex,
                          partnerIndex,
                          "description",
                          value
                        )
                      }
                    />
                  </div>

                  {/* Logo */}
                  <div className="flex flex-col gap-2">
                    <label className="font-medium text-sm text-gray-700">
                      Logo URL
                    </label>
                    <input
                      className="border p-2 w-full"
                      value={partner.logo || ""}
                      onChange={(e) =>
                        handlePartnerChange(
                          catIndex,
                          partnerIndex,
                          "logo",
                          e.target.value
                        )
                      }
                    />
                  </div>

                  {/* Active Toggle */}
                  <div className="flex items-center gap-3">
                    <label className="font-medium text-sm text-gray-700">
                      Active:
                    </label>
                    <input
                      type="checkbox"
                      checked={partner.is_active}
                      onChange={(e) =>
                        handlePartnerChange(
                          catIndex,
                          partnerIndex,
                          "is_active",
                          e.target.checked
                        )
                      }
                    />
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => onDeletePartner?.(cat.id, partner.id)}
                      className="bg-red-600 py-2 text-white rounded-md cursor-pointer text-sm px-4"
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Partner;
