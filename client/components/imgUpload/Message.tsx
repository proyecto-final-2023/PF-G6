export default function Message({ urlImage }: { urlImage: string | null }) {
  return (
    <>
      {urlImage && (
        <span className="url-cloudinary-sumbit">
          Your Image uploaded successfully! ✅
          <a target="_blank" href={urlImage}>
            View Image
          </a>
        </span>
      )}
    </>
  );
}
