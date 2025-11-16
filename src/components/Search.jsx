import PropTypes from 'prop-types';
import { useState } from 'react';
import icon from '../util/icon';

const { FiSearch } = icon;

const Search = ({ className, placeholder, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) onSearch(searchTerm); // Gọi hàm onSearch từ component cha
    };

    return (
        <form onSubmit={handleSubmit} className='relative w-full'>
            <input 
                type="text" 
                name='timkiem' 
                placeholder={placeholder || 'Enter name product'}
                value={searchTerm}
                onChange={handleChange}
                className={`w-full py-1.5 pl-12 pr-5 border-custom rounded-[20px] text-sm leading-0 focus:ring-blue-500! focus:border-blue-500! ${className}`}
            />
            <button 
                type="submit" 
                className='absolute left-2.5 top-[50%] -translate-y-1/2 flex items-center justify-center w-[30px]'>
                <FiSearch className='size-5 text-[#888]'/>
            </button>
        </form>
    );
};

Search.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
};

export default Search;
