import products from "@/content/data/new/product.json";

function slugify(str: string) {
  return str.toLowerCase().replaceAll(" ", "-");
}

type NavType = {
  name: string;
  slug: string;
};

type NavDepartment = {
  name: string;
  slug: string;
  types: NavType[];
};

type NavCategory = {
  name: string;
  slug: string;
  departments: NavDepartment[];
};

export function buildNavigation(): NavCategory[] {
  const map = new Map();

  products.forEach((product) => {
    const category = product.category;
    const department = product.department;
    const type = product.type;

    if (!map.has(category)) {
      map.set(category, {
        name: category,
        slug: slugify(category),
        departments: new Map(),
      });
    }

    const categoryObj = map.get(category);

    if (!categoryObj.departments.has(department)) {
      categoryObj.departments.set(department, {
        name: department,
        slug: slugify(department),
        types: [],
      });
    }

    const departmentObj = categoryObj.departments.get(department);

    const exists = departmentObj.types.find(
      (t: NavType) => t.name === type
    );

    if (!exists) {
      departmentObj.types.push({
        name: type,
        slug: slugify(type),
      });
    }
  });

  return Array.from(map.values()).map((category) => ({
    name: category.name,
    slug: category.slug,
    departments: Array.from(category.departments.values()),
  }));
}

export const navigation = buildNavigation();