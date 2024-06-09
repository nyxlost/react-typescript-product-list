import React from 'react';

interface FilterComponentProps {
  filter: string;
  onFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Filter: React.FC<FilterComponentProps> = ({ filter, onFilterChange }) => {
  return (
    <div className="mb-5">
      <label htmlFor="filter" className="mr-2">Filter:</label>
      <select id="filter" value={filter} onChange={onFilterChange} className="p-2 border rounded">
        <option value="all">All</option>
        <option value="price_above_1000">Price above 1000</option>
        <option value="discount_percentage">Discount</option>
        <option value="sort_by_rating">Sort by Rating (High to Low)</option>
        <option value="sort_by_price">Sort by Price (Low to High)</option>
      </select>
    </div>
  );
};

export default Filter;
