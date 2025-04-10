"use client";
import ButtonBase from "@/shared/ui/ButtonBase";
import LinkWithBtnStyle from "@/components/Common/UI/LinkWithBtnStyle";
import Loading from "@/components/Common/UI/Loading/Loading";
import SearchField from "@/components/Common/UI/SearchField";
import useDebounce from "@/shared/hooks/useDebounce";
import useToggle from "@/shared/hooks/useToggle";
import { SearchBar } from "@/types";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

const SearchGameBar = ({
  labelText,
  addGame,
  ref,
  ...props
}: SearchGameBarProps) => {
  const [inputText, setInputText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { isOpen, setOpen, setClose } = useToggle();
  const [results, setResults] = useState<
    {
      name: string;
      app_id: string;
      img: string;
      link: string;
    }[]
  >([]);

  const debounceSearch = useDebounce(inputText, 1000);
  function inputHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setInputText(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  }

  useEffect(() => {
    async function search() {
      setLoading(true);
      setOpen();
      const data = await fetch(
        `/api/game-search?game=${debounceSearch}`,
        {}
      ).then((res) => res.json());
      setResults(data);
      setLoading(false);
    }

    if (!debounceSearch) return;
    search();
  }, [debounceSearch]);

  const handleAddGame = (id: string, name: string) => {
    addGame(id, name);
    setClose();
  };

  return (
    <div className="flex flex-col ">
      <label>{labelText}</label>
      <div className="relative mb-1 flex flex-1">
        <SearchField ref={ref} {...props} onChange={inputHandler} />

        {isOpen && (
          <div className="absolute top-20 z-10 flex  w-60 flex-col bg-bg-main xs:w-80 md:w-3/4">
            <ButtonBase
              text="Close results"
              size="small"
              variant="secondary"
              icon={<IoMdClose />}
              onClick={setClose}
            />
            {loading && <Loading />}

            <ul className="w- mt-4 flex  w-full flex-wrap gap-4">
              {!loading &&
                results &&
                results.length > 0 &&
                results.map((item, indx) => {
                  return (
                    <div
                      key={`${item.app_id}_${indx}`}
                      className="flex  w-full flex-col items-center  bg-layer-1 p-2 md:flex-row"
                    >
                      <div className="relative h-[45px] w-[120px] shrink-0 md:h-auto">
                        <div className="absolute inset-0 flex  items-center justify-center">
                          <Image
                            src={item.img}
                            width={120}
                            height={45}
                            alt={""}
                          />
                        </div>
                      </div>
                      <div className="flex w-full flex-col md:ms-2">
                        <div>{item.name}</div>
                        <div className="flex flex-col md:flex-row">
                          <LinkWithBtnStyle
                            href={item.link}
                            target="_blank"
                            size="small"
                            variant="secondary"
                            rel="nofollow norefferer"
                          >
                            Steam Page
                          </LinkWithBtnStyle>

                          <ButtonBase
                            style={{ width: "100%" }}
                            variant="accent"
                            size="small"
                            type="button"
                            text="Add Game"
                            onClick={() =>
                              handleAddGame(item.app_id, item.name)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchGameBar;

type SearchGameBarProps = {
  labelText: string;
  addGame: (steamAppId: string, name: string) => void;
} & SearchBar;
