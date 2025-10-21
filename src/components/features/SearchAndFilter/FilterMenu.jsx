import Menu from "@lib/Menu";

const FilterMenu = ({ menuState, onChange, categories, priceRanges, selectedKeys }) => {
  return (
    <Menu
      {...menuState}
      onChange={onChange}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      ariaLabel="Product filters menu"
    >
      <Menu.Section title="📦 Categories">
        {categories.map((category) => (
          <Menu.Option key={category.id} value={category.id}>
            {category.name}
          </Menu.Option>
        ))}
      </Menu.Section>

      <Menu.Section title="💰 Price Ranges">
        {priceRanges.map((price) => (
          <Menu.Option key={price.id} value={price.id}>
            {price.name}
          </Menu.Option>
        ))}
      </Menu.Section>
    </Menu>
  );
};

export default FilterMenu;
