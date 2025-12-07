const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    import('web-vitals').then((module: any) => {
      module.getCLS?.(onPerfEntry);
      module.getFID?.(onPerfEntry);
      module.getFCP?.(onPerfEntry);
      module.getLCP?.(onPerfEntry);
      module.getTTFB?.(onPerfEntry);
    });
  }
};

export default reportWebVitals;