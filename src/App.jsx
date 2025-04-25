import React, { useEffect } from 'react';
import CryptoTable from './components/CryptoTable';
import { useDispatch, useSelector } from 'react-redux';
import { updateAsset, selectAllAssets } from './store/cryptoSlice';
import MockWebSocket from './services/MockWebSocket';
import { v4 as uuidv4 } from 'uuid';

const initialAssets = [
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
];

function App() {
  const dispatch = useDispatch();
  const assets = useSelector(selectAllAssets);

  const mockWebSocket = new MockWebSocket('ws://example.com/crypto', (event) => {
    const receivedAssets = JSON.parse(event.data);
    receivedAssets.forEach(asset => {
      dispatch(updateAsset({ id: asset.id, updatedFields: asset }));
    });
  });

  useEffect(() => {
    mockWebSocket.onopen = () => {
      console.log('Mock WebSocket connection opened');
      mockWebSocket.send(JSON.stringify(initialAssets));
    };

    mockWebSocket.onclose = () => {
      console.log('Mock WebSocket connection closed');
    };

    return () => {
      mockWebSocket.close();
    };
  }, [mockWebSocket]);

  useEffect(() => {
    initialAssets.forEach(asset => {
      dispatch(updateAsset({ id: asset.id, updatedFields: asset }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      assets.forEach(asset => {
        const priceChange = (Math.random() - 0.5) * (asset.price * 0.001);
        const change1h = asset.change1h + (Math.random() - 0.5) * 0.02;
        const change24h = asset.change24h + (Math.random() - 0.5) * 0.05;
        const change7d = asset.change7d + (Math.random() - 0.5) * 0.1;
        const volumeChange = Math.random() * asset.volume24h * 0.01;
        const marketCapChange = (Math.random() - 0.5) * 100000000;
        const sparklineChange = asset.sparkline7d.map(val => val + (Math.random() - 0.5) * 50);

        dispatch(updateAsset({
          id: asset.id,
          updatedFields: {
            price: parseFloat((asset.price + priceChange).toFixed(2)),
            change1h: parseFloat(change1h.toFixed(2)),
            change24h: parseFloat(change24h.toFixed(2)),
            change7d: parseFloat(change7d.toFixed(2)),
            volume24h: parseFloat((asset.volume24h + volumeChange).toFixed(2)),
            marketCap: parseFloat((asset.marketCap + marketCapChange).toFixed(2)),
            sparkline7d: sparklineChange.map(val => parseFloat(val.toFixed(2))),
          },
        }));
      });
    }, 1500);

    return () => clearInterval(intervalId);
  }, [dispatch, assets]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col">
      <header className="bg-white dark:bg-gray-800 shadow py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
            Real-Time Cryptocurrency Tracker
          </h1>
          <p className="text-center text-gray-500 dark:text-gray-400 mt-2">
            Live price updates and market data
          </p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 flex-grow">
        <CryptoTable />
      </main>
      <footer className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400 py-4 text-center text-sm">
        <div className="container mx-auto px-4">
          &copy; {new Date().getFullYear()} Cryptocurrency Tracker. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;