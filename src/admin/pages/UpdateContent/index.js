import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useParams } from 'react-router-dom';

import useFetch from '~/hooks/useFetch';
import { BASE_URL } from '~/hooks/config';

function UpdateBook() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [chapter, setChapter] = useState('');
    const { data: contents } = useFetch(`${BASE_URL}/content/getContent/${id}`);
    useEffect(() => {      
        setTitle(contents?.title);
        setContent(contents?.content);
        setChapter(contents?.chapter);
    },[contents]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                title: title,
                content: content,
                chapter: chapter,
            };
            const res = await fetch(`${BASE_URL}/content/updateContent/${id}`, {
                method: 'put',
                headers: { 'content-type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(data),
            });

            const result = await res.json();
            if (!res.ok) {
                return  toast.error(result.message)
            } else {
                toast.success('Successful');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    return (
        <div id="layoutSidenav_content">
            <main>
                <div class="container-fluid px-4">
                    <h1 className="mt-4">Update Chapter</h1>
                    <div className="row">
                        <form action="">
                            <div className="sb-sidenav-menu-heading">General</div>
                            <label className="form-label mt-3" name="title">
                                Title:{' '}
                            </label>
                            <input
                                type="text"
                                className="form-control display-2"
                                value={title} onChange={(e) => { setTitle(e.target.value) }}
                            />

                            <label className="form-label mt-3" name="author">
                                Chapter:{' '}
                            </label>
                            <input
                                type="text"
                                className="form-control display-2"
                                value={chapter}
                                onChange={(e) => {
                                    setChapter(e.target.value);
                                }}
                            />

                            <label className="form-label mt-3" name="author">
                                Content:{' '}
                            </label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={contents.content} 
                                onChange={(event, editor) => {
                                    setContent(editor.getData());
                                }}
                            />
                            <button className="btn btn-primary mt-3" type="submit" onClick={handleSubmit}>
                                Submit form
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default UpdateBook;
