export function calculateAverage(arr, key = null) {
  if (Array.isArray(arr) && arr.length === 0) return 0;

  if (key) {
    return arr.reduce((prev, curr) => {
      return curr[key] !== undefined ? prev + curr[key] : prev;
    }, 0) / arr.length;

  } else {
    return arr.reduce((prev, curr) => prev + curr, 0) / arr.length;
  }
}

export function calculateTotal(arr, key = null) {
  if (key) {
    return arr.reduce((prev, curr) => {
      return curr[key] !== undefined ? prev + curr[key] : prev;
    }, 0);

  } else {
    return arr.reduce((prev, curr) => prev + curr, 0);
  }
}

export function makeArrayFromObjectKey(arr, key) {
  return arr.map(a => a[key] !== undefined ? a[key] : null);
}

export function makeObjectFromObject(obj, ...keys) {
  if (keys.length === 0) return {};
  
  return keys.reduce((prev, curr) => {
    if (curr in obj) {
      prev[curr] = obj[curr];
    }
    return prev;
  }, {});
}

export function getThreshold(arr) {
  if (arr.length === 0) return { min: null, max: null };

  return {
    min: Math.min(...arr),
    max: Math.max(...arr)
  };
}

export const formatDate = (timeStr) => {
  const date = new Date(timeStr);
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
};

export const formatTime = (timeStr) => {
  const date = new Date(timeStr);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
};