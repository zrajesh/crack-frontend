import { useState } from 'react'
import './App.css'
import Action from './components/Action'
import List from './components/List'
import { intersection, not } from './utils';

const items = [1, 2, 3, 4, 5];

function App() {
  const [leftItems, setLeftItems] = useState<number[]>(items);
  const [rightItems, setRightItems] = useState<number[]>([]);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const leftCheckedItems = intersection(leftItems, checkedItems);
  const rightCheckedItems = intersection(rightItems, checkedItems);

  const handleToggle = (item: number) => {
    const currentIndex = checkedItems.indexOf(item);
    const newCheckedItems = [...checkedItems];

    if (currentIndex === -1) {
      newCheckedItems.push(item);
    } else {
      newCheckedItems.splice(currentIndex, 1);
    }
    setCheckedItems(newCheckedItems);
  }

  const moveRight = () => {
    setRightItems(rightItems.concat(leftCheckedItems));
    setLeftItems(not(leftItems, leftCheckedItems));
    setCheckedItems(not(checkedItems, leftCheckedItems))
  }

  const moveLeft = () => {
    setLeftItems(leftItems.concat(rightCheckedItems));
    setRightItems(not(rightItems, rightCheckedItems));
    setCheckedItems(not(checkedItems, rightCheckedItems))
  }
  
  return (
    <>
    <h1>Transfer List</h1>
    <div className='flex'>
      <List items={leftItems} handleToggle={handleToggle} />
      <Action moveRight={moveRight} moveLeft={moveLeft} />
      <List items={rightItems} handleToggle={handleToggle} />
    </div>
    </>
  )
}

export default App
