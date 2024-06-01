import dynamic from 'next/dynamic';

import ReactQuill, { ReactQuillProps,Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface ForwardedQuillComponent extends ReactQuillProps {
    forwardedRef: React.Ref<ReactQuill>;
}

const QuillNoSSRWrapper =  typeof window === "object"
    ? dynamic(
    async () => {
        const { default: QuillComponent } = await import('react-quill');
        // const { default: ImageResize } = await import("quill-image-resize-module-ts");
        // QuillComponent.Quill.register("modules/imageResize", ImageResize);

        const Quill = ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
            <QuillComponent ref={forwardedRef} {...props} />
        );
        // const Quill = ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
        //     <QuillComponent ref={forwardedRef} modules={{
        //         ...props.modules,
        //         imageResize: {
        //             parchment: ReactQuill.Quill.import("parchment"),
        //             modules: ["Resize"],
        //         },
        //     }} {...props} />
        // );
        return Quill;
    },
    { loading: () => <div>...loading</div>, ssr: false },
) : () => false;

export default QuillNoSSRWrapper;