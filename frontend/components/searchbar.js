"use client";
import { useState, useEffect, useRef } from 'react';
import { getCategoriesFromDB, getdishesfromdb } from '@/components/getdishesfromdb.js';

const SearchForm = ({ setFilteredDishes, setSearchQuery }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [dishes, setDishes] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchCategoriesAndDishes = async () => {
      const [categoriesData, dishesData] = await Promise.all([getCategoriesFromDB(), getdishesfromdb()]);
      setCategories(categoriesData);
      setDishes(dishesData);
      setFilteredDishes(dishesData);
    };
    fetchCategoriesAndDishes();
  }, [setFilteredDishes]);

  const toggleDropdown = () => {
    setDropdownVisible(prev => !prev);
  };

  const handleCategoryClick = (category) => {
    setSearchQuery("");
    setFilteredDishes(dishes.filter(dish => dish.category === category));
    
    setDropdownVisible(false);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredDishes(dishes.filter(dish => dish.name.toLowerCase().includes(query)));
  };

  return (
    <form className="w-2/3 mx-auto outline-none bg-zinc-800 font-changa">
      <div className="flex relative">
        <button
          id="dropdown-button"
          onClick={toggleDropdown}
          className="flex-shrink-0 z-20 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-200 bg-gray-700 rounded-s-lg hover:bg-gray-600 focus:ring-4 focus:outline-none"
          type="button"
        >
          All categories{' '}
          <svg className="w-2.5 h-2.5 ms-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg>
        </button>
        {dropdownVisible && (
          <div ref={dropdownRef} className="absolute top-full mt-2 z-30 bg-zinc-700 divide-y divide-gray-600 rounded-lg shadow w-44">
            <ul className="py-2 text-sm text-gray-200" aria-labelledby="dropdown-button">
              {categories.map((category, index) => (
                <li key={index}>
                  <button type="button" onClick={() => handleCategoryClick(category)} className="inline-flex w-full px-4 py-2 hover:bg-gray-600">
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            onChange={handleSearch}
            className="block p-2.5 w-full z-10 text-sm bg-gray-700 text-gray-200 border border-gray-600 rounded-e-lg"
            placeholder="Search for dishes"
          />
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
