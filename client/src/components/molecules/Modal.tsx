import React, { forwardRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ModalProps } from '@/types/modal';
import { TagType } from '@/types/tags';
import { EntryContentData } from '@/types/forms';
import useForm from '@/hooks/useForm';
import { updateEntry } from '@/api/entries';
import { formatDate } from '@/utils/formUtils';
import Tag from '@/components/Tag';
import TextAreaInput from '@/components/atoms/TextAreaInput';
import Button from '@/components/atoms/Button';
import IconButton from '@/components/atoms/IconButton';
import TagSelector from '@/components/molecules/TagSelector';
import CloseIcon from '../../../public/close-2.svg';
import CloseIconHover from '../../../public/close-2-hover.svg';
import EditIcon from '../../../public/edit.svg';
import EditIconHover from '../../../public/edit-hover.svg';
import EditIconActive from '../../../public/edit-active.svg';

const Modal = forwardRef<HTMLDivElement, ModalProps>(
	({ entry, closeModal, setEntries }, ref) => {
		const router = useRouter();
		const { date, content, tags } = entry;
		const initialValues: EntryContentData = { content: content };
		const [selectedTags, setSelectedTags] = useState<TagType[]>(tags);
		const [isEditMode, setIsEditMode] = useState<boolean>(false);
		const formattedDate = formatDate(new Date(date));

		const onSubmit = async (formData: EntryContentData) => {
			const token = localStorage.getItem('token');
			const storedUser = localStorage.getItem('user');

			if (!token || !storedUser) {
				console.error('Authentication required');
				router.push('/login');
				return;
			}

			const user = JSON.parse(storedUser);
			const updatedEntry = {
				userId: user.id,
				date: date,
				content: formData.content,
				tags: selectedTags,
			};

			try {
				const result = await updateEntry(entry._id, updatedEntry, token);
				setEntries((prevEntries) =>
					prevEntries.map((e) => (e._id === entry._id ? result : e))
				);
				resetForm();
				closeModal();
			} catch (error) {
				console.error('Error with update');
			}
		};

		const { formData, handleChange, handleSubmit, hasErrors, resetForm } =
			useForm<EntryContentData>({ initialValues, onSubmit });

		return (
			<div
				className="absolute inset-0 bg-black bg-opacity-30 w-full flex justify-center items-center z-10"
				role="dialog"
				aria-label={`${new Date(date).toDateString()} journal entry`}
				aria-modal="true"
				tabIndex={-1}
			>
				<div
					className="z-40 mx-2 p-4 sm:p-8 w-full xs:max-w-[650px] min-h-[336px] bg-white border-solid border-2 rounded-lg"
					ref={ref}
				>
					<div className="flex justify-end">
						<IconButton
							icon={EditIcon}
							hoverIcon={EditIconHover}
							activeIcon={EditIconActive}
							alt="Edit entry"
							onClick={() => setIsEditMode((prevVal) => !prevVal)}
							width={36}
						/>
						<IconButton
							icon={CloseIcon}
							hoverIcon={CloseIconHover}
							classes="ml-2"
							alt="Close modal"
							onClick={() => closeModal()}
							width={36}
						/>
					</div>

					{isEditMode ? (
						<form onSubmit={handleSubmit}>
							<div className="font-semibold mb-3">{formattedDate}</div>

							<TextAreaInput value={formData.content} onChange={handleChange} />

							<TagSelector
								selectedTags={selectedTags}
								setSelectedTags={setSelectedTags}
							/>

							<Button
								className="mt-8 py-3"
								type="submit"
								variant="secondary"
								disabled={hasErrors}
							>
								Update Entry
							</Button>
						</form>
					) : (
						<div className="p-4">
							<div className="font-semibold">{formattedDate}</div>
							<p className="py-4">{content}</p>
							<ul className="flex mt-4">
								{selectedTags &&
									selectedTags.map((tag) => <Tag key={tag._id} tag={tag} />)}
							</ul>
						</div>
					)}
				</div>
			</div>
		);
	}
);

Modal.displayName = 'Modal';

export default Modal;
