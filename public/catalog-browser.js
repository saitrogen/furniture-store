(function () {
  const PAGE_SIZE = 16;
  const money = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  function normalize(value) {
    return String(value || "")
      .normalize("NFKD")
      .toLowerCase()
      .replace(/[^a-z0-9 ]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function imageForCard(src) {
    if (!src) return "";

    try {
      const url = new URL(src, window.location.origin);
      if (url.hostname.includes("images.unsplash.com")) {
        url.searchParams.set("w", "520");
        url.searchParams.set("q", "75");
        url.searchParams.set("auto", "format");
        url.searchParams.set("fit", "crop");
      }
      return url.toString();
    } catch {
      return src;
    }
  }

  function whatsappUrl(product) {
    const message = `Hi HOMEIX, I would like to enquire about ${product.name} (${product.id}).`;
    return `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function productCard(product) {
    const article = document.createElement("article");
    const name = escapeHtml(product.name);
    const type = escapeHtml(product.type);
    const department = escapeHtml(product.department);
    const rating = escapeHtml(product.rating);
    const slug = encodeURIComponent(product.slug);
    const image = escapeHtml(imageForCard(product.thumbnail || product.image));
    const enquiryUrl = escapeHtml(whatsappUrl(product));
    article.className = "group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card";
    article.innerHTML = `
      <a href="/products/${slug}" class="block aspect-4/3 overflow-hidden bg-muted">
        <img
          src="${image}"
          alt="${name}"
          loading="lazy"
          decoding="async"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 50vw"
          class="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </a>
      <div class="flex flex-1 flex-col gap-2 p-3 sm:gap-3 sm:p-4">
        <div class="flex items-start justify-between gap-2 sm:gap-3">
          <div class="min-w-0">
            <p class="truncate text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground sm:text-xs sm:tracking-[0.16em]">${type}</p>
            <h2 class="mt-1 line-clamp-2 text-base font-semibold leading-tight text-foreground sm:text-xl">
              <a href="/products/${slug}" class="hover:text-primary">${name}</a>
            </h2>
          </div>
          <p class="shrink-0 text-xs text-muted-foreground sm:text-sm">★ ${rating}</p>
        </div>
        <p class="line-clamp-1 text-xs text-muted-foreground sm:text-sm">${department}</p>
        <div class="mt-auto flex flex-col gap-2 pt-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:pt-2">
          <p class="text-sm font-semibold text-foreground sm:text-base">${money.format(product.price)}</p>
          <a
            href="${enquiryUrl}"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex min-h-9 items-center justify-center rounded-md bg-primary px-2 text-xs font-medium text-primary-foreground transition hover:bg-primary/90 sm:min-h-10 sm:px-3 sm:text-sm"
          >
            Enquire
          </a>
        </div>
      </div>
    `;
    return article;
  }

  function uniqueFacet(products, keySlug, keyName) {
    const map = new Map();
    products.forEach((product) => {
      const slug = product[keySlug];
      if (!map.has(slug)) {
        map.set(slug, {
          slug,
          name: product[keyName],
          count: 0,
        });
      }
      map.get(slug).count += 1;
    });
    return Array.from(map.values());
  }

  function sortProducts(products, sortValue) {
    return [...products].sort((a, b) => {
      if (sortValue === "price-low") return a.price - b.price;
      if (sortValue === "price-high") return b.price - a.price;
      if (sortValue === "rating") return b.rating - a.rating;
      if (sortValue === "name") return a.name.localeCompare(b.name);
      return a.index - b.index;
    });
  }

  async function initBrowser(root) {
    const grid = root.querySelector("[data-catalog-grid]");
    const chips = root.querySelector("[data-catalog-filters]");
    const count = root.querySelector("[data-catalog-count]");
    const heading = root.querySelector("[data-catalog-heading]");
    const search = root.querySelector("[data-catalog-search]");
    const sort = root.querySelector("[data-catalog-sort]");
    const sentinel = root.querySelector("[data-catalog-sentinel]");
    const loadMore = root.querySelector("[data-catalog-load-more]");
    const status = root.querySelector("[data-catalog-status]");
    const defaultHeading = root.dataset.defaultHeading || "Products";
    const filterMode = root.dataset.filterMode || "department";
    const scopeDepartment = root.dataset.scopeDepartment || "";
    const scopeType = root.dataset.scopeType || "";
    let activeFilter = "all";
    let rendered = 0;
    let currentProducts = [];

    if (!grid || !chips || !count) return;

    const response = await fetch("/catalog.json");
    const catalog = await response.json();
    const allProducts = catalog.products.map((product, index) => ({ ...product, index }));
    const scopedProducts = allProducts.filter((product) => {
      const departmentMatches = !scopeDepartment || product.departmentSlug === scopeDepartment;
      const typeMatches = !scopeType || product.typeSlug === scopeType;
      return departmentMatches && typeMatches;
    });

    const facetKeySlug = filterMode === "type" ? "typeSlug" : "departmentSlug";
    const facetKeyName = filterMode === "type" ? "type" : "department";
    const facets = filterMode === "none" ? [] : uniqueFacet(scopedProducts, facetKeySlug, facetKeyName);

    function setActiveChip(nextFilter) {
      activeFilter = nextFilter;
      chips.querySelectorAll("[data-catalog-filter]").forEach((button) => {
        const isActive = button.getAttribute("data-catalog-filter") === activeFilter;
        button.setAttribute("aria-pressed", String(isActive));
        button.classList.toggle("border-foreground", isActive);
        button.classList.toggle("bg-foreground", isActive);
        button.classList.toggle("text-background", isActive);
        button.classList.toggle("border-border", !isActive);
        button.classList.toggle("bg-background", !isActive);
        button.classList.toggle("text-foreground", !isActive);
      });
    }

    function renderChips() {
      chips.innerHTML = "";
      const all = document.createElement("button");
      all.type = "button";
      all.textContent = "All";
      all.setAttribute("data-catalog-filter", "all");
      all.setAttribute("aria-pressed", "true");
      all.className =
        "shrink-0 rounded-md border border-foreground bg-foreground px-3 py-2 text-sm font-medium text-background";
      chips.appendChild(all);

      facets.forEach((facet) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = `${facet.name} (${facet.count})`;
        button.setAttribute("data-catalog-filter", facet.slug);
        button.setAttribute("aria-pressed", "false");
        button.className =
          "shrink-0 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground hover:bg-accent";
        chips.appendChild(button);
      });

      chips.addEventListener("click", (event) => {
        const button = event.target.closest("[data-catalog-filter]");
        if (!button) return;
        setActiveChip(button.getAttribute("data-catalog-filter") || "all");
        applyControls();
      });
    }

    function getFilteredProducts() {
      const query = normalize(search instanceof HTMLInputElement ? search.value : "");
      const sortValue = sort instanceof HTMLSelectElement ? sort.value : "featured";
      const filtered = scopedProducts.filter((product) => {
        const facetMatches =
          activeFilter === "all" || filterMode === "none" || product[facetKeySlug] === activeFilter;
        const searchMatches = !query || product.searchText.includes(query);
        return facetMatches && searchMatches;
      });
      return sortProducts(filtered, sortValue);
    }

    function renderNextChunk() {
      const next = currentProducts.slice(rendered, rendered + PAGE_SIZE);
      const fragment = document.createDocumentFragment();
      next.forEach((product) => {
        const wrapper = document.createElement("div");
        wrapper.appendChild(productCard(product));
        fragment.appendChild(wrapper);
      });
      grid.appendChild(fragment);
      rendered += next.length;

      const hasMore = rendered < currentProducts.length;
      if (loadMore) loadMore.classList.toggle("hidden", !hasMore);
      if (sentinel) sentinel.classList.toggle("hidden", !hasMore);
    }

    function applyControls() {
      currentProducts = getFilteredProducts();
      rendered = 0;
      grid.innerHTML = "";

      const activeFacet = facets.find((facet) => facet.slug === activeFilter);
      if (heading) {
        heading.textContent = activeFilter === "all" ? defaultHeading : activeFacet?.name || defaultHeading;
      }
      count.textContent = `${currentProducts.length} product${currentProducts.length === 1 ? "" : "s"}`;

      if (status) {
        status.classList.toggle("hidden", currentProducts.length !== 0);
      }

      renderNextChunk();
    }

    renderChips();
    applyControls();

    search?.addEventListener("input", applyControls);
    sort?.addEventListener("change", applyControls);
    loadMore?.addEventListener("click", renderNextChunk);

    if ("IntersectionObserver" in window && sentinel) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && rendered < currentProducts.length) {
            renderNextChunk();
          }
        });
      }, { rootMargin: "600px" });
      observer.observe(sentinel);
    }
  }

  document.querySelectorAll("[data-catalog-browser]").forEach((root) => {
    initBrowser(root).catch((error) => {
      console.error("Catalog browser failed to load", error);
    });
  });
})();
