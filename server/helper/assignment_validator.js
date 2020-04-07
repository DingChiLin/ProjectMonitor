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
    if (res.statusCode != 200 || !res.body.includes('html')) {
        return {status:2, message:{error: `can't access link: ${uri}`}};
    }

    return {status:1, message:SUCCESS_MESSAGE};
}

// Product List API
const validatePart4 = async (server) => {
    async function validateAPI(type) {
        const api = `/api/1.0/products/${type}`;
        console.log(api)
        const productUri = server + api;
        const res = await rp({
            method: 'GET',
            uri: productUri,
            resolveWithFullResponse: true,
            json: true
        });
        const category = type == 'all' ? null : type;
        try {
            validProductsResponse(res, category);
            if ((type == 'all' || type == 'women') && !res.body.next_paging) {
                throw Error('response missing key: next_paging')
            }
        } catch (e) {
            throw Error(`{uri: ${productUri}, error: ${e.message}}`)
        }
    }

    async function validatePaging(type) {
        res = {body:{next_paging: 1}}; // dummy response
        while(res.body.next_paging != undefined) {
            api = `/api/1.0/products/${type}?paging=${res.body.next_paging}`
            console.log(api)
            let productNextPageUri = server + api;
            res = await rp({
                method: 'GET',
                uri: productNextPageUri,
                resolveWithFullResponse: true,
                json: true
            });
            const category = type == 'all' ? null : type;
            try {
                validProductsResponse(res, category);
            } catch (e) {
                throw Error(`{uri: ${productNextPageUri}, error: ${e.message}}`)
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
        const res = await rp({
            method: 'GET',
            uri: productSearchUri,
            resolveWithFullResponse: true,
            json: true
        });
        try {
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
            let detailRes = await rp({uri: productDetailUri, json:true});
            try {
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

    // Campaign admin page
    const uri = server + '/admin/campaign.html';
    const res = await rp({method: 'GET', uri, resolveWithFullResponse: true});
    if (res.statusCode != 200 || !res.body.includes('html')) {
        return {status:2, message:{error: `can't access link: ${uri}`}};
    }

    // campaign API
    async function validateCampaignAPI(keyword) {
        const campaignUri = server + '/api/1.0/marketing/campaigns';
        console.log(campaignUri);
        let campaignRes = await rp({uri: campaignUri, json:true});
        try {
            if (!campaignRes.data) {
                throw Error("response json without key: data");
            }

            // validate campaign
            for (campaign of campaignRes.data) {
                const expectedCampaignKeys = new Set(["id", "product_id", "picture", "story"]);
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
        await validateCampaignAPI();
        return {status:1, message:SUCCESS_MESSAGE};
    } catch (e) {
        return {status:2, message:e.message};
    }
}

const validatePart7 = async (server) => {
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
    async function validateSignUp() {
        const signUpBody = {
            name: "stylishtest1234",
            email: "stylishtest1234@test.com",
            password: "stylishtest1234"
        };
        const signUpUri = server + '/api/1.0/user/signup';
        console.log(signUpUri);
        let signUpRes = await rp({
            method: 'POST',
            uri: signUpUri,
            body: signUpBody,
            json: true
        });
  
        try {
            if (!signUpRes.data) {
                throw Error("response json without key: data");
            }

            validateUserInfo(signUpRes.data);
            validateUser(signUpRes.data.user);
        } catch (e) {
            throw Error(`{uri: ${signUpUri}, error: ${e.message}}`)
        }
    }

    // sign in
    async function validateSignIn() {
        const signInBody = {
            provider: "native",
            email: "stylishtest1234@test.com",
            password: "stylishtest1234"
        }
        const signInUri = server + '/api/1.0/user/signin';
        console.log(signInUri);
        let signInRes = await rp({
            method: 'POST',
            uri: signInUri,
            body: signInBody,
            json: true
        });
  
        try {
            if (!signInRes.data) {
                throw Error("response json without key: data");
            }

            validateUserInfo(signInRes.data);
            validateUser(signInRes.data.user);

            return signInRes.data.access_token;
        } catch (e) {
            throw Error(`{uri: ${signInUri}, error: ${e.message}}`)
        }
    }

    // user profile
    async function validateUserProfile(accessToken) {
        const userProfileHeaders = {
            'User-Agent': 'Request-Promise',
            Authorization: `Bearer ${accessToken}`
        }
        const userProfileUri = server + '/api/1.0/user/profile';
        console.log(userProfileUri);
        let userProfileRes = await rp({
            method: 'GET',
            uri: userProfileUri,
            headers: userProfileHeaders,
            json: true
        });
  
        try {
            if (!userProfileRes.data) {
                throw Error("response json without key: data");
            }
            
            validateUser(userProfileRes.data);
        } catch (e) {
            throw Error(`{uri: ${userProfileUri}, error: ${e.message}}`)
        }
    }

    try {
        await validateSignUp();
        const accessToken = await validateSignIn();
        await validateUserProfile(accessToken);
        return {status:1, message:SUCCESS_MESSAGE};
    } catch (e) {
        return {status:2, message:e.message};
    }
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

    // 5. products should have correct category
    if (category) {
        for (product of res.body.data) {
            if (product.category != category) {
                throw Error(`response product show category '${product.category}', but it should be '${category}'`);  
            }
        }
    }

    // 6. product should have correct keyword in title
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

function main(){
    validate(part, server);
}

if (require.main === module) {
    main();
}

module.exports = {
    validate
}