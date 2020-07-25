export default function (context) {
  // current route
  console.log('route=', context.route.name)
  // previous route
  if (process.client) {
    const from = context.from
    console.log('from=', from)
  }
}
