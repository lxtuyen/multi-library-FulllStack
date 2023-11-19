function AddBook(){
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
                            <input type="text" className="form-control display-2"/>

                            <label className="form-label mt-3" name="page" >Pages: </label>
                            <input type="number" className="form-control display-2"/>

                            <label className="form-label mt-3" name="previewAvailable" >Preview: </label>
                            <textarea className="form-control display-2"></textarea>

                            <label className="form-label mt-3" name="detailHead" >Detail Head: </label>
                            <textarea className="form-control display-2"></textarea>

                            <label className="form-label mt-3" name="detailLast" >Detail Last: </label>
                            <textarea className="form-control display-2"></textarea>

                            <label className="form-label mt-3" name="genre" >Genre: </label>
                            <input type="text" className="form-control display-2"/>

                            <label className="form-label mt-3" name="photo" >Image: </label>
                            <input type="file" className="form-control "/>

                            <label className="form-label mt-3" name="people" >Main Character: </label>
                            <input type="text" className="form-control display-2"/>

                            <label className="form-label mt-3" name="places" >Address: </label>
                            <textarea className="form-control display-2"></textarea>
                            
                        <div className="sb-sidenav-menu-heading">Detail</div> 

                            <label className="form-label mt-3" name="publishedIn" >Place of publication: </label>
                            <textarea className="form-control display-2"></textarea>
                            
                            <label className="form-label mt-3" name="versionNotes">Version: </label>
                            <input type="text" className="form-control display-2"/>

                            <label className="form-label mt-3" name="desc">Description: </label>
                            <textarea className="form-control display-2"></textarea>

                            <label className="form-label mt-3" name="LinkedOut"> Other Libraries: </label>
                            <textarea className="form-control display-2"></textarea>

                            <button className="btn btn-primary mt-3" type="submit">Submit form</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AddBook;