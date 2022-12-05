import React from 'react';
import FAQ from './FAQ';

function FAQs(props) {
    
    const contents = [
        {
            "question": "What is Mina play?",
            "answer": "Mina play is the first Ethiopian website and application where you can earn money by watching YouTube videos and accomplishing simple tasks."
        },
        {
            "question": "How does Mina play work?",
            "answer": "After completing the registration process, you get a membership, which allows you to access the money making links and videos. Once you register, you have a personal code to access your account."
        },
        {
            "question": "Is Mina play legit?",
            "answer": "Mina play is a legit website and application which you do as a side hassle."
        },
        {
            "question": "How to withdraw money?",
            "answer": "The collected coins or points from mina play can be converted into cash and can be withdrawn or transferred via tele birr."
        }
    ]

    return (
        <div className='px-2 overflow-x-hidden overflow-y-visible'>
            <div className="w-full md:px-12 lg:px-36 xl:px-48  my-12 ">
                <h1 className="text-3xl md:text-5xl text-center my-12">Frequently Asked Questions</h1>

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