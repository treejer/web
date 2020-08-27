export const Tribe = (t, r, i, b, e) => {
  if (process.client) {
    if (typeof t.Tribe === 'function') {
      t.Tribe('reload', {portal: i});
    } else {
      b = function () {
        b.r(arguments);
      };
      b.q = [];
      b.r = function (args) {
        b.q.push(args);
      };
      t.Tribe = b;
      e = r.createElement('script');
      e.type = 'text/javascript';
      e.async = true;
      e.src = i + '/widget/v1/main.js?t=' + Math.ceil(new Date() / 3e5) * 3e5;
      var x = r.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(e, x);
      t.Tribe('boot', {portal: i})
    }
  }

}
