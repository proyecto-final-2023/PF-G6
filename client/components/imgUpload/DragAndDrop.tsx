import { useUploadImage } from "@/hooks/useUploadImage";
import ReactImageUploading from "react-images-uploading";
import BoxDragAndDrop from "./BoxDragAndDrop";
import ImageSelected from "./ImageSelected";
import Message from "./Message";

export default function DragAndDrop() {
  const { urlImage, handleChange, images, ...rest } = useUploadImage();

  return (
    <>
      <Message urlImage={urlImage} />
      <ReactImageUploading
        multiple={false}
        value={images}
        onChange={handleChange}
        maxNumber={1}
      >
        {({
          imageList,
          onImageUpload,
          dragProps,
          isDragging,
          onImageRemove,
          onImageUpdate
        }) => (
          <>
            {imageList[0] ? (
              <ImageSelected
                {...{ onImageRemove, onImageUpdate, ...rest }}
                img={imageList[0].dataURL!}
              />
            ) : (
              <BoxDragAndDrop {...{ onImageUpload, dragProps, isDragging }} />
            )}
          </>
        )}
      </ReactImageUploading>
    </>
  );
}
