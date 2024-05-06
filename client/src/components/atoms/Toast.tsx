import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { Toast } from '@/types/toasts';
import SuccessIcon from '../../../public/success.svg';
import ErrorIcon from '../../../public/error.svg';
import CloseIcon from '../../../public/close.svg';

export default function Toast() {
	const [toast, setToast] = useState<Toast | null>(null);

	const showToast = useCallback(
		(message: string, type: 'success' | 'error') => {
			setToast({ message, type });

			setTimeout(() => {
				setToast(null);
			}, 93000);
		},
		[]
	);

	useEffect(() => {
		window.showToast = showToast;
	}, [showToast]);

	const iconSrc = toast?.type === 'success' ? SuccessIcon : ErrorIcon;
	return (
		<div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
			{toast && (
				<div
					className={`flex justify-between max-w-xs w-[400px] border-2 text-white rounded-lg shadow-lg p-4 transition-opacity duration-300 ${
						toast.type === 'success'
							? 'border-[#52654B] bg-[#DEF3D6] text-[#52654B]'
							: 'border-[#970000] bg-[#FFE3E3] text-[#970000]'
					}`}
				>
					<div className="flex">
						<Image src={iconSrc} alt="" />
						<p className="ml-2">{toast.message}</p>
					</div>
					<Image
						src={CloseIcon}
						alt="Close toast notification"
						className="cursor-pointer"
						onClick={() => setToast(null)}
					/>
				</div>
			)}
		</div>
	);
}

declare global {
	interface Window {
		showToast: (message: string, type: 'success' | 'error') => void;
	}
}
