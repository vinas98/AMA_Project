import { Col, Container, Row } from 'react-bootstrap';
import './TextEditor.css';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


function TextEditor(){
    
    const modules = {
        toolbar: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image', 'video', 'code'],
          ['clean'],
        ],
        clipboard: {
          // toggle to add extra line breaks when pasting HTML:
          matchVisual: false,
        },
      }
      
      const [value, setValue] = useState('');

    return(
        <div className='textEditorContainer'>
            <Container>
                <Row>
                    <Col><ReactQuill className='textEditor' placeholder={"Add more details to get the best answer..."} theme="snow" modules={modules} value={value} onChange={setValue} /></Col>
                </Row>
            </Container>
        </div>
    );
}
export default TextEditor;