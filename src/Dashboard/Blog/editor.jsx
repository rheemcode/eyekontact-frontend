
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Transition, Dialog } from "@headlessui/react";
import axios from "axios";
import { APPURL } from "../../Utils";


class MyUploadAdapter {
    loader;
    xhr
    constructor(loader) {
        // The file loader instance to use during the upload.
        this.loader = loader;
        this.xhr = XMLHttpRequest.prototype
    }

    request(file) {
        return axios({
            url: `https://eyekontact-server.herokuapp.com/uploads/images`,
            method: "POST",
            data: file,
            headers: {
                'Content-Type': 'multipart/form-data'
            },

        });
    }

    // Starts the upload process.
    async upload() {
        let data = { error: "" };
        try {
            const formData = new FormData();
            const file = await this.loader.file;
            formData.append('image', file, file.name);
            const response = await this.request(formData);
            return response.data;
        }
        catch (er) {
            console.log(er);
            return data;
            // return 
        }
    }

    // Aborts the upload process.
    abort() {
        if (this.xhr) {
            this.xhr.abort();
        }
    }
}

function MyCustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        // Configure the URL to the upload script in your back-end here!
        return new MyUploadAdapter(loader);
    };
}

export const Editor = ({ editor, data }) => {
    return (
        <CKEditor
            editor={ClassicEditor}
            config={{
                extraPlugins: [MyCustomUploadAdapterPlugin],
                heading: {
                    options: [
                        { model: 'paragraph', title: 'Paragraph', class: 'p' },
                        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'h1' },
                        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'h2' },
                        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'h3' },
                        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'h4' },
                        { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'h5' },
                        { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'h6' }
                    ]
                }
            }}
            data={data ? data : ''}
            onReady={editor_ => {
                editor({ current: editor_ });
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor);
            }}
            onChange={(event, editor) => {
                // const data = editor.getData();
                // console.log(data);

            }}
            onBlur={(event, editor) => {
                // console.log('Blur.', editor);
            }}
            onFocus={(event, editor) => {
                // console.log('Focus.', editor);
            }}
        />
    )
}
