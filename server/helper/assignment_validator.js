const rp = require('request-promise');
const SUCCESS_MESSAGE = "Congrats! You just pass the basic validation. Arthur is on the way." 

async function validate(part, server) {
    console.log(`validate part: ${part} server: ${server}`)
    const validator = validators[part-1];
    const result = await validator(server);
    console.log(result);
    return result;
}

const validatePart1 = async (server) => {
    return {status:1, message:SUCCESS_MESSAGE};
}

const validatePart2 = async (server) => {
    return {status:1, message:SUCCESS_MESSAGE};
}

const validatePart3 = async (server) => {
    const uri = server + '/admin/product.html';
    const res = await rp({method: 'GET', uri, resolveWithFullResponse: true});
    console.log(res.statusCode);
    console.log(res.body.includes('html'));
    if (res.statusCode == 200 && res.body.includes('html')) {
        return {status:1, message:SUCCESS_MESSAGE};
    } else {
        return {status:2, message:{error: `can't access link: ${uri}`}};
    }
}

// Product List API
const validatePart4 = async (server) => {
    async function validateAPI(type) {
        const api = `/api/1.0/products/${type}`;
        console.log(api);
        const productUri = server + api;
        const res = await rp({method: 'GET', uri: productUri, resolveWithFullResponse: true});
        const category = type == 'all' ? null : type;
        try {
            validProductsResponse(res, category);
            if ((type == 'all' || type == 'women') && !JSON.parse(res.body).next_paging) {
                throw Error('response missing key: next_paging')
            }
        } catch (e) {
            throw Error(`{url: ${productUrl}, error: ${e.message}}`)
        }
    }

    async function validatePaging(type) {
        res = {next_paging: 1}; // dummy response
        while(res.next_paging) {
            api = `/api/1.0/products/${type}?paging=${res.next_paging}`
            console.log(api)
            let productNextPageUrl = server + api;
            res = await rp({method: 'GET', uri: productNextPageUrl, resolveWithFullResponse: true});
            const category = type == 'all' ? null : type;
            try {
                validProductsResponse(res, category);
            } catch (e) {
                throw Error(`{url: ${productNextPageUrl}, error: ${e.message}}`)
            }
            res = JSON.parse(res.body);
        }
    }

    try {
        //products/all
        await validateAPI('all');
        await validatePaging('all');

        // products/women
        await validateAPI('women');
        await validatePaging('women');
        
        // products/men
        await validateAPI('men');

        // products/accessories
        await validateAPI('accessories');
        
        // pass validation
        return {status:1, message:SUCCESS_MESSAGE};

    } catch (e) {
        return {status:2, message:e.message};
    }
}

// Product Search API
// Product Details API
const validatePart5 = async (server) => {
    return {status:1, message:SUCCESS_MESSAGE};
}

const validatePart6 = async (server) => {
    return {status:1, message:SUCCESS_MESSAGE};
}

const validatePart7 = async (server) => {
    return {status:1, message:SUCCESS_MESSAGE};
}

const validatePart8 = async (server) => {
    return {status:1, message:SUCCESS_MESSAGE};
}

const validatePart9 = async (server) => {
    return {status:1, message:SUCCESS_MESSAGE};
}

const validatePart10 = async (server) => {
    return {status:1, message:SUCCESS_MESSAGE};
}

const validatePart11 = async (server) => {
    return {status:1, message:SUCCESS_MESSAGE};
}

const validatePart12 = async (server) => {
    return {status:1, message:SUCCESS_MESSAGE};
}

const validatePart13 = async (server) => {
    return {status:1, message:SUCCESS_MESSAGE};
}

const validatePart14 = async (server) => {
    return {status:1, message:SUCCESS_MESSAGE};
}

const validatePart15 = async (server) => {
    return {status:1, message:SUCCESS_MESSAGE};
}

function validProductsResponse(res, category) {
    // 1. res status should be 200
    if (res.statusCode != 200) {
        throw Error("response status is not 200");
    }

    // 2. res is in json format
    try {
        res = JSON.parse(res.body);
    } catch (e) {
        throw Error("response is not in json format");
    }

    // 3. res has key "data"
    if (!res.data) {
        throw Error("response json without key: data");
    }

    // 4. res data has array of products
    if (!Array.isArray(res.data)) {
        throw Error("response data doesn't have multiple products");
    }

    // 5. res data has valid product json
    const missingKeys = validateProduct(res.data[0]);
    if (missingKeys.length != 0) {
        throw Error(`response product missing keys: ${missingKeys}`);
    }

    // 6. products should have correct category
    if (category) {
        for (product of res.data) {
            if (product.category != category) {
                throw Error(`response product show category '${product.category}', but it should be '${category}'`);  
            }
        }
    }
}

function validateProduct(product) {
    // Product have expected keys
    const expectedProductKeys = new Set([
        "id",
        "title",
        "description",
        "price",
        "texture",
        "wash",
        "place",
        "note",
        "story",
        "colors",
        "sizes",
        "variants",
        "main_image",
        "images",
    ]);
    const productKeys = new Set(Object.keys(product));
    const missingProductKeys = setDiff(expectedProductKeys, productKeys);
    if (missingProductKeys.length > 0) {
        return missingProductKeys;
    }

    // Product color have expected keys
    const expectedColorKeys = new Set(["code", "name"]);
    const colorKeys = new Set(Object.keys(product.colors[0]));
    const missingColorKeys = setDiff(expectedColorKeys, colorKeys)
    if (missingColorKeys.length > 0) {
        return missingColorKeys;
    }

    // Product variant have expected keys
    const expectedVariantKeys = new Set(["color_code", "size", "stock"])
    const variantKeys = new Set(Object.keys(product.variants[0]));
    const missingVariantKeys = setDiff(expectedVariantKeys, variantKeys);
    if (missingVariantKeys.length > 0) {
        return missingVariantKeys;
    }

    return [];
}

function setDiff(set1, set2) {
    return [...set1].filter(x => !set2.has(x));
}

const validators = [
    validatePart1,
    validatePart2,
    validatePart3,
    validatePart4,
    validatePart5,
    validatePart6,
    validatePart7,
    validatePart8,
    validatePart9,
    validatePart10,
    validatePart11,
    validatePart12,
    validatePart13,
    validatePart14,
    validatePart15,
]

/**
 * For Development
 */
const part = 3;
const server = 'http://13.113.12.180'; //'https://arthurstylish.com'

function main(){
    validate(part, server);
}

if (require.main === module) {
    main();
}

module.exports = {
    validate
}