import { ForwardRefExoticComponent, RefAttributes, forwardRef, useRef } from 'react';
import config from '../../config';
import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import fontSize from "tui-editor-plugin-font-size";
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import '@toast-ui/editor/dist/i18n/ko-kr';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';

const Component: ForwardRefExoticComponent<RefAttributes<any>> = forwardRef((props, ref) => {

    const uploadImage = async (blob: Blob) => {

        const formData = new FormData();
        formData.append('imageFile', blob);

        try {
            const response = await fetch(`${config}/posts/upload`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const error = await response.json();
                throw error
            }
        
            const data = await response.json();
            const { imageFile } = data
            return imageFile;

        } catch (error) {
            console.error(error)
        }
    }

    const onUploadImage = async (blob: Blob | File, callback: any) => {
        const url = await uploadImage(blob);
        const img = `${config}/${url}`
        callback(img, 'alt text');
    };

    return (
        <Editor
            ref={ref}
            initialValue="내용을 입력해 주세요"
            height="500px"
            initialEditType="wysiwyg"
            hideModeSwitch={true}
            useCommandShortcut={false}
            plugins={[colorSyntax, fontSize, codeSyntaxHighlight]}
            language="ko-KR"
            hooks={{
                addImageBlobHook: onUploadImage
            }}
        />
    )
})

export default Component;