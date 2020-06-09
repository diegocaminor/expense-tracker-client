import numeral from "numeral";
import moment from "moment";

const dollarFilter = function(value) {
  if (!value) {
    return "$ 0";
  }
  return numeral(value).format("($ 0.00a)");
};

const momentFilter = function(value) {
  if (!value) {
    return " Jan 1, 2020";
  }
  return moment(value).format("ll");
};

const capitalizeFirstLetterFilter = function(string) {
  if (!string) {
    return "";
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export { dollarFilter, momentFilter, capitalizeFirstLetterFilter };
