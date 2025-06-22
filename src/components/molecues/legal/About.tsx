import Tiptap from "@/components/ui/Tiptap";
import React, { useState } from "react";

type Props = {
  isEditing: boolean;
  content: string;
  onContentChange: (content: string) => void;
};

const About = ({ isEditing, content, onContentChange }: Props) => {
  return (
    <div>
      {isEditing ? (
        <div
          className={`w-full p-4 text-[16px] lg:text-[18px] font-[400] text-[#181818] leading-[30px] border border-gray-300 rounded-md ${
            isEditing ? "bg-[#CDCED1]" : ""
          }`}
        >
          <Tiptap
            onChange={(value: string) => onContentChange(value)}
            content={content}
          />
        </div>
      ) : (
        <div className="text-[16px] lg:text-[18px] font-[400] text-[#181818] leading-[30px]">
          <p
            dangerouslySetInnerHTML={{
              __html: content 
            }}
          ></p>
        </div>
      )}
    </div>
  );
};

export default About;
