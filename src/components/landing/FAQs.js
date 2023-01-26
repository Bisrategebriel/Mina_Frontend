import React, { useContext } from 'react';
import { LanguageContext } from '../..';
import FAQ from './FAQ';

function FAQs(props) {
    const languageContext = useContext(LanguageContext);
    const ln = languageContext[0]
    const contents = [
        {
            "question": ln.q1,
            "answer": ln.a1
        },
        {
            "question": ln.q2,
            "answer": ln.a2
        },
        {
            "question": ln.q3,
            "answer": ln.a3
        },
        {
            "question": ln.q4,
            "answer": ln.a4
        }
    ]

    return (
        <div className='px-2 overflow-x-hidden overflow-y-visible'>
            <div className="w-full md:px-12 lg:px-36 xl:px-48  my-12 ">
                <h1 className="text-3xl md:text-5xl text-center my-12">{ln.faq}</h1>

                <div className="w-full flex flex-col space-y-4 relative">
                    <div className="w-[200px] h-[200px] bg-mina-blue-light absolute -top-12 -left-24 rounded-full"></div>
                    <div className="w-[300px] h-[300px] bg-mina-orange-light absolute -bottom-12 -right-24 rounded-full"></div>

                    {
                        contents.map((content, key)=>(
                            <FAQ
                            key={key}
                            question={content.question}
                            answer={content.answer}
                            ></FAQ>
                        ))
                    }
                </div>

            </div>
        </div>
    );
}

export default FAQs;