import { ChevronDownIcon } from "@/assets/icon/chevron-down";
import { useState, useRef, useEffect } from "react";

export interface MultipleAutocompleteOption {
  id: string;
  name: string;
}

interface AutocompleteProps {
  options: MultipleAutocompleteOption[];
  selectedOptions: MultipleAutocompleteOption[];
  onChange: (selected: MultipleAutocompleteOption[]) => void;
  subLabel?: string;
  selectAllLabel?: string;
  hasSelectAll?: boolean;
  placeholder?: string;
  label?: string;
  isRequired?: boolean;
}

const MultiAutocomplete = ({
  options,
  selectedOptions,
  onChange,
  subLabel,
  selectAllLabel = "Select all",
  hasSelectAll = false,
  placeholder = "Select",
  label,
  isRequired,
}: AutocompleteProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const allOption = { id: "ALL", name: selectAllLabel };
  const fullOptions = hasSelectAll ? [allOption, ...options] : options;
  const isAllSelected = selectedOptions.length === options.length;

  const filteredOptions = fullOptions.filter((option) =>
    option.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleSelect = (option: MultipleAutocompleteOption) => {
    let newSelectedOptions;
    if (option.id === "ALL") {
      newSelectedOptions = isAllSelected ? [] : [...options];
    } else {
      newSelectedOptions = selectedOptions.some(
        (selected) => selected.id === option.id
      )
        ? selectedOptions.filter((selected) => selected.id !== option.id)
        : [...selectedOptions, option];
    }
    onChange(newSelectedOptions);
    setInputValue("");
  };

  const handleRemove = (id: string) => {
    onChange(selectedOptions.filter((option) => option.id !== id));
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="h-full w-full flex gap-1 flex-col">
      <p className="flex items-center gap-1">
        <span className="text-guideSecond font-medium uppercase text-[13px]">
          {label}
        </span>
        {isRequired && (
          <span className="text-guide2 text-[13px] font-medium">*</span>
        )}
      </p>
      <div className="relative w-full flex flex-col gap-1" ref={wrapperRef}>
        <div
          className={`w-full border ${
            isOpen ? "border-guide2" : "border-guideBorder"
          } rounded px-3 py-2.5 h-full min-h-10 flex items-center gap-2 cursor-text`}
          onClick={() => {
            setIsOpen(true);
            inputRef.current?.focus();
          }}
        >
          <div className="flex-1 h-full flex flex-wrap gap-2">
            {selectedOptions && selectedOptions.length > 0 ? (
              selectedOptions.map((option) => (
                <div
                  key={option.id}
                  className="flex items-center gap-1 text-sm text-guideDark font-medium py-1 px-2 bg-[#EFF3FF] rounded-2xl h-[26px]"
                >
                  {option.name}
                  <button
                    className="group p-0"
                    onClick={() => handleRemove(option.id)}
                  >
                    <span className="text-guideFirst group-hover:text-red-500 text-sm">
                      x
                    </span>
                  </button>
                </div>
              ))
            ) : !isOpen ? (
              <span className="text-sm text-guideSecond font-medium">
                {placeholder}
              </span>
            ) : (
              <></>
            )}
            {isOpen && (
              <input
                ref={inputRef}
                type="text"
                className="flex-1 outline-none bg-transparent"
                value={inputValue}
                autoFocus
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsOpen(true)}
              />
            )}
          </div>

          <span className={`${isOpen ? "rotate-180" : ""}`}>
            <ChevronDownIcon />
          </span>
        </div>
        {isOpen && (
          <ul className="custom-scrollbar top-full absolute w-full mt-1 bg-white border rounded-lg z-[9] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)] max-h-40 overflow-auto">
            {filteredOptions.map((option) => (
              <li
                key={option.id}
                className={`px-[14px] py-2.5 cursor-pointer flex gap-2 items-center ${
                  selectedOptions.some((selected) => selected.id === option.id)
                    ? ""
                    : "hover:bg-gray-50"
                }`}
                onClick={() => handleSelect(option)}
              >
                <input
                  type="checkbox"
                  checked={
                    option.id === "ALL"
                      ? isAllSelected
                      : selectedOptions.some(
                          (selected) => selected.id === option.id
                        )
                  }
                  readOnly
                  className="accent-guide5"
                />
                <p className="text-sm font-medium text-guideDark flex items-center gap-1 truncate">
                  <span>{option.name}</span>
                  {subLabel && option.id !== "ALL" && (
                    <span className="text-guideSecond">({subLabel})</span>
                  )}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MultiAutocomplete;
