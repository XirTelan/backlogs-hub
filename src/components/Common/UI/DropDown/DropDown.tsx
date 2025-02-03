"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import ButtonBase from "../ButtonBase";
import { inputStyleVariants } from "@/lib/styles";
import styles from "./DropDown.module.css";
import useOutsideClickReg from "@/hooks/useOutsideClickReg";
import useToggle from "@/hooks/useToggle";
import { IoIosArrowDown, IoIosArrowUp, IoIosClose } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import cn from "classnames";

const DropDown = ({
  id,
  label,
  options,
  activeItems,
  children,
  onChange,
}: {
  id: string;
  label: string;
  options?: string[];
  onChange?: (value: string[]) => void;
  activeItems?: string[];
  children?: React.ReactNode;
}) => {
  const [selected, setSelected] = useState<Set<string>>(new Set(activeItems));
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(options ?? []);
  const { isOpen, setOpen, setClose, toggle } = useToggle();
  const containerRef = useRef<HTMLDivElement>(null);

  useOutsideClickReg(isOpen, containerRef, setClose);

  useEffect(() => {
    if (search === "") {
      setResults(options ?? []);
      return;
    }
    setResults((prev) => prev.filter((item) => item.startsWith(search)));
  }, [search, options]);

  useEffect(() => {
    if (onChange) onChange(Array.from(selected));
  }, [onChange, selected]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const clearSearch = () => {
    setSearch("");
  };

  const changeTagStatus = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const tag = e.currentTarget.dataset.tag;
    if (!tag) return;

    if (selected.has(tag)) selected.delete(tag);
    else selected.add(tag);
    setSelected(new Set(selected));
  };

  const clearTags = () => {
    setSelected(new Set());
    setClose();
  };

  const inputStyles = cn(
    styles["drop-input"],
    inputStyleVariants.layers[1],
    inputStyleVariants.sizes["medium"],
    " flex min-w-0 flex-1 grow  pe-10  text-text-secondary  outline-hidden placeholder:text-strong-1 read-only:bg-transparent",
  );

  return (
    <div
      style={{
        width: `min(300px,100%)`,
      }}
    >
      <label htmlFor={`dropdown_${id}-input`}>{label}</label>
      <div
        className={`${styles.container} relative  bg-layer-1   `}
        id={`dropdown_${id}`}
        aria-expanded={isOpen}
        ref={containerRef}
        onBlur={clearSearch}
      >
        <div className="flex  items-center">
          <div
            className={`${selected.size === 0 ? "hidden" : "flex"} me-2 ms-4 flex h-6 items-center rounded-full  bg-primary-text `}
          >
            <span className=" ps-2 text-xs text-neutral-900">
              {selected.size}
            </span>
            <button
              type="button"
              className=" flex h-6 w-6 items-center justify-center rounded-full text-neutral-900 hover:bg-neutral-300"
              onMouseDown={(e) => e.preventDefault()}
              onClick={clearTags}
            >
              <div className=" pointer-events-none ">
                <IoIosClose />
              </div>
            </button>
          </div>
          <input
            id={`dropdown_${id}-input`}
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
            onClick={setOpen}
            className={inputStyles}
            style={{
              paddingLeft: selected.size > 0 ? 0 : 16,
            }}
          />
          {search && (
            <div className="absolute right-8  border-e border-border-subtle-3">
              <ButtonBase
                type="button"
                variant="ghost"
                size="small"
                icon={<IoClose />}
                style={{ width: "auto" }}
                onClick={clearSearch}
              />
            </div>
          )}
          <div className="absolute right-0">
            <ButtonBase
              type="button"
              variant="ghost"
              size="small"
              icon={isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
              style={{ width: "auto" }}
              onClick={toggle}
            />
          </div>
        </div>
        {isOpen && (
          <div
            aria-labelledby={`dropdown_${id}`}
            role="region"
            className="absolute top-10 z-10 flex max-h-40 w-full overflow-y-auto bg-layer-1"
          >
            <ul
              className="flex-1 flex-col "
              onMouseDown={(e) => e.preventDefault()}
            >
              {results?.length > 0 &&
                results.map((tag, indx) => {
                  const isSelected = selected.has(tag);
                  return (
                    <li
                      key={indx}
                      className={cn(
                        isSelected
                          ? " text-text-primary "
                          : " text-text-secondary ",
                        `flex w-full cursor-pointer gap-4 border-b border-border-subtle-1 px-4  py-2 last:border-b-0`,
                      )}
                      data-tag={tag}
                      onClick={changeTagStatus}
                    >
                      <input
                        type="checkbox"
                        className=" pointer-events-none"
                        checked={isSelected}
                        readOnly
                      />
                      <div className="flex-1">{tag}</div>
                    </li>
                  );
                })}
              {children}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDown;
