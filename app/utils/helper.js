// SORITNG FUNCTIONS
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export { getComparator, stableSort };

// insertParams

export function insertParams(params) {
  // const str = [];
  // // eslint-disable-next-line no-prototype-builtins
  // for (const p in params)
  //   if (params.hasOwnProperty(p)) {
  //     str.push(`${encodeURIComponent(p)}=${encodeURIComponent(params[p])}`);
  //   }
  // return str.join('&');

  //  params is object
  const str = [];
  const paramObj = { ...params };

  Object.keys(paramObj).forEach((key) => {
    const currentParam = paramObj[key];
    // if (currentParam === '') {
    //   delete paramObj[key];
    //   return;
    // }
    str.push(`${encodeURIComponent(key)}=${encodeURIComponent(currentParam)}`);
    // paramUrl += `${key}=${currentParam}&`;
  });
  return str.join('&');
}
