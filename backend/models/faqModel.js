const mongoose = require('mongoose')

const faqSchema = new mongoose.Schema({
    question : {
        type : String, 
        required : true
    },
    answer : {
        type : String,
        required : true
    },
    questionHi : {
        type : String
    },
    answerHi : {
        type : String
    },
    questionBn : {
        type : String
    },
    answerBn : {
        type : String
    }
});


const FaqModel = new mongoose.model('faq', faqSchema);

module.exports = FaqModel;