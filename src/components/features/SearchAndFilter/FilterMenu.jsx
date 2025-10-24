import { PopupOverlay, PLACEMENTS } from "@lib/Overlay";
import { MenuList } from "@lib/Menu";

const FilterMenu = ({ popupControls, onChange, categories, priceRanges, selectedKeys }) => {
  return (
    <PopupOverlay
      trigger={popupControls.trigger}
      body={popupControls.body}
      close={popupControls.close}
      placement={PLACEMENTS.BOTTOM_START}
      trapFocus={false}
      style={{ width: "250px" }}
    >
      <MenuList
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        onChange={onChange}
        ariaLabel="Product filters menu"
      >
        <MenuList.Section key="categories" title="📦 Categories">
          {categories.map((category) => (
            <MenuList.Option key={category.id}>
              {category.name}
            </MenuList.Option>
          ))}
        </MenuList.Section>

        <MenuList.Section key="prices" title="💰 Price Ranges">
          {priceRanges.map((price) => (
            <MenuList.Option key={price.id}>
              {price.name}
            </MenuList.Option>
          ))}
        </MenuList.Section>
      </MenuList>
    </PopupOverlay>
  );
};

export default FilterMenu;
