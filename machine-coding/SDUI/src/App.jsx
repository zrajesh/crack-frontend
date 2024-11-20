import { useEffect, useState } from 'react'
import { SDUI_RESPONSE } from './constants';
import InfoCard from './components/InfoCard';
import Table from './components/table';

function App() {
  const [uiConfig, setUiConfig] = useState(null);

  useEffect(() => {
    // Making an API call
    const apiResponse = SDUI_RESPONSE;
    setUiConfig(apiResponse);
  }, []);

  const renderWidget = (widget) => {
    switch (widget.type) {
      case 'infoCard':
        return <InfoCard key={widget.title} {...widget} />;
      case 'table':
        return <Table key={widget.title} {...widget} />;
      default:
        return null;
    }
  };

  return (
    <>
      {uiConfig ? (
         <div className='max-w-5xl'>
           <h1 className='text-4xl m-auto mb-2 p-2'>{uiConfig?.title}</h1>
           <div className='widgets'>
             {uiConfig?.widgets?.map(renderWidget)}
           </div>
         </div>
       ) : (
         'Loading...'
       )}
    </>
  )
}

export default App
