import React, { useState, useEffect } from 'react';
import { getFaqs, postFaq } from '../api';
import TextEditor from './textEditor';
import '../index.css'


const FAQ = () => {
    const [faqs, setFaqs] = useState([]);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [language, setLanguage] = useState('');

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const data = await getFaqs(language);
                console.log('data',data);
                setFaqs(data || []);
            } catch (error) {
                console.error('Error fetching FAQs:', error);
                setFaqs([]);
            }
        };
        fetchFaqs();
    }, [language]);

    const handleAddFaq = async () => {
        try {
            const newFaq = await postFaq(question, answer);
            setFaqs([...faqs, newFaq]);
            setQuestion('');
            setAnswer('');
        } catch (error) {
            console.error('Error adding FAQ:', error);
        }
    };

    return (
        <div className='container'>
            <h1>FAQs</h1>

            <div>
                <h3>Question : </h3>
                <textarea
                    placeholder="Question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    row = "4"
                    cols = "50"
                />
                <h3>Answer : </h3>
                <TextEditor value={answer} onChange={setAnswer} />
                <div className='center-container'>
                    <button className='btton' onClick={handleAddFaq}>Add FAQ</button>
                </div>
                
            </div>
            <hr />

            <div className='center-container'>
                <div>
                    <button className='btton' onClick={() => setLanguage('')}>English</button>
                    <button className='btton' onClick={() => setLanguage('hi')}>Hindi</button>
                    <button className='btton' onClick={() => setLanguage('bn')}>Bengali</button>
                </div>
            </div>
            
            <ul>
                {faqs.length > 0 ? (
                    faqs.map((faq, index) => (
                        <li key={index}>
                            <strong>Q:</strong> {faq[`question${language ? language.charAt(0).toUpperCase() + language.slice(1) : ''}`]} <br />
                            <strong>A:</strong> <span dangerouslySetInnerHTML={{ __html: faq[`answer${language ? language.charAt(0).toUpperCase() + language.slice(1) : ''}`] }} />
                        </li>
                    ))
                ) : (
                    <li>No FAQs available</li>
                )}
            </ul>
            
        </div>
    );
};

export default FAQ;