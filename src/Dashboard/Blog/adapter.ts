// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { FileLoader } from "@ckeditor/ckeditor5-upload/src/filerepository";
// import axios from "axios";
// import { Editor } from '@ckeditor/ckeditor5-core';



// export default class Plugin {
//     editor: Editor;

//     constructor(editor: Editor) {
//         this.editor = editor;
//     }

//     init() {

//         this.editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
//             // Configure the URL to the upload script in your back-end here!
//             return new MyUploadAdapter(loader);
//         };
//     }

// }

// export class MyUploadAdapter {
//     loader: FileLoader;
//     xhr: XMLHttpRequest
//     constructor(loader: FileLoader) {
//         // The file loader instance to use during the upload.
//         this.loader = loader;
//         this.xhr = XMLHttpRequest.prototype
//     }

//     request(file: FormData | null) {
//         return axios({
//             url: "http://localhost:5000/addimage",
//             method: "POST",
//             data: file,
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             },

//         });
//     }

//     // Starts the upload process.
//     async upload() {
//         let data: Record<string, string> = { error: "" };
//         try {
//             const formData = new FormData();
//             const file = await this.loader.file as File;
//             formData.append('image', file, file.name);
//             const response = await this.request(formData);
//             console.log(response.data);
//             return response.data as Record<string, string>;
//         }
//         catch (er) {
//             console.log(er);
//             return data;
//             // return
//         }
//     }

//     // Aborts the upload process.
//     abort() {
//         if (this.xhr) {
//             this.xhr.abort();
//         }
//     }
// }

export { }