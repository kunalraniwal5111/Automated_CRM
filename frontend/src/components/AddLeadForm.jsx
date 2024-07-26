import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_LEAD } from '../graphql/queries';
import { Link, useNavigate } from 'react-router-dom';

const AddLeadForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate()
    const [addLead, { data, loading, error }] = useMutation(ADD_LEAD, {
        onCompleted: () => {
            navigate('/');
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        addLead({ variables: { name, email, phone, status } });
        setName('');
        setEmail('');
        setPhone('');
        setStatus('');
    };

    if (loading) return <p>Adding lead...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2 className='mt-5 text-center text-4xl font-semibold'>Add New Lead</h2>
            <div className='mx-auto mt-10 text-2xl text-center'>
            <Link to="/allLead">Back to all Leads</Link>
            </div>
            <form className='mt-12 w-1/2 mx-auto' onSubmit={handleSubmit}>
                <div className='text-lg mx-auto w-1/2 h-10'>
                    <label className='border-black'>
                        Name :
                        <input className='ml-2 border-2 rounded border-blue-600'
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className='text-lg mx-auto w-1/2 h-10'>
                    <label className='border-black'>
                        Email:
                        <input className='ml-4 border-2 rounded border-blue-600'
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className='text-lg mx-auto w-1/2 h-10'>
                    <label className='border-black'>
                        Phone:
                        <input className='ml-2 border-2 rounded border-blue-600'
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className='text-lg mx-auto w-1/2 h-10'>
                    <label className='border-black'>
                        Status:
                        <input className='ml-3 border-2 rounded border-blue-600'
                            type="text"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <button className=' bg-blue-600 text-center my-5 ml-36 text-lg mx-auto w-1/2 h-10' type="submit">Add Lead</button>
            </form>
        </div>
    );
};

export default AddLeadForm;
