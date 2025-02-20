import eventBus from "./eventBus";

const Button = () => {
  const handleClick = () => {
    eventBus.emit('buttonClicked', { data: {
      message: "'Button was clicked!'",
      isPremium: true
    } });
  };

  return <button onClick={handleClick}>Purchase Now</button>;
};

export default Button;