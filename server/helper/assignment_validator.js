require('dotenv').config();
const crypto = require('crypto');
const {FACEBOOK_TOKEN} = process.env;
const rp = require('request-promise');
const SUCCESS_MESSAGE = "Congrats! You just passed the basic validation. Arthur is on the way." 

async function validate(part, server) {
    console.log(`validate part: ${part} server: ${server}`)
    const validator = validators[part-1];
    const result = await validator(server);
    return result;
}

const validatePart1 = async (server) => {
    return {status:1, message:SUCCESS_MESSAGE};
}

const validatePart2 = async (server) => {
    return {status:1, message:SUCCESS_MESSAGE};
}

const validatePart3 = async (server) => {
    try {
        await validHtmlPage(server + '/admin/product.html');
        return {status:1, message:SUCCESS_MESSAGE};
    } catch (e) {
        return {status:2, message:{error: e.message}};
    }
}

// Product List API
const validatePart4 = async (server) => {
    async function validateAPI(type) {
        const api = `/api/1.0/products/${type}`;
        const productUri = server + api;
        console.log("query from:", productUri);
        try {
            const res = await rp({
                method: 'GET',
                uri: productUri,
                resolveWithFullResponse: true,
                json: true
            });
            const category = type == 'all' ? null : type;
            validProductsResponse(res, category);
            if ((type == 'all' || type == 'women') && !res.body.next_paging) {
                throw Error('response missing key: next_paging')
            }
        } catch (e) {
            throw Error(`{uri: ${productUri}, error: ${e.message}}`)
        }
    }

    async function validatePaging(type) {
        let res = {body:{next_paging: 1}}; // dummy response
        let counter = 0
        while(res.body.next_paging != undefined) {
            const current_paging = res.body.next_paging;
            const api = `/api/1.0/products/${type}?paging=${res.body.next_paging}`
            console.log(api)
            let productNextPageUri = server + api;
            try {
                res = await rp({
                    method: 'GET',
                    uri: productNextPageUri,
                    resolveWithFullResponse: true,
                    json: true
                });
                const new_paging = res.body.next_paging;
                if (new_paging == current_paging) {
                    throw Error(`{uri: ${productNextPageUri}, error: next_paging number is the same as the previous page}`)
                }
                const category = type == 'all' ? null : type;
                validProductsResponse(res, category);
            } catch (e) {
                throw Error(`{uri: ${productNextPageUri}, error: ${e.message}}`)
            }
            counter += 1
            if (counter > 30) {
                throw Error(`{uri: ${productNextPageUri}, error: get too many pages (> 30)}`)
            }
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

    async function validateSearchAPI(keyword) {
        const api = `/api/1.0/products/search?keyword=${keyword}`;
        const productSearchUri = encodeURI(server + api);
        console.log(productSearchUri);
        try {
            const res = await rp({
                method: 'GET',
                uri: productSearchUri,
                resolveWithFullResponse: true,
                json: true
            });
            validProductsResponse(res, null, keyword);
        } catch (e) {
            throw Error(`{uri: ${productSearchUri}, error: ${e.message}}`)
        }
    }

    async function validateDetailAPI(keyword) {
        const api = `/api/1.0/products/all`;
        const productAllUri = server + api;
        const res = await rp({uri: productAllUri, json: true});
        for (product of res.data) {
            const productDetailUri = server + `/api/1.0/products/details?id=${product.id}`;
            console.log(productDetailUri);
            try {
                let detailRes = await rp({uri: productDetailUri, json:true});
                if (!detailRes.data) {
                    throw Error("response json without key: data");
                }

                const missingKeys = validateProduct(detailRes.data);
                if (missingKeys.length != 0) {
                    throw Error(`response product missing keys: ${missingKeys}`);
                }
            } catch (e) {
                throw Error(`{uri: ${productDetailUri}, error: ${e.message}}`)
            }
        }
    }

    try {
        await validateSearchAPI('洋裝');
        await validateDetailAPI();
        return {status:1, message:SUCCESS_MESSAGE};
    } catch (e) {
        return {status:2, message:e.message};
    }
}

// campaign admin page & API
const validatePart6 = async (server) => {

    // campaign API
    async function validateCampaignAPI(keyword) {
        const campaignUri = server + '/api/1.0/marketing/campaigns';
        console.log(campaignUri);
        try {
            let campaignRes = await rp({uri: campaignUri, json:true});
            if (!campaignRes.data) {
                throw Error("response json without key: data");
            }

            // validate campaign
            for (campaign of campaignRes.data) {
                const expectedCampaignKeys = new Set(["product_id", "picture", "story"]);
                const campaignKeys = new Set(Object.keys(campaign));
                const missingCampaignKeys = setDiff(expectedCampaignKeys, campaignKeys)
                if (missingCampaignKeys.length > 0) {
                    throw Error(`response campaign missing keys: ${missingCampaignKeys}`);
                }
            }

        } catch (e) {
            throw Error(`{uri: ${campaignUri}, error: ${e.message}}`)
        }
    }

    try {
        await validHtmlPage(server + '/admin/campaign.html');
        await validateCampaignAPI();
        return {status:1, message:SUCCESS_MESSAGE};
    } catch (e) {
        return {status:2, message:e.message};
    }
}

const validatePart7 = async (server) => {
    try {
        const email = "stylishtest_" + crypto.randomBytes(18).toString('hex').substr(0, 8);
        await validateSignUp({
            name: 'stylishtest',
            email: `${email}@test.com`,
            password: 'stylishtest1234'
        });
        const accessToken = await validateSignIn({
            provider: "native",
            email: `${email}@test.com`,     
            password: 'stylishtest1234'
        });
        await validateUserProfile(accessToken);
        return {status:1, message:SUCCESS_MESSAGE};
    } catch (e) {
        return {status:2, message:e.message};
    }
}

// generate FB token: https://developers.facebook.com/tools/explorer/
// long live token: https://developers.facebook.com/docs/facebook-login/access-tokens/refreshing
const validatePart8 = async (server) => {
    try {
        const accessToken = await validateSignIn({
            provider: "facebook",
            access_token: FACEBOOK_TOKEN
        });
        await validateUserProfile(accessToken);
        return {status:1, message:SUCCESS_MESSAGE};
    } catch (e) {
        return {status:2, message:e.message};
    };
}

const validatePart9 = async (server) => {
    try {
        await validHtmlPage(server + '/admin/checkout.html');
        return {status:1, message:SUCCESS_MESSAGE};
    } catch (e) {
        return {status:2, message:{error: e.message}};
    }
}

const validatePart10 = async (server) => {
    return {status:1, message:SUCCESS_MESSAGE};
    // TODO: actually generate a prime to test ?
}

const validatePart11 = async (server) => {
    try {
        await validHtmlPage(server + '/index.html');
        return {status:1, message:SUCCESS_MESSAGE};
    } catch (e) {
        return {status:2, message:{error: e.message}};
    }
}

const validatePart12 = async (server) => {
    try {
        const api = `/api/1.0/products/all`;
        const productAllUri = server + api;
        const res = await rp({uri: productAllUri, json: true});
        for (product of res.data) {
            await validHtmlPage(server + '/product.html?id=' + product.id);
        }
        return {status:1, message:SUCCESS_MESSAGE};
    } catch (e) {
        return {status:2, message:{error: e.message}};
    }
}

const validatePart13 = async (server) => {
    try {
        await validHtmlPage(server + '/thankyou.html');
        await validHtmlPage(server + '/profile.html');
        return {status:1, message:SUCCESS_MESSAGE};
    } catch (e) {
        return {status:2, message:{error: e.message}};
    };
}

const validatePart14 = async (server) => {
    return {status:1, message:SUCCESS_MESSAGE};
}

const validatePart15 = async (server) => {
    return {status:1, message:SUCCESS_MESSAGE};
}

async function validHtmlPage(uri) {
    console.log("valid page:", uri);
    let res;
    try {
        res = await rp({method: 'GET', uri, resolveWithFullResponse: true});
    } catch (e) {
        throw Error(`can't access link: ${uri}`);
    }

    if (res.statusCode != 200 || !res.body.includes('html')) {
        throw Error(`Get wrong status code or can not find html tag from link: ${uri}`);
    }
}

function validProductsResponse(res, category, keyword) {
    // 1. res status should be 200
    if (res.statusCode != 200) {
        throw Error("response status is not 200");
    }

    // 2. res has key "data"
    if (!res.body.data) {
        throw Error("response json without key: data");
    }

    // 3. res data has array of products
    if (!Array.isArray(res.body.data)) {
        throw Error("response data doesn't have multiple products");
    }

    // 4. res data has valid product json
    const missingKeys = validateProduct(res.body.data[0]);
    if (missingKeys.length != 0) {
        throw Error(`response product missing keys: ${missingKeys}`);
    }

    // 5. product should have correct keyword in title
    if (keyword) {
        for (product of res.body.data) {
            if (!product.title.includes(keyword)) {
                throw Error(`response product doesn't have keyword ${keyword} in title`);
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

function validateUserInfo(userInfo) {
    const expectedUserInfoKeys = new Set(["access_token", "access_expired", "login_at", "user"]);
    const userInfoKeys = new Set(Object.keys(userInfo));
    const missingUserInfoKeys = setDiff(expectedUserInfoKeys, userInfoKeys)
    if (missingUserInfoKeys.length > 0) {
        throw Error(`response data missing keys: ${missingUserInfoKeys}`);
    }
}

function validateUser(user) {
    const expectedUserKeys = new Set(["id", "provider", "name", "email", "picture"]);
    const userKeys = new Set(Object.keys(user));
    const missingUserKeys = setDiff(expectedUserKeys, userKeys)
    if (missingUserKeys.length > 0) {
        throw Error(`response user missing keys: ${missingUserKeys}`);
    }
}

// sign up
async function validateSignUp(body) {
    const uri = server + '/api/1.0/user/signup';
    console.log("Sign up from:", uri);
    let res;
    try {
        res = await rp({
            method: 'POST',
            uri,
            body,
            json: true
        });
    } catch (e) {
        throw Error(`{uri: ${uri}, error: ${e.message}}`)
    }

    if (!res.data) {
        throw Error("response json without key: data");
    }

    validateUserInfo(res.data);
    validateUser(res.data.user)
}

// sign in
async function validateSignIn(body) {
    const uri = server + '/api/1.0/user/signin';
    console.log("Sign in from:", uri);
    let res;
    try {
        res = await rp({
            method: 'POST',
            uri,
            body,
            json: true
        });
    } catch (e) {
        throw Error(`{uri: ${uri}, error: ${e.message}}`)
    }

    if (!res.data) {
        throw Error("response json without key: data");
    }

    validateUserInfo(res.data);
    validateUser(res.data.user);

    return res.data.access_token;
}

// user profile
async function validateUserProfile(accessToken) {
    const headers = {
        'User-Agent': 'Request-Promise',
        Authorization: `Bearer ${accessToken}`
    }
    const uri = server + '/api/1.0/user/profile';
    console.log(uri);
    let res = await rp({
        method: 'GET',
        uri,
        headers,
        json: true
    });

    try {
        if (!res.data) {
            throw Error("response json without key: data");
        }
        
        validateUser(res.data);
    } catch (e) {
        throw Error(`{uri: ${uri}, error: ${e.message}}`)
    }
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
const part = 7;
const server = 'http://13.113.12.180'; //'https://arthurstylish.com'

async function main(){
    console.log(await validate(part, server));
}

if (require.main === module) {
    main();
}

module.exports = {
    validate
}
