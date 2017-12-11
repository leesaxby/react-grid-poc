// Shim to eliminate warnings regarding requestAnimationFrame not being available.
global.requestAnimationFrame = (callback) => {
    setTimeout(callback, 0);
};
