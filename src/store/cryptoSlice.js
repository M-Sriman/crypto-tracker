import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';


const initialState = {
    assets: [
        {
            id: uuidv4(),
            name: 'Bitcoin',
            symbol: 'BTC',
            price: 63759.48,
            change1h: 0.43,
            change24h: 0.93,
            change7d: 11.11,
            marketCap: 1181618902186,
            volume24h: 43874350047,
            circulatingSupply: 19.65,
            maxSupply: 21,
            sparkline7d: [60000, 61500, 62000, 63000, 62500, 63500, 63700],
        },
        {
            id: uuidv4(),
            name: 'Ethereum',
            symbol: 'ETH',
            price: 3180.02,
            change1h: 0.60,
            change24h: 3.21,
            change7d: 13.68,
            marketCap: 381589279327,
            volume24h: 23347469307,
            circulatingSupply: 120.71,
            maxSupply: null,
            sparkline7d: [2900, 3000, 3050, 3100, 3080, 3150, 3170],
        },
        {
            id: uuidv4(),
            name: 'Tether',
            symbol: 'USDT',
            price: 1.00,
            change1h: 0.00,
            change24h: 0.00,
            change7d: 0.04,
            marketCap: 105320022085,
            volume24h: 92288882007,
            circulatingSupply: 105.27,
            maxSupply: null,
            sparkline7d: [0.998, 0.999, 1.001, 1.00, 1.002, 1.00, 1.00],
        },
        {
            id: uuidv4(),
            name: 'XRP',
            symbol: 'XRP',
            price: 0.52,
            change1h: 0.46,
            change24h: 0.54,
            change7d: 6.18,
            marketCap: 27303114966,
            volume24h: 15731481491,
            circulatingSupply: 54.39,
            maxSupply: 100,
            sparkline7d: [0.48, 0.50, 0.51, 0.52, 0.515, 0.525, 0.52],
        },
        {
            id: uuidv4(),
            name: 'Binance Coin',
            symbol: 'BNB',
            price: 360.65,
            change1h: 0.09,
            change24h: 1.20,
            change7d: 3.73,
            marketCap: 55471256847,
            volume24h: 1874281784,
            circulatingSupply: 153.83,
            maxSupply: null,
            sparkline7d: [340, 350, 355, 360, 358, 362, 361],
        },
    ],
};

export const cryptoSlice = createSlice({
    name: 'crypto',
    initialState,
    reducers: {
        updateAsset: (state, action) => { 
            const { id, updatedFields } = action.payload;
            const assetIndex = state.assets.findIndex((asset) => asset.id === id);
            if (assetIndex !== -1) {
                state.assets[assetIndex] = {
                    ...state.assets[assetIndex],
                    ...updatedFields,
                };
            }
        },
        updateAssets: (state, action) => {
            state.assets = action.payload; 
        },
    },
});

export const { updateAsset, updateAssets } = cryptoSlice.actions; 
export const selectAllAssets = (state) => state.crypto.assets;

export default cryptoSlice.reducer;
