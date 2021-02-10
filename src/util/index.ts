/**
 * Check validity of values
 * @param {Array} validation The validation rules array
 * @param {String/Number} value Actuaul input
 * @return {Boolean} If valid returns true, false otherwise
 */
interface validationObj {
  validationType: string,
  value: boolean,
  msg: string
}
const validate = (validation: Array<validationObj>, value: String) => {
  if (validation.validationType === 'required') {
    if (!value && value !== 0) {
      // if value empty return false
      return false;
    }
    return true;
  }
  return false;
};
/**
 * truncates a string after given length
 * @param {string} str
 * @param {number} length
 * @return {string|*}
 */
const truncate = (str: string, length = 10) => {
  if (str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};
export {
  validate, truncate
};
