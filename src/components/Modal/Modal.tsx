import React, { useState, Children, useEffect } from 'react';

interface Props {
	title?: string;
	children?: any;
	width?: string;
	render?: any;
}

function Modal(props: Props) {
	const { title, children, width = '400px', render } = props;
	const [show, setShow] = useState(true);
    const ref: any = React.useRef(null);
    const content = ref.current ? ref.current.children[0].children[0].children[1] : null;

    useEffect(() => {
        if (!ref.current) { return }
        ref.current.children[0].children[0].children[1].style.display = 'none'
        if (show) {
            ref.current.children[0].children[0].children[1].style.display = 'block'
        } else {
            ref.current.children[0].children[0].children[1].style.display = 'none'
        }
    }, [show])

	return (
		<div ref={ref}>
            <div className="p-2 cursor-pointer select-none" onClick={() => setShow(!show)}>
			    {children}	
			</div>
            {content && show && (
                <div>
                    Here..
                    {content}
                </div>
            )}
            {/* 
			<div className="p-2 cursor-pointer select-none" onClick={() => setShow(!show)}>
				
			</div>
			{show && (
				<div className="fixed flex items-center justify-center w-full inset-0 z-50">
					<div
						className={'border bg-white shadow items-center justify-center z-50'}
						style={{ width }}
					>
						{title && <div className="border-b p-3">{title}</div>}
						{children}
					</div>

					<div
						className="bg-gray-800 opacity-70 w-screen h-screen absolute cursor-pointer"
						onClick={() => setShow(!show)}
					/>
				</div>
			)}
             */}
		</div>
	);
}

Modal.Content = ({ children }) => {
	return <div>{children}</div>;
};

export default Modal;
