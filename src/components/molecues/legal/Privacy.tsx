type PrivacyPolicy={
  id: number;
  content: string;
  last_updated: string;
}
type PrivacyProps = {
  isEditing: boolean;
  content: PrivacyPolicy[];
  onContentChange: (content: PrivacyPolicy[]) => void;
};

const Privacy = ({ isEditing, content, onContentChange }: PrivacyProps) => {
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
      {isEditing ? (
        content.map((item) => (
          <textarea
            key={item.id}
            value={item.content}
            onChange={(e) => handleChange(item.id, e.target.value)}
            className={`w-full p-4 text-[16px] lg:text-[18px] font-[400] text-[#181818] leading-[30px] border border-gray-300 rounded-md ${isEditing? 'bg-[#CDCED1]': ""}`}
            rows={8}
          />
        ))
      ) : (
        content.map((item) => (
          <div
            key={item.id}
            className="text-[16px] lg:text-[18px] font-[400] text-[#181818] leading-[30px]"
          >
            <p className="pb-3">Last updated: {formatDate(item.last_updated)}</p>
            {/* Split content by newline and render each line as a paragraph */}
            {item.content.split("\n").map((line, index) => (
              <p key={index} className="mb-3">
                {line.trim()}
              </p>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default Privacy;