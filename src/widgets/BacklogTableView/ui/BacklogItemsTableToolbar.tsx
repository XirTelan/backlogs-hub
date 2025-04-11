import SearchBar from "@/components/SearchBar";
import { ItemFormModalOpen } from "@/containers/Items/ItemFormModal";
import SearchFilter from "@/features/searchFilter/SearchFilter";

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
