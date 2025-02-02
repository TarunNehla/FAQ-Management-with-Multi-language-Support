const axios = require('axios');

const translateText = async (text, targetLanguage) => {
    try {
        const response = await axios.get('https://translate.googleapis.com/translate_a/single', {
            params: {
                client: 'gtx',
                sl: 'auto',
                tl: targetLanguage,
                dt: 't',
                q: text
            }
        });
        console.log('this has been called');
        const translatedText = response.data[0][0][0];
        return translatedText || text;
    } catch (error) {
        console.error('Translation Error:', error);
        return text;
    }
};

module.exports = translateText;