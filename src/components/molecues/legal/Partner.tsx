import React from "react";

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
};

const Partner = ({ isEditing, content, onContentChange }: PartnerProps) => {
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

  return (
    <div className="space-y-12">
      {content.map((cat, catIndex) => (
        <div key={cat.id} className="space-y-4">
          {/* Category Title */}
          <h3 className="text-lg font-semibold text-gray-900 capitalize">
            {isEditing ? (
              <input
                type="text"
                className="border border-gray-300 p-2 w-full text-lg font-semibold"
                value={cat.name}
                onChange={(e) =>
                  handleCategoryChange(catIndex, "name", e.target.value)
                }
              />
            ) : (
              `${cat.name} Partner`
            )}
          </h3>

          {/* Category Description */}
          <div>
            {isEditing ? (
              <textarea
                className="w-full border border-gray-300 p-2 text-sm text-gray-700"
                value={cat.description}
                onChange={(e) =>
                  handleCategoryChange(catIndex, "description", e.target.value)
                }
              />
            ) : (
              <p className="text-gray-700 leading-relaxed text-base">
                {cat.description}
              </p>
            )}
          </div>

          {/* Partner Names Line */}
          {!isEditing && (
            <div className="flex flex-wrap gap-x-2 text-base font-medium text-gray-800 uppercase">
              {cat.partners.map((partner, index) => (
                <span key={partner.id}>
                  {partner.name}
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
                      <input
                        className="w-full border p-2"
                        value={partner.name}
                        onChange={(e) =>
                          handlePartnerChange(
                            catIndex,
                            partnerIndex,
                            "name",
                            e.target.value
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
                        value={partner.website}
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
                    <textarea
                      className="w-full border p-2"
                      value={partner.description}
                      onChange={(e) =>
                        handlePartnerChange(
                          catIndex,
                          partnerIndex,
                          "description",
                          e.target.value
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
                      value={partner.logo}
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
