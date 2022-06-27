import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createPage } from "./redux/actions/pageAction";

//const noteId = "62aea343e913643da31b5873"
const noteId = "62b477d9c291fe27002cae3c"

const Home = () => {
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(true);
  const dispatch = useDispatch();

  const { pageStore } = useSelector((state) => state);
  const { pages } = pageStore;

  const handleSubmit = async () => {
    if (!name) {
      setIsValid(false);
      return;
    }
    createPage(name)(dispatch);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-5">
          <form id="create-page">
            <div className="modal-header">
              <h5 className="modal-title" id="addPageModalLabel">
                Create Page
              </h5>
            </div>
            <div className="modal-body">
              <div className="col-auto">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className={`form-control form-control-sm ${
                    isValid ? "" : "is-invalid"
                  }`}
                  id="name"
                  name="name"
                  placeholder="Name of Page"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {!isValid && (
                  <div className="invalid-feedback">
                    Please provide a valid name.
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-bs-dismiss="modal"
              >
                Clear
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <div className="col-12 my-2">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Slug</td>
                <td>Action</td>
                <td>Browse</td>
              </tr>
            </thead>
            <tbody>
              { (pages.length!==0)
                ? pages.map((page) => (
                    <tr key={page._id}>
                      <td>{page._id}</td>
                      <td>{page.name}</td>
                      <td>{page.slug}</td>
                      <td>
                        <Link to={`/editor/${page._id}`}>Edit</Link>
                      </td>
                      <td>
                        <Link to={`/NoteDetailPage/${page._id}`}>Browse</Link>
                      </td>
                    </tr>
                  ))
                : "No Page"}
            </tbody>
          </table>
        </div>
        <div>
        <Link to={'/MemberPage'}>MemberPage</Link>
        </div>
        <div>
        <Link to={`/NoteDetailPage`}>NoteDetailPage</Link>
        </div>
        <div>
        <Link to={'/NoteOutlinePage'}>NoteOutlinePage</Link>
        </div>
        <div>
        <Link to={'/RewardOutlinePage'}>RewardOutlinePage</Link>
        </div>
        <div>
        <Link to={'/RewardDetailPage'}>RewardDetailPage</Link>
        </div>
        <div>
        <Link to={'/RewardEditPage'}>RewardEditPage</Link>
        </div>
        <div>
        <Link to={'/QnAOutlinePage'}>QnAOutlinePage</Link>
        </div>
        <div>
        <Link to={'/QnADetailPage'}>QnADetailPage</Link>
        </div>
        <div>
        <Link to={'/QnAEditPage'}>QnAEditPage</Link>
        </div>
        <div>
        <Link to={'/CollabOutlinePage'}>CollabOutlinePage</Link>
        </div>
        <div>
        <Link to={'/CollabDetailPage'}>CollabDetailPage</Link>
        </div>
        </div>
        <Link to={'/CollabEditPage'}>CollabEditPage</Link>
        <div>
        <div>
        <Link to={'/ScreenShotCapture'}>ScreenShotCapture</Link>
        </div>
        <div>
        <Link to={`/NoteEditPage/${noteId}`}>NoteEditPage</Link>
        </div>
        <div>
        <Link to={'/NoteEditPage/new'}>NoteNewPage</Link>
        </div>
        <div>
        <Link to={'/ProfilePage'}>ProfilePage</Link>
        </div>
        <div>
        <Link to={'/LoginPage'}>LoginPage</Link>
        </div>
        <div>
        <Link to={'/SignUpPage'}>SignUpPage</Link>
        </div>
        <div>
        <Link to={'/PersonalPage'}>PersonalPage</Link>
        </div>
        <div>
        <Link to={'/OuterPage'}>OuterPage</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
