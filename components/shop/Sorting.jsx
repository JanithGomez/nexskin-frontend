"use client";

import React, { useEffect, useState } from "react";
import { sortingOptions } from "@/data/shop";

export default function Sorting({ products = [], setFinalSorted }) {
  const [selectedOptions, setSelectedOptions] = useState(sortingOptions[0]);

  useEffect(() => {
    if (!products.length) {
      setFinalSorted([]);
      return;
    }

    let sortedProducts = [...products];

    switch (selectedOptions.text) {
      case "Alphabetically, A-Z":
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;

      case "Alphabetically, Z-A":
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;

      case "Price, low to high":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;

      case "Price, high to low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;

      case "Default":
      default:
        // keep original order
        break;
    }

    setFinalSorted(sortedProducts);
  }, [products, selectedOptions, setFinalSorted]);

  return (
    <>
      <div className="btn-select">
        <span className="text-sort-value">{selectedOptions.text}</span>
        <span className="icon icon-arrow-down" />
      </div>

      <div className="dropdown-menu">
        {sortingOptions.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedOptions(item)}
            className={`select-item ${
              item.text === selectedOptions.text ? "active" : ""
            }`}
          >
            <span className="text-value-item">{item.text}</span>
          </div>
        ))}
      </div>
    </>
  );
}
