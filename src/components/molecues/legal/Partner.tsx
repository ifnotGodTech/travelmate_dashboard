
import React from "react";

type Props = {
  isEditing: boolean;
  content: string;
  onContentChange: (content: string) => void;
};

const Partner = ({ isEditing, content, onContentChange }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onContentChange(e.target.value);
    };
  
  return (
    <div className="space-y-[40px]">

    {isEditing ? (
        <textarea
          value={content}
          onChange={handleChange}
          className="w-full p-4 text-[16px] lg:text-[18px] font-[400] text-[#181818] leading-[30px] border border-gray-300 rounded-md"
          rows={8}
        />
      ) : (
        <>
          <Partners content={content}/>
          <Partners content={content}/>
          <Partners content={content}/>
        </>
        
      )}
    </div>
  );
};

type PartnersProps = {
  content: string;
};


const Partners = ({ content }: PartnersProps) => {
  return (
    <div className="space-y-[20px]">
      <h1 className="text-[16px] lg:text-[20px] font-[400] text-[#181818] leading-[100%] ">
        Stay Partners
      </h1>
      <p className="text-[#4E4F52] text-[14px] lg:text-[20px] font-[400] leading-[100%] ">
       {content}
      </p>
      <ul className="flex space-x-10 flex-wrap">
        <li className="text-[#4E4F52] text-[14px] lg:text-[20px] font-[400] leading-[100%]">
          Marriott Hotels
        </li>
        <li className="text-[#4E4F52] text-[14px] lg:text-[20px] font-[400] leading-[100%]">
          Marriott Hotels
        </li>
        <li className="text-[#4E4F52] text-[14px] lg:text-[20px] font-[400] leading-[100%]">
          Marriott Hotels
        </li>
      </ul>
    </div>
  );
};

export default Partner;
