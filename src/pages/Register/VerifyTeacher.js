import React, { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";

const VerifyTeacher = () => {
  const MUTATIONS = gql`
    mutation verifyTeacher($id: String!) {
      verifyTeacher(id: $id) {
        id
      }
    }
  `;

  const [verifyTeacher, { loading: _loading, error: _error, data: _data }] =
    useMutation(MUTATIONS);

  useEffect(() => {
    const params = window.location.search;
    const id = params.split("=")[1];
    verifyTeacher({
      variables: {
        id,
      },
    });
  }, []);

  return (
    <section className="register__page min-vh-100 d-flex justify-content-center align-items-center">
      <div className="box confirm mx-auto bg-white overflow-hidden d-flex flex-column justify-content-center align-items-center">
        <h1 className="mt-4 text-center">Teacher approved</h1>
      </div>
    </section>
  );
};

export default VerifyTeacher;
