interface ListProps {
    items: number[];
    handleToggle: (item: number) => void;
}

const List = ({ items, handleToggle }: ListProps) => {
    return (
        <div className="flex list">
            {
                items?.map(item => <div key={item}>
                    <label htmlFor={item.toString()}>
                        <input type="checkbox" id={item.toString()} onChange={() => handleToggle(item)} />
                        {item}
                    </label>
                </div>)
            }
        </div>
    );
};

export default List;