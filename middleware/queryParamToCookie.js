export default function ({ app, route }) {

    if (Object.keys(route.query).length === 0) {
        return;
    }

    if (typeof route.query.referrer === 'undefined') {
        return;
    }

    app.$cookies.set('referrer', route.query.referrer, {
        maxAge: 60 * 60 * 24 * 365,
        path: '/'
    });
}