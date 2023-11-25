import React, { useRef, useState, useContext, useEffect } from 'react';
import axios from 'axios';

import { BASE_URL } from '~/hooks/config';
import useFetch from '~/hooks/useFetch';
function AddBook(){
    const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [language, setLanguage] = useState('');
  const [publishingCompany, setPublishingCompany] = useState('');
  const [page, setPage] = useState('');
  const [previewAvailable, setPreviewAvailable] = useState('');
  const [detailHead, setDetailHead] = useState('');
  const [detailLast, setDetailLast] = useState('');
  const [genre, setGenre] = useState('');
  const [photo, setPhoto] = useState('');
  const [people, setPeople] = useState('');
  const [places, setPlaces] = useState('');
  const [publishedIn, setPublishedIn] = useState('');
  const [versionNotes, setVersionNotes] = useState('');
  const [desc, setDesc] = useState('');
  const [LinkedOut, setLinkedOut] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();

          try {
            const data = {
                title,
                author,
                language,
                publishingCompany,
                page,
                previewAvailable,
                detailHead,
                detailLast,
                genre,
                photo,
                people,
                places,
                publishedIn,
                versionNotes,
                desc,
                LinkedOut,
              };

            const res = await fetch(`${BASE_URL}/books`, {
                method: 'post',
                headers: { 'content-type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(data),
            });

            const result = await res.json();
            if (!res.ok) {
                return alert(result.message);
            } else {
                setTitle('');
                setAuthor('');
                setLanguage('');
                setPublishingCompany('')
            }
        } catch (error) {
            alert(error.message);
        }

    }

    return(
        <div id='layoutSidenav_content'>
            <main>
                <div class="container-fluid px-4">         
                    <h1 className='mt-4'>Add Books</h1>
                    <div className="row">
                        <form action="">
                        <div className="sb-sidenav-menu-heading">General</div>
                            <label className="form-label mt-3" name="title" >Title: </label>
                            <input type="text" className="form-control display-2"/>

                            <label className="form-label mt-3" name="author" >Author: </label>
                            <input type="text" className="form-control display-2"/>
                            
                            <label className="form-label mt-3" name="language" >Language: </label>
                            <input type="text" className="form-control display-2"/>
                            
                            <label className="form-label mt-3" name="publishingCompany" >Publisher: </label>
                            <input type="text"  className="form-control display-2"/>

                            <label className="form-label mt-3" name="page" >Pages: </label>
                            <input type="number" className="form-control display-2"/>

                            <label className="form-label mt-3" name="previewAvailable" >Preview: </label>
                            <textarea className="form-control display-2"></textarea>

                            <label className="form-label mt-3" name="detailHead" >Detail Head: </label>
                            <textarea className="form-control display-2"></textarea>

                            <label className="form-label mt-3" name="detailLast" >Detail Last: </label>
                            <textarea  className="form-control display-2"></textarea>

                            <label className="form-label mt-3" name="genre" >Genre: </label>
                            <input type="text"  className="form-control display-2"/>

                            <label className="form-label mt-3" name="photo" >Image: </label>
                            <input type="file" className="form-control "/>

                            <label className="form-label mt-3" name="people" >Main Character: </label>
                            <input type="text" className="form-control display-2"/>

                            <label className="form-label mt-3" name="places" >Address: </label>
                            <textarea  className="form-control display-2"></textarea>
                            
                        <div className="sb-sidenav-menu-heading">Detail</div> 

                            <label className="form-label mt-3" name="publishedIn" >Place of publication: </label>
                            <textarea className="form-control display-2"></textarea>
                            
                            <label className="form-label mt-3" name="versionNotes">Version: </label>
                            <input type="text" className="form-control display-2"/>

                            <label className="form-label mt-3" name="desc">Description: </label>
                            <textarea  className="form-control display-2"></textarea>

                            <label className="form-label mt-3" name="LinkedOut"> Other Libraries: </label>
                            <textarea className="form-control display-2"></textarea>

                            <button className="btn btn-primary mt-3" type="submit" onClick={handleSubmit} >Submit form</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AddBook;