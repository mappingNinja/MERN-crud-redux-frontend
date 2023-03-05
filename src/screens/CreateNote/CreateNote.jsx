import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNote, resetNote } from '../../redux/action/notesActions';
import Spinner from '../../components/spinner/Spinner';
import Alert from '../../components/alert/Alert';
const CreateNote = () => {
    const history = useNavigate()
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.userLogin);
    const { loading, err, insert } = useSelector((state) => state.createNote);


    useEffect(() => {
        if (!user) {
            return history('/')
        }
    }, [user])

    useEffect(() => {
        dispatch(resetNote())
    }, [history]);



    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { method: 'notes', submethod: 'create', title, category, content }
        dispatch(createNote(data, history));
    }

    const handleReset = (e) => {
        e.preventDefault();
        setTitle('');
        setCategory('');
        setContent('');
        dispatch(resetNote())
    }

    return (
        <div className='container my-4'>
            <div className="card">
                <div className="card-header text-center">
                    {err && <Alert type='danger' msg={err} />}
                    {insert && <Alert type='primary' msg="Note inserted Successfully" />}

                    <h2>Create notes</h2>
                    {loading && <Spinner />}

                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" className="form-control" id="title" disabled={loading} value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>Category</label>
                            <input type="text" className="form-control" id="category" disabled={loading} value={category} onChange={(e) => setCategory(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label>content</label>
                            <textarea type="text" className="form-control" id="content" disabled={loading} value={content} onChange={(e) => setContent(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={loading} onClick={handleSubmit}>Submit</button>
                        <button type="button" className="mx-2 btn btn-danger" disabled={loading} onClick={handleReset}>Reset</button>

                    </form>
                </div>
                <div className="card-footer bg-white">
                    creating on : {new Date().toLocaleString()}
                </div>
            </div>
        </div>
    )
}

export default CreateNote;