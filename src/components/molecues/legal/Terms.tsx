import Tiptap from "@/components/ui/Tiptap";
import React from "react";

type TermsContent = {
  id: number;
  content: string;
  last_updated: string;
  updated_at: string;
};

type Props = {
  isEditing: boolean;
  content: TermsContent[];
  onContentChange: (content: TermsContent[]) => void;
};

const Terms = ({ isEditing, content, onContentChange }: Props) => {
  const handleChange = (id: number, value: string) => {
    const updatedContent = content.map((item) =>
      item.id === id ? { ...item, content: value } : item
    );
    onContentChange(updatedContent);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      {isEditing
        ? content.map((item) => (
            <div key={item.id}  className={`w-full p-4 text-[16px] lg:text-[18px] font-[400] text-[#181818] leading-[30px] border border-gray-300 rounded-md ${
            isEditing ? "bg-[#CDCED1]" : ""
          }`}>
              <Tiptap
                content={item.content}
                onChange={(value: string) => handleChange(item.id, value)}
              />
            </div>
          ))
        : content.map((item, index) => (
            <div
              key={index}
              className="text-[16px] lg:text-[18px] font-[400] text-[#181818] leading-[30px]"
            >
              <p className="pb-3">
                Last updated: {formatDate(item.last_updated)}
              </p>
              {/* Split content by newline and render each line as a paragraph */}
              {item.content.split("\n").map((line, index) => (
                <p key={index} className="mb-3">
                  {line.trim()}
                </p>
              ))}
            </div>
          ))}
    </div>
  );
};

export default Terms;
