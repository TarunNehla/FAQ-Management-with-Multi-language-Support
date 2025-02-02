const FAQ = require('../models/faqModel')
const redisClient = require('../redisClient');
const translateText = require('../services/translateService');

const getFAQs = async (req, res) => {
    try {
        const { lang } = req.query;
        const cacheKey = `faqs:${lang || 'en'}`; 

        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            console.log('✅ Cache Hit: Returning from Redis');
            return res.json(JSON.parse(cachedData));
        }

        let projection = { _id: 1 };
        switch (lang) {
            case 'hi':
                projection.questionHi = 1;
                projection.answerHi = 1;
                break;
            case 'bn':
                projection.questionBn = 1;
                projection.answerBn = 1;
                break;
            default:
                projection.question = 1;
                projection.answer = 1;
        }

        console.log('❌ Cache Miss: Fetching from MongoDB');
        const faqs = await FAQ.find({}, projection);

        await redisClient.set(cacheKey, JSON.stringify(faqs), "EX", 600);

        res.json(faqs);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server Error" });
    }
};

const createFAQ = async (req, res) => {
    try {
        let { question, answer } = req.body;

        const questionHi = await translateText(question, 'hi');
        const answerHi = await translateText(answer, 'hi');
        const questionBn = await translateText(question, 'bn');
        const answerBn = await translateText(answer, 'bn');

        question = await translateText(question, 'en');
        answer = await translateText(answer,'en');

        console.log('value of question_hi', questionHi);

        const newFAQ = new FAQ({
            question,
            answer,
            questionHi,
            answerHi,
            questionBn,
            answerBn
        });
        
        await newFAQ.save();

        await redisClient.del('faqs:en');
        await redisClient.del('faqs:hi');
        await redisClient.del('faqs:bn');

        res.status(201).json(newFAQ);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getFAQs, createFAQ };