import PropTypes from "prop-types";

const Table = ({ title, columns, rows }) => {
  return (
    <div className="p-4 border rounded shadow-lg m-2">
      <h2 className="font-bold text-xl mb-2">{title}</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            {columns?.map((col, index) => (
              <th
                key={index}
                className="px-4 py-2 border-b-2 border-gray-300 text-left text-sm font-semibold text-white"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-4 py-2 border-b border-gray-300 text-sm text-white"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  title: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
};

export default Table;
