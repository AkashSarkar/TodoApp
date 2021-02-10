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

export {
  validate
};
