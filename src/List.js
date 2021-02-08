const List = ({ memo, id, handleOpen, handleDelete, rgb }) => {
    return (
        <div
            id={id}
            style={{ backgroundColor: rgb }}
            onClick={handleOpen}
            onDoubleClick={handleDelete}
        >
            <p>{memo}</p>
        </div>
    );
};
export default List;
