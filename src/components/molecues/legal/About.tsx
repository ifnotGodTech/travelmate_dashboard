import React, { useState } from "react";

type Props = {
  isEditing: boolean;
  content: string;
  onContentChange: (content: string) => void;
};

const About = ({ isEditing, content, onContentChange }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onContentChange(e.target.value);
  };
  return (
    <div>
      {isEditing ? (
        <textarea
          value={content}
          onChange={handleChange}
          className={`w-full p-4 text-[16px] lg:text-[18px] font-[400] text-[#181818] leading-[30px] border border-gray-300 rounded-md ${isEditing? 'bg-[#CDCED1]': ""}`}
          rows={8}
        />
      ) : (
        <div className="text-[16px] lg:text-[18px] font-[400] text-[#181818] leading-[30px]">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
};

export default About;
