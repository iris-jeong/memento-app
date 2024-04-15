import { TextAreaInputProps } from '@/types/forms';

export default function TextAreaInput({ value, onChange }: TextAreaInputProps) {
	const maxLength = 300;

	return (
		<div className="relative w-full">
			<textarea
				id="content"
				name="content"
				maxLength={maxLength}
				required
				aria-label="Journal entry"
				placeholder="Enter today's entry..."
				className="w-full h-60 xs:h-40 md:h-36 p-5 mb-4 border-solid border-2 border-[#E8E8E8] bg-[#F6F6F6] rounded-md focus:outline-none resize-none"
				onChange={onChange}
				value={value}
			></textarea>
			<div className="flex absolute right-0 bottom-8 right-3 text-[#838383] text-xs">
				<span>{`${value.length}/${maxLength}`}</span>
			</div>
		</div>
	);
}
