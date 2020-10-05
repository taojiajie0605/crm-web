function importAll(r) {
    r.keys().forEach((r) => {
        // eslint-disable-next-line no-undef
        r(`${key}?inline`).default;
    });
}

importAll(require.context('../assets/icon', true, /\.svg$/));
