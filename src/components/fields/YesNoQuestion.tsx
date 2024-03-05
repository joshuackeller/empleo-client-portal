import { cn } from "@/src/utilities/cn";

interface YesNoQuestionProps {
  value: boolean | undefined;
  onChange: (val: boolean | undefined) => void;
}

const YesNoQuestion = ({ value, onChange }: YesNoQuestionProps) => {
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          if (value === false || value === undefined) {
            onChange(true);
          } else {
            onChange(undefined);
          }
        }}
        className={cn(
          "rounded-l border text-gray-400 border-gray-300 px-4 py-[5px]",
          value === true && "bg-blue-50 text-blue-700 border-blue-700",
          value === false && "border-r-0"
        )}
      >
        Yes
      </button>
      <button
        type="button"
        onClick={() => {
          if (value === true || value === undefined) {
            onChange(false);
          } else {
            onChange(undefined);
          }
        }}
        className={cn(
          "rounded-r border text-gray-400 border-gray-300 border-l-0 px-4 py-[5px]",
          value === false && "bg-blue-50 text-blue-800 border-l border-blue-800"
        )}
      >
        No
      </button>
    </div>
  );
};

export default YesNoQuestion;
