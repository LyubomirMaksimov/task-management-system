import React, { useEffect } from "react";
import styles from "./TicketDetailsPage.module.css";
import { useTicketDetailsProps } from "../modules/ticket/hooks/useTicketDetails";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/Store";
import useTicketDetails from "../modules/ticket/hooks/useTicketDetails";
import { useParams } from "react-router-dom";
import { addNotification } from "../app/features/notificationSlice";
import TicketReport from "../modules/ticket/components/TicketReports/TicketReport";
import TicketHelpers from "../modules/ticket/components/TicketHelpers/TicketHelpers";
import TicketDetails from "../modules/ticket/components/TicketDetails/TicketDetails";

const TicketDetailsPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const { id } = useParams();
  const dispatch = useDispatch();

  const objRequest: useTicketDetailsProps = {
    flag: true,
    params: [
      user.nUser,
      id?.split("-")[0] as string,
      id?.split("-")[1] as string,
      user.userAccToken,
    ],
  };

  const { ticketDetailsData, error } = useTicketDetails(objRequest);

  useEffect(() => {
    if (error) {
      dispatch(
        addNotification({
          id: new Date().getTime(),
          message: error.message,
          type: error.name.toLowerCase(),
        })
      );
    }
  }, [error, ticketDetailsData, dispatch]);

  return (
    <>
      {ticketDetailsData && (
        <div className={styles.detailsContainer}>
          <TicketDetails ticket={ticketDetailsData} />

          <TicketReport
            otcheti={ticketDetailsData?.otcheti}
            cobjTicket={ticketDetailsData.cobjTicket}
            ticketStatus={ticketDetailsData.ticketStatus}
          />
          {ticketDetailsData?.helpers.length > 0 && (
            <TicketHelpers helpers={ticketDetailsData?.helpers} />
          )}
        </div>
      )}
      {!ticketDetailsData && (
        <div className={styles.detailsContainer}>Something Went Wrong</div>
      )}
    </>
  );
};

export default TicketDetailsPage;
