export const simulatePriceChange = (price) => {
  const change = (Math.random() - 0.5) * 0.1 * price; // Random change up to +/- 10%
  return price + change;
};

export const simulatePercentageChange = (percentage) => {
  const change = (Math.random() - 0.5) * 2; // Random change up to +/- 2%
  return percentage + change;
};

export const simulateVolumeChange = (volume) => {
  const change = (Math.random() - 0.5) * 0.2 * volume; // Random change up to +/- 20%
  return volume + change;
};

export const generateSimulatedUpdates = (assets) => {
  return assets.map(asset => ({
    ...asset,
    price: simulatePriceChange(asset.price),
    change1h: simulatePercentageChange(asset.change1h),
    change24h: simulatePercentageChange(asset.change24h),
    change7d: simulatePercentageChange(asset.change7d),
    volume24h: simulateVolumeChange(asset.volume24h),
  }));
};