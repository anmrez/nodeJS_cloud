module.exports = {
  name: `[a-zA-Z0-9_]{2,16}`,
  nameJS: /[a-zA-Z0-9_]/,
  // pass: `[A-Z]*[a-zA-Z0-9_]{8,}`,
  pass: `([A-Z])?([0-9]){8,}`,
  passJS: /[A-Za-z0-9\-.\+.\_.\=.\&.\#.\$.]/
}
