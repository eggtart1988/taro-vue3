const globalData = {};


const setGlobalData = (key, val) => {
  global.globalData[key] = val;
};

const getGlobalData = (key) => {
  return  global.globalData[key];
};

export { setGlobalData, getGlobalData };