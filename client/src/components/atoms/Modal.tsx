import React, { forwardRef, useState } from 'react';
import Image from 'next/image';
import CloseIcon from '../../../public/close-2.svg';
import CloseIconHover from '../../../public/close-2-hover.svg';
import EditIcon from '../../../public/edit.svg';
import EditIconHover from '../../../public/edit-hover.svg';
import EditIconActive from '../../../public/edit-active.svg';
import { ModalProps } from '@/types/modal';
import { TagType } from '@/types/tags';
import Tag from '@/components/Tag';
import { formatDate } from '@/utils/formUtils';

const Modal = forwardRef<HTMLDivElement, ModalProps>(
	({ entry, closeModal }, ref) => {
		const { date, content, tags } = entry;
		const [selectedTags, setSelectedTags] = useState<TagType[]>(tags);
		const [closeIsHovered, setCloseIsHovered] = useState<boolean>(false);
		const [editIsHovered, setEditIsHovered] = useState<boolean>(false);
		const [isEditMode, setIsEditMode] = useState<boolean>(false);
		const editIconSrc = isEditMode
			? EditIconActive
			: editIsHovered
			? EditIconHover
			: EditIcon;
		const closeIconSrc = closeIsHovered ? CloseIconHover : CloseIcon;
		const dateLabel = new Date(date).toDateString();
		const ariaLabel = `${dateLabel} journal entry`;
		const formattedDate = formatDate(new Date(date));

		const removeTag = (tag: TagType): void => {
			setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
		};

		return (
			<div
				className="absolute inset-0 bg-black bg-opacity-30 w-full flex justify-center items-center z-10"
				role="dialog"
				aria-label={ariaLabel}
				aria-modal="true"
				tabIndex={-1}
			>
				<div
					className="z-40 mx-2 p-4 sm:p-8 w-full xs:max-w-[650px] min-h-[300px] bg-white border-solid border-2 rounded-lg"
					ref={ref}
				>
					<div className="flex justify-end">
						<button type="button" aria-label="Edit entry">
							<Image
								src={editIconSrc}
								alt=""
								width={36}
								onMouseEnter={() => setEditIsHovered(true)}
								onMouseLeave={() => setEditIsHovered(false)}
								onClick={() => setIsEditMode(true)}
							/>
						</button>
						<button type="button" className="ml-2" aria-label="Close modal">
							<Image
								src={closeIconSrc}
								alt=""
								width={36}
								onClick={() => closeModal()}
								onMouseEnter={() => setCloseIsHovered(true)}
								onMouseLeave={() => setCloseIsHovered(false)}
							/>
						</button>
					</div>

					<div className="p-4">
						<div className="font-semibold text-lg">{formattedDate}</div>
						<p className="py-4 text-xl">{content}</p>
						<ul className="flex mt-4">
							{selectedTags &&
								selectedTags.map((tag) => <Tag key={tag._id} tag={tag} />)}
						</ul>
					</div>
				</div>
			</div>
		);
	}
);

Modal.displayName = 'Modal';

export default Modal;
