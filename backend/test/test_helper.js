const FAQ = require('../models/faqModel');

const initialFaqs = [
  {
    question: 'What is the return policy?',
    answer: 'You can return any item within 30 days of purchase.',
    questionHi: 'वापसी नीति क्या है?',
    answerHi: 'आप खरीदारी के 30 दिनों के भीतर किसी भी वस्तु को वापस कर सकते हैं।',
    questionBn: 'ফেরতের নীতি কি?',
    answerBn: 'আপনি ক্রয়ের 30 দিনের মধ্যে যেকোনো আইটেম ফেরত দিতে পারেন।'
  },
  {
    question: 'How long does shipping take?',
    answer: 'Shipping usually takes 5-7 business days.',
    questionHi: 'शिपिंग में कितना समय लगता है?',
    answerHi: 'शिपिंग में आमतौर पर 5-7 कार्यदिवस लगते हैं।',
    questionBn: 'শিপিং কতক্ষণ সময় নেয়?',
    answerBn: 'শিপিং সাধারণত 5-7 ব্যবসায়িক দিন সময় নেয়।'
  }
];

const faqsInDb = async () => {
  const faqs = await FAQ.find({});
  return faqs.map(faq => faq.toJSON());
};

module.exports = {
  initialFaqs,
  faqsInDb
};