const isImage = (e) => e instanceof HTMLImageElement;

const fileExist = (url) => {
    try {
        if (url) {
            const req = new XMLHttpRequest();

            req.open('GET', url, false);
            req.send();

            return req.status===200;
        }

        return false;
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.log('Cannot GET image:', error);
        return false;
    }
};

const imageFromUrl = (url) => {
    const img = new Image();
    img.src = url;

    return img;
};

function distance(rect1, rect2) {
    return Math.abs(rect1.x - rect2.x) + Math.abs(rect1.y - rect2.y);
}

function sort( arr, prop1, prop2) {
    return [...arr].sort((a, b) => {
        if(a[prop1] === b[prop1]) {
            return a[prop2] - b[prop2];
        }
        return a[prop1] - b[prop1];
    });
}

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function isEqual(a, b) {
    if (typeof a === 'object' && b === 'object') {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    return a === b;
}


/**
 * merge - Deep recursive merge
 *
 * @param {object} target
 * @param {object} sources
 *
 * @return {object} Merged object
 */
const merge = (target, ...sources) => {
    if (!sources.length) {
        return target;
    }

    const isObject = item => (item && typeof item === 'object' && !Array.isArray(item));

    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) {
                    Object.assign(target, { [key]: {} });
                }

                merge(target[key], source[key]);
            }
            else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return merge(target, ...sources);
};

const uniqueArray = (arr, prop) => arr.slice().reverse().filter((v, i, a) => a.findIndex(t => (t[prop] === v[prop])) === i);

export {
    uniqueArray,
    merge,
    clone,
    isEqual,
    sort,
    distance,
    isImage,
    fileExist,
    imageFromUrl
};
