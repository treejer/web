export default function (context) {
  // current route
  // previous route
  if (process.client) {
    const from = context.from
    console.log('from=', from)
  }
}
