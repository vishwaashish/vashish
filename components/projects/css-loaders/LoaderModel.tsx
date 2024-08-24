import { LOADER_PARAMS } from "@/common/loaders-constants";
import { type ILoaderParams } from "@/types/css-loaders.model";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { type FC, useRef, useState } from "react";

// const SharedModal = lazy(() => import('./SharedModal'))

interface LoaderModel {
  // loaders: LoaderType[]
  onClose: () => void
  state: ILoaderParams
}

const LoaderModel: FC<LoaderModel> = ({ state, onClose }) => {
    const router = useRouter();

    const overlayRef = useRef<HTMLDivElement | null>(null);

    const { loaderId } = router.query;

    const index = Number(loaderId);

    const [direction, setDirection] = useState<number>(0);
    const [curIndex, setCurIndex] = useState<number>(index);

    function handleClose() {
        router.push(
            {
                query: { ...state },
            },
            `/css-loaders?${LOADER_PARAMS(state)}`,
            {
                shallow: true,
            },
        );
        onClose();
    }

    function changeLoaderId(newVal: number): void {
        if (newVal > index) {
            setDirection(1);
        } else {
            setDirection(-1);
        }

        setCurIndex(newVal);

        router.push(
            {
                query: { loaderId: newVal, ...state },
            },
            `/css-loaders/${newVal}?${LOADER_PARAMS(state)}`,
            { shallow: true },
        );
    }

    return (
        <>
            <Dialog open={true} onClose={handleClose} initialFocus={overlayRef}>
                <Dialog.Overlay
                    key="backdrop"
                    as={motion.div}
                    ref={overlayRef}
                    className="fixed z-50 inset-0 bg-black/20 backdrop-blur"
                    aria-hidden="true"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                />
                <Dialog.Panel
                    as={motion.div}
                    className="fixed z-50 inset-0 flex items-center justify-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {/* <SharedModal
            index={curIndex}
            direction={direction}
            // changeLoaderId={changeLoaderId}
            closeModal={handleClose}
            // navigation={true}
          /> */}
                </Dialog.Panel>
            </Dialog>
        </>
    );
};

export default LoaderModel;
