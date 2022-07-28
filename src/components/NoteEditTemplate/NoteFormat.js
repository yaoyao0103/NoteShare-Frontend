export const NoteFormat = {
    type: null, //
    department: null, //
    subject: null, //
    title: null, //
    headerEmail: null, //
    headerName: null, //
    authorEmail: [], //
    authorName: [], //
    managerEmail: null, //
    professor: null, //
    school: null, //
    liker: [],
    buyer: [],
    favoriter: [],
    likeCount: 0,
    favoriteCount: 0,
    unlockCount: 0,
    downloadable: true, //
    commentCount: 0,
    comments: [],
    price: 0, //
    quotable: false,
    tag: [],
    hiddenTag: [],
    version: [],
    contributors: [],
    postID: null,
    description: null,
    reference: null,
    best: null,
    favorite: null,
    submit: false,
    public: true
}

export const VersionFormat = {
    name: null,
    slug: null,
    content: [],
    picURL: [],
    fileURL: [],
    temp: false
}

export const ContentFormat = {
    'mycustom-html': "",
    'mycustom-components': "",
    'mycustom-assets': "",
    'mycustom-css': "",
    'mycustom-styles':""
}

/*

{
          "name": "default",
          "slug": "default",
          "content": [{
            "mycustom_html": "",
            "mycustom_components": "",
            "mycustom_assets": "",
            "mycustom_css": "",
            "mycustom_styles": ""
          }],
          "picURL": [],
          "fileURL": [],
          "temp": true
        }
*/