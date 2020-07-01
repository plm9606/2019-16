import React, { useEffect, useState } from "react";
import Receipt from "../../components/users/Receipt";
import ReactLoading from "react-loading";
import styled from "styled-components";

const Loading = ({ type, color }) => (
  <Section>
    <ReactLoading type={type} color={color} height={"10%"} width={"10%"} />
  </Section>
);

const Section = styled.section`
  padding-top: 10%;
  div {
    margin: 0 auto;
  }
`;

const Payment = ({ match, location }) => {
  const [loading, setLoading] = useState(true);
  const [receipt, setReceipt] = useState({});
  const { groupId } = match.params;

  async function fetchReceipt() {
    const url = `${process.env.REACT_APP_REQUEST_URL}/api/reservation/${groupId}`;
    const options = {
      method: "GET",
      mode: "cors",
      credentials: "include",
    };
    const response = await fetch(url, options);

    if (response.ok) {
      const result = await response.json();
      if (result.length == 1) {
        setReceipt(result[0]);
      } else {
      }
    }
  }

  useEffect(() => {
    fetchReceipt();
  }, []);

  useEffect(() => {
    if (Object.keys(receipt).length !== 0) setLoading(false);
  }, [receipt]);

  return (
    <div>
      {loading ? (
        <Loading type="spokes" color="#F6538B" />
      ) : (
        <Receipt reservationInfo={receipt} />
      )}
    </div>
  );
};

export default Payment;
