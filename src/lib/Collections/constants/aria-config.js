/**
 * Collection Pattern Configurations
 * Maps collection patterns to their ARIA roles, item roles, and selection attributes
 */
export const COLLECTION_PATTERNS = {
  listbox: {
    role: "listbox",
    itemRole: "option",
    selectionAttribute: "aria-selected",
  },
  menu: {
    role: "menu",
    itemRole: "menuitem",
    selectionAttribute: null,
  },
  menucheckbox: {
    role: "menu",
    itemRole: "menuitemcheckbox",
    selectionAttribute: "aria-checked",
  },
  menuradio: {
    role: "menu",
    itemRole: "menuitemradio",
    selectionAttribute: "aria-checked",
  },
  tabs: {
    role: "tablist",
    itemRole: "tab",
    selectionAttribute: "aria-selected",
    // Default orientation is horizontal, only specify if vertical
  },
  tree: {
    role: "tree",
    itemRole: "treeitem",
    selectionAttribute: "aria-selected",
  },
  radiogroup: {
    role: "radiogroup",
    itemRole: "radio",
    selectionAttribute: "aria-checked",
    selectionMode: "single",
  },
  checkboxgroup: {
    role: "group",
    itemRole: "checkbox",
    selectionAttribute: "aria-checked",
    selectionMode: "multiple",
  },
  grid: {
    role: "grid",
    itemRole: "gridcell",
    selectionAttribute: "aria-selected",
  },
  toolbar: {
    role: "toolbar",
    itemRole: null, // buttons are naturally interactive
    selectionAttribute: null, // aria-pressed is context-aware (toggle vs action), not role-aware
  },
  navigation: {
    role: "navigation",
    itemRole: null, // links are naturally interactive
    selectionAttribute: null,
  },
  list: {
    role: "list",
    itemRole: "listitem",
    selectionAttribute: null,
  },
};

/**
 * Role Inheritance Rules
 * Determines which role a nested collection should inherit from its parent
 */
export const ROLE_INHERITANCE_RULES = {
  tree: "group", // tree -> group -> group -> group...
  group: "group", // group -> group -> group... (maintains grouping)
  list: "list", // list -> list -> list... (maintains list structure)
  menu: "menu", // menu -> menu -> menu... (for nested menus)
};

/**
 * Default Orientations for Collection Roles
 * Roles that have a default orientation (null means the role doesn't use aria-orientation)
 */
export const ROLE_ORIENTATION_DEFAULTS = {
  tablist: "horizontal",
  toolbar: "horizontal",
  menubar: "horizontal",
  listbox: "vertical",
  menu: "vertical",
  slider: "horizontal",
  scrollbar: "vertical",
  tree: null, // Trees don't use aria-orientation (always hierarchical)
  grid: null, // Grids use row/column model, not orientation
};

/**
 * Roles that support aria-multiselectable
 * According to ARIA spec, only these roles can have aria-multiselectable
 */
export const ROLES_WITH_MULTISELECTABLE = ["listbox", "tree", "grid", "treegrid"];

/**
 * Item Role Mappings
 * Maps collection roles to their corresponding item roles
 */
export const COLLECTION_ITEM_ROLES = {
  listbox: "option",
  menu: "menuitem",
  menubar: "menuitem",
  tablist: "tab",
  tree: "treeitem",
  grid: "gridcell",
  radiogroup: "radio",
  list: "listitem",
  toolbar: null, // buttons are naturally interactive, no role needed
  navigation: null, // links are naturally interactive, no role needed
  group: "treeitem", // groups in trees contain tree items
};

/**
 * Semantic HTML Elements and their implicit ARIA roles
 * Used to avoid overriding semantic HTML roles with collection item roles
 */
export const SEMANTIC_ELEMENT_ROLES = {
  button: "button",
  a: "link",
  article: "article",
  section: "region",
  nav: "navigation",
  aside: "complementary",
  main: "main",
  header: "banner",
  footer: "contentinfo",
  form: "form",
  input: null, // varies by type
  textarea: "textbox",
  select: "combobox",
  img: "img",
  figure: "figure",
  table: "table",
  thead: "rowgroup",
  tbody: "rowgroup",
  tr: "row",
  th: "columnheader",
  td: "cell",
};
