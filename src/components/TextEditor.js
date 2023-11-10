import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import '../styles/TextEditor/TextEditor.scss';

const config = {
    toolbar: [ 'heading', '|', 'bold', 'italic', 'link', '|', 'bulletedList', 'numberedList', 'blockQuote',],
    // toolbar에 이미지 삽입 & 테이블 만드는 거 자료 찾아보기
    placeholder: "내용을 입력하세요.",
}

const TextEditor = ({value, setValue}) => {
    return (   
        <CKEditor
            editor={ ClassicEditor }
            config={config}
            data={value}
            onChange={ ( event, editor ) => {
                const data = editor.getData();
                setValue(data);
            }}/>
    );
}

export default TextEditor;