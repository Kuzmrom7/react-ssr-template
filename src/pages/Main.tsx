import React from "react";
import { connect } from "react-redux";
import "./main.scss";

interface Props {}

const Main = props => {
  return (
    <div className="main">
      {props.readyStatus === "success" && (
        <ul>
          {props.list.map((item, key) => (
            <li key={key}>{item.name}</li>
          ))}
        </ul>
      )}
      Main
    </div>
  );
};

const mapStateToProps = ({ home: { readyStatus, list } }) => ({
  readyStatus,
  list
});

export default connect(mapStateToProps, null)(Main);
