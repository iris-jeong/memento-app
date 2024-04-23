import React, { forwardRef, useState } from 'react';
import Image from 'next/image';
import CloseIcon from '../../../public/close-2.svg';
import EditIcon from '../../../public/edit.svg';
import { ModalProps } from '@/types/modal';
import { TagType } from '@/types/tags';
import Tag from '@/components/Tag';

const Modal = forwardRef<HTMLDivElement, ModalProps>(
	({ entry, closeModal }, ref) => {
		const { date, content, tags } = entry;
		const [selectedTags, setSelectedTags] = useState<TagType[]>(tags);
		const formattedDate = new Date(date).toDateString();

		const removeTag = (tag: TagType): void => {
			setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
		};

		return (
			<div
				className="mx-2 p-4 w-full xs:max-w-[600px] min-h-[300px] bg-white border-solid border-2 rounded-lg"
				ref={ref}
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
							onClick={() => closeModal()}
						/>
					</span>
				</div>
				<div className="font-bold mb-2">{formattedDate}</div>
				<p>{content}</p>
				<ul className="flex mt-4">
					{selectedTags &&
						selectedTags.map((tag) => (
							<Tag key={tag._id} tag={tag} removeTag={removeTag} />
						))}
				</ul>
			</div>
		);
	}
);

Modal.displayName = 'Modal';

export default Modal;
