/**
 * JSON 序列化、反序列化
 */
export default {

  /**
   * JSON 序列化
   * @param {*} str 字符串
   */
  parse(str) {
    if (!str) {
      return null;
    }
    try {
      return JSON.parse(str);
    } catch (e) {
      console.log('JSON.parse error', e);
    }
    return str;
  },

  /**
   * JSON 反序列化
   * @param {*} obj 对象
   */
  stringify(obj) {
    return JSON.stringify(obj);
  }

};
