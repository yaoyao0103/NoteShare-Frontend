import React from 'react';
 
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
 
import FileManager from 'devextreme-react/file-manager';
import { fileItems } from './data.js';
 
const FileManagement = () => {
    return (
        <FileManager fileSystemProvider={fileItems}>
        </FileManager>
    );
}
export default FileManagement;