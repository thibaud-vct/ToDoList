const Task = ({ memo, id, handleValide, handleDelete, rgb }) => {
    return (
        <div
            id={id}
            style={{ backgroundColor: rgb }}
            onClick={handleValide}
            onDoubleClick={handleDelete}
        >
            <p>{memo}</p>
        </div>
    );
};
export default Task;
