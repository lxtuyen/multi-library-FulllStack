import React, { useState, useRef } from 'react';

import { BASE_URL } from '~/hooks/config';
import { toast } from 'react-toastify';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useParams } from 'react-router-dom';
function AddBook() {
    const { id } = useParams();
    const chapterInputRef = useRef(null);
  const titleInputRef = useRef(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [chapter, setChapter] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                title: title,
                content: content,
                chapter: chapter,
            };
            const res = await fetch(`${BASE_URL}/content/${id}`, {
                method: 'post',
                headers: { 'content-type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(data),
            });

            const result = await res.json();
            if (!res.ok) {
                return alert(result.message);
            } else {
                chapterInputRef.current.value = '';
                titleInputRef.current.value = '';
                setContent('');
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
                    <h1 className="mt-4">Add New Chapters</h1>
                    <div className="row">
                        <form action="">
                            <div className="sb-sidenav-menu-heading">General</div>
                            <label className="form-label mt-3" name="title">
                                Title:{' '}
                            </label>
                            <input
                                type="text"
                                className="form-control display-2"
                                ref={titleInputRef }
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                            />
                            <label className="form-label mt-3" name="author">
                                Chapter:{' '}
                            </label>
                            <input
                                type="text"
                                className="form-control display-2"
                                ref={chapterInputRef }
                                onChange={(e) => {
                                    setChapter(e.target.value);
                                }}
                            />
                            <label className="form-label mt-3" name="author">
                                Content:{' '}
                            </label>
                            <CKEditor
                                editor={ClassicEditor}
                                data={content} 
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

export default AddBook;