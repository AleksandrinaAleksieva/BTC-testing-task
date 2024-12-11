(async () => {
    global.expect = (await import('chai')).expect;
})();
