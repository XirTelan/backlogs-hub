import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import React, { useEffect, useState } from "react";

type FilterBlockProps = {
  backlogCategories: string[];
};
const FilterBlock = ({ backlogCategories }: FilterBlockProps) => {
  const [categories, setCategories] = useState(backlogCategories);
  const pathname = usePathname();
  const router = useRouter();

  const [actviveCategories, setActiveCategories] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const searchCategories = searchParams.get("categories");

  const changeParams = () => {
    console.log("searchParams.entries()", searchParams.entries());
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    console.log(current);
    const search = current.toString();
    // or const query = `${'?'.repeat(search.length && 1)}${search}`;
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };

  useEffect(() => {
    if (searchCategories) setActiveCategories(searchCategories.split("-"));
  }, [searchCategories]);

  return (
    <div>
      List: {actviveCategories.join(",")}
      <div>FilterBlock</div>
      <div>
        {categories.map((category) => (
          <button key={category} onClick={changeParams}>
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBlock;
