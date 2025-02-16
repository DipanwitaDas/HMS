import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <h3>Who We Are</h3>
          <p>
            TechCare Hospital Management System is a comprehensive solution
            designed to streamline and optimize hospital operations, ensuring
            seamless patient care and efficient administration. It integrates
            key functions such as patient registration, appointment scheduling,
            electronic health records (EHR), billing, inventory management, and
            staff coordination into a unified platform. By reducing paperwork
            and minimizing errors, TechCare HMS enhances workflow efficiency,
            improves interdepartmental communication, and ensures data security.
            With advanced features like real-time monitoring and analytics, it
            empowers healthcare professionals to deliver high-quality services
            while maximizing hospital resources for better patient outcomes.
          </p>
        </div>
      </div>
    </>
  );
};

export default Biography;
