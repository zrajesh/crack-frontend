import PropTypes from "prop-types";

const InfoCard = ({ title, value, trend, description }) => {
  return (
    <div className="p-4 border rounded shadow-lg m-2">
      <h2 className="font-bold text-xl mb-2">{title}</h2>
      <p className="text-2xl">{value}</p>
      <p
        className={`text-sm ${
          trend === "up" ? "text-green-500" : "text-red-500"
        }`}
      >
        {description}
      </p>
    </div>
  );
};

InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  trend: PropTypes.oneOf(["up", "down"]).isRequired,
  description: PropTypes.string.isRequired,
};

export default InfoCard;
