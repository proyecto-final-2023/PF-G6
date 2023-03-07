type ImageSelectedProps = {
  loading: boolean;
  img: string;
  onUpload: () => Promise<void>;
  onImageRemove: (index: number) => void;
  onImageUpdate: (index: number) => void;
};

export default function ImageSelected(props: ImageSelectedProps) {
  const { loading, img, onUpload, onImageRemove, onImageUpdate } = props;

  return (
    <div>
      <img
        className="image-selected"
        src={img}
        alt="image-selected"
        width={300}
      />
      <div className="container-buttons">
        {loading ? (
          <p className="loading-label">Upload image ⏳...</p>
        ) : (
          <>
            <button disabled={loading} onClick={onUpload}>
              Upload 📤
            </button>
            <button disabled={loading} onClick={() => onImageUpdate(0)}>
              Update ✏️
            </button>
            <button disabled={loading} onClick={() => onImageRemove(0)}>
              Cancel ❌
            </button>
          </>
        )}
      </div>
    </div>
  );
}
