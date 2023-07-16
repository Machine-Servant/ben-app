interface PlatformTagProps {
  name: string;
  image_background?: string;
}

export const ImageTag: React.FC<PlatformTagProps> = ({
  image_background: image,
  name,
}) => {
  return (
    <div className="mb-2 flex items-center gap-4 overflow-hidden rounded-full bg-green-700 pr-4 font-bold">
      <img className="h-12 w-12 object-cover" src={image} alt={name} />
      <h4 className="text-center text-sm text-white">{name}</h4>
    </div>
  );
};
