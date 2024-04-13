import { TextInputProps } from '@/types/forms';

export default function TextInput({
	id,
	type,
	label,
	value,
	error,
	onChange,
}: TextInputProps) {
	return (
		<div className="flex flex-col w-full mb-8">
			<label htmlFor={id} className="text-sm mb-1 tracking-wide">
				{label}
			</label>
			<input
				id={id}
				name={id}
				type={type}
				className="border-2 rounded h-14 px-2 text-lg"
				value={value}
				onChange={onChange}
			/>
			{error && <small className="text-red-600">{error}</small>}
		</div>
	);
}
