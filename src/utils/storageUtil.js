/**
 * localStorage
 */
import jsonUtil from './jsonUtil';

// key
const STORAGE_KEY = 'zx-win';

// create key
const createKey = (key = '') => {
  return `${STORAGE_KEY}-${key}`;
};

/**
 * set localStorage
 * @param key 存储key
 * @param value 存储值
 * @param expire 过期时间，单位秒
 */
export function setLocalStorage(key, value, expire = 86400) {
  try {
    let result = {
      data: value,
      time: new Date().getTime()
    };
    if (expire > 0) {
      result.expire = expire;
    }
    window.localStorage.setItem(createKey(key), JSON.stringify(result));
  } catch (err) {
    console.error('setLocalStorage error: ', err);
  }
};

/**
 * get LocalStorage
 * @param key 存储key
 */
export function getLocalStorage(key) {
  try {
    const RealKey = createKey(key);
    const result = jsonUtil.parse(window.localStorage.getItem(RealKey));
    if (!result || !result.time) {
      return null;
    }

    if (!result.expire) {
      return result.data;
    }

    const now = new Date().getTime();
    if (now < (result.time + result.expire * 1000)) {
      return result.data;
    }
    removeLocalStorage(key);
    return null;
  } catch (err) {
    console.error('getLocalStorage error: ', err);
    return null;
  }
};

/**
 * remove LocalStorage
 * @param key 存储key
 */
export function removeLocalStorage(key) {
  try {
    window.localStorage.removeItem(createKey(key));
  } catch (err) {
    console.error('removeLocalStorage error: ', err);
  }
};
