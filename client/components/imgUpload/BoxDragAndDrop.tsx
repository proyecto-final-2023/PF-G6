interface BoxDragAndDropProps {
  onImageUpload: () => void;
  dragProps: any;
  isDragging: boolean;
}

export default function BoxDragAndDrop(props: BoxDragAndDropProps) {
  const { onImageUpload, dragProps, isDragging } = props;

  return (
    <div
      onClick={onImageUpload}
      {...dragProps}
      className={`container-dnd center-flex ${isDragging ? "isDragging" : ""}`}
    >
      <span className="label-dnd">
        Chosee an Image or Drag and Drop an Image 📤
      </span>
    </div>
  );
}
