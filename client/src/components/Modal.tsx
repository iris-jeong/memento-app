import React, { forwardRef } from 'react';
import Image from 'next/image';
import CloseIcon from '../../public/close-2.svg';
import EditIcon from '../../public/edit.svg';

interface ModalProps {
	setIsModalOpen: (isOpen: boolean) => void;
}

// Updated to use forwardRef
const Modal = forwardRef<HTMLDivElement, ModalProps>(
	({ setIsModalOpen }, ref) => {
		return (
			<div
				className="mx-2 p-4 xs:w-3/5 bg-white border-solid border-2 rounded-lg"
				ref={ref} // Now accepts ref from parent component
			>
				<div className="flex justify-end">
					<span className="hover:cursor-pointer">
						<Image src={EditIcon} alt="Edit icon" width={36} />
					</span>
					<span className="ml-2">
						<Image
							src={CloseIcon}
							alt="Close icon"
							width={36}
							className="hover:cursor-pointer"
							onClick={() => setIsModalOpen(false)}
						/>
					</span>
				</div>
				<div className="font-bold mb-2">7/21/2024</div>
				<p>
					Today, during my usual morning walk, I noticed the first daffodil of
					the season blooming in my neighbors garden. It was a vivid yellow,
					standing out against the dull winter landscape. This simple moment was
					a reminder of the resilience of nature and the promise of spring. It
					brought a sense of hope and joy, a feeling that stayed with me
					throughout the day.
				</p>
				<ul className="mt-4">tags</ul>
			</div>
		);
	}
);

Modal.displayName = 'Modal';

export default Modal;
