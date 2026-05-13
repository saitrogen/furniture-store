import fs from "node:fs"
const rawdata = fs.readFileSync("src/content/data/product.json", "utf-8");
const data = JSON.parse(rawdata);
const navData = [];

const map = {};

data.forEach(item => {
  const cat = item.product.category;

  const top = cat.top_level;
  const dept = cat.department;
  const type = cat.type;

  // create top category
  if (!map[top]) {
    map[top] = {
      category: top,
      departments: {}
    };
  }

  // create department
  if (!map[top].departments[dept]) {
    map[top].departments[dept] = {
      name: dept,
      types: []
    };
  }

  // avoid duplicate types
  if (!map[top].departments[dept].types.includes(type)) {
    map[top].departments[dept].types.push(type);
  }
});

// convert object -> array
for (const topCategory in map) {
  navData.push({
    category: topCategory,
    departments: Object.values(map[topCategory].departments)
  });
}

console.log(navData);