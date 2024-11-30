interface ActionProps {
    moveRight: () => void;
    moveLeft: () => void;
}

const Action = ({moveRight, moveLeft}: ActionProps) => {
    return (
        <div className="flex actions">
            <button onClick={moveRight}>&gt;</button>
            <button onClick={moveLeft}>&lt;</button>
        </div>
    );
};

export default Action;