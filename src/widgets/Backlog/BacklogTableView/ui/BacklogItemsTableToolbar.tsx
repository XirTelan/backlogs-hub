import SearchBar from "@/features/search/searchBar/SearchBar";
import { ItemFormModalOpen } from "@/features/backlogItem/createBacklogItem/ui/ItemFormModal";
import SearchFilter from "@/features/search/searchFilter/SearchFilter";

const BacklogItemsTableToolbar = ({
  showFilters = true,
  showAction = true,
}: {
  showFilters?: boolean;
  showAction?: boolean;
}) => {
  return (
    <section aria-label="data table  toolbar">
      <div className=" flex max-w-full  justify-between">
        <SearchBar />
        <div className="flex">
          <div className="flex">
            {showFilters && <SearchFilter />}
            {showAction && <ItemFormModalOpen />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BacklogItemsTableToolbar;
