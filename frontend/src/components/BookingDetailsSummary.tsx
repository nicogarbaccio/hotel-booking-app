import { HotelType } from "../../../backend/src/shared/types";

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
};

const BookingDetailsSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  hotel,
}: Props) => {
  return (
    <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
      <h2 className="text-xl font-bold">Your Booking Details</h2>
      <div className="border-b py-2">
        Location:
        <div
          className="font-bold"
          data-testid="booking-details-location"
        >{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</div>
      </div>
      <div className="flex justify-between">
        <div>
          Check-in
          <div className="font-bold" data-testid="booking-details-check-in">
            {" "}
            {checkIn.toDateString()}
          </div>
        </div>
        <div>
          Check-out
          <div className="font-bold" data-testid="booking-details-check-out">
            {" "}
            {checkOut.toDateString()}
          </div>
        </div>
      </div>
      <div className="border-t border-b py-2">
        Total length of stay:
        <div className="font-bold" data-testid="booking-details-length">
          {numberOfNights} nights
        </div>
      </div>

      <div>
        Guests{" "}
        <div className="font-bold" data-testid="booking-details-guests">
          {adultCount} adults & {childCount} children
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;
