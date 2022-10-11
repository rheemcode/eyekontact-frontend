import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useCallback, useEffect, useState } from 'react'
import { useTimeoutFn } from 'react-use';

declare interface SuccessModalProps {
    show: boolean;
    message: string;
    onCloseFn?: (value: React.SetStateAction<boolean>) => void
}

const SuccessModal = (props: SuccessModalProps) => {
    let [isOpen, setIsOpen] = useState(false)

    const closeModal = () => {
        setIsOpen(false)
    }

    const fn = () => {
        setIsOpen(false);
        if (props.onCloseFn)
            props.onCloseFn(false);
    }

    const [isReady, cancel, reset] = useTimeoutFn(fn, 3000);

    useEffect(() => {
        setIsOpen(props.show);
        reset();

        return () => cancel();
    }, [props.show]);

    return (
        <>
            <Transition appear show={isOpen}
                enter="transition duration-150 ease-out"
                enterFrom="transform -translate-y-12"
                enterTo="transform translate-y-0"
                leave="transition duration-150 ease-in"
                leaveFrom="transform translate-y-0"
                leaveTo="transform -translate-y-12"
                as={Fragment}>

                <Dialog
                    as="div"
                    className="fixed inset-0  z-[10000] overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">

                        <Dialog.Overlay className="fixed inset-0" />

                        <div className="border border-emrald-400 inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-emerald-600">
                                Success
                            </Dialog.Title>
                            <div className="mt-2">
                                <p className="text-emerald-600">
                                    {props.message}
                                </p>
                            </div>
                        </div>

                    </div>
                </Dialog>
            </Transition>
        </>
    )
}


export default SuccessModal;