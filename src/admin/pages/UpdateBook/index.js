import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { BASE_URL } from '~/hooks/config';
import useFetch from '~/hooks/useFetch';

function EditBook() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [language, setLanguage] = useState('');
    const [publishingCompany, setPublishingCompany] = useState('');
    const [page, setPage] = useState('');
    const [previewAvailable, setPreviewAvailable] = useState('');
    const [detailHead, setDetailHead] = useState('');
    const [detailLast, setDetailLast] = useState('');
    const [genre, setGenre] = useState('');
    const [people, setPeople] = useState('');
    const [places, setPlaces] = useState('');
    const [publishedIn, setPublishedIn] = useState('');
    const [versionNotes, setVersionNotes] = useState('');
    const [desc, setDesc] = useState('');
    const [linkOut, setLinkOut] = useState('');
    const [previewURL, setPreviewURL] = useState('');
    const { id } = useParams();
    const { data: books } = useFetch(`${BASE_URL}/books/${id}`);

    useEffect(() => {
        setTitle(books.title);
        setAuthor(books.author)
        setLanguage(books.language)
        setPublishingCompany(books.publishingCompany)
        setPage(books.page)
        setPreviewAvailable(books.previewAvailable)
        setDetailHead(books.detailHead)
        setDetailLast(books.detailLast)
        setGenre(books.genre)
        setPreviewURL(books.photo)
        setPeople(books.people)
        setPlaces(books.places)
        setPublishedIn(books.publishedIn)
        setVersionNotes(books.versionNotes)
        setDesc(books.desc)
        setLinkOut(books.linkOut)
    },[books]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const data = {
                title: title,
                author: author,
                language: language,
                publishingCompany: publishingCompany,
                page: page,
                previewAvailable: previewAvailable,
                detailHead: detailHead,
                detailLast: detailLast,
                genre: genre,
                photo: previewURL,
                people: people,
                places: places,
                publishedIn: publishedIn,
                versionNotes: versionNotes,
                desc: desc,
                linkOut: linkOut,
            };
            const res = await fetch(`${BASE_URL}/books/${id}`, {
                method: 'put',
                headers: { 'content-type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(data),
            });

            const result = await res.json();
            if (!res.ok) {
                return toast.error(result.message)
            } else {
                toast.success('Successful')
                navigate('/allbooks')
            }
        } catch (error) {
            toast.error(error.message)
        }
    };
    const handleFileInput = async (e) => {
        const file = e.target.files[0];
        const uploadData = new FormData();

        uploadData.append('file', file);
        uploadData.append('upload_preset', 'multiLibrary');
        uploadData.append('upload_name', '');
        fetch('https://api.cloudinary.com/v1_1/multi-library/image/upload', {
            method: 'post',
            body: uploadData,
        })
            .then((res) => res.json())
            .then((data) => setPreviewURL(data.url))
            .catch((err) => toast.error(err))
    };
    return (
        <div id='layoutSidenav_content'>
            <main>
                <div class="container-fluid px-4">
                    <h1 className='mt-4'>Edit Books</h1>
                    <div className="row">
                        <form action="">
                            <div className="sb-sidenav-menu-heading">General</div>
                            <label className="form-label mt-3" name="title" >Title: </label>
                            <input type="text" className="form-control display-2" value={title} onChange={(e) => { setTitle(e.target.value) }} />

                            <label className="form-label mt-3" name="author" >Author: </label>
                            <input type="text" className="form-control display-2" value={author} onChange={(e) => { setAuthor(e.target.value) }} />

                            <label className="form-label mt-3" name="language" >Language: </label>
                            <input type="text" className="form-control display-2" value={language} onChange={(e) => { setLanguage(e.target.value) }} />

                            <label className="form-label mt-3" name="publishingCompany" >Publisher: </label>
                            <input type="text" className="form-control display-2" value={publishingCompany} onChange={(e) => { setPublishingCompany(e.target.value) }} />

                            <label className="form-label mt-3" name="page" >Pages: </label>
                            <input type="number" className="form-control display-2" value={page} onChange={(e) => { setPage(e.target.value) }} />

                            <label className="form-label mt-3" name="previewAvailable" >Preview: </label>
                            <textarea className="form-control display-2" value={previewAvailable} onChange={(e) => { setPreviewAvailable(e.target.value) }}></textarea>

                            <label className="form-label mt-3" name="detailHead" >Detail Head: </label>
                            <textarea className="form-control display-2" value={detailHead} onChange={(e) => { setDetailHead(e.target.value) }}></textarea>

                            <label className="form-label mt-3" name="detailLast" >Detail Last: </label>
                            <textarea className="form-control display-2" value={detailLast} onChange={(e) => { setDetailLast(e.target.value) }}></textarea>

                            <label className="form-label mt-3" name="genre" >Genre: </label>
                            <input type="text" className="form-control display-2" value={genre} onChange={(e) => { setGenre(e.target.value) }} />

                            <label className="form-label mt-3" name="photo" >Image: </label> <br/>
                            <img src={previewURL} alt="" />
                            <input type="file" className="form-control" onChange={handleFileInput}/>

                            <label className="form-label mt-3" name="people" >Main Character: </label>
                            <input type="text" className="form-control display-2" value={people} onChange={(e) => { setPeople(e.target.value) }} />

                            <label className="form-label mt-3" name="places" >Places: </label>
                            <textarea className="form-control display-2" value={places} onChange={(e) => { setPlaces(e.target.value) }}></textarea>

                            <div className="sb-sidenav-menu-heading mt-3">Detail</div>

                            <label className="form-label mt-3" name="publishedIn" >Publish In </label>
                            <input type="date" className="form-control display-2" value={publishedIn} onChange={(e) => { setPublishedIn(e.target.value) }} />

                            <label className="form-label mt-3" name="versionNotes">Version: </label>
                            <input type="text" className="form-control display-2" value={versionNotes} onChange={(e) => { setVersionNotes(e.target.value) }} />

                            <label className="form-label mt-3" name="desc">Description: </label>
                            <textarea className="form-control display-2" value={desc} onChange={(e) => { setDesc(e.target.value) }}></textarea>

                            <label className="form-label mt-3" name="LinkedOut"> Other Libraries: </label>
                            <input type="text" className="form-control display-2" value={linkOut} onChange={(e) => { setLinkOut(e.target.value) }} />

                            <button className="btn btn-primary mt-3" type="submit" onClick={handleSubmit} >Submit form</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default EditBook;