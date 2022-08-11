import bookingClient from "../../Services/bookingClient";
import { parseOffices,parseToStringHour,parseDate } from "../Generics/Parses/Parses"


const TableBody = ({ tableData, columns, userBookings, setUserBookings }) => {
  const handleDelete = async (bookID, officeId) => {
    const res = await bookingClient.deleteBooking(bookID);
    if (res) {
      const newBookings = userBookings.filter(
        (booking) => booking.id !== bookID
      );
      setUserBookings(newBookings);
    }
  };

  const parseUserBookings = (bookings) => {
    const parsedBookings = [];
    bookings.forEach((booking) => {
      booking.startDate = new Date(booking.startDate);
      booking.endDate = new Date(booking.endDate);
      const parsedBooking = {
        id: booking.id,
        office: parseOffices(booking.officeId),
        reserved_place: booking.bookingPlace,
        start_date: parseDate(booking.startDate),
        start_hour: parseToStringHour(booking.startDate),
        end_date: parseDate(booking.endDate),
        end_hour: parseToStringHour(booking.endDate),
      };
      parsedBookings.push(parsedBooking);
    });
    return parsedBookings;
  };

  const newTableData= parseUserBookings(tableData);

  return (
    <tbody>
      {
      newTableData.map((data) => {
        const differentEndDate = data.start_date !== data.end_date;
        return (
          <tr key={data.id}>
            {columns.map(({ accessor }) => {
              const tData = data[accessor] ? data[accessor] : "——";
              if (accessor === "delete") {
                return (
                  <td key={accessor}>
                    <button
                      className="del-book-btn"
                      onClick={() => handleDelete(data.id, data.office)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                );
              }
              if (differentEndDate) {
                if (accessor === "end_hour") {
                  return (
                    <td key={accessor}>{`${tData} (${data.end_date})`}</td>
                  );
                }
              }
              return <td key={accessor}>{tData}</td>;
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
