import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAllAssets } from '../store/cryptoSlice';
import { Sparklines, SparklinesLine } from 'react-sparklines';

const CryptoTable = ({ brandColor, accentColor, textColorDark, textColorLight, darkBackgroundColor }) => {
    const assets = useSelector(selectAllAssets); // Get assets from Redux

    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [filter, setFilter] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const formatNumber = (number) => {
        if (number === null) {
            return '-';
        }
        if (number >= 1000000000) {
            return (number / 1000000000).toFixed(2) + 'B';
        }
        if (number >= 1000000) {
            return (number / 1000000).toFixed(2) + 'M';
        }
        return number ? number.toFixed(2) : '-';
    };

    const formatSupply = (supply, symbol) => {
        if (supply === null) {
            return '-';
        }
        return `${formatNumber(supply)} ${symbol}`;
    };

    const formatPercentage = (percentage) => {
        if (percentage === null) {
            return '-';
        }
        const formatted = parseFloat(percentage).toFixed(2);
        return `${formatted}%`;
    };

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value);
    };

    const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value);
    };

    const filteredAssets = useMemo(() => {
        return assets.filter(asset => {
            const nameOrSymbolMatch = !filter || asset.name.toLowerCase().includes(filter.toLowerCase()) || asset.symbol.toLowerCase().includes(filter.toLowerCase());
            const price = asset.price;
            const minPriceFilter = minPrice === '' || price >= parseFloat(minPrice);
            const maxPriceFilter = maxPrice === '' || price <= parseFloat(maxPrice);
            return nameOrSymbolMatch && minPriceFilter && maxPriceFilter;
        });
    }, [assets, filter, minPrice, maxPrice]);

    const sortedAndFilteredAssets = useMemo(() => {
        if (!sortBy) {
            return filteredAssets;
        }

        const sorted = [...filteredAssets].sort((a, b) => {
            let comparison = 0;
            if (sortBy === 'price' || sortBy === 'marketCap' || sortBy === 'volume24h' || sortBy === 'circulatingSupply' || sortBy === 'maxSupply') {
                comparison = (a[sortBy] === null ? -1 : (b[sortBy] === null ? 1 : (a[sortBy] > b[sortBy] ? 1 : a[sortBy] < b[sortBy] ? -1 : 0)));
            } else if (sortBy === 'change1h' || sortBy === 'change24h' || sortBy === 'change7d') {
                const valueA = parseFloat(a[sortBy]);
                const valueB = parseFloat(b[sortBy]);
                comparison = (isNaN(valueA) ? -1 : (isNaN(valueB) ? 1 : (valueA > valueB ? 1 : valueA < valueB ? -1 : 0)));
            } else if (sortBy === 'name') {
                comparison = a.name.localeCompare(b.name);
            } else if (sortBy === '#') {
                comparison = assets.indexOf(a) > assets.indexOf(b) ? 1 : assets.indexOf(a) < assets.indexOf(b) ? -1 : 0;
            }
            return sortOrder === 'desc' ? comparison * -1 : comparison;
        });
        return sorted;
    }, [filteredAssets, sortBy, sortOrder, assets]);

    return (
        <div className="p-4">
            <div className="mb-4 flex items-center space-x-4">
                <div>
                    <label htmlFor="filter" className={`block text-${textColorDark} dark:text-${textColorLight} text-sm font-bold mb-2`}>
                        Filter by name or symbol:
                    </label>
                    <input
                        type="text"
                        id="filter"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-${textColorDark} leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:border-gray-600 dark:text-${textColorLight}`}
                        placeholder="Enter name or symbol"
                        value={filter}
                        onChange={handleFilterChange}
                        style={{ width: '200px' }}
                    />
                </div>
                <div>
                    <label htmlFor="minPrice" className={`block text-sm font-bold text-${textColorDark} dark:text-${textColorLight} mb-2`}>
                        Min Price:
                    </label>
                    <input
                        type="number"
                        id="minPrice"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-${textColorDark} leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:border-gray-600 dark:text-${textColorLight}`}
                        placeholder="Min"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                        style={{ width: '100px' }}
                    />
                </div>
                <div>
                    <label htmlFor="maxPrice" className={`block text-sm font-bold text-${textColorDark} dark:text-${textColorLight} mb-2`}>
                        Max Price:
                    </label>
                    <input
                        type="number"
                        id="maxPrice"
                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-${textColorDark} leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-800 dark:border-gray-600 dark:text-${textColorLight}`}
                        placeholder="Max"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                        style={{ width: '100px' }}
                    />
                </div>
            </div>
            <div className="overflow-x-auto shadow-md rounded-md">
                <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className={`text-xs text-gray-700 uppercase bg-${brandColor}-100 dark:bg-gray-700 dark:text-gray-400`}>
                        <tr>
                            <th scope="col" className={`px-2 py-3 sm:px-4 cursor-pointer font-semibold text-left text-${textColorDark} dark:text-${textColorLight}`} onClick={() => handleSort('#')}>
                                #
                            </th>
                            <th scope="col" className={`px-2 py-3 sm:px-4 cursor-pointer font-semibold text-left text-${textColorDark} dark:text-${textColorLight}`} onClick={() => handleSort('name')}>
                                Name
                            </th>
                            <th scope="col" className={`px-2 py-3 sm:px-4 cursor-pointer font-semibold text-left text-${textColorDark} dark:text-${textColorLight}`} onClick={() => handleSort('price')}>
                                Price
                            </th>
                            <th scope="col" className={`px-2 py-3 sm:px-4 cursor-pointer font-semibold text-left text-${textColorDark} dark:text-${textColorLight} hidden md:table-cell`} onClick={() => handleSort('change1h')}>
                                1h %
                            </th>
                            <th scope="col" className={`px-2 py-3 sm:px-4 cursor-pointer font-semibold text-left text-${textColorDark} dark:text-${textColorLight} hidden lg:table-cell`} onClick={() => handleSort('change24h')}>
                                24h %
                            </th>
                            <th scope="col" className={`px-2 py-3 sm:px-4 cursor-pointer font-semibold text-left text-${textColorDark} dark:text-${textColorLight} hidden lg:table-cell`} onClick={() => handleSort('change7d')}>
                                7d %
                            </th>
                            <th scope="col" className={`px-2 py-3 sm:px-4 cursor-pointer font-semibold text-left text-${textColorDark} dark:text-${textColorLight} hidden md:table-cell`} onClick={() => handleSort('marketCap')}>
                                Market Cap
                            </th>
                            <th scope="col" className={`px-2 py-3 sm:px-4 cursor-pointer font-semibold text-left text-${textColorDark} dark:text-${textColorLight} hidden xl:table-cell`} onClick={() => handleSort('volume24h')}>
                                24h Volume
                            </th>
                            <th scope="col" className={`px-2 py-3 sm:px-4 cursor-pointer font-semibold text-left text-${textColorDark} dark:text-${textColorLight} hidden xl:table-cell`} onClick={() => handleSort('circulatingSupply')}>
                                Circulating Supply
                            </th>
                            <th scope="col" className={`px-2 py-3 sm:px-4 cursor-pointer font-semibold text-left text-${textColorDark} dark:text-${textColorLight} hidden xl:table-cell`} onClick={() => handleSort('maxSupply')}>
                                Max Supply
                            </th>
                            <th scope="col" className={`px-2 py-3 sm:px-4 text-left text-${textColorDark} dark:text-${textColorLight}`}>
                                7D Chart
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedAndFilteredAssets.map((asset, index) => (
                            <tr key={asset.id} className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-${textColorDark} dark:text-${textColorLight}`}>
                                <td className="px-2 py-3 sm:px-4 font-medium">{index + 1}</td>
                                <td className="px-2 py-3 sm:px-4">
                                    <div className="flex items-center">
                                        <span className="mr-2">{asset.name}</span>
                                        <span className="text-gray-500 text-xs">{asset.symbol}</span>
                                    </div>
                                </td>
                                <td className="px-2 py-3 sm:px-4">${asset.price.toFixed(2)}</td>
                                <td className={`px-2 py-3 sm:px-4 ${asset.change1h >= 0 ? 'text-green-500' : 'text-red-500'} hidden md:table-cell`}>
                                    {formatPercentage(asset.change1h)}
                                </td>
                                <td className={`px-2 py-3 sm:px-4 ${asset.change24h >= 0 ? 'text-green-500' : 'text-red-500'} hidden lg:table-cell`}>
                                    {formatPercentage(asset.change24h)}
                                </td>
                                <td className={`px-2 py-3 sm:px-4 ${asset.change7d >= 0 ? 'text-green-500' : 'text-red-500'} hidden lg:table-cell`}>
                                    {formatPercentage(asset.change7d)}
                                </td>
                                <td className={`px-2 py-3 sm:px-4 ${asset.marketCap >= 0 ? 'text-green-500' : 'text-red-500'} hidden md:table-cell`}>
                                    ${formatNumber(asset.marketCap)}
                                </td>
                                <td className={`px-2 py-3 sm:px-4 ${asset.volume24h >= 0 ? 'text-green-500' : 'text-red-500'} hidden xl:table-cell`}>
                                    ${formatNumber(asset.volume24h)}
                                </td>
                                <td className={`px-2 py-3 sm:px-4 hidden xl:table-cell`}>{formatSupply(asset.circulatingSupply, asset.symbol)}</td>
                                <td className={`px-2 py-3 sm:px-4 hidden xl:table-cell`}>{formatSupply(asset.maxSupply, asset.symbol)}</td>
                                <td className="px-2 py-3 sm:px-4">
                                    <Sparklines data={asset.sparkline7d} height={20} width={60}>
                                        <SparklinesLine color={accentColor} />
                                    </Sparklines>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CryptoTable;