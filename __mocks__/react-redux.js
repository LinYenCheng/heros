// This mock will make sure that we are able to access mapStateToProps, mapDispatchToProps and reactComponent in the test file.
// http://rahulgaba.com/front-end/2018/10/19/unit-testing-redux-containers-the-better-way-using-jest.html
// To use this, just do `jest.mock('react-redux');` in your test.js file.
const mockDispatch = jest.fn((action) => action);

module.exports = {
  connect: (mapStateToProps, mapDispatchToProps) => (reactComponent) => ({
    mapStateToProps,
    mapDispatchToProps: (dispatch = mockDispatch, ownProps) => mapDispatchToProps(dispatch, ownProps),
    reactComponent,
    mockDispatch
  }),
  Provider: ({ children }) => children
};