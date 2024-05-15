export interface TextBarProps {
  title: string;
  texts: string[];
}

export const TextBar = ({ title, texts }: TextBarProps) => {
  if (!texts.length) return <></>;
  return (
    <div className="flex flex-row dark:text-white items-center text-sm">
      <p className="font-bold">{title}:</p>
      {texts.map((text) => (
        <span key={text} className="underline ml-2">
          {text}
        </span>
      ))}
    </div>
  );
};

export default TextBar;
