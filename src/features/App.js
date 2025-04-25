import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAssets, selectAllAssets } from '../../store/cryptoSlice';
import CryptoTable from '../../components/CryptoTable';
import { generateSimulatedUpdates } from '../../utils/utils';

function App() {
    const dispatch = useDispatch();
    const assets = useSelector(selectAllAssets);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentAssets = useSelector(selectAllAssets);
            const updatedAssets = generateSimulatedUpdates(currentAssets);
            dispatch(updateAssets(updatedAssets));
        }, 2000);

        return () => clearInterval(intervalId);
    }, [dispatch]);

    return (
        <div className="App">
            <header className="App-header">
                <h1 className="text-2xl font-bold text-white">Real-Time Crypto Price Tracker</h1>
            </header>
            <main>
                <CryptoTable
                    brandColor="indigo"
                    accentColor="emerald"
                    textColorDark="gray-800"
                    textColorLight="gray-100"
                    darkBackgroundColor="gray-900"
                />
            </main>
        </div>
    );
}

export default App;