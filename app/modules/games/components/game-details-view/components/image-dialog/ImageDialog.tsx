import * as Dialog from '@radix-ui/react-dialog';

interface ImageDialogProps {
  image: string;
}

export const ImageDialog: React.FC<ImageDialogProps> = ({ image }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <img className="h-60 w-full" src={image} alt={image} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center">
          <Dialog.Title className="sr-only">Image</Dialog.Title>
          <div className="relative">
            <Dialog.Close className="absolute right-2 top-2 rounded-full border border-white bg-slate-800 bg-opacity-90 p-2 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 8.586L3.707 2.293 2.293 3.707 8.586 10l-6.293 6.293 1.414 1.414L10 11.414l6.293 6.293 1.414-1.414L11.414 10l6.293-6.293-1.414-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Dialog.Close>
            <img className="w-full lg:h-96 lg:w-auto" src={image} alt={image} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
