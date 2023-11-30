import React, {useState } from 'react';

import { BASE_URL } from '~/hooks/config';
import MultiChoice from 'admin/Components/MultipleChoice';
import { toast } from 'react-toastify';

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
  const [people, setPeople] = useState('');
  const [places, setPlaces] = useState('');
  const [publishedIn, setPublishedIn] = useState('');
  const [versionNotes, setVersionNotes] = useState('');
  const [desc, setDesc] = useState('');
  const [linkOut, setLinkOut] = useState('');
  const [previewURL, setPreviewURL] = useState('');
    const handleSubmit = async (e) =>{
        e.preventDefault();

          try {
            const data = {
                title: title,
                author: author,
                language: language,
                publishingCompany : publishingCompany,
                page : page,
                previewAvailable : previewAvailable,
                detailHead : detailHead,
                detailLast : detailLast,
                genre : genre,
                photo : previewURL,
                people : people,
                places : places,
                publishedIn : publishedIn,
                versionNotes : versionNotes,
                desc : desc,
                linkOut : linkOut,
              };
              console.log(data);
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
                setPage('')
                setPreviewAvailable('')
                setDetailHead('')
                setDetailLast('')
                setGenre('')
                setPreviewURL('')
                setPeople('')
                setPlaces('')
                setPublishedIn('')
                setVersionNotes('')
                setDesc('')
                setLinkOut('')
                toast.success("Successful")
            }
        } catch (error) {
            toast.error(error.message);
        }

    }
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
            .catch((err) => console.log(err));
    };
    console.log(genre);
    return(
        <div id='layoutSidenav_content'>
            <main>
                <div class="container-fluid px-4">         
                    <h1 className='mt-4'>Add Books</h1>
                    <div className="row">
                        <form action="">
                        <div className="sb-sidenav-menu-heading">General</div>
                            <label className="form-label mt-3" name="title" >Title: </label>
                            <input type="text" className="form-control display-2" onChange={(e)=>{setTitle(e.target.value)}}/>

                            <label className="form-label mt-3" name="author" >Author: </label>
                            <input type="text" className="form-control display-2" onChange={(e)=>{setAuthor(e.target.value)}}/>
                            
                            <label className="form-label mt-3" name="language" >Language: </label>
                            <input type="text" className="form-control display-2" onChange={(e)=>{setLanguage(e.target.value)}}/>
                            
                            <label className="form-label mt-3" name="publishingCompany" >Publisher: </label>
                            <input type="text"  className="form-control display-2" onChange={(e)=>{setPublishingCompany(e.target.value)}}/>

                            <label className="form-label mt-3" name="page" >Pages: </label>
                            <input type="number" className="form-control display-2" onChange={(e)=>{setPage(e.target.value)}}/>

                            <label className="form-label mt-3" name="previewAvailable" >Preview: </label>
                            <textarea className="form-control display-2" onChange={(e)=>{setPreviewAvailable(e.target.value)}}></textarea>

                            <label className="form-label mt-3" name="detailHead" >Detail Head: </label>
                            <textarea className="form-control display-2" onChange={(e)=>{setDetailHead(e.target.value)}}></textarea>

                            <label className="form-label mt-3" name="detailLast" >Detail Last: </label>
                            <textarea  className="form-control display-2" onChange={(e)=>{setDetailLast(e.target.value)}}></textarea>

                            <label className="form-label mt-3" name="genre" >Genre: </label>
                            <MultiChoice setGenre={(genre)=>setGenre(genre)}/>

                            <label className="form-label mt-3" name="photo" >Image: </label>
                            <input type="file" className="form-control " onChange={handleFileInput}/>

                            <label className="form-label mt-3" name="people" >Main Character: </label>
                            <input type="text" className="form-control display-2" onChange={(e)=>{setPeople(e.target.value)}}/>

                            <label className="form-label mt-3" name="places" >Places: </label>
                            <textarea  className="form-control display-2" onChange={(e)=>{setPlaces(e.target.value)}}></textarea>
                            
                            <div className="sb-sidenav-menu-heading mt-3">Detail</div> 

                            <label className="form-label mt-3" name="publishedIn" >Publish In </label>
                            <input type="date" className="form-control display-2" onChange={(e)=>{setPublishedIn(e.target.value)}}/>
                            
                            <label className="form-label mt-3" name="versionNotes">Version: </label>
                            <input type="text" className="form-control display-2" onChange={(e)=>{setVersionNotes(e.target.value)}}/>

                            <label className="form-label mt-3" name="desc">Description: </label>
                            <textarea  className="form-control display-2" onChange={(e)=>{setDesc(e.target.value)}}></textarea>

                            <label className="form-label mt-3" name="LinkedOut"> Other Libraries: </label>
                            <input type="text" className="form-control display-2" onChange={(e)=>{setLinkOut(e.target.value)}}/>

                            <button className="btn btn-primary mt-3" type="submit" onClick={handleSubmit} >Submit form</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AddBook;