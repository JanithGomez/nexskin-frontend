"use client";

import { useEffect, useState } from "react";
import Slider from "rc-slider";

const availabilities = [
  { label: "All", value: "" },
  { label: "In Stock", value: "in_stock" },
  { label: "Out of Stock", value: "out_of_stock" },
];

export default function ShopFilter({ onApplyFilters, filterData }) {
  const {
    brands = [],
    productTypes = [],
    skinTypes = [],
    targetGroups = [],
  } = filterData || {};

  const [price, setPrice] = useState([500, 100000]);
  const [minInput, setMinInput] = useState("500");
  const [maxInput, setMaxInput] = useState("100000");

  const [availability, setAvailability] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState([]);
  const [selectedSkinTypes, setSelectedSkinTypes] = useState([]);
  const [selectedTargetGroups, setSelectedTargetGroups] = useState([]);

  const applyPriceInput = (index) => {
    let value = Number(index === 0 ? minInput : maxInput);

    if (isNaN(value)) return;
    if (value < 500) value = 500;
    if (value > 100000) value = 100000;

    const newPrice = [...price];
    newPrice[index] = value;

    if (index === 0 && value > newPrice[1]) newPrice[1] = value;
    if (index === 1 && value < newPrice[0]) newPrice[0] = value;

    setPrice(newPrice);
  };

  const toggleSelection = (id, selectedState, setState) => {
    setState((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // ✅ Debounce: only send filters up; parent fetches page 1
  useEffect(() => {
    const timer = setTimeout(() => {
      const filters = {
        availability,
        brand_ids: selectedBrands,
        product_type_ids: selectedProductTypes,
        skin_type_ids: selectedSkinTypes,
        target_group_ids: selectedTargetGroups,
      };

      if (price[0] > 500) filters.price_min = price[0];
      if (price[1] < 100000) filters.price_max = price[1];

      onApplyFilters(filters);
    }, 500);

    return () => clearTimeout(timer);
  }, [
    price,
    availability,
    selectedBrands,
    selectedProductTypes,
    selectedSkinTypes,
    selectedTargetGroups,
    onApplyFilters,
  ]);

  const clearFilter = () => {
    setPrice([500, 100000]);
    setMinInput("500");
    setMaxInput("100000");
    setAvailability("");
    setSelectedBrands([]);
    setSelectedProductTypes([]);
    setSelectedSkinTypes([]);
    setSelectedTargetGroups([]);
  };

  const FilterList = ({ title, id, items, state, setState }) => (
    <div className="widget-facet">
      <div
        className="facet-title"
        data-bs-target={`#${id}`}
        data-bs-toggle="collapse"
        aria-expanded="true"
      >
        <span>{title}</span>
        <span className="icon icon-arrow-up" />
      </div>
      <div id={id} className="collapse show">
        <ul className="tf-filter-group current-scrollbar mb_36">
          {items.map((item) => (
            <li
              key={item.id}
              className="list-item d-flex gap-12 align-items-center"
              onClick={() => toggleSelection(item.id, state, setState)}
            >
              <input
                type="checkbox"
                className="tf-check"
                readOnly
                checked={state.includes(item.id)}
              />
              <label className="label">
                <span>{item.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="offcanvas offcanvas-start canvas-filter" id="filterShop">
      <div className="canvas-wrapper">
        <header className="canvas-header">
          <div className="filter-icon">
            <span className="icon icon-filter" />
            <span>Filter</span>
          </div>
          <span className="icon-close icon-close-popup" data-bs-dismiss="offcanvas" />
        </header>

        <div className="canvas-body">
          {/* Availability */}
          <div className="widget-facet">
            <div className="facet-title" data-bs-target="#avail" data-bs-toggle="collapse">
              <span>Availability</span>
              <span className="icon icon-arrow-up" />
            </div>
            <div id="avail" className="collapse show">
              <ul className="tf-filter-group mb_36">
                {availabilities.map((item) => (
                  <li
                    key={item.value}
                    className="list-item d-flex gap-12 align-items-center"
                    onClick={() => setAvailability(item.value)}
                  >
                    <input
                      type="radio"
                      name="availability"
                      className="tf-check"
                      readOnly
                      checked={availability === item.value}
                    />
                    <label className="label">
                      <span>{item.label}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Price */}
          <div className="widget-facet wrap-price">
            <div className="facet-title" data-bs-target="#price" data-bs-toggle="collapse">
              <span>Price</span>
              <span className="icon icon-arrow-up" />
            </div>
            <div id="price" className="collapse show">
              <div className="widget-price filter-price">
                <Slider range min={500} max={100000} step={500} value={price} onChange={setPrice} />

                <div className="d-flex gap-12 mt-12">
                  <div className="flex-fill">
                    <label className="label">Min (LKR)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={minInput}
                      min={500}
                      max={price[1]}
                      onChange={(e) => setMinInput(e.target.value)}
                      onBlur={() => applyPriceInput(0)}
                    />
                  </div>

                  <div className="flex-fill">
                    <label className="label">Max (LKR)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={maxInput}
                      min={price[0]}
                      max={100000}
                      onChange={(e) => setMaxInput(e.target.value)}
                      onBlur={() => applyPriceInput(1)}
                    />
                  </div>
                </div>

                <div className="box-title-price mt-8">
                  <span className="title-price">
                    Range: LKR {price[0].toLocaleString()} – LKR {price[1].toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Categorical */}
          <FilterList title="Brand" id="brand" items={brands} state={selectedBrands} setState={setSelectedBrands} />
          <FilterList title="Product Type" id="ptype" items={productTypes} state={selectedProductTypes} setState={setSelectedProductTypes} />
          <FilterList title="Skin Type" id="stype" items={skinTypes} state={selectedSkinTypes} setState={setSelectedSkinTypes} />
          <FilterList title="Target Groups" id="tgroup" items={targetGroups} state={selectedTargetGroups} setState={setSelectedTargetGroups} />

          <div className="mt-5"></div>
          <button className="tf-btn style-2 btn-fill rounded w-100" onClick={clearFilter}>
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  );
}
