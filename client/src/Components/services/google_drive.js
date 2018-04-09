import axios from 'axios';

export default class GoogleDrive {
    constructor(key) {
        this.key = key;
    }

    create_doc_file(name) {
        console.log('--->', this.token);
        axios.defaults.headers.common['Authorization'] = "Bearer " + this.token;
        axios.post("https://www.googleapis.com/upload/drive/v3/files", 
            {
                "name": name,
                "mimeType": "application/vnd.google-apps.document"
            }
        ).then(response => {
            console.log(response.data);
            return response;
        })
    }

}