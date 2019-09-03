function validateData(reduxStatus) {
  if (reduxStatus && reduxStatus.data.status && reduxStatus.data.result) {
    return reduxStatus.data.result;
  }
  return false;
}

export { validateData };
