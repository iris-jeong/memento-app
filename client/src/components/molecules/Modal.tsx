import React, { forwardRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ModalProps } from '@/types/modal';
import { TagType } from '@/types/tags';
import { EntryContentData } from '@/types/forms';
import useForm from '@/hooks/useForm';
import { useAuth } from '@/hooks/useAuth';
import { deleteEntry, updateEntry } from '@/api/entries';
import { formatDate } from '@/utils/formUtils';
import Tag from '@/components/atoms/Tag';
import TextAreaInput from '@/components/atoms/TextAreaInput';
import Button from '@/components/atoms/Button';
import IconButton from '@/components/atoms/IconButton';
import TagSelector from '@/components/molecules/TagSelector';
import CloseIcon from '../../../public/close-2.svg';
import CloseIconHover from '../../../public/close-2-hover.svg';
import EditIcon from '../../../public/edit.svg';
import EditIconHover from '../../../public/edit-hover.svg';
import EditIconActive from '../../../public/edit-active.svg';
import Delete from '../../../public/trash.svg';
import DeleteHover from '../../../public/trash-hover.svg';
import DeleteActive from '../../../public/trash-active.svg';

const Modal = forwardRef<HTMLDivElement, ModalProps>(
	({ entry, closeModal, setEntries }, ref) => {
		const { isAuthenticated, token, user } = useAuth();
		const router = useRouter();
		const { date, content, tags } = entry;
		const initialValues: EntryContentData = { content: content };
		const [selectedTags, setSelectedTags] = useState<TagType[]>(tags);
		const [isEditMode, setIsEditMode] = useState<boolean>(false);
		const formattedDate = formatDate(new Date(date));

		const handleDeleteClick = async (entryId: string) => {
			if (!isAuthenticated) {
				console.error('Authentication required');
				router.push('/login');
				return;
			}

			try {
				await deleteEntry(token, entryId);
				setEntries((prevEntries) =>
					prevEntries.filter((e) => e._id !== entryId)
				);
				window.showToast('Entry deleted successfully', 'success');
				closeModal();
			} catch (error) {
				console.error('Error with deleting', error);
				window.showToast('Error with deleting entry', 'error');
			}
		};

		const onSubmit = async (formData: EntryContentData) => {
			if (!isAuthenticated) {
				console.error('Authentication required');
				router.push('/login');
				return;
			}

			const updatedEntry = {
				userId: user?.id,
				date: date,
				content: formData.content,
				tags: selectedTags,
			};

			try {
				const result = await updateEntry(entry._id, updatedEntry, token);
				setEntries((prevEntries) =>
					prevEntries.map((e) => (e._id === entry._id ? result : e))
				);
				window.showToast('Entry updated successfully', 'success');
				resetForm();
				closeModal();
			} catch (error) {
				console.error('Error with update');
				window.showToast('Error with updating entry', 'error');
			}
		};

		const { formData, handleChange, handleSubmit, hasErrors, resetForm } =
			useForm<EntryContentData>({ initialValues, onSubmit });

		return (
			<div
				className="fixed inset-0 bg-black bg-opacity-30 w-full flex justify-center items-center z-10"
				role="dialog"
				aria-label={`${new Date(date).toDateString()} journal entry`}
				aria-modal="true"
				tabIndex={-1}
			>
				<div
					className="z-40 mx-1 py-4 px-2 xs:mx-2 xs:p-4 sm:p-8 w-full xs:max-w-[650px] bg-white border-solid border-2 rounded-lg"
					ref={ref}
				>
					<div className="flex justify-end">
						<IconButton
							icon={Delete}
							hoverIcon={DeleteHover}
							activeIcon={DeleteActive}
							alt="Delete entry"
							onClick={() => handleDeleteClick(entry._id)}
							width={36}
						/>
						<IconButton
							icon={EditIcon}
							hoverIcon={EditIconHover}
							activeIcon={EditIconActive}
							classes="ml-2"
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
						<div className="px-4">
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
