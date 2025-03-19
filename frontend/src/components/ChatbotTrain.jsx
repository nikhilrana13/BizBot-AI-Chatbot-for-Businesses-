
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const ChatbotTrain = () => {
     const { register, handleSubmit,reset, setValue, formState: { errors } } = useForm();
        const [faqs, setFaqs] = useState([{ question: "", answer: "" }]);
    
        // Function to add new FAQ
        const Addfaqs = () => {
            const updatedFaqs = [...faqs, { question: "", answer: "" }];
            setFaqs(updatedFaqs);
            setValue("faq", updatedFaqs)
        };
    
        const onSubmit = async (data) => {
            // console.log("form")
            const formdata = {
                faq: faqs.map(({question,answer})=>({question,answer}))
            }
    
            console.log("Final FAQs before submitting:", faqs);
            try {
                const response = await axios.post("http://localhost:3000/chatbot/train", formdata, { withCredentials: true });
                if (response.data) {
                    console.log(response.data.chatbot);
                    toast.success(response?.data?.message || "Chatbot Created successfully");
                    reset();
                    setFaqs([{ question: "", answer: "" }]);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response?.data?.message || "Failed to train chatbot");
            }
        };
    
        // Function to update question/answer in state
        const handleFaqChange = (index, field, value) => {
            const updatedFaqs = [...faqs];
            updatedFaqs[index][field] = value
            setFaqs(updatedFaqs);
            setValue("faq", updatedFaqs)
        };
  return (
    <div>
    <h1 className='text-2xl font-bold'>Train Chatbot</h1>
    <div className="bg-white p-5 w-full max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 p-2'>
           
            {faqs.map((faq, index) => (
                <div key={index} className='flex flex-col gap-2'>
                    <input
                        type="text"
                        placeholder={`Enter Question ${index + 1}`}
                        className="w-full p-2 border rounded mb-3"
                        value={faq.question}  
                        onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder={`Enter Answer ${index + 1}`}
                        className="w-full p-2 border rounded mb-3"
                        value={faq.answer}
                        onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                    />
                </div>
            ))}

            <div className='flex gap-3'>
                <button onClick={Addfaqs} type='button' className="bg-green-500 hover:bg-green-400 text-sm text-white px-3 py-2 rounded mr-2">
                    + Add FAQ
                </button>
                <button type='submit' className="bg-blue-600 hover:bg-blue-400 text-white px-3 py-2 rounded text-sm">
                    Train Chatbot
                </button>
            </div>
        </form>
    </div>
</div>
  )
}

export default ChatbotTrain
