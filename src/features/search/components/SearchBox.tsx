"use client";

import {
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  type KeyboardEvent,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getMatchingSuggestions,
  type SearchSuggestion,
} from "@/features/search/utils/search.utils";

type SearchSuggestionsResponse = {
  suggestions: SearchSuggestion[];
};

type SearchBoxProps = {
  className?: string;
  inputClassName: string;
  placeholder: string;
  buttonLabel: string;
  maxSuggestions?: number;
  onSearch?: () => void;
};

let cachedSuggestions: SearchSuggestion[] | null = null;
let suggestionsRequest: Promise<SearchSuggestion[]> | null = null;

async function loadCatalogSuggestions() {
  if (cachedSuggestions) {
    return cachedSuggestions;
  }

  if (!suggestionsRequest) {
    suggestionsRequest = fetch("/api/search-suggestions")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load search suggestions");
        }

        return response.json() as Promise<SearchSuggestionsResponse>;
      })
      .then((data) => {
        cachedSuggestions = data.suggestions;
        return cachedSuggestions;
      })
      .catch(() => {
        cachedSuggestions = [];
        return cachedSuggestions;
      });
  }

  return suggestionsRequest;
}

export default function SearchBox({
  className,
  inputClassName,
  placeholder,
  buttonLabel,
  maxSuggestions = 6,
  onSearch,
}: SearchBoxProps) {
  const router = useRouter();
  const pathname = usePathname();
  const listboxId = useId();
  const latestSearchValue = useRef("");
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestionsSource, setSuggestionsSource] = useState<
    SearchSuggestion[]
  >([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const visibleSuggestions = useMemo(
    () => getMatchingSuggestions(suggestionsSource, searchTerm, maxSuggestions),
    [maxSuggestions, searchTerm, suggestionsSource],
  );

  function closeSuggestions() {
    setIsSuggestionsOpen(false);
    setHighlightedIndex(-1);
  }

  async function openSuggestionsForValue(value: string) {
    const trimmedValue = value.trim();
    latestSearchValue.current = value;

    if (trimmedValue.length < 2) {
      closeSuggestions();
      return;
    }

    const suggestions = await loadCatalogSuggestions();

    if (latestSearchValue.current !== value) {
      return;
    }

    setSuggestionsSource(suggestions);
    setIsSuggestionsOpen(true);
    setHighlightedIndex(-1);
  }

  function navigateToSearch(value: string) {
    const query = value.trim();

    if (!query) {
      closeSuggestions();

      if (pathname === "/search") {
        router.push("/search");
      }

      return;
    }

    router.push(`/search?q=${encodeURIComponent(query)}`);
    closeSuggestions();
    onSearch?.();
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const nextValue = event.target.value;
    setSearchTerm(nextValue);

    if (!nextValue.trim()) {
      latestSearchValue.current = nextValue;
      closeSuggestions();

      if (pathname === "/search") {
        router.push("/search");
      }

      return;
    }

    void openSuggestionsForValue(nextValue);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const highlightedSuggestion =
      highlightedIndex >= 0 ? visibleSuggestions[highlightedIndex] : undefined;

    navigateToSearch(highlightedSuggestion?.title ?? searchTerm);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      closeSuggestions();
      return;
    }

    if (!isSuggestionsOpen || visibleSuggestions.length === 0) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((currentIndex) =>
        currentIndex >= visibleSuggestions.length - 1 ? 0 : currentIndex + 1,
      );
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((currentIndex) =>
        currentIndex <= 0 ? visibleSuggestions.length - 1 : currentIndex - 1,
      );
    }
  }

  function handleFocus() {
    void openSuggestionsForValue(searchTerm);
  }

  function handleBlur(event: FocusEvent<HTMLElement>) {
    const nextFocus = event.relatedTarget;

    if (
      !(nextFocus instanceof Node) ||
      !event.currentTarget.contains(nextFocus)
    ) {
      closeSuggestions();
    }
  }

  return (
    <search className={className} onBlur={handleBlur}>
      <form onSubmit={handleSubmit} dir="ltr" className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={inputClassName}
          dir="auto"
          role="combobox"
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={isSuggestionsOpen && visibleSuggestions.length > 0}
          aria-haspopup="listbox"
        />

        <button
          type="submit"
          aria-label={buttonLabel}
          className="absolute start-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>

      {isSuggestionsOpen && visibleSuggestions.length > 0 && (
        <div
          id={listboxId}
          role="listbox"
          className="absolute start-0 top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-gray-100 bg-white py-2 shadow-lg"
          dir="auto"
        >
          {visibleSuggestions.map((suggestion, index) => (
            <button
              key={suggestion.id}
              type="button"
              role="option"
              aria-selected={highlightedIndex === index}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => navigateToSearch(suggestion.title)}
              className={`flex w-full items-center gap-3 px-4 py-2.5 text-start text-sm transition ${
                highlightedIndex === index
                  ? "bg-primary-50 text-primary-700"
                  : "text-gray-700 hover:bg-gray-50 hover:text-primary-700"
              }`}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                {suggestion.imageCover ? (
                  <Image
                    src={suggestion.imageCover}
                    alt={suggestion.title}
                    width={48}
                    height={48}
                    className="h-10 w-10 object-contain"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="text-gray-400"
                  />
                )}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block truncate font-medium">
                  {suggestion.title}
                </span>
                {(suggestion.brandName || suggestion.categoryName) && (
                  <span className="block truncate text-xs text-gray-500">
                    {[suggestion.brandName, suggestion.categoryName]
                      .filter(Boolean)
                      .join(" / ")}
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
      )}
    </search>
  );
}
