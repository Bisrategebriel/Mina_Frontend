import React from 'react';
import FAQ from './FAQ';

function FAQs(props) {
    
    const contents = [
        {
            "question": "What is Mina?",
            "answer": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum  has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised ."
        },
        {
            "question": "How to register on Mina?",
            "answer": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum  has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised ."
        },
        {
            "question": "How to get Paid on Mina?",
            "answer": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum  has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised ."
        }
    ]

    return (
        <div>
            <div className="w-full md:px-12 lg:px-36 xl:px-48  my-12 ">
                <h1 className="text-5xl text-center my-12">Frequently Asked Questions</h1>

                <div className="w-full flex flex-col space-y-4 relative">
                    <div className="w-[200px] h-[200px] bg-mina-blue-light absolute -top-12 -left-24 rounded-full"></div>
                    <div className="w-[300px] h-[300px] bg-mina-orange-light absolute -bottom-12 -right-24 rounded-full"></div>

                    {
                        contents.map((content)=>(
                            <FAQ
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